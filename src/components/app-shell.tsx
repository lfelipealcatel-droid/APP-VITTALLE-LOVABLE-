import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "./bottom-nav";
import { MiniAudioPlayer } from "./mini-audio-player";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  back?: string | true;
  right?: ReactNode;
  variant?: "default" | "editorial" | "transparent" | "minimal";
  hideNav?: boolean;
  hideMiniPlayer?: boolean;
  className?: string;
}

export function AppShell({
  children,
  title,
  subtitle,
  back,
  right,
  variant = "default",
  hideNav,
  hideMiniPlayer,
  className,
}: AppShellProps) {
  const backTo = back === true ? undefined : back;
  const showBack = Boolean(back);
  const navigate = useNavigate();

  const onBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    if (backTo) navigate({ to: backTo });
  };

  return (
    <div className="min-h-screen bg-background">
      {title || showBack || right ? (
        <header
          className={cn(
            "sticky top-0 z-30 border-b",
            variant === "transparent"
              ? "border-transparent bg-transparent"
              : "border-border bg-background/90 backdrop-blur",
          )}
        >
          <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-4 md:px-8">
            {showBack ? (
              <button
                type="button"
                aria-label="Voltar"
                onClick={onBack}
                className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2"
              >
                <ChevronLeft size={22} aria-hidden />
              </button>
            ) : null}
            <div className="min-w-0 flex-1">
              {title ? (
                <h1
                  className={cn(
                    "truncate",
                    variant === "editorial"
                      ? "font-editorial text-2xl font-medium"
                      : "text-lg font-semibold",
                  )}
                >
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="truncate text-sm text-text-secondary">{subtitle}</p>
              ) : null}
            </div>
            {right}
          </div>
        </header>
      ) : null}

      <main
        className={cn(
          "mx-auto max-w-[1200px] px-5 pb-32 pt-4 md:px-8",
          className,
        )}
      >
        {children}
      </main>

      {!hideMiniPlayer && <MiniAudioPlayer />}
      {!hideNav && <BottomNav />}
    </div>
  );
}
