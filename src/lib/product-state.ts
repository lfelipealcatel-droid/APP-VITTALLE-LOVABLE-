import type { AppState } from "@/lib/store";
import type { Product, ProductState } from "@/lib/mock-data";

export function productStateFor(state: AppState, p: Product): ProductState {
  if (state.ownedProducts.includes(p.id)) return "acquired";
  if (p.category === "core") return "acquired";
  if (p.category === "upsell") return "recommended";
  return "available";
}

export const PRODUCT_STATE_LABEL: Record<ProductState, string> = {
  acquired: "Adquirido",
  available: "Disponível",
  recommended: "Recomendado",
  locked: "Bloqueado",
  future: "Em breve",
};

export const PRODUCT_STATE_STYLE: Record<ProductState, string> = {
  acquired: "bg-secondary-light text-secondary-dark",
  available: "bg-primary-light text-primary-dark",
  recommended: "bg-warm text-primary-dark",
  locked: "bg-surface-2 text-text-muted",
  future: "bg-surface-2 text-text-secondary",
};
