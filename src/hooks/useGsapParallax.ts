import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic scrubbed parallax: the element drifts by `distance` px while its
 * section scrolls through the viewport. Transform-only, GPU friendly.
 */
export function useGsapParallax<T extends HTMLElement>(distance = -70): RefObject<T> {
  const ref = useRef<T>(null) as RefObject<T>;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { y: -distance * 0.5 },
      {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("[data-parallax-root]") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance]);

  return ref;
}
