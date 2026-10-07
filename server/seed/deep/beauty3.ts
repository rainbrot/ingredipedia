import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const BEAUTY_DEEP_3: Record<string, DeepProfile> = {
  "cetearyl-alcohol": {
    overview: [
      "Cetearyl alcohol is a blend of two fatty alcohols: cetyl alcohol (16 carbons) and stearyl alcohol (18 carbons). Each is a long, straight hydrocarbon chain ending in a single –OH group, so the molecules are waxy solids at room temperature.",
      "Despite the word “alcohol”, they behave nothing like drinking or rubbing alcohol. A small –OH head on a long oily tail makes them gentle emulsifiers and thickeners that give creams their rich, cushiony body and leave skin soft rather than dry.",
    ],
    mechanisms: [
      mech(
        "Building cream structure",
        "With emulsifiers, fatty alcohols arrange into stacked bilayers (lamellae) that trap water between them, forming a gel network much like the lipid layers in skin.",
        "The cream feels thick and smooth on the skin and stays stable for years without separating.",
        "established",
      ),
      mech(
        "Softening skin",
        "Long fatty chains fill the gaps between dry skin flakes and form a light, breathable film.",
        "Skin feels smoother and loses water more slowly.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrogenation of plant fatty acids",
        "Turning an oil's fatty acids into fatty alcohols.",
        [
          ["Esters", "Coconut or palm oil is converted into fatty acid methyl esters."],
          ["Hydrogenation", "With hydrogen and a copper catalyst at high pressure, each ester's C=O group is reduced."],
          ["Products", "Fatty alcohols form, releasing methanol; C16 and C18 cuts are blended."],
        ],
        "Reducing a carbonyl group to an alcohol is a core reaction in organic chemistry.",
        "RCOOCH3 + 2 H2 → RCH2OH + CH3OH",
      ),
      rxn(
        "Forming a lamellar gel network",
        "How a cream sets as it cools.",
        [
          ["Hot mixing", "Fatty alcohol and emulsifier are melted together with water above about 70 °C."],
          ["Swelling", "Emulsifier and fatty alcohol molecules pair up and absorb water into layered sheets."],
          ["Cooling", "The layers crystallize into a network that holds water and oil droplets in place."],
        ],
        "Cooling speed and stirring change the network, which is why manufacturers control them precisely.",
      ),
    ],
    hazards: [
      hz(
        "Rare contact allergy",
        "Uncommon relative to how widely it's used.",
        "Impurities or the fatty alcohols themselves occasionally act as haptens.",
        "A few people develop eczema at the application site, more often on already damaged skin.",
      ),
    ],
    synthesis: [
      route(
        "From plant oils",
        "Most cetearyl alcohol comes from coconut or palm oil.",
        "Fatty acids or methyl esters from the oil are hydrogenated into fatty alcohols, distilled, and the 16- and 18-carbon fractions are blended.",
        { significance: "Cetyl alcohol was first isolated in 1817 from spermaceti, a waxy oil from sperm whales; its name comes from cetus, Latin for whale." },
      ),
    ],
  },

  "propylene-glycol": {
    overview: [
      "Propylene glycol (propane-1,2-diol) is a three-carbon molecule with two –OH groups, on the first and second carbons. The second carbon is chiral, so it has two mirror-image forms; commercial propylene glycol is a 50:50 mix.",
      "Two hydroxyls on a small backbone let it mix with water, alcohol and many oils. It holds moisture, dissolves flavors and active ingredients, and lowers water's freezing point, which is why it appears in everything from cake frosting to aircraft de-icer.",
    ],
    mechanisms: [
      mech(
        "Humectant and solvent",
        "Its hydroxyl groups hydrogen-bond with water while its methyl group helps dissolve less polar molecules.",
        "In skincare it carries actives and holds moisture; in food it keeps flavors evenly dissolved.",
        "established",
      ),
      mech(
        "Helping ingredients penetrate",
        "Propylene glycol temporarily loosens the tightly packed lipids of the skin's outer layer and changes how other ingredients partition into skin.",
        "Medicines and actives absorb better, which can also increase irritation from other ingredients.",
        "human",
      ),
      mech(
        "Metabolized to lactic acid",
        "Alcohol dehydrogenase oxidizes propylene glycol to lactaldehyde, then to lactic acid.",
        "Lactic acid joins normal metabolism. Only very large intravenous doses, from some hospital medicines, cause lactic acidosis.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydration of propylene oxide",
        "Opening a strained ring with water.",
        [
          ["Ring strain", "Propylene oxide's three-membered ring is strained and reactive."],
          ["Attack", "Water attacks one ring carbon, often helped by acid or heat."],
          ["Product", "The ring opens, leaving an –OH group on each of the two carbons."],
        ],
        "Excess water is used so the product doesn't react further into larger glycols.",
        "C3H6O + H2O → C3H8O2",
      ),
      rxn(
        "Metabolism in the body",
        "Two oxidation steps.",
        [
          ["Oxidation 1", "Alcohol dehydrogenase converts the secondary –OH into a carbonyl, forming lactaldehyde."],
          ["Oxidation 2", "Aldehyde dehydrogenase converts lactaldehyde into lactic acid."],
          ["Recycling", "Lactic acid is used for energy or rebuilt into glucose."],
        ],
        "This harmless pathway is why propylene glycol, not toxic ethylene glycol, is used in “pet-safe” antifreeze.",
      ),
    ],
    hazards: [
      hz(
        "Irritation and allergy",
        "Named Allergen of the Year in 2018.",
        "At high concentrations it can disrupt the skin barrier; occasionally it acts as an allergen.",
        "Irritant reactions (stinging, redness) are more common than true allergy, and mostly occur with high concentrations.",
      ),
      hz(
        "Very high intravenous doses",
        "A hospital concern, not a consumer one.",
        "Large IV amounts produce lactic acid faster than the body clears it.",
        "Lactic acidosis can develop in patients receiving high-dose IV medications containing it.",
      ),
    ],
    synthesis: [
      route(
        "From propylene",
        "The main industrial route.",
        "Propylene is oxidized to propylene oxide, which is hydrated with water and distilled to pharmaceutical grade.",
      ),
      route(
        "From glycerin",
        "A renewable route using biodiesel's byproduct.",
        "Glycerin is reacted with hydrogen over a copper catalyst (hydrogenolysis), removing one –OH group to form propylene glycol.",
        { significance: "Turning a waste stream into a useful chemical is a core idea of green chemistry." },
      ),
    ],
  },

  panthenol: {
    overview: [
      "Panthenol is the alcohol form of pantothenic acid (vitamin B5): pantoic acid joined by an amide bond to 3-aminopropanol. Its several hydroxyl groups make it a viscous, water-loving liquid.",
      "The name pantothenic comes from the Greek pantothen, “from everywhere”, because the vitamin is found in almost all foods. In skin and hair care, panthenol is a provitamin: skin enzymes convert it into pantothenic acid, which cells use to build coenzyme A.",
    ],
    mechanisms: [
      mech(
        "Coenzyme A and barrier lipids",
        "Pantothenic acid is built into coenzyme A, which carries acyl groups during the synthesis of fatty acids and other lipids.",
        "Skin uses these lipids to rebuild its barrier; studies show dexpanthenol improves hydration and reduces water loss.",
        "human",
      ),
      mech(
        "Soothing and healing",
        "Panthenol supports the multiplication of fibroblasts and the migration of cells that close wounds.",
        "Minor cuts, burns and diaper rash can heal faster; dexpanthenol ointments are widely used for this in Europe.",
        "human",
      ),
      mech(
        "Hair conditioning",
        "Panthenol penetrates the hair shaft and binds water through hydrogen bonding.",
        "Hair looks shinier and fuller, though panthenol does not make hair grow faster.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Activation in skin",
        "A provitamin becomes a vitamin.",
        [
          ["Absorption", "Panthenol penetrates the skin's outer layers."],
          ["Oxidation", "Enzymes oxidize its terminal alcohol group into a carboxylic acid."],
          ["Product", "Pantothenic acid forms and is used to make coenzyme A."],
        ],
        "Panthenol penetrates skin better than pantothenic acid, which is why it's used as the delivery form.",
      ),
      rxn(
        "Amide coupling (how it's made)",
        "Two building blocks joined into one.",
        [
          ["Lactone", "D-pantolactone, a ring-shaped ester, is prepared and separated from its mirror image."],
          ["Ring opening", "3-Aminopropanol's amine attacks the lactone's carbonyl, opening the ring."],
          ["Amide", "An amide bond forms, giving D-panthenol."],
        ],
        "Only the D-form converts to active vitamin B5, so manufacturers isolate the correct mirror image.",
        "C6H10O3 + C3H9NO → C9H19NO4",
      ),
    ],
    hazards: [
      hz(
        "Rare allergy",
        "Very well tolerated.",
        "Occasionally acts as an allergen in skin.",
        "Contact dermatitis is reported only rarely despite wide use.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis of vitamin B5",
        "Bacteria and plants make it; animals can't.",
        "Microbes and plants build pantothenic acid from pantoate (made from the amino acid valine) and β-alanine.",
        { significance: "Because we can't make it, we rely on food and gut bacteria for vitamin B5." },
      ),
      route(
        "Industrial synthesis",
        "Made from pantolactone.",
        "D-pantolactone is condensed with 3-aminopropanol to form D-panthenol, then purified.",
        { significance: "Roger J. Williams discovered pantothenic acid in 1933." },
      ),
    ],
  },

  "aloe-vera": {
    overview: [
      "Aloe vera gel comes from the clear inner tissue of the thick leaves of Aloe barbadensis Miller. It's about 99% water; the rest is a mix of polysaccharides (especially acemannan, an acetylated chain of mannose sugars), glycoproteins, enzymes, vitamins, minerals and small molecules.",
      "The leaf's outer rind holds a bitter yellow latex rich in anthraquinones such as aloin, a strong laxative. Cosmetic aloe is decolorized to remove most of it, which matters because aloin is behind aloe's main safety concern.",
    ],
    mechanisms: [
      mech(
        "A hydrating film",
        "Acemannan's long, water-bound polysaccharide chains form a moist film on skin.",
        "Skin feels cool and hydrated, which is why aloe is a popular after-sun soother.",
        "human",
      ),
      mech(
        "Possible burn and wound support",
        "In lab studies, polysaccharides and glycoproteins in the gel stimulated fibroblasts and reduced inflammatory signals.",
        "Some trials found faster healing of minor burns; others found no benefit, so the evidence is mixed.",
        "emerging",
      ),
      mech(
        "Aloin's laxative effect",
        "Gut bacteria convert aloin into aloe-emodin anthrone, which stimulates the colon and increases water secretion into the bowel.",
        "This causes cramping and diarrhea, which is why FDA removed aloe from approved over-the-counter laxatives in 2002.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Decolorization with activated charcoal",
        "Removing aloin from aloe juice.",
        [
          ["Mixing", "Aloe juice is stirred with activated charcoal, which has an enormous internal surface area."],
          ["Adsorption", "Flat, aromatic anthraquinones like aloin stick to the charcoal's carbon surfaces."],
          ["Filtering", "The charcoal is filtered out, taking the aloin with it."],
        ],
        "Decolorized aloe typically contains less than 10 ppm aloin, a key safety specification.",
      ),
    ],
    hazards: [
      hz(
        "Whole-leaf extract and aloin",
        "Applies to non-decolorized whole-leaf products, mainly when swallowed.",
        "Aloin and related anthraquinones irritate the colon lining.",
        "In a U.S. National Toxicology Program study, rats drinking whole-leaf extract developed intestinal tumors, leading IARC to classify it as possibly carcinogenic (2B).",
      ),
      hz(
        "Allergy",
        "Uncommon.",
        "Plant proteins and anthraquinones can trigger immune reactions.",
        "People allergic to plants in the lily family (garlic, onions, tulips) are more likely to react.",
      ),
    ],
    synthesis: [
      route(
        "Harvesting and processing",
        "Aloe gel is extracted, not synthesized.",
        "Mature leaves are cut and washed, and the outer rind is removed. The inner gel is filleted, homogenized, filtered and decolorized with activated charcoal, then stabilized with preservatives.",
        { significance: "Aloe appears in the Egyptian Ebers Papyrus, written around 1550 BCE." },
      ),
    ],
  },

  "shea-butter": {
    overview: [
      "Shea butter is the fat pressed from the nuts of the shea tree (Vitellaria paradoxa), which grows wild across Africa's Sahel. Chemically it's mostly triglycerides rich in stearic acid (a straight, saturated 18-carbon chain) and oleic acid (an 18-carbon chain with one kink).",
      "That balance makes it solid at room temperature but able to melt on skin. Shea also has an unusually large unsaponifiable fraction, up to about 10%: triterpene alcohols and esters, plant sterols and vitamin E. These components can't be turned into soap and are linked to shea's soothing reputation.",
    ],
    mechanisms: [
      mech(
        "Sealing in moisture",
        "Shea's fats form a semi-occlusive film and fill spaces between dry skin cells.",
        "Water loss slows and rough, dry skin feels smoother; it's often recommended for very dry and eczema-prone skin.",
        "human",
      ),
      mech(
        "Anti-inflammatory triterpenes",
        "In lab studies, triterpene esters such as lupeol cinnamate inhibited inflammatory enzymes and signaling pathways.",
        "This may contribute to shea's soothing effect, though human evidence is limited.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Saponification and the unsaponifiables",
        "Not everything in shea becomes soap.",
        [
          ["Soap formation", "Lye attacks the ester bonds of triglycerides, forming soap and glycerol."],
          ["Leftovers", "Triterpenes and sterols aren't esters of fatty acids in the same way, so they don't become soap."],
          ["Result", "They remain unchanged in the finished bar."],
        ],
        "Shea soaps keep some of shea's unsaponifiable components, which soap makers prize.",
      ),
      rxn(
        "Crystallization and graininess",
        "Why shea butter can turn grainy.",
        [
          ["Melting", "Shea is melted, for example during shipping in hot weather."],
          ["Slow cooling", "Higher-melting stearic-rich triglycerides crystallize first, in unstable forms."],
          ["Grains", "These crystals grow into gritty lumps."],
        ],
        "Tempering, controlled heating and cooling as done with chocolate, keeps shea butter smooth.",
      ),
    ],
    hazards: [
      hz(
        "Very low hazard",
        "Shea is botanically a tree nut, but refined shea butter contains almost no protein.",
        "Allergies are triggered by proteins, which refining removes.",
        "Allergic reactions to topical shea butter are very rare, even among people with tree-nut allergies.",
      ),
    ],
    synthesis: [
      route(
        "Traditional extraction",
        "Done largely by women's cooperatives in West Africa.",
        "Nuts are dried, cracked, roasted and ground into a paste, which is kneaded with water until the fat separates. The fat is skimmed, boiled and filtered.",
        { significance: "The shea trade provides income for millions of women in the Sahel, earning shea the nickname “women's gold”." },
      ),
      route(
        "Industrial refining",
        "For cosmetics and chocolate.",
        "Crude shea butter, or fat extracted with solvents, is refined, bleached and deodorized to remove odor and color.",
        { significance: "In the EU, shea is one of six vegetable fats allowed in chocolate, up to 5%." },
      ),
    ],
  },

  "disodium-edta": {
    overview: [
      "EDTA (ethylenediaminetetraacetic acid) is built from two nitrogen atoms and four acetate arms. Disodium EDTA is its salt with two of the four acid groups neutralized.",
      "In solution, EDTA wraps around a metal ion using six binding sites at once (two nitrogens and four carboxylates), forming an exceptionally stable cage-like complex called a chelate. It grabs calcium, magnesium, iron and copper, metals that would otherwise discolor products, weaken preservatives or speed spoilage.",
    ],
    mechanisms: [
      mech(
        "Locking up metal ions",
        "EDTA's six donor atoms surround one metal ion in an octahedral cage. Because one molecule binds from six points, the complex is far more stable than if separate molecules did the binding (the chelate effect).",
        "Metal-catalyzed oxidation, discoloration and soap scum are prevented, so products stay stable and clear.",
        "established",
      ),
      mech(
        "Boosting preservatives",
        "EDTA pulls calcium and magnesium out of the outer membrane of Gram-negative bacteria, where these ions bridge lipopolysaccharide molecules together.",
        "The membrane becomes leaky and lets preservatives in, so lower preservative levels are effective.",
        "lab",
      ),
      mech(
        "Treating lead poisoning",
        "Calcium disodium EDTA swaps its calcium for lead, which EDTA binds even more tightly.",
        "The lead–EDTA complex is excreted in urine; doctors use this as chelation therapy under supervision.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Chelation",
        "One molecule, six bonds to one metal ion.",
        [
          ["Deprotonation", "In solution, EDTA's carboxylic acid groups lose protons."],
          ["Wrapping", "Two nitrogens and four carboxylate oxygens close around the metal ion."],
          ["Release", "Protons are released as the stable complex forms."],
        ],
        "Chelation is why EDTA is used in blood-collection tubes: removing calcium stops blood from clotting.",
        "Ca2+ + H2Y^2- → CaY^2- + 2 H+",
      ),
      rxn(
        "Synthesis",
        "Built from ethylenediamine, formaldehyde and cyanide.",
        [
          ["Addition", "Formaldehyde and cyanide add to each nitrogen–hydrogen of ethylenediamine (a Strecker-type reaction)."],
          ["Hydrolysis", "The resulting nitrile groups are hydrolyzed in base to carboxylates, releasing ammonia."],
          ["Adjustment", "Tetrasodium EDTA is partly acidified to disodium EDTA and crystallized."],
        ],
        "Four acetate arms are added in one process, creating the six-armed chelator.",
        "H2NCH2CH2NH2 + 4 CH2O + 4 NaCN + 4 H2O → Na4EDTA + 4 NH3",
      ),
    ],
    hazards: [
      hz(
        "Low toxicity in products",
        "Safe at cosmetic and food levels.",
        "EDTA is poorly absorbed through skin and gut.",
        "Only intravenous doses can lower blood calcium significantly, which is why chelation therapy is done under medical supervision.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from ethylenediamine.",
        "Ethylenediamine reacts with formaldehyde and sodium cyanide to form tetrasodium EDTA, which is partially acidified to disodium EDTA and crystallized.",
        { significance: "Ferdinand Münz developed EDTA in 1935 as a substitute for citric acid in textile dyeing." },
      ),
    ],
  },

  oxybenzone: {
    overview: [
      "Oxybenzone (benzophenone-3) is two benzene rings joined by a carbonyl group (a ketone), with a hydroxyl group and a methoxy group on one ring. The –OH sits next to the carbonyl, forming an internal hydrogen bond that is key to how the molecule handles UV light.",
      "It absorbs UVB and short-wave UVA and was one of the first broader-spectrum chemical filters. But it's absorbed through skin into the bloodstream, can cause photoallergies and has been linked to harm in corals, so its use is now restricted in several places.",
    ],
    mechanisms: [
      mech(
        "Turning UV into heat",
        "After absorbing a UV photon, the hydroxyl proton jumps to the carbonyl oxygen (excited-state intramolecular proton transfer). The molecule relaxes and the proton moves back, releasing the energy as heat.",
        "UV energy is converted to harmless heat before it can damage the DNA in skin cells.",
        "established",
      ),
      mech(
        "Absorption into the body",
        "Small and fat-soluble, oxybenzone passes through the skin's outer layer into the blood.",
        "FDA-run trials found blood levels far above the threshold that triggers further safety testing after normal sunscreen use; what that means for health is still being studied.",
        "human",
      ),
      mech(
        "Hormone activity in lab studies",
        "Oxybenzone and its metabolite benzophenone-1 bind estrogen receptors weakly and can block androgen receptors in cell tests.",
        "High-dose animal studies show hormonal effects; human relevance is uncertain.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Excited-state proton transfer",
        "A molecular trick for handling UV energy.",
        [
          ["Absorption", "The conjugated rings absorb a UV photon and enter an excited state."],
          ["Proton hop", "The –OH proton transfers to the neighboring carbonyl oxygen in femtoseconds."],
          ["Relaxation", "The molecule returns to its ground state, the proton moves back, and the energy is released as heat."],
        ],
        "Because the molecule resets itself, one oxybenzone molecule can absorb many photons, although it still degrades slowly in sunlight.",
      ),
      rxn(
        "Synthesis",
        "Built in two steps.",
        [
          ["Acylation", "Resorcinol reacts with benzotrichloride to form 2,4-dihydroxybenzophenone."],
          ["Selective methylation", "One of the two –OH groups is converted into a methoxy group."],
          ["Purification", "The product is crystallized."],
        ],
        "Leaving the –OH next to the carbonyl untouched preserves the internal hydrogen bond that makes it a UV filter.",
      ),
    ],
    hazards: [
      hz(
        "Photoallergy",
        "Among the most common sunscreen allergens.",
        "UV light can turn oxybenzone into a reactive form that bonds to skin proteins.",
        "Sensitized people get an itchy rash on sun-exposed, sunscreen-covered skin; benzophenones were named Allergen of the Year in 2014.",
      ),
      hz(
        "Coral reef concerns",
        "The reason Hawaii banned it in 2021.",
        "Oxybenzone accumulates in coastal water near popular beaches.",
        "Laboratory studies found it damaged coral larvae and promoted bleaching; field relevance is debated, but several regions now restrict it.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "Made from resorcinol.",
        "Resorcinol and benzotrichloride form 2,4-dihydroxybenzophenone, which is selectively methylated to oxybenzone.",
        { significance: "Mineral filters (zinc oxide, titanium dioxide) and newer organic filters offer protection without oxybenzone." },
      ),
    ],
  },
};
