"use client";

import { useLayoutEffect, useRef } from "react";
import { BrandPattern } from "@/components/brand-pattern";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-orb='a']", {
        x: 80,
        y: 40,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-orb='b']", {
        x: -60,
        y: -50,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-pattern='a']", {
        y: 24,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-pattern='b']", {
        y: -18,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black" />
      <div
        data-orb="a"
        className="absolute -left-[10%] top-[8%] h-[42vw] max-h-[520px] w-[42vw] max-w-[520px] rounded-full bg-[#0117FF]/20 blur-[110px]"
      />
      <div
        data-orb="b"
        className="absolute -right-[8%] top-[28%] h-[38vw] max-h-[460px] w-[38vw] max-w-[460px] rounded-full bg-[#1928DD]/18 blur-[120px]"
      />
      <div
        data-pattern="a"
        className="absolute -right-[12%] top-[12%] w-[min(560px,70vw)] opacity-[0.07] will-change-transform"
      >
        <BrandPattern variant="outline" />
      </div>
      <div
        data-pattern="b"
        className="absolute -left-[16%] bottom-[8%] w-[min(640px,75vw)] opacity-[0.06] will-change-transform"
      >
        <BrandPattern variant="solid" />
      </div>
      <div className="ambient-grid absolute inset-0 opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
