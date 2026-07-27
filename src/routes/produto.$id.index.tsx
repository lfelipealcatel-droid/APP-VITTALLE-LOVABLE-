import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { PRODUCTS, productById } from "@/lib/mock-data";
import { setOwnedProduct, useAppState } from "@/lib/store";
import { productStateFor, PRODUCT_STATE_LABEL, PRODUCT_STATE_STYLE } from "@/lib/product-state";

export const Route = createFileRoute("/produto/$id/")({
  loader: ({ params }) => {
    const product = productById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.title} — VITTALLE` : "Programa — VITTALLE" },
      { name: "description", content: loaderData?.product.benefit ?? "Programa VITTALLE." },
      { property: "og:title", content: loaderData?.product.title ?? "Programa" },
      { property: "og:description", content: loaderData?.product.benefit ?? "" },
    ],
  }),
  component: ProdutoPage,
  notFoundComponent: () => (
    <AppShell title="Programa" back="/biblioteca">
      <p className="text-sm text-text-secondary">Este programa não está disponível.</p>
    </AppShell>
  ),
});

function ProdutoPage() {
  const { product } = Route.useLoaderData();
  const [state] = useAppState();
  const productState = productStateFor(state, product);
  const navigate = useNavigate();
  const bg = product.cover === "green" ? "bg-soft-green" : "bg-warm";

  const primaryAction = () => {
    if (productState === "acquired") {
      if (product.category === "core") navigate({ to: "/programa" });
      else navigate({ to: "/produto/$id/acessar", params: { id: product.id } });
    } else {
      navigate({ to: "/produto/$id/checkout", params: { id: product.id } });
    }
  };
  const primaryLabel =
    productState === "acquired"
      ? product.category === "core"
        ? "Acessar programa"
        : "Acessar material"
      : "Comprar agora";

  return (
    <AppShell title={product.title} back="/biblioteca" hideMiniPlayer>
      <div className={`relative -mx-5 mb-6 aspect-[16/9] overflow-hidden md:-mx-8 ${bg}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/40" aria-hidden />
        <div className="absolute left-6 top-6">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${PRODUCT_STATE_STYLE[productState]}`}>
            {PRODUCT_STATE_LABEL[productState]}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs uppercase tracking-wide text-primary-dark">{product.subtitle}</p>
          <h1 className="mt-1 font-editorial text-2xl leading-tight text-primary-dark md:text-3xl">{product.title}</h1>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm">{product.longDescription}</p>
        <p className="mt-4 text-[11px] uppercase tracking-wide text-text-muted">{product.durationLabel}</p>

        <button
          type="button"
          onClick={primaryAction}
          className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
        >
          {primaryLabel} <ArrowRight size={16} aria-hidden />
        </button>

        {productState === "acquired" && product.category !== "core" ? (
          <button
            type="button"
            onClick={() => {
              setOwnedProduct(product.id, false);
              toast.success("Acesso removido (demo)");
            }}
            className="ml-3 mt-4 inline-flex text-xs text-text-muted hover:underline"
          >
            Remover acesso (demo)
          </button>
        ) : null}

        {product.price ? (
          <p className="mt-3 text-xs text-text-muted">Valor de referência da demonstração: R$ {product.price}.</p>
        ) : null}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">O que está incluído</h2>
        <ul className="grid gap-2">
          {product.includes.map((h: string) => (
            <li key={h} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3">
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-secondary-light text-secondary-dark">
                <Check size={12} aria-hidden />
              </span>
              <span className="text-sm">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-text-secondary">Destaques</h2>
        <ul className="grid gap-2">
          {product.highlights.map((h: string) => (
            <li key={h} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3">
              <Sparkles size={16} className="mt-0.5 text-primary" aria-hidden />
              <span className="text-sm">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <p className="text-xs text-text-muted">
          Outras experiências VITTALLE aparecem em momentos naturais da sua evolução.
        </p>
        <Link to="/biblioteca" className="mt-1 inline-flex text-xs font-semibold text-primary hover:underline">
          Ver todas
        </Link>
      </section>

      {product.category === "upsell" ? (
        <section className="mt-6 rounded-2xl border border-border bg-surface-2 p-5">
          <p className="text-sm">Prefere uma opção mais simples?</p>
          <Link to="/downsell" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">
            Ver Cardápio Hormonal (versão essencial)
          </Link>
        </section>
      ) : null}

      <p className="mt-6 text-xs text-text-muted">
        Programas exibidos aqui compõem o ecossistema VITTALLE.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
          <Link key={p.id} to="/produto/$id" params={{ id: p.id }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
            {p.title}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
