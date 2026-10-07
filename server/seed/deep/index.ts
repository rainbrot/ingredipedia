import type { DeepProfile } from "../types";
import { BEAUTY_DEEP_1 } from "./beauty1";
import { BEAUTY_DEEP_2 } from "./beauty2";
import { BEAUTY_DEEP_3 } from "./beauty3";
import { CLEANING_DEEP_1 } from "./cleaning1";
import { CLEANING_DEEP_2 } from "./cleaning2";
import { FOOD_DEEP_1 } from "./food1";
import { FOOD_DEEP_2 } from "./food2";
import { FOOD_DEEP_3 } from "./food3";
import { FOOD_DEEP_4 } from "./food4";

/** Long-form teaching content for every curated ingredient, keyed by ingredient id. */
export const DEEP: Record<string, DeepProfile> = {
  ...FOOD_DEEP_1,
  ...FOOD_DEEP_2,
  ...FOOD_DEEP_3,
  ...FOOD_DEEP_4,
  ...BEAUTY_DEEP_1,
  ...BEAUTY_DEEP_2,
  ...BEAUTY_DEEP_3,
  ...CLEANING_DEEP_1,
  ...CLEANING_DEEP_2,
};
