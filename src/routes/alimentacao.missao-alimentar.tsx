import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { activeDay, isDayActivityDone, setDayActivity, useAppState } from "@/lib/store";

// Dia de origem explícito (veio de /alimentacao?dia=X, que por sua vez veio de /jornada/$dia).
// Sem ele — acesso direto, ou valor inválido/fora de 1–21 — cai de volta no dia ativo.
const searchSchema = z.object({
  dia: z.coerce.number().int().min(1).max(21).optional().catch(undefined),
});

export const Route = createFileRoute("/alimentacao/missao-alimentar")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Missão alimentar — VITTALLE" },
      { name: "description", content: "A ação prática que conclui a Alimentação do dia." },
    ],
  }),
  component: MissaoPage,
});

// 7 missões alimentares reais, intercaladas ao longo dos 21 dias (dia 1, 8, 15 → missão 1; dia 2,
// 9, 16 → missão 2; ...). Cada uma é uma ação prática independente — não há 21 missões diferentes.
interface DailyMission {
  title: string;
  description: string;
  ideas: string[];
}

const MISSIONS: DailyMission[] = [
  {
    title: "Acrescente um vegetal verde-escuro",
    description:
      "Inclua uma opção simples em uma das suas refeições de hoje. Folhas e vegetais verde-escuros ajudam a aumentar fibras e micronutrientes sem complicar o prato.",
    ideas: ["Couve", "Espinafre", "Brócolis", "Rúcula ou outra folha que você já tenha"],
  },
  {
    title: "Coloque uma fonte de proteína na refeição",
    description:
      "Uma boa fonte de proteína ajuda na saciedade e na manutenção da massa muscular, especialmente depois dos 40.",
    ideas: [
      "Ovo",
      "Frango ou peixe",
      "Iogurte natural ou queijo",
      "Feijão com ovo ou outra combinação que você já use",
    ],
  },
  {
    title: "Troque uma bebida açucarada hoje",
    description:
      "Faça apenas uma troca simples. Reduzir o açúcar líquido é uma forma prática de melhorar a alimentação sem precisar mudar o restante do seu dia.",
    ideas: [
      "Água",
      "Água com limão",
      "Chá sem açúcar",
      "Café sem açúcar, se fizer sentido para você",
    ],
  },
  {
    title: "Inclua uma fonte de fibra",
    description:
      "A fibra contribui para a saciedade e para o funcionamento intestinal. Você não precisa mudar sua refeição inteira — apenas acrescentar uma fonte.",
    ideas: ["Uma fruta", "Aveia", "Feijão", "Vegetais ou uma colher de chia/linhaça"],
  },
  {
    title: "Coloque mais vegetais no prato",
    description:
      "Hoje, aumente a presença de vegetais em uma refeição. Eles dão volume ao prato e ajudam a deixar a refeição mais equilibrada e satisfatória.",
    ideas: [
      "Salada simples",
      "Legumes congelados",
      "Tomate, cenoura ou abobrinha",
      "Dois vegetais que você já tenha em casa",
    ],
  },
  {
    title: "Deixe uma opção de emergência pronta",
    description:
      "Ter uma escolha simples disponível ajuda a evitar que a fome e a falta de tempo decidam por você.",
    ideas: [
      "Ovos cozidos",
      "Iogurte com fruta",
      "Frango já preparado",
      "Uma opção rápida que você realmente costuma comer",
    ],
  },
  {
    title: "Monte uma refeição simples e equilibrada",
    description:
      "Não precisa ser perfeito. Hoje, pratique uma combinação que você possa repetir na vida real.",
    ideas: [
      "Uma fonte de proteína",
      "Um vegetal",
      "Uma fonte de carboidrato",
      "Use o que já existe em casa",
    ],
  },
];

function missionForDay(dayId: number): DailyMission {
  return MISSIONS[(dayId - 1) % MISSIONS.length];
}

function MissaoPage() {
  const [state] = useAppState();
  const { dia } = Route.useSearch();
  const dayId = dia ?? activeDay(state);
  const done = isDayActivityDone(state, dayId, "alimentacao");
  const mission = missionForDay(dayId);

  const toggle = () => {
    setDayActivity(dayId, "alimentacao", !done);
    toast.success(done ? "Missão desmarcada" : "Missão concluída");
  };

  return (
    <AppShell title="Missão alimentar" subtitle={`Dia ${dayId}`} back="/alimentacao">
      <section className="rounded-2xl border border-primary/20 bg-warm p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary-dark">
          <Sparkles size={14} aria-hidden /> Missão de hoje
        </div>
        <h1 className="mt-2 font-editorial text-2xl">{mission.title}</h1>
        <p className="mt-2 text-sm text-text-secondary">{mission.description}</p>

        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-text-secondary">Ideias simples</p>
        <ul className="grid gap-2">
          {mission.ideas.map((idea) => (
            <li key={idea} className="rounded-xl border border-border bg-surface p-3 text-sm text-text-secondary">
              {idea}
            </li>
          ))}
        </ul>

        {done ? (
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-secondary-light px-4 py-3 text-sm font-semibold text-secondary-dark">
            <span className="flex items-center gap-2">
              <Check size={16} aria-hidden /> Missão concluída
            </span>
            <button type="button" onClick={toggle} className="text-xs font-medium text-secondary-dark/70 hover:underline">
              Desfazer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggle}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Check size={16} aria-hidden /> Concluir missão de hoje
          </button>
        )}
      </section>

      <Link to="/alimentacao" className="mt-6 inline-flex text-xs font-semibold text-primary hover:underline">
        Voltar para Alimentação
      </Link>
    </AppShell>
  );
}
