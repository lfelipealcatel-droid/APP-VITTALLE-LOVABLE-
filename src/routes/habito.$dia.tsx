import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Sparkles, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS } from "@/lib/mock-data";
import { isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

export const Route = createFileRoute("/habito/$dia")({
  loader: ({ params }) => {
    const day = DAYS.find((d) => d.id === Number(params.dia));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Hábito · Dia ${loaderData.day.id} — VITTALLE` : "Hábito — VITTALLE" },
      { name: "description", content: loaderData?.day.habit ?? "Hábito/Âncora do dia." },
    ],
  }),
  component: HabitoPage,
  notFoundComponent: () => (
    <AppShell title="Dia não encontrado" back={true}>
      <p className="text-sm text-text-secondary">Este dia não existe.</p>
    </AppShell>
  ),
});

function HabitoPage() {
  const { day } = Route.useLoaderData();
  const [state] = useAppState();
  const navigate = useNavigate();
  const done = isDayActivityDone(state, day.id, "habito");

  const conclude = () => {
    setDayActivity(day.id, "habito", true);
    toast.success("Hábito concluído");
    if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
    else navigate({ to: "/jornada/$dia", params: { dia: String(day.id) } });
  };

  return (
    <AppShell title="Hábito/Âncora" subtitle={`Dia ${day.id}`} back={true}>
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Sparkles size={14} aria-hidden /> Um pequeno gesto
        </div>
        <h1 className="mt-2 font-editorial text-2xl">{day.habit}</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Repetir o mesmo gesto todos os dias cria uma âncora. Não precisa ser grande — precisa ser seu.
        </p>
      </section>

      <div className="mt-6">
        {done ? (
          <button
            type="button"
            onClick={() => {
              setDayActivity(day.id, "habito", false);
              toast.success("Hábito desmarcado");
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-2"
          >
            <Undo2 size={16} aria-hidden /> Desfazer
          </button>
        ) : (
          <button
            type="button"
            onClick={conclude}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Check size={16} aria-hidden /> Marcar como feito
          </button>
        )}
      </div>
    </AppShell>
  );
}
