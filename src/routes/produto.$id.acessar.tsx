import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Activity, BookOpen, Check, Download, FileText, Play } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { OFFICIAL_AUDIOS, productById } from "@/lib/mock-data";
import { ownsProduct, useAppState } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useEntitlements } from "@/lib/entitlements";

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

function StepCircle({ n, className }: { n: number; className: string }) {
  return (
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground ${className}`}>
      {n}
    </span>
  );
}

function AcessarProduto() {
  const { product } = Route.useLoaderData();
  const [state] = useAppState();
  const { isAdmin } = useAuth();
  const { hasProduct } = useEntitlements();

  // Posse real: para usuárias comuns vem só do Supabase (hasProduct); admin continua podendo
  // simular posse pelo painel /demo (ownsProduct/localStorage), sem afetar usuárias comuns.
  const owns = isAdmin ? ownsProduct(state, product.id) : hasProduct(product.id);

  const coverImage = product.imageUrl ?? product.image;
  const [imgFailed, setImgFailed] = useState(false);
  const showCoverImage = Boolean(coverImage) && !imgFailed;

  if (!owns) {
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

  // Áudios oficiais do Desinchar e do Noite Inteira (Desligar, depois 3h da Manhã) — os áudios
  // antigos do Upsell (Cozinha Hormonal) pertenciam ao produto substituído e não têm equivalente no
  // Acelerador GLP-1 Natural ainda.
  const audios = OFFICIAL_AUDIOS.filter((a) => {
    if (product.id === "desinchar-express-24h") return a.owner === "bump2";
    if (product.id === "noite-inteira-sono-40-plus") return a.owner === "noite";
    return false;
  });

  const shortName = product.shortName ?? product.title;
  const welcomeText = product.welcomeText ?? "Siga os passos abaixo.";

  const hasAccelerador = isAdmin
    ? ownsProduct(state, "acelerador-glp1-natural")
    : hasProduct("acelerador-glp1-natural");
  const showAcceleratorCrossSell = product.id !== "acelerador-glp1-natural" && !hasAccelerador;

  return (
    <AppShell title={product.title} subtitle="Área do produto" back={`/produto/${product.id}`} hideMiniPlayer>
      {showCoverImage ? (
        <div className="relative -mx-5 mb-4 aspect-[16/9] overflow-hidden md:-mx-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt=""
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[12px] font-bold text-secondary-dark shadow-soft">
            <Check size={14} aria-hidden /> Liberado para você
          </span>
        </div>
      ) : (
        <MediaPlaceholder type="reading" cover={product.cover} aspect="wide" label={product.subtitle} />
      )}

      <h1 className="mt-4 font-editorial text-[26px] leading-tight">Bem-vinda ao seu {shortName}</h1>
      <p className="mt-1 text-[15px] text-text-secondary">{welcomeText}</p>

      <section className="mt-5 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <StepCircle n={1} className="bg-primary-dark" />
          <h2 className="text-sm font-semibold">Passo 1 · Leia o seu guia</h2>
        </div>

        {product.materialUrl ? (
          <>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-warm p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface text-primary-dark">
                <FileText size={18} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Guia {shortName}</p>
                <p className="truncate text-xs text-text-secondary">{product.subtitle}</p>
              </div>
            </div>
            <a
              href={product.materialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-semibold text-primary-foreground"
            >
              <BookOpen size={18} aria-hidden /> Abrir guia
            </a>
            <a
              href={product.materialUrl}
              download
              className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary-light px-4 text-sm font-semibold text-primary-dark"
            >
              <Download size={16} aria-hidden /> Salvar no celular
            </a>
          </>
        ) : (
          <p className="mt-4 text-sm text-text-muted">Seu material está sendo preparado e aparecerá aqui.</p>
        )}
      </section>

      {audios.length > 0 ? (
        <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <StepCircle n={2} className="bg-secondary-dark" />
            <h2 className="text-sm font-semibold">Passo 2 · Ouça na hora certa</h2>
          </div>
          <ul className="mt-4 grid gap-2">
            {audios.map((a) => (
              <li key={a.id}>
                <Link
                  to="/conteudo/$id"
                  params={{ id: a.id }}
                  className="flex w-full items-center gap-3 overflow-hidden rounded-xl border border-primary-light/50 bg-card p-3 hover:opacity-90"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primary-dark text-white">
                    <Play size={16} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-bold leading-snug">{a.title}</p>
                    <p className="break-words text-xs text-text-secondary">
                      {a.subtitle} · {a.durationMin} min
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-text-secondary">Ouça já deitada, com a luz baixa.</p>
        </section>
      ) : null}

      {product.id === "desinchar-express-24h" ? (
        <section className="mt-4 flex items-start gap-3 rounded-2xl bg-warm p-5">
          <Activity size={22} className="mt-0.5 shrink-0 text-primary-dark" aria-hidden />
          <div>
            <p className="text-sm font-bold">Meça antes e depois</p>
            <p className="mt-1 text-sm text-text-secondary">
              Fita métrica na altura do umbigo, na manhã do dia 1 e na manhã do dia 2.
            </p>
          </div>
        </section>
      ) : null}

      {showAcceleratorCrossSell ? (
        <section className="mt-6 rounded-2xl bg-night p-5 text-primary-foreground">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary-light">Próximo passo recomendado</p>
          <h2 className="mt-2 font-editorial text-xl text-white">Agora acelere a perda de barriga com o GLP-1 Natural</h2>
          <Link
            to="/produto/$id"
            params={{ id: "acelerador-glp1-natural" }}
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-surface px-5 text-sm font-semibold text-foreground"
          >
            Conhecer
          </Link>
        </section>
      ) : null}
    </AppShell>
  );
}
