import { Link } from "react-router";
import { LINKS } from "@/links";
import { COPY } from "@/content/copy";
import { Hero } from "@/components/Hero";
import { WhyList } from "@/components/WhyList";
import { FeatureBand } from "@/components/FeatureBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useReveal, revealClasses } from "@/useReveal";
import { useSeo } from "@/useSeo";

export function Landing() {
  useSeo({
    title: "Open Lingo",
    description:
      "Structured courses, spaced-repetition flashcards, and letter practice for Korean, Japanese and Spanish. Free and open source, MIT licensed.",
    path: "/",
  });
  const closing = useReveal<HTMLDivElement>();

  return (
    <>
      <Hero />

      <div className="border-t border-border">
        <WhyList
          eyebrow={COPY.why.eyebrow}
          title={COPY.why.title}
          subtitle={COPY.why.subtitle}
          items={COPY.why.items}
        />
      </div>

      <FeatureBand />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-border pb-10">
          <div className="max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
              {COPY.open.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-bold text-text-primary">
              {COPY.open.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              {COPY.open.description}
            </p>
          </div>
          <Button href={LINKS.github} variant="outline">
            <Icon name="github" size={16} />
            {COPY.open.repoCta}
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div ref={closing.ref} className={revealClasses(closing.shown)}>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-text-primary">
            {COPY.closing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">
            {COPY.closing.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={LINKS.tryFree} size="hero">
              <Icon name="play" size={17} />
              {COPY.hero.primaryCta}
            </Button>
            <Button href={LINKS.getStarted} variant="outline" size="hero">
              {COPY.hero.secondaryCta}
              <Icon name="arrowRight" size={15} />
            </Button>
          </div>
          <p className="mt-8 text-[13px] text-text-muted">
            {COPY.closing.roadmapPrompt}{" "}
            <Link
              to="/roadmap"
              className="font-medium text-accent underline underline-offset-4"
            >
              {COPY.closing.roadmapCta}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
