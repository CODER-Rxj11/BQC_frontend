"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WorkAsset = {
  id: string;
  filename: string;
  client: string;
  title: string;
  channel: string;
  category?: string;
  year: string;
  imageUrl: string;
};

const API = (process.env.NEXT_PUBLIC_API_URL || "http://bqc-backend-1.onrender.com").replace(/\/$/,"");

const CATEGORIES = [
  "All Work",
  "Showroom Development",
  "Demo Van Campaigns",
  "On-Ground Activations",
  "Outdoor & Transit",
  "Wall Wrap Advertising",
  "Corporate Events",
];

const FALLBACK_MASTER_ASSETS: WorkAsset[] = [
  {
    id: "ather01.png",
    filename: "ather01.png",
    client: "Ather Energy",
    title: "Ather Energy Large-Format Wall Wrap Advertising",
    channel: "Wall Wrap Advertising",
    category: "wall-wrap",
    year: "2025",
    imageUrl: "/seed_assets/wall_wrap/ather01.png",
  },
  {
    id: "ms01.png",
    filename: "ms01.png",
    client: "Maruti Suzuki",
    title: "Maruti Suzuki Showroom Exterior Elevation & ACP Cladding",
    channel: "Showroom Development",
    category: "showroom",
    year: "2025",
    imageUrl: "/seed_assets/showroom_development/ms01.png",
  },
  {
    id: "tvs01.png",
    filename: "tvs01.png",
    client: "TVS Motors",
    title: "TVS Jupiter Bus Panel Transit Advertising",
    channel: "Outdoor & Transit",
    category: "transit",
    year: "2025",
    imageUrl: "/seed_assets/transit/tvs01.png",
  },
  {
    id: "gulf01.png",
    filename: "gulf01.png",
    client: "Gulf Oil",
    title: "Gulf Oil Damdaron Ka Damdar Demo Van Campaign",
    channel: "Demo Van Campaigns",
    category: "demovan",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/gulf01.png",
  },
  {
    id: "hero01.png",
    filename: "hero01.png",
    client: "Hero MotoCorp",
    title: "Hero MotoCorp On-Ground Mela Stall & Experiential Activation",
    channel: "On-Ground Activations",
    category: "mela",
    year: "2025",
    imageUrl: "/seed_assets/Mela_activity/hero01.png",
  },
  {
    id: "As01.png",
    filename: "As01.png",
    client: "Apollo Sage Hospitals",
    title: "Apollo Sage Hospitals Corporate Event & Stage Setup",
    channel: "Corporate Events",
    category: "corporate",
    year: "2025",
    imageUrl: "/seed_assets/coorporate_events/As01.png",
  },
];

export function MasterWorkGallery() {
  const [assets, setAssets] = useState<WorkAsset[]>(FALLBACK_MASTER_ASSETS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [activeImage, setActiveImage] = useState<WorkAsset | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/all-work-assets`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAssets(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch all work assets from backend:", err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const filteredAssets = useMemo(() => {
    if (activeCategory === "All Work") return assets;
    return assets.filter((item) => item.channel === activeCategory);
  }, [assets, activeCategory]);

  return (
    <section className="bg-bg py-section">
      <div className="container-bq">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between border-b border-border pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              <span className="eyebrow text-primary">PORTFOLIO ARCHIVE</span>
            </div>
            <h2 className="mt-3 text-display-md font-bold uppercase tracking-tight text-fg">
              Real Work In The Wild
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted">
              Explore authentic execution photography from live campaigns across India — categorized by service vertical.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-muted shrink-0">
            Showing <span className="font-bold text-fg">{filteredAssets.length}</span> campaign photos
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All Work"
                ? assets.length
                : assets.filter((a) => a.channel === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "border border-border bg-surface text-muted hover:border-primary/50 hover:text-fg"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-bg text-muted group-hover:text-fg"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {loading && assets.length === 0 ? (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
              <div key={idx} className="h-44 sm:h-52 rounded-xl bg-surface animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredAssets.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.4) }}
                onClick={() => setActiveImage(item)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-1.5 sm:p-2 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lift flex flex-col justify-between"
              >
                {/* Category Pill on top left */}
                <div className="absolute top-3 left-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-md bg-ink/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md shadow">
                    {item.channel}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative flex items-center justify-center min-h-[140px] sm:min-h-[160px] max-h-[220px] w-full overflow-hidden rounded-lg bg-surface-dark/40 p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.client}
                    loading="lazy"
                    className="max-h-[180px] sm:max-h-[200px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Cue */}
                  <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                      View Full 🔍
                    </span>
                  </div>
                </div>

                {/* Brand Name Under Image */}
                <div className="mt-2 sm:mt-2.5 px-1 pb-1 text-center border-t border-hairline pt-1.5 sm:pt-2">
                  <span className="text-[11px] sm:text-xs font-bold text-fg/90 transition-colors group-hover:text-primary block truncate">
                    {item.client}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-muted block truncate mt-0.5">
                    {item.channel}
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
                      {activeImage.client} — {activeImage.channel}
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
                    BrandQube Portfolio Asset · Pan-India Execution
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
