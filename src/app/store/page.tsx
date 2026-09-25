import { ShoppingCart, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StarCluster } from "@/components/store/StarCluster";
import { STAR_PACKS, STORE_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function StorePage() {
  return (
    <>
      <PageHero
        icon={Star}
        title="Seiky Store"
        description="Buy Stars and spend them on cosmetics in any game mode."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {["Instant delivery", "Secure checkout by Tebex", "Supports the server"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STAR_PACKS.map((pack, i) => {
              const bonus = Math.round((pack.base * pack.bonusPercent) / 100);
              const total = pack.base + bonus;
              const popular = pack.highlight === "popular";
              const value = pack.highlight === "value";
              return (
                <Reveal key={pack.id} delay={(i % 3) * 90 + Math.floor(i / 3) * 70}>
                  <div
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                      popular && "border-primary/60 shadow-xl shadow-primary/10",
                      value && "border-amber-400/70 shadow-xl shadow-amber-500/10",
                      !popular && !value && "border-border",
                    )}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

                    {(popular || value) && (
                      <span
                        className={cn(
                          "absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm",
                          popular ? "bg-primary" : "bg-amber-500",
                        )}
                      >
                        {popular ? "Most popular" : "Best value"}
                      </span>
                    )}

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {pack.name}
                    </p>

                    <StarCluster count={i + 1} className="my-4" />

                    <div className="text-center">
                      <p className="font-display text-4xl font-bold tabular-nums">{fmt(total)}</p>
                      <p className="mt-1 text-sm font-semibold text-muted">Stars</p>
                      <div className="mt-3 flex h-6 items-center justify-center">
                        {bonus > 0 && (
                          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                            +{pack.bonusPercent}% bonus &middot; {fmt(bonus)} free
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                      <p className="font-display text-2xl font-bold">{pack.price}</p>
                      <a
                        href={STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "relative inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95",
                          popular
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : value
                              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                              : "border border-border bg-background text-foreground hover:border-primary/50 hover:text-primary",
                        )}
                      >
                        <ShoppingCart className="h-4 w-4" /> Buy
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
