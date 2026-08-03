import { LINKS } from "@/links";
import { COPY, HERO_PHRASES } from "@/content/copy";
import { AnnotatedPhrase } from "./AnnotatedPhrase";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

export function Hero() {
  const { hero } = COPY;
  return (
    <section className="relative overflow-hidden">
      {/* A single soft wash behind the phrase, so the hero has depth without
          resorting to a gradient headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent-muted/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-14 text-center sm:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
          {hero.eyebrow}
        </p>

        <div className="mt-10 sm:mt-12">
          <AnnotatedPhrase phrases={HERO_PHRASES} />
        </div>

        <h1 className="mx-auto mt-12 max-w-2xl text-balance text-[clamp(1.75rem,4.2vw,2.75rem)] font-bold leading-[1.12] text-text-primary">
          {hero.lead} <span className="text-accent">{hero.leadAccent}</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-text-secondary">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={LINKS.tryFree} size="hero">
            <Icon name="play" size={17} />
            {hero.primaryCta}
          </Button>
          <Button href={LINKS.getStarted} variant="outline" size="hero">
            {hero.secondaryCta}
            <Icon name="arrowRight" size={15} />
          </Button>
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
          {hero.meta}
        </p>
      </div>
    </section>
  );
}
