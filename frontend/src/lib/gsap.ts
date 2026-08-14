"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins.
 * Guarded so it is safe to import from any client component and never runs
 * during SSR.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Lenis drives the raf loop, so let GSAP tolerate variable frame timing.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
