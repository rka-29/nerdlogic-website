import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { ServicesList } from "@/components/services-list";

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
          <ServicesList />
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