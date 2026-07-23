import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "NerdLogic | Coming Soon",
  description:
    "NerdLogic is building a new digital home. Something new is on the way.",
  openGraph: {
    url: "https://nerdlogic.dev",
    title: "NerdLogic | Coming Soon",
    description:
      "NerdLogic is building a new digital home. Something new is on the way.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NerdLogic | Coming Soon",
    description:
      "NerdLogic is building a new digital home. Something new is on the way.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
