import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ProductSalesPage } from "@/components/sales-page";
import { PRODUCTS, isVisibleInStore, productById } from "@/lib/mock-data";
import { setOwnedProduct, useAppState } from "@/lib/store";
import { productStateFor, PRODUCT_STATE_LABEL, PRODUCT_STATE_STYLE } from "@/lib/product-state";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";
import { useEntitlements } from "@/lib/entitlements";

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

// Converte o WhatsApp salvo no perfil (formato local, ex. "(21) 99999-9999") para o formato
// internacional que a Lastlink espera no parâmetro `phone` (ex. "+5521999999999).
function formatPhoneForCheckout(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("55") && digits.length >= 12) return `+${digits}`;
  return `+55${digits}`;
}

function buildCheckoutUrl(baseUrl: string, params: Record<string, string | undefined>): string {
  const query = Object.entries(params)
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&");
  if (!query) return baseUrl;
  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${query}`;
}

function ProdutoPage() {
  const { product } = Route.useLoaderData();
  const [state] = useAppState();
  const { user, isAdmin } = useAuth();
  const { profile } = useProfile();
  const { hasProduct, refresh } = useEntitlements();
  const productState = productStateFor(state, product, hasProduct, isAdmin);
  const navigate = useNavigate();
  const bg = product.cover === "green" ? "bg-soft-green" : "bg-warm";
  // Hero secundária em imagem (ver public/imagens/biblioteca/secundario) — só para o produto principal.
  const secondaryHeroImage =
    product.id === "plano-barriga-hormonal-40" ? "/imagens/biblioteca/secundario/plano barriga secundario.png" : null;

  const coverImage = product.imageUrl ?? product.image;
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const showHeroImage = Boolean(coverImage) && !heroImgFailed;

  const [checkingAccess, setCheckingAccess] = useState(false);

  const checkoutHref = product.checkoutUrl
    ? buildCheckoutUrl(product.checkoutUrl, {
        email: user?.email ?? undefined,
        name: profile?.name ?? undefined,
        phone: formatPhoneForCheckout(profile?.whatsapp),
      })
    : undefined;

  const primaryAction = () => {
    if (product.category === "core") navigate({ to: "/programa" });
    else navigate({ to: "/produto/$id/acessar", params: { id: product.id } });
  };

  const handleAlreadyBought = async () => {
    setCheckingAccess(true);
    await refresh();
    setCheckingAccess(false);
    navigate({ to: "/produto/$id/acessar", params: { id: product.id } });
  };

  return (
    <AppShell title={product.title} back="/biblioteca" hideMiniPlayer>
      {secondaryHeroImage ? (
        <div className="-mx-5 mb-6 md:-mx-8">
          <img src={encodeURI(secondaryHeroImage)} alt={product.title} className="h-auto w-full" loading="eager" />
        </div>
      ) : (
        <div className={`relative -mx-5 mb-6 aspect-[16/9] overflow-hidden md:-mx-8 ${showHeroImage ? bg : "bg-secondary-dark"}`}>
          {showHeroImage ? (
            <>
              {/* A arte já traz o nome do produto — nada de texto/selo sobreposto aqui. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt=""
                onError={() => setHeroImgFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <h1 className="sr-only">{product.title}</h1>
            </>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                <p className="font-editorial text-2xl leading-tight text-primary-foreground">{product.title}</p>
              </div>
              <div className="absolute left-6 top-6">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${PRODUCT_STATE_STYLE[productState]}`}>
                  {PRODUCT_STATE_LABEL[productState]}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {productState !== "acquired" && product.salesPage && checkoutHref ? (
        <ProductSalesPage product={product} sales={product.salesPage} checkoutHref={checkoutHref} />
      ) : (
        <>
          <section className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm">{product.longDescription}</p>
            <p className="mt-4 text-[11px] uppercase tracking-wide text-text-muted">{product.durationLabel}</p>

            {productState === "acquired" ? (
              <button
                type="button"
                onClick={primaryAction}
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
              >
                {product.category === "core" ? "Acessar programa" : "Acessar material"} <ArrowRight size={16} aria-hidden />
              </button>
            ) : checkoutHref ? (
              <div className="mt-4">
                <p className="text-xs text-text-muted">
                  Use o mesmo e-mail da sua conta VITTALLE na compra para liberar automaticamente.
                </p>
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                >
                  Comprar agora <ArrowRight size={16} aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={handleAlreadyBought}
                  disabled={checkingAccess}
                  className="mt-3 block text-xs text-text-muted hover:underline disabled:opacity-60"
                >
                  {checkingAccess ? "Verificando…" : "Já comprei — atualizar meu acesso"}
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-text-muted">Em breve disponível para compra.</p>
            )}

            {isAdmin && productState === "acquired" && product.category !== "core" ? (
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
              <p className="mt-3 text-xs text-text-muted">Valor: {product.price}.</p>
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
                Ver GLP-1 Natural – Ativação 7 Dias (versão essencial)
              </Link>
            </section>
          ) : null}

          <p className="mt-6 text-xs text-text-muted">
            Programas exibidos aqui compõem o ecossistema VITTALLE.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRODUCTS.filter((p) => p.id !== product.id && isVisibleInStore(p)).map((p) => (
              <Link key={p.id} to="/produto/$id" params={{ id: p.id }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
                {p.title}
              </Link>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
