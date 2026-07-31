import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { activeDay, useAppState } from "@/lib/store";

export const Route = createFileRoute("/alimentacao/sugestao-do-dia")({
  head: () => ({
    meta: [
      { title: "Sugestão do dia — VITTALLE" },
      { name: "description", content: "Um apoio prático para cumprir a missão alimentar de hoje." },
    ],
  }),
  component: SugestaoPage,
});

const IDEAS = [
  "Coloque tomate ou cenoura ao lado do prato",
  "Use uma porção de legumes congelados",
  "Escolha uma pequena salada pronta",
  "Acrescente vegetais dentro de uma omelete",
];

function SugestaoPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);

  return (
    <AppShell title="Sugestão do dia" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Lightbulb size={14} aria-hidden /> Sugestão para facilitar
        </div>
        <h1 className="mt-2 font-editorial text-2xl">Use o que já existe em casa</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Para cumprir a missão de hoje, você não precisa preparar uma refeição diferente. Acrescente uma opção simples ao
          almoço que já faria normalmente.
        </p>
      </section>

      <ul className="mt-4 grid gap-2">
        {IDEAS.map((idea) => (
          <li key={idea} className="rounded-xl border border-border bg-surface p-4 text-sm text-text-secondary">
            {idea}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-text-secondary">
        Esta sugestão é apenas um apoio. A Missão alimentar é o que conclui a atividade de hoje.
      </p>

      <Link
        to="/alimentacao/refeicoes-modelo"
        search={{ filtro: "vegetais" }}
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Ver refeições com vegetais <ArrowRight size={16} aria-hidden />
      </Link>

      <Link to="/alimentacao" className="mt-6 block text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
