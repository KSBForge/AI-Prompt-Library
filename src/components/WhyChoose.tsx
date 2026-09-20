import { useInView } from "framer-motion";
import { useRef } from "react";
import { imagery, kpis } from "../data/restaurant";
import { useCountUp } from "../hooks/useCountUp";
import { cn } from "../lib/utils";
import { LineIcon } from "./ui/LineIcon";
import { LogoMark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";

function KpiCard({ kpi, active, index }: { kpi: (typeof kpis)[number]; active: boolean; index: number }) {
  const value = useCountUp(kpi.value, active, 1900 + index * 150, kpi.decimals ?? 0);
  const display = kpi.decimals ? value.toFixed(kpi.decimals) : Math.round(value).toString();

  return (
    <Reveal delay={0.15 + index * 0.1}>
      <div className="group">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_28px_-6px_rgba(201,164,92,0.7)]">
          <LineIcon name={kpi.icon} />
        </span>
        <p className="mt-4 font-serif text-4xl text-ivory md:text-[44px]">
          {display}
          {kpi.suffix ? <span className="text-gold-bright">{kpi.suffix}</span> : null}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-ivory/90">{kpi.label}</p>
        <p className="mt-1 text-xs text-muted">{kpi.caption}</p>
      </div>
    </Reveal>
  );
}

export function WhyChoose() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-120px" });

  return (
    <section data-parallax-root className="relative overflow-hidden">
      {/* restaurant interior behind the content */}
      <div className="absolute inset-0">
        <img
          src={imagery.whyBackground}
          alt="SAVORÉ dining room glowing with warm light"
          loading="lazy"
          decoding="async"
          className="img-cinema h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/70" />
      </div>

      <div className="container-luxe relative section-pad">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Why Choose Us</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-lg mt-5">
                More Than
                <br />
                <span className="gold-text italic">Just a Meal</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted md:text-base">
                At SAVORÉ, we believe dining is not just about food, but about the people, the
                moments, and the memories that stay with you forever.
              </p>
            </Reveal>

            <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
              {kpis.map((kpi, i) => (
                <KpiCard key={kpi.label} kpi={kpi} active={statsInView} index={i} />
              ))}
            </div>

            <Reveal delay={0.55}>
              <ScriptText lines={["Good Food Brings", "People Together"]} className="mt-14 text-3xl" underline />
            </Reveal>
          </div>

          {/* glass brand panel — the lit SAVORÉ wall from the photographs */}
          <Reveal delay={0.25} className="hidden lg:block">
            <div className="glass-strong relative mx-auto max-w-[360px] rounded-[28px] px-10 py-14 text-center shadow-lift">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <LogoMark className="mx-auto h-10 w-10" />
              <p className="mt-5 font-serif text-[26px] tracking-[0.18em] text-ivory">SAVORÉ</p>
              <p className="mt-2 text-[9px] font-semibold tracking-[0.5em] text-gold">RESTAURANT</p>
              <div className="gold-hairline my-8" />
              <p className="space-y-2 text-[12px] font-semibold tracking-luxe leading-loose text-gold/90">
                <span className="block">GOOD FOOD</span>
                <span className="block">GOOD PEOPLE</span>
                <span className="block">GREAT MEMORIES</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
