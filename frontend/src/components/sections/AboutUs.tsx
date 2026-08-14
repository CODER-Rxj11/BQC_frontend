"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * AboutUs — Dedicated section for /about page.
 * Features executive messaging, custom brand showcase image, and Mission & Vision cards.
 */
export function AboutUs() {
  return (
    <section id="about-us" className="bg-bg py-section">
      <div className="container-bq grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              About Us
            </span>
          </Reveal>
          <Reveal delayIndex={1}>
            <h2 className="mt-4 sm:mt-6 text-display-md font-semibold text-fg">
              From Visibility to Impact. <span className="text-gradient">Engineered for Recall.</span>
            </h2>
          </Reveal>
          <Reveal delayIndex={2}>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted">
              In today’s hyper-competitive marketplace, brands don’t just compete for visibility — they compete for genuine attention, meaningful engagement, and lasting recall. At BrandQube, we transform brands into powerful real-world experiences that audiences notice, interact with, and remember.
            </p>
          </Reveal>
          <Reveal delayIndex={3}>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-muted">
              Beyond traditional advertising, we operate as execution specialists, experience creators, and visibility architects. We deliver high-impact solutions across on-ground activations, outdoor media, retail branding, and integrated campaigns — backed by strategic vision, deep regional insights, a strong local network, and operational excellence to ensure flawless execution and measurable ROI across every touchpoint.
            </p>
          </Reveal>
        </div>

        {/* Brand Showcase Image */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[560px] overflow-hidden rounded-xl2 border border-border bg-surface shadow-lift">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0"
          >
            <Image
              src="/about-us-brand.png"
              alt="BrandQube full-stack advertising, outdoor media & visibility execution"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="container-bq mt-12 sm:mt-16 md:mt-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission Card */}
          <Reveal delayIndex={1}>
            <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-7 md:p-8 shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-lift backdrop-blur-sm">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl transition-colors duration-500 group-hover:bg-brand/20"
              />
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="eyebrow text-xs uppercase tracking-widest text-primary font-semibold">
                    Our Mission
                  </span>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-fg">
                  Creative, Impactful & Results-Driven
                </h3>
                <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted">
                  Our mission is to provide creative, impactful, and results-driven advertising solutions that help our clients’ brands stand out and succeed in a competitive market.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Vision Card */}
          <Reveal delayIndex={2}>
            <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-7 md:p-8 shadow-soft transition-all duration-300 hover:border-accent/50 hover:shadow-lift backdrop-blur-sm">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-colors duration-500 group-hover:bg-accent/20"
              />
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="eyebrow text-xs uppercase tracking-widest text-accent font-semibold">
                    Our Vision
                  </span>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-fg">
                  Leading Brand Storyteller & Partner
                </h3>
                <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted">
                  Our vision is to become a leading advertising partner for businesses, known for our creativity, dedication, and ability to turn ideas into successful brand stories.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
