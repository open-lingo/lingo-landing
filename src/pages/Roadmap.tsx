import { LANES, itemsInLane, ROADMAP_ITEMS } from "@/content/roadmap";
import { RoadmapLane } from "@/components/RoadmapLane";
import { useSeo } from "@/useSeo";

export function Roadmap() {
  useSeo({
    title: "Roadmap",
    description:
      "What has shipped, what is being built, and what is queued behind it. No dates — the order is the commitment.",
    path: "/roadmap",
  });
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="max-w-2xl border-b border-border pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {ROADMAP_ITEMS.length} things, no dates
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.05] text-text-primary">
          Roadmap
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
          What has shipped, what is being built, and what is queued behind it.
          Dated promises from a small team age badly, so there are none here —
          the order is the commitment.
        </p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
        {LANES.map((lane) => (
          <RoadmapLane
            key={lane.id}
            lane={lane.id}
            label={lane.label}
            icon={lane.icon}
            items={itemsInLane(lane.id)}
          />
        ))}
      </div>
    </section>
  );
}
