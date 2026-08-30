import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({
    meta: [
      { title: "Redefinir senha — VITTALLE" },
      { name: "description", content: "Defina uma nova senha para sua conta VITTALLE." },
    ],
  }),
  component: RedefinirSenha,
});

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function RedefinirSenha() {
  const { session, loading: authLoading, isPasswordRecovery, finishPasswordRecovery } = useAuth();
  const [form, setForm] = useState({ next: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!PASSWORD_RULE.test(form.next)) {
      toast.error("A senha deve ter ao menos 8 caracteres, com letras e números.");
      return;
    }
    if (form.next !== form.confirm) {
      toast.error("A confirmação não confere.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: form.next });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível redefinir sua senha. Tente novamente.");
      return;
    }
    toast.success("Senha redefinida com sucesso.");
    finishPasswordRecovery();
    nav({ to: "/" });
  };

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6">
        <p className="text-sm text-text-secondary">Carregando…</p>
      </div>
    );
  }

  if (!session || !isPasswordRecovery) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-editorial text-3xl text-primary-dark">VITTALLE</p>
          <p className="mt-4 text-sm text-text-secondary">
            Este link de redefinição não é mais válido. Solicite um novo link para continuar.
          </p>
          <Link to="/esqueci-senha" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-editorial text-3xl text-primary-dark">VITTALLE</p>
        <p className="mt-2 text-center text-sm text-text-secondary">Escolha uma nova senha.</p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-3">
          <label className="grid gap-1 text-xs text-text-secondary"><span>Nova senha</span>
            <input type="password" required className="input" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} />
          </label>
          <label className="grid gap-1 text-xs text-text-secondary"><span>Confirmar nova senha</span>
            <input type="password" required className="input" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          </label>
          <p className="text-[11px] text-text-muted">Mínimo de 8 caracteres, com letras e números.</p>
          <button type="submit" disabled={loading} className="mt-2 min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Salvando…" : "Salvar nova senha"}
          </button>
        </form>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </div>
  );
}
