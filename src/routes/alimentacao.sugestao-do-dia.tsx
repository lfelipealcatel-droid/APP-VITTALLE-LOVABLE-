import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Salad, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { activeDay, isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

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
  const done = isDayActivityDone(state, dayId, "alimentacao");

  const toggle = () => {
    setDayActivity(dayId, "alimentacao", !done);
    toast.success(done ? "Sugestão desmarcada" : "Sugestão concluída");
  };

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

      <button
        type="button"
        onClick={toggle}
        className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${done ? "bg-secondary-light text-secondary-dark" : "bg-primary text-primary-foreground"}`}
      >
        {done ? <><Undo2 size={16} aria-hidden /> Desfazer</> : <><Check size={16} aria-hidden /> Concluir sugestão</>}
      </button>

      <Link to="/alimentacao" className="mt-6 block text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
