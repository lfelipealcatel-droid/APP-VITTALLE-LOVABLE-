import { ownsProduct, type AppState } from "@/lib/store";
import type { Product, ProductState } from "@/lib/mock-data";

// Posse de produto extra: para usuárias comuns vem SOMENTE de `hasProduct` (entitlements reais do
// Supabase); `ownsProduct` (localStorage) só decide para admin, dentro do Modo Demonstração — ver
// src/lib/entitlements.tsx e src/lib/store.ts.
export function productStateFor(
  state: AppState,
  p: Product,
  hasProduct: (code: string) => boolean,
  isAdmin: boolean,
): ProductState {
  if (p.category === "core") return "acquired";
  const owned = isAdmin ? ownsProduct(state, p.id) : hasProduct(p.id);
  if (owned) return "acquired";
  if (p.category === "upsell") return "recommended";
  return "available";
}

export const PRODUCT_STATE_LABEL: Record<ProductState, string> = {
  acquired: "Adquirido",
  available: "Desbloqueie",
  recommended: "Recomendado para você",
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
