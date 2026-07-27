import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de uso — VITTALLE" },
      { name: "description", content: "Termos de uso do aplicativo VITTALLE." },
      { property: "og:title", content: "Termos de uso — VITTALLE" },
      { property: "og:description", content: "Regras claras para uma boa jornada." },
    ],
  }),
  component: Termos,
});

const SECTIONS = [
  {
    title: "1. Sobre estes termos",
    body: "Ao utilizar a VITTALLE, você concorda com estes termos. Eles existem para deixar clara a relação entre você e o aplicativo, com transparência e simplicidade.",
  },
  {
    title: "2. Conteúdo educacional",
    body: "Todos os conteúdos da VITTALLE — vídeos, áudios, leituras e materiais — têm caráter educacional e de bem-estar. Eles não substituem orientação médica, nutricional ou psicológica individualizada.",
  },
  {
    title: "3. Sua conta",
    body: "Você é responsável por manter suas credenciais em segurança. Se identificar qualquer uso indevido da sua conta, entre em contato conosco imediatamente.",
  },
  {
    title: "4. Uso pessoal",
    body: "Os conteúdos são disponibilizados para o seu uso pessoal e não podem ser redistribuídos, reproduzidos comercialmente ou compartilhados sem autorização.",
  },
  {
    title: "5. Alterações",
    body: "Podemos atualizar estes termos periodicamente para refletir melhorias no produto. Sempre que houver mudanças relevantes, você será avisada dentro do aplicativo.",
  },
  {
    title: "6. Contato",
    body: "Se tiver qualquer dúvida sobre estes termos, você pode falar com o suporte pelo menu Perfil › Falar com o suporte.",
  },
];

function Termos() {
  return (
    <AppShell title="Termos de uso" back="/perfil" hideMiniPlayer>
      <div className="mx-auto max-w-[680px] animate-fade-in">
        <p className="text-xs text-text-muted">Atualizado em julho de 2026</p>
        <div className="mt-4 grid gap-3">
          {SECTIONS.map((s) => (
            <section key={s.title} className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-sm font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
