import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a campaign with ${site.name}. Tell us where you want to show up — outdoor, on-vehicle, on-ground or online — and we'll build the mix.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a campaign"
        titleLines={["LET'S PUT YOU", "EVERYWHERE."]}
        lead="Tell us where you want to show up. We reply within a few hours — and yes, you can just call us."
        image="/contact-hero-network.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <Contact />
    </>
  );
}
