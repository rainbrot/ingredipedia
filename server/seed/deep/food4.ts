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
        "When fats and oils are exposed to oxygen, free radicals form: molecules with an unpaired electron that set off chain reactions of damage. A peroxyl radical (ROO•), created when oxygen attacks a fat molecule, is a key link in that chain. BHT stops it by donating the hydrogen atom from its –OH group, which turns the peroxyl radical into a stable hydroperoxide. What's left on BHT is a phenoxyl radical, but its unpaired electron is spread out over the benzene ring, a stabilizing effect called resonance. On top of that, the two bulky tert-butyl groups on either side physically block the radical from reaching and attacking other molecules.",
        "By breaking the chain early, BHT keeps the fats in breakfast cereals, chewing gum, snack foods and cosmetics from oxidizing. Oxidized fats taste and smell rancid, like stale crackers or old cardboard, and can lose nutritional value. With BHT, products stay fresh for months. In cereals it is often added to the packaging liner rather than the food itself, and small amounts slowly migrate into the cereal. BHT is also used in rubber, plastics and jet fuel for the same reason.",
        "established",
      ),
      mech(
        "Liver metabolism",
        "When BHT is eaten, it is absorbed and carried to the liver, where a family of enzymes called cytochrome P450 work to make it easier to excrete. These enzymes add oxygen atoms to BHT's methyl group and tert-butyl groups. One product of this process is a quinone methide, a reactive molecule that can bond to proteins and other molecules in the cell. Most BHT and its breakdown products are eventually attached to other molecules and excreted in urine and feces. Because BHT dissolves in fat, though, small amounts can be stored in body fat.",
        "In rats and mice given high doses of BHT, the liver grew larger as it made extra enzymes to process the chemical. High doses also affected the thyroid gland and, in mice, the lungs. Some BHT breakdown products can bind to proteins in cells, which may explain some of these effects. These high-dose findings are why regulators set a relatively low acceptable daily intake for BHT compared with many other additives. At normal dietary levels, such effects are not expected.",
        "lab",
      ),
      mech(
        "Mixed animal cancer data",
        "BHT's effects on cancer in animal studies are surprisingly mixed. When given before or alongside known cancer-causing chemicals, BHT sometimes reduced tumors, perhaps because it boosted the liver enzymes that detoxify carcinogens or because of its antioxidant activity. When given after a carcinogen, it sometimes increased tumors, possibly by encouraging damaged cells to grow. The outcome depended on the dose, the timing, the animal species and the organ studied. BHT itself doesn't appear to damage DNA directly.",
        "Because of these conflicting results, the International Agency for Research on Cancer lists BHT as “not classifiable as to its carcinogenicity to humans” (Group 3), meaning there isn't enough evidence either way. The doses in animal studies were typically hundreds or thousands of times higher than what people eat. Some researchers have even studied BHT as a possible protective agent, though that hasn't been shown either. Regulators continue to allow it at low levels with safety margins. Some food companies have removed it anyway in response to consumer concern.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Hydrogen-atom transfer",
        "BHT protects fats through a reaction called hydrogen-atom transfer, in which it hands a single hydrogen atom, a proton together with an electron, to a free radical. This turns a dangerous, reactive radical into a stable molecule and stops the chain reaction of oxidation. BHT's special structure, with bulky groups guarding its reactive –OH, makes the radical it leaves behind unusually stable. Antioxidants built this way are called hindered phenols. Many antioxidants used in foods, plastics and fuels work on the same principle.",
        [
          ["Attack", "As fat oxidizes, oxygen reacts with fat molecules to form peroxyl radicals (ROO•), which are reactive and want to steal a hydrogen atom. Normally they would take it from another fat molecule, keeping the chain going. Instead, a peroxyl radical collides with a BHT molecule."],
          ["Transfer", "BHT's O–H bond is relatively weak, so it gives up its hydrogen atom easily. The peroxyl radical takes it and becomes a hydroperoxide (ROOH), a stable molecule that doesn't continue the chain. The fat molecules nearby are spared."],
          ["Stabilization", "BHT is left as a phenoxyl radical with an unpaired electron on its oxygen. That electron spreads out over the benzene ring, which lowers its energy. The two large tert-butyl groups crowd around the oxygen and stop it from reacting with anything else."],
        ],
        "Each BHT molecule can stop up to two radical chains before it is used up, because its phenoxyl radical can trap a second radical. So a small amount of BHT protects a large amount of fat. Eventually, though, all the BHT is consumed and oxidation picks up again.",
        "ROO• + ArOH → ROOH + ArO•",
      ),
      rxn(
        "Friedel–Crafts alkylation (how it's made)",
        "BHT is made by attaching two bulky tert-butyl groups to a simpler molecule called p-cresol, using a classic reaction called Friedel–Crafts alkylation. The reaction, developed by Charles Friedel and James Crafts in 1877, attaches carbon groups to aromatic rings. It works by generating a positively charged carbon fragment called a carbocation, which attacks the ring. Where the new groups attach is steered by the –OH group already on the ring. The same type of reaction is used to make many antioxidants for fuels, plastics and rubber.",
        [
          ["Carbocation", "Isobutylene, a small gas with a carbon–carbon double bond, is treated with an acid catalyst. The acid adds a hydrogen ion to the double bond, forming a tert-butyl carbocation, a carbon atom with only three bonds and a positive charge. This carbocation is very hungry for electrons."],
          ["Substitution", "p-Cresol's –OH group pushes electrons into the benzene ring, making the positions right next to it especially electron-rich. The carbocation attacks one of these positions, and a hydrogen on the ring is replaced by the tert-butyl group. This is called electrophilic aromatic substitution."],
          ["Repeat", "The reaction happens again on the other side of the –OH group, adding a second tert-butyl group. Now the –OH is flanked by two bulky groups and the BHT molecule is complete. The product is purified to remove molecules that picked up only one tert-butyl group."],
        ],
        "The two bulky groups are what make BHT an effective antioxidant, shielding its radical from further reactions. The same reaction type is used to make many antioxidants for fuels, plastics and rubber.",
      ),
    ],
    hazards: [
      hz(
        "Effects at high doses in animals",
        "The main safety concerns about BHT come from animal studies that used much higher doses than people normally eat. These studies found effects on the liver, thyroid, lungs and, in some cases, development. Regulators use such data to set an acceptable daily intake with a large safety margin. Because of these findings, some countries restrict BHT more than others, and some food companies have dropped it. For typical diets, exposure is well below the levels of concern.",
        "At high doses, liver enzymes convert BHT into several breakdown products, including reactive quinone methides that can bind to proteins and may interfere with how they work. The liver also responds by making more of these enzymes, which can change how it handles other substances, including hormones and medicines. This enzyme boost, called induction, is one of the main effects seen in animals. BHT dissolves in fat, so with long-term high exposure some of it can build up in body fat. All of these effects depend strongly on dose.",
        "In rodents fed high doses, effects included enlarged livers, changes in thyroid hormones and, in mice, lung damage. Some studies also hinted at effects on hormone signaling. Starting from the highest dose that caused no effect in animals and dividing by a 100-fold safety factor, the European Food Safety Authority set an acceptable daily intake of 0.25 milligrams per kilogram of body weight. For a 60-kilogram adult that is 15 milligrams a day. Estimated human intakes are well below this.",
      ),
      hz(
        "Rare contact allergy",
        "BHT is used in many cosmetics, such as lipsticks, moisturizers and makeup, to keep their oils from going rancid. In rare cases, people develop an allergic skin reaction to it. This is called allergic contact dermatitis, and it involves the immune system learning to recognize the substance. BHT is considered a weak allergen, and reactions are uncommon. People who know they're allergic can check ingredient lists.",
        "When BHT oxidizes, either in the product or on the skin, it can form reactive molecules such as quinone methides. These can form chemical bonds with proteins in the skin. A small molecule that becomes an allergen by attaching to a protein is called a hapten. The modified protein looks unfamiliar to the immune system. This is the same general mechanism behind many chemical skin allergies.",
        "In a sensitized person, immune cells in the skin recognize the BHT-modified proteins and trigger inflammation. That causes redness, itching, swelling and sometimes small blisters where the product was applied, usually appearing a day or two after contact. The reaction stays limited to the areas that touched the product. Once someone is sensitized, it can come back with every exposure. Dermatologists can identify the cause with patch testing.",
      ),
    ],
    dosage:
      "The European Food Safety Authority has set an acceptable daily intake for BHT of 0.25 milligrams per kilogram of body weight, about 15 milligrams a day for a 60-kilogram adult, and international experts (JECFA) set a similar limit. Foods that use it, such as cereals, snack foods and chewing gum, typically contain tens of parts per million, and sometimes it is added to the packaging rather than the food. Estimated human intakes are well below the ADI. Cosmetics use small amounts, usually well under 1 percent. People who want to avoid it can look for “BHT” or “butylated hydroxytoluene” on labels.",
    synthesis: [
      route(
        "Industrial alkylation",
        "BHT is made in chemical plants from two starting materials: p-cresol, a phenol carrying a methyl group, and isobutylene, a small hydrocarbon gas. Both come from petroleum or coal tar. The process uses Friedel–Crafts alkylation to attach the bulky tert-butyl groups that make BHT work. It was patented in 1947 and quickly adopted as an antioxidant for foods, rubber, plastics and fuels. Most BHT made today goes into non-food products.",
        "p-Cresol is heated with isobutylene gas in the presence of an acid catalyst, such as sulfuric acid or an acidic resin. The acid converts isobutylene into tert-butyl carbocations, which attack the electron-rich positions on the p-cresol ring next to its –OH group. Two tert-butyl groups are added, one on each side. The crude product contains BHT along with some partly alkylated molecules and other byproducts. It is purified by distillation, which separates molecules by boiling point, and by crystallization, giving white crystals of food-grade BHT.",
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
        "Starch is broken down by enzymes called amylases, which are found in saliva and released by the pancreas into the small intestine. Amylases cut the α-1,4 bonds that link glucose units into chains. Maltodextrin's chains are much shorter than starch's, so they offer many more chain ends and exposed bonds for the enzymes to attack. Another enzyme, maltase, sitting on the surface of intestinal cells, finishes the job by splitting two-unit pieces into single glucose molecules. Because maltodextrin is already partly broken down and dissolves so easily, all of this happens very quickly.",
        "Glucose from maltodextrin is absorbed almost as fast as pure glucose, causing a rapid rise in blood sugar. Its glycemic index, a measure of how quickly a food raises blood sugar, can be higher than that of table sugar, which is half fructose. For endurance athletes this is useful: sports drinks and energy gels use maltodextrin to deliver energy quickly without tasting overly sweet. For people who aren't exercising, especially those with diabetes, rapid blood sugar spikes are less welcome. The effect depends on how much maltodextrin a food actually contains.",
        "human",
      ),
      mech(
        "Carrying flavors",
        "Maltodextrin is often used to turn liquid flavors into powders by spray-drying. A mixture of maltodextrin, water and tiny droplets of flavor oil is sprayed into hot air. As the water evaporates in a fraction of a second, the maltodextrin hardens into a solid, glassy shell around each flavor droplet. In this glassy state the molecules are packed so tightly that they barely move, so volatile flavor molecules are trapped inside. The shell also shields the flavor from oxygen, slowing down oxidation.",
        "When you eat a powdered seasoning, flavored chips or instant soup, the maltodextrin shell dissolves in your saliva and releases the trapped flavor molecules, which then reach your taste and smell receptors. This keeps flavors fresh in the package and lets them burst out when eaten. Because maltodextrin itself is almost tasteless, it doesn't get in the way of the flavor. It also adds bulk and helps powders pour without clumping. Many drink mixes, seasonings and supplements rely on it.",
        "established",
      ),
      mech(
        "Gut microbiome questions",
        "Most maltodextrin is digested and absorbed in the small intestine, but some can reach the large intestine, especially when large amounts are eaten. There, certain bacteria can use it as food. Laboratory studies have found that maltodextrin helps some bacteria, including certain strains of E. coli, form biofilms, sticky layers of bacteria that cling to surfaces. Maltodextrin may also affect the protective mucus layer lining the gut. These interactions are still being studied.",
        "In mouse and cell studies, maltodextrin has been linked to thinning of the intestinal mucus layer and to increases in bacteria associated with inflammation, which could in theory matter for conditions like inflammatory bowel disease. Some researchers have suggested it might weaken the gut's ability to fend off harmful bacteria. However, these findings come mainly from laboratory and animal work, and evidence in people is limited. The amounts used in studies may also differ from typical diets. This is an emerging area of research.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Partial starch hydrolysis",
        "Maltodextrin is made by breaking starch, a very long chain of glucose units, into shorter pieces, but not all the way down to single glucose molecules. The trick is to stop the reaction at just the right point. The degree of breakdown is measured by dextrose equivalent (DE), which describes how sweet and reactive the product is compared with pure glucose. Pure starch has a DE near 0 and pure glucose has a DE of 100. Maltodextrin falls between about 3 and 20.",
        [
          ["Gelatinization", "Starch granules from corn, potato, rice or another plant are mixed with water and heated. The heat makes the granules swell and burst, releasing their long chains into the water. This makes the chains reachable by enzymes."],
          ["Cutting", "An enzyme called alpha-amylase is added, and it cuts α-1,4 bonds at random places along the starch chains. Each cut makes two shorter pieces. Over time the chains get shorter and shorter, producing a mixture of fragments of many different lengths."],
          ["Stopping", "When the mixture reaches the target DE, the reaction is stopped by heating to destroy the enzyme or by adding acid. Timing is crucial, since letting it run longer produces more simple sugars such as glucose and maltose."],
        ],
        "Stopping earlier gives longer chains (low DE: less sweet and more viscous); running longer gives shorter chains and sweeter syrups. This lets manufacturers make maltodextrins with different properties for different jobs.",
        "(C6H10O5)n + H2O → shorter glucose chains",
      ),
      rxn(
        "Spray-drying encapsulation",
        "Spray-drying is a fast way to turn a liquid into a fine powder, and maltodextrin is one of the most common materials used in it. It is how powdered flavors, instant drinks and many nutritional supplements are made. The process relies on how quickly water evaporates from tiny droplets surrounded by hot air. Maltodextrin forms a protective shell around the flavor or nutrient. The same method makes powdered milk and instant coffee.",
        [
          ["Mixing", "Maltodextrin is dissolved in water, and a flavor oil or other ingredient is added and broken up into tiny droplets. The maltodextrin coats the droplets and thickens the mixture. The liquid is now ready to spray."],
          ["Atomizing", "The mixture is pumped through a nozzle or a spinning disk that sprays it as a very fine mist into a chamber of hot air, often around 150 to 200 °C. The enormous surface area of the tiny droplets lets water evaporate almost instantly."],
          ["Drying", "Water evaporates within seconds, and because evaporation cools the droplets, the flavor inside doesn't get too hot. The maltodextrin hardens into a glassy shell with the flavor trapped inside. The dry particles fall to the bottom of the chamber and are collected as powder."],
        ],
        "Encapsulation protects sensitive ingredients from air and moisture, extending shelf life. When the powder is mixed with water or eaten, the shell dissolves and releases what it holds. The same method makes powdered milk, instant coffee and many dried vitamins.",
      ),
    ],
    hazards: [
      hz(
        "High glycemic load",
        "Maltodextrin is digested very quickly, so foods or drinks that contain a lot of it can cause a sharp rise in blood sugar. This mainly matters in products where it is a major ingredient, such as sports drinks, protein powders, meal replacements and some snacks. In most foods it is present in small amounts as a thickener or carrier and has little effect. People with diabetes or insulin resistance should be aware of it. Checking the total carbohydrate figure on the Nutrition Facts label helps.",
        "Maltodextrin's short glucose chains are broken down by amylases and maltase into glucose almost as quickly as pure glucose is absorbed. Its glycemic index, which compares how fast a food raises blood sugar against pure glucose, ranges from about 85 to over 100. Table sugar, which is half fructose, scores around 65. Glycemic load takes into account both the glycemic index and how much carbohydrate is eaten. Foods with a high glycemic load cause bigger blood sugar spikes.",
        "When blood sugar rises quickly, the pancreas releases a large amount of insulin to bring it back down. In people with diabetes, either not enough insulin is made or the body responds poorly to it, so blood sugar stays high for longer. Over years, frequently high blood sugar contributes to damage in the eyes, kidneys and nerves. Healthy people handle occasional spikes easily, but a diet heavy in rapidly digested carbohydrates is linked to a higher risk of type 2 diabetes. For athletes in the middle of long exercise, the quick energy is exactly what they need.",
      ),
    ],
    dosage:
      "In most foods, maltodextrin is used in small amounts, often a few percent or less, as a thickener, filler or flavor carrier, and it contributes few calories. The U.S. FDA considers it generally recognized as safe, with no set limit on daily intake. The main thing to watch is products where it is a major ingredient, such as sports drinks, energy gels, protein powders and meal replacements, which can contain tens of grams per serving. Like sugar, it provides about 4 calories per gram. People managing their blood sugar should count it as a rapidly digested carbohydrate.",
    synthesis: [
      route(
        "Enzymatic processing of starch",
        "Maltodextrin is made from starch, the main energy store of plants, taken from crops such as corn, potato, rice, tapioca or wheat. In the United States most of it comes from corn. The starch is partly broken down by enzymes in a carefully controlled process. The result is a white, nearly flavorless powder that dissolves easily in water. It is one of the most widely used food ingredients, found in everything from salad dressings to sports drinks.",
        "Purified starch is mixed with water into a slurry and heated to gelatinize it, meaning the granules swell and burst so their chains are released. Heat-stable alpha-amylase enzymes, often made by bacteria, are added to cut the long starch chains into shorter fragments. Technicians monitor the dextrose equivalent and stop the reaction by heating or changing the pH once the target is reached. The resulting syrup is filtered and cleaned with activated carbon and ion-exchange resins to remove impurities. Finally it is spray-dried into a fine white powder.",
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
        "Muscle contains a protein called myoglobin, which stores oxygen and has an iron atom at its center inside a ring-shaped structure called heme. The color of meat depends on what is attached to that iron: bright red with oxygen, purple without it, and brownish-gray when the iron is oxidized or the protein is cooked. In cured meat, nitrite is converted, partly with help from added vitamin C, into nitric oxide (NO). Nitric oxide binds tightly to the iron in myoglobin, forming red nitrosylmyoglobin. When the meat is cooked, the protein part unfolds but the nitric oxide stays attached to the heme, forming a stable pink pigment called nitrosyl hemochrome.",
        "That's why cooked ham, bacon, hot dogs and corned beef stay pink, while ordinary cooked pork or beef turns gray-brown. The pink color lasts a long time, which keeps cured meats looking appealing. Because nitric oxide is bound so tightly, the color resists fading during storage. Without nitrite, cured meats would look gray like cooked fresh meat. The same reaction between nitric oxide and heme proteins happens inside our own bodies, where NO acts as a signaling molecule.",
        "established",
      ),
      mech(
        "Preventing botulism",
        "Clostridium botulinum is a bacterium that forms tough spores, which can survive cooking and then grow in low-oxygen places such as vacuum-packed or canned meats. When the spores sprout into active bacteria, they produce botulinum toxin, one of the most powerful toxins known. Nitrite and the nitric oxide formed from it react with iron-sulfur proteins inside bacterial cells. These proteins are essential parts of the enzymes the bacteria use to produce energy, such as one called ferredoxin. When they are disabled, the bacteria can't make enough energy to grow.",
        "With their energy-producing enzymes blocked, C. botulinum spores can't sprout and turn into toxin-producing cells. Botulinum toxin blocks the release of acetylcholine, the chemical messenger nerves use to tell muscles to contract, causing paralysis that can be fatal if it reaches the breathing muscles. Before nitrite curing was understood and controlled, botulism from cured meats was a serious problem; the name comes from the Latin botulus, meaning sausage. Nitrite's protection matters most in products like ham and sausages that are stored without oxygen. This is the main reason regulators allow nitrite despite its downsides.",
        "established",
      ),
      mech(
        "Forming nitrosamines",
        "In acidic conditions or at high temperatures, nitrite forms reactive nitrogen compounds called nitrosating agents, such as dinitrogen trioxide. These can transfer a nitroso group (–N=O) onto amines, nitrogen-containing molecules that come from the breakdown of proteins in meat. The products are N-nitrosamines. This can happen during cooking, especially high-heat frying of bacon, and also in the acidic stomach. Secondary amines, nitrogen atoms attached to two carbon groups, react most readily.",
        "N-nitrosamines themselves aren't very reactive, but liver enzymes called cytochrome P450 convert them into highly reactive molecules. These attach small carbon groups to DNA bases, a type of damage called alkylation, which can cause copying errors and mutations if not repaired. Many nitrosamines cause cancer in animal studies. Together with other factors, nitrosamine formation is part of why the World Health Organization's cancer agency classifies processed meat as carcinogenic to humans. Adding vitamin C to cured meats greatly reduces how many nitrosamines form.",
        "established",
      ),
      mech(
        "The body's own nitrite",
        "Vegetables such as spinach, beets, lettuce and celery contain large amounts of nitrate (NO₃⁻), which plants absorb from the soil. When you eat them, nitrate is absorbed into the blood, and some of it is concentrated into saliva. Bacteria living on the back of the tongue convert this nitrate into nitrite (NO₂⁻) by removing an oxygen atom, a reaction called reduction. When the nitrite-rich saliva is swallowed, stomach acid turns some of it into nitric oxide. This route is called the nitrate–nitrite–nitric oxide pathway.",
        "Nitric oxide made this way helps relax and widen blood vessels, which can lower blood pressure, and may help protect the stomach lining and kill harmful bacteria. Studies show that eating nitrate-rich vegetables like beets can lower blood pressure slightly. In fact, vegetables supply most of the nitrite people are exposed to, far more than cured meats. But vegetables also bring vitamin C, polyphenols and other antioxidants that limit nitrosamine formation. That is one reason nitrate from vegetables is considered beneficial while nitrite in processed meat is linked to cancer risk.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Nitrosamine formation",
        "Nitrosamines form when nitrite reacts with certain amines under acidic or hot conditions. This reaction is a key reason processed meats are linked to cancer, and food scientists have worked hard to reduce it. Frying bacon at high temperature is one of the main situations where nitrosamines form in food. Adding vitamin C or a closely related compound, erythorbate, to cured meats greatly reduces their formation. Understanding this reaction has led to safer curing practices.",
        [
          ["Acidification", "In acidic conditions, such as the stomach or meat being heated, nitrite ions (NO₂⁻) pick up a hydrogen ion and become nitrous acid (HNO₂). Nitrous acid is unstable and reactive. This is the first step toward nitrosamines."],
          ["Nitrosating agent", "Two nitrous acid molecules can combine and lose a water molecule to form dinitrogen trioxide (N₂O₃), a powerful nitrosating agent. It easily hands an –N=O group to other molecules. This is the species that actually forms nitrosamines."],
          ["Nitrosation", "N₂O₃ reacts with a secondary amine, a nitrogen atom bonded to two carbon groups, which comes from the breakdown of meat proteins. The –N=O group attaches to the amine's nitrogen, forming an N-nitrosamine. The high heat of frying speeds this up."],
          ["Blocking", "Added ascorbate (vitamin C) or erythorbate reacts with nitrous acid faster than the amines can, reducing it to harmless nitric oxide. That cuts off the pathway before nitrosamines can form. Antioxidants in vegetables work the same way."],
        ],
        "High-heat frying of bacon favors nitrosamines, which is why U.S. rules require bacon to contain added vitamin C or erythorbate and limit how much nitrite can be used. Cooking bacon at lower temperatures, or in a microwave, also reduces nitrosamine formation.",
        "R2NH + HNO2 → R2N-NO + H2O",
      ),
      rxn(
        "Developing cured color",
        "The pink color of cured meats develops through a series of reactions between nitrite and myoglobin, the red protein in muscle. It builds up over hours to days during curing and is completed by cooking. Scientists worked this out in the early 1900s, when they discovered that nitrite, not nitrate, was the real curing agent. The same process also creates the distinctive flavor of cured meat. Vitamin C speeds it up.",
        [
          ["Reduction", "Nitrite added to meat is reduced to nitric oxide (NO) by gaining an electron. This happens slowly on its own, but added ascorbate (vitamin C) or erythorbate speeds it up greatly by donating electrons. Natural reducing substances in the meat also help."],
          ["Binding", "Nitric oxide binds tightly to the iron atom at the center of myoglobin's heme group, forming nitrosylmyoglobin. This compound is red, similar to fresh meat. The bond is very strong and isn't displaced by oxygen."],
          ["Cooking", "When the meat is heated, the protein part of myoglobin unfolds, a process called denaturation. The nitric oxide stays attached to the heme, now surrounded by unfolded protein, forming nitrosyl hemochrome. This stable compound has the familiar pink color."],
        ],
        "The same NO–iron chemistry is how nitric oxide sends signals in your blood vessels, where it binds to the iron in an enzyme and triggers the vessel wall to relax. In meat, it gives a lasting pink color that survives cooking and storage.",
      ),
    ],
    hazards: [
      hz(
        "Processed meat and colorectal cancer",
        "In 2015 the International Agency for Research on Cancer classified processed meat, such as bacon, ham, hot dogs and salami, as a Group 1 carcinogen, meaning there is sufficient evidence that it causes cancer in people, specifically colorectal cancer. The category describes how strong the evidence is, not how dangerous the substance is; tobacco is also in Group 1, but processed meat is far less risky. The risk grows with the amount eaten regularly. Nitrite is one of several factors involved. Health organizations recommend eating little, if any, processed meat.",
        "Several chemical processes may explain the link. Nitrite in processed meat can form N-nitrosamines and related compounds, either during cooking or inside the stomach and gut. Red and processed meats also contain heme, the iron-containing part of myoglobin, which can encourage nitroso compounds to form in the gut and can generate reactive molecules that damage the gut lining. High-temperature cooking produces other potential carcinogens as well, such as heterocyclic amines and polycyclic aromatic hydrocarbons. All of these can damage DNA in the cells lining the colon.",
        "The cells lining the colon are constantly dividing to replace those shed from the surface, so DNA damage there can accumulate over time and contribute to cancer. Irritation from heme may also speed up cell division, giving more chances for mutations. IARC estimated that eating 50 grams of processed meat every day, about one hot dog or a few slices of ham, raises the risk of colorectal cancer by about 18 percent. Because colorectal cancer is common, that matters across a whole population. For an individual, the absolute risk remains relatively low.",
      ),
      hz(
        "Methemoglobinemia (acute poisoning)",
        "Swallowing a large amount of sodium nitrite can cause a dangerous condition called methemoglobinemia, in which the blood can't carry oxygen properly. Concentrated curing salts containing sodium nitrite have caused poisonings when mistaken for table salt or sugar. That's why curing salt, sold as “pink curing salt” or “Prague powder,” is dyed pink. Infants are especially vulnerable, which is one reason nitrate in drinking water is regulated. Because concentrated sodium nitrite has also been misused deliberately, some countries now restrict its sale.",
        "Hemoglobin, the protein in red blood cells that carries oxygen, contains iron in its ferrous form, Fe²⁺, which can bind oxygen. Nitrite is an oxidizing agent: it can pull an electron off that iron, converting it to the ferric form, Fe³⁺. Hemoglobin with ferric iron is called methemoglobin, and it can't bind oxygen. It also makes the remaining normal hemoglobin hold onto its oxygen more tightly, so less is released to the tissues. The body has an enzyme that converts small amounts of methemoglobin back, but a large dose overwhelms it.",
        "When more than about 10 to 20 percent of hemoglobin has become methemoglobin, the skin and lips turn bluish-gray, a sign called cyanosis. Higher levels cause headache, dizziness, a racing heart, shortness of breath and confusion as organs run short of oxygen. Very high levels, above about 70 percent, can be fatal. Doctors treat severe cases with a drug called methylene blue, which helps convert methemoglobin back to normal hemoglobin. Babies under six months are especially vulnerable because their enzyme for reversing methemoglobin is not yet fully developed.",
      ),
    ],
    dosage:
      "U.S. rules limit how much nitrite can be added to cured meats; for bacon the limit is 120 parts per million, and much of it is used up during curing, leaving tens of parts per million or less in the finished product. Bacon must also contain added vitamin C or erythorbate to curb nitrosamine formation. Most of the nitrite people are exposed to actually comes from vegetable nitrate converted by mouth bacteria, which arrives with protective antioxidants. International experts have set an acceptable daily intake for nitrite of 0.07 milligrams per kilogram of body weight. Cancer organizations recommend eating little, if any, processed meat.",
    synthesis: [
      route(
        "Absorbing nitrogen oxides",
        "Sodium nitrite is made industrially from nitrogen oxides, gases containing nitrogen and oxygen that are produced by burning ammonia. This process is closely tied to the manufacture of nitric acid, which is used to make fertilizers and explosives. The nitrogen oxides are captured in a basic solution that converts them into sodium nitrite. The product is purified and sold for curing meat, preventing corrosion and making dyes and medicines. Food-grade sodium nitrite must meet strict purity standards.",
        "First, ammonia (NH₃) is burned with air over a platinum catalyst at about 900 °C, producing nitric oxide (NO) and water. Some of the nitric oxide reacts further with oxygen to form nitrogen dioxide (NO₂). A mixture of NO and NO₂ in roughly equal amounts is bubbled through a solution of sodium hydroxide or sodium carbonate. The two gases react together with the base to form sodium nitrite and water. Any sodium nitrate formed as a byproduct is separated off, and the sodium nitrite is crystallized, dried and packaged.",
        { equation: "2 NaOH + NO + NO2 → 2 NaNO2 + H2O", significance: "The same burning of ammonia, called the Ostwald process, is the first step in making nitric acid for fertilizers." },
      ),
      route(
        "“Natural” curing with celery powder",
        "Many processed meats labeled “uncured” or “no nitrites added” are actually cured with celery powder or celery juice instead of sodium nitrite. Celery naturally contains a lot of nitrate, which can be turned into nitrite. U.S. labeling rules require these products to say “uncured” along with “no nitrates or nitrites added except those naturally occurring in celery powder.” But the meat ends up containing nitrite that works exactly the same way. Some studies have found similar or even higher nitrite levels in these products.",
        "Celery is grown and harvested, and its juice, rich in nitrate absorbed from the soil, is extracted. Bacteria, often a species called Staphylococcus carnosus, are added to the juice. These bacteria have an enzyme called nitrate reductase that removes an oxygen atom from nitrate, converting it into nitrite. After fermentation, the nitrite-rich juice is dried into a powder. Added to meat, this nitrite cures it exactly as sodium nitrite does, producing the pink color, cured flavor and protection against botulism.",
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
        "Fats are made of molecules called triglycerides, each with three fatty-acid chains attached to a glycerol backbone. Saturated fatty acids such as palmitic acid have only single bonds between their carbon atoms, so their chains are straight and can line up closely, like pencils in a box. Unsaturated fatty acids such as oleic acid have a double bond that puts a kink in the chain and stops it packing tightly. Where straight chains pack tightly they form stable crystals, which makes a fat solid. Palm oil's mix of roughly half straight and half kinked chains leaves it semi-solid at room temperature.",
        "Palm oil's crystal structure gives baked goods, spreads and sweets a pleasing texture. Because its fatty-acid mix melts close to body temperature, it feels creamy and melts smoothly in the mouth. In pastries, layers of solid fat create flakiness, and in spreads it provides spreadability without needing trans fats. This is why palm oil replaced partially hydrogenated oils, which contained harmful trans fats, in many products. It turns up in close to half of all packaged supermarket products, from bread to shampoo.",
        "established",
      ),
      mech(
        "Raising LDL cholesterol",
        "LDL (low-density lipoprotein) particles carry cholesterol through the blood. The liver clears LDL using LDL receptors on the surface of liver cells, which grab LDL particles and pull them inside. Saturated fatty acids, palmitic acid in particular, reduce the number and activity of these receptors. With fewer receptors at work, LDL particles stay in the blood longer and LDL cholesterol rises. Unsaturated fatty acids, such as the oleic acid in olive oil, don't have this effect and may even boost receptor activity.",
        "Over many years, high LDL cholesterol can lead to fatty plaques building up in artery walls, a process called atherosclerosis. These plaques narrow the arteries and can rupture, triggering blood clots that cause heart attacks or strokes. Studies comparing oils show that palm oil raises LDL cholesterol more than unsaturated oils like olive, canola or sunflower oil, though less than butter. That is why health guidelines recommend swapping saturated fats for unsaturated ones. Palm oil is still a better choice than the trans fats it replaced in many products.",
        "human",
      ),
      mech(
        "Beta-carotene in red palm oil",
        "Unrefined palm oil is rich in carotenoids, especially beta-carotene, the same pigment that makes carrots orange. Beta-carotene has a long chain of alternating single and double bonds, a conjugated system that absorbs blue light, so it looks orange-red. In the intestine, an enzyme can split a beta-carotene molecule in half to make vitamin A. Red palm oil is one of the richest natural sources of beta-carotene. Refining, especially the bleaching and deodorizing steps, removes most of it.",
        "Vitamin A is essential for vision, especially in dim light, for a healthy immune system and for growth. Vitamin A deficiency is a major cause of preventable blindness in children in parts of the world. Red palm oil has been used in programs in India and parts of Africa to help prevent deficiency, particularly in children and pregnant women. Because beta-carotene dissolves in fat, it is well absorbed when eaten in oil. Most palm oil sold commercially, however, is refined and pale, having lost these carotenoids.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Saponification (making soap)",
        "Saponification is the reaction that turns fats and oils into soap. People have used it for thousands of years, and it involves heating fat with a strong base such as sodium hydroxide, also called lye. The base breaks the ester bonds that hold fatty acids to glycerol. The fatty acids become soap molecules, and glycerol is released as a byproduct. Palm oil is widely used in soapmaking because its fatty acids make hard, long-lasting bars.",
        [
          ["Attack", "Hydroxide ions (OH⁻) from the lye attack the carbon atoms in the ester bonds linking each fatty acid to the glycerol backbone. These carbons are slightly positive because they are attached to two oxygen atoms. The hydroxide bonds to the carbon and the ester bond breaks."],
          ["Release", "As each ester bond breaks, a fatty acid comes free of the glycerol. Once all three bonds have broken, glycerol is released as its own molecule with three –OH groups. Glycerol is valuable in cosmetics and foods."],
          ["Soap", "Each fatty acid, now carrying a negatively charged carboxylate group, pairs with a sodium ion to form a fatty-acid salt. These salts are soap molecules, with a long oily tail and a charged, water-loving head that together let them trap grease in water."],
        ],
        "Many bar soaps list “sodium palmate,” which is soap made from palm oil; it makes hard bars with a creamy lather. The same reaction happens slowly when fats meet strong cleaning products, which is how drain cleaners dissolve greasy clogs.",
        "C3H5(OOCR)3 + 3 NaOH → C3H5(OH)3 + 3 RCOONa",
      ),
      rxn(
        "Refining contaminants",
        "Crude palm oil is refined to remove impurities, color and strong flavors, producing the pale, neutral oil used in most foods. One step, deodorization, uses very high temperatures. At those temperatures unwanted side reactions can create contaminants, notably glycidyl esters and 3-MCPD esters. These raised health concerns because of their effects in animal studies. Since the problem was identified, manufacturers have changed their processes to greatly reduce them.",
        [
          ["Deodorizing", "The oil is heated to about 230 to 260 °C under vacuum while steam is blown through it. This strips out volatile molecules responsible for unwanted smells and flavors, along with free fatty acids. The high temperature is needed to remove them efficiently."],
          ["Side reactions", "At these temperatures, diglycerides, glycerol molecules carrying two fatty acids, can lose a fatty acid and close into a three-atom ring, forming glycidyl esters. If chloride is present, it can react with glycerides to form 3-MCPD esters. Palm oil naturally contains more diglycerides than other oils, so it tends to form more of these contaminants."],
          ["Mitigation", "Manufacturers reduce these contaminants by washing out chloride before refining, deodorizing at lower temperatures for shorter times, and using fresher fruit that contains fewer diglycerides. Some contaminants can also be removed after refining."],
        ],
        "Since the European Food Safety Authority's 2016 opinion on these contaminants, industry changes have sharply reduced glycidyl ester levels in refined palm oil. The EU has also set legal maximum levels for them in oils and infant foods.",
      ),
    ],
    hazards: [
      hz(
        "Higher LDL cholesterol",
        "Palm oil isn't toxic, but because it is high in saturated fat, eating a lot of it can raise LDL cholesterol compared with oils rich in unsaturated fat. This is a concern about overall diet rather than any single food. Palm oil is less harmful than the trans fats it replaced in many processed foods, but more likely to raise cholesterol than olive, canola or sunflower oil. Because it is in so many processed foods, people can eat a fair amount without realizing it. Health guidelines recommend limiting saturated fat overall.",
        "About 44 percent of palm oil's fatty acids are palmitic acid, a saturated fat with 16 carbon atoms. Palmitic acid reduces the activity of LDL receptors in the liver, the proteins responsible for clearing LDL cholesterol from the blood. With fewer active receptors, LDL particles circulate longer and cholesterol levels rise. Palm oil also contains about 40 percent oleic acid, which partly offsets this effect. The overall impact depends on which fats palm oil is replacing in someone's diet.",
        "High LDL cholesterol is a major risk factor for atherosclerosis, the buildup of fatty plaques in artery walls that can lead to heart attacks and strokes. Studies show that replacing saturated fats like palm oil with unsaturated fats lowers LDL cholesterol and reduces heart disease risk. Health guidance recommends keeping saturated fat below 10 percent of daily calories, which for a 2,000-calorie diet is about 22 grams. A diet built around whole foods, with less processed food, naturally contains less palm oil.",
      ),
      hz(
        "Processing contaminants",
        "Refining palm oil at high temperatures can create contaminants called glycidyl esters and 3-MCPD esters. These form in many refined vegetable oils, but palm oil tends to have higher levels. They became a concern because animal studies showed possible health effects at high doses. The European Union now sets legal maximum levels for them. Infant formula, which often contains refined vegetable oils, has especially strict limits.",
        "Glycidyl esters form during high-temperature deodorization when diglycerides, which palm oil contains in relatively large amounts, lose a fatty acid and close into a ring. During digestion, enzymes break glycidyl esters apart, releasing glycidol, a small, reactive molecule with a strained three-atom ring that can react with DNA. 3-MCPD esters form when chloride is present during refining, and they release 3-MCPD during digestion. Both glycidol and 3-MCPD are then absorbed into the body.",
        "In animal studies, glycidol caused tumors in several organs and can damage DNA, so IARC classifies it as probably carcinogenic to humans (Group 2A). 3-MCPD damaged the kidneys and affected male fertility in rats. Because glycidol may damage DNA, regulators aim to keep exposure as low as reasonably achievable. Babies fed formula were found to have relatively high exposure for their body weight, which is why formula limits are especially strict. Industry efforts have greatly reduced these contaminants since 2016.",
      ),
    ],
    dosage:
      "Palm oil appears in close to half of packaged supermarket products, from bread and cookies to margarine and instant noodles, usually as one of several fats. Health guidance recommends keeping saturated fat below 10 percent of daily calories, about 22 grams on a 2,000-calorie diet, and palm oil is roughly half saturated fat: a tablespoon contains about 7 grams. Using oils rich in unsaturated fat, such as olive or canola, for most cooking and limiting heavily processed foods keeps intake moderate. Refined oils sold in the EU must meet legal limits for glycidyl esters and 3-MCPD.",
    synthesis: [
      route(
        "Biological synthesis in the fruit",
        "The oil palm, Elaeis guineensis, originally from West Africa, makes oil in two parts of its fruit: the fleshy outer layer, called the mesocarp, which yields palm oil, and the seed, which yields palm kernel oil. The two oils differ: palm kernel oil is much richer in saturated lauric acid, like coconut oil. Oil palms are the most productive oil crop, giving several times more oil per hectare than soybeans or sunflowers. The fruit takes about five to six months to develop. Its oil content rises rapidly in the final weeks of ripening.",
        "Inside the fruit's cells, an enzyme complex called fatty acid synthase builds fatty acids from small two-carbon units supplied by acetyl-CoA, adding two carbons at a time until it reaches a 16-carbon chain, palmitic acid. Some palmitic acid is extended to 18 carbons, forming stearic acid, and an enzyme called a desaturase then inserts a double bond to make oleic acid. These fatty acids are attached one by one to a glycerol-3-phosphate backbone, forming triglycerides. The triglycerides collect in oil droplets in the cells of the fleshy mesocarp. When the fruit is ripe, oil makes up about half of the mesocarp's weight.",
        { significance: "Because oil palms yield so much oil per hectare, replacing them with other oil crops would require far more farmland." },
      ),
      route(
        "Milling and refining",
        "Turning palm fruit into cooking oil involves milling, which extracts crude oil, and refining, which cleans it up. Fresh fruit bunches have to be processed within about a day of harvest, because enzymes in the fruit start breaking down the oil. Indonesia and Malaysia together produce about 85 percent of the world's palm oil. Crude palm oil is a deep orange-red with a strong flavor. Refining turns it into a pale, neutral oil.",
        "At the mill, fresh fruit bunches are steamed under pressure, which destroys the enzymes that would split fats into free fatty acids and loosens the fruit from the bunch. The fruit is mashed and pressed to squeeze out crude palm oil, which is clarified to remove water and fiber. At the refinery the oil is degummed with acid to remove phospholipids, bleached with clay that soaks up pigments and impurities, and deodorized with steam at high temperature to remove odors and free fatty acids. The refined oil can then be cooled slowly so that solid crystals form, separating it into liquid palm olein, used for cooking, and solid palm stearin, used in margarine and baking fats.",
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
        "Cells break glucose down for energy in a series of reactions called glycolysis, which splits each glucose into two molecules of pyruvate and makes a small amount of ATP. Glycolysis also needs a helper molecule called NAD⁺, which picks up electrons along the way and becomes NADH. Normally NADH hands its electrons on to the mitochondria, which use oxygen to make much more ATP. When oxygen is in short supply, such as during intense exercise, that can't happen fast enough. Instead, an enzyme called lactate dehydrogenase uses NADH to convert pyruvate into lactate, which regenerates the NAD⁺ so glycolysis can keep going.",
        "This lets muscles keep producing energy quickly during sprints and heavy effort, even when oxygen delivery can't keep up. Lactate isn't a waste product: the blood carries it to the heart, other muscles and the brain, which burn it as fuel. The liver can also turn lactate back into glucose and send it back to the muscles, a loop called the Cori cycle. Contrary to a common myth, lactic acid doesn't cause the soreness you feel a day or two after exercise; that comes from tiny injuries in the muscle fibers. The burning feeling during intense effort is linked to a buildup of hydrogen ions and other factors.",
        "established",
      ),
      mech(
        "Gentle exfoliation",
        "Lactic acid is an alpha-hydroxy acid (AHA), a molecule with an –OH group on the carbon next to its acid group. The outermost layer of skin is made of dead cells held together by connections called desmosomes and by fatty substances. Below about pH 4, a good share of lactic acid is in its uncharged form, which can slip into that outer layer. There it weakens the ionic and hydrogen bonds holding dead cells together and may take away some of the calcium that stabilizes their connections. As a result, dead cells come loose more easily.",
        "When dead cells are shed faster, the skin surface becomes smoother and more even, and fine lines and dull patches can look less noticeable. Regular use can also improve rough skin and mild uneven pigmentation. Lactic acid molecules are larger than glycolic acid molecules, so they soak into skin more slowly, which makes them gentler and less likely to irritate. That's why lactic acid is often recommended for sensitive skin. It also appears in treatments for very dry, rough skin, such as keratosis pilaris.",
        "human",
      ),
      mech(
        "Moisturizing",
        "Sodium lactate, the salt of lactic acid, has a charged carboxylate group and a hydroxyl group, both of which attract water molecules through hydrogen bonds and electrical attraction. Substances that attract and hold water are called humectants. Sodium lactate is a natural part of the skin's natural moisturizing factor, a mix of water-attracting molecules inside the cells of the outermost skin layer. These molecules pull in water from the air and from deeper skin layers and hold it in place. Lactic acid itself works as a humectant too.",
        "By holding water in the outer layer of skin, sodium lactate keeps it soft and flexible so it can stretch without cracking. When skin is short of natural moisturizing factor, as in some dry-skin conditions, it becomes rough, flaky and prone to splitting. Lotions containing lactic acid or lactate salts help replace these molecules and improve hydration. Products with about 5 to 12 percent lactate are used to treat very dry skin and conditions such as ichthyosis. In this way lactic acid both moisturizes and gently exfoliates.",
        "established",
      ),
      mech(
        "Preserving food",
        "Lactic acid preserves food in two ways. First, it lowers the food's pH, and many spoilage and disease-causing bacteria can't grow below about pH 4.5. Second, uncharged lactic acid molecules can pass through bacterial cell membranes; inside, where the pH is near neutral, they release their protons and acidify the cell's interior, disrupting its enzymes and its energy supply. Lactic acid is produced naturally during fermentation by lactic acid bacteria, which tolerate the acidity they create. In effect, these friendly bacteria make their surroundings hostile to competitors.",
        "This is how fermentation has preserved food for thousands of years. In yogurt, sauerkraut, kimchi, pickles and sourdough, lactic acid bacteria convert sugars into lactic acid, which gives these foods their sour taste and keeps many harmful bacteria from growing. The acidity also changes texture, for example by making milk proteins clump into yogurt. Lactic acid is added directly to some foods as well, and it is used to rinse meat carcasses to reduce bacteria. Many fermented foods also contain live bacteria that may benefit gut health.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Lactic acid fermentation",
        "Lactic acid fermentation is how bacteria, and your own muscle cells, turn sugar into lactic acid without using oxygen. It is an ancient and widespread way of getting energy, used by microbes for billions of years. Humans have harnessed it for thousands of years to make yogurt, cheese, sauerkraut, pickles and sourdough. It produces only a little energy compared with breathing oxygen, but it is fast. In factories, it is used to make most of the world's lactic acid.",
        [
          ["Glycolysis", "A glucose molecule, with six carbon atoms, is broken down through ten enzyme-controlled steps into two molecules of pyruvate, each with three carbons. This releases enough energy to make two molecules of ATP. Meanwhile, two molecules of NAD⁺ pick up electrons and become NADH."],
          ["Reduction", "The enzyme lactate dehydrogenase passes electrons from NADH to each pyruvate, converting it into lactate. This is called reduction because pyruvate gains electrons. Each glucose yields two lactates."],
          ["Recycling", "Turning pyruvate into lactate converts NADH back into NAD⁺. Because glycolysis needs NAD⁺ to continue, recycling it lets glycolysis keep running without oxygen. That is the whole point of the process: keeping the energy supply going."],
        ],
        "Lactobacillus bacteria use this to sour milk into yogurt: the lactic acid lowers the pH, which makes milk's casein proteins clump together and thicken. Similar bacteria ferment cabbage into sauerkraut and give sourdough its tang. In your muscles, the same process helps you sprint.",
        "C6H12O6 → 2 C3H6O3",
      ),
      rxn(
        "Polymerization into PLA plastic",
        "Lactic acid can be linked into long chains to make a plastic called polylactic acid, or PLA. PLA is made from renewable plant sugars, such as those from corn or sugarcane, rather than from petroleum. Under industrial composting conditions it breaks back down into lactic acid, which microbes then consume. It is used in 3D-printing filament, compostable cups and food packaging. However, PLA doesn't break down easily in home compost, soil or the ocean.",
        [
          ["Dimerizing", "Lactic acid molecules are first linked into short chains and then heated with a catalyst to form a ring made of two lactic acid units, called lactide. This step removes water. The lactide is purified to remove anything that would weaken the plastic."],
          ["Ring opening", "Lactide is heated with a tin-based catalyst, which opens the ring. Each opened ring can then attach to another, so a chain grows. This is called ring-opening polymerization, and it lets very long chains form quickly."],
          ["Polymer", "The chains grow to thousands of lactic acid units long, forming polylactic acid. The long chains tangle and pack together into a clear, strong plastic. Its properties depend on the chain length and on which mirror-image forms of lactic acid were used."],
        ],
        "PLA is used in 3D-printer filament and compostable cups, and also in dissolvable surgical stitches, which slowly break down into lactic acid inside the body. Using just one mirror-image form of lactic acid makes stronger, more heat-resistant PLA.",
        "n C3H6O3 → (C3H4O2)n + n H2O",
      ),
    ],
    hazards: [
      hz(
        "Increased sun sensitivity (AHAs)",
        "Skincare products containing alpha-hydroxy acids, including lactic acid, can make skin more prone to sunburn. This was found in studies sponsored by the U.S. FDA around the turn of the 2000s. The effect lasts while the product is in use and for about a week after stopping. Because of this, the FDA recommends that AHA products carry a sunburn alert. Daily sunscreen prevents the problem.",
        "The outermost layer of skin, the stratum corneum, is made of dead cells that help scatter and absorb ultraviolet light. AHAs like lactic acid speed up the shedding of these cells, which makes this protective layer thinner. With less dead-cell material in the way, more ultraviolet radiation reaches the living cells underneath. UV light carries enough energy to damage DNA and other molecules in those cells. The thinner the outer layer, the more UV gets through.",
        "When UV light damages skin cells badly enough, some of them die, forming what scientists call sunburn cells. In the FDA-sponsored studies, people who had been using AHA products for several weeks developed more sunburn cells and burned more easily after a measured dose of UV. Over time, extra UV damage contributes to premature skin aging and raises the risk of skin cancer. That is why AHA products are labeled with advice to use sunscreen and limit sun exposure. Daily broad-spectrum sunscreen is recommended for anyone using them.",
      ),
      hz(
        "Irritation at high strength",
        "Lactic acid is one of the gentlest exfoliating acids, but at high concentrations or very low pH it can still irritate skin. This is more likely with products containing more than 10 percent lactic acid, with a pH below 3.5, or when they are used too often. People with sensitive skin, eczema or rosacea are more prone to it. Professional chemical peels use much higher concentrations under supervision. Starting with a lower strength and using it less often reduces the risk.",
        "A low-pH product contains many hydrogen ions, and a high concentration of lactic acid pushes more acid molecules into the skin. Together they can break down the skin barrier more than intended, removing too many dead cells and disrupting the fatty layers between them. Water then escapes from the skin more easily, and irritants can penetrate deeper. Acid can also directly activate pain-sensing nerve endings. The lower the pH and the higher the concentration, the stronger the effect.",
        "When the skin barrier is disrupted, nerve endings fire, causing stinging or burning, and inflammatory signals widen blood vessels, causing redness. Overdoing exfoliation can lead to peeling, flaking and increased sensitivity. In darker skin tones, irritation sometimes leaves dark patches called post-inflammatory hyperpigmentation. These effects usually fade once use is reduced or stopped. A plain moisturizer and sunscreen help the skin recover.",
      ),
    ],
    dosage:
      "Foods use under 1 percent lactic acid to add tartness or act as a preservative, and the U.S. FDA considers it generally recognized as safe with no set daily limit, since the body makes and uses lactate constantly. In skincare, U.S. safety reviews recommend that consumer products contain no more than 10 percent alpha-hydroxy acids at a pH of at least 3.5; most retail products use about 5 to 10 percent. Professional peels use higher concentrations under supervision. Daily sunscreen is recommended while using AHA products, and people with sensitive skin should start with lower strengths.",
    synthesis: [
      route(
        "Bacterial fermentation",
        "Nearly all lactic acid made today comes from bacterial fermentation, the same process that makes yogurt but on an industrial scale. Bacteria such as Lactobacillus, or specially engineered microbes, are grown in large tanks on sugar from corn, sugarcane or beets. Fermentation makes lactic acid efficiently from renewable materials. About 90 percent of the world's lactic acid is produced this way. It goes into food, cosmetics, medicines and PLA plastic.",
        "Bacteria are grown in sterile tanks containing glucose or sucrose, nutrients and water, kept warm. As they ferment the sugar they produce lactic acid, which lowers the pH. To keep the bacteria working, calcium carbonate or another base is added to neutralize the acid, forming calcium lactate. After fermentation the bacteria are filtered out, and the calcium lactate is treated with sulfuric acid, which frees the lactic acid and forms solid calcium sulfate that can be filtered away. The lactic acid is then purified by methods such as distillation, ion exchange or crystallization.",
        { significance: "Fermentation produces a single mirror-image form, which matters for making high-quality PLA." },
      ),
      route(
        "Chemical synthesis",
        "Before fermentation took over, lactic acid was made chemically from petroleum-derived starting materials. The route uses acetaldehyde and hydrogen cyanide, both produced from fossil fuels. Chemically, the result is the same lactic acid, but with an important difference in shape. Fermentation has largely replaced this method. A small amount is still made chemically.",
        "Acetaldehyde, a small molecule with an aldehyde group, reacts with hydrogen cyanide, which adds across the aldehyde's carbon–oxygen double bond. This forms lactonitrile, a molecule carrying both a hydroxyl group and a nitrile group (–C≡N). The lactonitrile is then treated with strong acid and water, which converts the nitrile into a carboxylic acid group by hydrolysis, giving lactic acid and an ammonium salt. The lactic acid is purified by turning it into an ester, distilling that ester, and then splitting it back into lactic acid.",
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
        "Acesulfame potassium, or Ace-K, activates the sweet-taste receptor, the T1R2/T1R3 protein pair, by fitting into a binding pocket and changing the receptor's shape. That makes it about 200 times sweeter than sugar. But Ace-K also fits into some bitter-taste receptors, particularly two called TAS2R31 and TAS2R43. These belong to a large family of receptors that evolved to detect potentially harmful bitter substances. At higher concentrations, Ace-K activates these bitter receptors more strongly.",
        "When both sweet and bitter receptors fire, the brain perceives sweetness with a slightly bitter or metallic aftertaste. Because people carry different versions of the TAS2R31 and TAS2R43 genes, some notice that bitterness far more than others. To mask it, manufacturers often blend Ace-K with other sweeteners such as sucralose or aspartame. Blends also tend to taste more like sugar, because each sweetener has a different sweetness profile and they cover each other's weaknesses. Ace-K's sweetness arrives quickly, which complements sweeteners that build more slowly.",
        "human",
      ),
      mech(
        "Not metabolized",
        "Ace-K's ring, containing nitrogen, oxygen and sulfur, isn't recognized by any human enzyme. Unlike aspartame, which is broken into amino acids, or sugar, which is digested into glucose, Ace-K passes through the body chemically unchanged. It dissolves easily in water and is absorbed quickly from the small intestine into the blood. From there it is filtered out by the kidneys. Because it is never broken down, it provides no calories or energy.",
        "After absorption, Ace-K circulates in the blood and is filtered out by the kidneys, leaving the body unchanged in urine, mostly within about a day. It doesn't build up because it is removed so efficiently. Since the body doesn't use it for energy, it adds no calories, which makes it useful in diet drinks and sugar-free foods. It is also heat-stable, so it can be used in baked goods. Small amounts pass into breast milk.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Building the ring",
        "Ace-K is made by building a six-membered ring containing oxygen, nitrogen and sulfur atoms. The process starts with two simple industrial chemicals, sulfamic acid and diketene, and uses sulfur trioxide to close the ring. The final step converts the ring into its potassium salt. Chemists designed this route after the molecule's sweetness was discovered by accident in 1967. The process produces a stable, white crystalline powder.",
        [
          ["Coupling", "Sulfamic acid, a small molecule containing nitrogen and a sulfonic acid group, reacts with diketene, a reactive four-carbon molecule. The nitrogen of sulfamic acid attacks diketene and opens its ring, forming an acetoacetamide sulfonic acid. This molecule contains all the atoms needed for the final ring."],
          ["Cyclization", "Sulfur trioxide (SO₃), a powerful dehydrating agent, is added. It helps the molecule join its own ends into a ring by connecting the end of the chain to the sulfur group, removing a water molecule in the process. The result is a six-membered ring containing one oxygen, one nitrogen and one sulfur atom."],
          ["Neutralization", "The ring has an acidic hydrogen on its nitrogen, made acidic because the neighboring carbonyl and sulfonyl groups pull electrons away from it. Potassium hydroxide removes this hydrogen and forms the potassium salt, acesulfame potassium."],
        ],
        "The salt form is stable, water-soluble and easy to crystallize. It survives the heat of baking and the acidity of soft drinks without breaking down, which makes it more versatile than aspartame.",
      ),
    ],
    hazards: [
      hz(
        "Gaps in long-term data",
        "Acesulfame potassium is approved by regulators around the world, including the U.S. FDA and the European Food Safety Authority, and is considered safe at normal intakes. However, it has been studied less than some other sweeteners, such as aspartame, particularly in long-term human studies. Some scientists have called for more research on its possible effects on gut bacteria and metabolism. In 2023 the World Health Organization advised against using non-sugar sweeteners, Ace-K included, for weight control. That advice was based on weak evidence of long-term benefit, not on proven harm.",
        "Because Ace-K isn't broken down, any effects in the body would come from the intact molecule rather than from breakdown products. It is absorbed into the blood and circulates throughout the body before being excreted. In the gut, unabsorbed Ace-K could in theory interact with bacteria. A few laboratory studies have suggested it might affect certain processes in cells, but how relevant that is at normal intakes is unclear. More targeted research is needed to settle the question.",
        "Some mouse studies found that Ace-K changed the makeup of the gut bacteria and affected body weight, though results vary and may not apply to people. Observational studies in people have linked artificial sweetener use, Ace-K included, to weight gain and health problems, but those links may exist because people who already struggle with weight are more likely to choose sweeteners. The WHO's 2023 guideline concluded that non-sugar sweeteners don't help with long-term weight control. More long-term human research is needed to fully understand Ace-K's effects.",
      ),
    ],
    dosage:
      "Diet sodas typically contain tens of milligrams of Ace-K per can, usually blended with other sweeteners. The U.S. FDA and international experts (JECFA) have set an acceptable daily intake of 15 milligrams per kilogram of body weight, about 900 milligrams for a 60-kilogram adult, which is the amount in many cans of diet soda every day. Typical intakes are well below this. Because it isn't metabolized, it contributes no calories. The WHO advises against relying on non-sugar sweeteners for weight control and suggests water and less-sweet foods instead.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Acesulfame potassium was discovered in 1967 by the German chemist Karl Clauss at the company Hoechst, when he licked his finger while working with related chemicals and noticed a sweet taste. It was approved for use in the United States in 1988. Today it is produced in large chemical plants, mainly in China and Germany. The process uses inexpensive industrial chemicals. Ace-K is sold under brand names such as Sunett and Sweet One.",
        "The process starts with sulfamic acid, which is reacted with diketene in the presence of a base such as triethylamine to form an acetoacetamide intermediate. This intermediate is treated with sulfur trioxide in a solvent, which closes the six-membered ring by joining the molecule's ends and removing water. The ring compound is then neutralized with potassium hydroxide, forming the potassium salt. The crude Ace-K is purified by crystallization, sometimes with activated carbon to remove impurities. The result is a fine white powder.",
        { significance: "Ace-K is stable enough for baking and survives the acidity of soft drinks, which is why it is so often paired with less stable sweeteners." },
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
        "Cheese is built mainly from casein proteins held together in a network, partly by calcium phosphate bridges in which calcium ions link negatively charged spots on neighboring protein molecules. When cheese is heated, this network can tighten and squeeze out fat, leaving the cheese rubbery and greasy. Sodium citrate is a chelator: it grabs calcium ions with its three negatively charged carboxylate groups. By pulling calcium out of those bridges, it loosens the casein network. The freed casein proteins can then move more freely and mix with both water and fat.",
        "Once released from their calcium bridges, casein proteins act as natural emulsifiers, with parts that attract water and parts that attract fat. They coat fat droplets and keep them evenly spread, so melted cheese stays smooth, glossy and stretchy instead of separating into clumps and oil. This is how processed cheese and nacho cheese sauce are made. Home cooks can add a pinch of sodium citrate to make perfectly smooth sauces from almost any cheese. It is also why processed cheese slices melt so evenly.",
        "established",
      ),
      mech(
        "Keeping donated blood liquid",
        "Blood clotting is a cascade of chemical reactions involving many proteins called clotting factors, and several of the steps need calcium ions (Ca²⁺) to work. Calcium helps clotting factors attach to the surfaces of platelets and to each other. Sodium citrate binds calcium ions tightly, forming calcium citrate complexes. With the calcium locked away, the clotting factors can't do their jobs. The clotting process is stopped before it starts.",
        "Donated blood is collected into bags containing a citrate solution, which keeps it from clotting while it is stored. This lets blood be kept for weeks and transfused to patients who need it. After a transfusion, the recipient's liver quickly breaks the citrate down through the Krebs cycle, releasing the calcium so normal clotting can resume. Citrate is also used in some blood tests and dialysis machines. Without anticoagulants like citrate, modern blood banking wouldn't be possible.",
        "established",
      ),
      mech(
        "Preventing kidney stones",
        "Most kidney stones are made of calcium oxalate, which forms when calcium and oxalate ions in urine combine into insoluble crystals. Citrate in urine binds calcium ions into soluble complexes, so less calcium is free to pair up with oxalate. Citrate also sticks to the surfaces of tiny crystals, stopping them from growing and clumping together. In addition, when the body metabolizes citrate, it produces bicarbonate, which raises the pH of urine. Higher urine pH keeps uric acid dissolved, which helps prevent uric acid stones too.",
        "People with low citrate levels in their urine, a condition called hypocitraturia, are more likely to form kidney stones. Doctors often prescribe potassium citrate or sodium citrate to people prone to stones, which raises urine citrate and lowers the chance of new stones. Lemon juice and other citrus juices can raise urine citrate a little as well. Drinking plenty of water remains one of the most important ways to prevent stones. Potassium citrate is usually preferred, because extra sodium can increase the amount of calcium in urine.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Calcium chelation",
        "Chelation is when one molecule grabs a metal ion and holds it from several sides at once, like a claw. Citrate is a good chelator because its three carboxylate groups can surround a calcium ion. That stops the calcium from reacting with other substances. Chelation is used in foods, medicine and cleaning products. The word comes from the Greek chele, meaning claw.",
        [
          ["Dissolving", "When sodium citrate is added to water, it dissolves and separates into sodium ions (Na⁺) and citrate ions. Each citrate carries three negative charges on its three carboxylate groups. The sodium ions take no further part."],
          ["Binding", "Calcium ions (Ca²⁺) carry two positive charges and are drawn to citrate's negative carboxylate groups. Citrate can wrap around a calcium ion so that several of its oxygen atoms bond to it at once. That makes the bundle much more stable than if only one group were attached."],
          ["Complex", "The calcium is now held in a soluble calcium citrate complex. It can't easily react with other substances, such as soap, carbonate, or the proteins in blood and cheese. The complex stays dissolved."],
        ],
        "The same reaction softens hard water in detergents, where it stops calcium from reacting with soap and forming scum; keeps stored blood from clotting; and makes cheese sauces smooth. It is one simple chemical idea with a remarkably wide range of uses.",
        "3 Ca2+ + 2 C6H5O7^3- → Ca3(C6H5O7)2",
      ),
      rxn(
        "The citrate buffer",
        "A buffer is a mixture of a weak acid and its partner base that resists changes in pH when acid or base is added. Citric acid and sodium citrate together form a citrate buffer. Because citric acid can release three protons, the citrate buffer works across a wide range of pH values, from about 3 to 6. Buffers matter in foods, drinks, medicines and laboratory work. They keep products tasting the same and chemically stable.",
        [
          ["Acid partner", "Citric acid can release hydrogen ions (H⁺). If a base is added to the mixture, citric acid donates protons that neutralize it. This stops the pH from rising sharply."],
          ["Base partner", "Citrate ions can accept hydrogen ions. If an acid is added, citrate soaks up the extra protons and turns back into citric acid. This stops the pH from dropping sharply."],
          ["Balance", "With both forms present, the mixture can absorb either acid or base, and the pH stays close to a set value as long as both partners remain. The ratio of citric acid to citrate decides the exact pH."],
        ],
        "Soft drinks and candies use this buffer to keep their tartness consistent, and medicines and intravenous fluids use citrate buffers to keep their active ingredients stable. Even a small amount of buffer can make a big difference to how stable a product is.",
        "C6H8O7 ⇌ H+ + C6H7O7-",
      ),
    ],
    hazards: [
      hz(
        "Very low toxicity",
        "Sodium citrate has very low toxicity and is considered safe in the amounts used in food and drinks. The body handles citrate easily, since it is a normal part of energy metabolism. Concerns arise mainly in medical settings, when large amounts enter the bloodstream directly, such as during massive blood transfusions or some types of dialysis. Taken by mouth in large amounts it can cause mild stomach upset. People on low-sodium diets should remember that it contributes sodium.",
        "Citrate's main chemical action in the body is binding calcium. When a lot of citrate enters the bloodstream quickly, for example from many units of transfused blood, it can bind enough calcium to lower the level of free, active calcium in the blood. Normally the liver breaks citrate down in the Krebs cycle and the calcium is released again. But if citrate arrives faster than the liver can process it, or the liver isn't working well, free calcium can drop. This is called citrate toxicity.",
        "Calcium is essential for nerve signals, muscle contraction and a steady heart rhythm. When free calcium in the blood drops too low, a condition called hypocalcemia, it can cause tingling around the mouth and fingers, muscle cramps and spasms, and in severe cases an irregular heartbeat. During massive transfusions, doctors monitor calcium and give supplements when needed. None of this happens with the small amounts of sodium citrate in food. In foods, the main thing to consider is its sodium.",
      ),
    ],
    dosage:
      "Foods use under 1 percent sodium citrate, usually to control acidity, to act as an emulsifying salt in processed cheese, or to stabilize drinks. International experts (JECFA) have given citrates an acceptable daily intake of “not specified,” reflecting their very low toxicity, and the U.S. FDA considers sodium citrate generally recognized as safe. The body processes citrate as part of normal metabolism. Larger doses are used medically, under a doctor's supervision, to treat kidney stones and acidosis. Each gram of sodium citrate contains roughly 250 milligrams of sodium, which counts toward daily sodium limits.",
    synthesis: [
      route(
        "Neutralizing citric acid",
        "Sodium citrate is made by neutralizing citric acid with a sodium-containing base. The citric acid itself is almost always made by fermentation with the mold Aspergillus niger. Neutralization is a simple acid–base reaction, much like what happens when baking soda meets lemon juice. The product is crystallized into a white powder or granules. Depending on how much base is added, manufacturers can make monosodium, disodium or trisodium citrate, with trisodium citrate the most common.",
        "Citric acid, which has three acidic hydrogen atoms on its carboxylic acid groups, is dissolved in water, and sodium hydroxide or sodium carbonate is slowly added. Each hydroxide ion removes a hydrogen ion from a carboxylic acid group, forming water, while a sodium ion takes its place as the partner of the now negatively charged carboxylate. When three sodium ions have replaced all three acidic hydrogens, the product is trisodium citrate. The solution is concentrated by evaporation and cooled, so sodium citrate crystals form. These are separated, dried and sieved.",
        { equation: "C6H8O7 + 3 NaOH → Na3C6H5O7 + 3 H2O", significance: "Citrate anticoagulant, introduced around 1914, made stored blood transfusions practical." },
      ),
    ],
  },
};
