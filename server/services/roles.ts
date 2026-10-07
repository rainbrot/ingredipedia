// The chemistry behind common ingredient roles. When the public databases have little to say about a
// specific ingredient, its role still explains a lot, so automatic profiles open with this context.

import { ORIGIN_LABEL, type Ingredient } from "../../shared/types";

const EMOLLIENT =
  "Emollients are oily or waxy molecules that fill the gaps between the outer skin cells and leave a thin film, which smooths the surface and slows water loss.";
const COLOR =
  "Colorants contain chromophores: stretches of alternating single and double bonds that absorb some wavelengths of visible light. The color you see is the light they don't absorb.";
const WAX = "Waxes are long-chain esters that are solid at room temperature. They form thin, water-repellent films that add shine and protect surfaces.";

export const ROLE_SCIENCE: Record<string, string> = {
  Thickener:
    "Thickeners are usually long-chain molecules (polymers) that tangle together or swell with water, forming a network that slows how fast the liquid flows. That network is what turns a runny mixture into a gel, cream or sauce.",
  Emulsifier:
    "Emulsifiers have a water-loving end and an oil-loving end, so they gather at the boundary between oil droplets and water and keep the two from separating.",
  Surfactant:
    "Surfactants are two-faced molecules: one end dissolves in water and the other in oil. Above a certain concentration they cluster into micelles that trap grease so it can be rinsed away.",
  Preservative:
    "Preservatives keep bacteria, yeast and mold from growing once a product is opened, usually by damaging microbial membranes or blocking the enzymes microbes need to grow.",
  "Preservative Booster":
    "Preservative boosters help preservatives work at lower concentrations, typically by loosening the outer membrane of microbes so the main preservative can get inside.",
  Humectant:
    "Humectants carry several water-attracting groups, often hydroxyl (–OH) groups, that form hydrogen bonds with water. They pull moisture from the air or deeper skin layers and hold it in place.",
  Emollient: EMOLLIENT,
  "Oil & Emollient": EMOLLIENT,
  Antioxidant:
    "Antioxidants donate an electron or a hydrogen atom to free radicals, stopping the chain reactions that turn oils rancid and break down other ingredients.",
  "Chelating Agent":
    "Chelating agents wrap around metal ions like a claw. Locking up metals such as iron, copper and calcium stops them from triggering spoilage, discoloration or soap scum.",
  "pH Adjuster":
    "pH adjusters are acids, bases or buffer salts that set and hold a product's acidity. That matters for how well preservatives work, how the product tastes or feels, and whether it's gentle on skin.",
  Sweetener:
    "Sweeteners fit the sweet-taste receptors on your tongue. Sugars also add bulk and calories, while high-intensity sweeteners are hundreds of times sweeter, so only tiny amounts are needed.",
  "Sugar Alcohol":
    "Sugar alcohols are sugars whose reactive carbonyl group has been reduced to a hydroxyl group. They still taste sweet but are absorbed slowly, so they add fewer calories and can ferment in the gut.",
  Colorant: COLOR,
  "Natural Colorant": COLOR,
  "Synthetic Dye": `${COLOR} Synthetic dyes are designed to stay bright and stable at very low concentrations.`,
  Flavoring:
    "Flavorings are mixtures of volatile molecules that reach smell receptors at the back of your nose, which is where most of what we call flavor actually comes from.",
  Fragrance:
    "Fragrances are blends of volatile molecules that evaporate at skin or room temperature and bind smell receptors in the nose. A few fragrance molecules can also sensitize skin.",
  "UV Filter":
    "UV filters absorb ultraviolet light and release the energy harmlessly, mostly as heat, before it can damage the DNA in skin cells.",
  Solvent: "Solvents dissolve other ingredients so they spread evenly. Polarity decides what a solvent can dissolve: like dissolves like.",
  "Oxidizing Agent":
    "Oxidizing agents pull electrons away from other molecules. That breaks up the colored parts of stains and damages the proteins and membranes of microbes.",
  Disinfectant: "Disinfectants kill microbes on surfaces, usually by dissolving their membranes or by oxidizing and unfolding their proteins.",
  "Leavening Agent":
    "Leavening agents release carbon dioxide gas, usually through an acid–base reaction, forming the bubbles that make dough and batter rise.",
  Nutrient: "Added nutrients replace vitamins and minerals lost in processing, or fortify foods to help prevent deficiencies.",
  Enzyme:
    "Enzymes are proteins that speed up specific reactions. In cleaners they cut stains made of protein, starch or fat into smaller pieces that wash away.",
  Wax: WAX,
  "Glazing Agent": WAX,
  "Botanical Extract":
    "Botanical extracts are mixtures pulled from plants with water, alcohol or oil, so their exact makeup varies with the plant, the growing conditions and the extraction method.",
};

const KIND: Record<Ingredient["kind"], string> = {
  compound: "compound",
  polymer: "polymer, a long chain of repeating units,",
  mixture: "mixture of related substances",
};

/** An educational opening for profiles the public databases barely describe. */
export function roleOverview(
  ing: Pick<Ingredient, "name" | "kind" | "origin" | "primaryRole" | "primaryCategory">,
  researchCount: number | null,
  afterDefinition = false,
): string[] {
  const origin = ORIGIN_LABEL[ing.origin].toLowerCase().replace(" origin", "");
  const article = /^[aeiou]/i.test(origin) ? "an" : "a";
  const role = ing.primaryRole === "Ingredient" ? "an ingredient" : `${/^[aeiou]/i.test(ing.primaryRole) ? "an" : "a"} ${ing.primaryRole.toLowerCase()}`;
  // When the literature has already defined it, skip the restatement and go straight to the role.
  const out = [
    afterDefinition
      ? `In ${ing.primaryCategory.toLowerCase()}, it works as ${role}.`
      : `${ing.name} is ${article} ${origin} ${KIND[ing.kind]} used as ${role} in ${ing.primaryCategory.toLowerCase()}.`,
  ];
  const science = ROLE_SCIENCE[ing.primaryRole];
  if (science) out[0] += ` ${science}`;
  if (researchCount && researchCount > 0) {
    out.push(
      `PubMed lists about ${researchCount.toLocaleString("en-US")} publications that mention it. Assay collected the most relevant abstracts under Sources, and the Mechanisms tab draws on them.`,
    );
  }
  return out;
}
