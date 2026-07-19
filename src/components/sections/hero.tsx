import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-[200px] sm:pt-[220px] lg:pb-24 lg:pt-[270px]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero-glow.png"
          alt=""
          width={1606}
          height={866}
          preload
          className="absolute left-1/2 top-[-40px] w-[120%] max-w-none -translate-x-1/2 opacity-90 sm:top-[-80px] lg:w-[111%]"
          sizes="100vw"
        />
        <div className="absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#0117FF]/opacity-30 blur-[120px]" />
        <div className="absolute right-[-5%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#1928DD]/opacity-25 blur-[110px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <SectionBadge label="Digital Product Studio" />
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 max-w-[820px] text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[60px]">
            Turning Ideas Into Digital
            <br className="hidden sm:block" /> Experiences
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-7 max-w-[760px] text-[16px] leading-[1.55] text-white sm:text-[18px]">
            We combine branding, UX/UI, websites, mobile applications, and
            technology into digital solutions designed to help you grow.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="#contact" variant="primary">
            Get Started
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <Button href="#products" variant="secondary">
            <Play className="size-4 fill-white" aria-hidden="true" />
            View Our Work
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
