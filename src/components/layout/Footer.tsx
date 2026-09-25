import Link from "next/link";
import { AtSign, MessageCircle, Video } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { DISCORD_URL } from "@/lib/data";

const NAV_COL = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/staff", label: "Staff" },
  { href: "/vote", label: "Vote" },
  { href: "/support", label: "Support" },
  { href: "/store", label: "Store" },
];

const SUPPORT_COL = [
  { href: "/support", label: "Support Center" },
  { href: "/support", label: "Report a Player" },
  { href: "/support", label: "Ban Appeal" },
  { href: "/rules", label: "Server Rules" },
];

const LEGAL_COL = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/store-policy", label: "Store Policy" },
  { href: "/legal/cookies", label: "Cookie Notice" },
];

const SOCIALS = [
  { href: DISCORD_URL, icon: MessageCircle, label: "Discord" },
  { href: "#", icon: AtSign, label: "X" },
  { href: "#", icon: Video, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Seiky is a Minecraft network featuring Survival Games and SkyWars, custom plugins and
            an active community. Play for free, progress, and earn your spot on the leaderboards.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Navigation" links={NAV_COL} />
        <FooterCol title="Support" links={SUPPORT_COL} />
        <FooterCol title="Legal" links={LEGAL_COL} />
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Seiky Network. All rights reserved.</p>
          <p>Not affiliated with Mojang AB or Microsoft.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 border-b border-border pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
