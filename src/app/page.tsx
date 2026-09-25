import { Hero } from "@/components/home/Hero";
import { GameModesSection } from "@/components/home/GameModesSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CommunitySection } from "@/components/home/CommunitySection";

export default function Home() {
  return (
    <>
      <Hero />
      <GameModesSection />
      <NewsSection />
      <CommunitySection />
    </>
  );
}
