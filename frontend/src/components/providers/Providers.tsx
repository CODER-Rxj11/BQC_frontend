"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";

/** Composes client-side providers for the root layout. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
