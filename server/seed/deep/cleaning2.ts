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
        "Proteins only work when they are folded into precise three-dimensional shapes. Those shapes are held in place by weak attractions such as hydrogen bonds and hydrophobic interactions, where oily parts of the chain huddle together away from water. Ethanol is small enough to slip between the folded chains, and because it is partly oily and partly water-like, it competes with both kinds of attraction, loosening the protein until it unfolds. This is called denaturation. Ethanol also dissolves the fatty molecules that make up cell membranes and the outer envelope of some viruses. Surprisingly, 60 to 80 percent ethanol works better than pure ethanol, because water helps it soak into cells and is itself needed for proteins to unfold; pure ethanol also evaporates before it can finish the job.",
        "Most bacteria and enveloped viruses, those wrapped in a fatty outer layer, such as influenza and coronaviruses, are inactivated within seconds of contact with a properly made sanitizer. That is why health agencies recommend sanitizers with at least 60 percent alcohol when soap and water aren't available. Ethanol works poorly against norovirus, the stomach bug that spreads on cruise ships, because it has no fatty envelope to dissolve and a tough protein shell. It also can't kill bacterial spores, such as those of Clostridioides difficile, which have thick protective coats. Sanitizer doesn't remove dirt either, so washing with soap and water is still best for visibly dirty hands.",
        "established",
      ),
      mech(
        "Effects on the brain",
        "When someone drinks alcohol, ethanol is absorbed from the stomach and small intestine into the blood. Because it dissolves in both water and fat, it easily crosses into the brain. There it changes how nerve cells communicate by acting on receptors, proteins that respond to chemical messengers called neurotransmitters. Ethanol boosts the activity of GABA-A receptors, which respond to GABA, the brain's main “calm down” signal, letting more negatively charged chloride ions into nerve cells and making them less likely to fire. At the same time, it blocks NMDA receptors, which respond to glutamate, the brain's main “go” signal.",
        "With nerve signals slowed, a person who drinks first feels relaxed and less inhibited, then loses coordination, balance and judgment. At high blood levels they can become confused, vomit, pass out or stop breathing. Blocking NMDA receptors also disrupts the formation of new memories, which explains alcohol “blackouts.” The brain keeps developing until the mid-20s, especially the prefrontal cortex, which handles planning and self-control, and studies suggest the teenage brain is more vulnerable to alcohol's effects on learning and memory. Ethanol also triggers the release of dopamine in the brain's reward circuits, which is part of why drinking can become a habit.",
        "established",
      ),
      mech(
        "Drying skin",
        "The outermost layer of skin, the stratum corneum, works like a brick wall. Flattened dead cells are the bricks, and a mixture of fats, including ceramides, cholesterol and fatty acids, is the mortar. These fats keep water in and irritants out. Ethanol can dissolve some of these fats and carry them away as it evaporates, and its fast evaporation also briefly pulls water from the skin's surface. With repeated use, the “mortar” thins and the barrier becomes leaky.",
        "People who use hand sanitizer many times a day, such as nurses and doctors, can develop dry, rough, cracked hands. Interestingly, hospital studies have found that alcohol rubs containing moisturizers are often less irritating than frequent washing with soap and water, which strips skin fats too. That is why sanitizers add glycerin or other humectants, ingredients that attract and hold water in the skin. Cracked skin can harbor more bacteria and stings when sanitizer is applied, so using hand cream regularly helps. A true allergy to ethanol on the skin is rare.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Fermentation",
        "Fermentation is how yeasts, single-celled fungi, turn sugar into ethanol and carbon dioxide when they don't have enough oxygen. With plenty of oxygen, yeast would burn sugar completely, which releases far more energy. Without it, they use fermentation as a backup to keep making a small amount of energy. People have used this process for thousands of years to make bread, beer and wine, long before anyone understood the chemistry. In the 1850s and 60s, Louis Pasteur showed that living yeast cells are responsible.",
        [
          ["Glycolysis", "Inside the yeast cell, a series of ten enzyme-driven reactions splits each glucose molecule, which has six carbons, into two molecules of pyruvate, which has three. This releases a little energy that the cell stores as ATP, its energy currency. Along the way, a helper molecule called NAD⁺ picks up electrons and becomes NADH."],
          ["Decarboxylation", "An enzyme called pyruvate decarboxylase removes a carbon dioxide molecule from each pyruvate. That leaves acetaldehyde, a two-carbon molecule. The carbon dioxide escapes as gas bubbles."],
          ["Reduction", "An enzyme called alcohol dehydrogenase transfers electrons from NADH to acetaldehyde, turning it into ethanol. This regenerates NAD⁺. Without that recycling, glycolysis would stall, because the cell has only a limited supply of NAD⁺."],
        ],
        "The carbon dioxide makes bread dough rise and gives beer and sparkling wine their fizz; in bread, the ethanol bakes off. Most yeasts stop working when ethanol reaches about 12 to 15 percent, because it becomes toxic to them, which is why stronger spirits must be distilled.",
        "C6H12O6 → 2 C2H5OH + 2 CO2",
      ),
      rxn(
        "Metabolism in the liver",
        "When you drink alcohol, your body treats ethanol as a toxin and works to get rid of it, mainly in the liver. The liver breaks ethanol down in two steps, each controlled by a different enzyme. It can only process a limited amount per hour, roughly the alcohol in one standard drink or a little less, and nothing, not coffee or cold showers, speeds this up. The intermediate product, acetaldehyde, is more toxic than ethanol itself. How quickly a person clears it depends partly on their genes.",
        [
          ["Step 1", "Alcohol dehydrogenase, an enzyme in liver cells, removes two hydrogen atoms from ethanol, oxidizing it to acetaldehyde. The hydrogens are passed to NAD⁺, forming NADH. In people who drink heavily, another enzyme system, CYP2E1, takes on more of this work."],
          ["Step 2", "Aldehyde dehydrogenase, mainly a form called ALDH2 found in mitochondria, oxidizes acetaldehyde to acetic acid, the same acid found in vinegar. This step normally happens quickly, keeping acetaldehyde levels low."],
          ["Final", "The acetic acid is attached to a carrier molecule to form acetyl-CoA, which enters the same energy-producing pathways used for food. It ends up as carbon dioxide, which you breathe out, and water."],
        ],
        "Acetaldehyde is toxic and carcinogenic. Many people of East Asian descent carry a less active form of ALDH2, so acetaldehyde builds up and causes facial flushing, nausea and a racing heart after drinking, along with a higher risk of esophageal cancer if they drink regularly.",
        "C2H5OH → CH3CHO → CH3COOH",
      ),
    ],
    hazards: [
      hz(
        "Flammable",
        "Ethanol is highly flammable, which is why hand sanitizers, alcohol sprays and perfumes carry flame warnings. Its vapor can catch fire from a spark, a candle, a gas stove or even static electricity. Fires have happened when people used sanitizer and then went near a flame before it had fully dried. Large stocks, such as those kept in hospitals and schools, are covered by fire-safety rules. Store alcohol-based products away from heat and flames, and let sanitizer dry completely before going near any flame.",
        "A liquid's flash point is the lowest temperature at which it gives off enough vapor to form a mixture with air that can ignite. Pure ethanol's flash point is about 13 °C, below normal room temperature, so it is always releasing enough vapor to burn; a 70 percent solution's flash point is only slightly higher, at about 21 °C. When ethanol burns, it reacts with oxygen to form carbon dioxide and water, releasing a lot of heat. Its flame is pale blue and can be almost invisible in daylight. Ethanol vapor is also heavier than air, so it can pool low and drift toward a flame.",
        "The main danger from alcohol-based products isn't poisoning but burns from fire. Because the flame can be nearly invisible, a person may not realize their hands or clothes are burning until they feel pain. Burns from sanitizer fires have been reported, including in children who held sanitizer-covered hands near candles or stoves. Rubbing sanitizer in until the hands are completely dry, which takes about 20 seconds, lets the ethanol evaporate and removes the hazard. Spills should be wiped up and the area aired out before lighting anything.",
      ),
      hz(
        "Poisoning if swallowed",
        "Swallowing hand sanitizer is a real danger for young children, who may be drawn to fruity scents, bright colors or the gel's look. Most sanitizers contain 60 to 95 percent alcohol, far stronger than beer, wine or most spirits; a 70 percent sanitizer is nearly twice as strong as vodka. Even a small amount can give a toddler a dangerous blood alcohol level. Poison control centers receive many calls every year about children swallowing sanitizer. Store sanitizers out of reach and supervise young children who use them.",
        "Ethanol is absorbed quickly from the stomach and intestines into the blood, where it depresses the central nervous system, the brain and spinal cord, slowing breathing and reflexes. In the liver, breaking down ethanol uses up NAD⁺, a helper molecule the liver also needs to make new glucose, a process called gluconeogenesis. Young children have only small stores of glycogen, the stored form of sugar. So when their glucose production stalls, their blood sugar can fall dangerously low. And because their bodies are small, the same amount of alcohol produces a much higher blood level in a child than in an adult.",
        "A child who swallows sanitizer may become drowsy, unsteady and confused, may vomit, or may become difficult to wake. Low blood sugar can cause seizures, and very high alcohol levels can slow breathing dangerously. Symptoms usually appear within 30 minutes to an hour. Anyone who suspects a child has swallowed sanitizer should call a poison control center right away, even if the child seems fine. With prompt treatment, most children recover fully.",
      ),
      hz(
        "Alcoholic drinks and cancer",
        "Drinking alcoholic beverages is a well-established cause of several cancers, including cancers of the mouth, throat, esophagus, liver, colon and breast. The International Agency for Research on Cancer (IARC) classifies alcoholic beverages as a Group 1 carcinogen, its highest category, meaning there is strong evidence they cause cancer in humans. The risk rises with how much and how often a person drinks, and no level of drinking is known to be completely free of cancer risk. This concern applies to drinking alcohol. Using ethanol on the skin, in sanitizers or cosmetics, isn't linked to cancer.",
        "When the body breaks down ethanol, the first product is acetaldehyde, a reactive molecule. Acetaldehyde can bind directly to DNA, forming DNA adducts, chemical attachments that cause errors when the DNA is copied. It can also damage the proteins that repair DNA. Breaking down ethanol also creates reactive oxygen species that cause oxidative damage. In addition, alcohol raises estrogen levels, which helps explain its link to breast cancer, and it acts as a solvent that helps other carcinogens, such as those in tobacco smoke, get into the cells of the mouth and throat.",
        "Over years, DNA damage that isn't repaired can lead to mutations, changes in the genes that control cell growth. If enough mutations build up, cells may begin dividing uncontrollably and form a cancer. People who both drink and smoke face a much higher risk of mouth and throat cancers than people who do only one. Skin products are different: very little ethanol is absorbed through the skin, and it evaporates quickly, so it isn't linked to cancer. Drinking less lowers the risk over time.",
      ),
    ],
    dosage:
      "Hand sanitizers contain about 60 to 95 percent alcohol; health agencies recommend at least 60 percent for it to work, and a coin-sized amount rubbed in until dry is enough. In cosmetics, ethanol, often listed as “alcohol denat.”, is used as a solvent and to help products dry quickly. Using it on the skin is low risk, while swallowing sanitizer can poison a young child, so keep it out of reach. For drinking, health authorities advise that less is better, and most countries set a minimum legal drinking age partly because alcohol is especially harmful to the developing brain.",
    synthesis: [
      route(
        "Fermentation and distillation",
        "Fermentation is the oldest way of making ethanol, and it is still how alcoholic drinks and most fuel ethanol are made. The United States makes most of its fuel ethanol from corn, while Brazil uses sugar cane, and the ethanol is blended into gasoline. The sugar source varies: grapes for wine, barley for beer, and corn, wheat or potatoes for many spirits. Starchy grains first need their starch broken down into sugar by enzymes. Distillation is then used when a higher concentration is needed.",
        "Yeast ferment sugar from sugar cane, corn or grain mash into a weak alcohol solution, usually around 10 to 15 percent ethanol. In distillation, this mixture is heated. Ethanol boils at 78 °C, lower than water's 100 °C, so the vapor that rises is richer in ethanol than the liquid left behind. The vapor is cooled and condensed back into a liquid with more ethanol, and repeating this many times, usually in a tall column, concentrates it to about 95 percent. In fuel plants, the leftover grain solids are sold as animal feed.",
        { significance: "Ethanol and water form an azeotrope at about 95%, so ordinary distillation can't go higher. Fuel ethanol is dried the rest of the way with molecular sieves, materials with pores just the right size to trap water molecules." },
      ),
      route(
        "Hydration of ethylene",
        "Some industrial ethanol isn't made by yeast at all but from ethylene, a gas obtained from petroleum and natural gas. This synthetic ethanol is chemically identical to fermented ethanol. It is mainly used as an industrial solvent and for making other chemicals, not in drinks. Whether this route or fermentation is cheaper depends on the prices of oil and crops. Scientists can tell the two kinds apart by measuring carbon-14, which is present in recently living plants but absent from fossil fuels.",
        "Ethylene (C₂H₄) has a carbon–carbon double bond. It is mixed with steam and passed over a catalyst of phosphoric acid on a porous support, at about 300 °C and around 60 to 70 times atmospheric pressure. The acid gives a hydrogen ion to the double bond, creating a positively charged carbon, which a water molecule then attacks. When the water gives up a hydrogen ion, an –OH group is left on the carbon, forming ethanol. Only a small fraction of the ethylene reacts on each pass, so the unreacted gas is recycled many times.",
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
        "Like ethanol, isopropyl alcohol kills germs by denaturing proteins, making them unfold and lose their working shape, and by dissolving the fatty molecules in cell membranes. Water plays a key role. At around 70 percent, the water helps the alcohol soak through the cell wall and membrane, and water is itself needed for proteins to unfold properly. The water also slows evaporation, so the alcohol stays on a surface long enough to work. That is why 70 percent is usually the best concentration for disinfecting.",
        "Seventy percent isopropyl alcohol inactivates most bacteria and enveloped viruses within seconds to minutes, which is why it is used to wipe skin before injections and to clean medical equipment. Higher concentrations, 91 to 99 percent, evaporate too fast and are thought to harden the proteins on the outside of a bacterial cell into a protective shell that spares the inside. Isopropanol is somewhat better than ethanol against some bacteria but weaker against viruses without a fatty envelope. Like ethanol, it can't kill bacterial spores. High-purity 99 percent isopropanol is preferred for cleaning electronics because it contains so little water.",
        "established",
      ),
      mech(
        "Cooling skin",
        "Turning a liquid into a gas takes energy, called the heat of vaporization. When isopropyl alcohol evaporates from skin, it takes that energy from the skin in the form of heat. Because it evaporates much faster than water, it pulls heat away quickly. This is the same reason sweating cools you down, only faster. The chill is noticeable within seconds.",
        "Skin feels cold, which is why rubbing alcohol feels chilly and why it was once used in sponge baths to bring down fevers. Doctors no longer recommend this. Children can absorb isopropyl alcohol through their skin and breathe in its vapor, especially when it is applied over a large area, and some have been poisoned this way. Rapid cooling can also cause shivering, which actually raises body temperature. Fever is better treated with fever-reducing medicines and fluids, following a doctor's advice.",
        "established",
      ),
      mech(
        "Metabolized to acetone",
        "Isopropyl alcohol is a secondary alcohol, meaning its –OH group sits on a carbon attached to two other carbons. In the liver, the enzyme alcohol dehydrogenase removes two hydrogen atoms from it, converting it into acetone, a ketone with a C=O group. Unlike the acetaldehyde made from ethanol, acetone can't easily be oxidized further into an acid. Instead, it lingers in the body and is slowly breathed out or removed in urine. That explains why isopropanol poisoning looks different from poisoning with other alcohols.",
        "Both isopropanol and acetone depress the central nervous system, so poisoning causes drowsiness, confusion, poor coordination and, at high doses, coma. Isopropanol is roughly twice as potent as ethanol in its effect on the brain, and its effects last longer because acetone hangs around. Acetone also gives the breath a fruity smell. Unlike methanol and antifreeze, which are converted into toxic acids, isopropanol doesn't cause severe acidosis, a dangerous buildup of acid in the blood. It does irritate the stomach, causing pain and vomiting, sometimes with bleeding.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydration of propene",
        "Isopropyl alcohol is made by adding water across the double bond of propene, a three-carbon gas from petroleum, in what is called a hydration reaction. Because propene isn't symmetrical, water could in principle add in two ways: the –OH group could end up on the middle carbon or on an end carbon. A rule described by the Russian chemist Vladimir Markovnikov in 1870 predicts which one forms. The answer depends on which intermediate is more stable. This reaction is a staple of high school and college chemistry.",
        [
          ["Protonation", "An acid catalyst gives a hydrogen ion (H⁺) to propene's double bond. The hydrogen attaches to the end carbon, leaving the positive charge on the middle carbon, which forms the more stable secondary carbocation (Markovnikov's rule). It is more stable because its two neighboring carbon groups push electrons toward the positive charge, helping to share the burden."],
          ["Attack", "A water molecule, whose oxygen has spare pairs of electrons, is drawn to the positively charged middle carbon. The oxygen forms a bond with that carbon. For a moment, the oxygen carries the positive charge."],
          ["Deprotonation", "The oxygen gives up one of its hydrogen ions, which returns to the catalyst so it can be reused. That leaves a neutral –OH group on the middle carbon. The product is isopropanol."],
        ],
        "Markovnikov's rule predicts that the –OH ends up on the middle carbon rather than the end, which is why this reaction gives propan-2-ol rather than propan-1-ol. The rule is a shortcut for remembering that reactions follow the path through the most stable intermediate.",
        "CH3CH=CH2 + H2O → (CH3)2CHOH",
      ),
      rxn(
        "Oxidation to acetone",
        "Oxidizing an alcohol means removing hydrogen atoms from it, and what happens next depends on the type of alcohol. Primary alcohols, with the –OH on an end carbon, oxidize to aldehydes and then on to carboxylic acids. Secondary alcohols like isopropanol oxidize to ketones and stop there. Tertiary alcohols, whose –OH carbon is attached to three other carbons, resist oxidation altogether. This reaction happens both in the laboratory and in the human liver.",
        [
          ["Oxidation", "An oxidizing agent in the lab, such as acidified potassium dichromate, or the enzyme alcohol dehydrogenase in the body, removes two hydrogen atoms. One comes from the –OH group and one from the carbon it is attached to. In the body, the hydrogens are handed to the helper molecule NAD⁺."],
          ["Carbonyl", "With those two hydrogens gone, the carbon and oxygen form a double bond, so the C–OH becomes a C=O group, called a carbonyl. A carbonyl on a middle carbon makes the molecule a ketone. Here the product is acetone, the solvent in many nail polish removers."],
          ["Stops there", "Ketones resist further oxidation, unlike aldehydes. To be oxidized again, the carbonyl carbon would need a hydrogen attached, and in a ketone it has only carbon neighbors. Breaking a carbon–carbon bond takes much harsher conditions."],
        ],
        "This is the same reaction your liver performs, and a classic way to tell primary from secondary alcohols. In school labs, orange dichromate turns green when it oxidizes a primary or secondary alcohol, while a tertiary alcohol leaves it orange.",
        "(CH3)2CHOH → (CH3)2CO + 2 [H]",
      ),
    ],
    hazards: [
      hz(
        "Flammable",
        "Isopropyl alcohol is highly flammable, and its vapor ignites easily at room temperature. Rubbing alcohol, alcohol wipes and some cleaning sprays all carry fire risks. Fires have started when people used it near candles, stoves, heaters or cigarettes, or when vapor built up in a closed space. Like ethanol, it burns with a pale flame that can be hard to see. Store it somewhere cool, away from heat and flames, and use it in a ventilated area.",
        "Isopropanol's flash point is about 12 °C for the pure liquid and around 20 °C for a 70 percent solution, at or below room temperature, so there is always enough vapor above it to catch fire. Its vapor is about twice as heavy as air, so it can pool near the floor and travel some distance to a flame. Air containing roughly 2 to 12 percent isopropanol vapor can burn. When it burns, it reacts with oxygen to form carbon dioxide and water, releasing a lot of heat. A spark of static electricity can be enough to ignite it.",
        "The main injuries from isopropyl alcohol fires are burns to the skin, hands or face. Because the flame can be nearly invisible, people may not notice something is burning. Keep it away from flames and sparks, and don't use it near heaters. When cleaning electronics, let it evaporate completely before switching them back on. Wipe up large spills, air out the room and keep containers tightly closed.",
      ),
      hz(
        "Poisoning if swallowed",
        "Isopropyl alcohol is more toxic than ethanol, so swallowing it is more dangerous than swallowing the same amount of drinking alcohol. Young children may drink rubbing alcohol by mistake, and some people drink it as a substitute for alcoholic drinks. Rubbing alcohol is usually 70 to 91 percent isopropanol, so even a small amount is concentrated. For a small child, as little as about 1 milliliter per kilogram of body weight, a couple of teaspoons for a toddler, can be dangerous. If someone swallows it, call a poison control center right away.",
        "Isopropanol is absorbed quickly from the gut, and it can also be absorbed through skin or breathed in as vapor. It depresses the central nervous system more strongly than ethanol, and its metabolite acetone adds to the effect. Because acetone is cleared slowly, the effects can last a day or more. Isopropanol also irritates the lining of the stomach. In severe poisoning, it can lower blood pressure by relaxing blood vessels and weakening the heart's pumping.",
        "Symptoms include drowsiness, dizziness, slurred speech, unsteady walking, vomiting and stomach pain, and the breath may smell fruity from acetone. Severe poisoning can cause coma, slowed breathing and low blood pressure, which can be fatal. Doctors give supportive care, such as fluids and help with breathing, and in severe cases use dialysis to filter it from the blood. Because it doesn't cause severe acid buildup, the outlook with treatment is generally good. Keeping rubbing alcohol out of children's reach prevents most poisonings.",
      ),
    ],
    dosage:
      "Rubbing alcohol is usually 70 percent isopropanol, with 91 and 99 percent versions sold for cleaning, and 70 percent is the most effective for disinfecting. Alcohol prep pads used before injections are also about 70 percent. It is meant only for skin and surfaces, never for drinking, and shouldn't be used for sponge baths. For a small child, swallowing as little as about 1 milliliter per kilogram of body weight can be dangerous. Use it in well-ventilated areas, away from flames.",
    synthesis: [
      route(
        "Hydration of propene",
        "Isopropyl alcohol is made from propene, a gas produced when petroleum is refined and cracked. Propene was once a nuisance byproduct of refineries, and turning it into isopropanol was one of the first ways chemists made useful chemicals from petroleum. Millions of tonnes are made every year. Most goes into solvents, disinfectants and the manufacture of other chemicals. A smaller amount is made by adding hydrogen to acetone.",
        "There are two main methods. In the older indirect method, propene reacts with concentrated sulfuric acid to form sulfate esters, molecules in which the propyl group is attached to the acid, and water is then added to split them, releasing isopropanol. In the direct method, propene and steam are passed over a solid acid catalyst at high temperature and pressure, adding water across the double bond in a single step. Either way, the –OH ends up on the middle carbon, as Markovnikov's rule predicts. The crude mixture of alcohol and water is then purified by distillation.",
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
        "Household ammonia cleaners make water alkaline: ammonia (NH₃) takes hydrogen ions from water and leaves hydroxide ions (OH⁻) behind. These hydroxide ions break down thin, greasy films, such as fingerprints and cooking residue, partly by saponification, turning fats into soap-like molecules that dissolve in water. Ammonia itself is a gas at room temperature, so as the cleaner dries, the ammonia evaporates along with the water. Many glass cleaners also contain a little alcohol to speed drying. Unlike soap or detergent, nothing solid is left behind.",
        "Windows and mirrors are left clean, with nothing behind to leave streaks. Soaps and detergents often leave a thin residue that dries into visible smears, which is why ammonia became a favorite in glass cleaners. The same property makes it useful on chrome and stainless steel. However, ammonia can damage some surfaces, such as tinted car windows and certain painted or coated finishes. Its strong smell is the price of its streak-free results.",
        "established",
      ),
      mech(
        "Irritating the airways",
        "Ammonia is extremely soluble in water: a single liter of water can dissolve hundreds of liters of ammonia gas. When ammonia vapor reaches the moist surfaces of the eyes, nose and throat, it dissolves at once in that moisture. There it reacts with water to form ammonium ions and hydroxide ions, making the surface strongly alkaline. The hydroxide ions damage the fats and proteins of the cells lining these tissues. Because ammonia dissolves so readily, most of it is caught in the upper airways before it can reach deep into the lungs.",
        "This causes burning eyes, a stinging nose, coughing and watery eyes. We can smell ammonia at about 5 parts per million (ppm), well below harmful levels; workplace air limits are set at about 25 to 50 ppm. So the sharp smell works as a built-in warning, prompting people to leave before damage occurs. At very high levels, as in industrial accidents, ammonia can cause severe burns to the airways and lungs. People with asthma may react to even low levels.",
        "established",
      ),
      mech(
        "Opening hair for dye",
        "Each hair is covered by a cuticle, overlapping layers of flat cells arranged like roof shingles that protect the inner part, called the cortex. Permanent hair dyes contain ammonia, which raises the pH to around 9 to 11. At this high pH, the cuticle swells and its scales lift slightly, opening gaps. Ammonia also activates hydrogen peroxide, the other half of a permanent dye kit. Together they let chemicals get inside the hair shaft.",
        "With the cuticle opened, small dye-precursor molecules and hydrogen peroxide can enter the cortex. The peroxide lightens the hair's natural pigment, melanin, and also makes the small dye molecules link together into larger colored molecules. These are too big to escape back through the cuticle, so the color is permanent and lasts until the hair grows out. Repeated dyeing damages the cuticle, leaving hair dry and brittle. “Ammonia-free” dyes usually use a related chemical called ethanolamine, which does the same job with less smell.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Acting as a base",
        "Ammonia makes water alkaline by acting as a base, a substance that accepts hydrogen ions (H⁺). This comes from the structure of the ammonia molecule. Ammonia has one nitrogen atom bonded to three hydrogen atoms, arranged like a short pyramid, plus a spare pair of electrons on the nitrogen. That pair of electrons is free to form a new bond. This reaction is why a bottle of ammonia solution is often labeled “ammonium hydroxide.”",
        [
          ["Lone pair", "Nitrogen has five outer electrons. Three are shared with hydrogen atoms in bonds, and the other two form an unshared pair, called a lone pair. A lone pair is attracted to positive charges such as hydrogen ions."],
          ["Proton grab", "When ammonia meets water, its lone pair forms a bond with one of water's hydrogen atoms and pulls it away as a hydrogen ion. The nitrogen now holds four hydrogens and carries a positive charge. This is an ammonium ion (NH₄⁺)."],
          ["Hydroxide", "The water molecule that lost a hydrogen ion keeps the electrons from that bond, becoming a hydroxide ion (OH⁻). Hydroxide ions are what make a solution alkaline. The more there are, the higher the pH."],
        ],
        "Only a small fraction reacts at any moment (ammonia is a weak base), but enough to give pH 11–12. Because the reaction is reversible, ammonia can turn back into gas and escape, which is why an open bottle slowly loses strength while its smell fills the room.",
        "NH3 + H2O ⇌ NH4+ + OH-",
      ),
      rxn(
        "Chloramines (never mix with bleach)",
        "Mixing ammonia with bleach produces chloramines, toxic gases that irritate the eyes and lungs. It is one of the most common dangerous mixing accidents at home. It can happen when someone uses an ammonia glass cleaner after cleaning with bleach, or mixes the two thinking it will make a stronger cleaner. Bleach can also react with urine in toilets or litter boxes, because urine contains ammonia-related compounds. The reaction starts immediately.",
        [
          ["Mixing", "Ammonia (NH₃) meets sodium hypochlorite (NaOCl) from bleach. Hypochlorite, and the hypochlorous acid it forms in water, holds a chlorine atom that is easily handed to other molecules."],
          ["Substitution", "Chlorine atoms replace hydrogen atoms on ammonia. One swap gives monochloramine (NH₂Cl); with more bleach, dichloramine (NHCl₂) and nitrogen trichloride (NCl₃) can form. Which ones form depends on the ratio of bleach to ammonia and on the pH."],
          ["Toxic vapors", "Chloramines evaporate easily and escape into the air. In a small, closed space such as a bathroom, they can quickly reach harmful levels."],
        ],
        "Chloramine vapors cause coughing, chest pain and breathing problems. If you are exposed, leave the area, get fresh air and call a poison control center; never mix bleach with any other cleaner.",
        "NaOCl + NH3 → NH2Cl + NaOH",
      ),
    ],
    hazards: [
      hz(
        "Corrosive when concentrated",
        "Household ammonia is 5–10%; industrial solutions are much stronger, often 25 to 30 percent, and can cause severe burns. Even household strength can irritate skin and seriously irritate the eyes. Most home injuries come from splashes in the eyes or from breathing vapor in poorly ventilated spaces. Gloves protect the skin during heavy cleaning. Keep ammonia in its original container, out of children's reach.",
        "Ammonia solutions are alkaline because they contain hydroxide ions, which damage proteins and lipids on contact. Hydroxide breaks down the fats in cell membranes by saponification and makes proteins unfold. Like other alkalis, ammonia causes liquefactive necrosis, a kind of damage in which tissue softens and liquefies, letting the chemical sink deeper. Ammonia gas also dissolves into the moisture on skin, eyes and airways, forming hydroxide right on the tissue. Concentrated solutions release large amounts of gas, adding a breathing hazard.",
        "Concentrated ammonia burns skin and eyes; use household strength with ventilation. On skin, household ammonia can cause redness and irritation, while concentrated ammonia causes burns and blisters. In the eyes, it can damage the cornea, and because alkali burns keep penetrating, injuries can be severe unless the eye is rinsed immediately for at least 15 minutes. Swallowing ammonia burns the mouth, throat and esophagus. Breathing concentrated vapor can damage the airways and cause fluid to build up in the lungs.",
      ),
      hz(
        "Toxic gas with bleach",
        "Never combine ammonia and bleach. Together they form chloramines, toxic gases that can cause serious lung injury. The mistake often happens by accident, for example when a bathroom is cleaned with bleach and then with a glass cleaner, or when bleach is used to clean up urine. Poison control centers handle many such cases every year. Using one cleaner at a time and rinsing surfaces between products prevents it.",
        "Chloramines form immediately: chlorine atoms move from hypochlorite to ammonia, replacing its hydrogens and forming compounds such as monochloramine (NH₂Cl). They evaporate readily and fill the air. Once breathed in, they dissolve in the moist lining of the airways. There they break down into reactive chemicals, including hypochlorous acid and ammonia, which damage cell membranes and proteins. The stronger the mixture and the smaller the room, the higher the exposure.",
        "Inhaling them inflames the lungs and can cause fluid buildup. Symptoms include coughing, shortness of breath, chest pain, watery eyes and wheezing. In serious cases, fluid fills the lungs' tiny air sacs, a condition called pulmonary edema, which can appear hours after exposure and can be life-threatening. People with asthma or other lung conditions are especially at risk. Anyone exposed should get to fresh air immediately and seek medical help if symptoms continue.",
      ),
    ],
    dosage:
      "Household ammonia cleaners contain about 5 to 10 percent ammonia, while industrial solutions are around 25 to 30 percent and far more dangerous. Most people can smell ammonia at about 5 parts per million, well below the 25 to 50 ppm limits set for workplace air, so a strong smell is a signal to ventilate. Permanent hair dyes contain a few percent, and the EU caps ammonia in cosmetics at 6 percent. Never mix ammonia with bleach, and use it with windows open or a fan running.",
    synthesis: [
      route(
        "The Haber–Bosch process",
        "Almost all ammonia is made by the Haber–Bosch process, developed in Germany in the early 1900s by the chemist Fritz Haber and the engineer Carl Bosch. It takes nitrogen, which makes up 78 percent of the air but is very unreactive, and turns it into a useful compound. Before this, the main sources of nitrogen for fertilizer were natural deposits such as Chilean saltpeter and bird droppings called guano. Today well over 150 million tonnes of ammonia are made each year, mostly for fertilizer. The process uses roughly 1 to 2 percent of the world's energy.",
        "Hydrogen is made from natural gas, mostly methane, by reacting it with steam, while nitrogen comes from the air. The two gases are compressed to very high pressure, roughly 100 to 300 times atmospheric pressure, and passed over an iron-based catalyst at 400 to 450 °C. Nitrogen's triple bond is one of the strongest in chemistry, and the catalyst's surface helps break it, letting nitrogen atoms combine with hydrogen. Only part of the gas reacts on each pass, so the ammonia is cooled until it condenses into a liquid, and the leftover gases are recycled. For household cleaners, the ammonia is then dissolved in water.",
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
        "Limescale, the chalky white crust in kettles, on faucets and around showerheads, is mostly calcium carbonate (CaCO₃) left behind when hard water evaporates. Calcium carbonate is a base, and it doesn't dissolve in plain water. The acetic acid in vinegar gives hydrogen ions to the carbonate ions, turning them into carbonic acid, which quickly breaks down into water and carbon dioxide gas. The calcium is left as calcium acetate, which does dissolve in water. Soap scum, made of calcium salts of fatty acids, is loosened by the acid in a similar way.",
        "Kettle scale, faucet crust and soap scum loosen and rinse away. You can often see small bubbles of carbon dioxide forming as the reaction runs. Thick deposits may need several hours of soaking. Vinegar shouldn't be used on natural stone such as marble or limestone countertops, which are also made of calcium carbonate and will be etched. With long contact, it can also damage grout and some metal finishes.",
        "established",
      ),
      mech(
        "Preserving food",
        "Acetic acid is a weak acid, so in vinegar most of its molecules keep their hydrogen and carry no electric charge. Uncharged molecules can slip through the fatty membranes of bacteria and molds, which charged ions can't easily cross. Inside the microbe, where the pH is close to neutral, the acetic acid releases its hydrogen ion, acidifying the cell's interior and leaving acetate ions trapped inside. The microbe then has to spend energy pumping hydrogen ions back out to survive. This trick works because the inside and outside of the cell have different pH levels.",
        "With its interior acidified and its energy drained, a microbe's enzymes stop working properly and it can't grow or multiply. Spoilage and disease-causing bacteria can't grow in pickles and other vinegar-preserved foods. Pickled foods are made acidic enough, at a pH of 4.6 or lower, to stop the growth of Clostridium botulinum, the bacterium behind botulism, a rare but deadly food poisoning. That is why tested canning recipes must be followed carefully. Vinegar doesn't kill every microbe, but it keeps them from multiplying.",
        "established",
      ),
      mech(
        "Blood sugar after meals",
        "Researchers think acetic acid may affect blood sugar in a few ways. It may slow gastric emptying, the rate at which food passes from the stomach into the small intestine, where most sugar is absorbed. It may also reduce the activity of gut enzymes that break starch and table sugar into glucose, and it may help muscles take up glucose from the blood. Together, these effects would slow the rate at which glucose enters the bloodstream. The exact mechanisms haven't been fully worked out.",
        "Small human trials found that a tablespoon or two of vinegar taken with a meal high in carbohydrates modestly lowered the rise in blood sugar afterward, in both healthy people and people with type 2 diabetes. The effect is modest, and vinegar is no replacement for medical treatment. Drinking vinegar straight can irritate the throat and wear away tooth enamel, so it is best diluted or used in food, such as salad dressing. Larger, longer studies are needed to know whether regular vinegar use improves long-term health. People taking diabetes medicines should talk to a doctor before changing their routine.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving limescale",
        "Vinegar dissolves limescale through an acid–carbonate reaction, one of the most common reactions in chemistry. Acids react with carbonates to form a salt, water and carbon dioxide gas. It is the same reaction that makes baking soda and vinegar fizz in a model volcano, and the reason acid rain slowly dissolves marble statues. In cleaning, it turns a hard, insoluble crust into a dissolved salt. With vinegar it is slower than with stronger acids, because acetic acid is weak.",
        [
          ["Proton transfer", "Acetic acid molecules donate hydrogen ions (H⁺) to the carbonate ions (CO₃²⁻) in the scale. Each carbonate ion can accept two. The acetic acid molecules become acetate ions."],
          ["Carbonic acid", "A carbonate ion that has gained two hydrogen ions becomes carbonic acid (H₂CO₃). Carbonic acid is unstable and quickly breaks down into water and carbon dioxide. The carbon dioxide forms the fizz you can see."],
          ["Soluble salt", "The calcium ions, no longer locked in the solid scale, pair with acetate ions. The result is calcium acetate, which dissolves in water and washes away."],
        ],
        "Soaking a showerhead in vinegar overnight uses exactly this reaction. Warming the vinegar speeds it up, because molecules move and collide faster at higher temperatures.",
        "CaCO3 + 2 CH3COOH → Ca(CH3COO)2 + H2O + CO2",
      ),
      rxn(
        "Acetic fermentation",
        "Vinegar is made when bacteria turn alcohol into acetic acid. This process, called acetic fermentation, is technically an oxidation, because the bacteria use oxygen from the air. It is how wine, cider, beer and rice wine have been turned into vinegar for thousands of years. Wine left open to the air turns sour because these bacteria get in. In the 1860s, the French chemist Louis Pasteur showed that living bacteria are responsible.",
        [
          ["Bacteria", "Acetobacter bacteria live at the surface of alcoholic liquids, where there's oxygen. They need oxygen to work, which is why vinegar is made in open vessels or in tanks with air pumped through. They can tolerate the acid they produce."],
          ["Oxidation", "The bacteria use enzymes to oxidize ethanol to acetaldehyde, then acetaldehyde to acetic acid. The hydrogen they strip off ends up combined with oxygen as water. This releases the energy the bacteria live on."],
          ["Mother of vinegar", "Some of these bacteria make cellulose, the same material found in plant cell walls, forming a slimy, jelly-like mat on the surface called the mother of vinegar. A piece of mother can be used to start a new batch."],
        ],
        "The French “vin aigre” means sour wine. Because alcohol is needed first, vinegar making is really a two-step process: yeast turn sugar into alcohol, then bacteria turn alcohol into acetic acid.",
        "C2H5OH + O2 → CH3COOH + H2O",
      ),
    ],
    hazards: [
      hz(
        "Concentrated acid is corrosive",
        "Household vinegar is safe; 20–30% horticultural vinegar is not. Table vinegar is about 5 percent acetic acid and fine to eat and clean with. “Cleaning vinegar” is often 6 to 10 percent, and horticultural vinegar sold as a weed killer is strong enough to burn skin and badly damage eyes. Glacial acetic acid, which is nearly pure and used in labs and industry, is highly corrosive. The percentage on the label matters a lot.",
        "Concentrated acetic acid denatures proteins and burns tissue. At higher concentrations, more molecules are present to release hydrogen ions, and the acid's power to damage tissue rises steeply. Acids make proteins unfold and clump together, a process called coagulation, forming a hard layer of damaged tissue. Because the uncharged acetic acid molecule passes through fatty membranes, it can soak into tissue more easily than many acids. Concentrated acetic acid also gives off a strong, irritating vapor.",
        "Strong cleaning or weed-killing vinegars require gloves and eye protection. On skin, they can cause redness, pain and burns, and in the eyes they can cause serious, sometimes permanent damage. Swallowing concentrated acetic acid can burn the mouth, throat and stomach. Breathing its vapor irritates the nose and throat. Rinse any splash right away with plenty of water, and keep strong vinegars in labeled containers, away from food vinegar.",
      ),
      hz(
        "Never mix with bleach",
        "Vinegar is an acid, so it must never be mixed with bleach. Some people combine them believing it makes a stronger cleaner, but the mixture releases chlorine gas. Even a small amount in a closed bathroom can cause harm. The same goes for other acidic cleaners, such as toilet bowl and rust removers. Use one product at a time and rinse surfaces in between.",
        "Adding acid to bleach releases chlorine gas. Bleach contains hypochlorite and chloride ions. When an acid such as acetic acid lowers the pH, hypochlorite becomes hypochlorous acid, which reacts with chloride and hydrogen ions to form chlorine gas (Cl₂). Chlorine doesn't stay dissolved in acidic water, so it bubbles out. The lower the pH, the more chlorine is released.",
        "Chlorine gas irritates and damages the lungs. When it dissolves in the moist lining of the eyes, nose and airways, it forms hydrochloric and hypochlorous acids, which burn tissue. Symptoms include burning eyes, coughing, choking and chest tightness, and severe exposure can cause fluid in the lungs. If you mix them by accident, leave the room, get fresh air and call poison control. Also avoid storing vinegar and hydrogen peroxide together in one container, since they can form peracetic acid, which is corrosive.",
      ),
    ],
    dosage:
      "Table vinegar is usually 4 to 8 percent acetic acid, most often 5 percent, and is safe in food; in the United States, a product must contain at least 4 percent to be called vinegar. Cleaning vinegars run about 6 to 10 percent, and horticultural vinegars 20 to 30 percent, which call for gloves and eye protection. Acetic acid is also an approved food additive (E260 in Europe) used for sourness and preservation. If you drink vinegar, dilute it to protect your teeth and throat. Never mix it with bleach.",
    synthesis: [
      route(
        "Bacterial fermentation (vinegar)",
        "In many countries, a product sold as vinegar must be made by fermentation rather than by diluting synthetic acetic acid. The starting liquid can be wine, cider, malt (unhopped beer), rice wine or diluted distilled alcohol, and it gives each vinegar its flavor. Traditional methods, such as the slow Orléans method using wooden barrels, take weeks to months. Modern factories use the submerged method, which takes a day or two. Traditional balsamic vinegar is different again, made from cooked grape juice aged for many years in wooden barrels.",
        "Alcohol from fermented fruit, grain or rice is oxidized by Acetobacter bacteria in tanks with vigorous aeration until it reaches about 5% acetic acid. First, yeast ferment the sugars into alcohol. In the submerged method, the alcoholic liquid then sits in a large stainless steel tank called an acetator, with fine air bubbles pumped through so the bacteria always have oxygen. The temperature is held around 30 °C, because the reaction gives off heat and too much would kill the bacteria. When the vinegar is ready, part of it is drawn off and filtered, and fresh alcohol is added to keep the process going.",
      ),
      route(
        "Methanol carbonylation (industrial acid)",
        "Most of the acetic acid used in industry, well over 10 million tonnes a year, is made from methanol and carbon monoxide. This route was developed by the Monsanto company around 1970 and later improved in BP's Cativa process in the 1990s. It is much cheaper and faster than fermentation. Industrial acetic acid goes into plastics, paints, adhesives and medicines. It is chemically identical to the acetic acid in vinegar, though it is mostly not used in food.",
        "Methanol and carbon monoxide react over a rhodium or iridium catalyst with an iodide promoter (the Monsanto and Cativa processes). First, methanol reacts with hydrogen iodide to form methyl iodide. The metal catalyst inserts itself into the bond between the methyl group and the iodine, and then a carbon monoxide molecule slips in between the metal and the methyl group. The resulting acetyl group is released as acetyl iodide, which reacts with water to give acetic acid and regenerate hydrogen iodide. The catalyst is then free to repeat the cycle again and again.",
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
        "When sodium percarbonate dissolves, it releases hydrogen peroxide and sodium carbonate. The sodium carbonate raises the pH to about 10 to 11, and in this alkaline water some hydrogen peroxide loses a hydrogen ion to become the perhydroxyl ion (HOO⁻), its more active bleaching form. Colored stain molecules contain chromophores, long chains of alternating single and double bonds that absorb visible light. The released peroxide oxidizes these chromophores, attacking and breaking their double-bond systems. Once the chains are broken up, the molecules no longer absorb visible light.",
        "Coffee, wine and grass stains lose their color without the harshness of chlorine bleach. Oxygen bleach is gentler on most colored fabrics because it attacks many dyes less aggressively than chlorine bleach does. It also breaks down into harmless products: water, oxygen and sodium carbonate. It is weaker than chlorine bleach for disinfecting and on some stubborn stains. Testing on a hidden area first shows whether a fabric's color will hold.",
        "established",
      ),
      mech(
        "Cold-water bleaching with an activator",
        "Hydrogen peroxide bleaches best at high temperatures, 60 °C or more, and works slowly in cooler water. Detergents solve this by adding a bleach activator, most commonly TAED (tetraacetylethylenediamine). TAED reacts with peroxide in a reaction called perhydrolysis, forming peracetic acid. Peracetic acid is a peroxide with an acetyl group attached, which makes it a much more reactive oxidizer. It bleaches effectively at lower temperatures.",
        "Clothes can be bleached at 30–40 °C instead of 60 °C or more, saving energy. Heating water accounts for most of the energy a washing machine uses, so washing cooler has a real environmental benefit. Peracetic acid also kills many bacteria, helping keep laundry hygienic at low temperatures. TAED has been used for decades in European detergents. After use, it breaks down into harmless products.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving",
        "Sodium percarbonate is an unusual crystal: hydrogen peroxide molecules held inside a sodium carbonate lattice by hydrogen bonds. Despite its name, it doesn't contain a true percarbonate ion, and chemists call it sodium carbonate peroxyhydrate. About a third of its weight is hydrogen peroxide. When it dissolves, the crystal comes apart into its two ingredients. That's why it is sometimes described as “solid hydrogen peroxide.”",
        [
          ["Water", "When the powder is added to water, water molecules surround the crystal and pull its parts away, breaking up the lattice. The sodium ions, carbonate ions and hydrogen peroxide molecules all dissolve. This happens faster in warm water."],
          ["Release", "Hydrogen peroxide and sodium carbonate dissolve separately, and each now acts on its own. The peroxide is the bleaching agent. The carbonate is the alkaline helper."],
          ["Activation", "The carbonate raises the pH to around 10 to 11, which helps the peroxide react with stains by forming the more reactive perhydroxyl ion (HOO⁻). The carbonate also softens hard water by removing calcium and magnesium. Both effects improve cleaning."],
        ],
        "Oxygen bleach works best in warm water, or with an activator in cool water. As the peroxide works, it slowly breaks down into water and oxygen, which is why oxygen bleach solutions fizz gently.",
        "2 Na2CO3·3 H2O2 → 2 Na2CO3 + 3 H2O2",
      ),
      rxn(
        "Perhydrolysis with TAED",
        "Perhydrolysis is the reaction that turns hydrogen peroxide into peracetic acid inside the washing machine, using the activator TAED. It is what lets detergents bleach well at low temperatures. TAED is stable as a dry powder and only reacts once it dissolves alongside peroxide. Each TAED molecule can release two molecules of peracetic acid. It is a neat example of making a reactive chemical exactly where and when it is needed.",
        [
          ["Attack", "Perhydroxyl ions (HOO⁻) from peroxide attack TAED's acetyl groups. Each acetyl group has a carbon double-bonded to oxygen, and that carbon is slightly positive, making it a target for the negatively charged perhydroxyl ion."],
          ["Transfer", "Acetyl groups transfer to the peroxide as the bond between each acetyl group and TAED's nitrogen breaks. Two of TAED's four acetyl groups react this way."],
          ["Product", "Peracetic acid forms, which bleaches effectively at low temperatures. What is left of TAED is DAED (diacetylethylenediamine), which is harmless and biodegradable."],
        ],
        "This is why many European detergents clean well at low wash temperatures. Peracetic acid is also used on its own as a disinfectant in food processing and hospitals.",
      ),
    ],
    hazards: [
      hz(
        "Serious eye damage",
        "Sodium percarbonate is generally safe in normal laundry use, but the dry powder is the main hazard: it can seriously damage the eyes. It is classified as causing serious eye damage, the most severe category of eye hazard. Most injuries come from powder flying into the eyes while pouring, or from children getting into the container. It is also harmful if swallowed. Keeping the container closed and out of reach prevents most accidents.",
        "When percarbonate powder lands on the moist surface of the eye, it dissolves right there, releasing concentrated hydrogen peroxide and sodium carbonate. Peroxide plus high pH damages the surface of the eye. The peroxide oxidizes the proteins and fats of the cells covering the cornea, while the sodium carbonate makes the area strongly alkaline, damaging cell membranes and proteins further. Together, oxidation and alkalinity do more harm than either would alone. Because there is so little tear fluid to dilute it, the concentration on the eye can be very high.",
        "Keep powder away from eyes and children; rinse immediately if exposed. Rinse with clean water for at least 15 minutes and seek medical care. Eye exposure can cause pain, redness, blurred vision and damage to the cornea. On skin, the powder may cause mild irritation, especially if the skin is wet. Swallowing it irritates the mouth and stomach and releases gas, which can cause bloating and vomiting.",
      ),
      hz(
        "Oxidizer",
        "Sodium percarbonate is an oxidizer, meaning it can supply oxygen to a fire and make it burn more intensely. It doesn't burn by itself, but it can make other materials burn faster. Store it away from heat and flammable materials. Moisture and heat make it break down early. Never store dissolved percarbonate in a sealed container.",
        "It releases oxygen as it decomposes. The hydrogen peroxide in percarbonate slowly breaks down into water and oxygen gas, and heat, moisture and some metals speed this up. If the powder gets damp or warm, it decomposes faster, releasing both oxygen and heat. Oxygen-rich air makes nearby materials such as paper, cloth or wood burn much more fiercely. Manufacturers coat the particles to slow this breakdown in storage.",
        "Oxygen can intensify a fire, so the powder shouldn't be stored near fuels. A sealed bottle of dissolved percarbonate can build enough pressure from oxygen gas to burst, spraying caustic liquid, so mix solutions fresh and use them in open containers. Keep the powder in its original container, tightly closed, somewhere cool and dry. Don't mix it with other cleaning chemicals, especially acids or bleach. Damp, clumped powder has lost much of its strength.",
      ),
    ],
    dosage:
      "Oxygen-bleach boosters are usually about 50 to 90 percent sodium percarbonate, and many powdered laundry detergents contain some as well. A typical dose is a scoop per load, following the label. In water it breaks down into water, oxygen and sodium carbonate, which is why it is considered an environmentally friendly bleach. The main precautions are avoiding eye contact, keeping it away from children and never storing solutions in sealed containers. Gloves are a good idea for long soaking jobs.",
    synthesis: [
      route(
        "Crystallization",
        "Sodium percarbonate is made by combining sodium carbonate and hydrogen peroxide, two chemicals produced in huge amounts. The process doesn't form new chemical bonds between them; it traps hydrogen peroxide inside the carbonate's crystal structure. The main challenge is making crystals that stay stable in storage, since detergent boxes often sit in damp laundry rooms. In Europe, percarbonate has largely replaced an older oxygen bleach, sodium perborate. It is made in large chemical plants and shipped to detergent makers.",
        "A concentrated sodium carbonate solution is crystallized with hydrogen peroxide under carefully controlled conditions, often with stabilizers such as magnesium compounds or silicates that slow the peroxide's breakdown. As the mixture cools or water is removed, crystals form, with hydrogen peroxide held in the sodium carbonate lattice by hydrogen bonds. Another method sprays the two solutions onto a bed of tumbling particles in a fluid-bed dryer, where they dry into granules. The crystals are then coated, for example with sodium sulfate, to protect them from moisture and from other detergent ingredients and improve storage stability. Finally, the product is dried and sieved to an even size.",
        { equation: "2 Na2CO3 + 3 H2O2 → 2 Na2CO3·3 H2O2", significance: "Percarbonate replaced sodium perborate in many European detergents after perborate was classified as toxic to reproduction because of its boron." },
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
        "Each LAS molecule has two very different ends. The long 12-carbon tail is oily and avoids water, while the sulfonate head (–SO₃⁻) is charged and attracted to water; molecules like this are called surfactants, short for surface-active agents. In wash water, LAS molecules line up at the boundary between water and oily soil, tails in the oil and heads in the water, lowering the interfacial tension, the force that keeps oil and water apart. As the tension drops, oily soil rolls up off the fabric into droplets. Above a certain concentration, LAS molecules also gather into tiny spheres called micelles, with their tails pointing inward, and oil gets trapped inside them.",
        "Greasy stains wash out of clothes, and the negative charges keep removed soil from settling back on fabric. Because every micelle and every LAS-coated dirt particle carries a negative charge, they repel one another and stay suspended until the water drains away. LAS foams well, which people tend to link with cleaning power. It works poorly in very hard water, because calcium binds to it, so detergents add builders such as sodium carbonate or zeolites to remove calcium. LAS is usually blended with other surfactants to tackle a wider range of soils.",
        "established",
      ),
      mech(
        "Biodegradation",
        "Bacteria in wastewater treatment plants and in the environment start by oxidizing the far end of LAS's straight carbon chain, turning the last carbon into a carboxylic acid group. They then shorten the chain two carbons at a time by beta-oxidation, the same pathway our own cells use to break down fats. Once the chain is short, the bacteria remove the sulfonate group and break open the benzene ring. The final products are carbon dioxide, water and sulfate. Branched chains block this process, because the enzymes can't get past the branch points.",
        "Most LAS is removed in wastewater treatment within days, protecting rivers; well-run plants typically remove more than 99 percent. The older branched surfactants passed through treatment plants untouched, creating huge banks of foam on rivers and even foamy tap water in the 1950s and 60s. Switching to linear chains solved the problem. LAS breaks down poorly where there is no oxygen, such as in some sludges and sediments. Once oxygen is available again, it degrades.",
        "established",
      ),
      mech(
        "Skin and eye irritation",
        "LAS is an anionic surfactant, meaning its charged head is negative. Like other anionic surfactants, it extracts lipids and binds proteins at the skin surface: it dissolves and carries away the natural fats that form the skin's barrier, much as it lifts grease from clothes. It also binds to proteins in the skin's outer layer, such as keratin, causing them to swell and change shape. In the eye, it can disrupt the membranes of the cells covering the cornea. The damage depends on concentration and contact time.",
        "Undiluted detergent can redden skin and seriously irritate eyes. Repeated contact can leave hands dry, rough and cracked, especially for people who often wash laundry or dishes by hand. At the dilution found in wash water, LAS is much milder, and rinsing removes most of it from clothes. Gloves help people with sensitive skin. Splashes of concentrated detergent in the eyes need prompt rinsing.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Sulfonation",
        "Sulfonation is the reaction that gives LAS its water-loving head, attaching a charged head to an oily tail. It adds a sulfonic acid group to the benzene ring of linear alkylbenzene, an oily molecule made from petroleum. The reaction uses sulfur trioxide, a very reactive chemical, in special reactors that remove heat quickly, because the reaction releases a lot of it. The resulting sulfonic acid is then neutralized to make the sodium salt. It is a textbook example of electrophilic aromatic substitution.",
        [
          ["Electrophile", "Sulfur trioxide (SO₃) is a powerful electrophile, a molecule that seeks electrons. Its sulfur atom is strongly positive because the three oxygens bonded to it pull electrons away. It is drawn to the electron-rich benzene ring."],
          ["Substitution", "It attacks the benzene ring of linear alkylbenzene, swapping a hydrogen for a –SO₃H group (electrophilic aromatic substitution). The ring briefly loses its special stability, called aromaticity, as the new bond forms, then regains it by releasing a hydrogen ion. The group usually attaches opposite the carbon chain, at what is called the para position."],
          ["Neutralization", "Sodium hydroxide converts the sulfonic acid into its sodium salt. The hydroxide removes the acidic hydrogen, forming water and leaving a negatively charged sulfonate group paired with a sodium ion. The salt is easier to handle and more stable in detergents."],
        ],
        "Electrophilic aromatic substitution is one of the main reactions of benzene rings. The same kind of reaction is used to attach nitro groups, chlorine atoms and carbon chains to rings when making dyes, medicines and plastics.",
        "C12H25C6H5 + SO3 → C12H25C6H4SO3H",
      ),
    ],
    hazards: [
      hz(
        "Eye damage from concentrated detergent",
        "Concentrated detergent can cause serious eye injuries, and it is especially a risk with liquid detergent pods. Pods hold highly concentrated surfactants, LAS among them, in a thin film that dissolves easily when wet. Young children may squeeze or bite them, squirting detergent into their eyes or mouths, and the bright colors can look like candy. Poison control centers have received thousands of reports of children exposed to laundry pods. Keeping pods in their closed container, out of sight and reach, prevents most injuries.",
        "Concentrated surfactant disrupts corneal cells. The oily tails of LAS molecules push into the fatty membranes of the cells on the surface of the cornea, while the charged heads pull them apart, dissolving the membranes. LAS also binds to proteins and makes them unfold. Pods contain far higher concentrations than diluted wash water, so damage happens quickly. Other pod ingredients, such as solvents, add to the effect.",
        "Eye exposure needs prolonged rinsing; detergent pods should be kept away from young children. Injuries range from irritation and redness to chemical burns of the cornea, causing pain and blurred vision. Rinse with clean water for at least 15 minutes and get medical advice. Swallowing pod contents can cause vomiting, drowsiness and breathing problems, and some children have needed hospital care. In the EU, pods must come in opaque packaging and carry a bitter coating to discourage children.",
      ),
      hz(
        "Harm to aquatic life before treatment",
        "Before treatment, the detergent that goes down our drains can harm aquatic life, but wastewater treatment removes most of it. Problems arise where untreated sewage reaches rivers, or with spills of concentrated product. Because LAS biodegrades readily, it doesn't build up in the environment the way some chemicals do. Even so, it is toxic to fish and small water creatures at fairly low concentrations. That is why treatment matters.",
        "Surfactants disrupt the gill membranes of fish and invertebrates. Gills are thin, delicate tissues with a large surface area for absorbing oxygen. LAS's oily tails slip into the fatty membranes of gill cells and its charged heads destabilize them, making them leaky. This interferes with oxygen uptake and with the gills' control of salts. LAS also lowers the surface tension of water, which can affect insects that live on the water's surface.",
        "Untreated discharges can harm aquatic life, which is why biodegradability is legally required for detergents in the EU. At high enough concentrations, fish struggle to breathe and small invertebrates may die. In rivers below treatment plants, LAS levels are usually far below harmful levels. The EU Detergents Regulation requires surfactants to break down completely in standard tests. Many other countries have similar rules.",
      ),
    ],
    dosage:
      "Laundry and dish detergents typically contain about 5 to 25 percent LAS, which is diluted hundreds of times in the wash; pods and concentrates pack much more into each dose. At wash-water dilution it is mild, but undiluted detergent should be kept away from eyes and rinsed off skin. LAS is among the most thoroughly studied chemicals in consumer products, and safety assessments have concluded that normal use is safe for people. Using only the recommended dose gives good results and limits what goes down the drain. Keep pods out of children's reach.",
    synthesis: [
      route(
        "From petroleum",
        "LAS is built in two main steps from two petroleum-based ingredients: benzene and long, straight-chain hydrocarbons. Millions of tonnes are produced every year, making it one of the most-used surfactants in the world. First the oily tail is attached to the ring, then the charged head is added. The process was redesigned in the 1960s to produce straight chains instead of branched ones. It is cheap to make, which is one reason it remains so widely used.",
        "Long straight-chain hydrocarbons called normal paraffins, separated from kerosene, are converted into olefins, molecules with one double bond, with 10 to 14 carbons. Benzene is alkylated with these linear olefins in the presence of an acid catalyst, which attaches the chain to the ring and forms linear alkylbenzene (LAB). The LAB is then sulfonated with sulfur trioxide, adding a sulfonic acid group to the ring. Finally, it is neutralized with sodium hydroxide, forming sodium dodecylbenzenesulfonate and its close relatives. The product is a mixture of molecules with slightly different chain lengths and attachment points.",
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
        "An enzyme's active site is a small pocket where the reaction takes place. In subtilisin, three amino acids, serine, histidine and aspartate, sit close together there. Aspartate and histidine together pull a proton from serine: aspartate's negative charge holds histidine in position, and histidine takes the hydrogen ion from serine's –OH group. That turns serine's oxygen into a powerful nucleophile, an atom strongly attracted to positive charges, which attacks the carbonyl carbon of a peptide bond, the bond linking amino acids in a protein. The enzyme holds the protein chain in exactly the right position for this attack.",
        "Protein stains are cut into short, water-soluble peptides at mild temperatures, so clothes come clean without hot water. Blood, egg, grass, milk, sweat and food stains all contain proteins that stick tightly to fabric. Once cut into small pieces, they dissolve and are carried away by the surfactants. Because enzymes are catalysts, a tiny amount does a lot of work. Wool and silk are themselves made of protein, so detergents for these fabrics usually leave protease out.",
        "established",
      ),
      mech(
        "Engineered to survive bleach",
        "Bleach in detergents can oxidize certain amino acids, especially methionine, which contains a sulfur atom that reacts easily with oxygen. In subtilisin, a methionine sits right next to the active-site serine. When bleach oxidizes it, the active site is distorted and the enzyme stops working. In the 1980s, scientists used genetic engineering to replace this easily oxidized methionine with a different amino acid, such as alanine or serine, which can't be oxidized the same way. Changing one chosen amino acid like this is called site-directed mutagenesis.",
        "The enzyme keeps working in detergents that also contain oxygen bleach, an early success of protein engineering. Since then, detergent enzymes have been engineered to work in cold water, tolerate high pH and resist other detergent ingredients. Modern detergents may contain several engineered enzymes, including amylases for starch and lipases for fats. This makes it possible to clean well at low temperatures, saving energy. Protein engineering is now used to design enzymes for many industries.",
        "established",
      ),
      mech(
        "Respiratory allergy",
        "Proteases are proteins, and the immune system can treat foreign proteins as invaders. When enzyme dust is breathed in, the immune system recognizes it as a foreign protein lining the airways. In some people, it responds by producing IgE antibodies, which recognize that particular enzyme. These antibodies attach to mast cells, immune cells found in the airways. This first stage, called sensitization, causes no symptoms.",
        "People can develop IgE-mediated allergy and asthma, which is why enzymes are sold encapsulated or in liquids, not as loose dust. Once someone is sensitized, breathing in even tiny amounts of the enzyme makes their mast cells release histamine and other chemicals, causing sneezing, a runny nose, watery eyes, wheezing and asthma attacks. This was seen mainly in detergent factory workers in the late 1960s. Studies of people using enzyme detergents at home haven't found a meaningful allergy risk from normal use. Encapsulation, liquid formulas and air monitoring have greatly reduced cases among workers.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Peptide-bond hydrolysis",
        "Hydrolysis means “splitting with water”: a water molecule is used to break a bond. Peptide bonds are very stable, and without an enzyme they would take years to break in plain water. Subtilisin speeds this up enormously by guiding the reaction through a series of steps. The mechanism is the same as in chymotrypsin, a digestive enzyme in your gut, even though the two enzymes evolved separately. That makes it a famous example of convergent evolution at the molecular level.",
        [
          ["Acylation", "Activated serine attacks the peptide bond's carbonyl carbon, forming a tetrahedral intermediate. For a moment the carbon is bonded to four groups instead of three, and its oxygen carries a negative charge. A pocket in the enzyme called the oxyanion hole steadies that charge with hydrogen bonds."],
          ["Cleavage", "The bond breaks; one fragment leaves while the other stays attached to serine (the acyl-enzyme). Histidine passes the hydrogen it took from serine to the nitrogen of the departing fragment. The first piece of the protein drifts away."],
          ["Deacylation", "A water molecule, activated by histidine, attacks the acyl-enzyme. Histidine pulls a hydrogen ion from the water, making its oxygen a strong nucleophile. A second tetrahedral intermediate forms."],
          ["Reset", "The second fragment is released and the enzyme is ready for the next bond. Serine gets its hydrogen back, so the active site is restored exactly as it started. The whole cycle takes a tiny fraction of a second."],
        ],
        "Enzymes are catalysts: they speed reactions enormously and come out unchanged. That is why a detergent needs only a tiny amount of protease to digest a stain.",
        "R-CO-NH-R' + H2O → R-COOH + H2N-R'",
      ),
    ],
    hazards: [
      hz(
        "Respiratory sensitization",
        "Breathing in enzyme dust is mainly a workplace hazard for detergent manufacturers. In the late 1960s, soon after enzyme detergents appeared, many factory workers developed allergies and asthma from inhaling it. The industry responded by changing how enzymes are made and handled. Today the risk is mainly to people who work with concentrated enzymes, not consumers. Detergent enzymes are classified as respiratory sensitizers under hazard labeling rules.",
        "Airborne enzyme protein triggers antibody production in the lungs. Tiny particles of enzyme dust can be breathed deep into the airways, where the immune system meets the foreign protein. In susceptible people, it produces IgE antibodies against it. Proteases may make sensitization more likely because they can break down proteins that hold airway cells together, giving the enzyme easier access to immune cells. The risk depends on how much enzyme is in the air and for how long.",
        "Allergy and asthma symptoms in exposed workers led the industry to encapsulate enzymes and monitor air levels. Once someone is sensitized, even small exposures can cause sneezing, itchy eyes, chest tightness and asthma attacks. Factories now use dust-free granules and liquids and keep airborne levels extremely low, measured in billionths of a gram per cubic meter. Regular health checks catch sensitization in workers early. Consumers using finished detergents normally aren't exposed to enough enzyme dust to cause problems.",
      ),
    ],
    dosage:
      "Laundry and dishwasher detergents contain well under 1 percent active enzyme protein, often a small fraction of a percent, because enzymes are catalysts that work in tiny amounts. In finished products, enzymes are sealed in granules or dissolved in liquids, so consumers breathe in almost none. Workplace air limits for subtilisin are extremely low, around 60 nanograms per cubic meter. Use detergents as directed, avoid breathing in powder dust and keep products away from children. Detergents for wool and silk usually leave protease out.",
    synthesis: [
      route(
        "Fermentation",
        "Detergent enzymes are made by microorganisms, mostly Bacillus bacteria, grown in huge fermentation tanks. Bacillus species naturally release proteases into their surroundings to break down proteins for food. Companies have engineered strains that produce far more enzyme than wild ones. This approach is called industrial biotechnology. The same technology produces enzymes for food processing, textiles and biofuels.",
        "Engineered Bacillus strains grow in large fermenters, steel tanks holding many thousands of liters of nutrient broth containing sugars and proteins. The tanks are kept sterile, stirred and supplied with air at a controlled temperature and pH, and the bacteria secrete protease into the broth. After a few days, the bacteria are removed by filtration or centrifugation. The enzyme solution is recovered and concentrated, often by ultrafiltration through membranes that let water through but hold back the larger enzyme molecules. Finally, it is encapsulated in dust-free granules for powders or stabilized in liquid for liquid detergents.",
        { significance: "Otto Röhm made the first enzyme detergent in 1913 using enzymes from animal pancreas; bacterial enzymes took over in the 1960s." },
      ),
    ],
  },
};
