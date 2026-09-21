import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useCountUp } from "../../hooks/useCountUp";
import { cn } from "../../lib/utils";
import { LineIcon, type LineIconName } from "./LineIcon";
import { Reveal } from "./Reveal";

export interface StripStat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  icon: LineIconName;
}

function StatCell({
  stat,
  active,
  index,
  className,
}: {
  stat: StripStat;
  active: boolean;
  index: number;
  className?: string;
}) {
  const value = useCountUp(stat.value, active, 1900 + index * 150, stat.decimals ?? 0);
  const display = stat.decimals ? value.toFixed(stat.decimals) : Math.round(value).toString();

  return (
    <Reveal delay={index * 0.09} className={className}>
      <div className="group flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-[0_0_24px_-6px_rgba(201,164,92,0.6)]">
          <LineIcon name={stat.icon} />
        </span>
        <span>
          <span className="block font-serif text-xl text-ivory md:text-2xl">
            {display}
            {stat.suffix ? <span className="text-gold-bright">{stat.suffix}</span> : null}
          </span>
          <span className="mt-0.5 block text-[11px] tracking-wide text-muted">{stat.label}</span>
        </span>
      </div>
    </Reveal>
  );
}

interface KpiStripProps {
  stats: StripStat[];
  trailing?: ReactNode;
  className?: string;
}

/** Dark glass statistics strip with hairline dividers — reused across sections. */
export function KpiStrip({ stats, trailing, className }: KpiStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div
      ref={ref}
      className={cn(
        "glass relative flex flex-col items-stretch gap-6 rounded-2xl px-7 py-6 shadow-card sm:px-9 lg:flex-row lg:items-center lg:gap-0",
        className,
      )}
    >
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div
        className={cn(
          "grid flex-1 gap-y-6",
          stats.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {stats.map((stat, i) => (
          <StatCell
            key={stat.label}
            stat={stat}
            active={inView}
            index={i}
            className={cn("lg:px-8", i > 0 && "lg:border-l lg:border-gold/12", i === 0 && "lg:pl-0")}
          />
        ))}
      </div>
      {trailing ? (
        <div className="shrink-0 border-t border-gold/12 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
