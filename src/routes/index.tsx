import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Heart, Ruler } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TopUserBar } from "@/components/top-user-bar";
import { USER, DAYS, WEEK_LABEL } from "@/lib/mock-data";
import { useAppState, activeDay, dayProgress, currentUnlockedDay } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VITTALLE — Sua jornada de bem-estar" },
      { name: "description", content: "Uma jornada guiada de 21 dias com movimento, alimentação e hábitos para mulheres 40+." },
      { property: "og:title", content: "VITTALLE — Sua jornada de bem-estar" },
      { property: "og:description", content: "Uma jornada guiada de 21 dias para mulheres 40+." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function Home() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const unlocked = currentUnlockedDay(state);
  const day = DAYS[dayId - 1];
  const { done, total, ratio } = dayProgress(state, dayId);
  const isFirstAccess = !state.onboarding.medicaoInicial;

  return (
    <AppShell>
      <div className="animate-fade-in">
        <TopUserBar greeting={`${greeting()}, ${USER.firstName}`} />

        <section className="mt-6 rounded-3xl border border-primary/20 bg-warm p-5 shadow-soft">
          <p className="text-[11px] uppercase tracking-wide text-primary-dark">
            {WEEK_LABEL[day.week]} · Hoje
          </p>
          <h2 className="mt-1 font-editorial text-2xl font-medium">
            Dia {day.id} — {day.title}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{day.focus}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary">
            <span>{day.totalMin} min</span>
            <span aria-hidden>·</span>
            <span>{done} de {total} passos hoje</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-surface">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${Math.round(ratio * 100)}%` }} />
          </div>
          <Link
            to="/jornada/$dia"
            params={{ dia: String(dayId) }}
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
          >
            {isFirstAccess ? "Começar meu Dia 1" : `Continuar meu Dia ${dayId}`} <ArrowRight size={16} aria-hidden />
          </Link>
          <p className="mt-3 text-xs text-text-secondary">
            {isFirstAccess
              ? "Sua chegada faz parte do Dia 1. Vamos preparar tudo com calma."
              : "Seu próximo passo está pronto. Continue de onde você parou."}
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold">Onde você está</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Dia {unlocked} de {USER.totalDays} liberado. Você vive um dia por vez.
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-secondary-light text-sm font-semibold text-secondary-dark">
              {Math.round((unlocked / USER.totalDays) * 100)}%
            </div>
          </div>
          <Link to="/jornada" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
            Ver a jornada completa
          </Link>
        </section>

        <section className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-text-secondary">Ações rápidas</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link to="/medidas" className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:bg-surface-2">
              <Ruler size={20} className="text-primary" aria-hidden />
              <span className="text-sm font-medium">Registrar medida</span>
            </Link>
            <Link to="/biblioteca" className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:bg-surface-2">
              <Compass size={20} className="text-primary" aria-hidden />
              <span className="text-sm font-medium">Explorar biblioteca</span>
            </Link>
            <Link to="/alimentacao" className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:bg-surface-2">
              <Heart size={20} className="text-primary" aria-hidden />
              <span className="text-sm font-medium">Alimentação de hoje</span>
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
