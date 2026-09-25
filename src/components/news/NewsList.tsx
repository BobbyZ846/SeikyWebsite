"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Calendar, Clock, MessageCircle, Newspaper, X } from "lucide-react";
import { NewsTagPill } from "./NewsTagPill";
import { useAllNews } from "@/lib/news-store";
import { NEWS_TAG_COLOR, NEWS_TAGS, type NewsItem, type NewsTag } from "@/lib/data";
import { cn } from "@/lib/utils";

export function readTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function NewsList() {
  const news = useAllNews();
  const params = useSearchParams();
  const rawTag = params.get("tag");
  const tag = NEWS_TAGS.find((t) => t === rawTag) as NewsTag | undefined;

  const filtered = tag ? news.filter((n) => n.tag === tag) : news;
  const [featured, ...rest] = filtered;

  return (
    <div>
      {tag && (
        <div
          className="mb-8 flex animate-fade-up flex-wrap items-center gap-3 rounded-2xl border px-5 py-3.5"
          style={{ borderColor: `${NEWS_TAG_COLOR[tag]}40`, backgroundColor: `${NEWS_TAG_COLOR[tag]}0d` }}
        >
          <span className="text-sm text-muted">Showing posts for</span>
          <NewsTagPill tag={tag} className="px-3 py-1 text-xs" />
          <span className="text-sm text-muted">
            &middot; {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </span>
          <Link
            href="/news"
            className="ml-auto flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" /> Show all
          </Link>
        </div>
      )}

      <div key={tag ?? "all"}>
        {!featured ? (
          <div className="flex animate-fade-up flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <Newspaper className="h-8 w-8 text-muted" />
            <p className="font-semibold">No {tag} posts yet</p>
            <Link href="/news" className="text-sm font-semibold text-primary hover:underline">
              See all news
            </Link>
          </div>
        ) : (
          <>
            <FeaturedPost item={featured} />
            {rest.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <PostCard key={item.id} item={item} delay={120 + i * 60} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FeaturedPost({ item }: { item: NewsItem }) {
  return (
    <article className="group relative grid animate-fade-up grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-xl lg:grid-cols-[1.1fr_1fr]">
      <div className="order-2 flex flex-col justify-center p-8 sm:p-10 lg:order-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            Latest
          </span>
          <NewsTagPill tag={item.tag} asLink />
          {item.postToDiscord && <DiscordBadge />}
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-snug transition-colors group-hover:text-primary sm:text-3xl">
          <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted sm:text-base">
          {item.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Meta item={item} />
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      <div className="relative order-1 h-48 overflow-hidden sm:h-60 lg:order-2 lg:h-auto lg:min-h-72 lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: "url(/cover.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031524]/50 to-transparent lg:hidden" />
      </div>
    </article>
  );
}

function PostCard({ item, delay }: { item: NewsItem; delay: number }) {
  const color = NEWS_TAG_COLOR[item.tag] ?? "#5b6472";
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="group relative flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.15] transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-center justify-between gap-2">
        <NewsTagPill tag={item.tag} asLink />
        {item.postToDiscord && <DiscordBadge />}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
        <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{item.excerpt}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <Meta item={item} />
        <ArrowRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
      </div>
    </article>
  );
}

export function Meta({ item, className }: { item: NewsItem; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-xs font-medium text-muted", className)}>
      <span className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        {item.date}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {readTime(item.body)} min read
      </span>
    </div>
  );
}

export function DiscordBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#5865f2]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#5865f2]">
      <MessageCircle className="h-3 w-3" /> On Discord
    </span>
  );
}
