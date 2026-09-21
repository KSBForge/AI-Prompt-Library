import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { galleryCategories, galleryItems, galleryStats, imagery } from "../data/luxe";
import { cn } from "../lib/utils";
import { lockBodyScroll, scrollToSection, unlockBodyScroll } from "../lib/scroll";
import { EASE, Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { MagneticButton } from "./ui/MagneticButton";
import { KpiStrip } from "./ui/KpiStrip";

const SPANS = [
  "col-span-2 row-span-2 aspect-square", // large anchor tile
  "col-span-2 row-span-1 aspect-[2/1]",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-1 aspect-square",
  "col-span-2 row-span-1 aspect-[2/1]",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-2 aspect-[1/2]",
  "col-span-1 row-span-1 aspect-square",
  "col-span-2 row-span-1 aspect-[2/1]",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-1 aspect-square",
  "col-span-2 row-span-2 aspect-square",
];

export function GallerySection() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]["id"]>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? galleryItems : galleryItems.filter((g) => g.category === category)),
    [category],
  );

  const close = () => setLightbox(null);
  const step = (dir: 1 | -1) =>
    setLightbox((cur) => (cur === null ? cur : (cur + dir + filtered.length) % filtered.length));

  useEffect(() => {
    if (lightbox === null) return;
    lockBodyScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox === null, filtered.length]);

  return (
    <section id="gallery" data-parallax-root className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -left-52 top-40 h-[520px] w-[520px] rounded-full bg-gold/[0.05] blur-[140px]" />

      <div className="container-luxe">
        {/* Editorial header row */}
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Our Gallery"
              title={
                <>
                  Real People
                  <br />
                  Real <span className="gold-text italic">Transformations</span>
                </>
              }
              description="Style. Self-Care. Confidence. Captured."
            />
          </div>
          <Reveal delay={0.2} className="hidden lg:block">
            <ScriptText lines={["“More", "Than a Salon,", "A Feeling”"]} className="text-3xl" />
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Gallery categories">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={category === cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setLightbox(null);
                }}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider2 transition-all duration-400",
                  category === cat.id
                    ? "bg-gold text-primary shadow-gold-glow"
                    : "thin-gold-border bg-black/25 text-ivory/80 hover:border-gold/60 hover:text-gold-bright",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Asymmetric editorial grid */}
        <div className="mt-9 grid grid-flow-row-dense grid-cols-2 auto-rows-min gap-3.5 sm:grid-cols-4 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.figure
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 26 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.75, delay: (i % 4) * 0.07, ease: EASE }}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-xl border border-gold/15 transition-colors duration-500 hover:border-gold/50",
                  category === "all" ? SPANS[i % SPANS.length] : "aspect-[4/3]",
                )}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`${item.caption} — open image`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightbox(i);
                  }
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="img-cinema absolute inset-0 h-full w-full transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-serif text-[15px] text-ivory">{item.caption}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider2 text-gold">{item.category}</p>
                </figcaption>
                <span className="glass absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats strip + CTA */}
        <Reveal delay={0.15}>
          <KpiStrip
            stats={galleryStats}
            className="mt-14"
            trailing={
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ScriptText lines={["Be Your Best Self"]} className="text-2xl" />
                <MagneticButton variant="solid" arrow onClick={() => scrollToSection("#booking")} className="px-6 py-3.5 text-[11px]">
                  Book Your Transformation
                </MagneticButton>
              </div>
            }
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-luxe text-muted/70 sm:flex">
            <ArrowRight className="h-3 w-3 text-gold" /> Real People. Real Results.
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] ? (
          <motion.div
            className="fixed inset-0 z-[96] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={filtered[lightbox].caption}
          >
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-lg" onClick={close} />

            <motion.figure
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 max-w-4xl"
            >
              <img
                src={filtered[lightbox].src.replace("w=1000", "w=1600")}
                alt={filtered[lightbox].alt}
                className="max-h-[72vh] w-auto max-w-full rounded-xl border border-gold/30 object-contain shadow-lift"
              />
              <figcaption className="mt-4 flex items-end justify-between gap-4">
                <span>
                  <span className="block font-serif text-lg text-ivory">{filtered[lightbox].caption}</span>
                  <span className="text-[10px] uppercase tracking-wider2 text-gold">{filtered[lightbox].category}</span>
                </span>
                <span className="text-xs tracking-wider2 text-muted">
                  {String(lightbox + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>

            <button
              onClick={close}
              aria-label="Close gallery"
              className="glass absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="glass absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition-all hover:border-gold/60 hover:text-gold sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next image"
              className="glass absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition-all hover:border-gold/60 hover:text-gold sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
