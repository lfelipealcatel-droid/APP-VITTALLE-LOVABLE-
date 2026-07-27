import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/conclusao")({
  head: () => ({ meta: [{ title: "Jornada concluída — VITTALLE" }, { name: "description", content: "Você concluiu sua jornada de 21 dias." }] }),
  component: Conclusao,
});

function Conclusao() {
  return (
    <AppShell title="Jornada concluída" back="/progresso" hideMiniPlayer>
      <div className="mx-auto max-w-[600px] text-center">
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-warm">
          <span className="font-editorial text-4xl text-primary-dark">21</span>
        </div>
        <h1 className="mt-6 font-editorial text-3xl">Você concluiu sua jornada de 21 dias.</h1>
        <p className="mt-3 text-sm text-text-secondary">
          Mais importante do que chegar até aqui foi construir uma nova forma de cuidar de você.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
          <Stat label="Dias" value="21" />
          <Stat label="Atividades" value="84" />
          <Stat label="Marcos" value="4" />
        </div>
        <div className="mt-8 grid gap-2">
          <Link to="/progresso" className="min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground">Ver meu progresso</Link>
          <Link to="/biblioteca" className="min-h-12 rounded-xl border border-border text-sm">Explorar a biblioteca</Link>
          <Link to="/jornada" className="min-h-12 rounded-xl border border-border text-sm">Revisitar a jornada</Link>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-editorial text-2xl">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
    </div>
  );
}
