"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "article";
};

/**
 * Scroll reveal — opacity + translate only.
 * No CSS filter/blur (that caused blink/flicker while scrolling).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { clearProps: "all", autoAlpha: 1, y: 0 });
      return;
    }

    // Hide immediately so we never flash visible → invisible on trigger.
    gsap.set(el, { autoAlpha: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        delay,
        ease: "power2.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, reducedMotion]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
  y?: number;
};

export function Stagger({
  children,
  className,
  selector = "[data-stagger-item]",
  stagger = 0.06,
  y = 16,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll(selector);
    if (!items.length) return;

    if (reducedMotion) {
      gsap.set(items, { clearProps: "all", autoAlpha: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(items, { autoAlpha: 0, y, scale: 0.98 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.42,
        stagger: { each: stagger, from: "start" },
        ease: "power2.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, y, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
