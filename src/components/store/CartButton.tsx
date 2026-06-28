"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/CartProvider";

export function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1 text-sm hover:opacity-80"
      aria-label={`Cart, ${count} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-ink)] px-1 text-[10px] text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
