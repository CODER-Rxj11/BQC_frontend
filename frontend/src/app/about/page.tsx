import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutUs } from "@/components/sections/AboutUs";
import { DirectorsMessage } from "@/components/sections/DirectorsMessage";
import { PanIndiaPresence } from "@/components/sections/PanIndiaPresence";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: `How ${site.name} grew from the signage floor in Bhopal into a full-stack advertising house across twelve channels.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        titleLines={["THE AGENCY THAT", "OWNS THE STREETS."]}
        lead="From flex, print and hand-painted walls in Bhopal to twelve advertising channels — this is how we make brands impossible to ignore."
        image="/about-hero-studio.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <AboutUs />
      <Process />
      <PanIndiaPresence />
      <DirectorsMessage />
      <Testimonials />
      <CTA />
    </>
  );
}
