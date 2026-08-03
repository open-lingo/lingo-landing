import { useEffect, useState } from "react";
import type { DocHeading } from "@/content/docsIndex";

/**
 * "On this page" rail. Highlights the heading currently in view so the reader
 * keeps their place in a long page; hidden below xl where there is no room for
 * a third column.
 */
export function DocToc({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (!headings.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost heading currently on screen wins; falling back to the
        // last one that scrolled past keeps something lit while between
        // headings.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
        On this page
      </p>
      <ul className="flex flex-col border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-1 pl-3 text-[13px] leading-snug transition-colors ${
                activeId === h.id
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:border-text-muted hover:text-text-secondary"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
