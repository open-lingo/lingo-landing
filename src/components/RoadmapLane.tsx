import type { Lane, RoadmapItem } from "@/content/roadmap";
import type { IconName } from "./ui/Icon";
import { useReveal, revealClasses, revealDelay } from "@/useReveal";
import { Icon } from "./ui/Icon";

/**
 * A lane is a column with its own rail, not a stack of identical boxes.
 *
 * Three columns of the same bordered card gave the three states no visual
 * difference at all — the only thing distinguishing "shipped" from "planned"
 * was a word at the top. Now each lane carries its own rail colour, and the
 * items sit against that rail as rows: shipped is solid and confident, planned
 * is a dashed rail and quieter type. The treatment encodes the state.
 */

const LANE_STYLES: Record<
  Lane,
  { rail: string; dot: string; label: string; title: string; body: string }
> = {
  shipped: {
    rail: "border-l border-success/40",
    dot: "bg-success",
    label: "text-success",
    title: "text-text-primary",
    body: "text-text-secondary",
  },
  "in-progress": {
    rail: "border-l border-accent/50",
    dot: "bg-accent",
    label: "text-accent",
    title: "text-text-primary",
    body: "text-text-secondary",
  },
  planned: {
    rail: "border-l border-dashed border-border",
    dot: "bg-text-muted/50",
    label: "text-text-muted",
    title: "text-text-secondary",
    body: "text-text-muted",
  },
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
  const { ref, shown } = useReveal<HTMLDivElement>();
  const s = LANE_STYLES[lane];

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline justify-between gap-3 pb-4">
        <h2
          className={`flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${s.label}`}
        >
          <Icon name={icon} size={14} />
          {label}
        </h2>
        <span className="font-mono text-[11px] tabular-nums text-text-muted">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className={`flex flex-col gap-7 pl-5 ${s.rail}`}>
        {items.map((item, i) => (
          <article
            key={item.title}
            style={revealDelay(i)}
            className={`relative ${revealClasses(shown)}`}
          >
            {/* Node on the rail — the only decoration, and it marks position. */}
            <span
              className={`absolute -left-[1.4375rem] top-1.5 h-2 w-2 rounded-full ring-4 ring-background ${s.dot}`}
              aria-hidden
            />
            <h3
              className={`text-[15px] font-bold leading-snug tracking-tight ${s.title}`}
            >
              {item.title}
            </h3>
            <p className={`mt-1.5 text-[14px] leading-relaxed ${s.body}`}>
              {item.description}
            </p>
            {item.tags && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
