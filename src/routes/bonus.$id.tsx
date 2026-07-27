import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { BONUSES, bonusById } from "@/lib/mock-data";

export const Route = createFileRoute("/bonus/$id")({
  loader: ({ params }) => {
    const b = bonusById(params.id);
    if (!b) throw notFound();
    return { bonus: b };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.bonus.title} — VITTALLE` : "Bônus — VITTALLE" },
      { name: "description", content: loaderData?.bonus.description ?? "Bônus oficial VITTALLE." },
    ],
  }),
  component: BonusPage,
  notFoundComponent: () => (
    <AppShell title="Bônus" back="/biblioteca">
      <p className="text-sm text-text-secondary">Este bônus não foi encontrado.</p>
    </AppShell>
  ),
});

const PRIMARY_LABEL: Record<string, string> = {
  "guia-superalimentos-hormonais": "ABRIR GUIA",
  "lista-8-pratos": "ABRIR CHECKLIST",
  "diario-hormonal-21-dias": "ABRIR DIÁRIO",
};

function BonusPage() {
  const { bonus } = Route.useLoaderData();
  const label = PRIMARY_LABEL[bonus.id] ?? "ABRIR";
  return (
    <AppShell title={bonus.title} subtitle={bonus.subtitle} back="/biblioteca" hideMiniPlayer>
      <MediaPlaceholder type="download" cover={bonus.cover} aspect="wide" label={bonus.type === "checklist" ? "Checklist" : bonus.type === "diary" ? "Diário" : "Guia"} />

      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm">{bonus.description}</p>
        {bonus.note ? <p className="mt-3 rounded-lg border border-border/60 bg-surface-2 p-3 text-xs text-text-secondary">{bonus.note}</p> : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/bonus/$id/conteudo"
            params={{ id: bonus.id }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            <FileText size={16} aria-hidden /> {label}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-text-muted"
            disabled
            aria-disabled="true"
          >
            <Download size={16} aria-hidden /> Baixar PDF — em breve
          </button>
        </div>
      </section>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-text-muted">Outros bônus</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BONUSES.filter((b) => b.id !== bonus.id).map((b) => (
            <Link key={b.id} to="/bonus/$id" params={{ id: b.id }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
              {b.title}
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
