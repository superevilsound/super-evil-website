import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { productTypeLabel } from "@/lib/cart";
import { Badge } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/store/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-[var(--color-border)] bg-white"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width:640px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-[var(--color-subtle)]">
          {productTypeLabel(product.type)}
        </p>
        <h3 className="mt-1 font-semibold">{product.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-subtle)]">
          {product.preorder ? "Preorder" : product.shipWindow}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          {product.preorder && <Badge>Pre-order</Badge>}
          {!product.inStock && !product.preorder && (
            <Badge className="bg-red-700">Sold out</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
