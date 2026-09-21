import {
  Gem,
  HeartHandshake,
  Scissors,
  Sparkles,
  SprayCan,
  Star,
  Users,
  Flower2,
} from "lucide-react";
import { cn } from "../../lib/utils";

export type LineIconName =
  | "gem"
  | "users"
  | "star"
  | "heart"
  | "leaf"
  | "scissors"
  | "sparkle"
  | "camera"
  | "flame"
  | "drop";

const ICONS: Record<LineIconName, typeof Gem> = {
  gem: Gem,
  users: Users,
  star: Star,
  heart: HeartHandshake,
  leaf: Flower2,
  scissors: Scissors,
  sparkle: Sparkles,
  camera: SprayCan,
  flame: Sparkles,
  drop: Sparkles,
};

export function LineIcon({ name, className }: { name: LineIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={cn("h-5 w-5", className)} strokeWidth={1.4} aria-hidden />;
}
