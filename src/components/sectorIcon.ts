import { Apple, Sparkles, SprayCan } from "lucide-react";
import type { Sector } from "../../shared/types";

export const SECTOR_ICON: Record<Sector, typeof Apple> = { food: Apple, beauty: Sparkles, cleaning: SprayCan };
