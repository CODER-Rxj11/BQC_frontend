import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ShowroomWorkGallery } from "@/components/sections/ShowroomWorkGallery";
import { MelaWorkGallery } from "@/components/sections/MelaWorkGallery";
import { CorporateEventsWorkGallery } from "@/components/sections/CorporateEventsWorkGallery";
import { TransitWorkGallery } from "@/components/sections/TransitWorkGallery";
import { DemoVanWorkGallery } from "@/components/sections/DemoVanWorkGallery";
import { WallWrapWorkGallery } from "@/components/sections/WallWrapWorkGallery";
import { Button } from "@/components/ui/Button";
import { getPillar, pillars, projectsForPillar } from "@/lib/data";
import { pad } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.key }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return {
    title: `${pillar.label} Advertising`,
    description: pillar.intro,
    alternates: { canonical: `/services/${pillar.key}` },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const index = pillars.findIndex((p) => p.key === slug);
  const next = pillars[(index + 1) % pillars.length];
  const related = projectsForPillar(slug);
  const isRetailShowroom = slug === "retail-showroom-branding";
  const isOnGroundActivations = slug === "on-ground-activations";
  const isCorporateEvents = slug === "corporate-events-promotions";
  const isTransitBranding = slug === "outdoor-transit-branding" || slug === "transit-advertising";
  const isDemoVan = slug === "demo-van-campaigns" || slug === "demo-van" || slug === "demo-van-activity";
  const isWallWrap = slug === "wall-wrap-advertising" || slug === "wall-wrap" || slug === "wall-wrap-branding";

  return (
    <>
      <PageHeader
        eyebrow={`${pad(index + 1)} — ${pillar.label}`}
        titleLines={[pillar.headline]}
        lead={pillar.intro}
        image={pillar.image}
      />

      {/* Services in this pillar — 2 Column Split Layout with Right-Hand Feature Image */}
      <section className="bg-bg py-section">
        <div className="container-bq">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 sm:w-8 bg-primary" />
            <span className="eyebrow">What&apos;s included</span>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
            {/* Left Column: Services list */}
            <div className="lg:col-span-7 xl:col-span-7">
              <ul className="divide-y divide-hairline border-y border-hairline">
                {pillar.services.map((s, i) => (
                  <Reveal as="li" key={s.name} delayIndex={i}>
                    <div className="grid items-baseline gap-2 py-5 sm:py-7 md:grid-cols-[auto_1fr] md:gap-6 sm:gap-8">
                      <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary/30">
                        {pad(i + 1)}
                      </span>
                      <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-fg">{s.name}</h2>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted leading-relaxed">{s.blurb}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Right Column: Featured Image Frame for this Pillar */}
            <div className="lg:col-span-5 xl:col-span-5">
              {pillar.image && (
                <Reveal as="div" delayIndex={0.2} className="sticky top-28">
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lift transition-all duration-500 hover:border-primary/50">
                    <div className="relative aspect-[4/3] max-h-[420px] w-full overflow-hidden bg-surface-dark">
                      <Image
                        src={pillar.image}
                        alt={pillar.label}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    </div>

                    <div className="absolute top-4 left-4 z-10">
                      <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/15 shadow-md">
                        {pillar.label} Touchpoint
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 border-t border-border bg-surface">
                      <h3 className="text-sm sm:text-base font-bold text-fg">{pillar.headline}</h3>
                      <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
                        {pillar.intro}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        100% Turnkey Execution Guaranteed
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related work — render custom backend stream gallery for retail-showroom, on-ground-activations, corporate-events, transit, demo-van & wall-wrap */}
      {isRetailShowroom ? (
        <ShowroomWorkGallery />
      ) : isOnGroundActivations ? (
        <MelaWorkGallery />
      ) : isCorporateEvents ? (
        <CorporateEventsWorkGallery />
      ) : isTransitBranding ? (
        <TransitWorkGallery />
      ) : isDemoVan ? (
        <DemoVanWorkGallery />
      ) : isWallWrap ? (
        <WallWrapWorkGallery />
      ) : (
        related.length > 0 && (
          <section className="bg-surface-2 py-section">
            <div className="container-bq">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <span className="eyebrow">Proof</span>
                  <h2 className="mt-4 text-display-md font-semibold text-fg">
                    {pillar.label} work in the wild
                  </h2>
                </div>
                <Button href="/work" variant="secondary" className="w-full sm:w-auto">
                  All work →
                </Button>
              </div>
              <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} priority={i < 2} />
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* Next pillar */}
      <section className="bg-bg pb-section pt-12 sm:pt-16 md:pt-20">
        <div className="container-bq flex items-center justify-between border-t border-hairline pt-8 sm:pt-10">
          <Link href="/services" className="text-xs sm:text-sm font-medium text-muted hover:text-primary">
            ← All services
          </Link>
          <Link
            href={`/services/${next.key}`}
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
