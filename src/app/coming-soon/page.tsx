import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "NerdLogic is building a new digital home. Join the newsletter to be first to know when we launch.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
