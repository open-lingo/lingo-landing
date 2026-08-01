import {
  ArrowRight,
  BookOpen,
  BookText,
  CircleCheck,
  CircleDot,
  Flame,
  Github,
  GraduationCap,
  Layers,
  Moon,
  Pencil,
  Play,
  Sun,
} from "lucide-react";

/** Curated icon set — add here rather than importing lucide-react directly. */
const ICONS = {
  arrowRight: ArrowRight,
  bookOpen: BookOpen,
  bookText: BookText,
  circleCheck: CircleCheck,
  circleDot: CircleDot,
  flame: Flame,
  github: Github,
  graduationCap: GraduationCap,
  layers: Layers,
  moon: Moon,
  pencil: Pencil,
  play: Play,
  sun: Sun,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Glyph = ICONS[name];
  return <Glyph size={size} className={className} aria-hidden />;
}
