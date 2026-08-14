import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MasterWorkGallery } from "@/components/sections/MasterWorkGallery";
import { CTA } from "@/components/sections/CTA";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work & Portfolio",
  description: `Live campaigns from ${site.name} — showroom developments, mobile demo vans, on-ground melas, transit media, wall wraps, and corporate events. Real brands, real impact.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work Gallery"
        titleLines={["REAL CAMPAIGNS.", "PROVEN IMPACT."]}
        lead="Explore authentic campaign photography from live executions across India — showroom developments, mobile demo vans, on-ground melas, transit media, large-format wall wraps, and corporate events."
        image="/work/work-hero-streets.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
        ]}
      />

      {/* Master Interactive Work Gallery for all 6 seed asset folders */}
      <MasterWorkGallery />

      <CTA />
    </>
  );
}

