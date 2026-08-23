"use client";

import { useLayoutEffect, useRef } from "react";
import { BrandPattern } from "@/components/brand-pattern";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ParallaxBrandPatternProps = {
  /** المسافة اللي يتحركها النمط أثناء التمرير عبر القسم (بكسل) */
  distance?: number;
  /** شفافية النمط — خليها خفيفة عشان ما تشتت الانتباه عن المحتوى */
  opacityClass?: string;
};

/**
 * نمط العلامة التجارية كخلفية زخرفية خفيفة بتأثير Parallax.
 * يُستخدم داخل أي قسم Hero عبر position: relative على القسم الأب.
 */
export function ParallaxBrandPattern({
  distance = 120,
  opacityClass = "opacity-[0.06]",
}: ParallaxBrandPatternProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const wrapper = wrapperRef.current;
    const pattern = patternRef.current;
    if (!wrapper || !pattern || reducedMotion) return;

    // نستخدم أقرب عنصر أب فيه القسم كامل (section) كمُشغّل للحركة
    const sectionEl = wrapper.closest("section") ?? wrapper.parentElement;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      gsap.to(pattern, {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [distance, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={patternRef}
        className={`absolute inset-x-0 -top-[10%] ${opacityClass}`}
      >
        <BrandPattern variant="outline" decorative />
      </div>
    </div>
  );
}