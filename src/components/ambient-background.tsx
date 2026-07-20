"use client";

import { useLayoutEffect, useRef } from "react";
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
      gsap.to("[data-orb='c']", {
        x: 40,
        y: -70,
        duration: 13,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-orb='d']", {
        scale: 1.25,
        opacity: 0.55,
        duration: 7,
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
        className="absolute -left-[10%] top-[8%] h-[42vw] max-h-[520px] w-[42vw] max-w-[520px] rounded-full bg-[#0117FF]/25 blur-[110px]"
      />
      <div
        data-orb="b"
        className="absolute -right-[8%] top-[28%] h-[38vw] max-h-[460px] w-[38vw] max-w-[460px] rounded-full bg-[#1928DD]/22 blur-[120px]"
      />
      <div
        data-orb="c"
        className="absolute left-[20%] top-[62%] h-[34vw] max-h-[420px] w-[34vw] max-w-[420px] rounded-full bg-[#031671]/35 blur-[100px]"
      />
      <div
        data-orb="d"
        className="absolute right-[18%] top-[78%] h-[28vw] max-h-[340px] w-[28vw] max-w-[340px] rounded-full bg-[#9CBFFF]/12 blur-[90px]"
      />
      <div className="ambient-grid absolute inset-0 opacity-[0.18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
