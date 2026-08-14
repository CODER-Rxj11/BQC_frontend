"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Rendered from app/template.tsx, so it re-mounts on every navigation.
 * Plays an indigo "curtain reveal" + a soft content fade-up, and resets the
 * Lenis scroll position to the top of the new page.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    if (!lenis) window.scrollTo(0, 0);
  }, [pathname, lenis]);

  if (reduced) return <>{children}</>;

  return (
    <>
      {/* Curtain: an indigo panel that lifts to reveal the page */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
