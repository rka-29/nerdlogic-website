import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
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
              <h2 className="font-display mt-6 text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
                A studio built to assemble your vision
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
                From concept to deployment, we provide end-to-end software
                development tailored to your business needs.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Link
              href="/services"
              className="link-quiet inline-flex min-h-[44px] items-center gap-2 text-[18px] text-white"
            >
              Explore All Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid grid-cols-1 gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <SurfaceCard
                key={service.title}
                data-stagger-item
                tone="soft"
                className="group flex h-full min-h-[300px] flex-col rounded-[40px] p-7 sm:min-h-[320px] sm:rounded-[48px] sm:p-8"
              >
                <div
                  className="relative mb-6 inline-flex size-[72px] items-center justify-center rounded-full border border-white/10 bg-black/35 transition-transform duration-[250ms] group-hover:scale-[1.04]"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,102,230,0.35)]" />
                  <span className="absolute -left-1 -top-1 size-8 rounded-full bg-[var(--brand-primary)]/25 blur-md" />
                  <Icon
                    className="relative z-10 size-7 text-white"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-display text-[20px] font-normal tracking-[-0.02em] text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted sm:text-[16px]">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[15px] text-white transition-all duration-200 group-hover:gap-3 sm:text-[16px]"
                >
                  Learn More
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </SurfaceCard>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
