"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Process — "The Route Map" (blueprint §2.6).
 * A route line "drives" between the four nodes as you scroll
 * (scroll-linked scaleY), with each node fading in.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <section id="process" className="bg-surface-2 py-section">
      <div className="container-bq">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Four stops from brief to <span className="text-gradient">city-wide.</span>
            </>
          }
          lead="A clear route from the first conversation to a brand that owns the streets."
        />

        <div ref={ref} className="relative mt-10 sm:mt-14 md:mt-16 pl-8 sm:pl-10 md:pl-0">
          {/* Rail */}
          <div className="absolute left-[11px] sm:left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-hairline md:left-1/2 md:-translate-x-1/2" />
          {/* Drawn route */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[11px] sm:left-[15px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary to-brand-light md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10 sm:gap-14 md:gap-24">
            {process.map((step, i) => {
              const alignRight = i % 2 === 1;
              return (
                <div key={step.no} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Node dot */}
                  <span className="absolute left-[11px] sm:left-[15px] top-1.5 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="block h-3.5 w-3.5 rounded-full border-2 border-bg bg-primary shadow-glow" />
                  </span>

                  <Reveal
                    className={cn(
                      alignRight
                        ? "md:col-start-2 md:pl-16 md:text-left"
                        : "md:col-start-1 md:pr-16 md:text-right"
                    )}
                  >
                    <div className={cn("max-w-md", !alignRight && "md:ml-auto")}>
                      <span className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold text-primary/20 leading-none">
                        {step.no}
                      </span>
                      <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-fg">
                        {step.title}
                      </h3>
                      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted leading-relaxed">{step.body}</p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
