"use client";

import { UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PlayerProfileView } from "@/components/profile/PlayerProfileView";
import { useAuth } from "@/lib/auth-context";
import { buildProfile } from "@/lib/mock-profile";

export default function ProfilePage() {
  const { user, ready } = useAuth();

  if (!ready) return null;

  if (!user) {
    return (
      <Container className="flex animate-fade-up flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserRound className="h-7 w-7" />
        </span>
        <h1 className="font-display text-2xl font-bold">Your profile</h1>
        <p className="max-w-sm text-muted">
          Log in to see your stats, rankings and activity across the Seiky network.
        </p>
        <LinkButton href="/login">Log In</LinkButton>
      </Container>
    );
  }

  return (
    <PlayerProfileView
      isOwn
      data={buildProfile(user.username, {
        rank: user.rank,
        rankColor: user.rankColor,
        online: true,
      })}
    />
  );
}
