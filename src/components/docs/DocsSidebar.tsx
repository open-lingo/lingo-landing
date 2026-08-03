import { NavLink } from "react-router";
import { DOC_SECTIONS } from "@/content/docsIndex";

/**
 * The docs nav tree: sections as headings, pages beneath them, current page
 * marked with an accent rail. Same list on mobile — it just moves inside a
 * disclosure instead of sitting alongside the content.
 */
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Docs" className="flex flex-col gap-6">
      {DOC_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
            {section.title}
          </p>
          <ul className="flex flex-col border-l border-border">
            {section.docs.map((doc) => (
              <li key={doc.slug}>
                <NavLink
                  to={`/docs/${doc.slug}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `-ml-px block border-l py-1.5 pl-3 text-[13.5px] transition-colors ${
                      isActive
                        ? "border-accent font-semibold text-accent"
                        : "border-transparent text-text-secondary hover:border-text-muted hover:text-text-primary"
                    }`
                  }
                >
                  {doc.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
