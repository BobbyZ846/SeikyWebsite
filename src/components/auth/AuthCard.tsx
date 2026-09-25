import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-16">
      <Link
        href="/"
        className="mb-8 flex items-center gap-1.5 self-start text-sm text-muted transition-colors hover:text-foreground sm:self-center"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Seiky" className="mb-5 h-14 w-14" />
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
        </div>

        <div className="mt-7">{children}</div>

        <div className="mt-7 border-t border-border pt-5 text-center text-sm text-muted">
          {footer}
        </div>
      </div>
    </div>
  );
}
