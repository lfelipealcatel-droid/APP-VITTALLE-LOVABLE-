import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Cookie, Salad, Soup } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/alimentacao/refeicoes-modelo")({
  head: () => ({
    meta: [
      { title: "Refeições-modelo — VITTALLE" },
      { name: "description", content: "Opções organizadas para café, almoço, jantar e lanches." },
    ],
  }),
  component: RefeicoesPage,
});

const SECTIONS = [
  { icon: Coffee, title: "Café da manhã", items: ["Opção prática 1", "Opção prática 2", "Opção prática 3"] },
  { icon: Salad, title: "Almoço", items: ["Prato-modelo 1", "Prato-modelo 2", "Prato-modelo 3"] },
  { icon: Soup, title: "Jantar", items: ["Jantar leve 1", "Jantar leve 2", "Jantar leve 3"] },
  { icon: Cookie, title: "Lanches", items: ["Lanche 1", "Lanche 2", "Lanche 3"] },
];

function RefeicoesPage() {
  return (
    <AppShell title="Refeições-modelo" subtitle="Referências práticas" back="/alimentacao">
      <div className="grid gap-4">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <s.icon size={18} className="text-primary" aria-hidden />
              <h2 className="text-sm font-semibold">{s.title}</h2>
            </div>
            <ul className="mt-3 grid gap-2">
              {s.items.map((it) => (
                <li key={it} className="rounded-xl border border-border bg-surface-2 p-3 text-sm text-text-secondary">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-xs text-text-muted">
        As opções definitivas serão inseridas em uma etapa posterior.
      </p>
      <Link to="/alimentacao" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
