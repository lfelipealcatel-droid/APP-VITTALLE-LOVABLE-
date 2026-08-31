import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useEntitlements } from "@/lib/entitlements";

const PUBLIC_PATHS = [
  "/login",
  "/esqueci-senha",
  "/redefinir-senha",
  "/auth/confirm",
  "/termos",
  "/privacidade",
];

const ACESSO_PENDENTE_PATH = "/acesso-pendente";

export function RouteGuard({ children }: { children: ReactNode }) {
  const { session, loading: authLoading } = useAuth();
  // hasMainProductAccess já inclui o bypass de ADMIN — nenhuma checagem extra de isAdmin é
  // necessária aqui, e esse valor nunca é usado para autorizar ADMIN via e-mail ou heurística.
  const { hasMainProductAccess, loading: entitlementsLoading } = useEntitlements();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const loading = authLoading || entitlementsLoading;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isAcessoPendente = pathname === ACESSO_PENDENTE_PATH;

  useEffect(() => {
    if (loading) return;
    if (!session && !isPublic) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (session && pathname === "/login") {
      navigate({ to: hasMainProductAccess ? "/" : ACESSO_PENDENTE_PATH, replace: true });
      return;
    }
    if (session && !isPublic && !isAcessoPendente && !hasMainProductAccess) {
      navigate({ to: ACESSO_PENDENTE_PATH, replace: true });
      return;
    }
    if (session && isAcessoPendente && hasMainProductAccess) {
      navigate({ to: "/", replace: true });
    }
  }, [loading, session, isPublic, isAcessoPendente, hasMainProductAccess, pathname, navigate]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-text-secondary">Carregando…</p>
      </div>
    );
  }

  if (!session && !isPublic) return null;
  if (session && pathname === "/login") return null;
  if (session && !isPublic && !isAcessoPendente && !hasMainProductAccess) return null;
  if (session && isAcessoPendente && hasMainProductAccess) return null;

  return <>{children}</>;
}
