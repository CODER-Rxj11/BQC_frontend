"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { pillars } from "@/lib/data";
import { pad, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Services — Interactive Split-Deck & Grid Overview.
 * Replaces the forced horizontal scroll-pin with a fast, modern interactive deck
 * and a toggleable bento grid, eliminating scroll fatigue, card overflow, and scroll pinning bugs.
 */
export function Services() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");

  const activePillar = pillars[activePillarIndex] || pillars[0];

  return (
    <section id="services" className="relative bg-surface-2 py-section overflow-hidden">
      {/* Decorative background glow elements */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-bq relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Seven core services to make you <span className="text-gradient">unmissable.</span>
              </>
            }
            lead="BrandQube India Pvt. Ltd. turns your brand's vision into reality. Through high-impact advertising, innovative visuals, and strategic campaigns, we help you forge meaningful connections with your target audience and make a lasting impression."
          />

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* View Mode Switcher */}
            <div className="inline-flex w-full sm:w-auto rounded-xl bg-bg/80 p-1 border border-border/80 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                  viewMode === "deck"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-fg"
                )}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Interactive Deck
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-fg"
                )}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid Overview
              </button>
            </div>

            <Link
              href="/services"
              className="group hidden items-center gap-2 font-semibold text-primary sm:inline-flex"
            >
              View all services
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8 sm:mt-12 md:mt-14">
          {viewMode === "deck" ? (
            /* Split Deck View */
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              {/* Left Column: Pillar Navigation List */}
              <div className="flex flex-col gap-2.5 sm:gap-3 lg:col-span-5">
                <span className="eyebrow text-xs uppercase tracking-widest text-muted px-1 mb-1">
                  Select Advertising Pillar ({pad(activePillarIndex + 1)} / {pad(pillars.length)})
                </span>
                <div className="flex flex-col gap-2.5">
                  {pillars.map((pillar, idx) => {
                    const isActive = idx === activePillarIndex;
                    return (
                      <button
                        key={pillar.key}
                        onClick={() => setActivePillarIndex(idx)}
                        onMouseEnter={() => setActivePillarIndex(idx)}
                        className={cn(
                          "group relative flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 md:p-5 text-left transition-all duration-300",
                          isActive
                            ? "border-primary/80 bg-bg shadow-soft ring-1 ring-primary/30"
                            : "border-border/60 bg-bg/50 hover:border-border hover:bg-bg/80"
                        )}
                      >
                        {/* Active Accent Bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activePillarBar"
                            className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-primary"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        <div className="flex items-center gap-3 sm:gap-4 pl-1 sm:pl-2">
                          <span
                            className={cn(
                              "font-display text-base sm:text-lg font-bold transition-colors duration-200",
                              isActive ? "text-primary" : "text-muted group-hover:text-fg"
                            )}
                          >
                            {pad(idx + 1)}
                          </span>
                          <div>
                            <h3
                              className={cn(
                                "text-sm sm:text-base md:text-lg font-semibold transition-colors duration-200",
                                isActive ? "text-fg" : "text-fg/80 group-hover:text-fg"
                              )}
                            >
                              {pillar.label}
                            </h3>
                            <p className="mt-0.5 text-xs text-muted line-clamp-1">
                              {pillar.headline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={cn(
                              "rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-surface-2 text-muted group-hover:bg-surface-2/80"
                            )}
                          >
                            {pillar.services.length} services
                          </span>
                          <span
                            className={cn(
                              "text-primary transition-transform duration-300",
                              isActive ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-60"
                            )}
                          >
                            →
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Pillar Card Details */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activePillar.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative flex flex-col justify-between overflow-hidden rounded-xl2 border border-border bg-bg p-5 sm:p-7 md:p-8 lg:p-9 shadow-lift"
                  >
                    {/* Background glow accent */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
                    />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-hairline pb-4">
                        <span className="eyebrow text-primary">
                          Pillar {pad(activePillarIndex + 1)} — {activePillar.label}
                        </span>
                        <span className="rounded-full bg-surface-2 px-2.5 sm:px-3 py-1 text-xs font-semibold text-muted">
                          {activePillar.services.length} Core Services
                        </span>
                      </div>

                      {/* Card Headline & Intro */}
                      <div className="mt-5">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-fg leading-tight">
                          {activePillar.headline}
                        </h3>
                        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted">
                          {activePillar.intro}
                        </p>
                      </div>

                      {/* Services List */}
                      <div className="mt-6 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">
                          Included Services & Deliverables:
                        </p>
                        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                          {activePillar.services.map((s, idx) => (
                            <div
                              key={s.name}
                              className="group/item flex items-start gap-3 sm:gap-3.5 rounded-xl border border-hairline bg-surface/50 p-3.5 sm:p-4 transition-all duration-200 hover:border-primary/40 hover:bg-surface hover:shadow-sm"
                            >
                              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="text-sm font-semibold text-fg transition-colors group-hover/item:text-primary sm:text-base">
                                    {s.name}
                                  </h4>
                                  <span
                                    aria-hidden
                                    className="text-xs font-bold text-primary opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                                  >
                                    ↗
                                  </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted leading-relaxed">
                                  {s.blurb}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-hairline pt-5">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Turnkey execution & reporting included
                      </div>
                      <Link
                        href={`/services/${activePillar.key}`}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary/90 hover:shadow-glow w-full sm:w-auto"
                      >
                        Explore {activePillar.label}
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Bento Grid Overview View */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.key}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl2 border border-border bg-bg p-5 sm:p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lift"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-2xl transition-colors duration-500 group-hover:bg-brand/25"
                  />

                  <div>
                    <header className="flex items-center justify-between border-b border-hairline pb-3">
                      <span className="eyebrow text-xs text-primary">{pad(i + 1)} — {pillar.label}</span>
                      <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        {pad(pillar.services.length)} services
                      </span>
                    </header>

                    <h3 className="mt-4 text-lg sm:text-xl font-bold text-fg group-hover:text-primary transition-colors">
                      {pillar.headline}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted line-clamp-2">
                      {pillar.intro}
                    </p>

                    <ul className="mt-4 flex flex-col divide-y divide-hairline border-y border-hairline">
                      {pillar.services.map((s) => (
                        <li key={s.name} className="py-2.5">
                          <p className="text-xs font-semibold text-fg sm:text-sm">{s.name}</p>
                          <p className="mt-0.5 text-[11px] sm:text-xs text-muted line-clamp-2">{s.blurb}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${pillar.key}`}
                    className="relative mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary transition-colors hover:text-brand-accent"
                  >
                    Explore {pillar.label}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              ))}
            </motion.div>
          )}
        </div>

        {/* Bottom Tail CTA Banner */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-xl2 bg-ink p-6 sm:p-8 md:p-12 text-white shadow-lift">
            {/* Ambient Lighting Accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow text-brand-light">Tailored Brand Strategy</span>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl text-white">
                  Not sure which service mix fits your campaign?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-tint/80 leading-relaxed">
                  Our media strategists analyze your location, target audience, and growth objectives to curate a high-ROI multi-channel campaign.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:bg-brand/90 hover:scale-[1.02] w-full sm:w-auto"
                >
                  Talk to a strategist
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 w-full sm:w-auto"
                >
                  View All {pillars.length} Pillars
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
