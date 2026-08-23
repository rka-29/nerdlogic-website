import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { products, type ProductStatus } from "@/data/site";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProductStatus, string> = {
  "in-development": "bg-[#148B38] text-white",
  "coming-soon": "bg-[#C59213] text-white",
};

export function Products() {
  return (
    <section id="products" className="relative overflow-hidden pb-20 pt-8 lg:pb-28">
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <Reveal>
              <SectionBadge label="Featured Products" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-6 text-[28px] font-normal leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
                We also build our own products
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[16px] text-muted sm:text-[18px]">
                Alongside client work, we ship in-house apps.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Link
              href="/products"
              className="link-quiet inline-flex min-h-[44px] items-center gap-2 text-[18px] text-white"
            >
              Explore All Products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 flex flex-col gap-[31px]" stagger={0.12}>
          {products.map((product) => (
            <SurfaceCard
              key={product.name}
              data-stagger-item
              tone="soft"
              className="rounded-[32px] p-5 sm:rounded-[36px] sm:p-6 lg:min-h-[200px] lg:p-7"
            >
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[23px] font-semibold tracking-[-0.02em] text-white">
                      {product.name}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex h-[35px] items-center rounded-full px-4 text-[15px] font-medium",
                        statusStyles[product.status],
                      )}
                    >
                      {product.statusLabel}
                    </span>
                  </div>

                  <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-muted sm:text-[18px]">
                    {product.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex h-[35px] items-center rounded-full border border-white/15 bg-white/[0.03] px-4 text-[15px] text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={product.href}
                    className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-[18px] text-white transition-all duration-200 hover:gap-3"
                  >
                    Learn More
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>

                <div
                  className="aspect-[4/3] w-full rounded-[28px] border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] sm:aspect-[5/4] lg:aspect-auto lg:h-[170px]"
                  aria-hidden="true"
                />
              </div>
            </SurfaceCard>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}