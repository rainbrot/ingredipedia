// Extractive fallback used when no AI key is configured: builds the draft and the research profile
// by selecting and classifying sentences from PubChem sections and PubMed abstracts. Everything it
// outputs is quoted or trimmed from a real source, so the admin can fact-check it the same way.

import type { Extraction, BasicDraft } from "./ai";
import { firstSentences, heuristicScore, type HazardFacts, type PubChemCompound, type ViewEntry } from "./pubchem";
import type { Kind, Origin, Sector, SourceDoc } from "../../shared/types";

export interface Facts {
  compound: PubChemCompound | null;
  synonyms: string[];
  ghs: HazardFacts;
  sections: Record<string, ViewEntry[]>;
}

const NATURAL_WORDS =
  /\b(extract|oil|juice|butter|leaf|leaves|seed|flower|root|bark|fruit|peel|powder|flour|milk|cream|honey|wax|resin|gel|water|puree|vinegar|herb|spice|tea|cocoa|coffee|nut|nuts|bean|beans|rice|oat|oats|wheat|corn|egg|eggs|salt|pepper|garlic|onion|tomato|lemon|lime|apple|berry|berries|grape|vanilla|cinnamon|yeast|starch)\b/i;
const MINERAL_WORDS = /\b(oxide|mica|clay|kaolin|silica|talc|chloride|carbonate|sulfate|phosphate|bicarbonate|hydroxide|iron|zinc|calcium|magnesium|potassium|sodium)\b/i;

export function guessKind(name: string, compound: PubChemCompound | null): Kind {
  if (/\b(gum|cellulose|starch|dextrin|polymer|copolymer|crosspolymer|carbomer|polyquaternium|dimethicone|peg-|ppg-|acrylates)\b/i.test(name)) return "polymer";
  if (compound?.formula) return "compound";
  return "mixture";
}

export function guessOrigin(name: string, compound: PubChemCompound | null): Origin {
  const hasCarbon = compound?.formula ? /C(?![a-z])/.test(compound.formula) : true;
  if (compound?.formula && !hasCarbon) return "mineral";
  if (/\b(modified|hydrogenated|hydrolyzed|hydrolysed|interesterified|syrup solids|isolate)\b/i.test(name)) return "semi_synthetic";
  if (!compound && NATURAL_WORDS.test(name)) return "natural";
  if (!compound && MINERAL_WORDS.test(name)) return "mineral";
  if (/\b(ferment|lactic|citric|xanthan|hyaluron)/i.test(name)) return "fermented";
  if (/\b(hydrogenated|modified|ethoxylated|sulfated|esterified|glyceryl|cocamido|coco-|laureth|pareth)/i.test(name)) return "semi_synthetic";
  return "synthetic";
}

const ROLE_WORDS: [RegExp, string][] = [
  [/preserv|antimicrobial/i, "Preservative"],
  [/surfactant|cleansing|detergent|foam/i, "Surfactant"],
  [/humectant|moistur/i, "Humectant"],
  [/emollient|skin conditioning|smoothing/i, "Emollient"],
  [/emulsif/i, "Emulsifier"],
  [/antioxidant/i, "Antioxidant"],
  [/chelat|sequest/i, "Chelating Agent"],
  [/buffering|ph adjust|ph control|acidity regulator/i, "pH Adjuster"],
  [/thicken|viscosity|gelling|stabiliz/i, "Thickener"],
  [/sweeten/i, "Sweetener"],
  [/colou?r|dye|pigment/i, "Colorant"],
  [/flavou?r/i, "Flavoring"],
  [/fragrance|perfum|masking/i, "Fragrance"],
  [/uv|sunscreen/i, "UV Filter"],
  [/solvent/i, "Solvent"],
  [/bleach|oxidi[sz]/i, "Oxidizing Agent"],
  [/disinfect|biocid/i, "Disinfectant"],
  [/leaven/i, "Leavening Agent"],
  [/nutrient|vitamin|dietary supplement/i, "Nutrient"],
];

export function guessRole(texts: string[]): string {
  const joined = texts.join(" ");
  for (const [re, role] of ROLE_WORDS) if (re.test(joined)) return role;
  return "Ingredient";
}

interface NameRule {
  re: RegExp;
  role: string;
  origin?: Origin;
  kind?: Kind;
  score: number;
  concerns?: string[];
  why: string;
}

/**
 * Label-name knowledge used when there is no AI model: common ingredient families whose
 * health relevance can't be read from GHS hazard data (sugars, starches, dyes, oils…).
 */
const NAME_RULES: NameRule[] = [
  { re: /\bpartially hydrogenated\b/i, role: "Fat", origin: "semi_synthetic", kind: "mixture", score: 12, concerns: ["ultra_processed"], why: "partially hydrogenated oils are the main source of artificial trans fat, which the FDA no longer considers GRAS" },
  { re: /\bhydrogenated\b.*\b(oil|fat)\b/i, role: "Fat", origin: "semi_synthetic", kind: "mixture", score: 45, concerns: ["ultra_processed"], why: "fully hydrogenated fats are saturated and heavily processed" },
  { re: /\bmaple syrup\b|\bhoney\b|\bmolasses\b|\bagave\b|\bdate syrup\b/i, role: "Sweetener", origin: "natural", kind: "mixture", score: 45, concerns: ["added_sugar"], why: "a less-refined sweetener, but still counts as added sugar" },
  { re: /\bsyrup\b|\bsyrup solids\b/i, role: "Sweetener", origin: "semi_synthetic", kind: "mixture", score: 36, concerns: ["added_sugar", "ultra_processed"], why: "an industrially refined sugar syrup that counts as added sugar" },
  { re: /\b(dextrose|fructose|glucose|maltose|sucrose|invert sugar|cane sugar|brown sugar|powdered sugar)\b/i, role: "Sweetener", origin: "natural", score: 42, concerns: ["added_sugar"], why: "counts as added sugar" },
  { re: /\b(sorbitol|xylitol|erythritol|maltitol|mannitol|isomalt)\b/i, role: "Sugar Alcohol", origin: "semi_synthetic", score: 68, concerns: ["gut"], why: "a lower-calorie sweetener that can cause digestive upset in larger amounts" },
  { re: /\bmodified\b.*\bstarch\b|\bmodified food starch\b/i, role: "Thickener", origin: "semi_synthetic", kind: "polymer", score: 66, concerns: ["ultra_processed"], why: "a chemically or physically modified starch used as a thickener; low toxicity but a marker of processed food" },
  { re: /\bstarch\b/i, role: "Thickener", origin: "natural", kind: "polymer", score: 80, why: "a plant starch" },
  { re: /\b(fd&?c|d&c)\b|\b(red|yellow|blue|green|orange)\s*(no\.?\s*)?\d{1,2}\b|\blake\b|\bci\s?\d{5}\b/i, role: "Synthetic Dye", origin: "synthetic", score: 38, concerns: ["artificial_color"], why: "a certified synthetic color additive with no nutritional role" },
  { re: /\b(annatto|turmeric|beet|paprika|spirulina|carmine|anthocyanin|beta[- ]carotene|vegetable juice)\b.*\b(color|colour|extract|juice)?/i, role: "Natural Colorant", origin: "natural", kind: "mixture", score: 80, why: "a color derived from plants or insects" },
  { re: /\bcolou?rant\b|\bcolou?ring\b|\bcolou?r added\b/i, role: "Colorant", origin: "synthetic", kind: "mixture", score: 52, concerns: ["undisclosed"], why: "an unspecified colorant" },
  { re: /\b(puree|juice concentrate|fruit juice|vegetable juice|concentrate)\b/i, role: "Fruit & Vegetable Ingredient", origin: "natural", kind: "mixture", score: 74, why: "a fruit or vegetable ingredient; juice concentrates add concentrated sugar" },
  { re: /\b(carnauba|candelilla|bees|rice bran|sunflower)\s*wax\b|\bbeeswax\b|\bcera alba\b/i, role: "Glazing Agent", origin: "natural", kind: "mixture", score: 86, why: "a natural plant or insect wax used in tiny amounts" },
  { re: /\bwax\b/i, role: "Wax", origin: "natural", kind: "mixture", score: 80, why: "a wax" },
  { re: /\b(caprylic|capric).*triglyceride\b|\bglyceryl\b|\bglyceride\b/i, role: "Emollient", origin: "semi_synthetic", kind: "mixture", score: 86, why: "a plant-derived fatty ester with a strong safety record" },
  { re: /\bethylhexylglycerin\b|\bcaprylyl glycol\b|\bhexanediol\b|\bpentylene glycol\b/i, role: "Preservative Booster", origin: "synthetic", score: 76, concerns: ["preservative"], why: "a multifunctional conditioning agent that boosts preservatives; rare sensitization" },
  { re: /\bcarbomer\b|\bacrylates?\b.*\bcopolymer\b|\bcrosspolymer\b/i, role: "Thickener", origin: "synthetic", kind: "polymer", score: 80, why: "a synthetic polymer thickener that is not absorbed through skin" },
  { re: /\b(peg|ppg)-\d+/i, role: "Emulsifier", origin: "synthetic", kind: "polymer", score: 64, why: "an ethoxylated ingredient that may carry trace 1,4-dioxane from manufacturing" },
  { re: /\bisothiazolinone\b/i, role: "Preservative", origin: "synthetic", score: 30, concerns: ["sensitizer", "preservative"], why: "an isothiazolinone preservative, a class known for skin sensitization" },
  { re: /paraben\b/i, role: "Preservative", origin: "synthetic", score: 50, concerns: ["preservative", "endocrine"], why: "a paraben preservative; longer-chain parabens have weak estrogenic activity" },
  { re: /\b(cocoyl|lauroyl|myristoyl)\b.*\b(glutamate|glycinate|sarcosinate|taurate|isethionate|alaninate)\b|\bdecyl glucoside\b|\bcoco[- ]glucoside\b|\blauryl glucoside\b/i, role: "Surfactant", origin: "semi_synthetic", score: 84, why: "a mild plant-derived surfactant often chosen for sensitive-skin cleansers" },
  { re: /\bamine oxide\b|\blauramine oxide\b|\bbetaine\b|\bglucoside\b|\bsulfonate\b|\bsulfate\b.*\b(sodium|ammonium)\b|\b(sodium|ammonium)\b.*\bsulfate\b/i, role: "Surfactant", origin: "semi_synthetic", score: 60, concerns: ["irritant"], why: "a cleansing surfactant; can irritate skin and eyes when concentrated" },
  { re: /\b(oil|butter)\b/i, role: "Oil & Emollient", origin: "natural", kind: "mixture", score: 80, why: "a plant oil or butter" },
  { re: /\bextract\b|\bleaf\b|\broot\b|\bflower\b|\bseed\b/i, role: "Botanical Extract", origin: "natural", kind: "mixture", score: 74, why: "a botanical ingredient; plant extracts occasionally cause allergic reactions" },
  { re: /\bflour\b|\boats?\b|\brice\b|\bwheat\b|\bcorn\b|\bbarley\b/i, role: "Grain", origin: "natural", kind: "mixture", score: 78, why: "a grain ingredient" },
  { re: /\bprotein (isolate|concentrate)\b|\bhydrolyzed\b.*\bprotein\b/i, role: "Protein", origin: "semi_synthetic", kind: "mixture", score: 72, why: "a processed protein ingredient" },
  { re: /\bgum\b/i, role: "Thickener", origin: "natural", kind: "polymer", score: 82, why: "a plant gum thickener" },
  { re: /\bvitamin\b|\bniacin\b|\briboflavin\b|\bthiamin\b|\bfolic acid\b|\breduced iron\b/i, role: "Nutrient", origin: "synthetic", score: 88, why: "an added vitamin or mineral nutrient" },
  { re: /\bcultures?\b|\bprobiotic\b|\blactobacillus\b|\bbifidobacterium\b/i, role: "Live Cultures", origin: "natural", kind: "mixture", score: 92, why: "live fermentation cultures" },
  { re: /\benzymes?\b|\bamylase\b|\blipase\b|\bcellulase\b|\bmannanase\b/i, role: "Enzyme", origin: "fermented", kind: "mixture", score: 66, concerns: ["respiratory"], why: "a fermentation-derived enzyme; dust can sensitize airways" },
  { re: /\bflavou?rs?\b|\bflavou?ring\b/i, role: "Flavoring", origin: "natural", kind: "mixture", score: 60, concerns: ["undisclosed"], why: "an undisclosed flavor blend" },
  { re: /\bspices?\b|\bherbs?\b|\bgarlic\b|\bonion\b|\bpepper\b|\bcinnamon\b|\bvanilla\b/i, role: "Spice & Herb", origin: "natural", kind: "mixture", score: 88, why: "a culinary spice or herb" },
  { re: /\b(milk|cream|whey|casein|egg|butter|cheese|soy|peanut|almond|cashew|hazelnut|walnut|sesame|wheat)\b/i, role: "Whole Food Ingredient", origin: "natural", kind: "mixture", score: 80, concerns: ["allergen"], why: "a whole-food ingredient that is also a common allergen" },
];

/** Applies the first matching name rule to a draft (never raises a score set by hazard data). */
export function applyNameRules(name: string, draft: BasicDraft): BasicDraft {
  const rule = NAME_RULES.find((r) => r.re.test(name));
  if (!rule) return draft;
  const hazardLowered = draft.healthScore < 70;
  const concerns = [...new Set([...draft.concerns, ...(rule.concerns ?? [])])] as BasicDraft["concerns"];
  return {
    ...draft,
    primaryRole: rule.role,
    origin: rule.origin ?? draft.origin,
    kind: rule.kind ?? draft.kind,
    healthScore: hazardLowered ? Math.min(draft.healthScore, rule.score) : rule.score,
    concerns,
    scoreRationale: `Provisional score: ${name} is ${rule.why}. ${hazardLowered ? draft.scoreRationale : ""}`.trim(),
    productFunction: draft.productFunction === "Function not yet identified." ? `Used as a ${rule.role.toLowerCase()}.` : draft.productFunction,
  };
}

const SECTOR_CATEGORY: Record<Sector, string> = {
  food: "Food Additive",
  beauty: "Cosmetics & Skincare",
  cleaning: "Household Cleaner",
};

function texts(facts: Facts, heading: string): string[] {
  return (facts.sections[heading] ?? []).map((e) => e.text);
}

export function regulatorySignals(facts: Facts) {
  const tox = texts(facts, "Toxicity Summary").join(" ");
  const uses = texts(facts, "Use Classification").join(" ") + texts(facts, "Uses").join(" ");
  return {
    cirSafe: /safe in the present practices of use/i.test(tox) || /safe as used/i.test(tox),
    saferChoiceGreen: /green circle/i.test(uses),
    fdaListed: (facts.sections["FDA Substances Added to Food"] ?? []).length > 0,
  };
}

export function extractiveBasicDraft(name: string, sector: Sector, facts: Facts): BasicDraft {
  const compound = facts.compound;
  const roleTexts = [
    ...texts(facts, "Cosmetics"),
    ...texts(facts, "Food Additive Classes"),
    ...(facts.sections["FDA Substances Added to Food"] ?? []).filter((e) => /technical effect/i.test(e.name)).map((e) => e.text),
    ...texts(facts, "Use Classification"),
    ...texts(facts, "Record Description"),
  ];
  const signals = regulatorySignals(facts);
  const { score, concerns, rationale } = heuristicScore(facts.ghs, signals);
  const description = texts(facts, "Record Description").find((t) => t.length > 80 && !/appears as/i.test(t)) ?? texts(facts, "Record Description")[0];
  const role = guessRole(roleTexts);
  // Keep the consumer-facing label name ("Lauramine Oxide"), not PubChem's systematic title.
  const displayName = name;
  const sectors = new Set<Sector>([sector]);
  if (texts(facts, "Cosmetics").length) sectors.add("beauty");
  if ((facts.sections["FDA Substances Added to Food"] ?? []).length || texts(facts, "Food Additive Classes").length) sectors.add("food");
  if (role === "Preservative" && concerns.length === 0) concerns.push("preservative");

  return applyNameRules(name, {
    isIngredient: true,
    commonName: displayName,
    kind: guessKind(name, compound),
    primaryCategory: SECTOR_CATEGORY[sector],
    primaryRole: role,
    origin: guessOrigin(name, compound),
    sectors: [...sectors],
    healthScore: score,
    concerns: concerns as BasicDraft["concerns"],
    scoreRationale: rationale,
    summary: description
      ? firstSentences(description, 2)
      : `${displayName} is listed on this label as an ingredient. A full profile is being researched and will be reviewed by a scientist.`,
    productFunction: role === "Ingredient" ? "Function not yet identified." : `Used as a ${role.toLowerCase()}.`,
    sensitization: facts.ghs.hCodes.includes("H317")
      ? "Classified as a potential skin sensitizer (GHS H317) in concentrated form."
      : "No sensitization classification was found in public hazard data.",
  });
}

// ---------------------------------------------------------------------------
// Sentence selection

interface Sentence {
  text: string;
  source: string;
}

function sentencesOf(docs: SourceDoc[]): Sentence[] {
  const out: Sentence[] = [];
  for (const d of docs) {
    const parts = d.text.replace(/\s+\|\s+/g, ". ").match(/[^.!?]+[.!?]+/g) ?? [d.text];
    for (const p of parts) {
      const t = p.trim();
      if (t.length >= 50 && t.length <= 420) out.push({ text: t, source: d.id });
    }
  }
  return out;
}

function pick(sentences: Sentence[], re: RegExp, n: number, nameRe?: RegExp, exclude = new Set<string>()): Sentence[] {
  return sentences
    .map((s) => ({ s, score: (s.text.match(new RegExp(re.source, "gi"))?.length ?? 0) + (nameRe?.test(s.text) ? 1.5 : 0) }))
    .filter((x) => x.score >= 1 && !exclude.has(x.s.text))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => {
      exclude.add(x.s.text);
      return x.s;
    });
}

const RE = {
  reaction: /chelat|neutraliz|oxidi[sz]|reduc(?:e|tion)|hydroly|react|scaveng|esterif|saponif|polymeri|complex(?:es|ation)|decompos|dissociat|protonat/,
  mechanism: /inhibit|receptor|enzyme|pathway|membrane|express|signal|apoptosis|oxidative stress|barrier|metaboli|absorb|bind|activat|microb/,
  dosage: /mg\/kg|µg|ppm|\d\s?%|concentration|acceptable daily intake|ADI|NOAEL|dose|exposure/,
  sensitization: /sensiti[sz]|allerg|dermatitis|irritat|patch test/,
  toxicity: /toxic|lethal|LD50|carcino|genotox|adverse|harm/,
};

function sectionDoc(docs: SourceDoc[], heading: string): SourceDoc | undefined {
  return docs.find((d) => d.id === `PubChem:${heading}`);
}

export function extractiveProfile(name: string, docs: SourceDoc[], facts: Facts): Extraction {
  const all = sentencesOf(docs);
  const nameRe = new RegExp(name.split(/\s+/)[0].replace(/[^\w]/g, ""), "i");
  const used = new Set<string>();
  const firstOf = (heading: string, n = 2) => {
    const d = sectionDoc(docs, heading);
    return d ? firstSentences(d.text, n, 520) : "";
  };

  const moa = sectionDoc(docs, "Mechanism of Action");
  const mechanisms = [
    ...(moa ? [{ text: firstSentences(moa.text, 2, 480), source: moa.id }] : []),
    ...pick(all.filter((s) => s.source.startsWith("PMID")), RE.mechanism, moa ? 1 : 2, nameRe, used),
  ].map((s, i) => ({ title: i === 0 && moa ? "Reported mechanism of action" : "Finding from the literature", description: s.text, equation: null, sources: [s.source] }));

  const reactions = pick(all, RE.reaction, 2, nameRe, used).map((s) => ({
    title: "Reported chemistry",
    description: s.text,
    equation: null,
    sources: [s.source],
  }));

  const dosage = pick(all, RE.dosage, 2, nameRe, used);
  const tox = firstOf("Toxicity Summary") || firstOf("Human Toxicity Excerpts") || pick(all, RE.toxicity, 1, nameRe, used)[0]?.text || "";
  const sens = pick(all, RE.sensitization, 1, nameRe, used)[0]?.text;

  const regulatory: Extraction["regulatory"] = [];
  const toxEntries = facts.sections["Toxicity Summary"] ?? [];
  const cir = toxEntries.find((e) => /cosmetic ingredient review/i.test(e.name));
  if (cir) regulatory.push({ body: "Cosmetic Ingredient Review (CIR)", status: firstSentences(cir.text, 1), limit: null });
  const fda = facts.sections["FDA Substances Added to Food"] ?? [];
  if (fda.length) {
    const effect = fda.find((e) => /technical effect/i.test(e.name))?.text;
    const cfr = fda.find((e) => /21 eCFR|CFR/i.test(e.name))?.text;
    regulatory.push({
      body: "U.S. FDA",
      status: `Listed in the FDA inventory of substances added to food${effect ? ` (technical effect: ${effect.toLowerCase().replace(/\s+,/g, ",").slice(0, 140)})` : ""}.`,
      limit: cfr ? `21 CFR ${cfr.replace(/\s*\|\s*/g, ", ")}` : null,
    });
  }
  const jecfa = texts(facts, "Food Additive Classes")[0];
  if (jecfa) regulatory.push({ body: "JECFA (FAO/WHO)", status: `Functional class: ${jecfa.replace(/^Food Additives\s*->\s*/i, "").toLowerCase()}.`, limit: null });
  if (facts.ghs.hCodes.length) {
    regulatory.push({
      body: "GHS classification (ECHA C&L notifications)",
      status: `${facts.ghs.signal ?? "Classified"} for the pure substance: ${facts.ghs.statements.slice(0, 3).join("; ")}.`,
      limit: null,
    });
  }
  const safer = texts(facts, "Use Classification").find((t) => /safer chemical classes/i.test(t));
  if (safer) regulatory.push({ body: "U.S. EPA Safer Choice", status: safer.replace(/^Safer Chemical Classes\s*->\s*/i, "").trim(), limit: null });

  const manufacturing = facts.sections["Methods of Manufacturing"] ?? [];
  const usesList = [...texts(facts, "Consumer Uses"), ...texts(facts, "Industry Uses"), ...texts(facts, "Uses")]
    .flatMap((t) => t.split("|"))
    .map((t) => t.trim())
    .filter((t) => t.length > 3 && t.length < 140 && !/not otherwise specified|^information on/i.test(t));

  const fate = firstOf("Environmental Fate", 2);
  const biodeg = firstOf("Environmental Biodegradation", 2);
  const ecotox = firstOf("Ecotoxicity Values", 1) || firstOf("Ecotoxicity Excerpts", 1);
  const firstShort = (heading: string) => texts(facts, heading).find((t) => t.length < 160) ?? "";

  const pending = "Not described in the retrieved sources.";
  return {
    summary: firstOf("Record Description", 2) || `${name} is being researched.`,
    function: firstSentences(usesList.slice(0, 3).join(". ") || firstOf("Record Description", 1) || pending, 2),
    reactions,
    mechanisms,
    regulatory,
    toxicology: {
      mechanism: tox || pending,
      dosage: dosage.length ? dosage.map((s) => s.text).join(" ") : pending,
    },
    sensitization: sens ?? (facts.ghs.hCodes.includes("H317") ? "Classified as a potential skin sensitizer (GHS H317) in concentrated form." : pending),
    myths: [],
    synthesis: {
      method: manufacturing[0] ? firstSentences(manufacturing[0].text, 2, 520) : pending,
      steps: manufacturing.slice(1, 4).map((e) => firstSentences(e.text, 1, 300)),
      equations: [],
    },
    environment: {
      persistence: fate || pending,
      biodegradability: biodeg || pending,
      aquaticToxicity: ecotox || (facts.ghs.hCodes.some((c) => /^H4/.test(c)) ? "Classified as hazardous to the aquatic environment in pure form." : pending),
    },
    fun: {
      history: pending,
      uses: [...new Set(usesList)].slice(0, 4),
      occurrence: firstOf("Natural Pollution Sources", 2) || pending,
    },
    physical: {
      state: firstShort("Physical Description") || "",
      solubility: firstShort("Solubility"),
      phStability: firstShort("pH"),
      meltingPoint: firstShort("Melting Point"),
    },
    functionalGroups: [],
    unsupportedFields: [],
  };
}
