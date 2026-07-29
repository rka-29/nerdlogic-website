"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PageHeroProps = {
  watermark: string;
  title: string;
  className?: string;
};

export function PageHero({ watermark, title, className }: PageHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    if (reducedMotion) {
      gsap.set("[data-page-hero]", {
        clearProps: "all",
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const watermarkEl = root.querySelector("[data-page-hero='watermark']");
      const glowEl = root.querySelector("[data-page-hero='glow']");
      const titleEl = root.querySelector("[data-page-hero='title']");

      gsap.set(watermarkEl, { autoAlpha: 0, scale: 0.94 });
      gsap.set(glowEl, { autoAlpha: 0, scale: 0.9 });
      gsap.set(titleEl, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(glowEl, { autoAlpha: 1, scale: 1, duration: 0.65 }, 0)
        .to(
          watermarkEl,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.75,
          },
          0.06,
        )
        .to(
          titleEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
          },
          0.22,
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, watermark, title]);

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative flex min-h-[36vh] items-center justify-center overflow-hidden pb-8 pt-[140px] sm:min-h-[40vh] sm:pt-[160px] lg:pt-[180px]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          data-page-hero="watermark"
          className="mission-watermark font-display select-none text-[48px] font-normal tracking-[-0.04em] sm:text-[88px] lg:text-[140px]"
        >
          {watermark}
        </span>
        <div
          data-page-hero="glow"
          className="mission-glow absolute left-1/2 top-1/2 h-[240px] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <h1
        data-page-hero="title"
        className="mission-headline font-display relative z-10 text-center text-[32px] font-normal tracking-[-0.03em] text-white sm:text-[40px] lg:text-[48px]"
      >
        {title}
      </h1>
    </section>
  );
}
