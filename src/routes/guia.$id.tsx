import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { GUIDES, guideById } from "@/lib/mock-data";

export const Route = createFileRoute("/guia/$id")({
  loader: ({ params }) => {
    const g = guideById(params.id);
    if (!g) throw notFound();
    return { guide: g };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.guide.title} — VITTALLE` : "Guia — VITTALLE" },
      { name: "description", content: loaderData?.guide.description ?? "Guia oficial VITTALLE." },
    ],
  }),
  component: GuiaPage,
  notFoundComponent: () => (
    <AppShell title="Guia" back="/biblioteca">
      <p className="text-sm text-text-secondary">Este guia não foi encontrado.</p>
    </AppShell>
  ),
});

function GuiaPage() {
  const { guide } = Route.useLoaderData();
  return (
    <AppShell title={guide.title} subtitle={guide.subtitle} back="/biblioteca" hideMiniPlayer>
      <MediaPlaceholder type="reading" cover={guide.cover} aspect="wide" label="Guia" />
      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm">{guide.description}</p>
        <Link
          to="/guia/$id/material"
          params={{ id: guide.id }}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
        >
          <FileText size={16} aria-hidden /> {guide.cta}
        </Link>

      </section>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-text-muted">Outros guias</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {GUIDES.filter((g) => g.id !== guide.id).map((g) => (
            <Link key={g.id} to="/guia/$id" params={{ id: g.id }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
              {g.title}
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
