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
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-48"
    >
      {/* الكلمة الكبيرة والنص فوقها يشتركون بنفس الحاوية (Flex + inset-0)
          عشان يكونون متمركزين رأسياً بنفس النقطة بالضبط — النص يطلع
          بمنتصف ارتفاع الكلمة تلقائياً، بدل ما يعتمد على تدفق الصفحة العادي. */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          data-mission="watermark"
          className="mission-watermark font-display
           select-none text-[clamp(2.5rem,10vw,170px)] font-normal tracking-[0.06em] blur-[1.5px]"
          style={{ color: "#0117FF" }}
        >
          NerdLogic
        </span>
        <div
          data-mission="glow"
          className="mission-glow absolute left-1/2 top-1/2 h-[260px] w-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Container className="relative z-10">
          <Reveal>
            <h2 className="mission-headline font-display pointer-events-auto mx-auto max-w-[680px] text-center text-[22px] font-normal leading-[1.3] tracking-[-0.02em] sm:text-[27px] lg:text-[32px]">
              We&apos;re NerdLogic.{" "}
              <span className="mission-accent">We build</span>
              <br className="hidden sm:block" /> software that works{" "}
              <span className="mission-accent">smarter.</span>
            </h2>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}