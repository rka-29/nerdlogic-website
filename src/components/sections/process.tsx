import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
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
          <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed text-[#999999] sm:text-[18px]">
            Our streamlined development process ensures your project is delivered
            on time, on budget, and exceeds expectations.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="flex flex-col items-center text-center">
                <div className="relative flex size-[260px] items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:size-[320px] lg:size-[379px]">
                  <div className="absolute inset-[20px] rounded-full bg-black/20" />
                  <div className="relative z-10 max-w-[220px] px-6">
                    <p className="text-[72px] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[90px] lg:text-[100px]">
                      {step.number}
                    </p>
                    <h3 className="mt-4 text-[20px] font-semibold text-white sm:text-[23px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#999999] sm:text-[18px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
