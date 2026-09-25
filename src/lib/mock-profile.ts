import { findStaffMember } from "./data";

// Deterministic mock data per username until profiles come from the master API.

export type ModeStats = { id: string; name: string; wins: number; losses: number; kills: number };

export type ActivityItem = {
  type: "win" | "rank" | "milestone" | "join";
  text: string;
  time: string;
};

export type PlayerProfileData = {
  username: string;
  rank: string;
  rankColor: string;
  joined: string;
  lastSeen: string;
  online: boolean;
  favoriteMode: string;
  totals: { wins: number; kills: number; deaths: number; stars: number; playtimeHours: number };
  modes: ModeStats[];
  rankings: { label: string; position: number }[];
  activity: ActivityItem[];
};

function seedFrom(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const MODES = [
  { id: "duels", name: "Duels" },
  { id: "minigames", name: "MiniGames" },
  { id: "uhc", name: "UHC" },
  { id: "elytrabox", name: "ElytraBox" },
  { id: "skyblock", name: "SkyBlock" },
];

export function buildProfile(
  username: string,
  overrides: Partial<Pick<PlayerProfileData, "rank" | "rankColor" | "online" | "lastSeen">> = {},
): PlayerProfileData {
  const rand = rng(seedFrom(username.toLowerCase()));
  const int = (min: number, max: number) => Math.floor(min + rand() * (max - min));
  const staff = findStaffMember(username);

  const modes = MODES.map((m) => {
    const wins = int(20, 900);
    return { ...m, wins, losses: int(Math.floor(wins * 0.4), wins * 2), kills: int(wins, wins * 6) };
  });
  const favorite = modes.reduce((a, b) => (b.wins > a.wins ? b : a));

  const wins = modes.reduce((s, m) => s + m.wins, 0);
  const kills = modes.reduce((s, m) => s + m.kills, 0);
  const deaths = modes.reduce((s, m) => s + m.losses, 0) + int(100, 900);
  const joined = staff?.member.joined ?? ["Jan 2024", "Mar 2024", "Jun 2024", "Nov 2024"][int(0, 4)];
  const ago = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"} ago`;
  const stars = int(8_000, 480_000);
  const starsMilestone = Math.max(5_000, Math.floor(stars / 10_000) * 10_000);

  return {
    username: staff?.member.name ?? username,
    rank: staff?.rank.label ?? "Member",
    rankColor: staff?.rank.color ?? "#5b6472",
    joined,
    online: rand() > 0.5,
    lastSeen: ago(int(1, 23), "hour"),
    favoriteMode: favorite.name,
    totals: { wins, kills, deaths, stars, playtimeHours: int(40, 3200) },
    modes,
    rankings: [
      { label: "Stars", position: int(1, 250) },
      { label: "Playtime", position: int(1, 250) },
      { label: "Duels · Sword", position: int(1, 250) },
    ],
    activity: [
      { type: "win", text: `Won a ${favorite.name} match`, time: `${int(1, 12)}h ago` },
      staff
        ? { type: "rank", text: `Promoted to ${staff.rank.label}`, time: ago(int(2, 20), "day") }
        : { type: "win", text: `Won 3 ${modes[1].name} games in a row`, time: ago(int(1, 5), "day") },
      {
        type: "milestone",
        text: `Reached ${starsMilestone.toLocaleString("en-US")} Stars`,
        time: ago(int(1, 4), "week"),
      },
      { type: "join", text: "Joined the Seiky network", time: joined },
    ],
    ...overrides,
  };
}
