"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/logo-mark";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * مؤشر ماوس مخصص بشكل شعار الشركة (بدل الدائرة).
 * - يتبع الماوس بتأخير بسيط (lag) عبر gsap.quickTo
 * - يكبر شوي لما يمر فوق روابط أو أزرار أو أي عنصر عليه data-cursor-hover
 * - يختفي تماماً على الموبايل/التاتش وعند تفضيل تقليل الحركة
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // تجاهل الأجهزة اللي أساسها لمس (موبايل/تابلت) — ما فيها "ماوس" أصلاً
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice || reducedMotion) return;

    registerGsap();
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("custom-cursor-active");

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea",
      );
      gsap.to(cursor, {
        scale: interactive ? 1.6 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeaveWindow = () => {
      gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
    };
    const onEnterWindow = () => {
      gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* يخفي مؤشر النظام الافتراضي فقط لما هذا المكوّن يكون شغال */}
      <style jsx global>{`
        @media (pointer: fine) {
          body.custom-cursor-active,
          body.custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] -translate-x-1/2 -translate-y-1/2 text-[#0117FF]"
      >
        <LogoMark className="h-3.5 w-auto" />
      </div>
    </>
  );
}