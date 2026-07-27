import { createFileRoute } from "@tanstack/react-router";
import { Bell, Heart, Info, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { useAppState, useToggleId } from "@/lib/store";

const ICONS = { bell: Bell, sparkles: Sparkles, heart: Heart, info: Info } as const;

export const Route = createFileRoute("/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — VITTALLE" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [state] = useAppState();
  const toggle = useToggleId("notificationsRead");
  const items = NOTIFICATIONS;
  return (
    <AppShell title="Notificações" back="/">
      {items.length ? (
        <ul className="grid gap-2">
          {items.map((n) => {
            const Icon = ICONS[n.icon];
            const read = state.notificationsRead.includes(n.id);
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => toggle(n.id, true)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${read ? "border-border bg-surface" : "border-primary/30 bg-warm"}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon size={16} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-[11px] text-text-muted">{n.when}</span>
                    </span>
                    <span className="mt-1 block text-xs text-text-secondary">{n.message}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState title="Você não possui novas notificações." />
      )}
    </AppShell>
  );
}
