import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-10 text-center", className)}>
      {icon ? <div className="text-primary" aria-hidden>{icon}</div> : null}
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="text-sm text-text-secondary">{description}</p> : null}
      {action}
    </div>
  );
}
