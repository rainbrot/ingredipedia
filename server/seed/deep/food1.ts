import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const FOOD_DEEP_1: Record<string, DeepProfile> = {
  water: {
    overview: [
      "Water is a small, bent molecule (H₂O): one oxygen atom bonded to two hydrogen atoms at an angle of about 104.5°. Oxygen pulls the shared electrons toward itself, so the molecule is polar, with a partial negative charge on the oxygen and partial positive charges on the hydrogens.",
      "That polarity lets water molecules form hydrogen bonds with each other and with ions and other polar molecules. It is why water dissolves salt, sugar and acids so well (its nickname is the “universal solvent”), why it boils at an unusually high 100 °C for such a light molecule, and why ice floats: in the solid, molecules lock into an open hexagonal lattice that is less dense than the liquid.",
    ],
    mechanisms: [
      mech(
        "Dissolving and transporting nutrients",
        "Water is a polar molecule, which means its electric charge is spread unevenly: the oxygen end carries a slight negative charge and the two hydrogen ends carry slight positive charges. When a crystal of salt drops into water, the water molecules turn so that their oppositely charged ends face each ion, oxygen toward positive ions such as Na⁺ and hydrogen toward negative ions such as Cl⁻. Each ion ends up wrapped in a cluster of water molecules called a hydration shell. Forming these shells releases energy, and that energy helps pull the ions away from the crystal one by one. Polar molecules such as sugar dissolve in a similar way, by forming hydrogen bonds, weak attractions between a hydrogen on one molecule and an oxygen or nitrogen on another. Oils have no charged regions for water to grab, which is why they don't dissolve.",
        "Because so many substances dissolve in it, water is the body's delivery system. Blood plasma, the liquid part of blood, is about 90 percent water; it carries dissolved glucose, salts and hormones to every organ, and red blood cells are swept along in it. Inside each cell, water is the medium in which nearly all chemical reactions happen, since molecules have to move around and bump into each other in order to react. Waste products dissolve too, and the kidneys filter the blood and flush water-soluble wastes such as urea out in urine. An adult loses roughly two to three liters of water a day through urine, sweat and breath, so it has to be replaced constantly from drinks and food.",
        "established",
      ),
      mech(
        "Hydrating the skin barrier",
        "The outermost layer of skin, the stratum corneum, is made of flattened dead cells packed with a tough protein called keratin and glued together by fatty substances. Water molecules form hydrogen bonds with keratin and with a mix of small, water-attracting molecules in the skin known as natural moisturizing factor, which includes amino acids, urea and lactate. Tucked between the protein chains, water acts as a plasticizer, a substance that makes a material softer and more flexible by letting its long molecules slide past one another. It works the way a little water turns dry, crumbly clay into something you can bend. When the skin dries out, the protein chains pack tightly together and the layer becomes stiff.",
        "Well-hydrated skin stays flexible, so it can stretch as you move without cracking. The outer layer normally contains roughly 15 to 30 percent water, and when it drops much below about 10 percent the skin feels tight, looks dull and may flake. Dry indoor air, cold wind, long hot showers and harsh soaps all speed up the loss of water from the surface. Moisturizers fight this in two ways: humectants such as glycerin pull water into the skin, and occlusives such as petrolatum or oils form a film that slows evaporation. Plain water evaporates within minutes, which is why splashing your face without following with a moisturizer can leave it feeling drier than before.",
        "established",
      ),
      mech(
        "Cooling the body",
        "Turning liquid water into vapor means breaking the hydrogen bonds that hold neighboring water molecules together, and that takes energy. The amount needed is called the heat of vaporization, and for water it is about 2,260 joules for every gram, among the highest of any common liquid. That is more than five times the energy needed to heat the same gram of water all the way from freezing to boiling. The energy has to come from somewhere, so when water evaporates from a surface it takes heat from that surface. This is why a wet surface always cools as it dries.",
        "Your body uses this chemistry as its main way to get rid of extra heat. When your core temperature rises during exercise or on a hot day, the brain signals millions of sweat glands in the skin to release a watery fluid. As each gram of sweat evaporates, it carries about 2,260 joules of heat away from the skin, cooling the blood flowing just underneath. Sweat that drips off without evaporating doesn't cool you, which is why humid days feel so much hotter: the air is already full of water vapor, so sweat evaporates slowly. Sweating a lot without drinking leads to dehydration, which shrinks blood volume and makes it even harder for the body to stay cool.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Autoionization",
        "Even perfectly pure water is not made only of H₂O molecules. At any moment, a tiny fraction of the molecules have passed a proton, the nucleus of a hydrogen atom, to a neighbor. The molecule that gains the proton becomes a hydronium ion (H₃O⁺), and the one that loses it becomes a hydroxide ion (OH⁻). The ions quickly recombine while new pairs form elsewhere, so their numbers stay balanced in what chemists call an equilibrium. This constant, tiny exchange is the reason the pH scale exists at all, and it explains why pure water is called neutral.",
        [
          ["Proton transfer", "A hydrogen atom on one water molecule is attracted to a lone pair, a pair of electrons not being used in a bond, on the oxygen of a neighboring molecule. The hydrogen's proton jumps across and leaves its electron behind. This happens because molecules in a liquid are always jostling and colliding with each other."],
          ["Ion pair", "The molecule that gained the proton becomes hydronium (H₃O⁺), which carries a positive charge. The molecule that lost it becomes hydroxide (OH⁻), which carries a negative charge. Atoms or molecules that carry an electric charge are called ions."],
          ["Equilibrium", "The two ions attract each other and recombine almost instantly, so very few exist at once. At 25 °C only about 1 water molecule in 555 million is split this way at any moment, which works out to 10⁻⁷ moles of each ion per liter. A mole is simply a counting unit chemists use for very large numbers of particles."],
        ],
        "This is where pH 7 comes from. The pH number is the negative logarithm of the hydronium concentration, so 10⁻⁷ moles per liter gives a pH of 7, which is called neutral. Acids add extra hydronium and push the pH below 7, while bases add hydroxide and push it above 7. Each step on the scale is a tenfold change, so lemon juice at pH 3 has ten thousand times more hydronium than pure water.",
        "2 H2O ⇌ H3O+ + OH-",
      ),
      rxn(
        "Hydrolysis",
        "Hydrolysis means “splitting with water.” In this reaction a water molecule breaks a chemical bond in another molecule, and the water's own atoms end up attached to the two pieces. It is one of the most common reactions in both biology and everyday products. Your digestive system depends on it to break fats, proteins and starches into pieces small enough to absorb. The same reaction can slowly break down ingredients in water-based lotions, shampoos and drinks while they sit on a shelf. That is why many products need careful pH control, preservatives and sometimes an expiration date.",
        [
          ["Attack", "The oxygen in water has lone pairs of electrons that are drawn toward atoms with a partial positive charge. In an ester, the carbon of the C=O group (the carbonyl carbon) is electron-poor, because the oxygen atoms around it pull electrons away. Water's oxygen moves in and begins to form a bond with that carbon."],
          ["Cleavage", "With a new bond forming, the carbon can't keep all of its old bonds, so the bond between the carbonyl carbon and the ester's second oxygen breaks. The molecule falls into two pieces. One piece takes water's OH and becomes a carboxylic acid, and the other takes water's H and becomes an alcohol."],
          ["Catalysis", "On its own, water reacts slowly with most bonds. Acids, bases, heat or enzymes such as lipases speed the reaction up enormously by making the carbon more attractive to water or making water a stronger attacker. Anything that speeds up a reaction without being used up is called a catalyst."],
        ],
        "Hydrolysis is how your body digests fats, proteins and starches into pieces it can absorb. In products, it is one reason old lotions can separate, change smell or turn sour, because some ingredients have been split into new substances. Keeping products at the right pH and away from heat slows hydrolysis down.",
        "RCOOR' + H2O → RCOOH + R'OH",
      ),
    ],
    hazards: [
      hz(
        "Water intoxication (hyponatremia)",
        "Drinking water is almost never dangerous, but drinking a very large amount in a short time can be. The risk shows up in unusual situations: endurance athletes who drink far more than they sweat out, drinking contests, or certain medical conditions. It has nothing to do with the water in foods, drinks or personal-care products used normally. The medical name, hyponatremia, means “too little sodium in the blood.” The kidneys of a healthy adult can usually remove about 0.8 to 1 liter of water per hour, so the danger comes from outpacing them for several hours.",
        "Blood contains dissolved sodium at a tightly controlled concentration of about 135 to 145 millimoles per liter. Concentration means how much of a substance is dissolved in a given volume, so adding lots of plain water without adding sodium dilutes it. If someone drinks water faster than their kidneys can get rid of it, roughly 0.8 to 1 liter per hour, the extra water stays in the blood. Blood sodium then falls below about 135 millimoles per liter. Neither the water nor the sodium is harmful on its own; the problem is the change in their ratio.",
        "Cell membranes let water pass through freely by osmosis, the movement of water from a more dilute solution toward a more concentrated one. When the blood becomes more dilute than the fluid inside cells, water flows into the cells and they swell like water balloons. Most organs can stretch a little, but the brain is enclosed by the skull and has very little room to expand. Swelling brain cells raise the pressure inside the head, causing headache, nausea and confusion, and in severe cases seizures or coma. Treatment involves limiting water and, in hospital, carefully raising blood sodium again.",
      ),
      hz(
        "Microbial growth in products",
        "Water is what lets bacteria, yeast and mold live in lotions, shampoos and foods. A completely dry product, like a powder or a pure oil, is a poor home for microbes, but anything containing water can support them. Contamination is the reason water-based products contain preservatives and why opened products have a recommended time limit for use. Dipping fingers into a jar or keeping a product in a warm, steamy bathroom makes contamination more likely. Most of the time the result is just spoilage, but occasionally it can cause infections.",
        "Microbes need liquid water to run their metabolism: nutrients must be dissolved before they can be absorbed, and nearly all the chemical reactions inside a cell take place in water. Food scientists measure how much water is actually available to microbes with a number called water activity, which runs from 0 for bone dry to 1 for pure water. Water that is tightly held by sugar, salt or other dissolved substances is less available, which is why jam and salted meat resist spoilage. Most bacteria need a water activity above about 0.9, while many molds can grow at lower levels. Lotions and shampoos typically have a water activity close to 1.",
        "If microbes get into a water-based product and nothing controls them, they multiply and can reach millions of cells per gram. Some contaminants, such as the bacterium Pseudomonas aeruginosa, can cause skin infections or serious eye infections, especially if a contaminated product is used near the eyes or on broken skin. People with weakened immune systems are at higher risk. Preservatives work by damaging microbial membranes or enzymes, keeping microbe numbers low throughout the product's life. Manufacturers check this by deliberately adding microbes to a sample and confirming that the preservatives kill them, a process called challenge testing.",
      ),
    ],
    dosage:
      "There is no meaningful risk from the water in foods, drinks or personal-care products. Healthy kidneys can clear roughly 0.8 to 1 liter of water per hour, and the body's thirst signals normally keep intake balanced with losses. Problems from drinking too much generally require several liters taken within a few hours, which is why most reported cases involve marathon runners, military training or drinking contests. U.S. health guidelines suggest that adults take in about 2.7 to 3.7 liters of water a day from all sources, including food, with more needed in heat or during exercise. The practical rule is to drink when thirsty, and during long exercise to replace what you sweat rather than drink as much as possible.",
    synthesis: [
      route(
        "The natural water cycle",
        "Earth's water is recycled, not manufactured. Almost all of it has been on the planet since early in its history, moving between oceans, air, ice, rivers, soil and living things. The water in your glass has probably fallen as rain, flowed down rivers and been part of plants and animals many times over. No factory makes new water for products; it is collected, cleaned and reused. The sun is the engine that drives the whole cycle.",
        "The sun's energy warms the surface of oceans, lakes and soil, and the fastest-moving water molecules escape into the air as vapor, a process called evaporation. Dissolved salts and minerals can't evaporate, so they stay behind, which is why rain is fresh even though most of it comes from the salty ocean. As warm, moist air rises, it cools, and the vapor condenses into tiny droplets that form clouds. When the droplets merge and grow heavy enough, they fall as rain or snow. This is the same process as distillation in a laboratory, where a liquid is boiled and its vapor is cooled and collected to separate it from impurities, only carried out on the scale of a whole planet.",
        { significance: "Rainwater is nearly pure, but groundwater dissolves minerals from the rocks it seeps through. The calcium and magnesium picked up this way are what make water “hard.”" },
      ),
      route(
        "Purification for cosmetics and labs",
        "Water used in cosmetics, medicines and laboratories is purified far beyond ordinary tap water. Tap water is safe to drink, but it contains dissolved minerals, traces of chlorine and occasionally microbes. Those can react with ingredients, weaken preservatives or leave deposits. Manufacturers therefore remove almost everything except H₂O, producing what is labeled “purified,” “deionized” or “distilled” water. On an ingredient list it usually appears simply as water or aqua.",
        "Purification combines several techniques, each removing a different kind of impurity. Reverse osmosis pushes water at high pressure through a membrane whose pores are so small that dissolved ions, which travel wrapped in bulky shells of water molecules, can't fit through. Ion exchange then removes the ions that slip past: the water flows over resin beads that grab positive metal ions and release hydrogen ions (H⁺) in their place, while other beads grab negative ions and release hydroxide ions (OH⁻). The H⁺ and OH⁻ immediately combine to form more water, so what remains is very pure. A final step, such as ultraviolet light or an extremely fine filter, kills or removes any microbes left.",
        {
          steps: [
            "Filters remove sand, rust and other particles.",
            "Reverse osmosis pushes the water through a membrane that holds back most dissolved salts.",
            "Ion-exchange resins swap the remaining ions for H⁺ and OH⁻, which combine into water (deionization).",
            "Ultraviolet light or a very fine filter kills or removes microbes.",
          ],
          equation: "H+ + OH- → H2O",
          significance: "Removing calcium, iron and other metal ions keeps products stable and stops these ions from weakening preservatives or reacting with other ingredients.",
        },
      ),
    ],
  },

  sucrose: {
    overview: [
      "Sucrose, table sugar, is a disaccharide: one glucose ring and one fructose ring joined by a glycosidic bond between their most reactive carbons. Because both “reducing” ends are tied up in that bond, sucrose is a non-reducing sugar and is more chemically stable than glucose.",
      "Its eight hydroxyl (–OH) groups make it extremely water-soluble (about 2 kilograms dissolves in a liter of water) and let it hold onto water in baked goods. Plants make sucrose in their leaves during photosynthesis and use it to move energy to roots, fruit and seeds.",
    ],
    mechanisms: [
      mech(
        "Sweet taste",
        "Sucrose has eight hydroxyl groups, oxygen–hydrogen (–OH) pairs that stick out from its two rings. On your tongue, taste cells carry a sweet-taste receptor made of two proteins, called T1R2 and T1R3, that fit together like a pair of cupped hands. The hydroxyl groups of sucrose form a precise pattern of hydrogen bonds, weak attractions between a hydrogen atom and a nearby oxygen or nitrogen, with matching spots inside the receptor. When enough of these bonds form, the receptor protein changes its shape slightly. That shape change is the chemical switch that starts the sweet signal. Other sweet molecules, including artificial sweeteners, work by fitting the same receptor in slightly different ways.",
        "Once the receptor changes shape, it sets off a chain of signaling molecules inside the taste cell, a relay called a signaling cascade. The chain ends with the cell releasing a chemical messenger that excites nearby nerve fibers. The nerves carry the message to the brain, which interprets it as sweetness and often as pleasure. Scientists think this system evolved because sweetness signaled energy-rich foods such as ripe fruit, which helped our ancestors survive. Today the same drive makes sugary foods very appealing even when we don't need the extra energy.",
        "established",
      ),
      mech(
        "Digestion and blood sugar",
        "Sucrose is too large to pass through the gut wall as it is. In the small intestine, an enzyme called sucrase-isomaltase, which sits on the surface of the cells lining the gut, breaks the glycosidic bond, the oxygen bridge that links the glucose ring to the fructose ring. It does this by hydrolysis, using a water molecule to split the bond. An enzyme is a protein that speeds up one particular reaction, and this one works in a fraction of a second. For every sucrose molecule, the result is one free glucose and one free fructose.",
        "Glucose crosses into the blood within minutes, raising blood sugar. The pancreas responds by releasing insulin, a hormone that tells muscle, fat and liver cells to take glucose in and use or store it. Fructose is absorbed by a different transporter called GLUT5 and travels mainly to the liver, where it is turned into glucose, stored as glycogen, or, when large amounts arrive often, converted into fat. Because table sugar has no fiber, protein or fat to slow its digestion, it raises blood sugar faster than foods like whole fruit. Over time, frequent large spikes put extra demand on the body's blood-sugar control system.",
        "established",
      ),
      mech(
        "Tooth decay",
        "Your mouth is home to hundreds of kinds of bacteria, and some of them, especially Streptococcus mutans, feed on sugar. They break sucrose down by fermentation, a way of getting energy without oxygen, and release lactic acid as waste. S. mutans also uses enzymes called glucosyltransferases to string the glucose halves of sucrose into long, sticky chains called glucans. These glucans act like glue, helping bacteria stick to teeth and to each other and building up the film known as plaque. Inside this film, the acid stays trapped against the tooth surface instead of being washed away by saliva.",
        "Tooth enamel is made mostly of hydroxyapatite, a hard mineral built from calcium and phosphate. When the pH at the tooth surface falls below about 5.5, which happens within minutes of eating sugar, hydrogen ions begin dissolving this mineral and pulling calcium and phosphate out of the enamel. Saliva slowly neutralizes the acid and brings minerals back, repairing early damage, but this takes around 20 to 30 minutes or longer. If sugar is eaten again and again throughout the day, the enamel never gets time to recover. Small weak spots then grow into holes, which are cavities, and fluoride in toothpaste helps by making enamel more resistant to acid and speeding up repair.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Inversion (hydrolysis)",
        "Sucrose can be split back into its two building blocks, glucose and fructose, in a reaction called inversion. It happens when sugar is heated with an acid, such as lemon juice or cream of tartar, or when it meets an enzyme called invertase. The name comes from how the sugar solution affects polarized light: sucrose rotates the light one way, while the glucose–fructose mixture rotates it the opposite way. Cooks use this reaction, often without knowing it, to keep candies and syrups smooth instead of grainy. Bees carry it out naturally when they make honey.",
        [
          ["Protonation", "An acid supplies a hydrogen ion (H⁺) that attaches to the oxygen atom bridging the two sugar rings, called the glycosidic oxygen. The added positive charge pulls electrons toward that oxygen and weakens the bonds around it. In the enzyme invertase, part of the protein does the same job as the acid."],
          ["Cleavage", "The weakened bond between the oxygen and the fructose side breaks. Glucose is released, and the fructose part is left behind as a reactive, positively charged fragment. A water molecule quickly attacks this fragment and completes it as a normal fructose molecule."],
          ["Product", "The result is an equal mixture of glucose and fructose called invert sugar. No atoms are lost: one sucrose plus one water molecule become two simple sugars."],
        ],
        "Invert sugar tastes slightly sweeter than sucrose and, more importantly, resists crystallizing, because a mix of two different sugars can't easily line up into orderly crystals. That keeps fondant, sorbet, fudge and jam smooth. Bees add invertase to flower nectar, which is mostly sucrose, and this is a key step in turning it into honey.",
        "C12H22O11 + H2O → C6H12O6 + C6H12O6",
      ),
      rxn(
        "Caramelization",
        "Caramelization is what happens when sugar is heated on its own until it melts and turns brown. It is different from the browning of bread crusts or seared meat, which also needs proteins and is called the Maillard reaction. As the temperature climbs past about 160 °C, sucrose molecules begin to break apart, lose water and recombine into hundreds of new compounds. Some of these are brown, and many have strong smells and flavors: buttery, nutty, fruity and slightly bitter. The longer and hotter the heating, the darker and more bitter the result.",
        [
          ["Melting and splitting", "Above about 160 °C, sucrose crystals melt into a thick liquid. The heat gives the molecules enough energy to break the glycosidic bond, so much of the sucrose splits into glucose and fructose. These simpler sugars are more reactive than sucrose."],
          ["Dehydration", "The sugars lose water molecules from their own structure, a type of reaction called dehydration. This rearranges them into new ring-shaped compounds such as hydroxymethylfurfural. These in-between molecules are highly reactive and don't last long."],
          ["Polymerization", "The reactive fragments join together into larger and larger molecules, a process called polymerization. The large ones absorb light and look brown. Small ones escape as vapor and give caramel its aroma, including buttery-smelling diacetyl and nutty furans."],
        ],
        "The same chemistry, carried out in factories with controlled heating and added reactants such as ammonia or sulfites, produces the caramel colors used in colas, soy sauce and gravies. At home, stopping the heating at the right moment decides whether you get a light, sweet caramel or a dark, bitter one.",
      ),
    ],
    hazards: [
      hz(
        "Excess added sugar",
        "Sugar is not a poison, and a small amount in a balanced diet is fine. The concern is the large amount many people eat every day, often without noticing, from drinks, sweets and processed foods. Eating too much added sugar over months and years is linked to weight gain, type 2 diabetes, fatty liver and tooth decay. Health agencies separate “added” or “free” sugars from the natural sugar inside whole fruit and milk, because the latter comes packaged with fiber, water and nutrients. The risk builds slowly, which is why guidelines focus on daily totals.",
        "Free sugars, meaning sugars added to food plus those naturally present in honey, syrups and juice, are digested very quickly. Enzymes in the small intestine split sucrose into glucose and fructose within minutes, and both are absorbed almost at once. Whole foods slow this down: fiber forms a gel that holds sugar back in the gut, while protein and fat delay how fast the stomach empties. Without those brakes, a sugary drink delivers a large load of glucose and fructose to the blood and liver all at once. Sugar also supplies energy, measured in calories, without making people feel very full, so it's easy to take in more than the body needs.",
        "A rush of glucose triggers a large release of insulin from the pancreas to move the sugar out of the blood. When this happens many times a day for years, especially together with extra body fat and little exercise, cells can become less responsive to insulin, a condition called insulin resistance. The pancreas then has to work harder, and if it can't keep up, blood sugar stays high and type 2 diabetes develops. Meanwhile, large amounts of fructose arriving at the liver are partly turned into fat, which can build up inside the liver itself. Any extra calories that aren't burned are stored as body fat.",
      ),
      hz(
        "Dental caries",
        "Tooth decay, or dental caries, is one of the most common diseases in the world, and sugar is its main dietary cause. For teeth, how often you eat sugar matters more than how much you eat in one sitting. A dessert after a meal does less damage than the same amount of sugar sipped slowly from a drink over an afternoon. Brushing with fluoride toothpaste and limiting sugary snacks between meals greatly reduce the risk. Children are especially vulnerable because their enamel is still maturing.",
        "Every time sugar enters the mouth, bacteria in dental plaque ferment it and release acid, mainly lactic acid. The pH at the tooth surface drops within a few minutes and stays low for roughly 20 to 30 minutes. During that time, hydrogen ions from the acid react with hydroxyapatite, the calcium phosphate mineral of enamel, and pull calcium and phosphate ions out of it, a process called demineralization. Once the sugar is gone, saliva washes away the acid and supplies fresh calcium and phosphate that can rebuild the surface. That rebuilding is called remineralization.",
        "Enamel is constantly losing and regaining minerals, and whether a tooth stays healthy depends on which side wins. With sugar a few times a day, saliva has time to repair the damage between acid attacks. With constant sipping or snacking, the pH stays low for most of the day and repair never catches up. Chalky white spots appear first, then the weakened surface collapses into a cavity, a hole that can reach the softer dentin and eventually the nerve beneath. At that stage the tooth can't heal itself and needs a filling.",
      ),
    ],
    dosage:
      "A teaspoon of sugar (about 4 grams) in a recipe is trivial; what matters is the total over a day. The World Health Organization recommends keeping free sugars below 10 percent of daily energy, and ideally below 5 percent, which is about 25 grams, or six teaspoons, for an adult. A single 12-ounce can of regular soda contains about 39 grams of sugar, already more than that ideal limit. Sweetened drinks, candy, breakfast cereals, flavored yogurts and baked goods supply most added sugar, and U.S. Nutrition Facts labels now list “Added Sugars” on their own line. Sugar inside whole fruit and plain milk does not count toward these limits.",
    synthesis: [
      route(
        "Biological synthesis (photosynthesis)",
        "Every grain of table sugar was originally made by a plant using sunlight. Plants capture energy from light and store it in the chemical bonds of sugars, starting from nothing more than carbon dioxide from the air and water from the soil. Sucrose is the form in which many plants send that stored energy from their leaves to the rest of the plant. Sugar cane and sugar beets are simply plants that store unusually large amounts of it. The whole process is called photosynthesis.",
        "Inside leaf cells are tiny green structures called chloroplasts, which contain chlorophyll, the pigment that absorbs light. The light's energy is used to split water and to charge up energy-carrying molecules called ATP and NADPH. These power a loop of reactions called the Calvin cycle, in which an enzyme named RuBisCO attaches carbon dioxide from the air onto an existing sugar, building three-carbon sugar units. Some of these units are exported into the surrounding cell fluid, where other enzymes assemble them into two larger sugars, UDP-glucose and fructose-6-phosphate. The enzyme sucrose-phosphate synthase joins these two together, and a second enzyme snips off the phosphate group, releasing sucrose.",
        { significance: "Sucrose is the plant's transport sugar: stable, non-reducing (so it doesn't react easily with other molecules) and easy to pump through the phloem, the plant's sap-carrying tubes, to fruit, roots and seeds." },
      ),
      route(
        "Industrial extraction",
        "Sugar refineries don't make sucrose; they extract and purify the sucrose that sugar cane and sugar beets have already made. Cane is a tall tropical grass and beets are root vegetables grown in cooler climates, but the sugar from both is chemically identical. The challenge is separating pure sucrose from everything else in the plant juice, including fibers, proteins, minerals and colored compounds. The process relies on dissolving, filtering, evaporating and crystallizing. The leftovers include molasses, which is used in food, animal feed and fermentation.",
        "First the sugar is released into water: cane is crushed between heavy rollers, while beets are sliced into thin strips and soaked in hot water. The juice is cloudy with impurities, so lime (calcium hydroxide) is added and then carbon dioxide gas is bubbled through it. The two react to form calcium carbonate, chalk-like particles that trap proteins, colored compounds and other impurities as they settle, leaving a clearer juice. That juice is boiled under vacuum, which lowers its boiling point so the sugar doesn't burn, until it becomes a thick syrup. Tiny sugar crystals are added as seeds, and sucrose molecules from the syrup build onto them, growing larger crystals. Finally, centrifuges spin the mixture so fast that the dark liquid, molasses, is flung away from the white crystals.",
        { equation: "Ca(OH)2 + CO2 → CaCO3 + H2O", significance: "Brown sugar is usually white sugar with a little molasses added back, which gives it color, moisture and flavor." },
      ),
    ],
  },

  "sodium-chloride": {
    overview: [
      "Sodium chloride is an ionic compound. Sodium gives up one electron to chlorine, forming Na⁺ and Cl⁻ ions that attract each other strongly. The ions stack into a cubic crystal lattice in which every sodium is surrounded by six chlorides, and every chloride by six sodiums, which is why salt grains are tiny cubes.",
      "When salt dissolves, water's partial charges pull the lattice apart into separate, water-coated ions. Those free ions are what you taste, what lets salt water conduct electricity, and what your nerves use to send signals.",
    ],
    mechanisms: [
      mech(
        "Nerve and muscle signaling",
        "Every cell membrane contains a protein machine called the sodium–potassium pump. Using energy from ATP, the cell's energy currency, it pushes three sodium ions (Na⁺) out of the cell for every two potassium ions (K⁺) it brings in. Because it moves charged particles unevenly, the pump builds up two things at once: a large difference in sodium concentration across the membrane and a small electrical voltage, with the inside of the cell negative compared with the outside. This stored difference is like water held behind a dam, ready to rush through when a gate opens. The gates are channel proteins that let only sodium through when they open.",
        "When a nerve cell receives a strong enough signal, sodium channels in its membrane open and Na⁺ ions rush in, pulled by the negative inside and pushed by the concentration difference. The flood of positive charge flips the voltage across that patch of membrane, which opens the channels in the next patch, so the change travels along the nerve like a falling row of dominoes. This traveling wave is called an action potential. Muscle fibers, including heart muscle, use the same system to trigger each contraction. Every heartbeat, movement and thought depends on it, which is why the body keeps the sodium level in the blood within a narrow range.",
        "established",
      ),
      mech(
        "Salty taste",
        "When salt dissolves in saliva, it separates into sodium ions (Na⁺) and chloride ions (Cl⁻). Some taste cells on the tongue carry a protein called the epithelial sodium channel, or ENaC, a narrow tunnel through the cell membrane that lets sodium ions pass. Because sodium is positively charged, its entry changes the electrical voltage across the taste cell's membrane. This is an unusually direct way of tasting: instead of a molecule fitting into a receptor and changing its shape, the ion itself carries the signal into the cell. Other positive ions, such as potassium, fit the channel less well, which is one reason salt substitutes taste different.",
        "The incoming positive charge makes the taste cell more electrically active, so it releases chemical messengers that excite the nerve fibers connected to it. The brain reads this as “salty.” At low to moderate concentrations salt tastes pleasant, which encourages people and animals to seek out sodium, an essential mineral the body cannot make for itself. At very high concentrations other taste pathways kick in and salt starts to taste unpleasant, which helps prevent overdoing it. Our liking for salt is also shaped by habit: people who cut back for a few weeks often find their taste adjusts and foods start to taste saltier.",
        "established",
      ),
      mech(
        "Blood pressure",
        "Sodium is the main dissolved particle in the fluid outside our cells, including blood plasma. The total concentration of dissolved particles in a fluid is called its osmolality, and the body works hard to keep it constant. When we eat extra salt, the sodium concentration in the blood rises slightly. Sensors in the brain notice this and trigger thirst along with the release of a hormone that tells the kidneys to hold onto water. The extra water dilutes the sodium back to normal, but it also increases the total volume of fluid inside the blood vessels.",
        "With more fluid filling the same vessels, the pressure inside them rises, much like pumping more air into a tire. Over time, a high-salt diet may also affect hormones and make the walls of blood vessels stiffer. Not everyone responds the same way: some people, described as salt-sensitive, show a large rise in blood pressure with salt, and this is more common in older adults and in people with high blood pressure or kidney disease. Randomized controlled trials, in which people are assigned by chance to eat more or less salt, show that cutting sodium lowers blood pressure. High blood pressure, in turn, raises the risk of strokes and heart attacks.",
        "human",
      ),
      mech(
        "Preserving food",
        "When salt dissolves, each sodium and chloride ion gathers a shell of water molecules around itself, called a hydration shell. Water locked into these shells isn't free to move around or take part in other processes. Food scientists measure how much free water is left using water activity, a number that runs from 0 to 1. Enough salt can push the water activity of a food below the level most bacteria need to grow, which is around 0.91. This is the same idea that lets sugar preserve jam.",
        "Microbes are wrapped in a membrane that water can cross. When a bacterium sits in a very salty environment, the water inside the cell is more dilute than the water outside, so water flows out of the cell by osmosis, the movement of water toward a more concentrated solution. The cell shrinks and dries out, and its internal chemistry slows down or stops. Most disease-causing and spoilage bacteria cannot grow under these conditions. This is the principle behind curing ham, salting fish, pickling vegetables in brine and making cheese, methods people have relied on for thousands of years.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Dissolving",
        "Dissolving salt in water looks simple, but at the scale of atoms it is a tug-of-war. In a salt crystal, positive sodium ions and negative chloride ions are held together by strong electrical attractions called ionic bonds. Water molecules are polar, meaning one end is slightly negative and the other slightly positive, so they can tug on these ions. When the pull between water and the ions is strong enough, the crystal comes apart. Strictly speaking, dissolving is a physical change rather than a chemical reaction, because no new substances form: evaporate the water and you get the salt back.",
        [
          ["Attraction", "Water molecules crowd around the crystal and turn so that their slightly negative oxygen ends face the positive sodium ions and their slightly positive hydrogen ends face the negative chloride ions. Ions at the corners and edges of the crystal have the fewest neighbors holding them in place, so they are pulled away first."],
          ["Separation", "As soon as an ion breaks free, it is surrounded by a shell of water molecules, called a hydration shell. The shell stops the ion from rejoining the crystal and lets it spread evenly through the water. This continues layer by layer until the whole crystal is gone or the water can hold no more."],
          ["Entropy", "Breaking up the crystal takes in slightly more energy than forming the hydration shells gives back, so the water gets a little cooler. The process still happens because the ions become far more spread out and disordered, an increase in what scientists call entropy. Left alone, natural systems tend to move toward greater disorder."],
        ],
        "Dissolving salt cools water very slightly, and salty water freezes at a lower temperature than pure water, because the dissolved ions get in the way of water molecules locking into ice crystals. This freezing-point depression is why salt is spread on icy roads. The matching effect on boiling point is too small to matter when you salt pasta water; that salt is there for flavor.",
        "NaCl(s) → Na+(aq) + Cl-(aq)",
      ),
      rxn(
        "Chlor-alkali electrolysis",
        "Electrolysis means using electricity to drive a chemical reaction that would not happen on its own. When an electric current passes through a concentrated solution of salt in water, called brine, it produces three valuable chemicals at once: chlorine gas, hydrogen gas and sodium hydroxide, also known as lye or caustic soda. This chlor-alkali process is one of the largest operations in the chemical industry and uses enormous amounts of electricity. Two metal or carbon plates called electrodes sit in the brine and are connected to a power supply. The positive electrode is called the anode and the negative one the cathode.",
        [
          ["Oxidation at the anode", "Negative chloride ions (Cl⁻) are attracted to the positive anode, where each one gives up an electron. Losing electrons is called oxidation. Two chlorine atoms that have lost their extra electrons pair up into a molecule of chlorine gas (Cl₂), which bubbles off and is collected."],
          ["Reduction at the cathode", "At the negative cathode, water molecules gain electrons, which is called reduction. Each water molecule that gains an electron splits, releasing hydrogen gas (H₂) and leaving behind a hydroxide ion (OH⁻). The hydrogen is collected as a useful byproduct."],
          ["Separation", "A special membrane between the two sides lets positive sodium ions (Na⁺) cross over to join the hydroxide ions, forming sodium hydroxide solution. The membrane blocks chlorine from mixing with the sodium hydroxide, because the two would otherwise react with each other. Keeping them apart lets each product be collected pure."],
        ],
        "From plain salt water, industry gets chlorine for disinfecting drinking water and making PVC plastic, sodium hydroxide for soap, paper and aluminum production, and hydrogen. Household bleach is made by deliberately letting the chlorine and sodium hydroxide react together. That makes salt the starting point for a huge range of everyday products.",
        "2 NaCl + 2 H2O → Cl2 + H2 + 2 NaOH",
      ),
    ],
    hazards: [
      hz(
        "High blood pressure from excess sodium",
        "For most people, the health risk from salt comes from eating too much of it every day for years, not from any single food or meal. High salt intake is one of the leading dietary risk factors for high blood pressure, which usually has no symptoms but quietly strains the heart and blood vessels. Most of the salt people eat is already in processed and restaurant foods such as bread, cheese, cured meats, soups and snacks, not added from the shaker. People with high blood pressure, kidney disease or a family history of heart disease benefit most from cutting back. Eating more potassium-rich foods like fruit, vegetables and beans also helps offset sodium's effect.",
        "When sodium intake stays high day after day, the body keeps holding extra water to keep blood sodium at its normal concentration, so blood volume stays slightly raised. High sodium also seems to make the smooth muscle in artery walls tighter and the walls themselves stiffer over time. Both changes increase the resistance the heart has to pump against. Blood pressure is the force of blood pushing on artery walls, so more volume plus more resistance means higher pressure. The kidneys normally get rid of excess sodium, but in salt-sensitive people they do so less efficiently.",
        "Years of high blood pressure damage the delicate inner lining of arteries, making it easier for fatty plaques to build up and for vessels to narrow, harden or burst. The heart muscle thickens from working harder, which can eventually weaken it. Small blood vessels in the brain, eyes and kidneys are especially vulnerable. This is why high blood pressure raises the risk of stroke, heart attack, heart failure and kidney disease. Because blood pressure usually causes no symptoms until damage is done, health agencies set daily sodium targets for everyone, not only for people who already have high blood pressure.",
      ),
      hz(
        "Acute salt poisoning",
        "Eating a very large amount of salt at once can be dangerous, although it is rare. Cases mostly involve small children who swallow salt or very salty liquids, people who drink seawater, or old-fashioned home remedies that use salt water to make someone vomit. Just a couple of teaspoons can be dangerous for a toddler, whose body is small. The symptoms come from a sudden rise in the sodium level of the blood. Emergency treatment carefully restores the body's water balance.",
        "Swallowing a large amount of salt quickly floods the blood with sodium faster than the kidneys can remove it. Blood sodium then rises above its normal range of about 135 to 145 millimoles per liter, a condition called hypernatremia. The concentration of dissolved particles in the blood becomes much higher than the concentration inside the body's cells. Water always tends to move toward the more concentrated side of a membrane, and in this case that means out of the cells and into the blood.",
        "As water leaves by osmosis, cells throughout the body shrink. Brain cells are especially affected, and as the brain shrinks it can pull on the small blood vessels that connect it to the skull, sometimes tearing them and causing bleeding. Early symptoms include intense thirst, vomiting and irritability, followed by confusion, muscle twitching and, in severe cases, seizures. Treatment means giving water back slowly and carefully, because correcting sodium too quickly can make brain cells swell. This is why vomiting should never be induced with salt water.",
      ),
    ],
    dosage:
      "The World Health Organization recommends that adults eat less than 2 grams of sodium a day, which is 5 grams of salt, or about one teaspoon; the global average is roughly double that. In the United States, about 70 percent of dietary sodium comes from processed and restaurant foods, so the salt shaker plays only a small part. Food labels list sodium in milligrams, and a useful rule of thumb is that 5 percent of the Daily Value or less per serving is low, while 20 percent or more is high. Harm from any single product is unlikely. What matters is the total across all meals, every day.",
    synthesis: [
      route(
        "Solar evaporation of seawater",
        "One of the oldest ways to make salt is simply to let the sun dry up seawater. Seawater is about 3.5 percent dissolved salts, most of it sodium chloride. In warm, sunny, windy places, seawater is let into large, shallow ponds called salt pans and left to evaporate over weeks or months. As the water disappears, the dissolved salts become more and more concentrated until they come out as crystals. The method uses almost no fuel, since the sun and wind do the work.",
        "Every dissolved substance has a limit to how much can stay dissolved in a given amount of water, called its solubility. As the sun evaporates water from the ponds, the remaining brine gets more concentrated, and each salt crystallizes out when its concentration passes its own limit. Salt makers move the brine through a series of ponds so that different salts settle out in different places. The least soluble salts, such as calcium carbonate and calcium sulfate (gypsum), crystallize first. Sodium chloride crystallizes next, in the later ponds, where it is raked or scooped up. The very soluble magnesium and potassium salts stay dissolved in the leftover liquid, called bittern, which is drained away.",
        { significance: "This is fractional crystallization: separating a mixture of substances by how soluble they are, a technique chemists also use in the lab to purify compounds." },
      ),
      route(
        "Mining and vacuum evaporation",
        "Most of the world's salt comes not from today's oceans but from ancient seas that dried up millions of years ago. Their salt was buried under layers of rock, forming thick underground beds of rock salt. Some of it is mined directly with machinery, much like coal, and is used mostly for de-icing roads. Table salt is usually made by dissolving underground salt in water and then purifying it. These methods supply the huge, steady amounts of salt that industry needs.",
        "In solution mining, water is pumped down a well into a salt bed, where it dissolves the salt and becomes brine, which is then pumped back to the surface. The brine is treated to remove calcium and magnesium and then boiled in a series of closed containers called vacuum pans. Lowering the air pressure inside the pans lowers the temperature at which water boils, so less energy is needed, and the steam from one pan is even used to heat the next. As the water boils off, fine, uniform salt crystals form. They are collected, dried and sometimes mixed with an anti-caking agent so they pour freely.",
        { significance: "Adding a little iodine, usually as potassium iodide, to table salt prevents iodine deficiency, which can cause goiter and harm brain development in children. Salt iodization is considered one of history's most successful public-health measures." },
      ),
    ],
  },

  "citric-acid": {
    overview: [
      "Citric acid is a six-carbon molecule carrying three carboxylic acid groups (–COOH) and one hydroxyl group (–OH). Each carboxylic acid group can release a proton, so citric acid is a triprotic weak acid, with pKa values of about 3.1, 4.8 and 6.4.",
      "Those three carboxylate arms can wrap around a metal ion like a claw, a property called chelation (from the Greek chele, claw), which makes citric acid useful far beyond adding sourness. It is also central to life: every cell that breathes oxygen makes and breaks down citrate in the Krebs cycle.",
    ],
    mechanisms: [
      mech(
        "Energy metabolism (the Krebs cycle)",
        "Every cell that uses oxygen runs a loop of chemical reactions called the Krebs cycle, also known as the citric acid cycle, inside tiny structures called mitochondria. The loop begins when an enzyme called citrate synthase joins a two-carbon fragment, carried by a molecule named acetyl-CoA, onto a four-carbon molecule called oxaloacetate, producing six-carbon citrate. Over the next several steps, other enzymes rearrange the citrate and remove two of its carbons as carbon dioxide (CO₂), the gas we breathe out. Along the way they strip off electrons and hand them to carrier molecules. At the end of the loop, oxaloacetate has been rebuilt, ready to start again.",
        "The electrons collected during the cycle are passed along a chain of proteins in the mitochondria, and the energy they release is used to make ATP, the molecule cells use to power almost everything they do. The two-carbon fragments that feed the cycle come from breaking down sugars, fats and proteins in food, which is why the Krebs cycle is called the central hub of metabolism. Because our cells make and use citrate constantly, the citric acid in fruit and processed food is nothing foreign to the body. It is absorbed and fed into this same pathway or excreted. Your own metabolism handles far more citrate every day than any food adds.",
        "established",
      ),
      mech(
        "Sour taste",
        "Acids are substances that release hydrogen ions (H⁺), also called protons, when dissolved in water. Citric acid can release up to three protons per molecule, but it is a weak acid, meaning only a small share of its molecules let go of a proton at any moment. Sour-sensing taste cells on the tongue have a channel protein called OTOP1, a tiny pore that lets protons pass into the cell. When citric acid is in your mouth, protons flow through these pores and make the inside of the taste cell more acidic. Uncharged citric acid molecules can also slip into the cell and release their protons once inside.",
        "As the inside of the taste cell becomes more acidic, the cell's electrical state changes and it fires a signal to nerves that carry it to the brain, which reads it as sour. Sourness helps animals detect unripe fruit and spoiled food, both of which tend to be acidic. At moderate levels, sourness makes food taste fresh and bright, and it balances sweetness, which is why lemonade needs both sugar and acid. Because citric acid is a weak acid, it tastes tart rather than harsh, and the taste fades quickly as saliva neutralizes it. That clean sourness is why it is the most widely used acid in foods and drinks.",
        "established",
      ),
      mech(
        "Exfoliation (as an alpha-hydroxy acid)",
        "Citric acid belongs to a family called alpha-hydroxy acids, or AHAs: molecules with a hydroxyl group (–OH) on the carbon right next to an acid group. The outermost layer of skin is made of dead, flattened cells joined by protein connections called desmosomes, which work like rivets. At low pH, acids weaken the ionic bonds and hydrogen bonds that hold these protein rivets together, and citrate may also grab some of the calcium ions that help keep them stable. With the rivets loosened, dead cells separate from each other more easily. The lower the pH and the higher the concentration, the stronger the effect.",
        "Skin naturally sheds its dead outer cells, but the process can slow down, leaving the surface rough or dull. When an acid loosens the connections between dead cells, they are shed faster, so the surface looks smoother and more even. With regular use, AHAs may also encourage the deeper skin to renew itself. Citric acid, however, is a milder exfoliant than glycolic or lactic acid and is less often used for this purpose. In most cosmetics it appears in tiny amounts, below 1 percent, simply to set the product's pH so that the other ingredients stay stable.",
        "human",
      ),
      mech(
        "Antioxidant helper",
        "Metal ions such as iron (Fe²⁺ and Fe³⁺) and copper (Cu²⁺) are powerful catalysts for oxidation, the reaction in which oxygen attacks fats, vitamins and colors and breaks them down. They can trigger the formation of free radicals, highly reactive molecules with an unpaired electron that start chain reactions of damage. Citric acid's three carboxylate groups can wrap around a metal ion and hold it from several sides at once, like a claw. This grip is called chelation, and the bundle it forms is called a complex. A metal that is chelated can't easily take part in reactions, so it stops speeding up oxidation.",
        "By locking up stray metal ions, citric acid slows the processes that make oils taste rancid, colors fade and vitamins lose potency. In packaged foods and cosmetics, that means a longer shelf life and fresher flavor or scent. Citric acid also helps true antioxidants such as vitamin C and vitamin E last longer, because they no longer get used up fighting metal-driven reactions. That is why it is often called a synergist, a helper that makes other ingredients more effective. It is one of the cheapest and safest ways to protect a product from oxygen.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Neutralization with baking soda (the bath-bomb reaction)",
        "When an acid meets a base, they react and cancel out each other's properties in a reaction called neutralization. Citric acid and sodium bicarbonate (baking soda) are a classic pair: mix them in water and they fizz hard as carbon dioxide gas forms. The reaction powers bath bombs, effervescent vitamin tablets, some antacids and many kitchen science experiments. Surprisingly, the two powders can sit mixed together for months without reacting, as long as they stay dry. Water is needed because it lets the molecules break apart into ions that can move around and meet.",
        [
          ["Proton donation", "In water, citric acid releases hydrogen ions (protons), up to three from each molecule. Bicarbonate ions (HCO₃⁻) from the baking soda are good at accepting protons. Each bicarbonate picks up one proton."],
          ["Carbonic acid", "A bicarbonate ion that has accepted a proton becomes carbonic acid (H₂CO₃). Carbonic acid is unstable and can't stay in that form for long. It is the same substance that forms briefly in fizzy drinks."],
          ["Gas release", "Carbonic acid quickly breaks apart into water and carbon dioxide gas. The carbon dioxide forms bubbles that rise and escape, producing the fizz. What stays dissolved is sodium citrate, a mild salt."],
        ],
        "The products are harmless: sodium citrate, water and carbon dioxide. Because the dry powders don't react, bath bombs and effervescent tablets stay stable until they hit water. Bakers rely on a similar acid-plus-bicarbonate reaction in baking powder to make cakes rise.",
        "C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 H2O + 3 CO2",
      ),
      rxn(
        "Chelation and descaling",
        "Hard water contains dissolved calcium and magnesium, which leave white, crusty deposits called limescale in kettles, coffee makers, showerheads and dishwashers. Limescale is mostly calcium carbonate, the same mineral found in chalk and limestone. Citric acid removes it in two ways at once: it dissolves the scale with acid, and then it grabs the freed calcium so the scale can't re-form. That makes it a popular, food-safe descaler. The same ability to hold onto calcium is why it is used as a water softener in eco-friendly detergents.",
        [
          ["Acid attack", "Protons from citric acid react with the calcium carbonate (CaCO₃) in the scale. The carbonate part turns into carbonic acid, which breaks down into water and carbon dioxide gas, so you may see small bubbles as descaling begins. This leaves calcium ions (Ca²⁺) free in the water."],
          ["Binding", "Citrate, the form of citric acid that has lost its protons, has three negatively charged carboxylate groups. These can wrap around a positively charged calcium ion and grip it from several sides at once, forming a stable bundle called a complex. This grabbing action is chelation."],
          ["Clearing", "Because the calcium is now held by citrate, it can't easily recombine with carbonate to form new scale. The calcium citrate complexes stay dissolved and are rinsed away with the water."],
        ],
        "This is how citric acid descales kettles and why it softens water in detergents, where free calcium would otherwise react with soap and reduce its cleaning power. It works more gently than strong acids and is safe to use around food surfaces.",
        "3 CaCO3 + 2 C6H8O7 → Ca3(C6H5O7)2 + 3 H2O + 3 CO2",
      ),
    ],
    hazards: [
      hz(
        "Tooth enamel erosion",
        "Acidic foods and drinks, including citrus juices, sodas, sports drinks and sour candies, can slowly wear away tooth enamel when consumed often. This is called dental erosion, and it differs from cavities because no bacteria are involved, just the direct effect of acid on teeth. An occasional sour drink is not a problem, but frequent sipping throughout the day can thin enamel over years. Simple habits reduce the risk a lot. Drinking acidic drinks with meals or through a straw, rinsing with water afterward and waiting before brushing all help.",
        "Tooth enamel is made mostly of hydroxyapatite, a crystal of calcium, phosphate and hydroxide. When the pH at the tooth surface falls below about 5.5, hydrogen ions from the acid react with the phosphate and hydroxide in the crystal, and calcium ions break loose. Citric acid adds a second effect: citrate grabs those freed calcium ions by chelation, pulling them away so the crystal dissolves faster than it would with acid alone. This is why citric acid is more erosive than some other acids at the same pH. Saliva normally brings calcium and phosphate back, but only if it is given time.",
        "Erosion removes a thin layer of enamel with each acid exposure, and unlike bone, enamel can't regrow once it is lost. As it thins, teeth may look more yellow because the dentin underneath shows through, and edges can become see-through or chip. When dentin is exposed, its tiny tubes lead toward the nerve, so hot, cold or sweet foods can cause sharp sensitivity. Brushing right after an acidic drink can scrub away enamel that the acid has softened, which is why dentists suggest waiting about 30 minutes. Fluoride toothpaste helps make the surface more resistant.",
      ),
      hz(
        "Eye and skin irritation when concentrated",
        "Pure citric acid powder and strong solutions can sting the eyes and irritate skin, especially skin that is cut or chapped. This mostly matters when handling the concentrated chemical, for example as a powdered descaler or in homemade cleaning recipes. In finished foods and cosmetics it is used at around 0.1 to 1 percent, where it is harmless. Getting lemon juice in a paper cut gives a good sense of the same sting. Rinsing with plenty of water solves the problem.",
        "A concentrated citric acid solution has a low pH, often below 2, meaning it contains a lot of hydrogen ions. Proteins hold their working shapes partly through charged groups and hydrogen bonds, and a flood of hydrogen ions disrupts these, making the proteins unfold, a process called denaturation. The surface of the eye and broken skin have little protection against this. Intact skin is covered by a tough, fatty outer layer that blocks much of the acid, so it is far less sensitive. The effect depends on concentration, so diluting the acid quickly weakens it.",
        "When surface cells are irritated, nerve endings send pain signals, producing stinging or burning. The damaged cells release chemical signals that widen blood vessels, so the area turns red and may water or swell. In the eye this shows up as tearing, redness and blinking, the eye's way of flushing the irritant out. Because citric acid is a weak acid, this kind of irritation usually clears quickly after rinsing and doesn't cause lasting damage. Wearing gloves and avoiding splashes when handling the powder prevents it.",
      ),
    ],
    dosage:
      "Foods and cosmetics typically contain about 0.1 to 1 percent citric acid, mainly to add tartness or adjust pH. That is modest compared with nature: lemon juice is about 5 to 6 percent citric acid. Your own body also makes and breaks down large amounts of citrate every day in the Krebs cycle, so dietary citric acid simply joins that normal flow. Regulators such as the U.S. FDA classify it as generally recognized as safe, and international experts have not set any limit on daily intake. The realistic concerns are tooth erosion from very frequent acidic drinks and irritation from handling the pure powder.",
    synthesis: [
      route(
        "Biological synthesis (in citrus and every cell)",
        "Citrus fruits like lemons and limes taste sour because they store large amounts of citric acid. They make it the same way every oxygen-breathing cell does, as part of the Krebs cycle, but they keep much of it instead of using it straight away. Lemons and limes contain the most, while oranges and grapefruit contain less, so they taste sweeter. Citric acid was first isolated from lemon juice in 1784 by the Swedish chemist Carl Wilhelm Scheele. For more than a century after that, lemons were the main commercial source.",
        "Inside the mitochondria of fruit cells, the enzyme citrate synthase joins acetyl-CoA, a two-carbon unit made by breaking down sugar, with oxaloacetate, a four-carbon molecule, to form citrate. In most cells the citrate continues around the Krebs cycle and is broken down for energy. In the juice cells of citrus fruit, however, a large share of it is moved out of the mitochondria and pumped into the vacuole, a big storage compartment inside the cell. Pumps in the vacuole's membrane also use energy to move hydrogen ions in, making the vacuole very acidic. The trapped citric acid builds up until lemon juice is about 5 to 6 percent citric acid, with a pH of around 2.",
      ),
      route(
        "Industrial fermentation",
        "Almost all the citric acid sold today is made not from lemons but by a mold. In the early 1900s scientists discovered that the black mold Aspergillus niger, the kind that sometimes appears on old onions, could produce large amounts of citric acid from sugar. Fermentation, using microbes to make useful chemicals, quickly replaced fruit as the main source. The mold is grown in huge steel tanks on cheap sugar sources such as molasses or corn syrup. More than two million tonnes are made this way each year.",
        "Like all cells, the mold makes citrate in its Krebs cycle. Producers deliberately limit trace metals, especially iron and manganese. Aconitase, the enzyme that would normally carry citrate onward in the cycle, needs iron to work, and the metal shortages also shift the mold's metabolism in ways that favor making citrate. With plenty of sugar and oxygen and a low pH, citrate is produced faster than it is used, so it builds up and the mold pumps it out into the surrounding liquid. After several days the liquid is filtered to remove the mold, and lime (calcium hydroxide) is added so the citrate settles out as solid calcium citrate. Sulfuric acid then frees the citric acid, leaving calcium sulfate, or gypsum, behind.",
        { equation: "Ca3(C6H5O7)2 + 3 H2SO4 → 2 C6H8O7 + 3 CaSO4", significance: "Citric acid made by fermentation is chemically identical to the citric acid in lemons, and far cheaper than extracting it from fruit." },
      ),
    ],
  },

  "ascorbic-acid": {
    overview: [
      "Ascorbic acid is vitamin C: a small six-carbon molecule built around a five-membered ring that carries an enediol group, two –OH groups attached to a carbon–carbon double bond. That enediol gives up electrons easily, which makes vitamin C a strong reducing agent and antioxidant.",
      "Most animals make their own vitamin C from glucose, but humans, other primates and guinea pigs lost the final enzyme (L-gulonolactone oxidase) to a mutation millions of years ago. We must eat it; without it, collagen falls apart and scurvy follows.",
    ],
    mechanisms: [
      mech(
        "Building collagen",
        "Collagen is the most abundant protein in the body, the strong, rope-like material in skin, bones, tendons, gums and blood vessel walls. As new collagen chains are being made, two enzymes, prolyl hydroxylase and lysyl hydroxylase, add hydroxyl groups (–OH) to some of the amino acids proline and lysine in the chain. Each of these enzymes has an iron atom at its center that must be in the Fe²⁺ form to work. During the reaction, that iron sometimes gets stuck in the inactive Fe³⁺ form. Vitamin C (ascorbate) donates an electron to turn it back into Fe²⁺, keeping the enzyme running.",
        "The added hydroxyl groups let three collagen chains twist tightly around each other into a triple helix and form hydrogen bonds that hold the helix together. Properly built collagen is remarkably strong, giving tissues their toughness and stretch. Without enough vitamin C, collagen is made poorly and falls apart easily at body temperature. The result is scurvy: gums swell and bleed, teeth loosen, old wounds reopen, small blood vessels leak and bruise, and the person feels exhausted. Scurvy killed huge numbers of sailors on long voyages until citrus fruit was found to prevent it.",
        "established",
      ),
      mech(
        "Antioxidant defense",
        "Free radicals are molecules with an unpaired electron, which makes them very reactive: they steal electrons from nearby molecules, damaging fats, proteins and DNA and turning those molecules into new radicals in a chain reaction. Vitamin C stops this by donating one of its own electrons to the radical, which neutralizes it. After giving up an electron, vitamin C becomes the ascorbyl radical, which is unusually stable and doesn't continue the chain. It can then give up a second electron and become dehydroascorbic acid. A substance that donates electrons in this way is called a reducing agent, or antioxidant.",
        "Vitamin C dissolves in water, so it protects the watery parts of cells and the fluid in blood. It also works as a teammate for vitamin E, a fat-soluble antioxidant that guards cell membranes: when vitamin E neutralizes a radical in the membrane, vitamin C can restore it by passing it an electron. Cells then use enzymes to recycle dehydroascorbic acid back into active vitamin C. Because the body keeps only limited stores and excretes any extra in urine, vitamin C needs to be eaten regularly. Fruits and vegetables are the main sources.",
        "established",
      ),
      mech(
        "Iron absorption",
        "Iron in plant foods such as beans, spinach and grains is mostly in the ferric form, Fe³⁺, which tends to form insoluble clumps in the less acidic environment of the small intestine. Iron that doesn't dissolve can't be absorbed. Vitamin C reduces ferric iron to ferrous iron, Fe²⁺, by handing it an electron. It can also bind iron into a soluble complex, keeping it dissolved as it moves from the acidic stomach into the intestine. Both actions leave more of the iron in a form the body can take up.",
        "The cells lining the small intestine absorb iron mainly through a transporter protein called DMT1, which only carries the ferrous (Fe²⁺) form. With vitamin C in the same meal, more iron reaches these transporters in a form they can use. Studies show that adding a vitamin C-rich food, such as orange juice, peppers or tomatoes, to a meal can raise iron absorption from plant foods several-fold. This matters most for vegetarians, vegans and others at risk of iron-deficiency anemia, a condition in which the blood carries less oxygen. Iron from meat, called heme iron, is absorbed by a different route and depends less on vitamin C.",
        "human",
      ),
      mech(
        "Fading dark spots",
        "Skin color comes from melanin, a pigment made by cells called melanocytes. The first and slowest step in making melanin is controlled by an enzyme called tyrosinase, which has copper atoms at its active site and converts the amino acid tyrosine into molecules that link up into melanin. Applied to skin at a low pH, ascorbic acid interferes with tyrosinase, partly by acting on its copper center, and it can also convert early intermediate molecules back before they join into pigment. The low pH matters because vitamin C passes through the skin best in its uncharged form. Serums typically use 10 to 20 percent.",
        "With less melanin being made, areas of extra pigment, such as sun spots or marks left after acne, gradually fade as pigmented skin cells are shed and replaced. Results take weeks to months, because the outer skin renews itself roughly every month. Vitamin C also supports collagen production in the deeper layer of skin and gives some antioxidant protection against sun damage. It doesn't replace sunscreen, which blocks the UV light that triggers extra melanin in the first place. Results in studies are real but modest, and a stable formula matters, since vitamin C breaks down quickly in air.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Oxidation (why vitamin C serums turn brown)",
        "Vitamin C protects other molecules by sacrificing itself: it gives away its electrons, which is a type of reaction called oxidation. That makes it an excellent antioxidant, but it also means vitamin C is used up whenever it meets oxygen, light or reactive metals. In a bottle of serum or a carton of juice, it slowly oxidizes over days or weeks. At first the change is invisible, but eventually the breakdown products turn yellow, then orange or brown. The color change is a handy sign that the vitamin C is losing its strength.",
        [
          ["First electron", "Ascorbate gives one electron to oxygen or a free radical. It becomes the ascorbyl radical, which has an unpaired electron but is stable enough not to cause damage. This step is what makes vitamin C an antioxidant."],
          ["Second electron", "The ascorbyl radical gives up a second electron and a proton, forming dehydroascorbic acid. Up to this point the change can be reversed: in the body, enzymes can put the electrons back. In a bottle there are no such enzymes."],
          ["Breakdown", "Dehydroascorbic acid is unstable in water. Its ring opens permanently, and it breaks into smaller molecules that react further to form yellow and brown compounds. Once this happens, the vitamin C can't be restored."],
        ],
        "Light, heat, air and traces of metals such as copper and iron all speed this process up. That's why vitamin C serums come in dark, airtight bottles, why they often include stabilizers such as vitamin E and ferulic acid, and why a serum that has turned dark orange has lost much of its potency. Juice loses vitamin C faster once opened for the same reason.",
        "C6H8O6 → C6H6O6 + 2 H+ + 2 e-",
      ),
      rxn(
        "Benzene formation with sodium benzoate",
        "In 2005 and 2006, testing found small amounts of benzene, a chemical known to cause cancer at high exposures, in some soft drinks. The cause turned out to be an unexpected reaction between two common ingredients: vitamin C (ascorbic acid) and the preservative sodium benzoate. Neither ingredient is benzene, and they rarely react, but under certain conditions vitamin C helps produce highly reactive radicals that can knock a piece off benzoate. The amounts formed were tiny, measured in parts per billion. The discovery led manufacturers to reformulate their drinks.",
        [
          ["Radical generation", "Vitamin C reduces trace amounts of copper or iron ions in the drink, putting them into a reactive form. These metal ions react with oxygen dissolved in the drink and produce hydroxyl radicals (•OH), among the most reactive molecules known. The dot in •OH marks the unpaired electron."],
          ["Decarboxylation", "A hydroxyl radical attacks benzoic acid, the active form of the preservative in acidic drinks, and helps remove its carboxyl group (–COOH) as carbon dioxide gas. Removing a carboxyl group is called decarboxylation."],
          ["Product", "What remains is a bare benzene ring with nothing attached: a molecule of benzene. Heat and light supply extra energy that speeds up every step."],
        ],
        "Storing drinks warm or in sunlight increases the amount formed. After the 2006 findings, manufacturers reformulated, often by removing one of the two ingredients, and most drinks now test below 5 parts per billion, the U.S. drinking-water limit for benzene. The episode is a reminder that safety testing has to consider how ingredients behave together.",
        "C6H5COOH → C6H6 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Digestive upset at megadoses",
        "Vitamin C from food is safe, and so are normal supplement doses. Problems appear only with very large doses, usually from high-dose supplements or powders taken in the belief that more is better. The main effect is an upset stomach, cramps or diarrhea, which goes away once the dose is lowered. This is why health authorities set an upper limit of 2,000 milligrams a day for adults. There is little evidence that such megadoses give healthy people any extra benefit.",
        "The intestine absorbs vitamin C using special transporter proteins, and there are only so many of them. At normal intakes nearly all of it is absorbed, but at doses of a gram or more the transporters become saturated, meaning they are all busy, and absorption drops sharply. The unabsorbed vitamin C stays dissolved inside the intestine. Dissolved particles attract water by osmosis, the movement of water toward a more concentrated solution. So the extra vitamin C draws water from the body into the gut.",
        "The extra water in the intestine makes stools looser and speeds them through the gut, causing diarrhea, cramps, bloating and nausea. This is the same way some laxatives work. The effect is temporary and stops once the dose is reduced. Any vitamin C that is absorbed beyond the body's needs is filtered out by the kidneys and leaves in urine, so the body doesn't stockpile it. Above about 2 grams a day, these side effects become common.",
      ),
      hz(
        "Kidney stones in susceptible people",
        "Taking high doses of vitamin C supplements every day for years may slightly raise the risk of kidney stones in some people. The link has been seen mainly in men, and especially in people who have had kidney stones before. Vitamin C from fruits and vegetables has not been linked to stones. People with a history of stones or kidney disease are usually advised to avoid high-dose supplements. For most people, the risk at normal intakes is negligible.",
        "The body breaks down some of the vitamin C it absorbs, and one of the end products is oxalate. Oxalate is also found naturally in foods such as spinach, rhubarb and nuts. In urine, oxalate ions can combine with calcium ions to form calcium oxalate, a compound that dissolves very poorly in water. When the levels of calcium and oxalate in urine are high enough, the compound comes out of solution as tiny solid crystals. The more vitamin C is absorbed beyond the body's needs, the more oxalate is produced.",
        "Most of the time, tiny crystals are flushed out in urine without anyone noticing. In some people, though, they stick together and grow inside the kidney into a hard stone. A stone can sit quietly for years, but if it moves into the narrow tube that drains the kidney, it can cause intense pain, nausea and blood in the urine. Most kidney stones are made mainly of calcium oxalate. Drinking plenty of water keeps urine dilute and is one of the best ways to prevent them.",
      ),
    ],
    dosage:
      "Adults need about 75 milligrams of vitamin C a day for women and 90 milligrams for men, an amount easily reached by eating one orange (about 70 milligrams) plus some vegetables. Smokers need about 35 milligrams more, because smoking uses vitamin C up faster. The safe upper limit for adults is 2,000 milligrams a day, above which digestive upset becomes common. Food additives and cosmetics contribute only small amounts by comparison. Skin serums use 10 to 20 percent vitamin C at a pH below about 3.5, which can cause a brief tingle when applied.",
    synthesis: [
      route(
        "Biological synthesis",
        "Almost all plants and most animals make their own vitamin C, so for them it isn't a vitamin at all. Dogs, cats, cows and rats, for example, produce it in their liver or kidneys from glucose. Humans, other apes and monkeys, guinea pigs, fruit bats and some birds have lost this ability, which is why we must get it from food. Plants make vitamin C in large amounts, especially in leaves and fruit, where it helps protect them from damage caused by strong sunlight. Citrus fruits, kiwis, strawberries and peppers are especially rich sources.",
        "In animals that can make it, the process starts with glucose, a six-carbon sugar. A series of enzymes converts glucose into glucuronic acid, then into a molecule called L-gulonic acid, which is closed into a ring called L-gulonolactone. The final enzyme, L-gulonolactone oxidase, removes two hydrogen atoms to form ascorbic acid. Plants use a different route that also starts from glucose but passes through the sugars GDP-mannose and L-galactose. Different paths lead to the same product: the vitamin C molecule is identical whether it was made by a lemon, a dog or a factory.",
        { significance: "Humans still carry a broken copy of the gene for L-gulonolactone oxidase, called a pseudogene, with the same disabling mutations as other primates. That shared damage is evidence that we inherited it from a common ancestor." },
      ),
      route(
        "Industrial two-step fermentation",
        "Most vitamin C sold today is made in factories, largely in China, by combining chemical steps with fermentation by bacteria. The first industrial process was invented in 1933 by the Swiss chemist Tadeus Reichstein, and it used several chemical reactions and solvents. Modern factories have replaced most of those chemical steps with bacteria that carry out the same transformations more cleanly. The starting material is glucose from corn or other starchy crops. The final product is chemically identical to the vitamin C in fruit.",
        "First, glucose is reacted with hydrogen gas over a nickel catalyst, a reaction called hydrogenation, which turns it into sorbitol, a sugar alcohol. Bacteria of the genus Gluconobacter then oxidize sorbitol into L-sorbose, a different sugar, by removing hydrogen from one specific carbon atom, something that is hard to do with ordinary chemistry because the molecule has many similar spots. In a second fermentation, other bacteria convert L-sorbose into 2-keto-L-gulonic acid. Treating this molecule with acid makes it close into a ring and rearrange into ascorbic acid. The product is then crystallized and purified.",
        {
          equation: "C6H12O6 + H2 → C6H14O6",
          significance: "This largely replaced Reichstein's original process, which needed more chemical steps and solvents.",
        },
      ),
    ],
  },

  "sodium-benzoate": {
    overview: [
      "Sodium benzoate is the sodium salt of benzoic acid: a flat benzene ring attached to a carboxylate group (–COO⁻ Na⁺). As a salt it dissolves easily in water, about 630 grams per liter.",
      "Its preservative power depends on pH. Benzoic acid has a pKa of about 4.2, so in acidic foods and drinks (pH below 4.5) much of it exists as uncharged benzoic acid, the form that slips through microbial membranes. In neutral products it stays charged and works poorly, which is why it's used in sodas, pickles and sauces.",
    ],
    mechanisms: [
      mech(
        "Stopping yeast and mold (the pH trap)",
        "Benzoic acid exists in two forms: an uncharged acid (C₆H₅COOH) and a charged ion called benzoate (C₆H₅COO⁻), and the balance between them depends on pH. In an acidic food or drink, most of it is in the uncharged form. Cell membranes are made of fatty molecules that block charged particles but let small uncharged molecules slip through, so uncharged benzoic acid diffuses into microbes easily. Inside the cell the pH is close to neutral, so the benzoic acid lets go of its proton (H⁺) and becomes the charged benzoate ion. Now charged, it can't get back out through the membrane, so it is trapped, while more benzoic acid keeps flowing in.",
        "As benzoic acid enters and drops its protons, the inside of the microbe becomes more acidic. Many of the cell's enzymes only work within a narrow pH range, and one important target is phosphofructokinase, a key enzyme in glycolysis, the pathway that breaks down sugar for energy. With glycolysis slowed, the cell makes less ATP, its energy currency. At the same time the microbe spends what energy it has left running pumps that push protons back out. Starved of energy, yeasts and molds stop growing, although they aren't always killed outright.",
        "established",
      ),
      mech(
        "Clearance in the human body",
        "When we eat sodium benzoate, it is absorbed quickly from the gut and carried to the liver. Inside the mitochondria of liver cells, an enzyme attaches benzoate to coenzyme A, a helper molecule, forming benzoyl-CoA. A second enzyme then joins this to glycine, the smallest amino acid, creating a new molecule called hippuric acid. Attaching a substance to another molecule to make it easier to remove is called conjugation. Hippuric acid is very water-soluble and is not toxic.",
        "The kidneys filter hippuric acid out of the blood efficiently, and it leaves the body in urine, usually within hours of eating benzoate. Because this route is fast, benzoate doesn't build up in the body at normal food levels. Doctors even use the same pathway as a treatment: babies with certain rare genetic diseases, called urea-cycle disorders, can't get rid of nitrogen properly, and ammonia builds up to dangerous levels. Giving sodium benzoate makes the body use up glycine, which contains nitrogen, and excrete it as hippuric acid, lowering ammonia. The name hippuric comes from the Greek word for horse, because it was first found in horse urine.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Activation in acidic food",
        "Sodium benzoate is sold as a salt, which dissolves easily in water but isn't the form that stops microbes. To work, it has to pick up a hydrogen ion and become benzoic acid, and that only happens when the surroundings are acidic. This is an example of an acid–base equilibrium: a reaction that runs in both directions at once, with the balance set by pH. Chemists use a number called the pKa to describe where that balance lies, and for benzoic acid it is about 4.2. At a pH equal to the pKa, exactly half the molecules are in each form.",
        [
          ["Acidic environment", "A soda at pH 3 contains many free hydrogen ions (H⁺), about ten times as many as a solution at pH 4. pH is a logarithmic scale, so each step down means ten times more acid. Many sauces, pickles and fruit drinks are similarly acidic."],
          ["Equilibrium shift", "When hydrogen ions are plentiful, benzoate ions are more likely to grab one, so the balance shifts toward uncharged benzoic acid. At pH 3, more than 90 percent of the preservative is in the acid form. At pH 7, almost all of it would stay as the charged ion."],
          ["Activation", "Only uncharged benzoic acid can pass through a microbe's fatty membrane and get trapped inside. So the lower the pH, the more of the preservative is in its active form, and the less is needed to prevent spoilage."],
        ],
        "This is why sodium benzoate is paired with acidic products like sodas, fruit juices, salad dressings and pickles, and is rarely used in neutral foods such as milk or meat. Food scientists choose preservatives partly by matching each one's pKa to the product's pH.",
        "C6H5COO- + H+ ⇌ C6H5COOH",
      ),
      rxn(
        "Benzene formation",
        "Under a specific combination of conditions, benzoate can break down into small amounts of benzene, a chemical known to cause cancer with long-term, high-level exposure. The reaction needs vitamin C, traces of metal ions such as copper or iron, and oxygen, and it speeds up with heat and light. U.S. regulators first learned it could happen in soft drinks around 1990, and it became widely known after new testing in 2006. The amounts involved are very small, measured in parts per billion. It is an example of two individually safe ingredients interacting in an unexpected way.",
        [
          ["Trigger", "Vitamin C converts trace copper or iron ions in the drink into a reactive form. These metal ions react with dissolved oxygen and generate hydroxyl radicals (•OH), extremely reactive fragments with an unpaired electron."],
          ["Decarboxylation", "A hydroxyl radical attacks benzoic acid and helps remove its carboxyl group (–COOH), which leaves as carbon dioxide. Removing a carboxyl group is called decarboxylation."],
          ["Product", "What is left is a bare benzene ring, a molecule of benzene. The warmer the drink and the more light it gets, the faster the reaction runs and the more benzene forms."],
        ],
        "After the 2006 findings, manufacturers reformulated many products, for example by removing vitamin C or switching preservatives, and most drinks now test below the U.S. drinking-water limit of 5 parts per billion. Storing drinks somewhere cool and dark also keeps benzene formation to a minimum.",
        "C6H5COOH → C6H6 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Trace benzene in drinks",
        "The concern here is not sodium benzoate itself but the small amount of benzene that can form when it reacts with vitamin C inside a drink. Benzene is a known human carcinogen, but its harm is tied to high, long-term exposures, such as those once faced by workers in some industries. The trace amounts found in beverages are thousands of times lower than those workplace exposures. For comparison, people also breathe in benzene from car exhaust, gasoline fumes and cigarette smoke. Reformulation since 2006 has lowered levels in drinks even further.",
        "Benzene forms only when several conditions line up: benzoate must be present together with vitamin C, traces of copper or iron must be there to make reactive radicals, and heat or light must speed things up. Remove any one of these and very little benzene forms. Benzene itself is a flat ring of six carbon atoms, each bonded to one hydrogen. It is fairly unreactive but dissolves in fats, so once absorbed it can travel throughout the body. In the liver, enzymes convert it into reactive breakdown products, and those are what cause harm.",
        "Benzene's breakdown products are especially toxic to bone marrow, the soft tissue inside bones where blood cells are made. They can damage DNA and interfere with the cells that develop into red blood cells, white blood cells and platelets. Long-term, high exposure, such as years of breathing benzene vapor at work, is linked to anemia and to leukemia, a cancer of the blood-forming cells. The amounts in reformulated drinks are below the limits set for drinking water, which are designed with large safety margins. Even so, regulators prefer to keep any exposure to a known carcinogen as low as possible.",
      ),
      hz(
        "Pseudo-allergic reactions",
        "A small number of people react to benzoates with hives, itching, flushing or, rarely, asthma symptoms. These reactions are more common in people who are sensitive to aspirin or who already have chronic hives. They are called pseudo-allergic because they look like allergies but don't involve the usual allergy antibodies. For people who notice a pattern, reading labels and avoiding benzoates usually solves the problem. For everyone else, sodium benzoate at food levels causes no reaction at all.",
        "In a true allergy, the immune system makes antibodies called IgE that recognize one specific substance. In a pseudo-allergic reaction, benzoate seems to act more directly on mast cells, immune cells packed with granules of chemical messengers. Scientists don't know every detail, but the result is that the mast cells release their contents without any antibody being involved. That is why someone can react the very first time they meet the substance. The reaction depends on dose, so small amounts may cause nothing while larger amounts cause symptoms.",
        "Mast cells release histamine and other signals that widen small blood vessels and make them leaky. Fluid seeps into the skin and forms raised, itchy welts called hives, and the widened vessels cause flushing and warmth. In the airways, histamine can tighten the surrounding muscles and trigger wheezing in people with asthma. These symptoms usually appear within minutes to an hour and fade as histamine is cleared. Antihistamine medicines block histamine's effects and can relieve them.",
      ),
      hz(
        "Behavior in sensitive children (as part of mixtures)",
        "Some parents worry that food additives affect children's behavior. The best-known study, the 2007 Southampton trial in the U.K., tested drinks containing mixtures of artificial food colors together with sodium benzoate. It found a small increase in hyperactive behavior in some children who drank the mixtures compared with a look-alike drink with no additives. Because benzoate was always given along with the dyes, the study couldn't show whether benzoate alone had any effect. The findings led the European Union to require a warning label on foods containing those dyes, but not on benzoate.",
        "Nobody knows exactly how additive mixtures might affect behavior, and the effect may differ from child to child. One idea is that some additives trigger the release of histamine, the same messenger involved in pseudo-allergic reactions, and that histamine in the brain affects attention and activity. Genetic differences in how quickly children break down histamine might explain why only some seem to respond. These ideas remain hypotheses. No clear chemical mechanism for benzoate on its own has been demonstrated.",
        "In the Southampton trial, about 300 children aged three and eight to nine drank either additive-containing drinks or identical-looking placebo drinks without knowing which was which, and their behavior was rated by parents, teachers and trained observers. On average, hyperactivity scores rose slightly with the additive drinks, though the effect was small and varied widely between children. The European Food Safety Authority reviewed the study and concluded it did not justify changing the safe intake levels for the additives. Parents who suspect a link can try removing the additives, ideally with a doctor's guidance, and watch for changes.",
      ),
    ],
    dosage:
      "Drinks usually contain less than 0.05 percent sodium benzoate, and regulators cap how much can be used. International food-safety experts have set an acceptable daily intake (ADI), the amount a person could eat every day for life without appreciable risk, of 5 milligrams per kilogram of body weight. For a 60-kilogram adult that is about 300 milligrams a day, and typical intakes are well below it. Children who drink a lot of soft drinks have the highest exposures. Because the body converts benzoate to hippuric acid and excretes it within hours, it doesn't accumulate.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Almost all sodium benzoate is made from toluene, a liquid chemical obtained from petroleum. Toluene is a benzene ring with a single methyl group (–CH₃) attached. Manufacturers convert that methyl group into a carboxylic acid group (–COOH), which turns toluene into benzoic acid, and then react the acid with a base to make the salt. The process is efficient and cheap. Benzoic acid made this way is identical to the benzoic acid some fruits produce.",
        "Toluene is heated to about 150 °C while air is blown through it, together with small amounts of cobalt or manganese salts that act as catalysts. The reaction runs as a radical chain: the catalyst helps pull a hydrogen atom off the methyl group, leaving a radical, a molecule with an unpaired electron, which then reacts with oxygen from the air. Over several steps, the methyl carbon gains oxygen atoms until it becomes a carboxyl group, producing benzoic acid and water. The benzoic acid is purified by distillation and crystallization. Finally it is neutralized with sodium hydroxide, an acid–base reaction that swaps the acidic hydrogen for sodium and produces sodium benzoate and water.",
        {
          equation: "C6H5CH3 + 3/2 O2 → C6H5COOH + H2O",
          significance: "Food-grade benzoate must meet strict purity limits for any leftover byproducts.",
        },
      ),
      route(
        "Biological synthesis in plants",
        "Benzoic acid isn't only a factory chemical; many plants make it naturally. Cranberries, lingonberries, plums, cinnamon and cloves all contain it. Plants use it as a building block for other compounds and as part of their defense against microbes and insects. Some fermented dairy foods, such as yogurt, also contain small amounts produced by bacteria. This natural benzoic acid is one reason lingonberry jam keeps well without added preservatives.",
        "Plants start with phenylalanine, one of the amino acids used to build proteins. An enzyme called phenylalanine ammonia-lyase removes the amino group from phenylalanine, producing cinnamic acid, which has a three-carbon side chain attached to a benzene ring. The plant then trims this side chain by two carbons in a sequence of steps similar to the way animals break down fatty acids. What remains is benzoic acid, with a single carbon in its carboxyl group attached to the ring. Plants can store benzoic acid as it is or attach it to sugars and other molecules.",
        { significance: "Cranberries and lingonberries accumulate enough benzoic acid to help them resist spoilage." },
      ),
    ],
  },

  "potassium-sorbate": {
    overview: [
      "Potassium sorbate is the potassium salt of sorbic acid, a six-carbon fatty acid with two conjugated double bonds (CH₃–CH=CH–CH=CH–COOH). The alternating single and double bonds share electrons along the chain, which makes the molecule absorb UV light and react slowly with oxygen.",
      "Like benzoate, it works best as the uncharged acid, but sorbic acid's higher pKa (4.76) means it keeps working up to about pH 6.5, so it suits cheese, baked goods and wine. Because it looks like a natural fatty acid, the body burns it for energy the same way it burns dietary fat.",
    ],
    mechanisms: [
      mech(
        "Inhibiting mold and yeast",
        "Like benzoate, potassium sorbate works through its uncharged acid form, sorbic acid, which can pass through the fatty membrane of a microbe. Once inside, sorbic acid does more than acidify the cell. Its chain of alternating double bonds is reactive, and it can bond with sulfhydryl groups (–SH), sulfur-containing groups found in many enzymes. When these groups are blocked, the enzymes can no longer do their jobs. Sorbic acid also seems to disturb the cell membrane itself, interfering with the way nutrients are carried into the cell.",
        "With key enzymes slowed and nutrient transport disrupted, molds and yeasts can't produce enough energy to grow and divide. Molds are particularly sensitive, which is why sorbate is widely used on cheese, bread, cakes, dried fruit and wine, where mold and yeast are the main spoilage risks. Bacteria are less affected, so sorbate is usually combined with acidity, refrigeration or other preservatives. It slows growth more than it kills, so it works best in products that start out with few microbes. Food made under clean conditions and preserved with sorbate can stay mold-free for weeks longer.",
        "lab",
      ),
      mech(
        "Metabolized like a fat",
        "Sorbic acid is a six-carbon chain with a carboxylic acid group at one end, which makes it look very much like the fatty acids found in food fats and oils. Inside cells, enzymes attach it to coenzyme A, a helper molecule that tags fatty acids for breakdown. It then enters beta-oxidation, the pathway that chops fatty acids into two-carbon pieces. Each round of beta-oxidation removes two carbons as acetyl-CoA. Sorbic acid's double bonds just need a couple of extra enzyme steps that cells already use for the unsaturated fats in our diet.",
        "The two-carbon pieces enter the Krebs cycle, the same energy pathway used for sugars and fats, and are broken down to carbon dioxide and water, releasing energy the body can use. In effect, the body treats sorbic acid like a tiny amount of dietary fat. Because it is completely broken down, it doesn't build up in tissues. This efficient metabolism is one reason sorbic acid is considered among the safest preservatives. Long-term studies in animals fed large amounts found no harmful effects at levels far above what people eat.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Acid–base equilibrium",
        "When potassium sorbate dissolves in food, it splits into potassium ions and sorbate ions. Sorbate is the charged form, which doesn't easily enter microbes. To become the active, uncharged sorbic acid, each sorbate ion has to pick up a hydrogen ion from its surroundings, and how often that happens depends on how acidic the food is. The reaction runs in both directions at once, so at any pH there is a balance between the two forms, called an equilibrium. Sorbic acid's pKa, the pH at which the two forms are balanced fifty-fifty, is 4.76.",
        [
          ["Dissolving", "Potassium sorbate is a salt, so it dissolves readily in water and separates into potassium ions (K⁺) and sorbate ions. The potassium plays no part in preserving. Sorbic acid itself dissolves poorly in water, which is why the salt form is the one added to food."],
          ["Protonation", "In acidic food there are many hydrogen ions (H⁺) available. Sorbate ions pick them up and become uncharged sorbic acid. The more acidic the food, the more of the preservative ends up in this active form."],
          ["Activity", "At pH 4.76, exactly half is sorbic acid; at pH 3.76 about 90 percent is, and at pH 5.76 only about 10 percent. Because sorbic acid's pKa is higher than benzoic acid's, sorbate keeps some of its active form in mildly acidic foods up to about pH 6.5."],
        ],
        "That's why sorbate works well in wine, yogurt, cheese and baked goods, which are mildly acidic, but is weak in neutral foods. Food makers sometimes add a little citric or lactic acid to boost its effect.",
        "C6H7O2- + H+ ⇌ C6H8O2",
      ),
      rxn(
        "Mold decarboxylation (the kerosene smell)",
        "Some molds have found a way to fight back against sorbate. Certain species, particularly of Penicillium, along with some yeasts, carry an enzyme that breaks sorbic acid down, turning it into a different chemical that no longer stops them. This reaction, called decarboxylation, releases carbon dioxide and leaves behind a small, smelly hydrocarbon. The smell is so distinctive that food scientists use it as a clue that the preservative has been defeated. It is most often noticed in cheese, cakes and marzipan.",
        [
          ["Resistant molds", "Resistant molds produce an enzyme that recognizes sorbic acid and works on it. This lets them grow on foods where the preservative would normally hold them back. Food that becomes heavily contaminated is more likely to contain these strains."],
          ["Decarboxylation", "The enzyme removes the carboxyl group (–COOH) from sorbic acid, which leaves as carbon dioxide gas. What remains is a five-carbon hydrocarbon, a molecule made only of carbon and hydrogen, called 1,3-pentadiene."],
          ["Off-odor", "1,3-Pentadiene is volatile, meaning it evaporates easily, and it smells strongly of kerosene, paint thinner or plastic. Even tiny amounts are noticeable, so the food smells wrong before it looks moldy."],
        ],
        "A kerosene-like smell on old cheese, cake or marzipan means resistant mold has been breaking down the preservative, and the food should be thrown away. Producers prevent it with good hygiene, so that resistant molds never get a foothold in the first place.",
        "C6H8O2 → C5H8 + CO2",
      ),
    ],
    hazards: [
      hz(
        "Occasional skin reactions",
        "Potassium sorbate is one of the gentlest preservatives, but in a small number of people it can cause mild skin reactions. These are mostly seen with creams and cosmetics, where it is applied directly to the skin, sometimes at higher concentrations than in food. The usual reaction is brief stinging, redness or itchy bumps where the product touched the skin, appearing within minutes and fading within an hour or so. True allergy, which involves immune memory, is uncommon. People who notice a reaction can simply choose products without it.",
        "At higher concentrations, sorbic acid can directly trigger certain cells in the skin to release inflammatory messengers such as histamine and prostaglandins, without the immune system first having to learn to recognize it. Prostaglandins are signaling molecules that make blood vessels widen and nerves more sensitive. Because no prior exposure is needed, this can happen the very first time someone uses the product. The effect depends strongly on dose, so more concentrated products are more likely to cause it. Sorbic acid's mild acidity may also add to the sting on sensitive or broken skin.",
        "The released messengers widen small blood vessels in the skin, which causes redness, and make them slightly leaky, so fluid collects and forms small raised bumps called wheals. This is known as contact urticaria, a hive-like reaction limited to where the product touched. Nerves are stimulated too, producing stinging or itching. Because no immune memory is involved, the reaction doesn't grow stronger with repeated use the way an allergy can. It fades as the messengers are cleared away.",
      ),
    ],
    dosage:
      "Foods use about 0.025 to 0.2 percent potassium sorbate, and cosmetics up to about 0.6 percent. International food-safety experts have set an acceptable daily intake (ADI) of up to 25 milligrams per kilogram of body weight for sorbic acid and its salts, while European regulators chose a more cautious group ADI of 11 milligrams per kilogram in 2019. Typical intakes fall well within both limits. Because the body breaks sorbate down like a fatty acid, it doesn't accumulate. Skin reactions are the main concern, and they are uncommon and mild.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Sorbic acid for food use is made in chemical plants from two small, simple industrial chemicals, ketene and crotonaldehyde. Chemists worked out how to make it on a large scale in the 1950s, once its value as a mold inhibitor was clear. The sorbic acid is then converted to its potassium salt, because the salt dissolves far better in water and is easier to mix into foods and drinks. The finished product is a white powder or granules. It is chemically identical to sorbic acid from natural sources.",
        "Ketene (CH₂=C=O) is a highly reactive gas that readily adds onto other molecules. With the help of a catalyst, it reacts with crotonaldehyde, a four-carbon molecule containing a double bond and an aldehyde group, and the products link together into a long chain called a polyester, a polymer whose units are connected by ester bonds. Treating this polyester with acid and water breaks those ester bonds by hydrolysis, releasing individual sorbic acid molecules with their characteristic chain of two alternating double bonds. The sorbic acid is purified by crystallization. It is then neutralized with potassium hydroxide, which swaps the acid's hydrogen for potassium and forms potassium sorbate and water.",
        { equation: "C6H8O2 + KOH → C6H7KO2 + H2O", significance: "The salt is used because it dissolves far better in water than sorbic acid itself." },
      ),
      route(
        "Natural origin",
        "Sorbic acid takes its name from the rowan or mountain ash tree, Sorbus aucuparia, whose bright orange-red berries are where it was first found. In 1859 the German chemist August Wilhelm von Hofmann distilled oil from rowan berries, isolated a compound called parasorbic acid, and converted it into sorbic acid. For decades it remained a chemical curiosity. Its ability to stop mold wasn't recognized until about 80 years later, and it came into wide use as a food preservative in the 1950s. Today essentially all commercial sorbic acid is made synthetically.",
        "Rowan berries don't contain much sorbic acid itself. Instead they contain parasorbic acid, a close relative in which the carbon chain is curled into a ring, a structure chemists call a lactone. Parasorbic acid is mildly toxic, gives raw rowan berries a harsh taste and can upset the stomach. When the berries are heated, or the compound is treated with acid or base, the ring opens and the molecule rearranges into straight-chain sorbic acid, which is far less toxic. That chemical change is what Hofmann used to obtain sorbic acid. It also explains why rowan berries are always cooked before being made into jelly.",
        { significance: "Cooking rowan berries before eating them turns irritating parasorbic acid into harmless sorbic acid, an old kitchen habit with a chemical explanation." },
      ),
    ],
  },

  "high-fructose-corn-syrup": {
    overview: [
      "High fructose corn syrup isn't a single molecule but a water solution of two simple sugars, glucose and fructose. Both have the formula C₆H₁₂O₆, but they are structural isomers: glucose is an aldose, with its carbonyl group at carbon 1, and usually forms a six-membered ring; fructose is a ketose, with its carbonyl at carbon 2, and often forms a five-membered ring.",
      "Fructose tastes sweeter than glucose, so converting part of corn's glucose into fructose makes a cheap liquid sweetener as sweet as table sugar. The common grades are HFCS-42 (42% fructose), used in foods, and HFCS-55, used in soft drinks.",
    ],
    mechanisms: [
      mech(
        "How the liver handles fructose",
        "Glucose and fructose contain the same atoms but are handled differently by the body. Glucose can be used by almost every cell, and its breakdown is controlled at an early step by an enzyme called phosphofructokinase, which acts like a brake: when a cell already has enough energy, this enzyme slows down. Fructose, by contrast, is mostly taken up by the liver, where an enzyme called fructokinase quickly attaches a phosphate group to it, forming fructose-1-phosphate. This molecule joins the energy pathway at a point after the phosphofructokinase brake. As a result, fructose flows into the liver's metabolism without the usual control.",
        "When fructose arrives in moderate amounts, as in a piece of fruit, the liver simply turns it into glucose, stores it as glycogen or burns it for energy. But when large amounts arrive often, mostly from sweetened drinks, the unregulated flow supplies more building blocks than the liver needs. The excess is turned into fat through a process called de novo lipogenesis, which means “making new fat.” Some of this fat is sent into the blood as triglycerides, and some stays in the liver. Over time this can contribute to fatty liver and less healthy blood-fat levels, which is why health guidelines focus on limiting sugary drinks.",
        "human",
      ),
      mech(
        "Liquid calories and fullness",
        "In a drink, sugar is already dissolved, so the body doesn't need to chew or break down any food structure to get to it. Liquids also leave the stomach quickly, especially when they contain no protein, fat or fiber. Protein and fat trigger hormones that slow stomach emptying, and fiber forms a gel that holds food back, but a soft drink has none of these. The sugar reaches the small intestine and is absorbed within minutes. The body receives a large dose of energy, measured in calories, very quickly.",
        "The brain judges how full we are partly from signals sent by the stomach and intestine, such as stretching and the release of fullness hormones. Liquid sugar produces weaker fullness signals than the same number of calories in solid food. Studies that track what people eat show that they usually don't eat less later to make up for the calories they drank. Over weeks and months, those extra calories add up. This helps explain why sugary drinks are more strongly linked to weight gain than solid sugary foods.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Turning starch into glucose",
        "High fructose corn syrup starts as corn starch, which is made of thousands of glucose units linked into long chains. To make a sweet syrup, those chains have to be cut into individual glucose molecules. This is done with enzymes, proteins that speed up specific reactions, in a process similar to what happens when you chew bread long enough that it starts to taste slightly sweet. Each cut uses up a water molecule, so the overall reaction is hydrolysis. The result is a clear syrup that is mostly glucose.",
        [
          ["Gelatinization", "Starch in corn is packed into tight granules that enzymes can't easily reach. Heating the starch in water makes the granules swell and burst as water molecules push between the chains. The chains loosen and unwind into a thick paste, giving the enzymes access."],
          ["Liquefaction", "An enzyme called alpha-amylase cuts the long starch chains at random points along their length, turning them into shorter fragments called dextrins. This turns the thick paste thin and runny. Industrial alpha-amylases come from heat-loving bacteria, so they can work at the high temperatures used in this step."],
          ["Saccharification", "A second enzyme, glucoamylase, works from the ends of the shorter chains, snipping off one glucose unit at a time. After a day or two, more than 95 percent of the starch has become glucose. The word saccharification comes from the Latin word for sugar."],
        ],
        "The product is ordinary corn syrup, which is mostly glucose. Glucose is only about 70 to 75 percent as sweet as table sugar, so this syrup alone can't replace sugar in drinks without changing their taste. That's why the next step converts some of the glucose into sweeter fructose.",
        "(C6H10O5)n + n H2O → n C6H12O6",
      ),
      rxn(
        "Isomerization: glucose into fructose",
        "Glucose and fructose are isomers, meaning they have exactly the same atoms, C₆H₁₂O₆, arranged differently. Fructose tastes considerably sweeter than glucose, so converting part of the glucose into fructose makes the syrup as sweet as table sugar. The conversion is done by an enzyme called glucose isomerase, which rearranges the atoms without adding or removing any. Learning to do this cheaply on a large scale transformed the sweetener industry. Nothing new is attached to the sugar; it is a rearrangement that also happens inside living cells.",
        [
          ["Ring opening", "In water, glucose molecules exist mostly as closed six-membered rings, but they briefly open into straight chains and then close again. The enzyme works on the open-chain form, in which glucose has an aldehyde group: a carbon double-bonded to oxygen at the very end of the chain (carbon 1)."],
          ["Rearrangement", "Glucose isomerase, fixed onto small beads packed in a column so it can be reused for months, moves a hydrogen atom from carbon 2 to carbon 1. This shifts the double-bonded oxygen from carbon 1 to carbon 2, turning the aldehyde into a ketone, a carbonyl group partway along the chain. The molecule is now fructose, which closes into its own ring."],
          ["Enrichment", "The reaction runs in both directions, so it settles at a balance of about 42 percent fructose and 50 percent glucose, plus some other sugars. To make a sweeter syrup, a separation technique called chromatography pulls out a stream that is about 90 percent fructose. This is blended with the 42 percent syrup to make HFCS-55, the grade used in soft drinks."],
        ],
        "Enzyme engineering made HFCS cheap enough to replace sugar in most American soft drinks by the mid-1980s. Nutritionally, HFCS-55 is very close to table sugar, which becomes half glucose and half fructose once digested. Its advantages for manufacturers are price and the fact that it is already a liquid.",
        "C6H12O6 (glucose) ⇌ C6H12O6 (fructose)",
      ),
    ],
    hazards: [
      hz(
        "Added sugar in sweetened drinks",
        "High fructose corn syrup is sometimes described as worse than ordinary sugar, but most research suggests the real concern is the total amount of added sugar people consume, not HFCS being uniquely harmful. HFCS and table sugar provide nearly the same mix of glucose and fructose. In the United States, HFCS is especially common in soft drinks, so it has become associated with the health problems of drinking too many sugary beverages. Those problems include weight gain, type 2 diabetes and tooth decay. Choosing water or unsweetened drinks most of the time lowers the risk whichever sugar a product contains.",
        "HFCS-55 contains about 55 percent fructose and 42 percent glucose, while table sugar splits into exactly half of each during digestion. The difference is small, and in the body the two sweeteners produce very similar blood sugar and insulin responses. The main chemical difference is that in HFCS the two sugars are already separate, while sucrose must first be split by an enzyme, but that enzyme works so fast that it makes little practical difference. What matters most is that both deliver a lot of quickly absorbed sugar with no fiber or nutrients alongside it.",
        "Drinking large amounts of sugary drinks regularly adds many calories that don't make people feel full, which contributes to weight gain. Frequent large sugar loads also put extra demand on the body's insulin system and are linked to a higher risk of type 2 diabetes. Sugary drinks bathe the teeth in sugar that mouth bacteria turn into acid, causing cavities. Large studies that follow people for years find that those who drink more sugary beverages have higher rates of these conditions. The effects come from the sugar itself, so they apply just as much to drinks sweetened with cane sugar.",
      ),
      hz(
        "Liver fat with high fructose intake",
        "Eating large amounts of fructose regularly, mostly from sweetened drinks, can encourage fat to build up in the liver. This condition, long known as non-alcoholic fatty liver disease and now often called metabolic dysfunction-associated steatotic liver disease, has become very common and affects roughly a quarter of adults worldwide. Fructose is not the only cause: extra calories, inactivity and genetics all play a part. The fructose in whole fruit isn't a concern, because fruit contains relatively little and comes with fiber and water. The issue is large, frequent doses of added sugar.",
        "In the liver, fructose is tagged with a phosphate by fructokinase and enters the energy pathways after the main checkpoint that normally controls sugar breakdown. This means the liver can't easily slow fructose processing down when it already has enough energy. The extra carbon atoms from fructose are converted into acetyl-CoA, the starting material for building fatty acids. Fructose also appears to switch on genes that increase the liver's fat-making machinery. The new fatty acids are assembled into triglycerides, the main storage form of fat.",
        "Some of the triglycerides made in the liver are packaged into particles and released into the blood, raising blood triglyceride levels, which is a risk factor for heart disease. The rest can collect as fat droplets inside liver cells. A little liver fat is harmless, but large amounts can lead to inflammation, liver cell damage and eventually scarring called fibrosis. The good news is that fatty liver is often reversible: cutting back on sugary drinks, losing excess weight and exercising can reduce liver fat within weeks to months. Doctors can detect it with blood tests and ultrasound scans.",
      ),
    ],
    dosage:
      "A 20-ounce bottle of regular soda sweetened with HFCS can contain about 65 grams of sugar. That is more than double the World Health Organization's ideal limit of about 25 grams of free sugars a day for adults, and above the U.S. guideline of keeping added sugars under 10 percent of calories, which is about 50 grams on a 2,000-calorie diet. Because HFCS behaves almost exactly like table sugar in the body, it counts toward the same added-sugar limits. Small amounts in sauces, breads or condiments contribute relatively little; sweetened drinks are by far the biggest source. Swapping them for water or unsweetened drinks is the most effective way to cut intake.",
    synthesis: [
      route(
        "Industrial wet milling and enzyme processing",
        "High fructose corn syrup is made from field corn through a series of physical and enzyme-based steps. The process was developed in the 1960s and scaled up in the 1970s, mostly in the United States, where corn was plentiful and cheap and sugar imports were restricted. Each step either separates parts of the corn kernel or uses enzymes to reshape the starch. The finished syrup is simply a mixture of the sugars glucose and fructose dissolved in water. Byproducts such as corn oil, gluten and fiber are sold for food and animal feed.",
        "First, corn kernels are soaked in warm water containing a little sulfur dioxide for a day or two, which softens them and loosens the starch from the protein. The soaked kernels are ground and separated by weight and size, a process called wet milling, into germ (which yields corn oil), fiber, protein and pure starch. The starch is cooked in water and treated with alpha-amylase and then glucoamylase, enzymes that break it down into glucose. The glucose syrup flows through columns packed with immobilized glucose isomerase, enzyme fixed onto solid beads, which converts part of it to fructose. Finally the syrup is cleaned with activated carbon, which soaks up colors and off-flavors, and with ion-exchange resins, which remove minerals, then evaporated to the right thickness.",
        {
          steps: [
            "Corn is soaked (steeped) to loosen the starch from the rest of the kernel.",
            "Wet milling separates germ, fiber, protein and starch.",
            "Two enzymes break the starch down into glucose syrup.",
            "Immobilized glucose isomerase converts about 42 percent of the glucose to fructose.",
            "Carbon filtering, ion exchange and evaporation purify and concentrate the syrup.",
          ],
          significance: "Japanese researcher Yoshiyuki Takasaki developed the industrial glucose-isomerase process in the 1960s.",
        },
      ),
    ],
  },
};
