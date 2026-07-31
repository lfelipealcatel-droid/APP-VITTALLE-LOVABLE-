import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Coffee, Cookie, Salad, Soup, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const FILTERS = ["rapidas", "completas", "poucos-ingredientes", "leves", "vegetais"] as const;
type FilterKey = (typeof FILTERS)[number];

const FILTER_LABELS: Record<FilterKey, string> = {
  rapidas: "Opções rápidas",
  completas: "Refeições mais completas",
  "poucos-ingredientes": "Opções com poucos ingredientes",
  leves: "Opções mais leves",
  vegetais: "Refeições com vegetais",
};

const searchSchema = z.object({
  filtro: z.enum(FILTERS).optional().catch(undefined),
});

export const Route = createFileRoute("/alimentacao/refeicoes-modelo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Refeições-modelo — VITTALLE" },
      { name: "description", content: "Opções organizadas para café da manhã, almoço, lanches e jantar." },
    ],
  }),
  component: RefeicoesPage,
});

interface Meal {
  id: string;
  category: string;
  name: string;
  tags: FilterKey[];
  ingredients: string;
  method: string;
  swaps: string;
  time: string;
}

const MEALS: Meal[] = [
  {
    id: "cafe-ovos-fruta-cafe",
    category: "Café da manhã",
    name: "Ovos, fruta e café",
    tags: ["rapidas"],
    ingredients: "Ovos, uma fruta da estação, café ou chá.",
    method: "Cozinhe ou frite os ovos do jeito que preferir e sirva com a fruta ao lado.",
    swaps: "Troque os ovos por queijo branco ou iogurte, se preferir.",
    time: "5 a 10 minutos",
  },
  {
    id: "cafe-iogurte-fruta-aveia",
    category: "Café da manhã",
    name: "Iogurte com fruta e aveia",
    tags: ["rapidas", "leves"],
    ingredients: "Iogurte natural, uma fruta picada, uma colher de aveia.",
    method: "Misture o iogurte com a fruta picada e finalize com a aveia por cima.",
    swaps: "Troque a aveia por granola ou castanhas picadas.",
    time: "5 minutos",
  },
  {
    id: "cafe-pao-ovo",
    category: "Café da manhã",
    name: "Pão com ovo",
    tags: ["rapidas", "poucos-ingredientes"],
    ingredients: "Pão, ovo, um fio de azeite ou manteiga.",
    method: "Frite ou cozinhe o ovo e sirva entre as fatias de pão.",
    swaps: "Troque o pão por tapioca ou torrada integral.",
    time: "5 a 10 minutos",
  },
  {
    id: "almoco-arroz-feijao-proteina-vegetais",
    category: "Almoço",
    name: "Prato com arroz, feijão, proteína e vegetais",
    tags: ["completas", "vegetais"],
    ingredients: "Arroz, feijão, uma proteína (carne, frango, ovo ou tofu), vegetais à sua escolha.",
    method: "Monte o prato dividindo o espaço entre arroz e feijão, a proteína e os vegetais.",
    swaps: "Troque o arroz por batata, mandioca ou quinoa.",
    time: "20 a 30 minutos",
  },
  {
    id: "almoco-frango-legumes-carboidrato",
    category: "Almoço",
    name: "Frango, legumes e uma fonte de carboidrato",
    tags: ["completas", "vegetais"],
    ingredients: "Frango grelhado ou assado, legumes variados, arroz ou batata.",
    method: "Prepare o frango e os legumes separadamente e sirva com o carboidrato escolhido.",
    swaps: "Troque o frango por peixe ou carne magra.",
    time: "20 a 30 minutos",
  },
  {
    id: "almoco-omelete-completa",
    category: "Almoço",
    name: "Omelete completa com acompanhamento",
    tags: ["completas"],
    ingredients: "Ovos, um recheio à sua escolha (queijo, legumes ou frango desfiado), acompanhamento simples.",
    method: "Bata os ovos, adicione o recheio e cozinhe em fogo baixo até firmar.",
    swaps: "Troque o recheio conforme o que houver em casa.",
    time: "15 minutos",
  },
  {
    id: "lanche-iogurte-fruta",
    category: "Lanches",
    name: "Iogurte com fruta",
    tags: ["rapidas", "poucos-ingredientes"],
    ingredients: "Iogurte natural, uma fruta.",
    method: "Corte a fruta e misture com o iogurte.",
    swaps: "Troque a fruta conforme a estação.",
    time: "5 minutos",
  },
  {
    id: "lanche-pao-queijo",
    category: "Lanches",
    name: "Pão com queijo",
    tags: ["rapidas", "poucos-ingredientes"],
    ingredients: "Pão, queijo.",
    method: "Monte o sanduíche simples, quente ou frio.",
    swaps: "Troque o queijo por outra proteína disponível.",
    time: "5 minutos",
  },
  {
    id: "lanche-fruta-aveia-castanhas",
    category: "Lanches",
    name: "Fruta com aveia ou castanhas",
    tags: ["poucos-ingredientes"],
    ingredients: "Uma fruta, aveia ou castanhas.",
    method: "Corte a fruta e finalize com a aveia ou as castanhas por cima.",
    swaps: "Troque as castanhas por sementes, se preferir.",
    time: "5 minutos",
  },
  {
    id: "jantar-sopa-completa",
    category: "Jantar",
    name: "Sopa completa",
    tags: ["leves"],
    ingredients: "Legumes variados, uma proteína leve, caldo ou água.",
    method: "Cozinhe os legumes e a proteína juntos até ficarem macios.",
    swaps: "Troque os legumes conforme o que houver disponível.",
    time: "25 a 35 minutos",
  },
  {
    id: "jantar-omelete-vegetais",
    category: "Jantar",
    name: "Omelete com vegetais",
    tags: ["leves", "vegetais"],
    ingredients: "Ovos, vegetais picados à sua escolha.",
    method: "Bata os ovos, misture os vegetais picados e cozinhe em fogo baixo.",
    swaps: "Troque os vegetais conforme a estação.",
    time: "15 minutos",
  },
  {
    id: "jantar-proteina-legumes",
    category: "Jantar",
    name: "Prato simples com proteína e legumes",
    tags: ["completas", "vegetais"],
    ingredients: "Uma proteína, legumes variados.",
    method: "Prepare a proteína e os legumes separadamente e sirva juntos.",
    swaps: "Troque a proteína conforme o que houver disponível.",
    time: "20 minutos",
  },
];

const CATEGORIES = [
  { title: "Café da manhã", icon: Coffee },
  { title: "Almoço", icon: Salad },
  { title: "Lanches", icon: Cookie },
  { title: "Jantar", icon: Soup },
];

function RefeicoesPage() {
  const { filtro: filtroRaw } = Route.useSearch();
  const filtro = filtroRaw as FilterKey | undefined;
  const [openMeal, setOpenMeal] = useState<Meal | null>(null);

  return (
    <AppShell title="Refeições-modelo" subtitle="Referências práticas" back="/alimentacao">
      {filtro ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-editorial text-xl">{FILTER_LABELS[filtro]}</h1>
            <Link
              to="/alimentacao/refeicoes-modelo"
              search={{}}
              className="shrink-0 text-xs font-semibold text-primary hover:underline"
            >
              Ver todas as refeições
            </Link>
          </div>
          <p className="mt-1 text-sm text-text-secondary">Use como referência, sem obrigação.</p>
          <ul className="mt-4 grid gap-2">
            {MEALS.filter((m) => m.tags.includes(filtro)).map((m) => (
              <MealRow key={m.id} meal={m} onOpen={setOpenMeal} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-sm text-text-secondary">
            Ideias práticas para café da manhã, almoço, lanches e jantar. Use como referência, sem obrigação.
          </p>
          <div className="mt-4 grid gap-4">
            {CATEGORIES.map((cat) => (
              <section key={cat.title} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2">
                  <cat.icon size={18} className="text-primary" aria-hidden />
                  <h2 className="text-sm font-semibold">{cat.title}</h2>
                </div>
                <ul className="mt-3 grid gap-2">
                  {MEALS.filter((m) => m.category === cat.title).map((m) => (
                    <MealRow key={m.id} meal={m} onOpen={setOpenMeal} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}

      <Link to="/alimentacao" className="mt-4 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>

      <Drawer open={!!openMeal} onOpenChange={(open) => { if (!open) setOpenMeal(null); }}>
        <DrawerContent>
          {openMeal ? (
            <>
              <DrawerHeader>
                <DrawerTitle>{openMeal.name}</DrawerTitle>
                <DrawerDescription>{openMeal.category}</DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 px-4 pb-6 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Ingredientes</p>
                  <p className="mt-1 text-text-secondary">{openMeal.ingredients}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Modo simples de montar</p>
                  <p className="mt-1 text-text-secondary">{openMeal.method}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Trocas possíveis</p>
                  <p className="mt-1 text-text-secondary">{openMeal.swaps}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Tempo aproximado</p>
                  <p className="mt-1 text-text-secondary">{openMeal.time}</p>
                </div>
                <DrawerClose asChild>
                  <button
                    type="button"
                    className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-2"
                  >
                    <X size={16} aria-hidden /> Fechar
                  </button>
                </DrawerClose>
              </div>
            </>
          ) : null}
        </DrawerContent>
      </Drawer>
    </AppShell>
  );
}

function MealRow({ meal, onOpen }: { meal: Meal; onOpen: (m: Meal) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(meal)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 p-3 text-left text-sm text-text-secondary hover:bg-surface"
      >
        {meal.name}
        <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden />
      </button>
    </li>
  );
}
