import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: EASE },
  }),
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

/** Elegant viewport-triggered reveal used across every section. */
export function Reveal({ children, delay = 0, className, once = true, amount = 0.25 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px", amount }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
