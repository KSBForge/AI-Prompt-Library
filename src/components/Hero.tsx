import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { imagery } from "../data/restaurant";
import { scrollToSection } from "../lib/scroll";
import { EASE } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";
import { Particles } from "./ui/Particles";
import { ScriptText } from "./ui/ScriptText";

interface HeroProps {
  /** Becomes true once the loading screen lifts — starts the entrance choreography. */
  start: boolean;
}

const HEADLINE = ["Where Every", "Meal Becomes", "a Memory"];

export function Hero({ start }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Cinematic depth: each layer drifts at its own pace as the visitor scrolls away
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["4%", "-14%"]);
  const plateR = useTransform(scrollYProgress, [0, 1], [0, -2.5]);
  const wineY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: start ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      id="home"
      data-parallax-root
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Layer 1 — restaurant interior */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-6%]">
        <img
          src={imagery.heroBackground}
          alt="Warm candle-lit dining room at SAVORÉ"
          className="img-cinema h-full w-full animate-hero-zoom"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Cinematic grading */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(8,7,6,0.9)]" />

      {/* Layer 2 — the plate, breathing independently */}
      <motion.div
        style={{ y: plateY, rotate: plateR }}
        className="pointer-events-none absolute -right-[18%] top-[20%] w-[74vw] max-w-[680px] sm:-right-[6%] sm:top-[16%] sm:w-[52vw] lg:right-[2%] lg:top-[10%]"
      >
        <div className="animate-float-slower">
          <img
            src={imagery.heroPlate}
            alt="Signature lamb dish plated with summer vegetables"
            className="img-cinema mask-fade-radial aspect-[5/4] w-full opacity-90 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </motion.div>

      {/* Layer 3 — wine accent */}
      <motion.div
        style={{ y: wineY }}
        className="absolute bottom-[15%] right-[7%] z-10 hidden lg:block"
      >
        <div className="glass animate-float-slow rounded-full p-2 shadow-card">
          <img
            src={imagery.heroWine}
            alt="Red wine by candlelight"
            className="img-cinema h-24 w-24 rounded-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      {/* Layer 4 — gold dust */}
      <Particles className="z-[5]" density={64} />

      {/* Layer 5 — typography */}
      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-20 w-full">
        <div className="container-luxe px-5 pb-28 pt-36 sm:px-8 md:pb-32 lg:px-12">
          <div className="max-w-[620px]">
            <motion.p {...enter(0.15)} className="eyebrow">
              Exceptional Taste
            </motion.p>

            <h1 className="heading-xl mt-6">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "112%" }}
                    animate={start ? { y: "0%" } : {}}
                    transition={{ duration: 1.15, delay: 0.3 + i * 0.15, ease: EASE }}
                  >
                    {i === 2 ? (
                      <>
                        a <span className="gold-text gold-text-shimmer">Memory</span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...enter(0.85)}
              className="mt-7 max-w-[470px] text-[15px] leading-relaxed text-muted md:text-base"
            >
              At SAVORÉ, we blend world-class ingredients, culinary artistry, and a warm atmosphere
              to create unforgettable dining experiences.
            </motion.p>

            <motion.div {...enter(1.0)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton variant="solid" arrow onClick={() => scrollToSection("#reservation")}>
                Book a Table
              </MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollToSection("#menu")}>
                Explore Menu
              </MagneticButton>
            </motion.div>

            <motion.div
              {...enter(1.15)}
              className="glass mt-12 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
            >
              <span className="text-sm font-semibold tracking-wide text-gold">4.8 ★</span>
              <span className="h-3 w-px bg-gold/30" />
              <span className="text-xs tracking-wide text-muted">10K+ happy guests · Est. 2016</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Script flourish */}
      <motion.div
        initial={{ opacity: 0, rotate: -8, y: 20 }}
        animate={start ? { opacity: 1, rotate: -6, y: 0 } : {}}
        transition={{ duration: 1.4, delay: 1.5, ease: EASE }}
        className="absolute right-[8%] top-[16%] z-20 hidden xl:block"
      >
        <ScriptText lines={["Good Food", "Brighter Moments"]} delay={0} />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        {...enter(1.6)}
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-luxe text-muted/80">Scroll</span>
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-gold/40 p-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ y: [0, 18, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      {/* Vertical est. marker */}
      <div className="absolute bottom-28 right-6 z-20 hidden items-center gap-3 [writing-mode:vertical-rl] lg:flex">
        <span className="h-14 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        <span className="text-[10px] uppercase tracking-luxe text-gold/70">Est. 2016 — Jaipur</span>
      </div>
    </section>
  );
}
