import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteShell } from "@/components/site-shell";
import { isComingSoonActive } from "@/lib/coming-soon";
import "./globals.css";

const surgena = localFont({
  src: [
    {
      path: "../fonts/Surgena-SemiBold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Surgena-SemiBold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Surgena-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Surgena-SemiBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-surgena",
  display: "swap",
});

const monaSans = localFont({
  src: "../fonts/MonaSansVF.woff2",
  variable: "--font-mona-sans",
  display: "swap",
  weight: "200 900",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nerdlogic.dev",
  ),
  title: {
    default: "NerdLogic | Digital Product Studio",
    template: "%s | NerdLogic",
  },
  description:
    "NerdLogic is a Bahrain-based digital product studio building fintech, AI, and native mobile experiences that work smarter.",
  applicationName: "NerdLogic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nerdlogic.dev",
    siteName: "NerdLogic",
    title: "NerdLogic | Digital Product Studio",
    description:
      "NerdLogic is a Bahrain-based digital product studio building fintech, AI, and native mobile experiences that work smarter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NerdLogic | Digital Product Studio",
    description:
      "NerdLogic is a Bahrain-based digital product studio building fintech, AI, and native mobile experiences that work smarter.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const comingSoon = await isComingSoonActive();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${surgena.variable} ${monaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <GoogleAnalytics />
        {comingSoon ? children : <SiteShell>{children}</SiteShell>}
        <Analytics />
      </body>
    </html>
  );
}
