import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS, readingByDay } from "@/lib/mock-data";
import { isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

export const Route = createFileRoute("/leitura/$dia")({
  loader: ({ params }) => {
    const dayId = Number(params.dia);
    const reading = readingByDay(dayId);
    const day = DAYS.find((d) => d.id === dayId);
    if (!reading || !day) throw notFound();
    return { reading, day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Insight do Dia ${loaderData.day.id} — ${loaderData.reading.title} · VITTALLE` : "Insight do Dia — VITTALLE" },
      { name: "description", content: loaderData?.reading.subtitle ?? "Insight oficial do dia." },
    ],
  }),
  component: LeituraPage,
  notFoundComponent: () => (
    <AppShell title="Insight do Dia" back="/jornada">
      <p className="text-sm text-text-secondary">Este insight não foi encontrado.</p>
    </AppShell>
  ),
});

function LeituraPage() {
  const { reading, day } = Route.useLoaderData();
  const [state] = useAppState();
  const navigate = useNavigate();
  const done = isDayActivityDone(state, day.id, "leitura");

  const concluir = () => {
    setDayActivity(day.id, "leitura", true);
    toast.success("Insight concluído");
    navigate({ to: "/jornada/$dia", params: { dia: String(day.id) } });
  };

  return (
    <AppShell back={`/jornada/${day.id}`}>
      <article className="mx-auto max-w-[560px]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <Sparkles size={13} aria-hidden /> Insight do Dia
        </div>
        <h1 className="mt-2 font-editorial text-3xl font-medium leading-tight text-foreground">{reading.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <Clock size={13} aria-hidden /> 2 min de leitura
        </p>

        <div className="mt-6 whitespace-pre-line text-base leading-loose text-text-secondary">{reading.body}</div>

        {done ? (
          <p className="mt-8 flex items-center gap-1.5 text-sm font-medium text-secondary-dark">
            <Check size={16} aria-hidden /> Insight concluído
          </p>
        ) : (
          <button
            type="button"
            onClick={concluir}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark sm:w-auto"
          >
            <Check size={16} aria-hidden /> Concluir insight
          </button>
        )}
      </article>
    </AppShell>
  );
}
