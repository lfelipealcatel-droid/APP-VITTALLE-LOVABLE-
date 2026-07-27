import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Book, Check, Dumbbell, HeartHandshake, Ruler, Salad, Sparkles, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS, WEEK_LABEL, sequenceById, readingByDay } from "@/lib/mock-data";
import type { DayActivityKey } from "@/lib/store";
import {
  canOpenDay,
  isDayActivityDone,
  isDayCompleted,
  setDayActivity,
  useAppState,
} from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jornada/$dia")({
  loader: ({ params }) => {
    const day = DAYS.find((d) => d.id === Number(params.dia));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Dia ${loaderData.day.id} — ${loaderData.day.title} · VITTALLE` : "Dia · VITTALLE" },
      { name: "description", content: loaderData?.day.focus ?? "Detalhes do dia." },
    ],
  }),
  component: DiaPage,
  notFoundComponent: () => (
    <AppShell title="Dia não encontrado" back="/jornada">
      <p className="text-sm text-text-secondary">Este dia não faz parte da sua jornada.</p>
    </AppShell>
  ),
});

function DiaPage() {
  const { day } = Route.useLoaderData();
  const [state] = useAppState();
  const navigate = useNavigate();

  if (!canOpenDay(state, day.id)) {
    return (
      <AppShell title={`Dia ${day.id}`} back="/jornada">
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="font-editorial text-xl">Este dia ainda vai se abrir</p>
          <p className="mt-2 text-sm text-text-secondary">
            Você vive um dia por vez. O próximo se abre quando o anterior se completa.
          </p>
          <Link to="/jornada" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
            Voltar para a jornada
          </Link>
        </div>
      </AppShell>
    );
  }

  const seq = sequenceById(day.sequenceId);
  const reading = readingByDay(day.id);
  const complete = isDayCompleted(state, day.id);


  const doAction = (key: DayActivityKey) => {
    const done = isDayActivityDone(state, day.id, key);
    if (done) {
      if (window.confirm("Desfazer a conclusão deste passo?")) {
        setDayActivity(day.id, key, false);
      }
    } else {
      setDayActivity(day.id, key, true);
      toast.success("Passo concluído");
    }
  };

  return (
    <AppShell title={`Dia ${day.id}`} subtitle={day.title} back="/jornada">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[11px] uppercase tracking-wide text-text-muted">Foco de hoje</p>
        <h2 className="mt-1 font-editorial text-xl">{day.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">
          {day.week === 1
            ? "Semana 1 · Desinchar — um passo suave por vez."
            : day.week === 2
              ? "Semana 2 · Ativar — o corpo começa a responder."
              : "Semana 3 · Firmar — consolidar o que já é seu."}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
          <span>Movimento de hoje: ~{seq?.durationMin ?? 8} min</span>
          <span aria-hidden>·</span>
          <span>Vá no seu ritmo, cada dia conta.</span>
        </div>
      </div>

      {day.id === 1 && !state.onboarding.medicaoInicial && !state.demoMode ? (
        <div className="mt-4 rounded-2xl border border-primary/30 bg-warm p-5">
          <p className="text-[11px] uppercase tracking-wide text-primary-dark">Chegada · Dia 1 — Parte A</p>
          <h3 className="mt-1 font-editorial text-lg">Vamos preparar tudo com calma</h3>
          <ol className="mt-3 grid gap-2 text-sm">
            <ChegadaStep step="inaugural" label="Vídeo inaugural" openLabel="Assistir vídeo" />
            <ChegadaStep step="absolvicao" label="Áudio da Absolvição" openLabel="Ouvir áudio" />
            <ChegadaStep step="orientacaoMedicao" label="Como fazer sua medição" openLabel="Ver orientação" />
            <ChegadaStep step="medicaoInicial" label="Medição inicial (obrigatória)" openLabel="Medir agora" href="/medidas" />
            <ChegadaStep step="horario" label="Escolha seu horário" openLabel="Configurar horário" />
            <ChegadaStep step="mapa" label="Mapa dos 21 dias" openLabel="Ver mapa" />
          </ol>
          <p className="mt-3 text-xs text-text-secondary">
            Sem a medição inicial, a Parte B do Dia 1 não abre. Você pode voltar quando quiser.
          </p>
        </div>
      ) : null}

      {complete ? (
        <div className="mt-4 rounded-2xl border border-secondary/30 bg-soft-green p-5">
          <p className="font-editorial text-lg">Dia concluído</p>
          <p className="mt-1 text-sm text-text-secondary">Você deu mais um passo importante hoje.</p>
          {day.ceremony ? (
            <Link
              to="/cerimonia"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Abrir a Cerimônia do Dia 21 <ArrowRight size={16} aria-hidden />
            </Link>
          ) : (
            <Link to="/jornada" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-medium text-secondary-foreground">
              Voltar para a jornada <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </div>
      ) : null}

      <h3 className="mb-3 mt-6 text-sm font-semibold text-text-secondary">Passos de hoje</h3>
      <ul className="grid gap-3">
        <DayBlock
          icon={Book}
          title={`Leitura do Dia — ${reading?.title ?? day.title}`}
          description="Leia agora ou ouça a narração oficial."
          durationMin={4}
          done={isDayActivityDone(state, day.id, "leitura")}
          onToggle={() => doAction("leitura")}
          ctaHref={`/leitura/${day.id}`}
          ctaLabel="Ler agora"
        />

        <DayBlock
          icon={Dumbbell}
          title={day.id === 1 ? "Aula do Dia — Respirar e Soltar" : `Aula do Dia: ${seq?.name ?? "Movimento do dia"}`}
          description={day.id === 1 ? "Uma abertura suave para o corpo e para a respiração." : (seq?.description ?? "Aula oficial de baixo impacto.")}
          durationMin={seq?.durationMin ?? 8}
          done={isDayActivityDone(state, day.id, "sequencia")}
          onToggle={() => doAction("sequencia")}
          ctaHref={`/sequencia/${day.sequenceId}`}
          ctaLabel="Assistir aula"
        />

        <DayBlock
          icon={Salad}
          title="Alimentação do dia"
          description="Prato de hoje, missão alimentar e SOS."
          durationMin={5}
          done={isDayActivityDone(state, day.id, "alimentacao")}
          onToggle={() => doAction("alimentacao")}
          ctaHref="/alimentacao"
          ctaLabel="Abrir"
        />

        <DayBlock
          icon={Sparkles}
          title="Hábito/Âncora"
          description={day.habit}
          durationMin={2}
          done={isDayActivityDone(state, day.id, "habito")}
          onToggle={() => doAction("habito")}
          ctaHref={`/habito/${day.id}`}
          ctaLabel="Ver hábito"
        />

        <DayBlock
          icon={HeartHandshake}
          title="Check-in"
          description="Como você está se sentindo hoje?"
          durationMin={1}
          done={isDayActivityDone(state, day.id, "checkin")}
          onToggle={() => doAction("checkin")}
          ctaHref={`/checkin/${day.id}`}
          ctaLabel="Fazer check-in"
        />


        {(day.measurementRequired || day.measurementSuggested) ? (
          <DayBlock
            icon={Ruler}
            title={day.measurementRequired ? "Medição do dia" : "Medição sugerida"}
            description={
              day.measurementRequired
                ? "Este é um dia oficial de medição do plano."
                : "Uma medição de acompanhamento, se você desejar."
            }
            durationMin={3}
            done={isDayActivityDone(state, day.id, "medicao")}
            onToggle={() => doAction("medicao")}
            ctaHref="/medidas"
            ctaLabel="Registrar medição"
          />
        ) : null}
      </ul>
    </AppShell>
  );

  function ChegadaStep({
    step,
    label,
    openLabel,
    href,
  }: {
    step: keyof typeof state.onboarding;
    label: string;
    openLabel: string;
    href?: string;
  }) {
    const done = state.onboarding[step];
    const target = href ?? `/chegada/${step}`;
    return (
      <li className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2">
        <span
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold",
            done ? "bg-secondary-light text-secondary-dark" : "bg-surface-2 text-text-secondary",
          )}
        >
          {done ? <Check size={14} aria-hidden /> : "•"}
        </span>
        <span className="flex-1 text-sm">{label}</span>
        {done ? (
          <>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-dark">
              Concluído
            </span>
            <button
              type="button"
              onClick={() => navigate({ to: target })}
              className="text-xs text-text-secondary hover:underline"
            >
              Rever
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate({ to: target })}
            className="text-xs font-semibold text-primary hover:underline"
          >
            {openLabel}
          </button>
        )}
      </li>
    );
  }
}


function DayBlock({
  icon: Icon,
  title,
  description,
  durationMin,
  done,
  onToggle,
  ctaHref,
  ctaLabel,
  disabled,
  disabledHint,
  onlyToggle,
}: {
  icon: typeof Book;
  title: string;
  description: string;
  durationMin: number;
  done: boolean;
  onToggle: () => void;
  ctaHref?: string;
  ctaLabel: string;
  disabled?: boolean;
  disabledHint?: string;
  onlyToggle?: boolean;
}) {
  return (
    <li
      className={cn(
        "rounded-2xl border border-border bg-surface p-4",
        done && "bg-soft-green/40 border-secondary/30",
        disabled && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full",
            done ? "bg-secondary-light text-secondary-dark" : "bg-warm text-primary",
          )}
        >
          {done ? <Check size={18} aria-hidden /> : <Icon size={18} aria-hidden />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-text-secondary">{description}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-text-muted">{durationMin} min</p>
          {disabled && disabledHint ? (
            <p className="mt-1 text-[11px] text-primary-dark">{disabledHint}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!onlyToggle && ctaHref ? (
          disabled ? (
            <span className="inline-flex min-h-10 items-center rounded-xl bg-surface-2 px-4 text-xs font-medium text-text-muted">
              {ctaLabel}
            </span>
          ) : (
            <Link to={ctaHref} className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground">
              {ctaLabel} <ArrowRight size={14} aria-hidden />
            </Link>
          )
        ) : null}
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled && !done}
          className={cn(
            "inline-flex min-h-10 items-center gap-1 rounded-xl border px-3 text-xs font-medium",
            done ? "border-secondary/40 bg-secondary-light text-secondary-dark" : "border-border bg-surface hover:bg-surface-2",
            disabled && !done && "cursor-not-allowed opacity-60",
          )}
        >
          {done ? (
            <>
              <Undo2 size={14} aria-hidden /> Desfazer
            </>
          ) : (
            <>
              <Check size={14} aria-hidden /> Marcar como feito
            </>
          )}
        </button>
      </div>
    </li>
  );
}
