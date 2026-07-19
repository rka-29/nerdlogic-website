import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { products, type ProductStatus } from "@/data/site";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProductStatus, string> = {
  "in-development": "bg-[#148B38] text-white",
  "coming-soon": "bg-[#C59213] text-white",
};

export function Products() {
  return (
    <section id="products" className="relative overflow-hidden pb-20 pt-8 lg:pb-28">
      <div
        className="pointer-events-none absolute -right-[10%] top-[20%] h-[520px] w-[520px] rounded-full bg-[#1928DD]/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-[15%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-[#0117FF]/20 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <Reveal>
              <SectionBadge label="PRODUCTS" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[45px]">
                We also build our own products
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[16px] text-[#999999] sm:text-[18px]">
                Alongside client work, we ship in-house apps.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 text-[18px] text-white transition-opacity hover:opacity-70"
            >
              Explore All Products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-[31px]">
          {products.map((product, index) => (
            <Reveal key={product.name} delay={index * 0.08}>
              <article className="relative overflow-hidden rounded-[70px] border border-white/10 bg-white/[0.1] p-8 sm:p-10 lg:min-h-[339px] lg:p-12">
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

                    <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-[#999999] sm:text-[18px]">
                      {product.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex h-[35px] items-center rounded-full border border-white/20 px-4 text-[15px] text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={product.href}
                      className="mt-8 inline-flex items-center gap-2 text-[18px] text-white transition-opacity hover:opacity-70"
                    >
                      Learn More
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div
                    className="aspect-[4/3] w-full rounded-[40px] bg-[#4E4E4E]/70 sm:aspect-[5/4] lg:aspect-auto lg:h-[255px]"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
