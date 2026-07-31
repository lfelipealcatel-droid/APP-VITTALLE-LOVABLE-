import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { activeDay, isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

export const Route = createFileRoute("/alimentacao/missao-alimentar")({
  head: () => ({
    meta: [
      { title: "Missão alimentar — VITTALLE" },
      { name: "description", content: "A ação prática que conclui a Alimentação do dia." },
    ],
  }),
  component: MissaoPage,
});

const IDEAS = ["Tomate ou cenoura", "Legumes congelados", "Salada pronta", "O vegetal que já houver em casa"];

function MissaoPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const done = isDayActivityDone(state, dayId, "alimentacao");

  const toggle = () => {
    setDayActivity(dayId, "alimentacao", !done);
    toast.success(done ? "Missão desmarcada" : "Missão concluída");
  };

  return (
    <AppShell title="Missão alimentar" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Sparkles size={14} aria-hidden /> Missão de hoje
        </div>
        <h1 className="mt-2 font-editorial text-2xl">Inclua um vegetal no almoço</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Acrescente pelo menos um vegetal ao prato que você já costuma comer.
        </p>

        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-text-secondary">Ideias simples</p>
        <ul className="grid gap-2">
          {IDEAS.map((idea) => (
            <li key={idea} className="rounded-xl border border-border bg-surface p-3 text-sm text-text-secondary">
              {idea}
            </li>
          ))}
        </ul>

        {done ? (
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-secondary-light px-4 py-3 text-sm font-semibold text-secondary-dark">
            <span className="flex items-center gap-2">
              <Check size={16} aria-hidden /> Missão concluída
            </span>
            <button type="button" onClick={toggle} className="text-xs font-medium text-secondary-dark/70 hover:underline">
              Desfazer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggle}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Check size={16} aria-hidden /> Concluir missão de hoje
          </button>
        )}
      </section>

      <Link to="/alimentacao" className="mt-6 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
