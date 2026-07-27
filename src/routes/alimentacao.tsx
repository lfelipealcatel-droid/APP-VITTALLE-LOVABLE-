import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Apple, HelpCircle, Salad, ShoppingBasket, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { GUIDES } from "@/lib/mock-data";

export const Route = createFileRoute("/alimentacao")({
  head: () => ({
    meta: [
      { title: "Alimentação — VITTALLE" },
      { name: "description", content: "Prato de hoje, missão alimentar, SOS e Biblioteca Alimentar." },
    ],
  }),
  component: Alimentacao,
});

function Alimentacao() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/alimentacao") {
    return <Outlet />;
  }

  return (
    <AppShell title="Alimentação" subtitle="Sua Biblioteca Alimentar" back="/">
      <section className="rounded-3xl border border-primary/20 bg-warm p-5 shadow-soft">
        <p className="text-[11px] uppercase tracking-wide text-primary-dark">Prato de hoje</p>
        <h1 className="mt-1 font-editorial text-2xl">Uma escolha simples e prática</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Adicionar, não restringir. Ensinar função, não impor alimento.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/alimentacao/decisao-rapida" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
            <HelpCircle size={16} aria-hidden /> Não sei o que comer agora
          </Link>
        </div>

      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Escolha alimentar do dia</h2>
        <ul className="grid gap-2">
          <Row to="/alimentacao/sugestao-do-dia" icon={Salad} title="Sugestão do dia" description="Um prato simples, montado pelo Método Monta-Prato." />
          <Row to="/alimentacao/missao-alimentar" icon={Sparkles} title="Missão alimentar" description="Um pequeno gesto para hoje." />
          <Row to="/alimentacao/refeicoes-modelo" icon={ShoppingBasket} title="Refeições-modelo" description="Opções para café, almoço, jantar e lanches." />
        </ul>

      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Guias da Biblioteca Alimentar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.id}
              to="/guia/$id"
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
}: {
  to: "/alimentacao/sugestao-do-dia" | "/alimentacao/missao-alimentar" | "/alimentacao/refeicoes-modelo";
  icon: typeof Salad;
  title: string;
  description: string;
}) {
  return (
    <li>
      <Link to={to} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 hover:bg-surface-2">
        <Icon size={18} className="mt-0.5 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>
      </Link>
    </li>
  );
}
