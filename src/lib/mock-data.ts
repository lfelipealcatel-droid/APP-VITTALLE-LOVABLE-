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

// ---------- Leituras (uma por dia) ----------
export interface Reading {
  dayId: number;
  title: string;
  intro: string;
  body: string; // placeholder — texto real será inserido depois
  audioId: string; // id da narração oficial
}

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

export const READINGS: Reading[] = READING_TITLES.map((title, i) => ({
  dayId: i + 1,
  title,
  intro: "Leitura curta para conduzir o seu dia.",
  body:
    "Este é um espaço reservado para a leitura oficial do dia. O texto definitivo será inserido em uma etapa posterior. Enquanto isso, use este momento para respirar e se preparar para o próximo passo.",
  audioId: `narracao-dia-${i + 1}`,
}));

export function readingByDay(dayId: number) {
  return READINGS.find((r) => r.dayId === dayId);
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
      "21 leituras com narração",
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
  description: string;
  note?: string;
}

export const BONUSES: BonusItem[] = [
  {
    id: "guia-superalimentos-hormonais",
    title: "Guia de Superalimentos Hormonais",
    subtitle: "Bônus 1 · PDF/Guia",
    type: "guide",
    cover: "green",
    description: "Um guia prático com superalimentos organizados por função.",
  },
  {
    id: "lista-8-pratos",
    title: "Lista de Compras dos 8 Pratos",
    subtitle: "Bônus 2 · PDF/Checklist imprimível",
    type: "checklist",
    cover: "warm",
    description: "A lista dos oito pratos incluídos no Front.",
    note: "Esta é apenas a lista dos oito pratos incluídos no Front. Não é o cardápio completo de 21 dias.",
  },
  {
    id: "diario-hormonal-21-dias",
    title: "Diário Hormonal de 21 Dias",
    subtitle: "Bônus 3 · PDF/Diário imprimível",
    type: "diary",
    cover: "warm",
    description: "A versão offline e imprimível do registro dos 21 dias.",
    note: "Versão imprimível. O registro dentro do app continua funcionando normalmente.",
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
  description: string;
}

export const GUIDES: GuideItem[] = [
  {
    id: "metodo-monta-prato",
    title: "Método Monta-Prato",
    subtitle: "Guia interativo",
    cta: "Abrir método",
    cover: "warm",
    description: "A base prática do Plano: como montar um prato equilibrado sem complicação.",
  },
  {
    id: "superalimentos-e-substituicoes",
    title: "Superalimentos e Substituições",
    subtitle: "Guia interativo",
    cta: "Consultar guia",
    cover: "green",
    description: "Trocas inteligentes que somam sem restringir.",
  },
  {
    id: "refeicoes-rapidas-e-emergenciais",
    title: "Refeições Rápidas e Emergenciais",
    subtitle: "Guia prático",
    cta: "Ver opções rápidas",
    cover: "warm",
    description: "Opções práticas para quando o tempo é curto.",
  },
  {
    id: "lista-de-compras-inteligente",
    title: "Lista de Compras Inteligente",
    subtitle: "Guia/checklist prático",
    cta: "Abrir lista",
    cover: "green",
    description:
      "O que comprar e como manter uma alimentação saudável mesmo na correria do dia a dia.",
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
