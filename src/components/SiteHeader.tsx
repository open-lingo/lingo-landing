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

export function SiteHeader() {
  const { mode, toggle } = useTheme();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link to="/" className="text-lg font-black tracking-tight text-text-primary">
          Open Lingo
        </Link>

        <nav className="hidden gap-5 sm:flex">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-text-secondary hover:bg-surface-muted hover:text-text-primary"
          >
            <Icon name={mode === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <a
            href={LINKS.signIn}
            className="text-sm font-semibold text-text-secondary hover:text-text-primary"
          >
            Sign in
          </a>
          <Button href={LINKS.getStarted}>Get started</Button>
        </div>
      </div>
    </header>
  );
}
