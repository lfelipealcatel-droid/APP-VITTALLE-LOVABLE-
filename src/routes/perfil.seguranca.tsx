import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/perfil/seguranca")({
  head: () => ({
    meta: [
      { title: "Segurança — VITTALLE" },
      { name: "description", content: "Altere sua senha." },
    ],
  }),
  component: Seguranca,
});

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function Seguranca() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!form.current || !form.next) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    if (form.next !== form.confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    if (!PASSWORD_RULE.test(form.next)) {
      toast.error("A nova senha deve ter ao menos 8 caracteres, com letras e números.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: form.next,
      current_password: form.current,
    });
    setLoading(false);
    if (error) {
      if (error.code === "reauthentication_not_valid" || error.code === "invalid_credentials") {
        toast.error("Senha atual incorreta.");
      } else if (error.code === "same_password") {
        toast.error("A nova senha deve ser diferente da atual.");
      } else if (error.code === "weak_password") {
        toast.error("A nova senha deve ter ao menos 8 caracteres, com letras e números.");
      } else {
        toast.error("Não foi possível alterar sua senha. Tente novamente.");
      }
      return;
    }
    toast.success("Senha alterada com sucesso.");
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
        <p className="text-[11px] text-text-muted">Mínimo de 8 caracteres, com letras e números.</p>
        <div className="mt-2 flex gap-2">
          <button type="submit" disabled={loading} className="min-h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Salvando…" : "Salvar alterações"}
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
