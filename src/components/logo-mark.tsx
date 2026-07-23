import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

/** Official NerdLogic mark extracted from brand Illustrator file. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 191.5 129.24"
      fill="currentColor"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path
        data-logo-part="left"
        d="M30.75 32.8 4.216 41.224 4.024 109.253c-.024 8.694 4.873 15.755 10.939 15.773L30.49 125.069Z"
      />
      <path
        data-logo-part="body"
        d="M126.735 15.874 126.566 98.729 126.505 125.238H109.446c-.43-.107-.859-.246-1.273-.445-4.695-2.117-8.162-9.419-8.131-18.087L100.195 32.595 30.901 32.166 30.625 4 110.274 4.184c8.943.062 16.185 5.323 16.216 11.782Z"
      />
      <path
        data-logo-part="foot"
        d="M187.499 125.207 126.504 125.238 126.565 98.729 179.921 98.698Z"
      />
    </svg>
  );
}
