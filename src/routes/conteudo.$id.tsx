import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, Info, Moon, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder, typeLabel } from "@/components/media-placeholder";
import { contentById, productById } from "@/lib/mock-data";
import { markMediaProgress, useAppState, useToggleId, ownsProduct } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useEntitlements } from "@/lib/entitlements";
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
  const { isAdmin } = useAuth();
  const { hasProduct } = useEntitlements();
  const toggleFav = useToggleId("favorites");
  const toggleDone = useToggleId("completedActivities");
  const isFav = state.favorites.includes(item.id);
  const isDone = state.completedActivities.includes(item.id);

  // Gate: áudios pagos exigem entitlement real (hasProduct); admin continua podendo simular posse
  // pelo painel /demo (ownsProduct/localStorage), sem afetar usuárias comuns.
  const owns = item.ownerProduct
    ? isAdmin
      ? ownsProduct(state, item.ownerProduct)
      : hasProduct(item.ownerProduct)
    : true;
  const gated = item.ownerProduct && !owns && item.ownerProduct !== "plano-barriga-hormonal-40";

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

  if (item.type === "audio") {
    return (
      <AppShell title={typeLabel(item.type)} subtitle={item.title} back="/biblioteca" hideMiniPlayer>
        <AudioView
          id={item.id}
          title={item.title}
          subtitle={item.subtitle}
          durationMin={item.durationMin}
          audioUrl={item.audioUrl}
          ownerProduct={item.ownerProduct}
          isFav={isFav}
          isDone={isDone}
          onToggleFav={() => toggleFav(item.id)}
          onToggleDone={() => {
            toggleDone(item.id, !isDone);
            toast.success(isDone ? "Marcado como não concluído" : "Marcado como concluído");
          }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell title={typeLabel(item.type)} subtitle={item.title} back="/biblioteca">
      <div className="mx-auto max-w-[720px]">
        {item.type === "reading" ? (
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

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function AudioView({
  id,
  title,
  subtitle,
  durationMin,
  audioUrl,
  ownerProduct,
  isFav,
  isDone,
  onToggleFav,
  onToggleDone,
}: {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  audioUrl?: string;
  ownerProduct?: string;
  isFav: boolean;
  isDone: boolean;
  onToggleFav: () => void;
  onToggleDone: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const ownerProductData = ownerProduct ? productById(ownerProduct) : undefined;
  const albumName = ownerProductData?.title;
  const artworkUrl = ownerProductData?.imageUrl ?? ownerProductData?.image;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      markMediaProgress(id, 1);
      if (typeof navigator !== "undefined" && navigator.mediaSession) {
        navigator.mediaSession.playbackState = "none";
      }
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [id]);

  // Limpa os controles da tela de bloqueio ao saída desta tela — nunca deixa handlers/metadata de
  // um áudio "vazarem" para a navegação seguinte.
  useEffect(() => {
    return () => {
      if (typeof navigator === "undefined" || !navigator.mediaSession) return;
      try {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("seekbackward", null);
        navigator.mediaSession.setActionHandler("seekforward", null);
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
      } catch {
        /* Media Session API indisponível neste navegador */
      }
    };
  }, []);

  const skip = (secondsDelta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + secondsDelta));
  };

  // Configura metadata + controles (play/pause/±15s) da tela de bloqueio e da Central de Controle.
  // Sem controle de volume: no iPhone o volume é sempre pelos botões físicos do aparelho.
  const configureMediaSession = () => {
    if (typeof navigator === "undefined" || !navigator.mediaSession) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: "VITTALLE",
        ...(albumName ? { album: albumName } : {}),
        ...(artworkUrl ? { artwork: [{ src: artworkUrl }] } : {}),
      });
      navigator.mediaSession.setActionHandler("play", playAudio);
      navigator.mediaSession.setActionHandler("pause", pauseAudio);
      navigator.mediaSession.setActionHandler("seekbackward", () => skip(-15));
      navigator.mediaSession.setActionHandler("seekforward", () => skip(15));
    } catch {
      /* Media Session API indisponível neste navegador */
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play();
    setPlaying(true);
    configureMediaSession();
    if (typeof navigator !== "undefined" && navigator.mediaSession) {
      navigator.mediaSession.playbackState = "playing";
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    if (audio.duration) markMediaProgress(id, Math.min(1, audio.currentTime / audio.duration));
    if (typeof navigator !== "undefined" && navigator.mediaSession) {
      navigator.mediaSession.playbackState = "paused";
    }
  };

  const togglePlay = () => {
    if (playing) pauseAudio();
    else playAudio();
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="-mx-5 -mt-4 bg-night px-5 pb-10 pt-8 text-primary-foreground md:-mx-8">
      <div className="mx-auto max-w-[480px]">
        <div className="rounded-3xl bg-night-light p-8 text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-night">
            <Moon size={36} className="text-primary-light" aria-hidden />
          </div>
          <h1 className="mt-5 font-editorial text-[25px] leading-tight text-white">{title}</h1>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {subtitle} · {durationMin} min
          </p>

          {audioUrl ? <audio ref={audioRef} src={audioUrl} preload="metadata" /> : null}

          <div className="mt-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/30">
              <div className="h-1.5 rounded-full bg-primary-light" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-primary-foreground/60">
              <span>{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : `${durationMin}:00`}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => skip(-15)}
              disabled={!audioUrl}
              aria-label="Voltar 15 segundos"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground disabled:opacity-40"
            >
              <RotateCcw size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              disabled={!audioUrl}
              aria-label={playing ? "Pausar" : "Reproduzir"}
              className="inline-flex h-[76px] w-[76px] items-center justify-center rounded-full bg-primary-light text-night disabled:opacity-50"
            >
              {playing ? <Pause size={30} aria-hidden /> : <Play size={30} aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => skip(15)}
              disabled={!audioUrl}
              aria-label="Avançar 15 segundos"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground disabled:opacity-40"
            >
              <RotateCw size={22} aria-hidden />
            </button>
          </div>

          {!audioUrl ? (
            <p className="mt-5 text-xs text-primary-foreground/70">Áudio em produção — ele aparece aqui em breve.</p>
          ) : null}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-night-light p-4">
          <Info size={18} className="mt-0.5 shrink-0 text-primary-light" aria-hidden />
          <p className="text-sm text-primary-foreground/85">
            Ouça já deitada, com a luz baixa. Pode deixar a tela apagar: o áudio continua tocando.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleFav}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-xs font-medium",
              isFav
                ? "border-primary-light bg-primary-light/15 text-primary-light"
                : "border-white/30 text-primary-foreground/85",
            )}
          >
            <Heart size={14} aria-hidden /> {isFav ? "Favoritado" : "Favoritar"}
          </button>
          <button
            type="button"
            onClick={onToggleDone}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-xs font-medium",
              isDone
                ? "border-primary-light bg-primary-light/15 text-primary-light"
                : "border-white/30 text-primary-foreground/85",
            )}
          >
            <Check size={14} aria-hidden /> {isDone ? "Concluído" : "Marcar como feito"}
          </button>
        </div>

        <Link to="/biblioteca" className="mt-6 inline-flex items-center gap-1 text-xs text-primary-light">
          <ArrowLeft size={14} aria-hidden /> Voltar para a biblioteca
        </Link>
      </div>
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
