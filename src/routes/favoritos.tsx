import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { LIBRARY } from "@/lib/mock-data";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — VITTALLE" }, { name: "description", content: "Seus conteúdos salvos." }] }),
  component: Favoritos,
});

function Favoritos() {
  const [state] = useAppState();
  const items = LIBRARY.filter((c) => state.favorites.includes(c.id));
  return (
    <AppShell title="Favoritos" back="/biblioteca">
      {items.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((c) => <ContentCard key={c.id} item={c} />)}
        </div>
      ) : (
        <EmptyState
          icon={<Heart size={28} aria-hidden />}
          title="Seus conteúdos favoritos aparecerão aqui."
          description="Toque no ícone de coração para salvar algo que queira acessar novamente."
          action={<Link to="/biblioteca" className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">Explorar a biblioteca</Link>}
        />
      )}
    </AppShell>
  );
}
