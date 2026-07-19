"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 pt-[73px]">
      <Container>
        <nav
          aria-label="Primary"
          className="pointer-events-auto glass-panel relative flex h-[70px] items-center justify-between rounded-[35px] px-4 sm:px-6 lg:px-8"
        >
          <Logo />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[18px] text-white transition-opacity hover:opacity-70"
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
              className="hidden sm:inline-flex"
            >
              Start a Project
            </Button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={cn(
            "pointer-events-auto mt-3 overflow-hidden rounded-[28px] border border-white/10 bg-black/90 backdrop-blur-xl transition-all lg:hidden",
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
                  className="block rounded-2xl px-4 py-3 text-[18px] text-white hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Link
                href="#contact"
                className="inline-flex h-[44px] w-full items-center justify-center rounded-full bg-white text-[16px] font-medium text-black"
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
