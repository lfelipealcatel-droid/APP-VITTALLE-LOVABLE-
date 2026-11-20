import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavePdfProps {
  url: string;
  className?: string;
}

// Botão padrão para salvar um PDF em qualquer aparelho. Sem o atributo `download`: no Safari/iPhone
// ele é ignorado e o PDF só abre — por isso aqui é sempre um link em nova aba, com a dica de como
// salvar manualmente (Compartilhar → Salvar em Arquivos / ícone de download).
export function SavePdf({ url, className }: SavePdfProps) {
  return (
    <div className={cn(className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-2"
      >
        <Download size={16} aria-hidden /> Salvar no celular
      </a>
      <p className="mt-2 text-xs text-text-secondary">
        iPhone: toque em Compartilhar → Salvar em Arquivos. Android: toque no ícone de download.
      </p>
    </div>
  );
}
