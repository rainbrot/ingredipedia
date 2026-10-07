import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const CLEANING_DEEP_2: Record<string, DeepProfile> = {
  ethanol: {
    overview: [
      "Ethanol (C₂H₅OH) is a two-carbon chain with a hydroxyl group: small and polar enough to mix completely with water, yet oily enough to dissolve many fats and fragrances. That dual nature makes it one of the world's most useful solvents.",
      "It's the alcohol in drinks, the active ingredient in most hand sanitizers, and, as “alcohol denat.”, a common cosmetic ingredient made undrinkable with bitter additives. Yeasts have produced it by fermentation for hundreds of millions of years.",
    ],
    mechanisms: [
      mech(
        "Killing germs",
        "Ethanol denatures proteins by disrupting the hydrogen bonds and hydrophobic interactions that hold their shapes, and it dissolves membrane lipids. Water is needed too: 60–80% works better than pure ethanol because water helps it penetrate cells and unfold proteins.",
        "Bacteria and enveloped viruses such as influenza and coronaviruses are inactivated within seconds. It works poorly against norovirus and bacterial spores.",
        "established",
      ),
      mech(
        "Effects on the brain",
        "When swallowed, ethanol enhances the activity of GABA-A receptors and inhibits NMDA glutamate receptors.",
        "Neural signaling slows, causing relaxation, poor coordination and, at high doses, unconsciousness; the developing teenage brain is especially vulnerable.",
        "established",
      ),
      mech(
        "Drying skin",
        "High concentrations dissolve the lipids in the skin's outer layer.",
        "Frequent use of sanitizers can dry and crack hands, which is why sanitizers add glycerin.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Fermentation",
        "Yeast turn sugar into alcohol when oxygen is scarce.",
        [
          ["Glycolysis", "Glucose is split into two pyruvate molecules, making a little ATP."],
          ["Decarboxylation", "Each pyruvate loses CO₂, becoming acetaldehyde."],
          ["Reduction", "Acetaldehyde is reduced to ethanol, recycling NAD⁺ so glycolysis can continue."],
        ],
        "The CO₂ makes bread rise and beer fizz; the ethanol is what distillers concentrate.",
        "C6H12O6 → 2 C2H5OH + 2 CO2",
      ),
      rxn(
        "Metabolism in the liver",
        "Your body oxidizes ethanol in two steps.",
        [
          ["Step 1", "Alcohol dehydrogenase oxidizes ethanol to acetaldehyde."],
          ["Step 2", "Aldehyde dehydrogenase (ALDH2) oxidizes acetaldehyde to acetic acid."],
          ["Final", "Acetic acid enters normal metabolism and ends as CO₂ and water."],
        ],
        "Acetaldehyde is toxic and carcinogenic. People with a less active ALDH2 enzyme flush red after drinking because it builds up.",
        "C2H5OH → CH3CHO → CH3COOH",
      ),
    ],
    hazards: [
      hz(
        "Flammable",
        "Store sanitizers and sprays away from flames.",
        "Ethanol has a flash point of about 13 °C, so its vapor ignites easily at room temperature.",
        "Fires and burns are the main risk with alcohol-based products.",
      ),
      hz(
        "Poisoning if swallowed",
        "A real risk for young children with hand sanitizer.",
        "Ethanol depresses the central nervous system and can cause dangerously low blood sugar in small children.",
        "A few squirts of sanitizer can cause alcohol poisoning in a toddler.",
      ),
      hz(
        "Alcoholic drinks and cancer",
        "Applies to drinking alcohol, not to skin products.",
        "Acetaldehyde from ethanol metabolism damages DNA.",
        "IARC classifies alcoholic beverages as a Group 1 carcinogen; topical use is not linked to cancer.",
      ),
    ],
    synthesis: [
      route(
        "Fermentation and distillation",
        "The ancient route, still used for drinks and fuel.",
        "Yeast ferment sugar cane, corn or grain mash into a weak alcohol solution. Distillation separates ethanol, which boils at 78 °C, from water, concentrating it to about 95%.",
        { significance: "Ethanol and water form an azeotrope at about 95%, so ordinary distillation can't go higher." },
      ),
      route(
        "Hydration of ethylene",
        "The petrochemical route for industrial ethanol.",
        "Ethylene and steam are passed over a phosphoric acid catalyst at high temperature and pressure, adding water across the double bond.",
        { equation: "C2H4 + H2O → C2H5OH" },
      ),
    ],
  },

  "isopropyl-alcohol": {
    overview: [
      "Isopropyl alcohol (propan-2-ol) is a three-carbon chain with its hydroxyl group on the middle carbon, which makes it a secondary alcohol. It's slightly less polar than ethanol, so it dissolves oils and residues well and evaporates quickly without streaks.",
      "Rubbing alcohol is usually 70% isopropanol in water. Like ethanol, it denatures proteins, but it is more toxic if swallowed, because the liver converts it into acetone.",
    ],
    mechanisms: [
      mech(
        "Disinfecting",
        "Isopropanol denatures proteins and dissolves membrane lipids; at around 70%, water helps it penetrate cells before it evaporates.",
        "Bacteria and enveloped viruses are inactivated. Higher concentrations (91–99%) evaporate too fast and coagulate outer proteins, which can protect the cell inside.",
        "established",
      ),
      mech(
        "Cooling skin",
        "Isopropanol evaporates quickly, absorbing heat from the skin as it changes from liquid to vapor.",
        "Skin feels cold. It was once used for sponge baths, but that's no longer advised because children can absorb or inhale toxic amounts.",
        "established",
      ),
      mech(
        "Metabolized to acetone",
        "Alcohol dehydrogenase oxidizes the secondary alcohol into a ketone, acetone, which isn't further oxidized to an acid.",
        "Acetone depresses the nervous system and gives breath a fruity smell; unlike methanol poisoning, it doesn't cause severe acidosis.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydration of propene",
        "Water adds across a double bond.",
        [
          ["Protonation", "An acid catalyst adds a proton to propene's double bond, forming the more stable secondary carbocation (Markovnikov's rule)."],
          ["Attack", "Water attacks the positively charged middle carbon."],
          ["Deprotonation", "Losing a proton leaves an –OH on the middle carbon: isopropanol."],
        ],
        "Markovnikov's rule predicts that the –OH ends up on the middle carbon rather than the end.",
        "CH3CH=CH2 + H2O → (CH3)2CHOH",
      ),
      rxn(
        "Oxidation to acetone",
        "Secondary alcohols oxidize to ketones.",
        [
          ["Oxidation", "An oxidizing agent or enzyme removes two hydrogen atoms."],
          ["Carbonyl", "The C–OH becomes a C=O group."],
          ["Stops there", "Ketones resist further oxidation, unlike aldehydes."],
        ],
        "This is the same reaction your liver performs, and a classic way to tell primary from secondary alcohols.",
        "(CH3)2CHOH → (CH3)2CO + 2 [H]",
      ),
    ],
    hazards: [
      hz(
        "Flammable",
        "Its vapor ignites easily.",
        "Isopropanol's flash point is about 12 °C.",
        "Keep it away from flames and sparks, and don't use it near heaters.",
      ),
      hz(
        "Poisoning if swallowed",
        "More toxic than ethanol.",
        "It depresses the central nervous system, and its metabolite acetone adds to the effect.",
        "As little as 1 mL per kilogram of body weight can be dangerous for a small child.",
      ),
    ],
    synthesis: [
      route(
        "Hydration of propene",
        "Made from a petroleum gas.",
        "Propene is hydrated either indirectly, via sulfuric acid esters that are then hydrolyzed, or directly over solid acid catalysts, then distilled.",
        { significance: "First produced commercially in 1920, isopropanol is considered the first petrochemical." },
      ),
    ],
  },

  "ammonium-hydroxide": {
    overview: [
      "Household ammonia is ammonia gas (NH₃) dissolved in water. Ammonia is a pyramid-shaped molecule with a lone pair of electrons on its nitrogen; that lone pair grabs protons from water, forming ammonium (NH₄⁺) and hydroxide (OH⁻) ions, so the solution is alkaline (pH about 11–12).",
      "Because ammonia is volatile, it evaporates completely from glass and leaves no residue, the secret behind streak-free window cleaners. The same volatility explains why its sharp smell reaches your nose so quickly.",
    ],
    mechanisms: [
      mech(
        "Streak-free grease cutting",
        "Hydroxide ions saponify thin fatty films, and ammonia itself evaporates as the surface dries.",
        "Glass is left clean with nothing behind to leave streaks.",
        "established",
      ),
      mech(
        "Irritating the airways",
        "Ammonia dissolves in the moist lining of the eyes, nose and throat, forming hydroxide ions there.",
        "This causes burning, coughing and watering eyes. We can smell ammonia at about 5 ppm, well below harmful levels, which serves as a warning.",
        "established",
      ),
      mech(
        "Opening hair for dye",
        "In permanent hair dye, ammonia raises the pH, swelling and lifting the scales of the hair cuticle.",
        "Dye molecules and peroxide can then penetrate the hair shaft and react inside it.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Acting as a base",
        "Ammonia makes water alkaline.",
        [
          ["Lone pair", "Ammonia's nitrogen has an unshared pair of electrons."],
          ["Proton grab", "It takes a proton from water, forming ammonium."],
          ["Hydroxide", "The water molecule left behind becomes a hydroxide ion."],
        ],
        "Only a small fraction reacts at any moment (ammonia is a weak base), but enough to give pH 11–12.",
        "NH3 + H2O ⇌ NH4+ + OH-",
      ),
      rxn(
        "Chloramines (never mix with bleach)",
        "A dangerous reaction.",
        [
          ["Mixing", "Ammonia meets hypochlorite from bleach."],
          ["Substitution", "Chlorine atoms replace hydrogens on ammonia."],
          ["Toxic vapors", "Chloramines such as NH₂Cl are released into the air."],
        ],
        "Chloramine vapors cause coughing, chest pain and breathing problems.",
        "NaOCl + NH3 → NH2Cl + NaOH",
      ),
    ],
    hazards: [
      hz(
        "Corrosive when concentrated",
        "Household ammonia is 5–10%; industrial solutions are much stronger.",
        "Hydroxide ions damage proteins and lipids on contact.",
        "Concentrated ammonia burns skin and eyes; use household strength with ventilation.",
      ),
      hz(
        "Toxic gas with bleach",
        "Never combine ammonia and bleach.",
        "Chloramines form immediately.",
        "Inhaling them inflames the lungs and can cause fluid buildup.",
      ),
    ],
    synthesis: [
      route(
        "The Haber–Bosch process",
        "Ammonia is made from air and natural gas.",
        "Nitrogen from air and hydrogen from natural gas react over an iron catalyst at 400–450 °C and high pressure. The ammonia is condensed and dissolved in water for household use.",
        {
          equation: "N2 + 3 H2 → 2 NH3",
          significance: "Ammonia made this way feeds roughly half the world's population through fertilizer; Fritz Haber and Carl Bosch both won Nobel Prizes for it.",
        },
      ),
    ],
  },

  "acetic-acid": {
    overview: [
      "Acetic acid (CH₃COOH) is a two-carbon carboxylic acid: a methyl group attached to a –COOH group. It's a weak acid (pKa 4.76), so in vinegar, which is about 5% acetic acid, only a small fraction of molecules release their proton at any moment.",
      "Pure acetic acid freezes at 16.6 °C into ice-like crystals, which is why it's called glacial acetic acid. Vinegar's sharp smell is acetic acid evaporating; its cleaning power comes from dissolving the alkaline mineral deposits left by hard water.",
    ],
    mechanisms: [
      mech(
        "Dissolving limescale",
        "Acetic acid reacts with calcium carbonate deposits, converting them into soluble calcium acetate and carbon dioxide.",
        "Kettle scale, faucet crust and soap scum loosen and rinse away.",
        "established",
      ),
      mech(
        "Preserving food",
        "Uncharged acetic acid crosses microbial membranes, then releases its proton inside the cell, acidifying it.",
        "Spoilage and disease-causing bacteria can't grow in pickles and other vinegar-preserved foods.",
        "established",
      ),
      mech(
        "Blood sugar after meals",
        "Acetic acid may slow stomach emptying and inhibit sugar-digesting enzymes in the gut.",
        "Small trials found a tablespoon or two of vinegar with a meal modestly lowers the rise in blood sugar afterward.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving limescale",
        "Acid meets carbonate.",
        [
          ["Proton transfer", "Acetic acid donates protons to carbonate in the scale."],
          ["Carbonic acid", "Carbonic acid forms and breaks down into water and carbon dioxide (the fizz)."],
          ["Soluble salt", "Calcium is left as dissolved calcium acetate."],
        ],
        "Soaking a showerhead in vinegar overnight uses exactly this reaction.",
        "CaCO3 + 2 CH3COOH → Ca(CH3COO)2 + H2O + CO2",
      ),
      rxn(
        "Acetic fermentation",
        "How wine becomes vinegar.",
        [
          ["Bacteria", "Acetobacter bacteria live at the surface of alcoholic liquids, where there's oxygen."],
          ["Oxidation", "They oxidize ethanol to acetaldehyde, then to acetic acid."],
          ["Mother of vinegar", "A slimy cellulose mat of bacteria (the “mother”) forms on the surface."],
        ],
        "The French “vin aigre” means sour wine.",
        "C2H5OH + O2 → CH3COOH + H2O",
      ),
    ],
    hazards: [
      hz(
        "Concentrated acid is corrosive",
        "Household vinegar is safe; 20–30% horticultural vinegar is not.",
        "Concentrated acetic acid denatures proteins and burns tissue.",
        "Strong cleaning or weed-killing vinegars require gloves and eye protection.",
      ),
      hz(
        "Never mix with bleach",
        "Vinegar is an acid.",
        "Adding acid to bleach releases chlorine gas.",
        "Chlorine gas irritates and damages the lungs.",
      ),
    ],
    synthesis: [
      route(
        "Bacterial fermentation (vinegar)",
        "How food vinegar is made.",
        "Alcohol from fermented fruit, grain or rice is oxidized by Acetobacter bacteria in tanks with vigorous aeration until it reaches about 5% acetic acid.",
      ),
      route(
        "Methanol carbonylation (industrial acid)",
        "How most acetic acid for chemicals is made.",
        "Methanol and carbon monoxide react over a rhodium or iridium catalyst with an iodide promoter (the Monsanto and Cativa processes).",
        { equation: "CH3OH + CO → CH3COOH", significance: "Industrial acetic acid goes into vinyl acetate for paints and glues, and into PET plastic." },
      ),
    ],
  },

  "sodium-percarbonate": {
    overview: [
      "Sodium percarbonate is a crystal that holds hydrogen peroxide inside a sodium carbonate lattice, in a ratio of two Na₂CO₃ to three H₂O₂. It's essentially solid hydrogen peroxide: stable as a dry powder, but it separates into its two components as soon as it dissolves.",
      "That gives two cleaning agents in one scoop: hydrogen peroxide to oxidize stains and sodium carbonate to raise the pH and soften the water. It's the active ingredient in “oxygen bleach” boosters.",
    ],
    mechanisms: [
      mech(
        "Oxidizing stains",
        "Released hydrogen peroxide oxidizes the conjugated chromophores in colored stains, breaking their double-bond systems.",
        "Coffee, wine and grass stains lose their color without the harshness of chlorine bleach.",
        "established",
      ),
      mech(
        "Cold-water bleaching with an activator",
        "Detergents add TAED, which reacts with peroxide (perhydrolysis) to form peracetic acid, a stronger oxidizer at low temperature.",
        "Clothes can be bleached at 30–40 °C instead of 60 °C or more, saving energy.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving",
        "The crystal comes apart in water.",
        [
          ["Water", "Water molecules break up the crystal lattice."],
          ["Release", "Hydrogen peroxide and sodium carbonate dissolve separately."],
          ["Activation", "The carbonate raises the pH, which helps the peroxide react with stains."],
        ],
        "Oxygen bleach works best in warm water, or with an activator in cool water.",
        "2 Na2CO3·3 H2O2 → 2 Na2CO3 + 3 H2O2",
      ),
      rxn(
        "Perhydrolysis with TAED",
        "Making a stronger bleach on the spot.",
        [
          ["Attack", "Perhydroxyl ions (HOO⁻) from peroxide attack TAED's acetyl groups."],
          ["Transfer", "Acetyl groups transfer to the peroxide."],
          ["Product", "Peracetic acid forms, which bleaches effectively at low temperatures."],
        ],
        "This is why many European detergents clean well at low wash temperatures.",
      ),
    ],
    hazards: [
      hz(
        "Serious eye damage",
        "The dry powder is the main hazard.",
        "Peroxide plus high pH damages the surface of the eye.",
        "Keep powder away from eyes and children; rinse immediately if exposed.",
      ),
      hz(
        "Oxidizer",
        "Store away from heat and flammable materials.",
        "It releases oxygen as it decomposes.",
        "Oxygen can intensify a fire, so the powder shouldn't be stored near fuels.",
      ),
    ],
    synthesis: [
      route(
        "Crystallization",
        "Made by combining two common chemicals.",
        "Sodium carbonate solution is crystallized with hydrogen peroxide, then the crystals are coated (for example with sodium sulfate) to improve storage stability.",
        { equation: "2 Na2CO3 + 3 H2O2 → 2 Na2CO3·3 H2O2" },
      ),
    ],
  },

  "sodium-dodecylbenzenesulfonate": {
    overview: [
      "Sodium dodecylbenzenesulfonate is the most-used member of the linear alkylbenzene sulfonates (LAS), the world's workhorse detergent surfactants. It has a straight 12-carbon chain attached to a benzene ring that carries a negatively charged sulfonate group (–SO₃⁻).",
      "The straight chain matters. Early detergents used branched chains that bacteria couldn't break down, causing mountains of foam on rivers in the 1950s and 60s. Switching to linear chains, which microbes digest from the end, made LAS readily biodegradable.",
    ],
    mechanisms: [
      mech(
        "Detergency",
        "LAS adsorbs onto fabric and oily soil, lowering interfacial tension so oil rolls up into droplets and lifts off into micelles.",
        "Greasy stains wash out of clothes, and the negative charges keep removed soil from settling back on fabric.",
        "established",
      ),
      mech(
        "Biodegradation",
        "Bacteria oxidize the end of the straight chain, then shorten it two carbons at a time by beta-oxidation, the same pathway that breaks down fats, before opening the ring.",
        "Most LAS is removed in wastewater treatment within days, protecting rivers.",
        "established",
      ),
      mech(
        "Skin and eye irritation",
        "Like other anionic surfactants, LAS extracts lipids and binds proteins at the skin surface.",
        "Undiluted detergent can redden skin and seriously irritate eyes.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Sulfonation",
        "Attaching a charged head to an oily tail.",
        [
          ["Electrophile", "Sulfur trioxide is a powerful electrophile."],
          ["Substitution", "It attacks the benzene ring of linear alkylbenzene, swapping a hydrogen for a –SO₃H group (electrophilic aromatic substitution)."],
          ["Neutralization", "Sodium hydroxide converts the sulfonic acid into its sodium salt."],
        ],
        "Electrophilic aromatic substitution is one of the main reactions of benzene rings.",
        "C12H25C6H5 + SO3 → C12H25C6H4SO3H",
      ),
    ],
    hazards: [
      hz(
        "Eye damage from concentrated detergent",
        "Especially a risk with liquid detergent pods.",
        "Concentrated surfactant disrupts corneal cells.",
        "Eye exposure needs prolonged rinsing; detergent pods should be kept away from young children.",
      ),
      hz(
        "Harm to aquatic life before treatment",
        "Wastewater treatment removes most of it.",
        "Surfactants disrupt the gill membranes of fish and invertebrates.",
        "Untreated discharges can harm aquatic life, which is why biodegradability is legally required for detergents in the EU.",
      ),
    ],
    synthesis: [
      route(
        "From petroleum",
        "Built in two main steps.",
        "Benzene is alkylated with linear C10–C14 olefins to make linear alkylbenzene, which is sulfonated with sulfur trioxide and neutralized with sodium hydroxide.",
        { significance: "In 1965 the U.S. detergent industry switched from branched to linear surfactants to end the foam problem on rivers." },
      ),
    ],
  },

  protease: {
    overview: [
      "Proteases are enzymes that cut proteins. The ones in laundry detergents are mostly subtilisins, made by Bacillus bacteria: folded protein molecules whose active site holds a precisely arranged trio of amino acids (serine, histidine and aspartate) called the catalytic triad.",
      "Each enzyme molecule can cut thousands of peptide bonds per minute without being used up, breaking protein stains like blood, egg and grass into small fragments that wash away, even in cold water.",
    ],
    mechanisms: [
      mech(
        "The catalytic triad",
        "Aspartate and histidine together pull a proton from serine, turning serine's oxygen into a powerful nucleophile that attacks the carbonyl carbon of a peptide bond.",
        "Protein stains are cut into short, water-soluble peptides at mild temperatures, so clothes come clean without hot water.",
        "established",
      ),
      mech(
        "Engineered to survive bleach",
        "Replacing an easily oxidized methionine near the active site with a different amino acid makes subtilisin resistant to oxidation.",
        "The enzyme keeps working in detergents that also contain oxygen bleach, an early success of protein engineering.",
        "established",
      ),
      mech(
        "Respiratory allergy",
        "Inhaled enzyme dust is recognized by the immune system as a foreign protein.",
        "People can develop IgE-mediated allergy and asthma, which is why enzymes are sold encapsulated or in liquids, not as loose dust.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Peptide-bond hydrolysis",
        "How subtilisin cuts a protein, step by step.",
        [
          ["Acylation", "Activated serine attacks the peptide bond's carbonyl carbon, forming a tetrahedral intermediate."],
          ["Cleavage", "The bond breaks; one fragment leaves while the other stays attached to serine (the acyl-enzyme)."],
          ["Deacylation", "A water molecule, activated by histidine, attacks the acyl-enzyme."],
          ["Reset", "The second fragment is released and the enzyme is ready for the next bond."],
        ],
        "Enzymes are catalysts: they speed reactions enormously and come out unchanged.",
        "R-CO-NH-R' + H2O → R-COOH + H2N-R'",
      ),
    ],
    hazards: [
      hz(
        "Respiratory sensitization",
        "Mainly a workplace hazard for detergent manufacturers.",
        "Airborne enzyme protein triggers antibody production in the lungs.",
        "Allergy and asthma symptoms in exposed workers led the industry to encapsulate enzymes and monitor air levels.",
      ),
    ],
    synthesis: [
      route(
        "Fermentation",
        "Bacteria make detergent enzymes.",
        "Engineered Bacillus strains grow in large fermenters and secrete protease into the broth. The enzyme is recovered, concentrated, and encapsulated in granules or stabilized in liquid.",
        { significance: "Otto Röhm made the first enzyme detergent in 1913 using enzymes from animal pancreas; bacterial enzymes took over in the 1960s." },
      ),
    ],
  },
};
