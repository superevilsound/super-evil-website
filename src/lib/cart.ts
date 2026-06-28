import type { CartItem, ProductType } from "@/lib/types";

export const CART_COOKIE = "se_cart";

export function parseCart(raw: string | undefined): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function serializeCart(items: CartItem[]): string {
  return JSON.stringify(items);
}

export function addToCart(
  items: CartItem[],
  item: Omit<CartItem, "quantity">,
  qty = 1,
): CartItem[] {
  const existing = items.find((i) => i.productId === item.productId);
  if (existing) {
    return items.map((i) =>
      i.productId === item.productId
        ? { ...i, quantity: i.quantity + qty }
        : i,
    );
  }
  return [...items, { ...item, quantity: qty }];
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartHasPhysical(items: CartItem[]) {
  return items.some((i) => i.type === "pedal" || i.type === "merch");
}

export function productTypeLabel(type: ProductType) {
  switch (type) {
    case "pedal":
      return "Pedal";
    case "sample_pack":
      return "Sample Pack";
    case "merch":
      return "Merch";
  }
}
