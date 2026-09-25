export const SERVER_IP = "play.seiky.net";
export const DISCORD_URL = "https://discord.gg/seiky";
export const SERVER_NAME = "Seiky";

export const NAV_LINKS = [
  { href: "/news", label: "News" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/staff", label: "Staff" },
  { href: "/vote", label: "Vote" },
  { href: "/support", label: "Support" },
  { href: "/store", label: "Store" },
] as const;

// Checkout lives on the Tebex store; the site only showcases the packs.
export const STORE_URL = "https://store.seiky.net";

export type StarPack = {
  id: string;
  name: string;
  base: number;
  bonusPercent: number;
  price: string;
  highlight?: "popular" | "value";
};

export const STAR_PACKS: StarPack[] = [
  { id: "handful", name: "Handful", base: 500, bonusPercent: 0, price: "$0.99" },
  { id: "pouch", name: "Pouch", base: 2_500, bonusPercent: 5, price: "$4.99" },
  { id: "chest", name: "Chest", base: 5_000, bonusPercent: 10, price: "$9.99", highlight: "popular" },
  { id: "vault", name: "Vault", base: 10_000, bonusPercent: 20, price: "$19.99" },
  { id: "treasury", name: "Treasury", base: 25_000, bonusPercent: 30, price: "$49.99", highlight: "value" },
  { id: "hoard", name: "Hoard", base: 50_000, bonusPercent: 40, price: "$99.99" },
];

export type StaffMember = { name: string; joined?: string };

export type StaffRank = {
  id: string;
  label: string;
  plural: string;
  color: string;
  members: StaffMember[];
};

const members = (...names: string[]): StaffMember[] => names.map((name) => ({ name }));

export const STAFF: StaffRank[] = [
  {
    id: "owner",
    label: "Owner",
    plural: "Owners",
    color: "#e11d48",
    members: members("Sheeqz", "crnja", "drzey", "KruskaOfficial"),
  },
  {
    id: "developer",
    label: "Developer",
    plural: "Developers",
    color: "#7c3aed",
    members: members("BobbyZ846"),
  },
  {
    id: "manager",
    label: "Manager",
    plural: "Managers",
    color: "#ea580c",
    members: members("xRazz_", "Filye", "iDuje_"),
  },
  {
    id: "sradmin",
    label: "Sr. Admin",
    plural: "Sr. Admins",
    color: "#0369a1",
    members: members("jedwish", "Aiez", "tihenzy"),
  },
  {
    id: "admin",
    label: "Admin",
    plural: "Admins",
    color: "#0091d6",
    members: members("Dzony01", "Andrija521"),
  },
  {
    id: "srmod",
    label: "Sr. Mod",
    plural: "Sr. Mods",
    color: "#0f766e",
    members: members("vuletiic", "StolePH"),
  },
  {
    id: "mod",
    label: "Mod",
    plural: "Mods",
    color: "#0d9488",
    members: members("kxqq", "LuckyFella"),
  },
  {
    id: "helper",
    label: "Helper",
    plural: "Helpers",
    color: "#16a34a",
    members: members("apofisko"),
  },
];

export function findStaffMember(username: string) {
  const lower = username.toLowerCase();
  for (const rank of STAFF) {
    const member = rank.members.find((m) => m.name.toLowerCase() === lower);
    if (member) return { member, rank };
  }
  return null;
}

export type GameModeInfo = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export const GAME_MODES: GameModeInfo[] = [
  {
    id: "smp",
    name: "SMP",
    tagline: "Build together",
    description: "Long-term survival on one shared world with a player economy and land claims.",
    features: ["Land claims", "Player shops", "Seasonal resets"],
  },
  {
    id: "survival",
    name: "Survival",
    tagline: "Vanilla, refined",
    description: "Classic survival with small quality-of-life plugins that never get in the way.",
    features: ["Homes & warps", "Grief protection", "Vanilla-friendly"],
  },
  {
    id: "skyblock",
    name: "SkyBlock",
    tagline: "Start from nothing",
    description: "Begin on a tiny island in the void and grow it into a sprawling base.",
    features: ["Island upgrades", "Co-op islands", "Island leaderboard"],
  },
  {
    id: "elytrabox",
    name: "ElytraBox",
    tagline: "Take to the skies",
    description: "Fast-paced elytra PvP inside a compact box arena — pure aim and movement.",
    features: ["Elytra combat", "Rockets & maces", "Quick rounds"],
  },
  {
    id: "uhc",
    name: "UHC",
    tagline: "No second chances",
    description: "Ultra Hardcore — no natural regeneration, last player or team standing wins.",
    features: ["Solo & teams", "Custom scenarios", "Weekly games"],
  },
  {
    id: "duels",
    name: "Duels",
    tagline: "Prove your skill",
    description: "Ranked and casual 1v1 or team duels across a growing list of kits.",
    features: ["Sword & Crystal kits", "Ranked ELO", "Party duels"],
  },
  {
    id: "minigames",
    name: "MiniGames",
    tagline: "Quick matches",
    description: "SkyWars and Survival Games, back to back in one queue.",
    features: ["SkyWars", "Survival Games", "Kits & cosmetics"],
  },
  {
    id: "events",
    name: "Events",
    tagline: "Hosted by the team",
    description: "Custom events built and hosted by the Seiky staff team, with exclusive rewards.",
    features: ["Custom maps", "Live hosts", "Exclusive rewards"],
  },
];

export type LeaderboardCategory = {
  id: string;
  label: string;
  unit: string;
  entries: { rank: number; name: string; value: string }[];
};

export type LeaderboardGroup = {
  id: string;
  label: string;
  categories: LeaderboardCategory[];
};

// Mock boards until real numbers come from the master API.
const PLAYER_POOL = [
  "Technoblade",
  "Dream",
  "Tommyinnit",
  "Purpled",
  "Karl",
  "Ranboo",
  "Wilbur",
  "Grian",
  "Fundy",
  "Quackity",
  "Mumbo",
  "Notch",
  "Tubbo",
  "Sapnap",
  "GeorgeNotFound",
  "Philza",
];

function mockBoard(
  id: string,
  label: string,
  unit: string,
  seed: number,
  [min, max]: [number, number],
  suffix = "",
): LeaderboardCategory {
  let s = seed;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const pool = [...PLAYER_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const names = pool.slice(0, 10);
  const values = names.map(() => Math.round(min + rand() * (max - min))).sort((a, b) => b - a);
  return {
    id,
    label,
    unit,
    entries: names.map((name, i) => ({
      rank: i + 1,
      name,
      value: `${values[i].toLocaleString("en-US")}${suffix}`,
    })),
  };
}

export const LEADERBOARD_GROUPS: LeaderboardGroup[] = [
  {
    id: "global",
    label: "Global",
    categories: [
      mockBoard("stars", "Stars", "stars", 11, [190_000, 490_000]),
      mockBoard("playtime", "Playtime", "hours", 12, [1_600, 3_300], "h"),
    ],
  },
  {
    id: "duels",
    label: "Duels",
    categories: [
      mockBoard("sword", "Sword", "wins", 21, [900, 2_400]),
      mockBoard("crystal", "Crystal", "wins", 22, [550, 1_300]),
      mockBoard("mace", "Mace", "wins", 23, [400, 1_100]),
      mockBoard("diamondpot", "DiamondPot", "wins", 24, [650, 1_800]),
      mockBoard("cart", "Cart", "wins", 25, [300, 950]),
    ],
  },
  {
    id: "uhc",
    label: "UHC",
    categories: [
      mockBoard("elo", "ELO", "ELO rating", 31, [1_450, 2_380]),
      mockBoard("uhc-wins", "Wins", "wins", 32, [35, 210]),
      mockBoard("uhc-kills", "Kills", "kills", 33, [240, 1_650]),
      mockBoard("uhc-deaths", "Deaths", "deaths", 34, [120, 780]),
    ],
  },
];

export const VOTE_SITES = [
  { id: "mmp", name: "Minecraft-MP", reward: "1,000 Stars + 1x Key", url: "#" },
  { id: "msl", name: "Minecraft Server List", reward: "1,000 Stars", url: "#" },
  { id: "pmc", name: "Planet Minecraft", reward: "1,500 Stars + 1x Key", url: "#" },
  { id: "topg", name: "TopG", reward: "1,000 Stars", url: "#" },
  { id: "smc", name: "Server-Minecraft", reward: "1,000 Stars", url: "#" },
];

// Tags say where a post applies: the whole network, the store, or a specific server.
export const NEWS_TAGS = [
  "Global",
  "Store",
  "SMP",
  "Survival",
  "SkyBlock",
  "ElytraBox",
  "UHC",
  "Duels",
  "MiniGames",
  "Events",
] as const;
export type NewsTag = (typeof NEWS_TAGS)[number];

export const NEWS_TAG_COLOR: Record<NewsTag, string> = {
  Global: "#0091d6",
  Store: "#d97706",
  SMP: "#16a34a",
  Survival: "#0d9488",
  SkyBlock: "#0891b2",
  ElytraBox: "#7c3aed",
  UHC: "#e11d48",
  Duels: "#ea580c",
  MiniGames: "#4f46e5",
  Events: "#db2777",
};

export type NewsItem = {
  id: string;
  slug: string;
  date: string;
  tag: NewsTag;
  title: string;
  excerpt: string;
  // Blank-line separated blocks; "## " starts a heading, lines starting with "- " form a list.
  body: string;
  postToDiscord?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    id: "n6",
    slug: "autumn-sale-30-off-stars",
    date: "Sep 20, 2026",
    tag: "Store",
    title: "Autumn Sale: 30% off all Stars packs",
    excerpt:
      "For one week only, every Stars pack on the store is 30% off — and the bonus Stars on bigger packs still apply.",
    body: `For one week only, every Stars pack on the store is 30% off — and the bonus Stars on bigger packs still apply on top of the discount.

## What's included
- Every Stars pack, from Handful to Hoard
- The full bonus on bigger packs (up to +40%)
- Gifted packs — perfect for a friend's birthday

## When
The sale runs from September 20 until September 27 at midnight (CEST). Stars are delivered instantly as long as you're online.

Every purchase directly supports the server and pays for new content. Thank you for keeping Seiky running!`,
  },
  {
    id: "n1",
    slug: "season-3-survival-games-live",
    date: "Sep 12, 2026",
    tag: "MiniGames",
    title: "Season 3: Survival Games is live",
    excerpt:
      "A new map, new cosmetics and a refreshed reward system. Join the server now to claim the exclusive Season 3 tag.",
    body: `Season 3 of Survival Games is officially live! We've spent the last month rebuilding the mode from the ground up based on your feedback.

## What's new
- Dunes, a brand new desert map with hidden loot rooms
- 12 new kill effects and 6 new trails in the Stars shop
- Reworked chest loot so early fights are more balanced
- A seasonal leaderboard with rewards for the top 100

## Season rewards
Everyone who plays at least 10 games this season gets the exclusive Season 3 tag. The top 10 players at the end of the season also receive a permanent cosmetic that will never return.

Queue up with /play sg and good luck!`,
  },
  {
    id: "n7",
    slug: "uhc-season-2-scenarios",
    date: "Sep 8, 2026",
    tag: "UHC",
    title: "UHC Season 2 brings custom scenarios",
    excerpt:
      "Weekly UHC games now rotate through custom scenarios like Cutclean, Timebomb and Blood Diamonds.",
    body: `UHC Season 2 kicks off this weekend and every game will now use a rotating scenario to keep things fresh.

## Scenario pool
- Cutclean — ores and food drop already smelted and cooked
- Timebomb — loot drops in a chest that explodes after 30 seconds
- Blood Diamonds — mining diamonds costs you half a heart
- No Clean — 20 seconds of invincibility after a kill

Games run every Saturday and Sunday at 20:00 (CEST). Whitelist opens 15 minutes before the start in #uhc on Discord.`,
  },
  {
    id: "n2",
    slug: "skywars-balance-changes",
    date: "Sep 2, 2026",
    tag: "MiniGames",
    title: "SkyWars balance changes",
    excerpt: "We reworked the kit system and added 3 new islands. Here's everything that changed.",
    body: `We reworked the SkyWars kit system and added three new islands to the map rotation.

## Kit changes
- Archer: bow damage reduced slightly, now starts with 12 arrows instead of 16
- Knight: gains Protection I on the chestplate
- Builder: starts with 64 blocks instead of 48

## New islands
Floating Ruins, Frozen Peaks and Mushroom Grove are now part of the rotation. Let us know which one you like best on Discord!`,
  },
  {
    id: "n3",
    slug: "vote-party-rewards-increased",
    date: "Aug 20, 2026",
    tag: "Global",
    title: "Vote Party rewards increased",
    excerpt: "We lowered the Vote Party threshold from 500 to 350 votes and added new rewards to the pool.",
    body: `Vote Parties are now easier to trigger and more rewarding.

The threshold has been lowered from 500 to 350 votes, and when a party starts everyone online receives 2x Stars for two hours plus a Vote Party key.

## New rewards in the key pool
- Rare kill effects
- Stars bundles up to 5,000
- A small chance at an exclusive Vote Party chat tag

Vote every day on the Vote page to help the whole server reach the next party.`,
  },
  {
    id: "n4",
    slug: "weekend-community-events",
    date: "Aug 5, 2026",
    tag: "Events",
    title: "New Balkan community events every weekend",
    excerpt:
      "We're adding weekly community game nights and giveaways hosted live on Discord. First one kicks off this Saturday.",
    body: `Starting this Saturday, the staff team will host a community event every weekend.

Events include build battles, hide and seek on custom maps, parkour races and PvP tournaments. Every event has prizes, from Stars to exclusive cosmetics.

Event announcements go out in #events on Discord the day before, so turn on notifications for that channel.`,
  },
  {
    id: "n5",
    slug: "anti-cheat-overhaul",
    date: "Jul 22, 2026",
    tag: "Global",
    title: "Anti-cheat overhaul",
    excerpt:
      "We rolled out a major anti-cheat update to catch reach, aimbot and speed hacks faster across every server.",
    body: `We rolled out a major anti-cheat update across the entire network.

The new checks detect reach, aim assistance, speed and fly hacks much faster, and staff now get instant alerts with replay data.

If you see anyone suspicious, report them with /report or open a ticket on Discord with a clip.`,
  },
];

export function findNews(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}

export type SupportFaqCategory = {
  id: string;
  label: string;
  faqs: { q: string; a: string }[];
};

export const SUPPORT_FAQ_CATEGORIES: SupportFaqCategory[] = [
  {
    id: "account",
    label: "Account",
    faqs: [
      {
        q: "How can I register my account?",
        a: "To register an account, use the command /register your-email while logged into the server. If you are currently banned, you can still join the network to register your account.",
      },
      {
        q: "Can I share accounts with my friends or use public alts?",
        a: "No, account sharing and public alt accounts are against the rules and can result in a ban on all linked accounts.",
      },
      {
        q: "Are VPNs allowed?",
        a: "VPNs are allowed for regular play, but using one to evade a ban is not and will extend your punishment.",
      },
    ],
  },
  {
    id: "punishments",
    label: "Punishments",
    faqs: [
      {
        q: "How can I appeal a punishment?",
        a: "Open a ban appeal ticket on our Discord server with your username and punishment ID. A staff member will review it within 48 hours.",
      },
      {
        q: "Can I appeal if I was banned for cheating?",
        a: "Cheating bans can be appealed, but are reviewed with a stricter standard of evidence and are rarely reversed.",
      },
      {
        q: "How can I report a player?",
        a: "Open a ticket in #support with evidence (screenshots or a clip) and the staff team will review the report as soon as possible.",
      },
    ],
  },
  {
    id: "server",
    label: "Server",
    faqs: [
      {
        q: "Why can't I join the server?",
        a: "Double-check you're on Java Edition 1.20+ and connecting to play.seiky.net. If the issue persists, open a support ticket.",
      },
      {
        q: "What are the rules?",
        a: "No cheating, no griefing, no account sharing and no exploiting bugs. The full rule list is available on the Rules page.",
      },
      {
        q: "What are the requirements for Media rank?",
        a: "1,000+ subscribers or followers on an active Minecraft content channel. Apply through a support ticket with your channel link.",
      },
    ],
  },
];

export type Punishment = {
  id: string;
  player: string;
  type: "Ban" | "Mute" | "Kick" | "Warn";
  reason: string;
  staff: string;
  date: string;
  duration: string;
  active: boolean;
};

export const PUNISHMENTS: Punishment[] = [
  {
    id: "p1",
    player: "xX_Griefer_Xx",
    type: "Ban",
    reason: "Griefing spawn build",
    staff: "Dream",
    date: "Sep 23, 2026",
    duration: "7 days",
    active: true,
  },
  {
    id: "p2",
    player: "CheatyMcCheats",
    type: "Ban",
    reason: "Reach hacks (AC flagged)",
    staff: "Technoblade",
    date: "Sep 22, 2026",
    duration: "Permanent",
    active: true,
  },
  {
    id: "p3",
    player: "ToxicPlayer99",
    type: "Mute",
    reason: "Chat abuse / harassment",
    staff: "Wilbur",
    date: "Sep 21, 2026",
    duration: "24 hours",
    active: true,
  },
  {
    id: "p4",
    player: "AltAccount42",
    type: "Ban",
    reason: "Ban evasion (alt of banned account)",
    staff: "Dream",
    date: "Sep 20, 2026",
    duration: "Permanent",
    active: true,
  },
  {
    id: "p5",
    player: "LagSwitchLarry",
    type: "Kick",
    reason: "Suspicious latency abuse",
    staff: "Ranboo",
    date: "Sep 18, 2026",
    duration: "-",
    active: false,
  },
  {
    id: "p6",
    player: "SpamKingSam",
    type: "Warn",
    reason: "Advertising another server",
    staff: "Karl",
    date: "Sep 15, 2026",
    duration: "-",
    active: false,
  },
];

export function playerPunishments(username: string) {
  const lower = username.toLowerCase();
  return PUNISHMENTS.filter((p) => p.player.toLowerCase() === lower);
}

export const ONLINE_HISTORY = [
  { label: "00:00", value: 142 },
  { label: "03:00", value: 98 },
  { label: "06:00", value: 76 },
  { label: "09:00", value: 134 },
  { label: "12:00", value: 210 },
  { label: "15:00", value: 268 },
  { label: "18:00", value: 312 },
  { label: "21:00", value: 289 },
];
