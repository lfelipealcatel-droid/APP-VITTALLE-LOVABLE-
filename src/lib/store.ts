// Persistência local do protótipo VITTALLE. Toda a informação vive em localStorage.
import { useCallback, useEffect, useState } from "react";

const KEY = "vittalle-state-v2";

export type DayActivityKey =
  | "leitura"
  | "sequencia"
  | "alimentacao"
  | "habito"
  | "checkin"
  | "medicao";

export interface Measurement {
  id: string;
  date: string;
  waist?: number;
  abdomen?: number;
  weight?: number;
  energy?: number;
  bloating?: number;
  notes?: string;
  initial?: boolean;
  final?: boolean;
}

export interface OnboardingState {
  inaugural: boolean;
  absolvicao: boolean;
  orientacaoMedicao: boolean;
  medicaoInicial: boolean;
  horario: boolean;
  mapa: boolean;
}

export interface AppState {
  authed: boolean;
  onboarded: boolean;
  onboarding: OnboardingState;
  startDateISO: string | null;

  // Progresso por dia por bloco (chave: `${dayId}:${key}`)
  dayActivities: Record<string, boolean>;

  // Data local (YYYY-MM-DD, fuso do navegador) em que cada `dayActivities` virou true — mesma chave
  // (`${dayId}:${key}`). Usado hoje só para "sequencia" (Aula do Dia): é o que permite saber se já
  // "virou o dia" desde que a aula foi concluída, sem depender de um timer de 24h corridas.
  activityDates: Record<string, string>;

  // Compat: ids de conteúdos "concluídos" (usado por Home/telas antigas)
  completedActivities: string[];

  favorites: string[];
  downloads: string[];
  mediaProgress: Record<string, number>;
  checklist: Record<string, boolean>;
  measurements: Measurement[];
  notificationsRead: string[];
  ownedProducts: string[]; // entitlements simulados

  // Modo demonstração
  demoMode: boolean;
  demoDayOverride: number | null;

  preferences: {
    reminderTime: string;
    reducedMotion: boolean;
    playbackSpeed: number;
    units: "metric";
    interests: string[];
  };
  notificationPrefs: {
    dailyReminder: boolean;
    newActivity: boolean;
    recommended: boolean;
    progress: boolean;
    important: boolean;
  };
  lastMediaId: string | null;
}

const DEFAULT_STATE: AppState = {
  authed: true,
  onboarded: false,
  onboarding: {
    inaugural: false,
    absolvicao: false,
    orientacaoMedicao: false,
    medicaoInicial: false,
    horario: false,
    mapa: false,
  },
  startDateISO: null,
  dayActivities: {},
  activityDates: {},
  completedActivities: [],
  favorites: [],
  downloads: [],
  mediaProgress: {},
  checklist: {},
  measurements: [],
  notificationsRead: [],
  ownedProducts: ["plano-barriga-hormonal-40"],
  demoMode: false,
  demoDayOverride: null,
  preferences: {
    reminderTime: "08:00",
    reducedMotion: false,
    playbackSpeed: 1,
    units: "metric",
    interests: [],
  },
  notificationPrefs: {
    dailyReminder: true,
    newActivity: true,
    recommended: false,
    progress: true,
    important: true,
  },
  lastMediaId: null,
};

function readState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      onboarding: { ...DEFAULT_STATE.onboarding, ...(parsed.onboarding ?? {}) },
      preferences: { ...DEFAULT_STATE.preferences, ...(parsed.preferences ?? {}) },
      notificationPrefs: { ...DEFAULT_STATE.notificationPrefs, ...(parsed.notificationPrefs ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(s: AppState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

type Listener = (s: AppState) => void;
const listeners = new Set<Listener>();
let current: AppState | null = null;

function getState(): AppState {
  if (current) return current;
  current = readState();
  return current;
}

export function setState(update: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
  const prev = getState();
  const patch = typeof update === "function" ? update(prev) : update;
  current = { ...prev, ...patch };
  writeState(current);
  listeners.forEach((l) => l(current!));
}

export function useAppState(): [AppState, typeof setState] {
  // Always start with DEFAULT_STATE to match SSR; hydrate from localStorage after mount.
  const [s, setS] = useState<AppState>(DEFAULT_STATE);
  useEffect(() => {
    setS(getState());
    const l: Listener = (next) => setS(next);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return [s, setState];
}


export function useToggleId(field: "favorites" | "downloads" | "completedActivities" | "notificationsRead" | "ownedProducts") {
  const [, set] = useAppState();
  return useCallback(
    (id: string, value?: boolean) => {
      set((prev) => {
        const list = prev[field];
        const has = list.includes(id);
        const shouldHave = value ?? !has;
        if (shouldHave === has) return {};
        return { [field]: shouldHave ? [...list, id] : list.filter((x) => x !== id) } as Partial<AppState>;
      });
    },
    [field, set],
  );
}

export function markMediaProgress(id: string, progress: number) {
  setState((prev) => ({ mediaProgress: { ...prev.mediaProgress, [id]: progress }, lastMediaId: id }));
}
export function setChecklistItem(dayId: number, index: number, value: boolean) {
  setState((prev) => ({ checklist: { ...prev.checklist, [`${dayId}:${index}`]: value } }));
}
export function addMeasurement(m: Omit<Measurement, "id">) {
  setState((prev) => ({ measurements: [{ id: `meas-${Date.now()}`, ...m }, ...prev.measurements] }));
}
export function removeMeasurement(id: string) {
  setState((prev) => ({ measurements: prev.measurements.filter((m) => m.id !== id) }));
}

// Data local (fuso do navegador, não UTC) no formato YYYY-MM-DD — usada para saber se "já virou o
// dia" desde uma conclusão, sem depender de uma espera móvel de 24 horas corridas.
function todayLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function setDayActivity(dayId: number, key: DayActivityKey, done: boolean) {
  setState((prev) => {
    const activityKey = `${dayId}:${key}`;
    const nextDates = { ...prev.activityDates };
    if (done) {
      nextDates[activityKey] = todayLocalDateString();
    } else {
      delete nextDates[activityKey];
    }
    return {
      dayActivities: { ...prev.dayActivities, [activityKey]: done },
      activityDates: nextDates,
    };
  });
}

export function isDayActivityDone(state: AppState, dayId: number, key: DayActivityKey) {
  return !!state.dayActivities[`${dayId}:${key}`];
}

export const DAY_KEYS: DayActivityKey[] = ["leitura", "sequencia", "alimentacao", "habito", "checkin"];

// Remove somente as chaves de dayActivities do dia informado (uso: painel /demo). Não toca outros dias, onboarding, medições ou produtos.
export function clearDayActivities(dayId: number) {
  setState((prev) => {
    const next = { ...prev.dayActivities };
    const nextDates = { ...prev.activityDates };
    for (const key of Object.keys(next)) {
      if (key.startsWith(`${dayId}:`)) delete next[key];
    }
    for (const key of Object.keys(nextDates)) {
      if (key.startsWith(`${dayId}:`)) delete nextDates[key];
    }
    return { dayActivities: next, activityDates: nextDates };
  });
}

export function dayProgress(state: AppState, dayId: number, includesMeasurement = false) {
  const keys = includesMeasurement ? [...DAY_KEYS, "medicao" as DayActivityKey] : DAY_KEYS;
  const done = keys.filter((k) => state.dayActivities[`${dayId}:${k}`]).length;
  return { done, total: keys.length, ratio: done / keys.length };
}

export function isDayCompleted(state: AppState, dayId: number, includesMeasurement = false) {
  const { done, total } = dayProgress(state, dayId, includesMeasurement);
  return done >= total;
}

// A Aula do Dia é o requisito técnico de progressão (aprovado): dia N libera o dia N+1 somente
// quando a aula de N foi concluída E a data local já mudou desde essa conclusão — não é uma espera
// de 24h corridas, é literalmente "virar o calendário" no fuso do navegador. Leitura, Alimentação,
// Hábito e Check-in continuam existindo e podendo ser marcados, mas não bloqueiam a progressão.
function hasAdvancedPastDay(state: AppState, dayId: number): boolean {
  const aulaDone = !!state.dayActivities[`${dayId}:sequencia`];
  if (!aulaDone) return false;
  const completedOn = state.activityDates[`${dayId}:sequencia`];
  // Compatibilidade com estado legado: conclusões gravadas antes de `activityDates` existir não têm
  // essa data. Não inventamos uma data retroativa nem apagamos o progresso — uma aula já concluída
  // sem data registrada é tratada como já elegível para a progressão (não fica presa esperando para
  // sempre só porque o campo novo ainda não existia quando ela foi marcada).
  if (!completedOn) return true;
  return completedOn !== todayLocalDateString();
}

// Regra do Modo Cliente: dia N está liberado se:
// - a aula do dia N-1 foi concluída E a data local mudou desde então, OU
// - N = 1 (sempre disponível para começar)
// - Modo Demo: qualquer dia é acessível.
export function currentUnlockedDay(state: AppState): number {
  if (state.demoMode) return 21;
  let day = 1;
  for (let i = 1; i <= 20; i++) {
    if (hasAdvancedPastDay(state, i)) day = i + 1;
    else break;
  }
  return day;
}

export function canOpenDay(state: AppState, dayId: number): boolean {
  if (state.demoMode) return true;
  return dayId <= currentUnlockedDay(state);
}

// "Dia atual" para a experiência da cliente — o primeiro dia liberado cuja aula ainda não foi
// concluída. Se a aula de todos os dias liberados já está feita (aguardando a data virar para
// liberar o próximo), permanece no último dia liberado. Visitar um dia anterior para revisão não
// muda este cálculo: ele só olha `dayActivities`/`activityDates`, nunca a rota atual.
export function activeDay(state: AppState): number {
  if (state.demoMode && state.demoDayOverride) return state.demoDayOverride;
  const unlocked = currentUnlockedDay(state);
  for (let i = 1; i <= unlocked; i++) {
    if (!isDayActivityDone(state, i, "sequencia")) return i;
  }
  return unlocked;
}

export function hasInitialMeasurement(state: AppState) {
  return state.measurements.some((m) => m.initial);
}

export function hasFinalMeasurement(state: AppState) {
  return state.measurements.some((m) => m.final);
}

export function ownsProduct(state: AppState, id: string) {
  return state.ownedProducts.includes(id);
}

export function setOwnedProduct(id: string, owned: boolean) {
  setState((prev) => {
    const has = prev.ownedProducts.includes(id);
    if (has === owned) return {};
    return {
      ownedProducts: owned ? [...prev.ownedProducts, id] : prev.ownedProducts.filter((x) => x !== id),
    };
  });
}

export function toggleDemoMode(v?: boolean) {
  setState((prev) => ({ demoMode: v ?? !prev.demoMode }));
}

export function setDemoDayOverride(day: number | null) {
  setState({ demoDayOverride: day });
}

// Passos exigidos para considerar o onboarding concluído. "absolvicao" e "horario" ficaram de fora
// porque não fazem mais parte do bloco "Prepare seu primeiro dia" (Dia 1) — sem isso, `onboarded`
// nunca viraria true, já que nada na experiência da usuária ainda marca esses dois passos.
const REQUIRED_ONBOARDING_STEPS: (keyof OnboardingState)[] = [
  "inaugural",
  "orientacaoMedicao",
  "medicaoInicial",
  "mapa",
];

export function completeOnboardingStep(step: keyof OnboardingState, value = true) {
  setState((prev) => {
    const nextOnboarding = { ...prev.onboarding, [step]: value };
    return {
      onboarding: nextOnboarding,
      onboarded: value && REQUIRED_ONBOARDING_STEPS.every((s) => nextOnboarding[s]),
      startDateISO: prev.startDateISO ?? new Date().toISOString(),
    };
  });
}

export function resetAll() {
  current = DEFAULT_STATE;
  writeState(current);
  listeners.forEach((l) => l(current!));
}

export function resetDemo() {
  setState({
    dayActivities: {},
    activityDates: {},
    completedActivities: [],
    measurements: [],
    demoDayOverride: null,
    onboarding: DEFAULT_STATE.onboarding,
    onboarded: false,
    startDateISO: null,
  });
}
