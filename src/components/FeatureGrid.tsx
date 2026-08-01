import type { GridItem } from "@/content/copy";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";

export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 4,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: readonly GridItem[];
  columns?: 2 | 3 | 4;
}) {
  const grid = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className={`grid gap-4 ${grid}`}>
        {items.map((item) => (
          <Card key={item.title}>
            <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-muted text-accent">
              <Icon name={item.icon} size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
