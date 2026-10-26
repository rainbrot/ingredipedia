import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const CLEANING_DEEP_1: Record<string, DeepProfile> = {
  limonene: {
    overview: [
      "Limonene is a naturally occurring monoterpene (C₁₀H₁₆) and the primary component of essential oils extracted from citrus rinds. As a highly volatile compound, it vaporizes easily at room temperature, which is why peeling an orange instantly releases a strong, distinct scent.",
      "Limonene exists as two mirror-image isomers (enantiomers) that trigger different olfactory receptors in the human nose. (R)-limonene (D-limonene) smells like sweet oranges and is the most abundant form in nature. (S)-limonene (L-limonene) has a harsher, pine-like, or turpentinic odor often associated with lemons, caraway, and pine needles.",
    ],
    mechanisms: [
      mech(
        "Anti-inflammatory action",
        "Inflammation inside cells is controlled partly by a protein complex called NF-κB, which acts like a master switch for inflammatory genes. Normally NF-κB sits in the cytoplasm, the fluid outside the cell's nucleus, held in check by an inhibitor protein called IκB, a bit like a dog on a leash. When a cell is stressed or injured, enzymes tag IκB for destruction, which frees NF-κB to travel into the nucleus. In laboratory studies, limonene, which crosses cell membranes easily because it dissolves in fats, interfered with this step and kept IκB from being broken down. With IκB intact, NF-κB stays stuck outside the nucleus.",
        "Because NF-κB can't reach the DNA, it can't switch on the genes that make inflammatory messengers called cytokines, such as TNF-α and IL-6. These messengers normally call in immune cells and cause the redness, heat and swelling of inflammation. In cell and animal studies, limonene reduced these signs of inflammation. Researchers are interested in whether this could help with inflammatory conditions. These results come from the laboratory, though, and it isn't known whether the small amounts people meet in foods or cleaners have any such effect.",
        "lab",
      ),
      mech(
        "Antioxidant properties",
        "Limonene (C₁₀H₁₆) has two carbon–carbon double bonds, regions packed with shared electrons. Free radicals are unstable molecules with an unpaired electron, such as the hydroxyl radical, and they react aggressively with whatever is nearby in order to grab an electron. Limonene's electron-rich double bonds can react with these radicals, either by giving up electrons or by adding the radical across the double bond. Either way, the radical is neutralized. In laboratory tests, this makes limonene a mild antioxidant.",
        "Free radicals can damage cell membranes by stealing electrons from their fat molecules, a chain reaction called lipid peroxidation that leaves membranes leaky. They can also damage proteins and DNA, a state known as oxidative stress. In cell and animal studies, limonene reduced markers of this kind of damage. Whether this matters for human health at normal exposures is unknown. Ironically, the same reactivity with oxygen is what makes limonene form skin-sensitizing products as it ages.",
        "lab",
      ),
      mech(
        "Gastrointestinal and reflux relief",
        "Limonene is lipophilic, meaning it dissolves in fats, and hydrophobic, meaning it doesn't mix with water. It is also lighter than water, with a specific gravity of about 0.84. In the watery, acidic environment of the stomach it doesn't dissolve, so it tends to float on top of the stomach contents, much as oil floats on vinegar in a salad dressing. Some researchers have suggested that this floating layer could act as a barrier. It may also have mild effects on the muscles of the digestive tract.",
        "Heartburn happens when stomach acid splashes up into the esophagus, the tube that carries food to the stomach, and irritates its lining. A small number of studies of D-limonene capsules suggested they might reduce heartburn, possibly by forming a protective layer or by helping the stomach and esophagus move their contents along. However, these studies were small, and their results haven't been confirmed by large, well-designed trials. Limonene isn't an approved treatment for reflux. Anyone with frequent heartburn should see a doctor.",
        "emerging",
      ),
      mech(
        "Hepatic (liver) enzyme induction",
        "After limonene is absorbed, it travels to the liver, whose cells process foreign substances. In animal studies, limonene binds to sensor proteins inside liver cells, such as the constitutive androstane receptor (CAR), which detect foreign chemicals. When these sensors are activated, they switch on genes for detoxification enzymes. These include Phase I enzymes, such as cytochrome P450s, which chemically modify foreign molecules, and Phase II enzymes, such as glutathione S-transferases, which attach water-soluble groups to them. Raising enzyme production this way is called enzyme induction.",
        "Detoxification enzymes help the body turn fat-soluble substances into water-soluble forms that the kidneys can flush out in urine. In rodents, limonene increased the activity of these enzymes, and some studies suggested this helped protect against certain cancer-causing chemicals. But enzyme induction can also change how fast the body processes medicines. Whether limonene meaningfully affects human liver enzymes at normal exposures hasn't been established. These findings remain at the laboratory stage.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Autooxidation (reaction with oxygen over time)",
        "Autoxidation is a slow, spontaneous chain reaction that happens when limonene is exposed to oxygen in the air. Light and heat speed it up by creating the first free radicals. Fresh, pure limonene rarely causes skin allergies, but the products of its autoxidation are well-known contact allergens. That means citrus oils and citrus-scented cleaners can become more irritating as they age. It is the same basic chemistry that makes cooking oils go rancid.",
        [
          ["Initiation", "A trace free radical, often produced by ultraviolet light, pulls a hydrogen atom off an allylic carbon on the limonene ring, meaning a carbon right next to a double bond. Hydrogens in that position come off more easily. This leaves a limonene radical with an unpaired electron."],
          ["Propagation", "The limonene radical immediately reacts with an oxygen molecule (O₂) from the air. The oxygen attaches to it, forming a peroxy radical (–OO•). This new radical is also highly reactive."],
          ["Hydroperoxide formation", "The peroxy radical steals a hydrogen atom from another limonene molecule. That turns it into limonene hydroperoxide (R–OOH) and creates a new limonene radical, which keeps the chain going. One starting event can produce many hydroperoxide molecules."],
          ["Decomposition", "Limonene hydroperoxides are unstable and slowly break down into other oxidized products. These include carvone, which smells like spearmint; carveol, an alcohol; and limonene oxide, an epoxide. Several of these are also skin sensitizers."],
        ],
        "When an old bottle of citrus essential oil sits on a sunny shelf, its limonene slowly turns into hydroperoxides and carvone, which is why older oils are more likely to cause skin rashes. Keeping oils in dark, tightly closed bottles, using them within a year or so and adding antioxidants all slow this down.",
        "ROO• + RH → ROOH + R•",
      ),
      rxn(
        "Indoor ozone chemistry (ozonolysis)",
        "When you use citrus-scented cleaning sprays or air fresheners indoors, the limonene in the air can react with ozone (O₃), a reactive form of oxygen. Ozone drifts in from outdoor smog and is also produced by some air purifiers and older laser printers. The reaction, called ozonolysis, breaks limonene apart at its double bonds. It follows a pathway first described by the German chemist Rudolf Criegee in the 1950s. Its products include irritating gases and tiny airborne particles.",
        [
          ["Cycloaddition", "An ozone molecule attacks one of limonene's double bonds, usually the one inside its ring. All three of ozone's oxygen atoms attach across the double bond at once, forming a very unstable five-membered ring called a primary ozonide."],
          ["Cleavage", "The primary ozonide immediately falls apart, completely breaking the original carbon–carbon double bond. This creates two pieces: a carbonyl compound, with a C=O group, and a high-energy molecule called a Criegee intermediate, also known as a carbonyl oxide."],
          ["Secondary reactions", "The Criegee intermediate is extremely unstable. It quickly reacts with water vapor in the air or rearranges itself, forming a variety of oxygen-containing volatile organic compounds and releasing reactive hydroxyl radicals."],
          ["Aerosol formation", "Many of the large, oxygen-rich molecules formed this way barely evaporate, so they don't stay as gases. They condense onto dust particles or clump together into microscopic droplets suspended in the air, forming an aerosol."],
        ],
        "The reaction produces secondary organic aerosols, ultrafine particles that can be breathed deep into the lungs, along with small amounts of formaldehyde. That is why atmospheric chemists warn that heavy use of pine or citrus cleaners in a poorly ventilated room on a smoggy day can create a short burst of indoor air pollution. Opening windows helps.",
        "C10H16 + O3 → C10H16O3",
      ),
    ],
    hazards: [
      hz(
        "Skin sensitization (contact dermatitis)",
        "Fresh, pure limonene rarely irritates skin or causes allergies; the problem appears as it ages. Once a bottle of citrus oil or cleaner is opened and exposed to air, light and warmth, limonene slowly reacts with oxygen and forms products that are strong skin allergens. Oxidized limonene is now one of the most common fragrance allergens found in patch testing. That is why the European Union requires limonene to be listed on cosmetic labels when it is present above trace amounts. People who are sensitized need to avoid it in many products.",
        "Through autoxidation, oxygen from the air attacks limonene next to its double bonds, converting it into limonene hydroperoxides along with carvone and limonene oxide. Limonene hydroperoxides are reactive molecules with an –O–O–H group. Because they are small and dissolve in fats, they slip easily through the skin's outer barrier, the stratum corneum. Once inside, they act as haptens, small molecules that form strong chemical bonds with the skin's own proteins. That creates altered proteins the immune system doesn't recognize.",
        "Immune cells in the skin called Langerhans cells detect the altered proteins, carry them to the lymph nodes and teach T cells to treat them as threats. This sensitization stage causes no symptoms at first. On later exposures, the memory T cells trigger a delayed, Type IV immune response, usually 24 to 72 hours after contact. The result is allergic contact dermatitis: red, itchy, sometimes blistering skin wherever the product touched. Once someone is sensitized, the allergy usually lasts for life.",
      ),
      hz(
        "Respiratory irritation",
        "Limonene's citrus smell isn't harmful in itself at normal levels, but it can be a starting material for indoor air pollution. When limonene vapor from cleaning sprays mixes with ozone indoors, it forms formaldehyde and tiny particles that can irritate the airways. This mainly matters with heavy use of citrus or pine cleaners in poorly ventilated spaces. People with asthma may be more sensitive. Good ventilation greatly reduces the effect.",
        "When limonene vapor meets ozone in indoor air, ozonolysis breaks the limonene ring apart. This creates formaldehyde, reactive hydroxyl radicals and large, oxygen-rich organic molecules. Because these heavy molecules don't stay as gases, they condense into microscopic droplets called secondary organic aerosols. These particles are ultrafine, far smaller than a grain of dust. How much forms depends on the amounts of limonene and ozone and on how quickly fresh air replaces indoor air.",
        "When a person breathes this air, the ultrafine particles and formaldehyde can travel deep into the lungs. There they can cause oxidative stress, a buildup of reactive molecules that damages cells and irritates the airway lining. This can trigger coughing, chest tightness, shortness of breath and, in people with asthma, flare-ups. Formaldehyde also irritates the eyes and nose. Opening windows and using fragranced cleaners sparingly, especially on smoggy days, reduces exposure.",
      ),
      hz(
        "Aspiration hazard",
        "Limonene has very low toxicity when swallowed in small amounts, such as from citrus fruit. But swallowing concentrated limonene, such as pure orange oil or a citrus degreaser, carries a serious risk to the lungs. This is called an aspiration hazard, and it is mainly a danger for young children who might drink cleaning products. The risk comes not from limonene's chemistry in the stomach but from what happens if it reaches the lungs. If someone swallows a limonene product, don't make them vomit; call a poison control center.",
        "Limonene is a nonpolar hydrocarbon, made only of carbon and hydrogen, with very low viscosity, meaning it is thin and runny, and low surface tension, meaning it spreads easily. These properties let it flow and spread over moist surfaces very quickly. It is also an excellent solvent for fats and oils. In the lungs, these properties become dangerous. Limonene can dissolve the fatty substances the lungs depend on.",
        "If a person swallows concentrated limonene and then chokes, coughs or vomits, its low surface tension lets it slip past the vocal cords into the airways and lungs. In the tiny air sacs called alveoli, it dissolves the pulmonary surfactant, a fatty film that keeps the air sacs open. Without surfactant, air sacs collapse, fluid leaks in and the lungs become inflamed, a condition called chemical pneumonitis. This can make breathing very difficult and can be life-threatening. That is why such products carry warnings and child-resistant caps.",
      ),
      hz(
        "Aquatic toxicity",
        "Limonene is classified as very toxic to aquatic life, so large amounts shouldn't be poured into drains or waterways. Small amounts from household use are usually broken down at wastewater treatment plants. The concern is mainly spills of concentrated limonene or industrial waste. Limonene breaks down fairly quickly in the environment, which limits long-term effects. Still, at high concentrations it can harm fish and other water creatures.",
        "Limonene barely dissolves in water and is lighter than water, with a specific gravity of about 0.84. If a large amount is spilled into water, it floats on the surface as an oily film rather than mixing in. Because it is so lipophilic, it readily moves out of the water and into fatty tissue. In aquatic organisms, it moves into the fatty membranes of gills and other cells. Under the global hazard system, limonene is classified as Aquatic Acute 1 and Aquatic Chronic 1, the most toxic categories.",
        "When limonene builds up in the fatty membranes of fish gills and other cells, it disrupts their structure, making them leaky and interfering with breathing and other vital functions. Small aquatic animals such as water fleas, and fish, are particularly sensitive. Large spills can kill aquatic life in the affected area. However, limonene is readily biodegradable, meaning microbes break it down within days to weeks, so it doesn't linger. Disposing of concentrated products properly prevents harm.",
      ),
    ],
    dosage:
      "Citrus cleaners may contain about 1 to 20 percent limonene, while cosmetics usually contain less than 1 percent. In the European Union, limonene must be named on cosmetic labels when it exceeds 0.001 percent in leave-on products or 0.01 percent in rinse-off products, so people with allergies can avoid it, and fragrance-industry standards limit how oxidized it may be. Eating citrus fruit and foods flavored with orange oil provides small amounts that the body handles easily. The main precautions are storing products away from light and heat, keeping them away from children and ventilating rooms while cleaning.",
    synthesis: [
      route(
        "Biological synthesis (how plants make it)",
        "Plants make limonene through a series of enzyme-controlled reactions rather than in one step. In citrus fruit, this happens in tiny oil glands in the peel, the small dots you can see on an orange's skin. Many other plants, including mint, pine and caraway, also make limonene. Plants produce it partly to defend themselves against insects and microbes and partly to attract pollinators. Each plant uses an enzyme that makes one particular mirror-image form.",
        "Plants build limonene from geranyl pyrophosphate (GPP), a 10-carbon chain that is the starting point for all monoterpenes. An enzyme called limonene synthase holds GPP in a pocket shaped to guide what happens next. The enzyme removes the pyrophosphate group, leaving a positively charged carbon called a carbocation, which is very reactive. The molecule rearranges and curls around so that its tail attacks the positive carbon, closing a six-carbon ring. Finally, the enzyme removes a hydrogen ion, creating a double bond and releasing limonene.",
        {
          steps: [
            "The enzyme strips away the pyrophosphate group, leaving a positively charged, highly reactive carbon (a carbocation).",
            "The unstable molecule rearranges into a different intermediate called the linalyl cation.",
            "The positive charge pulls the tail of the molecule around, forcing it to snap shut into a six-carbon ring (the α-terpinyl cation).",
            "Finally, the enzyme removes a proton (H⁺), forming the last double bond and releasing (R)-limonene.",
          ],
          significance:
            "This is a highly stereospecific reaction. Because the enzyme's “pocket” is precisely shaped, it almost exclusively produces the (R)-enantiomer (sweet orange scent) in citrus, whereas a different enzyme in pine trees produces the (S)-enantiomer (pine scent).",
        },
      ),
      route(
        "Chemical synthesis (the Diels–Alder reaction)",
        "Making limonene from scratch in a laboratory is possible but rarely done commercially, because squeezing orange peels is far cheaper. When chemists do build it, they can use a classic reaction called the Diels–Alder reaction, discovered by Otto Diels and Kurt Alder in 1928, which earned them the 1950 Nobel Prize. This reaction joins two molecules into a ring in a single step. Starting from isoprene, a simple five-carbon molecule, it can form limonene's six-membered ring. It is a favorite example in organic chemistry courses.",
        "Isoprene is a five-carbon molecule with two double bonds separated by a single bond, a type of molecule called a diene. When isoprene is heated, two of its molecules can react with each other. One acts as the diene, contributing four carbon atoms, and the other acts as the dienophile, contributing two atoms through one of its double bonds. The electrons in their double bonds shift together in a circle, forming two new single bonds and one new double bond at the same moment. This single step, called a [4+2] cycloaddition, zips the two molecules into a six-membered ring, giving limonene.",
        {
          equation: "2 C5H8 → C10H16",
          significance:
            "Because no enzyme guides the shape, this heat-driven reaction produces dipentene, a 50:50 mixture of (R)- and (S)-limonene. Dipentene is used as a cheap industrial solvent and in rubber manufacturing, since separating the two mirror-image forms is difficult and expensive.",
        },
      ),
      route(
        "Industrial manufacturing (physical extraction)",
        "Almost all commercial limonene comes from the orange peels left over from making orange juice, amounting to tens of thousands of tonnes a year. That makes it an upcycled byproduct, turning waste into something valuable. Because the orange tree has already made the limonene, manufacturing only has to separate it from the peel. No chemical reactions are needed. Brazil and the United States, the world's biggest orange juice producers, are major suppliers.",
        "After oranges are pressed for juice, the leftover peels, which hold most of the fruit's limonene, are crushed or scraped to burst the tiny oil glands. The resulting slurry is sprayed with water and sent through powerful centrifuges, machines that spin very fast. Because limonene is lighter than water and doesn't mix with it, the spinning separates it from the heavier water and plant material, leaving a layer of cold-pressed orange oil. Limonene can also be recovered by steam distillation of the peels, where it evaporates with the steam and is collected as the vapor cools. Cold-pressed orange oil is about 95 percent limonene.",
        {
          significance:
            "For higher purity, the crude oil is distilled under vacuum. Lowering the pressure lowers limonene's boiling point, so it evaporates at a gentler temperature and leaves waxes and pigments behind, giving limonene that is about 99 percent pure.",
        },
      ),
    ],
  },

  "sodium-hypochlorite": {
    overview: [
      "Sodium hypochlorite (NaOCl) is a salt of hypochlorous acid. In the hypochlorite ion, chlorine is bonded to oxygen in the +1 oxidation state, which makes it hungry for electrons: a strong oxidizing agent.",
      "Household bleach is a 3–8% solution kept alkaline (pH 11–13) with a little sodium hydroxide for stability. When diluted, part of the hypochlorite becomes hypochlorous acid (HOCl), the form that actually kills microbes, and the same molecule your white blood cells use to destroy bacteria.",
    ],
    mechanisms: [
      mech(
        "Killing microbes by oxidation",
        "When bleach is diluted in water, part of the hypochlorite (OCl⁻) picks up a hydrogen ion and becomes hypochlorous acid (HOCl). HOCl is small and carries no electric charge, so it can slip through the fatty membranes of bacteria and the outer layers of viruses. Once inside, it acts as a strong oxidizing agent, meaning it grabs electrons from other molecules. It oxidizes the thiol groups (–SH) in proteins, attaches chlorine atoms to amino groups and damages the bases of DNA. These reactions happen fast and hit many targets at once.",
        "When their proteins are oxidized and chlorinated, bacteria and viruses stop working. Proteins unfold and clump together, enzymes shut down and membranes are damaged. At the correct dilution, bleach kills most bacteria and viruses within seconds to minutes, which is why it is used to disinfect surfaces, drinking water and swimming pools. Because it attacks so many targets at once, microbes find it very hard to become resistant. Dirt and organic matter use bleach up, though, so surfaces should be cleaned before they are disinfected.",
        "established",
      ),
      mech(
        "Whitening stains",
        "Many stains, such as those from wine, coffee, grass or fruit, contain colored molecules called chromophores. Chromophores have long chains of alternating single and double bonds, called conjugated systems, that absorb particular wavelengths of visible light, which is what gives them color. Hypochlorite, a strong oxidizer, attacks these double bonds, adding oxygen or chlorine atoms and breaking the long chains into shorter pieces. Shorter conjugated systems absorb ultraviolet rather than visible light. So the molecules lose their color.",
        "Once stain molecules stop absorbing visible light, they become colorless and the fabric looks white again. The stain molecules are still there; they are just invisible. That is why bleach works so well on white cotton. Bleach also attacks the dyes in colored fabrics, causing fading, and it can weaken fibers made of protein, such as wool and silk. Always check the care label before bleaching clothes.",
        "established",
      ),
      mech(
        "Your immune system's bleach",
        "White blood cells called neutrophils contain an enzyme called myeloperoxidase. It combines hydrogen peroxide (H₂O₂), which neutrophils make, with chloride ions (Cl⁻), which are abundant in the body, to produce hypochlorous acid (HOCl). That is the very same active molecule that forms when household bleach is diluted. Neutrophils store myeloperoxidase in small compartments called granules. When they need it, the granules release it.",
        "When neutrophils swallow bacteria, they trap them inside a small compartment called a phagosome. The neutrophil then fills the phagosome with a burst of reactive molecules, hypochlorous acid among them, a process called the oxidative or respiratory burst. The hypochlorous acid oxidizes the bacteria's proteins and membranes and kills them. This is one of the immune system's most powerful weapons against infection. Myeloperoxidase is also what gives pus its greenish tint.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "The hypochlorous acid equilibrium",
        "Bleach's power to disinfect depends strongly on pH, because hypochlorite exists in two forms: the hypochlorite ion (OCl⁻) and hypochlorous acid (HOCl). The two are in equilibrium, constantly converting back and forth, with the balance set by pH. Hypochlorous acid is by far the more powerful disinfectant, killing bacteria something like 80 to 100 times faster. The hypochlorite ion, however, is more stable in storage. This balance explains how bleach is sold and how it should be used.",
        [
          ["Dilution", "Household bleach is sold at a high pH, around 11 to 13, thanks to a little sodium hydroxide. When it is diluted with water, the pH drops toward neutral. That shifts the balance between the two forms."],
          ["Protonation", "As the pH falls, hypochlorite ions pick up hydrogen ions and become hypochlorous acid. The pKa is about 7.5, meaning that at pH 7.5 half is in each form. Below that pH, HOCl dominates."],
          ["Activity", "Because HOCl is uncharged, it passes easily through microbial membranes, while the negatively charged OCl⁻ is largely kept out. So HOCl kills microbes much faster."],
        ],
        "That is why diluted bleach disinfects well, and why bleach is sold alkaline: OCl⁻ is more stable in the bottle and breaks down more slowly. Lowering the pH too far, below about 5, risks forming dangerous chlorine gas.",
        "OCl- + H2O ⇌ HOCl + OH-",
      ),
      rxn(
        "Chlorine gas when mixed with acids",
        "Mixing bleach with acidic cleaners is one of the most common and dangerous household chemical accidents. Acidic products include toilet bowl cleaners, some bathroom cleaners, rust removers and vinegar. Adding acid to bleach releases chlorine gas, a toxic yellow-green gas that was used as a chemical weapon in World War I. Even a small amount in a closed bathroom can cause serious breathing problems. Never mix bleach with any other cleaning product.",
        [
          ["Acid added", "An acidic cleaner floods the bleach with hydrogen ions (H⁺), and the pH drops sharply. Bleach always contains some chloride ions (Cl⁻) left over from its manufacture. The conditions are now set for a reaction."],
          ["Conversion", "Under acidic conditions, hypochlorite (or hypochlorous acid) reacts with chloride ions and hydrogen ions. The chlorine atoms from the hypochlorite and the chloride combine. This forms chlorine gas (Cl₂) and water."],
          ["Gas release", "Chlorine gas doesn't stay dissolved in acidic water, so it bubbles out and fills the air. Its sharp, choking smell is a warning sign."],
        ],
        "Chlorine gas reacts with the moisture in the eyes, nose and lungs to form hydrochloric acid and hypochlorous acid, which damage those tissues. If you mix them by accident, leave the area at once, get fresh air and call a poison control center. Never mix bleach with acids.",
        "NaOCl + 2 HCl → Cl2 + NaCl + H2O",
      ),
      rxn(
        "Chloramines when mixed with ammonia",
        "Another dangerous mistake is mixing bleach with products containing ammonia, such as some glass cleaners, or with urine, which contains ammonia-related compounds. This combination produces toxic gases called chloramines. Like chlorine gas, chloramines irritate the eyes and lungs and can cause serious breathing problems. Chloramines are also behind the typical “chlorine” smell of indoor pools, where chlorine reacts with sweat and urine. Never mix bleach with ammonia.",
        [
          ["Mixing", "Bleach meets ammonia (NH₃) from a glass cleaner, a multipurpose cleaner or urine. Hypochlorite and ammonia can react directly. The reaction starts immediately."],
          ["Substitution", "Chlorine atoms from hypochlorite replace hydrogen atoms on ammonia, one at a time. Replacing one gives monochloramine (NH₂Cl), replacing two gives dichloramine (NHCl₂), and replacing all three gives nitrogen trichloride (NCl₃)."],
          ["Gas release", "These chloramines evaporate easily and escape into the air as irritating vapors. With extra bleach present, highly toxic nitrogen trichloride can form."],
        ],
        "Chloramines irritate the eyes and lungs and can cause coughing, shortness of breath, chest pain and fluid in the lungs. If exposed, leave the area and get fresh air. Never mix bleach with ammonia or ammonia-containing products.",
        "NaOCl + NH3 → NH2Cl + NaOH",
      ),
    ],
    hazards: [
      hz(
        "Toxic gases when mixed",
        "Mixing bleach with other cleaners is a common cause of household chemical injuries. Every year, U.S. poison control centers receive thousands of calls about people exposed to gases from mixing cleaners. The most dangerous combinations are bleach with acids, which makes chlorine gas, and bleach with ammonia, which makes chloramines. Injuries range from mild irritation to life-threatening lung damage. The simplest rule is never to mix bleach with anything except water.",
        "Acids turn hypochlorite into chlorine gas by supplying the hydrogen ions that drive its reaction with chloride. Ammonia reacts with hypochlorite to form chloramines, in which chlorine atoms replace hydrogen atoms on nitrogen. Both chlorine and chloramines are reactive gases that dissolve readily in water. When they dissolve in the moist lining of the airways, they form acids and other reactive compounds. These damage the cells lining the respiratory tract.",
        "Dissolving into the moist surfaces of the eyes, nose, throat and lungs, these gases cause irritation and burns. Symptoms include burning eyes, coughing, wheezing, chest pain and shortness of breath. Higher exposures can damage the tiny air sacs in the lungs so that fluid leaks in, a serious condition called pulmonary edema that can appear hours later. People with asthma are especially vulnerable. Anyone exposed should get to fresh air and seek medical help if symptoms continue.",
      ),
      hz(
        "Corrosive to skin and eyes",
        "Household bleach is strong enough to irritate skin and seriously damage the eyes. Undiluted bleach can cause burns, especially with prolonged contact. Splashes in the eyes are particularly dangerous and can cause lasting injury if not rinsed immediately. Wearing gloves while cleaning protects the hands. Diluting bleach properly before use reduces the risk.",
        "Bleach harms tissue in two ways. First, hypochlorite is a strong oxidizer that attacks the proteins in skin and eyes and damages their structure. Second, household bleach is strongly alkaline, with a pH around 11 to 13. At that pH, hydroxide ions break down the fats in cell membranes by saponification, the same reaction that makes soap. That combination of oxidation and alkaline attack makes bleach especially harsh on delicate tissue.",
        "On skin, bleach can cause redness, irritation, dryness and, with prolonged contact, chemical burns. Bleach on the skin often feels slippery because it is turning skin oils into soap. In the eyes, it can damage the cornea, the clear front layer, causing pain, redness and blurred vision, and alkaline damage keeps spreading if it isn't washed away. Eye splashes need immediate rinsing with clean water for at least 15 minutes. Medical attention should follow.",
      ),
      hz(
        "Asthma with frequent use",
        "Regular, frequent use of bleach and other cleaning sprays has been linked to asthma, especially in people who clean for a living, such as janitors, housekeepers and healthcare workers. Studies have also found links between frequent home use of cleaning sprays and asthma in adults. The risk seems greatest with sprays, which create fine droplets that can be breathed in. Using bleach in well-ventilated areas and choosing non-spray products may lower the risk. Occasional use isn't a major concern for most people.",
        "When bleach is used, especially as a spray, small amounts of chlorine-containing gases and droplets get into the air. Hypochlorous acid and chlorine can also react with organic matter on surfaces and in the air, forming irritating compounds such as chloramines and chlorinated organic molecules. These are reactive and can damage the airway lining. Repeated exposure over months and years causes ongoing irritation. That is different from a single accidental exposure.",
        "Repeatedly breathing in irritants can inflame the airways, making them more sensitive and more prone to narrowing, which are the hallmarks of asthma. In some people this leads to new asthma, called occupational asthma when work is the cause. A large European study found that adults who used cleaning sprays at least once a week had a higher risk of developing asthma. Symptoms include wheezing, coughing and shortness of breath. Better ventilation, masks and safer cleaning methods help protect workers.",
      ),
    ],
    dosage:
      "Household bleach contains about 3 to 8 percent sodium hypochlorite. For disinfecting surfaces, health agencies typically recommend diluting it to about 0.1 to 0.5 percent, roughly 1 part bleach to between 10 and 50 parts water depending on the bleach's strength. Diluted bleach loses strength within about a day, so make it fresh. Swallowing a small amount of household bleach usually causes only irritation of the mouth and stomach, but poison control centers receive thousands of calls a year about people exposed to gases from mixing bleach with other cleaners. Always use bleach with good ventilation and never mix it with other products.",
    synthesis: [
      route(
        "Chlorine into lye",
        "Most sodium hypochlorite is made by reacting chlorine gas with sodium hydroxide solution. Both chemicals come from the same source: the electrolysis of salt water, called the chlor-alkali process. So bleach is essentially made from salt, water and electricity. The first liquid bleach, Eau de Javel, was made near Paris in 1789 and named after the district where it was produced. Today it is one of the most widely used disinfectants in the world.",
        "Chlorine gas is bubbled into a cold solution of sodium hydroxide. In this reaction chlorine undergoes disproportionation, a reaction in which the same element is both oxidized and reduced. One chlorine atom gains an electron and becomes a chloride ion (Cl⁻), while the other loses electrons and becomes part of a hypochlorite ion (OCl⁻). The result is a solution of sodium chloride and sodium hypochlorite in water. A small excess of sodium hydroxide is left in to keep the pH high, which keeps the bleach stable.",
        { equation: "Cl2 + 2 NaOH → NaCl + NaOCl + H2O", significance: "Keeping the solution cold matters; heating converts hypochlorite into chlorate." },
      ),
      route(
        "Electrochlorination",
        "Some facilities make sodium hypochlorite on the spot using only salt, water and electricity, a process called electrochlorination. This avoids transporting and storing large amounts of dangerous chlorine gas or concentrated bleach. It is used in swimming pools, water treatment plants, ships and hospitals. “Saltwater” swimming pools use this method to make their own chlorine. The bleach it produces is dilute, which makes it safer to handle.",
        "Salt water is passed through an electrolytic cell, where an electric current flows between two electrodes. At the positive electrode, the anode, chloride ions lose electrons and form chlorine. At the negative electrode, the cathode, water gains electrons and forms hydrogen gas and hydroxide ions. Unlike the industrial chlor-alkali process, there is no membrane between the electrodes. So the chlorine reacts straight away with the hydroxide in the solution, producing dilute sodium hypochlorite directly.",
        { significance: "Swimming pools and water-treatment plants use this to avoid storing chlorine gas." },
      ),
    ],
  },

  "sodium-hydroxide": {
    overview: [
      "Sodium hydroxide (NaOH), also called lye or caustic soda, dissolves completely into sodium ions and hydroxide ions (OH⁻), making it a strong base. A 1% solution has a pH around 13.",
      "Dissolving it releases a lot of heat, and its hydroxide ions attack fats and proteins aggressively. That makes it a powerful drain and oven cleaner, and, in tiny neutralized amounts, an everyday ingredient for adjusting pH in cosmetics and for making soap.",
    ],
    mechanisms: [
      mech(
        "Dissolving grease (saponification)",
        "Grease and fats are made of triglycerides, molecules in which three fatty acids are attached to glycerol by ester bonds. Sodium hydroxide releases hydroxide ions (OH⁻), strong bases that attack the carbon atom of each ester bond. This breaks the bond, releasing glycerol and turning the fatty acids into their sodium salts. Those fatty-acid salts are soap molecules. The reaction is called saponification, from the Latin word sapo, meaning soap.",
        "The soap formed from greasy clogs and oven grime dissolves in water, while the original grease didn't. So sticky, water-repelling grease becomes something that rinses away. That is how sodium hydroxide clears greasy drain clogs and cleans burnt-on grease in ovens. The reaction also releases heat, which helps melt any remaining fat. In effect, it is making soap inside your drain.",
        "established",
      ),
      mech(
        "Breaking down hair and protein",
        "Hair is made mainly of keratin, a tough protein whose chains are linked by peptide bonds and strengthened by disulfide bonds, bridges between sulfur atoms on different parts of the protein. Hydroxide ions attack both. They hydrolyze peptide bonds, chopping the protein chains into smaller pieces, and they break the disulfide bonds that give hair its strength and shape. As these bonds break, the hair loses its structure. Eventually it dissolves.",
        "This is how sodium hydroxide drain cleaners dissolve hair clogs, a common cause of blocked bathroom drains. The same chemistry is used in some hair relaxers, which break and rearrange the disulfide bonds in curly hair to straighten it. It also explains why lye is so dangerous to skin: the outer layers of your body are made of protein too. Hydroxide dissolves skin proteins the same way it dissolves hair. That is why protective gloves are essential.",
        "established",
      ),
      mech(
        "Why alkali burns are so serious",
        "When concentrated sodium hydroxide touches skin or eyes, hydroxide ions attack the fats in cell membranes by saponification, turning them into soap. They also denature proteins, making them unfold and stop working. Unlike acids, which make proteins clump into a crust that slows further damage, alkalis turn tissue into a soft, liquid mush. That mush doesn't stop the chemical from going deeper. The damage continues as long as the alkali is there.",
        "Alkali burns cause a kind of tissue death called liquefactive necrosis, in which tissue breaks down and liquefies. With no protective crust, the alkali keeps soaking deeper, so the burn can be much worse than it first looks. In the eye, alkali burns are especially dangerous because they can pass through the cornea to the inner eye within seconds, potentially causing permanent blindness. That is why lye splashes in the eye need immediate rinsing for at least 15 to 30 minutes. Emergency care should follow.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Saponification",
        "Saponification is the reaction that turns fats and oils into soap using a strong base such as sodium hydroxide. It is one of the oldest chemical processes people have used, going back thousands of years. In soapmaking, the fat and lye are measured carefully so that they react completely. The products are soap and glycerin. In cleaning products, the same reaction breaks down greasy buildup.",
        [
          ["Attack", "Hydroxide ions (OH⁻) from the sodium hydroxide are drawn to the carbon atom in each ester bond of a triglyceride. That carbon is slightly positive because it is bonded to two oxygen atoms. The hydroxide bonds to it."],
          ["Cleavage", "The ester bond breaks, separating a fatty acid from the glycerol backbone. This happens to all three fatty acids on each triglyceride. Glycerol, with three –OH groups, is released."],
          ["Salt formation", "Each fatty acid, now carrying a negative charge on its carboxylate group, pairs with a sodium ion. The result is a sodium carboxylate, a soap molecule with a long oily tail and a charged head."],
        ],
        "In properly made soap, all the lye is used up, so none remains in the finished bar. Soapmakers add a little extra fat, called superfatting, to make sure no harsh lye is left over.",
        "C3H5(OOCR)3 + 3 NaOH → C3H5(OH)3 + 3 RCOONa",
      ),
      rxn(
        "Neutralization",
        "Neutralization is the reaction between an acid and a base, producing water and a salt. When sodium hydroxide is used in cosmetics, tiny amounts are added to raise the pH of a formula that would otherwise be too acidic. The sodium hydroxide reacts completely with the acid in the formula, so no free lye remains. That is why seeing sodium hydroxide on a lotion label is no cause for concern. The finished product contains only the resulting harmless salt.",
        [
          ["Mixing", "A small, carefully measured amount of sodium hydroxide, usually as a dilute solution, is added to a formula containing acidic ingredients such as fatty acids or certain thickeners. The amount is calculated to hit a target pH."],
          ["Reaction", "Hydroxide ions (OH⁻) from the sodium hydroxide combine with hydrogen ions (H⁺) from the acidic ingredients to form water. Removing free hydrogen ions raises the formula's pH."],
          ["Result", "The sodium ions pair with the negatively charged parts of the acidic ingredients, forming salts. The formula's pH rises to its target, often about 5 to 7 for skincare, close to the skin's own pH."],
        ],
        "When you see sodium hydroxide on a lotion label, it has already been neutralized into a salt. Many thickeners, such as carbomers, only thicken once they have been neutralized, so sodium hydroxide is essential to how they work.",
        "NaOH + HCl → NaCl + H2O",
      ),
    ],
    hazards: [
      hz(
        "Severe chemical burns",
        "Concentrated sodium hydroxide, found in drain openers and oven cleaners, is one of the most dangerous household chemicals. Drain openers can contain 30 to 50 percent lye. Contact with skin or eyes can cause severe chemical burns that may not hurt at first but deepen over time. Gloves and eye protection are essential when using these products. If contact happens, rinse immediately with large amounts of water.",
        "Concentrated sodium hydroxide attacks the fats in cell membranes by saponification and denatures proteins, breaking down tissue on contact. Dissolving in water, including the moisture on skin, releases a lot of heat, which can add a heat burn to the chemical burn. Because alkalis liquefy tissue instead of forming a protective crust, the chemical keeps penetrating. The longer it stays in contact, the deeper the damage. Even dilute solutions can harm the eyes.",
        "Lye burns may feel slippery and hurt surprisingly little at first, because the chemical damages nerve endings, which leads people to underestimate the injury. Over minutes to hours, the burn deepens, with redness, blistering and tissue death. In the eyes, lye can badly damage the cornea and inner eye within seconds, causing permanent vision loss. First aid means rinsing with large amounts of water for at least 15 to 30 minutes and getting emergency care. Never try to neutralize a lye burn with acid, because that reaction produces even more heat.",
      ),
      hz(
        "Swallowing (a danger to children)",
        "Swallowing lye-containing products is a serious danger, especially for young children who may mistake them for drinks. Drain cleaners and some dishwasher detergents contain sodium hydroxide. Swallowing them can cause severe burns to the mouth, throat and esophagus. Children under five are most at risk. Keeping these products out of reach, in their original containers with child-resistant caps, prevents most accidents.",
        "When concentrated sodium hydroxide is swallowed, it immediately attacks the tissues of the mouth, throat and esophagus. It saponifies the fats in cell membranes and denatures proteins, liquefying the tissue, and the heat released as it dissolves adds to the damage. Because the esophagus is narrow and the chemical stays in contact with its walls, burns there are often the worst. Liquid products are especially dangerous because they go down before the person can react.",
        "Swallowing lye causes immediate pain, drooling, vomiting and difficulty swallowing, though symptoms are sometimes delayed. The burns can perforate the esophagus or stomach, which is a medical emergency. As the burns heal, scar tissue can narrow the esophagus, a condition called a stricture, making swallowing difficult for life and sometimes requiring repeated surgery. People who have had lye burns also face a higher risk of esophageal cancer years later. Never induce vomiting; call poison control or emergency services immediately.",
      ),
    ],
    dosage:
      "Drain openers can contain 30 to 50 percent sodium hydroxide, and oven cleaners also contain significant amounts; these need gloves, eye protection and good ventilation, and must be stored out of children's reach. In cosmetics, sodium hydroxide is used in tiny amounts to adjust pH and is completely neutralized, so no free lye remains. Soap is made with lye, but properly made soap contains none. Food processing uses it in small, controlled amounts, for example to give pretzels their deep brown crust and to cure olives.",
    synthesis: [
      route(
        "Chlor-alkali electrolysis",
        "Almost all sodium hydroxide is made by the chlor-alkali process, which uses electricity to split concentrated salt water. It produces three valuable chemicals at once: sodium hydroxide, chlorine gas and hydrogen gas. Tens of millions of tonnes of sodium hydroxide are made this way every year. It goes into paper, aluminum, soap, textiles and many other chemicals. The process uses a great deal of electricity.",
        "Concentrated, purified salt water, called brine, flows into an electrolysis cell divided by a special membrane that lets positive ions through but blocks negative ones. At the positive electrode, the anode, chloride ions lose electrons and form chlorine gas. At the negative electrode, the cathode, water molecules gain electrons, forming hydrogen gas and hydroxide ions. Sodium ions pass through the membrane from the anode side to the cathode side, where they pair with the hydroxide ions. The resulting sodium hydroxide solution is concentrated by evaporation and can be dried into solid pellets or flakes.",
        { equation: "2 NaCl + 2 H2O → 2 NaOH + H2 + Cl2", significance: "Modern membrane cells replaced older mercury cells, which released toxic mercury into the environment." },
      ),
      route(
        "Historical lye",
        "Before modern chemistry, people made their own lye for soap from wood ashes. This homemade lye was mostly potassium hydroxide, a close relative of sodium hydroxide that is also a strong base. Soap made with potassium hydroxide tends to be soft, while soap made with sodium hydroxide is hard. The process was simple but took time and skill. Soap made from fat and wood-ash lye has been produced for thousands of years.",
        "Wood ash contains potassium carbonate, sometimes called potash, which is left behind when wood burns. Soapmakers packed ashes into a barrel with straw at the bottom and slowly dripped water through them, dissolving the potassium carbonate and collecting the liquid at the bottom. To strengthen it, they added slaked lime, calcium hydroxide, made by heating limestone and adding water. The calcium hydroxide reacted with the potassium carbonate, forming solid calcium carbonate that settled out and leaving potassium hydroxide in solution. This strong lye was then boiled with animal fat to make soap.",
        { significance: "Soap has been made from fat and ash-derived lye for thousands of years." },
      ),
    ],
  },

  "hydrogen-peroxide": {
    overview: [
      "Hydrogen peroxide (H₂O₂) is water with an extra oxygen: two hydrogens attached to an oxygen–oxygen single bond. That O–O bond is weak, so the molecule readily breaks apart, releasing oxygen and making H₂O₂ a strong oxidizer.",
      "Household bottles contain 3% in water, kept slightly acidic and in dark plastic because light and metals speed its breakdown. Your own cells make small amounts of it, both as a weapon against bacteria and as a signaling molecule.",
    ],
    mechanisms: [
      mech(
        "Oxidative killing",
        "Hydrogen peroxide (H₂O₂) has a weak oxygen–oxygen single bond that breaks easily. That makes it a strong oxidizing agent: it readily takes electrons from other molecules. It can oxidize the fats in cell membranes, the amino acids in proteins and the bases in DNA. When metal ions such as iron or copper are present, hydrogen peroxide forms hydroxyl radicals (•OH), which are even more reactive and attack almost any molecule they touch. Together, these reactions cause widespread damage to a microbe's structures.",
        "With their membranes, proteins and DNA damaged, bacteria, viruses and fungi can no longer survive or reproduce. That makes hydrogen peroxide an effective disinfectant for surfaces, medical equipment and contact lenses. A big advantage is that it breaks down into nothing but water and oxygen, leaving no harmful residue. Some bacteria make an enzyme called catalase that destroys hydrogen peroxide, giving them some resistance, so higher concentrations or longer contact may be needed. Hydrogen peroxide vapor is used to sterilize entire hospital rooms.",
        "established",
      ),
      mech(
        "Bleaching",
        "The colored molecules in stains, hair and teeth, called chromophores, contain conjugated systems, chains of alternating single and double bonds that absorb visible light. Hydrogen peroxide oxidizes these chromophores, breaking up the conjugated chains by adding oxygen atoms or breaking double bonds. In hair, the pigment is melanin, a large molecule with many conjugated rings. Peroxide, especially when boosted by an alkaline ingredient such as ammonia, breaks melanin into smaller, colorless pieces. With shorter conjugated systems, the molecules no longer absorb visible light.",
        "When chromophores are broken down, stains on fabric become invisible and hair becomes lighter as its melanin is destroyed. Hair bleaches often contain 6 to 12 percent hydrogen peroxide combined with an alkaline booster. Teeth-whitening products use hydrogen peroxide, or carbamide peroxide, which releases it, to oxidize stain molecules inside the enamel. Overuse can make teeth temporarily sensitive and irritate the gums. Bleaching also damages hair proteins, which is why bleached hair becomes more brittle.",
        "established",
      ),
      mech(
        "Cell signaling",
        "Inside cells, hydrogen peroxide is made in small amounts as a normal part of metabolism. At these low concentrations, it can act as a messenger. It reacts with particular cysteine amino acids in certain proteins, oxidizing their thiol groups (–SH). That changes the protein's shape and activity, switching it on or off. Enzymes such as catalase and peroxiredoxins quickly mop up any excess to keep levels under control.",
        "This signaling helps regulate many processes, including cell growth, division and responses to stress. When tissue is wounded, cells release hydrogen peroxide as a signal that draws immune cells to the injury, a discovery first made in zebrafish. The body keeps hydrogen peroxide in careful balance: too little disrupts signaling, while too much causes oxidative damage. That double role, messenger and potential poison, shows how the same molecule can help or harm depending on the amount. Scientists are still discovering new roles for it.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Decomposition (the fizz)",
        "When you pour hydrogen peroxide on a cut, it fizzes and foams. That happens because an enzyme in blood and tissue, called catalase, rapidly breaks hydrogen peroxide down into water and oxygen gas. Hydrogen peroxide also breaks down slowly on its own, especially when exposed to light, heat or metals. That is why it is sold in dark bottles. The foaming isn't a sign that germs are being killed, only that catalase is present.",
        [
          ["Catalyst", "Catalase is an enzyme found in nearly every living cell, including blood cells and bacteria, and its job is to protect cells from hydrogen peroxide. When hydrogen peroxide touches tissue, catalase grabs it in its active site, which contains an iron atom."],
          ["Splitting", "Catalase converts two hydrogen peroxide molecules into two water molecules and one oxygen molecule. The iron in the enzyme helps by accepting and passing on oxygen atoms. The enzyme itself is unchanged and ready for more."],
          ["Foam", "The released oxygen gas forms tiny bubbles. Because catalase works so fast, a lot of oxygen is released in a short time, creating the visible foam."],
        ],
        "Catalase is one of the fastest enzymes known, processing millions of hydrogen peroxide molecules per second. The foaming on a cut comes mostly from catalase in your own cells, not from bacteria being killed.",
        "2 H2O2 → 2 H2O + O2",
      ),
      rxn(
        "The Fenton reaction",
        "The Fenton reaction, discovered by the British chemist Henry Fenton in the 1890s, happens when hydrogen peroxide meets iron ions. It produces hydroxyl radicals, among the most reactive molecules known. The reaction matters in biology, where it can cause damage inside cells, and in industry, where it is used to destroy pollutants. It shows how a relatively mild chemical can become far more powerful in the presence of a catalyst. Here, iron is the trigger.",
        [
          ["Electron transfer", "Ferrous iron (Fe²⁺) gives one of its electrons to a hydrogen peroxide molecule and becomes ferric iron (Fe³⁺). The hydrogen peroxide now has an extra electron, which destabilizes it."],
          ["Bond breaking", "The extra electron makes the weak oxygen–oxygen bond snap. One oxygen becomes a hydroxide ion (OH⁻), and the other becomes a hydroxyl radical (•OH) with an unpaired electron. The radical is extremely reactive."],
          ["Damage", "Hydroxyl radicals react with almost any molecule they meet within nanoseconds, including fats, proteins and DNA. They steal electrons and set off chain reactions of damage. They react so quickly that they can't travel far from where they form."],
        ],
        "This is why cells keep free iron tightly locked up inside proteins such as ferritin, and why peroxide plus iron is used to destroy pollutants in wastewater. The iron can be recycled back to Fe²⁺, keeping the reaction going.",
        "Fe2+ + H2O2 → Fe3+ + OH- + •OH",
      ),
    ],
    hazards: [
      hz(
        "Tissue damage at high concentration",
        "The 3 percent hydrogen peroxide sold in drugstores is a mild irritant, but stronger solutions are dangerous. Concentrations of 35 percent, sometimes marketed as “food grade,” have caused serious injuries and deaths when swallowed, often by people who believed false health claims. Even the 10 to 12 percent solutions used for hair bleaching can burn skin. The danger rises steeply with concentration. High-strength peroxide must be handled with gloves and eye protection.",
        "Concentrated hydrogen peroxide is a powerful oxidizer that rapidly damages the proteins and fats in skin and other tissues. When it meets tissue, catalase breaks it down quickly, releasing large volumes of oxygen gas: one milliliter of 35 percent hydrogen peroxide can release more than 100 milliliters of oxygen. In a confined space like the stomach or a blood vessel, that sudden release of gas is dangerous. The heat released adds to the tissue damage. The stronger the solution, the faster and more violent this becomes.",
        "On skin, concentrated hydrogen peroxide causes white patches, stinging and blisters, and in the eyes it can cause serious injury. When swallowed, it burns the mouth, throat and stomach, and the released oxygen can swell the stomach painfully. Oxygen bubbles can also enter blood vessels, forming gas embolisms that block blood flow to the brain, heart or other organs and cause strokes or heart attacks. There is no health benefit to drinking hydrogen peroxide. Anyone who swallows concentrated peroxide needs emergency care.",
      ),
      hz(
        "Slower wound healing",
        "Many people were taught to clean cuts with hydrogen peroxide, but doctors now advise against it. While it does kill some bacteria, it also damages the healthy cells needed for healing. Studies have found that it can slow wound healing. Rinsing a minor cut with clean running water and mild soap is better. Medical professionals still use peroxide in specific situations, such as cleaning heavily contaminated wounds.",
        "Hydrogen peroxide doesn't tell bacteria and human cells apart: it oxidizes the membranes, proteins and DNA of every cell it touches. Fibroblasts, which make collagen to rebuild tissue, and keratinocytes, which regrow the skin's surface, are particularly sensitive to it. The foaming caused by catalase may also physically disturb newly forming tissue. At the concentrations used on wounds, it can kill more healthy cells than bacteria. This is a case of a disinfectant being too harsh for the job.",
        "When healthy cells in a wound are damaged, healing slows because fewer cells are left to rebuild the tissue. Studies in animals and in cell cultures have shown that hydrogen peroxide can delay wound healing. It also doesn't kill all bacteria, since some produce catalase. For minor cuts and scrapes, rinsing with clean water removes dirt and most bacteria without harming healthy tissue. Covering the wound and keeping it clean helps it heal.",
      ),
    ],
    dosage:
      "Drugstore hydrogen peroxide is 3 percent, a mild irritant that is fine for surface disinfection and some household uses. Hair bleaching products typically use 6 to 12 percent, and teeth-whitening products sold directly to consumers in the European Union are limited to 0.1 percent, with stronger treatments only through dentists. Concentrations of 35 percent, sometimes sold as “food grade,” are dangerous and have caused severe injuries and deaths when swallowed. Never drink hydrogen peroxide, and keep it out of children's reach. Store it in its original dark bottle, away from heat.",
    synthesis: [
      route(
        "The anthraquinone process",
        "Almost all hydrogen peroxide made today comes from the anthraquinone process, developed by German chemists in the 1930s. It is a clever catalytic cycle that combines hydrogen and oxygen indirectly. A carrier molecule, 2-ethylanthraquinone, picks up hydrogen and then hands it over to oxygen. Because the carrier is recycled, the overall reaction simply joins hydrogen and oxygen. Millions of tonnes are made every year, mainly for bleaching paper and textiles.",
        "First, 2-ethylanthraquinone, dissolved in an organic solvent, is mixed with hydrogen gas over a palladium catalyst. Hydrogen atoms add to the molecule, turning it into 2-ethylanthrahydroquinone. Next, air is bubbled through the solution, and oxygen takes those hydrogen atoms from the hydroquinone. This forms hydrogen peroxide and turns the carrier back into 2-ethylanthraquinone. The hydrogen peroxide is extracted with water, purified and concentrated, while the anthraquinone solution goes back to the start.",
        { equation: "H2 + O2 → H2O2", significance: "The carrier molecule is recycled endlessly, so the net reaction is simply hydrogen plus oxygen." },
      ),
      route(
        "Biological production",
        "Hydrogen peroxide isn't just an industrial chemical; your body makes it constantly. It is a natural byproduct of breathing oxygen and making energy inside cells. Immune cells also make it on purpose to fight infection. Because it can be harmful in large amounts, cells have enzymes that break it down quickly. Many other organisms, from bacteria to plants, also make and use hydrogen peroxide.",
        "When cells use oxygen to make energy in their mitochondria, a small share of oxygen molecules accidentally pick up a single extra electron, forming superoxide radicals (O₂•⁻). These are dangerous, so an enzyme called superoxide dismutase quickly converts pairs of superoxide radicals into oxygen and hydrogen peroxide. The hydrogen peroxide is then broken down by catalase into water and oxygen, or used by enzymes called peroxidases to oxidize other molecules. Some enzymes, called oxidases, make hydrogen peroxide directly when they react with oxygen. Immune cells use an enzyme called NADPH oxidase to make large amounts of it to kill bacteria.",
        { significance: "Honey's antibacterial activity comes partly from an enzyme that slowly generates hydrogen peroxide." },
      ),
    ],
  },

  "benzalkonium-chloride": {
    overview: [
      "Benzalkonium chloride (BAC) is a mixture of quaternary ammonium compounds, or “quats”. Each has a nitrogen atom bonded to four carbon groups (two methyls, a benzyl ring and a long 12–16-carbon tail), giving it a permanent positive charge, balanced by a chloride ion.",
      "A positively charged head with a long oily tail makes BAC a cationic surfactant. Bacterial membranes are negatively charged, so BAC is drawn to them and breaks them open, which is why it's in disinfecting wipes, sprays and some eye drops.",
    ],
    mechanisms: [
      mech(
        "Breaking bacterial membranes",
        "Benzalkonium chloride molecules have a positively charged nitrogen head and a long oily tail. The outer surfaces of bacteria are covered with negatively charged molecules, such as phospholipids and proteins, so BAC's positive heads are drawn to them like magnets. Once attached, the oily tails push into the bacterial membrane, which is made of two layers of fatty molecules. This disrupts the membrane's orderly arrangement, opening gaps and holes. Many BAC molecules working together can break the membrane apart.",
        "Once the membrane is damaged, important contents of the cell, such as potassium ions and small molecules, leak out, and the cell can no longer keep its internal environment stable. The bacterium dies. BAC also works against enveloped viruses, such as influenza and coronaviruses, whose fatty outer layer it can disrupt. It is less effective against non-enveloped viruses such as norovirus, which lack that fatty layer. That is why BAC disinfectants work on some germs but not all.",
        "established",
      ),
      mech(
        "Selecting for resistance",
        "When bacteria are exposed to BAC at concentrations too low to kill them, called sub-lethal levels, some survive better than others. The survivors often have efflux pumps, proteins in their membranes that actively pump BAC back out before it can do damage. Bacteria can also change the makeup of their membranes to make them less vulnerable. Repeated exposure favors these tougher bacteria, which then multiply. Genes for some efflux pumps can even be passed between bacteria.",
        "Some of the efflux pumps that remove BAC can also pump out certain antibiotics, so bacteria that become resistant to BAC may also become less sensitive to those antibiotics. This is called cross-resistance. Laboratory studies have shown it can happen, raising concern that overusing quaternary ammonium disinfectants could add to antimicrobial resistance, a major global health threat. Using disinfectants at the correct concentration and contact time, and only when needed, helps reduce the risk. How much this happens outside the lab is still being studied.",
        "lab",
      ),
      mech(
        "Damage to the eye's surface",
        "BAC is used as a preservative in many eye drops, at low concentrations of about 0.004 to 0.02 percent. It doesn't only attack bacterial membranes, though; it can also disrupt the membranes of human cells, which are made of lipids too. The cells on the surface of the cornea and conjunctiva are directly exposed to eye drops. BAC can also disturb the tear film, the protective layer of fluid covering the eye. These effects are stronger with frequent or long-term use.",
        "With repeated use, especially in people who use eye drops daily for years, for example to treat glaucoma, BAC can damage the cells on the surface of the eye. This can cause dryness, redness, burning, a gritty feeling and inflammation, sometimes called ocular surface disease, and can make eyes more sensitive. For this reason, preservative-free drops, packaged in single-use vials or special bottles, are recommended for people who need drops often. Occasional use of preserved drops is generally safe. An eye doctor can advise which type suits a given condition.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "The Menshutkin reaction (how it's made)",
        "Benzalkonium chloride is made using the Menshutkin reaction, described by the Russian chemist Nikolai Menshutkin in 1890. It converts a neutral amine, a nitrogen atom bonded to three carbon groups, into a quaternary ammonium salt with four carbon groups and a permanent positive charge. It is a type of nucleophilic substitution reaction. The reaction is simple and efficient. It is used to make many quaternary ammonium compounds, known as quats.",
        [
          ["Nucleophile", "A long-chain alkyldimethylamine has a nitrogen atom bonded to two methyl groups and a long oily chain. The nitrogen also carries a lone pair, two electrons not involved in bonding. That makes it a nucleophile, a molecule that seeks out electron-poor atoms."],
          ["Attack", "The nitrogen's lone pair attacks the carbon atom in benzyl chloride that is bonded to chlorine. That carbon is electron-poor because chlorine pulls electrons toward itself. As the new nitrogen–carbon bond forms, the chlorine leaves as a chloride ion."],
          ["Quaternary salt", "The nitrogen is now bonded to four carbon groups: two methyls, a benzyl group and the long chain. Having used its lone pair, it carries a permanent positive charge, balanced by the chloride ion."],
        ],
        "Quaternary ammonium salts stay charged at any pH, unlike ordinary amines, which can gain or lose a proton. That permanent charge is what lets them cling to negatively charged surfaces, bacteria included, and it is also why quats are used in fabric softeners and hair conditioners.",
        "R-N(CH3)2 + C6H5CH2Cl → [R-N(CH3)2CH2C6H5]+ Cl-",
      ),
    ],
    hazards: [
      hz(
        "Skin and eye irritation",
        "Benzalkonium chloride is safe at the low concentrations used in wipes and sprays, but concentrated solutions can be corrosive to skin and eyes. Even at low concentrations, frequent use can irritate the skin, especially on the hands. Occasionally BAC causes allergic contact dermatitis. People who use disinfectant wipes many times a day, such as healthcare and cleaning workers, are most likely to notice irritation. Gloves and moisturizer help protect the skin.",
        "BAC damages cell membranes by pushing its oily tail into their lipid layers and binding its positive head to negatively charged molecules. That isn't specific to bacteria; it also affects the cells of human skin and eyes. At high concentrations it can damage the skin's outer barrier and the cells beneath it. It can also strip protective lipids from the skin's surface. In a few people it acts as an allergen, though that is less common.",
        "Irritation shows up as redness, dryness, itching and sometimes cracking, particularly on the hands of frequent users. In the eyes, concentrated BAC can cause serious damage, so splashes must be rinsed immediately. Rarely, people develop an allergy to BAC, with an itchy rash wherever it touches. Disinfectant wipes can leave a residue on the hands, so washing hands after use helps. Gloves are recommended for prolonged use.",
      ),
      hz(
        "Work-related asthma",
        "Studies have linked frequent use of quaternary ammonium compounds, BAC included, to asthma in people who use them regularly at work, such as cleaners and healthcare workers. The risk appears higher with sprays, which produce fine droplets that can be breathed in. Some studies have found more asthma symptoms and new cases of asthma among these workers. The evidence is still developing. Using wipes instead of sprays and keeping rooms well ventilated may reduce the risk.",
        "When BAC is sprayed, it forms tiny droplets, an aerosol, that can be breathed into the airways. Because BAC disrupts cell membranes, it can damage the cells lining the airways. It may also trigger inflammatory responses or act as an allergen in some people. Repeated exposure over time causes ongoing irritation. The exact mechanisms are still being studied.",
        "Repeated irritation and inflammation can make the airways more sensitive and more likely to narrow, producing asthma symptoms such as wheezing, coughing and shortness of breath. In some workers, quats seem to trigger an allergy-type asthma. Studies of healthcare workers have found that regular use of quat disinfectants is associated with asthma. People who already have asthma may find their symptoms get worse. Workplaces can cut exposure by choosing non-spray products and improving ventilation.",
      ),
    ],
    dosage:
      "Disinfecting wipes and sprays typically contain about 0.1 to 0.3 percent benzalkonium chloride, antiseptic hand products about 0.1 to 0.13 percent, and eye drops much less, about 0.004 to 0.02 percent. Use disinfectants as the label directs, including the contact time, the time a surface must stay wet for the germs to be killed. Concentrated solutions require gloves and eye protection. People who use eye drops frequently may benefit from preservative-free versions. Using disinfectants only when they are needed helps limit resistance.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Benzalkonium chloride is made in chemical plants from fatty amines, which are derived from fatty alcohols that come from coconut or palm oil or from petroleum. It was introduced in 1935 by the German scientist Gerhard Domagk, who later won a Nobel Prize for discovering the first sulfa antibiotics. Since then it has become one of the most widely used disinfectants and preservatives. It is found in disinfectant wipes, sprays, hand sanitizers, eye drops and some cosmetics. Its use rose sharply during the COVID-19 pandemic.",
        "Fatty alcohols with 12 to 16 carbon atoms are first converted into alkyldimethylamines by reacting them with dimethylamine, a small nitrogen-containing molecule. These amines are then mixed with benzyl chloride, which contains a reactive carbon–chlorine bond. In the Menshutkin reaction, each amine's nitrogen attacks the carbon of benzyl chloride, forming a new bond and pushing out a chloride ion. This produces a mixture of quaternary ammonium chlorides with different chain lengths, which together make up benzalkonium chloride. The product is diluted with water into a stable solution.",
        { significance: "Because the product is a mixture of chain lengths, its germ-killing strength depends on the blend; the 12- and 14-carbon chains are usually the most effective." },
      ),
    ],
  },

  "sodium-carbonate": {
    overview: [
      "Sodium carbonate (Na₂CO₃), known as washing soda or soda ash, is the salt of carbonic acid with two sodium ions. The carbonate ion pulls protons from water, producing hydroxide ions, so its solutions are strongly alkaline (about pH 11.5 at 1%).",
      "That alkalinity helps break down greasy soils, and carbonate ions grab calcium and magnesium from hard water, precipitating them so detergents can work. It's one of the oldest industrial chemicals and, together with sand, the main ingredient of glass.",
    ],
    mechanisms: [
      mech(
        "Softening hard water",
        "Hard water contains dissolved calcium ions (Ca²⁺) and magnesium ions (Mg²⁺), picked up from rocks such as limestone and dolomite that the water flowed through. Sodium carbonate dissolves into sodium ions and carbonate ions (CO₃²⁻). The carbonate ions combine with the calcium and magnesium ions to form calcium carbonate and magnesium carbonate. These compounds are insoluble, meaning they don't dissolve in water. So they come out of solution as tiny solid particles, a process called precipitation.",
        "Calcium and magnesium ions interfere with soaps and detergents, reacting with them to form insoluble scum: the gray film on bathtubs and the dullness on washed clothes. That wastes detergent and leaves residue behind. By removing these ions, sodium carbonate lets soaps and detergents lather better and clean more effectively. That is why washing soda is added to laundry as a booster, especially where the water is hard. The tiny calcium carbonate particles simply rinse away with the wash water.",
        "established",
      ),
      mech(
        "Alkaline cleaning",
        "When sodium carbonate dissolves in water, carbonate ions take hydrogen ions from water molecules, producing hydroxide ions (OH⁻). This makes the solution strongly alkaline, about pH 11.5 for a 1 percent solution. At that pH, hydroxide ions can partly break down fats by saponification, turning them into soap-like molecules. The alkaline conditions also help dissolve acidic stains and loosen proteins. Sodium carbonate is milder than sodium hydroxide but still effective.",
        "The high pH helps lift grease off fabrics, dishes and surfaces so it rinses away more easily. That makes washing soda useful for heavily soiled laundry, greasy pans and stained surfaces. It also neutralizes acidic odors. Because it is much less caustic than lye, it is safer to use at home, though it still deserves care. It is often recommended as an environmentally friendlier cleaning ingredient because it contains no phosphates.",
        "established",
      ),
      mech(
        "Irritation",
        "Healthy skin has a slightly acidic surface, with a pH of about 4.5 to 5.5, protected by a so-called acid mantle of natural oils and acids. Sodium carbonate solutions are strongly alkaline. When they touch skin, they disturb this acid mantle and start breaking down skin oils by saponification. They can also loosen the proteins of the skin's outer layer. The eyes have no protective dead-cell layer at all, so alkaline solutions can damage their surface cells directly.",
        "On skin, concentrated sodium carbonate can cause dryness, redness and irritation, especially with prolonged contact or repeated use. Hands may feel slippery as skin oils are turned into soap. In the eyes, splashes cause pain and redness and can do serious damage, so they must be rinsed immediately. Breathing in the powder can irritate the nose and throat. Wearing gloves and keeping it away from the eyes minimizes these risks.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Making water alkaline",
        "Sodium carbonate makes water alkaline through a reaction called hydrolysis, in which carbonate ions react with water. Carbonate is the partner base of a weak acid, bicarbonate, so it has a strong tendency to take hydrogen ions from water. That leaves behind hydroxide ions, which raise the pH. This reaction is why washing soda is an effective cleaner. It is also why it should be handled with some care.",
        [
          ["Proton grab", "When sodium carbonate dissolves, it separates into sodium ions and carbonate ions (CO₃²⁻). Carbonate ions are drawn to the hydrogen atoms of water molecules. Each carbonate ion can take one hydrogen ion (H⁺) from a water molecule."],
          ["Hydroxide", "A water molecule that loses a hydrogen ion becomes a hydroxide ion (OH⁻), while the carbonate becomes bicarbonate (HCO₃⁻). The solution now has more hydroxide ions than hydrogen ions."],
          ["pH rises", "The extra hydroxide ions make the solution alkaline; a 1 percent solution reaches a pH of about 11.5. That is far more alkaline than baking soda, which gives a pH of about 8.3."],
        ],
        "This is why washing soda feels slippery: it begins to saponify the oils on your skin, turning them into soap. It is also why washing soda cleans more strongly than baking soda, though it is harsher on skin.",
        "CO3^2- + H2O ⇌ HCO3- + OH-",
      ),
      rxn(
        "Glassmaking",
        "Most of the world's sodium carbonate goes into making glass. Pure sand, made of silicon dioxide, melts at about 1,700 °C, a temperature that is very hot and expensive to reach. Adding sodium carbonate lowers the melting temperature a lot. That makes glassmaking practical and affordable. Glassmakers have used soda ash this way for thousands of years.",
        [
          ["Mixing", "Sand (silica, SiO₂), soda ash (sodium carbonate) and limestone (calcium carbonate) are mixed together, often with recycled glass called cullet. The exact recipe determines the properties of the finished glass."],
          ["Melting", "The mixture is heated in a furnace to about 1,500 °C. At this temperature, sodium carbonate reacts with silica, releasing carbon dioxide gas and forming sodium silicate. The gas bubbles out of the melt."],
          ["Glass", "The sodium ions break up silica's strong network of silicon–oxygen bonds, lowering its melting point and making it easier to work. Calcium from the limestone makes the glass more durable and water-resistant. The molten glass is shaped and cooled."],
        ],
        "Most window and bottle glass is “soda-lime” glass made this way. Without the lime, sodium silicate glass would slowly dissolve in water; that dissolvable form is actually sold separately as “water glass.”",
        "Na2CO3 + SiO2 → Na2SiO3 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Eye and skin irritation",
        "Sodium carbonate is far safer than sodium hydroxide, but it is still an alkaline chemical that can irritate skin and seriously irritate eyes. Washing soda powder and concentrated solutions are the main concern. Most problems come from splashes in the eyes or prolonged skin contact. Gloves for heavy cleaning and keeping it away from children prevent most accidents. It should never be swallowed.",
        "In solution, sodium carbonate produces hydroxide ions, making it strongly alkaline. At high pH, hydroxide ions break down the fats in cell membranes and loosen the proteins of the skin's outer layer. In the eye, which lacks skin's protective dead-cell layer, these reactions quickly damage the surface cells of the cornea. The powder can also pull moisture out of skin and eyes, concentrating its alkaline effect. The higher the concentration, the greater the damage.",
        "Skin contact can cause dryness, redness and irritation, especially for people with sensitive skin or eczema. Eye splashes cause stinging, redness and tearing and can damage the cornea if not rinsed promptly; rinse with clean water for at least 15 minutes and get medical advice. Swallowing washing soda irritates the mouth, throat and stomach, causing pain and vomiting. Keeping laundry products in their original containers and out of children's reach prevents accidents. Store the powder dry and sealed.",
      ),
    ],
    dosage:
      "Laundry products and washing-soda boosters can contain 10 to 40 percent sodium carbonate or be nearly pure washing soda, and typical use is a few tablespoons per load. It is classified as an eye irritant, so gloves for heavy use and care around the eyes are advised. In food, small amounts are used as an acidity regulator, for example in ramen noodles, where alkaline salts give them their springy texture. Unlike phosphates, it doesn't feed algae blooms in waterways. It should be kept away from young children.",
    synthesis: [
      route(
        "The Solvay process",
        "The Solvay process, developed by the Belgian chemist Ernest Solvay in the 1860s, is a major way to make sodium carbonate. It uses inexpensive raw materials: salt, limestone and ammonia, which is recycled. The process first makes sodium bicarbonate, which is then heated to give sodium carbonate. It replaced the older Leblanc process, which produced huge amounts of toxic waste. It is still widely used in many countries.",
        "Limestone (calcium carbonate) is heated to release carbon dioxide and form lime (calcium oxide). Concentrated salt water is saturated with ammonia gas, and the carbon dioxide is bubbled through it. Sodium bicarbonate, the least soluble product, crystallizes out and is filtered off. It is then heated to about 200 °C, which drives off water and carbon dioxide and leaves sodium carbonate. The leftover ammonium chloride is treated with the lime to recover the ammonia for reuse, producing calcium chloride as a byproduct.",
        { equation: "2 NaHCO3 → Na2CO3 + H2O + CO2", significance: "The process's main waste, calcium chloride, is sold for road de-icing and dust control, so even its byproduct is useful." },
      ),
      route(
        "Mining trona",
        "In the United States, sodium carbonate is mostly produced from natural trona ore rather than by the Solvay process. The world's largest trona deposit lies in Wyoming's Green River Basin, left by an ancient lake that dried up about 50 million years ago. Mining trona uses less energy and produces less waste than the Solvay process. The U.S. is one of the world's largest producers and exporters of soda ash. Natural deposits are also found in Turkey, Kenya and elsewhere.",
        "Trona, a natural mineral containing both sodium carbonate and sodium bicarbonate, is mined from deep underground beds. The ore is crushed and heated in a kiln, a step called calcination, which converts the sodium bicarbonate into sodium carbonate and releases water and carbon dioxide. The crude soda ash is dissolved in water, and insoluble rock and clay are filtered out. The purified solution is evaporated so that sodium carbonate crystals form. These are dried and heated again to give pure, water-free soda ash.",
        { significance: "Ancient Egyptians used natron, a natural sodium carbonate mixture, to mummify the dead." },
      ),
    ],
  },
};
