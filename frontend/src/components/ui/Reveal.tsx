"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  }),
};

/**
 * Scroll-into-view reveal. Reduced-motion users still see content (it just
 * appears without translation, handled by Framer's reducedMotion default).
 */
export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  as?: "div" | "span" | "li" | "section";
  amount?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}
