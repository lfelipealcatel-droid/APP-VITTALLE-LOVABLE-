import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { guideById } from "@/lib/mock-data";

export const Route = createFileRoute("/guia/$id/material")({
  loader: ({ params }) => {
    const g = guideById(params.id);
    if (!g) throw notFound();
    return { guide: g };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.guide.title} — Material` : "Material do guia" },
      { name: "description", content: loaderData?.guide.description ?? "Material do guia VITTALLE." },
    ],
  }),
  component: MaterialGuia,
  notFoundComponent: () => (
    <AppShell title="Guia" back="/alimentacao">
      <p className="text-sm text-text-secondary">Guia não encontrado.</p>
    </AppShell>
  ),
});

function MaterialGuia() {
  const { guide } = Route.useLoaderData();
  return (
    <AppShell title={guide.title} subtitle="Material" back={`/guia/${guide.id}`} hideMiniPlayer>
      <MediaPlaceholder type="reading" cover={guide.cover} aspect="wide" label="Material" />
      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <FileText size={14} aria-hidden />
          <span>Conteúdo em preparação</span>
        </div>
        <h2 className="mt-2 font-editorial text-xl">{guide.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{guide.description}</p>

        <div className="mt-5 grid gap-3">
          <article className="rounded-xl border border-border bg-surface-2 p-4">
            <h3 className="text-sm font-semibold">Introdução</h3>
            <p className="mt-1 text-sm text-text-secondary">
              O conteúdo oficial deste material abrirá aqui — organizado, navegável e integrado ao seu ritmo.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface-2 p-4">
            <h3 className="text-sm font-semibold">Como aplicar</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Passos práticos para levar este guia para o seu dia a dia.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface-2 p-4">
            <h3 className="text-sm font-semibold">Referências rápidas</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Um resumo consultável para os momentos em que você precisar de uma resposta imediata.
            </p>
          </article>
        </div>
      </section>

      <div className="mt-4">
        <Link
          to="/guia/$id"
          params={{ id: guide.id }}
          className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-surface px-4 text-sm font-medium"
        >
          <ArrowLeft size={16} aria-hidden /> Voltar ao guia
        </Link>
      </div>
    </AppShell>
  );
}
