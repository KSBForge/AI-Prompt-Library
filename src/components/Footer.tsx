import {
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Loader2,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { restaurantInfo } from "../data/restaurant";
import { subscribeNewsletter } from "../lib/api";
import { cn } from "../lib/utils";
import { scrollToSection } from "../lib/scroll";
import { Logo } from "./ui/Logo";
import { ScriptText } from "./ui/ScriptText";

const links: Array<{ label: string; target: string }> = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Menu", target: "#menu" },
  { label: "Gallery", target: "#gallery" },
  { label: "Reservation", target: "#reservation" },
  { label: "Contact", target: "#contact" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: restaurantInfo.social.instagram },
  { icon: Facebook, label: "Facebook", href: restaurantInfo.social.facebook },
  { icon: Youtube, label: "YouTube", href: restaurantInfo.social.youtube },
  { icon: MapPin, label: "Google Maps", href: restaurantInfo.directions },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("busy");
    const ok = await subscribeNewsletter(email.trim());
    setStatus(ok ? "done" : "error");
    if (ok) setEmail("");
  }

  return (
    <footer className="relative border-t border-gold/10 bg-[#050404]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_0.6fr_0.9fr_1.15fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Logo />
          <ScriptText lines={["Food Brings", "People Together"]} className="mt-6 text-2xl" />
          <div className="mt-7 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-400 hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/10 hover:shadow-[0_8px_24px_-8px_rgba(201,164,92,0.8)]"
              >
                <social.icon className="h-4 w-4" strokeWidth={1.6} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-wider2 text-muted/70">#SAVORÉMoments</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Quick Links</h4>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.target)}
                  className="group inline-flex items-center gap-0 text-[13px] text-muted transition-colors duration-300 hover:text-gold-bright"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours + location */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Opening Hours</h4>
          <p className="mt-5 text-[13px] font-medium text-ivory">Mon – Sun</p>
          <p className="text-[13px] text-muted">11:00 AM – 11:00 PM</p>
          <p className="mt-2 text-[11px] text-muted/60">Kitchen takes last orders at 10:30 PM</p>

          <h4 className="mt-8 text-[12px] font-bold uppercase tracking-wider2 text-ivory">Location</h4>
          <p className="mt-4 flex items-start gap-2 text-[13px] text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            {restaurantInfo.address}
          </p>
          <a
            href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-gold-bright"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            {restaurantInfo.phone}
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Subscribe</h4>
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            Get the latest updates, special offers and events straight to your inbox.
          </p>
          {status === "done" ? (
            <div className="mt-5 flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-3.5">
              <Check className="h-4 w-4 text-gold" strokeWidth={2.2} />
              <p className="text-[12px] font-medium text-gold-bright">Welcome to the table — you're on the list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate className="mt-5">
              <div
                className={cn(
                  "flex items-center overflow-hidden rounded-full border transition-colors duration-400",
                  status === "error"
                    ? "border-[#e08a7a]/70"
                    : "border-gold/25 focus-within:border-gold/60"
                )}
              >
                <input
                  type="email"
                  inputMode="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-label="Email address for newsletter"
                  className="w-full bg-transparent px-5 py-3.5 text-[13px] text-ivory placeholder:text-muted/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "busy"}
                  aria-label="Subscribe to newsletter"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-primary transition-all duration-400 hover:bg-gold-bright disabled:opacity-70"
                >
                  {status === "busy" ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                  ) : (
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  )}
                </button>
              </div>
              {status === "error" ? (
                <p role="alert" className="mt-2 pl-2 text-[11px] text-[#e08a7a]">
                  Please enter a valid email address.
                </p>
              ) : null}
            </form>
          )}
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-luxe text-gold/60">
            Good Food · Good People · Great Memories
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[11px] text-muted/70">© 2026 SAVORÉ Restaurant. All Rights Reserved.</p>
          <p className="text-[11px] text-muted/50">Crafted with passion, served with love.</p>
        </div>
      </div>
    </footer>
  );
}
