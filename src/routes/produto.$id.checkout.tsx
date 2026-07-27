import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CreditCard, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { productById } from "@/lib/mock-data";
import { setOwnedProduct, useAppState } from "@/lib/store";
import { USER } from "@/lib/mock-data";

export const Route = createFileRoute("/produto/$id/checkout")({
  loader: ({ params }) => {
    const product = productById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Checkout — ${loaderData.product.title}` : "Checkout — VITTALLE" },
      { name: "description", content: "Checkout simulado VITTALLE." },
    ],
  }),
  component: CheckoutPage,
  notFoundComponent: () => (
    <AppShell title="Checkout" back="/biblioteca">
      <p className="text-sm text-text-secondary">Produto não encontrado.</p>
    </AppShell>
  ),
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const [state] = useAppState();
  const nav = useNavigate();

  const [name, setName] = useState(USER.fullName);
  const [email, setEmail] = useState(USER.email);
  const [method, setMethod] = useState<"card" | "pix">("card");
  const [agree, setAgree] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const alreadyOwns = state.ownedProducts.includes(product.id);

  const finalize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !agree) {
      toast.error("Preencha os dados e aceite as condições.");
      return;
    }
    setOwnedProduct(product.id, true);
    setConfirmed(true);
    toast.success("Pagamento confirmado (simulado)");
  };

  if (confirmed) {
    return (
      <AppShell title="Pagamento confirmado" back={`/produto/${product.id}`} hideMiniPlayer>
        <section className="rounded-2xl border border-secondary/30 bg-soft-green p-6 text-center">
          <CheckCircle2 size={40} className="mx-auto text-secondary-dark" aria-hidden />
          <h1 className="mt-3 font-editorial text-2xl">Pagamento confirmado</h1>
          <p className="mt-2 text-sm text-text-secondary">
            {product.title} agora faz parte da sua biblioteca.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              to="/produto/$id/acessar"
              params={{ id: product.id }}
              className="inline-flex min-h-12 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Acessar agora
            </Link>
            <Link
              to="/biblioteca"
              className="inline-flex min-h-12 items-center rounded-xl border border-border bg-surface px-4 text-sm font-medium"
            >
              Voltar para a Biblioteca
            </Link>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell title="Checkout simulado" back={`/produto/${product.id}`} hideMiniPlayer>
      <section className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[11px] uppercase tracking-wide text-text-muted">Você está adquirindo</p>
        <h1 className="mt-1 font-editorial text-xl">{product.title}</h1>
        <p className="mt-1 text-sm text-text-secondary">{product.subtitle}</p>
        <p className="mt-4 text-2xl font-semibold text-primary-dark">R$ {product.price ?? 0}</p>
        <p className="text-xs text-text-muted">Valor de referência da demonstração.</p>
      </section>

      <form onSubmit={finalize} className="mt-4 grid gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Seus dados</h2>
          <div className="mt-3 grid gap-3">
            <label className="grid gap-1 text-xs text-text-secondary">
              Nome completo
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="min-h-11 rounded-xl border border-border bg-surface-2 px-3 text-sm text-foreground"
              />
            </label>
            <label className="grid gap-1 text-xs text-text-secondary">
              E-mail
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-h-11 rounded-xl border border-border bg-surface-2 px-3 text-sm text-foreground"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Forma de pagamento (simulada)</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left ${method === "card" ? "border-primary bg-warm" : "border-border bg-surface hover:bg-surface-2"}`}
            >
              <CreditCard size={18} className="text-primary" aria-hidden />
              <div>
                <p className="text-sm font-medium">Cartão</p>
                <p className="text-xs text-text-secondary">Crédito ou débito</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMethod("pix")}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left ${method === "pix" ? "border-primary bg-warm" : "border-border bg-surface hover:bg-surface-2"}`}
            >
              <QrCode size={18} className="text-primary" aria-hidden />
              <div>
                <p className="text-sm font-medium">PIX</p>
                <p className="text-xs text-text-secondary">Confirmação imediata</p>
              </div>
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 rounded-2xl border border-border bg-surface p-4 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5"
          />
          Concordo que este é um checkout simulado, sem cobrança real, para fins de demonstração.
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            FINALIZAR COMPRA SIMULADA
          </button>
          <Link
            to="/produto/$id"
            params={{ id: product.id }}
            className="inline-flex min-h-12 items-center gap-1 rounded-xl border border-border bg-surface px-4 text-sm font-medium"
          >
            <ArrowLeft size={16} aria-hidden /> Voltar
          </Link>
        </div>

        {alreadyOwns ? (
          <p className="text-xs text-secondary-dark">Você já possui este produto. Concluir a simulação levará à área do produto.</p>
        ) : null}
      </form>
    </AppShell>
  );
}
