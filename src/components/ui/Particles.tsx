import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "../../lib/utils";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
  twinkle: number;
}

/**
 * Floating gold dust — a single lightweight 2D canvas (no WebGL cost).
 * Pauses when off-screen or when the tab is hidden, and renders a static
 * sprinkle when the visitor prefers reduced motion.
 */
export function Particles({ className, density = 60 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let inView = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    const seed = () => {
      particles.length = 0;
      const count = Math.min(density, Math.max(24, Math.floor((width * height) / 26000)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.5 + Math.random() * 1.5,
          vy: -(0.06 + Math.random() * 0.28),
          drift: 0.2 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.14 + Math.random() * 0.5,
          twinkle: 0.5 + Math.random() * 1.6,
        });
      }
    };

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const flicker = 0.55 + 0.45 * Math.sin(t * 0.001 * p.twinkle + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 199, 122, ${(p.alpha * flicker).toFixed(3)})`;
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) drawFrame(0); // one static frame
    };

    let last = 0;
    const loop = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (!inView || document.hidden) return;
      if (t - last < 33) return; // ~30fps is plenty for dust
      last = t;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += Math.sin(t * 0.0006 * p.drift + p.phase) * 0.18;
        if (p.y < -6) {
          p.y = height + 6;
          p.x = Math.random() * width;
        }
        if (p.x < -6) p.x = width + 6;
        else if (p.x > width + 6) p.x = -6;
        const flicker = 0.55 + 0.45 * Math.sin(t * 0.001 * p.twinkle + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 199, 122, ${(p.alpha * flicker).toFixed(3)})`;
        ctx.fill();
      }
    };

    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
