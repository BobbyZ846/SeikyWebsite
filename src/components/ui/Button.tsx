import Link from "next/link";
import { cn } from "@/lib/utils";

type Variants = {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "md";
  className?: string;
};

type Common = Variants & {
  children: React.ReactNode;
};

const variants: Record<NonNullable<Common["variant"]>, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  outline:
    "bg-surface/60 text-foreground border border-border hover:border-primary/60 hover:text-primary",
  ghost: "bg-transparent text-foreground hover:bg-surface-2",
  danger: "bg-danger text-white hover:brightness-110",
};

const sizes: Record<NonNullable<Common["size"]>, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-sm gap-2",
};

function classes({ variant = "primary", size = "md", shape = "pill", className }: Variants) {
  return cn(
    "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
    shape === "pill" ? "rounded-full" : "rounded-lg",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant,
  size,
  shape,
  className,
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes({ variant, size, shape, className })} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant,
  size,
  shape,
  className,
  children,
  external,
}: Common & { href: string; external?: boolean }) {
  const cls = classes({ variant, size, shape, className });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
