import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", align === "center" && "items-center", className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {children}
      </span>
      <span className="h-[3px] w-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
      {children}
    </span>
  );
}
