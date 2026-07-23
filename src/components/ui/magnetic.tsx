"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || reducedMotion) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      xTo(x);
      yTo(y);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reducedMotion, strength]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
