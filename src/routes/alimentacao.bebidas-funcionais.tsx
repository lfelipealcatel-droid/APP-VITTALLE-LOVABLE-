import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { FoodItemDrawer, type FoodItem } from "@/components/food-item";

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
const SHOT_IMG = "/imagens/biblioteca/shot/";

// Observação médica padrão, exigida ao final de cada um dos 6 chás.
// Renderizada pelo Drawer no campo dedicado FoodItem.observation, separado de practicalNote.
const TEA_DISCLAIMER =
  "Este chá é uma opção complementar e não substitui orientação ou tratamento médico. Se você está grávida, amamentando, possui alguma doença crônica ou utiliza medicamentos de uso contínuo, converse com seu médico ou nutricionista antes do consumo frequente. Suspenda o uso se sentir qualquer desconforto.";

// Observação padrão dos 6 shakes, também renderizada via FoodItem.observation no Drawer.
const SHAKE_DISCLAIMER =
  "Este shake é uma sugestão de preparo com alimentos comuns e faz parte de uma rotina alimentar equilibrada. Se você possui alergias alimentares, intolerâncias, restrições específicas ou faz acompanhamento nutricional ou médico, adapte os ingredientes conforme a orientação do profissional que acompanha você.";

// Observação padrão dos 6 shots, também renderizada via FoodItem.observation no Drawer.
const SHOT_DISCLAIMER =
  "Este shot é uma opção complementar dentro de uma rotina alimentar equilibrada. Se você está grávida, amamentando, possui alguma doença crônica, sensibilidade digestiva ou utiliza medicamentos de uso contínuo, converse com seu médico ou nutricionista antes do consumo frequente. Suspenda o uso se sentir qualquer desconforto.";

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
    id: "shot-01-bom-dia",
    category: "Limão + Gengibre + Água",
    name: "Shot Bom Dia",
    cover: "warm",
    image: `${SHOT_IMG}1- shot bom dia.png`,
    ingredients: "• 100 ml de água\n• Suco de ½ limão\n• 1 fatia fina de gengibre ralado",
    method: "Misture todos os ingredientes.\nConsumir imediatamente após o preparo.",
    swaps: "• Limão → limão-siciliano\n• Gengibre → hortelã fresca",
    bestMoment: "Ao acordar, cerca de 15 a 20 minutos antes do café da manhã.",
    whyPoints: [
      {
        title: "Mais disposição",
        body: "Começar o dia com ingredientes naturais ajuda você a iniciar a manhã com mais energia e bem-estar.",
      },
      {
        title: "Barriga mais leve",
        body: "Uma boa hidratação logo cedo favorece o funcionamento do organismo e pode ajudar a reduzir a sensação de inchaço.",
      },
      {
        title: "Digestão",
        body: "O gengibre é tradicionalmente utilizado para favorecer o conforto digestivo ao longo do dia.",
      },
    ],
    practicalNote:
      "Ideal para quem costuma acordar com sensação de barriga pesada e quer começar o dia cuidando da saúde desde os primeiros minutos.",
    observation: SHOT_DISCLAIMER,
  },
  {
    id: "shot-02-vitalidade",
    category: "Laranja + Cúrcuma + Pimenta-do-Reino",
    name: "Shot Vitalidade",
    cover: "green",
    image: `${SHOT_IMG}2- shot vitalidade.png`,
    ingredients: "• Suco de ½ laranja\n• ½ colher (chá) de cúrcuma\n• 1 pitada de pimenta-do-reino",
    method: "Misture bem todos os ingredientes.\nConsumir logo após o preparo.",
    swaps: "• Laranja → tangerina\n• Cúrcuma → gengibre",
    bestMoment: "Pela manhã.",
    whyPoints: [
      {
        title: "Antioxidantes",
        body: "A cúrcuma e a laranja fornecem compostos antioxidantes naturalmente presentes nesses alimentos.",
      },
      {
        title: "Energia",
        body: "Uma rotina matinal consistente ajuda você a começar o dia com mais disposição.",
      },
      {
        title: "Desinflamar",
        body: "A cúrcuma é tradicionalmente utilizada em uma alimentação voltada para reduzir processos inflamatórios.",
      },
    ],
    practicalNote: "Excelente para variar o shot da manhã utilizando ingredientes naturais que combinam muito bem entre si.",
    observation: SHOT_DISCLAIMER,
  },
  {
    id: "shot-03-metabolismo",
    category: "Vinagre de Maçã Orgânico + Canela + Água",
    name: "Shot Metabolismo",
    cover: "warm",
    image: `${SHOT_IMG}3- shot metabolismo.png`,
    ingredients: "• 100 ml de água\n• 1 colher (chá) de vinagre de maçã orgânico\n• Canela a gosto",
    method: "Misture todos os ingredientes.\nConsumir imediatamente.",
    swaps: "• Canela → gengibre\n• Vinagre de maçã → limão",
    bestMoment: "Antes do café da manhã.",
    whyPoints: [
      {
        title: "Metabolismo",
        body: "Ajuda a reforçar uma rotina alimentar voltada para mulheres que desejam perder barriga e emagrecer.",
      },
      {
        title: "Menos fome",
        body: "Começar o dia com escolhas inteligentes pode facilitar o controle da fome nas próximas refeições.",
      },
      {
        title: "Barriga mais leve",
        body: "Uma alimentação equilibrada favorece uma maior sensação de leveza ao longo do dia.",
      },
    ],
    practicalNote:
      "Perfeito para quem sente mais fome ao longo do dia e quer começar a manhã reforçando hábitos que favorecem melhores escolhas alimentares.",
    observation: SHOT_DISCLAIMER,
  },
  {
    id: "shot-04-ativacao",
    category: "Limão + Gengibre + Canela",
    name: "Shot Ativação",
    cover: "green",
    image: `${SHOT_IMG}4- shot ativação.png`,
    ingredients: "• Suco de ½ limão\n• 1 fatia fina de gengibre\n• Canela a gosto\n• 50 ml de água",
    method: "Misture todos os ingredientes até incorporar bem.\nConsumir imediatamente após o preparo.",
    swaps: "• Limão → limão-siciliano\n• Canela → cúrcuma\n• Gengibre → hortelã fresca",
    bestMoment: "15 a 20 minutos antes do café da manhã.",
    whyPoints: [
      {
        title: "Mais disposição",
        body: "Uma combinação de ingredientes naturais para começar o dia com mais energia e motivação.",
      },
      {
        title: "Metabolismo",
        body: "Faz parte de uma rotina alimentar voltada para mulheres que desejam perder barriga e emagrecer.",
      },
      {
        title: "Controle da fome",
        body: "Começar a manhã com um ritual saudável pode facilitar escolhas mais equilibradas durante o restante do dia.",
      },
    ],
    practicalNote: "Excelente para quem acorda sem energia e quer iniciar a manhã com um ritual rápido antes do café da manhã.",
    observation: SHOT_DISCLAIMER,
  },
  {
    id: "shot-05-desinflamar",
    category: "Cúrcuma + Gengibre + Limão + Pimenta-do-Reino",
    name: "Shot Desinflamar",
    cover: "warm",
    image: `${SHOT_IMG}5- shot desinflamar.png`,
    ingredients: "• Suco de ½ limão\n• ½ colher (chá) de cúrcuma\n• 1 fatia fina de gengibre\n• 1 pitada de pimenta-do-reino\n• 50 ml de água",
    method: "Misture todos os ingredientes até ficar homogêneo.\nConsumir logo após o preparo.",
    swaps: "• Limão → laranja\n• Gengibre → canela\n• Pimenta-do-reino → pitada de noz-moscada",
    bestMoment: "Pela manhã, antes do café da manhã.",
    whyPoints: [
      {
        title: "Desinflamar",
        body: "A cúrcuma e o gengibre são tradicionalmente utilizados em preparações voltadas para uma alimentação menos inflamatória.",
      },
      {
        title: "Barriga mais leve",
        body: "Uma alimentação rica em ingredientes naturais pode contribuir para reduzir a sensação de inchaço.",
      },
      {
        title: "Antioxidantes",
        body: "Combinação rica em compostos antioxidantes naturalmente presentes nos alimentos.",
      },
    ],
    practicalNote:
      "Ideal para mulheres que desejam reduzir a sensação de barriga pesada enquanto constroem uma rotina de alimentação, movimento e sono mais equilibrada.",
    observation: SHOT_DISCLAIMER,
  },
  {
    id: "shot-06-curcuma-gold",
    category: "Cúrcuma + Limão + Canela",
    name: "Shot Cúrcuma Gold",
    cover: "green",
    image: `${SHOT_IMG}6- shot cúrcuma gold.png`,
    ingredients: "• Suco de ½ limão\n• ½ colher (chá) de cúrcuma\n• Canela a gosto\n• 50 ml de água",
    method: "Misture todos os ingredientes até incorporar completamente.\nConsumir imediatamente.",
    swaps: "• Limão → laranja\n• Canela → gengibre\n• Cúrcuma → açafrão fresco ralado",
    bestMoment: "Pela manhã.",
    whyPoints: [
      {
        title: "Desinflamar",
        body: "A cúrcuma é um dos ingredientes naturais mais utilizados em preparações voltadas para uma alimentação menos inflamatória.",
      },
      {
        title: "Antioxidantes",
        body: "Ingredientes naturalmente ricos em compostos antioxidantes que fazem parte de uma alimentação equilibrada.",
      },
      {
        title: "Bem-estar",
        body: "Uma forma prática de incluir ingredientes funcionais na rotina logo no início do dia.",
      },
    ],
    practicalNote:
      "Perfeito para quem quer variar os shots da semana sem abrir mão de ingredientes simples, naturais e alinhados ao Plano Barriga Hormonal 40+.",
    observation: SHOT_DISCLAIMER,
  },
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

type ShotGoalKey = "vitalidade" | "metabolismo" | "desinflamar";

interface ShotGoal {
  key: ShotGoalKey;
  emoji: string;
  title: string;
  subtitle: string;
  pageTitle: string;
  intro: string;
  // shortPhrase é conteúdo só do card de prévia (nesta página), não faz parte do FoodItem/Drawer compartilhado.
  shots: { id: string; shortPhrase: string }[];
}

const SHOT_GOALS: ShotGoal[] = [
  {
    key: "vitalidade",
    emoji: "☀️",
    title: "Vitalidade",
    subtitle: "Para começar o dia com mais disposição, energia e bem-estar.",
    pageTitle: "Vitalidade",
    intro: "Começar o dia com pequenos hábitos que fortalecem sua energia, equilíbrio e vitalidade.",
    shots: [
      { id: "shot-01-bom-dia", shortPhrase: "Para começar a manhã com mais disposição e sensação de leveza." },
      { id: "shot-02-vitalidade", shortPhrase: "Uma combinação antioxidante para trazer mais vitalidade à sua manhã." },
    ],
  },
  {
    key: "metabolismo",
    emoji: "🔥",
    title: "Metabolismo",
    subtitle: "Para apoiar o metabolismo e favorecer uma rotina mais equilibrada.",
    pageTitle: "Metabolismo",
    intro: "Apoiar hábitos que favoreçam o metabolismo e uma rotina alimentar mais equilibrada.",
    shots: [
      { id: "shot-03-metabolismo", shortPhrase: "Para apoiar uma rotina voltada ao metabolismo e ao controle da fome." },
      { id: "shot-04-ativacao", shortPhrase: "Para começar a manhã com mais disposição e ativação." },
    ],
  },
  {
    key: "desinflamar",
    emoji: "🌿",
    title: "Desinflamar",
    subtitle: "Para incluir ingredientes naturais com ação antioxidante e apoiar uma alimentação menos inflamatória.",
    pageTitle: "Desinflamar",
    intro: "Apoiar hábitos alimentares que favoreçam uma rotina menos inflamatória e uma sensação maior de leveza.",
    shots: [
      { id: "shot-05-desinflamar", shortPhrase: "Para incluir ingredientes naturais associados a uma alimentação menos inflamatória." },
      { id: "shot-06-curcuma-gold", shortPhrase: "Uma combinação antioxidante para variar seu ritual da manhã." },
    ],
  },
];

function BebidasPage() {
  const [openItem, setOpenItem] = useState<FoodItem | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<GoalKey | null>(null);
  const [selectedShakeGoal, setSelectedShakeGoal] = useState<ShakeGoalKey | null>(null);
  const [selectedShotGoal, setSelectedShotGoal] = useState<ShotGoalKey | null>(null);

  const activeGoal = GOALS.find((g) => g.key === selectedGoal) ?? null;
  const activeShakeGoal = SHAKE_GOALS.find((g) => g.key === selectedShakeGoal) ?? null;
  const activeShotGoal = SHOT_GOALS.find((g) => g.key === selectedShotGoal) ?? null;

  const openTeaGoal = (key: GoalKey) => {
    setSelectedShakeGoal(null);
    setSelectedShotGoal(null);
    setSelectedGoal(key);
  };
  const openShakeGoal = (key: ShakeGoalKey) => {
    setSelectedGoal(null);
    setSelectedShotGoal(null);
    setSelectedShakeGoal(key);
  };
  const openShotGoal = (key: ShotGoalKey) => {
    setSelectedGoal(null);
    setSelectedShakeGoal(null);
    setSelectedShotGoal(key);
  };

  const pageTitle = activeGoal
    ? activeGoal.pageTitle
    : activeShakeGoal
      ? activeShakeGoal.pageTitle
      : activeShotGoal
        ? activeShotGoal.pageTitle
        : "Ferramentas Funcionais";
  const pageSubtitle = activeGoal
    ? activeGoal.intro
    : activeShakeGoal
      ? activeShakeGoal.intro
      : activeShotGoal
        ? activeShotGoal.intro
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
      ) : activeShotGoal ? (
        <>
          <ul className="grid gap-2">
            {activeShotGoal.shots.map((shot) => {
              const item = DRINKS.find((d) => d.id === shot.id);
              if (!item) return null;
              return (
                <li key={shot.id}>
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
                      <span className="mt-0.5 block text-xs text-text-secondary">{shot.shortPhrase}</span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-text-muted" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setSelectedShotGoal(null)}
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

          <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Shots Funcionais</h2>
            <p className="mt-1 text-xs text-text-secondary">
              Escolha um objetivo para começar o dia cuidando da sua vitalidade, metabolismo e equilíbrio.
            </p>
            <ul className="mt-4 grid gap-2">
              {SHOT_GOALS.map((g) => (
                <li key={g.key}>
                  <button
                    type="button"
                    onClick={() => openShotGoal(g.key)}
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

          <Link to="/alimentacao" className="mt-4 inline-flex text-xs font-semibold text-primary hover:underline">
            Voltar para Alimentação
          </Link>
        </>
      )}

      <FoodItemDrawer item={openItem} onOpenChange={(open) => { if (!open) setOpenItem(null); }} />
    </AppShell>
  );
}
