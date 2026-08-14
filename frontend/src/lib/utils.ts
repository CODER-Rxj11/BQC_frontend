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
