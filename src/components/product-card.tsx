import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Product, ProductState } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useEntitlements } from "@/lib/entitlements";
import { PRODUCT_STATE_LABEL, PRODUCT_STATE_STYLE, productStateFor } from "@/lib/product-state";

function StateIcon({ state }: { state: ProductState }) {
  const size = 12;
  if (state === "acquired") return <Check size={size} aria-hidden />;
  if (state === "recommended") return <Sparkles size={size} aria-hidden />;
  if (state === "available") return <Lock size={size} aria-hidden />;
  if (state === "locked") return <Lock size={size} aria-hidden />;
  return <Clock size={size} aria-hidden />;
}

export function ProductCard({ product }: { product: Product }) {
  const [state] = useAppState();
  const { isAdmin } = useAuth();
  const { hasProduct } = useEntitlements();
  const productState = productStateFor(state, product, hasProduct, isAdmin);
  const disabled = productState === "locked" || productState === "future";
  const bg = product.cover === "green" ? "bg-soft-green" : "bg-warm";
  const acquiredCta = product.category === "core" ? "Acessar programa" : "Acessar material";
  // Estado "available" usa o convite específico do produto (ex.: "Desinche em 24h"); sem um
  // definido, cai no rótulo genérico de PRODUCT_STATE_LABEL.
  const badgeLabel =
    productState === "available" ? (product.lockedBadge ?? PRODUCT_STATE_LABEL.available) : PRODUCT_STATE_LABEL[productState];

  const coverImage = product.imageUrl ?? product.image;
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(coverImage) && !imgFailed;

  const Card = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300",
        !disabled && "hover:-translate-y-0.5 hover:shadow-elevated",
        disabled && "opacity-90",
      )}
    >
      <div className={cn("relative aspect-[16/9] w-full overflow-hidden", showImage ? bg : "bg-secondary-dark")}>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt=""
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="font-editorial text-lg leading-tight text-primary-foreground">{product.title}</p>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
              PRODUCT_STATE_STYLE[productState],
            )}
          >
            <StateIcon state={productState} />
            {badgeLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-text-secondary">{product.subtitle}</p>
        <p className="text-sm font-medium leading-snug">{product.benefit}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-text-muted">{product.durationLabel}</p>
        {productState === "acquired" ? (
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="text-xs text-text-secondary">{product.price ?? "Programa VITTALLE"}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              {acquiredCta} <ArrowRight size={14} aria-hidden />
            </span>
          </div>
        ) : (
          <div className="mt-auto pt-3">
            <span className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-semibold text-primary-foreground">
              <Lock size={12} aria-hidden /> Desbloquear{product.price ? ` · ${product.price}` : ""}
            </span>
          </div>
        )}
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
