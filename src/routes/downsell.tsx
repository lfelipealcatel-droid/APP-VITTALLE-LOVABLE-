import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { productById } from "@/lib/mock-data";

export const Route = createFileRoute("/downsell")({
  head: () => ({
    meta: [
      { title: "GLP-1 Natural – Ativação 7 Dias — VITTALLE" },
      { name: "description", content: "A versão essencial do Acelerador GLP-1 Natural, com 7 dias de ativação guiada." },
    ],
  }),
  component: Downsell,
});

function Downsell() {
  const p = productById("glp1-ativacao-7-dias")!;
  const nav = useNavigate();
  return (
    <AppShell title="Uma opção mais simples" back="/biblioteca" hideMiniPlayer>
      <section className="rounded-3xl border border-primary/20 bg-warm p-6">
        <p className="text-[11px] uppercase tracking-wide text-primary-dark">Alternativa</p>
        <h1 className="mt-1 font-editorial text-2xl">{p.title}</h1>
        <p className="mt-2 text-sm text-text-secondary">{p.longDescription}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">O que está incluído</h2>
        <ul className="mt-2 grid gap-2">
          {p.includes.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-secondary-light text-secondary-dark">
                <Check size={12} aria-hidden />
              </span>
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-text-muted">Valor: {p.price}.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => nav({ to: "/produto/$id", params: { id: p.id } })}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Ver GLP-1 Natural – Ativação 7 Dias
          </button>
          <Link to="/biblioteca" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium">
            Voltar sem culpa
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
