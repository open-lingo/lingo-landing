/**
 * Every outbound URL is built here from environment origins. Nothing else in
 * the codebase may reference an Open Lingo hostname — `noHardcodedHosts.test.ts`
 * enforces that, so changing domains is a config edit rather than a code sweep.
 */

function requireOrigin(name: "VITE_APP_ORIGIN" | "VITE_SITE_ORIGIN"): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env (local) or set the repo variable (CI).`,
    );
  }
  return value.replace(/\/+$/, "");
}

function join(origin: string, path: string): string {
  return `${origin}/${path.replace(/^\/+/, "")}`;
}

/** Absolute URL into the Open Lingo app. */
export function appUrl(path: string): string {
  return join(requireOrigin("VITE_APP_ORIGIN"), path);
}

/** Absolute URL on this marketing site — canonical links, OG tags, sitemap. */
export function siteUrl(path: string): string {
  return join(requireOrigin("VITE_SITE_ORIGIN"), path);
}

export const LINKS = {
  /** No-signup preview lesson. */
  tryFree: appUrl("/try"),
  getStarted: appUrl("/get-started"),
  signIn: appUrl("/login"),
  github: "https://github.com/open-lingo/lingo",
} as const;
