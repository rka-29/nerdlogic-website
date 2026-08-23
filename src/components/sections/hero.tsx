"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionBadge } from "@/components/ui/section-badge";
import { BrandPattern } from "@/components/brand-pattern";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BlurText = dynamic(() => import("@/components/BlurText"), {
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
      {/* خلفية سوداء صريحة خلف النمط الزخرفي */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden="true" />

      {/* نمط العلامة التجارية — تدرج بألوان دليل الهوية الرسمية فقط
          (Primary Blue → Deep Blue → Charcoal → أسود)، ثابت بدون حركة،
          مع بلور قوي (blur-3xl) يعطي إحساس التوهج الناعم بدون فلتر SVG.
          -top-[22%] يرفعه لفوق عشان يبان جزء منه خلف الهيدر (Navbar) مباشرة.
          h-[150%] + stretch يمدّده لعمق أكبر بالصفحة بدل ما يوقف بمنتصفها. */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-[22%] z-[1] h-[150%] opacity-90 blur-xl"
        aria-hidden="true"
      >
        <BrandPattern variant="gradient" decorative stretch />
      </div>

      {/* تلاشي سلس بنهاية الهيرو — يمنع ظهور خط فاصل واضح بين الهيرو
          وقسم Mission تحته، عبر تدرج تدريجي للأسود بآخر جزء من القسم. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent to-black sm:h-56 lg:h-64"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div data-hero="badge">
          <SectionBadge label="Digital Product Studio" />
        </div>

        {/* مسافة فارغة تحافظ على نفس الفراغ اللي كانت تاخذه جملة "Something new..." المحذوفة */}
        <div className="mt-6 h-5" aria-hidden="true" />

        <h1
          data-hero="title"
          className="font-display mt-5 max-w-[900px] px-1 text-[clamp(2rem,4.8vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white"
        >
          <span className="block text-balance">
            Turning Ideas Into Digital Experiences
          </span>
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