import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="relative pb-20 pt-8 lg:pb-28 lg:pt-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <Reveal>
              <SectionBadge label="SERVICES" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
                A studio built to assemble your vision
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[#999999] sm:text-[18px]">
                From concept to deployment, we provide end-to-end software
                development tailored to your business needs.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 text-[18px] text-white transition-opacity hover:opacity-70"
            >
              Explore All Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <article className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[70px] border border-white/10 bg-white/[0.1] p-8 sm:min-h-[427px] sm:p-9">
                  <div
                    className="relative mb-8 inline-flex size-[93px] items-center justify-center rounded-full border border-white/10 bg-black/40"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(1,23,255,0.55)]" />
                    <span className="absolute -left-1 -top-1 size-10 rounded-full bg-[#0117FF]/40 blur-md" />
                    <Icon className="relative z-10 size-8 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-[23px] font-semibold tracking-[-0.02em] text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[18px] leading-relaxed text-[#999999]">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="mt-8 inline-flex items-center gap-2 text-[18px] text-white transition-opacity group-hover:opacity-80"
                  >
                    Learn More
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
