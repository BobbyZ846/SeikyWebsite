import {
  Axe,
  Boxes,
  CloudLightning,
  Landmark,
  PartyPopper,
  Skull,
  Sparkles,
  Swords,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GAME_MODES } from "@/lib/data";

const ICONS: Record<string, typeof Swords> = {
  smp: Landmark,
  survival: Boxes,
  skyblock: Sparkles,
  elytrabox: CloudLightning,
  uhc: Skull,
  duels: Swords,
  minigames: Axe,
  events: PartyPopper,
};

export function GameModesSection() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Game Modes</h2>
          <p className="mt-2 max-w-md text-muted">
            Everything you can play on the Seiky network, all included with one free account.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {GAME_MODES.map((mode, i) => {
            const Icon = ICONS[mode.id] ?? Swords;
            return (
              <Reveal key={mode.id} delay={(i % 2) * 90 + Math.floor(i / 2) * 60}>
                <div className="group relative flex h-full min-h-[200px] overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                  <Icon
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-primary/[0.06] transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-primary/[0.1]"
                  />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold transition-colors group-hover:text-primary">
                          {mode.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                          {mode.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                      {mode.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {mode.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-primary/30"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
