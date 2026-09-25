import { ArrowRight, MessageCircle, ShoppingBag, ThumbsUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DISCORD_URL } from "@/lib/data";

const LINKS = [
  {
    href: DISCORD_URL,
    external: true,
    icon: MessageCircle,
    title: "Discord",
    desc: "9,712 members chatting with players and staff",
  },
  {
    href: "/vote",
    icon: ThumbsUp,
    title: "Vote",
    desc: "Support the server on voting sites",
  },
  {
    href: "/store",
    icon: ShoppingBag,
    title: "Store",
    desc: "Stars packs for cosmetics",
  },
];

export function CommunitySection() {
  return (
    <section className="py-20">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl p-10">
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center blur-[3px]"
              style={{ backgroundImage: "url(/cover.jpg)" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,21,36,0.88)_0%,rgba(6,58,99,0.75)_60%,rgba(0,145,214,0.6)_100%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Stay connected with the Seiky community
              </h2>
              <p className="mt-3 max-w-md text-white/80">
                Join the Discord for announcements, events, and to find people to play with. The
                staff team is there for any questions and support.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#04101c] shadow-lg transition-all duration-200 hover:scale-[1.04] active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-[#0091d6]" /> Join the community
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="flex h-full flex-col gap-4">
          {LINKS.map((link, i) => (
            <Reveal key={link.title} delay={120 + i * 90} className="flex-1">
              <LinkButton
                href={link.href}
                external={link.external}
                variant="outline"
                shape="md"
                className="group h-full w-full justify-start gap-4 rounded-2xl px-6 py-5 text-left hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <link.icon className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-display text-base font-bold text-foreground">
                    {link.title}
                  </span>
                  <span className="text-xs font-normal text-muted">{link.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
              </LinkButton>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
