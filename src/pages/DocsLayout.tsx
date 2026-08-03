import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { Icon } from "@/components/ui/Icon";

/**
 * Docs shell: nav rail on the left, page in the middle, "on this page" rail
 * supplied by the page itself on the right.
 *
 * Below lg the rail collapses into a disclosure above the content rather than
 * a slide-over — there are a handful of pages, and a drawer would be more
 * machinery than the list deserves.
 */
export function DocsLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
        {/* Left rail */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <DocsSearch />

          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            className="mt-4 flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-sm font-semibold text-text-secondary lg:hidden"
          >
            Browse docs
            <Icon
              name="arrowRight"
              size={15}
              className={navOpen ? "rotate-90 transition-transform" : "transition-transform"}
            />
          </button>

          <div className={`mt-6 ${navOpen ? "block" : "hidden"} lg:mt-8 lg:block`}>
            <DocsSidebar onNavigate={() => setNavOpen(false)} />
          </div>
        </div>

        {/* Page. Keyed on pathname so switching docs resets scroll position
            rather than landing mid-page on the next one. */}
        <div key={pathname} className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
