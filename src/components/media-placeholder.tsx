import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ActivityType } from "@/lib/mock-data";
import { Apple, Book, Download, Dumbbell, Headphones, ListChecks, Ruler, Sparkles, Video } from "lucide-react";

const ICONS: Record<ActivityType, typeof Video> = {
  video: Video,
  audio: Headphones,
  reading: Book,
  exercise: Dumbbell,
  habit: Sparkles,
  checklist: ListChecks,
  download: Download,
  food: Apple,
  measurement: Ruler,
};

const LABELS: Record<ActivityType, string> = {
  video: "Vídeo",
  audio: "Áudio",
  reading: "Leitura",
  exercise: "Movimento",
  habit: "Hábito",
  checklist: "Checklist",
  download: "Material",
  food: "Alimentação",
  measurement: "Medição",
};

interface MediaPlaceholderProps {
  type: ActivityType;
  cover?: "warm" | "green" | "stone";
  aspect?: "video" | "square" | "wide" | "portrait";
  className?: string;
  children?: ReactNode;
  imageUrl?: string;
  label?: string;
}

export function MediaPlaceholder({ type, cover = "warm", aspect = "video", className, children, imageUrl, label }: MediaPlaceholderProps) {
  const Icon = ICONS[type];
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[16/7]" : aspect === "portrait" ? "aspect-[4/5]" : "aspect-video";
  const bg = cover === "green" ? "bg-soft-green" : cover === "stone" ? "bg-surface-2" : "bg-warm";
  return (
    <div
      className={cn(
        aspectClass,
        bg,
        "relative w-full overflow-hidden rounded-2xl border border-border/60",
        className,
      )}
      aria-hidden={!children}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-secondary">
          <Icon size={28} strokeWidth={1.5} aria-hidden />
          <span className="text-[10px] uppercase tracking-wide opacity-80">{label ?? LABELS[type]}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function typeLabel(t: ActivityType) { return LABELS[t]; }
export function typeIcon(t: ActivityType) { return ICONS[t]; }
