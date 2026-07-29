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
      const watermark = root.querySelector("[data-mission='watermark']");
      const glow = root.querySelector("[data-mission='glow']");

      gsap.set(watermark, { autoAlpha: 0, scale: 0.96 });
      gsap.set(glow, { autoAlpha: 0, scale: 0.92 });

      const intro = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      intro
        .to(glow, { autoAlpha: 1, scale: 1, duration: 0.6 })
        .to(
          watermark,
          {
            autoAlpha: 0.42,
            scale: 1,
            duration: 0.7,
          },
          0.05,
        )
        .add(() => {
          // Pulse scale only — don't fight autoAlpha with opacity (caused blink).
          gsap.to(watermark, {
            scale: 1.02,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          gsap.to(glow, {
            scale: 1.1,
            duration: 4.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
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
          className="mission-watermark font-display select-none text-[48px] font-normal tracking-[-0.04em] sm:text-[96px] lg:text-[160px]"
        >
          NerdLogic
        </span>
        <div
          data-mission="glow"
          className="mission-glow absolute left-1/2 top-1/2 h-[260px] w-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="mission-headline font-display mx-auto max-w-[760px] text-center text-[24px] font-normal leading-[1.3] tracking-[-0.02em] sm:text-[30px] lg:text-[36px]">
            We&apos;re NerdLogic. We build
            <br className="hidden sm:block" /> software that works{" "}
            <span className="mission-accent">smarter.</span>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
