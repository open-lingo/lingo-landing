import { Link } from "react-router";
import { DOC_SECTIONS } from "@/content/docsIndex";
import { useSeo } from "@/useSeo";

/** Docs landing: the same tree as the rail, with descriptions. */
export function Docs() {
  useSeo({
    title: "Docs",
    description:
      "How Open Lingo works — courses, spaced repetition, letter practice, and the placement test.",
    path: "/docs",
  });
  return (
    <div className="min-w-0">
      <h1 className="text-[clamp(1.9rem,4vw,2.5rem)] font-bold text-text-primary">
        Docs
      </h1>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-text-secondary">
        How the app works — courses, reviews, and everything else worth knowing.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {DOC_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              {section.title}
            </h2>
            <ul className="mt-3 flex flex-col divide-y divide-border border-t border-border">
              {section.docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    to={`/docs/${doc.slug}`}
                    className="group flex flex-col gap-1 py-4 transition-colors"
                  >
                    <span className="text-[15px] font-bold text-text-primary group-hover:text-accent">
                      {doc.title}
                    </span>
                    <span className="text-[14px] leading-relaxed text-text-secondary">
                      {doc.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
