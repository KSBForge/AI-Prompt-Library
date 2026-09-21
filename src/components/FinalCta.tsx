import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { finalCtaPillars, imagery } from "../data/luxe";
import { scrollToSection } from "../lib/scroll";
import { LineIcon } from "./ui/LineIcon";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Slow cinematic camera push while the section crosses the viewport
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} id="transform" data-parallax-root className="relative overflow-hidden">
      {/* Full-bleed photography with parallax depth */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-[-8%]">
        <img
          src={imagery.finalCta}
          alt="LUXE stylist finishing a client's look under warm salon light"
          loading="lazy"
          decoding="async"
          className="img-cinema h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />

      <motion.div style={{ y: contentY }} className="relative">
        <div className="container-luxe px-5 py-32 sm:px-8 md:py-40 lg:px-12">
          <div className="max-w-[640px]">
            <Reveal>
              <span className="eyebrow">Transform Your Look</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-lg mt-5">
                Confidence
                <br />
                Looks Good <span className="gold-text italic">On You</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 font-serif text-lg text-ivory/90 md:text-xl">
                Expert Care. Modern Styles. A Better You.
              </p>
            </Reveal>

            {/* benefit markers */}
            <Reveal delay={0.22}>
              <div className="mt-10 grid max-w-md grid-cols-4 divide-x divide-gold/15">
                {finalCtaPillars.map((pillar) => (
                  <div key={pillar.title} className="flex flex-col items-center gap-2 px-1 text-center">
                    <LineIcon name={pillar.icon} className="h-6 w-6 text-gold" />
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider2 leading-snug text-ivory/85">
                      {pillar.title}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-11">
                <MagneticButton variant="solid" arrow onClick={() => scrollToSection("#booking")} className="px-10 py-4.5">
                  Book Your Appointment
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      {/* bottom meta strip — mirrors the reference deck */}
      <div className="relative border-t border-gold/12 bg-primary/55 backdrop-blur-md">
        <div className="container-luxe flex flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-5 sm:px-8 lg:px-12">
          <span className="text-[11px] font-semibold uppercase tracking-wider2 text-ivory/85">
            <span className="font-serif text-base text-gold">4.9/5</span> · Average Rating
          </span>
          <span className="hidden items-center gap-2 text-[11px] uppercase tracking-wider2 text-muted sm:flex">
            Trusted by many · Jaipur, Rajasthan
          </span>
          <ScriptText lines={["More Than a Salon"]} className="text-2xl" />
        </div>
      </div>
    </section>
  );
}
