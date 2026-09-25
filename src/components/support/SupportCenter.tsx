"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  Gavel,
  Headset,
  LayoutGrid,
  MessageCircle,
  Search,
  Server,
  ShieldAlert,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DISCORD_URL, STAFF, SUPPORT_FAQ_CATEGORIES } from "@/lib/data";
import { cn, mcHead } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  account: UserRound,
  punishments: Gavel,
  server: Server,
};

const ACTIONS = [
  {
    icon: Ticket,
    title: "Open a ticket",
    desc: "Account, store or technical problems — a staff member will pick it up.",
    meta: "Reply within 48h",
    cta: "Create ticket",
    href: DISCORD_URL,
  },
  {
    icon: ShieldAlert,
    title: "Report a player",
    desc: "Cheating, griefing or chat abuse? Send a clip or screenshots as evidence.",
    meta: "Reviewed daily",
    cta: "Report on Discord",
    href: DISCORD_URL,
  },
  {
    icon: BookOpen,
    title: "Read the rules",
    desc: "Most questions about punishments are answered in the server rules.",
    meta: "2 min read",
    cta: "Open rules",
    href: "/rules",
  },
];

const POPULAR = ["register", "appeal", "report", "VPN", "join"];

const onlineStaff = STAFF.flatMap((r) => r.members.map((m) => m.name)).slice(0, 5);

export function SupportCenter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUPPORT_FAQ_CATEGORIES.filter((c) => category === "all" || c.id === category)
      .map((c) => ({
        ...c,
        faqs: c.faqs.filter(
          (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.faqs.length > 0);
  }, [query, category]);

  const total = SUPPORT_FAQ_CATEGORIES.reduce((n, c) => n + c.faqs.length, 0);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
          style={{ backgroundImage: "url(/cover.jpg)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,21,36,0.9)_0%,rgba(6,58,99,0.75)_55%,rgba(0,145,214,0.6)_100%)]" />
        <Container className="relative flex flex-col items-center pb-28 pt-16 text-center sm:pt-20">
          <span className="flex h-12 w-12 animate-fade-up items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
            <Headset className="h-6 w-6" />
          </span>
          <h1 className="mt-5 animate-fade-up font-display text-4xl font-bold text-white [animation-delay:60ms] sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-3 max-w-lg animate-fade-up text-white/80 [animation-delay:120ms]">
            Search the help center or reach the staff team directly.
          </p>

          <label className="mt-8 flex w-full max-w-xl animate-fade-up items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-2xl ring-4 ring-white/15 transition-shadow [animation-delay:180ms] focus-within:ring-white/35">
            <Search className="h-5 w-5 shrink-0 text-primary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for an answer, e.g. “appeal”"
              className="w-full bg-transparent text-base text-[#12151a] placeholder:text-[#5b6472] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="rounded-full p-1 text-[#5b6472] transition-colors hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="mt-4 flex animate-fade-up flex-wrap items-center justify-center gap-2 [animation-delay:240ms]">
            <span className="text-xs text-white/60">Popular:</span>
            {POPULAR.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setQuery(p);
                  setCategory("all");
                }}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Container className="relative -mt-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ACTIONS.map((a, i) => {
            const external = a.href.startsWith("http");
            return (
              <Link
                key={a.title}
                href={a.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                style={{ animationDelay: `${280 + i * 80}ms` }}
                className="group flex animate-fade-up flex-col rounded-2xl border border-border bg-background p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-muted">
                    {a.meta}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{a.desc}</p>
                <span className="mt-5 text-sm font-semibold text-primary">
                  {a.cta}{" "}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Browse topics
            </p>
            <nav className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {[{ id: "all", label: "All questions", count: total }, ...SUPPORT_FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: c.faqs.length }))].map(
                (c) => {
                  const Icon = CATEGORY_ICONS[c.id] ?? LayoutGrid;
                  const active = category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "text-muted hover:bg-surface hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 whitespace-nowrap">{c.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px]",
                          active ? "bg-white/20" : "bg-surface-2",
                        )}
                      >
                        {c.count}
                      </span>
                    </button>
                  );
                },
              )}
            </nav>

            <div className="mt-6 hidden items-start gap-2.5 rounded-xl border border-danger/25 bg-danger/5 p-4 text-xs leading-relaxed text-danger lg:flex">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Spam tickets or false reports can get you blacklisted from support.
            </div>
          </aside>

          <div key={`${category}-${query}`} className="animate-fade-up">
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
                <Search className="h-8 w-8 text-muted" />
                <p className="font-semibold">No answers for &ldquo;{query}&rdquo;</p>
                <p className="text-sm text-muted">Try another word or open a ticket below.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {results.map((c) => (
                  <div key={c.id}>
                    <h2 className="mb-4 font-display text-xl font-bold">{c.label}</h2>
                    <div className="flex flex-col gap-3">
                      {c.faqs.map((f) => {
                        const key = `${c.id}:${f.q}`;
                        const isOpen = open === key;
                        return (
                          <div
                            key={key}
                            className={cn(
                              "overflow-hidden rounded-2xl border bg-surface transition-all duration-300",
                              isOpen ? "border-primary/40 shadow-md" : "border-border hover:border-primary/25",
                            )}
                          >
                            <button
                              onClick={() => setOpen(isOpen ? null : key)}
                              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                            >
                              <span className={cn("font-semibold transition-colors", isOpen && "text-primary")}>
                                {f.q}
                              </span>
                              <span
                                className={cn(
                                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                  isOpen ? "rotate-180 bg-primary text-white" : "bg-surface-2 text-muted",
                                )}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </span>
                            </button>
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-out",
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                              )}
                            >
                              <div className="overflow-hidden">
                                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {onlineStaff.map((name) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={name}
                    src={mcHead(name, 48)}
                    alt={name}
                    title={name}
                    className="h-11 w-11 rounded-full border-2 border-surface transition-transform duration-200 hover:z-10 hover:-translate-y-1"
                  />
                ))}
              </div>
              <div>
                <p className="font-display text-lg font-bold">Still need help?</p>
                <p className="text-sm text-muted">
                  The staff team usually replies on Discord within a couple of hours.
                </p>
              </div>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#5865f2] px-6 text-sm font-bold text-white shadow-md shadow-[#5865f2]/30 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" /> Join our Discord
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
