import type { FarmId } from "./types";

export const routes = {
  home: "/",
  store: (farmId: FarmId | string, options?: { focus?: "reviews" }) => {
    const base = `/store/${farmId}`;
    if (options?.focus === "reviews") return `${base}?focus=reviews`;
    return base;
  },
  storeInfo: (farmId: FarmId | string) => `/store/${farmId}/info`,
  storeReviews: (farmId: FarmId | string) => `/store/${farmId}/reviews`,
  cart: "/cart",
} as const;
