import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Salad } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { activeDay, useAppState } from "@/lib/store";

export const Route = createFileRoute("/alimentacao/sugestao-do-dia")({
  head: () => ({
    meta: [
      { title: "Sugestão do dia — VITTALLE" },
      { name: "description", content: "O prato sugerido de hoje, montado pelo Método Monta-Prato." },
    ],
  }),
  component: SugestaoPage,
});

function SugestaoPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);

  return (
    <AppShell title="Sugestão do dia" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Salad size={14} aria-hidden /> Método Monta-Prato
        </div>
        <h1 className="mt-2 font-editorial text-2xl">Prato equilibrado de hoje</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Um exemplo prático de como montar o prato do dia, respeitando as proporções do método.
        </p>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { title: "Base de vegetais", body: "Metade do prato em vegetais variados." },
          { title: "Proteína magra", body: "Uma porção proteica de boa qualidade." },
          { title: "Carboidrato inteiro", body: "Uma porção de carboidrato menos processado." },
          { title: "Gordura boa", body: "Uma colher de gordura de qualidade para finalizar." },
        ].map((it) => (
          <article key={it.title} className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold">{it.title}</h3>
            <p className="mt-1 text-xs text-text-secondary">{it.body}</p>
          </article>
        ))}
      </section>

      <p className="mt-6 text-xs text-text-secondary">
        Isto é um apoio, não uma segunda tarefa. Quem conclui a Alimentação do dia é a Missão alimentar.
      </p>

      <Link
        to="/alimentacao/refeicoes-modelo"
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Ver ideias de refeições <ArrowRight size={16} aria-hidden />
      </Link>

      <Link to="/alimentacao" className="mt-6 block text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
