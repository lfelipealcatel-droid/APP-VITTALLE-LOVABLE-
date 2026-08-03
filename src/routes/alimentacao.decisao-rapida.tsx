import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
  recipesButtonLabel?: string;
}

const SWEET_RECIPES = [
  {
    title: "Banana com canela",
    ingredients: ["Banana", "Canela", "Cacau opcional"],
    preparo: "Aqueça ou amasse a banana, finalize com canela e, se desejar, um pouco de cacau.",
  },
  {
    title: "Iogurte com cacau",
    ingredients: ["Iogurte natural", "Cacau em pó", "Fruta opcional"],
    preparo: "Misture o cacau ao iogurte e acrescente uma fruta, se desejar.",
  },
  {
    title: "Shake doce de banana",
    ingredients: ["Banana", "Leite, iogurte ou bebida habitual", "Canela ou cacau"],
    preparo: "Bata os ingredientes até ficar cremoso.",
  },
];

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
    suggestions: ["Banana com canela", "Iogurte com cacau", "Shake doce de banana"],
    action: null,
    teaser: "Quer mais opções? Conheça o Guia de Doces Inteligentes.",
    recipesButtonLabel: "Ver como preparar",
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
    suggestions: ["Sopa completa", "Omelete com vegetais", "Prato leve com proteína e legumes"],
    action: { label: "Ver opções mais leves", filtro: "leves" },
  },
];

function DecisaoRapida() {
  const [recipesOpen, setRecipesOpen] = useState(false);

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
              ) : s.recipesButtonLabel ? (
                <button
                  type="button"
                  onClick={() => setRecipesOpen(true)}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground"
                >
                  {s.recipesButtonLabel} <ArrowRight size={14} aria-hidden />
                </button>
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

      <Drawer open={recipesOpen} onOpenChange={setRecipesOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Como preparar</DrawerTitle>
            <DrawerDescription>Três opções simples para quando bater vontade de doce.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 px-4 pb-6 text-sm">
            {SWEET_RECIPES.map((r) => (
              <div key={r.title} className="rounded-xl border border-border bg-surface-2 p-3">
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Ingredientes</p>
                <ul className="mt-1 grid list-disc gap-0.5 pl-4 text-text-secondary">
                  {r.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Preparo</p>
                <p className="mt-1 text-text-secondary">{r.preparo}</p>
              </div>
            ))}
            <DrawerClose asChild>
              <button
                type="button"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-2"
              >
                <X size={16} aria-hidden /> Fechar
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </AppShell>
  );
}
