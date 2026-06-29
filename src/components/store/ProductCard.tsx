import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { storeProductTypeLabel } from "@/lib/store-display-labels";
import { Badge } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tilts = ["collage-tilt-a", "collage-tilt-b", "collage-tilt-c"] as const;

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const isHardware = product.type === "pedal";

  return (
    <Link
      href={`/store/${product.slug}`}
      className={cn("catalog-card group block", tilts[index % tilts.length])}
    >
      <div className="relative px-2 pt-2">
        {isHardware && (
          <span className="sticker-label sticker-label--orange absolute left-3 top-3 z-10 -rotate-2">
            Machine
          </span>
        )}
        <div
          className={`catalog-frame relative aspect-square overflow-hidden ${
            isHardware ? "border-[var(--color-accent)] bg-[var(--color-panel)]" : ""
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
      </div>
      <div className="divider-torn mx-2" aria-hidden />
      <div className="p-3 pt-2">
        <p className="manual-label text-[var(--color-subtle)]">
          {storeProductTypeLabel(product.type)}
        </p>
        <h3 className="font-poster mt-1 line-clamp-2 text-xl leading-none text-[var(--color-ink)]">
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
