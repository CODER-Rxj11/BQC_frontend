import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CareersForm } from "@/components/sections/CareersForm";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the team at ${site.name}. Discover open roles across outdoor media, campaign management, fabrication, and experiential marketing.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers at BrandQube"
        titleLines={["BUILD THE FUTURE OF", "REAL-WORLD MEDIA."]}
        lead="Join a high-octane team of campaign managers, execution specialists, and visibility architects shaping brands across 15+ states."
        image="/careers-hero-team.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />
      <CareersForm />
    </>
  );
}
