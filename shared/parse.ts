// Turns raw OCR text from a product label into a clean, ordered ingredient list.
// Runs on both the client (live preview while the user edits) and the server (authoritative parse).

export interface ParsedIngredient {
  /** 1-based label position; earlier ingredients are present in higher amounts. */
  position: number;
  raw: string;
  /** Display name with the "organic" qualifier removed. */
  name: string;
  /** Normalized lookup key for `name`. */
  key: string;
  /** Extra lookup keys (parenthetical synonyms like "Aqua (Water)", combined forms). */
  alt: string[];
  labeledOrganic: boolean;
}

const KEYWORD = /\b(?:(?:in)?active\s+)?in[gq]r[eé]d[il1|]ents?\b\s*(?:list)?\s*[:.\-–]?/gi;

const STOP = new RegExp(
  [
    String.raw`\bcontains\s*:`,
    String.raw`\bcontains\s+(?:milk|eggs?|wheat|soy|peanuts?|tree\s+nuts?|fish|shellfish|sesame)\b`,
    String.raw`\ballerg(?:en|y)\b`,
    String.raw`\bnutrition\s+facts\b`,
    String.raw`\bsupplement\s+facts\b`,
    String.raw`\bdistributed\s+(?:by|for)\b`,
    String.raw`\bmanufactured\s+(?:by|for)\b`,
    String.raw`\bmade\s+in\b`,
    String.raw`\bproduct\s+of\b`,
    String.raw`\bwarnings?\s*:`,
    String.raw`\bcaution\b`,
    String.raw`\bdanger\b`,
    String.raw`\bdirections\b`,
    String.raw`\bkeep\s+out\s+of\b`,
    String.raw`\bnet\s+(?:wt|weight|contents|vol)\b`,
    String.raw`\bquestions\b`,
    String.raw`\bstore\s+(?:in|at|below)\b`,
    String.raw`\bbest\s+(?:before|by)\b`,
    String.raw`\bmay\s+contain\b`,
    String.raw`\bproduced\s+in\s+a\s+facility\b`,
    String.raw`\bprocessed\s+in\s+a\b`,
    String.raw`\bwww\.`,
    String.raw`\bhttps?:`,
    String.raw`\buses\s*:`,
    String.raw`\bpurpose\b`,
    String.raw`\bfirst\s+aid\b`,
    String.raw`\brecycl`,
    String.raw`\blot\s*(?:no|#)`,
  ].join("|"),
  "i",
);

const PURPOSE_WORDS =
  /^(?:(?:as\s+)?(?:a\s+)?(?:preservative|preservatives|emulsifier|emulsifiers|antioxidant|antioxidants|color|colour|colors|colour?ing|flavou?r(?:ing)?|thickener|stabilizer|stabiliser|acidity regulator|sweetener|humectant|leavening|anticaking agent|anti-caking agent|firming agent|dough conditioner|vitamin [a-z0-9]+|for color|for colour|for flavou?r|for freshness|to preserve freshness|to protect flavou?r|to maintain color|to retain moisture|to prevent caking|dried|powder|added)|\d+(?:\.\d+)?\s*%)$/i;

const TRAILING_PURPOSE =
  /\s+(?:to|for)\s+(?:preserve|maintain|retain|protect|promote|prevent|help|keep|ensure|improve|add|enhance|color|colour|freshness|flavou?r)\b.*$/i;

const NOISE = new Set([
  "ingredients",
  "ingredient",
  "inactive",
  "active",
  "and",
  "or",
  "other",
  "other ingredients",
  "purpose",
  "contains",
  "the following",
  "less than",
  "or less of",
]);

const ACRONYMS = new Set([
  "bha", "bht", "tbhq", "edta", "peg", "ppg", "mea", "dea", "tea", "msg", "hfcs", "fd&c", "d&c", "usp", "nf",
  "ci", "dmdm", "aha", "sls", "sles", "hcl", "ii", "iii", "iv", "uv", "dna", "pvp", "pvm", "ma", "cbd", "ph",
  "mit", "mci", "las", "pca", "sd", "q10", "coq10",
]);

/** Lowercase, strip accents and punctuation, and canonicalize E-numbers so labels and aliases compare cleanly. */
export function normalizeKey(input: string): string {
  let s = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’'`´]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const eNum = s.match(/^(?:e|ins)\s?(\d{3,4}[a-z]?)$/);
  if (eNum) s = `e${eNum[1]}`;
  // British and European spellings (common on Open Food Facts data) share keys with American ones.
  for (const [re, us] of BRITISH) s = s.replace(re, us);
  return s;
}

const BRITISH: [RegExp, string][] = [
  [/flavour/g, "flavor"],
  [/colour/g, "color"],
  [/sulph/g, "sulf"],
  [/aluminium/g, "aluminum"],
  [/\bfibre/g, "fiber"],
  [/stabilis/g, "stabiliz"],
  [/caramelis/g, "carameliz"],
  [/pasteuris/g, "pasteuriz"],
  [/homogenis/g, "homogeniz"],
  [/\bmaise\b/g, "maize"],
];

function titleCase(input: string): string {
  const letters = input.replace(/[^A-Za-z]/g, "");
  const isUpper = letters.length > 0 && letters === letters.toUpperCase();
  const isLower = letters.length > 0 && letters === letters.toLowerCase();
  if (!isUpper && !isLower) return input; // already mixed case, keep the label's own styling
  return input
    .toLowerCase()
    .split(/(\s+|-|\/)/)
    .map((word) => {
      if (!word.trim() || word === "-" || word === "/") return word;
      if (ACRONYMS.has(word.replace(/[^a-z&0-9]/g, ""))) return word.toUpperCase();
      if (/^(?:and|or|of|with|from|in)$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("")
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * Pulls the ingredient statement out of full-label OCR text. Labels contain nutrition panels,
 * warnings and marketing copy, so we take the text after each "Ingredients" heading up to the
 * next stop phrase. When no heading is found the whole text is assumed to be the list.
 */
export function extractIngredientSection(text: string): string {
  const source = text.replace(/\r/g, "");
  const all = [...source.matchAll(KEYWORD)];
  // Marketing copy mentions "ingredients" too; prefer real headings ("Ingredients:") when present.
  const headed = all.filter((m) => /[:.\-–]\s*$/.test(m[0]));
  const matches = headed.length > 0 ? headed : all;
  if (matches.length === 0) return cutAtStop(source);
  const segments: string[] = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? source.length) : source.length;
    const seg = cutAtStop(source.slice(start, end)).trim();
    if (seg) segments.push(seg);
  }
  return segments.join(", ");
}

function cutAtStop(text: string): string {
  const m = STOP.exec(text);
  return m ? text.slice(0, m.index) : text;
}

/** Split on commas/semicolons/periods that are not inside brackets. */
function splitTopLevel(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let buf = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
    const isPeriodBreak = ch === "." && depth === 0 && /\s/.test(text[i + 1] ?? " ") && !/\b(?:no|vit|st|approx)$/i.test(buf);
    if (depth === 0 && (ch === "," || ch === ";" || isPeriodBreak)) {
      out.push(buf);
      buf = "";
      continue;
    }
    buf += ch;
  }
  out.push(buf);
  return out.map((s) => s.trim()).filter(Boolean);
}

/** Finds the first top-level bracket group: "Outer (Inner) Trailing". */
function splitBrackets(token: string): { outer: string; inner: string | null; trailing: string } {
  const open = token.search(/[([{]/);
  if (open === -1) return { outer: token, inner: null, trailing: "" };
  let depth = 0;
  for (let i = open; i < token.length; i++) {
    const ch = token[i];
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    if (ch === ")" || ch === "]" || ch === "}") {
      depth--;
      if (depth === 0) {
        return { outer: token.slice(0, open).trim(), inner: token.slice(open + 1, i).trim(), trailing: token.slice(i + 1).trim() };
      }
    }
  }
  // Unbalanced (common in OCR): treat the rest as inner.
  return { outer: token.slice(0, open).trim(), inner: token.slice(open + 1).trim(), trailing: "" };
}

interface Candidate {
  raw: string;
  name: string;
  alt: string[];
  organic: boolean;
}

function cleanName(input: string, organicMarker: string | null): { name: string; organic: boolean } {
  let s = input.trim();
  let organic = false;
  if (organicMarker && s.includes(organicMarker)) organic = true;
  s = s.replace(/[*†‡^¹²³]+/g, " ");
  s = s.replace(/\d+(?:\.\d+)?\s*%/g, " ");
  s = s.replace(TRAILING_PURPOSE, "");
  s = s.replace(/^(?:and|&|or)\s+/i, "");
  s = s.replace(/^(?:certified\s+)?organic\s+/i, () => {
    organic = true;
    return "";
  });
  s = s.replace(/\s*\(?\s*organic\s*\)?\s*$/i, (m) => {
    if (m.trim()) organic = true;
    return "";
  });
  s = s.replace(/^[\s:.\-–]+|[\s:.\-–]+$/g, "").replace(/\s+/g, " ");
  return { name: s, organic };
}

/** EU-style functional class labels: "emulsifier: lecithins", "acidity regulator: citric acid". */
const CLASS_PREFIX =
  /^\s*(?:preservatives?|emulsifiers?|antioxidants?|colou?rs?|colou?rings?|flavou?rings?|thickeners?|thickening agents?|stabili[sz]ers?|acidity regulators?|acidifiers?|acids?|sweeteners?|humectants?|raising agents?|leavening agents?|gelling agents?|glazing agents?|anti-?caking agents?|firming agents?|flour treatment agents?|flavou?r enhancers?)\s*:\s*(?=\S)/i;

function expandToken(rawToken: string, organicMarker: string | null, depth = 0): Candidate[] {
  const token = rawToken.replace(CLASS_PREFIX, "");
  const { outer, inner, trailing } = splitBrackets(token);
  if (inner !== null && depth < 3) {
    const innerParts = splitTopLevel(inner);
    if (innerParts.length > 1) {
      // "Enriched Flour (Wheat Flour, Niacin, Iron)" → the sub-ingredients are what matter.
      const vitaminPrefix = /vitamins?$/i.test(outer) ? "Vitamin " : "";
      const subs = innerParts.flatMap((part) =>
        expandToken(vitaminPrefix && part.length <= 3 ? vitaminPrefix + part : part, organicMarker, depth + 1),
      );
      const outerOrganic = /\borganic\b/i.test(outer);
      if (outerOrganic) subs.forEach((s) => (s.organic = true));
      return subs;
    }
    // Single parenthetical: a synonym ("Aqua (Water)"), a common name ("Butyrospermum Parkii (Shea) Butter"),
    // a purpose ("(preservative)"), or a percentage.
    const cleanedOuter = cleanName(`${outer} ${trailing}`, organicMarker);
    const innerIsPurpose = PURPOSE_WORDS.test(inner.trim()) || /^\d/.test(inner.trim());
    const innerOrganic = /^organic$/i.test(inner.trim());
    const alt: string[] = [];
    if (!innerIsPurpose && !innerOrganic) {
      const cleanedInner = cleanName(inner, organicMarker).name;
      if (cleanedInner) {
        alt.push(cleanedInner);
        if (trailing) alt.push(`${cleanedInner} ${trailing}`);
        if (outer) alt.push(outer);
      }
    }
    return [
      {
        raw: token,
        name: cleanedOuter.name || cleanName(inner, organicMarker).name,
        alt,
        organic: cleanedOuter.organic || innerOrganic || (!!organicMarker && inner.includes(organicMarker)),
      },
    ];
  }
  const cleaned = cleanName(token, organicMarker);
  return [{ raw: token, name: cleaned.name, alt: [], organic: cleaned.organic }];
}

export function parseIngredients(text: string): ParsedIngredient[] {
  let section = extractIngredientSection(text);

  // Footnote style organic marking: "Sugar*, Cocoa*. *Organic" or "† Certified organic".
  let organicMarker: string | null = null;
  const footnote = section.match(/([*†‡^])\s*(?:=\s*)?(?:certified\s+)?organic(?:\s+ingredients?)?/i);
  if (footnote) {
    organicMarker = footnote[1];
    section = section.replace(/[*†‡^]+\s*(?:=\s*)?(?:certified\s+)?organic(?:\s+ingredients?)?\.?/gi, " ");
  }

  section = section
    .replace(/(\w)-\s*\n\s*(\w)/g, "$1$2") // hyphenated line breaks
    .replace(/\n+/g, " ")
    .replace(/[•·●▪|]/g, ",")
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/\b(?:contains?|containing)\s+(?:\d+(?:\.\d+)?\s*%|two\s+percent)\s+or\s+less\s+of(?:\s+(?:each\s+of\s+)?the\s+following)?\s*:?/gi, ",")
    .replace(/\b(?:less\s+than|or\s+less\s+of)\s+(?:\d+(?:\.\d+)?\s*%)?\s*(?:of)?\s*:?/gi, ",")
    .replace(/\bcontains\s+one\s+or\s+more\s+of\s+the\s+following\s*:?/gi, ",")
    .replace(/\b(?:inactive|active)\s+ingredients?\s*:?/gi, ",")
    .replace(/\s+/g, " ");

  const tokens = splitTopLevel(section);
  const seen = new Set<string>();
  const out: ParsedIngredient[] = [];

  for (const token of tokens) {
    for (const cand of expandToken(token, organicMarker)) {
      const name = titleCase(cand.name);
      const key = normalizeKey(name);
      const letters = key.replace(/[^a-z]/g, "");
      const eNumber = /^e ?\d{3,4}[a-z]?$/.test(key);
      if ((letters.length < 3 && !eNumber) || NOISE.has(key)) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      const alt = [...new Set(cand.alt.map(normalizeKey).filter((a) => a && a !== key && a.replace(/[^a-z]/g, "").length >= 3))];
      out.push({
        position: out.length + 1,
        raw: cand.raw,
        name,
        key,
        alt,
        labeledOrganic: cand.organic,
      });
    }
  }
  return out;
}
