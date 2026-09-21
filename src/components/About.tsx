import { imagery, aboutBenefits, stats } from "../data/luxe";
import { useGsapParallax } from "../hooks/useGsapParallax";
import { LineIcon } from "./ui/LineIcon";
import { LogoMark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { KpiStrip } from "./ui/KpiStrip";

export function About() {
  const mainParallax = useGsapParallax<HTMLDivElement>(-56);
  const accentParallax = useGsapParallax<HTMLDivElement>(-104);

  return (
    <section id="about" data-parallax-root className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Typography / content — LEFT */}
        <div>
          <SectionHeading
            eyebrow="About Us"
            title={
              <>
                More Than
                <br />a <span className="gold-text italic">Salon</span>
              </>
            }
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-ivory/90 md:text-2xl">
              A space where style, self-care and confidence come together.
            </p>
          </Reveal>

          <div className="mt-6 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted md:text-base">
            <Reveal delay={0.28}>
              <p>
                At LUXE, we believe beauty has no boundaries. Our unisex salon is designed to make
                everyone feel comfortable, confident and cared for — with expert stylists, premium
                products and a personalized approach that brings out the best version of you.
              </p>
            </Reveal>
          </div>

          {/* Four elegant benefit indicators */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {aboutBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={0.3 + i * 0.09}>
                <div className="group flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold/80 group-hover:shadow-[0_0_28px_-6px_rgba(201,164,92,0.7)]">
                    <LineIcon name={benefit.icon} />
                  </span>
                  <span className="mt-3 text-[13px] font-semibold leading-snug text-ivory">
                    {benefit.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                    {benefit.caption}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Premium statistics strip */}
          <Reveal delay={0.5}>
            <KpiStrip stats={stats} className="mt-12" />
          </Reveal>

          <Reveal delay={0.55}>
            <ScriptText
              lines={["More Than a Salon,", "A Feeling"]}
              underline
              className="mt-12 text-3xl md:text-4xl"
            />
          </Reveal>
        </div>

        {/* Immersive photography — RIGHT */}
        <div className="relative mx-auto w-full max-w-[560px]" data-parallax-root>
          <div className="absolute -inset-4 rounded-[28px] border border-gold/20" aria-hidden />
          <div className="absolute -inset-4 translate-x-5 translate-y-5 rounded-[28px] border border-gold/10" aria-hidden />

          <div ref={mainParallax} className="relative z-10 overflow-hidden rounded-[24px] shadow-lift">
            <img
              src={imagery.aboutMain}
              alt="LUXE stylist styling a client's hair in the warm salon light"
              loading="lazy"
              decoding="async"
              className="img-cinema aspect-[4/5] w-full transition-transform duration-[1.8s] hover:scale-[1.04] sm:aspect-[5/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            {/* script overlay echoing the reference wall art */}
            <div className="absolute bottom-5 right-5 text-right font-script text-2xl leading-tight text-gold/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              Self Care
              <br />
              Looks Good On You
            </div>
          </div>

          {/* overlapping accent photo */}
          <div
            ref={accentParallax}
            className="absolute -bottom-10 -left-6 z-20 w-40 overflow-hidden rounded-2xl border border-gold/30 shadow-lift sm:-left-12 sm:w-52"
          >
            <img
              src={imagery.aboutAccent}
              alt="Glow mirrors and styling chair inside LUXE"
              loading="lazy"
              decoding="async"
              className="img-cinema aspect-square w-full"
            />
          </div>

          {/* floating glass badge */}
          <div className="glass absolute -top-7 left-4 z-30 flex animate-float-slow items-center gap-2.5 rounded-full px-5 py-2.5 shadow-card sm:left-8">
            <LogoMark className="h-5 w-5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider2 text-ivory/90">
              Since 2016 · Jaipur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
