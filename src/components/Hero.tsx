import { Link } from "react-router";
import { LINKS } from "@/links";
import { COPY } from "@/content/copy";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

export function Hero() {
  const { hero } = COPY;
  return (
    <section className="mx-auto max-w-5xl px-6 pb-10 pt-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-muted px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
        <Icon name="flame" size={12} />
        {hero.eyebrow}
      </span>

      <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.05] tracking-tight text-text-primary">
        {hero.headlineLead}{" "}
        <span className="text-accent">{hero.headlineAccent}</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-text-secondary">
        {hero.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <Button href={LINKS.tryFree} size="hero">
          <Icon name="play" size={18} />
          {hero.primaryCta}
        </Button>
        <Button href={LINKS.getStarted} variant="outline" size="hero">
          {hero.secondaryCta}
          <Icon name="arrowRight" size={16} />
        </Button>
      </div>

      <p className="mt-4 text-[13px] text-text-muted">{hero.meta}</p>
      <p className="mt-2 text-[13px] text-text-muted">
        {hero.languages}{" "}
        <Link to="/roadmap" className="text-accent underline">
          Roadmap
        </Link>
      </p>
    </section>
  );
}
