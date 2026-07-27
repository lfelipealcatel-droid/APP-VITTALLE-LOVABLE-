import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { LIBRARY } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dev-preview")({
  head: () => ({ meta: [{ title: "Dev preview" }] }),
  component: DevPreview,
});

function DevPreview() {
  return (
    <AppShell title="Design system" subtitle="Uso interno" back="/">
      <div className="grid gap-8">
        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">Cores</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {["bg-primary", "bg-primary-dark", "bg-primary-light", "bg-secondary", "bg-secondary-dark", "bg-secondary-light", "bg-warm", "bg-soft-green", "bg-surface-2", "bg-surface", "bg-background", "bg-border"].map((c) => (
              <div key={c} className="rounded-lg border border-border p-3 text-[11px]">
                <div className={`h-10 rounded-md ${c}`} />
                <p className="mt-1 truncate">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">Botões</h3>
          <div className="flex flex-wrap gap-2">
            <button className="min-h-12 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">Primário</button>
            <button className="min-h-12 rounded-xl bg-secondary px-4 text-sm font-medium text-secondary-foreground">Secundário</button>
            <button className="min-h-12 rounded-xl border border-border px-4 text-sm">Contorno</button>
            <button className="min-h-12 rounded-xl px-4 text-sm text-primary" disabled>Desabilitado</button>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">Cards</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ContentCard item={LIBRARY[0]} />
            <ContentCard item={LIBRARY[1]} />
            <ContentCard item={LIBRARY[3]} />
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">Placeholders</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MediaPlaceholder type="video" />
            <MediaPlaceholder type="audio" cover="green" />
            <MediaPlaceholder type="exercise" cover="green" />
            <MediaPlaceholder type="reading" />
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">Estados</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <EmptyState title="Nada por aqui" description="Um estado vazio de exemplo." />
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-2 text-sm font-semibold">Carregando</p>
              <div className="grid gap-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
