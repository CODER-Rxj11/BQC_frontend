"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * About / Story — "The Wall" section for Home Page.
 * Founder story on the left; real wall wrap image on the right; proof stats below.
 */
export function About() {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [ourImage, setOurImage] = useState<{ imageUrl?: string; alt?: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/ourstory`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.imageUrl) setOurImage(data);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => controller.abort();
  }, [API]);

  return (
    <section id="story" className="bg-bg py-section">
      <div className="container-bq grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              Our story
            </span>
          </Reveal>
          <Reveal delayIndex={1}>
            <h2 className="mt-4 sm:mt-6 text-display-md font-semibold text-fg">
              Built on the signage floor. <span className="text-gradient">Scaled to the skyline.</span>
            </h2>
          </Reveal>
          <Reveal delayIndex={2}>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted">
              BrandQube started with a simple belief in Bhopal: a brand that shows up
              everywhere wins. We began with flex, print and hand-painted walls — and
              grew into a full-stack advertising house spanning twelve channels.
            </p>
          </Reveal>
          <Reveal delayIndex={3}>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-muted">
              We still obsess over the craft of the real world — the perfect cut of vinyl,
              the exact height of a hoarding — and pair it with digital reach that
              performs. That&apos;s how we make brands impossible to ignore.
            </p>
          </Reveal>
        </div>

        {/* The wall image */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[560px] overflow-hidden rounded-xl2 border border-border bg-surface shadow-lift">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0"
          >
            {ourImage && ourImage.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ourImage.imageUrl}
                alt={ourImage.alt || "BrandQube Wall Wrap Execution"}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src="/ourstry.webp"
                alt="BrandQube real wall wrap advertising project"
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Proof stats */}
      <div className="container-bq mt-14 sm:mt-20">
        <dl className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-x-8 border-t border-hairline pt-8 sm:pt-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="div" key={s.label} delayIndex={i} className="flex flex-col items-center text-center">
              <dt className="font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold text-fg">
                <Counter value={s.value} />
              </dt>
              <dd className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
