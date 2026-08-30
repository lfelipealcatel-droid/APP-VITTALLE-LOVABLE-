import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/esqueci-senha")({
  head: () => ({
    meta: [
      { title: "Esqueci minha senha — VITTALLE" },
      { name: "description", content: "Recupere o acesso à sua conta VITTALLE." },
    ],
  }),
  component: EsqueciSenha,
});

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-editorial text-3xl text-primary-dark">VITTALLE</p>
        <p className="mt-2 text-center text-sm text-text-secondary">Vamos te ajudar a recuperar o acesso.</p>

        {sent ? (
          <p className="mt-8 rounded-2xl border border-border bg-surface p-4 text-center text-sm text-text-secondary">
            Se este e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 grid gap-3">
            <label className="grid gap-1 text-xs text-text-secondary"><span>E-mail</span>
              <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit" disabled={loading} className="mt-2 min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {loading ? "Enviando…" : "Enviar instruções"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-text-secondary">
          <Link to="/login" className="text-primary hover:underline">Voltar para o login</Link>
        </p>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </div>
  );
}
