import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { searchDocs, type SearchHit } from "@/content/docsIndex";

/**
 * Docs search: an input, a result list, and arrow keys.
 *
 * The corpus is a handful of markdown files already inlined into the bundle,
 * so this searches them directly — no index to build, nothing to fetch, and
 * results appear as you type. `/` focuses it, the way every docs site does.
 */
export function DocsSearch() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const hits: SearchHit[] = query ? searchDocs(query) : [];

  useEffect(() => setActive(0), [query]);

  // `/` focuses search, unless the visitor is already typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click-away closes the results.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (hit: SearchHit) => {
    navigate(`/docs/${hit.doc.slug}`);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!hits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(hits[active]);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Search docs"
        aria-label="Search docs"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
      />

      {/* The results panel is wider than the rail it sits in — result context
          needs the room, and at 14rem every line wrapped to three. */}
      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 top-full z-30 mt-2 w-[min(24rem,calc(100vw-3rem))] overflow-hidden rounded-md border border-border bg-surface-elevated shadow-popover">
          {hits.length === 0 ? (
            <p className="px-3 py-3 text-sm text-text-muted">
              No matches for “{query.trim()}”.
            </p>
          ) : (
            <ul>
              {hits.map((hit, i) => (
                <li key={hit.doc.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(hit)}
                    className={`block w-full border-b border-border px-3 py-2.5 text-left last:border-b-0 ${
                      i === active ? "bg-accent-muted" : "hover:bg-surface-muted"
                    }`}
                  >
                    <span className="block text-[13px] font-semibold text-text-primary">
                      {hit.doc.title}
                    </span>
                    <span className="mt-0.5 block line-clamp-2 text-[12px] leading-snug text-text-secondary">
                      {hit.context}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
