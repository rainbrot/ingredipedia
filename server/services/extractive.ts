// Extractive fallback used when no AI key is configured: builds the draft and the research profile
// by selecting and classifying sentences from PubChem sections and PubMed abstracts. Everything it
// outputs is quoted or trimmed from a real source, so anyone can check it against the cited source.

import type { Extraction, BasicDraft } from "./ai";
import { firstSentences, heuristicScore, splitSentences, type HazardFacts, type PubChemCompound, type ViewEntry } from "./pubchem";
import type { EvidenceLevel, Hazard, Kind, Origin, Sector, SourceDoc } from "../../shared/types";

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
      : `${displayName} is listed on this label as ${role === "Ingredient" ? "an ingredient" : `a ${role.toLowerCase()}`}. Assay is searching PubChem and PubMed for more, and this profile updates automatically.`,
    productFunction: role === "Ingredient" ? "Function not yet identified." : `Used as a ${role.toLowerCase()}.`,
    sensitization: facts.ghs.hCodes.includes("H317")
      ? "Classified as a potential skin sensitizer (GHS H317) in concentrated form."
      : "No sensitization classification was found in public hazard data.",
  });
}

// ---------------------------------------------------------------------------
// Automatic research profile (no AI): sentence selection from PubChem + PubMed, plus
// textbook explanations of each GHS hazard class the compound carries.

interface Sentence {
  text: string;
  source: string;
}

/** Sentences about the study itself rather than the substance. */
const META = /^(?:purpose|objectives?|aims?|methods?|design|setting|participants)\s*:|\b(?:this|the present|our|current) (?:study|work|paper|review|research)\b|\bwe (?:investigated|evaluated|examined|aimed|report|studied|propose|developed|assessed)\b|\bthe (?:aim|purpose|objective|goal) of\b/i;

/** Structured-abstract labels whose content is still useful ("Background: X is a…"). */
const SECTION_LABEL = /^(?:background|introduction|context|significance|results?|conclusions?|findings)\s*:\s*/i;

function sentencesOf(docs: SourceDoc[]): Sentence[] {
  const out: Sentence[] = [];
  for (const d of docs) {
    const fromPaper = d.source === "pubmed";
    for (const part of splitSentences(d.text)) {
      const t = part.replace(SECTION_LABEL, "").trim();
      if (t.length < 50 || t.length > 420) continue;
      // Abstract sentences about the study design, or fragments, say nothing about the substance.
      if (fromPaper && (META.test(t) || /^[a-z]/.test(t))) continue;
      out.push({ text: t[0].toUpperCase() + t.slice(1), source: d.id });
    }
  }
  return out;
}

/** Best sentences for a topic: they must match the topic itself; naming the ingredient only helps ranking. */
function pick(sentences: Sentence[], re: RegExp, n: number, nameRe?: RegExp, exclude = new Set<string>()): Sentence[] {
  return sentences
    .map((s) => {
      const hits = s.text.match(new RegExp(re.source, "gi"))?.length ?? 0;
      return { s, hits, score: hits + (nameRe?.test(s.text) ? 1.5 : 0) };
    })
    .filter((x) => x.hits >= 1 && !exclude.has(x.s.text))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => {
      exclude.add(x.s.text);
      return x.s;
    });
}

/** Readable headings for automatically extracted mechanisms, keyed on what the sentences describe. */
const MECHANISM_TOPICS: [RegExp, string][] = [
  [/sensiti[sz]|allerg|dermatitis|patch test/i, "Skin sensitization"],
  [/membrane|lipid bilayer|permeab/i, "Membrane disruption"],
  [/antimicrobial|antibacterial|antifungal|bactericid|preservative efficacy|microb/i, "Antimicrobial action"],
  [/antioxidant|radical|scaveng|lipid peroxid|oxidative stress/i, "Antioxidant and oxidative chemistry"],
  [/inflammat|cytokine|\bnf-?[κk]b\b|interleukin|\btnf\b/i, "Effects on inflammation"],
  [/receptor|agonist|antagonist|ligand/i, "Receptor binding"],
  [/inhibit\w*\s+(?:the\s+)?(?:enzyme|activity)|enzyme inhibit|inhibitor of/i, "Enzyme inhibition"],
  [/\bmetaboli[sz]|\bcytochrome|\bhepat|\bliver\b/i, "Metabolism in the body"],
  [/absorb|permeat|penetrat|bioavailab|transdermal/i, "Absorption and skin penetration"],
  [/viscos|rheolog|\bgel|hydrogel|thicken|\bswell/i, "How it thickens"],
  [/emulsi|surfact|micell|interfac/i, "Behavior at oil–water interfaces"],
  [/barrier|transepidermal|hydrat|moistur|stratum corneum/i, "Effects on the skin barrier"],
  [/estrogen|endocrine|\bhormon/i, "Hormone-related activity"],
  [/genotox|mutagen|dna damage|carcinogen/i, "Genotoxicity findings"],
  [/cytotox|cell viability|apoptosis/i, "Effects on cells"],
];

function mechanismTopic(text: string, taken: string[]): string | null {
  for (const [re, title] of MECHANISM_TOPICS) if (re.test(text) && !taken.includes(title)) return title;
  return null;
}

/** Paper titles as headings: drop trailing parentheticals and cut at a word boundary. */
function shortTitle(title: string, max = 90): string {
  const t = title.replace(/\s*\(.*\)$/, "").replace(/\.$/, "");
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(" ", max)).replace(/[,:;]$/, "")}…`;
}


const RE = {
  reaction: /chelat|neutraliz|oxidi[sz]|reduction\b|reducing agent|hydroly|reacts?\b|reaction|scaveng|esterif|saponif|polymeri[sz]|complex(?:es|ation)|decompos|dissociat|protonat|degrad/,
  molecular: /inhibit|receptor|enzyme|bind|ligand|channel|membrane|oxidat|radical|protein|transporter|activat|block|agonist|antagonist/,
  biological: /cell|tissue|skin|liver|kidney|brain|blood|inflammat|immune|growth|toxicit|symptom|patients|animals|rats|mice|human|body|organism/,
  dosage: /mg\/kg|µg|ppm|\d\s?%|concentration|acceptable daily intake|ADI|NOAEL|dose|exposure/,
  sensitization: /sensiti[sz]|allerg|dermatitis|irritat|patch test/,
};

function evidenceOf(text: string): EvidenceLevel {
  if (/randomi[sz]ed|clinical trial|patients|volunteers|participants|cohort|meta-analysis|humans\b/i.test(text)) return "human";
  if (/in vitro|cell line|cultured|rats?\b|mice|mouse|animal|zebrafish/i.test(text)) return "lab";
  return "emerging";
}

/** Generic, textbook mechanisms for GHS hazard classes. They describe the pure, concentrated chemical. */
const GHS_HAZARDS: { codes: RegExp; title: string; summary: string; chemical: string; biological: string }[] = [
  {
    codes: /^H314/,
    title: "Corrosive when concentrated",
    summary: "The concentrated chemical can burn skin and eyes; the diluted amount in a finished product is far lower.",
    chemical: "Strongly acidic or alkaline substances shift the local pH far from neutral. Acids hydrolyze and denature proteins; bases additionally saponify (break apart) the fatty lipids that hold cell membranes together.",
    biological: "Acid burns cause coagulative necrosis, which forms a crust that limits depth. Alkali burns cause liquefactive necrosis, which keeps penetrating, so they are often deeper, especially in the eye.",
  },
  {
    codes: /^H31[59]/,
    title: "Skin and eye irritant",
    summary: "Direct contact with the concentrated chemical can redden skin or sting the eyes.",
    chemical: "Irritants dissolve or disrupt the lipids and proteins of the outer skin barrier (stratum corneum) or the tear film and corneal surface.",
    biological: "Damaged surface cells release inflammatory signals (cytokines), causing redness, swelling and stinging. Unlike an allergy, irritation does not involve immune memory and stops when exposure ends.",
  },
  {
    codes: /^H318/,
    title: "Serious eye damage",
    summary: "Concentrated splashes can injure the cornea, so goggles are recommended when handling the raw chemical.",
    chemical: "The substance reacts with or denatures proteins in the corneal epithelium and can penetrate deeper layers of the eye.",
    biological: "Corneal cells die and the clear tissue can scar or cloud, which is why eye-damage classifications call for immediate rinsing for at least 15 minutes.",
  },
  {
    codes: /^H317/,
    title: "Skin sensitizer (allergic contact dermatitis)",
    summary: "Repeated contact can teach the immune system to react to this chemical, causing an itchy rash on later exposures.",
    chemical: "Small, reactive molecules (or their oxidation products) cross the skin barrier and act as haptens: they bond covalently to the skin's own proteins, creating altered proteins the body has never seen.",
    biological: "Langerhans cells carry the altered proteins to lymph nodes and train T cells to recognize them. On the next exposure those T cells trigger a delayed (Type IV) immune reaction 24–72 hours later: redness, itching and blistering.",
  },
  {
    codes: /^H334/,
    title: "Respiratory sensitizer",
    summary: "Breathing in dust or mist of the raw material can cause allergy or asthma in workers handling it.",
    chemical: "Inhaled particles or proteins are recognized as foreign by the immune system lining the airways.",
    biological: "The body produces IgE antibodies; later exposures release histamine and other mediators that constrict the airways, producing wheezing and asthma-like symptoms.",
  },
  {
    codes: /^H33[05]|^H332/,
    title: "Respiratory irritation",
    summary: "Vapors or dust of the concentrated chemical can irritate the nose, throat and lungs.",
    chemical: "Reactive vapors and particles dissolve in the moist lining of the airways, changing local pH or reacting with surface proteins.",
    biological: "Irritated mucous membranes trigger coughing, sneezing and airway narrowing, a protective reflex that stops once you reach fresh air.",
  },
  {
    codes: /^H304/,
    title: "Aspiration hazard",
    summary: "Swallowing the concentrated liquid is dangerous mainly because it can slip into the lungs.",
    chemical: "Low-viscosity, low-surface-tension liquids (often hydrocarbons) spread easily over wet surfaces.",
    biological: "If swallowed and then choked on or vomited, the liquid can enter the airways and dissolve the lung's surfactant, the film that keeps air sacs open, causing chemical pneumonitis.",
  },
  {
    codes: /^H30[012]|^H31[012]/,
    title: "Harmful if swallowed or absorbed in large amounts",
    summary: "Acute toxicity is measured with the dose that would harm a test animal; it applies to the concentrated chemical, not trace amounts.",
    chemical: "Toxicologists rank acute toxicity by the LD50: the dose per kilogram of body weight that is lethal to half of test animals. A lower LD50 means a more toxic substance.",
    biological: "Effects depend on how much reaches the bloodstream and which organs process it. The amounts in consumer products are typically a small fraction of a toxic dose.",
  },
  {
    codes: /^H34[01]/,
    title: "Genetic toxicity flag",
    summary: "Laboratory tests suggest the pure substance may damage DNA at high doses.",
    chemical: "Mutagens chemically modify DNA bases (for example by adding alkyl groups or generating reactive oxygen species), causing copying errors.",
    biological: "If cells cannot repair the damage, mutations can accumulate. Regulators set exposure limits far below the doses that show effects in tests.",
  },
  {
    codes: /^H35[01]/,
    title: "Carcinogenicity classification",
    summary: "This is a hazard label: it says the substance can cause cancer under some conditions, not that normal use carries meaningful risk.",
    chemical: "Carcinogens act either by damaging DNA directly or by promoting cell growth and chronic inflammation over long periods.",
    biological: "Risk depends on dose, route and duration. Hazard (can it cause harm?) and risk (will it, at this exposure?) are different questions.",
  },
  {
    codes: /^H36[0-2]/,
    title: "Reproductive toxicity flag",
    summary: "High-dose animal studies of the pure substance raised concerns about fertility or development.",
    chemical: "Some substances interfere with hormone signaling or with rapidly dividing cells in developing tissue.",
    biological: "Effects seen at high doses in animals guide the safety margins regulators set for human exposure.",
  },
  {
    codes: /^H37[0-3]/,
    title: "Organ toxicity with heavy exposure",
    summary: "Large or repeated exposures to the concentrated chemical can affect specific organs.",
    chemical: "The substance or its metabolites accumulate in, or are processed by, particular organs such as the liver or kidneys.",
    biological: "Sustained high exposure can overwhelm the organ's capacity to detoxify, causing damage that occupational limits are designed to prevent.",
  },
  {
    codes: /^H22[4-6]/,
    title: "Flammable",
    summary: "The liquid or its vapor can catch fire, so store it away from heat and flames.",
    chemical: "A low flash point means enough vapor forms at room temperature to ignite; combustion rapidly oxidizes C–H bonds into carbon dioxide and water, releasing heat.",
    biological: "The main danger is burns and fire rather than toxicity.",
  },
  {
    codes: /^H4(00|10|11|12)/,
    title: "Toxic to aquatic life",
    summary: "Large releases into waterways can harm fish and invertebrates, which is why disposal is regulated.",
    chemical: "Hydrophobic or surface-active molecules partition out of water and into the fatty membranes of gills and other tissues.",
    biological: "Accumulating in membranes disrupts their structure and function, impairing breathing and cell integrity in aquatic organisms.",
  },
];

export function ghsHazards(h: HazardFacts): Hazard[] {
  const out: Hazard[] = [];
  for (const t of GHS_HAZARDS) {
    const codes = h.hCodes.filter((c) => t.codes.test(c));
    if (codes.length === 0) continue;
    out.push({ title: t.title, summary: `${t.summary} (GHS ${codes.join(", ")}, pure substance)`, chemical: t.chemical, biological: t.biological });
  }
  return out;
}

function sectionDoc(docs: SourceDoc[], heading: string): SourceDoc | undefined {
  return docs.find((d) => d.id === `PubChem:${heading}`);
}

const PENDING = "Not described in the retrieved sources.";

export function extractiveProfile(name: string, docs: SourceDoc[], facts: Facts): Extraction {
  const all = sentencesOf(docs);
  const papers = all.filter((s) => s.source.startsWith("PMID"));
  const nameRe = new RegExp(name.split(/\s+/)[0].replace(/[^\w]/g, ""), "i");
  const used = new Set<string>();
  const firstOf = (heading: string, n = 2) => {
    const d = sectionDoc(docs, heading);
    return d ? firstSentences(d.text, n, 520) : "";
  };

  // Overview: what it is, physically and chemically.
  const descriptions = texts(facts, "Record Description");
  const describe = descriptions.find((t) => t.length > 80 && !/appears as/i.test(t));
  const appearance = descriptions.find((t) => /appears as/i.test(t));
  const c = facts.compound;
  const overview = [
    describe ? firstSentences(describe, 3, 640) : "",
    [appearance ? firstSentences(appearance, 2, 360) : "", c?.formula ? `Its molecular formula is ${c.formula}${c.weight ? `, with a molar mass of ${c.weight.toFixed(2)} g/mol` : ""}.` : ""]
      .filter(Boolean)
      .join(" "),
  ].filter(Boolean);
  // No PubChem description (common for polymers and mixtures): use descriptive sentences from the abstracts,
  // skipping study boilerplate ("The aim of this study…", "We evaluated…").
  let defining = "";
  if (!describe) {
    const stem = name.split(/\s+/)[0].replace(/[^\w]/g, "");
    const defines = new RegExp(`\\b${stem}\\w*\\s+(?:\\([^)]*\\)\\s+)?(?:is|are)\\s+(?:a|an|the|widely|commonly|frequently|used|one)\\b`, "i");
    const descriptive = papers.filter((x) => !META.test(x.text) && x.text.length < 420);
    const definitional = descriptive.filter((x) => defines.test(x.text)).slice(0, 2);
    for (const d of definitional) used.add(d.text);
    if (definitional.length) {
      defining = definitional[0].text;
      overview.unshift(definitional.map((d) => d.text).join(" "));
    }
  }

  // Mechanisms: pair a molecular-scale sentence with a biological-scale sentence from the same source.
  const mechanisms: Extraction["mechanisms"] = [];
  const moa = sectionDoc(docs, "Mechanism of Action");
  const bySource = new Map<string, Sentence[]>();
  for (const s of [...(moa ? sentencesOf([moa]) : []), ...papers]) bySource.set(s.source, [...(bySource.get(s.source) ?? []), s]);
  for (const [source, sentences] of bySource) {
    if (mechanisms.length >= 3) break;
    const chem = pick(sentences, RE.molecular, 1, nameRe, used)[0];
    const bio = pick(sentences, RE.biological, 1, nameRe, used)[0];
    // A finding only counts if it is actually about this ingredient: named in the sentences (or by the
    // abbreviation the abstract defines for it) or in the paper's title.
    if (!chem && !bio) continue;
    const docMeta = docs.find((d) => d.id === source);
    const abbr = docMeta?.text.match(new RegExp(`${nameRe.source}\\w*\\s*\\(([A-Z][A-Za-z0-9-]{1,7})\\)`, "i"))?.[1];
    const about = (t: string) => nameRe.test(t) || (!!abbr && new RegExp(`\\b${abbr}\\b`).test(t));
    if (!about(`${chem?.text ?? ""} ${bio?.text ?? ""}`) && !nameRe.test(docMeta?.title ?? "")) {
      if (chem) used.delete(chem.text);
      if (bio) used.delete(bio.text);
      continue;
    }
    const doc = docs.find((d) => d.id === source);
    const topic = mechanismTopic(`${chem?.text ?? ""} ${bio?.text ?? ""} ${doc?.title ?? ""}`, mechanisms.map((m) => m.title));
    mechanisms.push({
      title: topic ?? (source.startsWith("PubChem") ? "Reported mechanism of action" : `Finding: ${shortTitle(doc?.title ?? "published study")}`),
      chemical: chem?.text ?? PENDING,
      biological: bio?.text ?? PENDING,
      evidence: evidenceOf([chem?.text, bio?.text].join(" ")),
      sources: [source],
    });
  }

  // Reactions: only sentences that name the ingredient and describe chemistry, not biological outcomes.
  const chemistrySentences = all.filter((x) => nameRe.test(x.text) && !x.text.includes("->") && !/viabilit|patients|inflammat|wound|bacteria\b/i.test(x.text));
  const reactions: Extraction["reactions"] = pick(chemistrySentences, RE.reaction, 2, nameRe, used).map((s) => ({
    title: "Reported chemistry",
    summary: s.text,
    steps: [],
    equation: null,
    result: "See the cited source for the full reaction conditions.",
    sources: [s.source],
  }));

  // Hazards: textbook GHS mechanisms + any sensitization finding from the literature.
  const hazards = ghsHazards(facts.ghs);
  const sens = pick(papers, RE.sensitization, 1, nameRe, used)[0];
  if (sens && !hazards.some((h) => /sensitizer/i.test(h.title))) {
    hazards.push({ title: "Allergy and irritation reports", summary: "A published study describes skin or allergic reactions.", chemical: PENDING, biological: sens.text });
  }

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
      body: "GHS classification (ECHA notifications)",
      status: `${facts.ghs.signal ?? "Classified"} for the pure substance: ${facts.ghs.statements.slice(0, 3).join("; ")}.`,
      limit: null,
    });
  }
  const safer = texts(facts, "Use Classification").find((t) => /safer chemical classes/i.test(t));
  if (safer) regulatory.push({ body: "U.S. EPA Safer Choice", status: safer.replace(/^Safer Chemical Classes\s*->\s*/i, "").trim(), limit: null });

  const manufacturing = facts.sections["Methods of Manufacturing"] ?? [];
  const synthesis: Extraction["synthesis"] = manufacturing.length
    ? [
        {
          title: "Industrial manufacturing",
          summary: firstSentences(manufacturing[0].text, 1, 300),
          mechanism: firstSentences(manufacturing[0].text, 3, 700),
          steps: manufacturing.slice(1, 4).map((e) => firstSentences(e.text, 1, 300)),
          equation: null,
          significance: "Summarized automatically from PubChem's manufacturing records.",
        },
      ]
    : [];

  const usesList = [...texts(facts, "Consumer Uses"), ...texts(facts, "Industry Uses"), ...texts(facts, "Uses")]
    .flatMap((t) => t.split("|"))
    .map((t) => t.trim())
    .filter((t) => t.length > 3 && t.length < 140 && !/not otherwise specified|^information on/i.test(t));

  const dosage = pick(all, RE.dosage, 2, nameRe, used);
  const fate = firstOf("Environmental Fate", 2);
  const biodeg = firstOf("Environmental Biodegradation", 2);
  const ecotox = firstOf("Ecotoxicity Values", 1) || firstOf("Ecotoxicity Excerpts", 1);
  const firstShort = (heading: string) => texts(facts, heading).find((t) => t.length < 160) ?? "";

  return {
    summary: describe ? firstSentences(describe, 2) : defining,
    overview,
    function: firstSentences(usesList.slice(0, 3).join(". ") || firstOf("Record Description", 1) || PENDING, 2),
    mechanisms,
    reactions,
    regulatory,
    hazards,
    dosage: dosage.length ? dosage.map((s) => s.text).join(" ") : firstOf("Toxicity Summary") || PENDING,
    myths: [],
    environment: {
      persistence: fate || PENDING,
      biodegradability: biodeg || PENDING,
      aquaticToxicity: ecotox || (facts.ghs.hCodes.some((c) => /^H4/.test(c)) ? "Classified as hazardous to the aquatic environment in pure form." : PENDING),
    },
    synthesis,
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
