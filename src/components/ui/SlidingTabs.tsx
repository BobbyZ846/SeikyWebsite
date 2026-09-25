"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item<T extends string> = { id: T; label: string; icon?: LucideIcon };

export function SlidingTabs<T extends string>({
  items,
  value,
  onChange,
  variant = "pill",
  className,
}: {
  items: Item<T>[];
  value: T;
  onChange: (id: T) => void;
  variant?: "pill" | "underline";
  className?: string;
}) {
  const buttons = useRef(new Map<T, HTMLButtonElement>());
  const indicator = useRef<HTMLSpanElement>(null);
  const measured = useRef(false);

  function place() {
    const el = buttons.current.get(value);
    const ind = indicator.current;
    if (!el || !ind) return;
    if (!measured.current) {
      // first placement shouldn't animate in from the left edge
      ind.style.transition = "none";
    }
    ind.style.width = `${el.offsetWidth}px`;
    ind.style.transform = `translateX(${el.offsetLeft}px)`;
    if (!measured.current) {
      void ind.offsetWidth;
      ind.style.transition = "";
      measured.current = true;
    }
  }

  useLayoutEffect(place);

  useEffect(() => {
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  });

  const pill = variant === "pill";

  return (
    <div
      className={cn(
        "relative",
        pill ? "inline-flex rounded-full bg-surface-2 p-1" : "flex gap-1 border-b border-border",
        className,
      )}
    >
      <span
        ref={indicator}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          pill
            ? "top-1 bottom-1 rounded-full bg-primary shadow-md shadow-primary/25"
            : "-bottom-px h-[2px] rounded-full bg-primary",
        )}
      />
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) buttons.current.set(item.id, el);
              else buttons.current.delete(item.id);
            }}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative z-10 flex items-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors duration-200 active:scale-95",
              pill ? "rounded-full px-5 py-2" : "px-4 py-3",
              active
                ? pill
                  ? "text-primary-foreground"
                  : "text-primary"
                : "text-muted hover:text-foreground",
            )}
          >
            {item.icon && (
              <item.icon
                className={cn("h-4 w-4 transition-transform duration-300", active && "scale-110")}
              />
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
