import { cn } from "../../lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      {/* monogram L with diamond */}
      <path
        d="M12 7 v20 c0 3 2 4.5 5 4.5 h11"
        stroke="#C9A45C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M20 10.5 L23.5 14 L20 17.5 L16.5 14 Z" fill="#C9A45C" fillOpacity="0.9" />
      <path
        d="M10 33.5 h20"
        stroke="#C9A45C"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.65"
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
            "font-serif tracking-[0.3em] text-ivory",
            compact ? "text-lg" : "text-[22px] md:text-2xl",
          )}
        >
          LUXE
        </span>
        <span className="mt-1 text-[8px] font-semibold tracking-[0.42em] text-gold/90">
          UNISEX SALON
        </span>
      </span>
    </span>
  );
}
