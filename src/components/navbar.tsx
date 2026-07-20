"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "pt-3 sm:pt-3.5" : "pt-5 sm:pt-[52px] lg:pt-[73px]",
      )}
    >
      <Container>
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto glass-panel relative flex items-center justify-between rounded-full px-4 sm:px-6 lg:px-8",
            "transition-[height,background-color,border-color,box-shadow,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-[52px] glass-panel-scrolled px-3 sm:px-5" : "h-[70px]",
          )}
        >
          <Logo
            className={cn(
              "transition-transform duration-300",
              scrolled && "scale-[0.9] [&_span]:text-[18px]",
            )}
          />

          <ul
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
              scrolled ? "gap-0" : "gap-1",
            )}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn("nav-link", scrolled && "nav-link-compact")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              href="#contact"
              variant="primary"
              size="nav"
              className={cn(
                "hidden sm:inline-flex transition-all duration-300",
                scrolled && "h-8 min-h-8 px-4 text-[14px]",
              )}
            >
              Start a Project
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-white/15 text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 lg:hidden",
                scrolled ? "size-9" : "size-11 min-h-[44px] min-w-[44px]",
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
            "pointer-events-auto mt-3 overflow-hidden rounded-[28px] border border-white/10 bg-black/94 backdrop-blur-xl transition-all duration-300 lg:hidden",
            open
              ? "max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0",
          )}
        >
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block min-h-[44px] rounded-2xl px-4 py-3 text-[18px] text-white transition-all duration-200 hover:translate-x-1 hover:bg-white/8"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Link
                href="#contact"
                className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-white text-[16px] font-medium text-black transition-transform duration-200 active:scale-[0.98]"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
