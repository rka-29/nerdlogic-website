import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { aboutContent } from "@/data/site";
import { highlightText } from "@/lib/highlight-text";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nerd Logic is a Bahrain-based digital product studio creating innovative digital experiences through strategy, design, and technology.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        watermark={aboutContent.watermark}
        title={aboutContent.title}
      />

      <section className="relative pb-16 pt-6 lg:pb-24">
        <Container>
          <Reveal>
            <SectionBadge label={aboutContent.whoWeAreBadge} />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 max-w-[760px] text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
              {aboutContent.whoWeAreTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[900px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {aboutContent.whoWeAreBody}
            </p>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {aboutContent.pillars.map((pillar) => (
              <SurfaceCard
                key={pillar.title}
                data-stagger-item
                tone="soft"
                className="rounded-[40px] p-8 sm:p-9"
              >
                <h3 className="text-[23px] font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                  {highlightText(pillar.body, pillar.highlights)}
                </p>
              </SurfaceCard>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="relative pb-8 pt-4">
        <Container>
          <Reveal>
            <SectionBadge label="Why Choose Us" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 max-w-[760px] text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
              {aboutContent.whyTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[720px] text-[16px] text-muted sm:text-[18px]">
              {aboutContent.whyBody}
            </p>
          </Reveal>
        </Container>
      </section>

      <Features showHeader={false} />
      <CTA />
    </main>
  );
}
