import { cn } from "@/lib/utils";

type SurfaceCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "li";
  interactive?: boolean;
  tone?: "quiet" | "soft" | "raised";
};

const toneClass = {
  quiet: "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.055] hover:border-white/[0.14]",
  soft: "bg-white/[0.045] border-white/[0.09] hover:bg-white/[0.07] hover:border-white/[0.16]",
  raised: "bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.18]",
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
        "relative overflow-hidden border backdrop-blur-[10px]",
        "transition-[transform,background-color,border-color,box-shadow] duration-[250ms] ease-out",
        toneClass[tone],
        interactive &&
          "will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(1,23,255,0.12)] active:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
