import type { CartState } from "./types";

const CART_KEY = "group11_mvp_cart";

const defaultCart: CartState = { items: [] };

export function getCart(): CartState {
  if (typeof window === "undefined") return defaultCart;

  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return defaultCart;
    return JSON.parse(raw) as CartState;
  } catch {
    return defaultCart;
  }
}

export function saveCart(cart: CartState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  saveCart(defaultCart);
}
