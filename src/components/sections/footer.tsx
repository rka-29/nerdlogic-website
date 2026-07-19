import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative pt-6">
      <Container>
        <div className="footer-shell px-6 pb-10 pt-14 text-center sm:px-10 sm:pt-16 lg:px-16">
          <div className="flex flex-col items-center">
            <Link href="#home" aria-label="NerdLogic home" className="inline-flex">
              <LogoMark className="h-[36px] w-auto" />
            </Link>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
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

            <p className="mt-8 text-[16px] text-white/55 sm:text-[18px]">
              @2026 NerdLogic. All Rights Reserved
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
