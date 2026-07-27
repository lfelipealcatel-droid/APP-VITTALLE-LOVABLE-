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

export function setDayActivity(dayId: number, key: DayActivityKey, done: boolean) {
  setState((prev) => ({
    dayActivities: { ...prev.dayActivities, [`${dayId}:${key}`]: done },
  }));
}

export function isDayActivityDone(state: AppState, dayId: number, key: DayActivityKey) {
  return !!state.dayActivities[`${dayId}:${key}`];
}

const DAY_KEYS: DayActivityKey[] = ["leitura", "sequencia", "alimentacao", "habito", "checkin"];

export function dayProgress(state: AppState, dayId: number, includesMeasurement = false) {
  const keys = includesMeasurement ? [...DAY_KEYS, "medicao" as DayActivityKey] : DAY_KEYS;
  const done = keys.filter((k) => state.dayActivities[`${dayId}:${k}`]).length;
  return { done, total: keys.length, ratio: done / keys.length };
}

export function isDayCompleted(state: AppState, dayId: number, includesMeasurement = false) {
  const { done, total } = dayProgress(state, dayId, includesMeasurement);
  return done >= total;
}

// Regra do Modo Cliente: dia N está liberado se:
// - o dia N-1 foi concluído (todos os blocos principais), OU
// - N = 1 (sempre disponível para começar)
// - Modo Demo: qualquer dia é acessível.
export function currentUnlockedDay(state: AppState): number {
  if (state.demoMode) return 21;
  let day = 1;
  for (let i = 1; i <= 20; i++) {
    if (isDayCompleted(state, i)) day = i + 1;
    else break;
  }
  return day;
}

export function canOpenDay(state: AppState, dayId: number): boolean {
  if (state.demoMode) return true;
  return dayId <= currentUnlockedDay(state);
}

// "Dia atual" para a experiência da cliente
export function activeDay(state: AppState): number {
  if (state.demoMode && state.demoDayOverride) return state.demoDayOverride;
  const unlocked = currentUnlockedDay(state);
  // se o dia atual está completo e existe próximo desbloqueado, ir para ele; senão continuar no atual
  for (let i = 1; i <= 21; i++) {
    if (!isDayCompleted(state, i)) return Math.min(i, unlocked);
  }
  return 21;
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

export function completeOnboardingStep(step: keyof OnboardingState, value = true) {
  setState((prev) => ({
    onboarding: { ...prev.onboarding, [step]: value },
    onboarded: value && Object.entries({ ...prev.onboarding, [step]: value }).every(([, v]) => v),
    startDateISO: prev.startDateISO ?? new Date().toISOString(),
  }));
}

export function resetAll() {
  current = DEFAULT_STATE;
  writeState(current);
  listeners.forEach((l) => l(current!));
}

export function resetDemo() {
  setState({
    dayActivities: {},
    completedActivities: [],
    measurements: [],
    demoDayOverride: null,
    onboarding: DEFAULT_STATE.onboarding,
    onboarded: false,
    startDateISO: null,
  });
}
