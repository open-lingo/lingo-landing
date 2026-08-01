import { LANES, itemsInLane } from "@/content/roadmap";
import { RoadmapLane } from "@/components/RoadmapLane";

export function Roadmap() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-text-primary">
          Roadmap
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          What has shipped, what is being built, and what is queued. No dates —
          this is a small team, and dated promises age badly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
