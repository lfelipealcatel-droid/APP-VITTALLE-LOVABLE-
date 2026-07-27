import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Lock, Sparkles, Star } from "lucide-react";
import type { Product, ProductState } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/store";
import { PRODUCT_STATE_LABEL, PRODUCT_STATE_STYLE, productStateFor } from "@/lib/product-state";

function StateIcon({ state }: { state: ProductState }) {
  const size = 12;
  if (state === "acquired") return <Check size={size} aria-hidden />;
  if (state === "recommended") return <Sparkles size={size} aria-hidden />;
  if (state === "available") return <Star size={size} aria-hidden />;
  if (state === "locked") return <Lock size={size} aria-hidden />;
  return <Clock size={size} aria-hidden />;
}

export function ProductCard({ product }: { product: Product }) {
  const [state] = useAppState();
  const productState = productStateFor(state, product);
  const disabled = productState === "locked" || productState === "future";
  const bg = product.cover === "green" ? "bg-soft-green" : "bg-warm";
  const cta =
    productState === "acquired"
      ? product.category === "core"
        ? "Acessar programa"
        : "Acessar material"
      : "Conhecer programa";

  const Card = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300",
        !disabled && "hover:-translate-y-0.5 hover:shadow-elevated",
        disabled && "opacity-90",
      )}
    >
      <div className={cn("relative aspect-[16/9] w-full overflow-hidden", bg)}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/40" aria-hidden />
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
              PRODUCT_STATE_STYLE[productState],
            )}
          >
            <StateIcon state={productState} />
            {PRODUCT_STATE_LABEL[productState]}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-editorial text-lg leading-tight text-primary-dark">{product.title}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-text-secondary">{product.subtitle}</p>
        <p className="text-sm font-medium leading-snug">{product.benefit}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-text-muted">{product.durationLabel}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-xs text-text-secondary">
            {product.price ? `R$ ${product.price}` : "Programa VITTALLE"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            {cta} <ArrowRight size={14} aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );

  if (disabled) return <div className="cursor-not-allowed">{Card}</div>;

  return (
    <Link
      to="/produto/$id"
      params={{ id: product.id }}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      {Card}
    </Link>
  );
}
