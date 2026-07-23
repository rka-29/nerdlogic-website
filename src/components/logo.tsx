import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string | null;
  showMark?: boolean;
  markClassName?: string;
  wordmarkClassName?: string;
};

export function Logo({
  className,
  href = "/",
  showMark = true,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  const content = (
    <>
      {showMark ? (
        <LogoMark className={cn("h-[22px] w-auto text-white", markClassName)} />
      ) : null}
      <span
        className={cn(
          "font-display text-[22px] font-normal tracking-[-0.02em] text-white",
          wordmarkClassName,
        )}
      >
        NerdLogic
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2.5 transition-transform duration-300 ease-out",
    href ? "hover:scale-[1.03]" : null,
    className,
  );

  if (!href) {
    return (
      <div className={classes} aria-label="NerdLogic">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={classes} aria-label="NerdLogic home">
      {content}
    </Link>
  );
}
