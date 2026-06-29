"use client";

import { useMemo, useState } from "react";
import type { Product, ProductType } from "@/lib/types";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";

export function StoreGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductType | "all">("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [preorderOnly, setPreorderOnly] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.type !== category) return false;
      if (inStockOnly && !p.inStock) return false;
      if (preorderOnly && !p.preorder) return false;
      return true;
    });
  }, [products, category, inStockOnly, preorderOnly]);

  const tabs: { id: ProductType | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pedal", label: "Pedals" },
    { id: "sample_pack", label: "Sample Packs" },
    { id: "merch", label: "Merch" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategory(tab.id)}
            className={cn(
              "label-mono rounded-full px-4 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
              category === tab.id
                ? "bg-[var(--color-panel)] text-[var(--color-surface)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]"
                : "border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="label-mono mb-6 flex flex-wrap gap-6 text-[var(--color-subtle)]">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-[var(--color-accent)]"
          />
          In stock
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={preorderOnly}
            onChange={(e) => setPreorderOnly(e.target.checked)}
            className="accent-[var(--color-accent)]"
          />
          Pre-order
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {!filtered.length && (
        <p className="label-mono text-[var(--color-subtle)]">
          No products match your filters.
        </p>
      )}
    </div>
  );
}
