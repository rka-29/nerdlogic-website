import { cn } from "@/lib/utils";

type SurfaceCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "li";
  interactive?: boolean;
  tone?: "quiet" | "soft" | "raised";
};

const toneClass = {
  quiet:
    "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.16]",
  soft: "bg-white/[0.045] border-white/[0.09] hover:bg-white/[0.075] hover:border-white/[0.18]",
  raised:
    "bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.085] hover:border-white/[0.2]",
} as const;

export function SurfaceCard({
  as: Tag = "article",
  className,
  interactive = true,
  tone = "quiet",
  children,
  ...props
}: SurfaceCardProps) {
  return (
    <Tag
      className={cn(
        "group/card relative overflow-hidden border backdrop-blur-[12px]",
        "transition-[transform,background-color,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        toneClass[tone],
        interactive &&
          "will-change-transform hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(0, 102, 230,0.16)] active:translate-y-0 active:scale-[0.995]",
        className,
      )}
      {...props}
    >
      {interactive ? (
        <span
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          aria-hidden="true"
        >
          <span className="absolute -left-1/4 -top-1/3 h-2/3 w-1/2 rotate-12 bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6BB6FF]/50 to-transparent" />
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
