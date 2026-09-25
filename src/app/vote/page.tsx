import { ArrowUpRight, Gift, Info, ThumbsUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { VOTE_SITES } from "@/lib/data";

const VOTE_PARTY_CURRENT = 340;
const VOTE_PARTY_GOAL = 500;
const progress = Math.round((VOTE_PARTY_CURRENT / VOTE_PARTY_GOAL) * 100);

export default function VotePage() {
  return (
    <>
      <PageHero
        icon={ThumbsUp}
        title="Vote"
        description="Help us grow and earn rewards every 24 hours. Every vote counts."
      />

      <section className="py-10">
        <Container className="flex flex-col gap-8">
          <div className="rounded-2xl border border-primary/30 bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 font-display text-lg font-bold">
                <Gift className="h-5 w-5 text-primary" /> Vote Party
              </div>
              <span className="text-sm text-muted">
                {VOTE_PARTY_CURRENT} / {VOTE_PARTY_GOAL} votes
              </span>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted">
              When we hit {VOTE_PARTY_GOAL} votes, everyone on the server gets 2x Stars for the
              next 2 hours plus a free Vote Party key.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VOTE_SITES.map((site, i) => (
              <div
                key={site.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 font-display font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-display font-bold">{site.name}</p>
                  <p className="text-sm text-muted">{site.reward}</p>
                </div>
                <LinkButton href={site.url} external variant="outline" size="sm">
                  Vote <ArrowUpRight className="h-3.5 w-3.5" />
                </LinkButton>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface/60 p-5 text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              Each voting site has a 24 hour cooldown. Rewards are delivered to your Minecraft
              account automatically when you log in — make sure you&apos;re logged in with the
              same username as in-game.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
