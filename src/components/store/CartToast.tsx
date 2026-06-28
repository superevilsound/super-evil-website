"use client";

import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/button";

export function CartToast() {
  const { toast, clearToast } = useCart();
  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 shadow-lg"
    >
      <span className="text-sm">{toast}</span>
      <Button variant="ghost" size="sm" onClick={clearToast} aria-label="Dismiss">
        ✕
      </Button>
    </div>
  );
}
