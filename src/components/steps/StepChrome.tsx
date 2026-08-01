import type { ReactNode } from "react";

/** Shared frame for an embedded step: instruction line, body, status line. */
export function StepChrome({
  instruction,
  children,
  status,
}: {
  instruction: string;
  children: ReactNode;
  status: ReactNode;
}) {
  return (
    <div className="px-5 py-7 sm:px-8 sm:py-8">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-band-muted">
        {instruction}
      </p>
      {children}
      <p
        className="mt-6 min-h-5 text-center font-mono text-[11px] uppercase tracking-[0.1em]"
        aria-live="polite"
      >
        {status}
      </p>
    </div>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <span className="text-band-muted/60">{children}</span>;
}
