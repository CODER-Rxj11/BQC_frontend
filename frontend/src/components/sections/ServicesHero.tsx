"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/AnimatedText";

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink pb-[clamp(3.5rem,7vh,7rem)] pt-[clamp(7.5rem,15vh,11rem)] text-white grain"
    >
      {/* Hero background image showcase — matching homepage hero style */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/services-hero-showcase.png"
          alt="BrandQube Major Services Visual Showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 [filter:contrast(1.08)_saturate(1.1)]"
        />
        {/* Gradient overlays for contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,rgba(0,155,227,0.35),transparent_60%)]" />
      </motion.div>

      {/* Grid Pattern overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-bq relative z-10 w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7">
            <AnimatedHeading
              as="h1"
              lines={["EVERY TOUCHPOINT.", "ONE POWERFUL AGENCY."]}
              className="text-display-lg font-bold uppercase tracking-tight text-white"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="mt-4 sm:mt-6 max-w-xl text-base leading-relaxed text-tint/85 sm:text-lg"
            >
              From high-impact highway billboards to interactive mela stalls, mobile display vans, and premium retail showroom façades — we put your brand everywhere your audience moves.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="mt-6 sm:mt-8 grid max-w-lg grid-cols-3 gap-3 sm:gap-6 border-y border-white/15 py-3.5 sm:py-4"
            >
              <div>
                <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-white">7</span>
                <span className="text-[11px] sm:text-xs text-tint/70">Core Pillars</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-brand-light">12+</span>
                <span className="text-[11px] sm:text-xs text-tint/70">Media Channels</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-white">100%</span>
                <span className="text-[11px] sm:text-xs text-tint/70">Turnkey Execution</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <a
                href="#services-grid"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand/90 hover:scale-[1.02] text-center"
              >
                Explore Services Grid
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 text-center"
              >
                Get Media Proposal →
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Pure 360 Degree Brand Coverage Showcase Widget */}
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-ink/80 p-5 sm:p-7 md:p-9 shadow-2xl backdrop-blur-xl"
            >
              {/* Glowing ambient accent lights inside widget */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

              {/* Central 360 Badge Emblem */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand via-brand-light to-accent shadow-glow">
                  <span className="text-2xl sm:text-3xl font-black text-white">360°</span>
                  {/* Outer Rotating Pulse Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-white/40"
                  />
                  {/* Inner Glowing Ring */}
                  <div className="absolute inset-0 rounded-full border border-white/60 animate-pulse" />
                </div>

                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  360° Brand Coverage
                </h3>
                <p className="mt-1 text-xs text-tint/75">
                  End-to-End Omnichannel Brand Placement Across MP & Pan-India
                </p>
              </div>

              {/* Key 360 Coverage Features */}
              <div className="mt-6 sm:mt-7 space-y-2.5 sm:space-y-3 border-t border-white/15 pt-5 sm:pt-6">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3.5 transition-colors hover:bg-white/10">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-brand/30 text-sm sm:text-base text-brand-light">
                    🌐
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Full-Spectrum Reach</h4>
                    <p className="text-[10px] sm:text-[11px] text-tint/70">From High-Traffic Billboards to Urban Transit & Melas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3.5 transition-colors hover:bg-white/10">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-brand/30 text-sm sm:text-base text-brand-light">
                    🎯
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Turnkey Campaign Strategy</h4>
                    <p className="text-[10px] sm:text-[11px] text-tint/70">Strategic placement targeting high-conversion customer touchpoints</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3.5 transition-colors hover:bg-white/10">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-brand/30 text-sm sm:text-base text-brand-light">
                    📊
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Geo-Tracked Reporting</h4>
                    <p className="text-[10px] sm:text-[11px] text-tint/70">Live deployment verification and real-time execution proof</p>
                  </div>
                </div>
              </div>

              {/* Status Indicator Bar */}
              <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 sm:pt-4 text-xs">
                <span className="flex items-center gap-2 text-tint/70 text-[11px] sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Strategy Desk
                </span>
                <span className="font-semibold text-brand-light text-[11px] sm:text-xs">100% Turnkey Guarantee</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
