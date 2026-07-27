import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  Download,
  FileText,
  Heart,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  MessageCircle,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { USER } from "@/lib/mock-data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — VITTALLE" },
      { name: "description", content: "Sua conta, preferências e suporte." },
      { property: "og:title", content: "Perfil — VITTALLE" },
      { property: "og:description", content: "Sua conta e preferências." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  return (
    <AppShell title="Perfil" hideMiniPlayer>
      <div className="animate-fade-in">
        <section className="flex items-center gap-4 rounded-3xl border border-primary/20 bg-warm p-5 shadow-soft">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
            {USER.firstName.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="font-editorial text-xl leading-tight">{USER.fullName}</p>
            <p className="truncate text-xs text-text-secondary">{USER.email}</p>
            <p className="mt-1 text-xs font-medium text-primary-dark">{USER.program}</p>
          </div>
        </section>

        <Group title="Conta">
          <Item to="/perfil/dados" icon={UserIcon} label="Dados pessoais" />
          <Item to="/perfil/seguranca" icon={Lock} label="Segurança" />
        </Group>

        <Group title="Sua biblioteca">
          <Item to="/favoritos" icon={Heart} label="Favoritos" />
          <Item to="/downloads" icon={Download} label="Conteúdos baixados" />
        </Group>

        <Group title="Suporte">
          <Item to="/ajuda" icon={HelpCircle} label="Central de ajuda" />
          <Item to="/contato" icon={MessageCircle} label="Falar com o suporte" />
        </Group>

        <Group title="Sobre">
          <Item to="/sobre" icon={Info} label="Sobre a VITTALLE" />
          <Item to="/termos" icon={FileText} label="Termos de uso" />
          <Item to="/privacidade" icon={ShieldCheck} label="Política de privacidade" />
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
            <span className="flex items-center gap-3 text-text-secondary">
              <FileText size={16} aria-hidden /> Versão
            </span>
            <span className="text-xs text-text-muted">1.0.0 (prototype)</span>
          </div>
        </Group>

        <div className="mt-6">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text-secondary transition hover:bg-surface-2"
          >
            <LogOut size={16} aria-hidden /> Sair da conta
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </h3>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {children}
      </div>
    </section>
  );
}

function Item({ to, icon: Icon, label }: { to: string; icon: typeof Bell; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between border-t border-border px-4 py-3.5 text-sm transition first:border-t-0 hover:bg-surface-2"
    >
      <span className="flex items-center gap-3">
        <Icon size={16} aria-hidden className="text-text-secondary" /> {label}
      </span>
      <ChevronRight size={16} className="text-text-muted" aria-hidden />
    </Link>
  );
}
