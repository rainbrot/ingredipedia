import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const FOOD_DEEP_3: Record<string, DeepProfile> = {
  "xanthan-gum": {
    overview: [
      "Xanthan gum is a polysaccharide: a long, cellulose-like backbone of glucose units with a three-sugar side chain (mannose, glucuronic acid, mannose) on every second glucose. Many side chains carry acetyl and pyruvate groups, and the glucuronic acid carries a negative charge.",
      "In water, the side chains wrap around the backbone and stiffen it into a rod-like helix. Rigid rods tangle and trap water, so less than 1% xanthan can turn a thin liquid into a thick, pourable sauce, and it works whether the liquid is hot, cold, salty or acidic.",
    ],
    mechanisms: [
      mech(
        "Shear thinning",
        "Under stirring, squeezing or chewing, the rod-like chains align with the flow and slide past each other, so viscosity drops; at rest they tangle again.",
        "That's why a dressing pours easily from the bottle but clings to lettuce, and why toothpaste stays on the brush. In the mouth, the sauce feels smooth rather than gummy.",
        "established",
      ),
      mech(
        "Helping people swallow safely",
        "Thickened liquids flow more slowly and hold together as one cohesive mouthful.",
        "Speech therapists thicken drinks with xanthan for people with dysphagia (difficulty swallowing), which lowers the risk of liquid slipping into the airway.",
        "human",
      ),
      mech(
        "A fermentable fiber",
        "Human digestive enzymes can't break xanthan's β-glycosidic bonds, but some colon bacteria can.",
        "It adds bulk and is partly fermented into short-chain fatty acids. Large amounts (above about 15 g a day) act as a laxative.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Gelling with locust bean gum",
        "Two gums that don't gel alone form an elastic gel together.",
        [
          ["Helix", "Xanthan forms stiff helices in solution."],
          ["Binding", "Smooth, unbranched regions of locust bean gum's galactomannan chains bind along the xanthan helices."],
          ["Network", "These junction zones link many chains into an elastic, three-dimensional gel."],
        ],
        "This synergy is used in some desserts, pet foods and gluten-free products.",
      ),
      rxn(
        "Precipitation with alcohol (purification)",
        "Changing the solvent pulls xanthan out of the fermentation broth.",
        [
          ["Pasteurize", "The broth is heated to kill the bacteria."],
          ["Lower polarity", "Isopropyl alcohol is added, making the liquid less able to hydrate the gum."],
          ["Aggregate", "Xanthan chains lose their water shells, clump into fibers, and are filtered, dried and milled."],
        ],
        "The alcohol is recovered and reused; finished xanthan contains only trace residues.",
      ),
    ],
    hazards: [
      hz(
        "Not for premature infants",
        "Safe for older children and adults, but avoided in preemies.",
        "Gut bacteria ferment xanthan, producing gas and acids.",
        "FDA warned in 2011 after cases of necrotizing enterocolitis (a serious bowel condition) in premature babies fed a xanthan-based thickener.",
      ),
      hz(
        "Digestive effects at high doses",
        "Typical food amounts are tiny.",
        "Undigested gum holds water and is fermented in the colon.",
        "Very large amounts cause bloating, gas and loose stools.",
      ),
    ],
    synthesis: [
      route(
        "Bacterial fermentation",
        "A plant bacterium makes xanthan as protective slime.",
        "Xanthomonas campestris is grown in a sugar solution and secretes xanthan around its cells. After fermentation, the broth is pasteurized, the gum is precipitated with isopropyl alcohol, then dried and milled into powder.",
        { significance: "The same bacterium causes black rot on cabbage; its slime helps it cling to leaves." },
      ),
    ],
  },

  "soy-lecithin": {
    overview: [
      "Lecithin is a mixture of phospholipids, chiefly phosphatidylcholine. Each phospholipid has a glycerol backbone carrying two fatty-acid tails, which repel water, and a phosphate group linked to a small charged molecule such as choline, which loves water.",
      "That two-faced (amphiphilic) structure is the same design as the phospholipids in every cell membrane. It lets lecithin sit at the boundary between oil and water and hold the two together.",
    ],
    mechanisms: [
      mech(
        "Emulsifying oil and water",
        "Lecithin molecules line up at oil–water boundaries with their tails in the oil and their heads in the water, lowering the tension between the two and coating each droplet.",
        "Coated droplets repel one another instead of merging, so dressings, margarine and chocolate stay smooth; on the tongue the product melts and spreads evenly.",
        "established",
      ),
      mech(
        "A source of choline",
        "Digestive enzymes break phosphatidylcholine apart, releasing choline.",
        "Choline is needed to build cell membranes and to make the neurotransmitter acetylcholine; eggs and soy are major dietary sources.",
        "established",
      ),
      mech(
        "Helping absorb dietary fat",
        "Pancreatic phospholipase A2 removes one fatty acid, forming lysophosphatidylcholine, an even stronger emulsifier.",
        "It helps form the tiny micelles that carry fats and fat-soluble vitamins (A, D, E, K) into intestinal cells.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Forming an emulsion",
        "Lecithin stabilizes droplets of one liquid inside another.",
        [
          ["Orientation", "Molecules migrate to the oil–water boundary, tails into oil, heads into water."],
          ["Coating", "A single layer of lecithin wraps each droplet."],
          ["Stabilizing", "Charged heads make droplets repel each other, preventing them from merging."],
        ],
        "Mayonnaise works the same way using lecithin from egg yolk.",
      ),
      rxn(
        "Enzymatic modification",
        "Food technologists can tune lecithin with enzymes.",
        [
          ["Hydrolysis", "Phospholipase enzymes cut one fatty acid from each phospholipid."],
          ["Product", "The result, lysolecithin, has one tail instead of two."],
          ["Effect", "With a smaller tail, it prefers oil-in-water emulsions and works better in baked goods."],
        ],
        "Changing a molecule's shape changes which kind of emulsion it stabilizes.",
      ),
    ],
    hazards: [
      hz(
        "Trace soy protein",
        "Matters only for highly sensitive soy-allergic people.",
        "Refining removes most soy protein, but traces can remain.",
        "Most people with soy allergy tolerate lecithin; U.S. labels still declare it as soy.",
      ),
    ],
    synthesis: [
      route(
        "Degumming soybean oil",
        "Lecithin is a byproduct of making clear cooking oil.",
        "Crude soybean oil is mixed with a little water. The phospholipids absorb water, swell into a sticky gum and separate from the oil. Centrifuges spin out the gum, which is dried into lecithin.",
        { significance: "Removing the gums keeps the oil from turning cloudy, and the gums become a useful product." },
      ),
      route(
        "Biological synthesis",
        "Every plant and animal cell makes phosphatidylcholine.",
        "In the Kennedy pathway, choline is phosphorylated, activated as CDP-choline, then attached to a diacylglycerol molecule to form phosphatidylcholine.",
        { significance: "Lecithin was first isolated from egg yolk in the 1840s; its name comes from the Greek lekithos, meaning yolk." },
      ),
    ],
  },

  "sodium-bicarbonate": {
    overview: [
      "Sodium bicarbonate (NaHCO₃) is made of sodium ions and bicarbonate ions (HCO₃⁻). Bicarbonate is amphoteric: it can accept a proton to become carbonic acid or give one up to become carbonate, so it neutralizes acids and resists strong bases.",
      "When bicarbonate meets an acid, it releases carbon dioxide gas, the bubbles that make pancakes and cakes rise. The very same bicarbonate ion is the main pH buffer in your blood.",
    ],
    mechanisms: [
      mech(
        "Buffering blood pH",
        "In blood, the enzyme carbonic anhydrase rapidly converts CO₂ and water into carbonic acid, which splits into H⁺ and HCO₃⁻, and back again.",
        "Lungs adjust how much CO₂ you exhale and kidneys adjust bicarbonate, keeping blood pH between 7.35 and 7.45. Doctors give intravenous bicarbonate to correct severe acidosis.",
        "established",
      ),
      mech(
        "Antacid",
        "Bicarbonate neutralizes hydrochloric acid in the stomach, producing salt, water and carbon dioxide.",
        "Heartburn eases within minutes; the released CO₂ is why people often burp afterward.",
        "established",
      ),
      mech(
        "Neutralizing odors",
        "Many unpleasant smells are acids (such as butyric acid in sour milk); bicarbonate converts them into non-volatile salts.",
        "Molecules that can't evaporate can't reach the smell receptors in your nose, so the odor fades.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Leavening with acid",
        "Acid plus baking soda makes gas bubbles.",
        [
          ["Proton transfer", "An acid in the batter (buttermilk, yogurt, or the acid salt in baking powder) donates H⁺ to bicarbonate."],
          ["Carbonic acid", "Bicarbonate becomes carbonic acid, which is unstable."],
          ["Gas", "Carbonic acid breaks into water and carbon dioxide, which inflates bubbles that expand further in the oven's heat."],
        ],
        "Baking powder packages baking soda with a dry acid, so it only needs water and heat to work.",
        "NaHCO3 + H+ → Na+ + H2O + CO2",
      ),
      rxn(
        "Thermal decomposition",
        "Heat alone breaks baking soda down.",
        [
          ["Heating", "Above about 80 °C, bicarbonate ions begin to react with each other."],
          ["Release", "Pairs of bicarbonate ions form carbonate, water and carbon dioxide."],
          ["Residue", "Sodium carbonate is left behind."],
        ],
        "Too much baking soda without enough acid leaves sodium carbonate, which tastes soapy and bitter.",
        "2 NaHCO3 → Na2CO3 + H2O + CO2",
      ),
    ],
    hazards: [
      hz(
        "Large ingestions",
        "A risk when people overuse it as a home antacid.",
        "Excess bicarbonate overwhelms the body's buffering, raising blood pH (metabolic alkalosis) and sodium levels.",
        "Symptoms include muscle twitching and confusion. Rapid CO₂ release after a large meal has, rarely, ruptured the stomach.",
      ),
    ],
    synthesis: [
      route(
        "The Solvay process",
        "Made from salt, limestone and ammonia.",
        "Brine is saturated with ammonia, then carbon dioxide is bubbled through. Sodium bicarbonate, the least soluble product, crystallizes out and is filtered off; the ammonia is recovered and reused.",
        { equation: "NaCl + NH3 + CO2 + H2O → NaHCO3 + NH4Cl", significance: "Ernest Solvay's 1860s process made soda chemicals cheap enough for everyday use." },
      ),
      route(
        "From trona ore",
        "Much U.S. baking soda starts as a mineral.",
        "Trona, mined in Wyoming's Green River Basin, is refined into sodium carbonate, which is then dissolved and reacted with carbon dioxide to form sodium bicarbonate.",
        { equation: "Na2CO3 + CO2 + H2O → 2 NaHCO3" },
      ),
    ],
  },

  carrageenan: {
    overview: [
      "Carrageenans are long chains of galactose sugars with sulfate groups attached, extracted from red seaweeds. The three main types differ in how many sulfates they carry: kappa (one per repeating unit), iota (two) and lambda (three).",
      "Sulfate groups are negatively charged, so carrageenan chains repel each other and attract positive ions. Kappa and iota chains twist into double helices that link into gels when the right ions are present, while heavily sulfated lambda stays liquid and simply thickens.",
    ],
    mechanisms: [
      mech(
        "Ion-triggered gelling",
        "Kappa-carrageenan helices bind potassium ions, which bridge neighboring helices into aggregates; iota helices are bridged more loosely by calcium ions.",
        "Kappa makes firm, brittle gels (deli meats, pet food); iota makes soft, elastic gels (puddings); lambda adds creaminess to drinks without gelling.",
        "established",
      ),
      mech(
        "Stabilizing milk",
        "Negatively charged carrageenan binds positively charged patches on casein protein particles in milk.",
        "Even 0.02% keeps cocoa suspended in chocolate milk and stops plant milks from separating.",
        "established",
      ),
      mech(
        "The gut inflammation debate",
        "In some cell and animal studies, carrageenan activated the TLR4 receptor and the NF-κB inflammation pathway.",
        "Other studies and regulatory reviews found no harm at food-grade molecular weights; EFSA asked for more data in 2018.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Setting a gel",
        "Carrageenan gels form on cooling and melt on heating.",
        [
          ["Dissolving", "In hot water, chains move freely as random coils."],
          ["Helix formation", "On cooling, pairs of chains twist into double helices."],
          ["Bridging", "Potassium or calcium ions link helices into a network that traps water."],
        ],
        "Because the process reverses with heat, carrageenan gels are thermoreversible.",
      ),
      rxn(
        "Acid degradation",
        "Strong acid and heat break carrageenan into small pieces.",
        [
          ["Hydrolysis", "Hot acid splits the glycosidic bonds between sugar units."],
          ["Shortening", "Chains break into ever-smaller fragments."],
          ["Poligeenan", "Below about 20,000 daltons, the fragments are called poligeenan, a different substance not permitted in food."],
        ],
        "This is why food-grade carrageenan must meet a minimum molecular weight.",
      ),
    ],
    hazards: [
      hz(
        "Possible gut irritation",
        "Evidence is mixed; most reviews consider food-grade carrageenan safe.",
        "Some studies suggest carrageenan can interact with immune receptors in the gut lining.",
        "A few people with inflammatory bowel disease report fewer symptoms on carrageenan-free diets; controlled evidence is limited.",
      ),
    ],
    synthesis: [
      route(
        "Alkaline extraction from seaweed",
        "Farmed red seaweeds are the source.",
        "Seaweed is washed and cooked in hot alkali, which converts some sugar units into 3,6-anhydrogalactose, strengthening the gel. The extract is filtered, then carrageenan is precipitated with alcohol or potassium chloride, dried and milled.",
        { significance: "Seaweed farming for carrageenan supports coastal communities in the Philippines and Indonesia." },
      ),
    ],
  },

  tocopherol: {
    overview: [
      "Vitamin E is a family of eight related molecules; the most biologically active is alpha-tocopherol. Each has a chromanol ring (a phenol fused to an oxygen-containing ring) attached to a long, oily 16-carbon tail.",
      "The tail anchors the molecule inside fatty cell membranes, while the ring's –OH group sits near the membrane surface, ready to donate a hydrogen atom and stop chain reactions that would otherwise damage membrane fats.",
    ],
    mechanisms: [
      mech(
        "Chain-breaking antioxidant",
        "Tocopherol donates the hydrogen atom of its phenolic –OH to a lipid peroxyl radical, turning it into a stable hydroperoxide. The tocopheroxyl radical left behind is stabilized by its aromatic ring and doesn't continue the chain.",
        "Polyunsaturated fats in cell membranes, especially in nerves and red blood cells, are protected from oxidation. Severe deficiency causes nerve damage.",
        "established",
      ),
      mech(
        "Recycled by vitamin C",
        "At the membrane surface, ascorbate reduces the tocopheroxyl radical back to active tocopherol.",
        "The two vitamins work as a team: vitamin E in fats, vitamin C in water.",
        "established",
      ),
      mech(
        "Protecting oils and skin",
        "Added to oils and creams, tocopherol intercepts radicals created when light and oxygen attack fatty acids.",
        "Products stay fresh longer. On skin it supports the barrier's natural antioxidant defenses, though controlled trials show it doesn't fade scars.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Stopping a radical chain reaction",
        "Fats go rancid through a chain reaction that tocopherol interrupts.",
        [
          ["Initiation", "Light, heat or a metal ion pulls a hydrogen atom off a fatty acid, creating a lipid radical (L•)."],
          ["Propagation", "Oxygen adds to it, forming a peroxyl radical (LOO•) that steals a hydrogen from the next fatty acid, and the chain continues."],
          ["Termination", "Tocopherol donates its hydrogen to LOO•, ending the chain with a stable product."],
        ],
        "One tocopherol molecule can stop a chain that would otherwise damage many fatty acids.",
        "LOO• + TOH → LOOH + TO•",
      ),
      rxn(
        "Being used up",
        "Antioxidants are sacrificial.",
        [
          ["First oxidation", "Tocopherol becomes the tocopheroxyl radical."],
          ["Second oxidation", "Without vitamin C to recycle it, the radical reacts further."],
          ["End product", "It ends as tocopherylquinone, which no longer protects."],
        ],
        "Oils eventually go rancid once their tocopherol is consumed.",
      ),
    ],
    hazards: [
      hz(
        "Bleeding risk at high supplement doses",
        "Not a concern at food or cosmetic levels.",
        "High doses and a quinone metabolite can interfere with vitamin K-dependent clotting.",
        "This raises bleeding risk, especially for people taking blood thinners.",
      ),
      hz(
        "Prostate cancer risk with supplements",
        "Found in a large randomized trial of supplements.",
        "The mechanism is unclear.",
        "In the SELECT trial, men taking 400 IU of vitamin E daily had about a 17% higher risk of prostate cancer.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis in plants",
        "Only photosynthetic organisms make vitamin E.",
        "Plants join homogentisic acid, made from the amino acid tyrosine, to a phytyl chain related to chlorophyll's tail. Ring closure and methylation steps produce the different tocopherols.",
      ),
      route(
        "Extraction from vegetable oil",
        "Natural vitamin E comes from oil refining.",
        "When soybean oil is deodorized with steam, tocopherols concentrate in the distillate. Molecular distillation then purifies them into “mixed tocopherols”.",
      ),
      route(
        "Chemical synthesis",
        "Synthetic vitamin E is made from two building blocks.",
        "Trimethylhydroquinone is condensed with isophytol using an acid catalyst, forming the chromanol ring and attaching the tail in one step.",
        {
          significance:
            "Synthetic all-rac-alpha-tocopherol is a mix of eight stereoisomers, and only half of them are counted as active, so it is about half as potent per milligram as natural vitamin E.",
        },
      ),
    ],
  },

  "natural-flavors": {
    overview: [
      "“Natural flavors” isn't one substance; it's a legal category. In the U.S., a natural flavor is any flavoring derived from a plant, animal or microbial source by extraction, distillation, roasting, heating or fermentation, whose main purpose is flavor rather than nutrition.",
      "A single natural flavor can contain dozens of aroma molecules (esters, aldehydes, terpenes and more) plus carriers such as ethanol or propylene glycol. Formulas are trade secrets, so they appear on labels as just two words.",
    ],
    mechanisms: [
      mech(
        "Smell does most of the work",
        "Volatile aroma molecules travel from the mouth up the back of the throat to the nose (retronasal smell) and bind some of the roughly 400 types of olfactory receptors.",
        "The brain merges these signals with taste from the tongue into what we call flavor, which is why food tastes bland when you have a cold.",
        "established",
      ),
      mech(
        "Molecules, not sources",
        "A natural strawberry flavor may contain furaneol, ethyl butyrate and other molecules found in strawberries, but they can come from other natural sources.",
        "Olfactory receptors can't detect a molecule's origin; identical molecules smell identical whether they came from a fruit, a fermentation tank or a lab.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Steam distillation",
        "Aroma molecules are separated by their volatility.",
        [
          ["Heating", "Steam passes through plant material, such as peel, leaves or seeds."],
          ["Carrying", "Volatile aroma molecules evaporate along with the steam at temperatures below their own boiling points."],
          ["Separating", "The vapor is condensed; oily aroma compounds separate from the water as an essential oil."],
        ],
        "This is how mint, citrus and many spice flavors are captured.",
      ),
      rxn(
        "Fermentation to natural vanillin",
        "Microbes can make “natural” flavor molecules.",
        [
          ["Feedstock", "Ferulic acid, a compound in rice bran, is the starting material."],
          ["Bioconversion", "Selected bacteria shorten its side chain through enzyme steps."],
          ["Product", "The result is vanillin, the main flavor molecule of vanilla."],
        ],
        "Because a microbe made it from a natural source, it can legally be called natural, even though it's the same molecule as synthetic vanillin.",
      ),
    ],
    hazards: [
      hz(
        "Undisclosed components",
        "Generally safe, but you can't see what's inside.",
        "Flavor blends can contain many substances and carriers that aren't individually listed.",
        "People with rare sensitivities can't identify a trigger; by law, major allergens must still be declared.",
      ),
    ],
    synthesis: [
      route(
        "Extraction, distillation and fermentation",
        "Flavor houses build natural flavors from many natural sources.",
        "Raw materials are extracted with solvents or CO₂, distilled, or fermented to isolate flavor fractions. Flavorists then blend dozens of components with carriers into a proprietary formula.",
        { significance: "The flavor industry's own expert panel (FEMA) reviews most flavor substances, which critics say gives FDA limited oversight." },
      ),
    ],
  },

  "artificial-flavors": {
    overview: [
      "Artificial flavors are flavor molecules made by chemical synthesis rather than taken from a natural source. Many are identical to molecules found in nature, such as vanillin, benzaldehyde (almond) or ethyl butyrate (pineapple); others don't occur naturally but are evaluated as safe at the tiny amounts used.",
      "Because they're made in a controlled way, synthetic flavors are consistent, affordable and don't depend on harvests. A single flavor blend may combine dozens of them.",
    ],
    mechanisms: [
      mech(
        "Esters: fruit in a molecule",
        "Small esters are volatile, and their size and shape determine which olfactory receptors they activate.",
        "Isoamyl acetate smells like banana and ethyl butyrate like pineapple; blends of esters create more complex fruit impressions.",
        "established",
      ),
      mech(
        "Same receptors as natural flavors",
        "Synthetic flavor molecules bind the same olfactory receptors as their natural twins.",
        "A molecule of synthetic vanillin and one from a vanilla bean are indistinguishable to your nose and your body.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Fischer esterification",
        "Fruity esters are made by joining an acid and an alcohol.",
        [
          ["Activation", "An acid catalyst adds a proton to the carboxylic acid's carbonyl oxygen."],
          ["Attack", "The alcohol's oxygen attacks the now electron-poor carbonyl carbon."],
          ["Elimination", "After proton shuffles, a water molecule leaves and the ester forms."],
        ],
        "Butyric acid smells like rancid butter, but its ethyl ester smells like pineapple: small structural changes transform smell.",
        "CH3CH2CH2COOH + C2H5OH → CH3CH2CH2COOC2H5 + H2O",
      ),
      rxn(
        "Making vanillin from guaiacol",
        "Most of the world's vanillin is synthetic.",
        [
          ["Condensation", "Guaiacol reacts with glyoxylic acid, adding a two-carbon side chain to the ring."],
          ["Oxidation", "The side chain is oxidized."],
          ["Decarboxylation", "Losing CO₂ leaves the aldehyde group of vanillin."],
        ],
        "Vanilla beans can't come close to meeting world demand, so synthetic vanillin flavors most vanilla foods.",
      ),
    ],
    hazards: [
      hz(
        "Undisclosed blends",
        "Individual substances are evaluated, but the mixture isn't listed.",
        "A flavor can contain many synthetic substances under one label term.",
        "Consumers can't tell which molecules they're eating; regulators removed seven synthetic flavors from the permitted list in 2018 after cancer findings in animal studies at high doses.",
      ),
    ],
    synthesis: [
      route(
        "Chemical synthesis",
        "Built from petrochemical or plant-derived feedstocks.",
        "Each target flavor molecule is synthesized through standard reactions such as esterification and oxidation, purified to food grade, and blended by flavorists.",
        { significance: "Ferdinand Tiemann and Wilhelm Haarmann synthesized vanillin in 1874, launching the synthetic flavor industry." },
      ),
    ],
  },

  "titanium-dioxide": {
    overview: [
      "Titanium dioxide (TiO₂) is a mineral of titanium and oxygen locked in a rigid crystal lattice; its common forms are rutile and anatase. Its refractive index (about 2.6 for rutile) is one of the highest of any common substance, so it bends and scatters light extremely strongly, making it intensely white and opaque.",
      "It is also a semiconductor. Ultraviolet light carries enough energy to push its electrons across the band gap, which lets TiO₂ absorb UV radiation (useful in sunscreen) but can also generate reactive oxygen species, which is why cosmetic grades are coated.",
    ],
    mechanisms: [
      mech(
        "Scattering light into whiteness",
        "Particles about 200–300 nm across, roughly half the wavelength of visible light, scatter all visible colors efficiently because of TiO₂'s high refractive index.",
        "Our eyes see even scattering of every color as brilliant white, which is why TiO₂ whitens paint, toothpaste and candy coatings.",
        "established",
      ),
      mech(
        "Blocking UV in sunscreen",
        "Photons with more energy than TiO₂'s band gap (about 3.0–3.2 eV, wavelengths shorter than roughly 400 nm) are absorbed. Nano-sized particles scatter less visible light, so they look clear on skin.",
        "Less UV reaches skin cells, reducing sunburn and the DNA damage that can lead to skin cancer.",
        "established",
      ),
      mech(
        "Nanoparticles in food",
        "Food-grade E171 contains a fraction of particles under 100 nm, small enough to cross the gut lining in tiny amounts.",
        "Animal studies found particles accumulating in some tissues, and in 2021 EFSA could not rule out DNA damage, so the EU banned TiO₂ as a food additive.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Photocatalysis",
        "Light turns TiO₂ into a radical generator.",
        [
          ["Excitation", "A UV photon promotes an electron to the conduction band, leaving a positive hole behind."],
          ["Radicals", "The hole oxidizes water into hydroxyl radicals (•OH); the electron reduces oxygen into superoxide."],
          ["Oxidation", "These radicals break down organic molecules on the surface."],
        ],
        "This powers self-cleaning glass. Coating cosmetic TiO₂ with silica or alumina switches it off on your skin.",
        "TiO2 + hν → e- + h+",
      ),
      rxn(
        "The chloride process",
        "Ore is purified by turning it into a gas and back.",
        [
          ["Chlorination", "Rutile ore reacts with chlorine and coke at high temperature, forming titanium tetrachloride gas."],
          ["Purification", "TiCl₄ is distilled to remove iron and other impurities."],
          ["Oxidation", "Burning TiCl₄ in oxygen produces pure TiO₂ and releases chlorine to reuse."],
        ],
        "Recycling the chlorine makes the process efficient and the product very pure.",
        "TiCl4 + O2 → TiO2 + 2 Cl2",
      ),
    ],
    hazards: [
      hz(
        "Food additive concerns (EU ban)",
        "Banned in EU food since 2022; still permitted in U.S. food at up to 1%.",
        "Nanoscale particles can cross the gut wall and generate reactive oxygen species.",
        "EFSA couldn't establish a safe level because genotoxicity couldn't be ruled out, although no human harm has been demonstrated.",
      ),
      hz(
        "Inhaled powder",
        "Relevant to loose powders and sprays, not lotions.",
        "Fine particles inhaled deep into the lungs are cleared slowly.",
        "Long-term high exposure caused lung tumors in rats, so IARC classifies inhaled TiO₂ as possibly carcinogenic (Group 2B).",
      ),
    ],
    synthesis: [
      route(
        "Chloride process",
        "The main route for high-purity pigment.",
        "Rutile ore is chlorinated with coke to titanium tetrachloride, which is distilled and burned in oxygen to pure TiO₂.",
        { equation: "TiO2 + 2 Cl2 + C → TiCl4 + CO2" },
      ),
      route(
        "Sulfate process",
        "The older route, using ilmenite ore.",
        "Ilmenite (FeTiO₃) is digested in sulfuric acid. Iron is removed as iron sulfate, titanium is precipitated as a hydrate, and the solid is heated (calcined) to form TiO₂.",
        { significance: "TiO₂ replaced toxic lead white in paints during the 20th century." },
      ),
    ],
  },
};
