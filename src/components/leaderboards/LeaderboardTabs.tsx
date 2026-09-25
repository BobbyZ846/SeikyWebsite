"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Crosshair,
  FlaskConical,
  Gem,
  Globe,
  Hammer,
  Skull,
  Sparkles,
  Swords,
  TrainTrack,
  TrendingUp,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn, mcHead } from "@/lib/utils";
import { LEADERBOARD_GROUPS } from "@/lib/data";
import { SlidingTabs } from "@/components/ui/SlidingTabs";

const GROUP_ICONS: Record<string, LucideIcon> = { global: Globe, duels: Swords, uhc: Skull };
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  stars: Sparkles,
  playtime: Clock,
  sword: Swords,
  crystal: Gem,
  mace: Hammer,
  diamondpot: FlaskConical,
  cart: TrainTrack,
  elo: TrendingUp,
  "uhc-wins": Trophy,
  "uhc-kills": Crosshair,
  "uhc-deaths": Skull,
};

const RANK_STYLE = [
  "bg-primary text-primary-foreground shadow-md shadow-primary/30",
  "bg-[#c9ccd1] text-black",
  "bg-[#d98a4a] text-black",
];

export function LeaderboardTabs() {
  const [groupId, setGroupId] = useState(LEADERBOARD_GROUPS[0].id);
  const group = LEADERBOARD_GROUPS.find((g) => g.id === groupId) ?? LEADERBOARD_GROUPS[0];

  const [categoryId, setCategoryId] = useState(group.categories[0].id);
  const category = group.categories.find((c) => c.id === categoryId) ?? group.categories[0];
  const CategoryIcon = CATEGORY_ICONS[category.id] ?? Trophy;
  const lastValue = category.entries[category.entries.length - 1]?.value ?? "0";
  const suffix = lastValue.replace(/[\d,]/g, "");
  const yourValue = `${Math.round(Number(lastValue.replace(/[^\d]/g, "")) * 0.62).toLocaleString("en-US")}${suffix}`;

  function selectGroup(id: string) {
    setGroupId(id);
    const next = LEADERBOARD_GROUPS.find((g) => g.id === id);
    if (next) setCategoryId(next.categories[0].id);
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <SlidingTabs
          items={LEADERBOARD_GROUPS.map((g) => ({
            id: g.id,
            label: g.label,
            icon: GROUP_ICONS[g.id],
          }))}
          value={groupId}
          onChange={selectGroup}
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Top 10 &middot; updated every 5 minutes
        </p>
      </div>

      <div className="scrollbar-none mt-6 overflow-x-auto">
        <SlidingTabs
          key={groupId}
          variant="underline"
          className="min-w-max animate-fade-up"
          items={group.categories.map((c) => ({
            id: c.id,
            label: c.label,
            icon: CATEGORY_ICONS[c.id],
          }))}
          value={categoryId}
          onChange={setCategoryId}
        />
      </div>

      <div key={`${groupId}-${categoryId}`} className="mt-6 overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
          <span className="flex h-9 w-9 animate-fade-up items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CategoryIcon className="h-4 w-4" />
          </span>
          <div className="animate-fade-up [animation-delay:40ms]">
            <p className="font-display font-bold">
              {group.label} &middot; {category.label}
            </p>
            <p className="text-xs text-muted">Ranked by {category.unit}</p>
          </div>
        </div>

        {category.entries.map((entry, i) => (
          <Link
            key={entry.rank}
            href={`/players/${encodeURIComponent(entry.name)}`}
            style={{ animationDelay: `${60 + i * 35}ms` }}
            className="group flex animate-fade-up items-center gap-4 border-b border-border/60 px-5 py-3.5 transition-colors last:border-0 hover:bg-surface/70"
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 group-hover:scale-110",
                RANK_STYLE[entry.rank - 1] ?? "bg-surface-2 text-muted",
              )}
            >
              {entry.rank}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mcHead(entry.name, 32)}
              alt={entry.name}
              className="h-8 w-8 rounded-md transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="flex-1 text-sm font-semibold text-foreground/90 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary">
              {entry.name}
            </span>
            <span className="font-display text-sm font-bold tabular-nums text-foreground/80">
              {entry.value}
            </span>
          </Link>
        ))}

        <Link
          href="/players/Marko"
          style={{ animationDelay: `${60 + category.entries.length * 35}ms` }}
          className="flex animate-fade-up items-center gap-4 border-t border-primary/30 bg-primary/5 px-5 py-3.5 transition-colors hover:bg-primary/10"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-primary">
            42
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mcHead("Marko", 32)} alt="You" className="h-8 w-8 rounded-md" />
          <span className="flex-1 text-sm font-semibold text-primary">You (Marko)</span>
          <span className="font-display text-sm font-bold tabular-nums text-primary">
            {yourValue}
          </span>
        </Link>
      </div>
    </div>
  );
}
