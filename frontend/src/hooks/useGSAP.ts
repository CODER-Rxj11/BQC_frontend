"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList } from "react";
import { gsap } from "@/lib/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Minimal `useGSAP` — runs the callback inside a scoped `gsap.context` so every
 * animation, ScrollTrigger and selector is auto-reverted on unmount / re-run.
 * Selectors inside the callback are scoped to `options.scope`.
 * The callback may return its own cleanup (e.g. `matchMedia.revert`).
 */
export function useGSAP<T extends Element = Element>(
  callback: () => void | (() => void),
  // Generic over the scope element type so any element ref is accepted without
  // RefObject variance friction at call sites.
  options: { scope?: React.RefObject<T | null>; dependencies?: DependencyList } = {}
) {
  const { scope, dependencies = [] } = options;
  const cleanupRef = useRef<void | (() => void)>(undefined);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cleanupRef.current = callback();
    }, scope?.current ?? undefined);

    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
