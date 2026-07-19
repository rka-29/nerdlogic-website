import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  href?: string;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      width="41"
      height="34"
      viewBox="127 89 41 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[28px] w-auto", className)}
      aria-hidden="true"
    >
      <path
        d="M167.355 89L167.394 123H146.262C142.313 123 142.074 117.344 142.052 117.11L161.111 116.828V97.6932L135.391 122.962H127C127 122.962 131.681 117.914 132.783 116.831C139.424 110.307 161.111 89 161.111 89H168V122.997H167.394L167.355 89Z"
        fill="white"
      />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
  href = "#home",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="NerdLogic home"
    >
      <LogoMark />
      {showWordmark ? (
        <span className="text-[22px] font-semibold tracking-[-0.02em] text-white">
          NerdLogic
        </span>
      ) : null}
    </Link>
  );
}
