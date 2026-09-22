import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { menuItems } from "../data/restaurant";
import { cn, formatINR } from "../lib/utils";
import { lockBodyScroll, unlockBodyScroll } from "../lib/scroll";
import { EASE } from "./ui/Reveal";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/** Search dispatches a global event that the menu section listens to. */
export function openDish(id: string) {
  window.dispatchEvent(new CustomEvent("savore:open-dish", { detail: { id } }));
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      lockBodyScroll();
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => {
        clearTimeout(t);
        unlockBodyScroll();
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menuItems.slice(0, 4);
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badges.some((b) => b.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-24 md:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search the menu"
        >
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lift"
            initial={{ y: 26, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center gap-3 border-b border-gold/15 px-5 py-4">
              <Search className="h-[18px] w-[18px] text-gold" strokeWidth={1.8} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "Enter" && results[0]) {
                    onClose();
                    openDish(results[0].id);
                  }
                }}
                placeholder="Search dishes — try “truffle” or “lamb”…"
                className="w-full bg-transparent text-[15px] text-ivory placeholder:text-muted/50 outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[46vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted">
                  Nothing found — perhaps try <span className="text-gold">salmon</span> or{" "}
                  <span className="text-gold">tiramisu</span>.
                </p>
              ) : (
                results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onClose();
                      openDish(item.id);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors",
                      "hover:bg-gold/[0.07]",
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-lg object-cover ring-1 ring-gold/25"
                    />
                    <span className="flex-1">
                      <span className="block font-serif text-[15px] text-ivory">{item.name}</span>
                      <span className="block truncate text-xs text-muted">{item.description}</span>
                    </span>
                    <span className="text-sm font-semibold text-gold">{formatINR(item.price)}</span>
                    <ArrowUpRight className="h-4 w-4 text-gold/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </button>
                ))
              )}
            </div>
            <div className="gold-hairline" />
            <p className="px-5 py-3 text-center text-[10px] uppercase tracking-luxe text-muted/70">
              Press Enter to open the first match · Esc to close
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
