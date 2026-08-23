"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { footerLinks, contactInfo } from "@/data/site";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// روابط سوشال ميديا وهمية مؤقتاً — بدّليها بالروابط الحقيقية لاحقاً
const socialLinks = [
  { name: "LinkedIn", href: "#", icon: LinkedinIcon },
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "TikTok", href: "#", icon: TikTokIcon },
] as const;

/**
 * أيقونات العلامات التجارية (LinkedIn, Instagram, TikTok) مرسومة يدوياً كـ SVG.
 * مكتبة lucide-react شالت أيقونات العلامات التجارية من نسخها الحديثة
 * بسبب قيود حقوق الملكية، فما نقدر نستوردها منها مباشرة.
 */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-1.02-.88-1.6-2.16-1.6-3.62h-3.16v13.9c0 1.55-1.26 2.8-2.8 2.8a2.8 2.8 0 0 1-2.8-2.8 2.8 2.8 0 0 1 2.8-2.8c.29 0 .57.05.83.13V10.2a6.02 6.02 0 0 0-.83-.06 6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6V9.05a8.18 8.18 0 0 0 4.66 1.44V7.33a4.85 4.85 0 0 1-3.1-1.51Z" />
    </svg>
  );
}

export function Footer() {
  const rootRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ghostWrapRef = useRef<HTMLDivElement | null>(null);
  const ghostGlowRef = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // شعار الشركة يتفكك ويترجمع كل ما مرّ الماوس عليه (Hover)
  useLayoutEffect(() => {
    registerGsap();
    const logo = logoRef.current;
    if (!logo || reducedMotion) return;

    const logoParts = logo.querySelectorAll<SVGPathElement>("[data-logo-part]");
    if (!logoParts.length) return;

    // الحالة الأساسية: مجمّع وواضح
    gsap.set(logoParts, { x: 0, y: 0, rotate: 0, autoAlpha: 1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(logoParts, {
        x: (i) => [-46, 0, 46][i],
        y: (i) => [-18, -40, 18][i],
        rotate: (i) => [-30, 16, 30][i],
        autoAlpha: 0.15,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
      }).to(logoParts, {
        x: 0,
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });

      const onEnter = () => tl.restart();
      logo.addEventListener("mouseenter", onEnter);

      return () => logo.removeEventListener("mouseenter", onEnter);
    }, logo);

    return () => ctx.revert();
  }, [reducedMotion]);

  // بقعة الضوء اللي تتبع الماوس بالضبط فوق حدود حروف "NerdLogic" الكبيرة
  useEffect(() => {
    const wrap = ghostWrapRef.current;
    const glow = ghostGlowRef.current;
    if (!wrap || !glow || reducedMotion) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMove = (event: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      glow.style.setProperty("--mx", `${x}px`);
      glow.style.setProperty("--my", `${y}px`);
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <footer ref={rootRef} className="relative pt-16">
      <div
        className="footer-shell w-full rounded-none px-6 pb-8 pt-14 sm:px-10 lg:px-16"
        style={{ borderRadius: 0 }}
      >
        {/* الصف العلوي: لوقو متركّب + وصف — روابط الشركة — التواصل — سوشال ميديا + Made by */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
          <div>
            <div
              ref={logoRef}
              className="inline-flex cursor-pointer items-center text-[#0117FF]"
            >
              <LogoMark className="h-[48px] w-auto sm:h-[56px]" />
            </div>
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/60">
              Turning ideas into digital experiences.
            </p>

            {/* أيقونات السوشال ميديا — تحت الوصف مباشرة، وتحتها "Made by NerdLogic Team" */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0117FF]/60 hover:bg-white/[0.08] hover:text-[#0117FF]"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-[13px] font-semibold text-white/70">
              Made by NerdLogic Team
            </p>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-white/60">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                Location: <span className="text-white/80">{contactInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* فاصل + حقوق النشر */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[14px] text-white/50">
            @2026 NerdLogic. All Rights Reserved
          </p>
        </div>

        {/* اسم الموقع الكبير — نص مفرّغ (Ghost/Outline).
            بقعة ضوء زرقاء غامقة (نفس درجة الهيرو) تتبع الماوس وتضيء حدود الحروف. */}
        <div
          ref={ghostWrapRef}
          className="ghost-brand-wrap relative mt-8 flex items-center justify-center py-4 sm:py-8"
        >
          <span className="ghost-brand font-display select-none text-center text-[15vw] font-normal leading-none tracking-[-0.03em] sm:text-[120px] lg:text-[160px]">
            NerdLogic
          </span>
          <span
            ref={ghostGlowRef}
            aria-hidden="true"
            className="ghost-brand-glow font-display pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[15vw] font-normal leading-none tracking-[-0.03em] sm:text-[120px] lg:text-[160px]"
          >
            NerdLogic
          </span>
        </div>
      </div>

      <style jsx global>{`
        /* الطبقة الأساسية: الحروف مفرّغة من الداخل، وحدها رمادي محايد
           يشبه لون خلفية الفوتر (بدون أي لمسة زرقاء) — تبان بالكاد */
        .ghost-brand {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.12);
        }
        /* الطبقة العلوية: نفس النص، حدود زرقاء غامقة واضحة —
           تظهر بس داخل دائرة صغيرة حول مكان الماوس عبر mask */
        .ghost-brand-glow {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(1, 23, 255, 1);
          opacity: 0;
          transition: opacity 0.25s ease;
          --mx: 50%;
          --my: 50%;
          -webkit-mask-image: radial-gradient(
            circle 90px at var(--mx) var(--my),
            black 0%,
            black 55%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle 90px at var(--mx) var(--my),
            black 0%,
            black 55%,
            transparent 100%
          );
        }
      `}</style>
    </footer>
  );
}