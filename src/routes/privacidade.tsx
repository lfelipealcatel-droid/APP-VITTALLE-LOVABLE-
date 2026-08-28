import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — VITTALLE" },
      { name: "description", content: "Como cuidamos dos seus dados na VITTALLE." },
      { property: "og:title", content: "Política de privacidade — VITTALLE" },
      { property: "og:description", content: "Seus dados são seus. A gente só cuida deles." },
    ],
  }),
  component: Privacidade,
});

const SECTIONS = [
  {
    title: "1. Sobre esta política",
    body: "Esta Política de Privacidade explica, de forma clara, como a VITTALLE pode tratar dados pessoais relacionados ao acesso e à utilização de seus produtos e serviços digitais. O tratamento de dados é realizado de acordo com a legislação brasileira aplicável, incluindo a Lei Geral de Proteção de Dados Pessoais — LGPD.",
  },
  {
    title: "2. Dados que podemos tratar",
    body: "De acordo com as funcionalidades utilizadas, a VITTALLE pode tratar dados de identificação e contato, informações relacionadas ao acesso ao produto, preferências, progresso na jornada, registros voluntários realizados pela própria usuária, medições inseridas no aplicativo e dados técnicos necessários ao funcionamento e à segurança do serviço.",
  },
  {
    title: "3. Para que utilizamos os dados",
    body: "Os dados podem ser utilizados para permitir o acesso ao serviço, manter e personalizar a experiência, registrar o progresso, disponibilizar funcionalidades, prestar comunicações relacionadas ao produto, proteger a segurança da plataforma, solucionar problemas técnicos, cumprir obrigações legais e melhorar a experiência oferecida pela VITTALLE.",
  },
  {
    title: "4. Dados de bem-estar e medições",
    body: "Algumas funcionalidades podem permitir que a própria usuária registre informações relacionadas à sua jornada, incluindo medidas corporais e outros registros de acompanhamento. Essas informações devem ser tratadas com cuidado e utilizadas para as finalidades relacionadas à experiência oferecida no aplicativo, observadas as exigências legais aplicáveis.",
  },
  {
    title: "5. Armazenamento e segurança",
    body: "A VITTALLE adota medidas técnicas e organizacionais compatíveis com a natureza do serviço para proteger dados pessoais contra acessos não autorizados, perda, alteração, divulgação ou tratamento inadequado. Nenhum ambiente digital é totalmente livre de riscos, mas buscamos aplicar práticas adequadas de segurança e revisar nossas medidas conforme o serviço evolui.",
  },
  {
    title: "6. Fornecedores e compartilhamento necessário",
    body: "A VITTALLE pode utilizar fornecedores de tecnologia e serviços necessários para viabilizar funcionalidades como hospedagem, reprodução de conteúdo, autenticação, processamento de pagamentos, comunicações, segurança e operação da plataforma. Quando dados pessoais forem tratados por esses fornecedores, o tratamento deverá ocorrer para finalidades relacionadas à prestação dos respectivos serviços e de acordo com as exigências legais aplicáveis.",
  },
  {
    title: "7. Cookies, armazenamento local e dados técnicos",
    body: "A VITTALLE pode utilizar recursos técnicos necessários ao funcionamento da experiência, como armazenamento local, cookies ou tecnologias semelhantes. Conforme as ferramentas efetivamente utilizadas, também poderão ser tratados dados técnicos relacionados ao dispositivo, navegador, funcionamento, segurança e uso do serviço. Quando exigido pela legislação aplicável, serão disponibilizados controles ou informações adicionais sobre essas tecnologias.",
  },
  {
    title: "8. Prazo de retenção",
    body: "Os dados pessoais serão mantidos pelo período necessário para cumprir as finalidades que justificaram seu tratamento, atender obrigações legais ou regulatórias, exercer direitos e cumprir outras hipóteses permitidas pela legislação. Quando não houver motivo legítimo ou obrigação para manutenção, os dados poderão ser eliminados ou anonimizados, observadas as possibilidades técnicas e legais.",
  },
  {
    title: "9. Direitos da titular",
    body: "Nos termos da LGPD e observadas as condições previstas em lei, a titular pode solicitar, entre outros direitos, confirmação da existência de tratamento, acesso aos dados, correção de informações incompletas ou desatualizadas, informações sobre compartilhamento, anonimização, bloqueio ou eliminação quando aplicável, portabilidade nos termos da regulamentação, revogação do consentimento quando essa for a base utilizada e demais direitos previstos na legislação.",
  },
  {
    title: "10. Exercício de direitos",
    body: "Solicitações relacionadas a dados pessoais e ao exercício dos direitos previstos na legislação poderão ser feitas pelos canais oficiais disponibilizados pela VITTALLE. Dependendo da solicitação, poderão ser necessárias informações adicionais para confirmar a identidade da pessoa solicitante e proteger os dados contra acesso indevido.",
  },
  {
    title: "11. Crianças e adolescentes",
    body: "Os produtos atualmente oferecidos pela VITTALLE são desenvolvidos para o público adulto. Caso futuramente sejam disponibilizados serviços destinados a crianças ou adolescentes, serão adotadas as medidas específicas exigidas pela legislação aplicável.",
  },
  {
    title: "12. Alterações desta política",
    body: "Esta Política poderá ser atualizada para refletir alterações no serviço, nas tecnologias utilizadas ou na legislação. A versão mais recente permanecerá disponível nos canais oficiais da VITTALLE, com indicação da data de atualização.",
  },
  {
    title: "13. Contato",
    body: "Dúvidas ou solicitações relacionadas à privacidade e à proteção de dados poderão ser encaminhadas pelos canais oficiais disponibilizados pela VITTALLE.",
  },
];

function Privacidade() {
  return (
    <AppShell title="Política de privacidade" back="/perfil" hideMiniPlayer>
      <div className="mx-auto max-w-[680px] animate-fade-in">
        <p className="text-xs text-text-muted">Atualizada em agosto de 2026</p>
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
