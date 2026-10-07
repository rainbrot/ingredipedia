// Plain-language definitions for the chemistry and biology terms that appear in profiles and lessons.
// GlossaryText uses `match` to find terms in running text, so keep match forms specific enough that
// ordinary words aren't annotated.

export interface Term {
  id: string;
  term: string;
  def: string;
  /** Forms to recognize in text. All-lowercase forms match any case; forms with capitals (acronyms) match exactly. */
  match?: string[];
  lesson?: string;
}

export const GLOSSARY: Term[] = [
  { id: "acid", term: "Acid", def: "A substance that donates hydrogen ions (H⁺) in water, lowering the pH.", match: ["acid", "acids", "acidic"], lesson: "ph" },
  { id: "base", term: "Base", def: "A substance that accepts hydrogen ions or releases hydroxide (OH⁻), raising the pH.", match: ["alkaline", "alkali", "bases"], lesson: "ph" },
  { id: "ph", term: "pH", def: "A logarithmic scale from 0–14 measuring how acidic or basic a water solution is. Each unit is a tenfold change.", match: ["pH"], lesson: "ph" },
  { id: "pka", term: "pKa", def: "The pH at which half of an acid is ionized. Lower pKa means a stronger acid.", match: ["pKa"], lesson: "preservatives" },
  { id: "ion", term: "Ion", def: "An atom or molecule with an electric charge because it has gained or lost electrons.", match: ["ion", "ions", "ionized", "ionizes"] },
  { id: "salt", term: "Salt (chemistry)", def: "An ionic compound formed when an acid and a base neutralize each other. Table salt is just one example." },
  { id: "polar", term: "Polar", def: "Having an uneven distribution of charge, so one end is slightly positive and the other slightly negative. Polar molecules dissolve in water.", match: ["polar", "polarity"], lesson: "surfactants" },
  { id: "nonpolar", term: "Nonpolar", def: "Having an even charge distribution. Nonpolar molecules, like oils, don't mix with water.", match: ["nonpolar", "non-polar"], lesson: "surfactants" },
  { id: "hydrophilic", term: "Hydrophilic", def: "Water-loving. Attracted to and dissolves in water.", match: ["hydrophilic"], lesson: "surfactants" },
  { id: "hydrophobic", term: "Hydrophobic", def: "Water-fearing. Repelled by water and attracted to oils and fats.", match: ["hydrophobic", "lipophilic"], lesson: "surfactants" },
  { id: "surfactant", term: "Surfactant", def: "A molecule with a water-loving head and an oil-loving tail that lowers surface tension and lifts oil into water.", match: ["surfactant", "surfactants"], lesson: "surfactants" },
  { id: "micelle", term: "Micelle", def: "A tiny sphere of surfactant molecules with tails inward and heads outward, trapping oil in its core.", match: ["micelle", "micelles"], lesson: "surfactants" },
  { id: "emulsifier", term: "Emulsifier", def: "An ingredient that keeps oil and water mixed instead of separating.", match: ["emulsifier", "emulsifiers", "emulsion", "emulsify"] },
  { id: "hydrogen-bond", term: "Hydrogen bond", def: "A weak attraction between a hydrogen on one molecule and an oxygen or nitrogen on another. It gives water its high boiling point.", match: ["hydrogen bond", "hydrogen bonds", "hydrogen bonding"] },
  { id: "covalent", term: "Covalent bond", def: "A bond in which two atoms share a pair of electrons.", match: ["covalent", "covalently"] },
  { id: "radical", term: "Free radical", def: "An atom or molecule with an unpaired electron, which makes it highly reactive.", match: ["free radical", "free radicals", "radical", "radicals"], lesson: "radicals" },
  { id: "antioxidant", term: "Antioxidant", def: "A molecule that stops oxidation chain reactions by donating an electron or hydrogen atom to a radical.", match: ["antioxidant", "antioxidants"], lesson: "radicals" },
  { id: "oxidation", term: "Oxidation", def: "Loss of electrons, often by reacting with oxygen. Rusting and rancid oil are both oxidation.", match: ["oxidation", "oxidize", "oxidizes", "oxidized", "oxidizing", "autoxidation", "autooxidation"], lesson: "radicals" },
  { id: "reduction", term: "Reduction", def: "Gain of electrons; the opposite of oxidation. The two always happen together.", match: ["reduction", "reducing agent"] },
  { id: "ros", term: "Reactive oxygen species", def: "Oxygen-containing molecules such as superoxide and hydrogen peroxide that can damage cells; your body also uses them as signals.", match: ["reactive oxygen species", "ROS"], lesson: "radicals" },
  { id: "hydroperoxide", term: "Hydroperoxide", def: "A molecule containing an –O–O–H group, formed when oxygen adds to a molecule. Often unstable and reactive.", match: ["hydroperoxide", "hydroperoxides"], lesson: "allergies" },
  { id: "ozonolysis", term: "Ozonolysis", def: "A reaction in which ozone splits a carbon–carbon double bond.", match: ["ozonolysis"] },
  { id: "hydrolysis", term: "Hydrolysis", def: "Breaking a chemical bond by adding water.", match: ["hydrolysis", "hydrolyzed", "hydrolyzes"] },
  { id: "ester", term: "Ester", def: "A compound formed from an acid and an alcohol. Many fruity smells are esters.", match: ["ester", "esters", "esterification"] },
  { id: "enzyme", term: "Enzyme", def: "A protein that speeds up a specific chemical reaction in living things without being used up.", match: ["enzyme", "enzymes", "enzymatic"] },
  { id: "catalyst", term: "Catalyst", def: "A substance that speeds up a reaction without being consumed.", match: ["catalyst", "catalysts", "catalyzed", "catalyzes"] },
  { id: "isomer", term: "Isomer", def: "Molecules with the same formula but a different arrangement of atoms.", match: ["isomer", "isomers", "stereoisomers"], lesson: "chirality" },
  { id: "enantiomer", term: "Enantiomer", def: "One of two mirror-image forms of a chiral molecule that can't be superimposed, like left and right hands.", match: ["enantiomer", "enantiomers"], lesson: "chirality" },
  { id: "chiral", term: "Chiral", def: "Describes a molecule that isn't identical to its mirror image.", match: ["chiral", "chirality"], lesson: "chirality" },
  { id: "racemic", term: "Racemic mixture", def: "A 50:50 mixture of two enantiomers.", match: ["racemic", "dipentene"], lesson: "chirality" },
  { id: "monoterpene", term: "Monoterpene", def: "A plant compound built from two five-carbon isoprene units (10 carbons in total).", match: ["monoterpene", "monoterpenes", "terpene", "terpenes"] },
  { id: "isoprene", term: "Isoprene", def: "A five-carbon building block (C₅H₈) that plants use to make terpenes, rubber and more.", match: ["isoprene"] },
  { id: "volatile", term: "Volatile", def: "Evaporates easily at room temperature. Volatile compounds are often what you smell.", match: ["volatile", "volatility", "vocs", "volatile organic compounds"] },
  { id: "polymer", term: "Polymer", def: "A large molecule made of many repeating units, like starch, silicone or plastic.", match: ["polymer", "polymers", "polysaccharide", "polysaccharides"] },
  { id: "hapten", term: "Hapten", def: "A small molecule that becomes visible to the immune system only after bonding to one of your own proteins.", match: ["hapten", "haptens", "haptenation"], lesson: "allergies" },
  { id: "sensitization", term: "Sensitization", def: "The first, symptom-free phase of an allergy, when the immune system learns to recognize a substance.", match: ["sensitization", "sensitizer", "sensitizers", "sensitizing"], lesson: "allergies" },
  { id: "dermatitis", term: "Contact dermatitis", def: "Skin inflammation caused by something touching the skin, either by irritation or by an allergic reaction.", match: ["dermatitis"], lesson: "allergies" },
  { id: "t-cell", term: "T cell", def: "A white blood cell that recognizes specific molecules and coordinates immune responses, including delayed allergies.", match: ["T cell", "T cells", "T-cell", "T-cells"], lesson: "allergies" },
  { id: "cytokine", term: "Cytokine", def: "A small signaling protein that immune cells use to communicate, often triggering inflammation.", match: ["cytokine", "cytokines"] },
  { id: "inflammation", term: "Inflammation", def: "The body's protective response to injury or infection: redness, heat, swelling and pain.", match: ["inflammation", "inflammatory", "anti-inflammatory"] },
  { id: "nf-kb", term: "NF-κB", def: "A protein switch inside cells that turns on inflammation genes when released from its inhibitor, IκB.", match: ["NF-κB", "NF-kB"] },
  { id: "receptor", term: "Receptor", def: "A protein that binds a specific molecule and triggers a response, like a lock that fits one key.", match: ["receptor", "receptors"] },
  { id: "membrane", term: "Cell membrane", def: "The thin, fatty double layer that surrounds every cell and controls what enters and leaves.", match: ["cell membrane", "cell membranes", "lipid bilayer"] },
  { id: "metabolism", term: "Metabolism", def: "All the chemical reactions in the body that build up or break down molecules.", match: ["metabolism", "metabolized", "metabolizes", "metabolite", "metabolites"] },
  { id: "liver-enzymes", term: "Cytochrome P450", def: "A family of liver enzymes that break down drugs, toxins and many food chemicals.", match: ["cytochrome P450", "CYP450", "P450"] },
  { id: "bioaccumulation", term: "Bioaccumulation", def: "When a substance builds up in an organism faster than it's removed, often concentrating up the food chain.", match: ["bioaccumulation", "bioaccumulate", "bioaccumulates"] },
  { id: "biodegradable", term: "Biodegradable", def: "Able to be broken down by microbes into simpler substances like water and carbon dioxide.", match: ["biodegradable", "biodegrades", "biodegradation"] },
  { id: "ld50", term: "LD50", def: "The dose that kills half of a group of test animals, used to compare acute toxicity. Lower means more toxic.", match: ["LD50", "LD₅₀"], lesson: "dose" },
  { id: "adi", term: "Acceptable Daily Intake", def: "The amount of a substance a person can consume every day for a lifetime without appreciable risk.", match: ["acceptable daily intake", "ADI"], lesson: "dose" },
  { id: "noael", term: "NOAEL", def: "No Observed Adverse Effect Level: the highest dose in a study with no detectable harm.", match: ["NOAEL"], lesson: "dose" },
  { id: "carcinogen", term: "Carcinogen", def: "Something that can cause cancer. Whether it does depends on the dose and exposure.", match: ["carcinogen", "carcinogens", "carcinogenic", "carcinogenicity"], lesson: "evidence" },
  { id: "iarc", term: "IARC", def: "The International Agency for Research on Cancer, which classifies whether substances can cause cancer, not how likely they are to.", match: ["IARC"], lesson: "evidence" },
  { id: "gras", term: "GRAS", def: "Generally Recognized As Safe: an FDA status for food ingredients considered safe by qualified experts.", match: ["GRAS"] },
  { id: "in-vitro", term: "In vitro", def: "Done in a test tube or dish rather than in a living organism.", match: ["in vitro"], lesson: "evidence" },
  { id: "in-vivo", term: "In vivo", def: "Done in a living organism, such as an animal or a person.", match: ["in vivo"], lesson: "evidence" },
  { id: "rct", term: "Randomized controlled trial", def: "A study that randomly assigns people to a treatment or a comparison group, the best design for testing cause and effect.", match: ["randomized controlled trial", "randomized controlled trials", "randomized trial", "randomized trials"], lesson: "evidence" },
  { id: "meta-analysis", term: "Meta-analysis", def: "A study that statistically combines the results of many earlier studies.", match: ["meta-analysis", "meta-analyses", "systematic review"], lesson: "evidence" },
  { id: "endocrine", term: "Endocrine disruptor", def: "A chemical that can interfere with hormone signaling. Potency and dose determine whether this matters.", match: ["endocrine disruptor", "endocrine disruptors", "endocrine", "estrogenic"] },
  { id: "humectant", term: "Humectant", def: "An ingredient that attracts and holds water, keeping skin or food moist.", match: ["humectant", "humectants"] },
  { id: "chelator", term: "Chelating agent", def: "A molecule that grabs metal ions like a claw so they can't trigger spoilage or react.", match: ["chelating", "chelator", "chelate", "chelates", "chelation"] },
  { id: "fermentation", term: "Fermentation", def: "Using microbes like yeast or bacteria to convert sugars into other substances.", match: ["fermentation", "fermented", "ferments"] },
  { id: "distillation", term: "Distillation", def: "Separating liquids by boiling them and collecting the vapors as they condense.", match: ["distillation", "distilled"] },
  { id: "aerosol", term: "Secondary organic aerosol", def: "Tiny airborne particles formed when gases react in the air, contributing to indoor and outdoor haze.", match: ["secondary organic aerosol", "aerosol", "aerosols"] },
  { id: "ghs", term: "GHS", def: "The Globally Harmonized System, which standardizes chemical hazard statements and pictograms worldwide.", match: ["GHS"] },
];

export const TERM_BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]));
