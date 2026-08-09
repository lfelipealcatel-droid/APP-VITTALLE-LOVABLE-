// VITTALLE — Dados oficiais. Placeholders substituíveis para textos, PDFs, áudios e vídeos reais.

export type ActivityType =
  | "exercise"
  | "video"
  | "audio"
  | "reading"
  | "habit"
  | "checklist"
  | "download"
  | "food"
  | "measurement";

// ---------- Usuário ----------
export const USER = {
  firstName: "Mariana",
  fullName: "Mariana Andrade",
  email: "mariana@exemplo.com",
  program: "Plano Barriga Hormonal 40+",
  totalDays: 21,
};

// ---------- Sequências oficiais (nomes amigáveis) ----------
export type SequenceId =
  | "respirar-e-soltar"
  | "soltar-e-mover"
  | "acordar-o-corpo"
  | "ganhar-forca"
  | "firmar"
  | "sequencia-completa";

export interface Sequence {
  id: SequenceId;
  name: string;
  durationMin: number;
  description: string;
}

export const SEQUENCES: Sequence[] = [
  { id: "respirar-e-soltar", name: "Respirar e Soltar", durationMin: 8, description: "Uma abertura suave para o corpo e para a respiração." },
  { id: "soltar-e-mover", name: "Soltar e Mover", durationMin: 8, description: "Mobilidade leve para desinchar e destravar." },
  { id: "acordar-o-corpo", name: "Acordar o Corpo", durationMin: 8, description: "Ativação de baixo impacto para começar a acordar o core." },
  { id: "ganhar-forca", name: "Ganhar Força", durationMin: 9, description: "Fortalecimento suave e progressivo, sem impacto." },
  { id: "firmar", name: "Firmar", durationMin: 9, description: "Consolidação: postura, core e presença." },
  { id: "sequencia-completa", name: "Sua Sequência Completa", durationMin: 10, description: "A integração de tudo que você aprendeu." },
];

export function sequenceById(id: string): Sequence | undefined {
  return SEQUENCES.find((s) => s.id === id);
}

// ---------- Insight do Dia (leituras oficiais, uma por dia) ----------
// Título/subtítulo/corpo são independentes de DAYS/READING_TITLES de propósito: o "Insight do Dia"
// é um conteúdo próprio (card + leitura), não deve alterar o título/foco exibido no topo do Dia.
export interface Reading {
  dayId: number;
  title: string;
  subtitle: string;
  body: string;
  audioId: string; // id da narração oficial — reservado para uma etapa futura, sem player nesta versão.
}

export const READINGS: Reading[] = [
  {
    dayId: 1,
    title: "Por que o seu corpo mudou",
    subtitle: "Entenda por que o que funcionava antes parece não funcionar mais.",
    body: [
      "Você não mudou nada.",
      "Come praticamente o mesmo. Faz praticamente o mesmo. E mesmo assim, em algum momento dos últimos anos, apareceu uma barriga que não estava ali — e que não responde a nada do que sempre funcionou.",
      "Isso tem explicação, e ela é simples.",
      "Depois dos 40, o estrogênio começa a cair. E o estrogênio não cuida só da menstruação: ele diz ao seu corpo onde guardar energia. Enquanto ele está alto, a gordura vai principalmente para quadril e coxas. Quando ele cai, o endereço muda. E o novo endereço é a barriga.",
      "Ao mesmo tempo, o metabolismo desacelera. E a gordura que se instala na região abdominal inflama — o que mantém o cortisol alto, e o cortisol alto segura essa gordura no lugar.",
      "São três coisas, e elas se alimentam umas das outras.",
      "É por isso que cortar carboidrato não resolveu. É por isso que caminhar todo dia não resolveu. Cada uma dessas tentativas mexia em uma ponta — e o problema tem três.",
      "Não é que você não se esforçou. É que o esforço foi colocado no lugar errado, porque ninguém te explicou o que estava acontecendo.",
      "Nos próximos 21 dias, a gente vai mexer nas três. Na ordem certa.",
      "E começa pela mais rápida de todas.",
    ].join("\n\n"),
    audioId: "narracao-dia-1",
  },
  {
    dayId: 2,
    title: "O inchaço não é gordura",
    subtitle: "Descubra por que sua barriga pode mudar tanto no mesmo dia.",
    body: [
      "Repare numa coisa: sua barriga não é do mesmo tamanho o dia inteiro.",
      "De manhã é uma. No fim da tarde é outra. Depois de um dia salgado, é outra ainda. Se fosse gordura, isso não aconteceria — gordura não vai e volta em doze horas.",
      "O que vai e volta é líquido retido e inflamação. E, na barriga da mulher acima dos 40, isso costuma ser uma parte relevante do volume que ela enxerga no espelho.",
      "Essa é a boa notícia do dia: é a parte que sai primeiro.",
      "E o principal responsável não é o saleiro. É o sódio que você não vê — o do pão, do queijo, do embutido, do molho pronto, do tempero em pó, do congelado. Ele está em quase tudo o que vem em pacote, e ele puxa água para dentro do corpo.",
      "Não vou te pedir para cortar nada. Cortar é o caminho antigo, e ele já não funcionou com você.",
      "O que a gente vai fazer é adicionar — água, potássio, movimento que ativa a circulação. O corpo devolve o excesso quando recebe o que precisa para devolver.",
      "Você não vai perder gordura em três dias. Ninguém perde.",
      "Mas o inchaço, esse responde.",
      "E é por isso que a primeira coisa que você vai medir chega tão cedo.",
    ].join("\n\n"),
    audioId: "narracao-dia-2",
  },
  {
    dayId: 3,
    title: "Hoje você mede",
    subtitle: "Hoje você troca a impressão por uma referência real do seu corpo.",
    body: [
      "Hoje é o terceiro dia. E hoje você vai fazer uma coisa que quase ninguém faz.",
      "Você vai medir.",
      "Não é uma prova. Não é uma cobrança. Ninguém vai te dar nota.",
      "É que existe uma diferença enorme entre achar que está funcionando e saber que está. E essa diferença cabe numa fita métrica de cinco reais.",
      "Até hoje, tudo o que você tentou te pediu fé. \"Continue, confie, daqui a três meses você vê.\" E quando não via, você não tinha nada — nenhum registro, nenhum dado, nenhuma forma de saber onde estava.",
      "Aqui não vai ser assim.",
      "Aqui você vê. Você mesma. Com a sua fita, no seu banheiro, no seu corpo.",
      "E é por isso que o protocolo é sempre igual: mesma hora, mesmo lugar, mesmo jeito. Não é rigidez. É que um número só significa alguma coisa quando pode ser comparado com outro.",
      "Hoje nasce a sua linha.",
      "A partir de agora, você não tem mais uma impressão sobre o seu corpo. Você tem um registro dele — e essa é uma coisa que quase nenhuma mulher tem, em nenhuma idade.",
      "Anote o número. Guarde-o.",
      "No dia 21, você vai olhar para ele de novo. E vai entender por que eu insisti tanto.",
    ].join("\n\n"),
    audioId: "narracao-dia-3",
  },
  {
    dayId: 4,
    title: "Por que a dieta restritiva piorou tudo",
    subtitle: "Entenda por que cortar cada vez mais pode não ser a resposta.",
    body: [
      "Você já fez dieta. Provavelmente várias.",
      "E o mais frustrante não foi não emagrecer. Foi emagrecer, voltar, e voltar um pouco pior do que antes.",
      "Isso não foi azar. É previsível.",
      "Quando você corta demais, o corpo não entende \"estou emagrecendo\". Ele entende \"está faltando comida\". E a resposta dele é economizar: desacelerar o metabolismo, poupar energia, e priorizar o estoque. Ao mesmo tempo, a restrição sobe o cortisol — e o cortisol alto é justamente o que mantém a gordura abdominal presa.",
      "Ou seja: você atacou uma ponta do problema e piorou as outras duas.",
      "O caminho que te venderam funcionava mesmo — para um corpo de trinta anos, com hormônio alto e metabolismo rápido. Ele nunca foi desenhado para a fase em que você está.",
      "Por isso aqui a gente nunca vai te pedir para cortar.",
      "Toda orientação de comida que você vai receber nestes 21 dias começa com a palavra adicionar. Adicionar proteína. Adicionar potássio. Adicionar fibra. Adicionar água.",
      "Não é uma estratégia mais gentil. É uma estratégia mais correta para o seu corpo hoje.",
      "E sim: dá para reduzir barriga comendo mais coisas, e não menos.",
    ].join("\n\n"),
    audioId: "narracao-dia-4",
  },
  {
    dayId: 5,
    title: "O cortisol e a barriga",
    subtitle: "Entenda por que viver sob pressão também aparece no corpo.",
    body: [
      "Existe um hormônio que decide se a gordura da sua barriga sai ou fica. E ele não tem nada a ver com comida.",
      "É o cortisol — o hormônio que o corpo libera quando entende que está sob pressão.",
      "Ele foi feito para situações curtas: um susto, um perigo. Sobe, resolve, desce. O problema é que ele não distingue perigo de rotina. Trabalho, contas, dormir mal, cuidar de todo mundo, treinar pesado achando que precisa se punir — para o corpo, é tudo a mesma coisa.",
      "E quando o cortisol fica alto o tempo todo, ele faz duas coisas: manda o corpo estocar energia — preferencialmente na barriga — e trava a queima dessa mesma gordura.",
      "Agora entenda o que isso significa.",
      "Quanto mais você forçava, mais o seu corpo se defendia.",
      "A academia puxada, o cardio em jejum, a dieta dura — cada um desses era, para o seu corpo, mais um sinal de ameaça. Você estava se esforçando contra o próprio sistema que precisava desligar.",
      "É por isso que o seu movimento aqui tem oito minutos e não sessenta. É por isso que ele começa e termina com você respirando.",
      "Não é uma versão leve do que você deveria estar fazendo. É a dose que o seu corpo consegue usar.",
      "Baixar o cortisol não é descansar do trabalho. Baixar o cortisol é o trabalho.",
    ].join("\n\n"),
    audioId: "narracao-dia-5",
  },
  {
    dayId: 6,
    title: "O intestino e o volume que não é gordura",
    subtitle: "Parte da barriga que incomoda pode ter outra explicação.",
    body: [
      "Tem um dado que quase ninguém conta: uma parte do que aumenta a sua barriga ao longo do dia acontece dentro do intestino, e não em volta dele.",
      "Gases. Trânsito lento. Fermentação. Distensão.",
      "É por isso que existem dias em que você acorda com a barriga quase plana e vai dormir com a impressão de que engordou três quilos em doze horas. Você não engordou. Você distendeu.",
      "E há duas razões pelas quais isso piora justamente agora.",
      "A primeira é hormonal: a queda do estrogênio afeta a velocidade do trânsito intestinal. O que passava, passa mais devagar.",
      "A segunda é alimentar: quando a gente tira comida de verdade e coloca produto industrializado no lugar, a fibra some. E sem fibra, o intestino perde o que faz ele se mover.",
      "De novo, a solução não é cortar.",
      "É devolver água, fibra e movimento — inclusive o movimento de rotação suave do tronco, que faz massagem mecânica na região. Não é folclore. É mecânica.",
      "E aqui vai a parte que interessa: essa é uma das mudanças mais rápidas do corpo inteiro.",
      "Você não precisa esperar semanas para sentir a diferença de um intestino que voltou a funcionar. Costuma ser questão de dias.",
      "Amanhã fecha a sua primeira semana. E você mede de novo.",
    ].join("\n\n"),
    audioId: "narracao-dia-6",
  },
  {
    dayId: 7,
    title: "Uma semana",
    subtitle: "Antes de olhar qualquer número, veja o que você já construiu.",
    body: [
      "Sete dias.",
      "Pode parecer pouco. Mas responda com honestidade: quanto tempo faz que você começa alguma coisa por você e chega até o fim da primeira semana?",
      "Para a maioria das mulheres que chega aqui, faz anos.",
      "Então antes de qualquer número, registre isso: você terminou uma semana. Não porque se obrigou. Porque encontrou um caminho que cabia na sua vida.",
      "Agora, sobre o que aconteceu por dentro.",
      "Nesses sete dias, seu corpo começou a soltar retenção, o intestino voltou a se mover, o cortisol recebeu sete pausas que ele não recebia, e o sangue voltou a circular em lugares que estavam parados.",
      "Nada disso é espetacular sozinho. Junto, é uma mudança de direção.",
      "Você vai medir hoje. E o gráfico vai ganhar o terceiro ponto.",
      "Três pontos não são mais uma linha. Três pontos são uma tendência. E uma tendência é uma coisa que você pode olhar e dizer: está indo para algum lugar.",
      "A partir de amanhã, o trabalho muda.",
      "A primeira semana foi sobre soltar. A segunda é sobre religar — acordar o que estava desligado e devolver força ao corpo.",
      "Faltam duas semanas. E o que vem depois.",
    ].join("\n\n"),
    audioId: "narracao-dia-7",
  },
  {
    dayId: 8,
    title: "O abdominal que você pode fazer",
    subtitle: "Descubra qual músculo realmente merece sua atenção agora.",
    body: [
      "A partir de hoje o seu corpo começa a trabalhar um pouco mais. E eu preciso te explicar por que a gente não vai fazer abdominal.",
      "Não é preconceito com o exercício. É que o abdominal tradicional trabalha o músculo errado para o seu objetivo.",
      "Ele treina o músculo da frente — o que aparece quando alguém tem \"tanquinho\". Mas o músculo que segura a sua barriga para dentro é outro: fica embaixo, atravessa o abdome como um cinto, e se chama transverso.",
      "Ele é a sua cinta natural. E, com sedentarismo, gestações e anos parada, ele afrouxa.",
      "É por isso que existe mulher magra com barriga saliente. Não é gordura. É um cinto solto.",
      "E aqui está o detalhe que muda tudo: o abdominal tradicional empurra a parede abdominal para fora. Ele pode, inclusive, piorar a aparência da barriga em quem tem o transverso enfraquecido — além de carregar a lombar, que na maioria de vocês já reclama.",
      "O que a gente faz é o oposto: ativa o transverso e trabalha o corpo sem dobrar a coluna sob carga.",
      "Você não vai sentir queimação. Vai sentir a barriga puxando para dentro.",
      "E uma coisa importante, hoje e sempre: desconforto leve é normal. Dor não é. Se doer, pare na hora. Nunca force um movimento. Use sempre a versão mais confortável — ela está ali, do lado, e vale exatamente tanto quanto a outra. E se a dor persistir, procure um profissional de saúde.",
      "Respeitar o seu limite não é fazer menos. É o que permite fazer amanhã.",
    ].join("\n\n"),
    audioId: "narracao-dia-8",
  },
  {
    dayId: 9,
    title: "A peça que ninguém te contou",
    subtitle: "Existe uma mudança silenciosa que ajuda a explicar muita coisa depois dos 40.",
    body: [
      "Existe uma coisa acontecendo no seu corpo desde os trinta e poucos anos, em silêncio, e ela explica boa parte do que você não entendia.",
      "Você está perdendo músculo. Um pouco todo ano. Sem sentir.",
      "E isso importa por um motivo muito prático: músculo é o tecido que gasta energia mesmo quando você está parada. Gordura, não. Gordura estoca.",
      "Então imagine a conta. A cada ano com menos músculo, você queima um pouco menos — sentada na mesma cadeira, comendo a mesma coisa, vivendo a mesma vida.",
      "Não foi você que começou a comer mais. Foi o seu corpo que começou a gastar menos.",
      "Isso é metade da resposta para a pergunta que você se faz há anos: \"por que eu engordei sem mudar nada?\"",
      "E aqui está a parte boa, que quase ninguém conta com clareza.",
      "Músculo responde. Em qualquer idade.",
      "Você não precisa de academia, nem de peso pesado, nem de duas horas por dia. Precisa de estímulo — regular, na dose certa, com o corpo estabilizado. É exatamente o que os seus oito minutos estão fazendo.",
      "Não é sobre ficar musculosa. Ninguém fica musculosa por acidente.",
      "É sobre voltar a ter um corpo que gasta — em vez de um corpo que só guarda.",
    ].join("\n\n"),
    audioId: "narracao-dia-9",
  },
  {
    dayId: 10,
    title: "Hoje talvez você não sinta nada",
    subtitle: "Se a novidade diminuir agora, existe uma razão para isso.",
    body: [
      "Preciso te falar de uma coisa antes que ela aconteça.",
      "Por volta de agora — dia dez, onze, doze — muita mulher para de sentir novidade.",
      "A primeira semana tinha aquilo de novo. O corpo desinchou, a roupa ficou diferente, teve um número na fita. E aí, de repente, os dias começam a parecer iguais. Nada de espetacular acontece. E aparece uma vozinha perguntando: \"será que ainda está funcionando?\"",
      "Se isso acontecer com você hoje, quero que saiba de uma coisa:",
      "Está previsto.",
      "Não é sinal de que parou. É sinal de que você mudou de fase.",
      "A primeira semana entregou o que é rápido — a água, o inchaço, o intestino. Essas coisas dão resultado visível em dias.",
      "O que está acontecendo agora é diferente. Músculo, metabolismo e resposta hormonal se reorganizam por dentro antes de aparecer por fora.",
      "Não é menos importante. É só mais silencioso.",
      "Abra o seu gráfico agora, antes de fechar o app.",
      "Olhe a sua energia nesses dez dias. Olhe o seu sono. Olhe o inchaço.",
      "Quase sempre já mudou alguma coisa ali — mesmo quando a fita ainda não mostrou.",
      "Hoje você não precisa se animar. Não precisa sentir nada.",
      "Só continue. É literalmente tudo o que hoje pede de você.",
    ].join("\n\n"),
    audioId: "narracao-dia-10",
  },
  {
    dayId: 11,
    title: "Força sem impacto",
    subtitle: "Você pode fortalecer o corpo sem transformar exercício em punição.",
    body: [
      "Você passou da metade. Onze de vinte e um.",
      "E o corpo que chegou aqui não é o mesmo que começou — ele está mais solto, mais irrigado, e já aguenta um pouco mais de trabalho.",
      "Sobre isso: você deve ter reparado que aqui não tem pulo, não tem corrida, não tem agachamento profundo. E não é por precaução exagerada.",
      "É porque impacto e força são coisas diferentes — e o mercado confundiu as duas.",
      "Impacto é o pé batendo no chão, a articulação absorvendo. Ele não constrói nada. Só cobra.",
      "Força é o músculo sob tensão. E existe uma forma de colocar músculo sob tensão sem que nada bata em nada: segurando a posição.",
      "É isso que você faz quando sustenta uma prancha na parede, quando segura a ponte lá em cima, quando levanta da cadeira devagar. O músculo trabalha o tempo inteiro. O joelho, não.",
      "Para quem tem artrose, hérnia ou uma lombar que reclama, essa distinção não é detalhe — é a diferença entre poder e não poder.",
      "Você não está fazendo uma versão fraca de um treino de verdade.",
      "Você está fazendo a versão que o seu corpo consegue usar. E versão que o corpo usa é a única que funciona.",
    ].join("\n\n"),
    audioId: "narracao-dia-11",
  },
  {
    dayId: 12,
    title: "O segundo turno do seu metabolismo",
    subtitle: "Uma parte importante do seu progresso acontece quando você apaga a luz.",
    body: [
      "Tudo o que você fez até agora — cada respiração, cada movimento, cada refeição — depende de uma coisa que acontece depois, quando você apaga a luz.",
      "É dormindo que o corpo organiza hormônio.",
      "É dormindo que ele repara músculo. É dormindo que regula os sinais de fome e de saciedade. E é dormindo que o cortisol, que subiu o dia inteiro, finalmente desce.",
      "Uma noite ruim não é só cansaço no dia seguinte. É um dia inteiro com o cortisol mais alto, o apetite desregulado e o metabolismo mais lento.",
      "Aqui está a parte injusta: justamente na fase em que o corpo mais precisa de sono, o sono piora. Calor à noite, acordar às três da manhã, sensação de nunca descansar de verdade. Isso é hormonal, e é uma das queixas mais comuns nessa idade.",
      "O que a gente pode fazer não é resolver o sono num dia. É criar condições para ele.",
      "Por isso o seu movimento termina com respiração lenta, e não com o coração acelerado. Por isso existe um ritual antes de deitar. Por isso a comida da noite entra na conta.",
      "Não é frescura de rotina. É estratégia.",
      "Você trabalha oito minutos por dia. Seu corpo trabalha oito horas por noite.",
      "Vale a pena dar a ele condição de fazer isso.",
    ].join("\n\n"),
    audioId: "narracao-dia-12",
  },
  {
    dayId: 13,
    title: "Por que oito minutos bastam",
    subtitle: "O que importa não é apenas gastar energia — é o sinal que você repete.",
    body: [
      "Você provavelmente já pensou nisso: \"como oito minutos podem funcionar se uma hora de academia não funcionava?\"",
      "Pergunta justa. E a resposta muda tudo.",
      "Uma hora de academia estava tentando gastar energia. Oito minutos aqui estão tentando enviar um sinal.",
      "São coisas diferentes.",
      "Gastar energia por meio de exercício é, honestamente, ineficiente — o número de calorias que uma sessão queima é pequeno perto do que se imagina, e o corpo compensa boa parte depois. Foi por isso que a conta nunca fechou.",
      "Já o sinal é outra história.",
      "Quando você ativa o transverso, você diz ao corpo: esse músculo ainda serve, mantenha ele. Quando você sustenta uma posição sob tensão, você diz: preciso desse músculo, não desmonte. Quando você respira lento por dois minutos, você diz: não estamos em perigo, pode desligar o alarme.",
      "Nada disso depende de duração. Depende de frequência e de precisão.",
      "É por isso que oito minutos todo dia valem mais do que uma hora aos sábados. O corpo não responde a eventos. Responde a padrões.",
      "E é por isso que o seu resultado não veio de você ter se esforçado mais nestes 21 dias.",
      "Veio de você ter se esforçado no lugar certo.",
    ].join("\n\n"),
    audioId: "narracao-dia-13",
  },
  {
    dayId: 14,
    title: "Duas semanas",
    subtitle: "Agora você já tem algo mais valioso do que uma promessa: uma sequência de registros.",
    body: [
      "Duas semanas.",
      "E hoje o seu gráfico ganha o quarto ponto.",
      "Quero que você olhe para ele com atenção, porque a essa altura ele já não é uma promessa nem uma expectativa. É um registro.",
      "Quatro medidas suas, feitas por você, do mesmo jeito, no mesmo lugar. Mais catorze dias de energia, inchaço e sono anotados por você.",
      "Isso é mais informação sobre o próprio corpo do que a maioria das pessoas tem na vida inteira.",
      "E é isso que muda a natureza do que está acontecendo aqui. Você não está mais tentando alguma coisa. Você está acompanhando alguma coisa.",
      "A parte mais difícil já passou. Sério.",
      "A primeira semana exigiu fé. A segunda exigiu continuidade quando a novidade acabou — e você continuou.",
      "O que vem agora é diferente. A terceira semana não é sobre começar nem sobre insistir. É sobre firmar: consolidar o que já está funcionando e aprender a sustentar isso sem que dependa de um programa.",
      "Porque a verdade é essa, e eu prefiro dizer agora do que no fim: você está construindo uma coisa que não acaba no dia 21.",
      "Uma pergunta, antes de você fechar: alguém já comentou alguma coisa com você?",
    ].join("\n\n"),
    audioId: "narracao-dia-14",
  },
  {
    dayId: 15,
    title: "Você não está fazendo um programa",
    subtitle: "Talvez a maior mudança destes 15 dias não esteja na fita.",
    body: [
      "Quinze dias.",
      "Eu quero te propor uma mudança de leitura sobre o que está acontecendo aqui.",
      "Você acha que está fazendo um programa de 21 dias. Não está.",
      "Um programa é uma coisa que você faz e que acaba. Uma coisa com data de validade, que você atravessa apertando os dentes até o fim, e que depois te devolve exatamente onde você estava.",
      "Não é isso que está acontecendo.",
      "Nestes quinze dias você não fez um esforço extraordinário. Você fez oito minutos. Todo dia. Do jeito que dava.",
      "E, no meio disso, sem grande cerimônia, alguma coisa mudou de lugar: você virou uma mulher que para oito minutos por dia para cuidar do próprio corpo. Que sabe medir. Que sabe o que o cortisol faz. Que reconhece a diferença entre desconforto e dor.",
      "Isso não é um comportamento. É uma identidade.",
      "E é a única coisa que sobrevive ao fim de qualquer programa.",
      "Programas terminam. Métodos terminam. Assinaturas terminam.",
      "Quem você virou, não.",
      "Por isso a terceira semana não vai te pedir mais esforço. Vai te pedir que você repare no que já se tornou verdade sobre você.",
    ].join("\n\n"),
    audioId: "narracao-dia-15",
  },
  {
    dayId: 16,
    title: "Firme não é magra",
    subtitle: "A balança não consegue mostrar tudo o que está mudando.",
    body: [
      "Se você subiu na balança nesses dias e ficou frustrada com o número, precisamos conversar.",
      "A balança pesa tudo: osso, água, músculo, órgão, comida no estômago, gordura. Ela não sabe diferenciar. E ela é péssima justamente naquilo que interessa a você.",
      "Duas mulheres com o mesmo peso podem ter corpos completamente diferentes. Uma com o transverso ativo, glúteo forte e postura alinhada. Outra sem nada disso. A balança diz que são iguais. Elas não são.",
      "O que você está construindo aqui não aparece bem na balança. Aparece na fita, na roupa e no espelho.",
      "Aliás, existe uma coisa que acontece com frequência nessa fase do processo e que costuma assustar: a medida da barriga desce e o peso não desce junto. Ou até sobe um pouco.",
      "Isso costuma ser bom sinal. Músculo é mais denso que gordura.",
      "E, honestamente: você nunca quis um número. Você queria a calça fechando sem esforço. Queria não puxar a blusa o dia inteiro. Queria se olhar de lado no reflexo da vitrine e reconhecer quem está ali.",
      "Nada disso está na balança.",
      "Está na fita que você mede a cada semana. E está no espelho.",
      "Guarde a balança. Ela nunca foi a medida certa para o que você está fazendo.",
    ].join("\n\n"),
    audioId: "narracao-dia-16",
  },
  {
    dayId: 17,
    title: "Quando a rotina quebrar",
    subtitle: "O que você faz depois de um dia perdido importa muito mais que o dia perdido.",
    body: [
      "A vida vai atrapalhar. Não é hipótese — é certeza.",
      "Vai ter viagem, vai ter doença, vai ter a semana em que tudo aconteceu ao mesmo tempo e você não abriu isto aqui. Talvez já tenha acontecido.",
      "E o que eu quero que você faça nesse dia é exatamente o oposto do que você sempre fez.",
      "Você conhece o padrão. Falha um dia. Sente que estragou. Se cobra. E aí, como já estragou mesmo, para de vez. Não foi o dia perdido que acabou com as suas tentativas anteriores. Foi o que veio depois dele.",
      "Então vamos combinar uma coisa, agora, antes de acontecer.",
      "Um dia perdido não apaga nada. Não zera o seu gráfico, não desfaz o que o seu corpo construiu, não anula as suas medidas. Ele é só um dia.",
      "Você tem dois dias de proteção. Eles estão aí desde o primeiro dia, e existem exatamente para isso. Não são um prêmio. São um reconhecimento de que você tem uma vida.",
      "E quando você voltar, você não volta ao começo. Você continua de onde parou.",
      "Guarde isto, porque vale muito além destes 21 dias:",
      "Voltar é mais forte do que não parar.",
    ].join("\n\n"),
    audioId: "narracao-dia-17",
  },
  {
    dayId: 18,
    title: "A verdade sobre o platô",
    subtitle: "Seu corpo não precisa mudar em linha reta para estar indo na direção certa.",
    body: [
      "Falta pouco para o dia 21, e eu preciso ser honesta com você sobre o que esperar.",
      "O corpo não muda em linha reta.",
      "Ele muda em degraus. Cai, estabiliza, parece parado, e cai de novo. Você já viu isso no seu próprio gráfico — teve dia em que o número desceu bem, e dia em que não desceu quase nada.",
      "Isso não é o método falhando. É como o corpo humano funciona.",
      "Então, sobre o dia 21.",
      "Você vai medir. E o número que aparecer vai ser o seu número. Ele pode ser maior do que você esperava, e pode ser menor.",
      "Se for menor do que você sonhou, quero que você faça uma coisa: não olhe para um ponto. Olhe para a linha.",
      "Cinco medidas, ao longo de 21 dias, mostram uma direção. E direção é a única coisa que importa aqui — porque foi a direção que estava errada durante anos, e é a direção que você corrigiu.",
      "Não vou te prometer um número. Nunca prometi, e não vou começar agora que estamos perto do fim.",
      "O que eu te prometi foi que você ia medir, e que ia ver.",
      "E você vai.",
    ].join("\n\n"),
    audioId: "narracao-dia-18",
  },
  {
    dayId: 19,
    title: "Como manter sem virar refém",
    subtitle: "O objetivo nunca foi depender do programa para sempre.",
    body: [
      "Hoje você fez a sequência completa — aquela que junta tudo o que você aprendeu.",
      "Preste atenção nela, porque ela é sua. E vai continuar sendo depois que estes 21 dias acabarem.",
      "Esse é um ponto que eu quero deixar muito claro, porque é a diferença entre um resultado que dura e um que evapora.",
      "Nada do que você fez aqui depende de mim, de um aplicativo ou de um programa.",
      "Você aprendeu a respirar de um jeito que baixa o cortisol. Aprendeu a ativar o músculo que segura a sua barriga. Aprendeu a levantar da cadeira usando o glúteo. Aprendeu que adicionar funciona melhor que cortar. Aprendeu a medir.",
      "Nada disso tem prazo de validade. Nada disso exige academia, equipamento ou dinheiro.",
      "Manter não é fazer isso todo santo dia até o fim da vida sem falhar. Manter é ter um caminho de volta.",
      "E o seu caminho de volta agora tem oito minutos e um nome.",
      "Você não vai virar refém de nada. Vai ter, pela primeira vez em anos, uma coisa que funciona no seu corpo e que você sabe fazer sozinha.",
      "Isso é liberdade — não obrigação.",
      "Faltam dois dias.",
    ].join("\n\n"),
    audioId: "narracao-dia-19",
  },
  {
    dayId: 20,
    title: "Amanhã você mede",
    subtitle: "Antes do último registro, prepare uma coisa mais importante que a fita.",
    body: [
      "Amanhã é o dia 21.",
      "E antes de qualquer coisa, quero que você repare em uma coisa: você chegou.",
      "Não com esforço sobre-humano. Com oito minutos por dia, do jeito que deu, inclusive nos dias em que não deu direito.",
      "Amanhã você vai fazer a sua sequência pela última vez dentro deste programa. E vai medir.",
      "Mesma hora. Mesma roupa. Mesmo lugar. De manhã, antes de comer.",
      "Deixe a fita separada hoje à noite, em cima da roupa que você vai vestir. Não deixe para procurar amanhã.",
      "E amanhã, antes de olhar o número, faça uma coisa por mim: pense em como você estava no dia 1.",
      "Não no corpo. Na cabeça.",
      "Lembre da mulher que abriu isto aqui achando que talvez fosse mais uma tentativa frustrada. Que já tinha se decepcionado antes. Que não sabia se conseguiria fazer nem três dias seguidos.",
      "Ela fez vinte e um.",
      "Amanhã o número é seu. Você que produziu.",
      "Durma bem. A gente se vê de manhã.",
    ].join("\n\n"),
    audioId: "narracao-dia-20",
  },
  {
    dayId: 21,
    title: "O que você construiu em 21 dias",
    subtitle: "Hoje você não olha apenas para um número. Você olha para o caminho inteiro.",
    body: [
      "Você mediu. O número está aí.",
      "Antes de olhar para ele de novo, olhe para a linha inteira. Cinco pontos. Vinte e um dias. Uma direção.",
      "Agora, a parte que eu realmente quero te dizer.",
      "No dia 1, eu te falei que o seu corpo tinha mudado as regras, e que ninguém tinha te dado o manual da fase nova. Que você não tinha falhado — o caminho é que estava errado.",
      "Naquele dia, aquilo era só uma frase. Você tinha todo o direito de não acreditar.",
      "Hoje não é mais uma frase. É uma coisa que você provou.",
      "Porque nestes 21 dias você não teve mais determinação do que tinha antes. Não acordou mais cedo, não sofreu mais, não se cobrou mais.",
      "Você fez oito minutos por dia.",
      "E funcionou.",
      "Isso significa que o problema nunca foi você. Nunca foi. E agora você não precisa da minha palavra para isso — você tem um gráfico.",
      "Guarde esse número. Guarde essas fotos. Guarde a sequência que você aprendeu.",
      "E guarde principalmente isto, que é o que vale mais do que qualquer centímetro:",
      "Você não recebeu um resultado. Você produziu um.",
      "O corpo respondeu. Ele sempre esteve disposto — só estava esperando alguém falar a língua dele.",
      "Isto aqui foi o capítulo 1.",
    ].join("\n\n"),
    audioId: "narracao-dia-21",
  },
];

const READING_TITLES: string[] = [
  "Um começo consciente",
  "Hidratação e ritmo",
  "Respiração e leveza",
  "Ativando o corpo com leveza",
  "Janela de luz",
  "Método Monta-Prato",
  "Superalimentos do dia",
  "Um passo além",
  "Sono restaurador",
  "Reduzindo o inchaço",
  "Movimento intencional",
  "Substituições inteligentes",
  "Mente calma, corpo leve",
  "Metade do caminho",
  "Alongamento profundo",
  "Ritual da manhã",
  "Ritual da noite",
  "Conexão com o corpo",
  "Constância antes de intensidade",
  "Preparando o próximo ciclo",
  "Sua nova rotina",
];

export function readingByDay(dayId: number) {
  return READINGS.find((r) => r.dayId === dayId);
}

// ---------- Micro-hábitos oficiais (4 no total, introduzidos progressivamente) ----------
// São só 4 hábitos ao longo dos 21 dias — não 21 hábitos diferentes. Cada um entra em um dia oficial
// (1, 2, 5, 8) e continua fazendo parte da rotina depois disso. day.habit (texto genérico usado só na
// descrição do card "Hábito do dia" da tela do Dia) não foi tocado por esta tarefa.
export type HabitId = "copo-antes-cafe" | "desligar" | "luz-manha" | "pausa-3-minutos";

export interface Habit {
  id: HabitId;
  eyebrow: string;
  title: string;
  intro: string; // explicação curta
  whatToDoToday: string;
  why: string;
  closing: string;
  introducedOnDay: number;
  // Descritor de uma linha, usado só na revisão do Dia 7 (não inventado: vem do conteúdo oficial).
  reviewLabel?: string;
}

export const HABITS: Habit[] = [
  {
    id: "copo-antes-cafe",
    eyebrow: "Comece pelo simples",
    title: "O copo antes do café",
    intro:
      "Antes do café da manhã, tome um copo de água.\n\nÉ um gesto pequeno para começar o dia se hidratando e criar um primeiro sinal de cuidado com o corpo logo pela manhã.",
    whatToDoToday: "Tome 1 copo de água antes do seu café da manhã.",
    why: "Você começa o dia com uma ação simples, rápida e fácil de repetir — sem precisar mudar toda a sua rotina.",
    closing: "Não precisa ser perfeito.\n\nSó precisa acontecer.",
    introducedOnDay: 1,
    reviewLabel: "Hidratação logo no começo do dia.",
  },
  {
    id: "desligar",
    eyebrow: "Desacelere o dia",
    title: "O desligar",
    intro:
      "Antes de dormir, crie alguns minutos de desaceleração.\n\nReduza estímulos, diminua o ritmo e dê ao corpo um sinal claro de que o dia está terminando.",
    whatToDoToday: "Escolha alguns minutos antes de dormir para diminuir luz, tela e agitação.",
    why: "Um pequeno ritual noturno ajuda a separar o ritmo do dia do momento de descanso.",
    closing: "Você não precisa ter uma noite perfeita.\n\nSó precisa criar um momento de transição.",
    introducedOnDay: 2,
    reviewLabel: "Um momento para desacelerar antes de dormir.",
  },
  {
    id: "luz-manha",
    eyebrow: "Comece o dia lá fora",
    title: "A luz da manhã",
    intro:
      "Pela manhã, procure alguns minutos de contato com a luz natural.\n\nPode ser na varanda, na janela aberta, no quintal ou durante uma pequena caminhada.",
    whatToDoToday: "Passe alguns minutos em contato com a luz natural no início do dia.",
    why: "A luz da manhã ajuda o corpo a reconhecer que o dia começou e favorece uma rotina mais organizada entre manhã e noite.",
    closing: "Poucos minutos já transformam isso em um hábito possível.",
    introducedOnDay: 5,
    reviewLabel: "Contato com luz natural no início do dia.",
  },
  {
    id: "pausa-3-minutos",
    eyebrow: "Pare por 3 minutos",
    title: "A pausa de 3 minutos",
    intro: "Em algum momento do dia, interrompa o ritmo por apenas três minutos.\n\nSem tarefa.\nSem cobrança.\nSem precisar produzir nada.",
    whatToDoToday:
      "Pare por 3 minutos.\n\nSente-se ou fique em pé de forma confortável.\n\nRespire mais devagar e permita que o corpo saia, por alguns instantes, do ritmo automático do dia.",
    why: "Uma pausa curta pode ajudar você a perceber o próprio ritmo e evitar passar o dia inteiro funcionando no automático.",
    closing: "Três minutos cabem até nos dias difíceis.",
    introducedOnDay: 8,
  },
];

const HABIT_ORDER: HabitId[] = ["copo-antes-cafe", "desligar", "luz-manha", "pausa-3-minutos"];

export function habitById(id: HabitId) {
  return HABITS.find((h) => h.id === id)!;
}

// Hábitos já introduzidos até (e incluindo) o dia informado — usado nos recaps "Seus hábitos até aqui".
export function habitsIntroducedUpTo(dayId: number): Habit[] {
  return HABITS.filter((h) => h.introducedOnDay <= dayId);
}

// Hábito em foco ("hábito principal do dia") — nos dias oficiais de estreia, é sempre o hábito novo.
// Nos demais dias, alterna de forma simples entre os hábitos já disponíveis (determinístico, sem sorteio).
export function habitForDay(dayId: number): Habit {
  const justIntroduced = HABITS.find((h) => h.introducedOnDay === dayId);
  if (justIntroduced) return justIntroduced;
  const pool = habitsIntroducedUpTo(dayId - 1).length > 0 ? habitsIntroducedUpTo(dayId - 1) : [HABITS[0]];
  const chosen = pool[(dayId - 1) % pool.length];
  return chosen ?? HABITS[0];
}

// ---------- Áudios oficiais ----------
export type AudioOwner = "front" | "bump2" | "upsell";

export interface OfficialAudio {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  owner: AudioOwner;
}

export const OFFICIAL_AUDIOS: OfficialAudio[] = [
  { id: "absolvicao", title: "Áudio da Absolvição", subtitle: "Conteúdo inaugural", durationMin: 7, owner: "front" },
  ...READINGS.map((r) => ({
    id: r.audioId,
    title: `Narração da Leitura — Dia ${r.dayId}`,
    subtitle: r.title,
    durationMin: 4,
    owner: "front" as const,
  })),
  { id: "desinchar-express-audio", title: "Ritual noturno — Desinchar Express", subtitle: "Áudio guiado da véspera", durationMin: 9, owner: "bump2" },
  { id: "cozinha-ritual-1", title: "Ritual noturno da Cozinha Hormonal — 1", subtitle: "Áudio guiado", durationMin: 8, owner: "upsell" },
  { id: "cozinha-ritual-2", title: "Ritual noturno da Cozinha Hormonal — 2", subtitle: "Áudio guiado", durationMin: 8, owner: "upsell" },
  { id: "cozinha-ritual-3", title: "Ritual noturno da Cozinha Hormonal — 3", subtitle: "Áudio guiado", durationMin: 8, owner: "upsell" },
];

export function audioById(id: string) {
  return OFFICIAL_AUDIOS.find((a) => a.id === id);
}

// ---------- Jornada oficial ----------
export type WeekPhase = "desinchar" | "ativar" | "firmar";

export interface JourneyDay {
  id: number;
  week: 1 | 2 | 3;
  phase: WeekPhase;
  title: string;
  focus: string;
  sequenceId: SequenceId;
  totalMin: number;
  measurementRequired?: boolean; // Dia 1 e Dia 21 sempre; Dia 7 e Dia 14 acompanhamento
  measurementSuggested?: boolean;
  habit: string;
  food: string;
  ceremony?: boolean; // Dia 21
}

function seqForDay(dayId: number): SequenceId {
  if (dayId <= 3) return "respirar-e-soltar";
  if (dayId <= 7) return "soltar-e-mover";
  if (dayId <= 10) return "acordar-o-corpo";
  if (dayId <= 14) return "ganhar-forca";
  if (dayId <= 20) return "firmar";
  return "sequencia-completa";
}

function weekForDay(dayId: number): { week: 1 | 2 | 3; phase: WeekPhase } {
  if (dayId <= 7) return { week: 1, phase: "desinchar" };
  if (dayId <= 14) return { week: 2, phase: "ativar" };
  return { week: 3, phase: "firmar" };
}

export const DAYS: JourneyDay[] = READING_TITLES.map((title, i) => {
  const dayId = i + 1;
  const { week, phase } = weekForDay(dayId);
  return {
    id: dayId,
    week,
    phase,
    title,
    focus: "Um passo curto e claro para o seu dia.",
    sequenceId: seqForDay(dayId),
    totalMin: 8 + ((dayId - 1) % 4) * 2,
    measurementRequired: dayId === 1 || dayId === 21,
    measurementSuggested: dayId === 7 || dayId === 14,
    habit: "Um pequeno gesto para consolidar o dia.",
    food: "Uma escolha alimentar simples e prática.",
    ceremony: dayId === 21,
  };
});

export const WEEK_LABEL: Record<1 | 2 | 3, string> = {
  1: "Semana 1 — Desinchar",
  2: "Semana 2 — Ativar",
  3: "Semana 3 — Firmar",
};

// Fotografia do Hero da Home, selecionada automaticamente pela semana do dia ativo.
export const WEEK_HERO_IMAGE: Record<1 | 2 | 3, string> = {
  1: "/imagens/biblioteca/hero-semana-1.webp.png",
  2: "/imagens/biblioteca/hero-semana-2.webp.png",
  3: "/imagens/biblioteca/hero-semana-3.webp.png",
};

export function dayById(id: number) {
  return DAYS.find((d) => d.id === id);
}

// ---------- Produtos oficiais ----------
export type ProductState = "acquired" | "available" | "recommended" | "locked" | "future";

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  benefit: string;
  category: "core" | "bump" | "upsell" | "downsell";
  price?: number; // referência de demonstração
  durationLabel: string;
  cover: "warm" | "green";
  image?: string;
  longDescription: string;
  highlights: string[];
  includes: string[]; // o que está incluído
}

export const PRODUCTS: Product[] = [
  {
    id: "plano-barriga-hormonal-40",
    title: "Plano Barriga Hormonal 40+",
    subtitle: "Sua jornada de 21 dias",
    benefit: "Reduza o inchaço e reative sua energia em 21 dias.",
    category: "core",
    durationLabel: "21 dias · guiado",
    cover: "warm",
    image: "/imagens/biblioteca/plano-barriga-hormonal-40.webp.png",
    longDescription:
      "Um protocolo de 21 dias pensado para mulheres 40+, com movimento de baixo impacto, alimentação prática, hábitos e check-ins.",
    highlights: [
      "Aproximadamente 8 minutos de movimento por dia",
      "Método Monta-Prato integrado",
      "Rituais de respiração e sono",
      "Medições opcionais para acompanhar sua evolução",
    ],
    includes: [
      "21 dias guiados",
      "21 insights guiados",
      "Sequências oficiais de movimento",
      "Biblioteca Alimentar",
      "Bônus oficiais em PDF",
    ],
  },
  {
    id: "chas-e-tonicos",
    title: "Chás & Tônicos Hormonais",
    subtitle: "PDF · 12 a 16 páginas",
    benefit: "Chás e tônicos organizados pelas funções do sistema.",
    category: "bump",
    price: 19,
    durationLabel: "Consulta rápida · PDF",
    cover: "green",
    image: "/imagens/biblioteca/chas-tonicos.webp.png",
    longDescription:
      "Um guia direto com chás e tônicos organizados por função, com quando usar, como preparar e cuidados de combinação.",
    highlights: [
      "Três tônicos de preparo rápido",
      "Contraindicações e interações",
      "Guia prático em PDF",
    ],
    includes: [
      "Chás por função",
      "Três tônicos rápidos",
      "Cuidados e disclaimers",
    ],
  },
  {
    id: "desinchar-express-24h",
    title: "Protocolo Desinchar Express 24H",
    subtitle: "PDF + 1 áudio guiado",
    benefit: "Um protocolo de 24 horas organizado hora a hora.",
    category: "bump",
    price: 17,
    durationLabel: "24 horas · PDF + áudio",
    cover: "warm",
    image: "/imagens/biblioteca/desinchar-24h.webp.png",
    longDescription:
      "O que comer e beber ao longo de um único dia, com sequência de drenagem express de 5 minutos e áudio do ritual noturno da véspera.",
    highlights: [
      "Cronograma hora a hora",
      "Drenagem express de 5 minutos",
      "Áudio do ritual noturno",
    ],
    includes: [
      "Protocolo de 24 horas",
      "Sequência de drenagem express",
      "Áudio guiado da véspera",
    ],
  },
  {
    id: "cozinha-hormonal-21-dias",
    title: "Cozinha Hormonal 21 Dias",
    subtitle: "Cardápio, guia e áudios",
    benefit: "Cardápio hormonal completo com apoio prático e ritual noturno.",
    category: "upsell",
    price: 67,
    durationLabel: "21 dias · cardápio completo",
    cover: "green",
    image: "/imagens/biblioteca/cozinha-hormonal.webp.png",
    longDescription:
      "Um cardápio hormonal estruturado com apoio prático, lista de compras semanal e três áudios de ritual noturno.",
    highlights: [
      "Cardápio de 21 dias",
      "Lista de compras por semana",
      "Guia de Sobrevivência Social",
      "Três áudios de ritual noturno",
    ],
    includes: [
      "Café, almoço, jantar e lanches",
      "Rotação de 7 dias, três vezes",
      "Guia para restaurante, festa, viagem, fim de semana e TPM",
      "Três áudios de ritual noturno",
    ],
  },
  {
    id: "cardapio-hormonal",
    title: "Cardápio Hormonal",
    subtitle: "Cardápio + lista de compras",
    benefit: "A versão essencial do cardápio de 21 dias.",
    category: "downsell",
    price: 37,
    durationLabel: "21 dias · cardápio",
    cover: "warm",
    image: "/imagens/biblioteca/cardapio-hormonal.webp.png",
    longDescription:
      "Uma alternativa focada apenas no Cardápio Hormonal de 21 Dias e na lista de compras correspondente.",
    highlights: [
      "Cardápio hormonal de 21 dias",
      "Lista de compras correspondente",
    ],
    includes: [
      "Cardápio de 21 dias",
      "Lista de compras",
    ],
  },
];

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// ---------- Bônus oficiais (front) ----------
export interface BonusItem {
  id: string;
  title: string;
  subtitle: string;
  type: "guide" | "checklist" | "diary";
  cover: "warm" | "green";
  image?: string;
  description: string;
  note?: string;
  // PDF real do bônus (public/imagens/biblioteca/bônus). Quando presente, o card abre o material
  // diretamente em /bonus/$id/pdf, sem passar pela tela intermediária.
  pdf?: string;
}

export const BONUSES: BonusItem[] = [
  {
    id: "guia-superalimentos-hormonais",
    title: "Guia de Superalimentos Hormonais",
    subtitle: "Bônus 1 · PDF/Guia",
    type: "guide",
    cover: "green",
    image: "/imagens/biblioteca/guia-superalimentos.webp.png",
    description: "Um guia prático com superalimentos organizados por função.",
    pdf: "/imagens/biblioteca/bônus/Guia-de-Superalimentos-Hormonais.pdf",
  },
  {
    id: "lista-8-pratos",
    title: "Lista de Compras dos 8 Pratos",
    subtitle: "Bônus 2 · PDF/Checklist imprimível",
    type: "checklist",
    cover: "warm",
    image: "/imagens/biblioteca/lista-8-pratos.webp.png",
    description: "A lista dos oito pratos incluídos no Front.",
    note: "Esta é apenas a lista dos oito pratos incluídos no Front. Não é o cardápio completo de 21 dias.",
    pdf: "/imagens/biblioteca/bônus/Lista-de-Compras-dos-8-Pratos.pdf",
  },
  {
    id: "diario-hormonal-21-dias",
    title: "Diário Hormonal de 21 Dias",
    subtitle: "Bônus 3 · PDF/Diário imprimível",
    type: "diary",
    cover: "warm",
    image: "/imagens/biblioteca/diario-21-dias.webp.png",
    description: "A versão offline e imprimível do registro dos 21 dias.",
    note: "Versão imprimível. O registro dentro do app continua funcionando normalmente.",
    pdf: "/imagens/biblioteca/bônus/Diario-Hormonal-de-21-Dias.pdf",
  },
];

export function bonusById(id: string) {
  return BONUSES.find((b) => b.id === id);
}

// ---------- Guias oficiais do front (Biblioteca Alimentar) ----------
export interface GuideItem {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  cover: "warm" | "green";
  image?: string;
  description: string;
  // PDF real do material (public/imagens/biblioteca/GAMMA PROJETOS). Quando presente, o card abre
  // o material diretamente em /guia/$id/pdf, sem passar pela tela intermediária.
  pdf?: string;
}

export const GUIDES: GuideItem[] = [
  {
    id: "metodo-monta-prato",
    title: "Método Monta-Prato",
    subtitle: "Guia interativo",
    cta: "Abrir método",
    cover: "warm",
    image: "/imagens/biblioteca/monta-prato.webp.png",
    description: "A base prática do Plano: como montar um prato equilibrado sem complicação.",
    pdf: "/imagens/biblioteca/GAMMA PROJETOS/Metodo-Monta-Prato.pdf",
  },
  {
    id: "superalimentos-e-substituicoes",
    title: "Superalimentos e Substituições",
    subtitle: "Guia interativo",
    cta: "Consultar guia",
    cover: "green",
    image: "/imagens/biblioteca/superalimentos.webp.png",
    description: "Trocas inteligentes que somam sem restringir.",
    pdf: "/imagens/biblioteca/GAMMA PROJETOS/Guia-de-Superalimentos-e-Substituicoes.pdf",
  },
  {
    id: "refeicoes-rapidas-e-emergenciais",
    title: "Refeições Rápidas e Emergenciais",
    subtitle: "Guia prático",
    cta: "Ver opções rápidas",
    cover: "warm",
    image: "/imagens/biblioteca/refeicoes-rapidas.webp.png",
    description: "Opções práticas para quando o tempo é curto.",
    pdf: "/imagens/biblioteca/GAMMA PROJETOS/Refeicoes-Rapidas-e-Emergenciais.pdf",
  },
  {
    id: "lista-de-compras-inteligente",
    title: "Lista de Compras Inteligente",
    subtitle: "Guia/checklist prático",
    cta: "Abrir lista",
    cover: "green",
    image: "/imagens/biblioteca/lista-compras.webp.png",
    description:
      "O que comprar e como manter uma alimentação saudável mesmo na correria do dia a dia.",
    pdf: "/imagens/biblioteca/GAMMA PROJETOS/Lista-de-Compras-Inteligente.pdf",
  },
];

export function guideById(id: string) {
  return GUIDES.find((g) => g.id === id);
}

// ---------- Notificações (mock apenas) ----------
export interface Notification {
  id: string;
  icon: "bell" | "sparkles" | "heart" | "info";
  title: string;
  message: string;
  when: string;
  read: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", icon: "sparkles", title: "Seu dia está pronto", message: "Vamos continuar de onde você parou.", when: "há 2h", read: false },
  { id: "n2", icon: "info", title: "Bem-vinda à VITTALLE", message: "Sua jornada de 21 dias começou.", when: "há 4 dias", read: true },
];

export const CHECKLIST_TEMPLATE = [
  "Beber 2 copos de água ao acordar",
  "Tomar sol por 10 minutos",
  "Fazer o movimento do dia",
  "Registrar como me sinto",
  "Ler a leitura do dia",
];

export const EXERCISES = [
  { name: "Respiração diafragmática", detail: "1 minuto", instruction: "Inspire pelo nariz por 4s, solte pela boca por 6s." },
  { name: "Ativação do core", detail: "2 x 30s", instruction: "Contraia o abdômen suavemente, mantendo a respiração fluida." },
  { name: "Ponte de glúteo", detail: "2 x 10", instruction: "Eleve o quadril devagar, mantendo o abdômen ativado." },
  { name: "Alongamento lateral", detail: "1 min por lado", instruction: "Alongue devagar, sem forçar. Respire fundo." },
  { name: "Rotação de tronco", detail: "2 x 8", instruction: "Movimento controlado, ombros relaxados." },
  { name: "Respiração final", detail: "1 minuto", instruction: "Feche os olhos e observe a respiração." },
];

// ---------- Compat: LIBRARY consolidada para telas antigas ----------
export interface ContentItem {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  category: string;
  durationMin: number;
  cover: "warm" | "green";
  body?: string;
  ownerProduct?: string; // id do produto pai (para gating de áudios pagos)
}

export const CATEGORY_LIST = ["Alimentação", "Movimento", "Leituras", "Bônus", "Áudios oficiais", "Materiais"];

// Constrói LIBRARY a partir dos itens oficiais.
export const LIBRARY: ContentItem[] = [
  ...GUIDES.map<ContentItem>((g) => ({
    id: g.id,
    type: "reading",
    title: g.title,
    subtitle: g.subtitle,
    category: "Alimentação",
    durationMin: 6,
    cover: g.cover,
    body: g.description,
  })),
  ...BONUSES.map<ContentItem>((b) => ({
    id: b.id,
    type: "download",
    title: b.title,
    subtitle: b.subtitle,
    category: "Bônus",
    durationMin: 0,
    cover: b.cover,
    body: b.description,
  })),
  ...READINGS.map<ContentItem>((r) => ({
    id: `leitura-dia-${r.dayId}`,
    type: "reading",
    title: `Leitura do Dia ${r.dayId} — ${r.title}`,
    subtitle: "Leitura oficial do dia",
    category: "Leituras",
    durationMin: 4,
    cover: r.dayId % 2 === 0 ? "green" : "warm",
    body: r.body,
  })),
  ...OFFICIAL_AUDIOS.filter((a) => a.owner === "front").map<ContentItem>((a) => ({
    id: a.id,
    type: "audio",
    title: a.title,
    subtitle: a.subtitle,
    category: "Áudios oficiais",
    durationMin: a.durationMin,
    cover: "warm",
    ownerProduct: "plano-barriga-hormonal-40",
  })),
  {
    id: "desinchar-express-audio",
    type: "audio",
    title: "Ritual noturno — Desinchar Express",
    subtitle: "Áudio do Bump 2",
    category: "Áudios oficiais",
    durationMin: 9,
    cover: "green",
    ownerProduct: "desinchar-express-24h",
  },
  {
    id: "cozinha-ritual-1",
    type: "audio",
    title: "Ritual noturno da Cozinha Hormonal — 1",
    subtitle: "Áudio do Upsell",
    category: "Áudios oficiais",
    durationMin: 8,
    cover: "green",
    ownerProduct: "cozinha-hormonal-21-dias",
  },
  {
    id: "cozinha-ritual-2",
    type: "audio",
    title: "Ritual noturno da Cozinha Hormonal — 2",
    subtitle: "Áudio do Upsell",
    category: "Áudios oficiais",
    durationMin: 8,
    cover: "green",
    ownerProduct: "cozinha-hormonal-21-dias",
  },
  {
    id: "cozinha-ritual-3",
    type: "audio",
    title: "Ritual noturno da Cozinha Hormonal — 3",
    subtitle: "Áudio do Upsell",
    category: "Áudios oficiais",
    durationMin: 8,
    cover: "green",
    ownerProduct: "cozinha-hormonal-21-dias",
  },
];

export function contentById(id: string): ContentItem | undefined {
  return LIBRARY.find((c) => c.id === id);
}

// ---------- Marcos (progresso) ----------
export const MILESTONES = [
  { id: "m1", title: "Primeiro dia concluído", description: "Você começou sua jornada." },
  { id: "m2", title: "Primeira semana", description: "7 dias de consistência." },
  { id: "m3", title: "Metade do caminho", description: "14 dias concluídos." },
  { id: "m4", title: "Jornada completa", description: "21 dias." },
  { id: "m5", title: "Medição inicial registrada", description: "Você começou a acompanhar sua evolução." },
];

// Compat legado: activityById existia; mantido como no-op para não quebrar imports pontuais.
export interface Activity {
  id: string;
  dayId: number;
  type: ActivityType;
  title: string;
  description: string;
  durationMin: number;
  category: string;
}
export const ACTIVITIES: Activity[] = [];
export function activityById(_id: string): Activity | undefined {
  return undefined;
}
