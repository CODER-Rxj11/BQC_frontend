# BrandQube India — Website

> **The Real World Is Our Canvas.** An award-tier advertising-agency website built as a digital experience that feels like advertising itself — a drive through a branded city.

Implements the approved BrandQube blueprint: the indigo/blue design system, dark mode, Lenis smooth scrolling, GSAP scroll-storytelling, Framer Motion transitions, and a clean, reusable component architecture.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) + **React 19** + TypeScript |
| Styling | **Tailwind CSS** with CSS-variable design tokens (light/dark) |
| Scroll-story / pinning | **GSAP** + ScrollTrigger |
| Micro-interactions / transitions | **Framer Motion** |
| Smooth scroll | **Lenis** (`lenis/react`), driven by the GSAP ticker |

## Getting started

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

> Node 18.18+ required. The `build` script raises the Node heap to 6 GB
> (via `cross-env NODE_OPTIONS=--max-old-space-size=6144`) so the Next build
> worker doesn't OOM on lower-memory machines during static generation.

## Folder structure

```
frontend/
├── src/
│   ├── app/                      # App Router: routes, SEO, transitions
│   │   ├── layout.tsx            # Root shell, fonts, metadata, JSON-LD
│   │   ├── template.tsx          # Per-navigation page transition mount
│   │   ├── page.tsx              # Home (all sections)
│   │   ├── work/                 # /work + /work/[slug] case studies
│   │   ├── globals.css           # Tokens + base + component/utility layers
│   │   ├── sitemap.ts robots.ts manifest.ts not-found.tsx icon.svg
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, MobileCTA
│   │   ├── sections/             # Hero, Services, About, Portfolio,
│   │   │                         #   Clients, Process, Testimonials, CTA, Contact
│   │   ├── ui/                   # Button, Magnetic, AnimatedText, Reveal,
│   │   │                         #   Marquee, Tag, Counter, TiltCard,
│   │   │                         #   ProjectCard, SectionHeading, ThemeToggle
│   │   └── providers/            # Theme, SmoothScroll, PageTransition, Providers
│   ├── hooks/                    # useGSAP, useMediaQuery, useMousePosition
│   └── lib/                      # data.ts (content), gsap.ts, theme.ts, utils.ts
└── public/                       # static assets (icon.svg, add og.jpg)
```

## Pages / routes (multi-page architecture)

| Route | Type | Description |
| --- | --- | --- |
| `/` | Static | Home hub — cinematic drive; every block links to its page |
| `/about` | Static | Story + Process + Testimonials + CTA |
| `/services` | Static | Four-pillar index, each linking to a detail page |
| `/services/[slug]` | SSG ×4 | Pillar detail: services + related work + next pillar |
| `/work` | Static | Case-study gallery grid |
| `/work/[slug]` | SSG ×6 | Immersive case study (brief → canvas → impact → next) |
| `/contact` | Static | The "Brief" lead funnel |
| `sitemap.xml` · `robots.txt` · `manifest.webmanifest` | Static | SEO/PWA |

Navigation uses real routes with active-state highlighting (`aria-current`);
shared sections (`components/sections/*`) are reused across pages so there is a
single source of design truth.

## Design system (100% within the approved palette)

CSS variables in `globals.css` flip the whole system via a single `.dark` class:

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#FFFFFF` | `#242A56` |
| Surface | `#FAFAFA` | `#393A56` |
| Text | `#242A56` | `#FFFFFF` |
| Muted | `#515681` | `#EFF2FF` |
| Primary | `#4D61D6` | `#6878D6` |
| Border | `#E6E6E6` | `#515681` |

Tokens are exposed to Tailwind as `bg`, `surface`, `fg`, `muted`, `primary`,
`secondary`, `tint`, `border` plus fixed `brand`/`ink` anchors for gradients.
All pairings were contrast-checked (blueprint §5.5).

**No-flash dark mode:** a synchronous script (`lib/theme.ts`) applies the
persisted/system theme in `<head>` before paint.

## Signature interactions (blueprint)

- **Hero “Billboard”** — masked kinetic headline + scroll parallax on the media.
- **Services “City Strip”** — GSAP horizontal pin-scroll on desktop; vertical
  snap stack on mobile.
- **Portfolio “Gallery”** — asymmetric grid, grayscale→colour, 3D tilt, result
  reveal on hover, shared route to immersive case studies.
- **Process “Route Map”** — scroll-linked route line drawing between 4 nodes.
- **Page transitions** — indigo curtain reveal + fade-up, with Lenis scroll reset.
- **Mobile sticky CTA** — Call / WhatsApp / Start, always one thumb-tap away.

## Accessibility & performance

- WCAG-checked colour pairings, visible `:focus-visible` rings, skip link,
  `aria-*` on interactive controls.
- `prefers-reduced-motion` disables Lenis, parallax, tilt and transitions.
- `next/font` (self-hosted), `next/image` with AVIF/WebP, lazy loading,
  `optimizePackageImports` for framer-motion & gsap.
- SEO: per-route metadata, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`,
  `LocalBusiness` JSON-LD (strong for local search).

## Brand assets (replace the placeholders)

- **Logo** — `public/logo-light.svg` (white, for dark/hero navbar + footer) and
  `public/logo-dark.svg` (colour, for the scrolled white navbar) are clean SVG
  lockups. Drop your exact artwork over these two paths (keep the filenames) to
  swap in the official logo everywhere at once.
- **Hero video** — the hero renders a `<video>` with a high-res still poster.
  Add `public/hero.mp4` (and optionally `public/hero.webm`, ~8–12s, muted, ~1080p)
  to activate the reel; until then the crisp poster shows with no broken state.

## Integration notes / TODO

- **Content** lives in `src/lib/data.ts` — swap for a CMS/API without touching
  components. The Python `backend/` (sibling folder) can serve `/api/lead`.
- **Contact form** currently sets a success state locally; wire `onSubmit`
  in `components/sections/Contact.tsx` to the backend.
- **Imagery** uses Unsplash placeholders (allow-listed in `next.config.mjs`).
  Replace with the commissioned install shoot and add `public/og.jpg`
  (1200×630) for social cards.
- **Contact details** (`phone`, `whatsapp`, `email`, `url`) are placeholders in
  `data.ts` — set real values before launch.
```
