import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { bonusById } from "@/lib/mock-data";

// Download seletivo: só faz sentido nos materiais imprimíveis/checklist. "Guia de Superalimentos
// Hormonais" continua só leitura.
const DOWNLOAD_LABEL_BY_BONUS_ID: Record<string, string> = {
  "lista-8-pratos": "Baixar checklist",
  "diario-hormonal-21-dias": "Baixar diário para imprimir",
};

// Nome de arquivo com "$id_" (não "$id") por design: evita que esta rota seja tratada como filha de
// /bonus/$id (bonus.$id.tsx), que é uma tela intermediária sem <Outlet />. Mesmo padrão já validado
// e corrigido em guia.$id_.pdf.tsx. A URL pública final continua sendo /bonus/$id/pdf.
export const Route = createFileRoute("/bonus/$id_/pdf")({
  loader: ({ params }) => {
    const b = bonusById(params.id);
    if (!b || !b.pdf) throw notFound();
    return { bonus: b };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.bonus.title} — VITTALLE` : "Bônus — VITTALLE" },
      { name: "description", content: loaderData?.bonus.description ?? "Bônus oficial VITTALLE." },
    ],
  }),
  component: BonusPdfPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <p className="text-sm text-text-secondary">Este bônus não foi encontrado.</p>
      <Link to="/biblioteca" className="text-sm font-semibold text-primary hover:underline">
        Voltar para a Biblioteca
      </Link>
    </div>
  ),
});

function BonusPdfPage() {
  const { bonus } = Route.useLoaderData();
  const navigate = useNavigate();
  // bonus.pdf contém espaço e "ô" literais (ex.: "bônus"); encodeURI() na hora de usar, mesmo
  // padrão já usado nos Guias Práticos e nas imagens de café/almoço/lanche/jantar/chá/shake/shot.
  const pdfUrl = encodeURI(bonus.pdf!);
  const downloadLabel = DOWNLOAD_LABEL_BY_BONUS_ID[bonus.id];
  const fileName = bonus.pdf!.split("/").pop();

  const goBack = () => navigate({ to: "/biblioteca" });

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-background">
      <header className="flex shrink-0 items-center gap-2 border-b border-border bg-background px-3 py-2.5">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full px-2 text-sm font-semibold text-primary hover:bg-surface-2"
        >
          <ArrowLeft size={18} aria-hidden /> Voltar à Biblioteca
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-sm font-semibold">{bonus.title}</h1>
        {downloadLabel ? (
          <a
            href={pdfUrl}
            download={fileName}
            aria-label={downloadLabel}
            title={downloadLabel}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-2 text-xs font-semibold text-primary hover:bg-surface-2 sm:px-3"
          >
            <Download size={16} aria-hidden />
            <span className="hidden sm:inline">{downloadLabel}</span>
          </a>
        ) : null}
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
