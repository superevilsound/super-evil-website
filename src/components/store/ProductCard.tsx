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
      className="group block overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="catalog-frame relative m-3 aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 50vw, 33vw"
        />
      </div>
      <div className="divider-dashed mx-3" aria-hidden />
      <div className="p-4 pt-3">
        <p className="label-mono text-[var(--color-subtle)]">
          {productTypeLabel(product.type)}
        </p>
        <h3 className="mt-1 font-semibold leading-snug text-[var(--color-ink)]">
          {product.title}
        </h3>
        <p className="label-mono mt-1 text-[var(--color-subtle)]">
          {product.preorder ? "Preorder" : product.shipWindow}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-mono text-base font-semibold text-[var(--color-ink)]">
            {formatCurrency(product.price)}
          </span>
          {product.preorder && <Badge variant="preorder">Pre-order</Badge>}
          {!product.inStock && !product.preorder && (
            <Badge variant="soldout">Sold out</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
