import { useState } from "react";
import { StepChrome, Hint } from "./StepChrome";

/** Mirrors the app's `build_sentence` step: tap tiles to assemble the answer. */
const ANSWER = ["わたし", "は", "がくせい", "です"];
const TILES = ["です", "わたし", "がくせい", "は"];

export function BuildStep() {
  const [placed, setPlaced] = useState<string[]>([]);
  const complete = placed.length === ANSWER.length;
  const correct = complete && placed.every((w, i) => w === ANSWER[i]);

  const remaining = [...TILES];
  for (const word of placed) {
    const i = remaining.indexOf(word);
    if (i !== -1) remaining.splice(i, 1);
  }

  return (
    <StepChrome
      instruction="Build: I am a student"
      status={
        complete ? (
          correct ? (
            <span className="text-success">Correct — は marks the topic</span>
          ) : (
            <span className="text-band-accent">
              Word order is off — tap a tile to take it back
            </span>
          )
        ) : (
          <Hint>Tap the words in order</Hint>
        )
      }
    >
      {/* The answer line. Underlined slots so the sentence length is visible
          before it is filled — the real step does the same. */}
      <div className="mt-6 flex min-h-[4.5rem] flex-wrap items-center justify-center gap-2 rounded-md border border-dashed border-band-border px-4 py-4">
        {placed.length === 0 && (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted/50">
            Your sentence
          </span>
        )}
        {placed.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => setPlaced(placed.filter((_, j) => j !== i))}
            className={`rounded-md border px-3 py-2 font-script text-[18px] font-semibold transition-colors ${
              complete
                ? correct
                  ? "border-success bg-success/10 text-band-text"
                  : "border-band-accent bg-band-accent/10 text-band-text"
                : "border-band-border bg-band/40 text-band-text hover:border-band-muted"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {remaining.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => setPlaced([...placed, word])}
            className="rounded-md border border-band-border px-3.5 py-2 font-script text-[18px] font-semibold text-band-muted transition-colors hover:border-band-muted hover:text-band-text"
          >
            {word}
          </button>
        ))}
        {remaining.length === 0 && (
          <button
            type="button"
            onClick={() => setPlaced([])}
            className="rounded-full border border-band-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted transition-colors hover:text-band-text"
          >
            Reset
          </button>
        )}
      </div>
    </StepChrome>
  );
}
