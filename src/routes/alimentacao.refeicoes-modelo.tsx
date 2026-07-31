import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Coffee, Cookie, Salad, Soup } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/alimentacao/refeicoes-modelo")({
  head: () => ({
    meta: [
      { title: "Refeições-modelo — VITTALLE" },
      { name: "description", content: "Opções organizadas para café da manhã, almoço, lanches e jantar." },
    ],
  }),
  component: RefeicoesPage,
});

const SECTIONS = [
  {
    icon: Coffee,
    title: "Café da manhã",
    items: ["Ovos, fruta e café", "Iogurte com fruta e aveia", "Pão com ovo"],
  },
  {
    icon: Salad,
    title: "Almoço",
    items: [
      "Prato com arroz, feijão, proteína e vegetais",
      "Frango, legumes e uma fonte de carboidrato",
      "Omelete completa com acompanhamento",
    ],
  },
  {
    icon: Cookie,
    title: "Lanches",
    items: ["Iogurte com fruta", "Pão com queijo", "Fruta com aveia ou castanhas"],
  },
  {
    icon: Soup,
    title: "Jantar",
    items: ["Sopa completa", "Omelete com vegetais", "Prato simples com proteína e legumes"],
  },
];

function RefeicoesPage() {
  return (
    <AppShell title="Refeições-modelo" subtitle="Referências práticas" back="/alimentacao">
      <p className="text-sm text-text-secondary">
        Ideias práticas para café da manhã, almoço, lanches e jantar. Use como referência, sem obrigação.
      </p>
      <div className="mt-4 grid gap-4">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <s.icon size={18} className="text-primary" aria-hidden />
              <h2 className="text-sm font-semibold">{s.title}</h2>
            </div>
            <ul className="mt-3 grid gap-2">
              {s.items.map((it) => (
                <li key={it}>
                  <button
                    type="button"
                    onClick={() => toast.success("Detalhes desta opção em breve.")}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 p-3 text-left text-sm text-text-secondary hover:bg-surface"
                  >
                    {it}
                    <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link to="/alimentacao" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
