"use client";

import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export function VariantSelector({ product }: { product: Product }) {
  return <p className="text-2xl font-semibold">{formatCurrency(product.price)}</p>;
}
