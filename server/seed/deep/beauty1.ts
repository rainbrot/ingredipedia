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
        "Glycerin is a small molecule with three hydroxyl (–OH) groups packed onto just three carbon atoms. Each –OH group can form hydrogen bonds with water, weak attractions between a hydrogen atom on one molecule and an oxygen atom on another. That means each glycerol molecule can hold several water molecules around itself at once. Substances that attract and hold water like this are called humectants. When glycerin is applied to skin, it settles into the outer layer, the stratum corneum, and keeps water there instead of letting it evaporate.",
        "A well-hydrated outer layer of skin is softer, smoother and more flexible, so it is less likely to crack, flake or feel tight. Because glycerin holds water in place, it slows the rate at which water escapes from the skin, which dermatologists measure as transepidermal water loss. Clinical studies show that moisturizers containing glycerin improve skin hydration and help a damaged skin barrier recover faster. That is why glycerin appears in a huge range of lotions, cleansers and soaps. It works especially well alongside occlusive ingredients like petrolatum, which seal the water in.",
        "human",
      ),
      mech(
        "Aquaporin-3 and barrier repair",
        "Cell membranes are made of fatty molecules that block most water-soluble substances, so cells use special channel proteins to move water in and out. Aquaporins are a family of these channels, and aquaporin-3 is found in the cells of the skin's outer layers. Unlike aquaporins that carry only water, aquaporin-3 also lets glycerol through. It works like a tunnel through the membrane, shaped so that water and glycerol fit but larger molecules don't. This lets skin cells take up glycerol from their surroundings.",
        "Scientists discovered how important glycerol is for skin by studying mice bred without aquaporin-3. These mice had dry skin that lost water easily and healed slowly after damage. When researchers gave them extra glycerol, either on the skin or in their diet, their skin hydration and barrier repair returned to normal. This suggested that glycerol isn't just an added cosmetic ingredient but one of the skin's own natural moisturizers. It helps explain why glycerin works so well in skincare.",
        "lab",
      ),
      mech(
        "Used for energy",
        "If glycerol is swallowed, it is absorbed into the blood and taken up mainly by the liver. There, an enzyme called glycerol kinase attaches a phosphate group to it, forming glycerol-3-phosphate. A second enzyme converts this into dihydroxyacetone phosphate, a molecule that sits right in the middle of glycolysis, the pathway that breaks down sugar. From there it can be burned for energy or built up into glucose. Glycerol is also used as the backbone for building new fat molecules.",
        "Because the body handles glycerol through the same pathways as sugar, it can be used for energy and provides about 4.3 calories per gram, similar to sugar. In foods, glycerin keeps products moist and adds sweetness; it is about 60 percent as sweet as sugar. It raises blood sugar less than sugar does, so it is sometimes used in products for people with diabetes, though it still provides calories. The body also releases glycerol naturally whenever it breaks down stored fat. During fasting, that glycerol helps the liver make glucose.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Released when soap is made",
        "Soapmaking, or saponification, is the reaction of a fat or oil with a strong base such as lye (sodium hydroxide). Every fat molecule is built from one glycerol molecule linked to three fatty acids. When the base breaks those links, the fatty acids become soap and the glycerol is released. In traditional soapmaking the glycerin stays in the soap; in commercial production it is often separated and sold. It is one of the oldest chemical reactions people have used on purpose.",
        [
          ["Attack", "Hydroxide ions (OH⁻) from the lye attack the ester bonds that connect each fatty acid to the glycerol backbone. The carbon atom in each ester bond is slightly positive because it is attached to two oxygen atoms. The hydroxide bonds to that carbon and the ester bond breaks."],
          ["Release", "As each of the three ester bonds breaks, a fatty acid is cut free from the glycerol. Once all three are gone, glycerol is left as its own molecule with three –OH groups. One glycerol is released for every fat molecule."],
          ["Products", "The fatty acids, now negatively charged, pair with sodium ions to become soap molecules. In handmade soap the glycerol simply stays mixed in. In industrial soapmaking, salt is added to separate the soap, and the glycerol-rich liquid is collected and purified."],
        ],
        "Handmade soaps keep their glycerin, which is why they often feel less drying than some commercial bars. Recovered glycerin is purified and used in cosmetics, foods and medicines. For a long time, soapmaking was the main source of glycerin.",
        "C3H5(OOCR)3 + 3 NaOH → C3H5(OH)3 + 3 RCOONa",
      ),
      rxn(
        "Nitration to nitroglycerin",
        "Glycerol's three –OH groups can be swapped for nitrate groups, creating a very different molecule: nitroglycerin. This reaction, called nitration, was first carried out in 1847 by the Italian chemist Ascanio Sobrero. Nitroglycerin is a powerful explosive because each molecule contains both fuel (carbon and hydrogen) and the oxygen needed to burn it. Surprisingly, it is also an important heart medicine. The story shows how a small chemical change can transform a molecule's properties.",
        [
          ["Nitronium ion", "Concentrated nitric acid is mixed with concentrated sulfuric acid. The stronger sulfuric acid helps nitric acid lose a water molecule, forming the nitronium ion (NO₂⁺), a highly reactive positive ion. The mixture has to be kept cold to control the reaction."],
          ["Esterification", "Glycerol is added slowly to the acid mixture. Each of its three –OH groups reacts with a nitronium ion, forming a nitrate ester group (–ONO₂). It is like ordinary ester formation, but with nitric acid in place of a carboxylic acid."],
          ["Product", "Once all three –OH groups have reacted, the result is nitroglycerin, an oily liquid. Its molecules are packed with energy and unstable, because breaking them apart releases large volumes of gas extremely quickly."],
        ],
        "Alfred Nobel tamed nitroglycerin in 1867 by soaking it into a soft, porous rock called diatomaceous earth, creating dynamite, and later used his fortune to found the Nobel Prizes. In tiny doses, nitroglycerin is also a medicine for chest pain caused by heart disease: the body converts it into nitric oxide, which relaxes and widens blood vessels.",
        "C3H5(OH)3 + 3 HNO3 → C3H5(ONO2)3 + 3 H2O",
      ),
    ],
    hazards: [
      hz(
        "Glycerol intoxication in young children",
        "Glycerin is extremely safe in cosmetics and in the small amounts used in food. However, some slush ice drinks use large amounts of glycerol to keep them from freezing solid, and young children who drank them have occasionally become ill. Reported cases in the U.K. and Ireland involved children who became unwell soon after a slush drink. As a result, the U.K. Food Standards Agency advised in 2023 that children under four shouldn't have these drinks at all. Children aged four to ten are advised to have no more than one a day.",
        "A slush drink can contain a lot of glycerol, sometimes tens of grams in a large serving. When it is drunk quickly, the glycerol is absorbed rapidly into the blood. Because glycerol is a small dissolved molecule, a large amount raises the concentration of dissolved particles in the blood, which affects how water moves between the blood and the body's cells. The liver also has to process the glycerol, which may interfere with its normal control of blood sugar. A small child's body is less able to cope with a sudden large dose.",
        "In reported cases, children developed headache, nausea and sleepiness and, more seriously, low blood sugar, shock and loss of consciousness, usually within an hour of drinking. These symptoms are thought to come from rapid shifts in fluid balance and blood sugar. Most children recovered quickly with treatment. Because younger children weigh less, the same drink gives them a much higher dose per kilogram of body weight. That is why the advice is based on age.",
      ),
    ],
    dosage:
      "Cosmetics typically contain about 2 to 10 percent glycerin, and some moisturizers contain more. It is one of the least toxic substances used in consumer products: in rats, the oral dose needed to cause death is more than 12 grams per kilogram of body weight. The U.S. FDA considers it generally recognized as safe in food, and international experts haven't set any limit on daily intake. In food it is used in small amounts to keep products moist and add sweetness. The one notable caution is the large amount in some slush drinks given to young children.",
    synthesis: [
      route(
        "Byproduct of biodiesel and soap",
        "Most glycerin today is a byproduct of making biodiesel, a fuel made from vegetable oils or animal fats. For every 10 kilograms of biodiesel produced, about 1 kilogram of crude glycerin is made. The rapid growth of the biodiesel industry in the 2000s flooded the market with glycerin and made it cheap. Some glycerin also comes from soapmaking and from splitting fats to produce fatty acids. A smaller amount is made synthetically from propylene, a petroleum chemical.",
        "In biodiesel production, vegetable oils or fats, which are triglycerides, are mixed with methanol and a catalyst such as sodium hydroxide. The methanol takes glycerol's place in the fat molecules in a reaction called transesterification, forming fatty acid methyl esters, which are biodiesel. Each triglyceride releases one glycerol molecule. Because glycerol is denser and doesn't mix with biodiesel, it settles as a separate layer at the bottom. This crude glycerin is drained off, neutralized to remove the catalyst and purified by distillation to the high purity needed for medicines and cosmetics.",
        { equation: "C3H5(OOCR)3 + 3 CH3OH → C3H5(OH)3 + 3 RCOOCH3", significance: "Finding new uses for surplus glycerin, from animal feed to plastics, has become a goal of green chemistry." },
      ),
      route(
        "Biological production",
        "Glycerol is a natural part of life. Every fat molecule in plants and animals, and many of the molecules in cell membranes, contain glycerol as part of their structure. Living things constantly build and break down fats, releasing and reusing glycerol as they go. Yeast also makes glycerol during fermentation to keep its internal chemistry in balance. Some commercial glycerin is produced by fermentation, though most comes from fats.",
        "When your body needs energy, for example between meals or during exercise, fat cells break down stored triglycerides in a process called lipolysis. Enzymes called lipases cut the fatty acids away from glycerol, and both are released into the blood. Muscles and other tissues burn the fatty acids as fuel, while the glycerol travels to the liver, where it can be turned into glucose. During alcoholic fermentation, yeast cells make glycerol from an intermediate of glycolysis, which helps them recycle the helper molecule NAD⁺. This matters most when yeast is stressed, for example in very sugary surroundings.",
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
        "Water alone can't remove grease because oil and water don't mix: water molecules cling strongly to each other and push oil molecules away. Sodium lauryl sulfate has a long tail of 12 carbon atoms that is attracted to oil and a charged sulfate head that is attracted to water. When SLS is added to water, the tails burrow into oily dirt while the heads stay in the water. This lowers the surface tension between the oil and the water, making it easier for water to work its way between the oil and the surface. Eventually the oil is lifted off and wrapped up inside clusters of SLS molecules called micelles.",
        "Inside a micelle, the oil is hidden in the center, surrounded by tails, while the charged heads face outward into the water. Because the outside of the package is water-loving, the whole thing rinses away. This is how shampoo removes sebum, the natural oil made by the scalp, along with dirt and styling products. In toothpaste, SLS helps loosen food particles and plaque and spreads the paste around the mouth. The foam it makes isn't needed for cleaning, but people tend to associate it with a product working.",
        "established",
      ),
      mech(
        "Stripping the skin barrier",
        "The outer layer of skin, the stratum corneum, is made of flattened dead cells filled with a protein called keratin and surrounded by layers of fatty substances called lipids. SLS doesn't just remove oil from the skin's surface; its molecules can also work their way into this layer. Their charged heads bind to keratin proteins, and their tails can pull lipids out from between the cells. At higher concentrations SLS can even make keratin proteins unfold, a process called denaturation. All of this damages the structure that keeps water in and irritants out.",
        "When the skin barrier is disrupted, water evaporates from the skin more quickly, making it dry and tight. Irritants and microbes can also get in more easily, triggering inflammation that causes redness, itching and sometimes flaking. SLS is so reliable at causing this kind of irritation that dermatologists use it as the standard test irritant in research, to study how skin reacts and how well treatments repair it. The effect is stronger at higher concentrations, with longer contact and on skin that is already sensitive. Rinse-off products limit the contact time.",
        "established",
      ),
      mech(
        "Canker sores",
        "The inside of the mouth is lined with a moist tissue called the oral mucosa, protected by a thin layer of mucin, a slippery protein that forms a barrier. Some researchers think SLS in toothpaste may dissolve or disturb this protective layer. Without it, the cells underneath are more exposed to irritants, bacteria and food acids. SLS might also irritate the mucosal cells directly. The exact mechanism hasn't been pinned down.",
        "Canker sores, also called aphthous ulcers, are small, painful sores inside the mouth. Their cause isn't fully known, but triggers include minor injuries, stress, certain foods and possibly toothpaste ingredients. In some clinical trials, people who often got canker sores had fewer and less painful ones after switching to a toothpaste without SLS. Not every study agrees, though, and SLS doesn't seem to affect people who aren't prone to them. For people who get them often, trying an SLS-free toothpaste is a simple experiment.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Micelle formation",
        "Surfactant molecules like SLS spontaneously organize themselves into tiny spheres called micelles once there are enough of them in water. This self-assembly needs no outside help; it is driven by the way water molecules interact with each other. The concentration at which micelles start to form is called the critical micelle concentration, or CMC. For SLS it is about 8 millimoles per liter, roughly 0.24 percent. Micelles are what allow detergents to dissolve oil in water.",
        [
          ["Surface first", "When a little SLS is added to water, the molecules first head to the surface, where their oily tails can stick out into the air and escape the water. They line up side by side with their heads in the water. This lowers the water's surface tension."],
          ["Saturation", "Once the surface is full, any extra SLS molecules have to stay inside the water. But their oily tails disrupt the network of hydrogen bonds between water molecules, which water resists. The molecules need another way to hide their tails."],
          ["Assembly", "About 60 SLS molecules cluster together with their tails pointing inward, away from the water, and their charged heads facing out. This forms a micelle, a sphere a few nanometers across with an oily core. Oil and grease can dissolve into that core."],
        ],
        "This self-assembly, driven by what scientists call the hydrophobic effect, is also how cell membranes form, except that membrane molecules arrange themselves into double layers instead of spheres. Above the CMC, adding more surfactant simply makes more micelles.",
      ),
      rxn(
        "Sulfation and neutralization (how it's made)",
        "SLS is made by attaching a charged sulfate group to lauryl alcohol, a fatty alcohol with a 12-carbon chain. This turns a molecule that barely dissolves in water into a powerful detergent. The reaction uses sulfur trioxide, a very reactive gas, followed by neutralization with a base. The same basic approach is used to make many detergents. It is carried out in specialized reactors that remove the heat the reaction gives off.",
        [
          ["Sulfation", "Lauryl alcohol is exposed to sulfur trioxide (SO₃) gas, usually diluted with air, in a thin-film reactor. The oxygen of the alcohol's –OH group attacks the sulfur atom of SO₃ and forms a new bond. The reaction releases a lot of heat, so it has to be cooled."],
          ["Acid intermediate", "This creates lauryl sulfuric acid, which has an –OSO₃H group at the end of its chain. It is a strong acid and not very stable, so it is neutralized quickly to stop it breaking down."],
          ["Neutralization", "Sodium hydroxide removes the acidic hydrogen and replaces it with a sodium ion. The result is sodium lauryl sulfate, with a negatively charged sulfate head and a sodium partner. It is sold as a powder, paste or solution."],
        ],
        "The same pattern, a fatty tail plus a charged head, underlies most synthetic detergents. Changing the length of the tail or the type of head produces surfactants with different strengths and properties.",
        "C12H25OH + SO3 → C12H25OSO3H",
      ),
    ],
    hazards: [
      hz(
        "Skin irritation",
        "SLS is an irritant, meaning it can directly damage the skin barrier and cause redness and dryness, but it isn't an allergen, and despite widespread online claims it doesn't cause cancer. How irritating it is depends on concentration, how long it stays on the skin and the condition of the skin. Rinse-off products like shampoo limit contact time, so most people tolerate them well. People with eczema or very sensitive skin are more likely to react. Many brands now offer SLS-free products for them.",
        "SLS molecules work their way into the outermost layer of skin, where their tails pull out the lipids that fill the spaces between dead skin cells. Their charged heads bind to keratin proteins, and at higher concentrations make those proteins unfold and swell. Both effects weaken the skin barrier. Because SLS is a small molecule with a strongly charged head, it penetrates skin more easily than larger, milder surfactants. The higher the concentration and the longer the contact, the more damage it does.",
        "A damaged barrier lets more water escape, causing dryness, tightness and flaking. It also lets irritants and microbes in, which makes skin cells release inflammatory signals called cytokines. These cause redness, itching and sometimes a burning feeling. In people with eczema, whose barrier is already weak, SLS can trigger flare-ups. The irritation usually settles once exposure stops and the skin has time to repair itself.",
      ),
      hz(
        "Eye irritation",
        "Shampoo stings when it gets in your eyes mainly because of surfactants like SLS. The eyes are especially sensitive because they lack the protective dead-cell layer that covers the rest of the skin. The stinging is temporary and doesn't usually cause lasting damage. Rinsing with clean water quickly relieves it. Baby shampoos labeled “tear-free” use milder surfactants that sting much less.",
        "The surface of the eye is covered by the tear film, a thin layer made of water and mucus topped with an oily layer that slows evaporation. Surfactants like SLS can dissolve that oily layer and disturb the mucus. They can also reach the cornea, the clear front surface of the eye, and disrupt the membranes and proteins of its surface cells. With those protective layers disturbed, the eye's sensitive nerve endings are exposed. SLS's small size and strong charge make it particularly irritating.",
        "The cornea is one of the most densely innervated tissues in the body, packed with pain-sensing nerve endings. When surfactants disturb its surface, these nerves fire, producing intense stinging. The eye responds by making tears and blinking to flush the irritant out, and its blood vessels widen, turning it red. Because corneal surface cells regenerate quickly, a brief exposure usually heals within hours. “Tear-free” formulas replace SLS with milder surfactants and adjust the pH to match tears.",
      ),
    ],
    dosage:
      "Shampoos typically contain about 10 to 20 percent SLS or related surfactants, and toothpastes about 1 to 2 percent. Because these products are rinsed off quickly, most people tolerate them well. Irritation becomes more likely at higher concentrations, with longer contact and in leave-on products; safety reviewers recommend keeping SLS below 1 percent in products meant to stay on the skin. People with eczema, sensitive skin or frequent canker sores may prefer SLS-free alternatives. Despite online rumors, no major regulatory or scientific body considers SLS a carcinogen.",
    synthesis: [
      route(
        "From coconut or palm kernel oil",
        "Most SLS is made from coconut or palm kernel oil, which are naturally rich in lauric acid, a fatty acid with a 12-carbon chain; that is where the “lauryl” in its name comes from. The oil goes through several chemical steps to become lauryl alcohol, which is then turned into SLS. Products made this way are often marketed as “plant-derived” or “from coconut.” However, the final SLS molecule is made by chemical reactions and is identical whatever its source. Only the origin of its carbon atoms differs.",
        "First, coconut or palm kernel oil is reacted with methanol, which replaces the glycerol in its fat molecules and produces fatty acid methyl esters. These are separated by distillation to collect the 12-carbon methyl laurate. Next, the methyl laurate is reacted with hydrogen gas at high pressure over a copper-based catalyst, which converts the ester group into an alcohol group, giving lauryl alcohol. The lauryl alcohol is then reacted with sulfur trioxide to attach a sulfate group, forming lauryl sulfuric acid. Finally, sodium hydroxide neutralizes it to sodium lauryl sulfate.",
        { equation: "C12H25OSO3H + NaOH → C12H25OSO3Na + H2O", significance: "Coconut and palm kernel oils are unusual among plant oils in having mostly 12- and 14-carbon chains, which is why they are the preferred source for foaming cleansers." },
      ),
      route(
        "From petroleum (the Ziegler process)",
        "SLS can also be made from petroleum, using ethylene, a simple gas, as the building block. This method grew out of the Nobel Prize–winning work of the German chemist Karl Ziegler in the 1950s and builds fatty alcohols by joining ethylene molecules together. The lauryl alcohol it produces is chemically identical to the alcohol made from coconut oil. Petroleum-based and plant-based SLS are used interchangeably. The choice mainly comes down to cost and marketing.",
        "Ethylene gas is reacted with triethylaluminum, a compound in which an aluminum atom is bonded to three ethyl groups. Ethylene molecules insert themselves one at a time between the aluminum and the growing carbon chain, adding two carbons each time. This chain growth produces straight hydrocarbon chains of various lengths. The aluminum compound is then treated with oxygen and water, which converts the chains into fatty alcohols. These are separated by distillation to collect lauryl alcohol, which is sulfated and neutralized as usual.",
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
        "SLES has the same 12-carbon tail as SLS, but between the tail and the sulfate head it has a short chain of ethylene oxide units, usually one to three. This spacer makes the water-loving head of the molecule larger and more flexible. Bigger heads make micelles form more easily, so at any given concentration, a larger share of SLES molecules are tucked into micelles. The molecules left floating freely, called monomers, are the ones that penetrate and irritate skin. SLES therefore leaves fewer free monomers available to cause irritation.",
        "Because fewer free SLES molecules are available to soak into the skin, it binds less to skin proteins and strips out fewer protective lipids. As a result, skin and scalp tolerate it better than SLS, making it more suitable for daily use. Studies comparing the two find that SLES causes less redness, dryness and water loss from the skin. That is why SLES is the main cleansing ingredient in most shampoos, body washes and liquid soaps. It still foams well and removes oil effectively.",
        "established",
      ),
      mech(
        "Thickening with salt",
        "In water, SLES molecules normally form small spherical micelles. The negatively charged sulfate heads on the outside of these micelles repel each other, which keeps the micelles small. When salt (sodium chloride) is added, its positive sodium ions cluster around the negative heads and shield them from each other, an effect called charge screening. With less repulsion, the heads can pack closer together, and the micelles grow from little spheres into long, flexible, worm-like shapes. These long micelles tangle together like spaghetti.",
        "The tangled network of worm-like micelles makes the liquid much thicker, which is why manufacturers add salt to shampoo and body wash to give them a rich, gel-like texture. People often associate a thicker product with better quality. But adding too much salt makes the micelles change shape again, branching and breaking up, and the product turns thin. Formulators carefully adjust the salt to reach the right thickness, following what they call the salt curve. A shampoo that suddenly seems runny may simply have too much salt.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Ethoxylation",
        "Ethoxylation is the process of adding ethylene oxide units to a molecule such as a fatty alcohol. Ethylene oxide is a small, highly reactive molecule shaped like a three-membered ring of two carbons and one oxygen. The ring is strained, meaning its bond angles are squeezed, so it springs open easily when attacked. Each opening adds a –CH₂CH₂O– unit to the chain. Ethoxylation is used to make many of the surfactants and emulsifiers in cosmetics and cleaning products.",
        [
          ["Activation", "A base catalyst, such as potassium hydroxide, removes the hydrogen from lauryl alcohol's –OH group, forming an alkoxide ion. This negatively charged oxygen is far more reactive than the original alcohol. It is now ready to attack."],
          ["Ring opening", "The alkoxide attacks one of the carbon atoms of an ethylene oxide ring. The ring opens, releasing its strain, and the ethylene oxide unit becomes attached to the chain as –CH₂CH₂O⁻. The new end is again an alkoxide."],
          ["Chain growth", "The new alkoxide end can attack another ethylene oxide molecule and add another unit. This continues until the ethylene oxide is used up. Because each chain grows at random, the product is a mixture of molecules with different numbers of units."],
        ],
        "The average number of units added, written for example as “laureth-2,” is controlled by the ratio of ethylene oxide to alcohol. More units make the molecule more water-loving and milder.",
        "C12H25OH + n C2H4O → C12H25(OCH2CH2)nOH",
      ),
      rxn(
        "Formation of 1,4-dioxane",
        "During ethoxylation, a small amount of an unwanted byproduct called 1,4-dioxane can form. It is a small ring-shaped molecule made of four carbons and two oxygens. 1,4-Dioxane is a concern because it is classified as a possible human carcinogen and is hard to remove from water once released into the environment. It isn't added on purpose, but it can remain as a trace contaminant in products. Manufacturers remove most of it with a process called vacuum stripping.",
        [
          ["Side reaction", "Instead of attaching to the growing fatty-alcohol chain, two ethylene oxide units can link to each other. This is more likely under acidic conditions, including during the later sulfation step. The two units join end to end."],
          ["Ring closure", "The linked units curl around and close into a six-membered ring with two oxygen atoms opposite each other. This is 1,4-dioxane. It is very stable and doesn't break down easily."],
          ["Removal", "Because 1,4-dioxane is volatile, meaning it evaporates fairly easily, manufacturers remove it by heating the finished surfactant under reduced pressure, which is vacuum stripping. This brings 1,4-dioxane down to trace amounts."],
        ],
        "New York State now caps 1,4-dioxane in personal-care and cleaning products at a few parts per million, pushing manufacturers to strip it more thoroughly. Some have also changed their processes to make less of it in the first place.",
      ),
    ],
    hazards: [
      hz(
        "1,4-dioxane impurity",
        "The main concern about SLES isn't the surfactant itself but a contaminant called 1,4-dioxane that can be left over from manufacturing. The International Agency for Research on Cancer classifies 1,4-dioxane as possibly carcinogenic to humans (Group 2B), based on animal studies. Levels in well-made SLES are very low, and exposure from rinse-off products is brief. It is also an environmental concern because it contaminates sources of drinking water. Regulations in some places now set strict limits.",
        "1,4-Dioxane is a small ether molecule that dissolves completely in water and evaporates fairly easily. When products containing it go down the drain, it passes through wastewater treatment plants largely unchanged, because it neither sticks to sludge nor breaks down easily. It can then reach rivers and groundwater that may be used for drinking water. Removing it from water is difficult and expensive. This persistence in the environment is a major reason regulators target it.",
        "In animal studies, rats and mice that drank water containing high concentrations of 1,4-dioxane for their whole lives developed liver tumors, and some developed tumors elsewhere. Those doses were far higher than anything people encounter from cosmetics. At high concentrations it can also irritate the eyes and airways. Evidence in people is limited. Because it is a possible carcinogen that lingers in water, regulators aim to minimize exposure from every source.",
      ),
      hz(
        "Irritation at high concentration",
        "SLES is much milder than SLS, but it is still a detergent designed to remove oils, so it can dry or irritate skin under some conditions. This is more likely with very frequent washing, high concentrations or leaving the product on the skin for a long time. People with eczema or sensitive skin may notice dryness. Most people use SLES-based products every day without problems. Moisturizing ingredients and milder co-surfactants reduce irritation further.",
        "Even though SLES forms micelles more readily than SLS, some free SLES molecules, called monomers, are always present in solution. These monomers can penetrate the skin's outer layer and pull out lipids from between its cells. At higher concentrations there are more monomers available to do this. Repeated exposure gradually depletes the skin's protective lipids. The effect is similar to SLS's but less intense.",
        "When lipids are removed faster than the skin can replace them, the barrier weakens. Water evaporates more quickly, leaving skin dry, rough and tight, and irritants get in more easily, causing redness or itching. People who wash their hands many times a day, such as healthcare workers, can develop irritant hand dermatitis this way. Using lukewarm instead of hot water and putting on moisturizer after washing helps protect the skin. Formulas with added glycerin or oils also reduce dryness.",
      ),
    ],
    dosage:
      "Shampoos and body washes commonly contain about 10 to 20 percent SLES, often combined with milder co-surfactants such as cocamidopropyl betaine. Because these products are rinsed off within a minute or two, skin exposure is brief. Well-made SLES contains only trace amounts of 1,4-dioxane, and several places now regulate the maximum; New York State, for example, limits it to a few parts per million in finished products. People with very sensitive or eczema-prone skin may prefer sulfate-free cleansers. For most people, SLES-based products are safe for daily use.",
    synthesis: [
      route(
        "Ethoxylation, sulfation and neutralization",
        "SLES is made from lauryl alcohol in three main chemical steps. The lauryl alcohol can come from coconut or palm kernel oil or from petroleum. First, ethylene oxide units are added; then a sulfate group is attached; and finally the product is neutralized with a base. A last purification step removes the unwanted byproduct 1,4-dioxane. The whole process runs on a vast scale, since SLES is one of the most widely used surfactants in the world.",
        "Lauryl alcohol is first reacted with ethylene oxide in the presence of a base catalyst, which adds an average of one to three –CH₂CH₂O– units to the end of each molecule; this is ethoxylation. The ethoxylated alcohol is then reacted with sulfur trioxide gas in a thin-film reactor, attaching a sulfate group to the end of the ethylene oxide chain. The resulting acid is immediately neutralized with sodium hydroxide, forming sodium laureth sulfate. The product is then vacuum-stripped, gently heated under reduced pressure, to evaporate away most of the 1,4-dioxane. It is usually sold as a thick paste or as a 25 to 70 percent solution.",
        { significance: "SLES displaced SLS in most shampoos from the 1960s onward because it was gentler at a similar cost." },
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
        "Anionic surfactants like SLES have negatively charged heads that repel each other, which keeps their micelles fairly small and leaves many free molecules, called monomers, floating in solution. Cocamidopropyl betaine molecules carry both a positive and a negative charge, which makes them zwitterionic. When mixed with SLES, betaine molecules slot in between the SLES molecules in the micelles. Their positive charges partly cancel the repulsion between neighboring negative heads, so the micelles grow larger and more stable. As a result, fewer free SLES monomers are left in solution.",
        "Free surfactant monomers are the main cause of skin and eye irritation, because they can penetrate the skin barrier and bind to proteins. By cutting down the number of free monomers, cocamidopropyl betaine makes mixtures with SLES much milder than SLES alone. Studies show these mixtures cause less redness, dryness and protein damage. That is why cocamidopropyl betaine is a key ingredient in baby shampoos, facial cleansers and products for sensitive skin. It also boosts foam and thickens the product.",
        "human",
      ),
      mech(
        "Allergy from manufacturing impurities",
        "Cocamidopropyl betaine is made in two steps, and if the reactions aren't complete or the product isn't well purified, traces of the starting materials can remain. Two of these impurities, amidoamine and dimethylaminopropylamine (DMAPA), are small, reactive molecules containing nitrogen. They can form chemical bonds with proteins in the skin, acting as haptens, small molecules that become allergens once attached to a protein. The modified proteins look foreign to the immune system. The betaine molecule itself appears to be much less allergenic.",
        "In people who become sensitized, immune cells learn to recognize the modified proteins. On later exposure, these cells trigger allergic contact dermatitis, producing itchy, red, sometimes scaly patches where the product touched the skin. The face, eyelids, neck and scalp are common sites, since shampoo and cleansers run over them. A dermatologist can identify the allergy with patch testing. Better manufacturing and purification since the early 2000s have lowered impurity levels and reaction rates.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Amidation",
        "The first step in making cocamidopropyl betaine joins a fatty acid from coconut oil to a small molecule called dimethylaminopropylamine, or DMAPA. The two are linked by an amide bond, the same kind of bond that connects amino acids in proteins. This step attaches the oily tail to the part of the molecule that will later become the charged head. The reaction needs heat and releases water. It is called amidation because it forms an amide.",
        [
          ["Mixing", "Coconut fatty acids, or their methyl esters, are mixed with DMAPA and heated to around 150 to 180 °C. Coconut oil supplies fatty acids that are mostly 12 and 14 carbons long. DMAPA has two nitrogen atoms, one at each end of a three-carbon chain."],
          ["Condensation", "The nitrogen at one end of DMAPA, which carries two hydrogens, attacks the carbon of the fatty acid's carboxyl group. A molecule of water (or methanol, if a methyl ester is used) is released as the amide bond forms. A reaction in which two molecules join and give off a small molecule is called condensation."],
          ["Intermediate", "The product, called an amidoamine, has the fatty tail joined through the amide bond to a three-carbon spacer, ending in a nitrogen with two methyl groups. That nitrogen is basic but not yet permanently charged. The amidoamine is ready for the next step."],
        ],
        "Any amidoamine or DMAPA that doesn't react in the next step can remain as an impurity, and these are the substances linked to allergic reactions. Manufacturers control reaction conditions carefully to minimize them.",
        "RCOOH + H2N(CH2)3N(CH3)2 → RCONH(CH2)3N(CH3)2 + H2O",
      ),
      rxn(
        "Quaternization",
        "In the second step, the nitrogen at the end of the amidoamine gains a fourth carbon group and with it a permanent positive charge. This is called quaternization, because the nitrogen becomes a quaternary ammonium, bonded to four carbon atoms. The group that is added also carries a negatively charged carboxylate, so the finished molecule holds both charges. Molecules like this are called zwitterions, from the German word for “hybrid.” This dual charge is what makes cocamidopropyl betaine mild.",
        [
          ["Alkylation", "The amidoamine is mixed with sodium monochloroacetate, a small molecule with a chlorine atom on the carbon next to a carboxylate group. The amidoamine's nitrogen attacks that carbon and pushes the chlorine out as a chloride ion. A new carbon–nitrogen bond forms."],
          ["Charge", "With four carbon groups now attached, the nitrogen can no longer use its lone pair of electrons and carries a permanent positive charge. Unlike charges that come and go with pH, this one is always there. The chloride ion pairs with sodium to form sodium chloride, ordinary salt."],
          ["Zwitterion", "The acetate group that was attached carries a negative charge on its carboxylate, balancing the positive nitrogen. The molecule is now a zwitterion. Its overall charge shifts slightly with pH but is often close to neutral."],
        ],
        "The result carries both charges in one molecule, which is the source of its mildness and of how well it works with other surfactants. The salt formed as a byproduct stays in the product and helps thicken shampoos.",
        "RCONH(CH2)3N(CH3)2 + ClCH2COONa → RCONH(CH2)3N+(CH3)2CH2COO- + NaCl",
      ),
    ],
    hazards: [
      hz(
        "Contact allergy",
        "Allergic reactions to cocamidopropyl betaine are uncommon, but they were notable enough that the American Contact Dermatitis Society named it Allergen of the Year in 2004. Most reactions are now thought to be caused by manufacturing impurities rather than the betaine molecule itself. Improved manufacturing has reduced those impurities. People who react can usually use products made with highly purified betaine or with other surfactants. A dermatologist can confirm the allergy with patch testing.",
        "The impurities amidoamine and dimethylaminopropylamine (DMAPA) are small, reactive molecules that can penetrate the skin. Once inside, they can form chemical bonds with skin proteins, a process called haptenation. The modified proteins are recognized as foreign by the immune system. Even small amounts can trigger a reaction in someone already sensitized. Higher-purity products contain less of these impurities.",
        "In sensitized people, immune cells called T cells recognize the modified proteins and release inflammatory signals whenever the skin is exposed again. This causes allergic contact dermatitis, with itchy, red, scaly patches that usually appear one to two days after contact. Common sites are the eyelids, face, neck and scalp, where shampoo and cleansers run. Hairdressers, who handle these products all day, are at higher risk. Avoiding products with cocamidopropyl betaine or switching to highly purified versions usually solves the problem.",
      ),
    ],
    dosage:
      "Shampoos, body washes and facial cleansers typically contain about 1 to 10 percent cocamidopropyl betaine, usually combined with other surfactants. Because these products are rinsed off, skin contact is brief. The Cosmetic Ingredient Review has concluded it is safe as used when formulated to keep the impurities amidoamine and DMAPA low. People with a known allergy should check labels carefully, since it is very common in shampoos and cleansers. For most people, it makes products milder rather than harsher.",
    synthesis: [
      route(
        "From coconut oil",
        "Cocamidopropyl betaine is often described as coconut-derived because its fatty tail comes from coconut oil. The full molecule, however, is built through two chemical reactions using other industrially produced chemicals. Coconut oil is rich in lauric and myristic acids, fatty acids with 12 and 14 carbons. Those chain lengths are ideal for good foam and cleaning. The finished product is usually sold as a clear to pale yellow liquid.",
        "First, coconut fatty acids, or their methyl esters, are heated with dimethylaminopropylamine (DMAPA), forming an amide bond and producing an amidoamine; excess DMAPA is then removed. Next, the amidoamine is reacted with sodium monochloroacetate in water, which attaches a carboxymethyl group to its nitrogen and gives it a permanent positive charge, balanced by the carboxylate's negative charge. The reaction produces sodium chloride as a byproduct. The final product is diluted to about a 30 percent solution, and its purity is checked to keep impurities low.",
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
        "Dimethicone's backbone of alternating silicon and oxygen atoms is very flexible, and each silicon atom carries two methyl groups (–CH₃) that face outward. These methyl groups interact only weakly with each other and with other surfaces. That gives dimethicone a very low surface tension, about 20 millinewtons per meter, compared with about 72 for water. Liquids with low surface tension spread easily into thin, even films. And because the molecules slide past each other so easily, dimethicone also reduces friction.",
        "Added to lotions and creams, dimethicone helps them glide onto the skin without feeling sticky or greasy. On hair, it coats each strand with a thin, smooth film that reduces friction between strands. That makes hair easier to comb, cuts down on tangles and breakage, and calms frizz by smoothing the hair's outer scales. It also adds shine, because a smoother surface reflects light more evenly. These effects are why silicones are so common in conditioners and styling products.",
        "established",
      ),
      mech(
        "Breathable skin protection",
        "When dimethicone spreads on skin, it forms a thin film. Its outward-facing methyl groups repel water, so the film resists liquid water. But dimethicone molecules don't pack together tightly; they are coiled and loosely arranged, leaving small gaps. Individual molecules of water vapor and oxygen are small enough to pass through those gaps. So the film blocks liquid water and many irritants while still letting the skin breathe.",
        "This combination lets dimethicone protect skin without trapping sweat or blocking pores. The U.S. FDA recognizes dimethicone as a skin protectant, an ingredient that helps protect chapped or irritated skin. It reduces water loss, keeping skin hydrated, and shields against irritants such as wetness, friction and some chemicals. That is why it is used in diaper creams, hand creams and barrier creams. Despite the myth, dimethicone isn't comedogenic, meaning it doesn't usually clog pores or cause acne.",
        "established",
      ),
      mech(
        "Breaking foam",
        "Foam is made of gas bubbles separated by thin films of liquid, and those films are held together by surfactant molecules lined up at their surfaces. Dimethicone has a very low surface tension and doesn't mix well with water or many oils. When a tiny droplet of dimethicone touches a bubble wall, it spreads rapidly across the surface, dragging liquid away and thinning the film. The thin spot becomes a weak point. The bubble pops.",
        "Just a few parts per million of dimethicone can stop foaming in industrial processes and cooking oils, where foam could boil over or cause other problems. Food manufacturers add it to frying oil for exactly this reason. In medicine, simethicone, a mixture of dimethicone and silica, is used to relieve gas and bloating. It breaks up small gas bubbles trapped as foam in the stomach and intestines, letting them merge so they can be released more easily. It isn't absorbed into the body.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrolysis and condensation",
        "Dimethicone is made from a reactive silicon compound called dimethyldichlorosilane, which has two methyl groups and two chlorine atoms attached to a silicon atom. When this compound reacts with water, the chlorines are replaced with –OH groups, and these join up to build long chains. This is a type of polymerization, building large molecules from small repeating units. By controlling the reaction, manufacturers can make silicones ranging from thin liquids to thick gums. It is a neat example of chemistry turning a gas-releasing reaction into a useful material.",
        [
          ["Hydrolysis", "Dimethyldichlorosilane reacts with water. Each silicon–chlorine bond is replaced by a silicon–oxygen–hydrogen group (Si–OH), and hydrogen chloride gas (HCl) is released. The product, dimethylsilanediol, has two –OH groups."],
          ["Condensation", "Si–OH groups on neighboring molecules react with each other, joining into a Si–O–Si bridge and releasing a molecule of water. This is called condensation. Each molecule can link to two others, forming chains."],
          ["Chain building", "Repeated condensation builds both rings and long chains of alternating silicon and oxygen atoms. Manufacturers add end-capping molecules that have only one reactive group, which stop each chain growing once it reaches the desired length. Rings can also be opened and joined into longer chains."],
        ],
        "Controlling chain length controls viscosity, from water-thin fluids to thick putty. Short chains go into light, fast-spreading products, while long chains make thick, cushiony creams. Linking chains to each other produces silicone rubber.",
        "n (CH3)2SiCl2 + n H2O → [(CH3)2SiO]n + 2n HCl",
      ),
      rxn(
        "The direct process",
        "The direct process is how the silicon building blocks for silicones are made. It was discovered independently by the American chemist Eugene Rochow and the German chemist Richard Müller in the early 1940s, and is sometimes called the Müller–Rochow process. It reacts silicon metal directly with methyl chloride gas. This single reaction made silicones affordable on a large scale. It is still the foundation of the silicone industry.",
        [
          ["Raw materials", "Silicon metal, made from quartz sand, is ground into a fine powder and mixed with a copper catalyst plus small amounts of other metals that improve the reaction. The mixture goes into a reactor called a fluidized bed, where gas keeps the powder churning."],
          ["Reaction", "Methyl chloride gas is blown through the hot powder at about 300 °C. The copper catalyst helps silicon atoms react with the gas, forming bonds to methyl groups and chlorine atoms. The reaction produces a mixture of different methylchlorosilanes."],
          ["Distillation", "The mixture is cooled into a liquid and separated by distillation according to boiling point. Dimethyldichlorosilane, the product used to make dimethicone, usually makes up most of it."],
        ],
        "Eugene Rochow's direct process, developed in the 1940s, made silicones affordable. Today millions of tonnes of silicones are made every year for products ranging from cosmetics to cookware, medical devices and electronics.",
        "Si + 2 CH3Cl → (CH3)2SiCl2",
      ),
    ],
    hazards: [
      hz(
        "Temporary eye blurring",
        "Dimethicone is among the least irritating ingredients used in cosmetics and rarely causes irritation or allergic reactions. Its main minor effect is that it can blur vision for a short time if it gets into the eyes. That happens because it spreads across the eye's surface as an oily film. It doesn't cause damage and clears quickly. Rinsing with water helps.",
        "Dimethicone's very low surface tension lets it spread easily over surfaces, including the moist surface of the eye. It doesn't mix with the watery tear film, so it forms a thin oily layer on top. That layer bends light slightly differently from tears, and because it is uneven, it distorts the light entering the eye. Dimethicone itself is chemically inert and doesn't react with eye tissue. The problem is purely optical.",
        "The oily film blurs vision briefly, like looking through a smudged window. Blinking and tears gradually wash it away, usually within minutes. Because dimethicone doesn't damage the cornea or trigger inflammation, there is typically no stinging and no lasting harm. Silicone oils are so well tolerated that eye surgeons sometimes place them inside the eye during retinal surgery. Rinsing with clean water speeds things up.",
      ),
    ],
    dosage:
      "Cosmetics typically contain about 1 to 15 percent dimethicone, and some primers and serums contain more. The Cosmetic Ingredient Review has concluded that dimethicone and related silicones are safe as used in cosmetics, and the U.S. FDA allows dimethicone at 1 to 30 percent as the active ingredient in over-the-counter skin protectants. In food it is permitted at very low levels, around 10 parts per million, as an anti-foaming agent. Simethicone for gas relief is taken in doses of tens to hundreds of milligrams and isn't absorbed. Environmental concerns focus on certain small, ring-shaped silicones rather than on dimethicone itself.",
    synthesis: [
      route(
        "From sand to silicone",
        "Silicones start life as sand. Silicon, the second most abundant element in Earth's crust after oxygen, is found mainly in quartz sand as silicon dioxide (SiO₂). Turning sand into dimethicone takes several energy-hungry steps. The process combines inorganic chemistry, which deals with minerals and metals, with organic chemistry, which deals with carbon compounds. That is why silicones are often described as a bridge between the two.",
        "First, quartz sand is mixed with carbon, usually coke or charcoal, and heated to about 1,900 °C in an electric arc furnace. The carbon pulls oxygen away from the silicon dioxide, producing silicon metal and carbon monoxide. The silicon is crushed into powder and reacted with methyl chloride gas over a copper catalyst in the direct process, producing dimethyldichlorosilane. This liquid is then reacted with water, which replaces its chlorine atoms with –OH groups that link up into chains. Finally the chains are capped at the desired length and purified, giving dimethicone.",
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
        "Phenoxyethanol dissolves well in both water and fats, because it has an oily benzene ring at one end and a water-loving –OH group at the other. That lets it travel through a watery product and then slip into the fatty membranes of bacteria. Once inside a membrane, it pushes the fatty molecules apart and disturbs their orderly arrangement, making the membrane leaky. Small ions such as potassium, which the cell needs to keep inside, start leaking out. The cell can no longer keep its inside separate from the outside.",
        "A leaky membrane also wrecks the bacterium's energy supply. Bacteria make ATP by pumping hydrogen ions across their membrane to build up a store of energy, like water behind a dam, and then letting them flow back through an enzyme that makes ATP. If the membrane leaks, the ions flow back without making any ATP, which is called uncoupling. Without energy, the bacteria can't grow or divide. Phenoxyethanol is especially good against Gram-negative bacteria such as Pseudomonas aeruginosa, which can contaminate cosmetics and cause infections.",
        "lab",
      ),
      mech(
        "Metabolism in people",
        "When phenoxyethanol is absorbed through the skin or swallowed, it enters the bloodstream and is carried to the liver. Liver enzymes, first alcohol dehydrogenase and then aldehyde dehydrogenase, oxidize the –OH end of the molecule. This turns it into an aldehyde and then into a carboxylic acid, forming phenoxyacetic acid. It is the same two-step route the body uses to break down drinking alcohol. Phenoxyacetic acid dissolves more readily in water and is easier to excrete.",
        "Phenoxyacetic acid is filtered out of the blood by the kidneys and leaves the body in urine. Studies in people show that most phenoxyethanol absorbed through the skin is excreted this way within about 24 hours. Because it is cleared so quickly, it doesn't build up with repeated use. That rapid clearance is one reason regulators consider it safe at the low concentrations used in cosmetics. The amount absorbed from cosmetics is small to begin with.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Making phenoxyethanol",
        "Phenoxyethanol is made by joining phenol, a benzene ring carrying an –OH group, to ethylene oxide, a small three-membered ring of two carbons and an oxygen. The reaction works because ethylene oxide's ring is strained, with its bonds squeezed into an unusually tight angle, so it springs open when attacked. This kind of reaction is called a ring-opening reaction. It is closely related to the reaction used to make ethoxylated surfactants. It is efficient and produces few byproducts.",
        [
          ["Activation", "Phenol is mixed with a base such as sodium hydroxide, which removes the hydrogen from phenol's –OH group. That forms the phenoxide ion, which has a negative charge on its oxygen. This makes it a strong nucleophile, a molecule that seeks out electron-poor atoms."],
          ["Ring opening", "The phenoxide ion attacks one of the carbon atoms in ethylene oxide. A carbon–oxygen bond in the ring breaks, releasing the ring strain, and the ring opens up. The phenoxide oxygen is now bonded to that carbon, forming a new two-carbon chain that ends in a negatively charged oxygen."],
          ["Protonation", "The negatively charged oxygen at the end of the chain picks up a hydrogen ion from its surroundings and becomes an –OH group. The product is phenoxyethanol. It is then purified by distillation."],
        ],
        "Ring strain makes ethylene oxide reactive enough to build many glycol ethers, including some used in paints, inks and cleaners. By controlling the amount of ethylene oxide, manufacturers make sure only one unit is added to each phenol.",
        "C6H5OH + C2H4O → C6H5OCH2CH2OH",
      ),
    ],
    hazards: [
      hz(
        "Swallowing by infants",
        "Phenoxyethanol is safe in cosmetics at the low concentrations used, but swallowing larger amounts can be harmful, especially for infants. In 2008, the U.S. FDA warned consumers not to use a particular nipple cream containing phenoxyethanol and chlorphenesin, because breastfeeding babies could swallow it. The concern was that these ingredients could depress an infant's nervous system and cause vomiting and diarrhea. In France, health authorities advise against using phenoxyethanol in leave-on products for the diaper area of children under three. That advice is a precaution rather than a response to proven harm.",
        "Phenoxyethanol belongs to a family called glycol ethers, some of which affect the central nervous system at high doses. When a large amount is absorbed, it can slow down nerve signaling, somewhat like alcohol does. Infants absorb substances more readily through their skin and mouths and have less developed liver enzymes for breaking them down. Their small bodies also mean a small amount adds up to a relatively large dose. The diaper area is often damaged and damp, which increases absorption further.",
        "Depression of the central nervous system can cause drowsiness, poor feeding, weakness and, in severe cases, breathing problems. Phenoxyethanol can also irritate the stomach, causing vomiting and diarrhea, which can dehydrate an infant. These effects have been seen mainly after swallowing or very high exposure, not with normal use of cosmetics by adults. The French recommendation reflects caution about leave-on products on young children's damaged skin. Parents who want to avoid it can check labels.",
      ),
      hz(
        "Rare allergy",
        "Phenoxyethanol is among the least allergenic preservatives used in cosmetics. Even though it is used in a huge number of products, allergic reactions are uncommon. That is one reason it has replaced other preservatives, such as methylisothiazolinone, that caused many allergies. When reactions do happen, they are usually mild. People who react can choose products with different preservatives.",
        "In rare cases, phenoxyethanol or a substance formed from it may act as a hapten, a small molecule that binds to skin proteins and makes them look foreign to the immune system. It isn't very reactive, so this happens only occasionally. Many skin reactions blamed on phenoxyethanol are actually mild irritation or hives rather than true allergy. Some may also be caused by other ingredients in the same product. Patch testing helps identify the real cause.",
        "In a person who does become allergic, immune cells in the skin recognize the modified proteins and cause inflammation on later exposures. The result is allergic contact dermatitis, with red, itchy, sometimes swollen patches where the product was applied. Occasionally phenoxyethanol causes contact urticaria, a hive-like reaction that appears within minutes. In patients patch-tested for cosmetic allergies, reaction rates to phenoxyethanol are well under 1 percent. That makes it one of the safest preservative choices for most people.",
      ),
    ],
    dosage:
      "In the European Union, cosmetics may contain at most 1 percent phenoxyethanol, and most products use less, often 0.5 to 1 percent. The EU's scientific safety committee reviewed it in 2016 and concluded that this limit is safe for all age groups, including young children. Systemic exposure from normal use is well below levels that cause effects in animals. It is also used as a preservative in some vaccines and medicines, in very small amounts. The main precaution is to avoid products that infants might swallow.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Phenoxyethanol is made in chemical plants from phenol and ethylene oxide, both of which come from petroleum. The process was developed in the early 20th century. Besides being a preservative, phenoxyethanol is used as a solvent in inks and dyes. Its faint, pleasant rose-like smell has also made it useful in perfumes. All the phenoxyethanol used in cosmetics is made synthetically.",
        "Phenol is mixed with a small amount of sodium hydroxide, which converts some of it into the reactive phenoxide ion. Ethylene oxide gas is then added under controlled temperature and pressure. The phenoxide attacks and opens the strained ethylene oxide ring, attaching a two-carbon chain that ends in an –OH group. Conditions are controlled so that only one ethylene oxide unit is added to each phenol molecule. The crude product is then purified by distillation to remove unreacted phenol and any molecules with longer chains.",
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
        "Methylparaben is a small molecule with a benzene ring, an –OH group at one end and a methyl ester group at the other. Its partly oily structure lets it dissolve into the fatty membranes of microbes. There, it disturbs the proteins embedded in the membrane, including the ones that carry nutrients into the cell. It also interferes with the buildup of hydrogen ions across the membrane, which the microbe needs to make energy in the form of ATP. Some research suggests parabens can also interfere with the making of DNA and RNA.",
        "With nutrient transport and energy production disrupted, molds, yeasts and Gram-positive bacteria can't grow in the product. Parabens are less effective against Gram-negative bacteria, which have an extra outer membrane that keeps them out. That is why products often combine several parabens, or parabens with other preservatives, to cover a wider range of microbes. Methylparaben works best against molds and yeasts, while longer-chain parabens are better against bacteria. Together they keep lotions, creams and some foods safe to use for months.",
        "lab",
      ),
      mech(
        "Weak estrogen mimicry",
        "Estrogen hormones such as estradiol work by binding to estrogen receptors, proteins inside cells that switch genes on and off. Part of estradiol's structure is a benzene ring with an –OH group, called a phenol. Parabens have this same para-hydroxyphenyl group, which lets them fit loosely into the estrogen receptor's binding pocket. The rest of the paraben molecule fits poorly, though, so it binds thousands of times more weakly than estradiol. Longer ester chains fit somewhat better, which is why butylparaben is more estrogen-like than methylparaben.",
        "In laboratory tests using cells that respond to estrogen, parabens can cause weak estrogen-like effects at high concentrations. In animal studies, very high doses of some parabens have affected the uterus and reproductive organs. Methylparaben is the weakest member of the family in these tests. Because the body's own estrogen is far more potent and normal paraben exposure is low, the extra estrogen-like effect from cosmetics is considered very small. This concern is still the reason regulators set stricter limits on the longer-chain parabens.",
        "lab",
      ),
      mech(
        "Rapid breakdown",
        "Methylparaben is an ester, a type of molecule formed by joining an acid and an alcohol. Enzymes called esterases, found in the skin, liver and blood, break ester bonds by adding water, a reaction called hydrolysis. This splits methylparaben into para-hydroxybenzoic acid (PHBA) and methanol. PHBA is then attached to other molecules, such as glycine or glucuronic acid, a process called conjugation. The conjugated forms dissolve much more easily in water.",
        "The conjugated PHBA is filtered out by the kidneys and excreted in urine, usually within hours to a day. Because esterases in the skin start breaking methylparaben down as soon as it is absorbed, much of it is metabolized before it ever reaches the bloodstream. That means it doesn't build up much in the body with normal use. Studies have found small amounts of intact parabens in human urine and tissues, so some does get through. Those amounts are far below the doses that cause effects in animal studies.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Kolbe–Schmitt carboxylation and esterification",
        "Parabens are made in two main steps. First, a carboxylic acid group is attached to phenol to make para-hydroxybenzoic acid (PHBA), using a reaction called the Kolbe–Schmitt reaction. Developed by Hermann Kolbe and Rudolf Schmitt in the 1800s, it uses carbon dioxide as a building block. Then PHBA is joined with an alcohol to make the paraben ester. The alcohol chosen decides which paraben is made.",
        [
          ["Carboxylation", "Phenol is converted into potassium phenoxide by reacting it with potassium hydroxide. The potassium phenoxide is then heated with carbon dioxide under high pressure at about 200 °C. The carbon dioxide attaches to the ring opposite the oxygen, forming a carboxylate group, and acidifying the product gives para-hydroxybenzoic acid."],
          ["Esterification", "PHBA is heated with methanol in the presence of an acid catalyst such as sulfuric acid. The methanol's oxygen attacks the carbon of PHBA's carboxylic acid group. This is Fischer esterification, the same reaction used to make fruity-smelling esters."],
          ["Product", "As the ester bond forms, a water molecule is released, and removing that water pushes the reaction forward. The product is methylparaben. It is purified by crystallization into white crystals."],
        ],
        "Swapping methanol for propanol or butanol gives the other parabens. Using potassium phenoxide rather than sodium phenoxide favors attaching the carboxyl group opposite the oxygen, the “para” position that gives parabens their name.",
        "HOC6H4COOH + CH3OH → HOC6H4COOCH3 + H2O",
      ),
      rxn(
        "Hydrolysis in the body",
        "Once methylparaben enters the body, it is broken down by the reverse of the reaction used to make it. Enzymes called esterases split the ester bond, releasing para-hydroxybenzoic acid and methanol. This process, called hydrolysis, uses a water molecule to break the bond. It happens quickly in the skin and liver. The products are then prepared for removal from the body.",
        [
          ["Binding", "Esterase enzymes in the skin, liver and blood recognize methylparaben's ester group and hold it in their active site. The enzyme positions a water molecule right next to the ester bond. That makes the bond much easier to break."],
          ["Cleavage", "The water molecule attacks the carbon of the ester group, breaking the bond between that carbon and the oxygen attached to the methyl group. The products are para-hydroxybenzoic acid (PHBA) and methanol. The amount of methanol released is tiny."],
          ["Excretion", "Other enzymes attach PHBA to glycine or glucuronic acid, which makes it more water-soluble. The kidneys filter this conjugated PHBA out of the blood, and it leaves the body in urine."],
        ],
        "Fast hydrolysis is one reason regulators consider methylparaben low-risk at permitted levels. PHBA itself is found naturally in many fruits and vegetables.",
        "HOC6H4COOCH3 + H2O → HOC6H4COOH + CH3OH",
      ),
    ],
    hazards: [
      hz(
        "Endocrine questions",
        "Parabens have been controversial since a 2004 study detected them in breast tumor tissue, raising fears that they might contribute to breast cancer by mimicking estrogen. However, that study didn't show the parabens caused the tumors, and it didn't compare tumors with healthy tissue. Extensive research and regulatory reviews since then have found no causal link between parabens and breast cancer. Methylparaben is the weakest estrogen mimic in the family and is considered safe at permitted levels. Regulators have restricted the longer-chain parabens, which are more estrogen-like.",
        "Parabens bind weakly to estrogen receptors because their para-hydroxyphenyl group resembles part of the estradiol molecule. Binding strength increases as the ester chain gets longer: methyl, then ethyl, propyl and butyl. Even the strongest parabens bind thousands of times more weakly than the body's own estrogen. Parabens are also broken down quickly by esterase enzymes, which reduces how much can reach estrogen receptors at all. Some parabens may also weakly block androgen receptors.",
        "In laboratory and animal studies, parabens cause weak estrogen-like effects only at doses far higher than people get from cosmetics. Even so, the European Union restricted propylparaben and butylparaben to a combined maximum of 0.14 percent, banned them from leave-on diaper-area products for children under three, and banned several less-studied parabens outright. Methylparaben and ethylparaben remain permitted at up to 0.4 percent each. No study has shown that parabens at normal exposure cause cancer or hormonal disorders in people.",
      ),
      hz(
        "The “paraben paradox” allergy",
        "Parabens rarely cause allergies on healthy skin, but people with damaged skin, for example from eczema or leg ulcers, sometimes become allergic. Curiously, many of these people can use paraben-containing products on healthy skin elsewhere without any reaction. The dermatologist Alexander Fisher called this the “paraben paradox.” Overall, parabens are among the least allergenic preservatives. That is one reason some dermatologists consider them safer than many of their replacements.",
        "On damaged skin, parabens can penetrate more deeply and in larger amounts than through healthy skin. There they may bind to skin proteins and act as haptens, small molecules that make proteins look foreign to the immune system. Damaged skin also has more immune activity going on, which makes sensitization more likely. On intact skin, the barrier limits how much paraben gets in at all. That difference in penetration may explain the paradox.",
        "In sensitized people, applying paraben-containing creams to damaged skin can trigger allergic contact dermatitis, with itching, redness and a worsening of the existing rash. This was especially relevant for medicated creams used on eczema or leg ulcers, many of which contained parabens. Yet the same people may have no trouble with paraben-containing cosmetics on healthy skin. Patch testing finds paraben allergy in only about 1 percent or fewer of people tested for cosmetic allergies. That is a remarkably low rate for such widely used preservatives.",
      ),
    ],
    dosage:
      "Cosmetics typically use 0.1 to 0.3 percent methylparaben, often combined with other preservatives. In the European Union, methylparaben and ethylparaben are each permitted at up to 0.4 percent, and up to 0.8 percent when combined with other parabens, while stricter limits apply to propyl- and butylparaben. Studies measuring parabens in urine show that typical human exposure is far below the doses that cause hormonal effects in animals. Methylparaben is also used in some foods and medicines. People with eczema who react to paraben-containing creams should talk to a dermatologist.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Methylparaben is made in chemical plants from phenol, carbon dioxide and methanol, which are produced from petroleum and natural gas. Parabens were first used as preservatives in the 1920s and became popular because they are effective, cheap, stable and have little smell or color. Methylparaben is one of the most widely used preservatives in cosmetics, medicines and foods. It is often paired with propylparaben to cover more kinds of microbes. Together they protect a product against both molds and bacteria.",
        "First, phenol is reacted with potassium hydroxide to form potassium phenoxide. This is heated with carbon dioxide under pressure in the Kolbe–Schmitt reaction, which attaches a carboxyl group to the ring opposite the oxygen, and the product is acidified to give para-hydroxybenzoic acid (PHBA). PHBA is then heated with methanol and an acid catalyst, which joins them into the methyl ester and releases water. The crude methylparaben is purified by crystallization and washing, producing fine white crystals. It is tested for purity before sale.",
        { significance: "Methylparaben occurs naturally too: it's found in blueberries and is a component of the honeybee queen's pheromone." },
      ),
    ],
  },
};
