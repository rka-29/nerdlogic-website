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

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          delay,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
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
  stagger = 0.07,
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          stagger: { each: stagger, from: "start" },
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, y, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
