import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { BONUSES, bonusById } from "@/lib/mock-data";

export const Route = createFileRoute("/bonus/$id/conteudo")({
  loader: ({ params }) => {
    const b = bonusById(params.id);
    if (!b) throw notFound();
    return { bonus: b };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.bonus.title} — Conteúdo` : "Bônus — Conteúdo" },
      { name: "description", content: loaderData?.bonus.description ?? "Bônus VITTALLE." },
    ],
  }),
  component: ConteudoBonus,
  notFoundComponent: () => (
    <AppShell title="Bônus" back="/biblioteca">
      <p className="text-sm text-text-secondary">Bônus não encontrado.</p>
    </AppShell>
  ),
});

function ConteudoBonus() {
  const { bonus } = Route.useLoaderData();
  const isChecklist = bonus.type === "checklist";
  const isDiary = bonus.type === "diary";

  return (
    <AppShell title={bonus.title} subtitle="Material" back={`/bonus/${bonus.id}`} hideMiniPlayer>
      <MediaPlaceholder type="download" cover={bonus.cover} aspect="wide" label={isChecklist ? "Checklist" : isDiary ? "Diário" : "Guia"} />

      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <FileText size={14} aria-hidden />
          <span>{isChecklist ? "Checklist interativo" : isDiary ? "Diário interativo" : "Guia interativo"}</span>
        </div>
        <h2 className="mt-2 font-editorial text-xl">{bonus.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{bonus.description}</p>

        {isChecklist ? (
          <ul className="mt-5 grid gap-2">
            {["Prato 1", "Prato 2", "Prato 3", "Prato 4", "Prato 5", "Prato 6", "Prato 7", "Prato 8"].map((p) => (
              <li key={p} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-sm">Ingredientes de {p}</span>
              </li>
            ))}
          </ul>
        ) : isDiary ? (
          <div className="mt-5 grid gap-2">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => (
              <div key={d} className="rounded-xl border border-border bg-surface-2 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Dia {d}</p>
                <p className="mt-1 text-sm text-text-secondary">Espaço para registro pessoal do dia.</p>
              </div>
            ))}
            <p className="text-xs text-text-muted">Os 21 dias completos ficarão disponíveis aqui.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            <article className="rounded-xl border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-semibold">Superalimentos por função</h3>
              <p className="mt-1 text-sm text-text-secondary">Uma seleção organizada pelo papel hormonal e prático.</p>
            </article>
            <article className="rounded-xl border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-semibold">Como incluir no dia a dia</h3>
              <p className="mt-1 text-sm text-text-secondary">Sugestões de uso simples e sem restrição.</p>
            </article>
          </div>
        )}

        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-6 inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-text-muted"
        >
          <Download size={16} aria-hidden /> Baixar PDF — em breve
        </button>
      </section>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to="/bonus/$id" params={{ id: bonus.id }} className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-surface px-4 text-sm font-medium">
          <ArrowLeft size={16} aria-hidden /> Voltar
        </Link>
        {BONUSES.filter((b) => b.id !== bonus.id).map((b) => (
          <Link key={b.id} to="/bonus/$id/conteudo" params={{ id: b.id }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
            {b.title}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
