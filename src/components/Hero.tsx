import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { lazy, Suspense } from "react";
import { useMotionValueEvent } from "framer-motion";
import { CalendarCheck, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { heroMarkers, imagery, salonInfo } from "../data/luxe";
import { cn, isTouchDevice, prefersReducedMotion } from "../lib/utils";
import { lockBodyScroll, scrollToSection, unlockBodyScroll } from "../lib/scroll";
import { EASE } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";
import { Particles } from "./ui/Particles";
import { ScriptText } from "./ui/ScriptText";
import { supportsWebGL } from "../lib/webgl";
import { setHeroScrollProgress } from "../lib/heroScroll";

const HeroScene3D = lazy(() =>
  import("./ui/HeroScene3D").then((m) => ({ default: m.HeroScene3D })),
);

interface HeroProps {
  /** Becomes true once the loading screen lifts — starts the entrance choreography. */
  start: boolean;
}

const HEADLINE = ["Look Good", "Feel Greater"];

export function Hero({ start }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Layered depth: interior drifts back, typography floats forward — a cinematic push-in
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const markersY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Feed the WebGL camera rig its scrubbed scroll position. */
  useMotionValueEvent(scrollYProgress, "change", (v) => setHeroScrollProgress(v));

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: start ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  });

  const [storyOpen, setStoryOpen] = useState(false);
  useEffect(() => {
    if (!storyOpen) return;
    lockBodyScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStoryOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [storyOpen]);

  /* Real WebGL layer — gated by capability probe, lazily imported. */
  const [webglOK, setWebglOK] = useState(false);
  useEffect(() => {
    setWebglOK(supportsWebGL());
  }, []);

  const tilt = useRef<HTMLDivElement>(null);
  const interactive = !isTouchDevice() && !prefersReducedMotion();
  const onTilt = (e: MouseEvent<HTMLDivElement>) => {
    const panel = tilt.current;
    if (!interactive || !panel) return;
    const rect = panel.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform = `perspective(1200px) rotateY(${px * 2.4}deg) rotateX(${-py * 1.6}deg)`;
  };
  const resetTilt = () => {
    if (tilt.current) tilt.current.style.transform = "perspective(1200px)";
  };

  return (
    <section
      ref={ref}
      id="home"
      data-parallax-root
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Layer 1 — salon interior (deepest plane) */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-[-6%]">
        <img
          src={imagery.heroMain}
          alt="LUXE salon interior glowing with warm champagne light"
          className="img-cinema h-full w-full animate-hero-zoom"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Layer 1.5 — real WebGL sculpture + gold dust (graceful fallback keeps photography only) */}
      {webglOK ? (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-[4]">
            <HeroScene3D hostRef={ref} />
          </div>
        </Suspense>
      ) : null}

      {/* Cinematic grading — dark, readable, never flat */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(8,7,6,0.9)]" />

      {/* Layer 2 — floating glass anchor panel, subtle pointer tilt */}
      <motion.div
        style={{ y: markersY }}
        className="absolute right-[4%] top-[16%] z-10 hidden xl:block"
      >
        <div ref={tilt} onMouseMove={onTilt} onMouseLeave={resetTilt} className="transition-transform duration-300 ease-out">
          <div className="glass noise relative w-[240px] overflow-hidden rounded-2xl p-4 shadow-card">
            <img
              src={imagery.heroAccent}
              alt="Champagne light through the salon"
              className="img-cinema h-32 w-full rounded-xl"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-3 text-center font-script text-lg leading-tight text-gold">
              {salonInfo.tagline}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Layer 3 — gold dust */}
      <Particles className="z-[5]" density={56} />

      {/* Layer 4 — typography */}
      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-20 w-full">
        <div className="container-luxe px-5 pb-32 pt-36 sm:px-8 md:pb-36 lg:px-12">
          <div className="max-w-[640px]">
            <motion.p {...enter(0.15)} className="eyebrow">
              Beauty Beyond Boundaries
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
                    {i === 1 ? (
                      <>
                        Feel{" "}
                        <span className="gold-text gold-text-shimmer italic">Greater</span>
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
              {salonInfo.tagline}
            </motion.p>

            <motion.div {...enter(1.0)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton variant="solid" arrow onClick={() => scrollToSection("#booking")}>
                Book Your Look
              </MagneticButton>
              <button
                onClick={() => setStoryOpen(true)}
                className="group inline-flex items-center gap-3 text-ivory transition-colors hover:text-gold-bright"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold shadow-[0_0_30px_-8px_rgba(201,164,92,0.7)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:bg-gold/10">
                  <Play className="h-4 w-4 translate-x-px fill-gold text-gold" strokeWidth={1.5} />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-wider2">Watch Our Story</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Script flourish */}
      <motion.div
        initial={{ opacity: 0, rotate: -8, y: 20 }}
        animate={start ? { opacity: 1, rotate: -6, y: 0 } : {}}
        transition={{ duration: 1.4, delay: 1.5, ease: EASE }}
        className="absolute right-[7%] top-[58%] z-20 hidden xl:block"
      >
        <ScriptText lines={["Self Care", "Looks Good On You"]} delay={0} />
      </motion.div>

      {/* Bottom marker rail */}
      <motion.div
        style={{ y: markersY, opacity: fade }}
        className="absolute inset-x-0 bottom-0 z-20 border-t border-gold/10 bg-primary/30 backdrop-blur-sm"
      >
        <div className="container-luxe grid grid-cols-2 gap-y-4 px-5 py-5 sm:px-8 md:grid-cols-4 lg:px-12">
          {heroMarkers.map((marker, i) => (
            <motion.div
              key={marker.index}
              {...enter(1.3 + i * 0.12)}
              className="flex items-baseline gap-3"
            >
              <span className="font-serif text-sm text-gold/80">{marker.index}</span>
              <span className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider2 text-ivory/90">
                  {marker.label}
                </span>
                <span className="h-px w-8 bg-gold/50" />
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        {...enter(1.6)}
        className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
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

      {/* Story video modal */}
      {storyOpen ? (
        <motion.div
          className={cn("fixed inset-0 z-[96] flex items-center justify-center p-4 sm:p-10")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="The LUXE story"
        >
          <div className="absolute inset-0 bg-primary/95 backdrop-blur-lg" onClick={() => setStoryOpen(false)} />
          <motion.div
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 w-full max-w-4xl"
          >
            <button
              onClick={() => setStoryOpen(false)}
              aria-label="Close story"
              className="glass absolute -top-14 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-2xl border border-gold/30 shadow-lift">
              <img
                src={imagery.aboutMain}
                alt="Inside the LUXE experience"
                className="img-cinema aspect-video w-full"
              />
              <div className="glass flex flex-wrap items-center justify-between gap-3 px-6 py-5">
                <div>
                  <p className="font-serif text-xl text-ivory">More Than a Salon</p>
                  <p className="mt-1 text-xs text-muted">A feeling, captured on film — coming soon.</p>
                </div>
                <button
                  onClick={() => {
                    setStoryOpen(false);
                    setTimeout(() => scrollToSection("#about"), 200);
                  }}
                  className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider2 text-gold transition-colors hover:text-gold-bright"
                >
                  Explore the Salon
                  <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}

      {/* Persistent mobile booking pill */}
      <motion.a
        href="#booking"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#booking");
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={start ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
        className="fixed bottom-5 right-5 z-[80] flex h-14 items-center gap-2 rounded-full bg-gold px-5 text-[12px] font-bold uppercase tracking-wider2 text-primary shadow-gold-glow sm:hidden"
        aria-label="Book appointment"
      >
        <CalendarCheck className="h-4 w-4" strokeWidth={2} />
        Book
      </motion.a>
    </section>
  );
}
