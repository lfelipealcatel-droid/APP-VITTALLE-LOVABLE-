import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { LIBRARY } from "@/lib/mock-data";
import { useAppState, useToggleId } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "Downloads — VITTALLE" }, { name: "description", content: "Conteúdos baixados para acesso offline." }] }),
  component: Downloads,
});

function Downloads() {
  const [state] = useAppState();
  const toggle = useToggleId("downloads");
  const items = LIBRARY.filter((c) => state.downloads.includes(c.id));
  return (
    <AppShell title="Downloads" back="/biblioteca">
      {items.length ? (
        <ul className="grid gap-2">
          {items.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-warm text-primary">
                <Download size={18} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.title}</p>
                <p className="text-xs text-text-secondary">PDF · 1,2 MB · Concluído</p>
              </div>
              <button
                type="button"
                aria-label="Remover"
                onClick={() => { toggle(c.id, false); toast.success("Download removido"); }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-muted hover:bg-surface-2"
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<Download size={28} aria-hidden />}
          title="Você ainda não baixou nenhum conteúdo."
          description="Materiais salvos ficam disponíveis mesmo sem conexão."
          action={<Link to="/biblioteca" className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">Explorar materiais</Link>}
        />
      )}
    </AppShell>
  );
}
