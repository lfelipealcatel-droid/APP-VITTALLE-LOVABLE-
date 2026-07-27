import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { LIBRARY } from "@/lib/mock-data";

export const Route = createFileRoute("/buscar")({
  head: () => ({ meta: [{ title: "Buscar — VITTALLE" }, { name: "description", content: "Encontre conteúdos, práticas e materiais." }] }),
  component: Buscar,
});

const RECENT = ["Respiração", "Monta-Prato", "Meditação"];
const POPULAR = ["Movimento leve", "Superalimentos", "Sono"];

function Buscar() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const norm = q.trim().toLowerCase();
    if (!norm) return [];
    return LIBRARY.filter((c) =>
      c.title.toLowerCase().includes(norm) ||
      c.subtitle.toLowerCase().includes(norm) ||
      c.category.toLowerCase().includes(norm),
    );
  }, [q]);

  return (
    <AppShell title="Buscar" back="/biblioteca">
      <label className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5">
        <Search size={18} className="text-text-muted" aria-hidden />
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="O que você está procurando?"
          className="w-full bg-transparent text-sm outline-none placeholder:text-text-muted"
          aria-label="Buscar conteúdos"
        />
      </label>

      {!q ? (
        <div className="mt-6 grid gap-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text-secondary">Buscas recentes</h3>
            <div className="flex flex-wrap gap-2">
              {RECENT.map((r) => (
                <button key={r} type="button" onClick={() => setQ(r)} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text-secondary">Populares</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((r) => (
                <button key={r} type="button" onClick={() => setQ(r)} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : results.length ? (
        <div className="mt-6 grid gap-2">
          {results.map((c) => <ContentCard key={c.id} item={c} variant="row" />)}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Não encontramos esse conteúdo."
            description="Tente outro termo ou explore por categoria."
            action={<Link to="/biblioteca" className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">Explorar a biblioteca</Link>}
          />
        </div>
      )}
    </AppShell>
  );
}
