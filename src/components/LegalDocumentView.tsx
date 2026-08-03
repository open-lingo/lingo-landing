import type { LegalDocument } from "@/content/legal";

export function LegalDocumentView({
  document,
  lastUpdated,
}: {
  document: LegalDocument;
  lastUpdated?: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary">
        {document.title}
      </h1>
      {lastUpdated && (
        <p className="mt-2 text-sm text-text-muted">Last updated {lastUpdated}</p>
      )}
      <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
        {document.summary}
      </p>

      {document.sections.map((section) => (
        <section key={section.id} className="mt-10">
          <h2 className="text-xl font-bold text-text-primary">{section.title}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="mt-3 text-[15px] leading-relaxed text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {section.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="ml-5 list-disc text-[15px] leading-relaxed text-text-secondary"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
