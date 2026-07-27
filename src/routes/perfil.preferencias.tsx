import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/perfil/preferencias")({
  head: () => ({ meta: [{ title: "Preferências — VITTALLE" }] }),
  component: Preferencias,
});

function Preferencias() {
  const [state, set] = useAppState();
  return (
    <AppShell title="Preferências" back="/perfil" hideMiniPlayer>
      <div className="grid gap-3 rounded-2xl border border-border bg-surface p-5">
        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Horário do lembrete diário</span>
          <input type="time" className="input" value={state.preferences.reminderTime}
            onChange={(e) => set({ preferences: { ...state.preferences, reminderTime: e.target.value } })} />
        </label>
        <Toggle label="Reduzir animações" description="Movimento mais discreto para melhor conforto." checked={state.preferences.reducedMotion}
          onChange={(v) => set({ preferences: { ...state.preferences, reducedMotion: v } })} />
        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Velocidade padrão de reprodução</span>
          <select className="input" value={state.preferences.playbackSpeed}
            onChange={(e) => set({ preferences: { ...state.preferences, playbackSpeed: Number(e.target.value) } })}>
            {[0.75, 1, 1.25, 1.5].map((s) => <option key={s} value={s}>{s}x</option>)}
          </select>
        </label>
        <button type="button" onClick={() => toast.success("Alterações salvas")} className="mt-2 min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
          Salvar preferências
        </button>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:10px 12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </AppShell>
  );
}

function Toggle({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description ? <p className="text-xs text-text-secondary">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-primary" : "bg-surface-2"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
