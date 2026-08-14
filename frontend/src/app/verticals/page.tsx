import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { site, verticals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Verticals",
  description: `The business domains of ${site.name} — OOH advertising, event management and digital marketing. One group, multiple specialist domains.`,
  alternates: { canonical: "/verticals" },
};

export default function VerticalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our group"
        titleLines={["MORE THAN", "AN AD AGENCY."]}
        lead="BrandQube spans several business domains — each a specialist in its own right, all pulling the same brand in the same direction."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Verticals", href: "/verticals" },
        ]}
      />

      <section className="bg-bg py-section">
        <div className="container-bq grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <Reveal as="div" key={v.slug} delayIndex={i}>
              <Link
                href={`/verticals/${v.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl2 border border-border bg-surface p-5 sm:p-7 md:p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
                aria-label={`Explore ${v.label}`}
              >
                <div>
                  <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-tint text-xl sm:text-2xl" aria-hidden>
                    {v.icon}
                  </span>
                  <h2 className="mt-5 sm:mt-7 text-xl sm:text-2xl font-bold text-fg sm:text-[1.7rem]">{v.headline}</h2>
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-muted leading-relaxed">{v.blurb}</p>
                </div>
                <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-border/60 pt-4">
                  <Tag>{v.label}</Tag>
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-primary">
                    Explore
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
