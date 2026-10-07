// Matches parsed label names to ingredients in the central database, tolerating OCR errors
// ("Sodlum Benzoate"), qualifiers ("Purified Water") and plurals.

import { aliasIndex } from "../repo";
import { editDistance } from "../../shared/textmatch";

export { editDistance };
import type { ParsedIngredient } from "../../shared/parse";
import type { MatchKind } from "../../shared/types";

const QUALIFIERS =
  /\b(purified|deionized|demineralized|filtered|distilled|pure|refined|unrefined|cold pressed|expeller pressed|virgin|extra virgin|food grade|powdered|ground|dried|dehydrated|natural|fresh|raw|whole|granulated|anhydrous|usp|fcc|nf)\b/g;

function variants(key: string): string[] {
  const out = new Set<string>([key]);
  const stripped = key.replace(QUALIFIERS, " ").replace(/\s+/g, " ").trim();
  if (stripped) out.add(stripped);
  for (const k of [...out]) {
    if (k.endsWith("s") && k.length > 4) out.add(k.slice(0, -1));
    else out.add(`${k}s`);
    if (k.endsWith("es") && k.length > 5) out.add(k.slice(0, -2));
  }
  return [...out];
}

export interface MatchResult {
  ingredientId: string | null;
  match: MatchKind;
}

export function matchIngredient(p: ParsedIngredient): MatchResult {
  const index = aliasIndex();
  if (index.has(p.key)) return { ingredientId: index.get(p.key)!, match: "exact" };
  for (const k of [...p.alt, ...variants(p.key), ...p.alt.flatMap(variants)]) {
    if (index.has(k)) return { ingredientId: index.get(k)!, match: "alias" };
  }
  // Fuzzy: short names only tolerate OCR-confusable swaps (so "Retinol" never becomes "Retinal");
  // longer names also allow one genuine typo ("Sodium Laurel Sulfate").
  if (p.key.length >= 7) {
    const tolerance = p.key.length >= 16 ? 1.8 : 0.8;
    let best: { id: string; d: number } | null = null;
    for (const [k, id] of index) {
      if (Math.abs(k.length - p.key.length) > 2 || k[0] !== p.key[0]) continue;
      const d = editDistance(p.key, k);
      if (d <= tolerance && (!best || d < best.d)) best = { id, d };
    }
    if (best) return { ingredientId: best.id, match: "fuzzy" };
  }
  return { ingredientId: null, match: "new" };
}

/** Rejects OCR fragments and sentences before we spend API calls researching them. */
export function isPlausibleIngredient(name: string): boolean {
  const letters = name.replace(/[^A-Za-z]/g, "").length;
  const words = name.trim().split(/\s+/).length;
  if (letters < 3 || name.length > 72 || words > 8) return false;
  if (letters / name.replace(/\s/g, "").length < 0.6) return false;
  if (/\b(you|your|our|we|this product|please|call|visit|keep|use|store|made with|free from|no artificial)\b/i.test(name)) return false;
  // Mostly consonant runs like "Xkcdtqz" come from OCR noise.
  if (!/[aeiouy]/i.test(name)) return false;
  return true;
}
