import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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

// Sentinela distinta de qualquer user.id real e de `null` (usuária deslogada) — representa "ainda
// não chegou nenhuma resposta nesta sessão do app".
const NOT_LOADED = Symbol("not-loaded");

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeCodes, setActiveCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Id do usuário (ou null se deslogada) para o qual já chegou alguma resposta — enquanto a busca
  // atual for para um user.id diferente deste, é a carga INICIAL dessa conta e `loading` fica true
  // (RouteGuard mostra "Carregando…"). Qualquer recarga posterior para o MESMO usuário (focus da
  // aba, visibilitychange, refresh() manual) é silenciosa: não toca `loading`, só atualiza
  // `activeCodes` quando a resposta chegar — nunca desmonta a tela atual.
  const loadedForUserRef = useRef<string | null | typeof NOT_LOADED>(NOT_LOADED);
  // Deduplica buscas simultâneas para o mesmo usuário (ex.: focus e visibilitychange disparando
  // juntos, ou um clique em "Já comprei" enquanto a busca de foco ainda está em voo).
  const inFlightRef = useRef<{ userId: string | null; promise: Promise<void> } | null>(null);

  // Busca TODAS as linhas ativas da usuária logada — cobre o produto principal e qualquer produto
  // extra (bump/upsell/downsell), sempre por user_id, nunca por e-mail.
  const fetchEntitlements = useCallback((): Promise<void> => {
    const userId = user?.id ?? null;

    if (inFlightRef.current && inFlightRef.current.userId === userId) {
      return inFlightRef.current.promise;
    }

    const isInitialLoad = loadedForUserRef.current !== userId;
    if (isInitialLoad) setLoading(true);

    const run = async () => {
      if (!userId) {
        setActiveCodes([]);
        loadedForUserRef.current = userId;
        if (isInitialLoad) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("entitlements")
        .select("product_code")
        .eq("user_id", userId)
        .eq("status", "active");

      if (error) {
        // Recarga silenciosa com falha de rede momentânea: mantém os entitlements já conhecidos em
        // vez de zerar e expulsar a usuária. Só na carga inicial (ainda sem nenhum dado) um erro
        // resulta em "sem acesso", igual ao comportamento anterior.
        if (isInitialLoad) setActiveCodes([]);
      } else {
        setActiveCodes((data ?? []).map((row) => row.product_code as string));
      }
      loadedForUserRef.current = userId;
      if (isInitialLoad) setLoading(false);
    };

    const promise = run().finally(() => {
      if (inFlightRef.current?.promise === promise) inFlightRef.current = null;
    });
    inFlightRef.current = { userId, promise };
    return promise;
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    fetchEntitlements();
  }, [authLoading, fetchEntitlements]);

  // Recarrega quando a aba volta a ganhar foco/visibilidade — cobre o caso de a usuária comprar um
  // produto extra na Lastlink (nova aba) e voltar para o app sem recarregar a página. Silenciosa:
  // não passa por `loading`, então não desmonta a página atual.
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
