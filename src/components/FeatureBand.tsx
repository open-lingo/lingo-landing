import { COPY } from "@/content/copy";
import { useReveal, revealClasses, revealDelay } from "@/useReveal";
import { StepShowcase } from "./StepShowcase";
import { Icon } from "./ui/Icon";

/**
 * The page's one inverted section. It carries both the interactive lesson mock
 * and the feature list, so the value break lands on the most concrete content
 * rather than on another wall of prose.
 */
export function FeatureBand() {
  const list = useReveal<HTMLDivElement>();

  return (
    <section className="bg-band text-band-text">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <StepShowcase />

        <div className="mt-20 border-t border-band-border pt-14 sm:mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-band-accent">
            {COPY.features.eyebrow}
          </p>
          <h2 className="mt-3 max-w-lg text-[clamp(1.5rem,3vw,2.125rem)] font-extrabold leading-[1.12] tracking-tight text-band-text">
            {COPY.features.title}
          </h2>

          {/* Hairline-divided columns, not floating boxes — the divider does
              the separating so nothing needs a border on four sides. */}
          <div
            ref={list.ref}
            className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {COPY.features.items.map((item, i) => (
              <div
                key={item.title}
                style={revealDelay(i)}
                className={`border-t border-band-border pt-5 ${revealClasses(list.shown)}`}
              >
                <span className="text-band-accent">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="mt-3 text-[15px] font-bold tracking-tight text-band-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-band-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
