import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Mission />
      <Features />
      <Services />
      <Products />
      <Process />
      <CTA />
    </main>
  );
}
