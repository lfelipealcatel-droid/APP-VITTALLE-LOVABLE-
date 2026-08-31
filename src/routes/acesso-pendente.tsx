import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useEntitlements } from "@/lib/entitlements";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/acesso-pendente")({
  head: () => ({ meta: [{ title: "Acesso pendente — VITTALLE" }] }),
  component: AcessoPendente,
});

function AcessoPendente() {
  const { refresh, loading } = useEntitlements();
  const nav = useNavigate();
  const [checking, setChecking] = useState(false);

  const tryAgain = async () => {
    if (checking) return;
    setChecking(true);
    await refresh();
    setChecking(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/login" });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-editorial text-3xl text-primary-dark">VITTALLE</p>
        <h1 className="mt-6 font-editorial text-2xl leading-tight">Seu acesso ainda não foi liberado</h1>
        <p className="mt-3 text-sm text-text-secondary">
          Assim que sua compra for confirmada, seu acesso ao Plano Barriga Hormonal 40+ será liberado
          nesta conta.
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          Se você acabou de concluir o pagamento, aguarde alguns instantes e tente novamente.
        </p>
        <button
          type="button"
          onClick={tryAgain}
          disabled={checking || loading}
          className="mt-6 min-h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {checking || loading ? "Verificando…" : "Tentar novamente"}
        </button>
        <button
          type="button"
          onClick={signOut}
          className="mt-3 min-h-12 w-full rounded-xl border border-border bg-surface text-sm font-medium text-text-secondary hover:bg-surface-2"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
