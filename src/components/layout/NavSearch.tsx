"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node) && !value) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [value]);

  function close() {
    setValue("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    router.push(`/players/${encodeURIComponent(name)}`);
    close();
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      onClick={() => setOpen(true)}
      aria-label="Search player"
      className={cn(
        "flex h-10 cursor-pointer items-center gap-2 overflow-hidden rounded-full border bg-surface pl-[13px] pr-3 transition-[width,border-color,box-shadow] duration-300 ease-out",
        open
          ? "w-60 cursor-text border-primary/50 shadow-[0_0_0_4px_rgba(0,145,214,0.12)]"
          : "w-10 border-border hover:border-primary/40",
      )}
    >
      <Search
        className={cn(
          "h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-300",
          !open && "animate-soft-pulse",
        )}
      />
      <div className="relative flex h-full flex-1 items-center">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-0 whitespace-nowrap text-sm text-muted transition-all duration-300 ease-out",
            open && !value ? "translate-x-0 opacity-100 delay-150" : "translate-x-6 opacity-0",
          )}
        >
          Search player...
        </span>
        <input
          ref={inputRef}
          aria-label="Search player"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && close()}
          type="text"
          tabIndex={open ? 0 : -1}
          className={cn(
            "w-full bg-transparent text-sm text-foreground caret-primary transition-opacity duration-200 focus:outline-none",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      </div>
    </form>
  );
}
