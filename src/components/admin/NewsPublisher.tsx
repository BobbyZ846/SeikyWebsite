"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Megaphone, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NewsTagPill } from "@/components/news/NewsTagPill";
import { NEWS_TAG_COLOR, NEWS_TAGS, type NewsTag } from "@/lib/data";
import { addNews, excerptFrom, makeSlug, removeNews, useCustomNews } from "@/lib/news-store";
import { cn } from "@/lib/utils";

function today() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function NewsPublisher() {
  const published = useCustomNews();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NewsTag>("Global");
  const [discord, setDiscord] = useState(true);
  const [justPublished, setJustPublished] = useState(false);

  const canPublish = title.trim().length > 0 && content.trim().length > 0;

  function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!canPublish) return;
    const body = content.trim();
    addNews({
      id: crypto.randomUUID(),
      slug: makeSlug(title),
      date: today(),
      tag,
      title: title.trim(),
      excerpt: excerptFrom(body),
      body,
      postToDiscord: discord,
    });
    setTitle("");
    setContent("");
    setJustPublished(true);
    setTimeout(() => setJustPublished(false), 2500);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2.5">
        <Megaphone className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-bold">Publish News</h3>
      </div>
      <p className="mt-1.5 text-sm text-muted">
        Posts appear on the News page and homepage right away.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form onSubmit={publish} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Season 4 is here"
              maxLength={80}
              className="h-11 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-primary/50 focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">
              Where does this apply?
            </span>
            <div className="flex flex-wrap gap-2">
              {NEWS_TAGS.map((t) => {
                const color = NEWS_TAG_COLOR[t];
                const active = tag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 active:scale-95",
                      active ? "scale-105 text-white shadow-sm" : "hover:-translate-y-0.5",
                    )}
                    style={
                      active
                        ? { backgroundColor: color, borderColor: color }
                        : { color, borderColor: `${color}40`, backgroundColor: `${color}0d` }
                    }
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"What's new on Seiky?\n\n## Optional heading\n- Bullet point\n- Another one"}
              rows={9}
              className="resize-y rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-[13px] leading-relaxed text-foreground placeholder:text-muted transition-colors focus:border-primary/50 focus:outline-none"
            />
            <span className="text-xs text-muted">
              Leave an empty line between paragraphs. Start a line with{" "}
              <code className="rounded bg-surface-2 px-1">## </code> for a heading or{" "}
              <code className="rounded bg-surface-2 px-1">- </code> for a list.
            </span>
          </label>

          <button
            type="button"
            onClick={() => setDiscord((v) => !v)}
            className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3 text-left transition-colors hover:border-[#5865f2]/40"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-[#5865f2]" />
              <span>
                <span className="block text-sm font-semibold">Also post to Discord</span>
                <span className="block text-xs text-muted">
                  Sent to #announcements once the Discord webhook is connected.
                </span>
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                discord ? "bg-[#5865f2]" : "bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  discord && "translate-x-5",
                )}
              />
            </span>
          </button>

          <Button type="submit" shape="md" className="h-11 w-full" disabled={!canPublish}>
            {justPublished ? (
              <span className="flex animate-fade-up items-center gap-2">
                <Check className="h-4 w-4" /> Published!
              </span>
            ) : (
              <>
                <Megaphone className="h-4 w-4" /> Publish
              </>
            )}
          </Button>
        </form>

        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Live preview
            </p>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {today()}
                </span>
                <NewsTagPill key={tag} tag={tag} className="animate-fade-up" />
              </div>
              <h4 className="mt-3 font-display text-lg font-bold leading-snug">
                {title || <span className="text-muted/60">Your headline</span>}
              </h4>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {content.trim() ? excerptFrom(content.trim()) : "Your post summary will appear here."}
              </p>
              <p className="mt-3 text-xs text-muted">
                The card shows a short summary — readers open the post to read the full text.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Published from panel &middot; {published.length}
            </p>
            {published.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
                Nothing published yet.
              </p>
            ) : (
              <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                {published.map((n) => (
                  <div
                    key={n.id}
                    className="flex animate-fade-up items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                  >
                    <NewsTagPill tag={n.tag} />
                    <span className="flex-1 truncate text-sm font-medium">{n.title}</span>
                    {n.postToDiscord && <MessageCircle className="h-3.5 w-3.5 text-[#5865f2]" />}
                    <span className="text-xs text-muted">{n.date}</span>
                    <Link
                      href={`/news/${n.slug}`}
                      aria-label={`Open ${n.title}`}
                      className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => removeNews(n.id)}
                      aria-label={`Delete ${n.title}`}
                      className="rounded-md p-1.5 text-danger transition-colors hover:bg-danger/10 active:scale-90"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
