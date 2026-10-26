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
      : `${displayName} is listed on this label as ${role === "Ingredient" ? "an ingredient" : `a ${role.toLowerCase()}`}. Ingredipedia is searching PubChem and PubMed for more, and this profile updates automatically.`,
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
    summary:
      "In its pure, concentrated form this chemical can burn skin and eyes on contact. That warning comes from tests on the raw material that factory workers handle, not on the finished product, where it is usually diluted many times over. Dilution matters because corrosion depends on concentration: a strong solution destroys tissue in seconds, while a weak one may do nothing noticeable. Spills of the concentrated substance should be rinsed off with plenty of water straight away. In a consumer product, the realistic risk is mostly from splashing a strong cleaner into the eyes.",
    chemical:
      "Corrosive substances are usually strong acids or strong bases, which push the pH of whatever they touch far away from neutral 7. pH is a scale of how acidic or basic a solution is: low numbers are acidic, high numbers are basic. Acids release hydrogen ions that break the weak bonds holding proteins in their folded shapes, a process called denaturing, much like heat turns a clear egg white solid. Bases do the same to proteins and also attack fats. They split the fatty molecules in cell membranes in a reaction called saponification, the same chemistry used to make soap from oil and lye. Once the membrane that wraps each cell breaks down, the cell cannot survive.",
    biological:
      "Skin is built from layers of cells, and a corrosive chemical kills them faster than the body can protect itself. Acid burns cause what doctors call coagulative necrosis: the dead proteins clump into a tough crust that slows the acid from going deeper. Alkali (base) burns cause liquefactive necrosis, in which tissue softens and turns to a kind of paste, so the base keeps soaking further in. That is why alkali burns are often deeper and more dangerous, especially in the eye, where they can cloud the cornea permanently. The first aid for both is the same: rinse with running water for at least 15 minutes to dilute and wash the chemical away.",
  },
  {
    codes: /^H31[59]/,
    title: "Skin and eye irritant",
    summary:
      "Direct contact with the concentrated chemical can make skin red and itchy or make eyes sting and water. Irritation is a local, short-lived reaction, and it fades once the substance is washed off. The warning is based on the pure substance; finished products contain much less, and many are tested on volunteers before sale. People with sensitive skin or eczema are more likely to notice it. Rinsing with water is usually all that is needed.",
    chemical:
      "The outermost layer of skin, the stratum corneum, is like a brick wall: flat dead cells are the bricks and a mixture of fats called lipids is the mortar. Irritants either dissolve some of that fatty mortar or bind to and loosen the proteins in the bricks. Molecules with a water-loving end and an oil-loving end, such as detergents, are especially good at pulling lipids out. In the eye, irritants disturb the thin tear film and the surface cells of the cornea in a similar way. Once the barrier has gaps, the chemical and water can move through it more easily than normal.",
    biological:
      "When surface cells are damaged they release chemical alarm signals called cytokines. These signals widen nearby blood vessels and draw immune cells to the area, which is why irritated skin turns red, feels warm and may swell. Nerve endings in the skin and eye are also triggered, producing stinging or itching. Unlike an allergy, irritation does not involve the immune system remembering the chemical, so it does not get worse with each exposure. It stops when the exposure ends and the skin rebuilds its barrier over a few days.",
  },
  {
    codes: /^H318/,
    title: "Serious eye damage",
    summary:
      "A splash of the concentrated chemical can injure the clear front surface of the eye, called the cornea. This is why safety goggles are recommended when people handle the raw material in factories or labs. Finished products contain far lower amounts, but sprays and strong cleaners can still hurt if they reach the eyes. The longer the chemical stays in contact, the worse the injury. Rinsing immediately and for a long time is the most important thing to do.",
    chemical:
      "The cornea is a thin, transparent layer of tightly packed cells and protein fibers, and its transparency depends on those proteins staying in a precise, orderly arrangement. A damaging chemical reacts with these proteins or denatures them, meaning it makes them lose their folded shape. Some substances also dissolve the fatty membranes around the surface cells. Small or highly reactive molecules can pass through the outer layer and reach deeper parts of the eye. The more concentrated the chemical and the longer it sits there, the further it penetrates.",
    biological:
      "Corneal cells that are damaged die and must be replaced. If only the surface layer is hurt, it can regrow within days. Deeper injuries can leave scars, and scar tissue is cloudy rather than clear, which can blur vision permanently. The eye responds with pain, tearing and redness as nerves and blood vessels react to the injury. This is why eye-damage warnings tell people to rinse with clean water for at least 15 minutes and seek medical care.",
  },
  {
    codes: /^H317/,
    title: "Skin sensitizer (allergic contact dermatitis)",
    summary:
      "Repeated contact can teach the immune system to treat this chemical as an enemy, so that later exposures cause an itchy rash. This is called sensitization, and it is different from simple irritation because it involves immune memory. Most people never become sensitized, but once someone is, even tiny amounts can trigger a reaction for years. That is why regulators limit the concentration of known sensitizers in leave-on products like lotions. Patch testing by a dermatologist can show whether someone is allergic.",
    chemical:
      "Sensitizers are usually small, chemically reactive molecules, or molecules that become reactive after reacting with oxygen in the air. They are small enough to slip through the skin's outer barrier. Once inside, they form covalent bonds (strong bonds made by sharing electrons) with the skin's own proteins, often at sulfur or nitrogen atoms. A molecule that works this way is called a hapten: on its own it is too small for the immune system to notice, but attached to a protein it creates a new shape the body has never seen before. That altered protein is what the immune system learns to recognize.",
    biological:
      "Special immune cells in the skin, called Langerhans cells, pick up the altered proteins and carry them to nearby lymph nodes. There they show the new shape to T cells, a type of white blood cell, which then multiply and remember it. This first stage causes no symptoms. On a later exposure the memory T cells recognize the shape and release signals that cause inflammation one to three days afterward, which is why doctors call it a delayed or Type IV reaction. The result is red, itchy, sometimes blistering skin wherever the chemical touched.",
  },
  {
    codes: /^H334/,
    title: "Respiratory sensitizer",
    summary:
      "Breathing in dust or mist of the raw material can cause an allergy or asthma in workers who handle it regularly. The concern is mainly occupational, in factories where large quantities are processed, rather than for people using finished products. Once someone is sensitized, small amounts in the air can set off breathing problems. That is why workplaces use ventilation, enclosed equipment and masks. Consumer products are usually designed so the substance is not released as fine dust.",
    chemical:
      "When a fine powder or mist is inhaled, particles land on the moist lining of the nose, throat and lungs. Some of these substances are proteins, like the enzymes in detergents, and some are small reactive molecules that bind to the body's own proteins. Either way, the immune system meets a large molecule it does not recognize. Particles small enough to travel deep into the airways have the greatest effect. The more often and the more heavily someone breathes the substance in, the more likely the immune system is to respond.",
    biological:
      "In respiratory allergy the body makes antibodies called IgE that are specific to the substance. These antibodies sit on mast cells, immune cells packed with chemical messengers, that line the airways. On later exposures the substance links neighboring antibodies together, and the mast cells burst open and release histamine and other signals. These make the smooth muscle around the airways tighten and the lining swell and produce mucus. The result is sneezing, wheezing, a tight chest or a full asthma attack.",
  },
  {
    codes: /^H33[05]|^H332/,
    title: "Respiratory irritation",
    summary:
      "Vapors or dust from the concentrated chemical can irritate the nose, throat and lungs. This mostly matters when the pure substance is handled in bulk or used in a small room without fresh air. Symptoms usually go away soon after moving to fresh air. Using strong cleaners with a window open, and never mixing them, prevents most problems at home. The warning describes the raw material, not a normal amount of a finished product.",
    chemical:
      "Gases and fine particles that we breathe in dissolve in the thin layer of moisture that coats the inside of the airways. Once dissolved, some form acids or bases that change the local pH, while others react directly with the proteins and fats of the cells lining the airway. Very water-soluble gases, such as ammonia, dissolve high up in the nose and throat. Less soluble ones travel deeper into the lungs before reacting. The concentration in the air and how long someone breathes it both determine how much reaches the tissue.",
    biological:
      "The lining of the airways is packed with nerve endings that act as an early-warning system. When they detect an irritant, they trigger reflexes: sneezing and coughing to push it out, and a slight tightening of the airways to keep more from getting in. The irritated cells also release signals that bring extra blood flow and mucus, which can feel like a burning or sore throat. In people with asthma these reflexes are stronger, so they notice irritants sooner. Once exposure stops, the reflexes calm down and the lining heals.",
  },
  {
    codes: /^H304/,
    title: "Aspiration hazard",
    summary:
      "The main danger of swallowing the concentrated liquid is not poisoning but the risk that it slips into the lungs. This can happen if someone, especially a young child, chokes or vomits after swallowing it. That is why bottles of these liquids say not to induce vomiting and to call a poison center. The warning applies to the concentrated liquid, often an oil or solvent. It is one reason such products need child-resistant caps.",
    chemical:
      "Liquids that cause aspiration hazards are usually thin and slippery, with low viscosity (they flow easily) and low surface tension (they spread out instead of forming beads). Many are hydrocarbons, molecules made of only carbon and hydrogen, such as those in lamp oil or some solvents. Because they spread so easily over wet surfaces, a small amount can coat a large area very quickly. They also dissolve fatty substances well. Those two properties together are what make them dangerous inside the lungs.",
    biological:
      "The tiny air sacs in the lungs, called alveoli, stay open thanks to a thin film called lung surfactant, a natural soapy mixture of fats and proteins. If an oily liquid gets into the airways, it spreads over the air sacs and dissolves or disrupts this film. Without it, the air sacs collapse and fill with fluid, and the lungs struggle to absorb oxygen. The inflammation that follows is called chemical pneumonitis. It can be serious even when only a small amount was inhaled.",
  },
  {
    codes: /^H30[012]|^H31[012]/,
    title: "Harmful if swallowed or absorbed in large amounts",
    summary:
      "This warning means a large enough dose of the pure substance can make a person or animal seriously ill. It is measured in laboratory tests on the concentrated chemical, so it says nothing by itself about the small amounts in a finished product. Almost everything, including salt and water, is harmful at a high enough dose. What matters is how the amount you actually meet compares with the amount that causes harm. Products should still be kept away from small children, who weigh less and are more affected by a given amount.",
    chemical:
      "Toxicologists compare how poisonous substances are using a number called the LD50, which stands for 'lethal dose for 50 percent.' It is the amount, in milligrams per kilogram of body weight, that killed half of the test animals in a standard experiment. A lower LD50 means a more toxic substance, because less of it is needed to cause harm. Dividing by body weight lets scientists compare animals of different sizes and estimate effects in people. How a molecule actually causes harm depends on its chemistry, for example whether it blocks an enzyme or damages cell membranes.",
    biological:
      "After a substance is swallowed or soaks through the skin, it has to reach the bloodstream before it can affect most organs. The liver then works to break it down, and the kidneys work to remove it in urine. If the dose is small, these systems clear it before it builds up. If the dose is large, the body's clean-up systems can be overwhelmed, and the substance or its breakdown products can damage the organs that handle it. The amounts in consumer products are usually a small fraction of a harmful dose.",
  },
  {
    codes: /^H34[01]/,
    title: "Genetic toxicity flag",
    summary:
      "Laboratory tests suggest that the pure substance may damage DNA, the molecule that stores genetic instructions, at high doses. This is a hazard flag based on tests that often use concentrations far above what a person would encounter. Regulators take it seriously by setting exposure limits with large safety margins. A positive lab test does not mean the substance causes harm at everyday levels. Further studies are used to judge whether the effect matters in real life.",
    chemical:
      "DNA is a long molecule built from four chemical 'letters' called bases, and their order spells out the instructions for building proteins. A mutagen is a substance that chemically changes those letters. Some mutagens attach small groups of atoms, such as methyl or ethyl groups, to a base, which is called alkylation. Others produce reactive oxygen species, unstable forms of oxygen that tear electrons away from DNA. Either way, the altered base can be misread when the cell copies its DNA, so the wrong letter gets inserted.",
    biological:
      "Cells constantly check and repair their DNA, and most damage is fixed before it causes problems. If the damage is too great or is missed, the copying error becomes a permanent mutation, passed on each time the cell divides. Most mutations are harmless, but a few can change how a cell controls its growth. Over many years, an accumulation of such mutations can contribute to cancer. This is why regulators set exposure limits far below the doses that cause effects in tests.",
  },
  {
    codes: /^H35[01]/,
    title: "Carcinogenicity classification",
    summary:
      "This label means the substance can cause cancer under some conditions, usually at high doses or after long exposure. It is a statement about hazard, meaning what the substance is capable of, not about risk, meaning how likely harm is from normal use. Sunlight and alcoholic drinks carry the same kind of label. Regulators combine this classification with information about how much people are actually exposed to before setting limits. For many substances with this label, everyday exposure is far below the level of concern.",
    chemical:
      "Substances can contribute to cancer in two broad ways. Genotoxic carcinogens damage DNA directly, either by reacting with it or by being converted in the body into molecules that do. Non-genotoxic carcinogens do not touch DNA themselves; instead they push cells to divide more often, for example by causing long-lasting irritation or by acting like a hormone. Every cell division is a chance for a copying mistake, so more divisions mean more chances for errors. Which route a substance follows affects whether there is a 'safe' dose below which no extra risk is expected.",
    biological:
      "Cancer develops when a cell gathers several mutations that switch off its normal growth controls, so it keeps dividing when it should stop. This usually takes years and needs many separate changes, which is why dose and length of exposure matter so much. The body also has defenses: DNA repair, cells that self-destruct when badly damaged, and immune cells that remove abnormal ones. Hazard asks 'can it cause harm?', while risk asks 'will it, at this exposure?' The two can have very different answers.",
  },
  {
    codes: /^H36[0-2]/,
    title: "Reproductive toxicity flag",
    summary:
      "High-dose studies of the pure substance in animals raised concerns about effects on fertility or on a developing baby. These studies deliberately use large doses to find any possible effect. Regulators use the results to set limits that keep human exposure far below those levels. Pregnant people are often advised to be more cautious, because development before birth is especially sensitive. The flag describes the concentrated chemical, not a typical product.",
    chemical:
      "Some substances interfere with hormones, the chemical messengers that control growth, puberty and reproduction. They may have a shape similar enough to a natural hormone to fit its receptor, the protein 'lock' that hormones bind to, either switching it on or blocking it. Others interfere with rapidly dividing cells, which developing tissues have in large numbers. Molecules that easily cross biological barriers, such as the placenta, are more likely to reach a developing baby. Dose and timing both decide whether any effect happens.",
    biological:
      "During pregnancy, organs form in a precise sequence, and each one has a window when it is most sensitive. A substance that disturbs cell division or hormone signals during that window can change how the organ develops. In adults, similar disturbances can affect sperm production or the menstrual cycle. Effects seen at high doses in animals are used to calculate safety margins for people. Exposure limits are typically set at least 100 times below the dose with no observed effect.",
  },
  {
    codes: /^H37[0-3]/,
    title: "Organ toxicity with heavy exposure",
    summary:
      "Large or repeated exposure to the concentrated chemical can harm specific organs, such as the liver, kidneys or nervous system. The concern is mainly for workers who handle the pure substance every day, or for accidental poisoning. Workplace limits are set to keep exposure well below harmful levels. Consumer products contain far smaller amounts used for short periods. Following label directions keeps exposure in the safe range.",
    chemical:
      "When a substance enters the body, it travels in the blood and is processed by particular organs. The liver uses enzymes to change foreign molecules into forms that are easier to excrete; sometimes this step produces a more reactive product that does damage. The kidneys filter the blood and can concentrate substances as they make urine. Fat-soluble molecules can collect in fatty tissue or the brain. Where a substance ends up depends on its size, its solubility and how the body processes it.",
    biological:
      "Each organ can safely handle a certain amount of a foreign substance. With heavy or long-term exposure, that capacity can be overwhelmed, and cells in the organ begin to be damaged faster than they can be repaired. In the liver this can show up as inflammation; in the kidneys as reduced filtering; in the nervous system as headaches or dizziness. Many of these effects improve when exposure stops, but some can be lasting. This is what occupational exposure limits are designed to prevent.",
  },
  {
    codes: /^H22[4-6]/,
    title: "Flammable",
    summary:
      "The liquid, or the vapor that rises from it, can catch fire. That is why it should be stored away from heat, sparks and open flames, and why aerosol cans warn against spraying near a flame. The danger is burns and fire, not poisoning. Keeping the container closed reduces the amount of vapor in the air. Products containing flammable solvents, such as some hand sanitizers and hairsprays, carry this warning.",
    chemical:
      "Liquids do not burn as liquids; their vapor does. The flash point is the lowest temperature at which a liquid gives off enough vapor to ignite when a flame is nearby. A flammable liquid has a flash point near or below room temperature, so there is always some vapor above it. When that vapor meets a spark, its molecules react rapidly with oxygen in a process called combustion. The carbon–hydrogen bonds are broken and rebuilt as carbon dioxide and water, releasing a lot of energy as heat and light.",
    biological:
      "The harm from a flammable substance comes from fire rather than from its chemistry inside the body. Burns damage skin by heating its proteins until they lose their shape, which kills the cells. Breathing in hot gases or smoke can also injure the airways. Vapors that build up in a closed room can ignite all at once, which is why ventilation matters. Storing these products correctly removes almost all of the risk.",
  },
  {
    codes: /^H4(00|10|11|12)/,
    title: "Toxic to aquatic life",
    summary:
      "If large amounts reach rivers, lakes or the sea, this substance can harm fish, insects and other water life. That is why factories must treat their wastewater and why disposal is regulated. Small amounts that go down a home drain usually pass through a wastewater treatment plant, which removes or breaks down much of it. The concern grows if the substance breaks down slowly and builds up over time. Using products in the recommended amounts helps keep releases low.",
    chemical:
      "Many substances that harm aquatic life are hydrophobic, meaning 'water-fearing': they do not dissolve well in water and prefer to move into fatty environments. Others are surfactants, molecules with one end that likes water and another that likes oil. In a river, both kinds tend to leave the water and move into the fatty membranes of living things, especially the thin, delicate membranes of fish gills. Scientists measure this tendency with a number called the partition coefficient. The higher it is, the more the substance concentrates in living tissue.",
    biological:
      "Gills are where fish absorb oxygen from water, so their membranes must stay thin and intact. When foreign molecules build up in those membranes, the membranes become leaky or stiff, and oxygen exchange suffers. Small water creatures, such as water fleas, are often even more sensitive and are used as an early-warning test. Substances that persist can build up through the food chain, reaching higher levels in animals that eat contaminated prey. Regulators classify aquatic toxicity using the concentration that harms half of the test organisms.",
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
    // Up to three sentences per scale, so each reads as a paragraph rather than a single line.
    const chemAll = pick(sentences, RE.molecular, 3, nameRe, used);
    const bioAll = pick(sentences, RE.biological, 3, nameRe, used);
    const chem = chemAll.length ? { ...chemAll[0], text: chemAll.map((x) => x.text).join(" ") } : undefined;
    const bio = bioAll.length ? { ...bioAll[0], text: bioAll.map((x) => x.text).join(" ") } : undefined;
    // A finding only counts if it is actually about this ingredient: named in the sentences (or by the
    // abbreviation the abstract defines for it) or in the paper's title.
    if (!chem && !bio) continue;
    const docMeta = docs.find((d) => d.id === source);
    const abbr = docMeta?.text.match(new RegExp(`${nameRe.source}\\w*\\s*\\(([A-Z][A-Za-z0-9-]{1,7})\\)`, "i"))?.[1];
    const about = (t: string) => nameRe.test(t) || (!!abbr && new RegExp(`\\b${abbr}\\b`).test(t));
    if (!about(`${chem?.text ?? ""} ${bio?.text ?? ""}`) && !nameRe.test(docMeta?.title ?? "")) {
      for (const x of [...chemAll, ...bioAll]) used.delete(x.text);
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
          summary: firstSentences(manufacturing[0].text, 2, 420),
          mechanism: firstSentences(manufacturing[0].text, 6, 1200),
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
