"use client";

import { useLayoutEffect, useRef } from "react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { detailedServices } from "@/data/site";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ServicesList() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const list = listRef.current;
    if (!list || reducedMotion) return;

    const items = list.querySelectorAll("[data-stagger-item]");
    if (!items.length) return;

    gsap.set(items, { autoAlpha: 0, y: 32, scale: 0.97 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: { each: 0.12, from: "start" },
        scrollTrigger: {
          trigger: list,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // الوسوم (Tags) داخل كل بطاقة تدخل وحدة ورا وحدة، كل بطاقة تشتغل
      // على حالها لما توصل الشاشة — مو كلها مع بعض دفعة وحدة.
      items.forEach((card) => {
        const tags = card.querySelectorAll("[data-tag-item]");
        if (!tags.length) return;

        gsap.set(tags, { autoAlpha: 0, x: -10, scale: 0.9 });
        gsap.to(tags, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, list);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <div ref={listRef} className="flex flex-col gap-7">
      {detailedServices.map((service) => {
        const Icon = service.icon;

        return (
          <SurfaceCard
            key={service.title}
            data-stagger-item
            tone="soft"
            className="rounded-[48px] p-7 sm:p-9 lg:p-10"
          >
            <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className="service-icon-circle relative inline-flex size-[72px] items-center justify-center rounded-full bg-black/35"
                    aria-hidden="true"
                  >
                    {/* حلقة رفيعة متوهجة بلون أزرق حوالين الأيقونة، زي التصميم الأصلي */}
                    <span className="service-icon-ring pointer-events-none absolute inset-0 rounded-full" />
                    <span className="absolute -bottom-1 -left-1 size-10 rounded-full bg-[#0066E6]/30 blur-md" />
                    <Icon
                      className="relative z-10 size-7 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
                  {service.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      data-tag-item
                      className="inline-flex min-h-[35px] items-center rounded-full border border-white/15 bg-white/[0.03] px-4 text-[14px] text-white/90 sm:text-[15px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="aspect-[5/4] w-full rounded-[32px] border border-white/5 bg-gradient-to-br from-white/[0.1] to-white/[0.02] lg:aspect-auto lg:min-h-[260px]"
                aria-hidden="true"
              />
            </div>
          </SurfaceCard>
        );
      })}
      </div>

      <style jsx global>{`
        .service-icon-ring {
          padding: 2px;
          background: conic-gradient(
            from 200deg,
            transparent 0deg,
            transparent 200deg,
            rgba(0, 102, 230, 0.5) 260deg,
            #6bb6ff 300deg,
            rgba(0, 102, 230, 0.5) 330deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </>
  );
}