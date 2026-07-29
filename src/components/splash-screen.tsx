"use client";

import { useEffect, useRef, type RefObject } from "react";
import { LogoMark } from "@/components/logo-mark";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplashScreenProps = {
  className?: string;
  logoTargetRef: RefObject<HTMLElement | null>;
  onMorphStart?: () => void;
  onLogoLand?: () => void;
  onComplete?: () => void;
  holdSeconds?: number;
};

type MorphTarget = { left: number; top: number; scale: number };

const HERO_SCALE = 2.75;
/** Hard cap so a failed morph can never leave the page scroll-locked. */
const FAILSAFE_MS = 5000;

/**
 * Brand intro: blue → black iris → mark + NerdLogic → morph into header.
 * pointer-events-none so the overlay never traps scroll/wheel.
 */
export function SplashScreen({
  className,
  logoTargetRef,
  onMorphStart,
  onLogoLand,
  onComplete,
  holdSeconds = 0.55,
}: SplashScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const onMorphStartRef = useRef(onMorphStart);
  const onLogoLandRef = useRef(onLogoLand);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);
  onMorphStartRef.current = onMorphStart;
  onLogoLandRef.current = onLogoLand;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    const iris = irisRef.current;
    const lockup = lockupRef.current;
    const mark = markRef.current;
    const word = wordRef.current;
    if (!root || !iris || !lockup || !mark || !word) return;

    registerGsap();
    const parts = mark.querySelectorAll<SVGPathElement>("path");
    const morph: MorphTarget = { left: 0, top: 0, scale: 1 };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onCompleteRef.current?.();
    };

    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    if (reducedMotion) {
      gsap.set(iris, { clipPath: "circle(150% at 50% 50%)" });
      gsap.set(mark, { autoAlpha: 1 });
      gsap.set(parts, { autoAlpha: 1 });
      gsap.set(word, { autoAlpha: 1, y: 0 });
      gsap.set(lockup, { scale: HERO_SCALE });
      onMorphStartRef.current?.();
      onLogoLandRef.current?.();
      const t = window.setTimeout(finish, 350);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(failsafe);
      };
    }

    const ctx = gsap.context(() => {
      gsap.set(iris, { clipPath: "circle(0% at 50% 50%)", opacity: 1 });
      gsap.set(mark, {
        autoAlpha: 1,
        scale: 0.92,
        filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
      });
      gsap.set(parts, { autoAlpha: 0, scale: 0.88, transformOrigin: "50% 50%" });
      gsap.set(word, { autoAlpha: 0, x: -8 });
      gsap.set(lockup, {
        scale: HERO_SCALE * 0.94,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });

      tl.to(iris, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.85,
        ease: "power2.inOut",
      })
        .to(
          parts,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.32,
            stagger: 0.11,
            ease: "power2.out",
          },
          0.22,
        )
        .to(
          lockup,
          {
            scale: HERO_SCALE,
            duration: 0.45,
            ease: "power2.out",
          },
          0.22,
        )
        .to(
          mark,
          {
            scale: 1,
            filter:
              "drop-shadow(0 0 18px rgba(255,255,255,0.85)) drop-shadow(0 0 40px rgba(107,182,255,0.5))",
            duration: 0.45,
            ease: "power2.out",
          },
          0.22,
        )
        .to(
          mark,
          {
            filter:
              "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(107,182,255,0.25))",
            duration: 0.4,
            ease: "power1.out",
          },
          0.7,
        )
        .to(
          word,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.55,
        )
        .to({}, { duration: holdSeconds })
        .call(() => {
          onMorphStartRef.current?.();
        })
        .to({}, { duration: 0.1 })
        .call(() => {
          const target = logoTargetRef.current;
          const currentScale =
            Number(gsap.getProperty(lockup, "scale")) || HERO_SCALE;
          const from = lockup.getBoundingClientRect();
          const fromCx = from.left + from.width / 2;
          const fromCy = from.top + from.height / 2;

          if (target) {
            const to = target.getBoundingClientRect();
            morph.left = to.left + to.width / 2;
            morph.top = to.top + to.height / 2;
            morph.scale = 1;
          } else {
            // No header target — fade out in place instead of hanging.
            morph.left = fromCx;
            morph.top = fromCy;
            morph.scale = currentScale;
          }

          gsap.set(lockup, {
            position: "fixed",
            left: fromCx,
            top: fromCy,
            xPercent: -50,
            yPercent: -50,
            zIndex: 30,
            margin: 0,
            scale: currentScale,
            transformOrigin: "50% 50%",
          });
        })
        .to(
          lockup,
          {
            left: () => morph.left,
            top: () => morph.top,
            scale: () => morph.scale,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              const target = logoTargetRef.current;
              if (target) {
                target.style.opacity = "1";
                target.style.visibility = "visible";
              }
              gsap.set(lockup, { autoAlpha: 0 });
              onLogoLandRef.current?.();
            },
          },
          "morph",
        )
        .to(
          mark,
          {
            filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
            duration: 0.55,
            ease: "power1.out",
          },
          "morph",
        )
        .to(
          iris,
          {
            opacity: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "morph+=0.05",
        )
        .to(
          root,
          {
            backgroundColor: "rgba(0,0,0,0)",
            duration: 0.65,
            ease: "power1.inOut",
          },
          "morph",
        );
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [reducedMotion, holdSeconds, logoTargetRef]);

  return (
    <div
      ref={rootRef}
      className={cn(
        // pointer-events-none: never trap wheel/touch scroll under the intro
        "pointer-events-none fixed inset-0 z-[200] flex h-dvh w-dvw items-center justify-center overflow-hidden bg-[var(--brand-primary)]",
        className,
      )}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={irisRef}
        className="absolute inset-0 bg-black"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />

      <div
        ref={lockupRef}
        className="relative z-10 inline-flex items-center gap-2.5 will-change-transform"
      >
        <div
          ref={markRef}
          className="text-white will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        >
          <LogoMark className="h-6 w-auto sm:h-7" />
        </div>
        <span
          ref={wordRef}
          className="font-display text-[22px] font-normal tracking-[-0.02em] text-white sm:text-[24px]"
        >
          NerdLogic
        </span>
      </div>
    </div>
  );
}
