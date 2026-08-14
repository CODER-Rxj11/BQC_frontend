"use client";

import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "./TiltCard";
import { Tag } from "./Tag";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Case-study tile (blueprint §2.4). Grayscale → colour on hover, subtle tilt,
 * result line revealed on hover, links to the immersive detail page.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
  aspect = "aspect-[4/5]",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <TiltCard className={cn("h-full", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="group block h-full overflow-hidden rounded-xl2 border border-border bg-surface"
      >
        <div className={cn("relative overflow-hidden", aspect)}>
          <Image
            src={project.image}
            alt={`${project.client} — ${project.title}`}
            fill
            priority={priority}
            unoptimized={project.image.startsWith("http")}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover grayscale transition-all duration-700 ease-brand group-hover:scale-105 group-hover:grayscale-0"
          />
          {/* Indigo scrim for legibility */}
          <div className="scrim-ink absolute inset-0" />

          {/* Top meta */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
            <Tag active className="bg-white/90 text-ink text-xs">{project.channel}</Tag>
            <span className="text-xs sm:text-sm font-medium text-white/80">{project.year}</span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-brand-light">
              {project.client}
            </p>
            <h3 className="mt-1 sm:mt-1.5 max-w-md text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white">
              {project.title}
            </h3>

            {/* Result revealed on hover */}
            <div className="grid grid-rows-[0fr] transition-all duration-500 ease-brand group-hover:grid-rows-[1fr] group-hover:pt-2 sm:group-hover:pt-3">
              <div className="overflow-hidden">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-light shrink-0" />
                  {project.result} · {project.canvas}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
