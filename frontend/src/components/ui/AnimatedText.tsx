"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.06) => ({
    transition: { staggerChildren: stagger },
  }),
};

const line: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

/**
 * Masked line-by-line reveal for hero / section headlines (blueprint §2.1).
 * Pass an array of lines; each rises out of an overflow-hidden mask.
 */
export function AnimatedHeading({
  lines,
  className,
  as: Tag = "h1",
  stagger = 0.08,
  once = true,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
  once?: boolean;
}) {
  return (
    <Tag className={cn("overflow-hidden", className)}>
      <motion.span
        className="block"
        variants={container}
        custom={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.6 }}
      >
        {lines.map((text, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={line} className="block">
              {text}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
