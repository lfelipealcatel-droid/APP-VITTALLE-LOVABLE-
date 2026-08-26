import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import MuxPlayer from "@mux/mux-player-react";
import { AlertTriangle, Check, Play, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { EXERCISES, sequenceById } from "@/lib/mock-data";
import { activeDay, isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

// Uma mesma aula (A–H) é reutilizada em vários dias (ex.: Aula E nos dias 4, 10, 14 e 17), então a
// tela precisa saber de qual dia a usuária veio — não dá para inferir isso só pelo id da aula.
const searchSchema = z.object({
  dia: z.coerce.number().int().min(1).max(21).optional().catch(undefined),
});

export const Route = createFileRoute("/sequencia/$id")({
  validateSearch: searchSchema,
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
  const { dia } = Route.useSearch();
  const [dor, setDor] = useState(false);
  const nav = useNavigate();
  const [state] = useAppState();
  // Dia de origem explícito (veio do card "Aula do Dia"). Sem ele — acesso direto à rota, ou valor
  // inválido/fora de 1–21 (já filtrado pelo searchSchema) — cai de volta no dia ativo, como antes.
  const dayId = dia ?? activeDay(state);
  const done = isDayActivityDone(state, dayId, "sequencia");
  // Experiência de videoaula real (Mux) — hoje só a do Dia 1 (ativacao-corpo-inteiro) tem
  // playbackId/tagline próprios. As demais sequências continuam com o layout/placeholder existente.
  const hasRealVideo = Boolean(seq.muxPlaybackId);

  const concluir = () => {
    setDayActivity(dayId, "sequencia", true);
    toast.success("Aula concluída");
    nav({ to: "/jornada/$dia", params: { dia: String(dayId) } });
  };

  return (
    <AppShell title={seq.name} subtitle="Aula do Dia · Baixo impacto" back={`/jornada/${dayId}`}>
      {hasRealVideo ? (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-black">
          <MuxPlayer
            key={seq.id}
            playbackId={seq.muxPlaybackId}
            streamType="on-demand"
            playsInline
            accentColor="var(--color-primary)"
            metadata={{
              video_id: seq.id,
              video_title: seq.name,
              player_name: "VITTALLE Web App",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <MediaPlaceholder type="exercise" cover="green" aspect="video" label="Vídeo da aula" />
      )}

      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        {hasRealVideo ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              {seq.durationMin} min • {seq.focusArea} • Baixo impacto
            </p>
            {seq.screenTagline ? (
              <h2 className="mt-2 font-editorial text-xl">{seq.screenTagline}</h2>
            ) : null}
            {seq.screenDescription ? (
              <p className="mt-2 text-sm text-text-secondary">{seq.screenDescription}</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-wide text-text-muted">
              {seq.durationMin} min · Baixo impacto
            </p>
            <h1 className="mt-1 font-editorial text-xl">{seq.name}</h1>
            <p className="mt-2 text-sm text-text-secondary">{seq.description}</p>
          </>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {hasRealVideo ? null : (
            <button
              type="button"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
              onClick={() => toast.success("Reproduzindo (placeholder)")}
            >
              <Play size={16} aria-hidden /> Assistir aula
            </button>
          )}
          <button
            type="button"
            onClick={concluir}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${done ? "bg-secondary-light text-secondary-dark" : "bg-secondary text-secondary-foreground"}`}
          >
            <Check size={16} aria-hidden /> {done ? "Aula concluída" : "Concluir aula"}
          </button>
          {hasRealVideo ? null : (
            <button
              type="button"
              onClick={() => setDor((v) => !v)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium"
            >
              <AlertTriangle size={16} aria-hidden /> Senti dor
            </button>
          )}
        </div>

        {dor ? (
          <div className="mt-4 rounded-2xl border border-primary/30 bg-warm p-4 text-sm">
            <p className="font-semibold">Orientação de segurança</p>
            <p className="mt-1 text-text-secondary">
              Pare o exercício, respire e observe. Se a dor persistir, pule a sequência hoje e
              retome com o próximo dia. Isso não bloqueia sua jornada.
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

      {hasRealVideo ? null : (
        <>
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-semibold text-text-secondary">
              Legenda dos movimentos
            </h2>
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
        </>
      )}
    </AppShell>
  );
}
