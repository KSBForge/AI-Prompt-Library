import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export function Stars({ rating, className, size = 13 }: { rating: number; className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            "transition-colors",
            i < Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-gold/30",
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
