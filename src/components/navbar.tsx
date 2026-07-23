"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (open) {
        setCompact(false);
      } else if (y < 48) {
        setCompact(false);
      } else if (delta > 4) {
        setCompact(true);
      } else if (delta < -4) {
        setCompact(false);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact ? "px-4 pt-3 sm:px-6 sm:pt-4" : "px-5 pt-5 sm:px-8 sm:pt-[52px] lg:px-[91px] lg:pt-[73px]",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto w-full transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact ? "max-w-[920px]" : "max-w-[1258px]",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "glass-panel relative flex items-center justify-between rounded-full",
            "transition-[height,padding,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            compact
              ? "h-[52px] px-3 glass-panel-scrolled sm:px-5"
              : "h-[70px] px-4 sm:px-6 lg:px-8",
          )}
        >
          <Logo
            href="/"
            className={cn(
              "transition-transform duration-300",
              compact && "scale-[0.9] [&_span]:text-[18px]",
            )}
          />

          <ul
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
              compact ? "gap-0" : "gap-1",
            )}
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link",
                      compact && "nav-link-compact",
                      active && "nav-link-active",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="nav"
              className={cn(
                "hidden sm:inline-flex transition-all duration-300",
                compact && "h-8 min-h-8 px-4 text-[14px]",
              )}
            >
              Start a Project
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-white/15 text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 lg:hidden",
                compact ? "size-9" : "size-11 min-h-[44px] min-w-[44px]",
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={cn(
            "mt-3 overflow-hidden rounded-[28px] border border-white/10 bg-black/94 backdrop-blur-xl transition-all duration-300 lg:hidden",
            open
              ? "max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0",
          )}
        >
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block min-h-[44px] rounded-2xl px-4 py-3 text-[18px] text-white transition-all duration-200 hover:translate-x-1 hover:bg-white/8",
                      active && "bg-white/10 font-semibold",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 sm:hidden">
              <Link
                href="/contact"
                className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-white text-[16px] font-medium text-black transition-transform duration-200 active:scale-[0.98]"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
