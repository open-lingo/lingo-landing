import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "lingo-landing-theme";

/** Stored preference wins; otherwise follow the OS. Corrupt values are ignored. */
export function resolveInitialTheme(
  stored: string | null,
  prefersDark: boolean,
): ThemeMode {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null; // private browsing / storage disabled
  }
}

export function useTheme(): { mode: ThemeMode; toggle: () => void } {
  const [mode, setMode] = useState<ThemeMode>(() =>
    resolveInitialTheme(
      readStored(),
      typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches === true,
    ),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      /* storage unavailable — the class is still applied */
    }
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  }, []);

  return { mode, toggle };
}
