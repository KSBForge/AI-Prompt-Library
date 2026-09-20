import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Heart, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { menuCategories, menuItems, type MenuItem } from "../data/restaurant";
import { cn, formatINR, isTouchDevice, prefersReducedMotion } from "../lib/utils";
import { scrollToSection, lockBodyScroll, unlockBodyScroll } from "../lib/scroll";
import { EASE, Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { Stars } from "./ui/Stars";
import { MagneticButton } from "./ui/MagneticButton";

/* ------------------------------ Dish card ------------------------------ */

function DishCard({
  item,
  favorite,
  onToggleFavorite,
  onOpen,
}: {
  item: MenuItem;
  favorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
}) {
  const interactive = !isTouchDevice() && !prefersReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="perspective-1200"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onOpen}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/15 bg-secondary/90 shadow-card transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-gold/45 hover:shadow-gold-glow"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label={`${item.name} — view details`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="img-cinema h-full w-full transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-70" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label={favorite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
            aria-pressed={favorite}
            className={cn(
              "glass absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
              favorite ? "border-gold/60" : "hover:border-gold/50",
            )}
          >
            <motion.span
              key={String(favorite)}
              initial={{ scale: favorite ? 0.4 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex"
            >
              <Heart
                className={cn("h-4 w-4 transition-colors duration-300", favorite ? "fill-gold text-gold" : "text-ivory/85")}
                strokeWidth={1.6}
              />
            </motion.span>
          </button>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-[17px] font-medium text-ivory">{item.name}</h3>
          <Stars rating={item.rating} className="mt-2" />
          <p className="mt-2.5 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-muted">
            {item.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-serif text-lg font-semibold text-gold">{formatINR(item.price)}</span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-primary shadow-[0_8px_24px_-8px_rgba(201,164,92,0.8)] transition-all duration-300 group-hover:rotate-90 group-hover:bg-gold-bright"
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------ Dish modal ----------------------------- */

function DishModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  useEffect(() => {
    lockBodyScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ y: 46, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="glass-strong relative grid max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-[24px] shadow-lift md:grid-cols-2"
      >
        <button
          onClick={onClose}
          aria-label="Close dish details"
          className="glass absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors hover:border-gold/60 hover:text-gold"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        <div className="relative h-52 md:h-auto">
          <img src={item.image} alt={item.name} className="img-cinema h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          <div className="flex flex-wrap gap-2">
            {item.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-gold"
              >
                {badge}
              </span>
            ))}
          </div>

          <h3 className="mt-4 font-serif text-3xl text-ivory">{item.name}</h3>

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={item.rating} />
            <span className="text-xs text-muted">{item.rating.toFixed(1)} · Guest favourite</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider2 text-gold">Ingredients</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.ingredients.map((ing) => (
              <span key={ing} className="rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-ivory/80 ring-1 ring-gold/15">
                {ing}
              </span>
            ))}
          </div>

          <div className="gold-hairline my-6" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-serif text-3xl font-semibold text-gold">{formatINR(item.price)}</span>
            <MagneticButton
              variant="solid"
              arrow
              className="px-6 py-3.5 text-[11px]"
              onClick={() => {
                onClose();
                setTimeout(() => scrollToSection("#reservation"), 180);
              }}
            >
              Reserve a Table
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------ Section -------------------------------- */

export function MenuSection() {
  const [category, setCategory] = useState<(typeof menuCategories)[number]["id"]>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["lava-cake"]));
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? menuItems : menuItems.filter((item) => item.category === category)),
    [category],
  );

  // Navbar search + concierge can request a dish from anywhere on the page
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      const item = menuItems.find((m) => m.id === id);
      if (item) setSelected(item);
    };
    window.addEventListener("savore:open-dish", handler);
    return () => window.removeEventListener("savore:open-dish", handler);
  }, []);

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="menu" data-parallax-root className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -right-52 top-24 h-[560px] w-[560px] rounded-full bg-gold/[0.05] blur-[140px]" />

      <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_2fr] lg:gap-16">
        {/* Sticky editorial column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Our Menu"
            title={
              <>
                Flavours
                <br />
                for Every
                <br />
                <span className="gold-text italic">Moment</span>
              </>
            }
            description="A thoughtfully curated menu with world-class ingredients, crafted to bring people together."
          />
          <Reveal delay={0.25}>
            <ScriptText lines={["Good Food", "Great Company"]} underline className="mt-12 text-3xl" />
          </Reveal>
        </div>

        {/* Categories + cards */}
        <div>
          <Reveal>
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Menu categories">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={category === cat.id}
                  onClick={() => setCategory(cat.id)}
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

          <motion.div layout className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  favorite={favorites.has(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onOpen={() => setSelected(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>{selected ? <DishModal item={selected} onClose={() => setSelected(null)} /> : null}</AnimatePresence>
    </section>
  );
}
