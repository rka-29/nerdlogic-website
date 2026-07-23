"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className={cn(
          "h-full origin-left bg-gradient-to-r from-[#0117FF] via-[#4B6CFF] to-[#9CBFFF]",
          "transition-[width] duration-150 ease-out",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
