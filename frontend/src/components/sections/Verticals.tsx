import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { verticals } from "@/lib/data";

/**
 * Verticals — "Our Group" (the group's own business domains / subsidiaries,
 * NOT client industries). Signals breadth of the business beyond core
 * advertising. Card-per-domain, each linking to /verticals/[slug].
 * Follows the Services / Portfolio section patterns and shared UI primitives.
 */
export function Verticals() {
  return (
    <section id="verticals" className="bg-surface-2 py-section">
      <div className="container-bq">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our group"
            title={
              <>
                One group, <span className="text-gradient">multiple domains.</span>
              </>
            }
            lead="We're not just an ad agency. BrandQube spans several business domains — each a specialist in its own right, all pulling the same brand in the same direction."
          />
          <Link
            href="/verticals"
            className="group hidden shrink-0 items-center gap-2 font-semibold text-primary md:inline-flex"
          >
            All verticals
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <Reveal as="div" key={v.slug} delayIndex={i}>
              <Link
                href={`/verticals/${v.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl2 border border-border bg-bg p-5 sm:p-7 md:p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
                aria-label={`Explore ${v.label}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-tint text-xl sm:text-2xl" aria-hidden>
                      {v.icon}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 text-primary opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </div>
                  <h3 className="mt-5 sm:mt-7 text-xl sm:text-2xl font-bold text-fg">{v.headline}</h3>
                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted leading-relaxed">{v.blurb}</p>
                </div>

                <div className="mt-6 sm:mt-8 flex items-center justify-between">
                  <Tag>{v.label}</Tag>
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary">
                    Explore
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/verticals"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-bg py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            All verticals
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
