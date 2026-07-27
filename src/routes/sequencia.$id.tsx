import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Check, Play, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { EXERCISES, sequenceById } from "@/lib/mock-data";
import { activeDay, isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

export const Route = createFileRoute("/sequencia/$id")({
  loader: ({ params }) => {
    const seq = sequenceById(params.id);
    if (!seq) throw notFound();
    return { seq };
  },

  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.seq.name} — VITTALLE` : "Aula do Dia — VITTALLE" },
      { name: "description", content: loaderData?.seq.description ?? "Aula oficial VITTALLE." },
    ],
  }),
  component: SequenciaPage,
  notFoundComponent: () => (
    <AppShell title="Aula do Dia" back="/jornada">
      <p className="text-sm text-text-secondary">Aula não encontrada.</p>
    </AppShell>
  ),
});

function SequenciaPage() {
  const { seq } = Route.useLoaderData();
  const [dor, setDor] = useState(false);
  const nav = useNavigate();
  const [state] = useAppState();
  const dayId = activeDay(state);
  const done = isDayActivityDone(state, dayId, "sequencia");

  const concluir = () => {
    setDayActivity(dayId, "sequencia", true);
    toast.success("Aula concluída");
    nav({ to: "/jornada/$dia", params: { dia: String(dayId) } });
  };

  return (
    <AppShell title={seq.name} subtitle="Aula do Dia · Baixo impacto" back={`/jornada/${dayId}`}>
      <MediaPlaceholder type="exercise" cover="green" aspect="video" label="Vídeo da aula" />
      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <p className="text-[11px] uppercase tracking-wide text-text-muted">{seq.durationMin} min · Baixo impacto</p>
        <h1 className="mt-1 font-editorial text-xl">{seq.name}</h1>
        <p className="mt-2 text-sm text-text-secondary">{seq.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            onClick={() => toast.success("Reproduzindo (placeholder)")}
          >
            <Play size={16} aria-hidden /> Assistir aula
          </button>
          <button
            type="button"
            onClick={concluir}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${done ? "bg-secondary-light text-secondary-dark" : "bg-secondary text-secondary-foreground"}`}
          >
            <Check size={16} aria-hidden /> {done ? "Aula concluída" : "Concluir aula"}
          </button>
          <button
            type="button"
            onClick={() => setDor((v) => !v)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium"
          >
            <AlertTriangle size={16} aria-hidden /> Senti dor
          </button>
        </div>


        {dor ? (
          <div className="mt-4 rounded-2xl border border-primary/30 bg-warm p-4 text-sm">
            <p className="font-semibold">Orientação de segurança</p>
            <p className="mt-1 text-text-secondary">
              Pare o exercício, respire e observe. Se a dor persistir, pule a sequência hoje e retome com o próximo dia.
              Isso não bloqueia sua jornada.
            </p>
            <button
              type="button"
              onClick={() => nav({ to: "/jornada" })}
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground"
            >
              Retornar em segurança à jornada
            </button>
          </div>
        ) : null}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Legenda dos movimentos</h2>
        <ul className="grid gap-2">
          {EXERCISES.map((e) => (
            <li key={e.name} className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-sm font-medium">{e.name}</p>
              <p className="text-xs text-text-muted">{e.detail}</p>
              <p className="mt-1 text-xs text-text-secondary">{e.instruction}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 flex items-center gap-2 text-xs text-text-muted">
        <ShieldCheck size={14} aria-hidden /> Baixo impacto · Adaptável ao seu momento
      </p>
    </AppShell>
  );
}
