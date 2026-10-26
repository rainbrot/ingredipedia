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
        "Cetyl and stearyl alcohol molecules each have a long oily tail and a small water-loving –OH head, so they are weakly attracted to both oil and water. On their own they don't mix well with water. But when they are combined with an emulsifier and heated in water, they arrange themselves into stacked double layers called lamellae, with their tails tucked inward and their heads facing the water. Water gets trapped between these layers, forming a thick gel network that also holds oil droplets in place. This structure is remarkably similar to the layered lipids between cells in the skin's own outer layer.",
        "The lamellar gel network gives creams and lotions their thick, smooth, rich texture, so they feel luxurious and spread easily. It also keeps oil and water from separating, so the product stays stable on the shelf for years. On the skin, the cream softens slightly and spreads evenly. Because its structure resembles the skin's own lipid layers, it can feel natural and comfortable. That is why cetearyl alcohol is one of the most common ingredients in creams, conditioners and lotions.",
        "established",
      ),
      mech(
        "Softening skin",
        "Cetearyl alcohol molecules are long, straight, waxy chains that act as emollients, substances that soften and smooth the skin. When applied, they fill the tiny gaps between rough, flaking skin cells on the surface, like grout filling the spaces between tiles. They also form a thin, light film on the skin. That film slows the evaporation of water from the surface without sealing it completely. Unlike short-chain alcohols such as ethanol, fatty alcohols don't dissolve the skin's own lipids.",
        "By filling gaps and smoothing the surface, cetearyl alcohol makes dry, rough skin feel softer right away. The thin film reduces water loss, helping skin stay hydrated longer. In hair conditioners, it coats strands, making them smoother, softer and easier to comb. Because it doesn't strip natural oils, it suits dry and sensitive skin. Many people are surprised to learn that some of the “alcohols” in skincare are actually moisturizing.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrogenation of plant fatty acids",
        "Cetearyl alcohol is made from the fatty acids in plant oils such as coconut or palm oil, through a process called hydrogenation. Hydrogenation means adding hydrogen to a molecule; here it converts the carbonyl group (C=O) of a fatty acid ester into an alcohol group (–CH₂OH). That turns a fatty acid into a fatty alcohol. The reaction needs high pressure, high temperature and a metal catalyst. The same kind of reaction makes many other fatty alcohols for detergents and cosmetics.",
        [
          ["Esters", "First, coconut or palm oil, which is made of triglycerides, is reacted with methanol to produce fatty acid methyl esters and glycerin. Methyl esters are easier to hydrogenate than the oil itself. They are separated by distillation."],
          ["Hydrogenation", "The methyl esters are mixed with hydrogen gas at high pressure, around 200 to 300 atmospheres, and heated over a copper-based catalyst. The catalyst helps hydrogen atoms add across the ester's carbon–oxygen double bond. This is called reduction because the molecule gains hydrogen."],
          ["Products", "The reaction produces fatty alcohols, with the ester group turned into a –CH₂OH group, and releases methanol, which is recycled. The fatty alcohols are separated by distillation into different chain lengths. The 16-carbon cetyl alcohol and 18-carbon stearyl alcohol fractions are then blended to make cetearyl alcohol."],
        ],
        "Reducing a carbonyl group to an alcohol is one of the core reactions of organic chemistry. The same process produces other fatty alcohols, such as lauryl alcohol, which is used to make detergents like SLS.",
        "RCOOCH3 + 2 H2 → RCH2OH + CH3OH",
      ),
      rxn(
        "Forming a lamellar gel network",
        "When a cream is made, its thick texture forms as it cools, much the way jelly sets. That happens because cetearyl alcohol and emulsifiers arrange themselves into a structured network called a lamellar gel network. Getting this structure right is the key to a cream with the right texture and stability. Manufacturers carefully control temperature, mixing speed and cooling rate. Small changes can make a cream thicker, thinner or grainy.",
        [
          ["Hot mixing", "Cetearyl alcohol and an emulsifier are melted together, typically above about 70 °C, and mixed with hot water and oils. At that temperature the fatty alcohol is liquid and mixes easily. The emulsifier breaks the oil into tiny droplets."],
          ["Swelling", "As the mixture starts to cool, emulsifier and fatty alcohol molecules pair up and line up into flat, layered sheets. Water is drawn in between the layers, which swell. This creates a structured, water-filled gel."],
          ["Cooling", "As cooling continues, the fatty alcohol chains in the layers become more ordered and crystallize, locking the structure in place. The network traps water and oil droplets so they can't separate. The cream thickens into its final consistency."],
        ],
        "Cooling speed and stirring change the network, which is why manufacturers control them precisely. Cooling too fast or too slowly can make a cream grainy or thin, and the network can slowly change in storage, which is why some creams thicken or thin over time.",
      ),
    ],
    hazards: [
      hz(
        "Rare contact allergy",
        "Cetearyl alcohol is used in a huge number of creams, lotions and conditioners, and allergic reactions to it are uncommon. When they happen, they are usually mild. People with damaged skin, for example from eczema or leg ulcers, or who use many medicated creams, are more likely to react. Some reactions may be caused by impurities in lower-quality material. For most people, cetearyl alcohol is gentle and non-irritating.",
        "Fatty alcohols aren't very reactive, so they rarely bind to skin proteins. Some batches, however, may contain small amounts of impurities, such as shorter-chain alcohols or oxidation products. These, or occasionally the fatty alcohols themselves, can act as haptens, small molecules that bond to skin proteins and make them look foreign to the immune system. Damaged skin lets more of these molecules in. Higher-purity cetearyl alcohol lowers the risk.",
        "In a sensitized person, immune cells recognize the modified skin proteins and trigger inflammation on later exposures. This causes allergic contact dermatitis, with itchy, red, scaly patches where the product was applied, usually one to two days after contact. Reactions are more common on skin that is already damaged, such as around leg ulcers treated with creams. Patch testing by a dermatologist can identify the allergy. Switching to products without cetearyl alcohol usually solves the problem.",
      ),
    ],
    dosage:
      "Creams and lotions typically contain about 1 to 5 percent cetearyl alcohol, and conditioners often more. The Cosmetic Ingredient Review has concluded that cetearyl alcohol and related fatty alcohols are safe in cosmetics, and the U.S. FDA also allows cetyl and stearyl alcohols in small amounts in food and medicines. Unlike short-chain alcohols such as ethanol, it isn't drying. People with damaged skin who react to many different creams may benefit from patch testing.",
    synthesis: [
      route(
        "From plant oils",
        "Most cetearyl alcohol today is made from plant oils, especially coconut and palm oil. These oils are rich in fatty acids with 12 to 18 carbon atoms. The fatty acids are converted to fatty alcohols by hydrogenation and then separated by chain length. Cetearyl alcohol can also be made from petroleum, though plant sources are more common. The result is a white, waxy solid, usually sold as flakes or pellets.",
        "Coconut or palm oil is first split into fatty acids or converted into fatty acid methyl esters by reaction with methanol. These are hydrogenated with hydrogen gas at high pressure over a copper catalyst, which turns the acid or ester group into an alcohol group (–CH₂OH). The resulting mixture of fatty alcohols is separated by distillation, which sorts chains of different lengths by their boiling points. The 16-carbon (cetyl) and 18-carbon (stearyl) fractions are collected. They are blended in the desired ratio, typically about half and half, and solidified into flakes.",
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
        "Propylene glycol has two hydroxyl (–OH) groups on a small three-carbon backbone, plus a methyl group (–CH₃). The hydroxyl groups form hydrogen bonds with water molecules, attracting and holding moisture, which makes it a humectant. Its small oily methyl group, meanwhile, lets it dissolve molecules that don't dissolve well in water alone. That balance means propylene glycol mixes with water, alcohol and many oils. It acts as a bridge that helps different ingredients stay mixed.",
        "In skincare, propylene glycol carries active ingredients such as vitamins or medicines, keeping them dissolved and spreading them evenly. Its humectant action also draws water to the skin's surface, helping keep it hydrated. In food, it keeps flavors, colors and other additives evenly dissolved and helps baked goods and frostings stay moist. It is also used in medicines to dissolve active ingredients that won't dissolve in water. That versatility makes it one of the most widely used ingredients across many industries.",
        "established",
      ),
      mech(
        "Helping ingredients penetrate",
        "The outermost layer of skin, the stratum corneum, contains tightly packed layers of lipids that form a barrier. Propylene glycol can slip into these lipid layers and temporarily loosen their orderly packing. It also changes the chemical environment inside the skin, affecting how easily other ingredients move out of a product and into the skin, a process called partitioning. Acting as a solvent within the skin, it can carry other molecules along with it. The result is a skin barrier that is temporarily more permeable.",
        "Because propylene glycol helps other ingredients get in, it is often used in medicated creams, such as steroid creams, to make them work better. In cosmetics, it can help active ingredients reach deeper layers of the skin. The flip side is that it can also increase the penetration of irritating ingredients, which may cause stinging or redness. The effect is temporary, and the barrier returns to normal once the product is gone. Formulators balance these effects when designing products.",
        "human",
      ),
      mech(
        "Metabolized to lactic acid",
        "When propylene glycol is swallowed or absorbed, it is carried to the liver. There, the enzyme alcohol dehydrogenase oxidizes one of its hydroxyl groups, converting propylene glycol into lactaldehyde. A second enzyme, aldehyde dehydrogenase, then oxidizes lactaldehyde into lactic acid. These are the same kinds of enzymes that break down drinking alcohol. A large share of an absorbed dose, nearly half, is also excreted unchanged by the kidneys.",
        "Lactic acid is a normal part of the body's metabolism; muscles make it during exercise. It is either burned for energy or turned back into glucose by the liver. So at normal exposures, propylene glycol is handled easily and safely. Only very large amounts, typically from high-dose intravenous medicines in hospital, can produce lactic acid faster than the body clears it. That can lead to lactic acidosis, a condition in which the blood becomes too acidic.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydration of propylene oxide",
        "Propylene glycol is made industrially by adding water to propylene oxide, a reactive three-membered ring of two carbons and an oxygen with a methyl group attached. A reaction that adds water to a molecule is called hydration. The ring opens, and the water's atoms are split between the two carbons. The reaction is efficient and gives mostly propylene glycol. It is the main way propylene glycol is made worldwide.",
        [
          ["Ring strain", "Propylene oxide's three-membered ring has bond angles of about 60 degrees, far tighter than the usual 109.5 degrees for carbon. This squeezed shape stores energy, called ring strain, which makes the ring eager to open. It is much more reactive than an ordinary ether."],
          ["Attack", "Water attacks one of the ring's carbon atoms, often helped by a little acid or by high temperature and pressure. The acid adds a hydrogen to the ring oxygen, making the carbons more attractive targets. Water's oxygen forms a bond with a ring carbon."],
          ["Product", "As that new bond forms, a carbon–oxygen bond in the ring breaks and the ring opens. The water's H and OH end up spread across the two carbons, each of which now carries an –OH group. The product is propylene glycol."],
        ],
        "Excess water is used so the product doesn't react further into larger glycols, such as dipropylene glycol, which form when propylene glycol reacts with more propylene oxide. Those byproducts are separated by distillation and have their own commercial uses.",
        "C3H6O + H2O → C3H8O2",
      ),
      rxn(
        "Metabolism in the body",
        "When propylene glycol enters the body, it is broken down by the same enzymes that process alcohol. It goes through two oxidation steps, each removing hydrogen and changing the molecule's structure. The end product is lactic acid, which the body uses as an ordinary fuel. This harmless breakdown is why propylene glycol is considered far safer than its close cousin, ethylene glycol. Following the pathway shows exactly why the two are treated so differently.",
        [
          ["Oxidation 1", "In the liver, alcohol dehydrogenase removes two hydrogen atoms from propylene glycol's secondary –OH group, the one on the middle carbon, turning it into a carbonyl group (C=O). This produces lactaldehyde. The helper molecule NAD⁺ accepts the hydrogen."],
          ["Oxidation 2", "Aldehyde dehydrogenase adds an oxygen to lactaldehyde's aldehyde group, converting it into a carboxylic acid. This produces lactic acid. Again, NAD⁺ takes the hydrogen."],
          ["Recycling", "Lactic acid enters normal metabolism: it is either converted to pyruvate and burned for energy in the mitochondria or turned back into glucose by the liver. These are pathways the body uses every day."],
        ],
        "This harmless pathway is why propylene glycol, not toxic ethylene glycol, is used in “pet-safe” antifreeze. The same enzymes turn ethylene glycol into oxalic acid and other toxic products that damage the kidneys.",
      ),
    ],
    hazards: [
      hz(
        "Irritation and allergy",
        "Propylene glycol is generally safe in cosmetics, but it can irritate some people's skin and, less often, cause a true allergy. The American Contact Dermatitis Society named it Allergen of the Year in 2018 to raise awareness, since it appears in so many cosmetics, medicines and foods. Irritant reactions such as stinging and redness are much more common than true allergy. They are more likely at high concentrations or on broken skin. People with eczema may be especially sensitive.",
        "At high concentrations, propylene glycol can draw water out of the skin and disturb the lipid layers of the barrier. That lets it, and other ingredients, penetrate more deeply and irritate the skin. In some people propylene glycol can act as an allergen, possibly by binding to skin proteins or through its breakdown products, though the exact mechanism isn't well understood. Irritation is a direct chemical effect. Allergy, by contrast, involves the immune system.",
        "Irritant reactions cause stinging, burning, redness or dryness soon after application, especially on sensitive areas or broken skin, and usually settle once the product is stopped. True allergic reactions cause itchy, red, scaly eczema that appears one to two days after exposure. Rarely, people allergic to propylene glycol react to foods or medicines containing it, with a widespread rash. Patch testing helps tell irritation apart from allergy. Choosing products without it resolves either problem.",
      ),
      hz(
        "Very high intravenous doses",
        "Propylene glycol is safe in food and cosmetics, but very large doses given into a vein in hospital can cause problems. Some medicines, such as intravenous lorazepam and certain other sedatives, contain large amounts of propylene glycol as a solvent. Patients who receive high doses of these medicines for long periods, especially in intensive care or with kidney or liver problems, can develop toxicity. Doctors watch for this and adjust treatment if needed. It is not a concern for everyday consumers.",
        "When propylene glycol is infused straight into the blood in large amounts, the liver converts it into lactic acid. If it arrives faster than the body can clear that lactic acid, the acid builds up in the blood. At the same time, unchanged propylene glycol accumulates, raising the concentration of dissolved particles in the blood, a condition called hyperosmolality. People with kidney or liver problems clear both more slowly. Infants are also more vulnerable because their enzymes are immature.",
        "Lactic acidosis, too much acid in the blood, can cause rapid breathing, confusion, low blood pressure and, if severe, organ damage. High propylene glycol levels can also affect the kidneys and nervous system. Doctors watch for warning signs in blood tests in patients on high-dose infusions. Switching to a medicine without propylene glycol usually fixes the problem. These effects require doses far higher than anyone gets from food or skincare.",
      ),
    ],
    dosage:
      "Cosmetics use propylene glycol at about 1 to 20 percent, and foods use small amounts as a carrier for flavors and colors. International experts (JECFA) have set an acceptable daily intake of 25 milligrams per kilogram of body weight, and the U.S. FDA considers it generally recognized as safe in food. Typical intake from food is well below that limit. In medicine, very high intravenous doses require monitoring. People with eczema who notice irritation may prefer products without it.",
    synthesis: [
      route(
        "From propylene",
        "Most propylene glycol is made from propylene, a gas obtained from petroleum refining and natural gas processing. The propylene is first converted into propylene oxide, which is then reacted with water to make propylene glycol. Millions of tonnes are produced every year for foods, cosmetics, medicines, antifreeze and plastics. Pharmaceutical and food grades must meet strict purity standards. Industrial grades go into antifreeze and serve as a chemical building block.",
        "Propylene gas is first oxidized to propylene oxide, either by reacting it with hydrogen peroxide over a catalyst or through older processes that use chlorine or organic peroxides. The propylene oxide, a strained three-membered ring, is then mixed with excess water and heated under pressure. Water opens the ring, putting an –OH group on each of two carbons and producing propylene glycol. Larger glycols formed as byproducts are separated by distillation. The propylene glycol is distilled further to reach pharmaceutical or food grade.",
        { significance: "The hydrogen peroxide route to propylene oxide, introduced in the 2000s, produces only water as a byproduct, a cleaner alternative to older chlorine-based methods." },
      ),
      route(
        "From glycerin",
        "Propylene glycol can also be made from glycerin, the byproduct of biodiesel production. Because biodiesel plants produce a large surplus of glycerin, turning it into useful chemicals is both economical and environmentally sensible. This route makes bio-based propylene glycol, chemically identical to the petroleum version. Several companies now produce it this way. It is a good example of turning waste into something valuable.",
        "Glycerin, which has three –OH groups, is reacted with hydrogen gas at high temperature and pressure over a copper-based catalyst. The catalyst helps break one of glycerin's carbon–oxygen bonds and replace that –OH group with a hydrogen atom, a reaction called hydrogenolysis. Removing the –OH from an end carbon leaves a methyl group, so glycerin becomes propylene glycol, which has only two –OH groups. Water is released as a byproduct. The propylene glycol is then purified by distillation.",
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
        "Once panthenol has been converted into pantothenic acid in the skin, cells use it to build coenzyme A (CoA), an essential helper molecule. Coenzyme A carries acyl groups, the building blocks of fats, through many metabolic reactions. It is especially important for making fatty acids, which are assembled two carbons at a time from acetyl-CoA. Those fatty acids are then used to make ceramides and other lipids. Without enough coenzyme A, cells can't make these lipids efficiently.",
        "The skin uses fatty acids and ceramides to build and repair its barrier, the protective lipid layer between the cells of the outermost layer. A healthy barrier keeps water in and irritants out. Clinical studies show that applying dexpanthenol, the active form of panthenol, improves skin hydration and reduces water loss through the skin. That helps dry, rough or irritated skin recover. It is common in moisturizers and products for sensitive skin.",
        "human",
      ),
      mech(
        "Soothing and healing",
        "Laboratory studies show that panthenol and pantothenic acid support the multiplication of fibroblasts, the cells in the deeper layer of skin that make collagen and other structural proteins. They also help skin cells migrate, or move, which is essential for closing a wound. Pantothenic acid may also influence genes involved in wound healing and dampen some inflammatory signals. Together these effects support the skin's natural repair processes. The exact mechanisms are still being worked out.",
        "Because it supports repair, dexpanthenol is widely used in Europe in ointments for minor cuts, burns, scrapes, sunburn and diaper rash. Some studies have found that it helps these wounds heal faster with less redness and irritation. It is also used to soothe skin after procedures such as laser treatments and tattoos. It is gentle enough for babies and sensitive skin. The evidence supports a benefit, though results vary with the type of wound.",
        "human",
      ),
      mech(
        "Hair conditioning",
        "Panthenol is a small molecule with several hydroxyl groups, which form hydrogen bonds with water. When applied to hair, it soaks into the hair shaft, the visible part of each hair. There it attracts and holds water, acting as a humectant inside the hair. That raises the hair's moisture content. It also leaves a light film on the hair's surface.",
        "With more moisture inside, hair strands become more flexible and less likely to snap. The extra water makes each shaft swell slightly, which can make hair look and feel fuller. The surface film adds shine and smoothness. However, panthenol doesn't reach the follicle under the skin where hair is made, so it doesn't make hair grow faster or prevent hair loss. Its effects are cosmetic and wash out over time.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Activation in skin",
        "Panthenol is a provitamin, meaning the body converts it into an active vitamin. When applied to skin, panthenol is absorbed and then converted into pantothenic acid, vitamin B5. The conversion is an oxidation reaction carried out by enzymes in the skin. Using panthenol rather than pantothenic acid itself helps the vitamin get into the skin. It is a clever way of delivering a nutrient right where it's needed.",
        [
          ["Absorption", "Panthenol is small and uncharged, so it passes through the skin's outer layers more easily than pantothenic acid, which carries a charge at skin pH. It moves into the living layers of the skin. There it meets enzymes that can activate it."],
          ["Oxidation", "Enzymes in skin cells oxidize the alcohol group (–CH₂OH) at the end of panthenol's chain, first into an aldehyde and then into a carboxylic acid group (–COOH). Oxygen is added and hydrogen removed. The molecule is now pantothenic acid."],
          ["Product", "Cells take up the pantothenic acid and use it to make coenzyme A, through a series of enzyme steps that add phosphate and other building blocks. Coenzyme A then takes part in many reactions, including making the lipids that build the skin barrier."],
        ],
        "Panthenol penetrates skin better than pantothenic acid, which is why it is used as the delivery form. Once inside, the body treats it exactly like vitamin B5 from food.",
      ),
      rxn(
        "Amide coupling (how it's made)",
        "Panthenol is made by joining two building blocks, D-pantolactone and 3-aminopropanol, with an amide bond. An amide bond is a strong link between a carbonyl carbon and a nitrogen, the same kind of bond that holds proteins together. D-pantolactone is a ring-shaped molecule called a lactone, which is an ester whose two ends are joined into a ring. The reaction opens the ring and forms the amide in a single step. It is efficient and clean.",
        [
          ["Lactone", "Pantolactone is made from simple starting materials, including isobutyraldehyde and formaldehyde. It is produced as a mix of two mirror-image forms, D and L, and the D-form is separated out. Only the D-form is useful."],
          ["Ring opening", "3-Aminopropanol, a small molecule with an amine group (–NH₂) at one end and an –OH group at the other, is mixed with D-pantolactone. The amine's nitrogen attacks the lactone's carbonyl carbon. This breaks the ester bond and opens the ring."],
          ["Amide", "As the ring opens, a new amide bond forms between the carbonyl carbon and the nitrogen, and the oxygen that was part of the ring becomes an –OH group. The product is D-panthenol, with three –OH groups and an amide bond."],
        ],
        "Only the D-form converts to active vitamin B5, so manufacturers isolate the correct mirror image. A mixture of D and L forms, sold as DL-panthenol, is cheaper, but only half of it is active.",
        "C6H10O3 + C3H9NO → C9H19NO4",
      ),
    ],
    hazards: [
      hz(
        "Rare allergy",
        "Panthenol is one of the gentlest ingredients in skin and hair care. Even though it appears in a wide range of products, including baby care and wound ointments, allergic reactions are rare. When they do occur, they are usually seen in people using dexpanthenol ointments on damaged skin. Most people use panthenol without any problems at all. It is often recommended for sensitive skin.",
        "In rare cases, panthenol or one of its breakdown products may act as a hapten, binding to skin proteins and making them look foreign to the immune system. Damaged skin lets more panthenol penetrate, raising the chance of this. Some reported reactions may actually be caused by other ingredients in the same product. The exact mechanism of panthenol allergy isn't well understood. Its low chemical reactivity explains why allergy is so uncommon.",
        "In sensitized people, panthenol can cause allergic contact dermatitis, with itchy, red, sometimes blistering skin where it was applied. Rarely, it causes contact urticaria, a hive-like reaction that appears within minutes. Reactions are more common when dexpanthenol is used on wounds, eczema or other broken skin. Patch testing can confirm the allergy. Avoiding products containing panthenol resolves it.",
      ),
    ],
    dosage:
      "Cosmetics and hair care products typically contain 0.5 to 5 percent panthenol, and wound-healing ointments often contain 5 percent dexpanthenol. The Cosmetic Ingredient Review has concluded that panthenol is safe in cosmetics. Vitamin B5 is found in almost all foods, and adults need about 5 milligrams a day. No upper limit has been set because toxicity from food or supplements is very rare. Panthenol is suitable for babies and sensitive skin.",
    synthesis: [
      route(
        "Biological synthesis of vitamin B5",
        "Plants and many bacteria can make pantothenic acid, vitamin B5, but animals, including humans, can't. That is why it counts as a vitamin for us: we have to get it from food. Fortunately it is in almost every food, and gut bacteria make some too. Deficiency is extremely rare and usually seen only in severe malnutrition. Its name, from the Greek pantothen, “from everywhere,” reflects how widespread it is.",
        "Bacteria and plants build pantothenic acid from two parts. The first, pantoate, is made from the amino acid valine through a series of enzyme reactions that add a carbon atom and then reduce a carbonyl group. The second, β-alanine, is made by removing a carboxyl group from the amino acid aspartate. An enzyme called pantothenate synthetase then joins pantoate and β-alanine with an amide bond, using energy from ATP. The resulting pantothenic acid is used to make coenzyme A.",
        { significance: "Because we can't make it, we rely on food and gut bacteria for vitamin B5." },
      ),
      route(
        "Industrial synthesis",
        "Most panthenol used in cosmetics and supplements is made by chemical synthesis rather than extracted from nature. The process starts with simple chemicals derived from petroleum and builds the molecule in several steps. A key challenge is producing the correct mirror-image form, D-panthenol, since only that form is active. Manufacturers use techniques that separate out or selectively make the D-form. Both pure D-panthenol and a cheaper DL-mixture are sold.",
        "First, isobutyraldehyde and formaldehyde are combined in an aldol reaction and then treated with hydrogen cyanide and acid to form pantolactone, a ring-shaped molecule. This gives a mixture of D and L forms, which are separated by a process called resolution, often by forming salts with a chiral compound so the two forms crystallize differently. The D-pantolactone is then mixed with 3-aminopropanol, which opens the ring and forms an amide bond, producing D-panthenol. The product is purified to pharmaceutical grade. Some manufacturers use enzymes to make the D-form selectively.",
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
        "Aloe vera gel is about 99 percent water, held in place by long sugar chains called polysaccharides, especially acemannan, a chain of mannose sugars with acetyl groups attached. These long chains form hydrogen bonds with water molecules and trap the water in a gel-like network. When the gel is applied to skin, the water slowly evaporates and leaves behind a thin film of polysaccharides. That film holds some moisture against the skin. The gel's high water content also gives immediate hydration.",
        "As water evaporates from the gel, it takes heat with it, creating a cooling feeling that is soothing on sunburned or irritated skin. The polysaccharide film helps keep the skin's surface hydrated and may reduce water loss for a while. That is why aloe vera is a popular after-sun product and appears in many moisturizers. The soothing effect is real and immediate. Aloe doesn't, however, repair sun damage or prevent the long-term effects of sunburn.",
        "human",
      ),
      mech(
        "Possible burn and wound support",
        "Laboratory studies have found that some components of aloe vera gel, including acemannan and glycoproteins, affect skin cells. They may stimulate fibroblasts, the cells that make collagen, and encourage cells to multiply. Some components also seem to reduce inflammatory signals, such as certain cytokines and prostaglandins. Aloe contains small amounts of vitamins, minerals and enzymes too. Its composition, however, varies a lot from product to product.",
        "These laboratory effects suggest aloe might help wounds and burns heal faster. Some clinical trials found that aloe gel shortened healing time for minor burns, such as first- and second-degree burns. Other studies found no benefit, and a few found that aloe slowed the healing of surgical wounds. Reviews of the evidence conclude that the results are mixed and better studies are needed. Aloe is reasonable for soothing a minor burn but shouldn't replace medical care for a serious one.",
        "emerging",
      ),
      mech(
        "Aloin's laxative effect",
        "Aloin is an anthraquinone glycoside, a three-ring molecule attached to a sugar, found in the yellow latex just under the leaf's outer skin. When swallowed, aloin passes through the stomach and small intestine without being absorbed. In the colon, gut bacteria snip off the sugar and convert aloin into aloe-emodin anthrone. That molecule is the actual laxative. It acts on the cells lining the colon.",
        "Aloe-emodin anthrone makes the colon's muscles contract more strongly, speeding stool along. It also makes the colon secrete more water and salts and absorb less, so stools become loose. The result is cramping, abdominal pain and diarrhea. Aloe latex was once sold as a laxative medicine, but in 2002 the U.S. FDA removed it from approved over-the-counter laxatives because manufacturers didn't provide evidence of its safety. Long-term use can upset the body's salt balance and damage the colon.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Decolorization with activated charcoal",
        "To make aloe products safer, manufacturers remove most of the aloin and other anthraquinones from aloe juice, a process called decolorization. It uses activated charcoal, a form of carbon with an enormous internal surface area. Aloin molecules stick to the charcoal's surface and are removed when the charcoal is filtered out. The process also removes the yellow color, which is where its name comes from. Decolorized aloe is used in most cosmetics and drinks.",
        [
          ["Mixing", "Aloe juice or gel extract is stirred with activated charcoal. Activated charcoal is made by heating carbon-rich materials such as coconut shells with steam or chemicals, which carves out a maze of tiny pores. A single gram can have a surface area of several hundred square meters."],
          ["Adsorption", "Flat, ring-shaped molecules like aloin and other anthraquinones are drawn to the flat carbon surfaces inside the charcoal and stick to them, a process called adsorption. Unlike absorption, the molecules cling to the surface rather than soaking in. Large polysaccharides such as acemannan stick far less, so they stay in the juice."],
          ["Filtering", "The charcoal, with the aloin attached, is filtered out. What remains is a clear aloe juice containing much less aloin. The process can be repeated to reach the purity required."],
        ],
        "Decolorized aloe typically contains less than 10 parts per million of aloin, the industry's safety specification for products meant to be eaten or drunk. This removes the laxative effect and the cancer concerns linked to whole-leaf extract.",
      ),
    ],
    hazards: [
      hz(
        "Whole-leaf extract and aloin",
        "The main safety concern about aloe vera involves whole-leaf extract that hasn't been decolorized, especially when swallowed. This kind of extract contains aloin and other anthraquinones from the leaf's latex. In a two-year study by the U.S. National Toxicology Program, rats that drank water containing whole-leaf aloe extract developed tumors in the large intestine. As a result, in 2015 the International Agency for Research on Cancer classified non-decolorized whole-leaf aloe extract as possibly carcinogenic to humans (Group 2B). Decolorized aloe and the inner-leaf gel used in cosmetics aren't covered by that classification.",
        "Once gut bacteria convert aloin and related anthraquinones into aloe-emodin and similar molecules, these can irritate the lining of the colon. In laboratory tests, aloe-emodin has shown some ability to damage DNA. Long-term exposure means repeated irritation and faster cell turnover in the colon. Over time, that could increase the chance of harmful mutations. Removing the anthraquinones by decolorization eliminates this concern.",
        "In the rat study, long-term exposure led to inflammation, overgrowth of the cells lining the colon and eventually tumors. In people, long-term use of aloe latex as a laxative has been linked to a darkening of the colon lining called melanosis coli, although its connection to cancer is unclear. Human evidence overall is limited. Putting aloe gel on the skin isn't considered a cancer risk. Choosing decolorized aloe products for drinking avoids the concern entirely.",
      ),
      hz(
        "Allergy",
        "Allergic reactions to aloe vera are uncommon but do happen. They are more likely in people who are allergic to related plants once grouped with aloe in the lily family, such as garlic, onions and tulips. Reactions can include skin rashes from creams and gels or digestive upset from products that are swallowed. Testing a small amount on the skin before using a new product can reveal a sensitivity. Most people use aloe without any trouble.",
        "Allergies are usually triggered by specific proteins or other molecules that the immune system mistakes for threats. Aloe contains plant proteins that can cause allergic reactions in sensitive people. Anthraquinones from the latex, if present, can also act as allergens or irritants. People who are already allergic to similar plants may react because their immune systems recognize similar molecules, a phenomenon called cross-reactivity. Decolorized products contain fewer anthraquinones.",
        "Skin reactions can include redness, itching, hives or eczema where the product was applied, and occasionally more widespread rashes. Swallowing aloe products can cause abdominal cramps or diarrhea, which may be irritation rather than allergy. People with known allergies to related plants should be cautious. Stopping the product usually resolves the symptoms. A doctor can help confirm the cause if reactions keep happening.",
      ),
    ],
    dosage:
      "Cosmetic aloe vera products contain anything from a few percent of aloe gel to nearly pure gel, and cosmetic grades are decolorized so that aloin is typically below 50 parts per million. Aloe products meant to be eaten or drunk should be decolorized to below 10 parts per million aloin, according to industry standards. The Cosmetic Ingredient Review has concluded that aloe ingredients are safe in cosmetics when aloin is kept low. Whole-leaf, non-decolorized aloe shouldn't be swallowed regularly. Aloe latex laxatives are no longer approved in the U.S.",
    synthesis: [
      route(
        "Harvesting and processing",
        "Aloe vera gel is extracted from the leaves of the aloe plant rather than made in a laboratory. The plants are grown on farms in warm, dry regions such as Mexico, Texas, the Caribbean and parts of Africa and Asia. They take about three years to mature before their leaves are harvested. The thick leaves store water in a clear gel, which helps the plant survive drought. Processing has to be fast, because the gel starts breaking down soon after harvest.",
        "Mature leaves are cut from the plant and washed. They are stood upright so the yellow, aloin-rich latex can drain out. The tough green rind is then removed, leaving the clear inner fillet of gel. The gel is crushed and blended, filtered to remove fibers, and treated with activated charcoal to strip out the remaining aloin. Finally, stabilizers such as vitamin C and citric acid or preservatives are added to slow spoilage, and the gel may be concentrated or dried into a powder.",
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
        "Shea butter is mostly triglycerides, fat molecules made of glycerol and three fatty acids. Its main fatty acids are stearic acid, which is saturated and straight, and oleic acid, which is unsaturated and kinked. That mix makes shea butter solid at room temperature but soft enough to melt at about body temperature. On skin, it melts and spreads into a thin film that fills the gaps between dry skin cells. The film is semi-occlusive, meaning it slows water loss without sealing the skin completely.",
        "By forming a protective film, shea butter slows the evaporation of water from the skin, keeping it hydrated for longer. Filling the gaps between rough skin cells makes the surface feel smoother and softer straight away. That is why shea butter is often recommended for very dry skin, cracked heels, chapped lips and eczema-prone skin. Some studies have found that moisturizers containing shea improve eczema symptoms. It is also used in hair care to soften and protect hair.",
        "human",
      ),
      mech(
        "Anti-inflammatory triterpenes",
        "Shea butter contains an unusually large share of unsaponifiables, components that don't turn into soap when treated with lye, up to about 10 percent. These include triterpene alcohols and their esters, such as lupeol cinnamate and amyrin cinnamate. In laboratory studies, these triterpenes blocked enzymes involved in inflammation, such as cyclooxygenase-2 (COX-2), and reduced signaling through inflammatory pathways like NF-κB. They may also act as antioxidants. The amounts vary between shea butters from different regions.",
        "These triterpenes may help explain shea butter's reputation for soothing irritated skin, reducing redness and calming minor inflammation. Traditional healers in West Africa have long used shea butter for skin problems, sprains and small wounds. Most of the evidence for its anti-inflammatory effect, however, comes from laboratory and animal studies. Good-quality human studies are limited. Highly refined shea butter may contain less of these compounds than unrefined shea.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Saponification and the unsaponifiables",
        "When fats and oils are mixed with a strong base like lye, they undergo saponification, the reaction that makes soap. Most of the fat in shea butter, the triglycerides, turns into soap. But shea butter contains an unusually large amount of other substances, called unsaponifiables, that don't react. These stay in the soap unchanged. That is one reason soap makers value shea butter.",
        [
          ["Soap formation", "Hydroxide ions from the lye attack the ester bonds linking fatty acids to glycerol in the triglycerides. Each ester bond breaks, releasing glycerol and turning the fatty acids into their sodium salts. Those salts are soap molecules."],
          ["Leftovers", "Triterpene alcohols, sterols and the other unsaponifiables either lack the same kind of ester bonds or have bonds that barely react under soapmaking conditions. Some triterpene esters react only very slowly. So these molecules don't become soap."],
          ["Result", "The unsaponifiables remain in the finished bar as separate molecules mixed among the soap. They are oily and don't dissolve in water. They can make the soap feel softer and more conditioning on skin."],
        ],
        "Shea soaps keep some of shea's unsaponifiable components, which soap makers prize. Measuring the unsaponifiable content is also one way to check the quality and authenticity of shea butter.",
      ),
      rxn(
        "Crystallization and graininess",
        "Sometimes shea butter develops a grainy texture, with small, gritty lumps, even though it is still perfectly usable. That happens because of the way its fats crystallize after melting and cooling. Fats can crystallize in several different forms, called polymorphs, each with its own structure and melting point. Unstable crystal forms can grow into large grains. The same problem affects chocolate, which can develop a whitish bloom.",
        [
          ["Melting", "Shea butter melts at around body temperature, so it can melt during shipping or storage in hot weather. Once melted, all its fat molecules move freely. The orderly crystal structure is lost."],
          ["Slow cooling", "As it cools slowly, the triglycerides richest in stearic acid, which melt at higher temperatures, crystallize first, ahead of the others. They may form unstable crystal types. These first crystals act as seeds."],
          ["Grains", "Over time those early crystals grow larger, forming gritty lumps scattered through the softer butter. The grains melt on contact with skin, so they don't affect how it works, but they change the texture."],
        ],
        "Tempering, controlled heating and cooling as done with chocolate, keeps shea butter smooth. Manufacturers melt it completely and then cool it quickly, sometimes while stirring, so that small, stable crystals form evenly. Grainy shea butter can be fixed at home the same way.",
      ),
    ],
    hazards: [
      hz(
        "Very low hazard",
        "Shea butter is one of the safest ingredients in skincare. Botanically, shea is a tree nut, which raises questions for people with tree-nut allergies. However, refined shea butter contains almost no protein, and allergies are triggered by proteins. Allergic reactions to shea butter applied to the skin are very rare, even among people with tree-nut allergies. Allergy specialists generally consider refined shea butter low-risk for them.",
        "Food allergies are caused by specific proteins that the immune system mistakes for threats. Shea nuts contain proteins, but when shea butter is extracted and refined, the fat is separated from almost all of them. Refined shea butter contains only trace amounts of protein, often too little to detect. Unrefined shea butter may contain slightly more. The fat molecules themselves don't trigger allergy.",
        "Because the allergy-triggering proteins are largely removed, shea butter rarely causes allergic reactions on the skin. Studies have found no detectable shea proteins in many refined shea butters. People with severe tree-nut allergies who are worried can choose refined shea butter or ask their allergist. Shea butter is generally considered gentle enough for babies and unlikely to clog pores. Very occasionally, someone may experience mild irritation.",
      ),
    ],
    dosage:
      "Shea butter is used at every concentration from a few percent in lotions to 100 percent in pure shea balms. The Cosmetic Ingredient Review has concluded that shea butter is safe as used in cosmetics. It is also a food: an ingredient in chocolate and a cooking fat in West Africa, and in the European Union it is one of six vegetable fats allowed to replace up to 5 percent of the cocoa butter in chocolate. Even people with tree-nut allergies rarely react to refined shea butter. There is no meaningful upper limit for use on the skin.",
    synthesis: [
      route(
        "Traditional extraction",
        "In West Africa, shea butter has been made by hand for centuries, mainly by women, who often work together in cooperatives. The shea tree grows wild across the Sahel, from Senegal to Sudan, and its nuts are gathered from the ground after the fruit falls. Making shea butter by hand is hard work that takes many hours. Much of the world's shea butter still passes through these women's hands. It is an important source of income in rural communities.",
        "The fallen fruits are collected and their fleshy pulp is removed. The nuts are boiled, dried in the sun and cracked open to free the kernels inside. The kernels are roasted and ground into a thick paste, which the women knead by hand with water for a long time until the fat separates and rises to the surface as a creamy mass. The fat is skimmed off and boiled to drive off water and impurities. It is then filtered and left to cool and set into shea butter.",
        { significance: "The shea trade provides income for millions of women in the Sahel, earning shea the nickname “women's gold”." },
      ),
      route(
        "Industrial refining",
        "For cosmetics, chocolate and food, shea butter is often refined in factories. Refining removes its natural smell, yellowish color and impurities, producing a white, odorless fat. Industrial extraction can also use mechanical presses or solvents to recover more fat from the kernels. Refined shea butter is more consistent, but some of its beneficial unsaponifiable compounds may be reduced. Both refined and unrefined shea butter are sold.",
        "Shea kernels are crushed and pressed in mechanical expellers, or the fat is dissolved out with a solvent such as hexane, which is then evaporated. The crude shea butter is refined in several steps. Free fatty acids are removed, and the fat is bleached with special clays that soak up pigments and impurities. It is then deodorized by passing steam through it at high temperature under vacuum, which carries away odor-causing molecules. Some shea butter is also fractionated, split into softer and harder portions for different uses.",
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
        "EDTA has six atoms that can bond to a metal ion: two nitrogen atoms and four oxygen atoms from its carboxylate groups. When it meets a metal ion, the EDTA molecule wraps around it and forms six bonds at once, arranged in an octahedral shape like a cage. A molecule that grabs a metal ion from several points is called a chelator, from the Greek word for claw. Because one EDTA molecule holds on from six points, the complex is far more stable than if six separate molecules each formed one bond. Chemists call this the chelate effect.",
        "Metal ions such as iron and copper speed up oxidation, which makes oils go rancid, colors fade and fragrances change. Calcium and magnesium from hard water react with soap to form scum and reduce cleaning power. By locking these metal ions away, EDTA prevents all of these problems. Products stay stable, clear and effective for longer. That is why EDTA turns up in shampoos, soaps, creams and some foods, such as canned beans and mayonnaise.",
        "established",
      ),
      mech(
        "Boosting preservatives",
        "Gram-negative bacteria have an outer membrane coated with molecules called lipopolysaccharides (LPS), which are held together partly by calcium and magnesium ions that bridge neighboring LPS molecules. These bridges keep the outer membrane tight and resistant to many chemicals. EDTA grabs those calcium and magnesium ions and pulls them out of the membrane. Without the bridges, LPS molecules come loose, and the outer membrane becomes disorganized and leaky. It is like removing the mortar from a brick wall.",
        "With a leaky outer membrane, Gram-negative bacteria such as Pseudomonas and E. coli become much more vulnerable to preservatives that would otherwise struggle to get in. That means lower concentrations of preservative can protect a product. This teamwork matters because Gram-negative bacteria are among the most common contaminants of cosmetics. EDTA isn't a strong antimicrobial on its own, but it greatly boosts other preservatives. That is why it is called a preservative booster.",
        "lab",
      ),
      mech(
        "Treating lead poisoning",
        "EDTA binds different metals with different strengths, and it holds lead much more tightly than calcium. In calcium disodium EDTA, each EDTA molecule is already holding a calcium ion. When it meets lead in the body, the lead pushes the calcium out, because EDTA prefers lead. The result is a lead–EDTA complex that is very stable and dissolves in water. Using the calcium form stops EDTA from pulling calcium out of the blood.",
        "The lead–EDTA complex is filtered out by the kidneys and leaves the body in urine, taking the lead with it. This treatment, called chelation therapy, is used under medical supervision for people with high blood lead levels, which can damage the brain, nerves and kidneys. It is especially important for children, whose developing brains are vulnerable to lead. Giving the wrong form, disodium EDTA instead of calcium disodium EDTA, has caused deaths by dangerously lowering blood calcium. Chelation therapy is used only for confirmed metal poisoning, not as a general “detox.”",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Chelation",
        "Chelation is a reaction in which one molecule binds a metal ion from several points at once. EDTA is one of the most powerful chelators known, gripping a metal ion through six atoms. The reaction is fast and forms a very stable complex. It is the basis of EDTA's uses in cosmetics, food, medicine and laboratories. Chemists even use EDTA to measure how much calcium and magnesium are in water, which is what “water hardness” means.",
        [
          ["Deprotonation", "EDTA has four carboxylic acid groups, each of which can release a hydrogen ion (H⁺). In solution, especially at neutral or higher pH, these groups lose their protons and become negatively charged carboxylates. Disodium EDTA has already lost two of them."],
          ["Wrapping", "When EDTA meets a metal ion such as calcium (Ca²⁺), its two nitrogen atoms and four carboxylate oxygens close around the metal, forming six bonds. The molecule folds into a cage that surrounds the ion completely. The metal is now trapped."],
          ["Release", "As the remaining acid groups bind to the metal, they release their protons into the solution, which becomes slightly more acidic. The finished complex carries an overall negative charge."],
        ],
        "Chelation is why EDTA is used in blood-collection tubes: removing calcium stops the blood from clotting, so the sample can be tested. It is also the basis of a lab method called complexometric titration, used to measure water hardness.",
        "Ca2+ + H2Y^2- → CaY^2- + 2 H+",
      ),
      rxn(
        "Synthesis",
        "EDTA is made in chemical plants from three main starting materials: ethylenediamine, formaldehyde and sodium cyanide. The process attaches four acetate arms to ethylenediamine's two nitrogen atoms. It uses a type of reaction related to the Strecker synthesis, a classic method for making amino acids. The process gives tetrasodium EDTA, which can be partly acidified to make disodium EDTA. Large amounts are made every year for industrial and consumer uses.",
        [
          ["Addition", "Ethylenediamine, a small molecule with two amine groups (–NH₂), reacts with formaldehyde and sodium cyanide in water. Each of the four hydrogen atoms on its two nitrogens is replaced by a –CH₂CN group, a carbon attached to a cyanide group. This is a Strecker-type reaction."],
          ["Hydrolysis", "The cyanide groups (–CN), called nitriles, are hydrolyzed in a basic solution. Water attacks each carbon–nitrogen triple bond, turning the nitrile into a carboxylate group (–COO⁻) and releasing ammonia. The product is tetrasodium EDTA."],
          ["Adjustment", "Tetrasodium EDTA is partly acidified, turning two of its four carboxylate groups back into carboxylic acids. This gives disodium EDTA, which is crystallized and dried."],
        ],
        "Four acetate arms are added in one process, creating the six-armed chelator. The ammonia released is captured and reused or removed.",
        "H2NCH2CH2NH2 + 4 CH2O + 4 NaCN + 4 H2O → Na4EDTA + 4 NH3",
      ),
    ],
    hazards: [
      hz(
        "Low toxicity in products",
        "Disodium EDTA is considered safe at the concentrations used in cosmetics and foods. It is poorly absorbed through both the skin and the gut, so very little reaches the bloodstream from these sources. Concerns arise mainly with intravenous use in medicine, where it can lower blood calcium. Environmentally, EDTA is a concern because it breaks down slowly and can carry metals around in waterways. In everyday products, it poses very little risk to people.",
        "EDTA's strongly charged structure makes it hard for it to cross the fatty layers of the skin and the gut lining; only about 5 percent or less of a swallowed dose is absorbed. When EDTA does reach the blood in large amounts, it binds calcium and magnesium and lowers the levels of these free ions available to the body. The body doesn't break EDTA down, so any absorbed EDTA leaves unchanged in urine. In the environment, it also resists breakdown by bacteria. That persistence is the main environmental worry.",
        "Calcium is essential for nerve and muscle function, including the heartbeat. When EDTA lowers blood calcium quickly, as can happen with intravenous disodium EDTA, it can cause muscle spasms, an irregular heartbeat and, in extreme cases, cardiac arrest. That is why chelation therapy is done only under medical supervision with the safer calcium disodium form. At cosmetic and food levels, none of this happens. Environmental concerns have led some manufacturers to switch to biodegradable alternatives.",
      ),
    ],
    dosage:
      "Cosmetics typically contain about 0.05 to 0.2 percent disodium EDTA. In foods, calcium disodium EDTA is used in small amounts in products such as mayonnaise, salad dressings and canned foods to prevent spoilage and discoloration. International experts (JECFA) have set an acceptable daily intake of 2.5 milligrams per kilogram of body weight for calcium disodium EDTA. The Cosmetic Ingredient Review has concluded that EDTA salts are safe in cosmetics at current levels. Medical chelation therapy uses much higher doses, and only under supervision.",
    synthesis: [
      route(
        "Industrial synthesis",
        "EDTA was first developed in 1935 by the German chemist Ferdinand Münz, who was looking for a substitute for citric acid in textile dyeing, where metal ions in the water interfered with dyes. Today it is made from ethylenediamine, formaldehyde and sodium cyanide. It is one of the most widely used chelating agents in the world. It goes into detergents, papermaking, photography, medicine, food and cosmetics. Most is produced as tetrasodium EDTA.",
        "Ethylenediamine is reacted with formaldehyde and sodium cyanide in water under carefully controlled conditions. The reaction attaches a –CH₂CN group to each of the four nitrogen–hydrogen positions. As the reaction continues in the basic solution, the nitrile groups are hydrolyzed into carboxylate groups, releasing ammonia gas, which is removed. The product is tetrasodium EDTA. To make disodium EDTA, the tetrasodium form is partly acidified, and the disodium salt is crystallized and dried.",
        { significance: "Because EDTA breaks down so slowly in nature, chemists have developed biodegradable chelators such as GLDA and MGDA to replace it in some products." },
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
        "Oxybenzone has two benzene rings joined by a carbonyl group (C=O), forming a conjugated system that absorbs ultraviolet light. One ring carries a hydroxyl group (–OH) right next to the carbonyl, and the two are linked by an internal hydrogen bond. When the molecule absorbs a UV photon, that energy makes the hydrogen jump from the hydroxyl oxygen to the carbonyl oxygen in femtoseconds, a process called excited-state intramolecular proton transfer. This briefly rearranges the molecule into an unstable form. The molecule then relaxes, the hydrogen jumps back, and the absorbed energy is released as heat.",
        "By converting UV energy into harmless heat, oxybenzone keeps UV light from reaching skin cells and damaging their DNA. It absorbs UVB, which causes sunburn, and short-wavelength UVA, which contributes to skin aging and cancer. The tiny amount of heat released is negligible. Because the molecule returns to its original form, it can repeat the cycle many times. It still breaks down gradually in sunlight, though, so sunscreens need reapplying.",
        "established",
      ),
      mech(
        "Absorption into the body",
        "Oxybenzone is a small, fairly fat-soluble molecule, so it can pass through the fatty layers of the skin's outer barrier into the deeper layers, where blood vessels carry it away. Once in the bloodstream, it travels throughout the body. The liver converts some of it into other molecules, such as benzophenone-1, and attaches sugars to some of it to help excretion. It leaves the body mainly in urine. National surveys have found oxybenzone in the urine of most people tested.",
        "In clinical trials run by the U.S. FDA in 2019 and 2020, people who applied sunscreen as directed had oxybenzone levels in their blood hundreds of times higher than the threshold at which the FDA asks for additional safety testing. That doesn't mean it is harmful, only that more study is needed. Oxybenzone has also been found in breast milk and amniotic fluid. Its long-term health effects in people aren't fully known. The FDA has asked manufacturers for more safety data.",
        "human",
      ),
      mech(
        "Hormone activity in lab studies",
        "Oxybenzone and its breakdown product benzophenone-1 have shapes that let them bind weakly to estrogen receptors, the proteins that respond to estrogen hormones. They can also block androgen receptors, which respond to male hormones such as testosterone. In laboratory tests on cells, they produce weak hormone-like effects. Benzophenone-1 is more active than oxybenzone itself in these tests. The binding is much weaker than that of the body's own hormones.",
        "In animal studies using high doses of oxybenzone, researchers have seen effects on reproductive organs and hormone levels. Some observational studies in people have hinted at links between oxybenzone exposure and changes in hormone levels or birth outcomes, but studies like these can't prove cause and effect. The animal doses were often much higher than what people get from sunscreen. Overall, how much these findings matter for people is uncertain. Some choose mineral sunscreens as a precaution.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Excited-state proton transfer",
        "Oxybenzone protects against UV through a remarkable molecular trick called excited-state intramolecular proton transfer (ESIPT). When it absorbs light, a proton shifts within the molecule, letting the absorbed energy be released safely. The whole cycle takes less than a trillionth of a second. This lets one molecule absorb many photons without being destroyed. Many UV filters, and some natural molecules, use similar tricks.",
        [
          ["Absorption", "Oxybenzone's conjugated rings and carbonyl group absorb a UV photon. The energy lifts an electron to a higher energy level, putting the molecule into an excited state. In that state its electrons are rearranged."],
          ["Proton hop", "In the excited state, the carbonyl oxygen becomes more attractive to protons and the hydroxyl oxygen less so. The proton on the –OH group, already hydrogen-bonded to the carbonyl, jumps across to the carbonyl oxygen in femtoseconds."],
          ["Relaxation", "The rearranged molecule quickly sheds its extra energy as heat by vibrating, settling back into its lowest-energy state. The proton then jumps back to where it started. The molecule is restored and ready to absorb another photon."],
        ],
        "Because the molecule resets itself, one oxybenzone molecule can absorb many photons, although it still degrades slowly in sunlight. That is why sunscreens containing it need to be reapplied, typically every two hours.",
      ),
      rxn(
        "Synthesis",
        "Oxybenzone is made in chemical plants in two main steps. The first builds a benzophenone with two hydroxyl groups, using resorcinol and benzotrichloride. The second converts one of those hydroxyl groups into a methoxy group while leaving the other alone. The key is to keep the hydroxyl group next to the carbonyl, because that is essential for UV protection. The product is a pale yellow powder.",
        [
          ["Acylation", "Resorcinol, a benzene ring with two –OH groups, reacts with benzotrichloride, a benzene ring carrying three chlorine atoms on one carbon. In the presence of water, the trichloride behaves like an acid chloride and attaches a benzoyl group to resorcinol's ring. This forms 2,4-dihydroxybenzophenone."],
          ["Selective methylation", "2,4-Dihydroxybenzophenone has two –OH groups. The one at position 4, away from the carbonyl, is more reactive, while the one at position 2 is held in place by its hydrogen bond to the carbonyl. A methylating agent such as dimethyl sulfate converts the 4-hydroxyl into a methoxy group (–OCH₃)."],
          ["Purification", "The crude product is crystallized to remove leftover starting materials and byproducts, such as molecules in which both –OH groups were methylated. The result is pure oxybenzone."],
        ],
        "Leaving the –OH next to the carbonyl untouched preserves the internal hydrogen bond that makes it a UV filter. If both –OH groups were methylated, the molecule would no longer protect against UV effectively.",
      ),
    ],
    hazards: [
      hz(
        "Photoallergy",
        "Oxybenzone is one of the most common causes of allergic reactions to sunscreen. These reactions are often photoallergies, meaning they happen only when the skin is exposed to both oxybenzone and sunlight. The American Contact Dermatitis Society named benzophenones Allergen of the Year in 2014. Photoallergy can be confusing, because people may think they are reacting to the sun itself. Patch testing combined with a dose of UV light, called photopatch testing, can identify the cause.",
        "When oxybenzone absorbs UV light, it normally releases the energy safely as heat. Occasionally, though, a molecule is converted into a reactive form or breakdown product. That reactive molecule can bond to proteins in the skin, acting as a hapten. The modified proteins are then recognized as foreign by the immune system. Because UV light is needed to create the reactive form, the allergy shows up only on sun-exposed skin.",
        "In sensitized people, putting on oxybenzone sunscreen and then going into the sun causes an itchy, red, sometimes blistering rash, usually one to two days later. The rash is limited to skin that was both covered in sunscreen and exposed to sunlight, such as the face, neck and arms. Some people also react without sunlight, as an ordinary contact allergy. Switching to sunscreens without oxybenzone, such as mineral sunscreens, usually solves the problem. Dermatologists can confirm the cause with photopatch testing.",
      ),
      hz(
        "Coral reef concerns",
        "In 2018, Hawaii became the first U.S. state to pass a law banning the sale of sunscreens containing oxybenzone and octinoxate to protect coral reefs, and the ban took effect in 2021. Other places, including the U.S. Virgin Islands and the Pacific nation of Palau, have passed similar restrictions. The concern comes from laboratory studies showing that oxybenzone can harm corals. Scientists debate how much real-world sunscreen pollution matters compared with major threats such as ocean warming. Still, many beachgoers now choose reef-friendly sunscreens.",
        "When people swim or shower with sunscreen on, oxybenzone washes off into the water. Near crowded beaches, oxybenzone in coastal water can reach measurable, though usually very low, concentrations. Corals can absorb it into their tissue. In sunlight, oxybenzone inside corals can be converted into reactive products, some of them attached to sugars, that may be toxic to coral cells. These reactions may increase oxidative stress in the coral.",
        "Laboratory studies have found that oxybenzone can damage the DNA of coral larvae, deform their growth and promote coral bleaching, in which corals expel the algae living in their tissues that give them color and food. Bleached corals are more likely to die. However, many of these studies used higher concentrations than are found on most reefs. Ocean warming, pollution and overfishing are considered far greater threats to coral reefs. Restrictions on oxybenzone are seen as a precaution.",
      ),
    ],
    dosage:
      "In the United States, sunscreens may contain up to 6 percent oxybenzone; in the European Union it is limited to 6 percent in face and hand products and 2.2 percent in body products and sprays. Applying sunscreen generously over the whole body, as recommended, leads to measurable absorption into the blood, and the U.S. FDA has asked for more safety data. People with sunscreen allergies or concerns about absorption can choose mineral sunscreens with zinc oxide or titanium dioxide. Several places, including Hawaii, restrict its sale to protect coral reefs. Despite these questions, wearing sunscreen remains far safer than unprotected sun exposure.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Oxybenzone is made in chemical plants from resorcinol, a petroleum-derived chemical. It was one of the first broader-spectrum UV filters, coming into wide use in sunscreens in the 1980s. Before then, sunscreens mainly protected against UVB, which causes sunburn. Oxybenzone extended protection into part of the UVA range. It is also used in plastics, paints and nail polish to keep them from fading in sunlight.",
        "Resorcinol is reacted with benzotrichloride, which attaches a benzoyl group to the resorcinol ring, forming 2,4-dihydroxybenzophenone. This intermediate has two –OH groups on one ring. It is then treated with a methylating agent, such as dimethyl sulfate or methyl chloride, under carefully controlled conditions that selectively convert the –OH at position 4 into a methoxy group. The –OH at position 2, held by its hydrogen bond to the carbonyl, is left alone. The crude oxybenzone is purified by crystallization.",
        { significance: "Mineral filters (zinc oxide, titanium dioxide) and newer organic filters offer protection without oxybenzone." },
      ),
    ],
  },
};
