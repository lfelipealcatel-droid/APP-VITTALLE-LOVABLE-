import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// Código oficial do produto desta V1 do Front. Autorização é sempre por user.id + entitlement —
// nunca por e-mail.
export const MAIN_PRODUCT_CODE = "plano-barriga-hormonal-40-plus";

interface EntitlementsContextValue {
  loading: boolean;
  hasMainProductAccess: boolean;
  refresh: () => Promise<void>;
}

const EntitlementsContext = createContext<EntitlementsContextValue | undefined>(undefined);

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [hasEntitlement, setHasEntitlement] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEntitlement = useCallback(async () => {
    if (!user) {
      setHasEntitlement(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("entitlements")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_code", MAIN_PRODUCT_CODE)
      .eq("status", "active")
      .maybeSingle();
    setHasEntitlement(!error && !!data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    fetchEntitlement();
  }, [authLoading, fetchEntitlement]);

  // ADMIN nunca precisa de linha em entitlements — é um bypass de autorização (isAdmin), não uma
  // compra simulada. A consulta acima roda igual para admin (RLS permite ler a própria conta), só
  // não é o que decide o acesso dele.
  const value: EntitlementsContextValue = {
    loading: authLoading || loading,
    hasMainProductAccess: isAdmin || hasEntitlement,
    refresh: fetchEntitlement,
  };

  return <EntitlementsContext.Provider value={value}>{children}</EntitlementsContext.Provider>;
}

export function useEntitlements() {
  const ctx = useContext(EntitlementsContext);
  if (!ctx) throw new Error("useEntitlements deve ser usado dentro de EntitlementsProvider");
  return ctx;
}
