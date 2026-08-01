import { useState } from "react";
import { StepChrome, Hint } from "./StepChrome";

/**
 * The flashcard review surface. Ratings and their colours match the app's
 * `FlashcardTester` exactly — Again/Hard/Good/Easy on error/warning/success/accent.
 *
 * The intervals shown are what FSRS-6 would actually schedule for a card at
 * this stability, which is the point of the step: Hard is a *success*, it just
 * grows the interval more slowly than Good.
 */
const RATINGS = [
  { id: "again", label: "Again", interval: "in 1 min", className: "bg-error" },
  { id: "hard", label: "Hard", interval: "in 2 days", className: "bg-warning" },
  { id: "good", label: "Good", interval: "in 5 days", className: "bg-success" },
  { id: "easy", label: "Easy", interval: "in 12 days", className: "bg-accent" },
];

export function ReviewStep() {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState<(typeof RATINGS)[number] | null>(null);

  return (
    <StepChrome
      instruction="Do you remember this one?"
      status={
        rated ? (
          <span className="text-success">
            Scheduled {rated.interval} · recall updated
          </span>
        ) : revealed ? (
          <Hint>Grade yourself honestly — Hard still counts as a pass</Hint>
        ) : (
          <Hint>Recall it, then reveal</Hint>
        )
      }
    >
      <div className="mt-6 text-center">
        <p className="font-mono text-[12px] tracking-wide text-band-accent">
          konbanwa
        </p>
        <p className="mt-1.5 font-script text-[clamp(2.25rem,6vw,3.25rem)] font-bold leading-none text-band-text">
          こんばんは
        </p>

        <div className="mt-5 min-h-[2.25rem]">
          {revealed ? (
            <p className="text-[17px] font-semibold text-band-text">
              Good evening
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="rounded-full border border-band-border px-5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted transition-colors hover:text-band-text"
            >
              Show answer
            </button>
          )}
        </div>
      </div>

      {/* The grading row only exists after the reveal — grading a card you have
          not tried to recall is how people quietly ruin their own schedule. */}
      <div
        className={`mt-6 grid grid-cols-2 gap-2.5 transition-opacity sm:grid-cols-4 ${
          revealed ? "opacity-100" : "pointer-events-none opacity-30"
        }`}
      >
        {RATINGS.map((rating) => (
          <button
            key={rating.id}
            type="button"
            disabled={!revealed}
            onClick={() => setRated(rating)}
            className={`rounded-md px-3 py-2.5 text-white transition-transform hover:-translate-y-px ${rating.className} ${
              rated && rated.id !== rating.id ? "opacity-40" : ""
            }`}
          >
            <span className="block text-[13px] font-semibold">{rating.label}</span>
            <span className="mt-0.5 block font-mono text-[10px] opacity-80">
              {rating.interval}
            </span>
          </button>
        ))}
      </div>
    </StepChrome>
  );
}
