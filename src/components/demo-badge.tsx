import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { useAppState, toggleDemoMode } from "@/lib/store";

export function DemoBadge() {
  const [state] = useAppState();
  if (!state.demoMode) return null;
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-primary-dark px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
      <span className="inline-flex items-center gap-2">
        <FlaskConical size={12} aria-hidden />
        Modo demonstração
      </span>
      <span className="flex items-center gap-3">
        <Link to="/demo" className="underline underline-offset-2">Abrir painel</Link>
        <button type="button" onClick={() => toggleDemoMode(false)} className="opacity-90 hover:opacity-100">
          Sair
        </button>
      </span>
    </div>
  );
}
