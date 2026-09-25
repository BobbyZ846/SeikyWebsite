import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Code,
  Crown,
  LifeBuoy,
  Shield,
  ShieldCheck,
  ShieldHalf,
  ShieldPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { STAFF, type StaffRank } from "@/lib/data";
import { mcBody } from "@/lib/utils";

const RANK_ICONS: Record<string, LucideIcon> = {
  owner: Crown,
  developer: Code,
  manager: Briefcase,
  sradmin: ShieldPlus,
  admin: ShieldCheck,
  srmod: ShieldHalf,
  mod: Shield,
  helper: LifeBuoy,
};

export function StaffDirectory() {
  return (
    <div className="flex flex-col gap-14">
      {STAFF.map((rank) => {
        const Icon = RANK_ICONS[rank.id] ?? Users;
        return (
          <section key={rank.id}>
            <Reveal className="mb-6 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: rank.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-bold">{rank.plural}</h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ backgroundColor: `${rank.color}1a`, color: rank.color }}
              >
                {rank.members.length}
              </span>
              <span className="ml-2 h-px flex-1 bg-border" />
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rank.members.map((m, i) => (
                <Reveal key={m.name} delay={i * 70}>
                  <StaffCard name={m.name} rank={rank} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function StaffCard({ name, rank }: { name: string; rank: StaffRank }) {
  return (
    <Link
      href={`/players/${encodeURIComponent(name)}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
    >
      <div
        className="relative h-40 overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${rank.color}40 0%, ${rank.color}12 65%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-grid" />
        <span
          className="absolute left-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
          style={{ backgroundColor: rank.color }}
        >
          {rank.label}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mcBody(name, 90)}
          alt=""
          className="absolute -bottom-10 left-1/2 h-44 -translate-x-1/2 drop-shadow-[0_10px_12px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105"
        />
      </div>
      <div className="relative flex flex-1 flex-col items-center border-t border-border bg-surface px-5 pb-5 pt-4 text-center">
        <p className="font-display text-lg font-bold">{name}</p>
        <p className="text-xs font-semibold" style={{ color: rank.color }}>
          {rank.label}
        </p>
        <span
          className="mt-3 inline-flex translate-y-1 items-center gap-1 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ color: rank.color }}
        >
          View profile <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
