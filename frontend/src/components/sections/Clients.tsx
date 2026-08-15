"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { clients as fallbackNames } from "@/lib/data";

/**
 * Clients — "The Ticker" (blueprint §2.5).
 * A SINGLE continuous row. Logos are fetched from the backend (MongoDB/GridFS),
 * shown in full colour and generously spaced so one full set spans more than the
 * viewport — meaning a logo never reappears until the whole set has passed.
 * Falls back to text names if the API is unreachable.
 */
type ClientLogo = { id: string; name: string; logoUrl: string };

const API = (process.env.NEXT_PUBLIC_API_URL || "http://bqc-backend-1.onrender.com").replace(/\/$/,"");

// Responsive fluid gap — perfectly spaced across phones, tablets, and wide screens
const GAP = "gap-[clamp(2.5rem,6vw,6rem)] pr-[clamp(2.5rem,6vw,6rem)]";

export function Clients() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/clients`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length) setLogos(data as ClientLogo[]);
      })
      .catch(() => {
        /* API down / no env — keep the text fallback */
      });
    return () => controller.abort();
  }, []);

  const hasLogos = logos.length > 0;

  // Every logo sits in a fluid-size box and is contained within it
  const renderLogo = (l: ClientLogo) => (
    <span className="flex h-16 w-[140px] items-center justify-center sm:h-22 sm:w-[190px] md:h-28 md:w-[240px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={l.logoUrl}
        alt={l.name}
        loading="lazy"
        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </span>
  );

  const renderName = (name: string) => (
    <span className="select-none font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold text-fg/70 transition-colors duration-300 hover:text-primary">
      {name}
    </span>
  );

  return (
    <section className="border-y border-hairline bg-surface-2 py-12 sm:py-16 overflow-hidden">
      <div className="container-bq mb-8 sm:mb-12">
        <Reveal>
          <p className="text-center text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-muted">
            Trusted to put 200+ brands where their customers are
          </p>
        </Reveal>
      </div>

      {hasLogos ? (
        <Marquee items={logos} renderItem={renderLogo} duration={32} gapClassName={GAP} />
      ) : (
        <Marquee items={fallbackNames} renderItem={renderName} duration={38} gapClassName={GAP} />
      )}
    </section>
  );
}
