import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center transition-transform duration-300 ease-out hover:scale-[1.03]",
        className,
      )}
      aria-label="NerdLogic home"
    >
      <span className="text-[22px] font-semibold tracking-[-0.02em] text-white">
        NerdLogic
      </span>
    </Link>
  );
}
