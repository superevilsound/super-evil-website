import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { productTypeLabel } from "@/lib/cart";
import { Badge } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const isHardware = product.type === "pedal";

  return (
    <Link
      href={`/store/${product.slug}`}
      className="catalog-card group block"
    >
      <div
        className={`catalog-frame relative m-2 aspect-square overflow-hidden ${
          isHardware ? "bg-[var(--color-panel)]" : ""
        }`}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          sizes="(max-width:640px) 50vw, 33vw"
        />
      </div>
      <div className="divider-dashed mx-2" aria-hidden />
      <div className="p-3 pt-2">
        <p className="manual-label text-[var(--color-subtle)]">
          {productTypeLabel(product.type)}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-[var(--color-ink)]">
          {product.title}
        </h3>
        <p className="manual-label mt-1 text-[var(--color-subtle)]">
          {product.preorder ? "Preorder" : product.shipWindow}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
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
