import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/alimentacao/decisao-rapida")({
  head: () => ({
    meta: [
      { title: "Me ajude a escolher — VITTALLE" },
      { name: "description", content: "Uma decisão simples para o momento em que você está." },
    ],
  }),
  component: DecisaoRapida,
});

type FiltroKey = "rapidas" | "completas" | "poucos-ingredientes" | "leves" | "vegetais";

interface Situation {
  title: string;
  guidance: string;
  suggestions: string[];
  action: { label: string; filtro: FiltroKey } | null;
  teaser?: string;
}

const SITUATIONS: Situation[] = [
  {
    title: "Tenho apenas 5 minutos",
    guidance: "Escolha uma combinação simples com uma fonte de proteína e algo que forneça energia.",
    suggestions: ["Iogurte com fruta e aveia", "Pão com ovo ou queijo", "Shake de banana com leite ou whey"],
    action: { label: "Ver opções rápidas", filtro: "rapidas" },
  },
  {
    title: "Estou com muita fome",
    guidance: "Procure montar uma refeição mais completa para não continuar beliscando pouco tempo depois.",
    suggestions: ["Arroz, feijão, proteína e vegetais", "Omelete completa com acompanhamento", "Frango, legumes e uma fonte de carboidrato"],
    action: { label: "Ver refeições mais completas", filtro: "completas" },
  },
  {
    title: "Quero comer algo doce",
    guidance: "Você não precisa ignorar a vontade. Escolha uma opção simples e possível, sem transformar o momento em culpa.",
    suggestions: ["Banana com canela", "Iogurte com cacau", "Uma fruta da sua preferência", "Shake doce de banana com leite ou whey", "Iogurte com morangos"],
    action: null,
    teaser: "Quer mais opções? Conheça o Guia de Doces Inteligentes.",
  },
  {
    title: "Tenho poucos ingredientes em casa",
    guidance: "Não espere uma refeição perfeita. Combine dois ou três alimentos disponíveis e faça uma escolha possível.",
    suggestions: ["Pão com ovo", "Arroz, ovo e algum vegetal", "Fruta com iogurte ou leite"],
    action: { label: "Ver opções com poucos ingredientes", filtro: "poucos-ingredientes" },
  },
  {
    title: "Quero algo mais leve",
    guidance: "Escolha algo simples, mas que ainda ofereça saciedade.",
    suggestions: ["Sopa nutritiva", "Omelete simples", "Salada completa", "Frango com legumes", "Peixe com vegetais"],
    action: { label: "Ver opções mais leves", filtro: "leves" },
  },
];

function DecisaoRapida() {
  return (
    <AppShell title="Me ajude a escolher" subtitle="Uma decisão simples para o momento em que você está." back="/alimentacao">
      <p className="text-sm text-text-secondary">
        Escolha o que mais combina com sua situação agora. Você receberá algumas opções práticas para consultar nas Refeições-modelo.
      </p>

      <Accordion type="single" collapsible className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface">
        {SITUATIONS.map((s, i) => (
          <AccordionItem key={s.title} value={`situacao-${i}`} className="border-b border-border px-4 last:border-0">
            <AccordionTrigger className="text-sm font-medium">{s.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-text-secondary">{s.guidance}</p>
              <ul className="mt-3 grid gap-2">
                {s.suggestions.map((sug) => (
                  <li key={sug} className="rounded-xl border border-border bg-surface-2 p-3 text-sm text-text-secondary">
                    {sug}
                  </li>
                ))}
              </ul>
              {s.action ? (
                <Link
                  to="/alimentacao/refeicoes-modelo"
                  search={{ filtro: s.action.filtro }}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground"
                >
                  {s.action.label} <ArrowRight size={14} aria-hidden />
                </Link>
              ) : (
                <Link to="/alimentacao" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
                  Voltar para Alimentação
                </Link>
              )}
              {s.teaser ? <p className="mt-3 text-xs text-text-muted">{s.teaser}</p> : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Link
        to="/alimentacao"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-text-secondary hover:bg-surface-2"
      >
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
