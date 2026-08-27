import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { activeDay, useAppState } from "@/lib/store";
import type { FilterKey } from "@/routes/alimentacao.refeicoes-modelo";

// Dia de origem explícito (veio de /alimentacao?dia=X, que por sua vez veio de /jornada/$dia).
// Sem ele — acesso direto, ou valor inválido/fora de 1–21 — cai de volta no dia ativo.
const searchSchema = z.object({
  dia: z.coerce.number().int().min(1).max(21).optional().catch(undefined),
});

export const Route = createFileRoute("/alimentacao/sugestao-do-dia")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sugestão do dia — VITTALLE" },
      { name: "description", content: "Um apoio prático para cumprir a missão alimentar de hoje." },
    ],
  }),
  component: SugestaoPage,
});

// 7 sugestões, uma para cada uma das 7 missões alimentares (mesma distribuição pelos 21 dias:
// dia 1, 8, 15 → sugestão 1; dia 2, 9, 16 → sugestão 2; ...). O CTA reaproveita o filtro contextual
// já existente/curado em Refeições Inteligentes — nenhum filtro novo foi criado. Quando não existe
// um filtro coerente com a sugestão (troca de bebida, fonte de fibra), a tela funciona sem CTA.
interface DailySuggestion {
  headline: string;
  text: string;
  options: string[];
  cta?: { label: string; filtro: FilterKey };
}

const SUGGESTIONS: DailySuggestion[] = [
  {
    headline: "Comece pelo que você já tem",
    text: "Você não precisa preparar um prato diferente. Couve, espinafre, brócolis, rúcula ou outra opção que já esteja em casa podem entrar na refeição de hoje.",
    options: [
      "Misture uma folha à salada",
      "Coloque couve ou espinafre na omelete",
      "Use brócolis ou outro legume no almoço",
      "Acrescente uma pequena porção ao prato que já faria",
    ],
    cta: { label: "Ver refeições com vegetais", filtro: "vegetais" },
  },
  {
    headline: "Comece escolhendo a proteína",
    text: "Não precisa ser uma proteína cara ou diferente. A melhor opção é aquela que você consegue colocar na rotina hoje.",
    options: [
      "Ovo",
      "Frango ou peixe",
      "Iogurte ou queijo",
      "Feijão combinado com outra fonte de proteína",
    ],
    cta: { label: "Ver refeições mais completas", filtro: "completas" },
  },
  {
    headline: "Faça uma troca, não uma proibição",
    text: "Escolha apenas uma bebida adoçada que você consumiria hoje e substitua por uma opção sem açúcar.",
    options: [
      "Água gelada",
      "Água com limão",
      "Chá sem açúcar",
      "Outra bebida sem açúcar que já faça parte da sua rotina",
    ],
  },
  {
    headline: "Acrescente, não complique",
    text: "Você não precisa mudar sua refeição. Coloque uma fonte de fibra no que já iria comer hoje.",
    options: ["Fruta", "Aveia", "Feijão", "Vegetais, chia ou linhaça"],
  },
  {
    headline: "Use cor como um guia simples",
    text: "Não precisa contar nem pesar. Escolha dois vegetais que você gosta e coloque no prato que já faria normalmente.",
    options: [
      "Folhas + tomate",
      "Cenoura + brócolis",
      "Abobrinha + salada",
      "Os vegetais que já estiverem disponíveis",
    ],
    cta: { label: "Ver refeições com vegetais", filtro: "vegetais" },
  },
  {
    headline: "Facilite a próxima escolha",
    text: "Uma opção pronta evita que você precise decidir tudo quando já estiver com fome ou sem tempo.",
    options: [
      "Cozinhe alguns ovos",
      "Deixe uma fruta fácil de pegar",
      "Separe um iogurte",
      "Guarde uma porção de proteína já pronta",
    ],
    cta: { label: "Ver opções rápidas", filtro: "rapidas" },
  },
  {
    headline: "Volte ao básico",
    text: "Uma refeição útil não precisa ser complicada. Pense em três partes e use alimentos que fazem parte da sua vida.",
    options: [
      "Proteína",
      "Vegetal",
      "Carboidrato",
      "Uma combinação simples que você consegue repetir",
    ],
    cta: { label: "Ver refeições mais completas", filtro: "completas" },
  },
];

function suggestionForDay(dayId: number): DailySuggestion {
  return SUGGESTIONS[(dayId - 1) % SUGGESTIONS.length];
}

function SugestaoPage() {
  const [state] = useAppState();
  const { dia } = Route.useSearch();
  const dayId = dia ?? activeDay(state);
  const suggestion = suggestionForDay(dayId);

  return (
    <AppShell title="Sugestão do dia" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Lightbulb size={14} aria-hidden /> Sugestão para facilitar
        </div>
        <h1 className="mt-2 font-editorial text-2xl">{suggestion.headline}</h1>
        <p className="mt-2 text-sm text-text-secondary">{suggestion.text}</p>
      </section>

      <ul className="mt-4 grid gap-2">
        {suggestion.options.map((option) => (
          <li key={option} className="rounded-xl border border-border bg-surface p-4 text-sm text-text-secondary">
            {option}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-text-secondary">
        Esta sugestão é apenas um apoio. A Missão alimentar é o que conclui a atividade de hoje.
      </p>

      {suggestion.cta ? (
        <Link
          to="/alimentacao/refeicoes-modelo"
          search={{ filtro: suggestion.cta.filtro }}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          {suggestion.cta.label} <ArrowRight size={16} aria-hidden />
        </Link>
      ) : null}

      <Link to="/alimentacao" className="mt-6 block text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
