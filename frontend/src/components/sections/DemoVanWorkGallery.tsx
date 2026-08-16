"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type DemoVanAsset = {
  id: string;
  filename: string;
  client: string;
  title: string;
  channel: string;
  year: string;
  imageUrl: string;
};

const API = (process.env.NEXT_PUBLIC_API_URL || "http://bqc-backend-1.onrender.com").replace(/\/$/,"");

const FALLBACK_ASSETS: DemoVanAsset[] = [
  {
    id: "Ather01.png",
    filename: "Ather01.png",
    client: "Ather Energy",
    title: "Ather Energy Mobile EV Demo Van Activation",
    channel: "Demo Van Campaigns",
    year: "2025",
     imageUrl: "/seed_assets/Demo_Van/Ather01.png",
  },
  {
    id: "Ather02.png",
    filename: "Ather02.png",
    client: "Ather Energy",
    title: "Ather Energy On-Ground Test Ride & Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
  imageUrl: "/seed_assets/Demo_Van/Ather02.png",
  },
  {
    id: "gulf01.png",
    filename: "gulf01.png",
    client: "Gulf Oil",
    title: "Gulf Oil Damdaron Ka Damdar Demo Van Campaign",
    channel: "Demo Van Campaigns",
    year: "2025",
  imageUrl: "/seed_assets/Demo_Van/gulf01.png",
  },
  {
    id: "gulf02.png",
    filename: "gulf02.png",
    client: "Gulf Oil",
    title: "Gulf Oil Rural Outreach Mobile Marketing Unit",
    channel: "Demo Van Campaigns",
    year: "2025",
   imageUrl: "/seed_assets/Demo_Van/gulf02.png",
  },
  {
    id: "gulf03.png",
    filename: "gulf03.png",
    client: "Gulf Oil",
    title: "Gulf XHD Supreme Tractor Oil Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
  imageUrl: "/seed_assets/Demo_Van/gulf03.png",
  },
  {
    id: "hero01.png",
    filename: "hero01.png",
    client: "Hero MotoCorp",
    title: "Hero Destini 110 Strong Metal Body Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/hero01.png",
  },
  {
    id: "hero02.png",
    filename: "hero02.png",
    client: "Hero MotoCorp",
    title: "Hero Scooter Ka Hero Promotional Display Van",
    channel: "Demo Van Campaigns",
    year: "2025",
   imageUrl: "/seed_assets/Demo_Van/hero02.png",
  },
  {
    id: "hero03.png",
    filename: "hero03.png",
    client: "Hero MotoCorp",
    title: "Hero Rural Outreach & Interactive Roadshow Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/hero03.png",
  },
  {
    id: "jio_cinema.png",
    filename: "jio_cinema.png",
    client: "Jio Cinema",
    title: "Jio Cinema Free Streaming Experiential Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
  imageUrl: "/seed_assets/Demo_Van/jio_cinema.png",
  },
  {
    id: "maaza.png",
    filename: "maaza.png",
    client: "Maaza",
    title: "Maaza Asli Aam Wala Large-Format Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
   imageUrl: "/seed_assets/Demo_Van/maaza.png",
  },
  {
    id: "maaza02.png",
    filename: "maaza02.png",
    client: "Maaza",
    title: "Maaza Moving Advertisement & Bottle Installation Van",
    channel: "Demo Van Campaigns",
    year: "2025",
   imageUrl: "/seed_assets/Demo_Van/maaza02.png",
  },
  {
    id: "maaza03.png",
    filename: "maaza03.png",
    client: "Maaza",
    title: "Maaza Dynamic Consumer Engagement Display Van",
    channel: "Demo Van Campaigns",
    year: "2025",
     imageUrl: "/seed_assets/Demo_Van/maaza03.png",
  },
  {
    id: "ms01.png",
    filename: "ms01.png",
    client: "Maruti Suzuki",
    title: "Maruti Suzuki Brezza Truck Platform Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
 imageUrl: "/seed_assets/Demo_Van/ms01.png",
  },
  {
    id: "ph01.png",
    filename: "ph01.png",
    client: "MP Police Headquarters",
    title: "MP Police Sanjeevani Clinic 2.0 Mobile Awareness Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/ph01.png",
  },
  {
    id: "ph02.png",
    filename: "ph02.png",
    client: "MP Police Headquarters",
    title: "MP Police Public Outreach & Awareness Vehicle",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/ph02.png",
  },
  {
    id: "tata_tea.png",
    filename: "tata_tea.png",
    client: "Tata Tea Agni",
    title: "Tata Tea Agni Fleet Demo Vans Roadshow",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tata_tea.png",
  },
  {
    id: "tata_tea02.png",
    filename: "tata_tea02.png",
    client: "Tata Tea Agni",
    title: "Tata Tea Agni Rural Outreach & Sampling Vans",
    channel: "Demo Van Campaigns",
    year: "2025",
     imageUrl: "/seed_assets/Demo_Van/tata_tea02.png",
  },
  {
    id: "tvs01.png",
    filename: "tvs01.png",
    client: "TVS Motors",
    title: "TVS Radeon Buland Sawari Display Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tvs01.png",
  },
  {
    id: "tvs02.png",
    filename: "tvs02.png",
    client: "TVS Motors",
    title: "TVS Live Vehicle Demo & Customer Outreach Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tvs02.png",
  },
  {
    id: "tvs03.png",
    filename: "tvs03.png",
    client: "TVS Motors",
    title: "TVS Test Ride Opportunities Mobile Unit",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tvs03.png",
  },
  {
    id: "tvs04.png",
    filename: "tvs04.png",
    client: "TVS Motors",
    title: "TVS Hydraulic Display Platform Demo Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tvs04.png",
  },
  {
    id: "tvs05.png",
    filename: "tvs05.png",
    client: "TVS Motors",
    title: "TVS Apache RTR 160 Racing Mobile Brand Van",
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: "/seed_assets/Demo_Van/tvs05.png",
  },
];

export function DemoVanWorkGallery() {
  const [assets, setAssets] = useState<DemoVanAsset[]>(FALLBACK_ASSETS);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState<DemoVanAsset | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/demo-van-assets`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAssets(data);
      })
      .catch((err) => {
        console.warn("Could not fetch demo van assets from backend:", err);
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
              Demo Van Campaigns Work in the Wild
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
              Original scale collage of mobile marketing display units, live vehicle demonstrations, audio-visual setups, and targeted rural & urban outreach.
            </p>
          </div>
          <Button href="/work" variant="secondary" className="w-full sm:w-auto">
            All work →
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
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
                      {activeImage.client} — Demo Van Campaigns
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
