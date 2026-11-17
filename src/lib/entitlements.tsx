import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// Código oficial do produto desta V1 do Front. Autorização é sempre por user.id + entitlement —
// nunca por e-mail.
export const MAIN_PRODUCT_CODE = "plano-barriga-hormonal-40-plus";

interface EntitlementsContextValue {
  loading: boolean;
  hasMainProductAccess: boolean;
  activeCodes: string[];
  hasProduct: (code: string) => boolean;
  refresh: () => Promise<void>;
}

const EntitlementsContext = createContext<EntitlementsContextValue | undefined>(undefined);

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeCodes, setActiveCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca TODAS as linhas ativas da usuária logada — cobre o produto principal e qualquer produto
  // extra (bump/upsell/downsell), sempre por user_id, nunca por e-mail.
  const fetchEntitlements = useCallback(async () => {
    if (!user) {
      setActiveCodes([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("entitlements")
      .select("product_code")
      .eq("user_id", user.id)
      .eq("status", "active");
    setActiveCodes(!error && data ? data.map((row) => row.product_code as string) : []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    fetchEntitlements();
  }, [authLoading, fetchEntitlements]);

  // Recarrega quando a aba volta a ganhar foco/visibilidade — cobre o caso de a usuária comprar um
  // produto extra na Lastlink (nova aba) e voltar para o app sem recarregar a página.
  useEffect(() => {
    if (authLoading) return;
    const onFocusOrVisible = () => {
      if (document.visibilityState === "hidden") return;
      fetchEntitlements();
    };
    window.addEventListener("focus", onFocusOrVisible);
    document.addEventListener("visibilitychange", onFocusOrVisible);
    return () => {
      window.removeEventListener("focus", onFocusOrVisible);
      document.removeEventListener("visibilitychange", onFocusOrVisible);
    };
  }, [authLoading, fetchEntitlements]);

  const hasProduct = useCallback((code: string) => activeCodes.includes(code), [activeCodes]);

  // ADMIN nunca precisa de linha em entitlements — é um bypass de autorização (isAdmin), não uma
  // compra simulada. A consulta acima roda igual para admin (RLS permite ler a própria conta), só
  // não é o que decide o acesso dele.
  const value: EntitlementsContextValue = {
    loading: authLoading || loading,
    hasMainProductAccess: isAdmin || hasProduct(MAIN_PRODUCT_CODE),
    activeCodes,
    hasProduct,
    refresh: fetchEntitlements,
  };

  return <EntitlementsContext.Provider value={value}>{children}</EntitlementsContext.Provider>;
}

export function useEntitlements() {
  const ctx = useContext(EntitlementsContext);
  if (!ctx) throw new Error("useEntitlements deve ser usado dentro de EntitlementsProvider");
  return ctx;
}
