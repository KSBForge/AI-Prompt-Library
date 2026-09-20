import { imagery } from "../data/restaurant";
import { scrollToSection } from "../lib/scroll";
import { useGsapParallax } from "../hooks/useGsapParallax";
import { LineIcon } from "./ui/LineIcon";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";

const features = [
  { icon: "chef" as const, title: "Expert Chefs", caption: "Trained. Passionate. Creative." },
  { icon: "leaf" as const, title: "Fresh Ingredients", caption: "Locally sourced, seasonal, and pure." },
  { icon: "heart" as const, title: "Made With Love", caption: "Because great food starts with care." },
];

export function ChefSection() {
  const parallax = useGsapParallax<HTMLDivElement>(-64);

  return (
    <section data-parallax-root className="relative overflow-hidden section-pad bg-secondary/50">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[120px]" />

      <div className="container-luxe grid items-center gap-20 lg:grid-cols-2 lg:gap-16">
        {/* Chef imagery with layered depth */}
        <div className="relative order-2 mx-auto w-full max-w-[540px] lg:order-1" data-parallax-root>
          <div className="absolute -inset-4 -rotate-1 rounded-[28px] border border-gold/20" aria-hidden />
          <div ref={parallax} className="relative z-10 overflow-hidden rounded-[24px] shadow-lift">
            <img
              src={imagery.chefMain}
              alt="SAVORÉ chef carefully seasoning a plated dish"
              loading="lazy"
              decoding="async"
              className="img-cinema aspect-[4/5] w-full transition-transform duration-[1.8s] hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>

          {/* floating plate accent */}
          <div className="absolute -bottom-8 -right-4 z-20 h-32 w-32 animate-float-slow overflow-hidden rounded-full border-2 border-gold/50 shadow-lift sm:-right-8 sm:h-40 sm:w-40">
            <img src={imagery.chefPlate} alt="Plated signature dish" loading="lazy" className="img-cinema h-full w-full" />
          </div>

          <ScriptText
            lines={["Cooking Memories", "One Plate At A Time"]}
            className="absolute -top-12 right-2 z-30 text-right text-2xl sm:text-[26px]"
          />

          {/* floating glass philosophy card */}
          <Reveal delay={0.35} className="absolute -bottom-16 left-1/2 z-30 w-[min(440px,94%)] -translate-x-1/2 lg:-bottom-14 lg:left-2 lg:translate-x-0">
            <div className="glass-strong rounded-2xl p-6 shadow-lift">
              <p className="text-[10px] font-semibold uppercase tracking-luxe text-gold">Our Philosophy</p>
              <p className="mt-2.5 font-serif text-xl leading-snug text-ivory sm:text-[22px]">
                Simple Ingredients.
                <br />
                Extraordinary Flavours.
              </p>
              <button
                onClick={() => scrollToSection("#about")}
                className="group mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider2 text-gold transition-colors hover:text-gold-bright"
              >
                Discover Our Story
                <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <SectionHeading
            eyebrow="Our Chefs"
            title={
              <>
                Passion
                <br />
                Behind
                <br />
                <span className="gold-text italic">Every Plate</span>
              </>
            }
            description="At SAVORÉ, our chefs bring together years of experience, global inspiration, and a deep love for food. Every dish is a reflection of creativity, discipline, and an uncompromising commitment to quality."
          />

          <div className="mt-10 space-y-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={0.2 + i * 0.1}>
                <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-500 hover:border-gold/40 hover:bg-black/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:shadow-[0_0_26px_-6px_rgba(201,164,92,0.7)]">
                    <LineIcon name={feature.icon} />
                  </span>
                  <span>
                    <span className="block font-serif text-lg text-ivory">{feature.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{feature.caption}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <ScriptText lines={["Good Food,", "Happier People"]} className="mt-12 text-3xl" underline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
