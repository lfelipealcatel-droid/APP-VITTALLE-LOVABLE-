import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, GlassWater, Moon, Pause, Sunrise, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS, HABITS, habitForDay, habitsIntroducedUpTo, type Habit, type HabitId } from "@/lib/mock-data";
import { isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

export const Route = createFileRoute("/habito/$dia")({
  loader: ({ params }) => {
    const day = DAYS.find((d) => d.id === Number(params.dia));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Seu hábito de hoje · Dia ${loaderData.day.id} — VITTALLE` : "Hábito — VITTALLE" },
      { name: "description", content: "Um gesto simples que ajuda sua rotina a trabalhar a seu favor." },
    ],
  }),
  component: HabitoPage,
  notFoundComponent: () => (
    <AppShell title="Dia não encontrado" back={true}>
      <p className="text-sm text-text-secondary">Este dia não existe.</p>
    </AppShell>
  ),
});

const HABIT_ICON: Record<HabitId, LucideIcon> = {
  "copo-antes-cafe": GlassWater,
  desligar: Moon,
  "luz-manha": Sunrise,
  "pausa-3-minutos": Pause,
};

function HabitoPage() {
  const { day } = Route.useLoaderData();
  const [state] = useAppState();
  const navigate = useNavigate();
  const done = isDayActivityDone(state, day.id, "habito");

  const conclude = () => {
    setDayActivity(day.id, "habito", true);
    toast.success(day.id === 7 ? "Revisão concluída" : "Hábito concluído");
    navigate({ to: "/jornada/$dia", params: { dia: String(day.id) } });
  };

  if (day.id === 7) {
    return <ReviewWeek1 done={done} onConclude={conclude} />;
  }

  const habit = habitForDay(day.id);
  const Icon = HABIT_ICON[habit.id];
  const isWeek3 = day.week === 3;

  return (
    <AppShell title="Seu hábito de hoje" subtitle="Um gesto simples que ajuda sua rotina a trabalhar a seu favor." back={true}>
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-dark">
          <Icon size={16} aria-hidden /> {habit.eyebrow}
        </div>
        <h2 className="mt-2 font-editorial text-2xl">{habit.title}</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{habit.intro}</p>
      </section>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">O que fazer hoje</p>
        <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">{habit.whatToDoToday}</p>
      </div>

      <div className="mt-3 rounded-2xl bg-soft-green/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary-dark">Por que vale a pena</p>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{habit.why}</p>
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{habit.closing}</p>

      {day.id === 2 ? (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
          <Check size={13} aria-hidden /> Você já começou: O copo antes do café
        </p>
      ) : null}

      {day.id === 3 || day.id === 4 || day.id === 5 || day.id === 6 ? (
        <HabitRecap label="Seus hábitos até aqui" habits={habitsIntroducedUpTo(day.id)} />
      ) : null}

      {day.id === 8 ? <HabitRecap label="Agora você tem 4 hábitos simples" habits={HABITS} /> : null}

      {day.id >= 9 ? <HabitRecap label="Seus 4 hábitos" habits={HABITS} /> : null}

      {isWeek3 ? (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Você não precisa adicionar mais nada agora.
          <br />
          Continue repetindo os quatro gestos simples que construiu até aqui.
        </p>
      ) : null}

      <div className="mt-6">
        {done ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-secondary-dark">
            <Check size={16} aria-hidden /> Hábito concluído
          </p>
        ) : (
          <button
            type="button"
            onClick={conclude}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            <Check size={16} aria-hidden /> Marcar como feito
          </button>
        )}
      </div>
    </AppShell>
  );
}

function HabitRecap({ label, habits }: { label: string; habits: Habit[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</p>
      <ul className="mt-2 grid gap-1.5">
        {habits.map((h) => {
          const Icon = HABIT_ICON[h.id];
          return (
            <li key={h.id} className="flex items-center gap-2 text-sm text-text-secondary">
              <Check size={14} className="shrink-0 text-secondary-dark" aria-hidden />
              <Icon size={14} className="shrink-0 text-text-muted" aria-hidden />
              {h.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ReviewWeek1({ done, onConclude }: { done: boolean; onConclude: () => void }) {
  const reviewed = habitsIntroducedUpTo(7); // copo, desligar, luz-manha
  return (
    <AppShell title="Seus três primeiros hábitos" subtitle="Uma semana de gestos pequenos que já começaram a fazer parte da sua rotina." back={true}>
      <ul className="grid gap-3">
        {reviewed.map((h) => {
          const Icon = HABIT_ICON[h.id];
          return (
            <li key={h.id} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soft-green text-secondary-dark">
                <Check size={16} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Icon size={14} className="shrink-0 text-primary" aria-hidden /> {h.title}
                </p>
                {h.reviewLabel ? <p className="mt-0.5 text-xs text-text-secondary">{h.reviewLabel}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        {done ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-secondary-dark">
            <Check size={16} aria-hidden /> Revisão concluída
          </p>
        ) : (
          <button
            type="button"
            onClick={onConclude}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            <Check size={16} aria-hidden /> Concluir revisão
          </button>
        )}
      </div>
    </AppShell>
  );
}
