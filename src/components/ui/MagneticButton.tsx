import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { cn, isTouchDevice, prefersReducedMotion } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "solid" | "outline" | "ghost";
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[13px] font-semibold uppercase tracking-wider2 transition-all duration-500 will-change-transform";

const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  solid:
    "bg-gold px-8 py-4 text-primary shadow-gold-glow hover:bg-gold-bright hover:shadow-[0_0_0_1px_rgba(232,199,122,.6),0_22px_70px_-16px_rgba(201,164,92,.55)]",
  outline:
    "thin-gold-border bg-black/20 px-8 py-4 text-ivory backdrop-blur-sm hover:border-gold/70 hover:bg-gold/10 hover:text-gold-bright",
  ghost: "px-2 py-1 text-gold hover:text-gold-bright",
};

/** Premium magnetic CTA — gently follows the cursor on desktop. */
export function MagneticButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = "solid",
  arrow = false,
  className,
  ariaLabel,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 15, mass: 0.25 });
  const sy = useSpring(my, { stiffness: 160, damping: 15, mass: 0.25 });

  const interactive = !isTouchDevice() && !prefersReducedMotion();

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const inner = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={2.2} />
      ) : null}
    </>
  );

  const cls = cn(base, variants[variant], disabled && "pointer-events-none opacity-60", className);

  const motionProps = {
    style: interactive ? { x: sx, y: sy } : undefined,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={cls}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} aria-label={ariaLabel} disabled={disabled} className={cls} {...motionProps}>
      {inner}
    </motion.button>
  );
}
