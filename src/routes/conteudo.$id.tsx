import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, Pause, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder, typeLabel } from "@/components/media-placeholder";
import { contentById } from "@/lib/mock-data";
import { markMediaProgress, useAppState, useToggleId, ownsProduct } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/conteudo/$id")({
  loader: ({ params }) => {
    const item = contentById(params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.item.title} — VITTALLE` : "Conteúdo" },
      { name: "description", content: loaderData?.item.subtitle ?? "Conteúdo." },
    ],
  }),
  component: ContentPage,
  notFoundComponent: () => (
    <AppShell title="Conteúdo" back="/biblioteca">
      <p className="text-sm text-text-secondary">Este conteúdo não está disponível.</p>
    </AppShell>
  ),
});

function ContentPage() {
  const { item } = Route.useLoaderData();
  const [state] = useAppState();
  const toggleFav = useToggleId("favorites");
  const toggleDone = useToggleId("completedActivities");
  const isFav = state.favorites.includes(item.id);
  const isDone = state.completedActivities.includes(item.id);

  // Gate: áudios pagos exigem entitlement (front sempre acessível)
  const gated = item.ownerProduct && !ownsProduct(state, item.ownerProduct) && item.ownerProduct !== "plano-barriga-hormonal-40";

  if (gated) {
    return (
      <AppShell title="Conteúdo exclusivo" back="/biblioteca" hideMiniPlayer>
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="font-editorial text-xl">Este áudio faz parte de um programa</p>
          <p className="mt-2 text-sm text-text-secondary">Para acessar, conheça o programa correspondente.</p>
          <Link
            to="/produto/$id"
            params={{ id: item.ownerProduct! }}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Conhecer programa
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={typeLabel(item.type)} subtitle={item.title} back="/biblioteca" hideMiniPlayer={item.type === "audio"}>
      <div className="mx-auto max-w-[720px]">
        {item.type === "audio" ? (
          <AudioView id={item.id} title={item.title} />
        ) : item.type === "reading" ? (
          <ReadingView title={item.title} body={item.body} />
        ) : (
          <MediaPlaceholder type={item.type} cover={item.cover} />
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFav(item.id)}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-medium",
              isFav ? "border-primary/50 bg-warm text-primary-dark" : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <Heart size={14} aria-hidden /> {isFav ? "Favoritado" : "Favoritar"}
          </button>
          <button
            type="button"
            onClick={() => {
              toggleDone(item.id, !isDone);
              toast.success(isDone ? "Marcado como não concluído" : "Marcado como concluído");
            }}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-medium",
              isDone ? "border-secondary/40 bg-secondary-light text-secondary-dark" : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <Check size={14} aria-hidden /> {isDone ? "Concluído" : "Marcar como feito"}
          </button>
        </div>

        <Link to="/biblioteca" className="mt-6 inline-flex items-center gap-1 text-xs text-primary">
          <ArrowLeft size={14} aria-hidden /> Voltar para a biblioteca
        </Link>
      </div>
    </AppShell>
  );
}

function AudioView({ id, title }: { id: string; title: string }) {
  const [state] = useAppState();
  const [playing, setPlaying] = useState(false);
  const p = state.mediaProgress[id] ?? 0;
  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <MediaPlaceholder type="audio" cover="green" aspect="wide" />
      <p className="mt-4 font-editorial text-xl">{title}</p>
      <div className="mt-4 h-1.5 rounded-full bg-surface-2">
        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.round(p * 100)}%` }} />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setPlaying((v) => !v);
            markMediaProgress(id, Math.min(1, p + 0.1));
          }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={playing ? "Pausar" : "Reproduzir"}
        >
          {playing ? <Pause size={20} aria-hidden /> : <Play size={20} aria-hidden />}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-text-muted">Player placeholder — o áudio real será substituído.</p>
    </div>
  );
}

function ReadingView({ title, body }: { title: string; body?: string }) {
  return (
    <article className="prose-body rounded-3xl border border-border bg-surface p-6">
      <MediaPlaceholder type="reading" cover="warm" aspect="wide" />
      <h1 className="mt-4 font-editorial text-2xl">{title}</h1>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
        {body ?? "Conteúdo em breve."}
      </p>
    </article>
  );
}
