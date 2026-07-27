import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/perfil/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — VITTALLE" }] }),
  component: NotifPrefs,
});

const ITEMS: Array<{ key: keyof ReturnType<typeof keys>; label: string; desc: string }> = [
  { key: "dailyReminder" as never, label: "Lembrete diário", desc: "Um toque suave para você continuar sua jornada." },
  { key: "newActivity" as never, label: "Nova atividade disponível", desc: "Avisamos quando sua atividade do dia estiver pronta." },
  { key: "recommended" as never, label: "Conteúdo recomendado", desc: "Sugestões alinhadas ao que você mais aproveita." },
  { key: "progress" as never, label: "Progresso da jornada", desc: "Pequenos marcos e conquistas suas." },
  { key: "important" as never, label: "Mensagens importantes", desc: "Comunicados essenciais sobre sua conta." },
];
function keys() { return { dailyReminder: true, newActivity: true, recommended: true, progress: true, important: true }; }

function NotifPrefs() {
  const [state, set] = useAppState();
  const p = state.notificationPrefs;
  return (
    <AppShell title="Notificações" back="/perfil" hideMiniPlayer>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {ITEMS.map((it, i) => (
          <div key={String(it.key)} className={`flex items-center justify-between gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
            <div>
              <p className="text-sm font-medium">{it.label}</p>
              <p className="text-xs text-text-secondary">{it.desc}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={p[it.key as keyof typeof p]}
              onClick={() => set({ notificationPrefs: { ...p, [it.key]: !p[it.key as keyof typeof p] } })}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${p[it.key as keyof typeof p] ? "bg-primary" : "bg-surface-2"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${p[it.key as keyof typeof p] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
