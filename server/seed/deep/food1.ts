import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const FOOD_DEEP_1: Record<string, DeepProfile> = {
  water: {
    overview: [
      "Water is a small, bent molecule (H₂O): one oxygen atom bonded to two hydrogen atoms at an angle of about 104.5°. Oxygen pulls the shared electrons toward itself, so the molecule is polar, with a partial negative charge on the oxygen and partial positive charges on the hydrogens.",
      "That polarity lets water molecules form hydrogen bonds with each other and with ions and other polar molecules. It is why water dissolves salt, sugar and acids so well (its nickname is the “universal solvent”), why it boils at an unusually high 100 °C for such a light molecule, and why ice floats: in the solid, molecules lock into an open hexagonal lattice that is less dense than the liquid.",
    ],
    mechanisms: [
      mech(
        "Dissolving and transporting nutrients",
        "Water's partial charges surround ions and polar molecules in hydration shells: the oxygen side faces cations such as Na⁺, the hydrogen side faces anions such as Cl⁻. The energy released by forming these shells helps pull crystals apart.",
        "Blood plasma is about 90% water, so dissolved glucose, salts, hormones and waste can travel through the body. The kidneys use water to flush out water-soluble waste such as urea.",
        "established",
      ),
      mech(
        "Hydrating the skin barrier",
        "Water hydrogen-bonds to keratin proteins and to the skin's natural moisturizing factor (amino acids, urea, lactate) in the outer layer, acting as a plasticizer that lets protein chains slide past one another.",
        "Hydrated skin is flexible and resists cracking. When humidity drops, water evaporates faster than it is replaced and skin feels tight and flaky, which is why lotions pair water with humectants and occlusives.",
        "established",
      ),
      mech(
        "Cooling the body",
        "Breaking hydrogen bonds takes a lot of energy: water's heat of vaporization is about 2,260 joules per gram, among the highest of any common liquid.",
        "As sweat evaporates, each gram carries that energy away from the skin, cooling the body during exercise or heat.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Autoionization",
        "Even perfectly pure water contains a tiny number of ions, because water molecules trade protons with each other.",
        [
          ["Proton transfer", "A hydrogen ion (proton) on one water molecule is attracted to a lone pair of electrons on a neighboring oxygen and hops across."],
          ["Ion pair", "This creates a hydronium ion (H₃O⁺) and a hydroxide ion (OH⁻)."],
          ["Equilibrium", "The reverse reaction is extremely fast, so at 25 °C only about 1 molecule in 555 million is ionized at any moment: each ion is present at 10⁻⁷ mol/L."],
        ],
        "This is where pH 7 comes from. pH is the negative logarithm of the hydronium concentration, so neutral water has a pH of 7; acids raise [H₃O⁺] and bases raise [OH⁻].",
        "2 H2O ⇌ H3O+ + OH-",
      ),
      rxn(
        "Hydrolysis",
        "Water can split bonds in other molecules, which is why water-based products need preservatives and pH control.",
        [
          ["Attack", "A lone pair on water's oxygen attacks an electron-poor atom, such as the carbonyl carbon of an ester."],
          ["Cleavage", "The original bond breaks; water's H and OH end up on the two fragments."],
          ["Catalysis", "Acids, bases, heat or enzymes (such as lipases) speed the reaction enormously."],
        ],
        "Hydrolysis is how your body digests fats and proteins, and why old lotions can separate or smell sour.",
        "RCOOR' + H2O → RCOOH + R'OH",
      ),
    ],
    hazards: [
      hz(
        "Water intoxication (hyponatremia)",
        "Only a risk when someone drinks many liters within a few hours.",
        "Drinking water much faster than the kidneys can excrete it (roughly 0.8–1 liter per hour) dilutes sodium in the blood below about 135 mmol/L.",
        "Water moves by osmosis into cells, which now hold relatively more dissolved particles than the blood, so they swell. Brain cells, confined by the skull, are most vulnerable: headache, confusion and, in extreme cases, seizures.",
      ),
      hz(
        "Microbial growth in products",
        "Water is what lets bacteria and mold grow in lotions and foods.",
        "Microbes need available, unbound water (high “water activity”) to run their metabolism.",
        "Contaminated cosmetics can carry bacteria such as Pseudomonas that cause skin and eye infections, which is why water-based products contain preservatives.",
      ),
    ],
    synthesis: [
      route(
        "The natural water cycle",
        "Earth's water is recycled, not manufactured.",
        "Solar energy evaporates water from oceans and lakes, leaving dissolved salts behind. The vapor condenses into clouds and falls as fresh rain, a planet-sized distillation.",
        { significance: "Rain is nearly pure, while groundwater picks up dissolved minerals; calcium and magnesium are what make water “hard”." },
      ),
      route(
        "Purification for cosmetics and labs",
        "Product-grade water is purified to remove minerals and microbes.",
        "Reverse osmosis pushes water through a membrane whose pores are too small for hydrated ions. Ion-exchange resins then swap any remaining ions for H⁺ and OH⁻, which combine into more water.",
        {
          steps: ["Filter out particles.", "Reverse osmosis rejects dissolved salts.", "Ion exchange removes remaining ions (deionization).", "UV light or fine filtration removes microbes."],
          equation: "H+ + OH- → H2O",
          significance: "Removing calcium and metal ions keeps formulas stable and stops them from weakening preservatives.",
        },
      ),
    ],
  },

  sucrose: {
    overview: [
      "Sucrose, table sugar, is a disaccharide: one glucose ring and one fructose ring joined by a glycosidic bond between their most reactive carbons. Because both “reducing” ends are tied up in that bond, sucrose is a non-reducing sugar and is more chemically stable than glucose.",
      "Its eight hydroxyl (–OH) groups make it extremely water-soluble (about 2 kilograms dissolves in a liter of water) and let it hold onto water in baked goods. Plants make sucrose in their leaves during photosynthesis and use it to move energy to roots, fruit and seeds.",
    ],
    mechanisms: [
      mech(
        "Sweet taste",
        "Sucrose's hydroxyl groups form a pattern of hydrogen bonds with the sweet-taste receptor (a T1R2/T1R3 protein pair) on the tongue, changing the receptor's shape.",
        "The activated receptor triggers a signaling cascade inside taste cells that fires nerves the brain reads as sweetness, a cue that evolved to steer us toward energy-rich foods.",
        "established",
      ),
      mech(
        "Digestion and blood sugar",
        "In the small intestine, the enzyme sucrase-isomaltase hydrolyzes the glycosidic bond, releasing free glucose and fructose.",
        "Glucose enters the blood within minutes and triggers insulin release. Fructose is absorbed by a different transporter (GLUT5) and processed mainly by the liver, where large, frequent amounts promote fat production.",
        "established",
      ),
      mech(
        "Tooth decay",
        "Mouth bacteria such as Streptococcus mutans ferment sucrose into lactic acid and use enzymes called glucosyltransferases to build sticky glucan polymers from it.",
        "Plaque acid drops the pH at the tooth surface below about 5.5, dissolving the calcium phosphate mineral (hydroxyapatite) of enamel. Frequent sugar leaves saliva no time to repair it, and a cavity forms.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Inversion (hydrolysis)",
        "Sucrose splits into its two building blocks when heated with acid or exposed to the enzyme invertase.",
        [
          ["Protonation", "An acid (or invertase) adds a proton to the oxygen of the glycosidic bond."],
          ["Cleavage", "The bond breaks, releasing glucose and a fructose fragment that water quickly completes."],
          ["Product", "The result is an equal mix of glucose and fructose called invert sugar."],
        ],
        "Invert sugar is sweeter and resists crystallizing, which keeps fondant, sorbet and jam smooth. Bees use invertase to turn nectar into honey.",
        "C12H22O11 + H2O → C6H12O6 + C6H12O6",
      ),
      rxn(
        "Caramelization",
        "Heating sugar on its own, without protein, creates caramel's color and flavor.",
        [
          ["Melting and splitting", "Above about 160 °C, sucrose melts and partly breaks into glucose and fructose."],
          ["Dehydration", "The sugars lose water molecules, forming reactive compounds such as hydroxymethylfurfural."],
          ["Polymerization", "These fragments link into brown polymers and release aromas such as buttery diacetyl and nutty furans."],
        ],
        "The same chemistry, run at industrial scale with controlled additives, produces caramel color for colas and sauces.",
      ),
    ],
    hazards: [
      hz(
        "Excess added sugar",
        "Sugar isn't toxic, but chronic excess is linked to weight gain, type 2 diabetes risk and fatty liver.",
        "Free sugars are digested quickly, delivering a large load of glucose and fructose without fiber to slow absorption.",
        "Repeated large insulin surges, plus fat production from fructose in the liver, contribute to insulin resistance over time when total calories exceed the body's needs.",
      ),
      hz(
        "Dental caries",
        "How often you eat sugar matters more than how much.",
        "Each sugary snack fuels about 20–30 minutes of acid production by plaque bacteria.",
        "Enamel loses minerals during each acid attack and only recovers between them, so constant sipping or snacking leads to cavities.",
      ),
    ],
    dosage:
      "A teaspoon (4 g) in a recipe is trivial; what matters is the daily total. One 12-oz regular soda contains about 39 g of sugar, more than the WHO's ideal limit of about 25 g of free sugars per day for adults.",
    synthesis: [
      route(
        "Biological synthesis (photosynthesis)",
        "Plants build sucrose from sunlight, water and carbon dioxide.",
        "In leaf chloroplasts, the Calvin cycle fixes CO₂ into three-carbon sugars. These move into the cytoplasm, where enzymes build UDP-glucose and fructose-6-phosphate. Sucrose-phosphate synthase joins them, and a phosphatase removes the phosphate to release sucrose.",
        { significance: "Sucrose is the plant's transport sugar: stable, non-reducing and easy to pump through the phloem to fruit, roots and seeds." },
      ),
      route(
        "Industrial extraction",
        "Refineries don't make sucrose; they extract what sugar cane and sugar beets already made.",
        "Cane is crushed, or beets are sliced and soaked in hot water, to release sugary juice. Lime and carbon dioxide are added, forming calcium carbonate that traps impurities. The clear juice is evaporated under vacuum, seeded with tiny crystals, and spun in centrifuges to separate white crystals from dark molasses.",
        { equation: "Ca(OH)2 + CO2 → CaCO3 + H2O", significance: "Brown sugar is refined white sugar with a little molasses added back." },
      ),
    ],
  },

  "sodium-chloride": {
    overview: [
      "Sodium chloride is an ionic compound. Sodium gives up one electron to chlorine, forming Na⁺ and Cl⁻ ions that attract each other strongly. The ions stack into a cubic crystal lattice in which every sodium is surrounded by six chlorides, and every chloride by six sodiums, which is why salt grains are tiny cubes.",
      "When salt dissolves, water's partial charges pull the lattice apart into separate, water-coated ions. Those free ions are what you taste, what lets salt water conduct electricity, and what your nerves use to send signals.",
    ],
    mechanisms: [
      mech(
        "Nerve and muscle signaling",
        "The sodium–potassium pump in every cell membrane spends energy (ATP) to push three Na⁺ ions out for every two K⁺ ions it brings in, building a concentration gradient.",
        "When a nerve fires, sodium channels open and Na⁺ rushes in, flipping the membrane's electrical charge. That wave travels along the nerve as an action potential; every heartbeat and thought depends on it.",
        "established",
      ),
      mech(
        "Salty taste",
        "Na⁺ ions pass through epithelial sodium channels (ENaC) in taste cells on the tongue.",
        "The incoming positive charge activates the cell and signals “salty”, a drive that helps us seek out an essential mineral.",
        "established",
      ),
      mech(
        "Blood pressure",
        "Extra sodium raises the concentration of dissolved particles in blood, so the body holds onto water to dilute it.",
        "A larger blood volume, along with hormonal and blood-vessel changes, raises blood pressure, especially in salt-sensitive people. Randomized trials show that cutting sodium lowers blood pressure.",
        "human",
      ),
      mech(
        "Preserving food",
        "Dissolved salt binds water in hydration shells, lowering the water activity available to microbes.",
        "Bacteria lose water to the salty surroundings by osmosis and stop growing, which is how salt-curing, pickling and brining preserve food.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving",
        "Salt dissolves by trading ion–ion attractions for ion–water attractions.",
        [
          ["Attraction", "Water molecules orient their partial charges toward ions at the crystal's edges and corners."],
          ["Separation", "Ions are pulled free and wrapped in hydration shells."],
          ["Entropy", "The process absorbs a little heat, but the increase in disorder drives it forward."],
        ],
        "Dissolving salt very slightly cools the water, and salty water freezes at a lower temperature, which is why salt melts ice on roads.",
        "NaCl(s) → Na+(aq) + Cl-(aq)",
      ),
      rxn(
        "Chlor-alkali electrolysis",
        "Electricity splits saltwater into three of industry's most important chemicals.",
        [
          ["Oxidation at the anode", "Chloride ions lose electrons and pair up as chlorine gas."],
          ["Reduction at the cathode", "Water molecules gain electrons, releasing hydrogen gas and leaving hydroxide ions."],
          ["Separation", "A membrane lets Na⁺ cross to join the OH⁻, producing sodium hydroxide while keeping the chlorine apart."],
        ],
        "Salt is the starting point for bleach, lye, PVC plastic and countless other products.",
        "2 NaCl + 2 H2O → Cl2 + H2 + 2 NaOH",
      ),
    ],
    hazards: [
      hz(
        "High blood pressure from excess sodium",
        "The risk comes from long-term daily totals, not any one food.",
        "Sustained high sodium intake keeps blood volume and vessel resistance elevated.",
        "Over years this raises the risk of stroke, heart disease and kidney disease, which is why health agencies set daily sodium targets.",
      ),
      hz(
        "Acute salt poisoning",
        "Swallowing very large amounts at once is dangerous, especially for small children.",
        "A large salt load sharply raises blood sodium (hypernatremia).",
        "Water rushes out of cells by osmosis. Shrinking brain cells can tear small blood vessels, causing confusion, seizures or worse.",
      ),
    ],
    dosage:
      "The WHO recommends under 2 g of sodium (5 g of salt, about a teaspoon) per day; the global average is about double that. Processed and restaurant foods supply most of it, not the salt shaker.",
    synthesis: [
      route(
        "Solar evaporation of seawater",
        "Sun and wind do most of the work.",
        "Seawater, about 3.5% dissolved salts, flows into a series of shallow ponds. As water evaporates, the least soluble salts (such as calcium sulfate) crystallize first, then sodium chloride, leaving very soluble magnesium salts behind in the leftover brine.",
        { significance: "This is fractional crystallization: separating substances by how soluble they are." },
      ),
      route(
        "Mining and vacuum evaporation",
        "Most salt comes from ancient seas that dried up millions of years ago.",
        "Rock salt is mined directly, or water is pumped into underground salt beds to dissolve them (solution mining). The brine is boiled in vacuum pans, where lower pressure lowers the boiling point and saves energy.",
        { significance: "Adding potassium iodide to table salt prevents iodine deficiency, one of history's most successful public-health measures." },
      ),
    ],
  },

  "citric-acid": {
    overview: [
      "Citric acid is a six-carbon molecule carrying three carboxylic acid groups (–COOH) and one hydroxyl group (–OH). Each carboxylic acid group can release a proton, so citric acid is a triprotic weak acid, with pKa values of about 3.1, 4.8 and 6.4.",
      "Those three carboxylate arms can wrap around a metal ion like a claw, a property called chelation (from the Greek chele, claw), which makes citric acid useful far beyond adding sourness. It is also central to life: every cell that breathes oxygen makes and breaks down citrate in the Krebs cycle.",
    ],
    mechanisms: [
      mech(
        "Energy metabolism (the Krebs cycle)",
        "The enzyme citrate synthase joins two-carbon acetyl-CoA with four-carbon oxaloacetate to form citrate. A series of enzyme reactions then strips electrons from it, releasing two CO₂ and regenerating oxaloacetate.",
        "The captured electrons power ATP production in mitochondria, so dietary citric acid simply joins a pathway your cells run constantly.",
        "established",
      ),
      mech(
        "Sour taste",
        "Released hydrogen ions (H⁺) flow into sour-sensing taste cells through a proton channel called OTOP1.",
        "Acidifying the inside of the cell triggers the “sour” signal. Because citric acid is a weak acid, it tastes tart rather than harsh.",
        "established",
      ),
      mech(
        "Exfoliation (as an alpha-hydroxy acid)",
        "At low pH, citric acid weakens the ionic and hydrogen bonds in desmosomes, the protein rivets holding dead surface skin cells together.",
        "Dead cells shed faster and skin looks smoother. In most cosmetics, though, it's used in tiny amounts just to adjust pH.",
        "human",
      ),
      mech(
        "Antioxidant helper",
        "By chelating iron and copper ions, citric acid stops these metals from catalyzing the breakdown of fats and vitamins.",
        "Foods and cosmetics stay fresh longer, and antioxidants such as vitamin C work better alongside it.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Neutralization with baking soda (the bath-bomb reaction)",
        "Citric acid and sodium bicarbonate react only once water lets their ions meet.",
        [
          ["Proton donation", "Each citric acid molecule donates up to three protons to bicarbonate ions."],
          ["Carbonic acid", "Bicarbonate becomes carbonic acid (H₂CO₃), which is unstable."],
          ["Gas release", "Carbonic acid splits into water and carbon dioxide gas: the fizz."],
        ],
        "Dry powders don't react, which is why bath bombs and effervescent tablets stay inert until they get wet.",
        "C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 H2O + 3 CO2",
      ),
      rxn(
        "Chelation and descaling",
        "Citric acid dissolves limescale and grabs hard-water minerals.",
        [
          ["Acid attack", "Protons react with calcium carbonate scale, releasing carbon dioxide."],
          ["Binding", "Citrate's carboxylate groups grip the freed Ca²⁺ ions from several sides at once."],
          ["Clearing", "The calcium stays tied up as citrate complexes instead of re-forming scale."],
        ],
        "This is how citric acid descales kettles and why it softens water in eco-friendly detergents.",
        "3 CaCO3 + 2 C6H8O7 → Ca3(C6H5O7)2 + 3 H2O + 3 CO2",
      ),
    ],
    hazards: [
      hz(
        "Tooth enamel erosion",
        "Frequent sipping of acidic drinks slowly wears enamel.",
        "Below about pH 5.5, hydrogen ions dissolve hydroxyapatite, and citrate pulls away the released calcium, speeding the process.",
        "Unlike cavities, erosion happens without bacteria; it thins enamel and causes sensitivity. Drinking with meals or through a straw, and not brushing right afterward, helps.",
      ),
      hz(
        "Eye and skin irritation when concentrated",
        "Harmless at the 0.1–1% used in products.",
        "Concentrated solutions have a low pH that denatures proteins at the surface of the eye or broken skin.",
        "The result is stinging and redness that resolves after rinsing.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis (in citrus and every cell)",
        "Citrus fruit is sour because it stockpiles citrate.",
        "Citrate synthase condenses acetyl-CoA and oxaloacetate in mitochondria. Citrus juice cells pump the citrate into large storage vacuoles, so lemon juice ends up about 5–6% citric acid.",
      ),
      route(
        "Industrial fermentation",
        "Nearly all citric acid is made by a mold, not squeezed from lemons.",
        "Aspergillus niger is grown on sugar with deliberately limited iron and manganese. These shortages slow the enzymes that would normally consume citrate, so it builds up and the mold excretes it. The broth is filtered, citrate is precipitated with lime as calcium citrate, then freed with sulfuric acid, leaving gypsum behind.",
        { equation: "Ca3(C6H5O7)2 + 3 H2SO4 → 2 C6H8O7 + 3 CaSO4", significance: "More than two million tonnes a year are made this way, far cheaper than extracting it from fruit." },
      ),
    ],
  },

  "ascorbic-acid": {
    overview: [
      "Ascorbic acid is vitamin C: a small six-carbon molecule built around a five-membered ring that carries an enediol group, two –OH groups attached to a carbon–carbon double bond. That enediol gives up electrons easily, which makes vitamin C a strong reducing agent and antioxidant.",
      "Most animals make their own vitamin C from glucose, but humans, other primates and guinea pigs lost the final enzyme (L-gulonolactone oxidase) to a mutation millions of years ago. We must eat it; without it, collagen falls apart and scurvy follows.",
    ],
    mechanisms: [
      mech(
        "Building collagen",
        "Ascorbate keeps the iron atom inside prolyl and lysyl hydroxylase enzymes in its active Fe²⁺ form. These enzymes add –OH groups to proline and lysine in newly made collagen chains.",
        "Hydroxylated collagen twists into a strong triple helix. Without vitamin C, collagen is weak: gums bleed, wounds reopen and blood vessels leak, the classic signs of scurvy.",
        "established",
      ),
      mech(
        "Antioxidant defense",
        "Ascorbate donates an electron to neutralize a free radical, becoming the relatively stable ascorbyl radical, which then loses a second electron to form dehydroascorbic acid.",
        "It protects the watery parts of cells and regenerates vitamin E in cell membranes; enzymes recycle dehydroascorbate back into ascorbate.",
        "established",
      ),
      mech(
        "Iron absorption",
        "Vitamin C reduces ferric iron (Fe³⁺) from plant foods to ferrous iron (Fe²⁺) and keeps it dissolved.",
        "Intestinal cells absorb Fe²⁺ through the DMT1 transporter, so vitamin C eaten with a meal can multiply absorption of plant iron several-fold.",
        "human",
      ),
      mech(
        "Fading dark spots",
        "Applied to skin at low pH, ascorbic acid inhibits tyrosinase, the copper-containing enzyme that starts melanin production, partly by reducing its copper center.",
        "Less melanin forms in treated areas, so dark spots fade over weeks; vitamin C also supports collagen in the deeper skin.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Oxidation (why vitamin C serums turn brown)",
        "Vitamin C protects other molecules by sacrificing itself.",
        [
          ["First electron", "Ascorbate loses one electron to oxygen or a radical, forming the ascorbyl radical."],
          ["Second electron", "It loses a second electron and becomes dehydroascorbic acid."],
          ["Breakdown", "Dehydroascorbic acid ring-opens irreversibly and degrades into yellow-brown compounds."],
        ],
        "Light, heat, air and metal ions speed this up, which is why serums come in dark, airless bottles and turn orange once they've lost potency.",
        "C6H8O6 → C6H6O6 + 2 H+ + 2 e-",
      ),
      rxn(
        "Benzene formation with sodium benzoate",
        "A rare but famous interaction discovered in soft drinks.",
        [
          ["Radical generation", "Ascorbic acid reduces traces of copper or iron, which react with dissolved oxygen to produce hydroxyl radicals (•OH)."],
          ["Decarboxylation", "Hydroxyl radicals attack benzoic acid and knock off its carboxyl group as CO₂."],
          ["Product", "The leftover ring is benzene."],
        ],
        "Heat and light accelerate it. After testing in 2006, manufacturers reformulated, and most drinks now test below the 5 parts-per-billion drinking-water limit.",
        "C6H5COOH → C6H6 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Digestive upset at megadoses",
        "Only relevant to high-dose supplements.",
        "Vitamin C absorption saturates, so unabsorbed vitamin C stays in the gut and draws water in by osmosis.",
        "Doses above about 2 g a day can cause cramps and diarrhea.",
      ),
      hz(
        "Kidney stones in susceptible people",
        "A concern for long-term high supplement doses, mainly in men with a history of stones.",
        "Some vitamin C is metabolized into oxalate, which binds calcium.",
        "Higher urinary oxalate raises the chance of calcium oxalate stones forming in the kidney.",
      ),
    ],
    dosage:
      "The recommended intake is 75 mg a day for women and 90 mg for men (an orange has about 70 mg); the upper limit is 2,000 mg. Serums use 10–20% at pH below 3.5, which can tingle.",
    synthesis: [
      route(
        "Biological synthesis",
        "Most animals and all plants make their own vitamin C.",
        "Animals convert glucose to glucuronic acid, then to L-gulonolactone, which the enzyme L-gulonolactone oxidase turns into ascorbic acid. Plants use a different route through the sugars GDP-mannose and L-galactose.",
        { significance: "Humans still carry a broken copy of that last gene (a pseudogene), shared with other primates as evidence of common ancestry." },
      ),
      route(
        "Industrial two-step fermentation",
        "Factories combine chemistry and microbes.",
        "Glucose is hydrogenated to sorbitol over a nickel catalyst. Gluconobacter bacteria oxidize sorbitol to L-sorbose, and a second fermentation produces 2-keto-L-gulonic acid. Acid-catalyzed ring closure then forms ascorbic acid.",
        {
          equation: "C6H12O6 + H2 → C6H14O6",
          significance: "This largely replaced Tadeus Reichstein's 1933 process, which used more chemical steps and solvents.",
        },
      ),
    ],
  },

  "sodium-benzoate": {
    overview: [
      "Sodium benzoate is the sodium salt of benzoic acid: a flat benzene ring attached to a carboxylate group (–COO⁻ Na⁺). As a salt it dissolves easily in water, about 630 grams per liter.",
      "Its preservative power depends on pH. Benzoic acid has a pKa of about 4.2, so in acidic foods and drinks (pH below 4.5) much of it exists as uncharged benzoic acid, the form that slips through microbial membranes. In neutral products it stays charged and works poorly, which is why it's used in sodas, pickles and sauces.",
    ],
    mechanisms: [
      mech(
        "Stopping yeast and mold (the pH trap)",
        "Uncharged benzoic acid diffuses across a microbe's fatty cell membrane. Inside, where the pH is near neutral, it releases its proton and becomes the charged benzoate ion, which is trapped.",
        "Protons pile up and acidify the cell's interior, inhibiting glycolysis enzymes such as phosphofructokinase. The microbe burns its energy pumping protons back out and stops growing.",
        "established",
      ),
      mech(
        "Clearance in the human body",
        "In liver mitochondria, benzoate is activated to benzoyl-CoA and joined to the amino acid glycine, forming hippuric acid.",
        "Hippuric acid is water-soluble and leaves in urine within hours. Doctors use this pathway on purpose to remove excess nitrogen in babies with urea-cycle disorders.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Activation in acidic food",
        "The preservative switches on only when the surroundings are acidic.",
        [
          ["Acidic environment", "A soda at pH 3 contains many free hydrogen ions."],
          ["Equilibrium shift", "Benzoate ions pick up protons, so most of the preservative becomes uncharged benzoic acid."],
          ["Activation", "Only this uncharged form can cross microbial membranes."],
        ],
        "This is why sodium benzoate is paired with acidic products and barely works in neutral ones.",
        "C6H5COO- + H+ ⇌ C6H5COOH",
      ),
      rxn(
        "Benzene formation",
        "Under specific conditions, benzoate can lose its carboxyl group.",
        [
          ["Trigger", "Vitamin C plus traces of copper or iron generate hydroxyl radicals in the drink."],
          ["Decarboxylation", "A radical removes the –COOH group as carbon dioxide."],
          ["Product", "Trace benzene forms, faster with heat and light."],
        ],
        "Reformulation after 2006 keeps most drinks below drinking-water limits; storing drinks cool and dark also helps.",
        "C6H5COOH → C6H6 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Trace benzene in drinks",
        "A chemistry caveat rather than a risk of the preservative itself.",
        "Benzene forms only when benzoate, vitamin C, metal ions, heat and light coincide.",
        "Benzene damages bone marrow and causes leukemia at high, long-term workplace exposures; the trace amounts in reformulated drinks are below drinking-water limits.",
      ),
      hz(
        "Pseudo-allergic reactions",
        "Affects a small minority, often people sensitive to aspirin or with chronic hives.",
        "Benzoates can trigger mast cells to release histamine directly, without the IgE antibodies of a true allergy.",
        "The released histamine causes hives, flushing or, rarely, asthma symptoms.",
      ),
      hz(
        "Behavior in sensitive children (as part of mixtures)",
        "Evidence comes from mixtures with dyes, not benzoate alone.",
        "The mechanism is unknown; one hypothesis involves histamine release in the brain.",
        "The 2007 Southampton trial found that additive mixtures containing benzoate slightly increased hyperactive behavior in some children; benzoate's individual contribution couldn't be separated.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from toluene, a petroleum chemical.",
        "Toluene is oxidized by air at about 150 °C over cobalt or manganese catalysts; a radical chain reaction turns its methyl group into a carboxyl group, giving benzoic acid. The acid is purified and neutralized with sodium hydroxide.",
        {
          equation: "C6H5CH3 + 3/2 O2 → C6H5COOH + H2O",
          significance: "Food-grade benzoate must meet strict purity limits for leftover byproducts.",
        },
      ),
      route(
        "Biological synthesis in plants",
        "Some fruits make their own benzoic acid.",
        "Plants convert the amino acid phenylalanine into cinnamic acid, then shorten its side chain by two carbons to form benzoic acid.",
        { significance: "Cranberries and lingonberries accumulate enough benzoic acid to help them resist spoilage." },
      ),
    ],
  },

  "potassium-sorbate": {
    overview: [
      "Potassium sorbate is the potassium salt of sorbic acid, a six-carbon fatty acid with two conjugated double bonds (CH₃–CH=CH–CH=CH–COOH). The alternating single and double bonds share electrons along the chain, which makes the molecule absorb UV light and react slowly with oxygen.",
      "Like benzoate, it works best as the uncharged acid, but sorbic acid's higher pKa (4.76) means it keeps working up to about pH 6.5, so it suits cheese, baked goods and wine. Because it looks like a natural fatty acid, the body burns it for energy the same way it burns dietary fat.",
    ],
    mechanisms: [
      mech(
        "Inhibiting mold and yeast",
        "Uncharged sorbic acid enters microbial cells, where it reacts with sulfhydryl (–SH) groups on enzymes and disrupts transport across the membrane.",
        "Key metabolic enzymes slow down, so molds and yeasts can't grow. Bacteria are less affected, which is why sorbate is often paired with acidity or other preservatives.",
        "lab",
      ),
      mech(
        "Metabolized like a fat",
        "In cells, sorbic acid is attached to coenzyme A and shortened two carbons at a time by beta-oxidation, the same pathway that breaks down dietary fatty acids.",
        "It ends up as carbon dioxide and water, releasing energy, so it doesn't build up in the body.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Acid–base equilibrium",
        "The active form depends on the product's pH.",
        [
          ["Dissolving", "Potassium sorbate dissolves into K⁺ and sorbate ions."],
          ["Protonation", "In acidic food, sorbate ions pick up H⁺ to become sorbic acid."],
          ["Activity", "At pH 4.76, exactly half is in the active acid form; lower pH means more."],
        ],
        "That's why sorbate is effective in wine and yogurt but weak in neutral foods.",
        "C6H7O2- + H+ ⇌ C6H8O2",
      ),
      rxn(
        "Mold decarboxylation (the kerosene smell)",
        "Some molds can disarm the preservative.",
        [
          ["Resistant molds", "Certain Penicillium molds carry an enzyme that removes sorbic acid's carboxyl group."],
          ["Decarboxylation", "Carbon dioxide is released, leaving the five-carbon hydrocarbon 1,3-pentadiene."],
          ["Off-odor", "Pentadiene smells like kerosene or paint."],
        ],
        "A kerosene smell on old cheese or cake means resistant mold has been breaking down the preservative.",
        "C6H8O2 → C5H8 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Occasional skin reactions",
        "Rare, and usually mild.",
        "At higher concentrations, sorbic acid can directly trigger the release of inflammatory mediators in skin, without an immune memory.",
        "This can cause brief stinging or hives (contact urticaria); true allergy is uncommon.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Built from two small industrial chemicals.",
        "Ketene (CH₂=C=O) reacts with crotonaldehyde to form a polyester, which acid hydrolysis breaks down into sorbic acid. Neutralizing with potassium hydroxide gives the salt.",
        { equation: "C6H8O2 + KOH → C6H7KO2 + H2O", significance: "The salt is used because it dissolves far better in water than sorbic acid itself." },
      ),
      route(
        "Natural origin",
        "Discovered in rowan berries.",
        "Rowan berries contain parasorbic acid, a ring-shaped relative that converts to sorbic acid when heated or hydrolyzed.",
        { significance: "August Wilhelm von Hofmann isolated it in 1859; its antimold power was recognized about 80 years later." },
      ),
    ],
  },

  "high-fructose-corn-syrup": {
    overview: [
      "High fructose corn syrup isn't a single molecule but a water solution of two simple sugars, glucose and fructose. Both have the formula C₆H₁₂O₆, but they are structural isomers: glucose is an aldose, with its carbonyl group at carbon 1, and usually forms a six-membered ring; fructose is a ketose, with its carbonyl at carbon 2, and often forms a five-membered ring.",
      "Fructose tastes sweeter than glucose, so converting part of corn's glucose into fructose makes a cheap liquid sweetener as sweet as table sugar. The common grades are HFCS-42 (42% fructose), used in foods, and HFCS-55, used in soft drinks.",
    ],
    mechanisms: [
      mech(
        "How the liver handles fructose",
        "In the liver, fructokinase converts fructose to fructose-1-phosphate, skipping phosphofructokinase, the main regulatory brake of sugar metabolism.",
        "Without that brake, large fructose loads flood the liver with building blocks for fat, raising blood triglycerides and liver fat. In moderate amounts, fructose is simply used for energy.",
        "human",
      ),
      mech(
        "Liquid calories and fullness",
        "Sugar dissolved in drinks is absorbed quickly, without the fiber, protein or fat that slow stomach emptying.",
        "Studies show people don't eat less later to make up for liquid calories, which is why sugary drinks are more strongly linked to weight gain than solid sugars.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Turning starch into glucose",
        "Enzymes cut corn starch into its glucose units.",
        [
          ["Gelatinization", "Corn starch is cooked in water so its tightly packed chains unwind."],
          ["Liquefaction", "Alpha-amylase cuts long starch chains into shorter fragments called dextrins."],
          ["Saccharification", "Glucoamylase snips glucose units off the chain ends, giving a syrup of more than 95% glucose."],
        ],
        "The result is ordinary corn syrup, which is mostly glucose and less sweet than sugar.",
        "(C6H10O5)n + n H2O → n C6H12O6",
      ),
      rxn(
        "Isomerization: glucose into fructose",
        "The same atoms, rearranged, taste sweeter.",
        [
          ["Ring opening", "Glucose briefly opens from its ring into a straight chain."],
          ["Rearrangement", "Immobilized glucose isomerase shifts a hydrogen and moves the carbonyl from carbon 1 to carbon 2, turning the aldehyde into a ketone."],
          ["Enrichment", "The reaction levels off near 42% fructose; chromatography concentrates some syrup to 90% fructose, which is blended back to make HFCS-55."],
        ],
        "Enzyme engineering made HFCS cheap enough to replace sugar in most American soft drinks by the mid-1980s.",
        "C6H12O6 (glucose) ⇌ C6H12O6 (fructose)",
      ),
    ],
    hazards: [
      hz(
        "Added sugar in sweetened drinks",
        "The concern is total added sugar, not HFCS being uniquely toxic.",
        "HFCS delivers glucose and fructose in proportions very close to sucrose.",
        "High intakes of sugary drinks are linked to weight gain, type 2 diabetes and dental caries.",
      ),
      hz(
        "Liver fat with high fructose intake",
        "Seen with large, regular intakes, mostly from drinks.",
        "Fructose metabolism bypasses normal regulation and supplies the liver with carbon for fat synthesis.",
        "Over time this can contribute to non-alcoholic fatty liver disease and higher blood triglycerides.",
      ),
    ],
    synthesis: [
      route(
        "Industrial wet milling and enzyme processing",
        "A three-enzyme process turns corn into sweetener.",
        "Corn kernels are soaked and ground to separate starch from germ, fiber and protein. Alpha-amylase and glucoamylase break starch into glucose, and immobilized glucose isomerase converts part of it to fructose. The syrup is refined with activated carbon and ion exchange, then concentrated.",
        { significance: "Japanese researcher Yoshiyuki Takasaki developed the industrial glucose-isomerase process in the 1960s." },
      ),
    ],
  },
};
