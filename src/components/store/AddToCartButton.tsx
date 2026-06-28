"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <Button
      className={className}
      onClick={() =>
        addItem({
          productId: product._id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          image: product.images[0] ?? "",
          type: product.type,
        })
      }
      disabled={!product.inStock && !product.preorder}
    >
      {product.preorder ? "Preorder" : "Add to Cart"}
    </Button>
  );
}
