"use client";

import { useMemo, useSyncExternalStore } from "react";
import { NEWS, type NewsItem } from "./data";

// Admin-published posts live in localStorage until the master API exists.
const KEY = "seiky.customNews";
const EMPTY: NewsItem[] = [];
const listeners = new Set<() => void>();
let cache: NewsItem[] | null = null;

function read(): NewsItem[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]") as NewsItem[];
    // posts saved before slugs/bodies existed
    cache = parsed.map((n) => ({
      ...n,
      slug: n.slug ?? n.id,
      body: n.body ?? n.excerpt,
    }));
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(items: NewsItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // storage unavailable — keep the in-memory copy for this session
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const noopSubscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useCustomNews() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function useAllNews() {
  const custom = useCustomNews();
  return useMemo(() => [...custom, ...NEWS], [custom]);
}

export function useNewsPost(slug: string) {
  const all = useAllNews();
  return all.find((n) => n.slug === slug);
}

export function makeSlug(title: string) {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "post"}-${Math.random().toString(36).slice(2, 6)}`;
}

export function excerptFrom(body: string) {
  const withoutHeadings = body
    .split("\n")
    .filter((l) => !l.trim().startsWith("## "))
    .join("\n");
  const firstParagraph =
    withoutHeadings
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .find(Boolean) ?? body;
  const clean = firstParagraph.replace(/^- /gm, "").replace(/\s+/g, " ").trim();
  return clean.length > 180 ? `${clean.slice(0, 177).trimEnd()}…` : clean;
}

export function addNews(item: NewsItem) {
  write([item, ...read()]);
}

export function removeNews(id: string) {
  write(read().filter((n) => n.id !== id));
}
