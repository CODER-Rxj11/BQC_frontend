"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { presenceMetrics, site } from "@/lib/data";

const capabilitiesList = [
  {
    title: "Established Market Footprint",
    description: "Deep-rooted presence across critical target markets, enabling seamless regional activations and targeted brand positioning.",
  },
  {
    title: "End-to-End In-House Capabilities",
    description: "Complete operational control over creative production and execution, backed by a dedicated team of specialized talent.",
  },
  {
    title: "Experiential & BTL Mastery",
    description: "Proven track record in engineering immersive Below-The-Line (BTL) campaigns and memorable brand interactions.",
  },
  {
    title: "Cultural & Regional Intelligence",
    description: "Multilingual, locally anchored teams leveraging deep demographic insights to deliver culturally relevant messaging.",
  },
  {
    title: "Strategic Partner Ecosystem",
    description: "An extensive on-the-ground network of vetted local vendors and key influencers to amplify campaign reach.",
  },
  {
    title: "Flawless Last-Mile Execution",
    description: "Robust logistics and ground-level connectivity ensuring precise, reliable execution straight to consumer touchpoints.",
  },
];

export function PanIndiaPresence() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.legalName}, ${site.address}`
  )}`;

  return (
    <section id="pan-india-presence" className="relative border-t border-hairline bg-bg py-section overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      
      <div className="container-bq">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Pan India Network"
            title={
              <>
                Headquartered in Bhopal. <span className="text-gradient">Executing Nationwide.</span>
              </>
            }
            lead="From flex printing on local streets to full transit wraps, billboards, and demo van activations across 15+ states and 50+ major cities."
          />
        </div>

        {/* Map & Capabilities Split - Equal Height Stretch */}
        <div className="mt-8 sm:mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          
          {/* Pan India Map Image with Redirection (5 Columns) */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open BrandQube location on Google Maps"
            className="group relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] w-full overflow-hidden rounded-2xl border border-hairline bg-[#eaf3fa] p-3 sm:p-4 shadow-lift backdrop-blur-md lg:col-span-5 flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-glow cursor-pointer"
          >
            <div className="relative h-full w-full aspect-square min-h-[280px] sm:min-h-[380px] lg:min-h-full">
              <Image
                src="/India_map.png"
                alt="Pan India Network Map - BrandQube"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Capabilities & Deployment Panel (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-surface p-5 sm:p-7 md:p-8 shadow-lift">
              
              {/* Bullet Points List as Normal Text */}
              <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base">
                {capabilitiesList.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm sm:text-base leading-relaxed text-fg font-medium">
                      <span className="font-semibold text-fg">{item.title}: </span>
                      <span className="text-muted font-normal">{item.description}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div>
                {/* Active Deployment Capacity Section */}
                <div className="mt-6 sm:mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                  <span className="block text-2xs font-semibold uppercase tracking-wider text-primary">
                    Active Deployment Capacity
                  </span>
                  <span className="mt-1 block text-sm sm:text-base md:text-lg font-bold text-fg">
                    10,000+ Active Hoardings, Wall Wraps & Transit Units
                  </span>
                </div>

                {/* Deploy Campaign Button */}
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 shadow-glow"
                  >
                    <span>Deploy Campaign</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Pan-India Proof Metrics Bar */}
        <div className="mt-12 sm:mt-16 border-t border-hairline pt-8 sm:pt-12">
          <dl className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-x-8 md:grid-cols-4">
            {presenceMetrics.map((m, i) => (
              <Reveal as="div" key={m.label} delayIndex={i} className="flex flex-col items-center text-center">
                <dt className="font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold text-fg">
                  <Counter value={m.value} />
                </dt>
                <dd className="mt-1.5 text-xs sm:text-sm text-muted">{m.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
