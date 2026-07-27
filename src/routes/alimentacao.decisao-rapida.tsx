import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Salad, Soup, Utensils } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/alimentacao/decisao-rapida")({
  head: () => ({
    meta: [
      { title: "Decisão rápida — VITTALLE" },
      { name: "description", content: "Não sei o que comer agora — opções práticas em minutos." },
    ],
  }),
  component: DecisaoRapida,
});

const OPTIONS = [
  { icon: Coffee, title: "Preciso de algo para agora", body: "Uma opção rápida com bom equilíbrio." },
  { icon: Salad, title: "Almoço prático", body: "Um prato montado em poucos passos." },
  { icon: Soup, title: "Jantar leve", body: "Uma escolha suave para a noite." },
  { icon: Utensils, title: "Fora de casa", body: "Como escolher em restaurantes." },
];

function DecisaoRapida() {
  return (
    <AppShell title="Não sei o que comer agora" subtitle="Uma decisão rápida" back="/alimentacao">
      <p className="text-sm text-text-secondary">
        Respire. Escolha uma das três opções abaixo — todas seguem o Método Monta-Prato.
      </p>
      <ul className="mt-4 grid gap-3">
        {OPTIONS.slice(0, 3).map((o) => (
          <li key={o.title} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
            <o.icon size={20} className="mt-0.5 text-primary" aria-hidden />
            <div className="flex-1">
              <p className="text-sm font-medium">{o.title}</p>
              <p className="text-xs text-text-secondary">{o.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link
        to="/alimentacao"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Voltar para Alimentação
      </Link>
      <p className="mt-4 text-xs text-text-muted">
        Opções específicas serão substituídas pelo conteúdo oficial.
      </p>
    </AppShell>
  );
}
