"use client";

import { useEffect, useRef, type RefObject } from "react";
import { LogoMark } from "@/components/logo-mark";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplashScreenProps = {
  className?: string;
  /** Header logo slot on Coming Soon — lockup morphs into this. */
  logoTargetRef: RefObject<HTMLElement | null>;
  /** Fired when iris/content handoff starts (mount wallpaper + page under splash). */
  onMorphStart?: () => void;
  /** Fired the instant lockup lands on the header — swap to real logo (no blink). */
  onLogoLand?: () => void;
  /** Fired after morph finishes and splash can unmount. */
  onComplete?: () => void;
  /** Hold on centered lockup before morphing into Coming Soon (seconds). */
  holdSeconds?: number;
};

type MorphTarget = { left: number; top: number; scale: number };

/** Matches header Logo mark/wordmark ratio — scaled up for the hero lockup. */
const HERO_SCALE = 2.75;

/**
 * Brand intro: blue → black iris → animated mark + NerdLogic (header style) →
 * morph lockup + iris into Coming Soon.
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

    const finish = () => onCompleteRef.current?.();

    if (reducedMotion) {
      gsap.set(iris, { clipPath: "circle(150% at 50% 50%)" });
      gsap.set(mark, { autoAlpha: 1, filter: "none" });
      gsap.set(parts, { autoAlpha: 1 });
      gsap.set(word, { autoAlpha: 1, y: 0 });
      gsap.set(lockup, { scale: HERO_SCALE });
      onMorphStartRef.current?.();
      onLogoLandRef.current?.();
      const t = window.setTimeout(finish, 350);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      gsap.set(iris, { clipPath: "circle(0% at 50% 50%)", opacity: 1 });
      gsap.set(lockup, {
        scale: HERO_SCALE * 0.94,
        transformOrigin: "50% 50%",
      });
      gsap.set(mark, {
        autoAlpha: 1,
        filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
      });
      gsap.set(parts, { autoAlpha: 0, scale: 0.88, transformOrigin: "50% 50%" });
      gsap.set(word, { autoAlpha: 0, x: -8 });

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
        .to({}, { duration: 0.08 })
        .call(() => {
          const target = logoTargetRef.current;
          if (!target) return;

          const currentScale =
            Number(gsap.getProperty(lockup, "scale")) || HERO_SCALE;
          const from = lockup.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          const fromCx = from.left + from.width / 2;
          const fromCy = from.top + from.height / 2;

          // Same mark/wordmark as header — only scale changes (hero → 1×).
          morph.left = to.left + to.width / 2;
          morph.top = to.top + to.height / 2;
          morph.scale = 1;

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
              // Same-frame swap: show header logo, hide flying lockup — no fade gap.
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

    return () => ctx.revert();
  }, [reducedMotion, holdSeconds, logoTargetRef]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed inset-0 z-[200] flex h-dvh w-dvw items-center justify-center overflow-hidden bg-[var(--brand-primary)]",
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

      {/* Same structure/styles as header <Logo /> — only scale differs */}
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
