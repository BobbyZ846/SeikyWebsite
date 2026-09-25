type Block =
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string };

// Post bodies use a tiny markup: "## " heading lines, "- " list lines, and paragraphs
// separated by blank lines.
function parse(body: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join("\n") });
    paragraph = [];
  };

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();
  return blocks;
}

export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="flex flex-col gap-5 text-[15px] leading-7 text-foreground/85">
      {parse(body).map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="mt-4 font-display text-xl font-bold text-foreground">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
