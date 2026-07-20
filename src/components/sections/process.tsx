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
          <h2 className="mt-6 max-w-[760px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
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
              <div className="group relative flex size-[260px] items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.045] shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition-[transform,border-color,background-color] duration-[250ms] hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.07] sm:size-[320px] lg:size-[379px]">
                <div className="absolute inset-[20px] rounded-full bg-black/25" />
                <div className="relative z-10 max-w-[220px] px-6">
                  <p className="text-[72px] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[90px] lg:text-[100px]">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-[20px] font-semibold text-white sm:text-[23px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted sm:text-[18px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
