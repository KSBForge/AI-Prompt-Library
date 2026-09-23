import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { salonInfo } from "../data/luxe";
import { cn } from "../lib/utils";
import { scrollToSection } from "../lib/scroll";
import { Logo } from "./ui/Logo";
import { EASE } from "./ui/Reveal";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "offers", label: "Offers" },
  { id: "contact", label: "Contact" },
  { id: "booking", label: "Booking" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]["id"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: champagne underline follows the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: SectionId) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(`#${id}`), menuOpen ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.9, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled
            ? "border-b border-gold/10 bg-primary/70 py-3 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <div className="container-luxe flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <button onClick={() => go("home")} aria-label="LUXE — back to top" className="shrink-0">
            <Logo compact={scrolled} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={cn(
                  "group relative py-1 text-[13px] font-medium tracking-wide transition-colors duration-300",
                  active === id ? "text-gold" : "text-ivory/80 hover:text-ivory",
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500",
                    active === id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60",
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-4">
            <button
              onClick={() => go("booking")}
              className="group hidden items-center gap-2 rounded-full thin-gold-border bg-black/20 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider2 text-ivory backdrop-blur-sm transition-all duration-500 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-bright sm:flex"
            >
              <CalendarCheck className="h-4 w-4 text-gold transition-colors group-hover:text-gold-bright" strokeWidth={1.7} />
              Book Appointment
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full thin-gold-border bg-black/30 text-ivory backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-primary/92 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-1 px-8 pt-20">
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: EASE }}
                  className={cn(
                    "group flex items-baseline gap-4 py-2.5 font-serif text-[34px] transition-colors",
                    active === id ? "text-gold" : "text-ivory hover:text-gold-bright",
                  )}
                >
                  <span className="font-sans text-[10px] tracking-luxe text-gold/50">
                    0{i + 1}
                  </span>
                  {label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => go("booking")}
                  className="rounded-full bg-gold px-9 py-4 text-[13px] font-bold uppercase tracking-wider2 text-primary shadow-gold-glow"
                >
                  Book Appointment →
                </button>
                <a
                  href={salonInfo.phoneHref}
                  className="mt-2 flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5" /> {salonInfo.phone}
                </a>
              </motion.div>
            </div>
            <p className="pb-8 text-center font-script text-2xl text-gold/80">
              Self Care Looks Good On You
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
