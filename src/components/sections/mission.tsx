import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Mission() {
  return (
    <section id="about" className="relative overflow-hidden py-10 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="select-none text-[72px] font-semibold tracking-[-0.05em] text-[#031671]/opacity-70 sm:text-[140px] lg:text-[280px]">
          NerdLogic
        </span>
        <div className="section-glow absolute inset-x-0 top-1/2 h-[280px] -translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="mx-auto max-w-[720px] text-center text-[28px] font-semibold leading-[1.25] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[38px]">
            We&apos;re NerdLogic. We build
            <br className="hidden sm:block" /> softwares that work{" "}
            <span className="text-[#9CBFFF] [text-shadow:0_0_24px_rgba(1,23,255,0.55)]">
              smarter.
            </span>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
