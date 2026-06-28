"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/store/CartProvider";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { cartHasPhysical } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const needsShipping = cartHasPhysical(items);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/checkout/success?demo=1`);
        clear();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <section className="py-[var(--section-py)]">
        <div className="container-main">
          <h1 className="font-display text-3xl">Checkout</h1>
          <p className="mt-4 text-[var(--color-subtle)]">Your cart is empty.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main grid max-w-4xl gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] p-6">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between">
                <span>
                  {i.title} × {i.quantity}
                </span>
                <span>{formatCurrency(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t pt-3 font-semibold">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </p>
        </div>
        <form onSubmit={handleCheckout} className="space-y-4 rounded-lg border border-[var(--color-border)] p-6">
          <h2 className="font-semibold">Customer</h2>
          <p className="text-sm text-[var(--color-subtle)]">
            You will complete payment securely via Stripe
            {needsShipping ? " (shipping collected at checkout)" : ""}.
          </p>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redirecting…" : "Pay with Stripe"}
          </Button>
          <p className="text-xs text-[var(--color-subtle)]">
            Supports card, Apple Pay, and Google Pay. Use code LAUNCH10 at checkout when available.
          </p>
        </form>
      </div>
    </section>
  );
}
