"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type CorporateAsset = {
  id: string;
  filename: string;
  client: string;
  title: string;
  channel: string;
  year: string;
  imageUrl: string;
};

const API = (process.env.NEXT_PUBLIC_API_URL || "http://bqc-backend-1.onrender.com").replace(/\/$/,"");

export function CorporateEventsWorkGallery() {
  const [assets, setAssets] = useState<CorporateAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<CorporateAsset | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/corporate-events-assets`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setAssets(data);
      })
      .catch((err) => {
        console.warn("Could not fetch corporate event assets from backend:", err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-surface-2 py-section">
      <div className="container-bq">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              <span className="eyebrow text-primary">OUR WORK GALLERY</span>
            </div>
            <h2 className="mt-3 sm:mt-4 text-display-md font-semibold text-fg uppercase tracking-tight">
              Corporate Events Work in the Wild
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
              Original scale collage of brand launches, corporate summits, and live promotional showcases.
            </p>
          </div>
          <Button href="/work" variant="secondary" className="w-full sm:w-auto">
            All work →
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="h-44 sm:h-48 rounded-xl bg-bg/60 animate-pulse" />
            ))}
          </div>
        ) : (
          /* High-Density Collage Grid */
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {assets.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => setActiveImage(item)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-bg/90 p-1.5 sm:p-2 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lift flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative flex items-center justify-center min-h-[140px] sm:min-h-[160px] max-h-[220px] w-full overflow-hidden rounded-lg bg-surface-dark/40 p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.client}
                    loading="lazy"
                    className="max-h-[180px] sm:max-h-[200px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Hover Cue */}
                  <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                      View Full 🔍
                    </span>
                  </div>
                </div>

                {/* Brand Name Under Image Only */}
                <div className="mt-2 sm:mt-2.5 px-1 pb-1 text-center border-t border-hairline pt-1.5 sm:pt-2">
                  <span className="text-[11px] sm:text-xs font-bold text-fg/90 transition-colors group-hover:text-primary block truncate">
                    {item.client}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Lightbox Modal for Full Resolution View */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-4 md:p-6 backdrop-blur-md overflow-y-auto"
              onClick={() => setActiveImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-ink text-white shadow-2xl backdrop-blur-xl my-auto"
              >
                {/* Modal Top Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                  <div className="min-w-0 pr-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-light block truncate">
                      {activeImage.client} — Corporate Events
                    </span>
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                      {activeImage.title || activeImage.client}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveImage(null)}
                    aria-label="Close Preview"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/25 hover:text-white text-xs sm:text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Image Display Area */}
                <div className="relative flex flex-1 min-h-0 items-center justify-center overflow-hidden bg-black/75 p-2 sm:p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeImage.imageUrl}
                    alt={activeImage.client}
                    className="max-h-[62vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-lg select-none"
                  />
                </div>

                {/* Modal Footer Bar */}
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 sm:px-6 bg-ink/90">
                  <span className="text-[11px] sm:text-xs text-tint/70 truncate">
                    BrandQube Portfolio Asset
                  </span>
                  <button
                    onClick={() => setActiveImage(null)}
                    className="rounded-lg border border-white/20 bg-white/10 px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    Close Preview
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
