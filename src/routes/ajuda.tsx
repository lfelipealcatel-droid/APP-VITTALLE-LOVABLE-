import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { cat: "Acesso e conta", qs: [
    { q: "Como recupero minha senha?", a: "Você pode redefinir sua senha na tela de login em ‘Esqueci minha senha’." },
    { q: "Posso mudar meu e-mail?", a: "Sim, em Perfil › Dados pessoais." },
  ]},
  { cat: "Jornada", qs: [
    { q: "Posso pular um dia?", a: "Se você não conseguir fazer sua Aula do Dia, tudo bem. Sua jornada fica esperando por você. Quando voltar, continue do ponto em que parou. O próximo dia é liberado depois que você conclui a Aula do Dia e chega um novo dia." },
    { q: "Como avanço para o próximo dia?", a: "Conclua sua Aula do Dia. Depois disso, sua jornada fica pronta para continuar no dia seguinte. Alimentação, hábito e check-in continuam fazendo parte da experiência e ajudam você a aproveitar o método por completo." },
  ]},
  { cat: "Progresso", qs: [
    { q: "As medidas são obrigatórias?", a: "Não. Registrar é opcional e serve para você acompanhar sua evolução." },
  ]},
  { cat: "Privacidade", qs: [
    { q: "Meus dados são compartilhados?", a: "A VITTALLE trata seus dados apenas para finalidades relacionadas ao funcionamento, segurança e melhoria da experiência e, quando necessário, pode utilizar fornecedores de tecnologia que apoiam a operação do serviço. O tratamento dos dados segue nossa Política de Privacidade." },
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
