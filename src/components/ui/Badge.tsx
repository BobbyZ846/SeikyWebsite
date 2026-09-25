import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold",
        className,
      )}
      style={color ? { color, borderColor: `${color}40` } : undefined}
    >
      {children}
    </span>
  );
}

export function OnlineBadge({ online = true }: { online?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        online
          ? "border-success/30 bg-success/10 text-success"
          : "border-danger/30 bg-danger/10 text-danger",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          online ? "bg-success animate-pulse-dot" : "bg-danger",
        )}
      />
      {online ? "Online" : "Offline"}
    </span>
  );
}
