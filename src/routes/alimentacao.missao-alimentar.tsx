import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Undo2 } from "lucide-react";
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

function MissaoPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const done = isDayActivityDone(state, dayId, "alimentacao");

  const toggle = () => {
    setDayActivity(dayId, "alimentacao", !done);
    toast.success(done ? "Missão desmarcada" : "Missão marcada como feita");
  };

  return (
    <AppShell title="Missão alimentar" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Sparkles size={14} aria-hidden /> Missão de hoje
        </div>
        <h1 className="mt-2 font-editorial text-2xl">Um pequeno gesto</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Escolha, hoje, adicionar um vegetal no almoço. Sem restrição, sem contagem, sem pressa.
        </p>
        <button
          type="button"
          onClick={toggle}
          className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${done ? "bg-secondary-light text-secondary-dark" : "bg-primary text-primary-foreground"}`}
        >
          {done ? (
            <>
              <Undo2 size={16} aria-hidden /> Desfazer
            </>
          ) : (
            <>
              <Check size={16} aria-hidden /> Marcar missão como feita
            </>
          )}
        </button>
      </section>

      <p className="mt-6 text-xs text-text-secondary">
        Esta é a ação que conclui a Alimentação do dia. Este é um exemplo de missão — cada um dos 21 dias trará a sua.
      </p>
      <Link to="/alimentacao" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
