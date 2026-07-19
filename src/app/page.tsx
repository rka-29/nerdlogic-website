import { Navbar } from "@/components/navbar";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <Services />
      <Products />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
