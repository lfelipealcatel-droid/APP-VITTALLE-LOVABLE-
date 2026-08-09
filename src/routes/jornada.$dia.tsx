import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Book,
  Calendar,
  Check,
  ClipboardCheck,
  Clock,
  Dumbbell,
  Headphones,
  Heart,
  HeartHandshake,
  Leaf,
  Ruler,
  Salad,
  Sparkles,
  Tag,
  Undo2,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { USER, DAYS, WEEK_LABEL, WEEK_HERO_IMAGE, sequenceById, readingByDay } from "@/lib/mock-data";
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
  const unread = 4 - state.notificationsRead.length;
  const heroImage = WEEK_HERO_IMAGE[day.week as 1 | 2 | 3];


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
    <AppShell
      title={`Dia ${day.id}`}
      subtitle={WEEK_LABEL[day.week as 1 | 2 | 3]}
      back="/jornada"
      right={
        <div className="flex items-center gap-1">
          <Link
            to="/notificacoes"
            aria-label={`Notificações${unread > 0 ? `, ${unread} não lidas` : ""}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2"
          >
            <Bell size={20} aria-hidden />
            {unread > 0 ? <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" /> : null}
          </Link>
          <Link
            to="/perfil"
            aria-label="Perfil"
            className="grid h-11 w-11 place-items-center rounded-full bg-secondary-light font-semibold text-secondary-dark"
          >
            {USER.firstName.slice(0, 1)}
          </Link>
        </div>
      }
    >
      <section className="flex min-h-[220px] overflow-hidden rounded-3xl bg-surface shadow-soft">
        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-dark">
            <Sparkles size={13} aria-hidden /> Foco de hoje
          </div>
          <h2 className="mt-2 font-editorial text-2xl font-medium leading-tight text-foreground">{day.title}</h2>
          <p className="mt-2 text-sm text-text-secondary">{day.focus}</p>
          <div className="mt-4 space-y-1 text-xs text-text-secondary">
            <p className="flex items-center gap-1.5">
              <Clock size={13} aria-hidden /> Movimento de hoje: cerca de {seq?.durationMin ?? 8} min
            </p>
            <p>Vá no seu ritmo. Cada dia conta.</p>
          </div>
        </div>
        <div className="relative w-[36%] shrink-0 sm:w-[32%]">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" loading="eager" />
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface to-transparent" aria-hidden />
        </div>
      </section>

      {day.id === 1 ? (
        <div className="mt-4 rounded-3xl bg-warm p-5">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={18} className="text-primary-dark" aria-hidden />
            <h3 className="font-editorial text-lg text-foreground">Prepare seu primeiro dia</h3>
          </div>
          <p className="mt-1 text-sm text-text-secondary">Faça estes passos rápidos para começar com segurança.</p>
          <ol className="mt-4 grid gap-2.5">
            <ChegadaStep step="inaugural" icon={Video} label="Vídeo de boas-vindas" openLabel="Assistir" />
            <ChegadaStep step="absolvicao" icon={Headphones} label="Áudio da Absolvição" openLabel="Ouvir" />
            <ChegadaStep step="orientacaoMedicao" icon={Tag} label="Como fazer sua medição" openLabel="Ver orientação" />
            <ChegadaStep step="medicaoInicial" icon={Ruler} label="Medição inicial" openLabel="Registrar" href="/medidas" />
            <ChegadaStep step="horario" icon={Clock} label="Escolha seu melhor horário" openLabel="Configurar" />
            <ChegadaStep step="mapa" icon={Calendar} label="Conheça sua jornada de 21 dias" openLabel="Ver jornada" />
          </ol>

          <div className="relative mt-4 overflow-hidden rounded-2xl bg-soft-green p-5">
            <Leaf size={72} className="pointer-events-none absolute -right-3 -top-3 text-secondary/15" aria-hidden />
            <div className="relative flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface/70 text-secondary-dark">
                <Heart size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Acompanhe sua evolução</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                  Faça sua medição inicial para comparar seus resultados ao longo dos 21 dias.
                  <br />
                  Seus dados são pessoais e somente você verá sua evolução.
                </p>
              </div>
            </div>
          </div>
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
        {reading ? (
          <InsightCard
            title={reading.title}
            subtitle={reading.subtitle}
            done={isDayActivityDone(state, day.id, "leitura")}
            href={`/leitura/${day.id}`}
          />
        ) : null}

        <DayBlock
          icon={Dumbbell}
          title="Aula do Dia"
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
          accent="secondary"
        />

        <DayBlock
          icon={Sparkles}
          title="Hábito do dia"
          description={day.habit}
          durationMin={2}
          done={isDayActivityDone(state, day.id, "habito")}
          onToggle={() => doAction("habito")}
          ctaHref={`/habito/${day.id}`}
          ctaLabel="Ver hábito"
          accent="secondary"
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
            accent="secondary"
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
    icon: Icon,
  }: {
    step: keyof typeof state.onboarding;
    label: string;
    openLabel: string;
    href?: string;
    icon: typeof Video;
  }) {
    const done = state.onboarding[step];
    const target = href ?? `/chegada/${step}`;
    return (
      <li className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
            done ? "border-secondary bg-secondary text-white" : "border-border-strong",
          )}
          aria-hidden
        >
          {done ? <Check size={13} aria-hidden /> : null}
        </span>
        <button
          type="button"
          onClick={() => navigate({ to: target })}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-surface px-3 py-3 text-left shadow-soft transition-shadow duration-150 active:shadow-none sm:rounded-full sm:py-2.5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-warm text-primary">
            <Icon size={16} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">{label}</span>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 text-xs font-semibold",
              done ? "text-text-secondary" : "text-primary",
            )}
          >
            {done ? "Rever" : openLabel} <ArrowRight size={13} aria-hidden />
          </span>
        </button>
      </li>
    );
  }
}


function InsightCard({
  title,
  subtitle,
  done,
  href,
}: {
  title: string;
  subtitle: string;
  done: boolean;
  href: string;
}) {
  return (
    <li>
      <Link
        to={href}
        className={cn(
          "block rounded-2xl border p-4 shadow-soft transition duration-150 active:shadow-none",
          done ? "border-secondary/30 bg-soft-green/40" : "border-primary/20 bg-warm",
        )}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
          <Sparkles size={13} aria-hidden /> Insight do Dia
        </p>
        <h4 className="mt-1.5 font-editorial text-lg leading-snug text-foreground">{title}</h4>
        <p className="mt-1 line-clamp-3 text-sm text-text-secondary">{subtitle}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-[11px] text-text-muted">
            <Clock size={12} aria-hidden /> 2 min de leitura
          </span>
          <span className={cn("flex shrink-0 items-center gap-1 text-xs font-semibold", done ? "text-secondary-dark" : "text-primary")}>
            {done ? (
              <>
                <Check size={14} aria-hidden /> Insight concluído
              </>
            ) : (
              <>
                Ler insight <ArrowRight size={14} aria-hidden />
              </>
            )}
          </span>
        </div>
      </Link>
    </li>
  );
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
  accent = "primary",
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
  accent?: "primary" | "secondary";
}) {
  return (
    <li
      className={cn(
        "rounded-2xl bg-surface p-4 shadow-soft",
        done && "bg-soft-green/40",
        disabled && "opacity-70",
      )}
    >
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex min-w-[190px] flex-1 items-start gap-3">
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full",
              done
                ? "bg-secondary-light text-secondary-dark"
                : accent === "secondary"
                  ? "bg-soft-green text-secondary-dark"
                  : "bg-warm text-primary",
            )}
          >
            {done ? <Check size={18} aria-hidden /> : <Icon size={18} aria-hidden />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-text-secondary">{description}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-text-muted">
              <Clock size={12} aria-hidden /> {durationMin} min
            </p>
            {disabled && disabledHint ? (
              <p className="mt-1 text-[11px] text-primary-dark">{disabledHint}</p>
            ) : null}
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-44">
          {!onlyToggle && ctaHref ? (
            disabled ? (
              <span className="inline-flex min-h-10 items-center justify-center rounded-full bg-surface-2 px-4 text-xs font-medium text-text-muted">
                {ctaLabel}
              </span>
            ) : (
              <Link
                to={ctaHref}
                className={cn(
                  "inline-flex min-h-10 items-center justify-center gap-1 rounded-full px-4 text-xs font-semibold text-white transition",
                  accent === "secondary" ? "bg-secondary-dark hover:bg-secondary" : "bg-primary hover:bg-primary-dark",
                )}
              >
                {ctaLabel} <ArrowRight size={14} aria-hidden />
              </Link>
            )
          ) : null}
          <button
            type="button"
            onClick={onToggle}
            disabled={disabled && !done}
            className={cn(
              "inline-flex min-h-10 items-center justify-center gap-1 rounded-full border px-3 text-xs font-medium transition",
              done ? "border-secondary/40 bg-secondary-light text-secondary-dark" : "border-border bg-surface text-text-secondary hover:bg-surface-2",
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
      </div>
    </li>
  );
}
