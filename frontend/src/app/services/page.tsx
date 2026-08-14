import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTA } from "@/components/sections/CTA";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Major Advertising & Branding Touchpoints",
  description: `Comprehensive OOH, transit, exhibition, and retail branding solutions across seven core service pillars. One partner from ${site.city} to every touchpoint.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="bg-bg overflow-x-hidden">
      {/* Dynamic Hero Section with Major Services Showcase Image */}
      <ServicesHero />

      {/* Upgraded Bento Grid of Services */}
      <ServicesGrid />

      {/* Conversion CTA */}
      <CTA />
    </main>
  );
}
