"use client";

import { useState } from "react";
import { ONLINE_HISTORY } from "@/lib/data";

const WIDTH = 600;
const HEIGHT = 180;
const PADDING = 24;

export function OnlinePlayersChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...ONLINE_HISTORY.map((p) => p.value));
  const barWidth = (WIDTH - PADDING * 2) / ONLINE_HISTORY.length;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Players Online (24h)</h3>
        <span className="text-xs font-semibold text-muted">
          Peak: <span className="text-primary">{max}</span>
        </span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-4 h-40 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {ONLINE_HISTORY.map((point, i) => {
          const barHeight = (point.value / max) * (HEIGHT - PADDING * 2);
          const x = PADDING + i * barWidth;
          const y = HEIGHT - PADDING - barHeight;
          const isHover = hover === i;
          return (
            <g
              key={point.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              <rect x={x} y={PADDING / 2} width={barWidth - 8} height={HEIGHT - PADDING * 1.5} fill="transparent" />
              {isHover && (
                <text
                  x={x + (barWidth - 8) / 2}
                  y={y - 10}
                  textAnchor="middle"
                  className="fill-primary text-[11px] font-bold"
                >
                  {point.value}
                </text>
              )}
              <rect
                x={x}
                y={y}
                width={barWidth - 8}
                height={barHeight}
                rx={4}
                className="transition-all duration-300 ease-out"
                fill={isHover ? "var(--primary)" : "var(--secondary)"}
                opacity={isHover ? 1 : 0.55}
                style={{ transformOrigin: `${x + (barWidth - 8) / 2}px ${HEIGHT - PADDING}px` }}
              />
              <text
                x={x + (barWidth - 8) / 2}
                y={HEIGHT - 4}
                textAnchor="middle"
                className="fill-current text-[10px] font-medium text-muted"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
