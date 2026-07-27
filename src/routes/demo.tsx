import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS, PRODUCTS } from "@/lib/mock-data";
import {
  resetDemo,
  setDemoDayOverride,
  setDayActivity,
  setOwnedProduct,
  toggleDemoMode,
  useAppState,
} from "@/lib/store";

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
        <p className="text-xs text-text-secondary">Aberto apenas com o modo ativo.</p>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {DAYS.map((d) => (
            <button
              key={d.id}
              type="button"
              disabled={!state.demoMode}
              onClick={() => {
                setDemoDayOverride(d.id);
                toast.success(`Dia ${d.id} simulado`);
              }}
              className={`min-h-10 rounded-lg border text-xs font-medium ${state.demoDayOverride === d.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface"}`}
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
                (["leitura", "sequencia", "alimentacao", "habito", "checkin"] as const).forEach((k) => setDayActivity(d.id, k, true));
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
