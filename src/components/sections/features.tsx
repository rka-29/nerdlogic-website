import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { features } from "@/data/site";
import { cn } from "@/lib/utils";

const glowClass: Record<(typeof features)[number]["glow"], string> = {
  blue: "bg-[var(--brand-primary)]/30",
  cyan: "bg-[var(--brand-light)]/25",
  white: "bg-white/20",
};

type FeaturesProps = {
  showHeader?: boolean;
};

export function Features({ showHeader = true }: FeaturesProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-2 lg:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[10%] h-[280px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/10 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {showHeader ? (
          <Reveal>
            <SectionBadge label="Why Choose Us" />
          </Reveal>
        ) : null}

        <Stagger
          className={cn(
            "grid grid-cols-1 gap-[21px] md:grid-cols-2 xl:grid-cols-3",
            "mt-8",
          )}
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <SurfaceCard
                key={feature.title}
                data-stagger-item
                tone="quiet"
                className="rounded-[36px] bg-gradient-to-br from-black/70 via-black/50 to-[#0B1A4D]/60 p-6 sm:min-h-[180px] sm:rounded-[40px] sm:p-7"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-[-45%] left-1/2 h-[120px] w-[160px] -translate-x-1/2 rounded-full blur-[56px]",
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
                  <h3 className="font-display text-[23px] font-semibold tracking-[-0.02em] text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[18px] text-muted">{feature.description}</p>
                </div>
              </SurfaceCard>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}