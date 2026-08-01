import { Link, useParams } from "react-router";
import Markdown from "react-markdown";
import { getDoc } from "@/content/docsIndex";

export function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getDoc(slug) : undefined;

  if (!doc) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-black text-text-primary">Doc not found</h1>
        <p className="mt-3 text-text-secondary">
          <Link to="/docs" className="text-accent underline">
            Back to the docs index
          </Link>
        </p>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/docs" className="text-sm font-semibold text-accent">
        Docs
      </Link>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">
        {doc.title}
      </h1>
      <p className="mt-3 text-[15px] text-text-secondary">{doc.description}</p>

      {/* Descendant selectors rather than @tailwindcss/typography — five pages
          do not justify the plugin. */}
      <div className="mt-10 flex flex-col gap-4 text-[15px] leading-relaxed text-text-secondary [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-text-primary">
        <Markdown>{doc.body}</Markdown>
      </div>
    </article>
  );
}
