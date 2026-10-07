// Post-OCR correction: snaps misread words to known ingredient vocabulary ("Sodlum" → "Sodium")
// and reports which parsed ingredients already have profiles in the library.

import { normalizeKey } from "../../shared/parse";
import { editDistance } from "../../shared/textmatch";
import { api } from "./api";

export interface Lexicon {
  phrases: Map<string, string>;
  words: Set<string>;
  byInitial: Map<string, string[]>;
}

// Common words on ingredient labels that aren't ingredient names on their own.
const LABEL_WORDS = `water aqua sugar salt flour wheat enriched bleached unbleached milk cream whey butter egg eggs soy soybean canola corn
sunflower olive palm coconut oil oils extract juice concentrate puree powder dried dehydrated natural artificial flavor flavors flavour
flavoring color colors colour coloring organic modified food starch syrup solids cane beet brown honey molasses maltodextrin dextrose
fructose glucose lactose vinegar yeast baking soda leavening sodium potassium calcium magnesium iron zinc chloride citrate phosphate
sulfate sulphate carbonate bicarbonate hydroxide oxide acid acids vitamin mononitrate riboflavin niacin thiamine folic reduced gum xanthan
guar cellulose lecithin mono diglycerides glycerides stearate palmitate laurate benzoate sorbate nitrite propionate alcohol glycol glycerin
glyceryl cetyl stearyl cetearyl lauryl laureth sulfate betaine cocamidopropyl coco glucoside caprylic capric triglyceride dimethicone
fragrance parfum limonene linalool citral geraniol citronellol phenoxyethanol ethylhexylglycerin paraben tocopherol tocopheryl acetate
retinol retinyl niacinamide panthenol hyaluronate hyaluronic allantoin aloe barbadensis leaf shea butyrospermum parkii seed kernel fruit
flower root bark peel denat isopropyl benzalkonium edta disodium tetrasodium titanium dioxide mica oxides carbomer acrylates copolymer
polymer polysorbate cocoa chocolate vanilla vanillin spice spices garlic onion pepper paprika turmeric annatto beta carotene caramel red
yellow blue lake contains less than ingredients certified preservative freshness protect`
  .split(/\s+/)
  .filter(Boolean);

let lexiconPromise: Promise<Lexicon> | null = null;

export function loadLexicon(): Promise<Lexicon> {
  lexiconPromise ??= api
    .lexicon()
    .then(({ entries }) => buildLexicon(entries))
    .catch(() => buildLexicon([]));
  return lexiconPromise;
}

function buildLexicon(entries: [string, string][]): Lexicon {
  const phrases = new Map(entries);
  const words = new Set(LABEL_WORDS);
  for (const [key] of entries) for (const w of key.split(" ")) if (w.length >= 3 && /^[a-z]+$/.test(w)) words.add(w);
  const byInitial = new Map<string, string[]>();
  for (const w of words) byInitial.set(w[0], [...(byInitial.get(w[0]) ?? []), w]);
  return { phrases, words, byInitial };
}

function matchCase(original: string, replacement: string): string {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

export interface Correction {
  from: string;
  to: string;
}

/** Replaces likely OCR misreads with the closest known label word. Conservative: only clear, unique matches. */
export function correctText(text: string, lex: Lexicon): { text: string; corrections: Correction[] } {
  const corrections: Correction[] = [];
  const out = text.replace(/[A-Za-z0-9][A-Za-z0-9|]{3,}/g, (word) => {
    const lower = word.toLowerCase().replace(/[|1]/g, (c) => (c === "|" ? "l" : c));
    if (lex.words.has(lower) || /^\d+$/.test(word) || /^e\d{3}/i.test(word)) return word;
    const candidates = lex.byInitial.get(lower[0]) ?? [];
    const tolerance = lower.length >= 8 ? 1.2 : 0.8;
    let best: { w: string; d: number } | null = null;
    let tie = false;
    for (const c of candidates) {
      if (Math.abs(c.length - lower.length) > 2) continue;
      const d = editDistance(lower, c);
      if (d > tolerance) continue;
      if (!best || d < best.d) {
        best = { w: c, d };
        tie = false;
      } else if (d === best.d) tie = true;
    }
    if (!best || tie) return word;
    const fixed = matchCase(word, best.w);
    if (fixed !== word) corrections.push({ from: word, to: fixed });
    return fixed;
  });
  return { text: out, corrections };
}

/** Whether a parsed ingredient (key plus alternate keys) is already in the library. */
export function inLibrary(keys: string[], lex: Lexicon): boolean {
  return keys.some((k) => lex.phrases.has(k) || lex.phrases.has(normalizeKey(k)));
}
