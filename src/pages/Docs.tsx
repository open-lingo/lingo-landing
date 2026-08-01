import { Link } from "react-router";
import { DOCS } from "@/content/docsIndex";
import { Card } from "@/components/ui/Card";

export function Docs() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-text-primary">Docs</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-secondary">
        How the app works — courses, reviews, and everything else worth knowing.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {DOCS.map((doc) => (
          <Link key={doc.slug} to={`/docs/${doc.slug}`} className="block">
            <Card className="h-full transition-colors hover:border-accent">
              <h2 className="text-[15px] font-bold text-text-primary">{doc.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {doc.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
