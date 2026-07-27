import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Clock, Film, Headphones, Map, Ruler, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { completeOnboardingStep, setState, useAppState } from "@/lib/store";
import type { OnboardingState } from "@/lib/store";

type Passo = Exclude<keyof OnboardingState, "medicaoInicial">;

const PASSOS: Record<Passo, { title: string; subtitle: string; kind: "video" | "audio" | "text" | "time" | "map"; body: string }> = {
  inaugural: {
    title: "Vídeo inaugural",
    subtitle: "Boas-vindas ao Plano Barriga Hormonal 40+",
    kind: "video",
    body: "Um vídeo curto de acolhimento para começar sua jornada com clareza. O conteúdo oficial será inserido em breve.",
  },
  absolvicao: {
    title: "Áudio da Absolvição",
    subtitle: "Solte o peso do que passou",
    kind: "audio",
    body: "Uma escuta curta para começar leve. O áudio oficial será inserido em breve.",
  },
  orientacaoMedicao: {
    title: "Como fazer sua medição",
    subtitle: "Um guia simples e sem pressa",
    kind: "text",
    body: "Meça pela manhã, em jejum, com fita métrica no ponto mais estreito da cintura e na altura do umbigo. Respire naturalmente, sem apertar. Anote os números com carinho — eles são só seus.",
  },
  horario: {
    title: "Escolha seu horário",
    subtitle: "O melhor momento para o seu dia",
    kind: "time",
    body: "Escolha um horário para lembrar da sua prática diária. Você pode ajustar quando quiser.",
  },
  mapa: {
    title: "Mapa dos 21 dias",
    subtitle: "Três semanas, um passo por vez",
    kind: "map",
    body: "Semana 1 — Desinchar. Semana 2 — Ativar. Semana 3 — Firmar. Você vive um dia por vez, sem pressa.",
  },
};

export const Route = createFileRoute("/chegada/$passo")({
  loader: ({ params }) => {
    if (!(params.passo in PASSOS)) throw notFound();
    return { passo: params.passo as Passo };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${PASSOS[loaderData.passo].title} — VITTALLE` : "Chegada — VITTALLE" },
      { name: "description", content: loaderData ? PASSOS[loaderData.passo].subtitle : "Passo da chegada." },
    ],
  }),
  component: ChegadaPasso,
  notFoundComponent: () => (
    <AppShell title="Passo não encontrado" back={true}>
      <p className="text-sm text-text-secondary">Este passo não existe.</p>
    </AppShell>
  ),
});

function ChegadaPasso() {
  const data = Route.useLoaderData();
  const passo = data.passo as Passo;
  const info = PASSOS[passo];
  const [state] = useAppState();
  const navigate = useNavigate();
  const done = state.onboarding[passo];
  const [time, setTime] = useState(state.preferences.reminderTime ?? "08:00");

  const conclude = () => {
    if (passo === "horario") {
      setState((prev) => ({ preferences: { ...prev.preferences, reminderTime: time } }));
    }
    completeOnboardingStep(passo, true);
    toast.success("Passo concluído");
    if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
    else navigate({ to: "/jornada/$dia", params: { dia: "1" } });
  };

  const undo = () => {
    completeOnboardingStep(passo, false);
    toast.success("Passo desmarcado");
  };

  const Icon = info.kind === "video" ? Film : info.kind === "audio" ? Headphones : info.kind === "time" ? Clock : info.kind === "map" ? Map : Ruler;

  return (
    <AppShell title={info.title} subtitle="Chegada · Dia 1" back={true}>
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Icon size={14} aria-hidden /> {info.subtitle}
        </div>
        <h1 className="mt-2 font-editorial text-2xl">{info.title}</h1>
      </section>

      {info.kind === "video" || info.kind === "audio" ? (
        <div className="mt-4">
          <MediaPlaceholder type={info.kind === "video" ? "video" : "audio"} label={info.title} />
        </div>
      ) : null}


      <p className="mt-4 text-sm text-text-secondary">{info.body}</p>

      {info.kind === "time" ? (
        <label className="mt-4 grid gap-1 text-xs text-text-secondary">
          <span>Horário do seu lembrete</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-40 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
      ) : null}

      {info.kind === "map" ? (
        <ul className="mt-4 grid gap-2 text-sm">
          <li className="rounded-xl border border-border bg-surface p-3"><b>Semana 1 · Desinchar</b> — dias 1 a 7</li>
          <li className="rounded-xl border border-border bg-surface p-3"><b>Semana 2 · Ativar</b> — dias 8 a 14</li>
          <li className="rounded-xl border border-border bg-surface p-3"><b>Semana 3 · Firmar</b> — dias 15 a 21</li>
        </ul>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {done ? (
          <button
            type="button"
            onClick={undo}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-2"
          >
            <Undo2 size={16} aria-hidden /> Desfazer conclusão
          </button>
        ) : (
          <button
            type="button"
            onClick={conclude}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Check size={16} aria-hidden /> {info.kind === "video" ? "Concluir vídeo" : info.kind === "audio" ? "Marcar concluído" : "Concluir"}
          </button>
        )}
      </div>

      <p className="mt-6 text-xs text-text-muted">
        Este é um passo estrutural. O conteúdo definitivo será inserido em uma etapa posterior.
      </p>
    </AppShell>
  );
}
