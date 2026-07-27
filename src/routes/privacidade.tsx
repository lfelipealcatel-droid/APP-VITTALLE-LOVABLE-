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
    title: "1. Seus dados são seus",
    body: "Coletamos apenas o essencial para você viver a sua jornada: seu nome, e-mail e, se você quiser, informações opcionais como medidas corporais e progresso. Nada é usado para julgar você.",
  },
  {
    title: "2. Como usamos suas informações",
    body: "Suas informações servem para personalizar a sua experiência, salvar seu progresso e oferecer conteúdos alinhados ao seu momento. Nunca vendemos seus dados.",
  },
  {
    title: "3. Onde ficam guardadas",
    body: "Suas informações ficam armazenadas com padrões atuais de segurança. Neste protótipo, o progresso é guardado localmente no seu próprio dispositivo.",
  },
  {
    title: "4. Suas medidas e progresso",
    body: "Medidas corporais e registros de progresso são sempre opcionais. Elas existem para você acompanhar sua evolução — e permanecem privadas.",
  },
  {
    title: "5. Seus direitos",
    body: "Você pode revisar, corrigir ou excluir suas informações a qualquer momento pelo Perfil. Também pode entrar em contato com o suporte para pedir a exclusão completa da sua conta.",
  },
  {
    title: "6. Cookies e analytics",
    body: "Usamos apenas o mínimo necessário para o funcionamento do aplicativo e para entender como melhorá-lo, sempre respeitando sua privacidade.",
  },
  {
    title: "7. Contato",
    body: "Dúvidas sobre privacidade podem ser enviadas pelo menu Perfil › Falar com o suporte.",
  },
];

function Privacidade() {
  return (
    <AppShell title="Privacidade" back="/perfil" hideMiniPlayer>
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
