import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Positions (percent of the box) and sizes for up to six stars; bigger packs show more.
const LAYOUT = [
  { left: 50, top: 50, size: 44 },
  { left: 24, top: 36, size: 26 },
  { left: 76, top: 62, size: 28 },
  { left: 72, top: 24, size: 20 },
  { left: 28, top: 72, size: 22 },
  { left: 50, top: 14, size: 16 },
];

export function StarCluster({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn("relative h-32 w-full", className)}>
      <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/30 blur-2xl transition-all duration-500 group-hover:h-32 group-hover:w-32 group-hover:bg-amber-400/45" />
      {LAYOUT.slice(0, count).map((s, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
        >
          <Star
            className="animate-float-star fill-amber-400 text-amber-500 drop-shadow-[0_4px_10px_rgba(245,158,11,0.45)]"
            style={{ width: s.size, height: s.size, animationDelay: `${i * 0.35}s` }}
          />
        </span>
      ))}
    </div>
  );
}
