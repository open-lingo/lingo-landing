import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "hero";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  outline: "border border-accent text-accent hover:bg-accent-muted",
  ghost: "text-text-secondary hover:text-text-primary",
};

const SIZES: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  hero: "px-6 py-3 text-base",
};

export function composeButtonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return [BASE, VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(" ")
    .trim();
}

/**
 * Renders an `<a>` when `href` is present, a `<button>` otherwise. Every
 * product link on this site is absolute (built by `links.ts`), so react-router's
 * `<Link>` is deliberately not used for them.
 */
export function Button({
  href,
  onClick,
  children,
  variant,
  size,
  className,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const classes = composeButtonClasses({ variant, size, className });
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
