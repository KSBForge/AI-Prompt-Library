import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { lockBodyScroll, unlockBodyScroll } from "../lib/scroll";
import { LogoMark } from "./ui/Logo";

const letters = "LUXE".split("");

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    lockBodyScroll();
    const start = performance.now();
    const duration = 1750;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setTimeout(onDone, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      unlockBodyScroll();
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <LogoMark className="h-14 w-14 text-gold" />
      </motion.div>

      <h1 className="mt-8 flex overflow-hidden font-serif text-5xl tracking-[0.3em] text-ivory sm:text-6xl" aria-label="LUXE">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-px w-44 origin-center bg-gold/60"
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.95 }}
        className="mt-6 text-center font-script text-xl text-gold/85"
      >
        Beauty Beyond Boundaries.
      </motion.p>

      <div className="absolute bottom-12 flex w-56 flex-col items-center gap-3">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold-bright"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted/70">{progress}% · UNISEX SALON</p>
      </div>
    </motion.div>
  );
}
