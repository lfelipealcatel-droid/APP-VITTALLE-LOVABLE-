import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { CATEGORY_LIST, LIBRARY } from "@/lib/mock-data";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const name = CATEGORY_LIST.find((c) => c.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-") === params.slug);
    if (!name) throw notFound();
    return { name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Biblioteca VITTALLE` : "Categoria" },
      { name: "description", content: "Conteúdos por categoria." },
    ],
  }),
  component: Categoria,
  notFoundComponent: () => (
    <AppShell title="Categoria" back="/biblioteca">
      <EmptyState title="Categoria não encontrada" description="Volte para a biblioteca e escolha outra." />
    </AppShell>
  ),
});

function Categoria() {
  const { name } = Route.useLoaderData();
  const items = LIBRARY.filter((c) => c.category === name);
  return (
    <AppShell title={name} subtitle={`${items.length} materiais`} back="/biblioteca">
      {items.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((c) => <ContentCard key={c.id} item={c} />)}
        </div>
      ) : (
        <EmptyState title="Nada por aqui ainda" description="Novos conteúdos serão adicionados em breve." />
      )}
    </AppShell>
  );
}
