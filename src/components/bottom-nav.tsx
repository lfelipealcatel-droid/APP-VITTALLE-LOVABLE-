import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, Library, TrendingUp, User } from "lucide-react";

const NAV = [
  { to: "/" as const, label: "Início", icon: Home, exact: true },
  { to: "/jornada" as const, label: "Jornada", icon: Map, exact: false },
  { to: "/biblioteca" as const, label: "Biblioteca", icon: Library, exact: false },
  { to: "/progresso" as const, label: "Progresso", icon: TrendingUp, exact: false },
  { to: "/perfil" as const, label: "Perfil", icon: User, exact: false },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur safe-bottom"
    >
      <ul className="mx-auto flex max-w-[1200px] items-stretch justify-around px-2">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={active ? "text-primary" : "text-text-muted"}
                  strokeWidth={active ? 2.25 : 1.75}
                  size={22}
                  aria-hidden
                />
                <span className={active ? "text-primary" : "text-text-secondary"}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
