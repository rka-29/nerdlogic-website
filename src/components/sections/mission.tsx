"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Mission() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-mission='watermark']", {
        opacity: 0.55,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-mission='glow']", {
        scale: 1.12,
        opacity: 0.9,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden py-16 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          data-mission="watermark"
          className="mission-watermark select-none text-[64px] font-semibold tracking-[-0.04em] sm:text-[120px] lg:text-[220px]"
        >
          NerdLogic
        </span>
        <div
          data-mission="glow"
          className="mission-glow absolute left-1/2 top-1/2 h-[340px] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="mission-headline mx-auto max-w-[760px] text-center text-[28px] font-semibold leading-[1.3] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
            We&apos;re NerdLogic. We build
            <br className="hidden sm:block" /> softwares that work{" "}
            <span className="mission-accent">smarter.</span>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
