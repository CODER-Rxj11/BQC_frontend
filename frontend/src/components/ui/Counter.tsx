"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Count-up stat (blueprint §2.3). Parses the leading number out of strings
 * like "200+" or "10K+" and animates 0 → value once it scrolls into view,
 * preserving the suffix, then stops.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Parse once per render from the (stable) value string. Only the derived
  // PRIMITIVES below feed the effect deps — never the match array, whose
  // identity changes every render and would restart the animation forever.
  const match = value.match(/^([\d.]+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const [display, setDisplay] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (!isNumeric || !inView) return;

    let raf = 0;
    let start: number | null = null;
    const duration = 1400;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Stable primitives only → runs once when it enters view, then settles.
  }, [inView, isNumeric, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
