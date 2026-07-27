import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  useAppState,
  isDayCompleted,
  hasFinalMeasurement,
  hasInitialMeasurement,
} from "@/lib/store";

export const Route = createFileRoute("/cerimonia")({
  head: () => ({
    meta: [
      { title: "Cerimônia do Dia 21 — VITTALLE" },
      { name: "description", content: "Fechamento da sua jornada de 21 dias." },
      { property: "og:title", content: "Cerimônia do Dia 21 — VITTALLE" },
      { property: "og:description", content: "Um fechamento cuidadoso da sua jornada." },
    ],
  }),
  component: Cerimonia,
});

function Cerimonia() {
  const [state] = useAppState();
  const openable = state.demoMode || isDayCompleted(state, 21);
  if (!openable) {
    return (
      <AppShell title="Cerimônia do Dia 21" back="/jornada" hideMiniPlayer>
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="font-editorial text-xl">A cerimônia se abre quando o Dia 21 for concluído</p>
          <p className="mt-2 text-sm text-text-secondary">Você chegará lá no seu tempo.</p>
        </div>
      </AppShell>
    );
  }

  const initial = state.measurements.find((m) => m.initial);
  const final = state.measurements.find((m) => m.final);

  return (
    <AppShell title="Cerimônia do Dia 21" back="/jornada" hideMiniPlayer>
      <div className="animate-fade-in">
        <section className="rounded-3xl border border-primary/20 bg-warm p-6">
          <Sparkles size={22} className="text-primary" aria-hidden />
          <h1 className="mt-3 font-editorial text-2xl">Você chegou até aqui</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Uma jornada de 21 dias não é sobre performance. É sobre presença, escuta e continuidade.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Suas medições</h2>
          <p className="mt-1 text-xs text-text-secondary">
            {hasInitialMeasurement(state) ? "Medição inicial registrada." : "Sem medição inicial."}
            {" "}
            {hasFinalMeasurement(state) ? "Medição final registrada." : "Medição final pendente."}
          </p>
          {initial && final ? (
            <ul className="mt-3 grid gap-2 text-sm">
              <li>Cintura: {initial.waist ?? "—"} cm → {final.waist ?? "—"} cm</li>
              <li>Abdômen: {initial.abdomen ?? "—"} cm → {final.abdomen ?? "—"} cm</li>
              <li>Peso: {initial.weight ?? "—"} kg → {final.weight ?? "—"} kg</li>
            </ul>
          ) : (
            <Link to="/medidas" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
              Registrar medição final
            </Link>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Próximos passos</h2>
          <p className="mt-1 text-xs text-text-secondary">
            A continuidade da sua jornada será apresentada em uma etapa posterior.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
