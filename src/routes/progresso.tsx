import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DAYS, MILESTONES, USER } from "@/lib/mock-data";
import {
  useAppState,
  currentUnlockedDay,
  isDayCompleted,
  hasInitialMeasurement,
  hasFinalMeasurement,
} from "@/lib/store";

export const Route = createFileRoute("/progresso")({
  head: () => ({
    meta: [
      { title: "Progresso — VITTALLE" },
      { name: "description", content: "Seus dias vividos, marcos e medições." },
    ],
  }),
  component: Progresso,
});

function Progresso() {
  const [state] = useAppState();
  const unlocked = currentUnlockedDay(state);
  const daysCompleted = DAYS.filter((d) => isDayCompleted(state, d.id)).length;
  const ratio = daysCompleted / USER.totalDays;

  const achievements: Record<string, boolean> = {
    m1: daysCompleted >= 1,
    m2: daysCompleted >= 7,
    m3: daysCompleted >= 14,
    m4: daysCompleted >= 21,
    m5: hasInitialMeasurement(state),
  };

  return (
    <AppShell title="Seu progresso" subtitle="Sem punição, no seu ritmo">
      <section className="rounded-3xl border border-primary/20 bg-warm p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-primary text-primary-dark">
            <span className="text-sm font-semibold">{Math.round(ratio * 100)}%</span>
          </div>
          <div>
            <p className="font-editorial text-xl">{daysCompleted} de {USER.totalDays} dias vividos</p>
            <p className="text-xs text-text-secondary">Dia {unlocked} liberado. Cada passo conta.</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Marcos</h2>
        <ul className="grid gap-2">
          {MILESTONES.map((m) => {
            const achieved = achievements[m.id];
            return (
              <li key={m.id} className={`flex items-start gap-3 rounded-2xl border p-4 ${achieved ? "border-secondary/30 bg-soft-green" : "border-border bg-surface"}`}>
                <span className={`grid h-10 w-10 place-items-center rounded-full ${achieved ? "bg-secondary text-secondary-foreground" : "bg-surface-2 text-text-muted"}`}>
                  {achieved ? <Trophy size={18} aria-hidden /> : <Award size={18} aria-hidden />}
                </span>
                <div>
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-text-secondary">{m.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Medições</h2>
        <p className="mt-1 text-xs text-text-secondary">
          {state.measurements.length > 0
            ? `${state.measurements.length} registros. Inicial: ${hasInitialMeasurement(state) ? "sim" : "não"} · Final: ${hasFinalMeasurement(state) ? "sim" : "não"}.`
            : "Você ainda não registrou medidas."}
        </p>
        <Link to="/medidas" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
          Registrar medida
        </Link>
      </section>

      <p className="mt-6 text-xs text-text-muted">
        Ausência não zera seu progresso. Você retoma quando puder.
      </p>
    </AppShell>
  );
}
