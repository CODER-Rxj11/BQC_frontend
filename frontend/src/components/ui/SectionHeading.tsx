import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Consistent eyebrow + headline + optional lead used across every section.
 * Headline is large Bebas display, solid colour base (never depends on gradient
 * clipping to be visible), with an optional accent word passed in the title.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex max-w-4xl flex-col gap-3.5 sm:gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 sm:w-10 bg-primary" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delayIndex={1}>
        <h2
          className={cn(
            "text-display-md leading-[0.92]",
            invert ? "text-white" : "text-fg"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delayIndex={2}>
          <p
            className={cn(
              "max-w-prose text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed",
              invert ? "text-tint/85" : "text-muted"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
