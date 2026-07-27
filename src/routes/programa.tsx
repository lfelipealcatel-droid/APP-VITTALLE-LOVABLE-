import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { activeDay, useAppState } from "@/lib/store";

export const Route = createFileRoute("/programa")({
  head: () => ({
    meta: [
      { title: "Programa — VITTALLE" },
      { name: "description", content: "Continue seu Plano Barriga Hormonal 40+ de onde parou." },
    ],
  }),
  component: ProgramaRedirect,
});

function ProgramaRedirect() {
  const [state] = useAppState();
  const nav = useNavigate();
  useEffect(() => {
    const dia = activeDay(state);
    nav({ to: "/jornada/$dia", params: { dia: String(dia) }, replace: true });
  }, [state, nav]);
  return (
    <AppShell title="Programa" hideMiniPlayer>
      <p className="text-sm text-text-secondary">Abrindo seu dia…</p>
    </AppShell>
  );
}
