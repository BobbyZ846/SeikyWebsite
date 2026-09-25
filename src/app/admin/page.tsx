"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Gavel,
  Lock,
  Send,
  ShieldAlert,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { OnlinePlayersChart } from "@/components/admin/OnlinePlayersChart";
import { NewsPublisher } from "@/components/admin/NewsPublisher";
import { useAuth } from "@/lib/auth-context";
import { PUNISHMENTS, STAFF } from "@/lib/data";
import { mcHead } from "@/lib/utils";

const ADMIN_STATS = [
  { icon: Users, label: "Players Online", value: "312" },
  { icon: Ticket, label: "Open Tickets", value: "18" },
  { icon: ShieldAlert, label: "Pending Appeals", value: "4" },
  { icon: DollarSign, label: "Revenue Today", value: "$142" },
];

const REPORTS = [
  { player: "xX_Griefer_Xx", reason: "Griefing report", status: "Open", date: "2h ago" },
  { player: "CheatyMcCheats", reason: "Suspected cheating", status: "Reviewing", date: "5h ago" },
  { player: "ToxicPlayer99", reason: "Chat abuse", status: "Open", date: "1 day ago" },
  { player: "AltAccount42", reason: "Ban appeal", status: "Open", date: "2 days ago" },
];

const STATUS_STYLE: Record<string, string> = {
  Open: "text-danger border-danger/30 bg-danger/10",
  Reviewing: "text-warning border-warning/30 bg-warning/10",
  Resolved: "text-success border-success/30 bg-success/10",
};

const PUNISHMENT_STYLE: Record<string, string> = {
  Ban: "text-danger border-danger/30 bg-danger/10",
  Mute: "text-warning border-warning/30 bg-warning/10",
  Kick: "text-muted border-border bg-surface-2",
  Warn: "text-primary border-primary/30 bg-primary/10",
};

export default function AdminPage() {
  const { user, ready } = useAuth();
  const [broadcast, setBroadcast] = useState("");

  if (!ready) return null;

  if (!user || user.role !== "admin") {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <Lock className="h-10 w-10 text-muted" />
        <h1 className="font-display text-2xl font-bold">Access denied</h1>
        <p className="max-w-sm text-muted">
          This page is only available to admin accounts. Log in with the demo admin account to
          preview it.
        </p>
        <LinkButton href="/login">Go to Login</LinkButton>
      </Container>
    );
  }

  const allStaff = STAFF.flatMap((rank) =>
    rank.members.map((member) => ({ ...member, rankLabel: rank.label, rankColor: rank.color })),
  );

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted">Welcome back, {user.username}. Here&apos;s what needs your attention.</p>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Preview mode &mdash; no backend wired up yet
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ADMIN_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <OnlinePlayersChart />
        </div>

        <div className="mt-8">
          <NewsPublisher />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-lg font-bold">Staff Management</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              {allStaff.map((member, i) => (
                <div
                  key={member.name}
                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2 ${i !== allStaff.length - 1 ? "border-b border-border/60" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mcHead(member.name, 32)} alt={member.name} className="h-8 w-8 rounded-md" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs font-semibold" style={{ color: member.rankColor }}>
                      {member.rankLabel}
                    </p>
                  </div>
                  {member.joined && (
                    <span className="hidden text-xs text-muted sm:inline">Joined {member.joined}</span>
                  )}
                  <Link
                    href={`/players/${encodeURIComponent(member.name)}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-primary/40 hover:text-primary active:scale-95"
                  >
                    View
                  </Link>
                  <button className="rounded-lg border border-border px-2.5 py-1.5 text-danger transition-colors hover:bg-danger/10 active:scale-95">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <h2 className="mt-8 font-display text-lg font-bold">Recent Reports</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              {REPORTS.map((r, i) => (
                <div
                  key={r.player}
                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2 ${i !== REPORTS.length - 1 ? "border-b border-border/60" : ""}`}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{r.player}</p>
                    <p className="text-xs text-muted">{r.reason}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[r.status]}`}
                  >
                    {r.status}
                  </span>
                  <span className="hidden text-xs text-muted sm:inline">{r.date}</span>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-primary/40 hover:text-primary active:scale-95">
                    Resolve
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              <Gavel className="h-4 w-4 text-muted" />
              <h2 className="font-display text-lg font-bold">Recent Punishments</h2>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              {PUNISHMENTS.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2 ${i !== PUNISHMENTS.length - 1 ? "border-b border-border/60" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mcHead(p.player, 32)} alt={p.player} className="h-8 w-8 rounded-md" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{p.player}</p>
                    <p className="text-xs text-muted">{p.reason}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${PUNISHMENT_STYLE[p.type]}`}
                  >
                    {p.type}
                  </span>
                  <span className="hidden text-xs text-muted sm:inline">{p.duration}</span>
                  <span className="hidden text-xs text-muted md:inline">by {p.staff}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-bold">Broadcast Message</h3>
              <p className="mt-1.5 text-sm text-muted">Send an announcement to every online player.</p>
              <textarea
                value={broadcast}
                onChange={(e) => setBroadcast(e.target.value)}
                placeholder="Type your announcement..."
                rows={3}
                className="mt-4 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
              />
              <Button shape="md" className="mt-3 w-full" onClick={() => setBroadcast("")}>
                <Send className="h-4 w-4" /> Send Broadcast
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-bold">Server Controls</h3>
              <p className="mt-1.5 text-sm text-muted">
                These actions will be wired up to the Minecraft master API later.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button variant="outline" shape="md" className="w-full justify-start" disabled>
                  Restart Server
                </Button>
                <Button variant="outline" shape="md" className="w-full justify-start" disabled>
                  Enable Maintenance Mode
                </Button>
                <Button variant="danger" shape="md" className="w-full justify-start" disabled>
                  Wipe Leaderboards
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
