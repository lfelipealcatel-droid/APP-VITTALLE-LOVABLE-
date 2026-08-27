import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DAYS, WEEK_LABEL } from "@/lib/mock-data";
import {
  useAppState,
  activeDay,
  canOpenDay,
  currentUnlockedDay,
  dayProgress,
  isDayActivityDone,
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
  const today = activeDay(state);
  // Só o próximo dia bloqueado logo após a fronteira liberada pode estar "esperando a data virar" —
  // isso só é verdade quando a aula do dia liberado mais recente já foi concluída.
  const frontierAulaDone = isDayActivityDone(state, unlocked, "sequencia");
  const weeks: (1 | 2 | 3)[] = [1, 2, 3];

  return (
    <AppShell title="Sua jornada" subtitle="21 dias em três semanas">
      <p className="mb-4 text-sm text-text-secondary">
        Seu progresso continua, mesmo quando o ritmo muda. Você vive um dia por vez — o próximo se
        abre naturalmente.
      </p>

      <section className="mb-6 rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Como funciona sua jornada
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
          Conclua a Aula do Dia para garantir seu avanço. O próximo dia é liberado no dia seguinte,
          e tudo o que você já conquistou continua disponível para rever quando quiser.
        </p>
      </section>

      {weeks.map((w) => (
        <section key={w} className="mb-8">
          <h2 className="mb-3 font-editorial text-lg text-primary-dark">{WEEK_LABEL[w]}</h2>
          <ul className="grid gap-2">
            {DAYS.filter((d) => d.week === w).map((day) => {
              const canOpen = canOpenDay(state, day.id);
              const aulaDone = isDayActivityDone(state, day.id, "sequencia");
              const { done, total } = dayProgress(state, day.id);
              const isCurrent = day.id === today;
              const availableTomorrow = !canOpen && !state.demoMode && day.id === unlocked + 1 && frontierAulaDone;
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
                          aulaDone
                            ? "bg-secondary-light text-secondary-dark"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : canOpen
                                ? "bg-surface-2 text-text-secondary"
                                : "bg-surface-2 text-text-muted",
                        )}
                      >
                        {aulaDone ? <Check size={16} aria-hidden /> : !canOpen ? <Lock size={14} aria-hidden /> : day.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">Dia {day.id} — {day.title}</p>
                        <p className="truncate text-xs text-text-secondary">
                          {aulaDone
                            ? "Concluído"
                            : canOpen
                              ? `${done} de ${total} passos`
                              : availableTomorrow
                                ? "Disponível amanhã"
                                : "Se abre no seu tempo"}
                        </p>
                      </div>
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
