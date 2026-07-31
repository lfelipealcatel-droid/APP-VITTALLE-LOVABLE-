import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS, PRODUCTS, WEEK_LABEL, dayById } from "@/lib/mock-data";
import type { DayActivityKey } from "@/lib/store";
import {
  DAY_KEYS,
  clearDayActivities,
  dayProgress,
  hasFinalMeasurement,
  hasInitialMeasurement,
  isDayActivityDone,
  resetDemo,
  setDayActivity,
  setDemoDayOverride,
  setOwnedProduct,
  toggleDemoMode,
  useAppState,
} from "@/lib/store";

const ACTIVITY_LABELS: Record<DayActivityKey, string> = {
  leitura: "Leitura",
  sequencia: "Sequência",
  alimentacao: "Alimentação",
  habito: "Hábito",
  checkin: "Check-in",
  medicao: "Medição",
};

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Modo demonstração — VITTALLE" },
      { name: "description", content: "Painel de controles do modo demonstração." },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  const [state] = useAppState();
  const selectedDay = state.demoMode ? dayById(state.demoDayOverride ?? -1) : undefined;
  const selectedProgress = selectedDay ? dayProgress(state, selectedDay.id) : null;
  const selectedStatus = selectedProgress
    ? selectedProgress.done === 0
      ? "Não iniciado"
      : selectedProgress.done >= selectedProgress.total
        ? "Concluído"
        : "Em andamento"
    : null;

  return (
    <AppShell title="Modo demonstração" subtitle="Uso interno para revisão" back="/perfil" hideMiniPlayer>
      <section className="rounded-2xl border border-primary/30 bg-warm p-5">
        <p className="text-sm font-semibold">Modo demonstração</p>
        <p className="text-xs text-text-secondary">
          Permite abrir qualquer dia, marcar/desmarcar atividades e alternar entitlements. Não altera as regras do Modo Cliente.
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={state.demoMode} onChange={(e) => toggleDemoMode(e.target.checked)} />
          Ativar Modo Demonstração
        </label>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Simular dia</h2>
        <p className="text-xs text-text-secondary">Aberto apenas com o modo ativo. O dia selecionado fica destacado abaixo.</p>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {DAYS.map((d) => (
            <button
              key={d.id}
              type="button"
              disabled={!state.demoMode}
              aria-pressed={state.demoDayOverride === d.id}
              onClick={() => {
                setDemoDayOverride(d.id);
                toast.success(`Dia ${d.id} simulado`);
              }}
              className={`min-h-10 rounded-lg border text-xs font-medium disabled:opacity-60 ${state.demoDayOverride === d.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface"}`}
            >
              {d.id}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/cerimonia" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir cerimônia do Dia 21
          </Link>
          <button
            type="button"
            disabled={!state.demoMode}
            onClick={() => {
              DAYS.forEach((d) => {
                DAY_KEYS.forEach((k) => setDayActivity(d.id, k, true));
              });
              toast.success("21 dias marcados como concluídos");
            }}
            className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium disabled:opacity-60"
          >
            Marcar todos os 21 dias
          </button>
          <button
            type="button"
            onClick={() => {
              resetDemo();
              toast.success("Demonstração reiniciada");
            }}
            className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium"
          >
            Reiniciar demonstração
          </button>
        </div>

        {selectedDay && selectedProgress ? (
          <div className="mt-5 rounded-xl border border-primary/30 bg-warm/60 p-4">
            <p className="text-[11px] uppercase tracking-wide text-text-muted">Dia selecionado</p>
            <p className="mt-1 text-sm font-semibold">Dia {selectedDay.id} — {selectedDay.title}</p>
            <p className="text-xs text-text-secondary">{WEEK_LABEL[selectedDay.week]}</p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium">
                {selectedProgress.done} de {selectedProgress.total} atividades concluídas
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  selectedStatus === "Concluído"
                    ? "bg-secondary-light text-secondary-dark"
                    : selectedStatus === "Em andamento"
                      ? "bg-primary/15 text-primary-dark"
                      : "bg-surface-2 text-text-muted"
                }`}
              >
                {selectedStatus}
              </span>
            </div>

            <Link
              to="/jornada/$dia"
              params={{ dia: String(selectedDay.id) }}
              className="mt-3 inline-flex min-h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
            >
              Abrir Dia {selectedDay.id}
            </Link>

            <h3 className="mb-2 mt-4 text-xs font-semibold text-text-secondary">Atividades do dia</h3>
            <ul className="grid gap-1.5">
              {DAY_KEYS.map((key) => {
                const done = isDayActivityDone(state, selectedDay.id, key);
                return (
                  <li key={key} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={(e) => setDayActivity(selectedDay.id, key, e.target.checked)}
                      />
                      {ACTIVITY_LABELS[key]}
                    </label>
                  </li>
                );
              })}
            </ul>

            <h3 className="mb-2 mt-4 text-xs font-semibold text-text-secondary">Predefinições</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  DAY_KEYS.forEach((k) => setDayActivity(selectedDay.id, k, false));
                  toast.success(`Dia ${selectedDay.id}: deixado não iniciado`);
                }}
                className="inline-flex min-h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
              >
                Deixar não iniciado
              </button>
              <button
                type="button"
                onClick={() => {
                  setDayActivity(selectedDay.id, "leitura", true);
                  setDayActivity(selectedDay.id, "sequencia", true);
                  setDayActivity(selectedDay.id, "alimentacao", false);
                  setDayActivity(selectedDay.id, "habito", false);
                  setDayActivity(selectedDay.id, "checkin", false);
                  toast.success(`Dia ${selectedDay.id}: simulado em andamento`);
                }}
                className="inline-flex min-h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
              >
                Simular em andamento
              </button>
              <button
                type="button"
                onClick={() => {
                  DAY_KEYS.forEach((k) => setDayActivity(selectedDay.id, k, true));
                  toast.success(`Dia ${selectedDay.id}: concluído`);
                }}
                className="inline-flex min-h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
              >
                Concluir este dia
              </button>
              <button
                type="button"
                onClick={() => {
                  clearDayActivities(selectedDay.id);
                  toast.success(`Dia ${selectedDay.id}: dados de atividades limpos`);
                }}
                className="inline-flex min-h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
              >
                Limpar somente este dia
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Medições</h2>
        <p className="mt-1 text-xs text-text-secondary">
          Medição inicial registrada: {hasInitialMeasurement(state) ? "sim" : "não"} · Medição final registrada: {hasFinalMeasurement(state) ? "sim" : "não"} · Total registrado: {state.measurements.length}
        </p>
        <Link to="/medidas" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
          Abrir Medidas
        </Link>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Acessos de teste</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Home
          </Link>
          <Link to="/jornada" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Jornada completa
          </Link>
          <Link to="/biblioteca" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Biblioteca
          </Link>
          {selectedDay ? (
            <Link
              to="/jornada/$dia"
              params={{ dia: String(selectedDay.id) }}
              className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"
            >
              Abrir Dia selecionado
            </Link>
          ) : null}
          <Link to="/progresso" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Progresso
          </Link>
          <Link to="/medidas" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Medidas
          </Link>
          <Link to="/cerimonia" className="inline-flex min-h-10 items-center rounded-xl border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">
            Abrir Cerimônia
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Entitlements simulados</h2>
        <ul className="mt-3 grid gap-2">
          {PRODUCTS.map((p) => {
            const owned = state.ownedProducts.includes(p.id);
            return (
              <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.title}</p>
                  <p className="text-[11px] uppercase tracking-wide text-text-muted">{p.category}</p>
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={owned} onChange={(e) => setOwnedProduct(p.id, e.target.checked)} disabled={p.category === "core"} />
                  Adquirido
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-6 text-xs text-text-muted">Uso interno. Não modifica as regras do Modo Cliente.</p>
    </AppShell>
  );
}
