import { imagery } from "../data/restaurant";
import { useGsapParallax } from "../hooks/useGsapParallax";
import { LineIcon } from "./ui/LineIcon";
import { LogoMark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";

const chips = [
  { icon: "leaf" as const, label: "Fresh Ingredients" },
  { icon: "chef" as const, label: "Expert Chefs" },
  { icon: "heart" as const, label: "Memorable Experiences" },
];

export function About() {
  const mainParallax = useGsapParallax<HTMLDivElement>(-56);
  const accentParallax = useGsapParallax<HTMLDivElement>(-104);

  return (
    <section id="about" data-parallax-root className="relative overflow-hidden section-pad">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Story */}
        <div>
          <SectionHeading
            eyebrow="Our Story"
            title={
              <>
                More Than{" "}
                <span className="gold-text italic">Just Food</span>
              </>
            }
          />

          <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted md:text-base">
            <Reveal delay={0.2}>
              <p>
                At SAVORÉ, we believe food is more than a meal — it's a feeling. Our journey began
                with a simple idea: to bring people together through exceptional food, warm
                hospitality, and unforgettable experiences.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Every dish we create is inspired by fresh ingredients, time-honoured recipes, and a
                passion for great taste. Whether it's a quiet dinner, a celebration, or a casual
                get-together, SAVORÉ is your place to make memories over remarkable food.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium text-ivory/90 transition-colors duration-300 hover:border-gold/40"
                >
                  <LineIcon name={chip.icon} className="h-4 w-4 text-gold" />
                  {chip.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <ScriptText lines={["Good Food", "Brings People Together"]} underline className="mt-12 text-3xl md:text-4xl" />
          </Reveal>
        </div>

        {/* Layered image composition */}
        <div className="relative mx-auto w-full max-w-[560px]" data-parallax-root>
          <div className="absolute -inset-4 rounded-[28px] border border-gold/20" aria-hidden />
          <div className="absolute -inset-4 translate-x-5 translate-y-5 rounded-[28px] border border-gold/10" aria-hidden />

          <div ref={mainParallax} className="relative z-10 overflow-hidden rounded-[24px] shadow-lift">
            <img
              src={imagery.aboutMain}
              alt="Chef plating a signature SAVORÉ dish"
              loading="lazy"
              decoding="async"
              className="img-cinema aspect-[4/5] w-full transition-transform duration-[1.8s] hover:scale-[1.04] sm:aspect-[5/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </div>

          {/* overlapping accent photo — appears in front of the background */}
          <div
            ref={accentParallax}
            className="absolute -bottom-10 -left-6 z-20 w-40 overflow-hidden rounded-2xl border border-gold/30 shadow-lift sm:-left-12 sm:w-52"
          >
            <img
              src={imagery.aboutAccent}
              alt="Candle-lit table set for dinner"
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

          <ScriptText
            lines={["Crafted With Passion", "Served With Love"]}
            className="absolute -bottom-14 right-0 z-30 text-right text-2xl sm:text-[28px]"
            underline
          />
        </div>
      </div>
    </section>
  );
}
