"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { BrandPattern } from "@/components/brand-pattern";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionBadge } from "@/components/ui/section-badge";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      timeline
        .fromTo(
          "[data-hero='badge']",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
        )
        .fromTo(
          "[data-hero='title']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.18",
        )
        .fromTo(
          "[data-hero='copy']",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.42 },
          "-=0.22",
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.2",
        );

      gsap.to("[data-hero='pattern']", {
        y: 18,
        duration: 7,
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
      id="home"
      className="relative overflow-hidden pb-10 pt-[200px] sm:pt-[220px] lg:pb-16 lg:pt-[270px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-12%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[#0117FF]/opacity-28 blur-[130px]" />
        <div
          data-hero="pattern"
          className="absolute bottom-[-8%] left-1/2 w-[min(1100px,120vw)] -translate-x-1/2 opacity-95 will-change-transform"
        >
          <BrandPattern variant="gradient" />
        </div>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div data-hero="badge">
          <SectionBadge label="Digital Product Studio" />
        </div>

        <h1
          data-hero="title"
          className="font-display mt-8 max-w-[820px] text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[60px]"
        >
          Turning Ideas Into Digital
          <br className="hidden sm:block" /> Experiences
        </h1>

        <p
          data-hero="copy"
          className="mt-7 max-w-[760px] text-[16px] leading-[1.55] text-white sm:text-[18px]"
        >
          We combine branding, UX/UI, websites, mobile applications, and
          technology into digital solutions designed to help you grow.
        </p>

        <div
          data-hero="cta"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Button href="/contact" variant="primary" className="min-w-[180px]">
              Get Started
              <ArrowRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Magnetic>
          <Button href="/products" variant="secondary">
            <Play className="size-4 fill-white" aria-hidden="true" />
            View Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
