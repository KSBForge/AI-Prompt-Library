import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PanInfo } from "framer-motion";
import { testimonials } from "../data/restaurant";
import { cn } from "../lib/utils";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { Stars } from "./ui/Stars";

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
    <section data-parallax-root className="relative overflow-hidden section-pad bg-secondary/40">
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="eyebrow">Testimonials</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-lg mt-5">
                What Our
                <br />
                <span className="gold-text italic">Guests Say</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="flex items-center gap-6">
            <span className="font-serif text-sm tracking-wider2 text-muted">
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
            <ScriptText lines={["Real People", "Real Stories"]} className="hidden text-2xl xl:block" underline />
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
                  <figure className="glass group flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift">
                    <span className="font-serif text-6xl leading-[0.6] text-gold/50" aria-hidden>
                      “
                    </span>
                    <blockquote className="mt-5 flex-1 font-serif text-[15.5px] italic leading-relaxed text-ivory/90">
                      {t.quote}
                    </blockquote>
                    <motion.div
                      className="mt-5 flex gap-1"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, scale: 0.3, rotate: -30 },
                            visible: { opacity: 1, scale: 1, rotate: 0 },
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 14 }}
                          className="text-gold"
                        >
                          ★
                        </motion.span>
                      ))}
                    </motion.div>
                    <figcaption className="mt-5 flex items-center gap-4 border-t border-gold/10 pt-5">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        className="img-cinema h-11 w-11 rounded-full ring-1 ring-gold/40"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-ivory">{t.name}</span>
                        <span className="block text-xs text-muted">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
