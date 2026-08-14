"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { pillars, Pillar } from "@/lib/data";
import { pad } from "@/lib/utils";

export function ServicesGrid() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  return (
    <section id="services-grid" className="relative bg-bg py-section overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="container-bq relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="eyebrow text-primary">Service Ecosystem</span>
          <h2 className="mt-3 text-display-md font-extrabold text-fg">
            Seven Pillars of <span className="text-gradient">Brand Dominance.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base text-muted sm:text-lg">
            Explore our comprehensive range of high-impact OOH, transit, experiential, and retail branding services. Each pillar is engineered for maximum visibility and turnout.
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <motion.div
          layout
          className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {pillars.map((pillar, i) => (
              <motion.article
                layout
                key={pillar.key}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-lift"
              >
                <div>
                  {/* Visual Header Image Frame */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-surface-2">
                    {pillar.image ? (
                      <Image
                        src={pillar.image}
                        alt={pillar.label}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-surface-dark text-white">
                        <span className="text-3xl">📢</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10">
                        {pad(i + 1)} — {pillar.label}
                      </span>
                      <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                        {pillar.services.length} Services
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7">
                    <h3 className="text-lg sm:text-xl font-bold text-fg group-hover:text-primary transition-colors">
                      {pillar.headline}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
                      {pillar.intro}
                    </p>

                    {/* Sub-services preview list */}
                    <div className="mt-5 border-t border-border/60 pt-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">
                        Key Deliverables:
                      </p>
                      <ul className="space-y-2">
                        {pillar.services.map((s) => (
                          <li key={s.name} className="flex items-start gap-2 text-xs text-fg/90">
                            <span className="mt-0.5 text-primary text-xs">✓</span>
                            <div>
                              <span className="font-semibold text-fg">{s.name}</span>
                              <span className="block text-[11px] text-muted line-clamp-1">{s.blurb}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="border-t border-hairline bg-surface-2/50 px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedPillar(pillar)}
                    className="text-xs font-semibold text-muted transition-colors hover:text-fg"
                  >
                    Quick Preview 👁️
                  </button>

                  <Link
                    href={`/services/${pillar.key}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all group-hover:translate-x-1"
                  >
                    Explore {pillar.label}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Quick Preview */}
        <AnimatePresence>
          {selectedPillar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
              onClick={() => setSelectedPillar(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] max-w-xl w-full overflow-y-auto rounded-2xl border border-border bg-bg p-5 sm:p-8 shadow-2xl my-auto"
              >
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="absolute top-4 right-4 text-muted hover:text-fg text-xl font-bold p-1"
                >
                  ✕
                </button>

                <span className="eyebrow text-primary">{selectedPillar.label}</span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-fg">{selectedPillar.headline}</h3>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-muted">{selectedPillar.intro}</p>

                <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Full Service Breakdown:</h4>
                  {selectedPillar.services.map((s, idx) => (
                    <div key={s.name} className="rounded-xl border border-border bg-surface p-3.5 sm:p-4">
                      <h5 className="font-semibold text-fg text-xs sm:text-sm">{idx + 1}. {s.name}</h5>
                      <p className="text-[11px] sm:text-xs text-muted mt-1">{s.blurb}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border pt-4">
                  <Link
                    href={`/services/${selectedPillar.key}`}
                    className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition-all hover:bg-primary/90 text-center"
                  >
                    View Full Pillar Details →
                  </Link>
                  <button
                    onClick={() => setSelectedPillar(null)}
                    className="text-xs text-muted hover:text-fg text-center"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
