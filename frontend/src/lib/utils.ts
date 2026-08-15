import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (conditional + de-duplicated). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded index, e.g. 3 -> "03". */
export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

// Normalized backend API Base URL with fallback and tracking - stash stripping.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://bqc-backend-1.onrender.com"
).replace(/\/$/, "");
