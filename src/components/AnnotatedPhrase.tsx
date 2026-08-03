import { useEffect, useState } from "react";
import type { HeroPhrase } from "@/content/copy";

/**
 * The page's signature element.
 *
 * A sentence in the target script, each word carrying its reading above it the
 * way ruby text sits over kanji — the actual typographic artifact of learning
 * one of these languages. It states the product's premise instead of
 * describing it: right now you need the annotation, and the point of the app is
 * that eventually you won't.
 */
export function AnnotatedPhrase({
  phrases,
  intervalMs = 5000,
}: {
  phrases: readonly HeroPhrase[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (phrases.length < 2 || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [phrases.length, intervalMs, paused]);

  const phrase = phrases[index];

  return (
    <div
      // Pausing on hover matters: someone squinting at an unfamiliar script
      // should not have it swapped out from under them mid-read.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex flex-col items-center"
    >
      {/* Reserved height stops the layout jumping between languages whose
          scripts have different ascenders — and Spanish, which has no
          romanisation row at all. */}
      <div
        key={index}
        className="flex min-h-[7.5rem] flex-wrap items-end justify-center gap-x-5 gap-y-3 motion-safe:animate-[phraseIn_600ms_cubic-bezier(0.16,1,0.3,1)] sm:min-h-[9rem] sm:gap-x-7"
      >
        {phrase.words.map((word, i) => (
          <span key={`${index}-${i}`} className="flex flex-col items-center">
            <span className="mb-1 block h-4 font-mono text-[11px] font-medium tracking-wide text-accent/70 sm:text-xs">
              {word.reading ?? ""}
            </span>
            <span className="block font-script text-[clamp(2.1rem,7vw,4.25rem)] font-bold leading-none text-text-primary">
              {word.text}
            </span>
          </span>
        ))}
      </div>

      <p className="mt-5 text-[17px] font-medium text-text-secondary sm:text-lg">
        &ldquo;{phrase.meaning}&rdquo;
      </p>

      {/* Doubles as the language list and as the control for what is shown —
          the row would otherwise be decoration. */}
      <div className="mt-6 flex items-center gap-1.5">
        {phrases.map((p, i) => (
          <button
            key={p.lang}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.langLabel}`}
            aria-current={i === index}
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              i === index
                ? "bg-accent-muted text-accent"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {p.langLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
