import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { offers, offerPerks } from "../data/luxe";
import { cn } from "../lib/utils";
import { scrollToSection } from "../lib/scroll";
import { LineIcon } from "./ui/LineIcon";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { MagneticButton } from "./ui/MagneticButton";

export function Offers() {
  const [showAll, setShowAll] = useState(false);
  const PREVIEW_COUNT = 4;
  const visibleOffers = showAll ? offers : offers.slice(0, PREVIEW_COUNT);

  return (
    <section id="offers" data-parallax-root className="relative overflow-hidden section-pad bg-secondary/40">
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Special Offers"
              title={
                <>
                  Exclusive <span className="gold-text italic">Offers</span>
                </>
              }
              description="Look Good. Feel Great. For Less."
            />
          </div>
          <Reveal delay={0.2} className="hidden lg:block">
            <ScriptText lines={["Self Care", "Looks Good", "On You"]} className="text-3xl" />
          </Reveal>
        </div>

        {/* Offer cards — editorial product cards, not ecommerce boxes */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
          {visibleOffers.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 0.09}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-secondary/90 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    loading="lazy"
                    decoding="async"
                    className="img-cinema h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-transparent to-transparent" />
                  {/* restrained discount badge */}
                  <span className="absolute right-3.5 top-3.5 rounded-lg border border-gold/40 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider2 text-gold backdrop-blur-sm">
                    {offer.discount}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-[17px] font-medium text-ivory">{offer.name}</h3>
                  <p className="mt-1.5 text-xs text-muted">{offer.tagline}</p>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-semibold text-gold">{offer.price}</span>
                      <span className="text-xs text-muted/70 line-through">{offer.was}</span>
                    </span>
                    <button
                      onClick={() => scrollToSection("#booking")}
                      aria-label={`Book ${offer.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-primary shadow-[0_8px_24px_-8px_rgba(201,164,92,0.8)] transition-all duration-300 group-hover:rotate-[-35deg] group-hover:bg-gold-bright"
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          </AnimatePresence>
        </div>

        {/* Perks strip */}
        <Reveal delay={0.2}>
          <div className="glass relative mt-12 grid gap-y-6 rounded-2xl px-7 py-7 shadow-card sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            {offerPerks.map((perk, i) => (
              <div
                key={perk.title}
                className={cn("flex items-center gap-4 lg:px-7", i > 0 && "lg:border-l lg:border-gold/12", i === 0 && "lg:pl-0")}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 hover:border-gold/70">
                  <LineIcon name={perk.icon} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ivory">{perk.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{perk.caption}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-12 flex justify-center">
          {showAll ? (
            <MagneticButton variant="outline" arrow onClick={() => setShowAll(false)}>
              Show Fewer Offers
            </MagneticButton>
          ) : (
            <MagneticButton
              variant="outline"
              arrow
              onClick={() => {
                setShowAll(true);
                // Wait one frame so the new cards exist before measuring scroll.
                requestAnimationFrame(() => scrollToSection("#offers"));
              }}
            >
              View All Offers
            </MagneticButton>
          )}
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-10 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-luxe text-gold/70">
            <span className="h-px w-14 bg-gold/40" />
            Beauty Has No Gender
            <span className="h-px w-14 bg-gold/40" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
