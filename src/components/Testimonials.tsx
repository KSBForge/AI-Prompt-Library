import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PanInfo } from "framer-motion";
import { testimonialStats, testimonials } from "../data/luxe";
import { cn } from "../lib/utils";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { Stars } from "./ui/Stars";
import { KpiStrip } from "./ui/KpiStrip";

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);
  return perView;
}

export function Testimonials() {
  const perView = usePerView();
  const maxIndex = Math.max(0, testimonials.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex((cur) => Math.min(cur, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((cur) => (cur >= maxIndex ? 0 : cur + 1)), 5500);
    return () => clearInterval(t);
  }, [paused, maxIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) setIndex((cur) => Math.min(maxIndex, cur + 1));
    else if (info.offset.x > 60) setIndex((cur) => Math.max(0, cur - 1));
  };

  return (
    <section id="testimonials" data-parallax-root className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -right-40 top-24 h-[460px] w-[460px] rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Testimonials"
              title={
                <>
                  What Our
                  <br />
                  Clients <span className="gold-text italic">Say</span>
                </>
              }
              description="Real experiences. Real people. Real confidence."
            />
          </div>

          <Reveal delay={0.2} className="flex items-center gap-6">
            <ScriptText lines={["“Beautiful People", "Brighter Stories”"]} className="hidden text-2xl xl:block" />
            <span className="hidden font-serif text-sm tracking-wider2 text-muted sm:block">
              {String(index + 1).padStart(2, "0")} / {String(maxIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setIndex((cur) => Math.max(0, cur - 1))}
                disabled={index === 0}
                aria-label="Previous testimonials"
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
                  index === 0
                    ? "border-gold/15 text-gold/30"
                    : "thin-gold-border text-gold hover:bg-gold/10 hover:shadow-gold-glow",
                )}
              >
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
              <button
                onClick={() => setIndex((cur) => Math.min(maxIndex, cur + 1))}
                disabled={index === maxIndex}
                aria-label="Next testimonials"
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
                  index === maxIndex
                    ? "border-gold/15 text-gold/30"
                    : "thin-gold-border text-gold hover:bg-gold/10 hover:shadow-gold-glow",
                )}
              >
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal delay={0.15}>
          <div
            className="mt-12 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              animate={{ x: `-${index * (100 / perView)}%` }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={onDragEnd}
              onDragStart={() => setPaused(true)}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="shrink-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3"
                  draggable={false}
                >
                  <figure className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift">
                    {/* client photograph */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={t.image}
                        alt={`${t.name} — ${t.service} client at LUXE`}
                        loading="lazy"
                        decoding="async"
                        className="img-cinema h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14110d] via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 flex gap-0.5 text-gold" aria-hidden>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} className="text-[13px]">★</span>
                        ))}
                      </span>
                    </div>

                    <blockquote className="flex-1 px-6 pt-5 text-[13.5px] leading-relaxed text-ivory/90">
                      “{t.quote}”
                    </blockquote>

                    <figcaption className="mt-5 flex items-center justify-between border-t border-gold/10 px-6 py-4">
                      <span>
                        <span className="block text-sm font-semibold text-ivory">{t.name}</span>
                        <span className="block text-xs text-muted">{t.service}</span>
                      </span>
                      <span className="font-serif text-4xl leading-[0.5] text-gold/40" aria-hidden>
                        ”
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Stats strip + thank-you panel */}
        <Reveal delay={0.2}>
          <KpiStrip
            stats={testimonialStats}
            className="mt-14"
            trailing={
              <div className="flex flex-col items-start gap-1.5">
                <p className="font-script text-3xl text-gold">
                  Thank You <span aria-hidden>♡</span>
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider2 text-muted">
                  For being a part of our journey
                </p>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
