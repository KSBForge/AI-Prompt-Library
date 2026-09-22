import { cn } from "../../lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      {/* laurel mark */}
      <path
        d="M20 34 C 20 22, 20 14, 20 6"
        stroke="#C9A45C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M20 12 C 15 11, 11.5 8, 10.5 4.5 C 15 5, 18.5 8, 20 12 Z"
        fill="#C9A45C"
        fillOpacity="0.9"
      />
      <path
        d="M20 12 C 25 11, 28.5 8, 29.5 4.5 C 25 5, 21.5 8, 20 12 Z"
        fill="#C9A45C"
        fillOpacity="0.9"
      />
      <path
        d="M20 20 C 14.5 19, 10.5 15.5, 9.5 11 C 14.5 12, 18.5 15.5, 20 20 Z"
        fill="#C9A45C"
        fillOpacity="0.55"
      />
      <path
        d="M20 20 C 25.5 19, 29.5 15.5, 30.5 11 C 25.5 12, 21.5 15.5, 20 20 Z"
        fill="#C9A45C"
        fillOpacity="0.55"
      />
      <path
        d="M8 30 C 12 28, 16 28, 20 30 C 24 28, 28 28, 32 30"
        stroke="#C9A45C"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={compact ? "h-6 w-6" : "h-8 w-8"} />
      <span className="flex flex-col items-center leading-none">
        <span
          className={cn(
            "font-serif tracking-[0.22em] text-ivory",
            compact ? "text-lg" : "text-[22px] md:text-2xl",
          )}
        >
          SAVORÉ
        </span>
        <span className="mt-1 text-[8.5px] font-semibold tracking-[0.5em] text-gold/90">
          RESTAURANT
        </span>
      </span>
    </span>
  );
}
