import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/data";

/** Footer — deepest brand-blue surface (blueprint §2 / §5.3). */
export function Footer() {
  const year = 2026; // static to avoid hydration drift; bump on release

  return (
    <footer className="bg-ink text-white">
      <div className="container-bq py-12 sm:py-16 md:py-20">
        {/* Big brand statement */}
        <div className="flex flex-col justify-between gap-6 sm:gap-10 border-b border-white/10 pb-10 sm:pb-14 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-brand-light">{site.tagline}</p>
            <p className="mt-3 sm:mt-4 max-w-xl font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              Make your brand impossible to ignore.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start text-base sm:text-lg font-semibold text-tint hover:text-white lg:self-auto"
          >
            Start your campaign
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/25 transition-all group-hover:border-brand-light group-hover:bg-brand-light group-hover:text-ink">
              →
            </span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-8 sm:gap-10 py-10 sm:py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image src="/logo02.png" alt={site.name} fill sizes="40px" className="object-contain" />
              </div>
              <span className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-none">
                <span className="text-white">Brand</span>
                <span className="text-primary">Qube</span>
              </span>
            </Link>
            <p className="mt-4 sm:mt-5 max-w-xs text-xs sm:text-sm text-tint/70 leading-relaxed">{site.description}</p>
          </div>

          <FooterCol title="Explore" links={nav} />

          <div>
            <p className="text-sm font-semibold text-tint/60">Studio</p>
            <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-tint/80">
              <li className="max-w-xs">{site.address}</li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-tint/60">Social</p>
            <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-tint/80">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:pt-8 text-xs text-tint/50 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>An ad you can scroll through.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-tint/60">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-tint/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
