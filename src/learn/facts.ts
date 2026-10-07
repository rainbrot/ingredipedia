// True statements for Myth or Fact. They're paired with the myths collected from ingredient profiles
// (served by /api/learn/myths), so players have to judge each claim on the evidence, not the tone.

export interface Fact {
  claim: string;
  explain: string;
  ingredientId?: string;
}

export const FACTS: Fact[] = [
  { claim: "Most citric acid in food is made by a mold, not squeezed from citrus fruit.", explain: "Aspergillus niger ferments sugar into citric acid, supplying more than two million tonnes a year.", ingredientId: "citric-acid" },
  { claim: "Synthetic vitamin C is chemically identical to the vitamin C in oranges.", explain: "Both are L-ascorbic acid. Your body can't tell them apart.", ingredientId: "ascorbic-acid" },
  { claim: "Sodium benzoate works best as a preservative in acidic foods like soda.", explain: "Only uncharged benzoic acid crosses microbial membranes, and it dominates below about pH 4.5.", ingredientId: "sodium-benzoate" },
  { claim: "Limonene from orange peel can become a skin allergen after it reacts with air.", explain: "Oxidation forms limonene hydroperoxides, which bind skin proteins and trigger sensitization.", ingredientId: "limonene" },
  { claim: "(R)-limonene and (S)-limonene are mirror-image molecules that smell different.", explain: "(R) smells of oranges and (S) harsher and piney, because smell receptors are chiral.", ingredientId: "limonene" },
  { claim: "Sucralose is made by replacing three of sugar's hydroxyl groups with chlorine atoms.", explain: "The swap makes it about 600 times sweeter than sugar, and the body barely absorbs it.", ingredientId: "sucralose" },
  { claim: "Aspartame breaks down into the same building blocks found in many common foods.", explain: "It splits into aspartic acid, phenylalanine and a small amount of methanol. A glass of tomato juice releases more methanol.", ingredientId: "aspartame" },
  { claim: "People with phenylketonuria (PKU) need to avoid aspartame.", explain: "They can't break down phenylalanine, one of aspartame's components, which is why labels carry a PKU warning.", ingredientId: "aspartame" },
  { claim: "Caffeine works by blocking receptors for adenosine, a molecule that signals tiredness.", explain: "Caffeine's shape mimics adenosine, so it occupies the receptor without activating it.", ingredientId: "caffeine" },
  { claim: "Glycerin is a natural by-product of making soap.", explain: "Saponification splits fats into soap and glycerin, a humectant that draws water into skin.", ingredientId: "glycerin" },
  { claim: "Sodium lauryl sulfate and sodium laureth sulfate are different ingredients.", explain: "Laureth sulfate has extra ethylene oxide units, giving it a larger head and making it milder.", ingredientId: "sodium-laureth-sulfate" },
  { claim: "A single gram of hyaluronic acid can hold several liters of water.", explain: "Its long, negatively charged chains bind huge numbers of water molecules.", ingredientId: "sodium-hyaluronate" },
  { claim: "Niacinamide is a form of vitamin B3.", explain: "It's the amide form of niacin and a building block of NAD⁺, which cells use in energy reactions.", ingredientId: "niacinamide" },
  { claim: "Zinc oxide protects skin from UV mainly by absorbing it, not by reflecting it.", explain: "Its electrons absorb UV photons; reflection and scattering account for only a few percent.", ingredientId: "zinc-oxide" },
  { claim: "Mixing bleach and ammonia releases toxic chloramine gases.", explain: "Hypochlorite reacts with ammonia to form chloramines, which damage the lungs. Never mix cleaners.", ingredientId: "sodium-hypochlorite" },
  { claim: "Bleach and vinegar should never be mixed.", explain: "Acid shifts hypochlorite toward chlorine gas.", ingredientId: "sodium-hypochlorite" },
  { claim: "Hand sanitizer needs at least 60% alcohol to reliably kill germs.", explain: "Some water helps alcohol unfold proteins, but below about 60% it works much less well.", ingredientId: "ethanol" },
  { claim: "Hydrogen peroxide breaks down into water and oxygen.", explain: "Light, heat and enzymes like catalase speed its decomposition, which is why it's sold in opaque bottles.", ingredientId: "hydrogen-peroxide" },
  { claim: "Monosodium glutamate provides the same glutamate found naturally in tomatoes and Parmesan.", explain: "Your body handles glutamate the same way regardless of its source.", ingredientId: "monosodium-glutamate" },
  { claim: "Lactic acid is the same molecule your muscles produce during intense exercise.", explain: "It's also made by the bacteria in yogurt, and in skincare it acts as a gentle exfoliant.", ingredientId: "lactic-acid" },
  { claim: "Retinol has to be converted by the skin before it acts.", explain: "Skin enzymes oxidize retinol to retinaldehyde and then retinoic acid, which binds nuclear receptors.", ingredientId: "retinol" },
  { claim: "Salicylic acid is chemically related to aspirin.", explain: "Aspirin is acetylsalicylic acid, a modified form of salicylic acid, originally found in willow bark.", ingredientId: "salicylic-acid" },
  { claim: "Baking soda makes dough rise by releasing carbon dioxide.", explain: "When it reacts with acid or heat, bicarbonate breaks down into CO₂ gas, water and a salt.", ingredientId: "sodium-bicarbonate" },
  { claim: "Xanthan gum is made by bacteria.", explain: "Xanthomonas campestris ferments sugar into this long polysaccharide, which thickens liquids at tiny doses.", ingredientId: "xanthan-gum" },
  { claim: "The same molecule can be both natural and synthetic.", explain: "Vanillin from vanilla beans and vanillin made in a lab are identical; only purity and price differ." },
  { claim: "Water can be toxic if you drink far too much too quickly.", explain: "Drinking several liters in a short time can dangerously dilute blood sodium (hyponatremia).", ingredientId: "water" },
  { claim: "IARC's cancer groups describe how strong the evidence is, not how large the risk is.", explain: "Processed meat and tobacco are both Group 1, but their risks at normal exposure differ greatly." },
  { claim: "Methylisothiazolinone was banned from leave-on cosmetics in the EU because it causes allergies.", explain: "A spike in allergic contact dermatitis in the 2010s led to the restriction.", ingredientId: "methylisothiazolinone" },
  { claim: "Tocopherol is the chemical name for vitamin E.", explain: "It protects fats in cell membranes by stopping lipid peroxidation chain reactions.", ingredientId: "tocopherol" },
  { claim: "Soy lecithin works as an emulsifier because it has both a water-loving and an oil-loving end.", explain: "Its phospholipids sit at the oil–water boundary, keeping chocolate and dressings smooth.", ingredientId: "soy-lecithin" },
];
