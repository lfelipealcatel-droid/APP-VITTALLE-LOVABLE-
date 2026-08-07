import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BONUSES, GUIDES, PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { useAppState } from "@/lib/store";
import { productStateFor } from "@/lib/product-state";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — VITTALLE" },
      { name: "description", content: "Seus conteúdos, seus produtos e outras experiências VITTALLE." },
      { property: "og:title", content: "Biblioteca — VITTALLE" },
      { property: "og:description", content: "Conteúdos oficiais, bônus e programas." },
    ],
  }),
  component: Biblioteca,
});

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] uppercase tracking-wide text-text-muted">{eyebrow}</p>
      <h2 className="mt-1 font-editorial text-xl text-primary-dark">{title}</h2>
      {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
    </div>
  );
}

function Biblioteca() {
  const [state] = useAppState();
  const core = PRODUCTS.find((p) => p.category === "core")!;
  const myProducts = PRODUCTS.filter((p) => p.category !== "core" && productStateFor(state, p) === "acquired");
  const otherProducts = PRODUCTS.filter((p) => p.category !== "core" && productStateFor(state, p) !== "acquired");

  return (
    <AppShell
      title="Biblioteca"
      subtitle="Seus programas e conteúdos"
      right={
        <Link
          to="/buscar"
          aria-label="Buscar"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2"
        >
          <Search size={20} aria-hidden />
        </Link>
      }
    >
      <div className="animate-fade-in">
        {/* SEUS CONTEÚDOS */}
        <section className="mb-10">
          <SectionHeader
            eyebrow="Seus conteúdos"
            title="Plano Barriga Hormonal 40+"
            description="Tudo o que faz parte da sua jornada atual."
          />

          <div className="mb-6">
            <ProductCard product={core} />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <Link to="/alimentacao" className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
              Biblioteca Alimentar
            </Link>
            <Link to="/favoritos" className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
              Favoritos
            </Link>
            <Link to="/downloads" className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-surface-2">
              Downloads
            </Link>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-text-secondary">Guias práticos</h3>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.id}
                to={g.pdf ? "/guia/$id/pdf" : "/guia/$id"}
                params={{ id: g.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <MediaPlaceholder type="reading" cover={g.cover} imageUrl={g.image} label="Guia" />
                <div className="p-3">
                  <p className="text-sm font-medium">{g.title}</p>
                  <p className="text-xs text-text-secondary">{g.subtitle}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{g.cta}</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="mb-3 text-sm font-semibold text-text-secondary">Bônus oficiais</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {BONUSES.map((b) => (
              <Link
                key={b.id}
                to="/bonus/$id"
                params={{ id: b.id }}
                className="overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <MediaPlaceholder type="download" cover={b.cover} imageUrl={b.image} label={b.type === "checklist" ? "Checklist" : b.type === "diary" ? "Diário" : "Guia"} />
                <div className="p-3">
                  <p className="text-sm font-medium">{b.title}</p>
                  <p className="text-xs text-text-secondary">{b.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MEUS PRODUTOS */}
        {myProducts.length > 0 ? (
          <section className="mb-10">
            <SectionHeader eyebrow="Meus produtos" title="Programas que você já tem" description="Complementos oficiais adquiridos." />
            <div className="grid gap-4 sm:grid-cols-2">
              {myProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        ) : null}

        {/* OUTRAS EXPERIÊNCIAS */}
        {otherProducts.length > 0 ? (
          <section className="mb-4">
            <SectionHeader
              eyebrow="Outras experiências VITTALLE"
              title="Programas oficiais complementares"
              description="Escolha o que combina com o seu momento."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {otherProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
