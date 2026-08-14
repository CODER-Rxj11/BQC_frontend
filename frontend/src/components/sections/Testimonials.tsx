"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Testimonials — "The Voices" (blueprint §2.7).
 * One large editorial quote at a time, drag/swipe between them, auto-advances
 * slowly, pauses on interaction.
 */
export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + count) % count, d]),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section className="bg-ink py-section text-white grain">
      <div className="container-bq">
        <Reveal>
          <span className="eyebrow flex items-center gap-2.5 sm:gap-3 text-brand-light">
            <span className="h-px w-6 sm:w-8 bg-brand-light" />
            In their words
          </span>
        </Reveal>

        <div
          className="relative mt-8 sm:mt-10 min-h-[15rem] sm:min-h-[16rem] md:min-h-[17rem] cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ duration: 0.5, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
            >
              <p className="max-w-4xl text-[clamp(1.25rem,3.2vw,2.5rem)] font-semibold leading-[1.24] tracking-tight text-white">
                <span className="text-brand-light">“</span>
                {t.quote}
                <span className="text-brand-light">”</span>
              </p>
              <footer className="mt-6 sm:mt-8 flex items-center gap-3.5 sm:gap-4 text-tint/80">
                {/* Distinct Avatar Badge */}
                <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-primary to-accent shadow-lift">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-ink/90 border border-white/10 font-display font-bold text-white text-sm sm:text-base md:text-lg tracking-wider">
                    {t.initials || t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {/* Active Indicator Dot */}
                  <span className="absolute -bottom-1 -right-1 flex h-3 sm:h-3.5 w-3 sm:w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500 border-2 border-ink"></span>
                  </span>
                </div>

                {/* Author Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1">
                    <span className="font-semibold text-white text-sm sm:text-base md:text-lg">{t.name}</span>
                    <span className="rounded-full border border-white/20 px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs text-brand-light font-medium bg-white/5">
                      {t.channel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-tint/70 mt-0.5">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-6">
          <div className="flex gap-2.5 sm:gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-brand-light hover:text-brand-light text-sm sm:text-base"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-brand-light hover:text-brand-light text-sm sm:text-base"
            >
              →
            </button>
          </div>
          <div className="flex flex-1 gap-1.5 sm:gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
              >
                {i === index && (
                  <motion.span
                    layoutId="dot"
                    className="block h-full w-full bg-brand-light"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
