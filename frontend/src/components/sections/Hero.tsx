"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { site, stats } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — "The Billboard" (blueprint §2.1).
 * Deep-blue canvas, cinematic graded footage (video with a high-res still
 * fallback), kinetic masked headline, scroll-parallax so the hero "drives"
 * into the next section.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] min-h-[100dvh] items-end overflow-hidden bg-ink text-white grain"
    >
      {/* Advertising agency hero background image */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/agency-hero.jpg"
          alt="BrandQube advertising agency creative strategy and media campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 [filter:contrast(1.08)_saturate(1.1)]"
        />
        {/* Gradient overlay for perfect contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/25" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,rgba(0,155,227,0.35),transparent_60%)]" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="container-bq relative z-10 w-full pt-[clamp(6.5rem,14vh,11.5rem)] pb-[clamp(2.5rem,6vh,5rem)]"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="eyebrow mb-5 sm:mb-8 flex items-center gap-2.5 sm:gap-3 text-brand-light"
        >
          <span className="h-px w-6 sm:w-10 bg-brand-light" />
          {site.tagline}
        </motion.p>

        {/* Kinetic billboard headline */}
        <AnimatedHeading
          as="h1"
          lines={["MAKE YOUR BRAND", "IMPOSSIBLE TO IGNORE."]}
          className="max-w-5xl text-display-xl font-bold uppercase"
          stagger={0.12}
        />

        <div className="mt-8 sm:mt-10 flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="max-w-md text-base sm:text-lg leading-relaxed text-tint/85"
          >
            Outdoor. On-vehicle. On-screen. On-brand.{" "}
            <span className="text-white">One agency.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
          >
            <Magnetic>
              <Button href="/contact" size="lg" className="w-full sm:w-auto glow-brand">
                Start Your Campaign
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Magnetic>
            <Button
              href="/work"
              variant="onDark"
              size="lg"
              className="w-full sm:w-auto bg-transparent text-white ring-1 ring-white/25 hover:bg-white/10"
            >
              See our work
            </Button>
          </motion.div>
        </div>

        {/* Trust stats sliver */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-6 border-t border-white/15 pt-6 sm:pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <dt className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-white">
                <Counter value={s.value} />
              </dt>
              <dd className="mt-1 text-xs sm:text-sm text-tint/70">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-tint/60 md:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-brand-light to-transparent"
        />
      </motion.div>
    </section>
  );
}
