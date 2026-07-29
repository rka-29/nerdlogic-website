"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionBadge } from "@/components/ui/section-badge";
import { HEADLINE_COLORS } from "@/lib/brand-atmosphere";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const GradientText = dynamic(() => import("@/components/GradientText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const BlurText = dynamic(() => import("@/components/BlurText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const ShinyText = dynamic(() => import("@/components/ShinyText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;

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
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
        )
        .fromTo(
          "[data-hero='eyebrow']",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero='title']",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.48 },
          "-=0.18",
        )
        .fromTo(
          "[data-hero='copy']",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.38 },
          "-=0.18",
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative overflow-hidden pb-10 pt-[140px] sm:pt-[160px] lg:pb-14 lg:pt-[180px]"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div data-hero="badge">
          <SectionBadge label="Digital Product Studio" />
        </div>

        <div data-hero="eyebrow" className="mt-6">
          {!reducedMotion ? (
            <ShinyText
              text="Something new is always assembling"
              speed={2.6}
              color="#8eb8ff"
              shineColor="#ffffff"
              className="text-[13px] font-medium tracking-[0.04em] sm:text-[14px]"
            />
          ) : (
            <p className="text-[13px] font-medium tracking-[0.04em] text-[var(--brand-light)] sm:text-[14px]">
              Something new is always assembling
            </p>
          )}
        </div>

        <h1
          data-hero="title"
          className="font-display mt-5 max-w-[900px] px-1 text-[clamp(2rem,4.8vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em]"
        >
          {!reducedMotion ? (
            <GradientText
              colors={[...HEADLINE_COLORS]}
              animationSpeed={7}
              direction="horizontal"
              yoyo
              className="!max-w-none !rounded-none !bg-transparent !backdrop-blur-none !font-normal"
            >
              <span className="block text-balance">
                Turning Ideas Into Digital Experiences
              </span>
            </GradientText>
          ) : (
            <span className="text-white">
              Turning Ideas Into Digital Experiences
            </span>
          )}
        </h1>

        <div data-hero="copy" className="mt-7 max-w-[760px]">
          {!reducedMotion ? (
            <BlurText
              text="We combine branding, UX/UI, websites, mobile applications, and technology into digital solutions designed to help you grow."
              animateBy="words"
              direction="bottom"
              delay={40}
              stepDuration={0.25}
              className="justify-center text-[16px] leading-[1.55] text-white/85 sm:text-[18px]"
            />
          ) : (
            <p className="text-[16px] leading-[1.55] text-white sm:text-[18px]">
              We combine branding, UX/UI, websites, mobile applications, and
              technology into digital solutions designed to help you grow.
            </p>
          )}
        </div>

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
            View Our Work
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
