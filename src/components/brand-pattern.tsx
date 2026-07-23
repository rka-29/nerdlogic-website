import { useId } from "react";
import { cn } from "@/lib/utils";

export type BrandPatternVariant = "gradient" | "solid" | "outline";

type BrandPatternProps = {
  variant?: BrandPatternVariant;
  className?: string;
  decorative?: boolean;
};

/**
 * ADH / NerdLogic brand pattern (guideline p.8).
 *
 * Two staggered bars:
 * - Top: sharp corners except large top-right radius
 * - Bottom: sharp corners except large bottom-left radius, offset right
 *
 * gradient = v01 · solid = v02 · outline = v03
 */
export function BrandPattern({
  variant = "gradient",
  className,
  decorative = true,
}: BrandPatternProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `brand-pattern-${uid}`;
  const isOutline = variant === "outline";

  const fill =
    variant === "gradient"
      ? `url(#${gradId})`
      : variant === "solid"
        ? "#0066E6"
        : "none";

  return (
    <svg
      viewBox="0 0 900 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block h-auto w-full", className)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "NerdLogic brand pattern"}
    >
      {variant === "gradient" ? (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6BB6FF" />
            <stop offset="18%" stopColor="#0066E6" />
            <stop offset="55%" stopColor="#0066E6" stopOpacity="0.85" />
            <stop offset="82%" stopColor="#003DA5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <filter
            id={`${gradId}-glow`}
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      ) : null}

      <g filter={variant === "gradient" ? `url(#${gradId}-glow)` : undefined}>
        <path
          d="M40 55 H390 A155 155 0 0 1 545 210 V210 H40 Z"
          fill={fill}
          stroke={isOutline ? "#0066E6" : undefined}
          strokeWidth={isOutline ? 3 : undefined}
        />
        <path
          d="M310 250 H815 V405 H465 A155 155 0 0 1 310 250 Z"
          fill={fill}
          stroke={isOutline ? "#0066E6" : undefined}
          strokeWidth={isOutline ? 3 : undefined}
        />
      </g>
    </svg>
  );
}
