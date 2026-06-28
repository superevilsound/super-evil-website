"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs shadow-sm hover:bg-[var(--color-surface-muted)]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-3 w-3" />
      Back To Top
    </button>
  );
}
