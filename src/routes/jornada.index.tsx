import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DAYS, WEEK_LABEL } from "@/lib/mock-data";
import {
  useAppState,
  canOpenDay,
  currentUnlockedDay,
  dayProgress,
  isDayCompleted,
} from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jornada/")({
  head: () => ({
    meta: [
      { title: "Jornada — VITTALLE" },
      { name: "description", content: "Seus 21 dias, organizados em três semanas: Desinchar, Ativar, Firmar." },
      { property: "og:title", content: "Jornada — VITTALLE" },
      { property: "og:description", content: "21 dias no seu ritmo." },
    ],
  }),
  component: Jornada,
});

function Jornada() {
  const [state] = useAppState();
  const unlocked = currentUnlockedDay(state);
  const weeks: (1 | 2 | 3)[] = [1, 2, 3];

  return (
    <AppShell title="Sua jornada" subtitle="21 dias em três semanas">
      <p className="mb-6 text-sm text-text-secondary">
        Seu progresso continua, mesmo quando o ritmo muda. Você vive um dia por vez —
        o próximo se abre naturalmente.
      </p>

      {weeks.map((w) => (
        <section key={w} className="mb-8">
          <h2 className="mb-3 font-editorial text-lg text-primary-dark">{WEEK_LABEL[w]}</h2>
          <ul className="grid gap-2">
            {DAYS.filter((d) => d.week === w).map((day) => {
              const canOpen = canOpenDay(state, day.id);
              const completed = isDayCompleted(state, day.id);
              const { done, total } = dayProgress(state, day.id);
              const isCurrent = day.id === unlocked && !completed;
              return (
                <li key={day.id}>
                  <MaybeLink dayId={day.id} enabled={canOpen}>
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border p-3 transition",
                        canOpen ? "border-border bg-surface hover:bg-surface-2" : "border-border/60 bg-surface-2 opacity-70",
                        isCurrent && "border-primary/50 bg-warm",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold",
                          completed
                            ? "bg-secondary-light text-secondary-dark"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : canOpen
                                ? "bg-surface-2 text-text-secondary"
                                : "bg-surface-2 text-text-muted",
                        )}
                      >
                        {completed ? <Check size={16} aria-hidden /> : !canOpen ? <Lock size={14} aria-hidden /> : day.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">Dia {day.id} — {day.title}</p>
                        <p className="truncate text-xs text-text-secondary">
                          {completed ? "Concluído" : canOpen ? `${done} de ${total} passos` : "Se abre no seu tempo"}
                        </p>
                      </div>
                      <span className="text-[11px] uppercase tracking-wide text-text-muted">{day.totalMin} min</span>
                    </div>
                  </MaybeLink>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </AppShell>
  );
}

function MaybeLink({ dayId, enabled, children }: { dayId: number; enabled: boolean; children: React.ReactNode }) {
  if (!enabled) return <div>{children}</div>;
  return (
    <Link to="/jornada/$dia" params={{ dia: String(dayId) }}>
      {children}
    </Link>
  );
}
