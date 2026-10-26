// Product health rating (0–100) and the plain-language summary shown on the product page.

import { CONCERN_LABEL, gradeFor, type Grade, type Highlight, type ScanItem, type Sector } from "./types";

export interface ProductScore {
  score: number;
  grade: Grade;
  confidence: "high" | "medium" | "low";
  summary: string;
  highlights: Highlight[];
}

/** Earlier label positions carry more weight because ingredients are listed by amount. */
export function positionWeight(position: number): number {
  return 1 / (1 + 0.25 * (position - 1));
}

const SECTOR_NOUN: Record<Sector, string> = {
  food: "food product",
  beauty: "personal-care product",
  cleaning: "cleaning product",
};

function list(names: string[]): string {
  if (names.length <= 1) return names.join("");
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function fmtCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

// Most serious first, so summaries name the concern that matters most.
const CONCERN_PRIORITY = [
  "carcinogen_flag",
  "corrosive",
  "toxic_gas",
  "sensitizer",
  "banned_eu",
  "artificial_color",
  "hyperactivity",
  "added_sugar",
  "endocrine",
  "respiratory",
  "irritant",
  "sodium",
  "artificial_sweetener",
  "environmental",
  "stimulant",
  "allergen",
  "preservative",
  "ultra_processed",
  "undisclosed",
  "gut",
  "flammable",
];

export function topConcern(concerns: string[]): string | undefined {
  const known = concerns.filter((c) => CONCERN_LABEL[c]);
  return known.sort((a, b) => (CONCERN_PRIORITY.indexOf(a) + 1 || 99) - (CONCERN_PRIORITY.indexOf(b) + 1 || 99))[0];
}

function concernPhrase(item: ScanItem): string {
  const ing = item.ingredient!;
  const top = topConcern(ing.concerns);
  return top ? CONCERN_LABEL[top].toLowerCase() : ing.primaryRole.toLowerCase();
}

export function scoreProduct(items: ScanItem[], sector: Sector, productName?: string): ProductScore {
  const known = items.filter((i) => i.ingredient);
  const total = items.length;

  if (known.length === 0) {
    return {
      score: 50,
      grade: gradeFor(50),
      confidence: "low",
      summary:
        "We couldn't match any ingredients on this label yet, so this score is a neutral placeholder. Try rescanning with the ingredient list centered and in focus, or edit the extracted text.",
      highlights: [{ tone: "info", text: "No ingredients could be identified from this label." }],
    };
  }

  let weighted = 0;
  let weights = 0;
  let penalty = 0;
  for (const item of known) {
    const s = item.ingredient!.healthScore;
    const w = positionWeight(item.position);
    weighted += s * w;
    weights += w;
    // Concerning ingredients count even when they appear late in the list (preservatives, dyes, sensitizers).
    if (s < 45) penalty += (45 - s) * 0.5 * Math.max(0.6, w);
  }
  penalty = Math.min(penalty, 30);

  const base = weighted / weights;
  const labeledOrganic = items.filter((i) => i.labeledOrganic).length;
  const organicBonus = 6 * (labeledOrganic / total);
  const artificial = items.filter((i) => i.group === "artificial").length;
  const additiveLoad = Math.min(Math.max(0, artificial - 8) * 0.6, 6);

  const score = Math.max(1, Math.min(100, Math.round(base - penalty + organicBonus - additiveLoad)));
  const grade = gradeFor(score);

  // Confidence reflects how much of the label is backed by complete profiles (curated or auto-researched).
  const complete = known.filter((i) => i.ingredient!.status !== "preliminary").length;
  const completeShare = complete / total;
  const confidence = completeShare >= 0.8 ? "high" : completeShare >= 0.5 ? "medium" : "low";

  // ---- Narrative summary ----
  const organicGroup = items.filter((i) => i.group === "organic");
  const worst = [...known].sort((a, b) => a.ingredient!.healthScore - b.ingredient!.healthScore).filter((i) => i.ingredient!.healthScore < 50);
  const leading = known.filter((i) => i.position <= 3 && i.ingredient!.healthScore >= 70);
  const researched = known.filter((i) => (i.ingredient!.researchCount ?? 0) > 0);
  const most = [...researched].sort((a, b) => b.ingredient!.researchCount! - a.ingredient!.researchCount!)[0];
  const least = [...researched].sort((a, b) => a.ingredient!.researchCount! - b.ingredient!.researchCount!)[0];
  const preliminary = known.filter((i) => i.ingredient!.status === "preliminary").length;

  const subject = productName ? productName : `This ${SECTOR_NOUN[sector]}`;
  const sentences: string[] = [];
  sentences.push(`${subject} scores ${score}/100, which we rate ${grade.toLowerCase()}.`);
  sentences.push(
    `Of its ${total} ingredient${total === 1 ? "" : "s"}, ${organicGroup.length} ${organicGroup.length === 1 ? "is" : "are"} organic or of natural origin and ${artificial} ${artificial === 1 ? "is" : "are"} synthetic or processed${labeledOrganic ? ` (${labeledOrganic} certified organic)` : ""}.`,
  );
  if (worst.length > 0) {
    const names = worst.slice(0, 3).map((i) => `${i.ingredient!.name} (${concernPhrase(i)})`);
    sentences.push(`The main ${worst.length === 1 ? "watch-out is" : "watch-outs are"} ${list(names)}.`);
  } else {
    sentences.push("None of its ingredients raise significant concerns at the levels normally used.");
  }
  if (leading.length > 0) {
    sentences.push(`Its leading ${leading.length === 1 ? "ingredient" : "ingredients"}, ${list(leading.map((i) => i.ingredient!.name))}, ${leading.length === 1 ? "is" : "are"} well tolerated.`);
  }
  if (most && least && most !== least) {
    sentences.push(
      `${most.ingredient!.name} is the best-studied ingredient (${fmtCount(most.ingredient!.researchCount!)} papers), while ${least.ingredient!.name} has the thinnest evidence base (${fmtCount(least.ingredient!.researchCount!)}).`,
    );
  }
  if (preliminary > 0) {
    sentences.push(
      `${preliminary} ingredient${preliminary === 1 ? " is" : "s are"} new to Ingredipedia and still being researched automatically, so this rating may shift as their profiles fill in.`,
    );
  }

  // ---- Highlights ----
  const highlights: Highlight[] = [];
  for (const i of worst.slice(0, 4)) {
    const ing = i.ingredient!;
    highlights.push({
      tone: ing.healthScore < 35 ? "bad" : "warn",
      text: `${ing.name}: ${concernPhrase(i)}`,
      ingredientId: ing.id,
    });
  }
  if (labeledOrganic > 0) highlights.push({ tone: "good", text: `${labeledOrganic} certified-organic ingredient${labeledOrganic === 1 ? "" : "s"}` });
  if (worst.length === 0) highlights.push({ tone: "good", text: "No high-concern ingredients" });
  if (artificial > 8) highlights.push({ tone: "warn", text: `${artificial} synthetic or processed ingredients` });
  if (preliminary > 0) highlights.push({ tone: "info", text: `${preliminary} profile${preliminary === 1 ? "" : "s"} still being researched` });
  const unknown = items.filter((i) => !i.ingredient).length;
  if (unknown > 0) highlights.push({ tone: "info", text: `${unknown} unreadable item${unknown === 1 ? "" : "s"} skipped` });

  return { score, grade, confidence, summary: sentences.join(" "), highlights };
}
