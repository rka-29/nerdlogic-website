import { useId } from "react";
import { cn } from "@/lib/utils";

export type BrandPatternVariant = "gradient" | "solid" | "outline";

type BrandPatternProps = {
  variant?: BrandPatternVariant;
  className?: string;
  decorative?: boolean;
  /** إذا true، الرسمة تتمدد لتملأ ارتفاع الحاوية كامل بدل الحفاظ على نسبة أبعادها الأصلية */
  stretch?: boolean;
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
  stretch = false,
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
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      className={cn(stretch ? "block h-full w-full" : "block h-auto w-full", className)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "NerdLogic brand pattern"}
    >
      {variant === "gradient" ? (
        <defs>
          {/* تدرج الشريط الفوقي: ساطع من بداية الصفحة → غامق نحو النهاية */}
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="0">
            <stop offset="0%" stopColor="#0117FF" />
            <stop offset="18%" stopColor="#0117FF" />
            <stop offset="22%" stopColor="#0116F3" />
            <stop offset="64%" stopColor="#031671" />
            <stop offset="82%" stopColor="#04163D" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          {/* تدرج الشريط السفلي: نفس الألوان بس بالعكس — غامق نحو البداية
              (يلتقي مع نهاية الشريط الفوقي)، وساطع نحو نهاية الصفحة */}
          <linearGradient
            id={`${gradId}-rev`}
            gradientUnits="userSpaceOnUse"
            x1="900"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stopColor="#0117FF" />
            <stop offset="18%" stopColor="#0117FF" />
            <stop offset="22%" stopColor="#0116F3" />
            <stop offset="64%" stopColor="#031671" />
            <stop offset="82%" stopColor="#04163D" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
      ) : null}

      <g>
        <path
          d="M0 55 H390 A155 155 0 0 1 545 210 V210 H0 Z"
          fill={fill}
          stroke={isOutline ? "#0066E6" : undefined}
          strokeWidth={isOutline ? 3 : undefined}
        />
        <path
          d="M310 250 H900 V405 H465 A155 155 0 0 1 310 250 Z"
          fill={variant === "gradient" ? `url(#${gradId}-rev)` : fill}
          stroke={isOutline ? "#0066E6" : undefined}
          strokeWidth={isOutline ? 3 : undefined}
        />
      </g>
    </svg>
  );
}