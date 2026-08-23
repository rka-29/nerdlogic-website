"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { SplashScreen } from "@/components/splash-screen";
import { CustomCursor } from "@/components/custom-cursor";

const BrandAtmosphere = dynamic(
  () =>
    import("@/components/brand-atmosphere").then((mod) => mod.BrandAtmosphere),
  { ssr: false },
);

function unlockPageScroll() {
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logoTargetRef = useRef<HTMLDivElement>(null);
  const [splashActive, setSplashActive] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(true);
  const isHome = pathname === "/";
  const showParticles = isHome;

  // Replay splash whenever the user lands on home (including soft navigations).
  useEffect(() => {
    unlockPageScroll();

    if (!isHome) {
      setSplashActive(false);
      setLogoVisible(true);
      setSceneReady(true);
      return;
    }

    setSplashActive(true);
    setLogoVisible(false);
    setSceneReady(false);

    return () => unlockPageScroll();
  }, [isHome]);

  useEffect(() => {
    if (!splashActive) {
      unlockPageScroll();
      return;
    }
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      unlockPageScroll();
    };
  }, [splashActive]);

  const endSplash = () => {
    setSplashActive(false);
    setLogoVisible(true);
    setSceneReady(true);
    unlockPageScroll();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <CustomCursor />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {splashActive ? (
        <SplashScreen
          key="home-splash"
          logoTargetRef={logoTargetRef}
          onMorphStart={() => setSceneReady(true)}
          onLogoLand={() => setLogoVisible(true)}
          onComplete={endSplash}
        />
      ) : null}

      {/* تأثير Aurora العام معطّل — الهيرو صار عنده نمطه الخاص، وباقي الصفحة
          تبقى سودا نظيفة بدون تلوين أزرق عام يشوش على الخلفية. */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black" />

      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar logoTargetRef={logoTargetRef} logoVisible={logoVisible} />
        <div id="main-content">{children}</div>
        <Footer />
      </div>
      <div
        className="noise-overlay pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      />
    </div>
  );
}