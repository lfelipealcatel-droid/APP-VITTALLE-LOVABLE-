import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const PAGES = [
  { title: "Uma jornada guiada, dia após dia", body: "21 dias com passos curtos e claros, feitos para mulheres 40+." },
  { title: "Ações práticas em minutos", body: "Vídeos curtos, áudios calmantes e leituras diretas ao ponto." },
  { title: "Consistência sem pressão", body: "Você retoma no seu ritmo. Seu progresso continua." },
  { title: "Comece pelo seu próximo passo", body: "Tudo pronto para você começar hoje." },
];

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Bem-vinda — VITTALLE" }, { name: "description", content: "Uma jornada guiada e acolhedora." }] }),
  component: Onboarding,
});

function Onboarding() {
  const [i, setI] = useState(0);
  const nav = useNavigate();
  const page = PAGES[i];
  const last = i === PAGES.length - 1;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-end px-5 py-4">
        <Link to="/" className="text-xs text-text-secondary underline">Pular</Link>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 grid h-40 w-40 place-items-center rounded-3xl bg-warm text-primary" aria-hidden>
          <span className="font-editorial text-3xl">{i + 1}</span>
        </div>
        <h1 className="font-editorial text-3xl leading-tight">{page.title}</h1>
        <p className="mt-3 max-w-sm text-sm text-text-secondary">{page.body}</p>
      </div>
      <div className="mx-auto flex w-full max-w-md items-center gap-3 px-6 pb-8 pt-4">
        <div className="flex flex-1 gap-1.5">
          {PAGES.map((_, idx) => (
            <span key={idx} className={`h-1.5 flex-1 rounded-full ${idx === i ? "bg-primary" : "bg-surface-2"}`} aria-hidden />
          ))}
        </div>
        <button
          type="button"
          onClick={() => (last ? nav({ to: "/" }) : setI(i + 1))}
          className="min-h-12 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          {last ? "Começar" : "Próximo"}
        </button>
      </div>
    </div>
  );
}
