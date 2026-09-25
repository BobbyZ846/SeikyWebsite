"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Trophy, User } from "lucide-react";
import { cn, mcHead } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) return null;

  function handleLogout() {
    setOpen(false);
    logout();
    router.push("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-2.5 transition-colors hover:border-primary/50"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mcHead(user.username, 64)}
          alt={user.username}
          className="h-7 w-7 rounded-full ring-1 ring-border"
        />
        <span className="hidden text-sm font-semibold sm:inline">{user.username}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="animate-dropdown-in absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mcHead(user.username, 64)}
              alt={user.username}
              className="h-11 w-11 rounded-lg ring-1 ring-border"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">{user.username}</p>
              <p className="text-xs font-semibold" style={{ color: user.rankColor }}>
                {user.rank}
                {user.role === "admin" && <span className="text-muted"> · Admin</span>}
              </p>
            </div>
          </div>
          <nav className="flex flex-col p-1.5">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
            >
              <User className="h-4 w-4 text-muted" /> My Profile
            </Link>
            <Link
              href="/leaderboards"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
            >
              <Trophy className="h-4 w-4 text-muted" /> Leaderboards
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-primary hover:bg-primary/10"
              >
                <LayoutDashboard className="h-4 w-4" /> Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-danger hover:bg-danger/10"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
