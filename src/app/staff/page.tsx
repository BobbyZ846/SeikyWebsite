import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StaffDirectory } from "@/components/staff/StaffDirectory";
import { DISCORD_URL, STAFF } from "@/lib/data";

const memberCount = STAFF.reduce((n, r) => n + r.members.length, 0);

const REQUIREMENTS = [
  "16 years or older",
  "Active on the server and Discord",
  "No recent punishments",
  "Good English or Serbian/Croatian",
];

export default function StaffPage() {
  return (
    <>
      <PageHero
        icon={ShieldCheck}
        title="Staff Team"
        description="The people keeping Seiky safe, fair and fun. Click a member to open their profile."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {[`${memberCount} members`, `${STAFF.length} ranks`, "Available on Discord"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-10">
        <Container>
          <StaffDirectory />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-[3px]"
                style={{ backgroundImage: "url(/cover.jpg)" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,21,36,0.9)_0%,rgba(6,58,99,0.78)_55%,rgba(0,145,214,0.55)_100%)]" />
              <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white">Want to join the team?</h2>
                  <p className="mt-3 max-w-md text-white/80">
                    We open staff applications a few times a year on Discord. Keep an eye on
                    #announcements so you don&apos;t miss the next round.
                  </p>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#04101c] shadow-lg transition-all duration-200 hover:scale-[1.04] active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 text-[#0091d6]" /> Apply on Discord
                  </a>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {REQUIREMENTS.map((req) => (
                    <li
                      key={req}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
