import type { Metadata, Viewport } from "next";
import { Raleway, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { site } from "@/lib/data";

// Two-font system (blueprint §04, typography refinement):
//   Body    → Raleway    — clean, modern, elegant, highly readable
//   Display → Bebas Neue — bold, condensed, impactful "billboard" caps
// Loaded via next/font (self-hosted Google Fonts): same families as the
// requested <link> tags, but zero render-blocking requests and no FOUT.
// Raleway carries the full variable weight range (100–900) + italics.
const body = Raleway({
  subsets: ["latin"],
  // Variable font: omit `weight` to load the full 100–900 axis.
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.promise}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "advertising agency Bhopal",
    "hoarding advertising",
    "cab branding",
    "vehicle branding",
    "outdoor advertising India",
    "signage",
    "digital marketing",
    "BrandQube",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.promise}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.promise}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#009BE3",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness schema — strong for local SEO (blueprint §07)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Manya Arcade, R/30, Railway Track Side, Zone-II, M.P. Nagar",
    addressLocality: "Bhopal",
    postalCode: "462016",
    addressCountry: "IN",
  },
  areaServed: "IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileCTA />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
