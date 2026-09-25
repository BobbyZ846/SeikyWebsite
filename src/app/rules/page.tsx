import { Ban, BookOpen, Gavel, MessageSquareWarning, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

const SECTIONS = [
  {
    icon: ShieldAlert,
    title: "General Conduct",
    rules: [
      "Treat every player and staff member with respect — harassment, hate speech, and discrimination are never allowed.",
      "No cheating, hacked clients, X-ray, or exploiting bugs for an unfair advantage.",
      "No account sharing or using public alt accounts to bypass punishments.",
      "Impersonating staff or Seiky in any way is strictly forbidden.",
    ],
  },
  {
    icon: MessageSquareWarning,
    title: "Chat & Community",
    rules: [
      "No spamming, excessive caps, or advertising other servers.",
      "Keep chat in English or Serbian/Croatian/Bosnian so staff can moderate it.",
      "No sharing personal information about yourself or others.",
      "Content creators must follow the Media rank guidelines when streaming or recording.",
    ],
  },
  {
    icon: Gavel,
    title: "Gameplay",
    rules: [
      "Griefing, stealing, and scamming other players is bannable on applicable game modes.",
      "Team up fairly — don't abuse party mechanics to gain an unfair advantage in solo modes.",
      "Lag machines and intentionally crashing the server are strictly forbidden.",
      "Report bugs to staff instead of abusing them for personal gain.",
    ],
  },
  {
    icon: Ban,
    title: "Punishments",
    rules: [
      "Punishments range from warnings and mutes to temporary or permanent bans depending on severity.",
      "Repeated offenses escalate punishment length automatically.",
      "You can appeal a punishment through a support ticket on Discord.",
      "Bypassing a ban with an alt account will result in a permanent ban on all linked accounts.",
    ],
  },
];

export default function RulesPage() {
  return (
    <>
      <PageHero
        icon={BookOpen}
        title="Server Rules"
        description="Play fair, be respectful, and have fun. Breaking these rules can result in a punishment."
      />

      <section className="py-10">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-4.5 w-4.5" />
                </span>
                <h2 className="font-display text-lg font-bold">{section.title}</h2>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
