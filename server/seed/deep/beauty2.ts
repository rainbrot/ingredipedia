import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const BEAUTY_DEEP_2: Record<string, DeepProfile> = {
  fragrance: {
    overview: [
      "“Fragrance” (or parfum) on a label stands for a blend that can contain dozens to hundreds of aroma molecules: terpenes such as limonene and linalool from citrus and flowers, aldehydes, esters, musks and woody notes, plus solvents. Recipes are trade secrets, so they're listed as a single word.",
      "Perfumers build blends in layers: volatile top notes (citrus) that evaporate within minutes, heart notes (florals) that last hours, and heavy base notes (musks, woods) that linger. The same reactive molecules that make a fragrance pleasant also make it the most common cause of allergic reactions to cosmetics.",
    ],
    mechanisms: [
      mech(
        "How we smell a fragrance",
        "Volatile molecules evaporate from skin and bind odorant receptors in the nose. Each receptor recognizes features shared by many molecules, and each molecule activates several receptors.",
        "The brain decodes the pattern of activated receptors as a scent. Smell signals reach the brain's emotional and memory centers directly, which is why a scent can instantly bring back a memory.",
        "established",
      ),
      mech(
        "Allergic contact dermatitis",
        "Some fragrance molecules, or the products they form when they react with air, are haptens: they bond to proteins in the skin.",
        "T cells learn to recognize the altered proteins, and later exposures trigger a delayed, itchy rash. Fragrance allergy affects roughly 1–4% of people.",
        "human",
      ),
      mech(
        "Fixatives and lasting scent",
        "Heavy molecules with low vapor pressure (musks, resins) hold lighter molecules back through intermolecular attraction, slowing their evaporation.",
        "The scent lasts longer and changes over hours as the lighter notes fade first.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Autoxidation of fragrance terpenes",
        "Fragrance ingredients can become more allergenic as they age.",
        [
          ["Initiation", "Light or a trace radical removes a hydrogen atom next to a double bond, creating a radical."],
          ["Oxygen capture", "Oxygen from the air adds to the radical, forming a peroxy radical."],
          ["Chain reaction", "The peroxy radical takes a hydrogen from another molecule, forming a hydroperoxide and a new radical."],
        ],
        "Hydroperoxides of limonene and linalool are much stronger skin sensitizers than the fresh molecules, so old perfumes and essential oils are more likely to cause rashes.",
      ),
      rxn(
        "Reactions with indoor ozone",
        "Scent molecules in the air can form new pollutants.",
        [
          ["Attack", "Ozone attacks double bonds in terpenes such as limonene."],
          ["Fragmentation", "The ring breaks apart into smaller oxidized molecules and formaldehyde."],
          ["Particles", "Some heavy products condense into ultrafine particles."],
        ],
        "Heavy use of scented sprays on smoggy days can briefly raise indoor particle levels.",
      ),
    ],
    hazards: [
      hz(
        "Skin allergy",
        "The leading cause of cosmetic allergic reactions.",
        "Haptens and their oxidation products bond to skin proteins.",
        "Once sensitized, a person reacts to that molecule for life; the EU requires the most common fragrance allergens to be named on labels.",
      ),
      hz(
        "Airway symptoms in sensitive people",
        "Mostly relevant to people with asthma or migraine.",
        "Volatile organic compounds and their reaction products can irritate nerve endings in the airways.",
        "Some people report coughing, wheezing or headaches around strong scents.",
      ),
    ],
    synthesis: [
      route(
        "Natural extraction",
        "Many fragrance materials come from plants.",
        "Essential oils are extracted by steam distillation (lavender), cold pressing (citrus peel) or solvent extraction (jasmine), which pull volatile aroma molecules out of plant tissue.",
      ),
      route(
        "Synthetic aroma chemicals",
        "Modern perfumery relies heavily on molecules made in labs.",
        "Chemists synthesize aroma molecules, some identical to natural ones and some new, such as aldehydes, synthetic musks and woody molecules, then blend them with natural extracts.",
        { significance: "Chanel No. 5 (1921) was among the first perfumes built on synthetic aldehydes, launching modern perfumery." },
      ),
    ],
  },

  "sodium-hyaluronate": {
    overview: [
      "Hyaluronic acid is a polysaccharide made of repeating pairs of two sugars, glucuronic acid and N-acetylglucosamine, linked into chains that can contain tens of thousands of units. Sodium hyaluronate is its salt form, used in skincare because it's more stable.",
      "Each repeating unit carries a negative charge and several hydroxyl groups, so the chain attracts water and swells into a gel. In your body it fills the spaces between skin cells, lubricates joints and gives the eye's vitreous humor its jelly-like structure.",
    ],
    mechanisms: [
      mech(
        "Binding water",
        "Carboxylate and hydroxyl groups hydrogen-bond with water, and the negative charges along the chain repel each other, so the molecule expands into a huge, water-filled coil.",
        "On skin it forms a hydrating film that temporarily plumps fine lines; in joints, the same property cushions and lubricates cartilage.",
        "established",
      ),
      mech(
        "Molecular size matters",
        "High-molecular-weight hyaluronic acid (over 1,000 kDa) is too large to penetrate skin; fragments below about 50 kDa can enter the upper layers.",
        "Large chains hydrate the surface; small fragments penetrate further and may also signal repair processes, so many serums blend sizes.",
        "lab",
      ),
      mech(
        "Signaling through CD44",
        "Hyaluronic acid binds CD44, a receptor on the surface of skin and immune cells.",
        "This interaction influences how cells move and multiply during wound healing, which is why it's studied for wound dressings.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Built inside the cell membrane",
        "Cells assemble hyaluronic acid and push it out as it grows.",
        [
          ["Building blocks", "The cell makes activated sugars: UDP-glucuronic acid and UDP-N-acetylglucosamine."],
          ["Alternating addition", "Hyaluronan synthase, an enzyme embedded in the cell membrane, adds the two sugars one after the other."],
          ["Extrusion", "The growing chain is threaded out through the membrane into the space around the cell."],
        ],
        "Unlike most polysaccharides, it is made at the cell surface rather than inside the Golgi apparatus.",
      ),
      rxn(
        "Breakdown by hyaluronidase",
        "The body constantly recycles its hyaluronic acid.",
        [
          ["Binding", "Hyaluronidase enzymes bind the chain."],
          ["Hydrolysis", "They split the bonds between sugar pairs, cutting chains into fragments."],
          ["Turnover", "Fragments are taken up and broken down further in cells and the liver."],
        ],
        "About a third of the body's hyaluronic acid is replaced every day.",
      ),
    ],
    hazards: [
      hz(
        "Very low hazard",
        "A molecule your body makes itself.",
        "Topical hyaluronic acid is a natural component of skin and connective tissue.",
        "Allergic reactions to skincare use are rare. Risks of injected fillers, such as blocked blood vessels, belong to medical procedures, not serums.",
      ),
    ],
    synthesis: [
      route(
        "Bacterial fermentation",
        "Most cosmetic hyaluronic acid is made by bacteria.",
        "Streptococcus zooepidemicus or engineered Bacillus strains ferment glucose and secrete hyaluronic acid. It is purified by filtration and alcohol precipitation, and may be broken into smaller sizes.",
        { significance: "It was once harvested from rooster combs; fermentation gives a purer, animal-free product." },
      ),
    ],
  },

  niacinamide: {
    overview: [
      "Niacinamide (nicotinamide) is a form of vitamin B3: a pyridine ring, a benzene-like ring containing one nitrogen, with an amide group (–CONH₂) attached. It is small, very water-soluble and stable to heat and light, which makes it easy to formulate.",
      "Inside cells it becomes part of NAD⁺ and NADP⁺, coenzymes that shuttle electrons in hundreds of reactions, from making ATP to repairing DNA. On skin, it strengthens the barrier and evens tone, with one of the strongest evidence records of any cosmetic active.",
    ],
    mechanisms: [
      mech(
        "Repairing the skin barrier",
        "Niacinamide increases the activity of serine palmitoyltransferase, the first enzyme in ceramide production, raising ceramide and free fatty acid levels in the outer skin layer.",
        "A stronger lipid barrier loses less water and resists irritants; studies show reduced dryness and redness.",
        "human",
      ),
      mech(
        "Fading dark spots",
        "It reduces the transfer of melanosomes (packets of melanin) from pigment cells to the surrounding skin cells.",
        "Dark spots fade over 4–8 weeks at 2–5%, without blocking melanin production itself.",
        "human",
      ),
      mech(
        "Supporting DNA repair",
        "As a precursor of NAD⁺, niacinamide restores the energy and raw material that DNA-repair enzymes use after UV damage.",
        "In the ONTRAC trial, 500 mg of oral nicotinamide twice daily cut new non-melanoma skin cancers by 23% in high-risk patients.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Becoming NAD⁺",
        "Cells recycle niacinamide into a vital coenzyme.",
        [
          ["First step", "The enzyme NAMPT attaches a ribose-phosphate (from PRPP) to niacinamide, forming NMN."],
          ["Second step", "NMNAT adds an AMP unit from ATP, completing NAD⁺."],
          ["In action", "NAD⁺ accepts a hydride ion (H⁻) in metabolic reactions, becoming NADH, which carries electrons to make ATP."],
        ],
        "This salvage pathway lets cells reuse niacinamide released when NAD⁺ is consumed.",
        "Nicotinamide + PRPP → NMN + PPi",
      ),
      rxn(
        "Hydrolysis to niacin",
        "Under harsh conditions, niacinamide can lose its amide group.",
        [
          ["Attack", "Water attacks the amide carbonyl, sped up by strong acid, strong base or heat."],
          ["Cleavage", "Ammonia is released."],
          ["Product", "Nicotinic acid (niacin) forms."],
        ],
        "Niacin causes skin flushing, so formulas keep pH between about 5 and 7, where this conversion is negligible.",
        "C6H6N2O + H2O → C6H5NO2 + NH3",
      ),
    ],
    hazards: [
      hz(
        "Tingling or flushing at high strength",
        "Mild and temporary.",
        "High concentrations (10% and above) can briefly irritate, and traces of niacin widen blood vessels.",
        "Some people notice warmth or redness; 2–5% gives most of the benefit with fewer side effects.",
      ),
      hz(
        "Very high oral doses",
        "Relevant only to grams-per-day supplements.",
        "Large amounts must be processed by the liver.",
        "Doses above about 3 g a day have been linked to liver stress and nausea.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis from tryptophan",
        "Your body can make its own vitamin B3.",
        "The amino acid tryptophan is converted to NAD⁺ through the kynurenine pathway; about 60 mg of tryptophan yields 1 mg of niacin equivalent.",
        { significance: "Pellagra, B3 deficiency, struck populations eating mostly untreated corn, which is low in both niacin and tryptophan." },
      ),
      route(
        "Industrial synthesis",
        "A chemical step followed by an enzyme step.",
        "3-Methylpyridine is reacted with ammonia and oxygen (ammoxidation) to form 3-cyanopyridine. The enzyme nitrile hydratase, from Rhodococcus bacteria, then adds water to make niacinamide.",
        { equation: "C6H4N2 + H2O → C6H6N2O", significance: "The enzyme step stops cleanly at the amide, avoiding over-hydrolysis to niacin." },
      ),
    ],
  },

  "salicylic-acid": {
    overview: [
      "Salicylic acid (2-hydroxybenzoic acid) is a benzene ring with a carboxylic acid group and a hydroxyl group on neighboring carbons. Because the –OH sits right next to the acid group, the two form an internal hydrogen bond, making salicylic acid more fat-soluble than most acids.",
      "That oil-friendliness is its superpower in skincare. Unlike water-soluble alpha-hydroxy acids, salicylic acid, a beta-hydroxy acid, dissolves into the oily sebum inside pores and exfoliates from within, which is why it's a go-to acne treatment.",
    ],
    mechanisms: [
      mech(
        "Unclogging pores",
        "Lipophilic salicylic acid dissolves into sebum and weakens desmosomes, the protein links holding cells together in the pore lining.",
        "Clogged cells shed, preventing and loosening blackheads and whiteheads.",
        "human",
      ),
      mech(
        "Calming inflammation",
        "Salicylic acid suppresses inflammatory signaling, including the NF-κB pathway and prostaglandin production, related to how aspirin works.",
        "Red, swollen acne lesions can settle faster.",
        "lab",
      ),
      mech(
        "A plant immune hormone",
        "In plants, salicylic acid binds NPR receptor proteins that switch on defense genes.",
        "Infected plants raise salicylic acid levels, triggering systemic acquired resistance throughout the plant, much like an immune response.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Kolbe–Schmitt carboxylation",
        "Carbon dioxide is attached directly to a benzene ring.",
        [
          ["Phenoxide", "Phenol is converted to sodium phenoxide with sodium hydroxide."],
          ["Carboxylation", "Heated with CO₂ at about 125 °C and 100 atmospheres, the electron-rich ring attacks CO₂ at the position next to the oxygen."],
          ["Acidification", "Sulfuric acid converts sodium salicylate into salicylic acid."],
        ],
        "Hermann Kolbe's 1860 synthesis made salicylic acid cheap enough to become aspirin's starting material.",
        "C6H5ONa + CO2 → C6H4(OH)COONa",
      ),
      rxn(
        "Acetylation to aspirin",
        "Adding an acetyl group makes salicylic acid gentler on the stomach.",
        [
          ["Reagent", "Acetic anhydride is a reactive source of acetyl groups."],
          ["Esterification", "Salicylic acid's –OH attacks the anhydride, forming an acetyl ester."],
          ["Product", "Acetylsalicylic acid (aspirin) and acetic acid form."],
        ],
        "In the body, aspirin transfers its acetyl group to the COX enzyme, permanently blocking it, and becomes salicylic acid again.",
        "C7H6O3 + (CH3CO)2O → C9H8O4 + CH3COOH",
      ),
    ],
    hazards: [
      hz(
        "Dryness and irritation",
        "The most common side effect.",
        "Exfoliation and low pH weaken the skin barrier.",
        "Peeling, stinging or dryness, especially when combined with other acids or retinoids.",
      ),
      hz(
        "Salicylate toxicity from large-area use",
        "A concern for big body areas and young children, not spot treatments.",
        "Salicylic acid absorbed through large areas of skin enters the blood as salicylate.",
        "High levels cause salicylism: ringing ears, nausea and rapid breathing.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from phenol by the Kolbe–Schmitt reaction.",
        "Sodium phenoxide is carboxylated with CO₂ under heat and pressure, then acidified and recrystallized.",
      ),
      route(
        "From willow bark",
        "The historical, natural route.",
        "Willow bark contains salicin, a sugar-linked compound the body converts into salicylic acid. In 1838 Raffaele Piria produced salicylic acid from salicin in the lab.",
        { significance: "Willow bark remedies for pain and fever date back thousands of years, to ancient Sumer and Egypt." },
      ),
    ],
  },

  retinol: {
    overview: [
      "Retinol is vitamin A in its alcohol form: a six-membered ring (the β-ionone ring) attached to a long chain of four alternating double bonds, ending in an –OH group. That long conjugated chain absorbs light, making retinol pale yellow and very sensitive to UV light and oxygen.",
      "In skin, retinol is converted step by step into retinoic acid, which acts like a hormone, switching genes on and off inside cell nuclei. That's why retinoids are among the few cosmetic ingredients with strong evidence for reducing wrinkles.",
    ],
    mechanisms: [
      mech(
        "Switching genes through nuclear receptors",
        "Retinoic acid binds retinoic acid receptors (RARs), which pair with retinoid X receptors (RXRs) and attach to specific DNA sequences.",
        "Skin cells turn over faster and make more collagen, while collagen-degrading enzymes (MMPs) are reduced, smoothing fine lines and evening texture over months.",
        "human",
      ),
      mech(
        "Vision",
        "In the retina, retinal (the aldehyde form) is bound inside the protein opsin; absorbing a photon flips one double bond from cis to trans.",
        "That shape change triggers the nerve signal for sight, which is why vitamin A deficiency causes night blindness.",
        "established",
      ),
      mech(
        "Treating acne",
        "Retinoids normalize how cells line the pore and make shed cells less sticky.",
        "Fewer clogged pores form; prescription retinoids are a first-line acne treatment.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Stepwise oxidation in skin",
        "Retinol must be activated before it works.",
        [
          ["Step 1", "Retinol dehydrogenase oxidizes retinol to retinal (an aldehyde)."],
          ["Step 2", "Retinal dehydrogenase oxidizes retinal to retinoic acid."],
          ["Action", "Retinoic acid enters the nucleus and binds its receptors."],
        ],
        "Each conversion step limits how much reaches the active form, which is why retinol is gentler and slower than prescription retinoic acid.",
        "C20H30O → C20H28O → C20H28O2",
      ),
      rxn(
        "Light-triggered isomerization (how you see)",
        "One photon flips one bond.",
        [
          ["Resting state", "11-cis-retinal sits inside rhodopsin in rod cells."],
          ["Absorption", "A photon straightens the bent chain into all-trans-retinal in trillionths of a second."],
          ["Signal", "The protein changes shape, starting a cascade that fires the optic nerve."],
        ],
        "The same light sensitivity is why retinol products come in opaque packaging and are used at night.",
      ),
    ],
    hazards: [
      hz(
        "Irritation (“retinization”)",
        "Common in the first weeks of use.",
        "Faster cell turnover and changes in barrier lipids temporarily weaken the skin barrier.",
        "Redness, peeling and dryness usually settle within weeks; starting slowly helps.",
      ),
      hz(
        "Pregnancy caution",
        "Standard advice is to avoid retinoids during pregnancy.",
        "Excess retinoic acid disrupts the gene signals that guide embryo development.",
        "Oral isotretinoin causes birth defects. Topical cosmetic retinol is minimally absorbed, but avoidance is recommended as a precaution.",
      ),
      hz(
        "Sun sensitivity",
        "Use at night with daily sunscreen.",
        "A thinner outer layer of dead cells scatters less UV.",
        "Skin burns more easily while using retinoids.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis from beta-carotene",
        "Plants supply the precursor; we finish the job.",
        "In the intestine, the enzyme BCO1 cuts beta-carotene in half, producing two molecules of retinal, which are reduced to retinol and stored in the liver.",
        { significance: "Carrots don't contain vitamin A itself, but their beta-carotene becomes vitamin A in your body." },
      ),
      route(
        "Industrial synthesis",
        "Built by joining two smaller pieces.",
        "In BASF's route, a 15-carbon phosphonium salt made from β-ionone reacts with a 5-carbon aldehyde in a Wittig reaction, forming the final double bond and producing retinyl acetate.",
        { significance: "The Wittig reaction, which joins molecules with a C=C bond, earned Georg Wittig a share of the 1979 Nobel Prize." },
      ),
    ],
  },

  "zinc-oxide": {
    overview: [
      "Zinc oxide (ZnO) is an inorganic mineral that crystallizes in the wurtzite structure, where each zinc ion sits inside a tetrahedron of four oxygen ions. It's a white, insoluble powder gentle enough for diaper creams.",
      "It's also a semiconductor with a band gap of about 3.3 electron volts. Photons with more energy than that, meaning UV light shorter than about 380 nm, are absorbed, so zinc oxide blocks UVB and most UVA, the broadest coverage of any single sunscreen filter.",
    ],
    mechanisms: [
      mech(
        "Broad-spectrum UV protection",
        "UV photons excite electrons across ZnO's band gap; the energy is released mostly as harmless heat. Particles also scatter some light.",
        "Less UVB (which burns) and UVA (which ages skin and damages DNA) reaches living cells, lowering skin-cancer risk.",
        "established",
      ),
      mech(
        "Soothing irritated skin",
        "Zinc oxide forms a physical barrier and releases small amounts of zinc ions.",
        "Zinc supports enzymes involved in wound repair and has mild antimicrobial effects, which is why diaper creams rely on it.",
        "human",
      ),
      mech(
        "Staying on the surface",
        "Even nano-sized ZnO particles clump together and remain in the outer layer of dead skin cells.",
        "Studies on intact skin show little or no penetration into living tissue.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Amphoteric behavior",
        "Zinc oxide reacts with both acids and bases.",
        [
          ["With acid", "Hydrogen ions convert ZnO into dissolved zinc ions and water."],
          ["With base", "Strong hydroxide solutions dissolve it as zincate ions."],
          ["In skin products", "At skin's mildly acidic pH, a tiny amount of zinc ion is released."],
        ],
        "Being amphoteric means it can act as either an acid or a base.",
        "ZnO + 2 HCl → ZnCl2 + H2O",
      ),
      rxn(
        "The French process",
        "Burning zinc vapor makes ultra-pure zinc oxide.",
        [
          ["Vaporizing", "Zinc metal is boiled at about 907 °C."],
          ["Combustion", "The vapor burns in air with a bright flame."],
          ["Collection", "Fine white ZnO smoke is collected as powder."],
        ],
        "Alchemists called the fluffy white product “philosopher's wool”.",
        "2 Zn + O2 → 2 ZnO",
      ),
    ],
    hazards: [
      hz(
        "Inhaling powder or fumes",
        "Relevant to loose powders, sprays and metalworking, not lotions.",
        "Freshly formed zinc oxide fumes are inhaled deep into the lungs.",
        "Welders can develop “metal fume fever”, a flu-like reaction; avoid inhaling sprayed or powdered sunscreen.",
      ),
      hz(
        "Zinc in waterways",
        "An environmental rather than personal concern.",
        "Dissolved zinc ions interfere with ion transport in the gills of aquatic organisms.",
        "High local concentrations can harm some marine life.",
      ),
    ],
    synthesis: [
      route(
        "French process",
        "Zinc metal is vaporized and burned.",
        "Molten zinc is boiled, the vapor is oxidized in air, and the resulting particles are collected and sorted by size; cosmetic grades are often coated.",
      ),
      route(
        "American process",
        "Straight from zinc ore.",
        "Zinc ore is roasted, reduced with coal to zinc vapor, and burned in air in one continuous process.",
        { significance: "Rubber manufacturing, not cosmetics, uses most of the world's zinc oxide." },
      ),
    ],
  },

  methylisothiazolinone: {
    overview: [
      "Methylisothiazolinone (MIT) is a small five-membered ring in which sulfur and nitrogen are bonded directly to each other, next to a carbonyl group. That N–S bond is weak and electron-poor, which makes the molecule eager to react with sulfur atoms in proteins.",
      "That reactivity makes MIT a powerful preservative at parts-per-million levels, and it's the same property that makes it one of the most common causes of allergic contact dermatitis. The EU banned it from leave-on cosmetics in 2017.",
    ],
    mechanisms: [
      mech(
        "Disabling microbial enzymes",
        "The thiol (–SH) group of cysteine in a microbial enzyme attacks MIT's sulfur, breaking the N–S bond and forming a mixed disulfide that blocks the enzyme.",
        "Dehydrogenases needed for respiration shut down, so bacteria and fungi stop growing within minutes and die within hours.",
        "lab",
      ),
      mech(
        "Sensitizing human skin",
        "The same reaction with cysteine in human skin proteins creates altered proteins (haptenation).",
        "Immune cells present these to T cells. Once sensitized, a person can react to a few ppm, or even to fumes from freshly painted walls.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Thiol attack and ring opening",
        "How MIT disables proteins.",
        [
          ["Attack", "The sulfur of a cysteine thiol attacks MIT's ring sulfur."],
          ["Ring opening", "The weak N–S bond breaks and the ring opens."],
          ["Disulfide", "The protein is left bonded to the opened MIT through an S–S link."],
        ],
        "Any protein with an exposed cysteine can be modified, whether it's a bacterial enzyme or a skin protein.",
        "R-SH + MIT → R-S-S-(ring-opened adduct)",
      ),
      rxn(
        "Making the ring",
        "MIT is formed by closing a sulfur–nitrogen bond.",
        [
          ["Precursor", "N-methyl-3-mercaptopropionamide (or its disulfide) is the starting material."],
          ["Chlorination", "A chlorinating agent activates the sulfur."],
          ["Cyclization", "Sulfur bonds to the amide nitrogen, closing the ring; a chlorinated version (MCI) forms alongside."],
        ],
        "MCI and MIT are often sold together as a blend, which is an even stronger sensitizer.",
      ),
    ],
    hazards: [
      hz(
        "Allergic contact dermatitis",
        "One of the most common contact allergens.",
        "MIT covalently modifies skin proteins.",
        "Itchy, blistering eczema where products touch; allergy rates surged in the 2010s when MIT use increased, and it was named Allergen of the Year in 2013.",
      ),
      hz(
        "Airborne exposure",
        "Paints, glues and cleaners can release MIT into the air.",
        "Volatile MIT evaporates from freshly painted surfaces.",
        "Sensitized people can develop facial or eyelid eczema just from being in a newly painted room.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made by ring-closing a sulfur-containing amide.",
        "N-methyl-3-mercaptopropionamide is cyclized with a chlorinating agent, producing a mixture of MIT and MCI that can be separated.",
        { significance: "When MIT alone was allowed at higher levels in the 2000s, allergy rates rose sharply, a lesson in how dose drives sensitization." },
      ),
    ],
  },
};
