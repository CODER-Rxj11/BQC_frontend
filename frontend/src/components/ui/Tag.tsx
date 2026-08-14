import { cn } from "@/lib/utils";

/** Small pill/chip — channel tags, meta labels. */
export function Tag({
  children,
  className,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight transition-colors",
        active
          ? "border-primary bg-tint text-primary"
          : "border-border bg-surface text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
