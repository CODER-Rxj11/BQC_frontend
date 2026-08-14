import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getVertical, verticals } from "@/lib/data";
import { pad } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) return {};
  return {
    title: vertical.label,
    description: vertical.blurb,
    alternates: { canonical: `/verticals/${vertical.slug}` },
  };
}

export default async function VerticalDetailPage({ params }: Params) {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();

  const index = verticals.findIndex((v) => v.slug === slug);
  const next = verticals[(index + 1) % verticals.length];

  return (
    <>
      <PageHeader
        eyebrow={`${pad(index + 1)} — ${vertical.label}`}
        titleLines={[vertical.headline]}
        lead={vertical.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Verticals", href: "/verticals" },
          { label: vertical.label, href: `/verticals/${vertical.slug}` },
        ]}
      />

      {/* Overview — placeholder copy until confirmed subsidiary detail is supplied */}
      <section className="bg-bg py-section">
        <div className="container-bq grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16 xl:gap-20">
          <Reveal>
            <span className="eyebrow flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-primary" />
              The domain
            </span>
          </Reveal>
          <Reveal delayIndex={1}>
            <div className="max-w-2xl">
              <p className="text-display-md leading-[0.96] text-fg">{vertical.headline}</p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted">{vertical.blurb}</p>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-muted">
                A dedicated team, a distinct P&amp;L, and the full weight of the group behind it —
                so a single brief can move seamlessly across every domain we run.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" className="w-full sm:w-auto">Work with this team</Button>
                <Button href="/verticals" variant="secondary" className="w-full sm:w-auto">
                  All verticals
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next vertical */}
      <section className="bg-surface-2 pb-section pt-12 sm:pt-16 md:pt-20">
        <div className="container-bq flex items-center justify-between border-t border-hairline pt-8 sm:pt-10">
          <Link href="/verticals" className="text-xs sm:text-sm font-medium text-muted hover:text-primary">
            ← All verticals
          </Link>
          <Link
            href={`/verticals/${next.slug}`}
            className="group text-right font-semibold text-fg hover:text-primary"
          >
            <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-muted">Next</span>
            <span className="text-base sm:text-lg">
              {next.label}
              <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
