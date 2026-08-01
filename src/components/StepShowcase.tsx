import { useState } from "react";
import { COPY } from "@/content/copy";
import { useReveal, revealClasses } from "@/useReveal";
import { VocabStep } from "./steps/VocabStep";
import { ReviewStep } from "./steps/ReviewStep";
import { BuildStep } from "./steps/BuildStep";

/**
 * Three real step types, running live on the page.
 *
 * Describing the interface persuades nobody — letting someone answer a
 * vocabulary question, grade a review, and assemble a sentence does. The step
 * count at the bottom is the honest "and more": the course has 27 step types
 * (`lingo/src/features/lesson/types.ts`), and these are three of them.
 */
const TABS = [
  { id: "vocab", label: "Vocabulary", node: <VocabStep /> },
  { id: "review", label: "Review", node: <ReviewStep /> },
  { id: "build", label: "Build a sentence", node: <BuildStep /> },
];

export function StepShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const { ref, shown } = useReveal<HTMLDivElement>();
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div ref={ref} className={revealClasses(shown)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-band-accent">
          {COPY.demo.eyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-band-text">
          {COPY.demo.title}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-band-muted">
          {COPY.demo.description}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {/* Tabs sit on the card's top edge so the whole thing reads as one
            device rather than a control bar floating above a box. */}
        <div
          role="tablist"
          aria-label="Lesson step types"
          className="flex flex-wrap gap-1"
        >
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`step-panel-${tab.id}`}
                id={`step-tab-${tab.id}`}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-t-md border-x border-t px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  selected
                    ? "border-band-border bg-band-surface text-band-text"
                    : "border-transparent text-band-muted hover:text-band-text"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`step-panel-${current.id}`}
          aria-labelledby={`step-tab-${current.id}`}
          className="overflow-hidden rounded-b-md rounded-tr-md border border-band-border bg-band-surface shadow-popover"
        >
          {/* Session chrome — the X and progress bar, as in the real player. */}
          <div className="flex items-center gap-3 border-b border-band-border px-4 py-3">
            <span className="font-mono text-[13px] leading-none text-band-muted">
              ✕
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-band/60">
              <div className="h-full w-[38%] rounded-full bg-band-accent" />
            </div>
            <span className="font-mono text-[11px] text-band-muted">3 / 8</span>
          </div>

          {current.node}
        </div>

        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-band-muted/70">
          {COPY.demo.more}
        </p>
      </div>
    </div>
  );
}
