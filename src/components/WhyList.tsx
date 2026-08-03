import type { GridItem } from "@/content/copy";
import { useReveal, revealClasses, revealDelay } from "@/useReveal";
import { Icon } from "./ui/Icon";

/**
 * The "why" section as an editorial column rather than a row of equal cards.
 *
 * Four boxed cards give every argument identical visual weight and read as a
 * template; a ruled list with a sticky heading lets the section behave like
 * prose, which is what these four items actually are.
 */
export function WhyList({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: readonly GridItem[];
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1] text-text-primary">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        </div>

        <div ref={ref} className="flex flex-col">
          {items.map((item, i) => (
            <article
              key={item.title}
              style={revealDelay(i)}
              className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-border py-7 first:border-t-0 first:pt-0 ${revealClasses(shown)}`}
            >
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-accent-muted text-accent">
                <Icon name={item.icon} size={18} />
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
