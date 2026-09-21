import { imagery, productPillars, productBrands, products } from "../data/luxe";
import { useGsapParallax } from "../hooks/useGsapParallax";
import { LineIcon } from "./ui/LineIcon";
import { Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";
import { MagneticButton } from "./ui/MagneticButton";
import { scrollToSection } from "../lib/scroll";

export function Products() {
  const parallax = useGsapParallax<HTMLDivElement>(-64);

  return (
    <section id="products" data-parallax-root className="relative overflow-hidden">
      {/* Editorial photography backdrop */}
      <div className="absolute inset-0">
        <img
          src={imagery.productsMain}
          alt="Premium salon products styled on marble with warm mirror light"
          loading="lazy"
          decoding="async"
          className="img-cinema h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/60" />
      </div>

      <div className="container-luxe relative section-pad">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy — LEFT */}
          <div>
            <SectionHeading
              eyebrow="Premium Products"
              title={
                <>
                  Only The Best
                  <br />
                  For Your <span className="gold-text italic">Care</span>
                </>
              }
              description="We use premium, dermatologist-approved products to give you safe, effective and long-lasting results."
            />

            <Reveal delay={0.25}>
              <p className="mt-6 font-serif text-lg italic text-gold">Trusted. Tested. Loved.</p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <MagneticButton variant="solid" arrow onClick={() => scrollToSection("#booking")}>
                  Book a Consultation
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <ScriptText lines={["Care Looks", "Good On You"]} underline className="mt-12 text-3xl" />
            </Reveal>
          </div>

          {/* Floating glass brand panel — RIGHT, subtle parallax depth */}
          <div ref={parallax} className="relative hidden justify-self-end lg:block">
            <div className="glass-strong relative w-[340px] rounded-[28px] px-10 py-12 text-center shadow-lift">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-luxe text-gold">In The Spotlight</p>
              <p className="mt-5 font-serif text-[26px] leading-snug text-ivory">
                The Rituals
                <br />
                Behind The Glow
              </p>
              <div className="gold-hairline my-7" />
              <p className="text-[12px] font-semibold leading-loose tracking-luxe text-gold/90">
                <span className="block">KERATIN THERAPY</span>
                <span className="block">GLOW FACIALS</span>
                <span className="block">SCALP DETOX</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product shelf — editorial cards, hover reveals price + add-to-ritual CTA */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.07}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-secondary/90 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="img-cinema h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-transparent to-transparent" />
                  {product.badge ? (
                    <span className="absolute left-3 top-3 rounded-md border border-gold/40 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider2 text-gold backdrop-blur-sm">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-wider2 text-gold/80">{product.category}</p>
                  <h3 className="mt-1.5 font-serif text-[15px] font-medium leading-snug text-ivory">{product.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-serif text-lg font-semibold text-gold">{product.price}</span>
                    <button
                      onClick={() => scrollToSection("#booking")}
                      aria-label={`Ask about ${product.name}`}
                      className="thin-gold-border flex h-9 items-center rounded-full px-3.5 text-[10px] font-bold uppercase tracking-wider2 text-gold transition-all duration-300 hover:bg-gold hover:text-primary"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Ivory pillar band — the lighter luxury rhythm break */}
      <div className="marble-texture relative text-primary">
        <div className="container-luxe grid gap-y-8 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {productPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.09}>
              <div
                className={
                  "flex flex-col items-center px-6 text-center lg:border-l lg:border-primary/10 " +
                  (i === 0 ? "lg:border-l-0" : "")
                }
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 text-[#8A6F3C]">
                  <LineIcon name={pillar.icon} />
                </span>
                <p className="mt-4 font-serif text-[17px] font-semibold leading-snug text-[#1d1a15]">
                  {pillar.title}
                </p>
                <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-[#5c564b]">{pillar.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Brand strip */}
        <div className="bg-[#0b0a08]">
          <div className="container-luxe flex flex-wrap items-center justify-between gap-x-10 gap-y-5 px-5 py-7 sm:px-8 lg:px-12">
            <span className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-luxe text-gold">
              Our Brands <span className="h-px w-8 bg-gold/50" />
            </span>
            {productBrands.map((brandName) => (
              <span
                key={brandName}
                className="font-serif text-sm tracking-[0.18em] text-ivory/70 transition-colors duration-300 hover:text-gold-bright"
              >
                {brandName}
              </span>
            ))}
            <span className="text-[10px] uppercase tracking-wider2 text-muted/60">and more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
