import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { projects, site } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.client} — ${project.channel}`,
    description: project.brief,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.client} · ${site.name}`,
      description: project.brief,
      images: [{ url: project.image, width: 1600, height: 900, alt: project.title }],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* Immersive header */}
      <header className="relative flex min-h-[85svh] sm:min-h-[92svh] items-end overflow-hidden bg-ink text-white">
        <Image
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="container-bq relative w-full pb-[clamp(3rem,6vh,5rem)] pt-[clamp(7.5rem,15vh,11rem)]">
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Tag active className="bg-white/90 text-ink">{project.channel}</Tag>
            <span className="text-xs sm:text-sm text-tint/80">{project.year}</span>
          </div>
          <p className="eyebrow text-brand-light">{project.client}</p>
          <AnimatedHeading
            as="h1"
            lines={[project.title]}
            className="mt-3 sm:mt-4 max-w-4xl text-display-lg font-bold"
          />
        </div>
      </header>

      {/* The brief */}
      <section className="bg-bg py-section">
        <div className="container-bq grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14 xl:gap-16 lg:items-start">
          <div className="space-y-4 sm:space-y-6">
            <Reveal>
              <span className="eyebrow flex items-center gap-2.5 sm:gap-3">
                <span className="h-px w-6 sm:w-8 bg-primary" />
                The brief
              </span>
            </Reveal>
            {project.briefImage && (
              <Reveal delayIndex={1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 border border-border shadow-lift">
                  <Image
                    src={project.briefImage}
                    alt={`${project.client} — The brief`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
          <Reveal delayIndex={2}>
            <p className="text-display-md font-semibold leading-tight text-fg lg:pt-2">
              {project.brief}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The canvas + impact */}
      <section className="bg-surface-2 py-section">
        <div className="container-bq grid gap-4 sm:gap-6 sm:grid-cols-3">
          {[
            { label: "The canvas", value: project.canvas },
            { label: "Channel", value: project.channel },
            { label: "Impact", value: project.result },
          ].map((item, i) => (
            <Reveal as="div" key={item.label} delayIndex={i}>
              <div className="rounded-xl2 border border-border bg-bg p-5 sm:p-7 md:p-8 shadow-soft">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-muted">
                  {item.label}
                </p>
                <p className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl font-semibold text-fg">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The execution image */}
      <section className="bg-bg pb-section">
        <div className="container-bq">
          <Reveal>
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl2 border border-border shadow-lift">
              <Image
                src={project.image}
                alt={`${project.client} campaign in the wild`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="bg-ink py-section text-white">
        <div className="container-bq">
          <div className="flex flex-col items-start justify-between gap-6 sm:gap-8 border-b border-white/10 pb-10 sm:pb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-brand-light">Next case</p>
              <Link
                href={`/work/${next.slug}`}
                className="group mt-2 sm:mt-3 block font-display text-2xl sm:text-4xl md:text-5xl font-semibold"
              >
                {next.title}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
            <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
              Start your campaign
            </Button>
          </div>
          <div className="pt-6 sm:pt-8">
            <Link href="/work" className="text-xs sm:text-sm text-tint/80 hover:text-white">
              ← All work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
