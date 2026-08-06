import { ChevronRight, Heart, Info, Star, X } from "lucide-react";
import { MediaPlaceholder } from "@/components/media-placeholder";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export interface WhyPoint {
  title: string;
  body: string;
}

export interface FoodItem {
  id: string;
  category: string;
  name: string;
  cover: "warm" | "green";
  // Imagem Hero oficial (public/imagens/biblioteca). Quando presente, substitui o MediaPlaceholder.
  image?: string;
  ingredients: string;
  method: string;
  swaps: string;
  time?: string;
  bestMoment?: string;
  // Estrutura preparada para as copies oficiais de "Por que funciona?" — ver seção 5 da tarefa.
  // Sem conteúdo ainda: os blocos correspondentes ficam ocultos até existir copy real.
  whyPoints: WhyPoint[];
  practicalNote: string;
  // Nota discreta opcional (ex.: aviso médico dos chás). Quando ausente, nada é renderizado.
  observation?: string;
}

export function FoodItemRow({ item, onOpen }: { item: FoodItem; onOpen: (i: FoodItem) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 p-3 text-left text-sm text-text-secondary hover:bg-surface"
      >
        {item.name}
        <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden />
      </button>
    </li>
  );
}

export function FoodItemDrawer({ item, onOpenChange }: { item: FoodItem | null; onOpenChange: (open: boolean) => void }) {
  const hasWhy = !!item && item.whyPoints.length > 0;
  const hasPractical = !!item && item.practicalNote.trim().length > 0;

  return (
    <Drawer open={!!item} onOpenChange={onOpenChange}>
      <DrawerContent>
        {item ? (
          <>
            {item.image ? (
              // aspect-[3/2] no próprio wrapper (não num filho) casa com a proporção real das imagens
              // oficiais (1536x1024). shrink-0 evita que o algoritmo de flex-column do DrawerContent
              // colapse a altura para 0 antes de resolver o aspect-ratio (bug conhecido de flex+aspect-ratio).
              <div className="aspect-[3/2] w-full shrink-0 overflow-hidden bg-surface-2">
                <img
                  src={encodeURI(item.image)}
                  alt={item.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <MediaPlaceholder type="food" cover={item.cover} aspect="wide" label={item.name} className="rounded-none" />
            )}
            <DrawerHeader>
              <DrawerTitle>{item.name}</DrawerTitle>
              <DrawerDescription>{item.category}</DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 px-4 pb-6 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Ingredientes</p>
                <p className="mt-1 whitespace-pre-line leading-relaxed text-text-secondary">{item.ingredients}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Como preparar</p>
                <p className="mt-1 leading-relaxed text-text-secondary">{item.method}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Trocas Inteligentes</p>
                <p className="mt-1 whitespace-pre-line leading-relaxed text-text-secondary">{item.swaps}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {item.time ? "Tempo aproximado" : "Melhor momento para consumir"}
                </p>
                <p className="mt-1 text-text-secondary">{item.time ?? item.bestMoment}</p>
              </div>

              {hasWhy || hasPractical ? <div className="border-t border-border" /> : null}

              {hasWhy ? (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary-dark">
                    <Star size={14} className="fill-secondary-dark text-secondary-dark" aria-hidden /> Por que funciona?
                  </p>
                  <div className="mt-3 grid gap-2">
                    {item.whyPoints.map((wp, i) => (
                      <div key={i} className="rounded-xl bg-soft-green/50 p-3">
                        <p className="text-sm font-semibold text-secondary-dark">{wp.title}</p>
                        <p className="mt-1 leading-relaxed text-text-secondary">{wp.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasPractical ? (
                <div className="rounded-xl border border-primary/30 bg-warm p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary-dark">
                    <Heart size={14} className="fill-primary text-primary" aria-hidden /> Na prática
                  </p>
                  <p className="mt-1 leading-relaxed text-text-secondary">{item.practicalNote}</p>
                </div>
              ) : null}

              {item.observation ? (
                <div className="rounded-xl bg-surface-2 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    <Info size={14} className="text-text-muted" aria-hidden /> Observação
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.observation}</p>
                </div>
              ) : null}

              <div className="border-t border-border pt-4">
                <DrawerClose asChild>
                  <button
                    type="button"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-2"
                  >
                    <X size={16} aria-hidden /> Fechar
                  </button>
                </DrawerClose>
              </div>
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
