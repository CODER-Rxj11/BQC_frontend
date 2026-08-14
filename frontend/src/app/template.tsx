"use client";

import { PageTransition } from "@/components/providers/PageTransition";

/**
 * app/template.tsx re-mounts on every navigation, so it's the natural home for
 * the page-transition (curtain reveal + fade-up + scroll reset).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
