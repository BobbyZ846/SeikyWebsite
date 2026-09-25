import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Seiky" className="h-9 w-9" />
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        SEIKY
      </span>
    </Link>
  );
}
