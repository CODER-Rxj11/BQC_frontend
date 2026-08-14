"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite CSS marquee (blueprint §2.5 "The Ticker").
 * Content is duplicated so the -50% keyframe loops seamlessly.
 * Pauses on hover; direction is configurable for the two opposing rows.
 * Generic over the item type so it can render text names or logo objects.
 */
export function Marquee<T = string>({
  items,
  reverse = false,
  duration = 40,
  className,
  gapClassName = "gap-12 pr-12",
  renderItem,
}: {
  items: T[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  /** Controls spacing between items (and the trailing pad, which must match). */
  gapClassName?: string;
  renderItem?: (item: T, index: number) => React.ReactNode;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("group/marquee relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]",
          gapClassName,
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <span key={i} className="shrink-0">
            {renderItem ? renderItem(item, i) : String(item)}
          </span>
        ))}
      </div>
    </div>
  );
}
