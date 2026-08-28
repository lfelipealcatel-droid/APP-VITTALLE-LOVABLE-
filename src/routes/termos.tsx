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
    title: "1. Aceitação dos termos",
    body: "Ao acessar ou utilizar a VITTALLE, você concorda com estes Termos de Uso e com a Política de Privacidade aplicável ao serviço. Se você não concordar com alguma destas condições, não deverá utilizar o aplicativo. Estes Termos devem ser interpretados em conjunto com a legislação brasileira aplicável e não limitam direitos que não possam ser legalmente afastados.",
  },
  {
    title: "2. Sobre a VITTALLE",
    body: "A VITTALLE oferece experiências digitais de educação, bem-estar, movimento, alimentação e desenvolvimento de hábitos. Os programas e conteúdos podem variar de acordo com o produto adquirido e com as funcionalidades disponibilizadas em cada momento.",
  },
  {
    title: "3. Natureza educacional e de bem-estar",
    body: "Os conteúdos disponibilizados pela VITTALLE possuem caráter educativo e informativo e não substituem avaliação, diagnóstico, tratamento ou acompanhamento individual realizado por médico, nutricionista, psicólogo, fisioterapeuta ou outro profissional habilitado quando necessário. Em caso de condição de saúde, sintomas, dor, limitação ou dúvida sobre a prática de uma atividade, procure orientação profissional adequada.",
  },
  {
    title: "4. Uso responsável",
    body: "Cada pessoa possui condições, histórico e necessidades diferentes. Ao realizar exercícios, aplicar orientações alimentares ou utilizar qualquer conteúdo da plataforma, respeite seus limites e interrompa a atividade caso sinta dor, mal-estar ou qualquer reação que gere preocupação. Em situações de urgência ou emergência, procure imediatamente o serviço de saúde apropriado.",
  },
  {
    title: "5. Acesso à conta",
    body: "O acesso aos produtos da VITTALLE é pessoal e destinado à pessoa que realizou ou recebeu legitimamente o acesso. A usuária é responsável por preservar seus meios de acesso e por comunicar à VITTALLE eventual uso não autorizado assim que tomar conhecimento dele.",
  },
  {
    title: "6. Licença de uso e propriedade intelectual",
    body: "Os vídeos, áudios, textos, aulas, métodos, marcas, materiais, interfaces, imagens e demais conteúdos disponibilizados pela VITTALLE são protegidos pela legislação aplicável e são fornecidos para uso pessoal e não comercial da usuária. Salvo autorização expressa, não é permitido copiar, reproduzir, distribuir, vender, sublicenciar, disponibilizar publicamente ou explorar comercialmente esses conteúdos.",
  },
  {
    title: "7. Condutas não permitidas",
    body: "Não é permitido utilizar a VITTALLE para fins ilícitos, tentar acessar áreas ou dados sem autorização, interferir no funcionamento do serviço, compartilhar acessos de maneira indevida, reproduzir conteúdos protegidos ou utilizar a plataforma de forma que prejudique a VITTALLE, outras usuárias ou terceiros.",
  },
  {
    title: "8. Disponibilidade e evolução do serviço",
    body: "A VITTALLE busca manter seus serviços disponíveis e em funcionamento adequado, mas atualizações, manutenção, falhas técnicas, indisponibilidades de fornecedores ou situações fora de nosso controle podem afetar temporariamente o acesso. Funcionalidades, conteúdos e interfaces também podem ser atualizados ou aprimorados ao longo do tempo, respeitados os direitos aplicáveis à usuária.",
  },
  {
    title: "9. Responsabilidades",
    body: "A VITTALLE se responsabiliza pelo serviço nos limites previstos pela legislação aplicável. Resultados individuais podem variar conforme fatores pessoais, rotina, adesão e outras circunstâncias. Nenhuma disposição destes Termos exclui ou restringe direitos e responsabilidades que não possam ser afastados pela legislação brasileira, inclusive os direitos do consumidor quando aplicáveis.",
  },
  {
    title: "10. Pagamentos, acesso e condições comerciais",
    body: "Preços, formas de pagamento, prazo de acesso, garantia, reembolso e demais condições comerciais aplicáveis são aquelas apresentadas à usuária no momento da contratação e nos canais oficiais relacionados à compra, observada a legislação aplicável.",
  },
  {
    title: "11. Privacidade e dados pessoais",
    body: "O tratamento de dados pessoais relacionado ao uso da VITTALLE é descrito na Política de Privacidade. Recomendamos a leitura desse documento para compreender quais informações podem ser tratadas, para quais finalidades e quais direitos podem ser exercidos.",
  },
  {
    title: "12. Alterações destes termos",
    body: "Estes Termos poderão ser atualizados para refletir mudanças no serviço, na operação ou na legislação. Quando alterações relevantes afetarem a relação com a usuária, a VITTALLE adotará medidas adequadas de comunicação, quando aplicável. A data da versão mais recente permanecerá indicada nesta página.",
  },
  {
    title: "13. Legislação aplicável",
    body: "Estes Termos são regidos pela legislação brasileira. Eventuais conflitos serão tratados de acordo com as regras legais de competência aplicáveis, preservados os direitos da consumidora.",
  },
  {
    title: "14. Contato",
    body: "Questões relacionadas a estes Termos poderão ser encaminhadas pelos canais oficiais de atendimento disponibilizados pela VITTALLE.",
  },
];

function Termos() {
  return (
    <AppShell title="Termos de uso" back="/perfil" hideMiniPlayer>
      <div className="mx-auto max-w-[680px] animate-fade-in">
        <p className="text-xs text-text-muted">Atualizado em agosto de 2026</p>
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
