import {
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  Droplet,
  Flame,
  Headphones,
  Lock,
  Moon,
  ShieldCheck,
  Sparkles,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import type { Product, SalesIcon, SalesPage as SalesPageData } from "@/lib/mock-data";

const SALES_ICONS: Record<SalesIcon, LucideIcon> = {
  thermometer: Thermometer,
  brain: Brain,
  moon: Moon,
  book: BookOpen,
  headphones: Headphones,
  calendar: CalendarDays,
  sparkles: Sparkles,
  flame: Flame,
  droplet: Droplet,
};

// Renderiza texto com **negrito** (markdown simples) como <strong>.
function renderRich(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

interface ProductSalesPageProps {
  product: Product;
  sales: SalesPageData;
  checkoutHref: string;
  onAlreadyBought: () => void;
  checkingAccess: boolean;
}

export function ProductSalesPage({ product, sales, checkoutHref, onAlreadyBought, checkingAccess }: ProductSalesPageProps) {
  const shortLabel = product.shortName ?? product.title;

  const scrollToPrice = () => {
    document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pb-24">
      {/* a) Abertura */}
      <section>
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary-dark">{sales.eyebrow}</p>
        <h2 className="mt-2 font-editorial text-[30px] font-semibold leading-tight">{sales.headline}</h2>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">{renderRich(sales.subheadline)}</p>
        <a
          href={checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-5 text-base font-bold text-primary-foreground transition hover:opacity-90"
        >
          {sales.ctaLabel}
          {product.price ? ` · ${product.price}` : ""}
        </a>
        <p className="mt-3 text-center text-xs text-text-muted">Acesso imediato aqui no app · Garantia de 7 dias</p>
      </section>

      {/* b) Dores */}
      <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
        <h3 className="font-editorial text-xl">{sales.painTitle}</h3>
        <ul className="mt-4 grid gap-3">
          {sales.pains.map((pain) => (
            <li key={pain} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-warm text-primary-dark">
                <Check size={16} aria-hidden />
              </span>
              <span className="text-sm leading-relaxed">{pain}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* c) Mecanismo */}
      <section className="mt-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-dark">{sales.mechanismEyebrow}</p>
        <h3 className="mt-2 font-editorial text-[23px] leading-tight">{sales.mechanismTitle}</h3>
        <div className="mt-3 grid gap-3">
          {sales.mechanismParagraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-text-secondary">
              {renderRich(p)}
            </p>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold">{sales.mechanismLead}</p>
      </section>

      {/* d) Pilares */}
      <section className="mt-6 grid gap-3">
        {sales.pillars.map((pillar) => {
          const Icon = SALES_ICONS[pillar.icon];
          return (
            <div key={pillar.title} className="flex gap-3 rounded-2xl bg-soft-green p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface text-secondary-dark">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold">{pillar.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{pillar.text}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* e) O que você recebe */}
      <section className="mt-8">
        <h3 className="mb-3 font-editorial text-xl">{sales.deliverablesTitle}</h3>
        <div className="grid grid-cols-2 gap-3">
          {sales.deliverables.map((item) => {
            const Icon = SALES_ICONS[item.icon];
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-warm text-primary-dark">
                  <Icon size={16} aria-hidden />
                </span>
                <p className="mt-2 text-[14px] font-bold leading-snug">{item.title}</p>
                <p className="mt-1 text-[13px] text-text-secondary">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* f) Benefícios */}
      <section className="mt-8">
        <h3 className="mb-3 font-editorial text-xl">{sales.benefitsTitle}</h3>
        <ul className="grid gap-3">
          {sales.benefits.map((b) => (
            <li key={b.strong} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft-green text-secondary-dark">
                <Check size={16} aria-hidden />
              </span>
              <span className="text-sm leading-relaxed">
                <strong className="font-semibold">{b.strong}</strong>
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* g) Linha do tempo */}
      <section className="mt-8 rounded-2xl bg-night p-5 text-primary-foreground">
        <h3 className="font-editorial text-xl text-white">{sales.timelineTitle}</h3>
        <ul className="mt-4 grid gap-4">
          {sales.timeline.map((step) => (
            <li key={step.label} className="flex gap-3">
              <span className="w-[92px] shrink-0 text-[13px] font-bold text-primary-light">{step.label}</span>
              <span className="text-sm text-primary-foreground/90">{step.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* h) Preço */}
      <section id="comprar" className="mt-8 rounded-2xl border-2 border-primary-light bg-surface p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-text-muted">{sales.priceCaption}</p>
        {product.price ? <p className="mt-2 font-editorial text-[40px] font-bold leading-none">{product.price}</p> : null}
        <p className="mt-2 text-sm text-text-secondary">{sales.priceNote}</p>
        <a
          href={checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-5 text-base font-bold text-primary-foreground transition hover:opacity-90"
        >
          {sales.ctaLabel}
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
          <Lock size={12} aria-hidden /> Pagamento seguro · Liberação automática no app
        </p>
        <p className="mt-3 text-xs text-text-muted">
          Use o mesmo e-mail da sua conta VITTALLE. O pagamento abre em uma nova aba. Se mudar de ideia, é só fechar a
          aba e você volta para cá.
        </p>
        <button
          type="button"
          onClick={onAlreadyBought}
          disabled={checkingAccess}
          className="mt-3 inline-flex min-h-11 items-center text-xs text-text-muted hover:underline disabled:opacity-60"
        >
          {checkingAccess ? "Verificando…" : "Já comprei — atualizar meu acesso"}
        </button>
      </section>

      {/* i) Garantia */}
      <section className="mt-6 flex items-start gap-3 rounded-2xl bg-soft-green p-5">
        <ShieldCheck size={24} className="mt-0.5 shrink-0 text-secondary-dark" aria-hidden />
        <div>
          <p className="font-editorial text-lg">{sales.guaranteeTitle}</p>
          <p className="mt-1 text-sm text-text-secondary">{sales.guaranteeText}</p>
        </div>
      </section>

      {/* j) FAQ */}
      <section className="mt-8">
        <h3 className="mb-3 font-editorial text-xl">Dúvidas rápidas</h3>
        <div className="grid gap-3">
          {sales.faq.map((item) => (
            <div key={item.q} className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-sm font-bold">{item.q}</p>
              <p className="mt-1 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* k) Barra fixa — acima da navegação inferior do AppShell */}
      <div
        className="fixed inset-x-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-surface px-5 py-3 md:px-8"
        style={{ bottom: "calc(56px + max(env(safe-area-inset-bottom, 0px), 0.5rem))" }}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{shortLabel}</p>
          {product.price ? <p className="text-xs text-text-secondary">{product.price}</p> : null}
        </div>
        <button
          type="button"
          onClick={scrollToPrice}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-primary-dark px-4 text-sm font-semibold text-primary-foreground"
        >
          {sales.stickyCtaLabel}
        </button>
      </div>
    </div>
  );
}
