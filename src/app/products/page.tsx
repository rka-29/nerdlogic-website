import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { CTA } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { products } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Alongside client work, NerdLogic is building its own products: innovative digital products for real-world challenges.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero watermark="Products" title="Products" />

      <section className="relative pb-16 pt-4 lg:pb-24">
        <Container>
          <Reveal>
            <SectionBadge label="What we  create" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-[820px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
              Products Built for the Future
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[900px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
              Alongside client work, NerdLogic is building its own products. We
              design and develop innovative digital products that solve
              real-world challenges through thoughtful design, intelligent
              technology, and scalable solutions.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
            {products.map((product) => (
              <SurfaceCard
                key={product.slug}
                data-stagger-item
                tone="soft"
                className="group flex h-full flex-col overflow-hidden rounded-[48px] p-0"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-white/15 to-white/[0.04]">
                  <span
                    className={cn(
                      "absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium text-white",
                      product.status === "in-development"
                        ? "bg-[#148B38]"
                        : "bg-[#C59213]",
                    )}
                  >
                    {product.status === "in-development" ? (
                      <Sparkles className="size-3.5" aria-hidden="true" />
                    ) : (
                      <Clock className="size-3.5" aria-hidden="true" />
                    )}
                    {product.statusLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="text-[13px] font-medium tracking-[0.08em] text-[#9CBFFF]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-[28px] font-semibold text-white sm:text-[32px]">
                    {product.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                    {product.shortDescription}
                  </p>

                  <div className="mt-6 flex justify-end">
                    <Link
                      href={product.href}
                      aria-label={`Learn more about ${product.name}`}
                      className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-[0_0_20px_rgba(1,23,255,0.35)] transition-transform duration-200 group-hover:scale-105"
                    >
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTA
        title="Interested in One of Our Products?"
        description={
          "We're always happy to answer questions, schedule a demo, or discuss how our products can help your business."
        }
      />
    </main>
  );
}
