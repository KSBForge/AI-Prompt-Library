import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand, salonInfo } from "../data/luxe";
import { scrollToSection } from "../lib/scroll";
import { Logo } from "./ui/Logo";
import { ScriptText } from "./ui/ScriptText";

const links: Array<{ label: string; target: string }> = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Services", target: "#services" },
  { label: "Gallery", target: "#gallery" },
  { label: "Offers", target: "#offers" },
  { label: "Contact", target: "#contact" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: salonInfo.social.instagram },
  { icon: Facebook, label: "Facebook", href: salonInfo.social.facebook },
  { icon: MessageCircle, label: "WhatsApp", href: salonInfo.social.whatsapp },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-gold/10 bg-[#050404]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_0.6fr_1fr_1.15fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Logo />
          <ScriptText lines={["Self Care", "Looks Good On You"]} className="mt-6 text-2xl" />
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
          <p className="mt-5 text-[11px] uppercase tracking-wider2 text-muted/70">#LUXEMoments</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Navigation</h4>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.target)}
                  className="group inline-flex items-center text-[13px] text-muted transition-colors duration-300 hover:text-gold-bright"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Contact</h4>
          <ul className="mt-5 space-y-3 text-[13px] text-muted">
            <li>
              <a href={salonInfo.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold-bright">
                <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                {salonInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${salonInfo.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-bright">
                <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                {salonInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
              {salonInfo.address}
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider2 text-ivory">Opening Hours</h4>
          <p className="mt-5 flex items-start gap-2 text-[13px] text-muted">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <span>
              <span className="block font-medium text-ivory">Mon – Sun</span>
              10:00 AM – 9:00 PM
            </span>
          </p>
          <p className="mt-3 text-[11px] text-muted/60">Last booking taken at 8:00 PM</p>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-black/30 px-6 py-5 text-center">
            <p className="font-script text-2xl text-gold">More Than a Salon</p>
            <p className="mt-2 text-[9px] font-semibold tracking-[0.5em] text-gold/70">{brand.sub}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[11px] text-muted/70">© 2026 LUXE Unisex Salon. All Rights Reserved.</p>
          <p className="text-[11px] text-muted/50">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
