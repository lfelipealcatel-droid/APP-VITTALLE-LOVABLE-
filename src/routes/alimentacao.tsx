import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Apple, Droplets, HelpCircle, Salad, ShoppingBasket, Sparkles } from "lucide-react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { GUIDES } from "@/lib/mock-data";
import { activeDay, useAppState } from "@/lib/store";

// Dia de origem explícito (veio do card "Alimentação do dia" em /jornada/$dia). Sem ele — acesso
// direto a /alimentacao, ou valor inválido/fora de 1–21 — cai de volta no dia ativo. O mesmo `dia`
// é repassado para Missão alimentar e Sugestão do dia, que dependem dele para escolher o conteúdo certo.
const searchSchema = z.object({
  dia: z.coerce.number().int().min(1).max(21).optional().catch(undefined),
});

export const Route = createFileRoute("/alimentacao")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Alimentação — VITTALLE" },
      { name: "description", content: "Missão alimentar, sugestão do dia, refeições-modelo e Biblioteca Alimentar." },
    ],
  }),
  component: Alimentacao,
});

function Alimentacao() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { dia } = Route.useSearch();
  const [state] = useAppState();
  const dayId = dia ?? activeDay(state);

  if (pathname !== "/alimentacao") {
    return <Outlet />;
  }

  return (
    <AppShell title="Alimentação" subtitle="Sua Biblioteca Alimentar" back="/">
      <section className="rounded-3xl border border-primary/20 bg-warm p-5 shadow-soft">
        <h1 className="font-editorial text-2xl">Me ajude a escolher</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Encontre uma opção possível para o momento em que você está.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/alimentacao/decisao-rapida"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <HelpCircle size={16} aria-hidden /> Escolher uma opção
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Faça hoje</h2>
        <ul className="grid gap-2">
          <Row
            to="/alimentacao/missao-alimentar"
            icon={Sparkles}
            title="Missão alimentar"
            description="Uma ação simples para colocar em prática hoje."
            search={{ dia: dayId }}
          />
          <Row
            to="/alimentacao/sugestao-do-dia"
            icon={Salad}
            title="Sugestão do dia"
            description="Ideias práticas para facilitar a missão de hoje."
            search={{ dia: dayId }}
          />
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Para consultar quando precisar</h2>
        <ul className="grid gap-2">
          <Row
            to="/alimentacao/refeicoes-modelo"
            icon={ShoppingBasket}
            title="Refeições Inteligentes"
            description="Sugestões simples para montar refeições equilibradas no café da manhã, almoço, lanche e jantar."
          />
          <Row
            to="/alimentacao/bebidas-funcionais"
            icon={Droplets}
            title="Chás, Shakes e Shots Funcionais"
            description="Receitas rápidas para apoiar hidratação, saciedade, energia e escolhas mais equilibradas."
          />
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Guias da Biblioteca Alimentar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.id}
              to={g.pdf ? "/guia/$id/pdf" : "/guia/$id"}
              params={{ id: g.id }}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 hover:bg-surface-2"
            >
              <Apple size={18} className="mt-0.5 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-medium">{g.title}</p>
                <p className="text-xs text-text-secondary">{g.subtitle}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{g.cta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-6 text-xs text-text-muted">
        Nenhum alimento é obrigatório. Sem contagem de calorias. Sem punição.
      </p>
    </AppShell>
  );
}

function Row({
  to,
  icon: Icon,
  title,
  description,
  search,
}: {
  to:
    | "/alimentacao/sugestao-do-dia"
    | "/alimentacao/missao-alimentar"
    | "/alimentacao/refeicoes-modelo"
    | "/alimentacao/bebidas-funcionais";
  icon: typeof Salad;
  title: string;
  description: string;
  // Repassa o dia de origem (ver searchSchema acima) só nos links que dependem dele
  // (Missão alimentar, Sugestão do dia). Refeições Inteligentes e Bebidas Funcionais não precisam.
  search?: Record<string, unknown>;
}) {
  return (
    <li>
      <Link
        to={to}
        search={search}
        className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 hover:bg-surface-2"
      >
        <Icon size={18} className="mt-0.5 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>
      </Link>
    </li>
  );
}
