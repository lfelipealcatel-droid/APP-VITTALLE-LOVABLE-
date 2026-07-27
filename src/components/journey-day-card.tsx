import { Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JourneyDay } from "@/lib/mock-data";

export type DayState = "completed" | "current" | "available" | "future";

export function JourneyDayCard({
  day,
  state,
  progress,
}: {
  day: JourneyDay;
  state: DayState;
  progress: number; // 0..1
}) {
  const isLocked = state === "future";
  const containerCls = cn(
    "relative flex items-center gap-4 rounded-2xl border p-4 transition",
    state === "current" && "border-primary bg-warm shadow-soft",
    state === "completed" && "border-border bg-surface",
    state === "available" && "border-border bg-surface",
    state === "future" && "border-dashed border-border bg-surface/60 opacity-80",
  );

  const content = (
    <>
      <div
        className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-semibold",
          state === "current" && "bg-primary text-primary-foreground",
          state === "completed" && "bg-secondary-light text-secondary-dark",
          state === "available" && "bg-surface-2 text-text-secondary",
          state === "future" && "bg-surface-2 text-text-muted",
        )}
        aria-hidden
      >
        {state === "completed" ? <Check size={18} /> : state === "future" ? <Lock size={16} /> : day.id}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wide text-text-muted">Dia {day.id} · {day.totalMin} min</p>
        <p className="truncate text-sm font-semibold">{day.title}</p>
        <p className="truncate text-xs text-text-secondary">{day.focus}</p>
        {state !== "future" && progress > 0 ? (
          <div className="mt-2 h-1 w-full rounded-full bg-surface-2">
            <div className="h-1 rounded-full bg-primary" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        ) : null}
      </div>
    </>
  );

  if (isLocked) {
    return <div className={containerCls}>{content}</div>;
  }
  return (
    <Link to="/jornada/$dia" params={{ dia: String(day.id) }} className={containerCls}>
      {content}
    </Link>
  );
}
