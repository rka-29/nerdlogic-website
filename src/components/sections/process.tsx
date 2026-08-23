"use client";

import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section className="relative pb-16 pt-8 lg:pb-24 lg:pt-12">
      <Container>
        <Reveal>
          <SectionBadge label="Our Process" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-6 max-w-[760px] text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
            Three steps. One assembled system.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
            Our streamlined development process ensures your project is delivered
            on time, on budget, and exceeds expectations.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8"
          stagger={0.1}
          y={20}
        >
          {processSteps.map((step) => (
            <div
              key={step.number}
              data-stagger-item
              className="flex flex-col items-center text-center"
            >
              <div className="process-circle group relative flex size-[200px] items-center justify-center rounded-full bg-white/[0.045] shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition-[transform,background-color] duration-[250ms] hover:-translate-y-1 hover:bg-white/[0.07] sm:size-[240px] lg:size-[280px]">
                {/* حدود رفيعة ودقيقة (3px) تلف حوالين الدائرة، لونها متوهج ويدور تلقائياً.
                    تقنية mask-composite: exclude تعرض بس شريط الحدود الرفيع، بدقة تامة —
                    بعكس المحاولة السابقة اللي اعتمدت على دائرة تغطية داخلية. */}
                <span
                  aria-hidden="true"
                  className="process-circle-ring pointer-events-none absolute inset-0 rounded-full"
                />
                <div className="absolute inset-[3px] rounded-full bg-black/25" />
                <div className="relative z-10 max-w-[180px] px-5">
                  <p className="font-display text-[48px] font-normal leading-none tracking-[-0.04em] text-white sm:text-[56px] lg:text-[64px]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-[17px] font-semibold text-white sm:text-[19px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </Container>

      <style jsx global>{`
        .process-circle-ring {
          /* سمك الحدود يتحدد بقيمة padding هنا بالضبط — 3px */
          padding: 3px;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 260deg,
            rgba(107, 182, 255, 0.55) 300deg,
            #ffffff 330deg,
            rgba(107, 182, 255, 0.85) 345deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          /* الحركة متوقفة بشكل افتراضي، تشتغل بس عند hover */
          animation: process-ring-spin 1.8s linear infinite;
          animation-play-state: paused;
        }
        .process-circle:hover .process-circle-ring {
          opacity: 1;
          animation-play-state: running;
        }
        @keyframes process-ring-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-circle-ring {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}