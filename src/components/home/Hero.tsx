"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SERVER_IP } from "@/lib/data";

export function Hero() {
  const [copied, setCopied] = useState(false);

  async function handlePlay() {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — ignore, this is a style-only affordance for now
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: "url(/cover.jpg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,21,36,0.82)_0%,rgba(6,58,99,0.68)_50%,rgba(0,145,214,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none absolute left-[8%] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#00c2c4]/25 blur-[100px]" />
      <div className="pointer-events-none absolute right-[6%] bottom-[-100px] h-[280px] w-[280px] rounded-full bg-[#0091d6]/35 blur-[100px]" />

      <Container className="relative flex flex-col items-center gap-5 py-28 text-center sm:py-36">
        <h1 className="animate-fade-up font-display text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl">
          SEIKY NETWORK
        </h1>

        <p className="animate-fade-up [animation-delay:80ms] max-w-lg text-base font-semibold leading-relaxed text-white/85 sm:text-lg">
          Najbolje balkansko iskustvo.
        </p>

        <button
          onClick={handlePlay}
          className="animate-fade-up [animation-delay:160ms] group mt-3 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[#04101c] shadow-lg transition-all duration-200 hover:scale-[1.04] hover:shadow-xl active:scale-95"
        >
          <Play className="h-4 w-4 fill-[#0091d6] text-[#0091d6] transition-transform duration-200 group-hover:translate-x-0.5" />
          {copied ? "IP Copied!" : "Play Now"}
        </button>

        <div className="animate-fade-up [animation-delay:240ms] mt-2 flex items-center gap-2 text-sm text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ddc84]" />
          </span>
          312 Online
        </div>
        <p className="animate-fade-up [animation-delay:320ms] font-mono text-xs text-white/55">{SERVER_IP}</p>
      </Container>
    </section>
  );
}
