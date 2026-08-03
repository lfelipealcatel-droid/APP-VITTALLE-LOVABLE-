import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Milk, Zap } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { FoodItemDrawer, FoodItemRow, type FoodItem } from "@/components/food-item";

export const Route = createFileRoute("/alimentacao/bebidas-funcionais")({
  head: () => ({
    meta: [
      { title: "Chás, Shakes e Shots Funcionais — VITTALLE" },
      { name: "description", content: "Receitas rápidas para apoiar hidratação, saciedade, energia e escolhas mais equilibradas." },
    ],
  }),
  component: BebidasPage,
});

const DRINKS: FoodItem[] = [
  {
    id: "cha-gengibre-limao",
    category: "Chás",
    name: "Chá de gengibre e limão",
    cover: "warm",
    ingredients: "Gengibre fresco fatiado, suco de meio limão, água quente.",
    method: "Ferva a água com o gengibre por alguns minutos, desligue, adicione o limão e sirva morno.",
    swaps: "Troque o gengibre fresco por gengibre em pó, se preferir.",
    bestMoment: "Pela manhã ou entre as refeições.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "cha-verde",
    category: "Chás",
    name: "Chá verde",
    cover: "green",
    ingredients: "Folhas de chá verde ou sachê, água quente.",
    method: "Deixe as folhas em infusão por 3 a 5 minutos e coe antes de servir.",
    swaps: "Troque por chá branco, se preferir uma versão mais suave.",
    bestMoment: "Pela manhã ou início da tarde.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "cha-hortela",
    category: "Chás",
    name: "Chá de hortelã",
    cover: "warm",
    ingredients: "Folhas de hortelã fresca, água quente.",
    method: "Deixe as folhas em infusão por alguns minutos e sirva.",
    swaps: "Troque por erva-cidreira, se preferir um efeito mais calmante.",
    bestMoment: "Após as refeições ou à noite.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shake-banana-aveia",
    category: "Shakes",
    name: "Shake de banana com aveia",
    cover: "green",
    ingredients: "Banana, aveia, leite ou bebida vegetal.",
    method: "Bata todos os ingredientes no liquidificador até ficar homogêneo.",
    swaps: "Troque a banana por manga ou mamão.",
    bestMoment: "No café da manhã ou como lanche.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shake-verde-abacaxi",
    category: "Shakes",
    name: "Shake verde com abacaxi",
    cover: "warm",
    ingredients: "Abacaxi, folhas verdes (couve ou espinafre), água ou água de coco.",
    method: "Bata todos os ingredientes no liquidificador e sirva na sequência.",
    swaps: "Troque o abacaxi por maçã, se preferir um sabor mais suave.",
    bestMoment: "Pela manhã ou antes do almoço.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shake-morango-iogurte",
    category: "Shakes",
    name: "Shake de morango com iogurte",
    cover: "green",
    ingredients: "Morangos, iogurte natural, gelo (opcional).",
    method: "Bata os morangos com o iogurte até ficar cremoso.",
    swaps: "Troque os morangos por outras frutas vermelhas.",
    bestMoment: "Como lanche da tarde.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shot-limao-hortela",
    category: "Shots Funcionais",
    name: "Shot de limão com hortelã",
    cover: "warm",
    ingredients: "Suco de limão, folhas de hortelã, um pouco de água.",
    method: "Bata ou misture bem os ingredientes e sirva em um copo pequeno, bem gelado.",
    swaps: "Troque a hortelã por gengibre ralado.",
    bestMoment: "Ao acordar ou antes das refeições.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shot-pepino-limao",
    category: "Shots Funcionais",
    name: "Shot de pepino com limão",
    cover: "green",
    ingredients: "Pepino batido e coado, suco de limão.",
    method: "Bata o pepino com um pouco de água, coe, misture o limão e sirva em um copo pequeno.",
    swaps: "Troque o pepino por aipo, se preferir.",
    bestMoment: "Nos dias mais quentes, ao longo do dia.",
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "shot-frutas-vermelhas",
    category: "Shots Funcionais",
    name: "Shot de frutas vermelhas",
    cover: "warm",
    ingredients: "Frutas vermelhas amassadas, um pouco de água ou água de coco.",
    method: "Amasse ou bata as frutas, coe se preferir, e sirva em um copo pequeno bem gelado.",
    swaps: "Troque as frutas vermelhas por frutas da estação.",
    bestMoment: "Ao longo do dia.",
    whyPoints: [],
    practicalNote: "",
  },
];

const CATEGORIES = [
  { title: "Chás", icon: Leaf },
  { title: "Shakes", icon: Milk },
  { title: "Shots Funcionais", icon: Zap },
];

function BebidasPage() {
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);

  return (
    <AppShell title="Chás, Shakes e Shots Funcionais" subtitle="Referências práticas" back="/alimentacao">
      <p className="text-sm text-text-secondary">
        Receitas rápidas para apoiar hidratação, saciedade, energia e escolhas mais equilibradas. Use como referência, sem
        obrigação.
      </p>

      <div className="mt-4 grid gap-4">
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <cat.icon size={18} className="text-primary" aria-hidden />
              <h2 className="text-sm font-semibold">{cat.title}</h2>
            </div>
            <ul className="mt-3 grid gap-2">
              {DRINKS.filter((d) => d.category === cat.title).map((d) => (
                <FoodItemRow key={d.id} item={d} onOpen={setOpenItem} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link to="/alimentacao" className="mt-4 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>

      <FoodItemDrawer item={openItem} onOpenChange={(open) => { if (!open) setOpenItem(null); }} />
    </AppShell>
  );
}
