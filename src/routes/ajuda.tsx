import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { cat: "Acesso e conta", qs: [
    { q: "Como recupero minha senha?", a: "Você pode redefinir sua senha na tela de login em ‘Esqueci minha senha’." },
    { q: "Posso mudar meu e-mail?", a: "Sim, em Perfil › Dados pessoais." },
  ]},
  { cat: "Jornada", qs: [
    { q: "Posso pular um dia?", a: "Sim. Você pode retomar no seu ritmo. Seu progresso continua." },
    { q: "Como marco um dia como concluído?", a: "Ao concluir todas as atividades do dia, ele é marcado automaticamente." },
  ]},
  { cat: "Conteúdos", qs: [
    { q: "Como salvo um favorito?", a: "Toque no coração no conteúdo desejado." },
  ]},
  { cat: "Progresso", qs: [
    { q: "As medidas são obrigatórias?", a: "Não. Registrar é opcional e serve para você acompanhar sua evolução." },
  ]},
  { cat: "Privacidade", qs: [
    { q: "Meus dados são compartilhados?", a: "Não. Suas informações são pessoais e usadas apenas para sua jornada." },
  ]},
];

export const Route = createFileRoute("/ajuda")({
  head: () => ({ meta: [{ title: "Central de ajuda — VITTALLE" }] }),
  component: Ajuda,
});

function Ajuda() {
  return (
    <AppShell title="Central de ajuda" back="/perfil" hideMiniPlayer>
      <div className="grid gap-6">
        {FAQ.map((group) => (
          <section key={group.cat}>
            <h3 className="mb-2 text-sm font-semibold text-text-secondary">{group.cat}</h3>
            <Accordion type="single" collapsible className="overflow-hidden rounded-2xl border border-border bg-surface">
              {group.qs.map((it, i) => (
                <AccordionItem key={i} value={`${group.cat}-${i}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-4 text-sm">{it.q}</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 text-sm text-text-secondary">{it.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
