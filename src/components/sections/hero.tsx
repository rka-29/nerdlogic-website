"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
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

      gsap.to("[data-hero='glow']", {
        y: 28,
        duration: 6,
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
      className="relative overflow-hidden pb-16 pt-[200px] sm:pt-[220px] lg:pb-24 lg:pt-[270px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        data-hero="glow"
      >
        <Image
          src="/assets/hero-glow.png"
          alt=""
          width={1606}
          height={866}
          preload
          className="absolute left-1/2 top-[-40px] w-[120%] max-w-none -translate-x-1/2 opacity-70 sm:top-[-80px] lg:w-[111%]"
          sizes="100vw"
        />
        <div className="absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#0117FF]/opacity-22 blur-[120px]" />
        <div className="absolute right-[-5%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#1928DD]/opacity-18 blur-[110px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div data-hero="badge">
          <SectionBadge label="Digital Product Studio" />
        </div>

        <h1
          data-hero="title"
          className="mt-8 max-w-[820px] text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[60px]"
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
