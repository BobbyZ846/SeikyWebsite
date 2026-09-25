"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "./Logo";
import { LinkButton } from "@/components/ui/Button";
import { ProfileMenu } from "./ProfileMenu";
import { NavSearch } from "./NavSearch";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const { user, ready } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const isStore = link.href === "/store";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                  active && "text-primary",
                  isStore && "text-primary hover:brightness-125 hover:text-primary",
                )}
              >
                {isStore && (
                  <ShoppingBag className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
                )}
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-primary transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <NavSearch />
          </div>

          <div className="hidden sm:block">
            {ready && (user ? <ProfileMenu /> : <LinkButton href="/login">Log In</LinkButton>)}
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-dropdown-in border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-surface hover:text-foreground",
                  pathname === link.href && "bg-surface text-primary",
                  link.href === "/store" && "text-primary",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {ready && (
            <div className="mt-4">
              {user ? <ProfileMenu /> : <LinkButton href="/login" className="w-full">Log In</LinkButton>}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
