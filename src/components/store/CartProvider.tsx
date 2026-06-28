"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "@/lib/types";
import { addToCart as mergeCart, cartTotal } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  count: number;
  toast: string | null;
  clearToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "se_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!hydrated) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) queueMicrotask(() => setItems(JSON.parse(raw) as CartItem[]));
    } catch {
      /* ignore */
    }
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => mergeCart(prev, item, qty));
      setToast(`${item.title} added to cart`);
      window.setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.max(1, quantity) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const clearToast = useCallback(() => setToast(null), []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      total: cartTotal(items),
      count: items.reduce((n, i) => n + i.quantity, 0),
      toast,
      clearToast,
    }),
    [items, addItem, removeItem, updateQty, clear, toast, clearToast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
