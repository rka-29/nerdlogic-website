import { cn } from "@/lib/utils";

type SectionBadgeProps = {
  label: string;
  className?: string;
};

export function SectionBadge({ label, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex h-[35px] items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 backdrop-blur-md",
        className,
      )}
    >
      <span
        className="relative inline-flex size-[11px] shrink-0"
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full bg-[var(--brand-primary)]" />
        <span className="absolute -inset-[3px] animate-pulse rounded-full bg-[var(--brand-primary)]/45 blur-[4px]" />
      </span>
      <span className="text-[15px] font-medium tracking-wide text-white">
        {label}
      </span>
    </div>
  );
}
