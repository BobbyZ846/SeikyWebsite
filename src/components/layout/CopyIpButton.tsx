"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVER_IP } from "@/lib/data";

export function CopyIpButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — ignore, this is a style-only affordance for now
    }
  }

  return (
    <div className={cn("flex items-center overflow-hidden rounded-full border border-border bg-surface", className)}>
      <span className="px-4 py-2 font-mono text-sm text-foreground/90">{SERVER_IP}</span>
      <button
        onClick={handleCopy}
        className={cn(
          "flex h-full items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors",
          copied ? "bg-success text-primary-foreground" : "bg-primary text-primary-foreground hover:brightness-110",
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Kopirano" : "Kopiraj IP"}
      </button>
    </div>
  );
}
