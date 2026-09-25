import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: "url(/cover.jpg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,21,36,0.9)_0%,rgba(6,58,99,0.75)_55%,rgba(0,145,214,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <Container className="relative flex flex-col items-center py-14 text-center sm:py-20">
        {Icon && (
          <span className="flex h-12 w-12 animate-fade-up items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </span>
        )}
        <h1 className="mt-5 animate-fade-up font-display text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] [animation-delay:60ms] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl animate-fade-up text-white/80 [animation-delay:120ms]">
            {description}
          </p>
        )}
        {children && <div className="mt-7 animate-fade-up [animation-delay:180ms]">{children}</div>}
      </Container>
    </section>
  );
}
