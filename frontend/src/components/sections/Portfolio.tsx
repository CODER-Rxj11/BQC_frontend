"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projects as fallbackProjects, type Project } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const API = (process.env.NEXT_PUBLIC_API_URL || "https://bqc-backend-1.onrender.com").replace(/\/$/, "");

//  * Portfolio — "Gallery of the Streets" (blueprint §2.4).
//  * Asymmetric editorial grid: featured case spans full width, the rest tile in
//  * a deliberately uneven grid for editorial tension.

export function Portfolio() {
  const [items, setItems] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/api/projects`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data as Project[]);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => controller.abort();
  }, []);

  const [featured, ...rest] = items.length ? items : fallbackProjects;

  return (
    <section id="work" className="bg-bg py-section">
      <div className="container-bq">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Real brands. Real streets. <span className="text-gradient">Real impact.</span>
              </>
            }
          />
          <div className="hidden md:block">
            <Button href="/work" variant="secondary">
              View all work →
            </Button>
          </div>
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="mt-8 sm:mt-12 md:mt-14"
        >
          <ProjectCard project={featured} priority aspect="aspect-[16/11] sm:aspect-[16/9] lg:aspect-[21/9]" />
        </motion.div>

        {/* Asymmetric grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {rest.map((p, i) => {
            // Deliberate rhythm: vary column spans across the 6-col grid
            const span = [
              "lg:col-span-3",
              "lg:col-span-3",
              "lg:col-span-2",
              "lg:col-span-2",
              "lg:col-span-2",
            ][i % 5];
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }}
                className={span}
              >
                <ProjectCard project={p} />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 md:hidden">
          <Button href="/work" variant="secondary" className="w-full">
            View all work →
          </Button>
        </div>
      </div>
    </section>
  );
}
