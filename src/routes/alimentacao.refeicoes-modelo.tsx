import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Coffee, Cookie, Droplets, Leaf, Milk, Salad, Soup, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
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
      { name: "description", content: "Opções organizadas para café da manhã, almoço, lanches, jantar e bebidas inteligentes." },
    ],
  }),
  component: RefeicoesPage,
});

interface FoodItem {
  id: string;
  category: string;
  name: string;
  tags: FilterKey[];
  cover: "warm" | "green";
  ingredients: string;
  method: string;
  swaps: string;
  time?: string;
  bestMoment?: string;
  benefits: string[];
}

const MEALS: FoodItem[] = [
  {
    id: "cafe-ovos-fruta-cafe",
    category: "Café da manhã",
    name: "Ovos, fruta e café",
    tags: ["rapidas"],
    cover: "warm",
    ingredients: "Ovos, uma fruta da estação, café ou chá.",
    method: "Cozinhe ou frite os ovos do jeito que preferir e sirva com a fruta ao lado.",
    swaps: "Troque os ovos por queijo branco ou iogurte, se preferir.",
    time: "5 a 10 minutos",
    benefits: [
      "Rica em proteínas",
      "Favorece energia mais estável pela manhã",
      "É uma boa escolha para começar o dia com praticidade",
      "Ajuda a reduzir a vontade de beliscar antes do almoço",
    ],
  },
  {
    id: "cafe-iogurte-fruta-aveia",
    category: "Café da manhã",
    name: "Iogurte com fruta e aveia",
    tags: ["rapidas", "leves"],
    cover: "green",
    ingredients: "Iogurte natural, uma fruta picada, uma colher de aveia.",
    method: "Misture o iogurte com a fruta picada e finalize com a aveia por cima.",
    swaps: "Troque a aveia por granola ou castanhas picadas.",
    time: "5 minutos",
    benefits: [
      "Rica em fibras",
      "Favorece maior saciedade",
      "Ajuda a aumentar o consumo de frutas no dia a dia",
      "É uma boa escolha para um café da manhã leve",
    ],
  },
  {
    id: "cafe-pao-ovo",
    category: "Café da manhã",
    name: "Pão com ovo",
    tags: ["rapidas", "poucos-ingredientes"],
    cover: "warm",
    ingredients: "Pão, ovo, um fio de azeite ou manteiga.",
    method: "Frite ou cozinhe o ovo e sirva entre as fatias de pão.",
    swaps: "Troque o pão por tapioca ou torrada integral.",
    time: "5 a 10 minutos",
    benefits: [
      "Rica em proteínas",
      "É uma boa escolha para um café da manhã rápido",
      "Favorece energia mais estável pela manhã",
    ],
  },
  {
    id: "almoco-arroz-feijao-proteina-vegetais",
    category: "Almoço",
    name: "Prato com arroz, feijão, proteína e vegetais",
    tags: ["completas", "vegetais"],
    cover: "green",
    ingredients: "Arroz, feijão, uma proteína (carne, frango, ovo ou tofu), vegetais à sua escolha.",
    method: "Monte o prato dividindo o espaço entre arroz e feijão, a proteína e os vegetais.",
    swaps: "Troque o arroz por batata, mandioca ou quinoa.",
    time: "20 a 30 minutos",
    benefits: [
      "Rica em proteínas",
      "Ajuda a aumentar o consumo de vegetais",
      "Favorece maior saciedade",
      "É uma boa escolha para o almoço principal do dia",
      "Reduz a dependência de ultraprocessados",
    ],
  },
  {
    id: "almoco-frango-legumes-carboidrato",
    category: "Almoço",
    name: "Frango, legumes e uma fonte de carboidrato",
    tags: ["completas", "vegetais"],
    cover: "warm",
    ingredients: "Frango grelhado ou assado, legumes variados, arroz ou batata.",
    method: "Prepare o frango e os legumes separadamente e sirva com o carboidrato escolhido.",
    swaps: "Troque o frango por peixe ou carne magra.",
    time: "20 a 30 minutos",
    benefits: [
      "Rica em proteínas",
      "Ajuda a aumentar o consumo de vegetais",
      "Favorece energia mais estável ao longo da tarde",
      "É uma boa escolha para um almoço equilibrado",
    ],
  },
  {
    id: "almoco-omelete-completa",
    category: "Almoço",
    name: "Omelete completa com acompanhamento",
    tags: ["completas"],
    cover: "green",
    ingredients: "Ovos, um recheio à sua escolha (queijo, legumes ou frango desfiado), acompanhamento simples.",
    method: "Bata os ovos, adicione o recheio e cozinhe em fogo baixo até firmar.",
    swaps: "Troque o recheio conforme o que houver em casa.",
    time: "15 minutos",
    benefits: [
      "Rica em proteínas",
      "É uma boa escolha para variar o almoço ou o jantar",
      "Favorece maior saciedade",
      "Ajuda a aproveitar o que já existe em casa",
    ],
  },
  {
    id: "lanche-iogurte-fruta",
    category: "Lanches",
    name: "Iogurte com fruta",
    tags: ["rapidas", "poucos-ingredientes"],
    cover: "warm",
    ingredients: "Iogurte natural, uma fruta.",
    method: "Corte a fruta e misture com o iogurte.",
    swaps: "Troque a fruta conforme a estação.",
    time: "5 minutos",
    benefits: [
      "Rica em proteínas",
      "É uma boa escolha para um lanche rápido",
      "Ajuda a reduzir a vontade de beliscar",
    ],
  },
  {
    id: "lanche-pao-queijo",
    category: "Lanches",
    name: "Pão com queijo",
    tags: ["rapidas", "poucos-ingredientes"],
    cover: "green",
    ingredients: "Pão, queijo.",
    method: "Monte o sanduíche simples, quente ou frio.",
    swaps: "Troque o queijo por outra proteína disponível.",
    time: "5 minutos",
    benefits: [
      "Rica em proteínas",
      "É uma boa escolha para um lanche prático",
      "Favorece energia mais estável entre as refeições",
    ],
  },
  {
    id: "lanche-fruta-aveia-castanhas",
    category: "Lanches",
    name: "Fruta com aveia ou castanhas",
    tags: ["poucos-ingredientes"],
    cover: "warm",
    ingredients: "Uma fruta, aveia ou castanhas.",
    method: "Corte a fruta e finalize com a aveia ou as castanhas por cima.",
    swaps: "Troque as castanhas por sementes, se preferir.",
    time: "5 minutos",
    benefits: [
      "Rica em fibras",
      "Favorece maior saciedade",
      "É uma boa escolha para um lanche nutritivo",
      "Ajuda a aumentar o consumo de frutas no dia a dia",
    ],
  },
  {
    id: "jantar-sopa-completa",
    category: "Jantar",
    name: "Sopa completa",
    tags: ["leves"],
    cover: "green",
    ingredients: "Legumes variados, uma proteína leve, caldo ou água.",
    method: "Cozinhe os legumes e a proteína juntos até ficarem macios.",
    swaps: "Troque os legumes conforme o que houver disponível.",
    time: "25 a 35 minutos",
    benefits: [
      "Ajuda na hidratação",
      "Ajuda a aumentar o consumo de vegetais",
      "É uma boa escolha para um jantar leve",
      "Favorece maior saciedade sem pesar",
    ],
  },
  {
    id: "jantar-omelete-vegetais",
    category: "Jantar",
    name: "Omelete com vegetais",
    tags: ["leves", "vegetais"],
    cover: "warm",
    ingredients: "Ovos, vegetais picados à sua escolha.",
    method: "Bata os ovos, misture os vegetais picados e cozinhe em fogo baixo.",
    swaps: "Troque os vegetais conforme a estação.",
    time: "15 minutos",
    benefits: [
      "Rica em proteínas",
      "Ajuda a aumentar o consumo de vegetais",
      "É uma boa escolha para um jantar prático",
      "Favorece uma alimentação com perfil anti-inflamatório",
    ],
  },
  {
    id: "jantar-proteina-legumes",
    category: "Jantar",
    name: "Prato simples com proteína e legumes",
    tags: ["completas", "vegetais"],
    cover: "green",
    ingredients: "Uma proteína, legumes variados.",
    method: "Prepare a proteína e os legumes separadamente e sirva juntos.",
    swaps: "Troque a proteína conforme o que houver disponível.",
    time: "20 minutos",
    benefits: [
      "Rica em proteínas",
      "Ajuda a aumentar o consumo de vegetais",
      "É uma boa escolha para fechar o dia com equilíbrio",
      "Favorece maior saciedade",
    ],
  },
];

const DRINKS: FoodItem[] = [
  {
    id: "cha-gengibre-limao",
    category: "Chás",
    name: "Chá de gengibre e limão",
    tags: [],
    cover: "warm",
    ingredients: "Gengibre fresco fatiado, suco de meio limão, água quente.",
    method: "Ferva a água com o gengibre por alguns minutos, desligue, adicione o limão e sirva morno.",
    swaps: "Troque o gengibre fresco por gengibre em pó, se preferir.",
    bestMoment: "Pela manhã ou entre as refeições.",
    benefits: [
      "Ajuda na hidratação",
      "Contribui para uma pausa consciente no dia",
      "É uma boa escolha para variar além da água",
      "Favorece uma alimentação com perfil anti-inflamatório",
    ],
  },
  {
    id: "cha-verde",
    category: "Chás",
    name: "Chá verde",
    tags: [],
    cover: "green",
    ingredients: "Folhas de chá verde ou sachê, água quente.",
    method: "Deixe as folhas em infusão por 3 a 5 minutos e coe antes de servir.",
    swaps: "Troque por chá branco, se preferir uma versão mais suave.",
    bestMoment: "Pela manhã ou início da tarde.",
    benefits: [
      "Ajuda na hidratação",
      "Contribui para momentos de pausa",
      "É uma boa escolha para variar as bebidas do dia",
      "Favorece energia mais estável quando substitui bebidas açucaradas",
    ],
  },
  {
    id: "cha-hortela",
    category: "Chás",
    name: "Chá de hortelã",
    tags: [],
    cover: "warm",
    ingredients: "Folhas de hortelã fresca, água quente.",
    method: "Deixe as folhas em infusão por alguns minutos e sirva.",
    swaps: "Troque por erva-cidreira, se preferir um efeito mais calmante.",
    bestMoment: "Após as refeições ou à noite.",
    benefits: [
      "Ajuda na hidratação",
      "Contribui para a digestão leve após as refeições",
      "É uma boa escolha para o fim do dia",
      "Favorece um momento de acolhimento antes de dormir",
    ],
  },
  {
    id: "shake-banana-aveia",
    category: "Shakes",
    name: "Shake de banana com aveia",
    tags: [],
    cover: "green",
    ingredients: "Banana, aveia, leite ou bebida vegetal.",
    method: "Bata todos os ingredientes no liquidificador até ficar homogêneo.",
    swaps: "Troque a banana por manga ou mamão.",
    bestMoment: "No café da manhã ou como lanche.",
    benefits: [
      "Rica em fibras",
      "Favorece maior saciedade",
      "É uma boa escolha para um café da manhã prático",
      "Ajuda a reduzir a vontade de beliscar pouco tempo depois",
    ],
  },
  {
    id: "shake-verde-abacaxi",
    category: "Shakes",
    name: "Shake verde com abacaxi",
    tags: [],
    cover: "warm",
    ingredients: "Abacaxi, folhas verdes (couve ou espinafre), água ou água de coco.",
    method: "Bata todos os ingredientes no liquidificador e sirva na sequência.",
    swaps: "Troque o abacaxi por maçã, se preferir um sabor mais suave.",
    bestMoment: "Pela manhã ou antes do almoço.",
    benefits: [
      "Ajuda a aumentar o consumo de vegetais",
      "Contribui para a hidratação",
      "É uma boa escolha para variar o café da manhã",
      "Favorece uma alimentação com mais cor no dia a dia",
    ],
  },
  {
    id: "shake-morango-iogurte",
    category: "Shakes",
    name: "Shake de morango com iogurte",
    tags: [],
    cover: "green",
    ingredients: "Morangos, iogurte natural, gelo (opcional).",
    method: "Bata os morangos com o iogurte até ficar cremoso.",
    swaps: "Troque os morangos por outras frutas vermelhas.",
    bestMoment: "Como lanche da tarde.",
    benefits: [
      "Rica em proteínas",
      "Favorece maior saciedade",
      "É uma boa escolha para satisfazer a vontade de algo doce",
      "Ajuda a reduzir a dependência de ultraprocessados",
    ],
  },
  {
    id: "agua-limao-hortela",
    category: "Águas saborizadas",
    name: "Água com limão e hortelã",
    tags: [],
    cover: "warm",
    ingredients: "Água, rodelas de limão, folhas de hortelã.",
    method: "Adicione o limão e a hortelã à água e deixe descansar alguns minutos antes de beber.",
    swaps: "Troque o limão por laranja ou abacaxi.",
    bestMoment: "Ao longo do dia.",
    benefits: [
      "Ajuda na hidratação",
      "É uma boa escolha para tornar a água mais convidativa",
      "Contribui para reduzir o consumo de bebidas açucaradas",
    ],
  },
  {
    id: "agua-pepino-limao",
    category: "Águas saborizadas",
    name: "Água com pepino e limão",
    tags: [],
    cover: "green",
    ingredients: "Água, rodelas de pepino, rodelas de limão.",
    method: "Adicione o pepino e o limão à água gelada e deixe descansar antes de beber.",
    swaps: "Troque o pepino por hortelã, se preferir.",
    bestMoment: "Nos dias mais quentes ou ao longo do dia.",
    benefits: [
      "Ajuda na hidratação",
      "É uma boa escolha para os dias mais quentes",
      "Contribui para variar o sabor da água sem açúcar",
    ],
  },
  {
    id: "agua-frutas-vermelhas",
    category: "Águas saborizadas",
    name: "Água com frutas vermelhas",
    tags: [],
    cover: "warm",
    ingredients: "Água, frutas vermelhas (morango, amora ou framboesa).",
    method: "Amasse levemente as frutas, adicione à água e deixe descansar antes de beber.",
    swaps: "Troque as frutas vermelhas por frutas da estação.",
    bestMoment: "Ao longo do dia.",
    benefits: [
      "Ajuda na hidratação",
      "É uma boa escolha para variar o sabor da água",
      "Contribui para reduzir o consumo de bebidas açucaradas",
    ],
  },
];

const CATEGORIES = [
  { title: "Café da manhã", icon: Coffee },
  { title: "Almoço", icon: Salad },
  { title: "Lanches", icon: Cookie },
  { title: "Jantar", icon: Soup },
];

const DRINK_CATEGORIES = [
  { title: "Chás", icon: Leaf },
  { title: "Shakes", icon: Milk },
  { title: "Águas saborizadas", icon: Droplets },
];

function RefeicoesPage() {
  const { filtro: filtroRaw } = Route.useSearch();
  const filtro = filtroRaw as FilterKey | undefined;
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);

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
              <ItemRow key={m.id} item={m} onOpen={setOpenItem} />
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
                    <ItemRow key={m.id} item={m} onOpen={setOpenItem} />
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <h2 className="mb-3 mt-8 text-sm font-semibold text-text-secondary">Bebidas inteligentes</h2>
          <p className="text-xs text-text-secondary">Opções simples para variar além da água, sem obrigação.</p>
          <div className="mt-3 grid gap-4">
            {DRINK_CATEGORIES.map((cat) => (
              <section key={cat.title} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2">
                  <cat.icon size={18} className="text-primary" aria-hidden />
                  <h2 className="text-sm font-semibold">{cat.title}</h2>
                </div>
                <ul className="mt-3 grid gap-2">
                  {DRINKS.filter((d) => d.category === cat.title).map((d) => (
                    <ItemRow key={d.id} item={d} onOpen={setOpenItem} />
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

      <Drawer open={!!openItem} onOpenChange={(open) => { if (!open) setOpenItem(null); }}>
        <DrawerContent>
          {openItem ? (
            <>
              <DrawerHeader>
                <DrawerTitle>{openItem.name}</DrawerTitle>
                <DrawerDescription>{openItem.category}</DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 px-4 pb-6 text-sm">
                <MediaPlaceholder
                  type="food"
                  cover={openItem.cover}
                  aspect="wide"
                  label={openItem.name}
                  className="rounded-xl"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Ingredientes</p>
                  <p className="mt-1 text-text-secondary">{openItem.ingredients}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Como preparar</p>
                  <p className="mt-1 text-text-secondary">{openItem.method}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Trocas possíveis</p>
                  <p className="mt-1 text-text-secondary">{openItem.swaps}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {openItem.time ? "Tempo aproximado" : "Melhor momento para consumir"}
                  </p>
                  <p className="mt-1 text-text-secondary">{openItem.time ?? openItem.bestMoment}</p>
                </div>
                <div className="rounded-xl bg-soft-green/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-dark">
                    Por que esta opção pode ajudar?
                  </p>
                  <ul className="mt-2 grid gap-1.5">
                    {openItem.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-text-secondary">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-secondary-dark" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
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

function ItemRow({ item, onOpen }: { item: FoodItem; onOpen: (i: FoodItem) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 p-3 text-left text-sm text-text-secondary hover:bg-surface"
      >
        {item.name}
        <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden />
      </button>
    </li>
  );
}
