import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <span className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="heading-lg mt-5 text-balance">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
