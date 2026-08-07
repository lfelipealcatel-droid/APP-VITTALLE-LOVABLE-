import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { guideById } from "@/lib/mock-data";

export const Route = createFileRoute("/guia/$id/pdf")({
  loader: ({ params }) => {
    const g = guideById(params.id);
    if (!g || !g.pdf) throw notFound();
    return { guide: g };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.guide.title} — VITTALLE` : "Guia — VITTALLE" },
      { name: "description", content: loaderData?.guide.description ?? "Guia oficial VITTALLE." },
    ],
  }),
  component: GuiaPdfPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <p className="text-sm text-text-secondary">Este material não foi encontrado.</p>
      <Link to="/biblioteca" className="text-sm font-semibold text-primary hover:underline">
        Voltar para a Biblioteca
      </Link>
    </div>
  ),
});

function GuiaPdfPage() {
  const { guide } = Route.useLoaderData();
  const navigate = useNavigate();
  // guide.pdf contém espaço literal (ex.: "GAMMA PROJETOS"); encodeURI() na hora de usar, mesmo
  // padrão já usado para as imagens de café/almoço/lanche/jantar/chá/shake/shot.
  const pdfUrl = encodeURI(guide.pdf!);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    navigate({ to: "/biblioteca" });
  };

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-background">
      <header className="flex shrink-0 items-center gap-2 border-b border-border bg-background px-3 py-2.5">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full px-2 text-sm font-semibold text-primary hover:bg-surface-2"
        >
          <ArrowLeft size={18} aria-hidden /> Voltar aos Guias
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-sm font-semibold">{guide.title}</h1>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir em tela completa"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-2"
        >
          <ExternalLink size={16} aria-hidden />
        </a>
      </header>

      <div className="min-h-0 flex-1">
        {/* <object> usa somente recursos nativos do navegador: quando o navegador não sabe renderizar
            o PDF embutido, ele automaticamente exibe o conteúdo filho como fallback, sem JS extra. */}
        <object data={pdfUrl} type="application/pdf" className="h-full w-full">
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-text-secondary">Não foi possível exibir este material aqui.</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
            >
              Abrir PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
