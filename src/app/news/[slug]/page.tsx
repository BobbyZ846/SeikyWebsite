import type { Metadata } from "next";
import { NewsArticle } from "@/components/news/NewsArticle";
import { findNews } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findNews(slug);
  return post
    ? { title: `${post.title} | Seiky News`, description: post.excerpt }
    : { title: "News | Seiky Network" };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NewsArticle slug={slug} />;
}
