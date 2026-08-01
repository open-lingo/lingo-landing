import type { Lane, RoadmapItem } from "@/content/roadmap";
import type { IconName } from "./ui/Icon";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";

const ACCENT: Record<Lane, string> = {
  shipped: "text-success",
  "in-progress": "text-accent",
  planned: "text-text-muted",
};

export function RoadmapLane({
  lane,
  label,
  icon,
  items,
}: {
  lane: Lane;
  label: string;
  icon: IconName;
  items: RoadmapItem[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2
        className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${ACCENT[lane]}`}
      >
        <Icon name={icon} size={16} />
        {label}
      </h2>

      {items.map((item) => (
        <Card key={item.title}>
          <h3 className="text-[15px] font-bold text-text-primary">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            {item.description}
          </p>
          {item.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
