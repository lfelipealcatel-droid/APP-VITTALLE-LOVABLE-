import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Leaf, Milk, Zap } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { FoodItemDrawer, FoodItemRow, type FoodItem } from "@/components/food-item";

export const Route = createFileRoute("/alimentacao/bebidas-funcionais")({
  head: () => ({
    meta: [
      { title: "Ferramentas Funcionais — VITTALLE" },
      { name: "description", content: "Escolha conforme o que seu corpo precisa hoje: sono, saciedade, energia e digestão." },
    ],
  }),
  component: BebidasPage,
});

const CHA_IMG = "/imagens/biblioteca/chás/";
const SHAKE_IMG = "/imagens/biblioteca/shakes/";

// Observação médica padrão, exigida ao final de cada um dos 6 chás.
// Renderizada pelo Drawer no campo dedicado FoodItem.observation, separado de practicalNote.
const TEA_DISCLAIMER =
  "Este chá é uma opção complementar e não substitui orientação ou tratamento médico. Se você está grávida, amamentando, possui alguma doença crônica ou utiliza medicamentos de uso contínuo, converse com seu médico ou nutricionista antes do consumo frequente. Suspenda o uso se sentir qualquer desconforto.";

// Observação padrão dos 6 shakes, também renderizada via FoodItem.observation no Drawer.
const SHAKE_DISCLAIMER =
  "Este shake é uma sugestão de preparo com alimentos comuns e faz parte de uma rotina alimentar equilibrada. Se você possui alergias alimentares, intolerâncias, restrições específicas ou faz acompanhamento nutricional ou médico, adapte os ingredientes conforme a orientação do profissional que acompanha você.";

const DRINKS: FoodItem[] = [
  {
    id: "cha-01-relaxar",
    // O campo "category" é reaproveitado para exibir a Combinação principal logo abaixo do nome no Drawer.
    category: "Camomila + Melissa",
    name: "Chá Relaxar",
    cover: "warm",
    image: `${CHA_IMG}1- chá relachar.png`,
    ingredients: "• 250 ml de água\n• 1 colher (chá) de flores secas de camomila\n• 1 colher (chá) de folhas secas de melissa (erva-cidreira)",
    method: "Ferva a água.\nDesligue o fogo.\nAdicione a camomila e a melissa.\nTampe por 5 a 8 minutos.\nCoe e consuma morno.",
    swaps: "• Melissa por capim-limão\n• Camomila por erva-doce",
    bestMoment: "30 a 60 minutos antes de dormir.",
    whyPoints: [
      {
        title: "Ajuda a desacelerar",
        body: "A camomila e a melissa são tradicionalmente utilizadas para promover relaxamento e favorecer uma rotina noturna mais tranquila.",
      },
      {
        title: "Menos tensão",
        body: "Criar um ritual de relaxamento pode ajudar a reduzir a tensão acumulada ao longo do dia.",
      },
      {
        title: "Sono de melhor qualidade",
        body: "Dormir melhor favorece uma rotina saudável, importante para mulheres que desejam perder barriga e manter hábitos consistentes.",
      },
    ],
    practicalNote: "Ideal para fechar o dia, diminuir a ansiedade da noite e evitar aquele impulso de beliscar antes de dormir.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "cha-02-sono-leve",
    category: "Capim-limão + Erva-doce",
    name: "Chá Sono Leve",
    cover: "green",
    image: `${CHA_IMG}2- chá sono leve.png`,
    ingredients: "• 250 ml de água\n• 1 colher (chá) de capim-limão\n• 1 colher (chá) de erva-doce",
    method: "Ferva a água.\nDesligue o fogo.\nAdicione as ervas.\nTampe por 5 a 8 minutos.\nCoe e consuma morno.",
    swaps: "• Capim-limão por melissa\n• Erva-doce por camomila",
    bestMoment: "Após o jantar.",
    whyPoints: [
      {
        title: "Relaxamento",
        body: "O capim-limão é tradicionalmente utilizado em rotinas de relaxamento e pode ajudar a criar um momento mais tranquilo no final do dia.",
      },
      {
        title: "Digestão confortável",
        body: "A erva-doce é tradicionalmente usada para favorecer o conforto digestivo depois das refeições.",
      },
      {
        title: "Ajuda na rotina do sono",
        body: "Um ritual noturno tranquilo pode ajudar o corpo a desacelerar e preparar-se melhor para dormir.",
      },
    ],
    practicalNote: "Excelente para quem costuma dormir tarde ou sente dificuldade para relaxar após um dia estressante.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "cha-03-desinchar",
    category: "Hibisco + Canela",
    name: "Chá Desinchar",
    cover: "warm",
    image: `${CHA_IMG}3- chá desinchar.png`,
    ingredients: "• 250 ml de água\n• 1 colher (chá) de hibisco\n• 1 pedaço pequeno de canela em pau",
    method: "Ferva a água.\nDesligue o fogo.\nAdicione o hibisco e a canela.\nTampe por 5 minutos.\nCoe antes de beber.",
    swaps: "• Canela por gengibre\n• Hibisco por hortelã",
    bestMoment: "No meio da manhã ou da tarde.",
    whyPoints: [
      {
        title: "Ajuda na retenção de líquidos",
        body: "O hibisco pode contribuir para uma rotina de hidratação e ajudar na sensação de retenção em algumas pessoas.",
      },
      {
        title: "Favorece uma digestão leve",
        body: "A combinação quente e aromática pode ajudar a criar uma sensação de conforto ao longo do dia.",
      },
      {
        title: "Sensação de barriga menos inchada",
        body: "Manter uma boa hidratação e reduzir bebidas açucaradas pode contribuir para uma rotina mais leve.",
      },
    ],
    practicalNote: "Ótimo para aqueles dias em que a roupa parece mais apertada por causa da retenção de líquidos.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "cha-04-digestao-leve",
    category: "Hortelã + Gengibre",
    name: "Chá Digestão Leve",
    cover: "green",
    image: `${CHA_IMG}4- chá digestão leve.png`,
    ingredients: "• 250 ml de água\n• Folhas de hortelã\n• 2 fatias finas de gengibre",
    method: "Ferva a água.\nAdicione o gengibre.\nDesligue o fogo.\nAcrescente a hortelã.\nTampe por 5 minutos.\nCoe antes de beber.",
    swaps: "• Hortelã por erva-doce\n• Gengibre por limão",
    bestMoment: "Após refeições mais pesadas.",
    whyPoints: [
      {
        title: "Favorece a digestão",
        body: "A hortelã e o gengibre são tradicionalmente utilizados para favorecer o conforto digestivo.",
      },
      {
        title: "Ajuda na sensação de leveza",
        body: "Uma bebida quente após a refeição pode ajudar a substituir sobremesas e bebidas muito açucaradas.",
      },
      {
        title: "Conforto após as refeições",
        body: "Criar uma pausa tranquila depois de comer pode contribuir para uma percepção mais confortável da digestão.",
      },
    ],
    practicalNote: "Excelente após um almoço ou jantar mais pesado, ajudando a manter uma sensação de conforto digestivo.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "cha-05-ativar",
    category: "Chá Verde + Gengibre",
    name: "Chá Ativar",
    cover: "warm",
    image: `${CHA_IMG}5- chá ativar.png`,
    ingredients: "• 250 ml de água\n• 1 colher (chá) de chá verde\n• 2 fatias finas de gengibre",
    method: "Aqueça a água antes da fervura intensa.\nDesligue o fogo.\nAdicione o chá verde e o gengibre.\nTampe por 3 a 5 minutos.\nCoe antes de beber.",
    swaps: "• Gengibre por canela\n• Chá verde por chá branco",
    bestMoment: "Pela manhã.",
    whyPoints: [
      {
        title: "Apoia o metabolismo",
        body: "O chá verde contém cafeína e compostos naturais que podem contribuir modestamente para a disposição e o gasto energético dentro de uma rotina saudável.",
      },
      {
        title: "Mais disposição",
        body: "A cafeína presente no chá verde pode ajudar algumas pessoas a começarem o dia com mais energia.",
      },
      {
        title: "Ajuda na rotina de controle da fome",
        body: "Usar bebidas sem açúcar no lugar de opções açucaradas pode favorecer uma rotina alimentar mais equilibrada.",
      },
    ],
    practicalNote: "Ideal para iniciar o dia com mais energia e manter uma rotina alimentar consistente.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "cha-06-energia-natural",
    category: "Chá Verde + Canela",
    name: "Chá Energia Natural",
    cover: "green",
    image: `${CHA_IMG}6- chá energia natural.png`,
    ingredients: "• 250 ml de água\n• 1 colher (chá) de chá verde\n• 1 pedaço pequeno de canela em pau",
    method: "Aqueça a água.\nDesligue antes da fervura intensa.\nAdicione o chá verde e a canela.\nTampe por cerca de 3 minutos.\nCoe antes de consumir.",
    swaps: "• Canela por gengibre\n• Chá verde por chá branco",
    bestMoment: "Pela manhã ou no início da tarde.",
    whyPoints: [
      {
        title: "Energia para começar o dia",
        body: "A cafeína naturalmente presente no chá verde pode contribuir para mais disposição em algumas pessoas.",
      },
      {
        title: "Apoia o metabolismo",
        body: "O chá verde pode oferecer um apoio modesto ao gasto energético quando combinado com alimentação equilibrada e movimento regular.",
      },
      {
        title: "Favorece uma rotina alimentar equilibrada",
        body: "É uma alternativa sem açúcar para substituir bebidas mais calóricas durante a manhã ou o início da tarde.",
      },
    ],
    practicalNote: "Uma ótima alternativa para quem busca começar o dia mais disposta sem recorrer a bebidas muito açucaradas.",
    observation: TEA_DISCLAIMER,
  },
  {
    id: "shake-01-saciedade",
    category: "Iogurte Natural + Morango + Chia",
    name: "Shake Saciedade",
    cover: "green",
    image: `${SHAKE_IMG}1- shake saciedade.png`,
    ingredients: "• 170 g de iogurte natural sem açúcar\n• 6 morangos\n• 1 colher (sopa) de chia\n• 150 ml de água gelada\n• Gelo a gosto",
    method: "Coloque todos os ingredientes no liquidificador.\nBata por aproximadamente 1 minuto.\nSirva imediatamente.",
    swaps: "• Morango por frutas vermelhas\n• Chia por linhaça\n• Iogurte por kefir natural",
    bestMoment: "Lanche da manhã ou da tarde.",
    whyPoints: [
      {
        title: "Saciedade",
        body: "A proteína do iogurte e as fibras da chia ajudam a prolongar a sensação de saciedade.",
      },
      {
        title: "Menos vontade de doces",
        body: "Uma opção rica em proteínas e fibras pode facilitar o controle da fome entre as refeições.",
      },
      {
        title: "Fibras",
        body: "As fibras ajudam o intestino e contribuem para uma alimentação equilibrada.",
      },
    ],
    practicalNote: "Excelente para evitar beliscar alimentos ultraprocessados entre as principais refeições.",
    observation: SHAKE_DISCLAIMER,
  },
  {
    id: "shake-02-fome-controlada",
    category: "Iogurte Natural + Maçã + Canela",
    name: "Shake Fome Controlada",
    cover: "warm",
    image: `${SHAKE_IMG}2- shake fome controlada.png`,
    ingredients: "• 170 g de iogurte natural\n• 1 maçã pequena\n• Canela a gosto\n• 150 ml de água\n• Gelo a gosto",
    method: "Coloque todos os ingredientes no liquidificador.\nBata até obter uma mistura cremosa.\nSirva imediatamente.",
    swaps: "• Maçã por pera\n• Canela por cacau 100%\n• Iogurte por kefir",
    bestMoment: "Meio da tarde.",
    whyPoints: [
      {
        title: "Controle da fome",
        body: "A combinação favorece uma maior sensação de saciedade.",
      },
      {
        title: "Saciedade",
        body: "Proteína e fibras ajudam a prolongar a satisfação após o lanche.",
      },
      {
        title: "Leveza",
        body: "Uma alternativa prática para substituir lanches ricos em açúcar.",
      },
    ],
    practicalNote: "Ideal para o período em que costuma surgir vontade de comer doces.",
    observation: SHAKE_DISCLAIMER,
  },
  {
    id: "shake-03-proteico",
    category: "Leite + Whey + Cacau + Canela",
    name: "Shake Proteico",
    cover: "green",
    image: `${SHAKE_IMG}3- shake proteico.png`,
    ingredients: "• 200 ml de leite\n• 1 medida de whey protein\n• 1 colher (chá) de cacau 100%\n• Canela a gosto",
    method: "Coloque todos os ingredientes no liquidificador.\nBata até ficar homogêneo.\nSirva imediatamente.",
    swaps: "• Whey por iogurte grego natural\n• Leite por bebida vegetal sem açúcar",
    bestMoment: "Após atividade física ou no café da manhã.",
    whyPoints: [
      {
        title: "Proteína",
        body: "Ajuda a aumentar a ingestão proteica do dia.",
      },
      {
        title: "Metabolismo",
        body: "A preservação da massa muscular contribui para um metabolismo saudável.",
      },
      {
        title: "Saciedade",
        body: "Proteínas ajudam a prolongar a sensação de saciedade.",
      },
    ],
    practicalNote: "Ótimo para quem tem dificuldade em consumir proteínas nas refeições.",
    observation: SHAKE_DISCLAIMER,
  },
  {
    id: "shake-04-recuperacao",
    category: "Iogurte Grego + Banana + Aveia",
    name: "Shake Recuperação",
    cover: "warm",
    image: `${SHAKE_IMG}4- shake de recuperação.png`,
    ingredients: "• 170 g de iogurte grego natural\n• 1/2 banana\n• 2 colheres (sopa) de aveia",
    method: "Coloque todos os ingredientes no liquidificador.\nBata até ficar homogêneo.\nSirva imediatamente.",
    swaps: "• Banana por morango\n• Aveia por chia",
    bestMoment: "Após exercícios ou no café da manhã.",
    whyPoints: [
      {
        title: "Fortalece o corpo",
        body: "Proteínas e carboidratos ajudam na recuperação após atividades físicas.",
      },
      {
        title: "Energia",
        body: "Fornece energia para iniciar ou recuperar o dia.",
      },
      {
        title: "Fibras",
        body: "A aveia auxilia na saciedade e na saúde intestinal.",
      },
    ],
    practicalNote: "Uma ótima opção para quem faz exercícios ou deseja começar o dia mais nutrida.",
    observation: SHAKE_DISCLAIMER,
  },
  {
    id: "shake-05-energia",
    category: "Café + Leite + Cacau + Canela",
    name: "Shake Energia",
    cover: "green",
    image: `${SHAKE_IMG}5- shake energia.png`,
    ingredients: "• 150 ml de café frio sem açúcar\n• 150 ml de leite\n• 1 colher (chá) de cacau 100%\n• Canela a gosto",
    method: "Coloque todos os ingredientes no liquidificador.\nBata até ficar cremoso.\nSirva imediatamente.",
    swaps: "• Café por café descafeinado\n• Leite por bebida vegetal",
    bestMoment: "Pela manhã.",
    whyPoints: [
      {
        title: "Energia",
        body: "A cafeína pode aumentar a disposição em pessoas sensíveis ao seu efeito.",
      },
      {
        title: "Metabolismo",
        body: "Substitui bebidas açucaradas por uma alternativa mais equilibrada.",
      },
      {
        title: "Comece bem o dia",
        body: "Ajuda a iniciar a rotina com mais praticidade.",
      },
    ],
    practicalNote: "Excelente para quem costuma sair de casa sem tomar café da manhã.",
    observation: SHAKE_DISCLAIMER,
  },
  {
    id: "shake-06-manha-ativa",
    category: "Kefir + Mamão + Gengibre",
    name: "Shake Manhã Ativa",
    cover: "warm",
    image: `${SHAKE_IMG}6- shake manhã.png`,
    ingredients: "• 200 ml de kefir natural\n• 1 fatia de mamão\n• 1 pequeno pedaço de gengibre",
    method: "Coloque todos os ingredientes no liquidificador.\nBata até ficar homogêneo.\nConsuma imediatamente.",
    swaps: "• Kefir por iogurte natural\n• Mamão por manga\n• Gengibre por canela",
    bestMoment: "Café da manhã.",
    whyPoints: [
      {
        title: "Metabolismo",
        body: "Uma refeição nutritiva ajuda a manter uma rotina alimentar consistente.",
      },
      {
        title: "Intestino",
        body: "O kefir e o mamão podem contribuir para o bom funcionamento intestinal em muitas pessoas.",
      },
      {
        title: "Energia",
        body: "Uma alternativa prática para começar o dia.",
      },
    ],
    practicalNote: "Ideal para quem quer substituir um café da manhã pobre em nutrientes por uma opção mais completa.",
    observation: SHAKE_DISCLAIMER,
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

type GoalKey = "relaxar" | "desinchar" | "metabolismo";

interface Goal {
  key: GoalKey;
  emoji: string;
  title: string;
  subtitle: string;
  pageTitle: string;
  intro: string;
  // shortPhrase é conteúdo só do card de prévia (nesta página), não faz parte do FoodItem/Drawer compartilhado.
  teas: { id: string; shortPhrase: string }[];
}

const GOALS: Goal[] = [
  {
    key: "relaxar",
    emoji: "🌙",
    title: "Relaxar",
    subtitle: "Para desacelerar e favorecer uma noite mais tranquila.",
    pageTitle: "Relaxar e Dormir Melhor",
    intro:
      "Ajudar a desacelerar o corpo no final do dia, favorecer um sono de melhor qualidade e contribuir para uma rotina mais tranquila.",
    teas: [
      { id: "cha-01-relaxar", shortPhrase: "Para criar um ritual noturno mais tranquilo." },
      { id: "cha-02-sono-leve", shortPhrase: "Para relaxar e terminar o dia com mais conforto." },
    ],
  },
  {
    key: "desinchar",
    emoji: "💚",
    title: "Desinchar",
    subtitle: "Para os dias de retenção, digestão pesada ou barriga estufada.",
    pageTitle: "Desinchar",
    intro: "Ajudar a diminuir a sensação de barriga pesada, favorecer a digestão e contribuir para uma rotina alimentar mais leve.",
    teas: [
      { id: "cha-03-desinchar", shortPhrase: "Para os dias de retenção e sensação de barriga pesada." },
      { id: "cha-04-digestao-leve", shortPhrase: "Para favorecer o conforto depois das refeições." },
    ],
  },
  {
    key: "metabolismo",
    emoji: "🔥",
    title: "Metabolismo",
    subtitle: "Para começar o dia com mais disposição e apoiar sua rotina.",
    pageTitle: "Ativar o Metabolismo",
    intro: "Começar o dia com mais disposição e apoiar hábitos que favoreçam o metabolismo e o controle da fome.",
    teas: [
      { id: "cha-05-ativar", shortPhrase: "Para começar o dia com mais energia." },
      { id: "cha-06-energia-natural", shortPhrase: "Para apoiar disposição e uma rotina mais ativa." },
    ],
  },
];

type ShakeGoalKey = "saciedade" | "fortalecer" | "energia";

interface ShakeGoal {
  key: ShakeGoalKey;
  emoji: string;
  title: string;
  subtitle: string;
  pageTitle: string;
  intro: string;
  // shortPhrase é conteúdo só do card de prévia (nesta página), não faz parte do FoodItem/Drawer compartilhado.
  shakes: { id: string; shortPhrase: string }[];
}

const SHAKE_GOALS: ShakeGoal[] = [
  {
    key: "saciedade",
    emoji: "🍽️",
    title: "Saciedade",
    subtitle: "Para controlar a fome entre as refeições e reduzir a vontade de doces.",
    pageTitle: "Saciedade",
    intro:
      "Ajudar a controlar a fome entre as refeições, reduzir a vontade de doces e facilitar uma rotina alimentar mais equilibrada.",
    shakes: [
      { id: "shake-01-saciedade", shortPhrase: "Para prolongar a saciedade e evitar beliscos entre as refeições." },
      { id: "shake-02-fome-controlada", shortPhrase: "Para o período em que costuma aparecer vontade de comer doces." },
    ],
  },
  {
    key: "fortalecer",
    emoji: "💪",
    title: "Fortalecer o Corpo",
    subtitle: "Para apoiar a ingestão de proteínas, a massa muscular e o metabolismo.",
    pageTitle: "Fortalecer o Corpo",
    intro: "Ajudar na ingestão de proteínas e nutrientes importantes para preservar a massa muscular e apoiar o metabolismo.",
    shakes: [
      { id: "shake-03-proteico", shortPhrase: "Para aumentar de forma prática a ingestão de proteínas do dia." },
      { id: "shake-04-recuperacao", shortPhrase: "Para apoiar recuperação, energia e nutrição depois dos exercícios." },
    ],
  },
  {
    key: "energia",
    emoji: "⚡",
    title: "Energia e Metabolismo",
    subtitle: "Para começar o dia com mais disposição e apoiar uma rotina ativa.",
    pageTitle: "Energia e Metabolismo",
    intro: "Começar o dia com mais disposição e apoiar hábitos que favoreçam o metabolismo.",
    shakes: [
      { id: "shake-05-energia", shortPhrase: "Para começar a manhã com mais praticidade e disposição." },
      { id: "shake-06-manha-ativa", shortPhrase: "Para apoiar o intestino e começar o dia com uma opção nutritiva." },
    ],
  },
];

function BebidasPage() {
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<GoalKey | null>(null);
  const [selectedShakeGoal, setSelectedShakeGoal] = useState<ShakeGoalKey | null>(null);

  const activeGoal = GOALS.find((g) => g.key === selectedGoal) ?? null;
  const activeShakeGoal = SHAKE_GOALS.find((g) => g.key === selectedShakeGoal) ?? null;

  const openTeaGoal = (key: GoalKey) => {
    setSelectedShakeGoal(null);
    setSelectedGoal(key);
  };
  const openShakeGoal = (key: ShakeGoalKey) => {
    setSelectedGoal(null);
    setSelectedShakeGoal(key);
  };

  const pageTitle = activeGoal
    ? activeGoal.pageTitle
    : activeShakeGoal
      ? activeShakeGoal.pageTitle
      : "Ferramentas Funcionais";
  const pageSubtitle = activeGoal
    ? activeGoal.intro
    : activeShakeGoal
      ? activeShakeGoal.intro
      : "Escolha conforme o que seu corpo precisa hoje.";

  return (
    <AppShell title={pageTitle} subtitle={pageSubtitle} back="/alimentacao">
      {activeGoal ? (
        <>
          <ul className="grid gap-2">
            {activeGoal.teas.map((tea) => {
              const item = DRINKS.find((d) => d.id === tea.id);
              if (!item) return null;
              return (
                <li key={tea.id}>
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface-2 p-3 text-left hover:bg-surface"
                  >
                    {item.image ? (
                      <img
                        src={encodeURI(item.image)}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="block text-xs text-text-muted">{item.category}</span>
                      <span className="mt-0.5 block text-xs text-text-secondary">{tea.shortPhrase}</span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setSelectedGoal(null)}
            className="mt-4 inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={14} aria-hidden /> Voltar aos objetivos
          </button>
        </>
      ) : activeShakeGoal ? (
        <>
          <ul className="grid gap-2">
            {activeShakeGoal.shakes.map((shake) => {
              const item = DRINKS.find((d) => d.id === shake.id);
              if (!item) return null;
              return (
                <li key={shake.id}>
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface-2 p-3 text-left hover:bg-surface"
                  >
                    {item.image ? (
                      <img
                        src={encodeURI(item.image)}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="block text-xs text-text-muted">{item.category}</span>
                      <span className="mt-0.5 block text-xs text-text-secondary">{shake.shortPhrase}</span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setSelectedShakeGoal(null)}
            className="mt-4 inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={14} aria-hidden /> Voltar aos objetivos
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-text-secondary">
            Encontre opções para apoiar sono, saciedade, energia, digestão e uma rotina mais favorável ao seu objetivo de
            perder barriga.
          </p>

          <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Chás Funcionais</h2>
            <p className="mt-1 text-xs text-text-secondary">
              Escolha um objetivo e encontre a opção mais adequada para o seu momento.
            </p>
            <ul className="mt-4 grid gap-2">
              {GOALS.map((g) => (
                <li key={g.key}>
                  <button
                    type="button"
                    onClick={() => openTeaGoal(g.key)}
                    className="flex min-h-16 w-full items-center gap-3 rounded-xl border border-border bg-surface-2 p-4 text-left hover:bg-surface"
                  >
                    <span className="text-xl" aria-hidden>
                      {g.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{g.title}</span>
                      <span className="block text-xs text-text-secondary">{g.subtitle}</span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Shakes Funcionais</h2>
            <p className="mt-1 text-xs text-text-secondary">
              Escolha um objetivo e encontre uma opção prática para o seu momento.
            </p>
            <ul className="mt-4 grid gap-2">
              {SHAKE_GOALS.map((g) => (
                <li key={g.key}>
                  <button
                    type="button"
                    onClick={() => openShakeGoal(g.key)}
                    className="flex min-h-16 w-full items-center gap-3 rounded-xl border border-border bg-surface-2 p-4 text-left hover:bg-surface"
                  >
                    <span className="text-xl" aria-hidden>
                      {g.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{g.title}</span>
                      <span className="block text-xs text-text-secondary">{g.subtitle}</span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-4 grid gap-4">
            {CATEGORIES.filter((cat) => cat.title !== "Chás" && cat.title !== "Shakes").map((cat) => (
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
        </>
      )}

      <FoodItemDrawer item={openItem} onOpenChange={(open) => { if (!open) setOpenItem(null); }} />
    </AppShell>
  );
}
