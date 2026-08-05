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
const LUNCH_IMG = "/imagens/biblioteca/almoço/";
const SNACK_IMG = "/imagens/biblioteca/lanche/";

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
    id: "almoco-01-frango-grelhado-legumes-salada",
    category: "Almoço",
    name: "Frango Grelhado com Legumes e Salada",
    tags: ["completas", "leves", "vegetais"],
    cover: "warm",
    image: `${LUNCH_IMG}1- frango grelhado com legumes e saladas.png`,
    ingredients:
      "• 1 filé médio de frango\n• Brócolis cozido\n• Cenoura em rodelas ou ralada\n• Tomate\n• Alface ou folhas de sua preferência\n• 1 fio de azeite de oliva\n• Sal, alho e ervas a gosto",
    method:
      "Tempere o frango com alho, ervas e uma pitada de sal. Grelhe até dourar dos dois lados. Cozinhe os legumes até ficarem macios, sem desmanchar. Monte o prato com o frango, os legumes e a salada fresca. Finalize com um fio de azeite.",
    swaps:
      "• Frango por peixe, ovos, patinho moído ou tofu\n• Brócolis por couve-flor, abobrinha, vagem ou chuchu\n• Cenoura por abóbora ou beterraba\n• Alface por rúcula, agrião ou repolho",
    time: "20 minutos",
    whyPoints: [
      {
        title: "Ajuda a controlar a fome por mais tempo",
        body: "A proteína do frango aumenta a saciedade e ajuda a reduzir a vontade de beliscar entre as refeições, facilitando o controle das porções ao longo do dia.",
      },
      {
        title: "Favorece uma barriga mais leve",
        body: "Os legumes e as folhas fornecem fibras e água, ajudando o intestino a funcionar melhor e contribuindo para reduzir a sensação de inchaço abdominal.",
      },
      {
        title: "Apoia o metabolismo durante o emagrecimento",
        body: "Consumir proteína regularmente ajuda a preservar a massa muscular, importante para manter um metabolismo mais ativo, especialmente depois dos 40 anos.",
      },
    ],
    practicalNote:
      "Um almoço simples, rápido e nutritivo que ajuda a controlar a fome, reduzir o inchaço e manter o foco no emagrecimento sem complicar a rotina.",
  },
  {
    id: "almoco-02-peixe-assado-legumes",
    category: "Almoço",
    name: "Peixe Assado com Legumes",
    tags: ["completas", "leves", "vegetais"],
    cover: "green",
    image: `${LUNCH_IMG}2- peixe assado com legumes.png`,
    ingredients:
      "• 1 filé de peixe (tilápia, pescada ou outro de sua preferência)\n• Abobrinha em rodelas\n• Cenoura em tiras\n• Brócolis cozido\n• Limão\n• 1 fio de azeite de oliva\n• Sal, alho e ervas a gosto",
    method:
      "Tempere o peixe com limão, alho, ervas e uma pitada de sal. Leve ao forno ou à air fryer até ficar macio e levemente dourado. Cozinhe ou asse os legumes até ficarem al dente. Monte o prato com o peixe e os legumes. Finalize com um fio de azeite.",
    swaps:
      "• Peixe por frango grelhado, ovos ou tofu\n• Abobrinha por chuchu, vagem ou berinjela\n• Brócolis por couve-flor ou repolho\n• Limão por ervas frescas ou temperos naturais",
    time: "25 minutos",
    whyPoints: [
      {
        title: "Proteína que ajuda a preservar os músculos",
        body: "O peixe fornece proteína de alta qualidade, importante para manter a massa muscular e favorecer um metabolismo mais ativo durante o emagrecimento.",
      },
      {
        title: "Mais leve para o organismo",
        body: "Os legumes aumentam o consumo de fibras e água, favorecendo uma digestão mais leve e ajudando a reduzir a sensação de inchaço abdominal.",
      },
      {
        title: "Gorduras boas para a saúde",
        body: "O peixe fornece nutrientes importantes para o coração, o cérebro e o equilíbrio do organismo, especialmente após os 40 anos.",
      },
    ],
    practicalNote:
      "Uma refeição leve, nutritiva e fácil de preparar que ajuda a controlar a fome, diminuir o inchaço e manter o foco na perda de barriga.",
  },
  {
    id: "almoco-03-carne-magra-abobora-brocolis",
    category: "Almoço",
    name: "Carne Magra com Abóbora e Brócolis",
    tags: ["completas", "leves", "vegetais"],
    cover: "warm",
    image: `${LUNCH_IMG}3- carne magra com abóbora e brócolis.png`,
    ingredients:
      "• 1 bife médio de patinho grelhado\n• Abóbora cozida em cubos\n• Brócolis cozido\n• Tomate\n• Folhas verdes de sua preferência\n• 1 fio de azeite de oliva\n• Sal, alho e ervas a gosto",
    method:
      "Tempere a carne com alho, ervas e uma pitada de sal. Grelhe até atingir o ponto desejado. Cozinhe a abóbora e o brócolis até ficarem macios. Monte o prato com a carne, os legumes e a salada. Finalize com um fio de azeite.",
    swaps:
      "• Patinho por frango, peixe, ovos ou tofu\n• Abóbora por batata-doce, mandioca ou cenoura\n• Brócolis por couve-flor, vagem ou abobrinha\n• Folhas verdes por rúcula, agrião ou repolho",
    time: "25 minutos",
    whyPoints: [
      {
        title: "Proteína que ajuda a preservar os músculos",
        body: "A carne magra fornece proteína e ferro, nutrientes importantes para preservar a massa muscular e dar mais suporte ao metabolismo durante o emagrecimento.",
      },
      {
        title: "Energia sem pesar",
        body: "A abóbora é uma fonte de carboidratos de boa qualidade e fibras, ajudando a manter a energia ao longo da tarde sem aumentar excessivamente as calorias da refeição.",
      },
      {
        title: "Alimentação mais anti-inflamatória",
        body: "Brócolis, folhas e vegetais oferecem fibras, vitaminas e antioxidantes que ajudam a reduzir o estresse oxidativo e favorecem uma alimentação mais equilibrada.",
      },
    ],
    practicalNote:
      "Um almoço simples e nutritivo que ajuda a manter a saciedade, oferece energia para o restante do dia e facilita a perda de barriga sem abrir mão de uma refeição saborosa.",
  },
  {
    id: "almoco-04-frango-desfiado-pure-batata-doce",
    category: "Almoço",
    name: "Frango Desfiado com Purê de Batata-Doce",
    tags: ["completas", "vegetais"],
    cover: "green",
    image: `${LUNCH_IMG}4- frango desfiado com pure de batata doce.png`,
    ingredients:
      "• 1 porção de frango desfiado\n• 1 batata-doce média\n• Mix de folhas verdes\n• Tomate em cubos\n• 1 fio de azeite de oliva\n• Sal, alho e ervas a gosto",
    method:
      "Cozinhe a batata-doce e amasse até formar um purê. Refogue o frango desfiado com alho, cebola e ervas. Monte o prato com o purê, o frango e a salada. Tempere a salada com um fio de azeite. Sirva ainda quente.",
    swaps:
      "• Frango por patinho moído, peixe ou ovos\n• Batata-doce por mandioca, inhame ou abóbora\n• Folhas verdes por rúcula, agrião ou alface\n• Tomate por cenoura ralada ou pepino",
    time: "25 minutos",
    whyPoints: [
      {
        title: "Saciedade que dura por mais tempo",
        body: "O frango fornece proteína de alta qualidade, ajudando a controlar a fome e diminuindo a vontade de beliscar entre as refeições.",
      },
      {
        title: "Energia mais estável ao longo da tarde",
        body: "A batata-doce fornece carboidratos de digestão mais gradual, ajudando a evitar oscilações rápidas de energia e mantendo maior disposição.",
      },
      {
        title: "Ajuda a preservar a massa muscular",
        body: "Consumir proteína em quantidade adequada durante o almoço favorece a manutenção da massa muscular, importante para um metabolismo mais ativo depois dos 40 anos.",
      },
    ],
    practicalNote:
      "Uma refeição prática que sustenta por mais tempo, reduz a fome nas horas seguintes e ajuda a manter o foco no emagrecimento sem abrir mão do sabor.",
  },
  {
    id: "almoco-05-carne-moida-arroz-legumes",
    category: "Almoço",
    name: "Carne Moída com Arroz e Legumes",
    tags: ["completas", "rapidas", "vegetais"],
    cover: "warm",
    image: `${LUNCH_IMG}5- carne moida com arroz e legumes.png`,
    ingredients:
      "• 1 porção de patinho moído refogado\n• 3 colheres (sopa) de arroz\n• Abobrinha em cubos\n• Cenoura ralada\n• Mix de folhas verdes\n• 1 fio de azeite de oliva\n• Sal, alho e ervas a gosto",
    method:
      "Refogue a carne moída com alho, cebola e ervas. Cozinhe o arroz normalmente. Refogue rapidamente a abobrinha e a cenoura. Monte o prato com o arroz, a carne, os legumes e a salada. Finalize com um fio de azeite.",
    swaps:
      "• Patinho por frango desfiado, peixe ou ovos\n• Arroz por arroz integral, quinoa ou batata-doce\n• Abobrinha por chuchu, berinjela ou vagem\n• Cenoura por abóbora ou beterraba",
    time: "20 minutos",
    whyPoints: [
      {
        title: "Proteína que ajuda a controlar a fome",
        body: "A carne magra fornece proteína de qualidade, aumentando a saciedade e ajudando a reduzir a vontade de beliscar ao longo da tarde.",
      },
      {
        title: "Energia equilibrada durante o dia",
        body: "A combinação de arroz, vegetais e proteína fornece energia de forma mais constante, favorecendo uma rotina com menos oscilações de fome.",
      },
      {
        title: "Mais fibras para uma barriga mais leve",
        body: "Os legumes aumentam o consumo de fibras, favorecem o funcionamento do intestino e ajudam a reduzir a sensação de inchaço abdominal.",
      },
    ],
    practicalNote:
      "Um almoço fácil de preparar, nutritivo e muito versátil, que ajuda a controlar a fome, manter a energia e facilitar o emagrecimento sem complicar a rotina.",
  },
  {
    id: "almoco-06-omelete-completa-salada",
    category: "Almoço",
    name: "Omelete Completa com Salada",
    tags: ["rapidas", "leves", "poucos-ingredientes", "vegetais"],
    cover: "green",
    image: `${LUNCH_IMG}6- omelete completa com salada.png`,
    ingredients:
      "• 2 ovos\n• Queijo branco em cubos\n• Tomate picado\n• Cebola picada\n• Orégano ou ervas a gosto\n• Mix de folhas verdes\n• 1 fio de azeite de oliva",
    method:
      "Bata os ovos e misture o tomate, a cebola, o queijo e os temperos. Cozinhe em uma frigideira antiaderente até dourar dos dois lados. Prepare a salada com as folhas e um fio de azeite. Sirva a omelete acompanhada da salada. Se desejar, acrescente legumes cozidos como acompanhamento.",
    swaps:
      "• Queijo branco por cottage, ricota ou muçarela light\n• Tomate por espinafre, brócolis ou abobrinha\n• Folhas verdes por rúcula, agrião ou alface\n• Ovos por tofu mexido",
    time: "15 minutos",
    whyPoints: [
      {
        title: "Proteína que aumenta a saciedade",
        body: "Os ovos fornecem proteína de alta qualidade, ajudando a controlar a fome e facilitando o consumo de porções mais equilibradas ao longo do dia.",
      },
      {
        title: "Poucos carboidratos e muitos vegetais",
        body: "A combinação de ovos com salada aumenta o volume da refeição sem pesar, favorecendo uma alimentação rica em fibras e ajudando a reduzir o inchaço abdominal.",
      },
      {
        title: "Alimentação mais anti-inflamatória",
        body: "Os vegetais fornecem vitaminas, minerais e antioxidantes que ajudam a proteger o organismo e favorecem uma alimentação mais equilibrada depois dos 40 anos.",
      },
    ],
    practicalNote:
      "Uma refeição rápida, prática e muito satisfatória para os dias corridos, ajudando a controlar a fome e manter o foco na perda de barriga.",
  },
  {
    id: "almoco-07-macarrao-integral-frango-legumes",
    category: "Almoço",
    name: "Macarrão Integral com Frango e Legumes",
    tags: ["completas", "rapidas", "vegetais"],
    cover: "warm",
    image: `${LUNCH_IMG}7- macarrão integral com frango e legumes.png`,
    ingredients:
      "• 1 xícara de macarrão integral cozido\n• 1 filé de frango em cubos\n• Abobrinha em cubos\n• Cenoura ralada\n• Tomate-cereja ou tomate picado\n• 1 fio de azeite de oliva\n• Alho, ervas e sal a gosto",
    method:
      "Cozinhe o macarrão conforme as instruções da embalagem. Grelhe o frango temperado até dourar. Refogue rapidamente a abobrinha e a cenoura. Misture o macarrão com o frango e os legumes. Finalize com tomate e um fio de azeite.",
    swaps:
      "• Frango por patinho moído, atum ou tofu\n• Macarrão integral por macarrão tradicional ou de grão-de-bico\n• Abobrinha por brócolis, vagem ou berinjela\n• Tomate por pimentão ou ervilhas",
    time: "20 minutos",
    whyPoints: [
      {
        title: "Mais equilíbrio para controlar a fome",
        body: "Quando o macarrão é combinado com proteína e vegetais, a refeição fica mais completa e ajuda a prolongar a saciedade, evitando exageros nas próximas refeições.",
      },
      {
        title: "Proteína que apoia o emagrecimento",
        body: "O frango ajuda a preservar a massa muscular durante a perda de peso, contribuindo para manter um metabolismo mais ativo.",
      },
      {
        title: "Mais fibras para uma digestão leve",
        body: "Os legumes aumentam o consumo de fibras, favorecem o funcionamento do intestino e ajudam a reduzir a sensação de barriga estufada.",
      },
    ],
    practicalNote:
      "Você continua comendo alimentos que gosta, mas em uma combinação mais equilibrada, que ajuda a controlar a fome e facilita manter o plano por mais tempo.",
  },
  {
    id: "almoco-08-file-grelhado-arroz-feijao-salada",
    category: "Almoço",
    name: "Filé Grelhado com Arroz, Feijão e Salada",
    tags: ["completas", "rapidas", "vegetais"],
    cover: "green",
    image: `${LUNCH_IMG}8- file grelhado com arroz e feijão.png`,
    ingredients:
      "• 1 filé médio de carne magra grelhada\n• 3 colheres (sopa) de arroz\n• 1 concha pequena de feijão\n• Alface ou folhas verdes\n• Tomate\n• Pepino em rodelas\n• 1 fio de azeite de oliva",
    method:
      "Tempere a carne com alho, ervas e uma pitada de sal. Grelhe até dourar dos dois lados. Prepare o arroz e o feijão normalmente. Monte o prato com a carne, o arroz, o feijão e a salada. Finalize a salada com um fio de azeite.",
    swaps:
      "• Carne por frango, peixe ou ovos\n• Arroz por arroz integral, quinoa ou batata-doce\n• Feijão por lentilha, grão-de-bico ou ervilha\n• Pepino por cenoura, beterraba ou repolho",
    time: "20 minutos",
    whyPoints: [
      {
        title: "Mais saciedade para evitar exageros",
        body: "A combinação de carne magra, arroz e feijão forma uma refeição equilibrada que ajuda a controlar a fome e reduz a vontade de beliscar durante a tarde.",
      },
      {
        title: "Energia para o restante do dia",
        body: "O arroz e o feijão fornecem energia de forma equilibrada quando consumidos em porções adequadas e acompanhados de proteína e vegetais.",
      },
      {
        title: "Mais fibras para reduzir o inchaço",
        body: "A salada aumenta o consumo de fibras e água, favorecendo o funcionamento do intestino e ajudando a manter a barriga mais leve.",
      },
    ],
    practicalNote:
      "Você continua comendo o tradicional arroz com feijão, mas em uma versão equilibrada, que ajuda a emagrecer sem abrir mão dos alimentos que fazem parte da rotina.",
  },
  {
    id: "almoco-09-escondidinho-frango-batata-doce",
    category: "Almoço",
    name: "Escondidinho de Frango com Batata-Doce",
    tags: ["completas"],
    cover: "warm",
    image: `${LUNCH_IMG}9- escondidinho de frango com batata doce.png`,
    ingredients:
      "• 1 peito de frango desfiado\n• 1 batata-doce média\n• Queijo ralado opcional, em pequena quantidade\n• Tomate picado\n• Cebola picada\n• Alho, ervas e sal a gosto\n• 1 fio de azeite de oliva",
    method:
      "Cozinhe a batata-doce e amasse até formar um purê. Refogue o frango desfiado com alho, cebola, tomate e ervas. Em um refratário, faça uma camada de purê, outra de frango e finalize com o restante do purê. Se desejar, acrescente um pouco de queijo ralado por cima. Leve ao forno apenas para aquecer e dourar levemente.",
    swaps:
      "• Frango por patinho moído, carne desfiada ou tofu\n• Batata-doce por mandioca, abóbora ou inhame\n• Queijo ralado por cottage ou ricota\n• Tomate por cenoura ralada ou milho",
    time: "30 minutos",
    whyPoints: [
      {
        title: "Mais saciedade sem exagerar nas calorias",
        body: "O frango fornece proteína de qualidade, ajudando a controlar a fome e facilitando o emagrecimento sem abrir mão de uma refeição saborosa.",
      },
      {
        title: "Energia para o dia sem excessos",
        body: "A batata-doce fornece carboidratos de digestão mais gradual, ajudando a manter a energia por mais tempo e reduzindo a vontade de beliscar.",
      },
      {
        title: "Ajuda a preservar a massa muscular",
        body: "Consumir proteína em quantidade adequada durante o almoço favorece a manutenção da massa muscular, importante para um metabolismo mais ativo depois dos 40 anos.",
      },
    ],
    practicalNote:
      "Uma versão mais equilibrada de um prato que muitas pessoas já gostam, mostrando que é possível emagrecer sem abrir mão de receitas tradicionais.",
  },
  {
    id: "lanche-01-iogurte-fruta-aveia-canela",
    category: "Lanches",
    name: "Iogurte com Fruta, Aveia e Canela",
    tags: ["rapidas", "leves", "poucos-ingredientes"],
    cover: "warm",
    image: `${SNACK_IMG}1- iogurte com fruta.png`,
    ingredients: "• 1 pote de iogurte natural sem açúcar\n• 1 fruta picada\n• 1 colher (sopa) de aveia\n• Canela a gosto\n• Chia opcional",
    method:
      "Coloque o iogurte em uma tigela.\nAcrescente a fruta picada e a aveia.\nFinalize com canela.\nMisture e consuma imediatamente ou deixe alguns minutos na geladeira.",
    swaps:
      "• Iogurte natural por kefir ou versão sem lactose\n• Fruta por banana, mamão, maçã, pera ou morangos\n• Aveia por chia ou linhaça moída\n• Canela por cacau em pó sem açúcar",
    time: "3 minutos",
    whyPoints: [
      {
        title: "Ajuda a controlar a fome e a vontade de doce",
        body: "As fibras da fruta e da aveia tornam o lanche mais satisfatório e ajudam a evitar que a fome retorne rapidamente.",
      },
      {
        title: "Favorece o intestino e uma barriga mais leve",
        body: "O iogurte fermentado e as fibras contribuem para a regularidade intestinal, importante para reduzir a sensação de barriga presa e estufada.",
      },
      {
        title: "Oferece proteína e cálcio depois dos 40",
        body: "O iogurte acrescenta nutrientes importantes para a manutenção dos músculos e da saúde óssea.",
      },
    ],
    practicalNote:
      "Um lanche rápido que segura melhor a fome, reduz a procura por doces e ainda ajuda a cuidar do intestino, dos músculos e dos ossos.",
  },
  {
    id: "lanche-02-pao-integral-frango-desfiado",
    category: "Lanches",
    name: "Pão Integral com Frango Desfiado",
    tags: ["rapidas", "completas", "vegetais"],
    cover: "green",
    image: `${SNACK_IMG}2- pão integral com frango desfiado.png`,
    ingredients:
      "• 2 fatias de pão integral\n• 1/2 xícara de frango desfiado\n• Tomate em rodelas\n• Alface\n• 1 colher (sopa) de ricota ou cottage, opcional\n• Orégano a gosto",
    method:
      "Monte o pão com o frango desfiado, o tomate, a alface e, se desejar, a ricota ou o cottage.\nFeche o sanduíche e sirva imediatamente.\nSe preferir, aqueça rapidamente na frigideira para ficar levemente crocante.",
    swaps:
      "• Pão integral por pão de forma tradicional, pão francês ou tapioca\n• Frango desfiado por atum, ovos mexidos ou carne desfiada\n• Ricota por queijo branco ou cottage\n• Alface por rúcula ou agrião",
    time: "10 minutos",
    whyPoints: [
      {
        title: "Ajuda a controlar a fome por mais tempo",
        body: "O frango fornece proteína de alta qualidade, aumentando a saciedade e ajudando a reduzir a vontade de beliscar até a próxima refeição.",
      },
      {
        title: "Energia sem pesar",
        body: "O pão integral fornece energia de forma gradual quando combinado com proteína, favorecendo maior disposição durante a tarde.",
      },
      {
        title: "Mais fibras para uma digestão leve",
        body: "O pão integral e os vegetais aumentam o consumo de fibras, contribuindo para o funcionamento do intestino e ajudando a diminuir a sensação de barriga estufada.",
      },
    ],
    practicalNote:
      "Uma opção prática para levar ao trabalho ou preparar em poucos minutos, ajudando a controlar a fome e manter a alimentação equilibrada mesmo nos dias mais corridos.",
  },
  {
    id: "lanche-03-ovos-cozidos-tomate-fruta",
    category: "Lanches",
    name: "Ovos Cozidos com Tomate e Fruta",
    tags: ["rapidas", "completas", "poucos-ingredientes"],
    cover: "warm",
    image: `${SNACK_IMG}3- ovos cozidos com tomate.png`,
    ingredients: "• 2 ovos cozidos\n• 1 tomate em rodelas\n• 1 fruta de sua preferência\n• Orégano ou ervas a gosto\n• 1 pitada de sal",
    method:
      "Cozinhe os ovos até ficarem firmes.\nCorte o tomate em rodelas.\nTempere com orégano e uma pitada de sal.\nSirva acompanhado da fruta.",
    swaps:
      "• Ovos por queijo branco, cottage ou atum\n• Tomate por pepino ou cenoura em palitos\n• Fruta por maçã, pera, banana, mamão ou uvas\n• Orégano por cheiro-verde ou manjericão",
    time: "10 minutos",
    whyPoints: [
      {
        title: "Proteína que ajuda a controlar a fome",
        body: "Os ovos aumentam a saciedade e ajudam a reduzir a vontade de beliscar entre as refeições, favorecendo um melhor controle alimentar.",
      },
      {
        title: "Mais equilíbrio para a vontade de doce",
        body: "A fruta oferece fibras e doçura natural, ajudando a diminuir a vontade de consumir doces e alimentos ultraprocessados.",
      },
      {
        title: "Ajuda a preservar a massa muscular",
        body: "Consumir proteína ao longo do dia contribui para manter a massa muscular, importante para um metabolismo mais ativo depois dos 40 anos.",
      },
    ],
    practicalNote:
      "Um lanche simples, nutritivo e muito fácil de preparar, ideal para manter a saciedade e evitar escolhas impulsivas quando a fome aparece.",
  },
  {
    id: "lanche-04-mix-castanhas-maca",
    category: "Lanches",
    name: "Mix de Castanhas com Maçã",
    tags: ["rapidas", "leves", "poucos-ingredientes"],
    cover: "green",
    image: `${SNACK_IMG}4- mix castanhas com maça.png`,
    ingredients: "• 1 maçã média\n• 1 pequeno punhado de castanhas, como castanha-do-pará, castanha de caju ou nozes\n• Canela a gosto, opcional",
    method:
      "Lave e corte a maçã em fatias.\nSepare uma pequena porção de castanhas.\nSe desejar, polvilhe canela sobre a maçã.\nConsuma junto.",
    swaps: "• Maçã por pera, ameixa ou pêssego\n• Castanhas por amêndoas ou amendoim sem sal\n• Canela por cacau em pó sem açúcar",
    time: "2 minutos",
    whyPoints: [
      {
        title: "Gorduras boas para maior saciedade",
        body: "As castanhas fornecem gorduras saudáveis que ajudam a prolongar a saciedade e tornam o lanche mais satisfatório.",
      },
      {
        title: "Mais fibras para controlar a fome",
        body: "A maçã é rica em fibras, ajudando a reduzir a vontade de beliscar e favorecendo uma digestão mais equilibrada.",
      },
      {
        title: "Antioxidantes para a saúde",
        body: "A maçã e as oleaginosas fornecem compostos antioxidantes que ajudam a proteger as células e contribuem para uma alimentação mais saudável.",
      },
    ],
    practicalNote:
      "Perfeito para carregar na bolsa ou deixar no trabalho. Não precisa de preparo e ajuda a evitar salgadinhos, biscoitos e doces quando a fome aparece.",
  },
  {
    id: "lanche-05-queijo-branco-tomate-oregano",
    category: "Lanches",
    name: "Queijo Branco com Tomate e Orégano",
    tags: ["rapidas", "leves", "poucos-ingredientes", "vegetais"],
    cover: "warm",
    image: `${SNACK_IMG}5- queijo branco com tomate e oregano.png`,
    ingredients: "• 2 fatias de queijo branco\n• 1 tomate em rodelas\n• Orégano a gosto\n• 1 fio de azeite de oliva, opcional",
    method: "Corte o queijo e o tomate em fatias.\nDisponha em um prato alternando as fatias.\nTempere com orégano.\nSe desejar, finalize com um fio de azeite.",
    swaps:
      "• Queijo branco por ricota ou cottage\n• Tomate por pepino ou cenoura em rodelas\n• Orégano por manjericão ou cheiro-verde\n• Azeite por algumas gotas de limão",
    time: "5 minutos",
    whyPoints: [
      {
        title: "Proteína para controlar a fome",
        body: "O queijo branco ajuda a prolongar a saciedade, diminuindo a vontade de beliscar até a próxima refeição.",
      },
      {
        title: "Cálcio importante depois dos 40",
        body: "Além da proteína, fornece cálcio, nutriente essencial para a saúde dos ossos, especialmente durante o envelhecimento.",
      },
      {
        title: "Refeição leve e refrescante",
        body: "O tomate acrescenta água, vitaminas e antioxidantes, tornando o lanche leve e agradável para os dias mais quentes.",
      },
    ],
    practicalNote:
      "Quando a fome aparece e você quer algo rápido, essa combinação fica pronta em poucos minutos e ajuda a evitar escolhas mais calóricas.",
  },
  {
    id: "lanche-06-salada-frutas-granola-chia",
    category: "Lanches",
    name: "Salada de Frutas com Granola e Chia",
    tags: ["rapidas", "leves", "poucos-ingredientes"],
    cover: "green",
    image: `${SNACK_IMG}6- salada de fruta com granola e chia.png`,
    ingredients:
      "• 1/2 banana em rodelas\n• 1/2 maçã em cubos\n• 1 fatia de mamão em cubos\n• 2 colheres (sopa) de granola sem açúcar\n• 1 colher (chá) de chia",
    method: "Corte as frutas em pedaços pequenos.\nColoque tudo em uma tigela.\nAcrescente a granola.\nFinalize com a chia.\nMisture levemente e sirva.",
    swaps:
      "• Banana por pera ou morangos\n• Maçã por manga ou kiwi\n• Mamão por melão ou uvas\n• Granola por aveia em flocos\n• Chia por linhaça moída",
    time: "5 minutos",
    whyPoints: [
      {
        title: "Rica em vitaminas e antioxidantes",
        body: "A combinação de frutas fornece vitaminas, minerais e antioxidantes que ajudam a proteger o organismo e favorecem uma alimentação mais nutritiva.",
      },
      {
        title: "Mais fibras para uma digestão equilibrada",
        body: "As frutas, a granola e a chia aumentam o consumo de fibras, ajudando o intestino a funcionar melhor e contribuindo para uma sensação de barriga mais leve.",
      },
      {
        title: "Ajuda a controlar a vontade de doces",
        body: "O sabor naturalmente doce das frutas ajuda a reduzir a vontade de consumir sobremesas e alimentos ultraprocessados ao longo do dia.",
      },
    ],
    practicalNote:
      "Quando bater aquela vontade de comer um doce, essa é uma alternativa saborosa, refrescante e fácil de preparar, que ajuda a manter a alimentação equilibrada sem abrir mão do prazer de comer.",
  },
  {
    id: "lanche-07-torrada-pastinha-berinjela",
    category: "Lanches",
    name: "Torrada Integral com Pastinha de Berinjela",
    tags: ["leves", "vegetais"],
    cover: "warm",
    image: `${SNACK_IMG}7- torrada integral com pastinha de berinjela.png`,
    ingredients:
      "Para a pastinha:\n• 1 berinjela média\n• 1 colher (sopa) de azeite de oliva\n• 1 dente de alho picado\n• Suco de 1/2 limão\n• Orégano ou ervas finas a gosto\n• 1 pitada de sal\n\nPara servir:\n• 2 torradas integrais",
    method:
      "Cozinhe ou asse a berinjela até ficar bem macia.\nRetire a polpa e coloque em um recipiente.\nAmasse com um garfo.\nMisture o alho, o limão, o azeite, as ervas e uma pitada de sal.\nPasse a pastinha sobre as torradas integrais e sirva.",
    swaps:
      "• Torradas integrais por pão integral ou pão sírio integral\n• Berinjela por abobrinha assada\n• Limão por vinagre de maçã\n• Orégano por cheiro-verde ou manjericão",
    time: "15 minutos",
    whyPoints: [
      {
        title: "Rica em fibras para maior saciedade",
        body: "A berinjela ajuda a aumentar o consumo de fibras, contribuindo para controlar a fome entre as refeições.",
      },
      {
        title: "Mais leve para o dia a dia",
        body: "É uma opção com poucos ingredientes e rica em vegetais, ajudando a tornar a alimentação mais equilibrada sem complicar a rotina.",
      },
      {
        title: "Fonte de antioxidantes",
        body: "A berinjela fornece compostos antioxidantes que ajudam a proteger as células e contribuem para uma alimentação mais saudável.",
      },
    ],
    practicalNote:
      "Uma maneira diferente e saborosa de consumir mais vegetais no dia a dia. A pastinha pode ser preparada com antecedência e deixada na geladeira, facilitando lanches rápidos durante a semana.",
  },
  {
    id: "lanche-08-bolo-banana-caseiro-sem-acucar",
    category: "Lanches",
    name: "Bolo de Banana Caseiro sem Açúcar",
    tags: ["completas"],
    cover: "green",
    image: `${SNACK_IMG}8- bolo de banana.png`,
    ingredients: "• 2 bananas maduras\n• 2 ovos\n• 1 xícara de aveia em flocos\n• 1 colher (chá) de fermento em pó\n• Canela a gosto",
    method:
      "Amasse bem as bananas.\nMisture os ovos e a aveia.\nAcrescente a canela e o fermento.\nColoque em uma forma pequena untada ou de silicone.\nAsse em forno preaquecido por aproximadamente 30 minutos.",
    swaps:
      "• Banana por maçã ralada\n• Aveia por farinha de aveia\n• Canela por cacau em pó sem açúcar\n• Forma tradicional por forminhas individuais de silicone",
    time: "40 minutos — rende várias porções para a semana",
    whyPoints: [
      {
        title: "Mata a vontade de comer bolo e doces",
        body: "A doçura natural da banana ajuda a reduzir a vontade de consumir sobremesas e produtos ricos em açúcar.",
      },
      {
        title: "Rico em fibras",
        body: "A aveia aumenta o consumo de fibras, favorecendo uma digestão equilibrada e ajudando na saciedade.",
      },
      {
        title: "Energia para o dia",
        body: "A combinação de banana e aveia fornece energia de forma gradual, ajudando a manter a disposição entre as refeições.",
      },
    ],
    practicalNote:
      "Prepare no início da semana e deixe porções prontas. Assim, quando bater a vontade de um doce, você já terá uma opção prática, saborosa e mais equilibrada esperando por você.",
  },
  {
    id: "lanche-09-sanduiche-integral-atum",
    category: "Lanches",
    name: "Sanduíche Integral de Atum",
    tags: ["rapidas", "completas", "vegetais"],
    cover: "warm",
    image: `${SNACK_IMG}9- sanduiche de atum.png`,
    ingredients:
      "• 2 fatias de pão integral\n• 1 lata de atum em água, escorrido\n• 1 colher (sopa) de iogurte natural ou cottage\n• Alface\n• Tomate em rodelas\n• Cenoura ralada\n• Orégano ou cheiro-verde a gosto",
    method:
      "Escorra bem o atum.\nMisture com o iogurte natural ou cottage e os temperos.\nColoque a pasta sobre uma fatia do pão integral.\nAcrescente a alface, o tomate e a cenoura ralada.\nFeche o sanduíche e sirva.",
    swaps:
      "• Atum por frango desfiado ou sardinha\n• Iogurte natural por cottage ou ricota amassada\n• Pão integral por pão de forma tradicional ou pão sírio\n• Cenoura por pepino ou folhas de rúcula",
    time: "10 minutos",
    whyPoints: [
      {
        title: "Rico em proteína para controlar a fome",
        body: "O atum ajuda a aumentar a saciedade, reduzindo a vontade de beliscar entre as refeições e facilitando o controle das porções ao longo do dia.",
      },
      {
        title: "Energia equilibrada para a rotina",
        body: "O pão integral fornece energia de forma mais gradual quando combinado com proteína e vegetais, ajudando a manter a disposição por mais tempo.",
      },
      {
        title: "Uma refeição prática e completa",
        body: "A combinação de proteína, vegetais e fibras torna o lanche mais equilibrado, nutritivo e fácil de incluir na rotina.",
      },
    ],
    practicalNote:
      "Uma excelente opção para quem precisa de um lanche rápido, saboroso e fácil de levar para o trabalho. Fica pronto em poucos minutos e ajuda a evitar escolhas menos saudáveis quando a fome aparece.",
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

// Rotação oficial dos almoços ao longo dos 21 dias — cada número referencia um dos 9 almoços oficiais.
const LUNCH_ID_BY_NUMBER: Record<number, string> = {
  1: "almoco-01-frango-grelhado-legumes-salada",
  2: "almoco-02-peixe-assado-legumes",
  3: "almoco-03-carne-magra-abobora-brocolis",
  4: "almoco-04-frango-desfiado-pure-batata-doce",
  5: "almoco-05-carne-moida-arroz-legumes",
  6: "almoco-06-omelete-completa-salada",
  7: "almoco-07-macarrao-integral-frango-legumes",
  8: "almoco-08-file-grelhado-arroz-feijao-salada",
  9: "almoco-09-escondidinho-frango-batata-doce",
};

const LUNCH_ROTATION: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [1, 2, 4],
  3: [2, 3, 5],
  4: [1, 3, 6],
  5: [2, 4, 5],
  6: [3, 5, 6],
  7: [1, 4, 6],
  8: [4, 5, 6],
  9: [2, 4, 5],
  10: [3, 5, 6],
  11: [1, 4, 6],
  12: [4, 5, 7],
  13: [5, 6, 8],
  14: [4, 6, 9],
  15: [7, 8, 9],
  16: [5, 7, 8],
  17: [6, 8, 9],
  18: [4, 7, 9],
  19: [1, 7, 8],
  20: [2, 8, 9],
  21: [3, 7, 9],
};

function lunchesForDay(dayId: number): Meal[] {
  const numbers = LUNCH_ROTATION[dayId] ?? LUNCH_ROTATION[1];
  return numbers
    .map((n) => MEALS.find((m) => m.id === LUNCH_ID_BY_NUMBER[n]))
    .filter((m): m is Meal => !!m);
}

// Rotação oficial dos lanches ao longo dos 21 dias — cada número referencia um dos 9 lanches oficiais.
const SNACK_ID_BY_NUMBER: Record<number, string> = {
  1: "lanche-01-iogurte-fruta-aveia-canela",
  2: "lanche-02-pao-integral-frango-desfiado",
  3: "lanche-03-ovos-cozidos-tomate-fruta",
  4: "lanche-04-mix-castanhas-maca",
  5: "lanche-05-queijo-branco-tomate-oregano",
  6: "lanche-06-salada-frutas-granola-chia",
  7: "lanche-07-torrada-pastinha-berinjela",
  8: "lanche-08-bolo-banana-caseiro-sem-acucar",
  9: "lanche-09-sanduiche-integral-atum",
};

const SNACK_ROTATION: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [1, 2, 4],
  3: [2, 3, 5],
  4: [1, 3, 6],
  5: [2, 4, 5],
  6: [3, 5, 6],
  7: [1, 4, 6],
  8: [4, 5, 6],
  9: [2, 4, 5],
  10: [3, 5, 6],
  11: [1, 4, 6],
  12: [4, 5, 7],
  13: [5, 6, 8],
  14: [4, 6, 9],
  15: [7, 8, 9],
  16: [5, 7, 8],
  17: [6, 8, 9],
  18: [4, 7, 9],
  19: [1, 7, 8],
  20: [2, 8, 9],
  21: [3, 7, 9],
};

function snacksForDay(dayId: number): Meal[] {
  const numbers = SNACK_ROTATION[dayId] ?? SNACK_ROTATION[1];
  return numbers
    .map((n) => MEALS.find((m) => m.id === SNACK_ID_BY_NUMBER[n]))
    .filter((m): m is Meal => !!m);
}

function RefeicoesPage() {
  const [state] = useAppState();
  const dayId = activeDay(state);
  const { filtro: filtroRaw } = Route.useSearch();
  const filtro = filtroRaw as FilterKey | undefined;
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);
  const [showAllBreakfasts, setShowAllBreakfasts] = useState(false);
  const [showAllLunches, setShowAllLunches] = useState(false);
  const [showAllSnacks, setShowAllSnacks] = useState(false);

  const todaysBreakfasts = breakfastsForDay(dayId);
  const todaysLunches = lunchesForDay(dayId);
  const todaysSnacks = snacksForDay(dayId);

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
              const isLunch = cat.title === "Almoço";
              const isSnack = cat.title === "Lanches";
              const items = isBreakfast
                ? showAllBreakfasts
                  ? MEALS.filter((m) => m.category === cat.title)
                  : todaysBreakfasts
                : isLunch
                  ? showAllLunches
                    ? MEALS.filter((m) => m.category === cat.title)
                    : todaysLunches
                  : isSnack
                    ? showAllSnacks
                      ? MEALS.filter((m) => m.category === cat.title)
                      : todaysSnacks
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
                    ) : isLunch ? (
                      <button
                        type="button"
                        onClick={() => setShowAllLunches((v) => !v)}
                        className="shrink-0 text-xs font-semibold text-primary hover:underline"
                      >
                        {showAllLunches ? "Ver só os de hoje" : "Ver todos os almoços"}
                      </button>
                    ) : isSnack ? (
                      <button
                        type="button"
                        onClick={() => setShowAllSnacks((v) => !v)}
                        className="shrink-0 text-xs font-semibold text-primary hover:underline"
                      >
                        {showAllSnacks ? "Ver só os de hoje" : "Ver todos os lanches"}
                      </button>
                    ) : null}
                  </div>
                  {(isBreakfast && !showAllBreakfasts) || (isLunch && !showAllLunches) || (isSnack && !showAllSnacks) ? (
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
