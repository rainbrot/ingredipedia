import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const FOOD_DEEP_2: Record<string, DeepProfile> = {
  aspartame: {
    overview: [
      "Aspartame is the methyl ester of a dipeptide: two amino acids, aspartic acid and phenylalanine, joined by a peptide bond, with a methyl group capping phenylalanine's carboxyl end. Each building block is an ordinary part of dietary protein.",
      "It is about 200 times sweeter than sugar, so tiny amounts replace a spoonful of sugar with almost no calories. The trade-off is fragility: heat, time and neutral pH break the molecule apart, so diet drinks slowly lose their sweetness and aspartame is rarely used for baking.",
    ],
    mechanisms: [
      mech(
        "Sweetness without the sugar",
        "Aspartame fits into a pocket of the T1R2/T1R3 sweet-taste receptor and binds far more tightly than sucrose, activating it at roughly 1/200th of the concentration.",
        "The brain receives the same “sweet” signal, while the calories (4 per gram, like any protein) come in such tiny amounts that they're negligible.",
        "established",
      ),
      mech(
        "Digested into familiar molecules",
        "Enzymes in the gut hydrolyze aspartame into aspartic acid, phenylalanine and a small amount of methanol.",
        "These are absorbed and handled exactly like the same molecules from food; a can of diet soda yields less methanol than a glass of tomato juice.",
        "established",
      ),
      mech(
        "Phenylalanine and PKU",
        "People with phenylketonuria (PKU) lack a working phenylalanine hydroxylase, the enzyme that converts phenylalanine into tyrosine.",
        "Phenylalanine builds up and can harm the developing brain, so aspartame products must carry a “Phenylketonurics: contains phenylalanine” warning.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrolysis during digestion",
        "Two bonds are broken by water and enzymes.",
        [
          ["Ester hydrolysis", "An esterase cuts the methyl ester, releasing methanol."],
          ["Peptide hydrolysis", "A peptidase cuts the peptide bond between the two amino acids."],
          ["Absorption", "Aspartic acid and phenylalanine join the body's normal amino-acid pool."],
        ],
        "Nothing unusual is left behind, which is why regulators evaluate aspartame's breakdown products alongside the sweetener itself.",
        "C14H18N2O5 + 2 H2O → C4H7NO4 + C9H11NO2 + CH3OH",
      ),
      rxn(
        "Cyclization (why diet drinks go flat in taste)",
        "Aspartame can attack itself and lose its sweetness.",
        [
          ["Internal attack", "The free amino group on the aspartic acid end attacks the ester carbonyl on the phenylalanine end."],
          ["Methanol leaves", "Methanol is expelled as the new bond forms."],
          ["Ring formation", "The product is a six-membered ring called a diketopiperazine, which isn't sweet."],
        ],
        "Heat and storage speed this up, so old diet sodas taste flat and aspartame isn't used in most baked goods.",
      ),
    ],
    hazards: [
      hz(
        "IARC “possibly carcinogenic” classification",
        "A hazard label based on limited evidence, not a measure of risk at normal intake.",
        "Proposed mechanisms from some studies include oxidative stress. Lifetime rodent studies from one research institute reported tumors, but other studies have not confirmed them.",
        "In 2023, IARC placed aspartame in Group 2B while JECFA, reviewing the same data, kept the acceptable daily intake at 40 mg/kg of body weight because no convincing harm was found at that level.",
      ),
      hz(
        "Danger for people with PKU",
        "Serious for the roughly 1 in 10,000–15,000 people born with phenylketonuria.",
        "Aspartame is about 50% phenylalanine by weight.",
        "Without the enzyme to process it, phenylalanine accumulates in the blood and brain, which is why the warning label is required.",
      ),
    ],
    synthesis: [
      route(
        "Chemical peptide coupling",
        "Chemists join the two amino acids while protecting the parts that shouldn't react.",
        "Aspartic acid's amino group is protected (for example as an N-formyl anhydride) and coupled with phenylalanine methyl ester, then the protecting group is removed. Conditions are tuned so the bond forms at aspartic acid's alpha carboxyl group; linking through the other carboxyl gives a bitter isomer.",
        { significance: "Small structural differences change taste completely: the wrong isomer is bitter, not sweet." },
      ),
      route(
        "Enzymatic coupling",
        "An enzyme builds the bond with perfect selectivity.",
        "The protease thermolysin, which normally cuts peptide bonds, is run in reverse under conditions that favor bond formation. It joins protected aspartic acid to phenylalanine methyl ester, reacting only at the correct carboxyl group and only with the L-forms of the amino acids.",
        { significance: "Enzymes give stereochemical control that is difficult to achieve with ordinary reagents." },
      ),
    ],
  },

  sucralose: {
    overview: [
      "Sucralose is sucrose with three of its hydroxyl (–OH) groups replaced by chlorine atoms, and one carbon of the glucose half flipped into its mirror-image configuration. Those changes make it about 600 times sweeter than sugar.",
      "The chlorine atoms also make the molecule unrecognizable to the enzyme that digests sucrose, so it passes through the body mostly unchanged and provides essentially no calories. Carbon–chlorine bonds are strong, so sucralose survives most cooking and even wastewater treatment.",
    ],
    mechanisms: [
      mech(
        "Intense sweetness",
        "The chlorine atoms change the molecule's shape and water-repelling character so it binds the T1R2/T1R3 sweet receptor much more tightly than sucrose.",
        "A few milligrams match the sweetness of a teaspoon of sugar.",
        "established",
      ),
      mech(
        "Passing through undigested",
        "Sucrase can't cleave sucralose's modified bond, and the chlorinated rings are poorly absorbed through the gut wall.",
        "About 85% is excreted unchanged in feces; most of the small absorbed fraction leaves in urine within a day.",
        "human",
      ),
      mech(
        "Possible effects on gut microbes",
        "Unabsorbed sucralose reaches the colon, where trillions of gut bacteria encounter it.",
        "Some studies report changes in gut bacteria and in blood-sugar responses after weeks of high intake; results differ between studies.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Selective chlorination (how it's made)",
        "Three specific –OH groups must be swapped for chlorine while the other five are left alone.",
        [
          ["Protection", "The 6-hydroxyl on the glucose ring is capped with an acetyl group so it won't react."],
          ["Chlorination", "A chlorinating reagent replaces the hydroxyls at the 4, 1' and 6' positions; at carbon 4 the substitution inverts the carbon's 3D arrangement."],
          ["Deprotection", "The acetyl cap is removed, and the product is crystallized."],
        ],
        "Selective protection is a core strategy in organic synthesis: block what you don't want to react.",
      ),
      rxn(
        "Breakdown at baking temperatures",
        "Very high heat can strip chlorine from the molecule.",
        [
          ["Heating", "Above about 120 °C, especially with fats or glycerol present, sucralose begins to decompose."],
          ["Dechlorination", "Hydrogen chloride is released from the molecule."],
          ["Byproducts", "The released chlorine can combine with glycerol to form chloropropanols."],
        ],
        "Germany's Federal Institute for Risk Assessment advises against baking with sucralose at high temperatures until more is known.",
      ),
    ],
    hazards: [
      hz(
        "Sucralose-6-acetate",
        "A manufacturing impurity and gut metabolite under investigation.",
        "A 2023 laboratory study reported that sucralose-6-acetate caused DNA strand breaks in cultured human cells.",
        "Whether this matters at real dietary exposures is unknown; it hasn't been confirmed in human studies.",
      ),
      hz(
        "Heating byproducts",
        "Relevant to high-temperature baking, not drinks or table use.",
        "Thermal decomposition releases chlorine that can form chloropropanols with glycerol or fats.",
        "Some chloropropanols are toxic to the kidneys in animal studies, so regulators are reviewing high-heat uses.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis from sucrose",
        "Ordinary table sugar is the starting material.",
        "Sucrose is selectively acetylated at the 6-position, chlorinated at three positions using a Vilsmeier-type reagent, then deacetylated and purified by crystallization.",
        { significance: "Its sweetness was found in 1976 when a researcher reportedly misheard “test this” as “taste this”." },
      ),
    ],
  },

  caffeine: {
    overview: [
      "Caffeine (1,3,7-trimethylxanthine) is a purine alkaloid: two fused nitrogen-containing rings, the same skeleton as the DNA bases adenine and guanine, decorated with three methyl groups. Plants make it as a natural pesticide that deters and poisons insects feeding on their leaves and seeds.",
      "Its shape closely mimics adenosine, a molecule your brain uses as a “sleep pressure” signal. That resemblance is the key to how caffeine keeps you awake.",
    ],
    mechanisms: [
      mech(
        "Blocking adenosine (the alertness effect)",
        "Caffeine fits into adenosine A1 and A2A receptors on neurons without activating them, acting as a competitive antagonist that keeps adenosine from binding.",
        "Adenosine builds up during waking hours and slows neural firing. Blocking it lets dopamine and glutamate signaling run higher, so you feel alert. Daily users grow extra adenosine receptors, which explains tolerance and withdrawal headaches.",
        "established",
      ),
      mech(
        "Tightening blood vessels",
        "Adenosine normally relaxes the muscle around blood vessels; with its receptors blocked, vessels in the brain and skin constrict.",
        "This is why caffeine is added to some headache medicines and why eye creams use it to temporarily reduce puffiness.",
        "human",
      ),
      mech(
        "Liver metabolism",
        "The liver enzyme CYP1A2 removes methyl groups, producing paraxanthine (about 80%), theobromine and theophylline.",
        "Caffeine's half-life is about 3–7 hours: longer in pregnancy and with some medications, shorter in smokers, whose CYP1A2 activity is increased.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Decaffeination with supercritical carbon dioxide",
        "A fluid that is neither liquid nor gas pulls caffeine out of coffee beans.",
        [
          ["Soaking", "Green coffee beans are moistened so caffeine can move out of the cells."],
          ["Supercritical CO₂", "Above 31 °C and 74 bar, carbon dioxide becomes a supercritical fluid that flows like a gas but dissolves molecules like a liquid."],
          ["Selective extraction", "Caffeine dissolves into the CO₂ while most flavor molecules stay in the beans."],
          ["Recovery", "The CO₂ passes through water or charcoal that traps the caffeine, then is recycled."],
        ],
        "The recovered caffeine is purified and sold to soft-drink and supplement makers.",
      ),
      rxn(
        "Demethylation in the liver",
        "Your liver dismantles caffeine one methyl group at a time.",
        [
          ["Oxidation", "CYP1A2 oxidizes a methyl group attached to nitrogen."],
          ["Removal", "The modified group leaves as formaldehyde, which is rapidly converted to formic acid and CO₂."],
          ["Products", "Paraxanthine, theobromine and theophylline, all mild stimulants, are further metabolized and excreted."],
        ],
        "This is why the effects of a cup of coffee fade over several hours rather than minutes.",
      ),
    ],
    hazards: [
      hz(
        "Caffeine toxicity",
        "Dangerous doses almost always come from pure powders or pills, not drinks.",
        "At very high blood levels, caffeine also inhibits phosphodiesterase enzymes and releases calcium from stores in muscle cells, overstimulating the heart and nerves.",
        "Symptoms include rapid heartbeat, arrhythmia, tremor and seizures. A teaspoon of pure caffeine powder can contain several grams, a potentially lethal amount.",
      ),
      hz(
        "Sleep disruption and dependence",
        "The most common downside for regular users.",
        "Caffeine keeps occupying adenosine receptors for hours after an afternoon drink.",
        "Sleep onset is delayed and deep sleep shortened; stopping suddenly causes withdrawal headaches and fatigue for a few days.",
      ),
      hz(
        "Pregnancy",
        "Intake guidance is lower during pregnancy.",
        "Caffeine crosses the placenta, and the fetus has very little CYP1A2 to break it down.",
        "Health agencies recommend no more than 200 mg a day during pregnancy.",
      ),
    ],
    synthesis: [
      route(
        "Biological synthesis in plants",
        "Coffee and tea plants build caffeine step by step.",
        "Starting from xanthosine, a nucleotide building block, N-methyltransferase enzymes add three methyl groups one at a time using the methyl donor S-adenosylmethionine, removing the sugar along the way: xanthosine → 7-methylxanthosine → 7-methylxanthine → theobromine → caffeine.",
        { significance: "Coffee and tea evolved their caffeine-making enzymes independently, a striking example of convergent evolution." },
      ),
      route(
        "Recovery and laboratory synthesis",
        "Commercial caffeine comes from decaffeination or chemical synthesis.",
        "Much food-grade caffeine is recovered from decaffeinating coffee and tea. It can also be built from dimethylurea and a malonic acid derivative by the Traube purine synthesis, which closes the two rings one after the other.",
        { significance: "Natural and synthetic caffeine are the same molecule; isotope analysis is the only way to tell them apart." },
      ),
    ],
  },

  "phosphoric-acid": {
    overview: [
      "Phosphoric acid (H₃PO₄) has a phosphorus atom at the center of a tetrahedron of four oxygens: one double-bonded oxygen and three –OH groups. Each –OH can release a proton, so it is a triprotic acid, strong enough to give colas a pH around 2.5 but much weaker than hydrochloric or sulfuric acid.",
      "Its conjugate bases, phosphate ions, are everywhere in biology: in the backbone of DNA, in ATP (the cell's energy currency), and in the calcium phosphate mineral that makes up bones and teeth.",
    ],
    mechanisms: [
      mech(
        "Sharp, tangy acidity",
        "Phosphoric acid's first proton (pKa 2.1) separates readily, delivering H⁺ ions that activate sour-taste cells.",
        "It gives colas a clean, sharp tang without fruity notes, and the low pH helps keep sodas microbiologically stable.",
        "established",
      ),
      mech(
        "Enamel erosion",
        "At pH 2–3, hydrogen ions react with hydroxyapatite, Ca₅(PO₄)₃OH, converting its phosphate and hydroxide into acid forms so calcium dissolves away.",
        "Frequent cola sipping softens enamel. Saliva's buffers and calcium can repair early damage between drinks.",
        "established",
      ),
      mech(
        "Bone mineral balance",
        "Phosphate and calcium are absorbed and stored together; high phosphate intake without enough calcium shifts parathyroid hormone signaling.",
        "In the Framingham Osteoporosis Study, women who drank cola daily had lower hip bone density, though part of the effect may come from cola replacing milk.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Rust conversion",
        "Phosphoric acid turns flaky rust into a hard protective layer.",
        [
          ["Dissolving", "Hydrogen ions attack iron oxide (rust) on the metal surface."],
          ["Precipitation", "Iron ions combine with phosphate to form insoluble iron phosphate."],
          ["Passivation", "The tight iron phosphate layer seals the surface so it can be painted."],
        ],
        "This is how “rust converter” products and some toilet cleaners work.",
        "2 H3PO4 + Fe2O3 → 2 FePO4 + 3 H2O",
      ),
      rxn(
        "Phosphate buffering",
        "Phosphates resist changes in pH.",
        [
          ["Stepwise ionization", "H₃PO₄ releases its protons one at a time, at pH values of about 2.1, 7.2 and 12.4."],
          ["Buffer pair", "Near pH 7.2, a mix of H₂PO₄⁻ and HPO₄²⁻ absorbs added acid or base."],
          ["Balance", "Added H⁺ is soaked up by HPO₄²⁻; added OH⁻ is neutralized by H₂PO₄⁻."],
        ],
        "The phosphate buffer is one of the main systems keeping the pH inside your cells stable.",
        "H3PO4 ⇌ H+ + H2PO4-",
      ),
    ],
    hazards: [
      hz(
        "Corrosive when concentrated",
        "The 75–85% acid sold to manufacturers is dangerous; a cola contains about 0.05%.",
        "Concentrated acid hydrolyzes and denatures proteins and dehydrates tissue on contact.",
        "It causes chemical burns to skin and eyes, which is why rust removers containing 10–30% call for gloves and goggles.",
      ),
      hz(
        "Dental erosion from frequent soft drinks",
        "A slow, cumulative effect of habitual sipping.",
        "Repeated exposure to pH 2–3 dissolves the mineral surface of enamel.",
        "Thinned enamel causes sensitivity and is more vulnerable to decay; it cannot regrow once lost.",
      ),
    ],
    synthesis: [
      route(
        "Wet process (fertilizer grade)",
        "Most phosphoric acid is made by dissolving phosphate rock in sulfuric acid.",
        "Ground phosphate rock (fluorapatite) is digested with sulfuric acid. Calcium precipitates as gypsum, which is filtered off, leaving impure phosphoric acid.",
        {
          equation: "Ca5(PO4)3F + 5 H2SO4 + 10 H2O → 3 H3PO4 + 5 CaSO4·2H2O + HF",
          significance: "This acid carries impurities such as fluoride and heavy metals, so it's used mainly for fertilizers.",
        },
      ),
      route(
        "Thermal process (food grade)",
        "Purer acid is made by burning elemental phosphorus.",
        "Phosphate rock is heated with coke and silica in an electric furnace, releasing phosphorus vapor. The phosphorus is burned to tetraphosphorus decoxide, which is absorbed in water.",
        { equation: "P4O10 + 6 H2O → 4 H3PO4", significance: "The high purity makes it suitable for foods, drinks and electronics." },
      ),
    ],
  },

  "monosodium-glutamate": {
    overview: [
      "Monosodium glutamate is the sodium salt of glutamic acid, one of the 20 amino acids that build proteins. Glutamic acid has two carboxylic acid groups and one amino group; in MSG, one carboxyl group has traded its proton for a sodium ion.",
      "When food proteins are broken down by cooking, aging or fermentation, free glutamate is released, which is why parmesan, ripe tomatoes, soy sauce and broths taste savory. MSG delivers that same free glutamate in a pure, concentrated form.",
    ],
    mechanisms: [
      mech(
        "Umami taste",
        "Free glutamate binds the T1R1/T1R3 receptor on the tongue. Ribonucleotides such as inosinate (from meat and fish) and guanylate (from mushrooms) bind a neighboring site and amplify the response many times over.",
        "The brain reads this as umami, a savory signal of protein, which increases salivation and makes food taste fuller and more satisfying.",
        "established",
      ),
      mech(
        "Fuel for the gut lining",
        "Cells lining the small intestine take up dietary glutamate and burn it in the Krebs cycle.",
        "Most dietary glutamate is used as energy by gut cells and never reaches the bloodstream in large amounts; the blood–brain barrier further protects the brain.",
        "human",
      ),
      mech(
        "A lower-sodium seasoning",
        "MSG is about 12% sodium by weight, compared with about 39% for table salt.",
        "Replacing part of the salt in a recipe with MSG can cut its sodium by a quarter or more while keeping it tasty.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Dissociation in food",
        "MSG works once it dissolves.",
        [
          ["Dissolving", "In saliva or food moisture, MSG separates into sodium ions and glutamate ions."],
          ["Free glutamate", "The free glutamate ion is the form that binds taste receptors."],
          ["Synergy", "Combined with inosinate or guanylate, far less glutamate produces the same savory intensity."],
        ],
        "This synergy is why kombu-and-bonito dashi, or tomato with parmesan, tastes so intensely savory.",
        "C5H8NNaO4 → C5H8NO4- + Na+",
      ),
      rxn(
        "The Maillard reaction",
        "Like other amino acids, glutamate helps create browned flavors.",
        [
          ["Condensation", "Glutamate's amino group reacts with a reducing sugar when food is heated."],
          ["Rearrangement", "The product rearranges into an Amadori compound."],
          ["Flavor and color", "Further reactions produce brown melanoidins and hundreds of aroma molecules."],
        ],
        "Amino acids and sugars reacting together create the flavors of toast, roasted meat and fried onions.",
      ),
    ],
    hazards: [
      hz(
        "Reported sensitivity",
        "Controlled studies don't support the widespread fear of MSG.",
        "Large doses taken without food can briefly raise blood glutamate levels; no consistent mechanism for symptoms has been identified.",
        "In double-blind trials, mild, short-lived symptoms appeared inconsistently and only after 3 g or more on an empty stomach, far more than a typical serving.",
      ),
      hz(
        "Sodium contribution",
        "MSG adds sodium, though less than salt.",
        "Each gram of MSG contributes about 120 mg of sodium.",
        "It still counts toward daily sodium intake, which matters for people watching their blood pressure.",
      ),
    ],
    synthesis: [
      route(
        "Bacterial fermentation",
        "Bacteria do the work today.",
        "Corynebacterium glutamicum ferments glucose or molasses. When biotin is limited, the bacterial membrane becomes leaky and the Krebs cycle overflows with α-ketoglutarate, which the cell converts into glutamate and excretes. Glutamic acid is crystallized from the broth and neutralized.",
        { equation: "C5H9NO4 + NaOH → C5H8NNaO4 + H2O", significance: "This 1950s Japanese discovery made MSG cheap and launched industrial amino-acid fermentation." },
      ),
      route(
        "Original extraction",
        "The first MSG came from seaweed broth and wheat.",
        "In 1908, Kikunae Ikeda isolated glutamate from kombu seaweed broth. Early industrial production hydrolyzed wheat gluten with acid to release its glutamic acid.",
        { significance: "Ikeda named the taste “umami”; it was recognized as a basic taste with the discovery of its receptor in the early 2000s." },
      ),
    ],
  },

  "allura-red-ac": {
    overview: [
      "Allura Red AC (Red 40) is an azo dye: two aromatic ring systems connected by an azo bridge (–N=N–). The azo group links the rings into one long conjugated system of alternating double bonds, which absorbs blue-green light (around 504 nm) so we see red.",
      "Two sulfonate groups (–SO₃⁻ Na⁺) make the dye very water-soluble and keep it from being absorbed well in the gut. Food makers favor it because it is cheap, bright and stable to heat, light and acid, unlike many natural red pigments.",
    ],
    mechanisms: [
      mech(
        "Why it looks red",
        "Electrons in the conjugated π system absorb light of about 504 nm (blue-green) and jump to a higher energy level.",
        "Our eyes see the complementary, unabsorbed wavelengths, which appear red.",
        "established",
      ),
      mech(
        "Breakdown by gut bacteria",
        "Azoreductase enzymes made by colon bacteria cleave the –N=N– bond, producing two sulfonated aromatic amines.",
        "These products are poorly absorbed and mostly excreted. The sulfonate groups make them far less toxic than unsulfonated aromatic amines.",
        "lab",
      ),
      mech(
        "Behavior in sensitive children",
        "No single mechanism is established; hypotheses include effects on neurotransmitters and histamine release.",
        "Randomized trials, notably the 2007 Southampton study, found that dye mixtures containing Red 40 increased hyperactive behavior in some children. California's 2021 review concluded synthetic dyes can affect behavior in some children.",
        "human",
      ),
      mech(
        "Gut inflammation in mice",
        "In a 2022 mouse study, long-term Red 40 exposure increased serotonin production by cells lining the gut.",
        "The mice developed more severe experimental colitis. Whether this happens in people is unknown.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Diazotization and azo coupling (how it's made)",
        "Two classic reactions stitch the dye together.",
        [
          ["Diazotization", "An aromatic amine (cresidine-4-sulfonic acid) reacts with nitrous acid near 0 °C, forming a reactive diazonium ion (Ar–N₂⁺)."],
          ["Azo coupling", "The diazonium ion attacks the electron-rich ring of a naphthol (Schaeffer's salt) in an electrophilic aromatic substitution."],
          ["Isolation", "The dye is salted out, purified and dried."],
        ],
        "The new –N=N– bridge joins the two rings into one conjugated system, which is what creates the color.",
        "Ar-NH2 + HNO2 + H+ → Ar-N2+ + 2 H2O",
      ),
      rxn(
        "Azo reduction",
        "Breaking the azo bridge destroys the color.",
        [
          ["Electron transfer", "Bacterial azoreductase passes electrons from NADH to the azo group."],
          ["Intermediate", "The –N=N– bond becomes a single-bonded hydrazo group (–NH–NH–)."],
          ["Cleavage", "Further reduction splits it into two separate amines."],
        ],
        "The same reaction lets bacteria in wastewater treatment decolorize azo dyes.",
        "R-N=N-R' + 4 [H] → R-NH2 + R'-NH2",
      ),
    ],
    hazards: [
      hz(
        "Hyperactivity in sensitive children",
        "Not a cause of ADHD, but a measurable effect in some children.",
        "The underlying mechanism remains unclear.",
        "Effects in trials were small on average but larger in some individuals, which led the EU to require warning labels and California to remove dyes from school food.",
      ),
      hz(
        "Manufacturing impurities",
        "Controlled by batch testing.",
        "Synthesis can leave trace aromatic amines such as benzidine, a known carcinogen.",
        "FDA certifies every batch sold in the U.S. and limits these impurities to parts per billion.",
      ),
    ],
    synthesis: [
      route(
        "Petrochemical synthesis",
        "Made from aromatic chemicals derived from petroleum.",
        "Cresidine-4-sulfonic acid is diazotized with sodium nitrite and acid, then coupled with 6-hydroxy-2-naphthalenesulfonic acid. The disodium salt is precipitated, washed and dried.",
        { significance: "Every batch sold in the U.S. is chemically tested and certified by FDA before use." },
      ),
    ],
  },

  tartrazine: {
    overview: [
      "Tartrazine (Yellow 5) is a lemon-yellow azo dye built from a pyrazolone ring and two sulfonated benzene rings, linked by an azo group (–N=N–). Its conjugated system absorbs violet-blue light (about 427 nm), so we see yellow.",
      "Its sulfonate groups make it water-soluble and poorly absorbed. Mixed with a blue dye such as Brilliant Blue, it makes the bright greens of candies and sports drinks.",
    ],
    mechanisms: [
      mech(
        "Why it looks yellow",
        "The dye's conjugated electrons absorb light around 427 nm, in the violet-blue part of the spectrum.",
        "The light that remains, which our eyes see, appears bright yellow.",
        "established",
      ),
      mech(
        "Intolerance reactions",
        "In a small group of people, tartrazine appears to activate mast cells and inflammatory pathways without IgE antibodies (a pseudo-allergic reaction).",
        "Hives, itching or asthma symptoms can result; many affected people are also sensitive to aspirin.",
        "human",
      ),
      mech(
        "Gut bacterial breakdown",
        "Colon bacteria cleave the azo bond, producing sulfanilic acid and an aminopyrazolone.",
        "Both products are largely excreted without accumulating.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Azo coupling (how it's made)",
        "The dye is assembled from two pieces.",
        [
          ["Diazotization", "Sulfanilic acid reacts with nitrous acid to form a diazonium ion."],
          ["Coupling", "The diazonium ion attacks a sulfophenyl pyrazolone carboxylic acid."],
          ["Salt formation", "The product is isolated as its trisodium salt."],
        ],
        "The pyrazolone ring shifts the absorption toward shorter wavelengths, giving yellow instead of red.",
      ),
    ],
    hazards: [
      hz(
        "Intolerance in a small minority",
        "Why U.S. labels must name Yellow 5 specifically.",
        "Pseudo-allergic activation of mast cells releases histamine and other mediators.",
        "Reactions include hives and, rarely, asthma attacks; estimates suggest well under 1 in 1,000 people are affected.",
      ),
      hz(
        "Hyperactivity in sensitive children",
        "Included in the dye mixtures tested in the Southampton trial.",
        "The mechanism is not established.",
        "The EU requires a warning about effects on children's activity and attention on foods containing it.",
      ),
    ],
    synthesis: [
      route(
        "Industrial synthesis",
        "A classic azo coupling.",
        "Sulfanilic acid is diazotized and coupled with 1-(4-sulfophenyl)-3-carboxy-5-pyrazolone, then the dye is isolated as the trisodium salt and purified.",
        { significance: "Johann Heinrich Ziegler first made tartrazine in 1884 during the boom in synthetic dyes." },
      ),
    ],
  },

  "caramel-color": {
    overview: [
      "Caramel color is a complex mixture of brown polymers made by heating sugars under controlled conditions. Unlike a single dye molecule, it contains thousands of different molecules, from small flavor compounds to large colored polymers called melanoidins.",
      "Manufacturers sort it into four classes by what is added during heating: plain (I), caustic sulfite (II), ammonia (III) and sulfite-ammonia (IV). The additives control the particles' electric charge, which matters: a cola needs a negatively charged caramel (class IV) that won't clump in its acidic environment.",
    ],
    mechanisms: [
      mech(
        "Why it's brown",
        "Dehydrated sugar fragments link into large conjugated polymers that absorb light across the visible spectrum, more strongly at blue wavelengths.",
        "We see the mixture as brown; manufacturers measure its strength as “tinctorial power”.",
        "established",
      ),
      mech(
        "Matching the charge",
        "Ammonium and sulfite reactants give caramel particles a positive or negative surface charge.",
        "Matching the charge to the drink or sauce keeps the color evenly dispersed; a mismatch causes haze or sediment.",
        "established",
      ),
      mech(
        "4-MEI in animal studies",
        "In class III and IV caramels, ammonia reacts with sugar fragments such as methylglyoxal to form 4-methylimidazole (4-MEI).",
        "In a U.S. National Toxicology Program study, high doses of 4-MEI caused lung tumors in mice but not rats; IARC classifies it as possibly carcinogenic.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Ammonia caramel chemistry",
        "A Maillard-type reaction between sugar fragments and ammonia.",
        [
          ["Fragmentation", "Heated sugars dehydrate and split into small reactive dicarbonyls such as methylglyoxal."],
          ["Ring formation", "Ammonia reacts with these dicarbonyls to form imidazoles, including 4-MEI."],
          ["Polymerization", "Fragments link into large brown melanoidins that carry the color."],
        ],
        "Controlling time, temperature and reactants lets manufacturers minimize 4-MEI while hitting a target color.",
      ),
    ],
    hazards: [
      hz(
        "4-MEI byproduct",
        "Applies to ammonia-process caramels (classes III and IV), used in colas.",
        "4-MEI forms when ammonia reacts with sugar fragments during heating.",
        "California's Prop 65 listing led major cola makers to cut 4-MEI levels in 2012; exposure today is far below levels that caused effects in mice.",
      ),
    ],
    synthesis: [
      route(
        "Industrial cooking",
        "Controlled caramelization at scale.",
        "Food-grade glucose or sucrose syrup is heated, often under pressure, with food-grade acids, alkalis, ammonium compounds or sulfites. When the target color intensity is reached, the batch is cooled and filtered.",
        { significance: "Plain caramel (class I) is essentially burnt sugar; the other classes trade simplicity for stability in specific products." },
      ),
    ],
  },
};
