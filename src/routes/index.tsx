import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Heart, Leaf, Ruler, Sprout, Video } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TopUserBar } from "@/components/top-user-bar";
import { USER, DAYS, WEEK_LABEL, WEEK_HERO_IMAGE } from "@/lib/mock-data";
import { useAppState, activeDay, dayProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

// Frase de apoio exibida logo abaixo do Hero — texto simples, configurável aqui.
const SUPPORT_MESSAGE = ["Hoje não precisa ser perfeito.", "Só precisa ser feito."];

const QUICK_ACTIONS = [
  {
    to: "/alimentacao" as const,
    icon: Sprout,
    iconBg: "bg-warm text-primary",
    title: "Alimentação de hoje",
    description: "Veja seu plano alimentar",
  },
  {
    to: "/medidas" as const,
    icon: Ruler,
    iconBg: "bg-soft-green text-secondary-dark",
    title: "Registrar medida",
    description: "Acompanhe sua evolução",
  },
  {
    to: "/biblioteca" as const,
    icon: BookOpen,
    iconBg: "bg-warm text-primary",
    title: "Explorar biblioteca",
    description: "Acesse seus guias e bônus",
  },
];

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

function Home() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const day = DAYS[dayId - 1];
  const { done, total, ratio } = dayProgress(state, dayId);
  const pct = Math.round(ratio * 100);
  const journeyPct = Math.round((dayId / USER.totalDays) * 100);
  const heroImage = WEEK_HERO_IMAGE[day.week];
  const buttonLabel =
    done === 0 ? `Começar meu Dia ${dayId}` : done >= total ? `Rever meu Dia ${dayId}` : `Continuar meu Dia ${dayId}`;

  return (
    <AppShell>
      <div className="animate-fade-in">
        <TopUserBar
          message={
            <>
              Seu Dia {dayId} está pronto.
              <br />
              Vamos começar com calma.
            </>
          }
        />

        <section className="relative mt-6 overflow-hidden rounded-3xl shadow-soft">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm/92 via-warm/55 to-transparent" aria-hidden />

          <div className="relative z-10 flex min-h-[480px] flex-col justify-between p-5 sm:min-h-[420px] sm:p-6">
            <div>
              <span className="inline-flex items-center rounded-full bg-secondary-dark px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                {WEEK_LABEL[day.week]}
              </span>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary-dark">
                <Video size={14} aria-hidden /> Sua Aula do Dia
              </div>
              <h2 className="mt-2 font-editorial text-3xl font-medium leading-[1.1] text-foreground">
                Dia {day.id} — {day.title}
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-text-secondary">
                <Clock size={14} aria-hidden /> {day.totalMin} minutos
              </div>
            </div>

            <div>
              <Link
                to="/jornada/$dia"
                params={{ dia: String(dayId) }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:bg-primary-dark"
              >
                {buttonLabel} <ArrowRight size={16} aria-hidden />
              </Link>
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-text-secondary">
                <span>{done} de {total} etapas concluídas</span>
                <span>{pct}%</span>
              </div>
              <div
                className="mt-2 flex items-center gap-1.5"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progresso do Dia ${dayId}`}
              >
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-1.5 flex-1 rounded-full transition-colors", i < done ? "bg-primary" : "bg-white/55")}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Leaf size={72} className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 text-primary/10" aria-hidden />
          <div className="relative flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-warm text-primary">
              <Heart size={20} aria-hidden />
            </span>
            <p className="text-sm font-medium leading-snug text-foreground">
              {SUPPORT_MESSAGE[0]}
              <br />
              {SUPPORT_MESSAGE[1]}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-text-secondary">Sua jornada</h3>
              <p className="mt-1 font-editorial text-lg font-medium text-foreground">
                Dia {dayId} de {USER.totalDays}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Um dia de cada vez.
                <br />
                O próximo será liberado após você concluir o de hoje.
              </p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-secondary-light text-sm font-semibold text-secondary-dark">
              {journeyPct}%
            </div>
          </div>
          <Link to="/jornada" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            Ver os 21 dias <ArrowRight size={14} aria-hidden />
          </Link>
        </section>

        <section className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-text-secondary">Ações rápidas</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <span className={cn("grid h-11 w-11 place-items-center rounded-full", action.iconBg)}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{action.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{action.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-primary" aria-hidden />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
