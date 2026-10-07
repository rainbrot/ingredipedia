import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const FOOD_DEEP_4: Record<string, DeepProfile> = {
  bht: {
    overview: [
      "BHT (butylated hydroxytoluene) is a phenol, a benzene ring carrying an –OH group, flanked on both sides by bulky tert-butyl groups. Chemists call it a hindered phenol: the big groups crowd around the –OH like bodyguards.",
      "That crowding is the secret to its job. When BHT gives up the hydrogen of its –OH to stop a free radical, the radical left behind on BHT is shielded by the bulky groups and too stable to start new chain reactions. BHT dissolves in fats, so it protects oils, cereals and cosmetics from going rancid.",
    ],
    mechanisms: [
      mech(
        "Scavenging free radicals",
        "BHT donates the hydrogen atom from its –OH to a peroxyl radical (ROO•). The resulting phenoxyl radical is stabilized by resonance in the ring and blocked from reacting by the tert-butyl groups.",
        "Fats in cereal, chewing gum and cosmetics stay fresh for months instead of developing rancid, cardboard-like flavors.",
        "established",
      ),
      mech(
        "Liver metabolism",
        "Cytochrome P450 enzymes oxidize BHT's methyl and tert-butyl groups, forming metabolites such as a reactive quinone methide.",
        "High doses in rodents enlarged the liver and affected the thyroid and lungs. Some metabolites bind proteins, part of why regulators set a low acceptable daily intake.",
        "lab",
      ),
      mech(
        "Mixed animal cancer data",
        "Depending on dose, timing and species, BHT has both inhibited and promoted tumors in animals, probably by changing liver enzyme activity.",
        "IARC lists it as not classifiable (Group 3). Typical human intake is far below the doses used in animal studies.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Hydrogen-atom transfer",
        "How a hindered phenol stops a chain reaction.",
        [
          ["Attack", "A peroxyl radical formed in oxidizing fat collides with BHT."],
          ["Transfer", "BHT hands over the hydrogen atom from its –OH, turning the radical into a stable hydroperoxide."],
          ["Stabilization", "The unpaired electron spreads around BHT's ring, and the bulky groups keep it from attacking anything."],
        ],
        "Each BHT molecule can stop up to two radical chains before it is used up.",
        "ROO• + ArOH → ROOH + ArO•",
      ),
      rxn(
        "Friedel–Crafts alkylation (how it's made)",
        "Bulky groups are attached to a ring using a carbocation.",
        [
          ["Carbocation", "An acid catalyst protonates isobutylene, forming a tert-butyl carbocation."],
          ["Substitution", "The carbocation attacks p-cresol's ring at a position next to the –OH group."],
          ["Repeat", "A second tert-butyl group adds on the other side, completing BHT."],
        ],
        "The same reaction type is used to make many antioxidants for fuels, plastics and rubber.",
      ),
    ],
    hazards: [
      hz(
        "Effects at high doses in animals",
        "Relevant to safety margins rather than typical diets.",
        "Reactive metabolites and changes in liver enzymes appear at high doses.",
        "Effects on the liver, thyroid and possibly hormone signaling in animals are why EFSA set an ADI of 0.25 mg/kg of body weight.",
      ),
      hz(
        "Rare contact allergy",
        "Mostly relevant to cosmetics.",
        "Oxidized phenols can bind skin proteins.",
        "A small number of people develop allergic contact dermatitis.",
      ),
    ],
    synthesis: [
      route(
        "Industrial alkylation",
        "Made from p-cresol and isobutylene.",
        "p-Cresol is alkylated with isobutylene over an acid catalyst, then purified by distillation and crystallization.",
        { significance: "BHT was patented in 1947 and approved for food use in the U.S. in 1954." },
      ),
    ],
  },

  maltodextrin: {
    overview: [
      "Maltodextrin is a mixture of short chains of glucose, made by partially breaking down starch. Chains typically contain about 3–17 glucose units linked by α-1,4 bonds, with some α-1,6 branch points. Products are graded by “dextrose equivalent” (DE): below 20 is maltodextrin, above 20 is corn syrup solids.",
      "Because its chains are short and branched, maltodextrin dissolves easily, tastes only faintly sweet and adds body without much flavor. Your digestive enzymes break it back into glucose very quickly.",
    ],
    mechanisms: [
      mech(
        "Rapid digestion",
        "Amylase in saliva and the pancreas, plus maltase in the intestine, hydrolyze maltodextrin's α-1,4 bonds quickly because its short chains expose many ends to attack.",
        "Blood glucose rises fast; its glycemic index can exceed table sugar's. That's useful for endurance athletes but not ideal for sedentary snacking.",
        "human",
      ),
      mech(
        "Carrying flavors",
        "During spray-drying, maltodextrin forms a glassy shell around tiny flavor droplets, trapping volatile molecules.",
        "Powdered flavors and seasonings keep their aroma until they dissolve in your mouth and release it.",
        "established",
      ),
      mech(
        "Gut microbiome questions",
        "Maltodextrin reaching the gut can be used by some bacteria to build biofilms.",
        "Mouse and cell studies suggest it may thin the gut's protective mucus layer and favor certain bacteria; human evidence is limited.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Partial starch hydrolysis",
        "Starch is cut into shorter pieces, then the reaction is stopped.",
        [
          ["Gelatinization", "Starch granules are cooked in water so their chains unwind."],
          ["Cutting", "Alpha-amylase cuts randomly within the long chains, producing fragments of many lengths."],
          ["Stopping", "Heat or acid inactivates the enzyme when the target DE is reached."],
        ],
        "Stopping earlier gives longer chains (low DE, less sweet); running longer gives sweeter syrups.",
        "(C6H10O5)n + H2O → shorter glucose chains",
      ),
      rxn(
        "Spray-drying encapsulation",
        "Turning a liquid flavor into a powder.",
        [
          ["Mixing", "Maltodextrin is dissolved in water with a flavor emulsion."],
          ["Atomizing", "The mixture is sprayed as a fine mist into hot air."],
          ["Drying", "Water evaporates in seconds, leaving glassy particles with flavor locked inside."],
        ],
        "The same method makes powdered milk and instant coffee.",
      ),
    ],
    hazards: [
      hz(
        "High glycemic load",
        "Matters most in drinks and powders where it's a main ingredient.",
        "It is digested to glucose almost as fast as glucose itself.",
        "Large amounts cause sharp blood-sugar rises, a concern for people with diabetes.",
      ),
    ],
    synthesis: [
      route(
        "Enzymatic processing of starch",
        "Made from corn, potato, rice, tapioca or wheat starch.",
        "Starch is gelatinized, partially hydrolyzed with alpha-amylase, filtered, purified and spray-dried into a white powder.",
        { significance: "Wheat-derived maltodextrin is processed so thoroughly that it is considered gluten-free." },
      ),
    ],
  },

  "sodium-nitrite": {
    overview: [
      "Sodium nitrite (NaNO₂) is a salt of nitrous acid. The nitrite ion (NO₂⁻) is bent, with nitrogen in a middle oxidation state (+3), so it can either gain or lose electrons, which makes it chemically versatile and reactive.",
      "In cured meat, nitrite does three jobs at once: it creates the pink color, adds the characteristic cured flavor, and, most importantly, blocks the growth of Clostridium botulinum, the bacterium that makes deadly botulinum toxin.",
    ],
    mechanisms: [
      mech(
        "Pink cured color",
        "Nitrite is converted to nitric oxide (NO), which binds the iron atom in myoglobin, forming nitrosylmyoglobin; cooking converts it into stable, pink nitrosyl hemochrome.",
        "That's why cooked ham and bacon stay pink while uncured pork turns gray.",
        "established",
      ),
      mech(
        "Preventing botulism",
        "Nitrite and its products react with iron-sulfur proteins inside bacterial cells, disabling enzymes Clostridium botulinum needs for energy.",
        "Spores can't germinate into toxin-producing cells, preventing botulism in vacuum-packed meats.",
        "established",
      ),
      mech(
        "Forming nitrosamines",
        "In acid or at high heat, nitrite forms nitrosating agents that react with amines from meat proteins, producing N-nitrosamines.",
        "Liver enzymes activate nitrosamines into molecules that attach alkyl groups to DNA, causing mutations; this is part of why processed meat is classified as carcinogenic.",
        "established",
      ),
      mech(
        "The body's own nitrite",
        "Bacteria on the tongue reduce nitrate from vegetables (spinach, beets, celery) into nitrite.",
        "Swallowed nitrite becomes nitric oxide, which helps relax blood vessels. Vegetables supply most of the nitrite people are exposed to, along with antioxidants that limit nitrosamine formation.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Nitrosamine formation",
        "Why bacon is cured with vitamin C.",
        [
          ["Acidification", "Nitrite picks up a proton to become nitrous acid (HNO₂)."],
          ["Nitrosating agent", "Two nitrous acid molecules combine into dinitrogen trioxide (N₂O₃)."],
          ["Nitrosation", "N₂O₃ transfers an –N=O group to a secondary amine, forming a nitrosamine."],
          ["Blocking", "Added ascorbate or erythorbate reduces nitrous acid to nitric oxide first, cutting off the pathway."],
        ],
        "High-heat frying of bacon favors nitrosamines, which is why U.S. bacon must contain vitamin C or erythorbate.",
        "R2NH + HNO2 → R2N-NO + H2O",
      ),
      rxn(
        "Developing cured color",
        "A three-step color change.",
        [
          ["Reduction", "Nitrite is reduced to nitric oxide, helped by ascorbate."],
          ["Binding", "Nitric oxide binds the iron in myoglobin, turning meat red."],
          ["Cooking", "Heat denatures the protein around it, locking in a stable pink pigment."],
        ],
        "The same NO–iron chemistry is how nitric oxide signals in your blood vessels.",
      ),
    ],
    hazards: [
      hz(
        "Processed meat and colorectal cancer",
        "Processed meat is an IARC Group 1 carcinogen.",
        "Nitrosamines and the iron-containing heme in red meat both promote DNA damage in the gut lining.",
        "IARC estimates each 50 g of processed meat eaten daily raises colorectal cancer risk by about 18%.",
      ),
      hz(
        "Methemoglobinemia (acute poisoning)",
        "Concentrated curing salt is dangerous if mistaken for table salt.",
        "Nitrite oxidizes the iron in hemoglobin from Fe²⁺ to Fe³⁺, forming methemoglobin, which can't carry oxygen.",
        "Large doses cause blue-gray skin and breathlessness and can be fatal, which is why curing salt is dyed pink.",
      ),
    ],
    synthesis: [
      route(
        "Absorbing nitrogen oxides",
        "Made from gases produced by burning ammonia.",
        "Nitrogen oxides from ammonia oxidation are bubbled through sodium hydroxide or carbonate solution. Sodium nitrite crystallizes and is separated from nitrate.",
        { equation: "2 NaOH + NO + NO2 → 2 NaNO2 + H2O" },
      ),
      route(
        "“Natural” curing with celery powder",
        "Uncured-labeled meats use the same chemistry.",
        "Celery juice, naturally rich in nitrate, is fermented with bacteria that convert the nitrate to nitrite before it's added to meat.",
        { significance: "The nitrite is chemically identical, which is why “no nitrites added” bacon still contains nitrite." },
      ),
    ],
  },

  "palm-oil": {
    overview: [
      "Palm oil is mostly triglycerides: molecules with a glycerol backbone carrying three fatty acids. About half are saturated, mainly palmitic acid (a straight 16-carbon chain), and half unsaturated, mainly oleic acid (an 18-carbon chain with one kinked cis double bond).",
      "Straight saturated chains pack tightly, so palm oil is semi-solid at room temperature, giving baked goods and spreads their texture without the trans fats of partially hydrogenated oils. Unrefined red palm oil gets its orange color from beta-carotene.",
    ],
    mechanisms: [
      mech(
        "Texture from fatty-acid packing",
        "Straight palmitic chains stack closely into stable crystals, while kinked oleic chains disrupt the packing.",
        "The mix melts near body temperature, giving creamy mouthfeel in spreads and flaky layers in pastry.",
        "established",
      ),
      mech(
        "Raising LDL cholesterol",
        "Palmitic acid reduces the activity of LDL receptors in the liver, which normally pull LDL particles out of the blood.",
        "Compared with unsaturated oils such as olive or canola, palm oil raises LDL (“bad”) cholesterol, a risk factor for heart disease.",
        "human",
      ),
      mech(
        "Beta-carotene in red palm oil",
        "Unrefined oil contains carotenoids, which absorb blue light (hence the orange color) and can be split into vitamin A in the gut.",
        "Red palm oil has been used to prevent vitamin A deficiency; refining removes the carotenoids.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Saponification (making soap)",
        "Fats plus lye make soap.",
        [
          ["Attack", "Hydroxide ions attack the ester bonds linking fatty acids to glycerol."],
          ["Release", "Glycerol is freed."],
          ["Soap", "The fatty acids become sodium salts, which are soap molecules."],
        ],
        "Many bar soaps list “sodium palmate”, soap made from palm oil.",
        "C3H5(OOCR)3 + 3 NaOH → C3H5(OH)3 + 3 RCOONa",
      ),
      rxn(
        "Refining contaminants",
        "High-temperature refining can create unwanted byproducts.",
        [
          ["Deodorizing", "Oil is steamed at 230–260 °C to remove odors and free fatty acids."],
          ["Side reactions", "Diglycerides lose a fatty acid to form glycidyl esters, or react with chloride to form 3-MCPD esters."],
          ["Mitigation", "Lower temperatures and washing out chloride before refining reduce these contaminants."],
        ],
        "Since EFSA's 2016 opinion, industry changes have sharply reduced glycidyl ester levels.",
      ),
    ],
    hazards: [
      hz(
        "Higher LDL cholesterol",
        "A dietary-pattern concern, not a toxic one.",
        "Its high palmitic acid content lowers LDL clearance.",
        "Health guidance recommends keeping saturated fat below 10% of daily calories.",
      ),
      hz(
        "Processing contaminants",
        "Now limited by law in the EU.",
        "Glycidyl esters release glycidol during digestion.",
        "Glycidol is a probable carcinogen in animal studies, so maximum levels apply to refined oils.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis in the fruit",
        "Oil palms store energy as fat in their fruit.",
        "Fatty acid synthase builds fatty acids two carbons at a time from acetyl-CoA. These are attached to glycerol-3-phosphate and stored as triglycerides in oil droplets in the fruit's fleshy mesocarp.",
      ),
      route(
        "Milling and refining",
        "From fruit to bottled oil.",
        "Fresh fruit bunches are steam-sterilized to stop fat-splitting enzymes, then pressed. Crude oil is refined, bleached and deodorized, and can be fractionated into liquid olein and solid stearin.",
        { significance: "Plantation expansion has destroyed rainforest habitat; certification schemes such as RSPO aim to trace deforestation-free supply." },
      ),
    ],
  },

  "lactic-acid": {
    overview: [
      "Lactic acid (2-hydroxypropanoic acid) is a three-carbon molecule with a carboxylic acid group and a hydroxyl group on the neighboring carbon, making it an alpha-hydroxy acid (AHA). Its middle carbon is chiral, so it exists as two mirror-image forms, L- and D-lactic acid; your muscles make the L-form.",
      "It's the acid that sours milk into yogurt and cabbage into sauerkraut, and it builds up in hard-working muscles. On skin, it's one of the gentlest exfoliating acids, and its salt, sodium lactate, is part of the skin's own moisturizing system.",
    ],
    mechanisms: [
      mech(
        "Energy when oxygen runs short",
        "When muscles lack oxygen, lactate dehydrogenase converts pyruvate into lactate, regenerating NAD⁺ so glycolysis can keep making ATP.",
        "Lactate is carried to the heart, other muscles and the liver, where it is burned or rebuilt into glucose (the Cori cycle). It does not cause next-day muscle soreness.",
        "established",
      ),
      mech(
        "Gentle exfoliation",
        "Below about pH 4, lactic acid weakens the bonds between dead cells in the outermost skin layer.",
        "Dead cells shed faster, improving texture and evening tone; its larger size compared with glycolic acid makes it gentler.",
        "human",
      ),
      mech(
        "Moisturizing",
        "Sodium lactate's charged carboxylate and hydroxyl groups attract and bind water molecules.",
        "As part of the skin's natural moisturizing factor, it helps keep the outer layer hydrated and flexible.",
        "established",
      ),
      mech(
        "Preserving food",
        "Lactic acid lowers pH and enters bacterial cells in its uncharged form, acidifying their interior.",
        "Spoilage and disease-causing bacteria can't grow in fermented foods such as yogurt, kimchi and sourdough.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Lactic acid fermentation",
        "How bacteria (and your muscles) make lactic acid.",
        [
          ["Glycolysis", "Glucose is split into two pyruvate molecules, producing 2 ATP and 2 NADH."],
          ["Reduction", "Lactate dehydrogenase uses NADH to reduce each pyruvate to lactate."],
          ["Recycling", "NAD⁺ is regenerated, so glycolysis can continue without oxygen."],
        ],
        "Lactobacillus bacteria use this to sour milk into yogurt, thickening it as the acid makes milk proteins clump.",
        "C6H12O6 → 2 C3H6O3",
      ),
      rxn(
        "Polymerization into PLA plastic",
        "Lactic acid can be linked into a compostable plastic.",
        [
          ["Dimerizing", "Two lactic acid molecules form a ring called lactide."],
          ["Ring opening", "A tin catalyst opens the rings and links them end to end."],
          ["Polymer", "Long polylactic acid chains form a clear, strong plastic."],
        ],
        "PLA is used in 3D-printer filament and compostable cups.",
        "n C3H6O3 → (C3H4O2)n + n H2O",
      ),
    ],
    hazards: [
      hz(
        "Increased sun sensitivity (AHAs)",
        "Applies to leave-on exfoliating products.",
        "Thinning the outer layer of dead cells reduces its natural ability to scatter UV light.",
        "FDA-sponsored studies found AHAs increased sunburn-damaged cells, so products carry a sunburn alert and daily sunscreen is advised.",
      ),
      hz(
        "Irritation at high strength",
        "More likely above 10% or below pH 3.5.",
        "Low pH and high concentration disrupt the skin barrier.",
        "Stinging, redness or peeling, especially on sensitive skin.",
      ),
    ],
    synthesis: [
      route(
        "Bacterial fermentation",
        "Nearly all lactic acid today is fermented.",
        "Lactobacillus or engineered microbes ferment glucose or sucrose. Lactic acid is recovered, often as calcium lactate, acidified and purified.",
        { significance: "Fermentation produces a single mirror-image form, which matters for making high-quality PLA." },
      ),
      route(
        "Chemical synthesis",
        "The older petrochemical route.",
        "Acetaldehyde reacts with hydrogen cyanide to form lactonitrile, which is hydrolyzed to lactic acid.",
        { significance: "This route gives a 50:50 mix of both mirror-image forms (a racemic mixture), which is why fermentation replaced it." },
      ),
    ],
  },

  "acesulfame-potassium": {
    overview: [
      "Acesulfame potassium is the potassium salt of a small six-membered ring containing oxygen, nitrogen and a sulfonyl group. Its nitrogen sits between a carbonyl group and a sulfonyl group, which makes its N–H strongly acidic, so it readily forms a stable salt with potassium.",
      "It is about 200 times sweeter than sugar, survives baking temperatures, and leaves the body unchanged. It's often blended with sucralose or aspartame because the mix tastes more like sugar than any single sweetener.",
    ],
    mechanisms: [
      mech(
        "Sweet with a bitter edge",
        "Ace-K activates the T1R2/T1R3 sweet receptor; at higher concentrations it also activates the bitter receptors TAS2R31 and TAS2R43.",
        "That explains its slight bitter aftertaste, and why it's paired with other sweeteners that cover it.",
        "human",
      ),
      mech(
        "Not metabolized",
        "Human enzymes can't break its ring.",
        "It is absorbed and excreted unchanged in urine within about a day, providing no calories.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Building the ring",
        "Ace-K is made by closing a ring with sulfur trioxide.",
        [
          ["Coupling", "Sulfamic acid reacts with diketene to form an acetoacetamide sulfonic acid."],
          ["Cyclization", "Sulfur trioxide drives ring closure and removes water."],
          ["Neutralization", "Potassium hydroxide converts the acidic ring into its potassium salt."],
        ],
        "The salt form is stable, water-soluble and easy to crystallize.",
      ),
    ],
    hazards: [
      hz(
        "Gaps in long-term data",
        "Approved by regulators, but studied less than aspartame.",
        "It isn't metabolized, so effects would come from the molecule itself.",
        "Some animal studies suggest effects on gut bacteria or metabolism; human evidence is limited, and WHO advises against relying on sweeteners for weight control.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Built from simple industrial chemicals.",
        "Sulfamic acid and diketene are combined, the intermediate is cyclized with sulfur trioxide, and the product is neutralized with potassium hydroxide and crystallized.",
        { significance: "Its sweetness was discovered in 1967 when chemist Karl Clauss licked his finger in the lab." },
      ),
    ],
  },

  "sodium-citrate": {
    overview: [
      "Sodium citrate (trisodium citrate) is citric acid with all three acidic protons replaced by sodium ions. The citrate ion carries three negative charges on its carboxylate groups, which makes it a strong chelator of calcium and magnesium and a mild base.",
      "In solution it forms a buffer with citric acid, holding pH steady. Those two talents explain its odd range of jobs: smooth cheese sauces, anticoagulant in blood bags, and a phosphate-free water softener in detergents.",
    ],
    mechanisms: [
      mech(
        "Smooth melted cheese",
        "Citrate pulls calcium out of the calcium-phosphate bridges that hold casein proteins together in cheese.",
        "Freed caseins act as emulsifiers, so melted cheese stays smooth and glossy instead of separating into rubbery curds and oil.",
        "established",
      ),
      mech(
        "Keeping donated blood liquid",
        "Citrate binds the calcium ions in blood.",
        "Clotting factors need calcium, so citrated blood stays liquid in storage; after transfusion, the liver quickly metabolizes the citrate.",
        "established",
      ),
      mech(
        "Preventing kidney stones",
        "Citrate in urine binds calcium and raises urine pH.",
        "Less calcium is free to crystallize with oxalate, so doctors prescribe citrate to people prone to kidney stones.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Calcium chelation",
        "Citrate traps calcium ions.",
        [
          ["Dissolving", "Sodium citrate separates into sodium ions and citrate ions."],
          ["Binding", "Each citrate grips calcium with its carboxylate groups."],
          ["Complex", "Calcium is held in soluble citrate complexes instead of reacting elsewhere."],
        ],
        "The same reaction softens hard water in detergents and keeps blood from clotting.",
        "3 Ca2+ + 2 C6H5O7^3- → Ca3(C6H5O7)2",
      ),
      rxn(
        "The citrate buffer",
        "Mixing citric acid and sodium citrate resists pH change.",
        [
          ["Acid partner", "Citric acid can release protons."],
          ["Base partner", "Citrate ions can absorb protons."],
          ["Balance", "Added acid is soaked up by citrate; added base is neutralized by citric acid."],
        ],
        "Soft drinks and candies use this buffer to keep their tartness consistent.",
        "C6H8O7 ⇌ H+ + C6H7O7-",
      ),
    ],
    hazards: [
      hz(
        "Very low toxicity",
        "Concerns arise only with very large intravenous doses.",
        "Large amounts of citrate bind calcium in the blood.",
        "During massive transfusions, citrate can temporarily lower blood calcium, which doctors monitor and correct.",
      ),
    ],
    synthesis: [
      route(
        "Neutralizing citric acid",
        "Made from fermentation-derived citric acid.",
        "Citric acid is neutralized with sodium hydroxide or sodium carbonate, then crystallized and dried.",
        { equation: "C6H8O7 + 3 NaOH → Na3C6H5O7 + 3 H2O", significance: "Citrate anticoagulant, introduced around 1914, made stored blood transfusions practical." },
      ),
    ],
  },
};
