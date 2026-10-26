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
        "Xanthan gum molecules are extremely long chains of sugars, and in water their side chains fold back along the main chain, turning each molecule into a stiff, rod-like helix. At rest, these long rods point in every direction and tangle with each other, trapping water between them, so the liquid is thick. When the liquid is stirred, squeezed or poured, the flow pulls the rods into line, all pointing the same way, like logs floating down a river. Lined-up rods slide past each other easily, so the liquid suddenly becomes much thinner. When the flow stops, the rods drift back into a tangle and the thickness returns, a behavior called shear thinning.",
        "Shear thinning is why a dressing thickened with xanthan pours easily from a shaken bottle but then clings to lettuce instead of pooling at the bottom of the bowl. Toothpaste works the same way: it flows when you squeeze the tube but sits still on the brush. In the mouth, chewing and swallowing thin the sauce out, so it feels smooth and light rather than gummy or slimy. Because xanthan is unaffected by heat, cold, salt and acid, it behaves the same in very different foods. That reliability also makes it valuable in gluten-free baking, where it helps hold batter together.",
        "established",
      ),
      mech(
        "Helping people swallow safely",
        "Thin liquids like water flow very fast and can split into separate streams in the mouth and throat. A small amount of xanthan gum makes a liquid flow more slowly and hold together as one cohesive mass, called a bolus. Because xanthan is shear-thinning, the thickened drink still feels smooth as it is swallowed. It also keeps a steady thickness when mixed with saliva, unlike starch-based thickeners, which enzymes in saliva break down. That stability keeps every mouthful predictable.",
        "Some people, such as those recovering from a stroke or living with Parkinson's disease or dementia, have dysphagia, meaning difficulty swallowing safely. For them, thin liquids can move faster than the muscles and reflexes that protect the airway can react, so liquid slips into the windpipe and lungs, a problem called aspiration. Aspiration can cause coughing, choking and a serious lung infection called aspiration pneumonia. Speech and language therapists prescribe drinks thickened to specific levels so that liquid moves slowly enough to swallow safely. Xanthan-based thickeners are widely used in hospitals and care homes for this purpose.",
        "human",
      ),
      mech(
        "A fermentable fiber",
        "Xanthan's backbone is made of glucose units joined by beta (β) glycosidic bonds, the same kind of bond found in cellulose. Human digestive enzymes can only break alpha (α) glycosidic bonds, the kind found in starch, so xanthan passes through the stomach and small intestine undigested. In the colon, some bacteria do have enzymes that can break it apart. They ferment parts of the gum, breaking it into smaller molecules for energy. This produces short-chain fatty acids, such as acetate and butyrate, along with gases.",
        "Like other dietary fiber, xanthan adds bulk to stool and holds water, which keeps stools softer. The short-chain fatty acids made by fermentation are a fuel for the cells lining the colon and may help keep the gut healthy. The gases produced, such as carbon dioxide and hydrogen, can cause bloating if large amounts are eaten. In amounts above about 15 grams a day, far more than any normal diet contains, xanthan acts as a laxative. At normal food levels, measured in fractions of a gram, these effects are negligible.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Gelling with locust bean gum",
        "On their own, neither xanthan gum nor locust bean gum forms a gel; each one simply thickens liquids. But when the two are mixed, heated and then cooled, they form an elastic, bouncy gel. This is an example of synergy, where two ingredients together do something neither can do alone. It happens because the chains of the two gums lock onto each other at certain points. Food scientists use this effect to make desserts, jellies and pet foods with a particular texture.",
        [
          ["Helix", "In solution, xanthan molecules form stiff helices because their side chains wrap around the main chain. Heating loosens these helices, and as the mixture cools they form again. The surface of each helix has regions where other molecules can attach."],
          ["Binding", "Locust bean gum is a galactomannan, a chain of mannose sugars with some galactose branches. Parts of its chain have no branches and are smooth. As the mixture cools, these smooth stretches lie alongside the xanthan helices and stick to them through many weak attractions, mainly hydrogen bonds."],
          ["Network", "Each locust bean gum chain can bind several different xanthan helices, and each helix can bind several locust bean gum chains. These connecting points, called junction zones, link everything into a three-dimensional network that traps water. The result is an elastic gel."],
        ],
        "This synergy is used in some desserts, pet foods and gluten-free products to create a firm but springy texture. Because the bonds holding the network together are weak, the gel melts when heated and sets again when cooled. It shows how combining ingredients can create textures that neither could achieve alone.",
      ),
      rxn(
        "Precipitation with alcohol (purification)",
        "When bacteria have finished making xanthan in a fermentation tank, the gum is dissolved in a huge volume of watery broth along with the bacteria and leftover nutrients. To collect it, manufacturers add alcohol, which makes the gum come out of solution as solid fibers. This works because of how differently xanthan interacts with water and with alcohol. It's the same trick used in the classroom experiment of pulling DNA out of a strawberry with cold alcohol. The alcohol is recovered afterward and reused.",
        [
          ["Pasteurize", "The broth is heated to kill the Xanthomonas bacteria and switch off their enzymes. Heating also helps the gum dissolve completely. The broth may be filtered to remove bits of bacterial cells."],
          ["Lower polarity", "Isopropyl alcohol is mixed into the broth. Alcohol is less polar than water, meaning its molecules carry a weaker uneven charge. Xanthan's many charged and polar groups were comfortably surrounded by water molecules, but in the alcohol–water mixture they can't stay hydrated as well."],
          ["Aggregate", "Without enough water around them, the xanthan chains start sticking to each other instead, clumping into fibrous strands that separate from the liquid. These fibers are collected by filtering or pressing, then dried and ground into a fine powder."],
        ],
        "The alcohol is recovered by distillation and reused, and the finished xanthan contains only trace residues. The same principle, that adding alcohol makes large polar molecules drop out of water, is used to purify DNA, pectin and many other biological polymers.",
      ),
    ],
    hazards: [
      hz(
        "Not for premature infants",
        "Xanthan gum is considered safe for older children and adults, but it is avoided in premature babies. In 2011, the U.S. FDA warned parents and caregivers not to feed a xanthan-based thickening product to premature infants after reports of a serious intestinal illness. The concern is specific to babies born early, whose digestive systems are immature. It doesn't apply to xanthan in ordinary foods eaten by healthy children and adults. Thickeners for infants should only be used under medical guidance.",
        "Xanthan isn't digested by human enzymes and reaches the large intestine intact, where bacteria ferment it. Fermentation produces gases, such as hydrogen and carbon dioxide, along with short-chain fatty acids. In adults the gut handles these products easily. In premature infants, the gut wall is thin and immature, and the bacteria living there differ from those in older children. Large amounts of fermentation products may stress this fragile environment.",
        "Necrotizing enterocolitis (NEC) is a serious condition in which parts of the intestine become inflamed and the tissue starts to die. It mainly affects premature babies and can lead to surgery or death. The FDA's 2011 warning followed reports of NEC in premature infants who had been fed a xanthan-based thickener. Researchers suspect that fermentation of the gum in an immature gut, together with other factors, may have contributed, although the exact cause was never proven. As a precaution, xanthan-based thickeners are not given to premature infants.",
      ),
      hz(
        "Digestive effects at high doses",
        "In normal food, xanthan gum is used in tiny amounts, usually less than half a percent of a product, so it has no noticeable effect on digestion. Problems only appear with very large amounts, such as from supplements or products designed as laxatives. Then it can cause bloating, gas and loose stools. Those effects are similar to eating a lot of any fiber at once. Increasing fiber gradually and drinking enough water reduces them.",
        "Because human enzymes can't break xanthan's β-glycosidic bonds, all of the gum reaches the colon undigested. There it holds onto water, making the colon's contents wetter and bulkier. Colon bacteria ferment part of the gum, producing gases such as hydrogen, carbon dioxide and sometimes methane. The more xanthan is eaten, the more water is held and the more gas is produced. That is why the effects depend on dose.",
        "Extra water and bulk in the colon soften stools and speed them through the intestine, which can cause loose stools or diarrhea when large amounts are eaten. The gases stretch the intestinal wall, causing bloating, discomfort and flatulence. In a 1980s study, adults who ate about 10 to 13 grams of xanthan a day for three weeks had bulkier, more frequent stools but no other harmful effects. Typical intakes from food are well under a gram a day. At those levels xanthan acts as a minor source of dietary fiber.",
      ),
    ],
    dosage:
      "Foods use about 0.05 to 0.5 percent xanthan gum, so a serving of salad dressing or sauce contains a fraction of a gram. International food-safety experts (JECFA) have given it an acceptable daily intake of “not specified,” their category for substances of very low concern, and the U.S. FDA permits it as a food additive. Laxative effects appear only above about 15 grams a day, far more than anyone eats in normal food. Gluten-free bakers commonly use about half a teaspoon to a teaspoon per cup of flour. The one clear exception is premature infants, who should not be given xanthan-based thickeners.",
    synthesis: [
      route(
        "Bacterial fermentation",
        "Xanthan gum is made by a bacterium called Xanthomonas campestris, which naturally produces it as a slimy coating around its cells. In nature, this slime helps the bacterium cling to plant leaves and protects it from drying out. Scientists at the U.S. Department of Agriculture discovered its usefulness in the 1950s while searching for new uses for corn sugar. Today it is made in large fermentation tanks, in a process much like brewing. It was approved for use in U.S. food in 1968.",
        "The bacteria are grown in sterile tanks containing water, a sugar such as glucose or sucrose, a nitrogen source and minerals, while air is bubbled through to supply oxygen. As they feed on the sugar, the bacteria use enzymes to link sugar units into long xanthan chains and release them into the surrounding liquid. Over two to four days, the broth thickens as the gum builds up. After fermentation, the broth is pasteurized to kill the bacteria, and isopropyl alcohol is added to make the gum separate out. The solid gum is then dried and milled into a fine powder.",
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
        "Oil and water don't mix because water molecules are polar and cling strongly to each other, squeezing nonpolar oil molecules out of the way. Lecithin molecules have two personalities: two long fatty tails that are drawn to oil and a charged phosphate head that is drawn to water. A molecule like this is called amphiphilic, and when it helps oil and water mix it is called an emulsifier. At the boundary between oil and water, lecithin molecules line up with their tails poking into the oil and their heads sitting in the water. This lowers the tension between the two liquids, making it easier to break the oil into tiny droplets and keep them coated.",
        "Once each oil droplet is coated with lecithin, the charged heads on the outside make the droplets push each other away, so they don't merge back together. This keeps salad dressings, margarine and sauces smooth instead of separating into layers. In chocolate, lecithin coats the sugar particles so they slide past each other in the cocoa butter, which makes melted chocolate flow better and reduces the amount of expensive cocoa butter needed. When you eat these foods, the evenly spread fat feels smooth and creamy on the tongue. Without emulsifiers, many foods would feel greasy or grainy.",
        "established",
      ),
      mech(
        "A source of choline",
        "Phosphatidylcholine, the main component of lecithin, has a small molecule called choline attached to its phosphate group. In the digestive system, enzymes called phospholipases take the molecule apart, eventually releasing free choline. Choline is a small, positively charged molecule containing nitrogen. The liver can make a little choline on its own, but not enough to meet all the body's needs. So choline from food is considered an essential nutrient.",
        "The body uses choline to build phosphatidylcholine for its own cell membranes, the outer boundary of every cell. It also uses choline to make acetylcholine, a neurotransmitter that carries signals from nerves to muscles and is important for memory. In the liver, choline helps package fats for export; without enough of it, fat can build up in the liver. Eggs, meat, fish and soybeans are major dietary sources. The choline from lecithin used as a food additive is small but adds to the total.",
        "established",
      ),
      mech(
        "Helping absorb dietary fat",
        "In the small intestine, an enzyme from the pancreas called phospholipase A2 removes one of the two fatty-acid tails from phosphatidylcholine. What is left, lysophosphatidylcholine, has one tail and a large water-loving head, so it is shaped like a cone rather than a cylinder. Cone-shaped molecules are even better at curving around tiny droplets and gathering into small spheres. Together with bile salts from the liver, they form particles called micelles, only a few billionths of a meter across. Fats and fat-soluble vitamins dissolve in the oily center of these micelles.",
        "Fat can't be absorbed as big drops; it has to be broken into very small particles that can reach the surface of the intestinal cells. Micelles act like tiny delivery vehicles, ferrying fatty acids, cholesterol and fat-soluble vitamins (A, D, E and K) across the watery layer that coats the gut wall. At the cell surface, their contents are released and absorbed. Without enough bile and phospholipids, fat passes through undigested, causing greasy stools and poor absorption of those vitamins. Lecithin in food supports this process, though the body's own bile supplies most of the phospholipids needed.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Forming an emulsion",
        "An emulsion is a mixture of two liquids that normally don't mix, with tiny droplets of one spread throughout the other. Mayonnaise, milk and creamy dressings are all emulsions. Emulsions naturally tend to separate, because oil droplets bump into each other, merge and rise to the top. An emulsifier such as lecithin slows this down by coating each droplet. Making an emulsion usually takes both an emulsifier and energy, such as whisking or blending, to break the oil into small droplets.",
        [
          ["Orientation", "When lecithin is mixed into oil and water, its molecules move to the boundary between the two liquids, where they are most comfortable. Their fatty tails dissolve into the oil and their charged phosphate heads stay in the water. This arrangement lowers the energy cost of having a boundary at all."],
          ["Coating", "Whisking or blending breaks the oil into tiny droplets, creating a huge amount of new surface. Lecithin molecules quickly cover each droplet in a single layer, forming a protective coat. The smaller the droplets, the more emulsifier is needed to cover them all."],
          ["Stabilizing", "The charged heads facing outward give every droplet a similar electric charge, so droplets repel each other when they come close. The coating also acts as a physical barrier. Together, these effects stop droplets from merging into bigger ones, so the emulsion stays smooth."],
        ],
        "Mayonnaise works the same way, using lecithin from egg yolk to hold tiny drops of oil suspended in vinegar or lemon juice. Without the yolk, the oil and vinegar would separate within minutes. Many sauces and dressings depend on this principle.",
      ),
      rxn(
        "Enzymatic modification",
        "Food technologists can change lecithin's properties by using enzymes to reshape its molecules. The most common change is removing one of the two fatty-acid tails from each phospholipid. This is the same reaction that happens naturally during digestion. The modified lecithin, called lysolecithin, behaves differently as an emulsifier. It is used in baked goods, instant drinks and animal feed.",
        [
          ["Hydrolysis", "Lecithin is mixed with water and a phospholipase enzyme, often made by microbes. The enzyme adds water across one of the ester bonds that holds a fatty acid to the glycerol backbone. This cuts that fatty acid free."],
          ["Product", "The result, lysolecithin, has one fatty tail instead of two, plus a loose fatty acid. With only one tail, the molecule is cone-shaped, with a big head and a narrow tail."],
          ["Effect", "Cone-shaped emulsifiers curve best around oil droplets floating in water, so lysolecithin favors oil-in-water emulsions. It also disperses more easily in water and holds up better under heat and salt. That makes it more effective in baked goods, drinks and instant powders."],
        ],
        "Changing a molecule's shape changes which kind of emulsion it stabilizes. Two-tailed lecithin leans toward water-in-oil emulsions such as margarine, while one-tailed lysolecithin favors oil-in-water emulsions such as milky drinks. Chemists choose or create emulsifiers based on these shapes.",
      ),
    ],
    hazards: [
      hz(
        "Trace soy protein",
        "Soy is one of the major food allergens, and some people worry that soy lecithin might trigger allergic reactions. Lecithin itself is a fat-like molecule, not a protein, and allergies are triggered by proteins. Refining removes most of the soy protein from lecithin, but tiny traces can remain. Most people with soy allergy eat foods containing soy lecithin without problems, though a few very sensitive people may react. U.S. labeling rules still require soy lecithin to be declared as soy.",
        "Allergic reactions are triggered by specific proteins that the immune system mistakes for threats, and soybeans contain several such proteins. When lecithin is made from soybean oil, it is separated out of the oil as a gum and dried, while most of the soy protein stays behind in the soybean meal. Even so, small amounts of protein can be carried along, measured in parts per million. The amount varies from batch to batch. Sunflower lecithin is an alternative for people who want to avoid soy entirely.",
        "In people with soy allergy, the immune system makes IgE antibodies against soy proteins. When those proteins are eaten, they latch onto the antibodies sitting on mast cells, which then release histamine and other chemicals. That can cause symptoms ranging from hives and itching to, rarely, severe reactions. Because the amount of protein in lecithin is so small, it usually isn't enough to trigger a reaction. People with severe soy allergy should ask their doctor whether they need to avoid soy lecithin.",
      ),
    ],
    dosage:
      "Chocolate typically contains about 0.3 to 0.5 percent lecithin, and other foods use similarly small amounts, often well under a gram per serving. Lecithin is also sold as a supplement, and several grams a day are well tolerated. International experts (JECFA) have given it an acceptable daily intake of “not specified,” reflecting its very low toxicity, and the U.S. FDA considers it generally recognized as safe. The body handles lecithin like the phospholipids already present in eggs, meat and many plant foods. The main caution is for people with severe soy allergy, who may want to check with a doctor.",
    synthesis: [
      route(
        "Degumming soybean oil",
        "Most lecithin is a byproduct of making clear cooking oil from soybeans. Crude soybean oil, pressed or extracted from the beans, contains about 2 to 3 percent phospholipids, which would make the oil cloudy and cause it to foam and darken when heated. Removing them, a step called degumming, produces both cleaner oil and lecithin. Lecithin is also made from sunflower seeds, rapeseed and eggs. Soy is the most common source simply because so much soybean oil is produced.",
        "Crude soybean oil is warmed and mixed with a small amount of water, about 1 to 3 percent. The phospholipids in the oil have water-loving heads, so they soak up the water and swell into a sticky, gel-like mass called gum. Because this gum is denser than the oil and no longer dissolved in it, it can be separated. Large centrifuges spin the mixture very fast, flinging the heavier gum outward, away from the lighter oil. The gum is then dried under vacuum to remove the water, leaving lecithin, a brown, sticky liquid or powder.",
        { significance: "Removing the gums keeps the oil from turning cloudy, and the gums become a useful product instead of waste." },
      ),
      route(
        "Biological synthesis",
        "Every plant and animal cell makes phosphatidylcholine, because it is a main building block of cell membranes. In your body, cells are constantly making new phospholipids to grow, divide and repair their membranes. The liver makes especially large amounts to package fats for transport in the blood. Soybeans, sunflower seeds and eggs are rich in phospholipids because seeds and yolks are built to support new life. The main route for making phosphatidylcholine is called the Kennedy pathway, after the biochemist Eugene Kennedy, who worked it out in the 1950s.",
        "The Kennedy pathway builds phosphatidylcholine in three main steps. First, the enzyme choline kinase attaches a phosphate group to choline, using energy from ATP, to make phosphocholine. Next, phosphocholine is activated by combining with CTP, another energy-carrying molecule, forming CDP-choline. Finally, an enzyme transfers the phosphocholine part of CDP-choline onto diacylglycerol, a glycerol molecule already carrying two fatty acids. The finished phosphatidylcholine is inserted into membranes, where it forms part of the double layer that wraps around every cell.",
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
        "Your blood holds a balance of carbon dioxide (CO₂), carbonic acid (H₂CO₃) and bicarbonate ions (HCO₃⁻). An enzyme called carbonic anhydrase, found in red blood cells and many tissues, speeds up the reaction of CO₂ with water to form carbonic acid by about a million times. Carbonic acid quickly splits into a hydrogen ion and a bicarbonate ion, and the whole reaction can also run backward. When extra acid enters the blood, bicarbonate grabs the hydrogen ions and becomes carbonic acid, which turns back into CO₂ and water. A system like this, which soaks up acid or base and keeps pH steady, is called a buffer.",
        "Blood pH has to stay between 7.35 and 7.45; even small moves outside that range disrupt enzymes and nerve signals. The lungs control how much carbon dioxide you breathe out: breathing faster removes more CO₂, which lowers the amount of acid. The kidneys control how much bicarbonate is kept or sent out in urine, adjusting more slowly, over hours to days. Together these organs keep the bicarbonate buffer working. In emergencies such as severe acidosis from kidney failure or poisoning, doctors may give sodium bicarbonate directly into a vein.",
        "established",
      ),
      mech(
        "Antacid",
        "The stomach makes hydrochloric acid (HCl), with a pH as low as 1 to 2, to help digest food and kill microbes. When sodium bicarbonate is swallowed, its bicarbonate ions accept hydrogen ions from the acid in a neutralization reaction. Each bicarbonate becomes carbonic acid, which immediately breaks down into water and carbon dioxide gas. The chloride from the acid and the sodium from the bicarbonate are left dissolved together as sodium chloride, ordinary salt. The reaction is over within seconds.",
        "Heartburn happens when stomach acid splashes back up into the esophagus, the tube from the mouth to the stomach, and irritates its lining. Neutralizing the acid relieves the burning within minutes. The carbon dioxide produced collects in the stomach and usually escapes as a burp. Because bicarbonate works fast but doesn't last long, and because it adds sodium, it is meant for occasional use only. For frequent heartburn, medicines that reduce acid production are more appropriate.",
        "established",
      ),
      mech(
        "Neutralizing odors",
        "Many unpleasant smells come from acidic molecules that evaporate easily, such as butyric acid in sour milk and spoiled butter and isovaleric acid in sweaty socks. These are carboxylic acids, molecules with a –COOH group. When they meet bicarbonate, the bicarbonate takes the acid's hydrogen ion and the acid becomes a charged carboxylate ion paired with sodium, which is a salt. Salts are made of ions held tightly together by their charges, so they don't evaporate. The smelly acid has been turned from a volatile molecule into one that stays put.",
        "To smell something, its molecules have to travel through the air into your nose and bind to smell receptors there. Once an acidic odor molecule has become a salt, it stays in the fridge, carpet or shoe instead of drifting into the air. With fewer odor molecules reaching your nose, the smell fades. Baking soda works best on acidic smells and does little against basic ones such as ammonia or neutral ones. That is why an open box in the fridge helps with some smells but not all.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Leavening with acid",
        "Baking soda is a leavening agent, meaning it makes baked goods rise by producing gas bubbles. It does this by reacting with an acid in the batter, which releases carbon dioxide. The gas forms bubbles in the batter, and in the oven the heat expands those bubbles and sets the structure around them, giving a light, airy texture. Without leavening, cakes and pancakes would be dense and flat. Bakers have to balance the amount of baking soda against the amount of acid in a recipe.",
        [
          ["Proton transfer", "As the batter is mixed, acids in ingredients such as buttermilk, yogurt, lemon juice, brown sugar or the acid salts in baking powder hand hydrogen ions (H⁺) to bicarbonate ions. This starts as soon as the ingredients are wet and meet. The bicarbonate is acting as a base by accepting those protons."],
          ["Carbonic acid", "Each bicarbonate ion that gains a proton becomes carbonic acid (H₂CO₃). Carbonic acid is unstable and can't hold together. It breaks apart almost immediately."],
          ["Gas", "Carbonic acid splits into water and carbon dioxide gas. The CO₂ forms tiny bubbles trapped in the batter. In the oven, heat makes the gas expand, and the bubbles grow until the batter sets around them."],
        ],
        "Baking powder packages baking soda together with a dry acid, so it only needs water and heat to work. Double-acting baking powder releases some gas when it gets wet and more once it is heated. Recipes that already contain acidic ingredients often use baking soda alone.",
        "NaHCO3 + H+ → Na+ + H2O + CO2",
      ),
      rxn(
        "Thermal decomposition",
        "Baking soda can also produce gas without any acid at all, just by being heated. When it gets hot enough, bicarbonate ions react with each other and break down into carbonate, water and carbon dioxide. This is called thermal decomposition. It helps baked goods rise, but it leaves behind a different, more strongly basic substance. Using too much baking soda in a recipe can leave a noticeable aftertaste for this reason.",
        [
          ["Heating", "Above about 80 °C, and much faster above 200 °C, bicarbonate ions have enough energy to react with one another. Oven temperatures easily reach these levels. The heat breaks bonds within the bicarbonate ions."],
          ["Release", "Two bicarbonate ions trade a proton, forming one carbonate ion, one water molecule and one carbon dioxide molecule. The CO₂ escapes as gas and the water leaves as steam."],
          ["Residue", "Sodium carbonate, also called washing soda, is left behind. It is a stronger base than sodium bicarbonate, giving a pH of about 11 in water."],
        ],
        "Too much baking soda without enough acid leaves sodium carbonate in the food, which tastes soapy and bitter and can tint baked goods yellow or green. That's why recipes balance baking soda with acidic ingredients. The same decomposition is put to work in some fire extinguishers, where the released CO₂ helps smother flames.",
        "2 NaHCO3 → Na2CO3 + H2O + CO2",
      ),
    ],
    hazards: [
      hz(
        "Large ingestions",
        "Sodium bicarbonate is safe in cooking and as an occasional antacid, but swallowing large amounts can be dangerous. Problems have occurred when people take baking soda over and over for indigestion, use it as a home remedy for other conditions, or try to use it to cheat drug tests. The risks include serious disturbances in the body's chemistry and, rarely, a ruptured stomach. Young children are also at risk if they swallow a lot. Antacid labels set daily limits for good reason.",
        "A large dose of bicarbonate adds more base to the body than its buffering systems can quickly deal with. Blood pH rises above 7.45, a condition called metabolic alkalosis. At the same time, the sodium in baking soda raises blood sodium levels. The body responds by shifting potassium into its cells, which can lower the potassium in the blood. These changes upset the delicate balance that nerves and muscles rely on.",
        "Alkalosis and the related mineral imbalances can cause muscle twitching, cramps, nausea, confusion and an irregular heartbeat, and in severe cases seizures. People with heart or kidney problems are at greater risk because they can't easily get rid of extra sodium. In rare cases, taking baking soda after a very large meal has ruptured the stomach, because the carbon dioxide released couldn't escape from an overfilled stomach fast enough. Following antacid label directions avoids these problems. Large accidental swallows need medical help.",
      ),
    ],
    dosage:
      "Baking typically uses about a teaspoon of baking soda per recipe, shared among many servings. As an antacid, the usual adult dose is half a teaspoon dissolved in water, and labels limit use to a few doses a day, with lower limits for people over 60. One teaspoon contains about 1,200 milligrams of sodium, roughly half the recommended daily limit, so frequent use adds up quickly. Baking soda should not be taken on a very full stomach, used for more than two weeks without a doctor's advice, or given to young children without medical guidance. For cleaning and personal care, it is mild and safe.",
    synthesis: [
      route(
        "The Solvay process",
        "The Solvay process, developed by the Belgian chemist Ernest Solvay in the 1860s, made sodium carbonate and sodium bicarbonate cheap enough for everyday use. It uses three abundant raw materials: salt, limestone and ammonia. Before Solvay, soda was made by an older, much dirtier method that produced large amounts of toxic waste. The Solvay process is still used worldwide, especially where natural mineral deposits aren't available. It is a classic example of clever industrial chemistry that recycles its own reagents.",
        "First, limestone (calcium carbonate) is heated to release carbon dioxide. Concentrated salt water, called brine, is saturated with ammonia gas, and then the carbon dioxide is bubbled through it. The ammonia makes the solution basic, which helps carbon dioxide dissolve and form bicarbonate ions. Sodium bicarbonate is the least soluble of the possible products, so it crystallizes out of the cold solution and is filtered off. The leftover ammonium chloride is treated with lime from the heated limestone to regenerate the ammonia, which goes back to the start of the process.",
        { equation: "NaCl + NH3 + CO2 + H2O → NaHCO3 + NH4Cl", significance: "Ernest Solvay's 1860s process made soda chemicals cheap enough for everyday use." },
      ),
      route(
        "From trona ore",
        "In the United States, most baking soda doesn't come from the Solvay process but from a natural mineral called trona. Huge deposits of trona lie underground in Wyoming's Green River Basin, left behind by an ancient lake that dried up about 50 million years ago. Trona is a natural combination of sodium carbonate and sodium bicarbonate. Mining and refining it uses less energy and creates less waste than the Solvay process. The U.S. is one of the world's largest producers of natural soda ash.",
        "Trona ore is mined from deep underground beds, crushed and heated, which converts it into crude sodium carbonate. The sodium carbonate is dissolved in water, and the solution is filtered to remove insoluble rock and other impurities. The purified solution is then reacted with carbon dioxide gas. Carbon dioxide combines with the carbonate ions and water to form bicarbonate ions, and sodium bicarbonate crystallizes out because it is less soluble. The crystals are separated, washed and dried.",
        { equation: "Na2CO3 + CO2 + H2O → 2 NaHCO3", significance: "The same Wyoming deposits supply much of the world's soda ash for glassmaking and detergents." },
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
        "Carrageenan chains are long and carry negatively charged sulfate groups. As a hot solution cools, kappa and iota carrageenan chains pair up and twist around each other into double helices. These helices are negatively charged, so they repel one another until positive ions come along. Potassium ions (K⁺) fit neatly between kappa-carrageenan helices and bridge them together tightly, while calcium ions (Ca²⁺) bridge iota helices more loosely. Lambda carrageenan carries so many sulfate groups that its chains can't form helices at all.",
        "These differences give each type its own texture. Kappa-carrageenan forms firm, brittle gels that can crack, useful in deli meats, pet foods and some jellies. Iota-carrageenan forms soft, elastic gels that bounce back, useful in puddings and dairy desserts. Lambda-carrageenan never gels and simply thickens liquids, giving chocolate milk and other drinks a creamy feel. By combining types, food makers can create almost any texture between a liquid and a solid.",
        "established",
      ),
      mech(
        "Stabilizing milk",
        "Milk contains tiny particles of casein, its main protein, clustered into structures called micelles. Although casein micelles are negatively charged overall, one of the casein proteins, kappa-casein, has a region that carries positive charges. Carrageenan's negative sulfate groups are attracted to these positive patches and bind to them. At the same time, carrageenan chains form a weak, invisible network running through the milk. Together, these interactions hold the casein and other particles in place.",
        "Without a stabilizer, cocoa powder in chocolate milk sinks to the bottom, and plant-based milks separate into watery and solid layers. Even 0.02 percent carrageenan, which is 200 milligrams per liter, makes a network strong enough to keep cocoa particles suspended. The drink stays smooth and evenly colored without shaking. Because the network is so weak, it doesn't make the drink noticeably thicker. This is why carrageenan appears in so many dairy and plant-based drinks.",
        "established",
      ),
      mech(
        "The gut inflammation debate",
        "Some laboratory studies, mainly in cells and animals, have found that carrageenan can activate a receptor called TLR4 on cells lining the gut. TLR4 normally detects molecules from bacteria and triggers an immune response. When it is activated, it switches on a signaling pathway called NF-κB, which tells cells to produce inflammatory messengers. Other researchers have argued that these results came from poligeenan, a degraded form not allowed in food, or from very high doses. How food-grade carrageenan might cause such effects remains debated.",
        "If carrageenan did trigger inflammation in the human gut, it could in theory worsen conditions such as inflammatory bowel disease, in which the gut lining is chronically inflamed. A small study in people with ulcerative colitis found that those who avoided carrageenan had fewer relapses, but it was too small to be conclusive. Large regulatory reviews have found no clear evidence of harm at food levels. In 2018 the European Food Safety Authority kept carrageenan approved but asked for more data, particularly on infants. Research is ongoing.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Setting a gel",
        "Carrageenan gels form when a hot solution cools and melt again when heated, which is why they are called thermoreversible. That is different from egg white, which sets permanently when cooked. The gelling happens because carrageenan chains change shape as they cool and then link together with the help of positive ions. Understanding this lets food makers control a gel's firmness and melting point. It is similar to how gelatin sets, although here the chains are made of sugars rather than protein.",
        [
          ["Dissolving", "In hot water, above about 70 °C, carrageenan chains have enough energy to move freely as loose, tangled coils. In this state the solution is liquid. The chains don't hold any fixed shape."],
          ["Helix formation", "As the solution cools, the chains slow down and pairs of them twist around each other into double helices held together by hydrogen bonds. This happens over a particular temperature range that depends on the type of carrageenan and the ions present. The helices are much stiffer than the loose coils."],
          ["Bridging", "Positive ions such as potassium or calcium settle between neighboring helices, cancelling some of their negative charge and linking them together. Many helices join into a three-dimensional network that traps water in its spaces. The liquid has become a gel."],
        ],
        "Because heat breaks the helices and bridges apart again, carrageenan gels melt when warmed and set again when cooled. This is useful in foods that are heated during processing and served cold, such as desserts and processed meats.",
      ),
      rxn(
        "Acid degradation",
        "When carrageenan is exposed to strong acid and high heat for a long time, its long chains are broken into shorter and shorter pieces. This process is called acid hydrolysis. If the chains become very short, the material behaves differently and is no longer considered carrageenan. These short fragments are called poligeenan, or degraded carrageenan, and they are not permitted in food. Understanding this reaction is central to keeping food-grade carrageenan safe.",
        [
          ["Hydrolysis", "Hydrogen ions from the acid attack the glycosidic bonds, the oxygen bridges joining the sugar units in the chain. With heat supplying extra energy, water molecules split those bonds. Each break cuts one long chain into two shorter ones."],
          ["Shortening", "With continued exposure, more and more bonds break and the average chain length falls. Food-grade carrageenan chains have molecular weights of hundreds of thousands of daltons. A dalton is a unit of mass roughly equal to one hydrogen atom."],
          ["Poligeenan", "Below an average molecular weight of about 20,000 daltons, the fragments are called poligeenan. Poligeenan doesn't gel, and in animal studies it has caused inflammation and ulcers in the colon. It is a different substance from food-grade carrageenan."],
        ],
        "This is why food-grade carrageenan must meet a minimum molecular weight and is produced with alkaline processing rather than strong acid. Most studies indicate that stomach acid is not strong or hot enough to turn food-grade carrageenan into meaningful amounts of poligeenan during digestion, although some researchers have questioned this.",
      ),
    ],
    hazards: [
      hz(
        "Possible gut irritation",
        "Whether carrageenan irritates the human gut is debated. Most regulatory reviews, including those by the U.S. FDA and international experts, consider food-grade carrageenan safe at the levels used in food. However, some laboratory studies have raised concerns about inflammation, and some people with digestive conditions report feeling better without it. The evidence in humans is limited and inconsistent. People with inflammatory bowel disease who notice symptoms may choose to avoid it.",
        "Some studies suggest that carrageenan can bind to and activate immune receptors, such as TLR4, on the surface of cells lining the gut. These receptors normally help detect bacteria, so activating them sets off inflammatory signals. Carrageenan might also affect the mucus layer that protects the gut lining, or shift the balance of gut bacteria. Critics of these studies point out that many used degraded carrageenan, very high doses or isolated cells. How relevant they are to people eating normal amounts is uncertain.",
        "In people with inflammatory bowel disease, such as Crohn's disease and ulcerative colitis, the gut lining is already inflamed and more sensitive. Some patients report fewer symptoms when they avoid foods containing carrageenan, and a small trial found fewer relapses in a carrageenan-free group. That evidence is too limited to prove cause and effect. Healthy people generally show no signs of harm. Because carrageenan is listed on ingredient labels, anyone who wants to avoid it can do so easily.",
      ),
    ],
    dosage:
      "Foods use about 0.01 to 1 percent carrageenan, typically a few hundred milligrams or less per serving. In 2018 the European Food Safety Authority set a temporary acceptable daily intake of 75 milligrams per kilogram of body weight and noted that people who eat a lot of dairy desserts, plant milks and processed meats might exceed it. International experts (JECFA) consider it safe in foods at current use levels, including in infant formula at regulated amounts, and it is approved as a food additive in the U.S. People with digestive conditions who notice symptoms can easily avoid it by reading labels.",
    synthesis: [
      route(
        "Alkaline extraction from seaweed",
        "Carrageenan comes from red seaweeds, especially species called Kappaphycus and Eucheuma, which are farmed in warm, shallow seas. Its name comes from the Irish word carraigín, meaning “little rock,” for a red seaweed known as Irish moss that people in Ireland have used for centuries to thicken milk puddings. Today most carrageenan comes from seaweed farms in the Philippines, Indonesia and East Africa. The seaweed is harvested, dried and shipped to processing plants. Extraction uses hot water and alkali.",
        "The dried seaweed is washed to remove sand and salt, then cooked in a hot solution of an alkali such as potassium or calcium hydroxide. The alkali does two jobs: it helps dissolve the carrageenan, and it chemically changes some of the galactose units in the chains into a ring form called 3,6-anhydrogalactose by removing a sulfate group. This change makes the chains better at forming helices, so the final gel is stronger. The hot extract is filtered to remove the seaweed remains, and then carrageenan is made to come out of solution by adding alcohol or potassium chloride. The solid is pressed, dried and milled into powder.",
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
        "Fats in cell membranes often contain several double bonds, and the carbon atoms between those double bonds hold their hydrogen atoms loosely. When a free radical steals one of these hydrogens, it starts a chain reaction: the damaged fat becomes a radical, reacts with oxygen to form a peroxyl radical, and then steals a hydrogen from the next fat molecule. Tocopherol stops the chain by donating the hydrogen atom from its own –OH group to the peroxyl radical. That turns the radical into a stable molecule called a hydroperoxide. The tocopherol is left as a tocopheroxyl radical, but its unpaired electron is spread across its aromatic ring, which makes it too stable to keep the chain going.",
        "Cell membranes contain many polyunsaturated fats, especially in nerve cells and red blood cells, and these fats are vulnerable to oxidation. Without protection, oxidation makes membranes leaky and stiff and damages the proteins embedded in them. Vitamin E sits inside the membrane itself, right where radicals form, ready to catch them. Severe vitamin E deficiency, which is rare and usually caused by problems absorbing fat, leads to nerve damage, muscle weakness and trouble with balance and vision. It can also make red blood cells burst more easily.",
        "established",
      ),
      mech(
        "Recycled by vitamin C",
        "After tocopherol neutralizes a radical, it becomes the tocopheroxyl radical, which can't protect anything until it is restored. At the surface of the membrane, where the fatty interior meets the watery surroundings, vitamin C (ascorbate) can reach it. Ascorbate donates a hydrogen atom, turning tocopherol back into its active form. The vitamin C becomes the ascorbyl radical, which is stable and is later recycled by enzymes. In this way one tocopherol molecule can be used again and again.",
        "Vitamin E dissolves in fats and works inside membranes, while vitamin C dissolves in water and works in the fluids inside and around cells. By passing electrons between them, the two vitamins form a team that covers both environments. Enzymes in the cell use other molecules, such as glutathione, to recycle vitamin C in turn. This chain of recycling helps explain why getting enough of several antioxidants together matters more than taking a large dose of one. Fruits, vegetables, nuts and seeds supply both vitamins.",
        "established",
      ),
      mech(
        "Protecting oils and skin",
        "When vegetable oils and creams are exposed to light, heat and oxygen, radicals form and attack their fatty acids, the same chain reaction that happens in cell membranes. Added tocopherol intercepts these radicals by donating hydrogen atoms and stopping the chain. On labels it is often listed as “mixed tocopherols” or “vitamin E.” In skincare, tocopherol dissolves into the oily parts of the product and of the skin's surface. It also absorbs a little ultraviolet light, though nowhere near enough to replace sunscreen.",
        "By slowing oxidation, tocopherol keeps oils and creams from going rancid, which would change their smell and texture. On skin, it adds to the natural antioxidants in the outer layer, helping protect skin fats from damage by sunlight and pollution. However, controlled trials have found that rubbing vitamin E onto scars doesn't make them fade and can occasionally cause irritation or allergic reactions. In foods it acts as a natural preservative. The amounts used are small compared with what people get from nuts and seeds.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Stopping a radical chain reaction",
        "Fats and oils go rancid through a process called lipid peroxidation, a chain reaction driven by free radicals. A single radical can start a chain that damages hundreds of fat molecules, changing their smell, taste and color. Tocopherol is a chain-breaking antioxidant: it stops the chain partway through. Understanding this reaction explains why oils are sold in dark bottles and why antioxidants are added to foods. The same chemistry damages cell membranes inside the body.",
        [
          ["Initiation", "Light, heat or a metal ion pulls a hydrogen atom off a fatty acid, usually from a carbon between two double bonds. This creates a lipid radical (L•), which has an unpaired electron. Initiation is fairly rare, but it starts everything."],
          ["Propagation", "The lipid radical quickly reacts with oxygen from the air, forming a lipid peroxyl radical (LOO•). This radical is reactive enough to steal a hydrogen atom from a neighboring fatty acid, becoming a lipid hydroperoxide but creating a brand-new lipid radical. That new radical repeats the cycle, so the chain keeps going."],
          ["Termination", "Tocopherol (TOH) gives its hydrogen atom to the peroxyl radical faster than the radical can attack another fatty acid. The peroxyl radical becomes a stable hydroperoxide, and the tocopherol becomes a tocopheroxyl radical (TO•) that is too stable to continue the chain. The chain is broken."],
        ],
        "One tocopherol molecule can stop a chain that would otherwise damage many fatty acids, which is why only small amounts of vitamin E are needed to protect oils and membranes. The hydroperoxides that do form can still break down into smelly compounds, so tocopherol slows rancidity rather than preventing it completely.",
        "LOO• + TOH → LOOH + TO•",
      ),
      rxn(
        "Being used up",
        "Antioxidants like vitamin E protect other molecules by sacrificing themselves, so they gradually get used up. Once all the tocopherol in an oil or a membrane has been consumed, the fats are no longer protected. In the body, vitamin C and other molecules can recycle vitamin E and extend its working life. In a bottle of oil, no such recycling happens. This explains why oils eventually go rancid even though they contain natural vitamin E.",
        [
          ["First oxidation", "When tocopherol donates a hydrogen atom to a radical, it becomes the tocopheroxyl radical. This radical is fairly stable but can no longer protect fats. In the body, vitamin C can turn it back into active tocopherol."],
          ["Second oxidation", "Without vitamin C or another partner to recycle it, the tocopheroxyl radical reacts with another radical or with oxygen. This changes its structure further. It can no longer easily be restored."],
          ["End product", "Eventually the ring of the tocopherol molecule opens, forming tocopherylquinone, a yellowish compound that can no longer act as an antioxidant. Tocopherylquinone may also contribute to color changes in old oils."],
        ],
        "Oils go rancid once their tocopherol has been consumed. Storing oils somewhere cool and dark, in sealed bottles, slows the rate at which it is used up. Food manufacturers sometimes add extra tocopherols or vitamin C to extend shelf life.",
      ),
    ],
    hazards: [
      hz(
        "Bleeding risk at high supplement doses",
        "Vitamin E from food and cosmetics poses no bleeding risk, but high-dose vitamin E supplements can interfere with blood clotting. The risk is greatest for people who also take blood-thinning medicines such as warfarin, or who are short of vitamin K. The U.S. upper limit for adults is 1,000 milligrams a day from supplements, partly for this reason. People scheduled for surgery are often told to stop high-dose vitamin E beforehand. Most people get enough vitamin E from a normal diet without supplements.",
        "Blood clotting depends on several proteins, called clotting factors, that have to be chemically activated with the help of vitamin K. At high doses, vitamin E, or one of its breakdown products called tocopherylquinone, seems to interfere with the enzymes that recycle vitamin K. With less active vitamin K available, fewer clotting factors get switched on. Vitamin E may also make platelets, the tiny cell fragments that start a clot, less likely to clump together. Both effects slow down clotting.",
        "When blood clots more slowly, cuts bleed longer and bruises appear more easily. In people already taking anticoagulant drugs, which deliberately slow clotting, the extra effect of vitamin E could raise the risk of serious bleeding, including bleeding in the brain. Some large studies found a slight increase in a type of stroke caused by bleeding among people taking vitamin E supplements. This risk doesn't apply to vitamin E from foods like nuts and oils. People on blood thinners should talk to their doctor before taking supplements.",
      ),
      hz(
        "Prostate cancer risk with supplements",
        "Vitamin E supplements were once widely believed to prevent cancer and heart disease, but large trials haven't supported that. The SELECT trial, which followed more than 35,000 men, found that a high daily dose of vitamin E actually increased the risk of prostate cancer. This finding applies to supplements, not to vitamin E from food or skincare. It is an important example of how a nutrient that is essential in normal amounts can have unexpected effects at high doses. Most experts now advise against routine vitamin E supplements.",
        "Why vitamin E supplements might raise prostate cancer risk is not known. One possibility is that high doses of alpha-tocopherol lower the levels of other forms of vitamin E, such as gamma-tocopherol, which may have protective effects of their own. Another idea is that antioxidants at high doses interfere with the body's normal use of reactive oxygen molecules, which help regulate cell growth and kill damaged cells. Vitamin E might also affect hormones or enzymes involved in how prostate cells grow. None of these explanations has been proven.",
        "In the SELECT trial, men took either 400 IU of synthetic vitamin E a day (about 180 milligrams), selenium, both, or a placebo. After several years, men taking vitamin E alone had about a 17 percent higher risk of prostate cancer than those on placebo, and the increase was still seen after they had stopped taking it. No benefit was found for preventing other cancers or heart disease. Based on this and other trials, health organizations recommend getting vitamin E from foods rather than supplements.",
      ),
    ],
    dosage:
      "Adults need about 15 milligrams of vitamin E (alpha-tocopherol) a day, which is easy to get from nuts, seeds, vegetable oils and leafy greens; an ounce of almonds supplies about half. The amounts added to foods as antioxidants and to cosmetics are measured in milligrams and are not a concern. Problems are linked to long-term supplement doses of hundreds of international units a day, which have been associated with bleeding risk and, in the SELECT trial, prostate cancer. The U.S. upper limit for adults is 1,000 milligrams a day from supplements. Most health organizations recommend getting vitamin E from food.",
    synthesis: [
      route(
        "Biological synthesis in plants",
        "Only plants, algae and some bacteria that carry out photosynthesis can make vitamin E; animals, including humans, have to get it from food. Plants make tocopherols mainly in their chloroplasts, where they protect the membranes involved in photosynthesis from damage by light and oxygen. Seeds are especially rich in tocopherols, which protect their stored oils from going rancid. That's why vegetable oils, nuts and seeds are the best dietary sources. Leafy greens supply smaller amounts.",
        "Plants make vitamin E from two building blocks. The first is homogentisic acid, which provides the aromatic ring and is made from the amino acid tyrosine. The second is phytyl diphosphate, a long, oily chain related to the tail of the chlorophyll molecule. An enzyme joins the two, attaching the tail to the ring. Further enzymes add methyl groups to the ring and close a second, oxygen-containing ring, forming the chromanol structure. Depending on how many methyl groups are added and where, the plant makes alpha-, beta-, gamma- or delta-tocopherol.",
        { significance: "Different plants make different mixtures: sunflower oil is rich in alpha-tocopherol, while soybean and corn oils contain mostly gamma-tocopherol." },
      ),
      route(
        "Extraction from vegetable oil",
        "Natural vitamin E sold as a supplement or food additive mostly comes from refining vegetable oil, especially soybean oil. During refining, a step called deodorization removes unwanted smells and flavors from the oil. Tocopherols end up concentrated in the byproduct of this step. Rather than being wasted, that byproduct is processed to recover the vitamin E. Labels often call the result “mixed tocopherols” because it contains several forms.",
        "During deodorization, steam is blown through hot vegetable oil under vacuum. Molecules that evaporate relatively easily, including odor compounds, free fatty acids and tocopherols, are carried away with the steam. When the vapor is cooled, they collect as a liquid called deodorizer distillate, which can be 10 percent or more tocopherols. This distillate is purified by molecular distillation, a gentle technique that separates molecules by how easily they evaporate at very low pressure. The result is a concentrated oil of mixed tocopherols.",
        { significance: "Using a byproduct of oil refining makes natural vitamin E production more efficient and reduces waste." },
      ),
      route(
        "Chemical synthesis",
        "Synthetic vitamin E is made in chemical plants from two building blocks, one providing the ring and one providing the tail. It is cheaper than natural vitamin E and is widely used in supplements, animal feed and fortified foods. On labels, synthetic vitamin E is often listed as “dl-alpha-tocopherol” or “all-rac-alpha-tocopherol,” while natural vitamin E is “d-alpha-tocopherol.” The difference lies in the 3D shape of the molecules. Synthetic and natural vitamin E contain the same atoms but are not all identical in shape.",
        "The ring comes from trimethylhydroquinone, a benzene ring with two –OH groups and three methyl groups. The tail comes from isophytol, a long, oily alcohol assembled from smaller petrochemical building blocks. When the two are heated together with an acid catalyst, the tail attaches to the ring and a second ring closes, forming the chromanol structure in a single step. The product is usually converted into an ester, tocopheryl acetate, which keeps better in storage. In the body, the acetate group is removed to release active vitamin E.",
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
        "Flavor molecules are usually small and volatile, meaning they evaporate easily and drift into the air. When you chew, these molecules are released and travel from the back of your mouth up into your nose, a route called retronasal smell. There they meet the lining of the nose, which carries about 400 different types of smell receptors, each a protein shaped to bind certain molecules. Each aroma molecule can activate several receptor types, and each receptor can respond to several molecules. The overall pattern of activated receptors is what identifies a particular smell.",
        "Smell receptor cells send their signals to the olfactory bulb in the brain, which combines them with taste signals from the tongue and with sensations such as texture and temperature. The brain merges all of this into what we experience as flavor. Taste on its own only detects five qualities: sweet, sour, salty, bitter and umami. Everything else, like the difference between strawberry and raspberry, comes from smell. That is why food tastes bland when your nose is blocked by a cold.",
        "established",
      ),
      mech(
        "Molecules, not sources",
        "The smell of a strawberry comes from a mixture of molecules, such as furaneol, which smells sweet and caramel-like, and ethyl butyrate, which smells fruity. A natural strawberry flavor contains these same kinds of molecules, but under U.S. rules they don't have to come from strawberries. They might be extracted from another plant or produced by microbes through fermentation, as long as the source is natural. What makes a flavor “natural” is where its molecules came from and how they were processed, not their chemical structure. A molecule of ethyl butyrate is identical whatever its source.",
        "Your smell receptors respond to the shape and chemical properties of molecules, not to where they came from. Identical molecules bind receptors in exactly the same way, so they smell and taste identical whether they came from a fruit, a fermentation tank or a laboratory. Your body also digests and processes them the same way. So the label “natural” doesn't tell you whether a flavor is healthier or safer than an artificial one. It tells you about the source, which matters to some people for other reasons.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Steam distillation",
        "Steam distillation is one of the oldest ways to capture flavors and fragrances from plants. It separates volatile aroma molecules from plant material using steam, without the high temperatures that might destroy them. This is how essential oils of mint, citrus, cinnamon and many other spices are made. The method takes advantage of the fact that oily aroma compounds and water don't mix. People have used it for more than a thousand years.",
        [
          ["Heating", "Steam is passed through plant material, such as citrus peel, mint leaves or crushed spices, packed into a still. The hot steam bursts the tiny oil glands in the plant tissue. Aroma molecules are released."],
          ["Carrying", "The volatile aroma molecules evaporate and travel along with the steam. Because a mixture of water and oil boils at a lower temperature than the oil alone, the aroma molecules evaporate below their own boiling points, which protects them from heat damage."],
          ["Separating", "The steam and aroma vapors flow into a cooled tube, where they condense back into liquid. Since oil and water don't mix, the aroma compounds form a separate oily layer, the essential oil, which floats on the water and can be collected."],
        ],
        "This is how mint, citrus and many spice flavors are captured. The leftover water, called a hydrosol or floral water, also carries a little scent and is used in some products. Many natural flavors begin with an essential oil made this way.",
      ),
      rxn(
        "Fermentation to natural vanillin",
        "Vanillin is the main flavor molecule in vanilla, but real vanilla beans are expensive and supply only a tiny share of world demand. Most vanillin is made synthetically, but companies that want a “natural” label need vanillin from a natural source. One solution is to have microbes make it from a natural starting material. This process, called bioconversion, uses enzymes inside microbes to change one molecule into another. The resulting vanillin can legally be called natural.",
        [
          ["Feedstock", "Ferulic acid, a compound found in the cell walls of plants such as rice bran and corn, is the starting material. Its structure is similar to vanillin's but with a longer side chain. It is extracted and purified from plant waste."],
          ["Bioconversion", "Selected bacteria or fungi are fed ferulic acid. Their enzymes shorten its three-carbon side chain by two carbons in a series of steps. This leaves an aldehyde group: a carbon double-bonded to oxygen with a hydrogen attached."],
          ["Product", "The result is vanillin, which is collected from the fermentation broth and purified. It is chemically identical to the vanillin in vanilla beans."],
        ],
        "Because a microbe made it from a natural source, it can legally be called natural, even though it's the same molecule as synthetic vanillin. Real vanilla extract, by contrast, contains hundreds of other aroma molecules besides vanillin, which give it a richer flavor.",
      ),
    ],
    hazards: [
      hz(
        "Undisclosed components",
        "Natural flavors are generally safe, but consumers can't see exactly what's in them. A natural flavor may contain dozens of aroma molecules plus solvents, preservatives and carriers, all listed under just two words. Flavor companies keep their formulas secret as trade secrets. This lack of transparency can be frustrating for people with rare sensitivities or dietary restrictions. Major food allergens, however, must still be declared by law.",
        "A typical natural flavor might contain esters, aldehydes, terpenes, ketones and other aroma molecules, along with carriers such as ethanol, propylene glycol or triacetin that help spread and preserve them. Other ingredients, called incidental additives, may be present in very small amounts. Because flavors are used so sparingly, each component ends up at a very low level in the food. Many of the molecules used in natural flavors are also found in everyday foods. The exact mixture varies from product to product.",
        "Most people have no reaction to natural flavors. But a small number of people with rare sensitivities, for example to certain plant compounds or particular carriers, can't pin down a trigger because the components aren't listed. People following vegan, kosher or halal diets also can't always tell whether a natural flavor came from an animal source without contacting the manufacturer. In the U.S., the nine major allergens, such as milk, eggs, soy and wheat, must be declared even when they are part of a flavoring. People with concerns can ask manufacturers for more details.",
      ),
    ],
    dosage:
      "Natural flavors typically make up less than 0.1 percent of a food, and each individual aroma molecule is often present at just parts per million. In the U.S., most flavoring substances are evaluated by the expert panel of the Flavor and Extract Manufacturers Association (FEMA), and those recognized as generally safe can be used without separate FDA approval. International experts (JECFA) also evaluate many flavoring substances. Because the amounts are so small, the safety margins for most flavor molecules are very large. People with specific dietary or allergy concerns can contact the manufacturer about a particular flavoring.",
    synthesis: [
      route(
        "Extraction, distillation and fermentation",
        "Natural flavors are created by flavor companies, often called flavor houses, that combine natural ingredients into blends with specific tastes. The blends are designed by flavorists, specialists who train for years to recognize hundreds of aroma molecules. They start from natural raw materials such as fruits, spices, herbs, meats and microbial cultures. Different techniques are used to extract or produce the flavor molecules they need. The finished flavor is often a complex mixture designed to taste exactly the same in every batch of a product.",
        "Raw materials are processed in several ways. Solvent extraction soaks plant material in ethanol or another food-safe solvent to dissolve flavor molecules out of it. Supercritical carbon dioxide extraction uses CO₂ under high pressure to pull out delicate aromas without heat. Steam distillation separates volatile oils, and fermentation uses microbes to make flavor molecules or to transform natural starting materials into new ones. Flavorists then blend dozens of these components with carriers into a proprietary formula and test it in the food it is meant for.",
        { significance: "The flavor industry's own expert panel (FEMA) reviews most flavor substances, which critics say gives the FDA limited oversight." },
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
        "Esters are molecules formed by joining an acid and an alcohol, with a characteristic –COO– group linking the two parts. Small esters, with fewer than about ten carbon atoms, are volatile, meaning they evaporate easily and float into the air where we can smell them. The exact size and shape of an ester decides which of our roughly 400 types of smell receptors it fits and activates. Changing the length of the carbon chains on either side of the ester group changes the smell. Adding or removing a single carbon atom can turn one fruity smell into another.",
        "When we smell or taste an ester, the brain interprets the pattern of activated smell receptors as a specific aroma. Isoamyl acetate smells like banana, ethyl butyrate like pineapple, and methyl anthranilate like grape. Many fruits contain these same esters naturally, and they help give each fruit its characteristic smell. Flavorists blend several esters with other molecules to create fuller, more realistic fruit flavors. Artificial grape flavor is based on methyl anthranilate from Concord grapes, which is why it tastes different from the green and red grapes most people eat.",
        "established",
      ),
      mech(
        "Same receptors as natural flavors",
        "A molecule's smell depends entirely on its structure: the atoms it contains, how they are connected and its 3D shape. Synthetic vanillin, made from petroleum-derived chemicals or wood pulp, has exactly the same structure as vanillin from a vanilla bean. Smell receptors in the nose bind molecules according to their shape and chemical properties. Because the molecules are identical, they bind the same receptors in the same way. There is no chemical difference for a receptor to detect.",
        "A molecule of synthetic vanillin and one from a vanilla bean are indistinguishable to your nose and your body. Your gut absorbs them the same way, and your liver breaks them down by the same pathways. Real vanilla extract does taste different from artificial vanilla, but that's because the extract contains hundreds of other molecules besides vanillin. The difference is in the mixture, not in the vanillin itself. Scientists can only tell where a sample of vanillin came from by measuring rare, heavier forms of carbon atoms called isotopes.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Fischer esterification",
        "Fischer esterification is a classic reaction used to make esters, including many of the fruity molecules in artificial flavors. It joins a carboxylic acid and an alcohol and releases a molecule of water. The German chemist Emil Fischer described it in 1895. It needs an acid catalyst, such as sulfuric acid, and usually some heat. Many high school chemistry classes make fruity-smelling esters this way as a lab experiment.",
        [
          ["Activation", "An acid catalyst adds a hydrogen ion (H⁺) to the oxygen of the carboxylic acid's C=O group. This makes the carbon attached to that oxygen even more electron-poor, so it becomes an easier target for attack."],
          ["Attack", "The oxygen atom of the alcohol, which has spare pairs of electrons, attacks the electron-poor carbon. A new bond forms between them, creating a short-lived structure with four groups attached to that carbon."],
          ["Elimination", "After hydrogen ions shuffle between the oxygen atoms, one of the acid's original –OH groups leaves as a water molecule. The remaining structure gives up a hydrogen ion, which regenerates the catalyst, and the ester is formed."],
        ],
        "Butyric acid smells like rancid butter, but its ethyl ester, ethyl butyrate, smells like pineapple, which shows how small structural changes can completely transform a smell. The reaction is reversible, so chemists often remove water as it forms to push the reaction toward making more ester.",
        "CH3CH2CH2COOH + C2H5OH → CH3CH2CH2COOC2H5 + H2O",
      ),
      rxn(
        "Making vanillin from guaiacol",
        "Most of the world's vanillin is made synthetically, and the most common method today starts from a chemical called guaiacol. Guaiacol is a benzene ring carrying an –OH group and a methoxy group (–OCH₃), and it can be made from petroleum-derived chemicals. The process adds the aldehyde group that gives vanillin its flavor. It is efficient and produces very pure vanillin. Vanilla beans could never come close to supplying the world's demand for vanilla flavor.",
        [
          ["Condensation", "Guaiacol reacts with glyoxylic acid, a small molecule containing both an aldehyde and an acid group, in a basic solution. The glyoxylic acid attaches to the ring opposite the –OH group, adding a two-carbon side chain. The product is called vanillylmandelic acid."],
          ["Oxidation", "The side chain is oxidized, often with air and a metal catalyst. This turns the –CH(OH)– group next to the ring into a C=O group. The side chain is now a keto acid."],
          ["Decarboxylation", "When the molecule is heated in acid, its carboxylic acid group (–COOH) breaks off as carbon dioxide gas. What remains on the ring is an aldehyde group (–CHO), and the molecule is now vanillin."],
        ],
        "Vanilla beans can't come close to meeting world demand, so synthetic vanillin flavors most vanilla foods, at a tiny fraction of the cost of vanillin from beans. An older route made vanillin from lignin, a byproduct of papermaking.",
      ),
    ],
    hazards: [
      hz(
        "Undisclosed blends",
        "Like natural flavors, artificial flavors usually appear on labels as a single term, even when they contain many different chemicals. Individual flavoring substances are evaluated for safety, but consumers can't see which ones are in a particular product. In 2018 the U.S. FDA removed seven synthetic flavoring substances from its list of permitted food additives after high-dose animal studies showed they could cause cancer. The decision rested on a legal rule rather than evidence of harm at the tiny amounts actually used. Still, it highlighted how little consumers know about specific flavor ingredients.",
        "An artificial flavor blend may contain esters, aldehydes, ketones, alcohols and other synthetic molecules chosen to recreate or invent a taste. In the U.S., each substance must either be approved by the FDA or recognized as safe through expert review. The seven substances removed in 2018 were benzophenone, ethyl acrylate, eugenyl methyl ether, myrcene, pulegone, pyridine and styrene. In animal studies, very high doses of these substances caused tumors. A U.S. law called the Delaney Clause bans any food additive shown to cause cancer in animals, regardless of dose.",
        "The amounts of flavor chemicals in foods are tiny, usually parts per million, far below the doses that caused effects in animal studies. The FDA stated that the seven removed substances posed no risk to public health at the levels used, but the law required their removal. Most people experience no effects at all from artificial flavors. However, people with specific sensitivities can't easily identify a trigger when ingredients aren't listed. Some consumers avoid artificial flavors to limit their exposure to undisclosed chemicals.",
      ),
    ],
    dosage:
      "Artificial flavors are usually present at parts per million, meaning a gram of flavoring may flavor a kilogram or more of food. Each individual flavoring substance is evaluated for safety at these levels by the FDA, the FEMA expert panel or international experts (JECFA), and the safety margins are typically very large because so little is used. In the U.S., the Delaney Clause bans any additive shown to cause cancer in animals at any dose, which led to the 2018 removal of seven flavor substances. People who prefer to avoid artificial flavors can check ingredient labels.",
    synthesis: [
      route(
        "Chemical synthesis",
        "Artificial flavor molecules are made in chemical plants using standard organic chemistry reactions. The starting materials, called feedstocks, may come from petroleum or from plant sources such as wood, turpentine or plant oils. Each target molecule is made separately, purified to a high standard and then blended with others by flavorists. Because every molecule is made under controlled conditions, the flavors are consistent from batch to batch. They are also far cheaper than extracting flavors from natural sources.",
        "Chemists choose a route for each flavor molecule based on its structure. Esters are made by Fischer esterification, joining an acid and an alcohol with an acid catalyst. Aldehydes, such as benzaldehyde, the main flavor of almond and cherry, can be made by oxidizing alcohols or other starting materials. Some molecules need several steps, each one adding or changing part of the structure. After each reaction the product is separated and purified, often by distillation or crystallization, to remove byproducts and leftover starting materials, and flavorists then blend dozens of these molecules into the final flavor.",
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
        "When light passes from one material into another, it bends, and the amount of bending is measured by the refractive index. Titanium dioxide has one of the highest refractive indices of any common material, about 2.6 for its rutile form, compared with about 1.5 for glass. When TiO₂ particles are mixed into paint, plastic or food, the big difference between the particles and their surroundings makes light bounce and scatter strongly at each particle's surface. Particles about 200 to 300 nanometers across, roughly half the wavelength of visible light, scatter all visible colors most efficiently. Because none of the colors is absorbed, essentially all of the light is scattered.",
        "When every color of visible light is scattered evenly back toward our eyes, we see the result as brilliant white. That's why TiO₂ is used to whiten paint, paper, plastics, toothpaste, sunscreen and some candies and frostings. Its strong scattering also makes it opaque, so it hides whatever is underneath. A thin layer of TiO₂ paint can cover a dark wall in fewer coats than other white pigments. In medicines, it makes tablets and capsules opaque, which can protect light-sensitive ingredients inside.",
        "established",
      ),
      mech(
        "Blocking UV in sunscreen",
        "Titanium dioxide is a semiconductor, a material whose electrons can jump up to a higher energy level if they absorb enough energy. The minimum energy needed, called the band gap, is about 3.0 to 3.2 electron volts for TiO₂. Ultraviolet light, with wavelengths shorter than about 400 nanometers, carries more energy than this, so it gets absorbed. Visible light carries less, so it passes. In sunscreens, TiO₂ is often ground into nanoparticles, which scatter much less visible light, so they look nearly clear on the skin while still absorbing UV.",
        "Ultraviolet radiation from the sun damages skin cells by breaking bonds in DNA and producing harmful reactive molecules. Over time this can cause sunburn, premature aging and skin cancer, including melanoma. By absorbing and scattering UV before it reaches living skin cells, TiO₂ cuts down that damage. It works mainly against UVB rays, which cause sunburn, and also blocks some UVA. Mineral sunscreens containing TiO₂ and zinc oxide are often recommended for sensitive skin because they rarely cause irritation.",
        "established",
      ),
      mech(
        "Nanoparticles in food",
        "Food-grade titanium dioxide, known in Europe as E171, contains particles of many sizes, and a share of them, by number sometimes a third or more, are smaller than 100 nanometers, which counts as nanoscale. Particles this small have a lot of surface area compared with their volume and can behave differently from larger ones. Studies have shown that a small proportion can cross the lining of the gut and enter the blood. Under some conditions, especially in light, TiO₂ particles can generate reactive oxygen species, molecules that can damage cells and DNA. In the dark of the gut, however, this light-driven effect is minimal.",
        "Animal studies found that small amounts of TiO₂ particles can accumulate in tissues such as the liver, spleen and intestinal lining. Some rodent studies suggested changes in the gut's immune cells and possible links to inflammation and precancerous changes in the colon, though the results were mixed. In 2021 the European Food Safety Authority concluded that it couldn't rule out that TiO₂ damages DNA, so it couldn't set a safe level. Based on that, the European Union banned TiO₂ as a food additive from 2022. Other regulators, including the U.S. FDA, have not found enough evidence to ban it.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Photocatalysis",
        "When titanium dioxide absorbs ultraviolet light, it doesn't just block it; it can also use that energy to drive chemical reactions on its surface. This is called photocatalysis, because light switches TiO₂ on as a catalyst. It produces highly reactive radicals that can break down organic molecules, including grime, bacteria and pollutants. The property is useful for self-cleaning surfaces but unwanted in sunscreens and cosmetics. Manufacturers control it by choosing the type of TiO₂ and coating the particles.",
        [
          ["Excitation", "A UV photon is absorbed by a TiO₂ particle, giving one of its electrons enough energy to jump across the band gap into a higher-energy level called the conduction band. This leaves behind a positively charged gap, called a hole, in the lower level. Both the electron and the hole can move through the crystal."],
          ["Radicals", "At the particle's surface, the hole takes an electron from a water molecule, forming a hydroxyl radical (•OH). The excited electron passes itself to an oxygen molecule, forming superoxide (O₂•⁻). Both are extremely reactive."],
          ["Oxidation", "These radicals attack organic molecules on the surface, such as grease, dirt or bacteria, breaking their bonds. Repeated attacks gradually break the molecules down into simpler substances, eventually carbon dioxide and water."],
        ],
        "This powers self-cleaning glass and some air purifiers, where sunlight helps break down grime. Coating cosmetic TiO₂ with silica or alumina switches the effect off on your skin by keeping radicals from forming there. The rutile form of TiO₂ is also less photoactive than the anatase form, so it is preferred in sunscreens.",
        "TiO2 + hν → e- + h+",
      ),
      rxn(
        "The chloride process",
        "The chloride process is one of the two main ways to purify titanium dioxide from its ore. It works by turning the titanium in the ore into a gas, purifying that gas, and then turning it back into solid TiO₂. This produces very pure, bright white pigment. The process was developed by the chemical company DuPont in the 1950s. Chlorine, the key reagent, is recycled and reused.",
        [
          ["Chlorination", "Rutile ore, which is mostly TiO₂, is mixed with coke (a form of carbon) and reacted with chlorine gas at about 1,000 °C. The carbon removes oxygen from the titanium and chlorine takes its place, forming titanium tetrachloride (TiCl₄). At that temperature TiCl₄ is a gas, so it separates from the leftover solid."],
          ["Purification", "The TiCl₄ gas is cooled into a liquid and distilled to remove iron, vanadium and other metal chlorides formed from impurities in the ore. Because each chloride boils at a different temperature, they separate cleanly. The result is very pure TiCl₄."],
          ["Oxidation", "The purified TiCl₄ is burned with pure oxygen at about 1,500 °C. This forms solid titanium dioxide particles and releases the chlorine again. By controlling the temperature and adding small amounts of other chemicals, manufacturers can make particles of the ideal size for scattering light."],
        ],
        "Recycling the chlorine makes the process efficient and the product very pure. The chloride process now produces most of the world's high-grade TiO₂ pigment.",
        "TiCl4 + O2 → TiO2 + 2 Cl2",
      ),
    ],
    hazards: [
      hz(
        "Food additive concerns (EU ban)",
        "Titanium dioxide was banned as a food additive in the European Union in 2022, but it is still permitted in U.S. food at up to 1 percent by weight. It was used to make candies, frostings, chewing gum and some sauces and dairy products look whiter and brighter. The EU decision was based on uncertainty rather than proven harm: regulators couldn't rule out that its nanoparticles might damage DNA. Many food companies have since removed it from their products worldwide. It is still allowed in medicines and cosmetics in the EU.",
        "Food-grade TiO₂ contains a mix of particle sizes, including nanoscale particles smaller than 100 nanometers. These tiny particles have a large surface area and may be able to cross the gut lining in small amounts. Studies in cells suggest TiO₂ particles may generate reactive oxygen species, which can damage DNA and cell membranes. They may also trigger inflammation in some immune cells. How much of this happens in the human body at normal intakes, though, is not well understood.",
        "The European Food Safety Authority reviewed the evidence in 2021 and concluded that it couldn't exclude the possibility that TiO₂ damages DNA, a property called genotoxicity. For substances that might damage DNA, regulators usually can't set a safe threshold, so EFSA concluded TiO₂ could no longer be considered safe as a food additive. No harm in people has been directly demonstrated. Agencies in the U.S., U.K. and Canada reviewed similar evidence and did not ban it. The disagreement shows how regulators can reach different conclusions from the same uncertain evidence.",
      ),
      hz(
        "Inhaled powder",
        "Breathing in large amounts of fine titanium dioxide powder over long periods may harm the lungs. This is mainly a concern for workers in factories that produce or handle TiO₂ powder. For consumers, the relevant products are loose powders, such as some makeup, and sprays. TiO₂ in lotions, creams and paints isn't a lung concern because it isn't breathed in. Choosing pressed rather than loose powders and using sprays in well-ventilated spaces reduces exposure.",
        "When fine particles are breathed in, the smallest ones can travel deep into the lungs and reach the tiny air sacs called alveoli. TiO₂ particles are insoluble, meaning they don't dissolve in lung fluid. Immune cells called macrophages try to clear them by swallowing them up, but with heavy exposure they can become overloaded. The particles then stay in the lungs for a long time. Persistent particles can cause ongoing irritation and inflammation.",
        "In long-term studies, rats exposed to very high levels of TiO₂ dust developed chronic lung inflammation, and some developed lung tumors. Because of these results, the International Agency for Research on Cancer classifies inhaled TiO₂ as possibly carcinogenic to humans (Group 2B). Studies of workers in TiO₂ factories haven't shown a clear rise in lung cancer, and rats may be especially sensitive to this kind of particle overload. Workplaces control exposure with ventilation and masks. For consumers, avoiding breathing in loose powders and sprays is a sensible precaution.",
      ),
    ],
    dosage:
      "In the United States, titanium dioxide may make up to 1 percent of a food's weight and is used in some candies, frostings and coatings; in the European Union it has been banned from food since 2022. Studies estimate that children have higher dietary exposure than adults, mainly from sweets. In sunscreens it is used at up to 25 percent and is not absorbed through intact skin. Mineral makeup and loose powders may contain it in a form that can be breathed in, so pressed powders and good ventilation reduce exposure. The key safety distinction is between swallowing it, putting it on skin and breathing it in.",
    synthesis: [
      route(
        "Chloride process",
        "The chloride process is the main route for making high-purity titanium dioxide pigment today. It was developed by DuPont in the 1950s and produces very bright white pigment with consistent particle sizes. The process uses chlorine to turn titanium ore into a gas that can be purified by distillation. Afterward the chlorine is recovered and reused. It requires high-grade ores, such as rutile or upgraded ilmenite.",
        "Titanium ore is ground, mixed with coke, a nearly pure form of carbon, and reacted with chlorine gas in a reactor at around 1,000 °C. The carbon removes oxygen from the ore as carbon dioxide, while chlorine bonds to the titanium to form titanium tetrachloride (TiCl₄), a volatile liquid that boils at 136 °C. The gaseous TiCl₄ is collected, cooled and distilled to separate it from other metal chlorides. The purified TiCl₄ is then burned in pure oxygen, forming fine TiO₂ particles and releasing the chlorine. Finally, the particles are coated with materials such as silica or alumina to improve their performance, then dried and milled.",
        { equation: "TiO2 + 2 Cl2 + C → TiCl4 + CO2", significance: "The same titanium tetrachloride is also the starting point for making titanium metal, used in aircraft and medical implants." },
      ),
      route(
        "Sulfate process",
        "The sulfate process is the older method for making titanium dioxide, first used commercially in the 1910s and 1920s. It starts with ilmenite, an ore containing both iron and titanium, and uses sulfuric acid to dissolve it. The process is simpler but produces more waste, particularly iron sulfate and dilute acid. It can make both the anatase and rutile forms of TiO₂. It is still widely used today, especially in China.",
        "Ilmenite ore (FeTiO₃) is ground and digested, meaning dissolved, in hot concentrated sulfuric acid, producing a solution of titanium and iron sulfates. The solution is cooled so that iron sulfate crystallizes out and can be removed. Next, the solution is diluted and heated, which makes the titanium react with water and form solid hydrated titanium dioxide that settles out. This solid is filtered, washed and heated to about 900 °C in a kiln, a step called calcination, which drives off water and leftover acid and turns it into crystalline TiO₂. The product is then milled and treated to give it the right properties.",
        { significance: "TiO₂ replaced toxic lead white in paints during the 20th century." },
      ),
    ],
  },
};
