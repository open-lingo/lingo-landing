import { Link } from "react-router";
import { LINKS } from "@/links";
import { COPY } from "@/content/copy";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export function Landing() {
  return (
    <>
      <Hero />

      <FeatureGrid
        eyebrow={COPY.why.eyebrow}
        title={COPY.why.title}
        subtitle={COPY.why.subtitle}
        items={COPY.why.items}
        columns={4}
      />

      <div className="border-t border-border">
        <FeatureGrid
          eyebrow={COPY.features.eyebrow}
          title={COPY.features.title}
          subtitle={COPY.features.subtitle}
          items={COPY.features.items}
          columns={2}
        />
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Card
            padding="lg"
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div className="min-w-[16rem] flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                {COPY.open.eyebrow}
              </p>
              <h3 className="mt-1.5 text-[22px] font-extrabold text-text-primary">
                {COPY.open.title}
              </h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-text-secondary">
                {COPY.open.description}
              </p>
            </div>
            <Button href={LINKS.github} variant="outline">
              <Icon name="github" size={16} />
              {COPY.open.repoCta}
            </Button>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 text-center">
        <h2 className="text-[28px] font-extrabold text-text-primary">
          {COPY.closing.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-text-secondary">
          {COPY.closing.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <Button href={LINKS.tryFree} size="hero">
            <Icon name="play" size={18} />
            {COPY.hero.primaryCta}
          </Button>
          <Button href={LINKS.getStarted} variant="outline" size="hero">
            {COPY.hero.secondaryCta}
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
        <p className="mt-6 text-[13px] text-text-muted">
          {COPY.closing.roadmapPrompt}{" "}
          <Link to="/roadmap" className="text-accent underline">
            {COPY.closing.roadmapCta}
          </Link>
        </p>
      </section>
    </>
  );
}
