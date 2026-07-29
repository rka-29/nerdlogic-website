import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { yomnaDetail } from "@/data/site";

export const metadata: Metadata = {
  title: "Yomna",
  description: yomnaDetail.description,
};

export default function YomnaPage() {
  return (
    <main>
      <section className="relative overflow-hidden pb-12 pt-[180px] sm:pt-[210px] lg:pb-16 lg:pt-[240px]">
        <Container>
          <Reveal>
            <p className="text-[18px] text-[var(--brand-light)] sm:text-[20px]">
              {yomnaDetail.headline}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <SectionBadge label={yomnaDetail.overviewBadge} className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h1 className="text-[34px] font-semibold tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
                {yomnaDetail.title}
              </h1>
              <span className="inline-flex h-[35px] items-center rounded-full bg-[#148B38] px-4 text-[14px] font-medium text-white">
                {yomnaDetail.statusLabel}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[960px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {yomnaDetail.description}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div
              className="mt-10 aspect-[16/8] w-full rounded-[40px] border border-white/5 bg-gradient-to-br from-white/12 to-white/[0.03]"
              aria-hidden="true"
            />
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <SectionBadge label={yomnaDetail.strategyBadge} />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 max-w-[760px] text-[28px] font-normal tracking-[-0.03em] text-white sm:text-[36px]">
              {yomnaDetail.strategyTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[760px] text-[16px] text-muted sm:text-[18px]">
              {yomnaDetail.strategyBody}
            </p>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SurfaceCard
              data-stagger-item
              tone="soft"
              className="rounded-[40px] p-8"
            >
              <h3 className="text-[22px] font-semibold text-white">
                The Problem
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                {yomnaDetail.problem}
              </p>
            </SurfaceCard>
            <SurfaceCard
              data-stagger-item
              tone="soft"
              className="rounded-[40px] p-8"
            >
              <h3 className="text-[22px] font-semibold text-white">
                Our Approach
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                {yomnaDetail.approach}
              </p>
            </SurfaceCard>
          </Stagger>

          <Reveal className="mt-10">
            <SurfaceCard
              tone="quiet"
              interactive={false}
              className="rounded-[40px] p-8 sm:p-10"
            >
              <p className="text-[14px] font-medium tracking-[0.06em] text-[var(--brand-light)]">
                Primary Goal
              </p>
              <h3 className="mt-3 text-[24px] font-semibold text-white sm:text-[28px]">
                Objectives
              </h3>
              <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
                {yomnaDetail.primaryGoal}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-[18px] font-semibold text-white">
                    Business Objectives
                  </h4>
                  <ul className="mt-4 space-y-2 text-[15px] text-muted">
                    {yomnaDetail.businessObjectives.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[18px] font-semibold text-white">
                    User Objectives
                  </h4>
                  <ul className="mt-4 space-y-2 text-[15px] text-muted">
                    {yomnaDetail.userObjectives.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <SectionBadge label="Capabilities" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-[28px] font-normal text-white sm:text-[36px]">
              Key Features
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[820px] text-[16px] text-muted sm:text-[18px]">
              Yomna brings together everything you need to plan, organize, and
              stay productive. Explore the features that make managing your day
              simpler, smarter, and more efficient.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {yomnaDetail.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <SurfaceCard
                  key={feature.title}
                  data-stagger-item
                  tone="soft"
                  className="rounded-[40px] p-8"
                >
                  <Icon
                    className="size-7 text-white"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-[22px] font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[16px] text-muted">
                    {feature.description}
                  </p>
                </SurfaceCard>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="relative pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <SectionBadge label="Brand Identity" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-[28px] font-normal text-white sm:text-[36px]">
              {yomnaDetail.designTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[860px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {yomnaDetail.designBody}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-12 lg:pb-20">
        <Container>
          <Reveal>
            <SectionBadge label="Outcome" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-[28px] font-normal text-white sm:text-[36px]">
              {yomnaDetail.impactTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[860px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {yomnaDetail.impactBody}
            </p>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {yomnaDetail.outcomes.map((outcome) => (
              <SurfaceCard
                key={outcome.title}
                data-stagger-item
                tone="quiet"
                className="rounded-[32px] p-6"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {outcome.description}
                </p>
              </SurfaceCard>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTA
        title="Interested in Yomna?"
        description={
          "We're always happy to answer questions, schedule a demo, or discuss how our products can help your business."
        }
      />
    </main>
  );
}
