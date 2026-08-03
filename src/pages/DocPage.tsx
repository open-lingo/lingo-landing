import { Link, useParams } from "react-router";
import Markdown from "react-markdown";
import { getDoc, getNeighbours, headingId } from "@/content/docsIndex";
import { DocToc } from "@/components/docs/DocToc";
import { Icon } from "@/components/ui/Icon";

export function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getDoc(slug) : undefined;

  if (!doc) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold text-text-primary">Doc not found</h1>
        <p className="mt-3 text-text-secondary">
          <Link to="/docs" className="text-accent underline">
            Back to the docs index
          </Link>
        </p>
      </section>
    );
  }

  const { prev, next } = getNeighbours(doc.slug);

  return (
    <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,12rem)]">
      <article className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          {doc.section}
        </p>
        <h1 className="mt-2 text-[clamp(1.9rem,4vw,2.5rem)] font-bold leading-tight text-text-primary">
          {doc.title}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-text-secondary">
          {doc.description}
        </p>

        <div className="mt-10 flex flex-col gap-4 text-[15px] leading-relaxed text-text-secondary [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-text-primary">
          <Markdown
            components={{
              // Anchored so the "on this page" rail and deep links both work.
              h2: ({ children }) => {
                const text = String(children);
                return (
                  <h2
                    id={headingId(text)}
                    className="group mt-8 scroll-mt-24 text-xl font-bold text-text-primary"
                  >
                    {children}{" "}
                    <a
                      href={`#${headingId(text)}`}
                      aria-label={`Link to ${text}`}
                      className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      #
                    </a>
                  </h2>
                );
              },
            }}
          >
            {doc.body}
          </Markdown>
        </div>

        {(prev || next) && (
          <nav
            aria-label="Nearby pages"
            className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                to={`/docs/${prev.slug}`}
                className="group rounded-md border border-border p-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                  <Icon name="arrowRight" size={13} className="rotate-180" />
                  Previous
                </span>
                <span className="mt-1 block text-[14px] font-semibold text-text-primary">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/docs/${next.slug}`}
                className="group rounded-md border border-border p-4 text-right transition-colors hover:border-accent sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                  Next
                  <Icon name="arrowRight" size={13} />
                </span>
                <span className="mt-1 block text-[14px] font-semibold text-text-primary">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start">
        <DocToc headings={doc.headings} />
      </aside>
    </div>
  );
}
