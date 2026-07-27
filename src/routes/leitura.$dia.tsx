import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { DAYS, readingByDay } from "@/lib/mock-data";
import { setDayActivity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/leitura/$dia")({
  loader: ({ params }) => {
    const dayId = Number(params.dia);
    const reading = readingByDay(dayId);
    const day = DAYS.find((d) => d.id === dayId);
    if (!reading || !day) throw notFound();
    return { reading, day };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Leitura do Dia ${loaderData.day.id} — VITTALLE` : "Leitura — VITTALLE" },
      { name: "description", content: loaderData?.reading.intro ?? "Leitura oficial do dia." },
    ],
  }),
  component: LeituraPage,
  notFoundComponent: () => (
    <AppShell title="Leitura" back="/jornada">
      <p className="text-sm text-text-secondary">Leitura não encontrada.</p>
    </AppShell>
  ),
});

function LeituraPage() {
  const { reading, day } = Route.useLoaderData();
  const marcar = () => {
    setDayActivity(day.id, "leitura", true);
    toast.success("Leitura concluída");
  };
  return (
    <AppShell title={`Leitura do Dia ${day.id}`} subtitle={reading.title} back={`/jornada/${day.id}`}>
      <article className="rounded-3xl border border-border bg-surface p-6">
        <MediaPlaceholder type="reading" cover={day.id % 2 === 0 ? "green" : "warm"} aspect="wide" label="Leitura" />
        <h1 className="mt-4 font-editorial text-2xl">{reading.title}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{reading.body}</p>

        <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-4">
          <p className="text-[11px] uppercase tracking-wide text-text-muted">Narração da leitura</p>
          <div className="mt-2 flex items-center gap-3">
            <Headphones size={20} className="text-primary" aria-hidden />
            <Link to="/conteudo/$id" params={{ id: reading.audioId }} className="text-sm font-semibold text-primary hover:underline">
              Ouvir a narração oficial
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={marcar}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Marcar leitura como concluída
        </button>
      </article>
    </AppShell>
  );
}
