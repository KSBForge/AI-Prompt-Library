import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE } from "./Reveal";

interface ScriptTextProps {
  lines: string[];
  className?: string;
  underline?: boolean;
  delay?: number;
  as?: "div" | "span";
}

/** Handwritten decorative phrase, revealed line by line with a gold flourish. */
export function ScriptText({ lines, className, underline = false, delay = 0.2 }: ScriptTextProps) {
  return (
    <div className={cn("pointer-events-none select-none font-script leading-[1.15] text-gold", className)} aria-hidden>
      {lines.map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, y: 14, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: delay + i * 0.18, ease: EASE }}
          className="drop-shadow-[0_2px_18px_rgba(201,164,92,0.25)]"
        >
          {line}
        </motion.div>
      ))}
      {underline ? (
        <motion.svg
          width="120"
          height="14"
          viewBox="0 0 120 14"
          fill="none"
          className="mt-1 opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + lines.length * 0.18 + 0.2 }}
        >
          <motion.path
            d="M2 10 C 30 4, 70 12, 118 6"
            stroke="#C9A45C"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: delay + lines.length * 0.18 + 0.35, ease: "easeInOut" }}
          />
        </motion.svg>
      ) : null}
    </div>
  );
}
