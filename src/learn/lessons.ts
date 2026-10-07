// Chemistry lessons built around the products students already own. Each lesson links to real
// ingredient profiles, includes an interactive model, and ends with a short check-for-understanding quiz.

export type WidgetId =
  | "label-decoder"
  | "dose-slider"
  | "same-molecule"
  | "ph-scale"
  | "micelle"
  | "ptrap"
  | "radical-chain"
  | "sensitization"
  | "chirality"
  | "evidence-sort";

export interface LessonStep {
  title: string;
  body: string[];
  widget?: WidgetId;
}

export interface QuizQuestion {
  q: string;
  /** The first option is the correct one; options are shuffled when shown. */
  options: string[];
  explain: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  level: "Intro" | "Core" | "Advanced";
  concepts: string[];
  ingredients: string[];
  steps: LessonStep[];
  quiz: QuizQuestion[];
}

export const LESSONS: Lesson[] = [
  {
    id: "reading-labels",
    title: "How to read an ingredient label",
    summary: "Ingredient order, scientific names, E-numbers and the umbrella terms that hide detail.",
    minutes: 6,
    level: "Intro",
    concepts: ["Ingredient order", "INCI names", "E-numbers"],
    ingredients: ["water", "fragrance", "citric-acid", "natural-flavors"],
    steps: [
      {
        title: "Ingredients are listed by amount",
        body: [
          "In the U.S. and the EU, ingredients must be listed in descending order by weight. The first three ingredients usually make up most of the product.",
          "In cosmetics, ingredients present below 1% may be listed in any order, which is why preservatives and fragrance often cluster near the end. In foods, the phrase “contains 2% or less of” marks a similar boundary: everything after it is a minor ingredient.",
        ],
      },
      {
        title: "Scientific names are a shared language",
        body: [
          "Cosmetics use INCI names (International Nomenclature of Cosmetic Ingredients) so a label means the same thing in every country. Water becomes “Aqua”, fragrance becomes “Parfum”, and plants appear by their Latin names: “Butyrospermum Parkii Butter” is shea butter.",
          "A long chemical name describes structure, not danger. “Sodium hydrogen carbonate” is baking soda. Tap the ingredients below to decode a real-looking label.",
        ],
        widget: "label-decoder",
      },
      {
        title: "E-numbers decoded",
        body: [
          "In Europe, approved food additives get an E-number; the E means the additive has passed an EU safety evaluation.",
          "The first digit hints at the job: E1xx colors, E2xx preservatives, E3xx antioxidants and acidity regulators, E4xx thickeners and emulsifiers, E6xx flavor enhancers, and E9xx sweeteners and glazing agents. Many are familiar: E300 is vitamin C, E330 is citric acid and E500 is baking soda.",
        ],
      },
      {
        title: "Umbrella terms hide detail",
        body: [
          "“Fragrance”, “flavors” and “colors” can each stand for many molecules, and companies may keep those formulas secret.",
          "That's why people with fragrance allergies look for “fragrance-free” rather than “unscented”: unscented products can still contain masking fragrance.",
        ],
      },
    ],
    quiz: [
      {
        q: "On a lotion label, Water is listed first and Fragrance near the end. What can you conclude?",
        options: ["The lotion contains more water than fragrance", "Fragrance is the most important ingredient", "The list is alphabetical", "The lotion contains exactly 1% fragrance"],
        explain: "Ingredients are listed in descending order by weight, so water makes up more of the product than fragrance.",
      },
      {
        q: "What does “Aqua” mean on a cosmetic label?",
        options: ["Water", "Seawater extract", "A preservative", "Aloe vera"],
        explain: "Aqua is the INCI name for water.",
      },
      {
        q: "E330 is…",
        options: ["Citric acid", "A synthetic dye", "An artificial sweetener", "A thickener"],
        explain: "E3xx numbers are antioxidants and acidity regulators; E330 is citric acid.",
      },
      {
        q: "Why can an “unscented” product still trigger a fragrance allergy?",
        options: ["It can contain a masking fragrance", "Unscented means it has extra preservatives", "Unscented products contain alcohol", "It can't; unscented and fragrance-free mean the same"],
        explain: "“Unscented” only means it doesn't smell; a masking fragrance may be added to cover other odors.",
      },
    ],
  },
  {
    id: "dose",
    title: "The dose makes the poison",
    summary: "LD50, safe daily limits, and why hazard and risk are different questions.",
    minutes: 7,
    level: "Core",
    concepts: ["Toxicology", "ADI and NOAEL", "Hazard vs. risk"],
    ingredients: ["caffeine", "water", "sodium-chloride", "aspartame"],
    steps: [
      {
        title: "Everything is toxic at some dose",
        body: [
          "In the 1500s, the physician Paracelsus wrote that the dose alone determines whether something is a poison. Water, salt and caffeine are harmless in normal amounts and dangerous in extreme ones.",
          "Toxicology is the science of measuring where that line falls.",
        ],
      },
      {
        title: "Measuring acute toxicity: the LD50",
        body: [
          "One classic measure is the LD50: the dose, per kilogram of body weight, that kills half of a group of test animals. A lower LD50 means a more toxic substance.",
          "Table salt's oral LD50 in rats is about 3,000 mg/kg; caffeine's is about 190 mg/kg. That doesn't make coffee dangerous; it means the dose matters more for caffeine than for salt.",
        ],
      },
      {
        title: "From animal data to safe daily limits",
        body: [
          "Regulators find the highest dose that causes no observed harm in long-term studies (the NOAEL), then divide by a safety factor, usually 100: 10 for differences between animals and people and 10 for differences among people.",
          "The result is the Acceptable Daily Intake (ADI), the amount you could consume every day for a lifetime without appreciable risk. Try it with caffeine below.",
        ],
        widget: "dose-slider",
      },
      {
        title: "Hazard vs. risk",
        body: [
          "A hazard is something that can cause harm; risk is the chance that it will, given your exposure. A shark is a hazard, but your risk is tiny if you stay on land.",
          "Labels such as “possibly carcinogenic” describe hazard. Whether there's real risk depends on the dose, the route (eating, breathing or skin contact) and how often you're exposed.",
        ],
      },
    ],
    quiz: [
      {
        q: "Substance A has an LD50 of 50 mg/kg and substance B has 5,000 mg/kg. Which is more acutely toxic?",
        options: ["A", "B", "They're equal", "You can't tell from the LD50"],
        explain: "A lower LD50 means less is needed to cause harm, so A is far more acutely toxic.",
      },
      {
        q: "Why do regulators usually divide the NOAEL by 100 to set the ADI?",
        options: ["To allow for differences between animals and humans and among people", "Because studies use 100 animals", "To convert grams to milligrams", "To make the number easier to remember"],
        explain: "Two tenfold safety factors cover animal-to-human differences and variation among people.",
      },
      {
        q: "An ingredient is labeled a hazard. What else do you need to judge its risk?",
        options: ["The dose and how you're exposed", "Its color", "Whether it's natural", "Nothing else"],
        explain: "Risk depends on exposure: how much, how often and by which route.",
      },
      {
        q: "About how much caffeine do health agencies consider safe for most healthy adults each day?",
        options: ["400 mg", "40 mg", "4,000 mg", "There is no limit"],
        explain: "FDA and EFSA cite about 400 mg a day for healthy adults (roughly four cups of coffee).",
      },
    ],
  },
  {
    id: "natural-synthetic",
    title: "Natural vs. synthetic",
    summary: "Why a molecule's origin doesn't determine its safety, and what it does tell you.",
    minutes: 5,
    level: "Intro",
    concepts: ["Molecular identity", "Appeal to nature"],
    ingredients: ["citric-acid", "ascorbic-acid", "natural-flavors", "artificial-flavors", "limonene"],
    steps: [
      {
        title: "A molecule doesn't remember where it came from",
        body: [
          "Vanillin made by a vanilla orchid, by a microbe or in a chemistry lab is the same arrangement of atoms. Your body and your nose can't tell them apart.",
          "What can differ is purity and what comes along with it: a vanilla bean also contains hundreds of other flavor molecules.",
        ],
        widget: "same-molecule",
      },
      {
        title: "“Natural” doesn't mean safe",
        body: [
          "Some of the most potent toxins are natural, from botulinum toxin to the cyanide-releasing compounds in bitter almonds.",
          "Natural ingredients can also be allergens: limonene from orange peel becomes a common skin sensitizer once it reacts with air.",
        ],
      },
      {
        title: "“Synthetic” doesn't mean harmful",
        body: [
          "Synthetic vitamin C is chemically identical to the vitamin C in oranges. The citric acid in foods is made by fermentation, not squeezed from lemons, and it's the same molecule.",
          "Judge an ingredient by its structure, dose and evidence, not by its origin story.",
        ],
      },
      {
        title: "Why Assay still shows origin",
        body: [
          "Origin matters for other reasons: farming practices, environmental impact and how heavily a food is processed. Assay separates organic and natural ingredients so you can see a product's makeup, while each health score is based on evidence about the molecule itself.",
        ],
      },
    ],
    quiz: [
      {
        q: "Synthetic vanillin and vanillin from vanilla beans are…",
        options: ["The same molecule", "Different molecules", "Different, because natural molecules are healthier", "Only safe when natural"],
        explain: "Same atoms in the same arrangement means the same molecule, whatever its source.",
      },
      {
        q: "Which natural substance becomes a common skin allergen after it oxidizes?",
        options: ["Limonene", "Water", "Glycerin", "Sodium chloride"],
        explain: "Limonene oxidizes in air into hydroperoxides that sensitize skin.",
      },
      {
        q: "Most citric acid in foods comes from…",
        options: ["Fermentation by a mold", "Squeezed lemons", "Petroleum", "Seawater"],
        explain: "Aspergillus niger mold ferments sugar into citric acid on an industrial scale.",
      },
    ],
  },
  {
    id: "ph",
    title: "Acids, bases and pH",
    summary: "The logarithmic pH scale, strong vs. weak acids, and why products care about pH.",
    minutes: 7,
    level: "Core",
    concepts: ["pH scale", "Strong vs. weak", "Neutralization"],
    ingredients: ["citric-acid", "acetic-acid", "sodium-bicarbonate", "sodium-hydroxide", "phosphoric-acid"],
    steps: [
      {
        title: "What pH measures",
        body: [
          "pH measures the concentration of hydrogen ions (H⁺) in a water solution. Lower pH means more H⁺, which means more acidic; pH 7 is neutral, the balance point of pure water.",
          "The scale is logarithmic: each step down is ten times more acidic. Lemon juice (pH about 2) has 100,000 times more H⁺ than pure water. Drag along the scale to see where everyday products fall.",
        ],
        widget: "ph-scale",
      },
      {
        title: "Strong vs. weak",
        body: [
          "Strong acids, like hydrochloric acid, release all their H⁺ in water. Weak acids, like citric and acetic acid, release only a fraction at any moment, which is one reason vinegar is safe to eat.",
          "Strength (how completely an acid ionizes) is different from concentration (how much is dissolved).",
        ],
      },
      {
        title: "Bases and neutralization",
        body: [
          "Bases accept H⁺ or release OH⁻. When an acid meets a base, they neutralize each other into water and a salt.",
          "Baking soda fizzes with vinegar because bicarbonate grabs H⁺ and breaks down into water and carbon dioxide.",
        ],
      },
      {
        title: "Why products care about pH",
        body: [
          "Skin's surface is slightly acidic (about pH 4.5–5.5), which supports its barrier and helpful bacteria. Preservatives like sodium benzoate only work at low pH, exfoliating acids need low pH, and drain cleaners need very high pH to dissolve grease.",
        ],
      },
    ],
    quiz: [
      {
        q: "Each step down the pH scale means the solution is…",
        options: ["10 times more acidic", "2 times more acidic", "10% more acidic", "Slightly less acidic"],
        explain: "pH is logarithmic: one unit is a tenfold change in hydrogen-ion concentration.",
      },
      {
        q: "Why is vinegar safe to eat even though it's acidic?",
        options: ["Acetic acid is a weak acid at low concentration", "Vinegar is a base", "The acid evaporates before you eat it", "Vinegar contains no acid"],
        explain: "Vinegar is about 5% acetic acid, a weak acid that ionizes only partly.",
      },
      {
        q: "Baking soda and vinegar fizz because…",
        options: ["Bicarbonate reacts with acid, releasing carbon dioxide", "They produce oxygen", "Vinegar boils", "Salt dissolves"],
        explain: "Acid converts bicarbonate into carbonic acid, which breaks down into water and CO₂ gas.",
      },
      {
        q: "Healthy skin's surface is…",
        options: ["Slightly acidic", "Strongly basic", "Exactly pH 7", "About pH 12"],
        explain: "Skin's acid mantle sits around pH 4.5–5.5.",
      },
    ],
  },
  {
    id: "surfactants",
    title: "How soap and surfactants work",
    summary: "Two-faced molecules, micelles, and why some cleansers dry out your skin.",
    minutes: 6,
    level: "Core",
    concepts: ["Polarity", "Micelles", "Amphiphiles"],
    ingredients: ["sodium-lauryl-sulfate", "sodium-laureth-sulfate", "cocamidopropyl-betaine", "sodium-dodecylbenzenesulfonate", "soy-lecithin"],
    steps: [
      {
        title: "Oil and water don't mix",
        body: [
          "Water molecules are polar and cling to each other through hydrogen bonds. Oil molecules are nonpolar, so water squeezes them out and they bead up.",
          "That's why rinsing with water alone can't remove greasy dirt.",
        ],
      },
      {
        title: "Two-faced molecules",
        body: [
          "A surfactant (surface-active agent) has a water-loving (hydrophilic) head and an oil-loving (hydrophobic) tail. Soap, SLS and lecithin all share this design.",
          "The head can be negatively charged (anionic, like SLS), positively charged (cationic, like disinfectant quats), both (zwitterionic, like cocamidopropyl betaine) or uncharged.",
        ],
      },
      {
        title: "Micelles: tiny oil traps",
        body: [
          "Above the critical micelle concentration, surfactant molecules cluster into spheres with their tails inside and heads outside. Oil dissolves into the oily core and rinses away with water. Add surfactant below to watch micelles form.",
        ],
        widget: "micelle",
      },
      {
        title: "Why some cleansers irritate",
        body: [
          "The same tails that grab oil can pull lipids out of your skin barrier, and single surfactant molecules can bind skin proteins.",
          "Milder cleansers use bigger heads (SLES) or mix in zwitterionic surfactants (betaines) to reduce this.",
        ],
      },
    ],
    quiz: [
      {
        q: "The tail of a surfactant is…",
        options: ["Hydrophobic (oil-loving)", "Hydrophilic (water-loving)", "Always positively charged", "Made of water"],
        explain: "Tails are long hydrocarbon chains that avoid water and dissolve in oil.",
      },
      {
        q: "A micelle traps oil…",
        options: ["In its oily core", "On its outer surface", "By turning it into water", "By heating it"],
        explain: "Tails point inward, creating an oily center where grease dissolves.",
      },
      {
        q: "Why is SLES milder than SLS?",
        options: ["Its larger head forms bigger micelles and fewer free, irritating molecules", "It has no tail", "It's a base", "It doesn't foam"],
        explain: "The ethoxylated head reduces the number of free surfactant molecules that bind skin proteins.",
      },
    ],
  },
  {
    id: "preservatives",
    title: "Preservatives and the pH trap",
    summary: "Why preservatives exist, how weak acids poison microbes, and the trade-offs between them.",
    minutes: 8,
    level: "Advanced",
    concepts: ["Henderson–Hasselbalch", "Membrane transport", "Risk trade-offs"],
    ingredients: ["sodium-benzoate", "potassium-sorbate", "methylparaben", "phenoxyethanol", "methylisothiazolinone"],
    steps: [
      {
        title: "Why preservatives exist",
        body: [
          "Any product containing water can grow bacteria, yeast and mold, especially once it's opened and touched. Contaminated cosmetics have caused eye and skin infections.",
          "Preservatives keep microbe counts low for months or years; preservative-free products usually need refrigeration, single-use packaging or very little water.",
        ],
      },
      {
        title: "The pH trap",
        body: [
          "Weak-acid preservatives such as sodium benzoate exist in two forms: the charged ion (benzoate) and the uncharged acid (benzoic acid). Only the uncharged acid can slip through a microbe's fatty membrane.",
          "The Henderson–Hasselbalch equation predicts the split: when the pH equals the pKa (4.2 for benzoic acid), exactly half is in the active form. Move the slider to see why benzoate works in soda but not in neutral foods.",
        ],
        widget: "ptrap",
      },
      {
        title: "Inside the microbe",
        body: [
          "Inside the cell, where the pH is near 7, benzoic acid releases its proton and becomes trapped as benzoate. Protons build up, acidifying the cell and blocking key enzymes.",
          "The microbe burns its energy pumping protons back out and stops growing.",
        ],
      },
      {
        title: "Every preservative is a trade-off",
        body: [
          "Methylisothiazolinone works at parts per million but is a strong skin sensitizer, so the EU banned it from leave-on cosmetics. Parabens rarely cause allergy, but longer-chain versions raised hormone questions. Phenoxyethanol is gentle but weaker against molds.",
        ],
      },
    ],
    quiz: [
      {
        q: "Which form of a weak-acid preservative crosses microbial membranes?",
        options: ["The uncharged acid", "The charged ion", "Both equally", "Neither"],
        explain: "Charged ions can't pass through the fatty core of a membrane; the neutral acid can.",
      },
      {
        q: "At pH 4.2 (benzoic acid's pKa), what fraction is in the active acid form?",
        options: ["50%", "100%", "10%", "0%"],
        explain: "When pH equals pKa, the acid and its ion are present in equal amounts.",
      },
      {
        q: "Why does sodium benzoate work poorly in a neutral (pH 7) product?",
        options: ["Almost all of it is the charged ion, which can't enter cells", "It evaporates", "It turns into sugar", "It makes the product too acidic"],
        explain: "At pH 7, less than 1% is uncharged benzoic acid.",
      },
      {
        q: "Why was methylisothiazolinone banned from leave-on cosmetics in the EU?",
        options: ["It's a strong skin sensitizer", "It doesn't kill bacteria", "It's too expensive", "It causes acne"],
        explain: "Its reactivity with skin proteins caused an epidemic of allergic contact dermatitis.",
      },
    ],
  },
  {
    id: "radicals",
    title: "Free radicals and antioxidants",
    summary: "Unpaired electrons, chain reactions, and how vitamin E and vitamin C work as a team.",
    minutes: 7,
    level: "Core",
    concepts: ["Free radicals", "Chain reactions", "Antioxidants"],
    ingredients: ["tocopherol", "ascorbic-acid", "bht", "limonene", "hydrogen-peroxide"],
    steps: [
      {
        title: "What is a free radical?",
        body: [
          "In most stable molecules, electrons come in pairs. A free radical has an unpaired electron, which makes it highly reactive: it grabs an electron from the nearest molecule, turning that molecule into a new radical.",
          "UV light, heat, metal ions and ordinary metabolism all produce radicals.",
        ],
      },
      {
        title: "Chain reactions",
        body: [
          "Radical reactions run in three stages: initiation (a radical forms), propagation (each radical creates another) and termination (two radicals meet, or an antioxidant stops the chain). This is how oils go rancid and how cell membranes are damaged. Step through it below.",
        ],
        widget: "radical-chain",
      },
      {
        title: "How antioxidants stop the chain",
        body: [
          "An antioxidant donates a hydrogen atom (or an electron) to a radical and becomes a radical itself, but one too stable to keep the chain going.",
          "Vitamin E protects fats in membranes, vitamin C works in water and recycles vitamin E, and BHT protects the oils in foods.",
        ],
      },
      {
        title: "More isn't always better",
        body: [
          "Your body also uses radicals deliberately, for signaling and to kill germs. In large trials, high-dose antioxidant supplements didn't prevent disease, and vitamin E supplements slightly increased prostate cancer risk. Antioxidants from a varied diet remain the best-supported approach.",
        ],
      },
    ],
    quiz: [
      {
        q: "What makes a free radical so reactive?",
        options: ["An unpaired electron", "An extra proton", "A double bond", "A positive charge"],
        explain: "An unpaired electron drives the radical to grab electrons from other molecules.",
      },
      {
        q: "In a radical chain reaction, the propagation step…",
        options: ["Turns one radical into another, keeping the chain going", "Stops the chain", "Creates the very first radical", "Removes all oxygen"],
        explain: "Propagation passes the unpaired electron from molecule to molecule.",
      },
      {
        q: "Vitamin C helps vitamin E by…",
        options: ["Regenerating it after it neutralizes a radical", "Dissolving it in water", "Replacing it in cell membranes", "Breaking it down"],
        explain: "Ascorbate reduces the tocopheroxyl radical back to active vitamin E.",
      },
    ],
  },
  {
    id: "allergies",
    title: "Irritation, allergies and haptens",
    summary: "How small molecules trick the immune system, and why old fragrances cause more rashes.",
    minutes: 7,
    level: "Advanced",
    concepts: ["Haptens", "Type IV hypersensitivity", "Patch testing"],
    ingredients: ["fragrance", "methylisothiazolinone", "limonene", "cocamidopropyl-betaine", "sodium-lauryl-sulfate"],
    steps: [
      {
        title: "Irritation vs. allergy",
        body: [
          "Irritation is direct damage: a harsh chemical disrupts skin cells, and anyone exposed to enough of it will react. It stops when exposure stops.",
          "An allergy is an immune memory. Only sensitized people react, but once they are, tiny amounts can trigger symptoms for life.",
        ],
      },
      {
        title: "Haptens: making proteins look foreign",
        body: [
          "Most chemicals are too small for the immune system to notice. Haptens are small, reactive molecules that bond to your own skin proteins, creating altered proteins the immune system flags as foreign. Walk through the process below.",
        ],
        widget: "sensitization",
      },
      {
        title: "Two phases",
        body: [
          "Sensitization: Langerhans cells carry hapten-modified proteins to lymph nodes and train T cells to recognize them. This takes days to weeks and causes no symptoms.",
          "Elicitation: on later contact, those T cells release inflammatory signals, causing a rash 24–72 hours afterward, a delayed (Type IV) reaction.",
        ],
      },
      {
        title: "Why old products can be worse",
        body: [
          "Some molecules become haptens only after reacting with air. Limonene and linalool oxidize into hydroperoxides, much stronger sensitizers.",
          "Dermatologists identify the culprit with patch testing: small amounts of suspects are taped to the back and checked after 48 and 72 hours.",
        ],
      },
    ],
    quiz: [
      {
        q: "Which statement describes an allergy rather than irritation?",
        options: ["Only sensitized people react, even to tiny amounts", "Everyone reacts at high enough doses", "It never involves the immune system", "One reaction cures it permanently"],
        explain: "Allergy depends on prior sensitization of the immune system.",
      },
      {
        q: "A hapten is…",
        options: ["A small molecule that bonds to skin proteins, making them look foreign", "A type of antibody", "A skin cell", "A kind of preservative"],
        explain: "Haptens are too small to be noticed alone; bonded to proteins, they become visible to the immune system.",
      },
      {
        q: "Allergic contact dermatitis usually appears…",
        options: ["24–72 hours after contact", "Within seconds", "Only after a year", "Never on the skin"],
        explain: "T-cell–driven (Type IV) reactions take a day or more to develop.",
      },
    ],
  },
  {
    id: "chirality",
    title: "Chirality: mirror-image molecules",
    summary: "Why (R)- and (S)-limonene smell different, and why your body cares about handedness.",
    minutes: 6,
    level: "Advanced",
    concepts: ["Enantiomers", "Stereocenters", "Racemic mixtures"],
    ingredients: ["limonene", "lactic-acid", "tocopherol", "aspartame"],
    steps: [
      {
        title: "Left and right hands",
        body: [
          "Some molecules exist in two forms that are mirror images but can't be stacked perfectly on each other, like your left and right hands. These forms are enantiomers, and such molecules are called chiral.",
          "Chirality usually comes from a carbon atom bonded to four different groups, called a stereocenter.",
        ],
      },
      {
        title: "Your nose can tell them apart",
        body: [
          "(R)-limonene smells of sweet oranges; its mirror image, (S)-limonene, smells harsher and pine-like. Same atoms, same bonds, different 3D shape.",
          "Smell receptors are proteins built from chiral amino acids, so one enantiomer fits better than the other. Rotate both models below and compare.",
        ],
        widget: "chirality",
      },
      {
        title: "Chirality in your body",
        body: [
          "Nearly all amino acids in your proteins are L-forms, and the sugars you metabolize are D-forms. Enzymes are chiral too, so they can make one enantiomer almost exclusively: citrus enzymes make nearly pure (R)-limonene.",
          "Aspartame tastes sweet only when both of its amino acids have the natural L configuration.",
        ],
      },
      {
        title: "Racemic mixtures",
        body: [
          "Ordinary synthesis without a chiral guide makes a 50:50 racemic mixture of both enantiomers. Synthetic vitamin E is a mixture of eight stereoisomers, which is why it's only about half as potent as natural vitamin E.",
        ],
      },
    ],
    quiz: [
      {
        q: "Enantiomers are…",
        options: ["Mirror-image forms of a molecule that can't be superimposed", "Molecules with different formulas", "Isotopes of the same element", "Ions with opposite charges"],
        explain: "Enantiomers share formula and bonds but differ in 3D handedness.",
      },
      {
        q: "Why can our noses distinguish (R)- and (S)-limonene?",
        options: ["Smell receptors are chiral proteins", "They have different numbers of atoms", "One of them is an acid", "One is radioactive"],
        explain: "A chiral receptor fits one mirror-image shape better than the other.",
      },
      {
        q: "A synthesis with no chiral catalyst usually produces…",
        options: ["A 50:50 racemic mixture", "Only the R form", "Only the S form", "No product"],
        explain: "Without a chiral influence, both mirror images form equally.",
      },
    ],
  },
  {
    id: "evidence",
    title: "How scientists judge evidence",
    summary: "Study designs, correlation vs. causation, hazard labels and how to read a scary headline.",
    minutes: 8,
    level: "Core",
    concepts: ["Study design", "Causation", "IARC groups"],
    ingredients: ["aspartame", "allura-red-ac", "titanium-dioxide", "sucralose", "methylparaben"],
    steps: [
      {
        title: "Not all studies are equal",
        body: [
          "Scientists rank evidence by how well a study rules out other explanations. Cell (in vitro) studies show what can happen in a dish. Animal studies show effects in a whole body, often at high doses. Human observational studies find associations. Randomized controlled trials test cause and effect. Systematic reviews combine many studies.",
          "Sort the example studies below from weakest to strongest.",
        ],
        widget: "evidence-sort",
      },
      {
        title: "Correlation isn't causation",
        body: [
          "If people who drink diet soda have more health problems, is the sweetener to blame, or are people who already have weight or blood-sugar problems more likely to choose diet drinks? That's reverse causation, and it's why randomized trials matter.",
        ],
      },
      {
        title: "Hazard labels vs. risk",
        body: [
          "The International Agency for Research on Cancer (IARC) classifies whether something can cause cancer at all (Groups 1, 2A, 2B and 3), not how likely it is at normal exposure.",
          "Processed meat and plutonium are both in Group 1, yet their risks at everyday exposure are wildly different.",
        ],
      },
      {
        title: "Reading a scary headline",
        body: [
          "Ask: Was it a cell, animal or human study? What dose was used compared with real exposure? Is it one study or a consistent body of evidence? Has it been replicated?",
          "Assay labels every mechanism with its evidence level so you can practice on real ingredients.",
        ],
      },
    ],
    quiz: [
      {
        q: "Which design best tests whether X causes Y in people?",
        options: ["A randomized controlled trial", "A cell study", "An animal study at high doses", "A news article"],
        explain: "Random assignment balances other factors, so differences can be attributed to X.",
      },
      {
        q: "IARC Group 2B means…",
        options: ["Limited evidence that it can cause cancer under some conditions", "It causes cancer at any dose", "It has been proven safe", "It's a medicine"],
        explain: "2B is “possibly carcinogenic”, based on limited evidence; it says nothing about the size of the risk.",
      },
      {
        q: "People who use a product report more headaches. What's one alternative explanation?",
        options: ["People who get headaches may be more likely to use it", "The product definitely causes headaches", "Headaches caused the product to be invented", "There is no alternative"],
        explain: "Reverse causation or other shared factors can create a correlation without causation.",
      },
      {
        q: "A dish study shows a chemical damages cells at 1,000 times normal exposure. The best conclusion is…",
        options: ["It's a hazard signal worth studying, not proof of real-world harm", "It's definitely dangerous to people", "It's definitely safe", "Cells and people always react the same way"],
        explain: "In vitro results at extreme doses guide further research but don't establish risk to people.",
      },
    ],
  },
];

export const LESSON_BY_ID = new Map(LESSONS.map((l) => [l.id, l]));
