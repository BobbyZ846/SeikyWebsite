import { Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LeaderboardTabs } from "@/components/leaderboards/LeaderboardTabs";

export default function LeaderboardsPage() {
  return (
    <>
      <PageHero
        icon={Trophy}
        title="Leaderboards"
        description="The best players on the Seiky network, ranked across every game mode."
      />
      <section className="py-10">
        <Container>
          <LeaderboardTabs />
        </Container>
      </section>
    </>
  );
}
