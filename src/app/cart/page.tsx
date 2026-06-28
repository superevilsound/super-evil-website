"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/store/CartProvider";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/layout/Analytics";

export default function CartPage() {
  const { items, total, updateQty, removeItem, clear } = useCart();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-3xl">Cart</h1>
        {items.length === 0 ? (
          <p className="mt-6 text-[var(--color-subtle)]">
            Your cart is empty.{" "}
            <Link href="/store" className="underline">
              Visit the store
            </Link>
          </p>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-[var(--color-border)]">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/store/${item.slug}`} className="font-medium hover:underline">
                      {item.title}
                    </Link>
                    <p className="text-sm text-[var(--color-subtle)]">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <label className="text-xs">
                        Qty
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQty(item.productId, parseInt(e.target.value, 10) || 1)
                          }
                          className="ml-1 w-16 rounded border px-2 py-1 text-sm"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-red-600 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <span className="font-semibold">Subtotal</span>
              <span className="text-lg font-semibold">{formatCurrency(total)}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href="/checkout"
                onClick={() => trackEvent("begin_checkout", { value: total, currency: "USD" })}
              >
                Checkout
              </Button>
              <Button variant="ghost" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
