"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NewsTagPill } from "@/components/news/NewsTagPill";
import { useAllNews } from "@/lib/news-store";

export function NewsSection() {
  const news = useAllNews();

  return (
    <section className="border-b border-border bg-surface/60 py-20">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Stay updated with the latest Seiky news
            </h2>
            <p className="mt-2 max-w-md text-muted">
              Official announcements, updates, and everything happening on the network.
            </p>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all news
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <Link
                href={`/news/${item.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.date}
                  </span>
                  <NewsTagPill tag={item.tag} />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.excerpt}</p>
                <span className="mt-4 flex translate-y-1 items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  Read more <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
