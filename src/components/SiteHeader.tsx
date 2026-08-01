import { Link, NavLink } from "react-router";
import { LINKS } from "@/links";
import { useTheme } from "@/theme/useTheme";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

const NAV = [
  { to: "/roadmap", label: "Roadmap" },
  { to: "/docs", label: "Docs" },
  { to: "/about", label: "About" },
];

/**
 * Deliberately mirrors the app's own header (`lingo/src/routes/Layout.tsx`):
 * same masked-icon + divider + wordmark lockup, same sticky bar at h-11/h-12,
 * same max-w-7xl gutters. Crossing from the marketing site into the app should
 * not feel like crossing into a different product.
 */
export function SiteHeader() {
  const { mode, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-11 min-h-11 max-w-7xl items-center justify-between gap-2 px-4 sm:h-12 sm:gap-4 lg:px-8">
        <div className="flex shrink-0 items-center gap-2">
          {/* Masked so the mark takes the theme's ink colour, exactly as the
              app does it — no separate light/dark asset. */}
          <span
            className="inline-block h-6 w-6 shrink-0 bg-current sm:h-7 sm:w-7"
            style={{
              maskImage: "url('/icon.ico')",
              WebkitMaskImage: "url('/icon.ico')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
            aria-hidden
          />
          <span className="text-text-muted" aria-hidden>
            |
          </span>
          <Link
            to="/"
            className="text-base font-semibold text-text-primary sm:text-lg"
          >
            Open Lingo
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex md:gap-3">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-md px-2 py-1.5 text-sm ${
                  isActive
                    ? "font-medium text-text-primary"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-1.5 text-text-secondary hover:bg-surface-muted hover:text-text-primary"
          >
            <Icon name={mode === "dark" ? "sun" : "moon"} size={16} />
          </button>
          <a
            href={LINKS.signIn}
            className="hidden text-sm text-text-secondary hover:text-text-primary sm:block"
          >
            Sign in
          </a>
          <Button href={LINKS.getStarted} size="sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
