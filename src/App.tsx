import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { About } from "./components/About";
import { ChefSection } from "./components/ChefSection";
import { Concierge } from "./components/Concierge";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { Hero } from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
import { MenuSection } from "./components/MenuSection";
import { Navbar } from "./components/Navbar";
import { Reservation } from "./components/Reservation";
import { StatBar } from "./components/StatBar";
import { Testimonials } from "./components/Testimonials";
import { WhyChoose } from "./components/WhyChoose";
import { CursorGlow, ScrollProgress } from "./components/ui/ScrollFX";
import { setLenis } from "./lib/scroll";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const reduced = usePrefersReducedMotion();

  /* Buttery Lenis smooth scrolling, driven by the GSAP ticker. */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  /* Recalculate scroll-driven layouts once the loading curtain lifts. */
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero start={!loading} />
        <StatBar />
        <About />
        <WhyChoose />
        <MenuSection />
        <ChefSection />
        <GallerySection />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>

      <Footer />
      <Concierge />
    </>
  );
}
