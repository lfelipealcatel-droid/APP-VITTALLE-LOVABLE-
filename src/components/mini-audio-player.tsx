import { Link } from "@tanstack/react-router";
import { Pause, Play, X } from "lucide-react";
import { useState } from "react";
import { LIBRARY } from "@/lib/mock-data";
import { markMediaProgress, useAppState } from "@/lib/store";

export function MiniAudioPlayer() {
  const [state] = useAppState();
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(false);

  const audioItems = LIBRARY.filter((c) => c.type === "audio");
  const lastId = state.lastMediaId;
  const item = audioItems.find((c) => c.id === lastId) ?? audioItems.find((c) => (state.mediaProgress[c.id] ?? 0) > 0);
  if (!item || hidden) return null;
  const progress = state.mediaProgress[item.id] ?? 0;

  return (
    <div className="fixed bottom-[64px] left-0 right-0 z-40 px-3 pb-2 sm:bottom-[68px]">
      <div className="mx-auto flex max-w-[600px] items-center gap-3 rounded-2xl border border-border bg-surface p-2.5 shadow-elevated">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-soft-green" aria-hidden />
        <div className="min-w-0 flex-1">
          <Link to="/conteudo/$id" params={{ id: item.id }} className="block">
            <p className="truncate text-sm font-medium">{item.title}</p>
            <div className="mt-1 h-1 w-full rounded-full bg-surface-2">
              <div
                className="h-1 rounded-full bg-primary transition-all"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </Link>
        </div>
        <button
          type="button"
          aria-label={playing ? "Pausar" : "Reproduzir"}
          onClick={() => {
            setPlaying((p) => !p);
            if (!playing) markMediaProgress(item.id, Math.min(1, progress + 0.05));
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
        </button>
        <button
          type="button"
          aria-label="Fechar mini player"
          onClick={() => setHidden(true)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-surface-2"
        >
          <X size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
