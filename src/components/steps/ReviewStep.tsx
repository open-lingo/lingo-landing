import { useState } from "react";
import { StepChrome, Hint } from "./StepChrome";

/**
 * The flashcard review surface, following the app's `FlashcardTester` closely:
 *
 * - the card body is itself the reveal control ("Tap to reveal")
 * - before reveal there is ONE full-width accent "Show Answer" button; the
 *   grade grid does not exist yet, it replaces that button
 * - the control row is a fixed height so the swap never shifts the layout
 *   (a real QA fix in the app — the buttons used to jump on reveal)
 * - interval hints use the app's compact format: <1d, 5d, 2mo
 *
 * Ratings and colours match `RATING_BUTTONS` in the app. Hard is a *success*:
 * it advances the card, just with slower stability growth than Good.
 */
const RATINGS = [
  { id: "again", label: "Again", hint: "<1d", className: "bg-band-error" },
  { id: "hard", label: "Hard", hint: "2d", className: "bg-band-warning" },
  { id: "good", label: "Good", hint: "5d", className: "bg-band-success" },
  { id: "easy", label: "Easy", hint: "12d", className: "bg-band-accent" },
];

export function ReviewStep() {
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState<(typeof RATINGS)[number] | null>(null);

  return (
    <StepChrome
      instruction="Review · recognition"
      status={
        rated ? (
          <span className="text-band-success">
            Graded {rated.label} · back in {rated.hint}
          </span>
        ) : flipped ? (
          <Hint>Hard still counts as a pass — it just grows slower</Hint>
        ) : (
          <Hint>Recall it before you reveal</Hint>
        )
      }
    >
      {/* The card body doubles as the reveal control, as in the app. */}
      <button
        type="button"
        onClick={() => setFlipped(true)}
        disabled={flipped}
        className="mt-6 flex min-h-[11rem] w-full flex-col items-center justify-center rounded-xl border border-band-border bg-band/40 px-5 py-6 text-center transition-colors enabled:hover:border-band-muted"
      >
        <span className="font-mono text-[12px] tracking-wide text-band-accent">
          konbanwa
        </span>
        <span className="mt-1.5 font-script text-[clamp(2.25rem,6vw,3rem)] font-bold leading-none text-band-text">
          こんばんは
        </span>

        {flipped ? (
          <>
            <span className="mt-4 h-px w-16 bg-band-border" aria-hidden />
            <span className="mt-4 text-[17px] font-semibold text-band-text">
              Good evening
            </span>
          </>
        ) : (
          <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted/60">
            Tap to reveal
          </span>
        )}
      </button>

      {/* Fixed-height control row: the Show Answer button and the grade grid
          occupy exactly the same space, so revealing never shoves the page. */}
      <div className="mt-3 flex h-24 items-stretch sm:h-16">
        {flipped ? (
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
            {RATINGS.map((rating, i) => (
              <button
                key={rating.id}
                type="button"
                onClick={() => setRated(rating)}
                className={`relative flex h-full flex-col items-center justify-center gap-0.5 rounded-xl px-3 text-sm font-semibold text-white transition ${rating.className} ${
                  rated && rated.id !== rating.id ? "opacity-40" : ""
                }`}
              >
                {/* Keyboard-shortcut keycap, as in the app (lg:+ only). */}
                <span
                  className="absolute right-1.5 top-1.5 hidden h-4 w-4 items-center justify-center rounded bg-black/15 text-[10px] font-bold leading-none lg:flex"
                  aria-hidden
                >
                  {i + 1}
                </span>
                {rating.label}
                <span className="text-[10px] opacity-80">{rating.hint}</span>
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="flex h-full w-full items-center justify-center rounded-xl bg-band-accent px-6 text-base font-semibold text-white transition hover:opacity-90"
          >
            Show Answer
          </button>
        )}
      </div>
    </StepChrome>
  );
}
