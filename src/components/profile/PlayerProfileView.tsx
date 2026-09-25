"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Axe,
  Calendar,
  Check,
  Clock,
  CloudLightning,
  Crown,
  Gamepad2,
  Gavel,
  Medal,
  Pencil,
  Share2,
  Skull,
  Sparkles,
  Swords,
  Trophy,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SlidingTabs } from "@/components/ui/SlidingTabs";
import { cn, mcBody } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { playerPunishments } from "@/lib/data";
import type { ActivityItem, PlayerProfileData } from "@/lib/mock-profile";

export type { PlayerProfileData };

const MODE_ICONS: Record<string, LucideIcon> = {
  duels: Swords,
  minigames: Axe,
  uhc: Skull,
  elytrabox: CloudLightning,
  skyblock: Sparkles,
};

const ACTIVITY_ICONS: Record<ActivityItem["type"], LucideIcon> = {
  win: Trophy,
  rank: Crown,
  milestone: Sparkles,
  join: UserPlus,
};

const PUNISHMENT_STYLE: Record<string, string> = {
  Ban: "text-danger border-danger/30 bg-danger/10",
  Mute: "text-warning border-warning/30 bg-warning/10",
  Kick: "text-muted border-border bg-surface-2",
  Warn: "text-primary border-primary/30 bg-primary/10",
};

const fmt = (n: number) => n.toLocaleString("en-US");
const winRate = (w: number, l: number) => Math.round((w / Math.max(1, w + l)) * 100);

type Tab = "overview" | "stats" | "punishments";

export function PlayerProfileView({
  data,
  isOwn = false,
}: {
  data: PlayerProfileData;
  isOwn?: boolean;
}) {
  const { user } = useAuth();
  const isStaffViewer = user?.role === "admin";
  const ownProfile = isOwn || user?.username.toLowerCase() === data.username.toLowerCase();
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);
  const punishments = playerPunishments(data.username);
  const { totals } = data;
  const kd = (totals.kills / Math.max(1, totals.deaths)).toFixed(2);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "stats", label: "Game Stats" },
    ...(isStaffViewer
      ? [{ id: "punishments" as const, label: `Punishments (${punishments.length})` }]
      : []),
  ];
  const activeTab = tab === "punishments" && !isStaffViewer ? "overview" : tab;

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  }

  const highlights = [
    { icon: Trophy, label: "Total Wins", value: fmt(totals.wins), sub: `${data.modes.length} game modes` },
    { icon: Swords, label: "K/D Ratio", value: kd, sub: `${fmt(totals.kills)} kills · ${fmt(totals.deaths)} deaths` },
    { icon: Sparkles, label: "Stars", value: fmt(totals.stars), sub: "Lifetime earned" },
    { icon: Clock, label: "Playtime", value: `${fmt(totals.playtimeHours)}h`, sub: `≈ ${Math.round(totals.playtimeHours / 24)} days` },
  ];

  return (
    <div className="pb-20">
      <div className="relative h-52 overflow-hidden sm:h-64">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[4px]"
          style={{ backgroundImage: "url(/cover.jpg)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, rgba(3,21,36,0.88) 0%, rgba(6,58,99,0.6) 55%, ${data.rankColor}88 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <Container className="relative">
        <div className="-mt-28 flex flex-col items-center gap-4 sm:-mt-36 sm:flex-row sm:items-end sm:gap-8">
          <div className="relative shrink-0">
            <span className="absolute inset-x-3 bottom-1 h-5 rounded-full bg-black/25 blur-md" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mcBody(data.username, 120)}
              alt={data.username}
              className="relative h-56 animate-fade-up drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] sm:h-72"
            />
          </div>

          <div className="flex-1 animate-fade-up pb-4 text-center [animation-delay:80ms] sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{data.username}</h1>
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: data.rankColor }}
              >
                {data.rank}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted sm:justify-start">
              {data.online ? (
                <span className="flex items-center gap-2 font-semibold text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Online now
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted/50" />
                  Last seen {data.lastSeen}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Joined {data.joined}
              </span>
              <span className="flex items-center gap-1.5">
                <Gamepad2 className="h-4 w-4" /> Plays mostly {data.favoriteMode}
              </span>
            </div>
          </div>

          <div className="flex animate-fade-up gap-2 pb-4 [animation-delay:160ms]">
            <Button variant="outline" shape="md" onClick={share}>
              {copied ? <Check className="h-4 w-4 text-success" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Link copied" : "Share"}
            </Button>
            {ownProfile && (
              <Button shape="md">
                <Pencil className="h-4 w-4" /> Edit profile
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              style={{ animationDelay: `${200 + i * 70}ms` }}
              className="group animate-fade-up rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {h.label}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white">
                  <h.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold tabular-nums">{h.value}</p>
              <p className="mt-1 truncate text-xs text-muted">{h.sub}</p>
            </div>
          ))}
        </div>

        <SlidingTabs
          variant="underline"
          className="mt-10"
          items={tabs}
          value={activeTab}
          onChange={setTab}
        />

        <div key={activeTab} className="mt-8 animate-fade-up">
          {activeTab === "overview" && <Overview data={data} />}
          {activeTab === "stats" && <GameStats data={data} />}
          {activeTab === "punishments" && (
            <Punishments username={data.username} punishments={punishments} />
          )}
        </div>
      </Container>
    </div>
  );
}

function Overview({ data }: { data: PlayerProfileData }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Win rate by mode</h2>
          <span className="text-xs text-muted">wins / losses</span>
        </div>
        <div className="mt-6 flex flex-col gap-5">
          {data.modes.map((m, i) => {
            const Icon = MODE_ICONS[m.id] ?? Swords;
            const rate = winRate(m.wins, m.losses);
            return (
              <div key={m.id} className="group">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold">{m.name}</span>
                  <span className="text-xs tabular-nums text-muted">
                    {fmt(m.wins)} / {fmt(m.losses)}
                  </span>
                  <span className="w-11 text-right font-display text-sm font-bold tabular-nums">
                    {rate}%
                  </span>
                </div>
                <div className="mt-2 ml-11 h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    style={{ width: `${rate}%`, animationDelay: `${150 + i * 90}ms` }}
                    className="h-full animate-grow-x rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Leaderboard ranks</h2>
            <Link href="/leaderboards" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {data.rankings.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
              >
                <Medal
                  className={cn(
                    "h-5 w-5",
                    r.position <= 10 ? "text-warning" : r.position <= 50 ? "text-primary" : "text-muted",
                  )}
                />
                <span className="flex-1 text-sm font-medium">{r.label}</span>
                <span className="font-display text-sm font-bold tabular-nums">#{r.position}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-bold">Recent activity</h2>
          <ol className="relative mt-5 flex flex-col gap-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-border">
            {data.activity.map((a, i) => {
              const Icon = ACTIVITY_ICONS[a.type];
              return (
                <li
                  key={a.text}
                  style={{ animationDelay: `${150 + i * 80}ms` }}
                  className="relative flex animate-fade-up items-start gap-3"
                >
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-foreground/90">{a.text}</p>
                    <p className="text-xs text-muted">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function GameStats({ data }: { data: PlayerProfileData }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data.modes.map((m, i) => {
        const Icon = MODE_ICONS[m.id] ?? Swords;
        const rate = winRate(m.wins, m.losses);
        const stats = [
          { label: "Wins", value: fmt(m.wins) },
          { label: "Losses", value: fmt(m.losses) },
          { label: "Kills", value: fmt(m.kills) },
          { label: "Win rate", value: `${rate}%` },
        ];
        return (
          <div
            key={m.id}
            style={{ animationDelay: `${i * 70}ms` }}
            className="group animate-fade-up rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-bold">{m.name}</h3>
              {m.name === data.favoriteMode && (
                <span className="ml-auto rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
                  Favorite
                </span>
              )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-background px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {s.label}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-bold tabular-nums">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Punishments({
  username,
  punishments,
}: {
  username: string;
  punishments: ReturnType<typeof playerPunishments>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2.5">
        <Gavel className="h-4 w-4 text-muted" />
        <h2 className="font-display text-lg font-bold">Punishment history</h2>
        <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-danger">
          Staff only
        </span>
      </div>
      {punishments.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
          <Check className="h-6 w-6 text-success" />
          <p className="text-sm font-semibold">Clean record</p>
          <p className="text-xs text-muted">No punishments on record for {username}.</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-2">
          {punishments.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
            >
              <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${PUNISHMENT_STYLE[p.type]}`}>
                {p.type}
              </span>
              <span className="flex-1 text-sm font-medium">{p.reason}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  p.active ? "bg-danger/10 text-danger" : "bg-surface-2 text-muted",
                )}
              >
                {p.active ? "Active" : "Expired"}
              </span>
              <span className="text-xs text-muted">{p.duration}</span>
              <span className="text-xs text-muted">by {p.staff}</span>
              <span className="text-xs text-muted">{p.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
