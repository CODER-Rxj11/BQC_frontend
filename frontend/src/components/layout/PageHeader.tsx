import Image from "next/image";
import { AnimatedHeading } from "@/components/ui/AnimatedText";

type Crumb = { label: string; href: string };

/**
 * Consistent inner-page header — indigo canvas + kinetic headline, matching the
 * hero/case-study treatment so every route shares one visual language.
 */
export function PageHeader({
  eyebrow,
  titleLines,
  lead,
  image,
}: {
  eyebrow: string;
  titleLines: string[];
  lead?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-[clamp(3rem,6vh,6rem)] pt-[clamp(7.5rem,15vh,11rem)] text-white grain">
      {/* Background Hero Image when provided */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={eyebrow}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 [filter:contrast(1.08)_saturate(1.1)]"
          />
          {/* Gradient overlay for perfect contrast & readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,rgba(0,155,227,0.35),transparent_60%)]" />
        </div>
      )}

      {/* Brand glow to give the flat indigo depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(90%_70%_at_85%_0%,rgba(0,155,227,0.28),transparent_55%)]" />
      <div className="container-bq relative z-10">
        <p className="eyebrow text-brand-light">{eyebrow}</p>
        <AnimatedHeading
          as="h1"
          lines={titleLines}
          className="mt-4 sm:mt-5 max-w-4xl text-display-lg font-bold uppercase"
        />
        {lead && <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-tint/80">{lead}</p>}
      </div>
    </section>
  );
}
