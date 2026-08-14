"use client";

import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * CTA band — "The Hoarding" (blueprint §2.8).
 * Full-bleed brand gradient, one enormous line, magnetic button.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-section text-white">
      {/* Depth: brand sky blue → deep midnight navy gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#009BE3,#16284F)]" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="container-bq relative text-center">
        <AnimatedHeading
          as="h2"
          lines={["YOUR BRAND.", "EVERYWHERE.", "LET’S TALK."]}
          className="mx-auto text-display-lg font-bold uppercase"
          stagger={0.1}
        />
        <Reveal delayIndex={1} className="mt-8 sm:mt-10 flex justify-center">
          <Magnetic strength={0.4}>
            <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto glow-brand">
              Start Your Campaign
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
