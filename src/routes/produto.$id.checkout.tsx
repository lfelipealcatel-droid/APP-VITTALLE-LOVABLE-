import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";

// O checkout simulado deixou de existir: nenhum caminho do app pode marcar um produto como
// comprado sem uma linha real na tabela `entitlements` (Supabase), vinda da Edge Function da
// Lastlink. Esta rota só redireciona para a página do produto, onde a compra real acontece.
export const Route = createFileRoute("/produto/$id/checkout")({
  component: CheckoutRedirect,
});

function CheckoutRedirect() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  useEffect(() => {
    nav({ to: "/produto/$id", params: { id }, replace: true });
  }, [id, nav]);
  return (
    <AppShell title="Produto" hideMiniPlayer>
      <p className="text-sm text-text-secondary">Redirecionando…</p>
    </AppShell>
  );
}
