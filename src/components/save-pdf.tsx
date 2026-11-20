import { cn } from "@/lib/utils";

interface SavePdfProps {
  url: string;
  className?: string;
}

// `url` fica na assinatura só para não quebrar os usos existentes — o botão de salvar foi
// removido (não funcionava bem no celular); agora só avisa que dá para baixar pelo computador.
export function SavePdf({ url, className }: SavePdfProps) {
  void url;
  return (
    <p className={cn("text-xs text-text-secondary", className)}>
      Quer guardar este material? Abra o app no computador e baixe o PDF.
    </p>
  );
}
