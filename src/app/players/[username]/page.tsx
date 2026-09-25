import { PlayerProfileView } from "@/components/profile/PlayerProfileView";
import { buildProfile } from "@/lib/mock-profile";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <PlayerProfileView data={buildProfile(decodeURIComponent(username))} />;
}
