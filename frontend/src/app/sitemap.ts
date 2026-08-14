import type { MetadataRoute } from "next";
import { pillars, projects, site, verticals } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date("2026-07-13");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/verticals`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${base}/services/${p.key}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const verticalRoutes: MetadataRoute.Sitemap = verticals.map((v) => ({
    url: `${base}/verticals/${v.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const workRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...verticalRoutes, ...workRoutes];
}
