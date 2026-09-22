import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { restaurantInfo } from "../data/restaurant";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Contact() {
  const cards = [
    {
      icon: MapPin,
      title: "Our Location",
      lines: [restaurantInfo.address],
      href: restaurantInfo.directions,
      external: true,
    },
    {
      icon: Clock,
      title: "Opening Hours",
      lines: ["Mon – Sun", "11:00 AM – 11:00 PM"],
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: [restaurantInfo.phone],
      href: `tel:${restaurantInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [restaurantInfo.email],
      href: `mailto:${restaurantInfo.email}`,
    },
  ];

  return (
    <section id="contact" data-parallax-root className="section-pad">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Find Your Way
                <br />
                to <span className="gold-text italic">SAVORÉ</span>
              </>
            }
            description="Walk in for a candlelit evening, call ahead for the chef's table, or write to us — every message is answered with the same warmth we plate."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {cards.map((card, i) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:shadow-[0_0_24px_-6px_rgba(201,164,92,0.8)]">
                    <card.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ivory">{card.title}</span>
                    {card.lines.map((line) => (
                      <span key={line} className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              );
              return (
                <Reveal key={card.title} delay={0.15 + i * 0.08}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noreferrer" : undefined}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 hover:border-gold/30 hover:bg-gold/[0.04]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider2 text-primary shadow-gold-glow transition-all duration-400 hover:bg-gold-bright"
              >
                <Phone className="h-4 w-4" strokeWidth={2} />
                Call Now
              </a>
              <a
                href={`https://wa.me/${restaurantInfo.whatsapp}?text=${encodeURIComponent("Hello SAVORÉ! I'd like to enquire about a reservation.")}`}
                target="_blank"
                rel="noreferrer"
                className="thin-gold-border inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider2 text-ivory transition-all duration-400 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-bright"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                WhatsApp
              </a>
              <a
                href={restaurantInfo.directions}
                target="_blank"
                rel="noreferrer"
                className="thin-gold-border inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider2 text-ivory transition-all duration-400 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-bright"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.7} />
                Directions
              </a>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.2}>
          <div className="group relative overflow-hidden rounded-[26px] border border-gold/25 shadow-lift">
            <iframe
              title="SAVORÉ Restaurant location — Jaipur"
              src={restaurantInfo.mapEmbed}
              className="dark-map h-[420px] w-full lg:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/5" />
            <div className="glass absolute bottom-5 left-5 flex items-center gap-3 rounded-full px-5 py-2.5">
              <MapPin className="h-4 w-4 text-gold" strokeWidth={1.7} />
              <span className="text-xs font-semibold text-ivory">SAVORÉ · 123 Food Street, Jaipur</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
