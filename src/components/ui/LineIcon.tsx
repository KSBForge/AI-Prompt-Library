import { ChefHat, Gem, HeartHandshake, Sprout, Star, Users } from "lucide-react";
import { cn } from "../../lib/utils";

export type LineIconName = "chef" | "leaf" | "heart" | "gem" | "users" | "star";

const ICONS: Record<LineIconName, typeof ChefHat> = {
  chef: ChefHat,
  leaf: Sprout,
  heart: HeartHandshake,
  gem: Gem,
  users: Users,
  star: Star,
};

export function LineIcon({ name, className }: { name: LineIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={cn("h-5 w-5", className)} strokeWidth={1.4} aria-hidden />;
}
