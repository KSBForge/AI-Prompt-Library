import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` once `active` becomes true.
 * Supports decimals (4.8) and eases out for a premium feel.
 */
export function useCountUp(target: number, active: boolean, duration = 1900, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration, decimals]);

  return value;
}
