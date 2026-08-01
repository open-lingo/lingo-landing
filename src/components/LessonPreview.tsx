import { useState } from "react";
import { Icon } from "./ui/Icon";

/**
 * A faithful mock of a real vocabulary step, rendered as live markup rather
 * than a screenshot.
 *
 * Screenshots of this app go stale the moment the UI moves, blur on high-DPI
 * displays, and would need a second asset to survive dark mode. Rebuilding the
 * step in markup keeps it crisp, themed, responsive, and honest — and it lets
 * a visitor click an answer, which no screenshot can do.
 *
 * If real captures are wanted later, they drop into this component's place
 * without touching the surrounding layout.
 */

const OPTIONS = [
  { id: "a", label: "Good evening", correct: false },
  { id: "b", label: "Hello / good afternoon", correct: true },
  { id: "c", label: "Goodbye", correct: false },
  { id: "d", label: "Thank you", correct: false },
];

export function LessonPreview() {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = OPTIONS.find((o) => o.id === picked)?.correct ?? false;

  return (
    <div className="overflow-hidden rounded-lg border border-band-border bg-band-surface shadow-popover">
      {/* Session chrome — the X and the progress bar, as in the real player. */}
      <div className="flex items-center gap-3 border-b border-band-border px-4 py-3">
        <span className="text-band-muted" aria-hidden>
          <Icon name="arrowRight" size={15} className="rotate-180" />
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-band/60">
          <div className="h-full w-[38%] rounded-full bg-band-accent" />
        </div>
        <span className="font-mono text-[11px] text-band-muted">3 / 8</span>
      </div>

      <div className="px-5 py-7 sm:px-8 sm:py-9">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-band-muted">
          Choose the meaning
        </p>

        <div className="mt-6 text-center">
          <p className="font-mono text-[12px] tracking-wide text-band-accent">
            konnichiwa
          </p>
          <p className="mt-1.5 font-script text-[clamp(2.25rem,6vw,3.25rem)] font-bold leading-none text-band-text">
            こんにちは
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-band-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted transition-colors hover:text-band-text"
          >
            <Icon name="play" size={13} />
            Play audio
          </button>
        </div>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {OPTIONS.map((option) => {
            const isPicked = picked === option.id;
            const reveal = answered && option.correct;
            const wrong = isPicked && !option.correct;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPicked(option.id)}
                className={`rounded-md border px-4 py-3 text-left text-[14px] font-medium transition-colors ${
                  reveal
                    ? "border-success bg-success/10 text-band-text"
                    : wrong
                      ? "border-band-accent bg-band-accent/10 text-band-text"
                      : "border-band-border text-band-muted hover:border-band-muted hover:text-band-text"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p
          className="mt-5 min-h-5 text-center font-mono text-[11px] uppercase tracking-[0.1em]"
          aria-live="polite"
        >
          {answered ? (
            correct ? (
              <span className="text-success">
                Correct — next review in 3 days
              </span>
            ) : (
              <span className="text-band-accent">
                Not quite — this one comes back sooner
              </span>
            )
          ) : (
            <span className="text-band-muted/60">Pick one, it is interactive</span>
          )}
        </p>
      </div>
    </div>
  );
}
