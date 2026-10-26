import { hz, mech, route, rxn, type DeepProfile } from "../types";

export const BEAUTY_DEEP_2: Record<string, DeepProfile> = {
  fragrance: {
    overview: [
      "“Fragrance” (or parfum) on a label stands for a blend that can contain dozens to hundreds of aroma molecules: terpenes such as limonene and linalool from citrus and flowers, aldehydes, esters, musks and woody notes, plus solvents. Recipes are trade secrets, so they're listed as a single word.",
      "Perfumers build blends in layers: volatile top notes (citrus) that evaporate within minutes, heart notes (florals) that last hours, and heavy base notes (musks, woods) that linger. The same reactive molecules that make a fragrance pleasant also make it the most common cause of allergic reactions to cosmetics.",
    ],
    mechanisms: [
      mech(
        "How we smell a fragrance",
        "A fragrance is a mixture of volatile molecules, meaning they evaporate easily at skin temperature and drift into the air. When you breathe in, these molecules reach the olfactory epithelium, a small patch of tissue high inside the nose that carries about 400 different types of odorant receptors. Each receptor is a protein with a pocket that fits certain features of molecules, such as their size, shape and the groups of atoms they carry. One receptor responds to many different molecules, and each molecule activates several receptors. So every scent produces its own combination of activated receptors, a bit like a chord played on a piano.",
        "Each activated receptor makes its nerve cell fire, and the signals travel to the olfactory bulb at the front of the brain. The brain reads the overall pattern of signals as a particular smell, such as rose or vanilla. Unlike the other senses, smell signals reach the amygdala and hippocampus, brain areas involved in emotion and memory, without first passing through the thalamus, the brain's usual relay station. That direct route explains why a scent can instantly bring back a vivid memory or a strong feeling. It also helps explain why fragrance preferences are so personal.",
        "established",
      ),
      mech(
        "Allergic contact dermatitis",
        "Some fragrance molecules are reactive enough to form chemical bonds with proteins in the skin. Others only become reactive after they react with oxygen in the air, forming oxidized products such as hydroperoxides. Small molecules that become allergens by attaching to proteins are called haptens. A fragrance molecule bonded to a skin protein creates a shape the immune system has never seen before. That new shape is what can trigger an allergy.",
        "Immune cells in the skin called Langerhans cells pick up the altered proteins and carry them to nearby lymph nodes, where they teach T cells to recognize them. This first stage, called sensitization, causes no symptoms. On later exposures, the memory T cells recognize the altered proteins and set off inflammation, usually one to three days after contact. The result is an itchy, red, sometimes blistering rash wherever the fragrance touched the skin. Fragrance allergy affects roughly 1 to 4 percent of people and is among the most common causes of cosmetic allergy.",
        "human",
      ),
      mech(
        "Fixatives and lasting scent",
        "Small, light fragrance molecules evaporate quickly, while larger, heavier ones evaporate slowly. How quickly a molecule evaporates depends on its vapor pressure, which reflects how strongly its molecules cling to each other. Heavy molecules such as musks and resins have a low vapor pressure. When mixed with lighter molecules, they hold onto them through weak attractions between molecules, slowing their evaporation. These heavy ingredients are called fixatives.",
        "Because lighter molecules evaporate first, a perfume changes over time after it is applied. The first impression, the top notes, often citrus or herbal, fades within minutes. The heart notes, often floral, last a few hours, and the base notes, such as woods, vanilla and musks, can linger for many hours. Fixatives slow the whole process down, so the scent lasts longer on skin. Perfumers design a fragrance so that this slow change is pleasant from start to finish.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Autoxidation of fragrance terpenes",
        "Many fragrance ingredients, especially terpenes such as limonene from citrus and linalool from lavender, slowly react with oxygen in the air. This process, called autoxidation, happens on its own over weeks or months and is sped up by light and warmth. Its products include hydroperoxides, molecules with an –O–O–H group. Hydroperoxides are much more likely to cause skin allergy than the original molecules. That is why old perfumes and essential oils are more likely to cause rashes.",
        [
          ["Initiation", "Light, heat or a trace of a reactive molecule pulls a hydrogen atom off a carbon next to a carbon–carbon double bond, where hydrogens are relatively easy to remove. This leaves a radical, a molecule with an unpaired electron. The chain reaction is now started."],
          ["Oxygen capture", "The radical quickly reacts with an oxygen molecule from the air, which attaches to it. This forms a peroxy radical, carrying an –O–O• group. It is highly reactive."],
          ["Chain reaction", "The peroxy radical takes a hydrogen atom from another terpene molecule, becoming a hydroperoxide (–O–O–H) and creating a new radical. That new radical reacts with oxygen and the chain continues. A single starting event can produce many hydroperoxides."],
        ],
        "Hydroperoxides of limonene and linalool are much stronger skin sensitizers than the fresh molecules, so old perfumes and essential oils are more likely to cause rashes. Adding antioxidants, storing products somewhere cool and dark, and keeping lids closed all slow this process down.",
      ),
      rxn(
        "Reactions with indoor ozone",
        "When fragrance molecules evaporate into indoor air, they can react with ozone, a reactive form of oxygen that drifts indoors from outside, especially on smoggy days. Ozone attacks carbon–carbon double bonds, which many fragrance molecules contain. These reactions break the fragrance molecules into smaller pieces, some of which are irritating. Some of the products clump together into tiny particles floating in the air. Scientists have only studied this kind of indoor air chemistry in detail in recent decades.",
        [
          ["Attack", "An ozone molecule (O₃) adds across a carbon–carbon double bond in a terpene such as limonene. This forms an unstable ring-shaped intermediate called an ozonide. The reaction is fast because ozone is so reactive."],
          ["Fragmentation", "The ozonide breaks apart, splitting the original molecule where the double bond was. This creates smaller oxidized molecules, including aldehydes, ketones and formaldehyde, along with reactive radicals. Some of these are irritants."],
          ["Particles", "Some of the larger, heavier oxidation products barely evaporate at all, so they condense into tiny particles suspended in the air. These ultrafine particles can be breathed deep into the lungs."],
        ],
        "Heavy use of scented sprays, air fresheners or cleaning products on smoggy days can briefly raise indoor levels of formaldehyde and fine particles. Opening windows and using fragranced products sparingly reduces the effect.",
      ),
    ],
    hazards: [
      hz(
        "Skin allergy",
        "Fragrance is the leading cause of allergic reactions to cosmetics. Because a single fragrance can contain dozens of molecules, people often don't know which one they are allergic to. Once someone becomes allergic to a particular fragrance molecule, the allergy usually lasts for life. To help people avoid their triggers, the European Union requires the most common fragrance allergens to be named individually on labels when they are present above set levels. People with fragrance allergy often need to choose fragrance-free products.",
        "The molecules responsible include both reactive fragrance ingredients, such as cinnamal and isoeugenol, and molecules that become reactive after oxidizing in air, such as limonene and linalool. These haptens form covalent bonds with skin proteins, often at the amino acids lysine or cysteine. The immune system then treats the modified proteins as foreign. Once someone is sensitized, even tiny amounts can trigger a reaction. Products labeled “unscented” may still contain masking fragrance, so “fragrance-free” is the safer choice.",
        "In sensitized people, exposure triggers allergic contact dermatitis, typically one to three days after contact. Common sites include the neck, face, hands and underarms, where perfumes, deodorants and lotions are applied. The rash may be itchy, red, scaly or blistered. Dermatologists identify fragrance allergy with patch testing, using standard mixtures of the most common fragrance allergens. Avoiding the specific allergen is the main treatment, along with creams that calm the inflammation.",
      ),
      hz(
        "Airway symptoms in sensitive people",
        "Some people, especially those with asthma, migraines or sensitive airways, report coughing, wheezing, headaches or nausea around strong scents. These reactions usually aren't true allergies but responses to irritation. Strong fragrances in perfumes, air fresheners and cleaning products are common triggers. The effects can make shared spaces such as classrooms and offices difficult for some people. Some workplaces and schools have adopted fragrance-free policies for this reason.",
        "Fragrances release volatile organic compounds (VOCs), carbon-based molecules that evaporate into the air. Some of these, and the products formed when they react with ozone, such as aldehydes, can irritate nerve endings in the nose and airways. Those nerve endings act as detectors that trigger protective reflexes when they sense an irritant. In people with sensitive airways, the reflexes are stronger. Both the concentration of fragrance in the air and the person's sensitivity matter.",
        "When airway nerves are irritated, they can trigger coughing, sneezing and a runny nose, and they can make the muscles around the airways tighten, which causes wheezing in people with asthma. Strong smells are also a well-known migraine trigger, though exactly why isn't clear. Surveys find that a meaningful share of people report health complaints from fragranced products. These reactions vary greatly from person to person. Moving into fresh air usually relieves the symptoms.",
      ),
    ],
    dosage:
      "Perfumes contain 10 to 30 percent fragrance oils, while lotions, shampoos and cleaning products usually contain less than 1 percent. Fragrance ingredients are assessed by the industry's Research Institute for Fragrance Materials, and the International Fragrance Association sets standards that restrict or ban certain ingredients. The European Union requires known fragrance allergens to be named on labels when they exceed trace levels, so people with allergies can avoid them. In the United States, fragrance ingredients can still be listed simply as “fragrance.” People with fragrance allergy should choose products labeled “fragrance-free” rather than “unscented.”",
    synthesis: [
      route(
        "Natural extraction",
        "Many fragrance ingredients come from plants: flowers, leaves, fruit peels, wood, roots, seeds and resins. These natural materials, often called essential oils or absolutes, each contain dozens to hundreds of aroma molecules. Some are extremely expensive because so much plant material is needed; it takes several thousand kilograms of rose petals to make a single kilogram of rose oil. Different plants need different extraction methods. Natural extracts give perfumes depth, but they can vary from one harvest to the next.",
        "Steam distillation passes steam through plant material such as lavender, mint or eucalyptus; the volatile aroma molecules evaporate along with the steam and separate from the water as an oil when cooled. Cold pressing squeezes oil out of citrus peels, where it is stored in tiny pockets near the surface. Delicate flowers such as jasmine, which heat would damage, are extracted with solvents like hexane that dissolve the aroma molecules; the solvent is evaporated, and the waxy residue is washed with alcohol to give an absolute. Newer methods use supercritical carbon dioxide, which dissolves aroma molecules without heat or toxic solvents. Each method captures a slightly different set of molecules.",
        { significance: "The smell of a natural extract depends on the method used, which is why the same flower can yield several different oils." },
      ),
      route(
        "Synthetic aroma chemicals",
        "Most modern fragrances rely heavily on aroma molecules made in laboratories. Some are identical to molecules found in nature, like vanillin or linalool, while others are new creations with no natural equivalent. Synthetic molecules let perfumers create scents that are consistent, affordable and sometimes impossible to get from nature, such as the smell of fresh air or the sea. They also reduce the need to harvest rare plants and animals. A typical modern perfume contains mostly synthetic ingredients.",
        "Chemists design and make aroma molecules using organic chemistry reactions such as esterification, oxidation and condensation. Some start from natural materials, for example turpentine from pine trees, while others start from petroleum chemicals. Important synthetic families include aldehydes, which add a bright, sparkling quality; synthetic musks, which replaced musk taken from animals; and woody molecules that imitate sandalwood and cedar. Each molecule is purified and tested for safety. Perfumers then blend dozens of synthetic and natural materials into a final formula.",
        { significance: "Chanel No. 5 (1921) was among the first perfumes built on synthetic aldehydes, launching modern perfumery." },
      ),
    ],
  },

  "sodium-hyaluronate": {
    overview: [
      "Hyaluronic acid is a polysaccharide made of repeating pairs of two sugars, glucuronic acid and N-acetylglucosamine, linked into chains that can contain tens of thousands of units. Sodium hyaluronate is its salt form, used in skincare because it's more stable.",
      "Each repeating unit carries a negative charge and several hydroxyl groups, so the chain attracts water and swells into a gel. In your body it fills the spaces between skin cells, lubricates joints and gives the eye's vitreous humor its jelly-like structure.",
    ],
    mechanisms: [
      mech(
        "Binding water",
        "Hyaluronic acid is a very long chain of repeating sugar pairs, and each pair carries a negatively charged carboxylate group and several hydroxyl (–OH) groups. These groups form hydrogen bonds with water molecules and hold them close. At the same time, the negative charges along the chain repel each other, pushing the chain to stretch out into a large, loose coil. The space inside the coil fills up with water. A single hyaluronic acid molecule can hold a great deal of water compared with its own weight, which is why it forms a gel.",
        "Applied to the skin, hyaluronic acid forms a thin, water-holding film on the surface, which hydrates the outer layer and makes skin feel smoother and more supple. That hydration can temporarily plump up fine lines and make them less noticeable. In the body, hyaluronic acid fills the spaces between cells in the skin and gives it volume. In joints, it is a major part of the fluid that lubricates and cushions cartilage, helping joints move smoothly. The amount in skin falls with age, which contributes to drier, less plump skin.",
        "established",
      ),
      mech(
        "Molecular size matters",
        "Hyaluronic acid comes in different sizes, measured by molecular weight in kilodaltons (kDa). High-molecular-weight hyaluronic acid, over 1,000 kDa, is made of very long chains that are too big to pass through the skin's outer layer. Low-molecular-weight fragments, below about 50 kDa, are small enough to get into the upper layers of the skin. Manufacturers can break long chains into shorter ones using enzymes or other treatments. A molecule's size affects not only where it goes but also how cells respond to it.",
        "Large hyaluronic acid stays on the skin's surface, forming a film that holds in moisture and reduces water loss. Smaller fragments can penetrate deeper and may hydrate the skin from within. Laboratory studies suggest small fragments can also act as signals that influence the skin cells involved in repair and inflammation, although very small fragments may sometimes encourage inflammation. Because of these different effects, many serums blend several sizes. Evidence comparing the sizes in people, however, is still limited.",
        "lab",
      ),
      mech(
        "Signaling through CD44",
        "Cells have receptor proteins on their surfaces that recognize particular molecules outside the cell. CD44 is one of them, found on skin cells, immune cells and many others, and hyaluronic acid is its main partner. When hyaluronic acid binds to CD44, it changes the receptor's shape. That change sends signals inside the cell that affect its internal skeleton and its activity. Different sizes of hyaluronic acid can bind CD44 differently and trigger different signals.",
        "Through CD44, hyaluronic acid influences how cells move, multiply and respond to injury. During wound healing, hyaluronic acid levels rise, and its signals help cells migrate into the wound and help keep inflammation in check. That is why hyaluronic acid is being studied for wound dressings and treatments for skin injuries. It also plays roles in development and in the immune system. These findings come mainly from laboratory studies, and how much skincare products influence these signals isn't well understood.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Built inside the cell membrane",
        "Hyaluronic acid is made by enzymes called hyaluronan synthases, which sit in the cell membrane. Most large sugar chains, called polysaccharides, are assembled inside the cell in a compartment called the Golgi apparatus and then shipped out. Hyaluronic acid is unusual because it is built right at the cell surface and pushed out as it grows. That lets cells make extremely long chains. The process uses sugars made from glucose.",
        [
          ["Building blocks", "Inside the cell, enzymes convert glucose into two activated sugars: UDP-glucuronic acid and UDP-N-acetylglucosamine. The UDP part is a high-energy tag that makes each sugar ready to be linked. These are the raw materials for hyaluronic acid."],
          ["Alternating addition", "Hyaluronan synthase, embedded in the membrane, takes the activated sugars and adds them to the growing chain, alternating between glucuronic acid and N-acetylglucosamine. Each addition releases the UDP tag. The enzyme can add thousands of sugars to a single chain."],
          ["Extrusion", "As the chain grows, it is threaded out through a pore in the membrane into the space around the cell. This lets it grow far longer than the cell itself. Outside, it binds water and becomes part of the gel-like material between cells."],
        ],
        "Unlike most polysaccharides, it is made at the cell surface rather than inside the Golgi apparatus. This lets cells produce large amounts of hyaluronic acid quickly when they need to, for example during wound healing.",
      ),
      rxn(
        "Breakdown by hyaluronidase",
        "The body is constantly making and breaking down hyaluronic acid, so its supply is always being renewed. Enzymes called hyaluronidases cut the long chains into shorter pieces. This is hydrolysis, because water is used to break each bond. Hyaluronic acid turns over remarkably fast: in skin, about half of it is replaced within a day or two. Doctors also use hyaluronidase as a medicine, for example to dissolve hyaluronic acid fillers when something goes wrong.",
        [
          ["Binding", "Hyaluronidase enzymes, found in tissues, blood and inside cells, bind to the hyaluronic acid chain. Each enzyme has an active site shaped to fit the sugar pairs. It positions a water molecule next to a bond between sugars."],
          ["Hydrolysis", "The water molecule attacks the bond between an N-acetylglucosamine and the next glucuronic acid, breaking it. This cuts one long chain into two shorter ones. Repeated cuts produce smaller and smaller fragments."],
          ["Turnover", "The fragments are taken up by cells, especially in the lymph nodes and liver, and broken down further into single sugars. These sugars can be reused or burned for energy. This keeps the hyaluronic acid in tissues fresh."],
        ],
        "About a third of the body's hyaluronic acid is replaced every day. This constant renewal lets tissues adjust their hyaluronic acid quickly. And because hyaluronidase breaks down injected fillers, doctors can use it to reverse a filler treatment if a problem occurs.",
      ),
    ],
    hazards: [
      hz(
        "Very low hazard",
        "Hyaluronic acid is one of the safest skincare ingredients, because it is a molecule the body makes itself and uses in skin, joints and eyes. Allergic reactions to products applied to the skin are very rare. Cosmetic-grade hyaluronic acid is usually made by bacterial fermentation and purified to remove impurities. The risks people hear about come mainly from injected fillers, which are medical procedures, not from serums and creams. As with any product, a few people may react to other ingredients in the formula.",
        "Hyaluronic acid in skincare is chemically identical to the hyaluronic acid naturally found in human skin and connective tissue. Because the molecule is familiar, the immune system doesn't treat it as foreign. It is also broken down by the body's own hyaluronidase enzymes into simple sugars. Products made by fermentation are purified to remove bacterial proteins and other contaminants that could cause reactions. Injected fillers, by contrast, use hyaluronic acid that has been chemically cross-linked so it lasts for months.",
        "Applied to skin, hyaluronic acid hydrates the surface and is gradually broken down, with no known harmful effects. Some people find that a hyaluronic acid serum feels tight in very dry air; layering a moisturizer on top helps. Injected fillers can, rarely, block a blood vessel, causing tissue damage or even vision loss if injected in the wrong place. Those risks belong to medical procedures and depend on the injector's skill. They don't apply to skincare products.",
      ),
    ],
    dosage:
      "Skincare serums typically contain about 0.1 to 2 percent sodium hyaluronate, often a blend of different molecular sizes. Higher concentrations don't necessarily work better and can feel sticky. The Cosmetic Ingredient Review has concluded that hyaluronic acid and its salts are safe as used in cosmetics. Oral supplements and medical joint injections use different amounts and forms. Because the body makes it naturally, no maximum daily limit has been set for use on the skin.",
    synthesis: [
      route(
        "Bacterial fermentation",
        "Most hyaluronic acid used in cosmetics and medicine today is made by bacteria through fermentation. Certain bacteria naturally make hyaluronic acid as a protective outer coat called a capsule. By growing them in large tanks, manufacturers can produce large amounts of pure hyaluronic acid. The bacterial product is chemically identical to the hyaluronic acid in the human body. This method replaced extraction from animal tissue.",
        "Bacteria such as Streptococcus zooepidemicus, or engineered Bacillus subtilis strains that are safer to handle, are grown in tanks of glucose, nutrients and water. They use their hyaluronan synthase enzymes to build long hyaluronic acid chains and release them into the surrounding broth, which turns thick and stringy. After fermentation, the bacteria are filtered out. Alcohol is added so the hyaluronic acid comes out of solution, and it is collected and purified to remove bacterial proteins and other impurities. It can then be broken into smaller pieces to make different molecular weights and dried into a white powder.",
        { significance: "It was once harvested from rooster combs; fermentation gives a purer, animal-free product." },
      ),
    ],
  },

  niacinamide: {
    overview: [
      "Niacinamide (nicotinamide) is a form of vitamin B3: a pyridine ring, a benzene-like ring containing one nitrogen, with an amide group (–CONH₂) attached. It is small, very water-soluble and stable to heat and light, which makes it easy to formulate.",
      "Inside cells it becomes part of NAD⁺ and NADP⁺, coenzymes that shuttle electrons in hundreds of reactions, from making ATP to repairing DNA. On skin, it strengthens the barrier and evens tone, with one of the strongest evidence records of any cosmetic active.",
    ],
    mechanisms: [
      mech(
        "Repairing the skin barrier",
        "The outer layer of skin is held together by fatty molecules, including ceramides, cholesterol and free fatty acids, which form layers between the dead skin cells like mortar between bricks. Ceramides are made through a series of enzyme reactions, and the first step is controlled by an enzyme called serine palmitoyltransferase. Niacinamide increases the activity of this enzyme and the production of other barrier lipids. That leads to higher levels of ceramides and free fatty acids in the skin. It may also help skin cells make more of the proteins needed to build a strong barrier.",
        "A strong barrier holds water inside the skin, reducing water loss and keeping skin hydrated and smooth. It also keeps irritants and allergens out, making skin less reactive. Clinical studies have shown that applying niacinamide reduces dryness, redness and water loss from the skin. It helps people with dry or sensitive skin and conditions such as rosacea and eczema. Niacinamide is also very well tolerated, which makes it a popular choice for daily use.",
        "human",
      ),
      mech(
        "Fading dark spots",
        "Skin color comes from melanin, a pigment made by cells called melanocytes. Melanocytes pack melanin into small sacs called melanosomes and hand them over to neighboring skin cells, called keratinocytes, which make up most of the skin's outer layer. Niacinamide reduces this hand-over of melanosomes from melanocytes to keratinocytes. Unlike some other brightening ingredients, it doesn't block the production of melanin itself. Instead it reduces how much pigment ends up in the visible skin cells.",
        "With less melanin delivered to the outer skin cells, dark spots such as sun spots and marks left by acne gradually fade as the pigmented cells are shed. Clinical studies show visible improvement within four to eight weeks at concentrations of 2 to 5 percent. Because niacinamide works differently from ingredients like vitamin C or hydroquinone, it is often combined with them. Its effect is reversible, so spots can return if use stops or skin gets more sun. Daily sunscreen is essential to prevent new pigmentation.",
        "human",
      ),
      mech(
        "Supporting DNA repair",
        "Ultraviolet light from the sun damages the DNA in skin cells, and cells fix it with repair systems that use a lot of energy. One key molecule in this process is NAD⁺, which is needed by enzymes that detect and repair DNA damage, such as PARP. UV exposure uses up NAD⁺ and lowers the cell's ATP, its energy supply, which can slow DNA repair. Niacinamide is a building block for NAD⁺, so it helps restore NAD⁺ and ATP levels after UV exposure. That supports the cell's ability to repair the damage.",
        "By supporting DNA repair and reducing the way UV suppresses the skin's immune defenses, niacinamide may help protect against skin cancer. In the ONTRAC trial, published in 2015, people at high risk of skin cancer took 500 milligrams of oral nicotinamide twice a day for a year. They developed 23 percent fewer new non-melanoma skin cancers, such as basal cell and squamous cell carcinomas, than those on placebo. The benefit disappeared after they stopped. Nicotinamide isn't a substitute for sunscreen, but doctors may recommend it for high-risk patients.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Becoming NAD⁺",
        "Niacinamide's main job in the body is to become part of NAD⁺ (nicotinamide adenine dinucleotide), a coenzyme, meaning a helper molecule that enzymes need in order to work. NAD⁺ takes part in hundreds of reactions, from breaking down sugar for energy to repairing DNA. When enzymes use NAD⁺, they often release niacinamide, which cells then recycle back into NAD⁺. This recycling route is called the salvage pathway. It is the main way cells keep up their NAD⁺ supply.",
        [
          ["First step", "An enzyme called NAMPT attaches a ribose-phosphate group, taken from a molecule called PRPP, to niacinamide. This forms nicotinamide mononucleotide, or NMN. It is the slowest step in the pathway, so it controls how much NAD⁺ is made."],
          ["Second step", "Another enzyme, NMNAT, attaches an AMP unit taken from ATP to NMN. This completes the NAD⁺ molecule. NAD⁺ now has two nucleotides joined together, which is why it is called a dinucleotide."],
          ["In action", "In many metabolic reactions, NAD⁺ accepts a hydride ion (H⁻), a hydrogen atom carrying an extra electron, and becomes NADH. NADH carries those electrons to the mitochondria, where they are used to make ATP. NAD⁺ is regenerated and ready to accept more electrons."],
        ],
        "This salvage pathway lets cells reuse the niacinamide released when NAD⁺ is used up, for example by DNA repair enzymes. Without enough niacinamide or its precursors, NAD⁺ levels fall and the deficiency disease pellagra can develop.",
        "Nicotinamide + PRPP → NMN + PPi",
      ),
      rxn(
        "Hydrolysis to niacin",
        "Under harsh conditions, such as strong acid, strong base or high heat, niacinamide's amide group can be broken off by water. This converts niacinamide into nicotinic acid, also called niacin, another form of vitamin B3. Both forms count as vitamin B3, but niacin has a very different effect on skin: it causes flushing. Formulators keep conditions in products mild to prevent this conversion. It is a textbook example of amide hydrolysis.",
        [
          ["Attack", "A water molecule attacks the carbon atom of niacinamide's amide group (–CONH₂), which is slightly positive. Strong acid, strong base or heat speed this up enormously. Under mild conditions it is extremely slow."],
          ["Cleavage", "The bond between that carbon and the amide's nitrogen breaks. The nitrogen leaves as ammonia (NH₃). The carbon is left holding an –OH group."],
          ["Product", "The result is nicotinic acid (niacin), with a carboxylic acid group (–COOH) where the amide used to be. Niacin is still vitamin B3, but it interacts with the body differently."],
        ],
        "Niacin causes skin flushing by activating receptors that release prostaglandins, which widen blood vessels. To avoid this, formulas keep the pH between about 5 and 7, where the conversion is negligible. Old advice warned against mixing niacinamide with vitamin C for this reason, but at normal pH and temperature the effect is minimal.",
        "C6H6N2O + H2O → C6H5NO2 + NH3",
      ),
    ],
    hazards: [
      hz(
        "Tingling or flushing at high strength",
        "Niacinamide is generally very well tolerated, but some people get mild tingling, warmth or redness, especially at high concentrations of 10 percent or more. These reactions are usually brief. People with very sensitive skin may be more prone to them. Research suggests that 2 to 5 percent provides most of the benefit with fewer side effects. Starting with a lower concentration and working up helps the skin adjust.",
        "At high concentrations, niacinamide itself can mildly irritate the skin. Products can also contain small amounts of nicotinic acid (niacin), either as an impurity or formed from niacinamide over time, especially if the product's pH is very low or very high. Niacin activates a receptor called GPR109A on skin cells, which triggers the release of prostaglandins. Prostaglandins are signaling molecules that widen blood vessels. Even small amounts of niacin can have this effect.",
        "When prostaglandins widen blood vessels in the skin, more blood flows to the surface, causing warmth, redness and sometimes tingling or itching. It is the same flushing that happens when people take high doses of niacin as a cholesterol medicine. In skincare it is usually mild and fades within minutes to an hour. It isn't an allergic reaction and doesn't damage the skin. Choosing lower concentrations and products with a stable pH reduces the chance of it happening.",
      ),
      hz(
        "Very high oral doses",
        "Oral niacinamide supplements are generally safe at moderate doses, such as the 500 milligrams twice a day used for skin cancer prevention. Very high doses, however, above about 3 grams a day, have been linked to side effects. These include nausea, vomiting and signs of stress on the liver. Such doses are far higher than what is needed for good health or found in foods and skincare. Anyone considering high-dose supplements should talk to a doctor.",
        "When large amounts of niacinamide are swallowed, the liver has to process the excess. One way the body gets rid of niacinamide is by attaching a methyl group to it, drawing on a supply of methyl groups that is also needed for other important reactions. At very high doses, this can drain that supply. The liver also produces breakdown products that must be excreted. Over time, these demands can stress liver cells.",
        "Doses above about 3 grams a day have been linked to nausea, vomiting and, rarely, signs of liver damage in blood tests. High doses may also affect blood sugar control. Unlike niacin, niacinamide doesn't usually cause flushing even at high oral doses. Adults need only about 14 to 16 milligrams of vitamin B3 a day, easily supplied by food. Niacinamide applied to the skin is absorbed only in small amounts and doesn't cause these effects.",
      ),
    ],
    dosage:
      "Skincare serums typically contain 2 to 10 percent niacinamide, with studies showing most of the benefit at 2 to 5 percent. It is considered safe for daily use and suits most skin types, including sensitive skin. Adults need about 14 to 16 milligrams of vitamin B3 a day from food, while oral nicotinamide at 500 milligrams twice a day has been used under medical supervision to help prevent skin cancer. Doses above about 3 grams a day may stress the liver. Niacinamide is found naturally in meat, fish, nuts, mushrooms and whole grains.",
    synthesis: [
      route(
        "Biological synthesis from tryptophan",
        "The human body can make its own vitamin B3 from tryptophan, an amino acid found in protein-rich foods. So vitamin B3 deficiency usually happens only when a diet is low in both niacin and tryptophan. The conversion happens mainly in the liver through a long series of enzyme reactions. It isn't very efficient, though. Most people get their vitamin B3 partly from food and partly from tryptophan.",
        "Tryptophan is broken down through a series of enzyme steps called the kynurenine pathway. Along the way, the tryptophan molecule's ring structure is broken open and rearranged, eventually forming a molecule called quinolinic acid. Quinolinic acid is converted into nicotinic acid mononucleotide, which is then built into NAD⁺. As NAD⁺ is used, cells release niacinamide from it. On average, about 60 milligrams of tryptophan yields just 1 milligram of niacin equivalent, so a lot of tryptophan is needed.",
        { significance: "Pellagra, B3 deficiency, struck populations eating mostly untreated corn, which is low in both niacin and tryptophan. Traditional Mexican cooking avoided it by soaking corn in an alkaline solution, which frees its bound niacin." },
      ),
      route(
        "Industrial synthesis",
        "Most niacinamide used in supplements, fortified foods and cosmetics is made in factories through a combination of chemistry and biology. The process starts with a petrochemical called 3-methylpyridine, a ring molecule similar to benzene but containing a nitrogen atom. A chemical step turns it into a nitrile, and then an enzyme from bacteria converts the nitrile into niacinamide. Pairing chemical and enzyme steps like this is an example of green chemistry. It is efficient and produces very pure niacinamide.",
        "First, 3-methylpyridine is reacted with ammonia and oxygen at high temperature over a metal-oxide catalyst, a process called ammoxidation. This converts its methyl group (–CH₃) into a nitrile group (–C≡N), producing 3-cyanopyridine. Next, the 3-cyanopyridine is mixed with water and cells of Rhodococcus bacteria, which contain an enzyme called nitrile hydratase. The enzyme adds a water molecule across the nitrile's triple bond, turning it into an amide group (–CONH₂) and forming niacinamide. The product is then purified and crystallized.",
        { equation: "C6H4N2 + H2O → C6H6N2O", significance: "The enzyme step stops cleanly at the amide, avoiding over-hydrolysis to niacin." },
      ),
    ],
  },

  "salicylic-acid": {
    overview: [
      "Salicylic acid (2-hydroxybenzoic acid) is a benzene ring with a carboxylic acid group and a hydroxyl group on neighboring carbons. Because the –OH sits right next to the acid group, the two form an internal hydrogen bond, making salicylic acid more fat-soluble than most acids.",
      "That oil-friendliness is its superpower in skincare. Unlike water-soluble alpha-hydroxy acids, salicylic acid, a beta-hydroxy acid, dissolves into the oily sebum inside pores and exfoliates from within, which is why it's a go-to acne treatment.",
    ],
    mechanisms: [
      mech(
        "Unclogging pores",
        "Most skincare acids, such as alpha-hydroxy acids, dissolve well in water but poorly in oil. Salicylic acid is different: its –OH and –COOH groups sit next to each other and form a hydrogen bond with each other, hiding some of their water-loving character. That makes salicylic acid lipophilic, meaning it dissolves in oils such as sebum, the oily substance made inside hair follicles. Because it dissolves in sebum, it can travel down into pores. Inside the pore, it weakens desmosomes, the protein connections that hold the cells lining the pore together.",
        "Acne starts when dead skin cells and sebum clump together and clog a pore, forming a plug called a comedo. Open comedones are blackheads and closed ones are whiteheads. By loosening the cells that line the pore, salicylic acid helps them shed normally instead of sticking together and blocking it. That prevents new blackheads and whiteheads and helps loosen existing ones. It is especially useful for oily and acne-prone skin.",
        "human",
      ),
      mech(
        "Calming inflammation",
        "Salicylic acid is a close chemical relative of aspirin, which is acetylsalicylic acid. Inside cells, salicylic acid can reduce the production of prostaglandins, signaling molecules that promote inflammation. It also dampens a key inflammation pathway called NF-κB, which switches on genes for inflammatory proteins. Unlike aspirin, salicylic acid doesn't permanently block the COX enzymes that make prostaglandins, but it can lower their output by other routes. These effects have been seen mainly in laboratory studies.",
        "Inflammation is what makes acne spots red, swollen and painful. By reducing inflammatory signals, salicylic acid may help red, swollen pimples settle faster. Together with its pore-clearing action, that makes it a common ingredient in acne treatments. It is also used in dandruff shampoos and products for other flaky scalp conditions, where it helps loosen scales. Evidence for its anti-inflammatory effect in acne specifically comes mostly from the lab.",
        "lab",
      ),
      mech(
        "A plant immune hormone",
        "In plants, salicylic acid works as a hormone, a chemical signal that coordinates responses throughout the plant. When a plant is infected by a pathogen such as a bacterium or virus, it makes more salicylic acid. Salicylic acid binds to receptor proteins called NPR proteins. That binding changes the receptors and allows them to switch on genes that produce defense proteins. Some of those proteins attack the invaders directly.",
        "When one part of a plant is infected, salicylic acid levels rise and signals spread through the plant, preparing other parts to defend themselves. This is called systemic acquired resistance, and it resembles in some ways how the human immune system remembers infections. Plants that can't make or respond to salicylic acid are much more vulnerable to disease. Some farmers use chemicals that mimic salicylic acid to help protect crops. This role in plants is why many of them, willow included, contain salicylic acid or related compounds.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Kolbe–Schmitt carboxylation",
        "The Kolbe–Schmitt reaction attaches a carbon dioxide molecule directly to a benzene ring, turning phenol into salicylic acid. Hermann Kolbe developed it in 1860, and Rudolf Schmitt improved it in 1885. It is unusual because carbon dioxide is normally quite unreactive, but the electron-rich phenoxide ion is reactive enough to grab it. The reaction needs high temperature and pressure. It is still the main way salicylic acid is made today.",
        [
          ["Phenoxide", "Phenol, a benzene ring with an –OH group, is reacted with sodium hydroxide. This removes the hydrogen from the –OH, forming sodium phenoxide. The negatively charged oxygen pushes electrons into the ring, making the ring more reactive."],
          ["Carboxylation", "The sodium phenoxide is heated with carbon dioxide at about 125 °C and roughly 100 atmospheres of pressure. The electron-rich ring attacks the carbon of CO₂, attaching it at the position right next to the oxygen. The sodium ion helps hold the CO₂ near that spot."],
          ["Acidification", "The product, sodium salicylate, is treated with sulfuric acid. This adds hydrogen ions, converting the salt into salicylic acid. Salicylic acid is less soluble in water, so it comes out as crystals."],
        ],
        "Hermann Kolbe's 1860 synthesis made salicylic acid cheap enough to become aspirin's starting material. Using potassium instead of sodium shifts where the carboxyl group attaches, producing para-hydroxybenzoic acid, the starting material for parabens.",
        "C6H5ONa + CO2 → C6H4(OH)COONa",
      ),
      rxn(
        "Acetylation to aspirin",
        "Salicylic acid itself was used for pain and fever in the 1800s, but it badly irritated the stomach. In 1897, chemists at the German company Bayer, including Felix Hoffmann, found that adding an acetyl group to salicylic acid made it gentler. The result was acetylsalicylic acid, sold as aspirin. The reaction is an esterification, forming an ester bond between salicylic acid and an acetyl group. Aspirin went on to become one of the most widely used medicines in history.",
        [
          ["Reagent", "Acetic anhydride, made by joining two acetic acid molecules with the loss of water, is a reactive source of acetyl groups (CH₃CO–). It reacts far more readily than acetic acid itself. A little acid catalyst is often added."],
          ["Esterification", "The –OH group on salicylic acid's ring attacks one of the carbonyl carbons of acetic anhydride. A new bond forms, attaching an acetyl group to that oxygen and creating an ester. The other half of the anhydride leaves as acetic acid."],
          ["Product", "The products are acetylsalicylic acid (aspirin) and acetic acid. The aspirin is purified by crystallization, usually from cold water, in which it dissolves poorly."],
        ],
        "In the body, aspirin transfers its acetyl group to the COX enzyme, permanently blocking it, and becomes salicylic acid again. Blocking COX reduces the production of prostaglandins, which cause pain, fever and inflammation, and of thromboxane, which helps blood clot; that second effect is why low-dose aspirin is used to prevent heart attacks.",
        "C7H6O3 + (CH3CO)2O → C9H8O4 + CH3COOH",
      ),
    ],
    hazards: [
      hz(
        "Dryness and irritation",
        "The most common side effect of salicylic acid in skincare is dryness, peeling or mild irritation. It happens because the acid exfoliates the skin and the products have a low pH. It is more likely when salicylic acid is used often, at high concentrations, or together with other exfoliants or retinoids. People with dry or sensitive skin are more prone to it. Using a moisturizer and starting with less frequent application helps.",
        "Salicylic acid loosens the connections between cells in the skin's outer layer, so dead cells shed faster. Products containing it are also usually kept at a low pH, to keep the acid in its active, uncharged form. Both effects can weaken the skin barrier, especially alongside other acids or retinoids that also speed up cell turnover. A weaker barrier lets more water escape and lets irritants penetrate. Salicylic acid can also directly irritate nerve endings in the skin.",
        "When the barrier is weakened, water loss increases and skin feels dry, tight and flaky. Peeling happens as dead cells shed faster than usual. Irritation can cause stinging, burning or redness, especially on sensitive areas around the nose and mouth. These effects are usually mild and settle when use is cut back. Using salicylic acid every other day, applying moisturizer and wearing sunscreen all help protect the skin.",
      ),
      hz(
        "Salicylate toxicity from large-area use",
        "Salicylic acid in spot treatments and face washes is very safe, but applying high-strength products to large areas of skin, especially broken skin, can let enough be absorbed to cause poisoning. This is called salicylate toxicity, or salicylism. It is a particular concern for young children, who have a lot of skin relative to their body weight, and for people with kidney or liver problems. Cases have occurred with treatments for skin conditions such as psoriasis that covered large areas. Products for large areas are usually used under medical supervision.",
        "Salicylic acid can pass through the skin into the bloodstream, where it travels as salicylate. The amount absorbed rises with the concentration, the area covered, how long it stays on, and whether the skin is damaged or covered by a dressing. In the blood, salicylate interferes with several processes, including energy production in mitochondria and the body's acid–base balance. It also directly stimulates the brain's breathing center. The kidneys remove salicylate, but slowly when levels are high.",
        "Early signs of salicylate toxicity include ringing in the ears (tinnitus), nausea, vomiting and dizziness. As levels rise, breathing becomes fast and deep and the body's acid–base balance is thrown off. Severe cases can cause confusion, seizures and organ damage and can be life-threatening. Treatment means stopping the exposure and, in hospital, helping the body get rid of the salicylate. Using salicylic acid only on small areas and following label directions prevents the problem.",
      ),
    ],
    dosage:
      "Over-the-counter acne products in the United States contain 0.5 to 2 percent salicylic acid, and the European Union generally limits it to 2 percent in leave-on cosmetics, with lower limits for some product types. Wart and callus removers can contain up to 40 percent but are meant only for small areas. Under EU rules, products containing it shouldn't be used on children under three, except shampoos. People with aspirin allergy should avoid salicylic acid. Daily sunscreen is a good idea, since exfoliation can increase sun sensitivity.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Almost all salicylic acid made today is produced from phenol using the Kolbe–Schmitt reaction. The phenol itself is made from petroleum chemicals. The process is efficient and has run on an industrial scale for more than a century. Most of the world's salicylic acid is turned into aspirin. The rest goes into skincare, dandruff shampoos, food preservatives and other products.",
        "Phenol is reacted with sodium hydroxide to make sodium phenoxide, which is dried carefully because water interferes with the next step. The dry sodium phenoxide is heated with carbon dioxide gas at about 100 atmospheres and 125 °C. The carbon dioxide attaches to the ring next to the oxygen, forming sodium salicylate. This is dissolved in water and acidified with sulfuric acid, so salicylic acid crystallizes out. It is then purified by recrystallization or sublimation to the standard needed for medicines and cosmetics.",
        { significance: "Most of the world's salicylic acid becomes aspirin, one of the most widely used medicines ever made." },
      ),
      route(
        "From willow bark",
        "Long before modern chemistry, people used willow bark to treat pain and fever. Ancient Sumerian and Egyptian texts describe willow remedies, and the Greek physician Hippocrates recommended willow leaves. Willow bark contains salicin, a natural compound the body converts into salicylic acid. In the 1800s, scientists isolated salicin and then salicylic acid from willow and from other plants such as meadowsweet. Those discoveries led directly to aspirin.",
        "Salicin is a molecule made of salicyl alcohol joined to a glucose sugar. When willow bark is eaten, enzymes in the intestine remove the glucose, releasing salicyl alcohol, which is absorbed and then oxidized in the liver to salicylic acid. In 1828 Johann Buchner isolated salicin from willow bark, and in 1838 the Italian chemist Raffaele Piria converted salicin into salicylic acid in the lab. He did it by splitting off the sugar and oxidizing what remained. Salicylic acid was also obtained from meadowsweet, whose old Latin name, Spiraea, gave aspirin the “spir” in its name.",
        { significance: "Willow bark remedies for pain and fever date back thousands of years, to ancient Sumer and Egypt." },
      ),
    ],
  },

  retinol: {
    overview: [
      "Retinol is vitamin A in its alcohol form: a six-membered ring (the β-ionone ring) attached to a long chain of four alternating double bonds, ending in an –OH group. That long conjugated chain absorbs light, making retinol pale yellow and very sensitive to UV light and oxygen.",
      "In skin, retinol is converted step by step into retinoic acid, which acts like a hormone, switching genes on and off inside cell nuclei. That's why retinoids are among the few cosmetic ingredients with strong evidence for reducing wrinkles.",
    ],
    mechanisms: [
      mech(
        "Switching genes through nuclear receptors",
        "Retinol itself is inactive; skin cells first have to convert it into retinoic acid. Retinoic acid travels into the cell's nucleus, where the DNA is kept. There it binds to proteins called retinoic acid receptors (RARs), which pair up with a second kind of receptor called retinoid X receptors (RXRs). These receptor pairs sit on specific stretches of DNA called retinoic acid response elements. When retinoic acid binds, the receptors change shape and switch nearby genes on or off.",
        "The genes controlled by retinoic acid govern how skin cells grow, divide and mature. Retinoids speed up skin-cell turnover, so old, damaged cells at the surface are replaced more quickly. They also increase production of collagen, the protein that keeps skin firm, and reduce the activity of enzymes called matrix metalloproteinases (MMPs) that break collagen down, especially after sun exposure. Over months of use, this can smooth fine lines, improve texture and even out skin tone. Retinoids are among the few cosmetic ingredients with strong scientific evidence for reducing wrinkles.",
        "human",
      ),
      mech(
        "Vision",
        "In the retina at the back of the eye, light is detected by a molecule called retinal, the aldehyde form of vitamin A. Retinal is held inside a protein called opsin, and together they form rhodopsin in the rod cells. In the dark, retinal has a bent shape, called 11-cis-retinal, because one of its double bonds is in a cis arrangement. When retinal absorbs a photon of light, the energy flips that double bond into the straight trans arrangement. Retinal goes from bent to straight in trillionths of a second.",
        "When retinal straightens, it no longer fits snugly inside opsin, so the protein changes shape. That sets off a chain of reactions inside the rod cell that ends with a nerve signal sent to the brain. Rod cells handle vision in dim light, so they depend especially heavily on vitamin A. Vitamin A deficiency first causes night blindness, an inability to see in dim light. Severe deficiency can damage the cornea and cause permanent blindness, and it remains a major cause of preventable blindness in children worldwide.",
        "established",
      ),
      mech(
        "Treating acne",
        "In acne, the cells lining the hair follicles grow and shed abnormally. Instead of falling away, they stick together and mix with sebum, clogging the pore. Retinoids bind to retinoic acid receptors in these cells and change the activity of genes that control how they mature and detach. This makes shed cells less sticky and brings the follicle lining's renewal back to normal. Retinoids also calm inflammation by affecting immune signals.",
        "With fewer sticky cells clogging pores, fewer blackheads and whiteheads (comedones) form, and comedones are the starting point of every acne spot. Existing ones are loosened and cleared. Because they target the root cause, dermatologists consider retinoids a first-line treatment for most types of acne. Prescription retinoids such as tretinoin and adapalene are stronger than cosmetic retinol. Adapalene 0.1 percent is now sold without a prescription in many countries.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Stepwise oxidation in skin",
        "Retinol is a precursor: it has to be converted into retinoic acid before it can switch on genes. This happens in two oxidation steps inside skin cells, each carried out by a different enzyme. Each step removes hydrogen atoms or adds oxygen, changing the group at the end of the molecule. Because each step is slow, only a fraction of the retinol becomes retinoic acid. That explains why retinol is gentler but slower-acting than prescription retinoids.",
        [
          ["Step 1", "The enzyme retinol dehydrogenase removes two hydrogen atoms from retinol's –CH₂OH end, converting it into an aldehyde group (–CHO). This makes retinal, also called retinaldehyde. This step can run in both directions, so retinal can be turned back into retinol."],
          ["Step 2", "The enzyme retinal dehydrogenase adds an oxygen atom to retinal's aldehyde group, converting it into a carboxylic acid group (–COOH). This makes retinoic acid. This step only runs one way."],
          ["Action", "Binding proteins carry retinoic acid into the nucleus, where it attaches to retinoic acid receptors (RARs) and switches genes on and off. Extra retinoic acid is broken down by enzymes called CYP26, so it doesn't build up."],
        ],
        "Each conversion step limits how much reaches the active form, which is why retinol is gentler and slower than prescription retinoic acid (tretinoin). Retinal, sold in some products as retinaldehyde, is one step closer to the active form and works somewhat faster than retinol.",
        "C20H30O → C20H28O → C20H28O2",
      ),
      rxn(
        "Light-triggered isomerization (how you see)",
        "Vision depends on one of the fastest chemical reactions in biology: a light-triggered change in the shape of retinal. When retinal absorbs light, one of its double bonds flips from a bent (cis) arrangement to a straight (trans) one. This change, called isomerization, takes about 200 femtoseconds, which is 200 millionths of a billionth of a second. It is the first step in turning light into a nerve signal. Afterward, the retinal has to be reset to its bent form.",
        [
          ["Resting state", "In the dark, 11-cis-retinal sits inside a protein called opsin, and together they form rhodopsin in the retina's rod cells. The cis double bond at position 11 gives the retinal chain a bent shape. That bent shape fits snugly inside the protein."],
          ["Absorption", "When a photon strikes, its energy is absorbed by retinal's conjugated double bonds. This briefly loosens the double bond at position 11, so that part of the molecule can rotate. The chain straightens into all-trans-retinal."],
          ["Signal", "The straightened retinal no longer fits inside opsin, so the protein changes shape. This activates a protein called transducin, starting a chain of reactions that changes the rod cell's electrical state and sends a signal along the optic nerve to the brain."],
        ],
        "The used all-trans-retinal is released and recycled back into the 11-cis form by a series of enzymes. The same light sensitivity is why retinol products come in opaque packaging and are used at night: UV and visible light break down retinol's chain of double bonds.",
      ),
    ],
    hazards: [
      hz(
        "Irritation (“retinization”)",
        "When people first start using retinol, it is common to go through a period of irritation called retinization. Symptoms include redness, dryness, peeling and sometimes stinging. They usually start within the first week or two and settle within about four to six weeks as the skin adapts. Stronger products and more frequent use make it more likely. Starting slowly, with a low concentration a few nights a week, helps the skin adjust.",
        "Retinoic acid formed from retinol speeds up skin-cell turnover and changes the production of the lipids and proteins that make up the skin barrier. During the adjustment period, the outer layer becomes thinner and the barrier lipids are temporarily disrupted. That lets more water escape and more irritants get in. Retinoids also trigger the release of inflammatory signals in the skin. These changes are part of how retinoids work, but they also cause irritation.",
        "With the barrier temporarily weakened, skin loses more water and becomes dry, flaky and tight. Faster cell turnover causes peeling. Inflammatory signals cause redness and sometimes burning or stinging. Over several weeks the skin adapts: cells adjust their gene activity and the barrier recovers. A gentle moisturizer, avoiding other harsh products and using retinol every other night at first make the process more comfortable.",
      ),
      hz(
        "Pregnancy caution",
        "Standard medical advice is to avoid retinoids during pregnancy. The caution comes from oral retinoids such as isotretinoin, a powerful acne medicine that can cause severe birth defects. Retinol in cosmetics is absorbed in very small amounts, and there is no clear evidence it harms a developing baby. But because the consequences could be serious, doctors recommend avoiding it as a precaution. Pregnant people can use other ingredients, such as azelaic acid, for acne or pigmentation.",
        "Retinoic acid plays a crucial role in the developing embryo, switching genes on and off in precise patterns that guide how organs and limbs form. The amount of retinoic acid in each part of the embryo has to be tightly controlled. When there is too much, especially early in pregnancy, those signals are scrambled and organs can form abnormally. Oral isotretinoin is a form of retinoic acid that reaches high levels in the blood. Retinol on the skin is absorbed far less and converted to retinoic acid only slowly.",
        "Oral isotretinoin can cause severe birth defects affecting the brain, heart, face and ears, as well as miscarriage, so people taking it must use reliable contraception and have regular pregnancy tests. Studies of retinoids applied to the skin haven't shown a clear increase in birth defects, because blood levels stay very low. Even so, avoiding them during pregnancy and breastfeeding is recommended as a precaution. Vitamin A from food, in normal amounts, is essential for a healthy pregnancy.",
      ),
      hz(
        "Sun sensitivity",
        "Retinoids can make skin more sensitive to sunlight, so it burns more easily. That is why retinol products are usually used at night, with sunscreen every morning. The extra sensitivity is greatest in the first weeks of use. Retinol itself also breaks down in sunlight, so it works less well if applied in the morning. Consistent sun protection also helps retinoids show their full benefits.",
        "Retinoids speed up shedding of the dead cells in the outermost layer of skin, the stratum corneum, making it thinner. This layer normally helps scatter and absorb ultraviolet light before it reaches living cells. With a thinner layer, more UV gets through to the living cells beneath. On top of that, retinol's long chain of double bonds absorbs UV light, which breaks the molecule apart. So sunlight both weakens retinol and makes the skin more vulnerable.",
        "With more UV reaching living skin cells, skin burns more easily and suffers more DNA damage. Sunburn cells, damaged skin cells that self-destruct, form more readily. Over time, extra UV damage could cancel out the anti-aging benefits of retinoids, since UV is the main cause of skin aging. Daily broad-spectrum sunscreen and limiting sun exposure protect the skin. Many dermatologists suggest pausing retinoids for a few days before intense sun, such as a beach vacation.",
      ),
    ],
    dosage:
      "Cosmetic retinol products typically contain 0.01 to 1 percent retinol, while prescription retinoids such as tretinoin are stronger. The European Union has set limits of 0.3 percent retinol equivalent for face and hand products and 0.05 percent for body lotions, to keep total vitamin A exposure safe when combined with diet. Starting with a low concentration two or three nights a week and increasing slowly helps avoid irritation. Retinoids should be avoided during pregnancy as a precaution. Daily sunscreen is essential while using them.",
    synthesis: [
      route(
        "Biological synthesis from beta-carotene",
        "Animals, including humans, can't make vitamin A from scratch, but they can make it from beta-carotene and other carotenoids found in plants. Beta-carotene is the orange pigment in carrots, sweet potatoes, pumpkins and many leafy greens. Plants make carotenoids to help capture light and protect themselves from light damage. When we eat these plants, enzymes in the intestine convert beta-carotene into vitamin A. Animal foods such as liver, eggs and dairy contain ready-made vitamin A.",
        "Beta-carotene is a long molecule with a ring at each end and a chain of 11 conjugated double bonds between them. In the cells lining the intestine, an enzyme called beta-carotene oxygenase 1 (BCO1) cuts the molecule exactly in the middle. This produces two molecules of retinal, each with one ring and half of the chain. Retinal is then reduced to retinol by adding hydrogen atoms. Retinol is attached to fatty acids to form retinyl esters, which are packaged with dietary fat and carried to the liver, where most of the body's vitamin A is stored.",
        { significance: "Carrots don't contain vitamin A itself, but their beta-carotene becomes vitamin A in your body." },
      ),
      route(
        "Industrial synthesis",
        "Most of the vitamin A in supplements, fortified foods, animal feed and cosmetics is made synthetically by chemical companies such as BASF and DSM. The challenge is building a 20-carbon molecule with a ring and four conjugated double bonds in exactly the right arrangement. Chemists solve it by joining two smaller pieces together. The final product is usually retinyl acetate or retinyl palmitate, more stable forms that the body converts to retinol. Synthetic vitamin A is chemically identical to vitamin A from food.",
        "In BASF's route, chemists start from β-ionone, a ring-shaped molecule with a short side chain that also gives violets their scent. It is extended and converted into a 15-carbon molecule carrying a phosphorus group, called a phosphonium salt. This salt is reacted with a 5-carbon aldehyde in a Wittig reaction, which joins the two pieces by forming a new carbon–carbon double bond. The result is retinyl acetate, with all 20 carbons in place. It is purified by crystallization and protected from light and oxygen.",
        { significance: "The Wittig reaction, which joins molecules with a C=C bond, earned Georg Wittig a share of the 1979 Nobel Prize." },
      ),
    ],
  },

  "zinc-oxide": {
    overview: [
      "Zinc oxide (ZnO) is an inorganic mineral that crystallizes in the wurtzite structure, where each zinc ion sits inside a tetrahedron of four oxygen ions. It's a white, insoluble powder gentle enough for diaper creams.",
      "It's also a semiconductor with a band gap of about 3.3 electron volts. Photons with more energy than that, meaning UV light shorter than about 380 nm, are absorbed, so zinc oxide blocks UVB and most UVA, the broadest coverage of any single sunscreen filter.",
    ],
    mechanisms: [
      mech(
        "Broad-spectrum UV protection",
        "Zinc oxide is a semiconductor, a material whose electrons need a certain minimum amount of energy, called the band gap, to jump to a higher energy level. For zinc oxide the band gap is about 3.3 electron volts, which matches light with a wavelength of about 380 nanometers. Ultraviolet light has shorter wavelengths and more energy than that, so it is absorbed as it kicks electrons across the gap. Visible light has longer wavelengths and less energy, so it isn't absorbed. Zinc oxide particles also scatter and reflect some light.",
        "The absorbed UV energy is released mostly as a tiny amount of heat, which harmlessly dissipates. By absorbing UV before it reaches living skin cells, zinc oxide stops it from damaging DNA and other molecules. It protects against both UVB rays, which cause sunburn, and most UVA rays, which penetrate deeper, age the skin and contribute to skin cancer. Zinc oxide gives the broadest protection of any single sunscreen ingredient approved in the U.S. It is often recommended for sensitive skin and children because it rarely irritates.",
        "established",
      ),
      mech(
        "Soothing irritated skin",
        "Applied to skin, zinc oxide forms a thick physical barrier that shields the skin from moisture, friction and irritants such as urine and stool in the diaper area. Because zinc oxide dissolves slightly in acid, the skin's mildly acidic surface releases small amounts of zinc ions (Zn²⁺) from it. Zinc is an essential trace element that many enzymes in the body need. Some of those enzymes are involved in repairing wounds. Zinc ions also have mild antimicrobial effects.",
        "The physical barrier keeps irritants off damaged skin so it can heal. The zinc ions may support the enzymes that repair tissue and help calm inflammation, and zinc's mild antibacterial and antifungal effects can help prevent infection in broken skin. That is why zinc oxide is the key ingredient in diaper rash creams, calamine lotion and many treatments for minor skin irritation. The U.S. FDA recognizes zinc oxide as a skin protectant. It is gentle enough for newborns.",
        "human",
      ),
      mech(
        "Staying on the surface",
        "Sunscreen makers often use nano-sized zinc oxide particles, smaller than 100 nanometers, because they look clear on the skin instead of leaving a white cast. Some people have worried that such small particles might soak into the skin. In practice, nanoparticles tend to clump together into larger clusters called aggregates. These clusters are too big to pass through the tightly packed outer layer of skin. Even single nanoparticles are blocked by the structure of the stratum corneum.",
        "Studies using sensitive techniques, including tracing zinc with special isotopes, found that zinc oxide nanoparticles stay in the outermost layer of dead skin cells, in skin folds and in hair follicles. Very little, if any, reaches living skin cells or the bloodstream through intact skin. A tiny amount of zinc may be absorbed as zinc ions, but that is small next to the zinc in a normal diet. The European Union's scientific safety committee has concluded that nano zinc oxide is safe in sunscreens applied to healthy skin. Sprays and powders are a different matter, because they could be breathed in.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Amphoteric behavior",
        "Zinc oxide is amphoteric, meaning it can react as either a base or an acid. With acids, it acts as a base and dissolves to form zinc salts. With strong bases, it acts as an acid and dissolves to form zincate ions. Most metal oxides behave only as bases, so this two-sided behavior is unusual. It explains some of zinc oxide's behavior in skin products and in industry.",
        [
          ["With acid", "Hydrogen ions (H⁺) from an acid react with the oxide ions in zinc oxide, forming water and releasing zinc ions (Zn²⁺) into solution. For example, zinc oxide reacts with hydrochloric acid to form zinc chloride and water. Here zinc oxide is acting as a base."],
          ["With base", "In strong hydroxide solutions, such as concentrated sodium hydroxide, zinc oxide reacts with hydroxide ions to form zincate ions, [Zn(OH)₄]²⁻. Here zinc oxide is acting as an acid. This doesn't happen at the pH of skin."],
          ["In skin products", "Skin's surface is mildly acidic, with a pH of about 4.5 to 5.5. At that pH a tiny amount of zinc oxide dissolves, releasing a small number of zinc ions. These may contribute to its soothing and antimicrobial effects."],
        ],
        "Being amphoteric means zinc oxide can act as either an acid or a base, depending on its surroundings. Industry uses this property too, for example to scrub acidic gases out of exhaust and to make zinc salts.",
        "ZnO + 2 HCl → ZnCl2 + H2O",
      ),
      rxn(
        "The French process",
        "The French process is one of the oldest ways of making very pure zinc oxide. It works by boiling zinc metal into vapor and burning that vapor in air. It was popularized in France in the 1840s. The method produces a fine, pure white powder suitable for paints, cosmetics and medicines. The size of the particles can be controlled by adjusting the conditions.",
        [
          ["Vaporizing", "Zinc metal is heated in a furnace above its boiling point, about 907 °C, turning it into a gas. Starting from pure zinc metal guarantees a pure product. The zinc vapor flows into a combustion chamber."],
          ["Combustion", "The zinc vapor reacts with oxygen in the air, burning with a bright, bluish-white flame. Each pair of zinc atoms combines with an oxygen molecule to form zinc oxide. The reaction gives off a lot of heat."],
          ["Collection", "The zinc oxide forms as a fine white smoke of tiny particles, which are cooled and caught in bag filters. The particles can be sorted by size. Cosmetic grades are often coated to help them spread smoothly on skin."],
        ],
        "Alchemists called the fluffy white product “philosopher's wool” because it looked like cotton. The French process remains the main source of high-purity zinc oxide.",
        "2 Zn + O2 → 2 ZnO",
      ),
    ],
    hazards: [
      hz(
        "Inhaling powder or fumes",
        "Zinc oxide in creams and lotions is very safe, but breathing in zinc oxide powder or fumes can be harmful. For consumers, the main concern is breathing in sprayed or powdered sunscreen. For workers, the bigger risk is fresh zinc oxide fumes formed when zinc-coated (galvanized) metal is welded or cut. Those fumes can cause an illness called metal fume fever. Avoiding inhalation is the key precaution.",
        "When zinc-coated metal is heated to very high temperatures during welding, the zinc vaporizes and instantly reacts with oxygen in the air, forming tiny particles of fresh zinc oxide. These particles are extremely small, often only nanometers across, so they can be breathed deep into the lungs, down to the tiny air sacs called alveoli. Fine powders from sprays and loose cosmetics can also reach the lungs, though they are usually larger. In the lungs, the particles interact with immune cells and with the airway lining. Fresh fumes are far more reactive than the powder in a lotion.",
        "Metal fume fever causes flu-like symptoms, including fever, chills, muscle aches, headache, cough and a metallic taste, usually starting a few hours after exposure. It comes from an inflammatory response in the lungs, in which immune cells release signals that cause fever. Symptoms usually clear within a day or two. Curiously, workers become tolerant over the working week and lose that tolerance over the weekend, so symptoms can be worst on Mondays, earning it the nickname “Monday fever.” Good ventilation and masks prevent it.",
      ),
      hz(
        "Zinc in waterways",
        "When people swim in sunscreen or wash it off, some zinc oxide can end up in rivers, lakes and oceans. At high concentrations, zinc can harm some aquatic life, including algae, fish and coral. This is mainly a local concern in heavily used swimming spots. Zinc oxide is often considered more reef-friendly than some chemical UV filters, but it isn't entirely free of environmental impact. Researchers are still studying its effects in real-world conditions.",
        "In water, zinc oxide particles slowly dissolve, especially under slightly acidic conditions, releasing zinc ions (Zn²⁺). Zinc ions can interfere with how aquatic animals move other ions, such as calcium, across their membranes, particularly in fish gills. Zinc oxide nanoparticles may also generate reactive oxygen molecules in sunlight, which can damage cells. How toxic it is depends on the zinc concentration, the water chemistry and the species. Coatings on the particles may reduce these effects.",
        "Fish gills rely on moving ions in and out to absorb oxygen and control their salt and calcium levels. When zinc disrupts that, fish can struggle to breathe and to keep their body chemistry in balance. Some studies have found that high concentrations of zinc oxide nanoparticles can harm coral and the algae living inside it, contributing to coral bleaching. Those effects were mostly seen in laboratory studies with high concentrations. Using sunscreen sensibly and covering up with clothing reduces the environmental impact.",
      ),
    ],
    dosage:
      "Sunscreens typically contain 5 to 25 percent zinc oxide, and the U.S. FDA allows up to 25 percent; in 2019 it proposed recognizing zinc oxide as safe and effective. Diaper rash creams contain 10 to 40 percent. On intact skin, it isn't absorbed into the body in meaningful amounts. Avoid breathing in sprayed or powdered sunscreen, and spray it onto your hands first before applying it to your face. Zinc oxide is also used as a zinc supplement in fortified foods, where it provides an essential nutrient.",
    synthesis: [
      route(
        "French process",
        "The French process, also called the indirect process, starts with pure zinc metal and produces very pure zinc oxide. It is the main method for the zinc oxide used in cosmetics, medicines and high-quality paints. It is called indirect because it uses refined zinc metal rather than ore. It was popularized in France in the 1840s. The size and shape of the particles can be carefully controlled.",
        "Pure zinc metal is melted and then boiled in a furnace, becoming zinc vapor at about 907 °C. The vapor is directed into a combustion chamber, where it reacts with oxygen in the air and burns with a bright flame. Each zinc atom combines with an oxygen atom, forming zinc oxide particles that cool and solidify into a fine white powder. By controlling the temperature, airflow and cooling rate, manufacturers control the particle size. The powder is collected, sorted by size and, for cosmetics, often coated with materials such as silica to improve how it performs and reduce its reactivity.",
        { significance: "Controlling the burn controls the particle size, which decides whether zinc oxide looks chalky white or nearly clear on skin." },
      ),
      route(
        "American process",
        "The American process, also called the direct process, makes zinc oxide straight from zinc ore without first refining it into pure zinc metal. It was developed in the United States in the 1850s. It is cheaper than the French process but gives less pure zinc oxide, which may carry traces of other metals from the ore. This grade goes mainly into rubber, ceramics and other industrial uses. Most of the world's zinc oxide is used in rubber manufacturing.",
        "Zinc ore, usually zinc sulfide or zinc carbonate, is first roasted in air to turn it into impure zinc oxide. This is mixed with coal and heated strongly. The carbon in the coal strips oxygen from the zinc oxide, producing zinc vapor and carbon monoxide. The zinc vapor is then immediately burned in air within the same process, forming zinc oxide again, now as a finer, cleaner powder. Impurities from the ore can be carried along, so the product is less pure than French-process zinc oxide.",
        { significance: "Rubber manufacturing, not cosmetics, uses most of the world's zinc oxide; it helps cure the rubber in car tires." },
      ),
    ],
  },

  methylisothiazolinone: {
    overview: [
      "Methylisothiazolinone (MIT) is a small five-membered ring in which sulfur and nitrogen are bonded directly to each other, next to a carbonyl group. That N–S bond is weak and electron-poor, which makes the molecule eager to react with sulfur atoms in proteins.",
      "That reactivity makes MIT a powerful preservative at parts-per-million levels, and it's the same property that makes it one of the most common causes of allergic contact dermatitis. The EU banned it from leave-on cosmetics in 2017.",
    ],
    mechanisms: [
      mech(
        "Disabling microbial enzymes",
        "MIT's five-membered ring contains a sulfur atom bonded directly to a nitrogen atom, and that N–S bond is weak and electron-poor. Many enzymes inside microbes contain the amino acid cysteine, which carries a thiol group (–SH), a sulfur atom with a hydrogen attached. The thiol's sulfur is drawn to MIT's electron-poor sulfur and attacks it, breaking the N–S bond. This forms a new sulfur–sulfur bond, called a disulfide, tying the enzyme to the opened-up MIT molecule. With its cysteine blocked, the enzyme can no longer work.",
        "Many of the enzymes microbes need for respiration and energy production, such as dehydrogenases, depend on cysteine thiols in their active sites. When MIT blocks those thiols, energy production shuts down. Bacteria and fungi stop growing within minutes and die within hours. Because the reaction targets such a basic feature of proteins, MIT works against a wide range of microbes, including bacteria, yeasts and molds. That makes it a powerful preservative even at a few parts per million.",
        "lab",
      ),
      mech(
        "Sensitizing human skin",
        "The same reaction that disables microbial enzymes also happens with proteins in human skin. Skin proteins contain cysteine, and their thiol groups can attack MIT's N–S bond and form disulfide links. This attaches MIT fragments to skin proteins, a process called haptenation. The modified proteins have new shapes the immune system has never seen before. MIT is small and slips into skin easily, which makes it efficient at this.",
        "Immune cells in the skin called Langerhans cells pick up the modified proteins and present them to T cells in the lymph nodes, teaching those T cells to recognize them. Once a person is sensitized, later exposures trigger allergic contact dermatitis, an itchy, red, sometimes blistering rash. Sensitized people can react to tiny amounts, just a few parts per million. Some even react to MIT evaporating from freshly painted walls. The allergy usually lasts for life.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Thiol attack and ring opening",
        "MIT works by reacting with thiol groups, the –SH groups on the amino acid cysteine in proteins. The reaction opens MIT's ring and fastens it to the protein through a sulfur–sulfur bond. Chemists call this thiol–disulfide exchange. The same reaction explains both how MIT kills microbes and how it causes allergies in people. It is a clear example of a single chemical property having both useful and harmful effects.",
        [
          ["Attack", "The sulfur atom of a cysteine thiol in a protein has spare electrons, and it is drawn to the sulfur in MIT's ring, which is electron-poor because it is bonded to an electron-hungry nitrogen. The thiol sulfur attacks MIT's sulfur and starts forming a new bond."],
          ["Ring opening", "As the new sulfur–sulfur bond forms, the weak nitrogen–sulfur bond in MIT's ring breaks. The ring opens up into a chain. The nitrogen picks up a hydrogen."],
          ["Disulfide", "The protein is now linked to the opened MIT through a disulfide bond (S–S). The cysteine's thiol is blocked and can no longer do its job in the protein. The protein is permanently altered."],
        ],
        "Any protein with an exposed cysteine can be modified, whether it is a bacterial enzyme or a skin protein. That lack of selectivity is exactly what makes MIT both a powerful preservative and a strong allergen.",
        "R-SH + MIT → R-S-S-(ring-opened adduct)",
      ),
      rxn(
        "Making the ring",
        "MIT is made by forming a ring that includes a sulfur–nitrogen bond. The starting material contains a sulfur atom and an amide group, and the ring is closed by linking that sulfur to the amide's nitrogen. This needs a chlorinating agent to activate the sulfur. The reaction often produces a mixture of MIT and a closely related chlorinated molecule, methylchloroisothiazolinone (MCI). The mixture is sometimes sold as a preservative blend.",
        [
          ["Precursor", "The starting material is N-methyl-3-mercaptopropionamide, a small molecule with a thiol group (–SH) at one end and an amide group with a methyl on its nitrogen at the other. Sometimes its disulfide, two molecules joined through their sulfur atoms, is used instead. It contains every atom the ring needs."],
          ["Chlorination", "A chlorinating agent, such as chlorine or sulfuryl chloride, reacts with the sulfur atom and attaches chlorine to it. That makes the sulfur electron-poor and reactive. It is now ready to bond with the nitrogen."],
          ["Cyclization", "The amide's nitrogen attacks the activated sulfur, forming a nitrogen–sulfur bond and closing the five-membered ring, and a double bond forms in the ring as well. Some molecules pick up an extra chlorine on the ring, which gives MCI."],
        ],
        "MCI and MIT are often sold together as a blend, which is an even stronger sensitizer. The ratio of MIT to MCI can be adjusted by changing the reaction conditions.",
      ),
    ],
    hazards: [
      hz(
        "Allergic contact dermatitis",
        "MIT is one of the most common causes of allergic contact dermatitis, a skin allergy caused by direct contact. Allergy rates rose dramatically in the 2010s after manufacturers began using MIT on its own at higher concentrations to replace older preservatives. The American Contact Dermatitis Society named it Allergen of the Year in 2013. In response, the European Union banned MIT from leave-on cosmetics in 2017 and capped its concentration in rinse-off products. Allergy rates in Europe have since fallen.",
        "MIT reacts with cysteine thiols in skin proteins, fastening itself to them through disulfide bonds. Because it is small, penetrates skin easily and reacts readily, it modifies skin proteins very efficiently. The more MIT in a product and the longer it stays on the skin, the greater the chance of sensitization. Leave-on products such as lotions and wet wipes keep MIT on the skin for hours, so they are especially likely to cause it. Rinse-off products cause much less exposure.",
        "Once sensitized, a person's immune system reacts to MIT whenever they meet it, causing an itchy, red, sometimes blistering eczema where products touch the skin. Common sites include the hands, face, eyelids and, in children, the diaper area, from wet wipes. The rash usually appears one to three days after exposure. Because MIT turns up in cosmetics, cleaning products, paints and glues, avoiding it can be challenging. Dermatologists confirm the allergy with patch testing.",
      ),
      hz(
        "Airborne exposure",
        "MIT is used as a preservative in water-based paints, glues and cleaning products, and it can evaporate into the air from them. People who are already allergic to MIT can develop skin reactions just from being in a freshly painted room, without touching anything. This is called airborne contact dermatitis. It can be severe and hard to trace to its cause. MIT-free paints are available for people who are sensitized.",
        "MIT is a small molecule that evaporates fairly readily at room temperature. As paint dries, water evaporates and carries some of the MIT with it. MIT levels in the air of a freshly painted room can stay raised for weeks. The airborne MIT settles on exposed skin, especially the face and eyelids. It then reacts with skin proteins in the usual way.",
        "In sensitized people, airborne MIT causes allergic reactions on exposed skin, usually the face, eyelids and neck. The rash is often itchy and swollen and can be mistaken for other conditions. Some people also get respiratory symptoms, such as a runny nose or difficulty breathing. Symptoms continue as long as the person stays in that environment, which can be weeks after painting. Ventilating rooms, avoiding newly painted spaces and choosing MIT-free paint prevent reactions.",
      ),
    ],
    dosage:
      "In the European Union, MIT is banned from leave-on cosmetics and limited to 15 parts per million (0.0015 percent) in rinse-off products, while cleaners and paints may contain tens of parts per million. Once someone is sensitized, reactions can occur at just a few parts per million, including from paint fumes. In the United States it is still allowed in leave-on products, although many manufacturers have reduced or dropped it. People with MIT allergy should check labels for both methylisothiazolinone and methylchloroisothiazolinone. Patch testing can confirm the allergy.",
    synthesis: [
      route(
        "Industrial synthesis",
        "MIT is made in chemical plants by closing a ring that contains a sulfur–nitrogen bond. Isothiazolinones were developed as preservatives and biocides in the 1960s and 1970s. MIT is often produced together with MCI, a related chlorinated molecule, and the two can be separated or sold as a mixture. Besides cosmetics, isothiazolinones are used in paints, adhesives, cooling water, fuels and cleaning products. Their power at very low concentrations made them popular.",
        "The starting material, N-methyl-3-mercaptopropionamide or its disulfide, is reacted with a chlorinating agent such as chlorine gas or sulfuryl chloride in a solvent. The chlorinating agent activates the sulfur atom, making it electron-poor. The amide's nitrogen then attacks that sulfur, forming a nitrogen–sulfur bond and closing the five-membered ring. Depending on the conditions, the product is a mixture of MIT and MCI, which carries an extra chlorine on the ring. The two are separated by distillation or crystallization, and the MIT is purified for use.",
        { significance: "When MIT alone was allowed at higher levels in the 2000s, allergy rates rose sharply, a lesson in how dose drives sensitization." },
      ),
    ],
  },
};
