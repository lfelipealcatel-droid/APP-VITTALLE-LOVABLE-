import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [{ title: "Falar com o suporte — VITTALLE" }] }),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "Dúvida geral", message: "" });
  if (sent) {
    return (
      <AppShell title="Mensagem enviada" back="/perfil" hideMiniPlayer>
        <div className="rounded-2xl border border-secondary/30 bg-soft-green p-6 text-center">
          <p className="font-editorial text-xl">Mensagem enviada</p>
          <p className="mt-1 text-sm text-text-secondary">Nossa equipe retornará assim que possível.</p>
        </div>
      </AppShell>
    );
  }
  return (
    <AppShell title="Falar com o suporte" back="/perfil" hideMiniPlayer>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Mensagem enviada"); }}
        className="grid gap-3 rounded-2xl border border-border bg-surface p-5"
      >
        <label className="grid gap-1 text-xs text-text-secondary"><span>Assunto</span>
          <input required className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </label>
        <label className="grid gap-1 text-xs text-text-secondary"><span>Categoria</span>
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Dúvida geral</option><option>Acesso e conta</option><option>Conteúdos</option><option>Progresso</option><option>Problema técnico</option>
          </select>
        </label>
        <label className="grid gap-1 text-xs text-text-secondary"><span>Mensagem</span>
          <textarea required rows={5} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
        <button type="submit" className="mt-2 min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground">Enviar mensagem</button>
      </form>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:10px 12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </AppShell>
  );
}
