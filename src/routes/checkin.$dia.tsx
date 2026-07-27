import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Check, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { DAYS } from "@/lib/mock-data";
import { isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkin/$dia")({
  loader: ({ params }) => {
    const day = DAYS.find((d) => d.id === Number(params.dia));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Check-in · Dia ${loaderData.day.id} — VITTALLE` : "Check-in — VITTALLE" },
      { name: "description", content: "Como você está se sentindo hoje?" },
    ],
  }),
  component: CheckinPage,
  notFoundComponent: () => (
    <AppShell title="Dia não encontrado" back={true}>
      <p className="text-sm text-text-secondary">Este dia não existe.</p>
    </AppShell>
  ),
});

const MOODS = [
  { id: "leve", label: "Leve" },
  { id: "estavel", label: "Estável" },
  { id: "cansada", label: "Cansada" },
  { id: "animada", label: "Animada" },
] as const;

function CheckinPage() {
  const { day } = Route.useLoaderData();
  const [state] = useAppState();
  const navigate = useNavigate();
  const alreadyDone = isDayActivityDone(state, day.id, "checkin");

  const [mood, setMood] = useState<string>("");
  const [energy, setEnergy] = useState(3);
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDayActivity(day.id, "checkin", true);
    toast.success("Check-in registrado");
    if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
    else navigate({ to: "/jornada/$dia", params: { dia: String(day.id) } });
  };

  return (
    <AppShell title="Check-in" subtitle={`Dia ${day.id}`} back={true}>
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <HeartHandshake size={14} aria-hidden /> Como você está agora
        </div>
        <h1 className="mt-2 font-editorial text-2xl">Um momento para se escutar</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Sem certo ou errado. Só um registro leve para acompanhar seu ritmo.
        </p>
      </section>

      <form onSubmit={submit} className="mt-4 grid gap-5 rounded-2xl border border-border bg-surface p-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">Sensação</p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setMood(m.id)}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm",
                  mood === m.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface hover:bg-surface-2",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Energia hoje (1 a 5): <b className="text-text-primary">{energy}</b></span>
          <input type="range" min={1} max={5} value={energy} onChange={(e) => setEnergy(Number(e.target.value))} />
        </label>

        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Uma palavra ou frase (opcional)</span>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Como você chegou até aqui hoje?"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Check size={16} aria-hidden /> {alreadyDone ? "Salvar novamente" : "Salvar check-in"}
        </button>
      </form>
    </AppShell>
  );
}
