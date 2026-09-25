"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Link2, MessageCircle, Newspaper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { ArticleBody } from "./ArticleBody";
import { NewsTagPill } from "./NewsTagPill";
import { DiscordBadge, readTime } from "./NewsList";
import { useAllNews, useHydrated } from "@/lib/news-store";
import { DISCORD_URL, NEWS_TAG_COLOR } from "@/lib/data";

export function NewsArticle({ slug }: { slug: string }) {
  const hydrated = useHydrated();
  const all = useAllNews();
  const post = all.find((n) => n.slug === slug);
  const [copied, setCopied] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = progress.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  if (!post) {
    if (!hydrated) return <div className="min-h-[60vh]" />;
    return (
      <Container className="flex animate-fade-up flex-col items-center gap-4 py-24 text-center">
        <Newspaper className="h-10 w-10 text-muted" />
        <h1 className="font-display text-2xl font-bold">Post not found</h1>
        <p className="text-muted">It may have been removed or the link is wrong.</p>
        <LinkButton href="/news">Back to news</LinkButton>
      </Container>
    );
  }

  const color = NEWS_TAG_COLOR[post.tag] ?? "#0091d6";
  const related = [
    ...all.filter((n) => n.slug !== slug && n.tag === post.tag),
    ...all.filter((n) => n.slug !== slug && n.tag !== post.tag),
  ].slice(0, 3);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <article>
      <div className="fixed inset-x-0 top-16 z-40 h-[3px]">
        <div
          ref={progress}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary"
        />
      </div>

      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[5px]"
          style={{ backgroundImage: "url(/cover.jpg)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(3,21,36,0.9) 0%, rgba(6,58,99,0.75) 55%, ${color}99 100%)`,
          }}
        />
        <Container className="relative max-w-3xl py-16 sm:py-20">
          <Link
            href="/news"
            className="group inline-flex animate-fade-up items-center gap-1.5 text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All news
          </Link>
          <div className="mt-6 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:60ms]">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold" style={{ color }}>
              {post.tag}
            </span>
            <span className="text-sm text-white/70">{post.date}</span>
            <span className="text-sm text-white/70">&middot; {readTime(post.body)} min read</span>
          </div>
          <h1 className="mt-4 animate-fade-up font-display text-3xl font-bold leading-tight text-white [animation-delay:120ms] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:180ms] sm:text-lg">
            {post.excerpt}
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-12">
        <div className="animate-fade-up [animation-delay:240ms]">
          <ArticleBody body={post.body} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <NewsTagPill tag={post.tag} asLink />
            {post.postToDiscord && <DiscordBadge />}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" shape="md" size="sm" onClick={copyLink}>
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Link2 className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <LinkButton href={DISCORD_URL} external variant="outline" shape="md" size="sm">
              <MessageCircle className="h-3.5 w-3.5" /> Discuss on Discord
            </LinkButton>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface/60 py-14">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold">More news</h2>
              <Link
                href="/news"
                className="group flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((n) => (
                <Link
                  key={n.id}
                  href={`/news/${n.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <NewsTagPill tag={n.tag} />
                    <span className="text-xs text-muted">{n.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
