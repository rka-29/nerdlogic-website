import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { features } from "@/data/site";
import { cn } from "@/lib/utils";

const glowClass: Record<(typeof features)[number]["glow"], string> = {
  blue: "bg-[#0117FF]/50",
  cyan: "bg-[#3B82F6]/45",
  white: "bg-white/35",
};

export function Features() {
  return (
    <section className="relative overflow-hidden pb-20 pt-6 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/features-glow.png"
          alt=""
          width={1710}
          height={806}
          className="absolute left-1/2 top-[-10%] w-[130%] max-w-none -translate-x-1/2 opacity-70"
          sizes="100vw"
        />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <SectionBadge label="Why Choose Us" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-[21px] md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={index * 0.05}>
                <article
                  className={cn(
                    "relative h-full overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.04] p-8 sm:min-h-[219px] sm:p-9",
                    "transition-colors hover:border-white/20 hover:bg-white/[0.06]",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute bottom-[-40%] left-1/2 h-[140px] w-[180px] -translate-x-1/2 rounded-full blur-[50px]",
                      glowClass[feature.glow],
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <Icon
                      className="mb-5 size-7 text-white"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h3 className="text-[23px] font-semibold tracking-[-0.02em] text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[18px] text-[#999999]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
