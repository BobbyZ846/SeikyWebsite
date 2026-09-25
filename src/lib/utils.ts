import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mcHead(username: string, size = 100) {
  return `https://mc-heads.net/avatar/${encodeURIComponent(username)}/${size}`;
}

export function mcBody(username: string, size = 100) {
  return `https://mc-heads.net/body/${encodeURIComponent(username)}/${size}`;
}
