"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const username = email.split("@")[0] || "Player";
    login({
      username: username.charAt(0).toUpperCase() + username.slice(1),
      role: "member",
      rank: "Member",
      rankColor: "#8a97a8",
    });
    router.push("/");
  }

  function handleAdminPreview() {
    login({
      username: "Marko",
      role: "admin",
      rank: "Owner",
      rankColor: "#e11d48",
    });
    router.push("/admin");
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your Seiky account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-left">
          <span className="text-sm font-medium text-foreground/90">Email Address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-left">
          <span className="text-sm font-medium text-foreground/90">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <Link href="/support" className="self-end text-xs font-medium text-primary hover:underline">
            Forgot your password?
          </Link>
        </label>

        <Button type="submit" shape="md" className="mt-1 h-11 w-full">
          Log In
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
        <span className="h-px flex-1 bg-border" />
        Preview mode
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        onClick={handleAdminPreview}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
      >
        <ShieldCheck className="h-4 w-4" /> Continue as Admin (Demo)
      </button>
      <p className="mt-2 text-center text-xs text-muted">
        No backend is wired up yet — this signs you in with a demo admin account so you can preview
        the site&apos;s logged-in and admin views.
      </p>
    </AuthCard>
  );
}
