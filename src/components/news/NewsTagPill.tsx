import Link from "next/link";
import { cn } from "@/lib/utils";
import { NEWS_TAG_COLOR, type NewsTag } from "@/lib/data";

export function NewsTagPill({
  tag,
  className,
  asLink = false,
}: {
  tag: NewsTag;
  className?: string;
  asLink?: boolean;
}) {
  const color = NEWS_TAG_COLOR[tag] ?? "#5b6472";
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all duration-200",
    asLink && "hover:brightness-90 hover:ring-1 hover:ring-current",
    className,
  );
  const style = { backgroundColor: `${color}1a`, color };
  const content = (
    <>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {tag}
    </>
  );

  if (asLink) {
    return (
      <Link
        href={`/news?tag=${encodeURIComponent(tag)}`}
        className={cn(classes, "relative z-10")}
        style={style}
      >
        {content}
      </Link>
    );
  }
  return (
    <span className={classes} style={style}>
      {content}
    </span>
  );
}
