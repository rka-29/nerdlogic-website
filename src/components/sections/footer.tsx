"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { footerLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative pt-6">
      <Container>
        <Reveal y={24}>
          <div className="footer-shell px-6 pb-10 pt-14 text-center sm:px-10 sm:pt-16 lg:px-16">
            <div className="flex flex-col items-center">
              <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[16px] text-white/70 sm:text-[18px]">
                @2026 NerdLogic. All Rights Reserved
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
