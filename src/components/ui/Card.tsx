import type { ReactNode } from "react";

export function Card({
  children,
  padding = "md",
  className = "",
}: {
  children: ReactNode;
  padding?: "md" | "lg";
  className?: string;
}) {
  const pad = padding === "lg" ? "p-8" : "p-5";
  return (
    <div
      className={`rounded-lg border border-border bg-surface shadow-card ${pad} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
