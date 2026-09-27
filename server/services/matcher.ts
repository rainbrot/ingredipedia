// Matches parsed label names to ingredients in the central database, tolerating OCR errors
// ("Sodlum Benzoate"), qualifiers ("Purified Water") and plurals.

import { aliasIndex } from "../repo";
import type { ParsedIngredient } from "../../shared/parse";
import type { MatchKind } from "../../shared/types";

const QUALIFIERS =
  /\b(purified|deionized|demineralized|filtered|distilled|pure|refined|unrefined|cold pressed|expeller pressed|virgin|extra virgin|food grade|powdered|ground|dried|dehydrated|natural|fresh|raw|whole|granulated|anhydrous|usp|fcc|nf)\b/g;

// Character pairs OCR engines commonly confuse; substituting within a pair costs less than a real edit.
const CONFUSABLE = ["il", "i1", "l1", "o0", "s5", "b8", "ec", "ce", "uv", "nm", "rn", "gq", "z2"];
function subCost(x: string, y: string): number {
  if (x === y) return 0;
  return CONFUSABLE.includes(x + y) || CONFUSABLE.includes(y + x) ? 0.4 : 1;
}

/** Weighted optimal string alignment distance tuned for OCR errors. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return Math.max(m, n);
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + subCost(a[i - 1], b[j - 1]));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}

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
