"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  AURORA_STOPS,
  PARTICLE_COLORS,
} from "@/lib/brand-atmosphere";
import { cn } from "@/lib/utils";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
}) as unknown as React.ComponentType<Record<string, unknown>>;

type BrandAtmosphereProps = {
  className?: string;
  /**
   * `immersive` — Coming Soon full-bleed wallpaper.
   * `site` — scrollable pages: softer aurora + readable vignette.
   */
  variant?: "immersive" | "site";
  /** Particles are heavy — enable on home / coming soon only by default. */
  showParticles?: boolean;
};

/**
 * Shared living wallpaper (Aurora + optional Particles).
 * Respects prefers-reduced-motion with a static ADH radial fallback.
 */
export function BrandAtmosphere({
  className,
  variant = "site",
  showParticles,
}: BrandAtmosphereProps) {
  const reducedMotion = usePrefersReducedMotion();
  const immersive = variant === "immersive";
  const particlesOn = showParticles ?? immersive;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black" />

      {!reducedMotion ? (
        <>
          <div
            className={cn(
              "absolute inset-0",
              immersive ? "opacity-100" : "opacity-75",
            )}
          >
            <Aurora
              colorStops={[...AURORA_STOPS]}
              amplitude={immersive ? 1.2 : 0.75}
              blend={immersive ? 0.6 : 0.5}
              speed={immersive ? 0.7 : 0.35}
            />
          </div>
          {particlesOn ? (
            <div
              className={cn(
                "absolute inset-0",
                immersive ? "opacity-70" : "opacity-40",
              )}
            >
              <Particles
                className="h-full w-full"
                particleCount={immersive ? 160 : 70}
                particleSpread={immersive ? 12 : 14}
                speed={immersive ? 0.08 : 0.04}
                particleColors={[...PARTICLE_COLORS]}
                alphaParticles
                particleBaseSize={immersive ? 90 : 64}
                sizeRandomness={0.9}
                cameraDistance={immersive ? 22 : 28}
                moveParticlesOnHover={immersive}
                particleHoverFactor={0.4}
              />
            </div>
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,102,230,0.5),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(0,61,165,0.45),_transparent_50%)]" />
      )}

      <div
        className={cn(
          "absolute inset-0",
          immersive
            ? "bg-gradient-to-b from-black/35 via-transparent to-black/55"
            : "bg-gradient-to-b from-black/55 via-black/35 to-black/75",
        )}
      />
    </div>
  );
}
