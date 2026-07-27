import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/perfil/seguranca")({
  head: () => ({
    meta: [
      { title: "Segurança — VITTALLE" },
      { name: "description", content: "Altere sua senha." },
    ],
  }),
  component: Seguranca,
});

function Seguranca() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || !form.next) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    if (form.next !== form.confirm) {
      toast.error("A confirmação não confere");
      return;
    }
    if (form.next.length < 6) {
      toast.error("A nova senha deve ter ao menos 6 caracteres");
      return;
    }
    toast.success("Senha alterada");
    setForm({ current: "", next: "", confirm: "" });
  };
  return (
    <AppShell title="Segurança" back="/perfil" hideMiniPlayer>
      <form onSubmit={save} className="grid gap-3 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-editorial text-lg">Alterar senha</h2>
        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Senha atual</span>
          <input
            type="password"
            value={form.current}
            onChange={(e) => setForm({ ...form, current: e.target.value })}
            className="input"
          />
        </label>
        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Nova senha</span>
          <input
            type="password"
            value={form.next}
            onChange={(e) => setForm({ ...form, next: e.target.value })}
            className="input"
          />
        </label>
        <label className="grid gap-1 text-xs text-text-secondary">
          <span>Confirmar nova senha</span>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="input"
          />
        </label>
        <div className="mt-2 flex gap-2">
          <button type="submit" className="min-h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
            Salvar alterações
          </button>
          <button type="button" onClick={() => history.back()} className="min-h-12 rounded-xl border border-border px-4 text-sm">
            Cancelar
          </button>
        </div>
      </form>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:10px 12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </AppShell>
  );
}
