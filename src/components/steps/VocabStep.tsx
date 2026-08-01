import { useState } from "react";
import { Icon } from "../ui/Icon";
import { StepChrome, Hint } from "./StepChrome";

/** Mirrors the app's `word_image_mcq` / `multiple_choice` step. */
const OPTIONS = [
  { id: "a", label: "Good evening", correct: false },
  { id: "b", label: "Hello / good afternoon", correct: true },
  { id: "c", label: "Goodbye", correct: false },
  { id: "d", label: "Thank you", correct: false },
];

export function VocabStep() {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = OPTIONS.find((o) => o.id === picked)?.correct ?? false;

  return (
    <StepChrome
      instruction="Choose the meaning"
      status={
        answered ? (
          correct ? (
            <span className="text-success">Correct — next review in 3 days</span>
          ) : (
            <span className="text-band-accent">
              Not quite — this one comes back sooner
            </span>
          )
        ) : (
          <Hint>Pick one</Hint>
        )
      }
    >
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
    </StepChrome>
  );
}
