import { motion } from "framer-motion";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { services, serviceAssurances } from "../data/luxe";
import { cn, isTouchDevice, prefersReducedMotion } from "../lib/utils";
import { scrollToSection } from "../lib/scroll";
import { LineIcon } from "./ui/LineIcon";
import type { LineIconName } from "./ui/LineIcon";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { MagneticButton } from "./ui/MagneticButton";

const SERVICE_ICONS: Record<string, LineIconName> = {
  haircut: "scissors",
  colour: "sparkle",
  treatment: "drop",
  facial: "leaf",
  nails: "gem",
  grooming: "flame",
  makeup: "camera",
  spa: "heart",
};

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const interactive = !isTouchDevice() && !prefersReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${-py * 5}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1100px)";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-[272px] shrink-0 snap-start sm:w-[300px]"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative overflow-hidden rounded-2xl border border-gold/20 bg-secondary/90 shadow-card transition-[transform,border-color,box-shadow] duration-500 ease-out will-change-transform hover:border-gold/50 hover:shadow-gold-glow"
      >
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            decoding="async"
            className="img-cinema h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/25 to-transparent" />
          {/* category index */}
          <span className="absolute left-4 top-4 font-serif text-sm tracking-wider text-gold/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* icon badge */}
          <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-gold backdrop-blur-sm">
            <LineIcon name={SERVICE_ICONS[service.icon] ?? "scissors"} />
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-[17px] font-medium text-ivory">{service.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">{service.short}</p>
          <button
            onClick={() => scrollToSection("#booking")}
            className="group/link mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider2 text-gold transition-colors hover:text-gold-bright"
            aria-label={`Book ${service.name}`}
          >
            View More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover/link:translate-x-1" strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Services() {
  const railRef = useRef<HTMLDivElement>(null);
  const [dragHint, setDragHint] = useState(true);

  const nudge = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="services" data-parallax-root className="relative overflow-hidden section-pad bg-secondary/40">
      <div className="pointer-events-none absolute -right-52 top-24 h-[560px] w-[560px] rounded-full bg-gold/[0.05] blur-[140px]" />

      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Our Services"
              title={
                <>
                  Expert Care
                  <br />
                  For Every <span className="gold-text italic">You</span>
                </>
              }
              description="From trendy haircuts to rejuvenating skin care, we offer everything you need under one roof."
            />
          </div>
          <Reveal delay={0.2} className="hidden lg:block">
            <ScriptText lines={["Good Hair,", "Better Mood"]} underline className="text-3xl" />
          </Reveal>
        </div>

        {/* Horizontal cinematic rail */}
        <Reveal delay={0.15}>
          <div className="relative mt-12">
            <div
              ref={railRef}
              onScroll={() => setDragHint(false)}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
            >
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
              {/* end CTA card */}
              <div className="flex w-[240px] shrink-0 snap-start items-center justify-center sm:w-[280px]">
                <div className="glass-strong flex h-[300px] w-full flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center">
                  <span className="font-serif text-2xl italic text-gold">Beauty</span>
                  <span className="font-serif text-xl text-ivory">Has No Gender</span>
                  <span className="h-px w-12 bg-gold/60" />
                  <MagneticButton variant="outline" arrow onClick={() => scrollToSection("#booking")} className="px-5 py-3 text-[10px]">
                    Book Appointment
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* drag hint + arrows (desktop) */}
            <div className="mt-6 flex items-center justify-between">
              <p className={cn("flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-muted transition-opacity duration-500", dragHint ? "opacity-100" : "opacity-0")}>
                <MoveHorizontal className="h-4 w-4 text-gold" />
                Drag or scroll to explore
              </p>
              <div className="hidden gap-3 lg:flex">
                <button
                  onClick={() => nudge(-1)}
                  aria-label="Scroll services left"
                  className="thin-gold-border flex h-11 w-11 items-center justify-center rounded-full text-gold transition-all hover:bg-gold/10 hover:shadow-gold-glow"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.7} />
                </button>
                <button
                  onClick={() => nudge(1)}
                  aria-label="Scroll services right"
                  className="thin-gold-border flex h-11 w-11 items-center justify-center rounded-full text-gold transition-all hover:bg-gold/10 hover:shadow-gold-glow"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Assurance strip */}
        <Reveal delay={0.2}>
          <div className="glass relative mt-14 grid gap-y-6 rounded-2xl px-7 py-7 shadow-card sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            {serviceAssurances.map((item, i) => (
              <div key={item.title} className={cn("flex items-center gap-4 lg:px-7", i > 0 && "lg:border-l lg:border-gold/12", i === 0 && "lg:pl-0")}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 hover:border-gold/70">
                  <LineIcon name={item.icon} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ivory">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{item.caption}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
