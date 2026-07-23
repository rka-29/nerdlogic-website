"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { SplashScreen } from "@/components/splash-screen";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import "./coming-soon.css";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });
// react-bits JSX components lack complete prop types — loosen for consumption
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const GradientText = dynamic(() => import("@/components/GradientText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const TrueFocus = dynamic(() => import("@/components/TrueFocus"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const ShinyText = dynamic(() => import("@/components/ShinyText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;
const BlurText = dynamic(() => import("@/components/BlurText"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;

const AURORA_STOPS = ["#0066E6", "#6BB6FF", "#003DA5"];
const PARTICLE_COLORS = ["#FFFFFF", "#6BB6FF", "#0066E6", "#003DA5"];
const HEADLINE_COLORS = ["#FFFFFF", "#6BB6FF", "#0066E6", "#003DA5"];

export function ComingSoon() {
  const reducedMotion = usePrefersReducedMotion();
  const logoTargetRef = useRef<HTMLDivElement>(null);
  const [revealing, setRevealing] = useState(false);
  const [logoLanded, setLogoLanded] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  const showScene = revealing || splashDone;

  return (
    <div className="fixed inset-0 z-[100] h-dvh w-dvw overflow-hidden overscroll-none bg-black text-white">
      {!splashDone ? (
        <SplashScreen
          logoTargetRef={logoTargetRef}
          onMorphStart={() => setRevealing(true)}
          onLogoLand={() => setLogoLanded(true)}
          onComplete={() => setSplashDone(true)}
        />
      ) : null}

      {/* Wallpaper reveals as iris dissolves */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-[900ms] ease-out",
          showScene ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      >
        {showScene && !reducedMotion ? (
          <>
            <div className="absolute inset-0">
              <Aurora
                colorStops={AURORA_STOPS}
                amplitude={1.2}
                blend={0.6}
                speed={0.7}
              />
            </div>
            <div className="absolute inset-0 opacity-70">
              <Particles
                className="h-full w-full"
                particleCount={160}
                particleSpread={12}
                speed={0.08}
                particleColors={PARTICLE_COLORS}
                alphaParticles
                particleBaseSize={90}
                sizeRandomness={0.9}
                cameraDistance={22}
                moveParticlesOnHover
                particleHoverFactor={0.4}
              />
            </div>
          </>
        ) : showScene ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,102,230,0.5),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(0,61,165,0.45),_transparent_50%)]" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header className="shrink-0 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 lg:px-12">
          <div
            ref={logoTargetRef}
            className="inline-flex"
            style={{
              // Instant swap with splash lockup — no CSS fade (that caused the blink).
              opacity: logoLanded || splashDone ? 1 : 0,
              visibility: logoLanded || splashDone ? "visible" : "hidden",
            }}
          >
            <Logo
              href={null}
              markClassName="h-6 w-auto sm:h-7"
              wordmarkClassName="text-[22px] sm:text-[24px]"
            />
          </div>
        </header>

        <main
          className={cn(
            "flex flex-1 flex-col items-center justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-700 ease-out",
            showScene
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0",
          )}
        >
          <div className="flex w-full max-w-[900px] flex-col items-center text-center">
            <div className="coming-soon-focus mb-8 sm:mb-10">
              {showScene && !reducedMotion ? (
                <TrueFocus
                  sentence="Ideating Designing Building Launching"
                  blurAmount={4}
                  borderColor="#6BB6FF"
                  glowColor="rgba(0, 102, 230, 0.65)"
                  animationDuration={0.55}
                  pauseBetweenAnimations={1.2}
                />
              ) : (
                <p className="text-[15px] font-medium tracking-wide text-[#6BB6FF]">
                  Building
                </p>
              )}
            </div>

            <div className="mb-3">
              <ShinyText
                text="Something new is on the way"
                speed={2.4}
                color="#8eb8ff"
                shineColor="#ffffff"
                className="text-[13px] font-medium tracking-[0.04em] sm:text-[14px]"
              />
            </div>

            <h1 className="font-display mt-2 w-full px-1 text-[clamp(2rem,6.2vw,3.75rem)] font-normal leading-[1.1] tracking-[-0.03em]">
              {showScene && !reducedMotion ? (
                <GradientText
                  colors={HEADLINE_COLORS}
                  animationSpeed={7}
                  direction="horizontal"
                  yoyo
                  className="!max-w-none !rounded-none !bg-transparent !backdrop-blur-none !font-normal"
                >
                  <span className="block text-balance">
                    Turning Ideas Into Digital Experiences
                  </span>
                </GradientText>
              ) : (
                <BlurText
                  text="Turning Ideas Into Digital Experiences"
                  animateBy="words"
                  direction="top"
                  delay={80}
                  className="justify-center text-white"
                />
              )}
            </h1>

            {showScene && !reducedMotion ? (
              <div className="mt-6 w-full max-w-[640px]">
                <BlurText
                  text="A living canvas while we craft the next chapter of NerdLogic."
                  animateBy="words"
                  direction="bottom"
                  delay={60}
                  stepDuration={0.28}
                  className="justify-center text-[15px] leading-relaxed text-white/70 sm:text-[16px]"
                />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
