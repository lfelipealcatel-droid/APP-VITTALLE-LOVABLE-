import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — VITTALLE" }, { name: "description", content: "Acesse sua jornada VITTALLE." }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("mariana@exemplo.com");
  const [pass, setPass] = useState("vittalle");
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-editorial text-3xl text-primary-dark">VITTALLE</p>
        <p className="mt-2 text-center text-sm text-text-secondary">Que bom ter você de volta.</p>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Bem-vinda de volta"); nav({ to: "/" }); }} className="mt-8 grid gap-3">
          <label className="grid gap-1 text-xs text-text-secondary"><span>E-mail</span>
            <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="grid gap-1 text-xs text-text-secondary"><span>Senha</span>
            <div className="relative">
              <input type={show ? "text" : "password"} required className="input pr-10" value={pass} onChange={(e) => setPass(e.target.value)} />
              <button type="button" aria-label={show ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-text-muted hover:bg-surface-2">
                {show ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
              </button>
            </div>
          </label>
          <a href="#" className="text-right text-xs text-primary hover:underline">Esqueci minha senha</a>
          <button type="submit" className="mt-2 min-h-12 rounded-xl bg-primary text-sm font-semibold text-primary-foreground">Entrar</button>
          <button type="button" onClick={() => { toast.success("Entrou com Google"); nav({ to: "/" }); }} className="min-h-12 rounded-xl border border-border bg-surface text-sm font-medium">Continuar com Google</button>
        </form>
        <p className="mt-6 text-center text-xs text-text-secondary">
          Ainda não tem conta? <Link to="/onboarding" className="text-primary hover:underline">Criar conta</Link>
        </p>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:12px;font-size:14px;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
    </div>
  );
}
