import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, FileText, Headphones } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { OFFICIAL_AUDIOS, productById } from "@/lib/mock-data";
import { ownsProduct, useAppState } from "@/lib/store";

export const Route = createFileRoute("/produto/$id/acessar")({
  loader: ({ params }) => {
    const product = productById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.title} — Área do produto` : "Área do produto" },
      { name: "description", content: "Conteúdos oficiais do produto adquirido." },
    ],
  }),
  component: AcessarProduto,
  notFoundComponent: () => (
    <AppShell title="Produto" back="/biblioteca">
      <p className="text-sm text-text-secondary">Produto não encontrado.</p>
    </AppShell>
  ),
});

function AcessarProduto() {
  const { product } = Route.useLoaderData();
  const [state] = useAppState();

  if (!ownsProduct(state, product.id)) {
    return (
      <AppShell title={product.title} back={`/produto/${product.id}`} hideMiniPlayer>
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="font-editorial text-xl">Você ainda não possui este produto</p>
          <Link
            to="/produto/$id"
            params={{ id: product.id }}
            className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Conhecer programa
          </Link>
        </div>
      </AppShell>
    );
  }

  const audios = OFFICIAL_AUDIOS.filter((a) => {
    if (product.id === "desinchar-express-24h") return a.owner === "bump2";
    if (product.id === "cozinha-hormonal-21-dias") return a.owner === "upsell";
    return false;
  });

  return (
    <AppShell title={product.title} subtitle="Área do produto" back={`/produto/${product.id}`} hideMiniPlayer>
      <MediaPlaceholder type="reading" cover={product.cover} aspect="wide" label={product.subtitle} />

      <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Material principal</h2>
        <p className="mt-1 text-xs text-text-secondary">{product.subtitle}</p>
        <button type="button" disabled className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
          <FileText size={16} aria-hidden /> Abrir material
        </button>
        <button type="button" disabled className="ml-2 mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium">
          <Download size={16} aria-hidden /> Baixar PDF (em breve)
        </button>
      </section>

      {audios.length > 0 ? (
        <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Áudios oficiais</h2>
          <ul className="mt-2 grid gap-2">
            {audios.map((a) => (
              <li key={a.id}>
                <Link to="/conteudo/$id" params={{ id: a.id }} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-surface-2">
                  <Headphones size={16} className="text-primary" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-text-secondary">{a.subtitle} · {a.durationMin} min</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-6 text-xs text-text-muted">
        Os conteúdos deste produto pertencem exclusivamente a ele.
      </p>
    </AppShell>
  );
}
