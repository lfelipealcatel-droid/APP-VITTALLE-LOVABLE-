import { Link } from "@tanstack/react-router";
import { Bell, Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { useAppState } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";

export function TopUserBar({ message }: { message?: ReactNode }) {
  const [state] = useAppState();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const unread = 4 - state.notificationsRead.length;
  // Enquanto o profile ainda carrega, firstName fica undefined (nunca um nome mock) — evita o flash
  // de qualquer identidade fictícia antes do dado real do Supabase chegar.
  const firstName = profileLoading ? undefined : profile?.name?.trim().split(/\s+/)[0];
  const avatarLetter = (firstName || user?.email || "").slice(0, 1).toUpperCase();
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 font-editorial text-xl">
          {firstName ? `Olá, ${firstName}` : "Olá!"} <Leaf size={16} className="text-secondary" aria-hidden />
        </p>
        {message ? <div className="mt-1 text-sm text-text-secondary">{message}</div> : null}
      </div>
      <Link
        to="/notificacoes"
        aria-label={`Notificações${unread > 0 ? `, ${unread} não lidas` : ""}`}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2"
      >
        <Bell size={20} aria-hidden />
        {unread > 0 ? (
          <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        ) : null}
      </Link>
      <Link
        to="/perfil"
        aria-label="Perfil"
        className="grid h-11 w-11 place-items-center rounded-full bg-secondary-light font-semibold text-secondary-dark"
      >
        {avatarLetter}
      </Link>
    </div>
  );
}
