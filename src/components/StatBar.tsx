import { brandStats } from "../data/restaurant";
import { Reveal } from "./ui/Reveal";
import { LineIcon } from "./ui/LineIcon";
import { ScriptText } from "./ui/ScriptText";

export function StatBar() {
  return (
    <section aria-label="Why guests love SAVORÉ" className="relative border-y border-gold/10 bg-secondary/80 backdrop-blur-sm">
      <div className="container-luxe flex items-stretch px-5 sm:px-8 lg:px-12">
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {brandStats.map((stat, i) => (
            <Reveal
              key={stat.title}
              delay={i * 0.09}
              className={
                "group flex items-center gap-4 border-gold/10 py-8 sm:py-9 lg:px-8 " +
                "border-b sm:border-b lg:border-b-0 " +
                (i % 2 === 1 ? "sm:border-l sm:pl-8 " : "") +
                (i > 0 ? "lg:border-l lg:pl-8 " : "lg:pl-0 ") +
                (i >= 2 ? "sm:border-t sm:border-gold/10 lg:border-t-0" : "")
              }
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-[0_0_24px_-6px_rgba(201,164,92,0.6)]">
                <LineIcon name={stat.icon} />
              </span>
              <span>
                <span className="block font-serif text-[17px] font-medium text-ivory">{stat.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">{stat.caption}</span>
              </span>
            </Reveal>
          ))}
        </div>

        <div className="hidden shrink-0 items-center pr-2 xl:flex">
          <ScriptText lines={["More Than", "Just Food"]} underline />
        </div>
      </div>
    </section>
  );
}
