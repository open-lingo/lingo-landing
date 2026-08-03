import { useEffect, useState } from "react";
import { FONT_OPTIONS, FONT_STORAGE_KEY, type FontOption } from "./fontOptions";

/**
 * Dev-only type switcher.
 *
 * Swaps the `--font-family` / `--font-mono` custom properties live so a
 * candidate can be judged on the real hero, roadmap and docs rather than from
 * a specimen. Candidate webfonts load on demand the first time each is picked,
 * so trying one costs a request and trying none costs nothing.
 *
 * Never rendered in a production build (`import.meta.env.DEV` is compiled to
 * false and this whole tree is dropped), so the shipped site keeps loading only
 * the fonts it actually uses.
 */

function ensureFamiliesLoaded(option: FontOption) {
  for (const family of option.families) {
    const id = `fontswitch-${family}`;
    if (document.getElementById(id)) continue;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
    document.head.appendChild(link);
  }
}

function applyOption(option: FontOption) {
  ensureFamiliesLoaded(option);
  const root = document.documentElement;
  root.style.setProperty("--font-family", option.sans);
  root.style.setProperty("--font-mono", option.mono);
  // Keep the CJK fallbacks behind whichever Latin face is active.
  root.style.setProperty(
    "--font-script",
    `${option.sans.split(",")[0]}, "Noto Sans JP", "Noto Sans KR", ui-sans-serif, sans-serif`,
  );
}

export function FontSwitcher() {
  const [activeId, setActiveId] = useState<string>(FONT_OPTIONS[0].id);
  const [open, setOpen] = useState(false);

  // Restore the last pick so navigating between pages does not reset it.
  useEffect(() => {
    const stored = localStorage.getItem(FONT_STORAGE_KEY);
    const option = FONT_OPTIONS.find((o) => o.id === stored);
    if (option) {
      applyOption(option);
      setActiveId(option.id);
    }
  }, []);

  const pick = (option: FontOption) => {
    applyOption(option);
    setActiveId(option.id);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, option.id);
    } catch {
      /* storage unavailable — the swap still applies for this page view */
    }
  };

  const active = FONT_OPTIONS.find((o) => o.id === activeId) ?? FONT_OPTIONS[0];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-border bg-surface-elevated px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary shadow-popover hover:text-text-primary"
      >
        Aa · {active.label}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-popover">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          Type · dev only
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close type switcher"
          className="text-text-muted hover:text-text-primary"
        >
          ✕
        </button>
      </div>

      <ul className="max-h-[60vh] overflow-y-auto">
        {FONT_OPTIONS.map((option) => {
          const selected = option.id === activeId;
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => pick(option)}
                className={`block w-full border-b border-border px-4 py-3 text-left last:border-b-0 ${
                  selected ? "bg-accent-muted" : "hover:bg-surface-muted"
                }`}
              >
                <span
                  className="block text-[15px] font-bold text-text-primary"
                  style={{ fontFamily: option.sans }}
                >
                  {option.label}
                </span>
                <span
                  className="mt-0.5 block text-[17px] leading-tight text-text-secondary"
                  style={{ fontFamily: option.sans }}
                >
                  Give it three weeks
                </span>
                <span className="mt-1.5 block text-[11px] leading-snug text-text-muted">
                  {option.note}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
