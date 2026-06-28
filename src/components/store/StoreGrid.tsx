"use client";

import { useMemo, useState } from "react";
import type { Product, ProductType } from "@/lib/types";
import { ProductCard } from "@/components/store/ProductCard";

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
            className={`rounded-full px-4 py-1.5 text-sm ${
              category === tab.id
                ? "bg-[var(--color-ink)] text-white"
                : "border border-[var(--color-border)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In stock
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preorderOnly}
            onChange={(e) => setPreorderOnly(e.target.checked)}
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
        <p className="text-[var(--color-subtle)]">No products match your filters.</p>
      )}
    </div>
  );
}
