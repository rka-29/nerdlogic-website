"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const AmbientBackground = dynamic(
  () =>
    import("@/components/ambient-background").then(
      (mod) => mod.AmbientBackground,
    ),
  { ssr: false },
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <AmbientBackground />
      <div className="relative z-10">
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
      </div>
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
    </div>
  );
}
