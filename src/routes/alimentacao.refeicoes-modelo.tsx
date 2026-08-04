import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Cookie, Salad, Soup } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { FoodItemDrawer, FoodItemRow, type FoodItem } from "@/components/food-item";
import { activeDay, useAppState } from "@/lib/store";

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
      { title: "Refeições Inteligentes — VITTALLE" },
      { name: "description", content: "Ideias práticas para café da manhã, almoço, lanches e jantar." },
    ],
  }),
  component: RefeicoesPage,
});

interface Meal extends FoodItem {
  tags: FilterKey[];
}

const BREAKFAST_IMG = "/imagens/biblioteca/";

const MEALS: Meal[] = [
  {
    id: "cafe-01-ovos-mexidos-mamao",
    category: "Café da manhã",
    name: "Ovos mexidos com mamão",
    tags: ["rapidas"],
    cover: "warm",
    image: `${BREAKFAST_IMG}1-ovos mexidos com mamão.png`,
    ingredients: "• 2 ovos\n• 1 porção de mamão\n• Café puro ou com um pouco de leite\n• Canela opcional para o mamão",
    method:
      "Quebre os ovos em uma tigela e misture com um garfo. Leve a uma frigideira antiaderente, em fogo baixo, mexendo até ficarem cozidos e cremosos. Sirva com o mamão e a bebida escolhida.",
    swaps:
      "• Mamão por maçã, pera, morangos ou laranja\n• Ovos mexidos por ovos cozidos ou omelete\n• Café por chá ou leite\n• Canela por algumas gotas de limão no mamão",
    time: "5 minutos",
    whyPoints: [
      {
        title: "Ativa a saciedade",
        body: "A proteína dos ovos estimula sinais de satisfação e ajuda a controlar a fome durante a manhã.",
      },
      {
        title: "Ajuda a desinchar",
        body: "O mamão oferece água e fibras que favorecem o intestino e ajudam a reduzir a sensação de barriga presa e estufada.",
      },
      {
        title: "Protege seu metabolismo",
        body: "Consumir proteína desde cedo ajuda a preservar massa muscular, importante para manter um corpo metabolicamente ativo depois dos 40.",
      },
    ],
    practicalNote:
      "Você chega à próxima refeição com menos fome, menos vontade de beliscar e mais facilidade para controlar as porções.",
  },
  {
    id: "cafe-02-iogurte-fruta-aveia-chia",
    category: "Café da manhã",
    name: "Iogurte com fruta, aveia e chia",
    tags: ["rapidas", "poucos-ingredientes", "leves"],
    cover: "green",
    image: `${BREAKFAST_IMG}2-iogurt com fruta , avaia e chia.png`,
    ingredients:
      "• 1 pote de iogurte natural sem açúcar\n• 1 fruta picada\n• 1 a 2 colheres de sopa de aveia\n• 1 colher de chá de chia\n• Canela opcional",
    method:
      "Coloque o iogurte em uma tigela. Acrescente a fruta, a aveia e a chia. Misture e, se preferir uma textura mais cremosa, deixe descansar por alguns minutos antes de consumir.",
    swaps:
      "• Iogurte natural por kefir ou versão sem lactose\n• Aveia por granola simples com pouco açúcar\n• Chia por linhaça moída\n• Fruta por banana, maçã, mamão, morangos ou pera",
    time: "3 minutos",
    whyPoints: [
      {
        title: "Freia a fome e os picos de açúcar",
        body: "As fibras da aveia e da chia tornam a digestão mais gradual, ajudando a manter a energia e a fome mais estáveis.",
      },
      {
        title: "Fortalece músculos e ossos",
        body: "O iogurte acrescenta proteína e cálcio, dois nutrientes especialmente importantes na fase 40+.",
      },
      {
        title: "Cuida do intestino e da barriga",
        body: "Fibras e alimentos fermentados favorecem um ambiente intestinal mais saudável, importante para regularidade e menor sensação de inchaço.",
      },
    ],
    practicalNote: "Ajuda a segurar a fome e a vontade de doce, enquanto cuida do intestino, dos músculos e da saúde óssea.",
  },
  {
    id: "cafe-03-omelete-colorida-vegetais",
    category: "Café da manhã",
    name: "Omelete colorida com vegetais",
    tags: ["vegetais", "completas"],
    cover: "warm",
    image: `${BREAKFAST_IMG}3- omelete colorida com vegetais.png`,
    ingredients:
      "• 2 ovos\n• Tomate picado\n• Cebola picada\n• Espinafre, couve ou outro vegetal disponível\n• Ervas e temperos naturais\n• Um fio pequeno de azeite, se necessário",
    method:
      "Bata os ovos com um garfo. Acrescente os vegetais picados e os temperos. Despeje em uma frigideira antiaderente e cozinhe em fogo baixo até firmar. Dobre ao meio ou vire com cuidado para dourar os dois lados.",
    swaps:
      "• Espinafre por couve, abobrinha ou cenoura ralada\n• Tomate por pimentão\n• Cebola por alho-poró ou cheiro-verde\n• Acrescentar queijo branco ou frango desfiado quando desejar mais proteína",
    time: "7 a 8 minutos",
    whyPoints: [
      {
        title: "Controla a fome por mais tempo",
        body: "A proteína dos ovos aumenta a satisfação e reduz a chance de procurar outro alimento pouco depois.",
      },
      {
        title: "Ajuda a reduzir o volume da barriga",
        body: "Vegetais fornecem fibras, água e volume, favorecendo o intestino e substituindo preparações mais pesadas e ultraprocessadas.",
      },
      {
        title: "Favorece uma alimentação anti-inflamatória",
        body: "A variedade de vegetais entrega antioxidantes e compostos protetores que ajudam o corpo a lidar melhor com o estresse oxidativo.",
      },
    ],
    practicalNote: "Uma refeição que sustenta, aumenta o consumo de vegetais e facilita reduzir gordura sem passar a manhã com fome.",
  },
  {
    id: "cafe-04-tapioca-ovo-queijo-tomate",
    category: "Café da manhã",
    name: "Tapioca com ovo, queijo branco e tomate",
    tags: ["vegetais", "completas"],
    cover: "green",
    image: `${BREAKFAST_IMG}4- tapioca com ovo , queijo branco e tomate.png`,
    ingredients: "• Goma de tapioca\n• 1 ovo\n• Queijo branco\n• Tomate em rodelas ou picado\n• Orégano ou ervas naturais",
    method:
      "Espalhe a goma de tapioca em uma frigideira antiaderente e deixe firmar. Prepare o ovo como preferir. Recheie a tapioca com o ovo, o queijo branco e o tomate. Finalize com orégano e dobre.",
    swaps:
      "• Queijo branco por cottage ou ricota\n• Ovo por frango desfiado\n• Tomate por folhas, cenoura ralada ou espinafre\n• Tapioca por pão integral ou pão francês pequeno",
    time: "7 minutos",
    whyPoints: [
      {
        title: "Evita que a tapioca vire fome rápida",
        body: "O ovo e o queijo acrescentam proteína, tornando a digestão mais equilibrada e a refeição mais satisfatória.",
      },
      {
        title: "Apoia ossos e músculos depois dos 40",
        body: "O queijo oferece cálcio e proteína, importantes para preservar força e estrutura corporal.",
      },
      {
        title: "Acrescenta proteção antioxidante",
        body: "O tomate fornece licopeno e outros compostos que enriquecem a refeição e favorecem uma alimentação mais protetora.",
      },
    ],
    practicalNote: "Você continua comendo tapioca, mas numa versão que segura melhor a fome e ajuda a evitar exageros nas horas seguintes.",
  },
  {
    id: "cafe-05-aveia-cremosa-iogurte-frutas",
    category: "Café da manhã",
    name: "Aveia Cremosa com Iogurte e Frutas",
    tags: ["poucos-ingredientes", "leves"],
    cover: "warm",
    image: `${BREAKFAST_IMG}5- aveia cremosa com iogurt e frutas.png`,
    ingredients:
      "• 3 colheres de sopa de aveia\n• 1 pote de iogurte natural\n• 1 colher de chá de chia\n• Morangos ou outra fruta\n• Canela opcional\n• Um pouco de leite, se desejar textura mais leve",
    method:
      "Coloque a aveia, o iogurte e a chia em um pote com tampa. Misture e acrescente a fruta picada. Deixe na geladeira durante a noite. Pela manhã, misture novamente e consuma frio.",
    swaps:
      "• Morango por maçã, banana, mamão ou pera\n• Chia por linhaça moída\n• Iogurte por kefir ou versão sem lactose\n• Acrescentar leite para deixar a preparação menos espessa",
    time: "5 minutos na noite anterior",
    whyPoints: [
      {
        title: "Ajuda a controlar fome e glicose",
        body: "A beta-glucana da aveia forma uma fibra viscosa que torna a absorção mais gradual e favorece maior saciedade.",
      },
      {
        title: "Alimenta a microbiota",
        body: "Aveia, chia e frutas fornecem fibras utilizadas pelas bactérias benéficas do intestino.",
      },
      {
        title: "Entrega proteína e cálcio",
        body: "O iogurte ajuda a completar a refeição e acrescenta nutrientes importantes para músculos e ossos.",
      },
    ],
    practicalNote: "Você acorda com uma refeição pronta que ajuda o intestino, controla a fome e reduz a chance de recorrer a biscoitos ou doces.",
  },
  {
    id: "cafe-06-pao-integral-ovos-abacate",
    category: "Café da manhã",
    name: "Pão integral com ovos e abacate",
    tags: ["completas"],
    cover: "green",
    image: `${BREAKFAST_IMG}6- pão integral com ovos e abacate.png`,
    ingredients: "• 1 ou 2 fatias de pão integral\n• 1 ou 2 ovos\n• Uma pequena porção de abacate\n• Tomate, limão ou ervas opcionais",
    method:
      "Amasse o abacate e tempere com algumas gotas de limão ou ervas. Prepare os ovos mexidos, cozidos ou em formato de omelete. Coloque o abacate sobre o pão e finalize com os ovos.",
    swaps:
      "• Pão integral por pão francês pequeno, tapioca ou cuscuz\n• Abacate por cottage ou ricota\n• Ovos por frango desfiado\n• Acrescentar tomate ou folhas",
    time: "6 a 8 minutos",
    whyPoints: [
      {
        title: "Ativa os sinais de saciedade",
        body: "A proteína dos ovos ajuda a diminuir a fome e favorece melhor controle do que será consumido depois.",
      },
      {
        title: "Prolonga a satisfação",
        body: "As fibras e gorduras insaturadas do abacate deixam a refeição mais completa e ajudam a evitar quedas rápidas de energia.",
      },
      {
        title: "Apoia um metabolismo mais ativo",
        body: "Proteína suficiente ajuda a preservar massa muscular; além disso, sua digestão exige mais energia do organismo do que a de carboidratos e gorduras.",
      },
    ],
    practicalNote: "É uma opção potente para quem sente muita fome pela manhã e quer reduzir beliscos que dificultam perder barriga.",
  },
  {
    id: "cafe-07-shake-proteico-banana-aveia-canela",
    category: "Café da manhã",
    name: "Shake proteico de banana, aveia e canela",
    tags: ["rapidas", "poucos-ingredientes"],
    cover: "warm",
    image: `${BREAKFAST_IMG}7- sheike proteico de banana, aveia e canela.png`,
    ingredients:
      "• 1 banana\n• Leite, iogurte ou bebida habitual\n• Whey protein ou leite em pó, conforme sua rotina\n• 1 colher de sopa de aveia\n• Canela\n• Gelo opcional",
    method:
      "Coloque todos os ingredientes no liquidificador e bata até obter uma mistura cremosa. Ajuste a quantidade de líquido conforme a textura desejada e consuma logo após o preparo.",
    swaps:
      "• Banana por mamão ou morangos\n• Whey por iogurte com mais proteína ou leite em pó\n• Aveia por chia\n• Leite comum por versão sem lactose\n• Canela por cacau em pó",
    time: "3 minutos",
    whyPoints: [
      {
        title: "Aumenta proteína sem complicar",
        body: "O whey, leite ou iogurte ajuda na saciedade e na preservação muscular durante o emagrecimento.",
      },
      {
        title: "Evita energia que sobe e cai rápido",
        body: "A aveia acrescenta fibras e torna o shake mais satisfatório do que uma bebida feita somente com fruta.",
      },
      {
        title: "Ajuda a controlar a vontade de doce",
        body: "Banana e canela entregam sabor naturalmente doce, reduzindo a necessidade de açúcar, xaropes ou achocolatados.",
      },
    ],
    practicalNote: "Um Plano B rápido que controla melhor a fome, protege os músculos e evita que a correria termine em biscoitos ou salgados.",
  },
  {
    id: "cafe-08-cottage-frutas-castanhas",
    category: "Café da manhã",
    name: "Cottage com frutas e castanhas",
    tags: ["rapidas", "poucos-ingredientes", "leves"],
    cover: "green",
    image: `${BREAKFAST_IMG}8- cottage com frutas e castanhas.png`,
    ingredients: "• Queijo cottage\n• 1 fruta fresca\n• Pequena porção de castanhas ou nozes\n• Canela opcional",
    method: "Coloque o cottage em uma tigela. Acrescente a fruta picada e finalize com as castanhas e a canela. Pode consumir imediatamente.",
    swaps:
      "• Cottage por ricota cremosa ou iogurte natural\n• Castanhas por nozes, amendoim sem açúcar ou sementes\n• Fruta conforme a estação e disponibilidade\n• Canela por cacau em pó",
    time: "3 minutos",
    whyPoints: [
      {
        title: "Proteína para fome e massa muscular",
        body: "O cottage ajuda a prolongar a saciedade e contribui para preservar músculos depois dos 40.",
      },
      {
        title: "Gorduras boas que aumentam a satisfação",
        body: "Uma pequena porção de castanhas deixa a refeição mais completa e reduz a vontade de procurar outro alimento logo depois.",
      },
      {
        title: "Antioxidantes para vitalidade",
        body: "As frutas fornecem vitaminas, fibras e compostos protetores que apoiam energia, intestino e envelhecimento saudável.",
      },
    ],
    practicalNote: "Leve, mas realmente satisfatório: ajuda a controlar a fome enquanto oferece nutrientes importantes para músculos, ossos e vitalidade.",
  },
  {
    id: "cafe-09-crepioca-queijo-vegetais",
    category: "Café da manhã",
    name: "Crepioca com queijo e vegetais",
    tags: ["vegetais", "completas"],
    cover: "warm",
    image: `${BREAKFAST_IMG}9- crepioca com queijo e vegetais.png`,
    ingredients: "• 1 ovo\n• Goma de tapioca\n• Queijo branco, cottage ou ricota\n• Tomate, espinafre ou outro vegetal\n• Ervas e temperos naturais",
    method:
      "Misture o ovo com a goma de tapioca até formar uma massa uniforme. Despeje em uma frigideira antiaderente e cozinhe dos dois lados. Recheie com queijo e vegetais, dobre e sirva.",
    swaps:
      "• Queijo por frango desfiado\n• Tomate por cenoura ralada, folhas ou abobrinha\n• Acrescentar cheiro-verde, orégano ou outras ervas\n• Preparar apenas com ovo e queijo quando não tiver vegetais",
    time: "7 minutos",
    whyPoints: [
      {
        title: "Combinação que segura melhor a fome",
        body: "O ovo e o queijo elevam a proteína e evitam que a crepioca funcione como um carboidrato isolado.",
      },
      {
        title: "Mais fibras para desinchar",
        body: "Os vegetais ajudam o intestino, aumentam o volume da refeição e favorecem menor sensação de barriga estufada.",
      },
      {
        title: "Proteína apoia o gasto metabólico",
        body: "Além de preservar massa muscular, a proteína possui maior efeito térmico: o corpo gasta mais energia para digeri-la e processá-la.",
      },
    ],
    practicalNote: "Transforma uma crepioca comum numa refeição que controla melhor a fome e apoia a perda de gordura sem abrir mão da praticidade.",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
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
    whyPoints: [],
    practicalNote: "",
  },
  {
    id: "jantar-proteina-legumes",
    category: "Jantar",
    name: "Prato leve com proteína e legumes",
    tags: ["completas", "vegetais", "leves"],
    cover: "green",
    ingredients: "Uma proteína, legumes variados.",
    method: "Prepare a proteína e os legumes separadamente e sirva juntos.",
    swaps: "Troque a proteína conforme o que houver disponível.",
    time: "20 minutos",
    whyPoints: [],
    practicalNote: "",
  },
];

const CATEGORIES = [
  { title: "Café da manhã", icon: Coffee },
  { title: "Almoço", icon: Salad },
  { title: "Lanches", icon: Cookie },
  { title: "Jantar", icon: Soup },
];

// Rotação oficial dos cafés da manhã ao longo dos 21 dias — cada número referencia um dos 9 cafés oficiais.
const BREAKFAST_ID_BY_NUMBER: Record<number, string> = {
  1: "cafe-01-ovos-mexidos-mamao",
  2: "cafe-02-iogurte-fruta-aveia-chia",
  3: "cafe-03-omelete-colorida-vegetais",
  4: "cafe-04-tapioca-ovo-queijo-tomate",
  5: "cafe-05-aveia-cremosa-iogurte-frutas",
  6: "cafe-06-pao-integral-ovos-abacate",
  7: "cafe-07-shake-proteico-banana-aveia-canela",
  8: "cafe-08-cottage-frutas-castanhas",
  9: "cafe-09-crepioca-queijo-vegetais",
};

const BREAKFAST_ROTATION: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [2, 5, 6],
  5: [1, 7, 8],
  6: [3, 4, 9],
  7: [2, 6, 7],
  8: [3, 5, 8],
  9: [1, 4, 9],
  10: [3, 6, 8],
  11: [1, 5, 7],
  12: [2, 4, 9],
  13: [1, 6, 8],
  14: [2, 4, 7],
  15: [3, 5, 9],
  16: [2, 6, 8],
  17: [5, 7, 9],
  18: [1, 3, 4],
  19: [6, 8, 9],
  20: [2, 3, 5],
  21: [1, 4, 7],
};

function breakfastsForDay(dayId: number): Meal[] {
  const numbers = BREAKFAST_ROTATION[dayId] ?? BREAKFAST_ROTATION[1];
  return numbers
    .map((n) => MEALS.find((m) => m.id === BREAKFAST_ID_BY_NUMBER[n]))
    .filter((m): m is Meal => !!m);
}

function RefeicoesPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const { filtro: filtroRaw } = Route.useSearch();
  const filtro = filtroRaw as FilterKey | undefined;
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);
  const [showAllBreakfasts, setShowAllBreakfasts] = useState(false);

  const todaysBreakfasts = breakfastsForDay(dayId);

  return (
    <AppShell title="Refeições Inteligentes" subtitle="Referências práticas" back="/alimentacao">
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
              <FoodItemRow key={m.id} item={m} onOpen={setOpenItem} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-sm text-text-secondary">
            Ideias práticas para café da manhã, almoço, lanches e jantar. Use como referência, sem obrigação.
          </p>
          <div className="mt-4 grid gap-4">
            {CATEGORIES.map((cat) => {
              const isBreakfast = cat.title === "Café da manhã";
              const items = isBreakfast
                ? showAllBreakfasts
                  ? MEALS.filter((m) => m.category === cat.title)
                  : todaysBreakfasts
                : MEALS.filter((m) => m.category === cat.title);
              return (
                <section key={cat.title} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <cat.icon size={18} className="text-primary" aria-hidden />
                      <h2 className="text-sm font-semibold">{cat.title}</h2>
                    </div>
                    {isBreakfast ? (
                      <button
                        type="button"
                        onClick={() => setShowAllBreakfasts((v) => !v)}
                        className="shrink-0 text-xs font-semibold text-primary hover:underline"
                      >
                        {showAllBreakfasts ? "Ver só as de hoje" : "Ver todos os cafés"}
                      </button>
                    ) : null}
                  </div>
                  {isBreakfast && !showAllBreakfasts ? (
                    <p className="mt-1 text-xs text-text-muted">Selecionados para o Dia {dayId} da sua jornada.</p>
                  ) : null}
                  <ul className="mt-3 grid gap-2">
                    {items.map((m) => (
                      <FoodItemRow key={m.id} item={m} onOpen={setOpenItem} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </>
      )}

      <Link to="/alimentacao" className="mt-4 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>

      <FoodItemDrawer item={openItem} onOpenChange={(open) => { if (!open) setOpenItem(null); }} />
    </AppShell>
  );
}
