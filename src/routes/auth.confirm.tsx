import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/confirm")({
  head: () => ({ meta: [{ title: "Confirmação — VITTALLE" }] }),
  component: AuthConfirm,
});

function AuthConfirm() {
  const nav = useNavigate();
  const [status, setStatus] = useState<"checking" | "invalid">("checking");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;
    const next = params.get("next");

    if (!tokenHash || !type) {
      setStatus("invalid");
      return;
    }

    supabase.auth.verifyOtp({ token_hash: tokenHash, type }).then(({ error }) => {
      if (error) {
        setStatus("invalid");
        return;
      }
      if (type === "recovery") {
        nav({ to: "/redefinir-senha" });
        return;
      }
      const target = next && next.startsWith("/") ? next : "/";
      nav({ to: target });
    });
  }, [nav]);

  if (status === "invalid") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-editorial text-3xl text-primary-dark">VITTALLE</p>
          <p className="mt-4 text-sm text-text-secondary">Este link é inválido ou já expirou.</p>
          <Link to="/esqueci-senha" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <p className="text-sm text-text-secondary">Confirmando…</p>
    </div>
  );
}
