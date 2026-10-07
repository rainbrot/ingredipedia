import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const BEAUTY_DEEP_1: Record<string, DeepProfile> = {
  glycerin: {
    overview: [
      "Glycerin (glycerol) is a three-carbon chain with a hydroxyl (–OH) group on every carbon: propane-1,2,3-triol. Three –OH groups on such a small molecule make it intensely attracted to water. It mixes with water in any proportion and even pulls moisture from the air (it is hygroscopic).",
      "Glycerol is also the backbone of every fat and oil: a triglyceride is glycerol with three fatty acids attached. That's why glycerin appears as a byproduct whenever fats are turned into soap or biodiesel.",
    ],
    mechanisms: [
      mech(
        "Drawing water into the skin",
        "Each glycerol molecule hydrogen-bonds with several water molecules, holding them in the outer skin layer and slowing evaporation.",
        "A hydrated outer layer is softer and more flexible; clinical studies show glycerin moisturizers improve skin hydration and speed barrier recovery.",
        "human",
      ),
      mech(
        "Aquaporin-3 and barrier repair",
        "Aquaporin-3, a channel protein in skin cells, transports both water and glycerol into the epidermis.",
        "Mice lacking aquaporin-3 have dry skin and slow barrier repair, and giving them glycerol corrects it, evidence that glycerol is one of skin's own moisturizers.",
        "lab",
      ),
      mech(
        "Used for energy",
        "In the liver, glycerol kinase adds a phosphate to glycerol, which then enters glycolysis or glucose production.",
        "Swallowed glycerol is used for energy much like a carbohydrate, providing about 4.3 calories per gram.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Released when soap is made",
        "Glycerin is freed whenever fats meet lye.",
        [
          ["Attack", "Hydroxide ions attack the ester bonds connecting fatty acids to glycerol."],
          ["Release", "Each triglyceride releases one glycerol molecule."],
          ["Products", "The fatty acids become soap; the glycerol stays in handmade soap or is recovered."],
        ],
        "Handmade soaps keep their glycerin, which is why they often feel less drying.",
        "C3H5(OOCR)3 + 3 NaOH → C3H5(OH)3 + 3 RCOONa",
      ),
      rxn(
        "Nitration to nitroglycerin",
        "Swapping glycerol's –OH groups for nitrate groups creates a very different molecule.",
        [
          ["Nitronium ion", "Concentrated sulfuric acid converts nitric acid into the reactive nitronium ion (NO₂⁺)."],
          ["Esterification", "Each –OH group on glycerol is converted into a nitrate ester."],
          ["Product", "Nitroglycerin, an unstable, energy-rich molecule, forms."],
        ],
        "Alfred Nobel tamed nitroglycerin as dynamite; in tiny doses it is also a heart medicine that releases nitric oxide to widen blood vessels.",
        "C3H5(OH)3 + 3 HNO3 → C3H5(ONO2)3 + 3 H2O",
      ),
    ],
    hazards: [
      hz(
        "Glycerol intoxication in young children",
        "Linked to slush-ice drinks made with large amounts of glycerol.",
        "Large amounts absorbed quickly can disturb fluid balance and blood-sugar regulation in a small body.",
        "Cases of shock, low blood sugar and loss of consciousness in young children led the UK Food Standards Agency to advise against glycerol slush drinks for children under 4.",
      ),
    ],
    synthesis: [
      route(
        "Byproduct of biodiesel and soap",
        "Most glycerin comes from processing fats.",
        "In biodiesel production, triglycerides react with methanol, splitting into fatty-acid methyl esters (biodiesel) and glycerol. The glycerol layer is separated, neutralized and distilled to pharmaceutical grade.",
        { equation: "C3H5(OOCR)3 + 3 CH3OH → C3H5(OH)3 + 3 RCOOCH3" },
      ),
      route(
        "Biological production",
        "Living things release glycerol naturally.",
        "Fat cells release glycerol when they break down stored triglycerides (lipolysis), and yeast produce it during fermentation.",
        { significance: "Wine contains a few grams of glycerol per liter, which contributes to its smooth, full body." },
      ),
    ],
  },

  "sodium-lauryl-sulfate": {
    overview: [
      "Sodium lauryl sulfate (SLS, also called sodium dodecyl sulfate) is a classic surfactant: a 12-carbon hydrocarbon tail that repels water, attached to a negatively charged sulfate head that loves water. One molecule, two personalities.",
      "Above a threshold called the critical micelle concentration (about 8 millimolar), SLS molecules cluster into micelles: spheres with their tails inside and heads outside. Oil and grease dissolve into the oily cores and wash away with water, and the same molecules stabilize the thin films of bubbles, which is why SLS foams so well.",
    ],
    mechanisms: [
      mech(
        "Lifting oil and dirt",
        "Tails dissolve into oily soil while charged heads stay in the water, lowering surface tension and prying oil off surfaces into micelles.",
        "Shampoo and toothpaste remove scalp oil, food residue and dirt that water alone can't.",
        "established",
      ),
      mech(
        "Stripping the skin barrier",
        "SLS binds to keratin proteins and pulls lipids out of the stratum corneum; at higher concentrations it unfolds (denatures) proteins.",
        "Skin loses water faster and lets irritants in, causing redness and dryness. SLS is so reliable at this that dermatologists use it as the standard irritant in research.",
        "established",
      ),
      mech(
        "Canker sores",
        "In toothpaste, SLS may disturb the protective mucin layer that coats the inside of the mouth.",
        "In some trials, people prone to recurrent canker sores had fewer ulcers after switching to SLS-free toothpaste.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Micelle formation",
        "Surfactants self-assemble once there are enough of them.",
        [
          ["Surface first", "At low concentration, SLS molecules line up at the water's surface, tails pointing into the air."],
          ["Saturation", "Once the surface is full, extra molecules can't escape the water's dislike of their tails."],
          ["Assembly", "About 60 molecules cluster with their tails hidden together, forming a micelle that can hold oil inside."],
        ],
        "This self-assembly, driven by the hydrophobic effect, is also how cell membranes form.",
      ),
      rxn(
        "Sulfation and neutralization (how it's made)",
        "A fatty alcohol is given a charged head.",
        [
          ["Sulfation", "Lauryl alcohol reacts with sulfur trioxide gas, attaching a sulfate group."],
          ["Acid intermediate", "This forms lauryl sulfuric acid, a strong acid."],
          ["Neutralization", "Sodium hydroxide converts it into the sodium salt, SLS."],
        ],
        "The same pattern of making a fatty tail and adding a charged head underlies most synthetic detergents.",
        "C12H25OH + SO3 → C12H25OSO3H",
      ),
    ],
    hazards: [
      hz(
        "Skin irritation",
        "An irritant, not an allergen or carcinogen.",
        "SLS extracts barrier lipids and binds proteins in the outer skin layer.",
        "Dryness, redness and itching, especially on eczema-prone skin and with leave-on products; rinse-off use limits contact time.",
      ),
      hz(
        "Eye irritation",
        "The reason shampoo stings.",
        "Surfactants disrupt the oily layer of the tear film and the surface cells of the cornea.",
        "Temporary stinging and redness; “tear-free” formulas use milder surfactants instead.",
      ),
    ],
    synthesis: [
      route(
        "From coconut or palm kernel oil",
        "The usual “plant-derived” route.",
        "Coconut or palm kernel oil is converted to fatty acid methyl esters, which are hydrogenated over a copper catalyst into lauryl alcohol. The alcohol is sulfated with SO₃ and neutralized with sodium hydroxide.",
        { equation: "C12H25OSO3H + NaOH → C12H25OSO3Na + H2O" },
      ),
      route(
        "From petroleum (the Ziegler process)",
        "The same molecule can be built from ethylene.",
        "Ethylene units are added one by one onto an aluminum catalyst, growing straight hydrocarbon chains, which are then oxidized to fatty alcohols such as lauryl alcohol.",
        { significance: "Plant-derived and petroleum-derived SLS are the same molecule; only the source of the carbon differs." },
      ),
    ],
  },

  "sodium-laureth-sulfate": {
    overview: [
      "Sodium laureth sulfate (SLES) is SLS with a short chain of ethylene oxide units (–CH₂CH₂O–), usually one to three, inserted between the fatty tail and the sulfate head. The “-eth” in laureth refers to these ether links.",
      "That spacer makes the water-loving head larger and more flexible. SLES forms bigger, more stable micelles, binds skin proteins less and is noticeably milder than SLS while still foaming richly, which is why it's the main cleanser in most shampoos and body washes.",
    ],
    mechanisms: [
      mech(
        "Gentler cleansing",
        "Bigger heads mean fewer free single surfactant molecules (monomers) at any given concentration, and monomers are what penetrate and irritate skin.",
        "Less protein binding and lipid stripping, so skin and scalp tolerate daily use better than with SLS.",
        "established",
      ),
      mech(
        "Thickening with salt",
        "Sodium chloride screens the repulsion between negatively charged heads, letting spherical micelles grow into long, worm-like micelles that tangle together.",
        "That's why salt thickens shampoo, and why adding too much makes it thin again.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Ethoxylation",
        "Ethylene oxide units are added to the fatty alcohol.",
        [
          ["Activation", "A base catalyst removes the proton from lauryl alcohol's –OH, forming an alkoxide."],
          ["Ring opening", "The alkoxide attacks strained ethylene oxide rings, opening them and adding –CH₂CH₂O– units."],
          ["Chain growth", "Each new end can open another ring, producing chains of varying length."],
        ],
        "The average number of units added (for example “laureth-2”) is controlled by the ratio of ethylene oxide to alcohol.",
        "C12H25OH + n C2H4O → C12H25(OCH2CH2)nOH",
      ),
      rxn(
        "Formation of 1,4-dioxane",
        "An unwanted side product of ethoxylation.",
        [
          ["Side reaction", "Two ethylene oxide units can link to each other instead of to the chain."],
          ["Ring closure", "They close into a six-membered ring containing two oxygens: 1,4-dioxane."],
          ["Removal", "Vacuum stripping evaporates most of the volatile dioxane from the finished surfactant."],
        ],
        "New York State now caps 1,4-dioxane in personal-care and cleaning products, pushing manufacturers to strip it more thoroughly.",
      ),
    ],
    hazards: [
      hz(
        "1,4-dioxane impurity",
        "A contaminant concern, not a property of SLES itself.",
        "1,4-dioxane is a small, water-soluble ether that is hard to remove from water once released.",
        "It caused liver tumors in rodents at high doses in drinking water and is an IARC Group 2B possible carcinogen; levels in well-made SLES are trace.",
      ),
      hz(
        "Irritation at high concentration",
        "Milder than SLS but still a detergent.",
        "Surfactant monomers can still extract skin lipids.",
        "Very frequent washing or leave-on exposure can dry sensitive skin.",
      ),
    ],
    synthesis: [
      route(
        "Ethoxylation, sulfation and neutralization",
        "Three steps from fatty alcohol to SLES.",
        "Lauryl alcohol (from coconut or palm kernel oil, or petroleum) is ethoxylated with ethylene oxide, sulfated with sulfur trioxide, neutralized with sodium hydroxide, then vacuum-stripped to remove 1,4-dioxane.",
        { significance: "SLES displaced SLS in most shampoos from the 1960s onward because it was gentler at similar cost." },
      ),
    ],
  },

  "cocamidopropyl-betaine": {
    overview: [
      "Cocamidopropyl betaine is a zwitterionic surfactant: each molecule carries both a positive charge (a quaternary ammonium nitrogen) and a negative charge (a carboxylate), with a coconut-derived fatty tail attached through an amide link and a three-carbon spacer.",
      "Because its charges balance, it is mild on skin and eyes, and it pairs well with harsher anionic surfactants like SLES, softening them, building foam and thickening the formula. It's a staple of “tear-free” baby shampoos.",
    ],
    mechanisms: [
      mech(
        "Making harsh cleansers milder",
        "Betaine molecules slot between anionic surfactant molecules in mixed micelles, reducing the repulsion between their charged heads and lowering the number of free anionic monomers.",
        "Less surfactant binds to skin and eye proteins, so mixtures irritate less than SLES alone.",
        "human",
      ),
      mech(
        "Allergy from manufacturing impurities",
        "Synthesis can leave traces of amidoamine and DMAPA, small reactive molecules that act as haptens by bonding to skin proteins.",
        "In sensitized people they trigger allergic contact dermatitis; better purification has reduced reaction rates.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Amidation",
        "A fatty acid is joined to an amine.",
        [
          ["Mixing", "Coconut fatty acids (or methyl esters) are heated with dimethylaminopropylamine (DMAPA)."],
          ["Condensation", "The acid and amine join into an amide bond, releasing water."],
          ["Intermediate", "The product, an amidoamine, has a tail and a basic nitrogen head."],
        ],
        "Leftover amidoamine and DMAPA are the impurities linked to allergy.",
        "RCOOH + H2N(CH2)3N(CH3)2 → RCONH(CH2)3N(CH3)2 + H2O",
      ),
      rxn(
        "Quaternization",
        "The nitrogen gains a fourth group and a permanent positive charge.",
        [
          ["Alkylation", "Sodium monochloroacetate reacts with the amidoamine's nitrogen."],
          ["Charge", "The nitrogen becomes a quaternary ammonium with a permanent positive charge."],
          ["Zwitterion", "The attached acetate group supplies the balancing negative charge."],
        ],
        "The result carries both charges in one molecule, which is the source of its mildness.",
        "RCONH(CH2)3N(CH3)2 + ClCH2COONa → RCONH(CH2)3N+(CH3)2CH2COO- + NaCl",
      ),
    ],
    hazards: [
      hz(
        "Contact allergy",
        "Uncommon, and mostly caused by impurities.",
        "Residual amidoamine and DMAPA bind skin proteins (haptenation).",
        "Sensitized people develop itchy eczema where the product touches, often the face, eyelids or scalp; the American Contact Dermatitis Society named it Allergen of the Year in 2004.",
      ),
    ],
    synthesis: [
      route(
        "From coconut oil",
        "A two-step synthesis.",
        "Coconut fatty acids are amidated with DMAPA, then quaternized with sodium monochloroacetate. The product is diluted to a roughly 30% solution.",
        { significance: "“Coconut-derived” describes where the tail comes from; the molecule itself is made by chemical synthesis." },
      ),
    ],
  },

  dimethicone: {
    overview: [
      "Dimethicone (polydimethylsiloxane) is a silicone polymer: a backbone of alternating silicon and oxygen atoms (–Si–O–Si–O–) with two methyl groups on each silicon. The Si–O bond is longer and more flexible than a carbon–carbon bond, so the chain bends freely, with the methyl groups facing outward like a slippery coat.",
      "That structure makes dimethicone water-repellent, chemically inert and silky to the touch. Chain length sets its form: short chains are watery fluids, long chains are thick gums.",
    ],
    mechanisms: [
      mech(
        "Slip and silkiness",
        "The outward-facing methyl groups give dimethicone very low surface tension (about 20 mN/m), so it spreads into a thin, even film and reduces friction.",
        "Lotions glide on without stickiness, and coated hair fibers comb with less breakage and frizz.",
        "established",
      ),
      mech(
        "Breathable skin protection",
        "The film repels liquid water, but its loosely packed molecules let water vapor and oxygen pass through.",
        "It reduces water loss and shields against irritants (it's an FDA-approved skin protectant) without blocking pores.",
        "established",
      ),
      mech(
        "Breaking foam",
        "Low surface tension lets dimethicone droplets spread across bubble walls, thinning them until they pop.",
        "A few parts per million prevent foaming in frying oil, and simethicone (dimethicone plus silica) is an anti-gas medicine.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrolysis and condensation",
        "Silicones are built from a reactive chlorine-containing monomer.",
        [
          ["Hydrolysis", "Dimethyldichlorosilane reacts with water, replacing Si–Cl bonds with Si–OH."],
          ["Condensation", "Si–OH groups on neighboring molecules join into Si–O–Si links, releasing water."],
          ["Chain building", "Repeating this builds rings and chains; end-capping groups stop growth at the desired length."],
        ],
        "Controlling chain length controls viscosity, from water-thin fluids to putty.",
        "n (CH3)2SiCl2 + n H2O → [(CH3)2SiO]n + 2n HCl",
      ),
      rxn(
        "The direct process",
        "Making the silicon building block.",
        [
          ["Raw materials", "Silicon metal powder is mixed with a copper catalyst."],
          ["Reaction", "Methyl chloride gas flows through at about 300 °C."],
          ["Distillation", "Dimethyldichlorosilane is separated from other silanes."],
        ],
        "Eugene Rochow's direct process, developed in the 1940s, made silicones affordable.",
        "Si + 2 CH3Cl → (CH3)2SiCl2",
      ),
    ],
    hazards: [
      hz(
        "Temporary eye blurring",
        "Dimethicone is among the least irritating cosmetic ingredients.",
        "An oily film can spread across the eye's surface.",
        "Vision blurs briefly but no tissue damage occurs; rinsing clears it.",
      ),
    ],
    synthesis: [
      route(
        "From sand to silicone",
        "Silicon comes from quartz sand.",
        "Quartz (SiO₂) is reduced with carbon in an electric furnace to silicon metal. The direct process turns silicon into dimethyldichlorosilane, which is hydrolyzed and polymerized into dimethicone.",
        { significance: "Silly Putty is a silicone too; the same chemistry spans medical tubing, cookware and cosmetics." },
      ),
    ],
  },

  phenoxyethanol: {
    overview: [
      "Phenoxyethanol is an aromatic ether alcohol: a benzene ring connected through an oxygen atom (an ether link) to a two-carbon chain ending in –OH. It belongs to the glycol ethers, molecules that dissolve in both water and oils.",
      "That dual solubility lets it reach microbes in water-based creams while also mixing into oily phases. At 1% or less it protects cosmetics against bacteria such as Pseudomonas, and it's often paired with boosters like ethylhexylglycerin to cover molds and yeasts.",
    ],
    mechanisms: [
      mech(
        "Disrupting microbial membranes",
        "Phenoxyethanol inserts into the lipid membranes of bacteria, making them leaky so potassium ions and other contents escape.",
        "It also uncouples energy production, so bacteria can't make ATP and stop multiplying in the product.",
        "lab",
      ),
      mech(
        "Metabolism in people",
        "Absorbed phenoxyethanol is oxidized in the liver to phenoxyacetic acid.",
        "Phenoxyacetic acid is excreted in urine, mostly within a day.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Making phenoxyethanol",
        "A strained ring is opened by a nucleophile.",
        [
          ["Activation", "A base converts phenol into the phenoxide ion, a strong nucleophile."],
          ["Ring opening", "Phenoxide attacks ethylene oxide, popping open its strained three-membered ring."],
          ["Protonation", "The new alkoxide picks up a proton, giving phenoxyethanol."],
        ],
        "Ring strain makes ethylene oxide reactive enough to build many glycol ethers.",
        "C6H5OH + C2H4O → C6H5OCH2CH2OH",
      ),
    ],
    hazards: [
      hz(
        "Swallowing by infants",
        "Relevant to products used near a baby's mouth.",
        "At high oral doses, phenoxyethanol depresses the central nervous system.",
        "FDA warned in 2008 about a nipple cream nursing infants could swallow; France advises avoiding it in leave-on diaper-area products for children under 3.",
      ),
      hz(
        "Rare allergy",
        "Among the least allergenic preservatives.",
        "Occasionally acts as a hapten in skin.",
        "Contact dermatitis is rare relative to how widely it's used.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from phenol and ethylene oxide.",
        "Phenol reacts with ethylene oxide under basic catalysis, and the product is purified by distillation.",
        { significance: "It has also been used as a perfume fixative and as an anesthetic for fish in aquaculture." },
      ),
    ],
  },

  methylparaben: {
    overview: [
      "Methylparaben is the methyl ester of para-hydroxybenzoic acid: a benzene ring with an –OH group at one end and a methyl ester (–COOCH₃) directly opposite. “Para” describes that opposite arrangement on the ring.",
      "Parabens form a family (methyl, ethyl, propyl, butyl) that differ only in the length of the ester chain. Longer chains are more fat-soluble and more antimicrobial but also bind estrogen receptors more strongly, which is why rules are stricter for propyl- and butylparaben than for methylparaben.",
    ],
    mechanisms: [
      mech(
        "Stopping microbial growth",
        "Parabens dissolve into microbial membranes, disrupting transport proteins and the proton gradient used to make energy.",
        "Molds, yeasts and Gram-positive bacteria can't grow; mixing several parabens broadens protection.",
        "lab",
      ),
      mech(
        "Weak estrogen mimicry",
        "The para-hydroxyphenyl group resembles part of estradiol, so parabens can bind estrogen receptors, though thousands of times more weakly.",
        "Cell and animal tests at high doses show weak estrogen-like effects; methylparaben is the weakest member of the family.",
        "lab",
      ),
      mech(
        "Rapid breakdown",
        "Esterase enzymes in skin and liver hydrolyze the ester bond, releasing para-hydroxybenzoic acid (PHBA) and methanol.",
        "PHBA is conjugated and excreted in urine, so most methylparaben is metabolized before it can build up.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Kolbe–Schmitt carboxylation and esterification",
        "Two classic reactions make parabens.",
        [
          ["Carboxylation", "Potassium phenoxide is heated with carbon dioxide under pressure, adding a carboxyl group opposite the oxygen to form PHBA."],
          ["Esterification", "PHBA is heated with methanol and an acid catalyst."],
          ["Product", "Water is removed, leaving the methyl ester, methylparaben."],
        ],
        "Swapping methanol for propanol or butanol gives the other parabens.",
        "HOC6H4COOH + CH3OH → HOC6H4COOCH3 + H2O",
      ),
      rxn(
        "Hydrolysis in the body",
        "The reverse of how it was made.",
        [
          ["Binding", "Esterase enzymes bind the ester group."],
          ["Cleavage", "Water splits the ester bond."],
          ["Excretion", "PHBA is conjugated with glycine or glucuronic acid and leaves in urine."],
        ],
        "Fast hydrolysis is one reason regulators consider methylparaben low-risk at permitted levels.",
        "HOC6H4COOCH3 + H2O → HOC6H4COOH + CH3OH",
      ),
    ],
    hazards: [
      hz(
        "Endocrine questions",
        "The reason longer-chain parabens are restricted.",
        "Parabens weakly activate estrogen receptors, more strongly as the chain lengthens.",
        "Effects appear at doses far above typical exposure; no causal link to breast cancer has been established.",
      ),
      hz(
        "The “paraben paradox” allergy",
        "Rare on healthy skin.",
        "Parabens can act as haptens when skin is damaged.",
        "People with eczema or leg ulcers occasionally react, yet the same people often tolerate parabens on intact skin.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from phenol, carbon dioxide and methanol.",
        "PHBA is made by Kolbe–Schmitt carboxylation of potassium phenoxide, then esterified with methanol and crystallized.",
        { significance: "Methylparaben occurs naturally too: it's found in blueberries and is a component of the honeybee queen's pheromone." },
      ),
    ],
  },
};
