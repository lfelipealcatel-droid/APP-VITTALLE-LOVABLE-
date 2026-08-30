import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

const PUBLIC_PATHS = [
  "/login",
  "/esqueci-senha",
  "/redefinir-senha",
  "/auth/confirm",
  "/termos",
  "/privacidade",
];

export function RouteGuard({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (loading) return;
    if (!session && !isPublic) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (session && pathname === "/login") {
      navigate({ to: "/", replace: true });
    }
  }, [loading, session, isPublic, pathname, navigate]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-text-secondary">Carregando…</p>
      </div>
    );
  }

  if (!session && !isPublic) return null;
  if (session && pathname === "/login") return null;

  return <>{children}</>;
}
