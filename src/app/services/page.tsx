import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { detailedServices } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From strategy and branding to websites, mobile applications, and AI-powered solutions built around your vision.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero watermark="Services" title="Services" />

      <section className="relative pb-10 pt-4 lg:pb-16">
        <Container>
          <Reveal>
            <SectionBadge label="What we do" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 max-w-[820px] text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
              Solutions Built Around Your Vision
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[900px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              From strategy and branding to websites, mobile applications, and
              AI-powered solutions, we create digital products designed to solve
              real problems and deliver lasting impact.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-16 lg:pb-24">
        <Container>
          <Stagger className="flex flex-col gap-7" stagger={0.08}>
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
                          className="relative inline-flex size-[72px] items-center justify-center rounded-full border border-white/10 bg-black/35"
                          aria-hidden="true"
                        >
                          <span className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,102,230,0.4)]" />
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
          </Stagger>
        </Container>
      </section>

      <CTA
        title="Not sure which services you need?"
        description={
          "Tell us your vision. We'll create the right solution to bring it to life."
        }
      />
    </main>
  );
}
