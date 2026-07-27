import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentItem, Activity } from "@/lib/mock-data";
import { MediaPlaceholder, typeLabel } from "./media-placeholder";
import { useAppState, useToggleId } from "@/lib/store";

type AnyContent = ContentItem | Activity;

export function ContentCard({
  item,
  variant = "grid",
  showFavorite = true,
}: {
  item: AnyContent;
  variant?: "grid" | "row" | "featured";
  showFavorite?: boolean;
}) {
  const [state] = useAppState();
  const toggleFav = useToggleId("favorites");
  const isFav = state.favorites.includes(item.id);
  const progress = state.mediaProgress[item.id];
  const cover: "warm" | "green" = ((item as ContentItem).cover as "warm" | "green" | undefined) ?? (item.type === "audio" || item.type === "exercise" ? "green" : "warm");

  if (variant === "row") {
    return (
      <Link to="/conteudo/$id" params={{ id: item.id }} className="group flex items-center gap-3 rounded-xl p-2 hover:bg-surface-2">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
          <MediaPlaceholder type={item.type} cover={cover} aspect="video" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide text-text-muted">{typeLabel(item.type)}</p>
          <p className="truncate text-sm font-medium">{item.title}</p>
          {item.durationMin ? <p className="text-xs text-text-secondary">{item.durationMin} min</p> : null}
          {progress ? (
            <div className="mt-1 h-1 w-full rounded-full bg-surface-2">
              <div className="h-1 rounded-full bg-primary" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:shadow-soft", variant === "featured" && "border-primary-light")}>
      <Link to="/conteudo/$id" params={{ id: item.id }} className="block">
        <MediaPlaceholder type={item.type} cover={cover} aspect={variant === "featured" ? "wide" : "video"} />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[11px] uppercase tracking-wide text-text-muted">{typeLabel(item.type)} · {item.category}</p>
        <Link to="/conteudo/$id" params={{ id: item.id }} className="line-clamp-2 text-sm font-medium">
          {item.title}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-text-secondary">
          <span>{item.durationMin ? `${item.durationMin} min` : "Material"}</span>
          {showFavorite ? (
            <button
              type="button"
              aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={(e) => { e.preventDefault(); toggleFav(item.id); }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-2"
            >
              <Heart size={16} className={isFav ? "fill-primary text-primary" : "text-text-muted"} aria-hidden />
            </button>
          ) : null}
        </div>
        {progress ? (
          <div className="h-1 w-full rounded-full bg-surface-2">
            <div className="h-1 rounded-full bg-primary" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
