"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById } from "@/data/mock-data";
import { clearCart, getCart, saveCart } from "@/lib/storage";
import type { CartItem, FarmId } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (productId: string, farmId: FarmId) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(getCart().items);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart({ items });
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, farmId: FarmId) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { productId, farmId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    clearCart();
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      addItem,
      removeItem,
      clear,
      hydrated,
    }),
    [items, totalCount, totalPrice, addItem, removeItem, clear, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
