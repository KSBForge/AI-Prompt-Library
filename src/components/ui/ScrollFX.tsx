import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Thin gold reading-progress line pinned under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-gold/50 via-gold to-gold-bright"
    />
  );
}

/** Soft champagne glow that trails the cursor (pointer-fine devices only). */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[2] h-[420px] w-[420px] rounded-full opacity-40 mix-blend-screen"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(232,199,122,0.10) 0%, rgba(201,164,92,0.05) 38%, transparent 70%)",
        transition: "left 0.28s cubic-bezier(0.22,1,0.36,1), top 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}
