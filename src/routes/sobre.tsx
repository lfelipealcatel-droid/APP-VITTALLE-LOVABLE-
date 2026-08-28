import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a VITTALLE — Nossa missão" },
      {
        name: "description",
        content: "Conheça a filosofia da VITTALLE: bem-estar guiado, acolhedor e no seu ritmo.",
      },
      { property: "og:title", content: "Sobre a VITTALLE" },
      { property: "og:description", content: "Bem-estar guiado, acolhedor e no seu ritmo." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <AppShell title="Sobre a VITTALLE" back="/perfil" hideMiniPlayer>
      <div className="mx-auto max-w-[680px] animate-fade-in">
        <section className="rounded-3xl border border-primary/20 bg-warm p-6">
          <p className="text-[11px] uppercase tracking-wide text-primary-dark">Nossa missão</p>
          <h1 className="mt-2 font-editorial text-3xl leading-tight">
            Bem-estar que acompanha a sua vida.
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            A VITTALLE nasceu para tornar o cuidado com o corpo e o bem-estar mais simples, possível
            e presente na vida real. Criamos experiências guiadas que ajudam você a saber o que
            fazer, um passo de cada vez.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-text-secondary">O que nos guia</h2>
          <ul className="mt-3 grid gap-3 text-sm">
            <Item title="Simplicidade" body="Menos complicação. Mais clareza para agir." />
            <Item
              title="Vida real"
              body="Orientações que cabem na rotina e respeitam diferentes momentos."
            />
            <Item title="Consistência" body="Pequenos passos que, repetidos, constroem mudanças." />
            <Item title="Cuidado" body="Uma experiência clara, respeitosa e sem julgamentos." />
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-text-secondary">Nossa forma de fazer</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Você não precisa aprender a usar um sistema complicado. A VITTALLE organiza o caminho
            para que você saiba qual é o próximo passo e consiga seguir no seu ritmo.
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-text-muted">
          VITTALLE · Bem-estar para a vida real.
        </p>
      </div>
    </AppShell>
  );
}

function Item({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-xl bg-surface-2/40 p-3">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-xs text-text-secondary">{body}</p>
    </li>
  );
}
