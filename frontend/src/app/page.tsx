import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { PanIndiaPresence } from "@/components/sections/PanIndiaPresence";
import { Verticals } from "@/components/sections/Verticals";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

/**
 * Home — the cinematic "drive through a branded city" hub (blueprint §00).
 * Section order follows the UX flow (Land → Intrigue → Proof → Trust → Convert)
 * and every block links out to its dedicated page in the multi-page structure.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Clients />
      <PanIndiaPresence />
      <Verticals />
      <Portfolio />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
