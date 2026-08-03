export type FontOption = {
  id: string;
  label: string;
  /** Google Fonts `family=` specs, loaded on demand the first time it is picked. */
  families: string[];
  sans: string;
  mono: string;
  /** Honest note about what you are looking at, including any caveat. */
  note: string;
};

const PLEX_MONO = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const FALLBACK = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/**
 * Candidates for the marketing site's Latin type. The mono stays IBM Plex Mono
 * in most rows so the comparison isolates one variable — the body/display face.
 *
 * Weight ceilings matter here: the hero uses `font-black` (900). Anything
 * capped at 700 gets synthesised by the browser, which thickens strokes
 * unevenly. Noted per option rather than hidden.
 */
export const FONT_OPTIONS: FontOption[] = [
  {
    id: "schibsted",
    label: "Schibsted Grotesk",
    families: ["Schibsted+Grotesk:wght@400;500;700;800;900"],
    sans: `"Schibsted Grotesk", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Previous default. Neo-grotesque, goes to 900. Clean but fairly anonymous.",
  },
  {
    id: "plex-arabic",
    label: "IBM Plex Sans Arabic",
    families: ["IBM+Plex+Sans+Arabic:wght@400;500;600;700"],
    sans: `"IBM Plex Sans Arabic", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Latin here is Plex Sans with metrics tuned for Arabic — slightly wider, a touch softer. Caps at 700, so font-black is synthesised.",
  },
  {
    id: "plex",
    label: "IBM Plex Sans",
    families: ["IBM+Plex+Sans:wght@400;500;600;700"],
    sans: `"IBM Plex Sans", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "The canonical superfamily match for the Plex Mono already in use — they were drawn together. Humanist, distinctive a/g. Caps at 700.",
  },
  {
    id: "instrument",
    label: "Instrument Sans",
    families: ["Instrument+Sans:wght@400;500;600;700"],
    sans: `"Instrument Sans", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Current. Sharp terminals, round bowls. Site now sets it at a true 700 with normal tracking — the face is narrow enough that negative tracking closed the letterfit.",
  },
  {
    id: "familjen",
    label: "Familjen Grotesk",
    families: ["Familjen+Grotesk:wght@400;500;600;700"],
    sans: `"Familjen Grotesk", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Swedish grotesque with odd, characterful terminals. The most personality of the sans options. Caps at 700.",
  },
  {
    id: "archivo",
    label: "Archivo",
    families: ["Archivo:wght@400;500;700;800;900"],
    sans: `"Archivo", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Grotesque built for high-performance display use. Goes to 900, so the hero stays a true black weight.",
  },
  {
    id: "plex-serif-display",
    label: "Plex Serif display + Plex Sans",
    families: [
      "IBM+Plex+Serif:wght@600;700",
      "IBM+Plex+Sans:wght@400;500;600;700",
    ],
    sans: `"IBM Plex Sans", ${FALLBACK}`,
    mono: PLEX_MONO,
    note: "Wildcard: all three Plex siblings. Serif only shows if you also flip the display slot below.",
  },
];

export const FONT_STORAGE_KEY = "lingo-landing-font";
