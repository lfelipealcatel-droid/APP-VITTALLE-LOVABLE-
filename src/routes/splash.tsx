import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/splash")({
  head: () => ({ meta: [{ title: "VITTALLE" }, { name: "description", content: "Bem-estar guiado para mulheres 40+." }] }),
  component: Splash,
});

function Splash() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    const t2 = setTimeout(() => nav({ to: "/" }), 1400);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [nav]);
  return (
    <div className="grid min-h-screen place-items-center bg-warm px-6">
      <div className="text-center">
        <p className="font-editorial text-4xl tracking-tight text-primary-dark">VITTALLE</p>
        <p className="mt-3 text-sm text-text-secondary">Sua jornada de bem-estar</p>
        <div className="mt-8 flex justify-center gap-1.5" aria-hidden>
          <span className={`h-2 w-2 rounded-full ${ready ? "bg-primary" : "bg-primary/30"} transition`} />
          <span className={`h-2 w-2 rounded-full ${ready ? "bg-primary" : "bg-primary/30"} transition delay-100`} />
          <span className={`h-2 w-2 rounded-full ${ready ? "bg-primary" : "bg-primary/30"} transition delay-200`} />
        </div>
        <Link to="/" className="mt-10 inline-block text-xs text-text-secondary underline">Pular</Link>
      </div>
    </div>
  );
}
