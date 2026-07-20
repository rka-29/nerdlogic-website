"use client";

import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CTA() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const shell = shellRef.current;
    if (!shell || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shell,
        { autoAlpha: 0, y: 24, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: shell,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, shell);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" className="relative pb-8 pt-10 lg:pb-10 lg:pt-16">
      <Container>
        <Reveal>
          <SectionBadge label="GET IN TOUCH" className="mb-8" />
        </Reveal>

        <div
          ref={shellRef}
          className="cta-shell relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-[52px]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(156,191,255,0.28),transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-[820px]">
            <h2 className="text-[32px] font-semibold tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[16px] leading-relaxed text-white/90 sm:text-[18px]">
              Let&apos;s discuss your ideas and turn them into reality. Contact
              us today for a free consultation.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="mailto:hello@nerdlogic.io" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
