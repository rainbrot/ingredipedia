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
        "Aspartame works on the same sweet-taste receptor as sugar, a pair of proteins called T1R2 and T1R3 on the surface of taste cells. Its shape lets it slip into a pocket of the receptor and grip it far more tightly than sucrose does, using hydrogen bonds plus attractions between its oily phenylalanine ring and oily patches inside the receptor. A molecule that binds tightly only needs to be present at a low concentration to switch a receptor on. Aspartame activates the receptor at roughly one two-hundredth of the concentration sugar needs, which is why it is described as about 200 times sweeter. Small changes to its structure, even flipping one part into its mirror image, can make it taste bitter or tasteless instead.",
        "Once activated, the receptor sends the brain the same “sweet” signal that sugar does, so food and drinks taste sweet. Aspartame is made of the same building blocks as protein, and like protein it provides about 4 calories per gram. But because so little is needed, those calories are negligible: a can of diet soda contains roughly 200 milligrams, which adds up to less than one calorie. That is how diet drinks taste sweet with almost no energy. Some people notice a slightly different aftertaste or a sweetness that lingers longer than sugar's, because the molecule grips and releases the receptor differently.",
        "established",
      ),
      mech(
        "Digested into familiar molecules",
        "In the small intestine, enzymes break aspartame apart using water, a reaction called hydrolysis. An esterase, an enzyme that cuts ester bonds, removes the methyl group as methanol. Peptidases, enzymes that cut the bonds between amino acids, then split the remaining two-part molecule into aspartic acid and phenylalanine. By weight, aspartame yields roughly 50 percent phenylalanine, 40 percent aspartic acid and 10 percent methanol. Essentially none of the original aspartame reaches the bloodstream intact.",
        "The three products are absorbed and handled exactly like the same molecules from ordinary food. Aspartic acid and phenylalanine are amino acids found in every protein you eat, from milk to beans, and a normal serving of those foods supplies far more of them than a diet drink. Methanol is converted in the liver into formaldehyde and then quickly into formic acid, which is processed further. Fruits and vegetables release methanol naturally too, and a glass of tomato juice provides more of it than a can of diet soda. Because the amounts are small and travel through normal pathways, they don't build up.",
        "established",
      ),
      mech(
        "Phenylalanine and PKU",
        "Normally, a liver enzyme called phenylalanine hydroxylase adds a hydroxyl group (–OH) to phenylalanine, converting it into another amino acid, tyrosine. People with phenylketonuria (PKU) inherit two faulty copies of the gene for this enzyme, so it works poorly or not at all. Phenylalanine from food then can't be converted and builds up in the blood. Some of it is diverted into other molecules called phenylketones, which give the disease its name. Since aspartame is about half phenylalanine by weight, it adds to this load.",
        "High levels of phenylalanine interfere with brain development, partly by crowding out other amino acids that the brain needs to make chemical messengers such as dopamine and serotonin. Untreated PKU causes severe intellectual disability. Today, newborns in many countries are tested for PKU with a heel-prick blood test in their first days of life, and babies who have it follow a strict low-phenylalanine diet from then on. That diet limits high-protein foods and avoids aspartame. This is why every product containing aspartame must carry the warning “Phenylketonurics: contains phenylalanine.”",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Hydrolysis during digestion",
        "Aspartame is held together by two kinds of bonds that water can break: an ester bond, which attaches the methyl group, and a peptide bond, which joins the two amino acids. In the body these bonds are broken by digestive enzymes, the same way the proteins in food are digested. Breaking a bond with water is called hydrolysis, and each break uses up one water molecule. It all happens in the small intestine, so intact aspartame isn't absorbed into the blood. What the body actually receives are three small, familiar molecules.",
        [
          ["Ester hydrolysis", "An enzyme called an esterase attacks the ester bond at the phenylalanine end and adds water across it. The methyl group leaves as methanol (CH₃OH), and the phenylalanine end becomes an ordinary carboxylic acid. This removes the part of the molecule most responsible for its sweetness."],
          ["Peptide hydrolysis", "A peptidase, one of the enzymes that normally digests protein, cuts the peptide bond joining aspartic acid to phenylalanine. Again, water is added across the bond. The result is two separate amino acids."],
          ["Absorption", "Aspartic acid and phenylalanine are carried into the cells lining the intestine by the same transporters that absorb amino acids from food. From there they join the body's general pool of amino acids, used for building proteins or burned for energy. The methanol is absorbed and processed by the liver."],
        ],
        "Nothing unusual is left behind, which is why regulators evaluate aspartame's breakdown products alongside the sweetener itself. Because those products are identical to molecules from ordinary food, the body already has well-worn ways of handling them.",
        "C14H18N2O5 + 2 H2O → C4H7NO4 + C9H11NO2 + CH3OH",
      ),
      rxn(
        "Cyclization (why diet drinks go flat in taste)",
        "Aspartame is less stable than sugar, and one reason is that it can react with itself. Over time, especially when warm, one end of the molecule bends around and attacks the other end, forming a ring. A reaction that turns a chain into a ring is called cyclization. The ring-shaped product doesn't fit the sweet receptor, so it has no sweet taste at all. This is why diet sodas slowly lose sweetness in storage and why aspartame is a poor choice for baking.",
        [
          ["Internal attack", "The free amino group (–NH₂) at the aspartic acid end has a lone pair of electrons. Because the molecule is flexible, this group can swing around and reach the carbonyl carbon of the ester at the phenylalanine end, which is electron-poor. The amino group attacks that carbon and begins forming a new bond."],
          ["Methanol leaves", "As the new carbon–nitrogen bond forms, that carbon has to give up one of its existing bonds. The methoxy group (–OCH₃) leaves and picks up a hydrogen to become methanol. The molecule is now joined end to end."],
          ["Ring formation", "The product is a six-membered ring containing two nitrogen atoms, called a diketopiperazine. Its shape is completely different from aspartame's, so it doesn't activate the sweet receptor. The change can't be undone."],
        ],
        "Heat and long storage speed this reaction up, so old diet sodas taste less sweet, and most of the aspartame in a batter would break down in the oven. Manufacturers who need heat stability choose sweeteners such as sucralose instead. The diketopiperazine itself has been studied and is considered safe at the levels that form.",
      ),
    ],
    hazards: [
      hz(
        "IARC “possibly carcinogenic” classification",
        "In 2023, the International Agency for Research on Cancer (IARC) classified aspartame as “possibly carcinogenic to humans,” its Group 2B. This category signals a possible hazard backed by limited evidence, and it also contains things like aloe vera extract and pickled vegetables. IARC does not consider how much of something people actually consume. At the same time, a separate expert committee of the World Health Organization and the Food and Agriculture Organization, called JECFA, reviewed the same evidence and left the acceptable daily intake unchanged. Put simply, the evidence was judged too weak to show harm at normal intakes.",
        "The main evidence came from a few observational studies in people and from animal experiments. Lifetime studies in rats from one Italian research institute reported more tumors in animals fed aspartame, but other scientists criticized their methods, and other animal studies have not found the same effect. Some laboratory studies have suggested that aspartame or its breakdown products might cause oxidative stress, an imbalance in which reactive oxygen molecules damage cells. However, aspartame itself never reaches the blood intact, and its breakdown products are the same as those from ordinary foods. No clear chemical mechanism for cancer at normal doses has been shown.",
        "IARC's job is to ask whether something could cause cancer under any circumstances, while JECFA's job is to work out a safe level of intake. JECFA concluded there was no convincing evidence of harm at the existing acceptable daily intake of 40 milligrams per kilogram of body weight per day. For a 70-kilogram adult that is about 2,800 milligrams daily, roughly the amount in 9 to 14 cans of diet soda every day for life. Most people consume far less. Researchers continue to study long-term effects, and some health groups advise moderation simply because of the remaining uncertainty.",
      ),
      hz(
        "Danger for people with PKU",
        "For most people aspartame poses no particular risk, but for people born with phenylketonuria (PKU) it is a real hazard. PKU affects roughly 1 in 10,000 to 15,000 babies and is caused by an inherited problem with the enzyme that processes phenylalanine. People with PKU must strictly limit phenylalanine from every source throughout their lives. Aspartame is a hidden source in diet drinks, chewing gum and some medicines, which is why it has to be labeled. With early diagnosis and a careful diet, people with PKU grow up healthy.",
        "Aspartame is about 50 percent phenylalanine by weight, which is released during digestion as free phenylalanine. In most people, the liver enzyme phenylalanine hydroxylase converts extra phenylalanine into tyrosine, another amino acid. People with PKU lack a working version of this enzyme. So almost all the phenylalanine they eat, beyond what the body uses to build proteins, accumulates in the blood. A single can of diet soda can therefore use up a meaningful part of their tightly limited daily allowance.",
        "When blood phenylalanine stays high, it enters the brain and crowds out other amino acids the brain needs to make neurotransmitters, the chemical messengers between nerve cells. In babies and young children, whose brains are still developing, this can cause permanent intellectual disability, seizures and behavior problems. In adults, high levels can cause trouble concentrating, mood changes and headaches. This is why newborns are screened and why products containing aspartame must state “Phenylketonurics: contains phenylalanine.” Women with PKU need especially careful control during pregnancy to protect the baby's brain.",
      ),
    ],
    dosage:
      "The acceptable daily intake (ADI), the amount considered safe to eat every day for life, is 40 milligrams per kilogram of body weight according to JECFA and European regulators, and 50 milligrams per kilogram according to the U.S. FDA. For a 70-kilogram adult, reaching JECFA's limit would take roughly 9 to 14 cans of diet soda every day, depending on the brand, and most people consume a small fraction of that. The methanol released from a can of diet soda is less than from a glass of fruit or tomato juice. People with phenylketonuria are the exception and must avoid aspartame. Because aspartame breaks down when heated or stored warm, products containing it keep their sweetness best when kept cool.",
    synthesis: [
      route(
        "Chemical peptide coupling",
        "Aspartame was discovered by accident in 1965, when a chemist working on an ulcer drug licked his finger and noticed it tasted sweet. Making it means joining two amino acids, aspartic acid and phenylalanine methyl ester, with a peptide bond. The challenge is that aspartic acid has two carboxylic acid groups and one amino group, all of which could react. If the bond forms at the wrong spot, the product tastes bitter instead of sweet. Chemists therefore use protecting groups, temporary chemical caps, to control which part reacts.",
        "First, aspartic acid's amino group is protected, for example by converting it into an N-formyl group, so it can't react with itself. The protected aspartic acid is turned into an anhydride, a reactive form in which its two acid groups are activated. This activated molecule is mixed with phenylalanine methyl ester, whose free amino group attacks one of the activated carbonyl carbons and forms the peptide bond. Reaction conditions are tuned so the bond forms mainly at aspartic acid's alpha carboxyl group, the one next to the amino group. Finally, the protecting group is removed with acid, and the bitter-tasting isomer formed at the other carboxyl group is separated out.",
        { significance: "Small structural differences change taste completely: linking the amino acids through the wrong carboxyl group gives a bitter molecule, not a sweet one." },
      ),
      route(
        "Enzymatic coupling",
        "An alternative way to make aspartame uses an enzyme instead of protecting-group chemistry to form the peptide bond. Enzymes are extraordinarily selective: they react only at specific positions and only with one mirror-image form of a molecule. This avoids the bitter isomer and other unwanted products. The enzyme used is thermolysin, which comes from a heat-loving bacterium. Enzymatic processes like this are often called green chemistry because they produce less waste.",
        "Thermolysin is a protease, an enzyme that normally cuts peptide bonds by adding water to them. But reactions can run in reverse when conditions favor the products. Manufacturers use high concentrations of the starting materials and arrange for the product to come out of solution as an insoluble salt, which pulls the reaction toward forming the bond rather than breaking it. The enzyme joins protected aspartic acid to phenylalanine methyl ester, reacting only at the correct carboxyl group and only with the L-forms of the amino acids, the forms found in nature. The protecting group is removed afterward to give pure aspartame.",
        { significance: "Enzymes give a level of control over 3D structure that is difficult to achieve with ordinary chemical reagents." },
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
        "Sucralose is made from sucrose by replacing three of its hydroxyl groups (–OH) with chlorine atoms. Chlorine atoms are larger than hydroxyl groups and repel water, so they change both the molecule's shape and the way it interacts with the sweet-taste receptor, the T1R2/T1R3 protein pair on taste cells. These changes let sucralose settle into the receptor's binding pocket much more snugly than sugar can. A molecule that binds tightly switches the receptor on even at very low concentrations. As a result, sucralose is roughly 600 times sweeter than sucrose.",
        "The activated receptor sends the brain the same message as sugar, so the taste is clean and sugar-like, without the bitter aftertaste of some older sweeteners. Because it is so potent, only a few milligrams are needed to match a teaspoon of sugar, which is why packets of sucralose sweetener are mostly filler such as maltodextrin. Sucralose provides essentially no calories, since the body doesn't break it down for energy. The sweet taste may still trigger a small insulin release in some people, a reflex called the cephalic phase insulin response, though studies disagree on whether this matters. For most people, sucralose has no measurable effect on blood sugar.",
        "established",
      ),
      mech(
        "Passing through undigested",
        "Ordinary sucrose is split by an enzyme in the small intestine called sucrase, which recognizes the exact shape of the bond connecting glucose to fructose. In sucralose, the chlorine atoms change the shape around that bond, so the enzyme can't grip it or split it. The chlorinated molecule also isn't recognized by the transporter proteins that carry sugars across the gut wall. Small molecules can sometimes slip through cell membranes on their own, but sucralose's structure makes this inefficient. So very little of it is absorbed.",
        "About 85 percent of the sucralose you eat passes through the intestines and leaves unchanged in feces. Of the small amount that is absorbed, most is filtered out by the kidneys and leaves in urine within about a day. Because the body doesn't break it down for energy, it adds no calories. It also doesn't accumulate in body fat, since it dissolves in water rather than oil. Studies that tracked labeled sucralose through the bodies of volunteers confirmed this pattern.",
        "human",
      ),
      mech(
        "Possible effects on gut microbes",
        "Because most sucralose isn't absorbed, it travels on to the colon, the last section of the intestine, where trillions of bacteria live. These bacteria meet it at much higher concentrations than any other part of the body does. Laboratory studies suggest sucralose may affect the growth of some bacterial species more than others. Some research also suggests gut bacteria can modify a small portion of it, for example producing traces of sucralose-6-acetate. How much these interactions matter at normal intakes is still being worked out.",
        "Gut bacteria help digest food, train the immune system and produce useful substances, so changes in their balance could, in theory, affect health. A few human studies have reported shifts in gut bacteria, and small changes in how blood sugar responds to glucose, after people consumed sucralose for several weeks. Other studies have found no such effects. The results vary with the dose, the length of the study and the people taking part. Scientists consider this an emerging area, and no firm conclusions about health effects have been reached.",
        "emerging",
      ),
    ],
    reactions: [
      rxn(
        "Selective chlorination (how it's made)",
        "Making sucralose requires swapping exactly three of sucrose's eight hydroxyl groups for chlorine atoms while leaving the other five untouched. That is tricky, because all eight hydroxyl groups are chemically similar and a chlorinating reagent can't tell them apart on its own. Chemists solve this with a strategy called protection: they temporarily block the groups they don't want to react, carry out the reaction, and then remove the blocks. Along the way, the 3D arrangement of atoms at one carbon is flipped. Hitting exactly the right three positions is what turns sugar into a high-intensity sweetener.",
        [
          ["Protection", "The hydroxyl group at carbon 6 of the glucose ring is capped with an acetyl group, forming an ester that won't react with the chlorinating reagent. This position is the most exposed and would otherwise react first. Capping it steers the next reaction toward the positions chemists want."],
          ["Chlorination", "A chlorinating reagent replaces the hydroxyls at three positions, carbon 4 on the glucose ring and carbons 1' and 6' on the fructose ring, with chlorine atoms. At carbon 4 the chlorine comes in from the opposite side, so that carbon's 3D arrangement flips. This inversion turns the glucose ring into a galactose-shaped ring, which is part of why digestive enzymes don't recognize sucralose."],
          ["Deprotection", "The acetyl cap at carbon 6 is removed with a mild base, restoring the original hydroxyl group. The finished sucralose is then purified by crystallization to remove byproducts and molecules that were chlorinated in the wrong places."],
        ],
        "Selective protection is a core strategy in organic synthesis: block what you don't want to react, then unblock it afterward. Without it, the reaction would produce a messy mixture of molecules chlorinated in the wrong places. One leftover from incomplete deprotection, sucralose-6-acetate, is now being studied as an impurity.",
      ),
      rxn(
        "Breakdown at baking temperatures",
        "Sucralose is often marketed as suitable for cooking and baking, and it is far more heat-stable than aspartame. Research has found, however, that at very high temperatures, especially with fats or glycerol present, it can begin to break down. As it decomposes, it can release chlorine-containing compounds. This mainly matters for baking or frying at high temperatures, not for drinks or sprinkling on food. Regulators are reviewing the evidence.",
        [
          ["Heating", "Above about 120 °C, and more so at typical oven temperatures of 180 °C or higher, sucralose molecules gain enough energy for their bonds to start breaking. Fats, oils or glycerol in the mixture seem to speed this up. Dry heat and long baking times make it worse."],
          ["Dechlorination", "The carbon–chlorine bonds begin to break, releasing hydrogen chloride (HCl), the molecule that forms hydrochloric acid in water. The remaining sugar skeleton breaks down further, a little like ordinary sugar browning."],
          ["Byproducts", "The released chlorine can react with glycerol, which comes from fats, forming chloropropanols, chlorinated molecules with three carbon atoms. Some of these, such as 3-MCPD, are a concern because they harm the kidneys in animal studies."],
        ],
        "Germany's Federal Institute for Risk Assessment advises against heating sucralose to high temperatures, as in baking or frying, until more is known. In drinks and foods that aren't heated strongly, this reaction doesn't happen. The finding is a reminder that an ingredient's safety can depend on how it is used.",
      ),
    ],
    hazards: [
      hz(
        "Sucralose-6-acetate",
        "Sucralose-6-acetate is a closely related molecule that can be present as an impurity left over from manufacturing, and small amounts may also form from sucralose in the gut. It drew attention after a 2023 laboratory study reported that it damaged DNA in human cells grown in dishes. The amounts in commercial sucralose are small, and the study did not involve people. It is an open scientific question rather than an established risk. Further research and regulatory review are under way.",
        "Sucralose-6-acetate is sucralose with an acetyl group still attached at carbon 6, the position that is temporarily protected during manufacturing. If the protecting group isn't completely removed, some molecules keep it. In the 2023 study, researchers exposed cultured human cells to sucralose-6-acetate and saw breaks in their DNA strands, which suggests it is genotoxic, meaning it can damage genetic material. They also reported changes in the activity of genes linked to inflammation. Cells in a dish, however, lack many of the protective systems of a whole body.",
        "DNA damage can, in principle, lead to mutations if cells fail to repair it, which is why genotoxicity tests are part of safety evaluations. But whether sucralose-6-acetate reaches the body's cells at levels that could do this from normal sucralose intake is unknown. The amounts measured in commercial sucralose were small, and absorption from the gut is limited. No study in people has shown harm. Regulators have noted the findings and may re-review sucralose as more data become available.",
      ),
      hz(
        "Heating byproducts",
        "This concern applies only to cooking with sucralose at high temperatures, such as baking or frying, not to drinks, table use or most packaged foods. When strongly heated with fats or glycerol, sucralose can break down and release chlorine that forms chloropropanols. These compounds also form naturally when some other foods are processed at high heat. Some chloropropanols have shown harmful effects in animal studies at high doses. Regulators are assessing how much might form during home baking.",
        "At high temperatures the carbon–chlorine bonds in sucralose can break, releasing chlorine, mostly as hydrogen chloride. Fats are built from glycerol joined to fatty acids, and free glycerol is present in many foods. Chlorine can replace hydroxyl groups on glycerol, forming chloropropanols such as 3-MCPD (3-monochloropropane-1,2-diol). How much forms depends on the temperature, the heating time and the other ingredients. Scientists are still measuring how much forms under realistic baking conditions.",
        "In animal studies, high doses of 3-MCPD over long periods damaged the kidneys and affected male fertility, and it is classified as possibly carcinogenic. Regulators have therefore set a tolerable daily intake for 3-MCPD from all foods combined. People already take in small amounts from refined vegetable oils and some processed foods. Whether baking with sucralose adds meaningfully to that exposure isn't clear yet. The cautious advice is to avoid using sucralose in recipes baked at high temperatures.",
      ),
    ],
    dosage:
      "A single packet of sucralose sweetener contains about 12 milligrams of sucralose mixed with a bulking agent. The U.S. FDA has set an acceptable daily intake of 5 milligrams per kilogram of body weight, and international experts (JECFA) a higher 15 milligrams per kilogram, so a 60-kilogram adult could have about 300 milligrams a day even under the stricter limit. That is roughly 25 packets, or the amount in several cans of diet soda, every day. Typical intakes are far below these limits. The open questions concern high-temperature baking and the impurity sucralose-6-acetate rather than everyday use.",
    synthesis: [
      route(
        "Industrial synthesis from sucrose",
        "Sucralose starts life as ordinary table sugar. It was discovered in 1976 by researchers at a British sugar company and Queen Elizabeth College in London who were making chlorinated sugars as possible chemical building blocks. According to the well-known story, a young researcher misheard a request to “test” a compound as “taste” it, and found it intensely sweet. It was approved for use in the United States in 1998. Today it is one of the most widely used sweeteners in the world.",
        "Sucrose is first treated so that its hydroxyl group at carbon 6 is capped with an acetyl group, protecting it from the next step. The protected sucrose is then reacted with a chlorinating reagent of a type known as a Vilsmeier reagent, which swaps three specific hydroxyl groups for chlorine atoms. Reaction conditions, temperature and the bulky shape of the reagent help it reach the intended positions. Next, the acetyl protecting group is removed with a base. The crude sucralose is then purified by repeated crystallization, which separates it from partly chlorinated sugars and other byproducts.",
        { significance: "The same strong carbon–chlorine bonds that resist digestion also resist wastewater treatment, so sucralose is now detected in rivers and coastal waters worldwide and is used as a tracer for sewage." },
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
        "Adenosine is a small molecule your brain uses as a signal of tiredness. It works by fitting into receptor proteins on the surface of nerve cells, called A1 and A2A receptors, like a key fitting a lock. Caffeine has a similar shape, with two fused rings and nitrogen atoms in the right places, so it fits into the same locks. But it doesn't turn them; it just sits there and blocks adenosine from getting in. A molecule that occupies a receptor without activating it is called an antagonist, and because caffeine and adenosine compete for the same spot, caffeine is called a competitive antagonist.",
        "During waking hours, adenosine slowly builds up in the brain as a byproduct of energy use, and as it binds its receptors it dampens nerve activity, creating “sleep pressure.” When caffeine blocks those receptors, the brakes ease off and other signaling systems, including dopamine and glutamate, become more active, so you feel more awake and focused. The effect begins within about 15 to 45 minutes of a drink. People who use caffeine every day gradually make more adenosine receptors, so they need more caffeine for the same effect, which is called tolerance. If they suddenly stop, those extra receptors are left unblocked, causing withdrawal headaches and tiredness for a few days.",
        "established",
      ),
      mech(
        "Tightening blood vessels",
        "Adenosine also acts on receptors in the smooth muscle wrapped around blood vessels, where it tells the muscle to relax so the vessels widen. When caffeine blocks these receptors, that relaxing signal is lost. The muscle tightens slightly and the vessels narrow, a change called vasoconstriction. This happens in the brain and the skin, among other places. The effect lasts a few hours, for as long as caffeine remains in the blood.",
        "Some headaches involve widened blood vessels in the head, so narrowing them can help, which is why caffeine is included in some pain relievers for headaches and migraines. Caffeine also helps the body absorb those medicines faster. In skincare, caffeine is added to eye creams, where it may briefly reduce puffiness by narrowing blood vessels and reducing fluid in the area. The effect is temporary and modest. On the flip side, a person who drinks caffeine daily can get a rebound headache after skipping it, because the vessels widen again.",
        "human",
      ),
      mech(
        "Liver metabolism",
        "Caffeine is broken down mostly in the liver by an enzyme called CYP1A2, a member of the large cytochrome P450 family that processes many drugs and other foreign substances. The enzyme removes one methyl group (–CH₃) at a time from caffeine's nitrogen atoms, a reaction called demethylation. About 80 percent of caffeine becomes paraxanthine, and the rest becomes theobromine (the stimulant in chocolate) and theophylline (once used as an asthma drug). These are broken down further and excreted in urine. How fast CYP1A2 works varies from person to person because of genes and lifestyle.",
        "The time it takes for half the caffeine in your blood to be cleared is called its half-life, and for most adults it is about 3 to 7 hours. That means a coffee at 4 p.m. can leave about half its caffeine in your body at 9 p.m. Pregnancy and some medications, including certain birth control pills and antibiotics, slow CYP1A2 down, so caffeine lasts much longer. Smoking speeds the enzyme up, so smokers clear caffeine faster. Newborn babies have very little CYP1A2, so caffeine can stay in their bodies for days.",
        "established",
      ),
    ],
    reactions: [
      rxn(
        "Decaffeination with supercritical carbon dioxide",
        "Taking caffeine out of coffee is harder than it sounds, because a coffee bean contains hundreds of flavor molecules that you want to keep. One of the cleanest methods uses carbon dioxide, the same gas that makes drinks fizzy, in an unusual state called a supercritical fluid. Under high pressure and moderate heat, carbon dioxide behaves partly like a gas and partly like a liquid, so it can seep into beans and dissolve caffeine. It is selective, removing caffeine while leaving most of the flavor behind. Afterward the carbon dioxide simply turns back into gas, leaving no solvent in the beans.",
        [
          ["Soaking", "Green, unroasted coffee beans are moistened with water or steam so they swell. Water opens up the bean's structure and helps caffeine move out of the plant cells. Caffeine leaves wet beans much more easily than dry ones."],
          ["Supercritical CO₂", "Carbon dioxide is pumped into a sealed steel vessel and brought above 31 °C and 74 bar, about 74 times normal air pressure. Past this point, called the critical point, there is no difference between the liquid and gas forms. The resulting supercritical fluid flows into tiny spaces like a gas but dissolves substances like a liquid."],
          ["Selective extraction", "Caffeine molecules dissolve into the supercritical carbon dioxide and are carried out of the beans. Most larger flavor molecules and sugars don't dissolve well in it, so they stay behind. The process runs for hours, until at least about 97 percent of the caffeine is gone."],
          ["Recovery", "The caffeine-rich carbon dioxide is passed through water or activated charcoal, which captures the caffeine. The cleaned carbon dioxide is recycled back into the vessel. The beans are dried and then roasted as usual."],
        ],
        "Decaf coffee isn't completely caffeine-free; a cup typically still has a few milligrams. The recovered caffeine is purified and sold to soft-drink, energy-drink and supplement makers, so very little goes to waste.",
      ),
      rxn(
        "Demethylation in the liver",
        "Your liver takes caffeine apart step by step, removing its three methyl groups one at a time. Each removal is a small chemical reaction carried out by the enzyme CYP1A2, and each step produces a molecule that is still mildly stimulating. This is why caffeine's effects fade gradually over hours instead of switching off suddenly. Removing a methyl group is called demethylation. The final products are excreted in urine, along with a little unchanged caffeine.",
        [
          ["Oxidation", "CYP1A2 holds caffeine in its active site and uses oxygen and an iron atom to add an oxygen atom to one of the methyl groups attached to a nitrogen. This turns the methyl group into a hydroxymethyl group (–CH₂OH), which is unstable. Most often the methyl group at position 3 is targeted first."],
          ["Removal", "The unstable group breaks away from the nitrogen as formaldehyde (CH₂O), leaving a hydrogen behind in its place. Other enzymes quickly convert the formaldehyde into formic acid and then carbon dioxide. The amounts are tiny and the body handles them routinely."],
          ["Products", "Losing one methyl group turns caffeine into paraxanthine, theobromine or theophylline, depending on which one was removed. These are called dimethylxanthines because they have two methyl groups left. They are demethylated and oxidized further into molecules such as methyluric acids, which the kidneys excrete."],
        ],
        "This is why the effects of a cup of coffee fade over several hours rather than minutes. Because paraxanthine and the other products are mild stimulants too, they stretch caffeine's effects out a little. Differences in CYP1A2 activity help explain why some people can drink coffee at night and sleep fine while others can't.",
      ),
    ],
    hazards: [
      hz(
        "Caffeine toxicity",
        "Ordinary coffee, tea and soft drinks rarely cause caffeine poisoning, because you would have to drink an enormous amount quickly. Serious and fatal cases almost always involve pure caffeine powder or concentrated pills, where one spoonful can contain many times a safe dose. Energy drinks combined with other caffeine sources can also push some people into unpleasant symptoms, especially young people and those with heart conditions. The U.S. FDA has warned against selling bulk caffeine powder to consumers for this reason. Anyone with a racing heart, chest pain or seizures after taking caffeine needs emergency care.",
        "At normal doses, caffeine's main effect is blocking adenosine receptors. At very high blood levels it starts acting on other targets too. It inhibits phosphodiesterases, enzymes that break down a messenger molecule called cyclic AMP, so cAMP builds up inside cells and ramps up their activity. It also triggers the release of calcium from storage compartments inside muscle cells, and calcium is the signal that makes muscles contract. Together, these effects push heart and nerve cells into overdrive.",
        "The heart may beat very fast and irregularly, a dangerous condition called an arrhythmia, and blood pressure can rise. Overstimulated nerves cause tremors, agitation and, in severe cases, seizures. Vomiting, confusion and low potassium in the blood are also common. Toxic effects can appear at around 1.2 grams of caffeine taken quickly, and around 10 grams can be fatal for an adult. A single teaspoon of pure caffeine powder can contain about 3 grams or more, which is why these powders are so dangerous.",
      ),
      hz(
        "Sleep disruption and dependence",
        "For regular users, the most common downside of caffeine isn't danger but disrupted sleep and mild dependence. Because caffeine lingers in the body for hours, an afternoon coffee or energy drink can still be active at bedtime. Many people don't notice how much it affects the quality of their sleep, even if they fall asleep without trouble. Daily users also become dependent, meaning they feel tired, irritable or headachy without it. Both effects reverse with gradual changes in intake.",
        "Caffeine's half-life of about 3 to 7 hours means that after a 200-milligram coffee at 3 p.m., roughly 100 milligrams may still be circulating in the evening. That caffeine keeps occupying adenosine receptors, blocking the tiredness signal adenosine is meant to send. With daily use, nerve cells respond by making more adenosine receptors, trying to restore their normal sensitivity. This adaptation is the chemical basis of tolerance. It also sets up withdrawal, because without caffeine all those extra receptors are fully activated by adenosine.",
        "Caffeine late in the day delays falling asleep and reduces deep, slow-wave sleep, the stage most important for feeling rested. Poor sleep makes people tired the next day, so they reach for more caffeine, starting a cycle. When regular users stop suddenly, unblocked adenosine receptors and widening blood vessels cause withdrawal: headaches, sleepiness, low mood and trouble concentrating, usually starting 12 to 24 hours after the last dose and lasting a few days. Cutting back gradually avoids most of these symptoms. Many sleep experts suggest no caffeine for at least six hours before bed.",
      ),
      hz(
        "Pregnancy",
        "Health agencies recommend that pregnant people limit caffeine to no more than about 200 milligrams a day, roughly one or two cups of coffee. That is lower than the 400 milligrams considered safe for other adults. The concern is that very high caffeine intake during pregnancy has been linked in some studies to lower birth weight and a higher risk of miscarriage, though the evidence is debated. Caffeine is also found in tea, chocolate, soft drinks and some medicines, so every source counts. Moderate intake is generally considered safe.",
        "Caffeine is a small molecule that dissolves in both water and fat, so it crosses the placenta easily and reaches the fetus at about the same concentration as in the mother's blood. During pregnancy, the mother's CYP1A2 enzyme slows down, especially in the later months, so caffeine's half-life can stretch to 10 hours or more. The fetus has almost no working CYP1A2 of its own to break caffeine down. As a result, caffeine lingers far longer in both mother and baby than in a non-pregnant adult.",
        "In the fetus, caffeine can affect heart rate and may narrow blood vessels in the placenta, possibly reducing blood flow. Large studies have found links between high caffeine intake and slightly lower birth weight, although it's hard to separate caffeine's effect from other lifestyle factors. Because of that uncertainty and the slow clearance, health authorities take a cautious approach. Staying under 200 milligrams a day is considered a safe margin. Caffeine also passes into breast milk, and some breastfed babies become fussy when their parent drinks a lot of it.",
      ),
    ],
    dosage:
      "A typical cup of brewed coffee has about 95 milligrams of caffeine, a cup of black tea about 45, a 12-ounce cola about 35, and a 16-ounce energy drink anywhere from 150 to 300. For healthy adults, up to about 400 milligrams a day is generally considered safe, and the guideline during pregnancy is 200 milligrams. Teenagers are often advised to stay under about 100 milligrams a day. Toxic effects can appear around 1.2 grams taken quickly, an amount that is hard to reach with drinks but easy with pure powder, where a single teaspoon can exceed it. Sensitivity varies a lot between people, so how you feel is a useful guide.",
    synthesis: [
      route(
        "Biological synthesis in plants",
        "Caffeine is made naturally by more than 60 plant species, including coffee, tea, cacao, guaraná, yerba mate and kola nut. Plants don't make it to keep anyone awake. Caffeine is bitter and toxic to many insects, so it protects leaves and seeds from being eaten. Fallen leaves can also release caffeine into the soil, where it may slow the growth of competing seedlings. Curiously, small amounts in the nectar of coffee and citrus flowers seem to help bees remember the flowers and come back to them.",
        "Plants build caffeine from xanthosine, a molecule closely related to the building blocks of DNA and RNA. Enzymes called N-methyltransferases add methyl groups (–CH₃) one at a time to nitrogen atoms on the molecule. Each methyl group is supplied by a donor molecule called S-adenosylmethionine, a kind of molecular delivery truck for methyl groups that all living cells use. After the first methyl group is added, another enzyme snips off the sugar part of the molecule. The sequence runs from xanthosine to 7-methylxanthosine, then 7-methylxanthine, then theobromine (with two methyl groups), and finally caffeine (with three).",
        { significance: "Coffee and tea evolved their caffeine-making enzymes independently, a striking example of convergent evolution, where different species arrive at the same solution separately." },
      ),
      route(
        "Recovery and laboratory synthesis",
        "The caffeine added to soft drinks, energy drinks and pills comes from two sources: it is recovered while decaffeinating coffee and tea, or it is built from scratch in chemical plants. Synthetic caffeine is cheaper and is made in large quantities, much of it in China and India. Both sources produce exactly the same molecule. Labels usually just say “caffeine” either way. The popularity of energy drinks has made synthetic caffeine a major product.",
        "Recovered caffeine is collected from the water, charcoal or solvent used in decaffeination and purified by crystallization. Synthetic caffeine is assembled from simple starting materials. One classic method, the Traube purine synthesis, begins with dimethylurea, a small molecule with two nitrogen atoms already carrying methyl groups, and reacts it with a derivative of malonic acid to build the first ring. Further steps add nitrogen and carbon atoms and close the second ring, forming theophylline or a similar molecule. A final methylation step adds the third methyl group to give caffeine.",
        { significance: "Natural and synthetic caffeine are the same molecule. Isotope analysis, which detects tiny differences in the proportions of heavier and lighter carbon atoms, is the only way to tell them apart." },
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
        "Phosphoric acid has three hydrogen atoms it can release as hydrogen ions (H⁺), but it gives them up one at a time, and the first comes off much more easily than the other two. Chemists describe this with pKa values, and the first one is about 2.1, which means that first proton is released fairly readily. In a cola, phosphoric acid brings the pH down to around 2.5, more acidic than orange juice. The released hydrogen ions are what switch on the sour-sensing taste cells on your tongue. Unlike citric acid, phosphoric acid has no fruity flavor of its own.",
        "Sour-taste cells detect hydrogen ions through a channel called OTOP1 and send a “sour” signal to the brain. In colas, phosphoric acid provides a sharp, clean tang that balances the large amount of sugar, which would otherwise taste cloying. Because it doesn't add fruity notes, it suits cola's spicy, vanilla-like flavor better than citric acid would. The low pH also makes it hard for bacteria and molds to grow in the drink. That acidity is part of why sodas can sit on store shelves for months.",
        "established",
      ),
      mech(
        "Enamel erosion",
        "Tooth enamel is made of hydroxyapatite, Ca₅(PO₄)₃OH, a hard crystal of calcium, phosphate and hydroxide ions. At a pH of 2 to 3 there are so many hydrogen ions that they react with the phosphate and hydroxide parts of the crystal. Hydroxide becomes water, and phosphate becomes hydrogen phosphate, which no longer holds calcium tightly. With its framework weakened, calcium ions dissolve away from the surface. In effect, the acid is taking the crystal apart from the outside in.",
        "Each sip of cola softens the outer surface of the enamel for a while. Saliva then neutralizes the acid with bicarbonate, a natural buffer, and supplies calcium and phosphate that can partly rebuild the surface. If someone sips cola throughout the day, their teeth spend most of the time under acid attack and repair can't keep up. Over years, the enamel thins, which can make teeth sensitive and more yellow-looking. Drinking with meals, using a straw and rinsing with water afterward all reduce contact time.",
        "established",
      ),
      mech(
        "Bone mineral balance",
        "Calcium and phosphate are the two main ingredients of bone mineral, and the body keeps their levels in the blood carefully balanced. When phosphate intake is high and calcium intake is low, that balance shifts. The parathyroid glands, four tiny glands in the neck, respond by releasing parathyroid hormone. This hormone raises blood calcium, partly by releasing calcium from the skeleton. Over long periods, that could in theory weaken bones.",
        "In the Framingham Osteoporosis Study, women who drank cola every day had lower bone mineral density in the hip than women who drank it less than once a month, even after accounting for other factors. Other carbonated drinks didn't show the same link, which points to something specific about cola, possibly phosphoric acid or caffeine. Part of the effect, though, may simply be that people who drink a lot of cola drink less milk and miss out on calcium. Other studies have found mixed results. Overall, it's a reason to treat cola as an occasional drink and to get enough calcium.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Rust conversion",
        "Rust is iron oxide, a flaky, crumbly substance that forms when iron reacts with oxygen and water. Because it is porous and loose, rust lets more air and water reach the metal underneath, so the rusting keeps spreading. Phosphoric acid can turn this weak layer into a tougher, protective coating. Products sold as rust converters, and some metal cleaners, rely on this reaction. It's a nice example of an acid that doesn't just dissolve something but changes it into something more useful.",
        [
          ["Dissolving", "Hydrogen ions from phosphoric acid attack the iron oxide (Fe₂O₃) on the metal's surface. They react with the oxide ions, forming water and freeing iron ions (Fe³⁺). This loosens the rust and exposes the metal underneath."],
          ["Precipitation", "The freed iron ions combine with phosphate ions from the acid to form iron phosphate (FePO₄). Iron phosphate is insoluble, meaning it doesn't dissolve in water. So it comes out of solution as a solid and sticks to the surface."],
          ["Passivation", "The iron phosphate forms a thin, tight, dark layer that seals the surface. It is far less porous than rust, so oxygen and water can't easily reach the metal beneath. Making a metal surface less reactive like this is called passivation."],
        ],
        "This is how “rust converter” products and some toilet and metal cleaners work. The iron phosphate layer also gives paint something to grip. Car makers use a related process, called phosphating, to protect steel before painting it.",
        "2 H3PO4 + Fe2O3 → 2 FePO4 + 3 H2O",
      ),
      rxn(
        "Phosphate buffering",
        "A buffer is a mixture that resists changes in pH when an acid or a base is added. Phosphates form one of the most important buffers in biology. Because phosphoric acid releases its three protons one at a time, at three different pH values, its partly ionized forms can soak up or release hydrogen ions as needed. The pair of forms present around pH 7 is especially useful, because that is close to the pH inside living cells. Buffers are also used in foods, medicines and laboratories to keep pH steady.",
        [
          ["Stepwise ionization", "Phosphoric acid (H₃PO₄) releases its first proton around pH 2.1 to form H₂PO₄⁻, its second around pH 7.2 to form HPO₄²⁻, and its third around pH 12.4 to form PO₄³⁻. Each step is harder than the last, because pulling a positive proton off an ion that is already negative takes more effort."],
          ["Buffer pair", "Near pH 7.2, a solution contains a mixture of H₂PO₄⁻ and HPO₄²⁻. One form can donate a proton and the other can accept one. Together they act like a sponge for both acid and base."],
          ["Balance", "If acid is added, the extra H⁺ is taken up by HPO₄²⁻, turning it into H₂PO₄⁻, so the pH barely changes. If a base is added, its OH⁻ is neutralized by a proton from H₂PO₄⁻. Only when one of the two forms runs out does the pH begin to change quickly."],
        ],
        "The phosphate buffer is one of the main systems keeping the pH inside your cells stable, which is vital because enzymes only work within narrow pH ranges. Food manufacturers use phosphate salts for the same reason, to hold the pH of processed foods steady.",
        "H3PO4 ⇌ H+ + H2PO4-",
      ),
    ],
    hazards: [
      hz(
        "Corrosive when concentrated",
        "The phosphoric acid in food is extremely dilute: a cola contains only about 0.05 percent. The concentrated acid sold to manufacturers, typically 75 to 85 percent, is a different matter and can cause serious burns. Household rust removers and some toilet cleaners contain 10 to 30 percent and should be handled with gloves and eye protection. The danger lies in the concentration, not in the chemical itself. Swallowing concentrated acid can badly injure the mouth, throat and stomach.",
        "Concentrated phosphoric acid packs a large amount of acid into a small amount of water. When it touches tissue, it lowers the pH sharply, which makes proteins unfold, a process called denaturation. It also pulls water out of tissue, because concentrated acid strongly attracts water, and that damages cells further. Proteins in the skin and eyes lose their structure and stop working. Phosphoric acid acts somewhat more slowly than some strong acids, but prolonged contact still causes burns.",
        "On skin, contact causes redness and pain and, with longer exposure, burns and blisters. In the eye it can damage the cornea, the clear front layer, so it must be rinsed out immediately with plenty of water for at least 15 minutes. Breathing in mist from the concentrated acid irritates the nose, throat and lungs. Swallowing it can burn the lining of the digestive tract. These hazards are why products with high concentrations carry warning labels and why the industrial acid is handled by trained workers.",
      ),
      hz(
        "Dental erosion from frequent soft drinks",
        "Regularly sipping colas and other acidic soft drinks can slowly wear away the enamel on your teeth. This is dental erosion, a chemical process that doesn't involve bacteria. One drink causes no lasting harm, but frequent exposure over months and years adds up. Diet colas are just as acidic as regular ones, so they also erode enamel, even though they don't feed cavity-causing bacteria. Teenagers and young adults who drink a lot of soda are among those most affected.",
        "Colas have a pH around 2.5, well below the critical level of about 5.5 at which tooth enamel starts to dissolve. Each exposure lets hydrogen ions react with the calcium phosphate crystals of enamel, releasing calcium and phosphate and softening the surface. Phosphoric acid is an effective erosive acid, although some studies suggest citric acid, common in fruit-flavored drinks, is even more erosive because it also grabs calcium. Holding the drink in your mouth or swishing it around increases contact time and the damage. Cold drinks are slightly less erosive than warm ones.",
        "Saliva slowly neutralizes acid and helps repair softened enamel by supplying calcium and phosphate, but that takes time. With frequent sips, enamel loses more than it can rebuild, and the surface gradually thins. As it wears down, the yellowish dentin underneath shows through more, and teeth can become sensitive to hot, cold and sweet foods. Thin enamel is also easier to chip and more vulnerable to decay. Since enamel can't regrow, prevention matters: drinking soda with meals, using a straw, rinsing with water afterward and waiting about 30 minutes before brushing.",
      ),
    ],
    dosage:
      "A cola contains only about 0.05 percent phosphoric acid, which supplies roughly 40 to 60 milligrams of phosphorus per 12-ounce can. That is small next to the 1,000 milligrams or more of phosphorus most adults get each day from meat, dairy, grains and beans, and far below the adult upper limit of 4,000 milligrams a day. The more practical concerns are tooth erosion from frequent sipping and the chance that heavy cola drinking replaces milk and other sources of calcium. Concentrated forms are another story: rust removers and toilet cleaners can contain 10 to 30 percent and call for gloves, goggles and good ventilation.",
    synthesis: [
      route(
        "Wet process (fertilizer grade)",
        "Most of the world's phosphoric acid is made from phosphate rock, a mineral mined in places such as Morocco, China and Florida. The rock is treated with sulfuric acid in a method called the wet process. It produces large amounts of acid cheaply, but the product carries impurities from the rock, such as fluoride and traces of heavy metals. For that reason, most wet-process acid goes into fertilizers, which supply crops with phosphorus, an essential nutrient. With extra purification, some of it can be upgraded to food grade.",
        "Phosphate rock is mostly fluorapatite, a calcium phosphate mineral that also contains fluoride. The rock is ground into a fine powder and mixed with concentrated sulfuric acid. Sulfuric acid is the stronger acid, so it hands its protons to the phosphate, turning it into phosphoric acid. At the same time, calcium from the rock combines with sulfate to form calcium sulfate, which crystallizes with water as gypsum. Because gypsum barely dissolves, it can be filtered off, leaving impure phosphoric acid in solution, while some of the fluoride escapes as hydrogen fluoride gas that has to be captured.",
        {
          equation: "Ca5(PO4)3F + 5 H2SO4 + 10 H2O → 3 H3PO4 + 5 CaSO4·2H2O + HF",
          significance: "This acid carries impurities such as fluoride and heavy metals, so it's used mainly for fertilizers. Every tonne of acid also leaves behind several tonnes of gypsum waste, called phosphogypsum.",
        },
      ),
      route(
        "Thermal process (food grade)",
        "Foods, drinks and electronics need very pure phosphoric acid. The traditional way to make it is the thermal process, which first produces pure elemental phosphorus and then burns it. This method uses a lot of electricity, so it costs more than the wet process. Today some food-grade acid is instead made by carefully purifying wet-process acid. Either way, the final product has to meet strict purity standards.",
        "Phosphate rock is mixed with coke, a nearly pure form of carbon made from coal, and silica (sand), then heated to about 1,500 °C in an electric arc furnace. At that temperature the carbon strips oxygen away from the phosphate, releasing phosphorus as a vapor, while the silica combines with calcium to form a molten slag that is drained off. The phosphorus vapor is cooled and collected as white phosphorus. It is then burned in air to form tetraphosphorus decoxide (P₄O₁₀), a white powder that reacts eagerly with water. Absorbing that powder in water produces pure phosphoric acid.",
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
        "Glutamate is detected by a taste receptor made of two proteins, T1R1 and T1R3, related to the sweet receptor. Free glutamate, meaning glutamate that isn't locked inside a protein chain, fits into a pocket of T1R1 shaped like a Venus flytrap, which closes around it. Molecules called ribonucleotides, such as inosinate (found in meat and fish) and guanylate (found in mushrooms), bind to a neighboring spot on the same receptor. When they do, they help hold the flytrap shut, making the receptor far more responsive to glutamate. This teamwork, called synergy, can multiply the strength of the umami signal several times over.",
        "The activated receptor sends a signal through taste nerves to the brain, which reads it as umami, a savory, meaty, satisfying taste. Umami is thought to signal the presence of protein, an essential nutrient. Besides adding flavor, it increases saliva and can make food seem fuller and longer-lasting in the mouth. It is the reason broth, aged cheese, ripe tomatoes and soy sauce taste so rich. Breast milk is also rich in free glutamate, so people meet this taste from the very start of life.",
        "established",
      ),
      mech(
        "Fuel for the gut lining",
        "When we eat glutamate, whether from MSG or from the protein in food, it is taken up by the cells lining the small intestine, called enterocytes. These cells absorb glutamate through amino-acid transporters and use it as one of their main fuels. Inside the cells, enzymes convert glutamate into α-ketoglutarate, a molecule that feeds into the Krebs cycle, the central energy-producing pathway. Through this route, glutamate's carbon atoms are burned for energy and leave as carbon dioxide. Some glutamate is also used to make other molecules, such as the amino acids alanine and proline and the antioxidant glutathione.",
        "Because the gut lining burns so much of it, most dietary glutamate never reaches the bloodstream in large amounts. Only when very large doses are eaten on an empty stomach do blood levels rise noticeably, and then only briefly. The brain is protected further by the blood–brain barrier, a tightly sealed layer of cells around the brain's blood vessels that strictly controls what gets in. The brain makes its own glutamate, where it acts as a major neurotransmitter, and doesn't rely on glutamate from food. This is why MSG in food doesn't act on the brain the way glutamate released by nerve cells does.",
        "human",
      ),
      mech(
        "A lower-sodium seasoning",
        "MSG contains sodium, but much less than table salt. By weight, MSG is about 12 percent sodium, while sodium chloride is about 39 percent sodium. The difference arises because the glutamate part of MSG is much heavier than the chloride part of salt, so a gram of MSG holds fewer sodium ions. Both add savory or salty taste, but through different receptors on the tongue. Glutamate's umami taste makes food seem flavorful even when it contains less salt.",
        "Studies have found that replacing part of the salt in dishes such as soups, sauces and stir-fries with MSG can cut total sodium by roughly a quarter to a third without people liking the food less. This matters because most people eat more sodium than recommended, which raises their risk of high blood pressure. The savory taste of glutamate partly makes up for the lower saltiness. The approach doesn't work for every food, and MSG still contributes some sodium. But it is one practical tool for reducing sodium while keeping food appealing.",
        "human",
      ),
    ],
    reactions: [
      rxn(
        "Dissociation in food",
        "MSG is a salt, a compound made of a positive ion and a negative ion held together by their opposite charges. Like table salt, it only works once it dissolves, whether in saliva or in the moisture of food. Dissolving separates it into sodium ions and glutamate ions, and it is the free glutamate ion that our taste buds detect. This is exactly the same free glutamate that forms naturally when proteins in foods break down. Your tongue cannot tell whether glutamate came from a tomato or from a shaker of MSG.",
        [
          ["Dissolving", "When MSG crystals touch water, water molecules surround the sodium and glutamate ions and pull them apart. The ions spread out evenly through the liquid. This happens almost instantly because MSG dissolves very easily in water."],
          ["Free glutamate", "The released glutamate ion carries a negative charge at the pH of food and saliva. In this free form it can reach the umami receptors on taste cells. Glutamate that is still bonded inside a protein chain can't fit into the receptor, which is why raw meat tastes less savory than cooked or aged meat."],
          ["Synergy", "When inosinate or guanylate are also present, they bind next to glutamate on the receptor and boost its response. With these helpers, much less glutamate produces the same savory intensity. Food manufacturers sometimes blend small amounts of these ribonucleotides with MSG for this reason."],
        ],
        "This synergy is why pairings like Japanese dashi (kombu seaweed rich in glutamate plus bonito fish rich in inosinate) or tomato sauce with parmesan taste so intensely savory. Cooks around the world discovered these combinations long before anyone understood the chemistry.",
        "C5H8NNaO4 → C5H8NO4- + Na+",
      ),
      rxn(
        "The Maillard reaction",
        "The Maillard reaction is a family of chemical reactions between amino acids and sugars that happens when food is heated. It produces the brown color and rich flavor of toast, roasted meat, fried onions and coffee. Glutamate, like other amino acids, can take part. The reaction is named after the French chemist Louis-Camille Maillard, who described it in 1912. It runs fastest at high temperatures in fairly dry conditions, which is why searing meat browns it but boiling does not.",
        [
          ["Condensation", "When food is heated, the amino group (–NH₂) of glutamate reacts with the carbonyl group of a reducing sugar such as glucose. The two molecules join and release a molecule of water, a type of reaction called condensation. The product is an unstable compound called a glycosylamine."],
          ["Rearrangement", "The glycosylamine rearranges its atoms into a more stable structure called an Amadori compound. No atoms are added or removed in this step; bonds just shift around. The Amadori compound is the starting point for many further reactions."],
          ["Flavor and color", "With continued heating, Amadori compounds break apart and react in many different ways, producing hundreds of small molecules with strong aromas, such as pyrazines (roasted, nutty) and furans (caramel-like). Some fragments join into large brown polymers called melanoidins, which give browned food its color."],
        ],
        "Amino acids and sugars reacting together create the flavors of toast, roasted meat, chocolate and fried onions. Each amino acid produces a slightly different set of aromas, which is part of why different foods brown with such different flavors.",
      ),
    ],
    hazards: [
      hz(
        "Reported sensitivity",
        "For decades, MSG was blamed for a cluster of symptoms, including headache, flushing and sweating, once nicknamed “Chinese restaurant syndrome.” The label came from a 1968 letter to a medical journal and spread widely despite little evidence, and it is now recognized as reflecting prejudice against Asian food. Carefully controlled studies have not supported the idea that MSG in normal amounts causes these symptoms. A small number of people may get mild, short-lived symptoms after large doses on an empty stomach. Regulators worldwide consider MSG safe.",
        "Glutamate is mostly burned as fuel by the cells lining the gut, so normal amounts in food barely change blood levels. When large amounts, several grams, are taken without food, blood glutamate can rise briefly, because there is nothing to slow its absorption. Scientists have looked for a way that this rise could cause headaches or flushing, but no consistent mechanism has been found. The brain is shielded from blood glutamate by the blood–brain barrier. Glutamate from MSG is chemically identical to the glutamate in tomatoes, cheese and breast milk.",
        "In double-blind trials, neither the participants nor the researchers knew who got MSG and who got a placebo. Under those conditions, symptoms appeared inconsistently and weren't reliably linked to MSG. A few studies found slightly more mild symptoms, such as headache or muscle tightness, after doses of 3 grams or more without food, which is far more than a typical serving. These symptoms were brief and caused no lasting harm. Expectations strongly shape how people feel, which may explain why some report reactions when they believe they have eaten MSG.",
      ),
      hz(
        "Sodium contribution",
        "Although MSG contains less sodium than salt, it still adds some, and that sodium counts toward your daily total. People carefully limiting sodium for blood pressure or kidney reasons should take it into account. In processed foods, MSG is often used alongside salt rather than instead of it, so total sodium can still be high. The sodium figure on the Nutrition Facts label gives the full picture. Used as a partial replacement for salt, though, MSG can help lower sodium intake.",
        "Each MSG molecule contains one sodium ion. Because glutamate is a fairly heavy ion, sodium makes up only about 12 percent of MSG's weight. So each gram of MSG supplies about 120 milligrams of sodium, compared with about 390 milligrams in a gram of table salt. Inside the body, sodium from MSG behaves exactly like sodium from salt. It dissolves into the blood and is regulated by the kidneys.",
        "Sodium is vital for nerve signals and fluid balance, but most people eat more than they need. High intake over many years contributes to high blood pressure, which raises the risk of heart disease and stroke. A teaspoon of MSG, about 4 grams, contains roughly 500 milligrams of sodium, about a fifth of the recommended daily limit for adults. Most people consume far less MSG than that. As with salt, the overall daily total matters more than any single food.",
      ),
    ],
    dosage:
      "Most people eat about 0.5 to 1 gram of added MSG a day, while they get far more glutamate, roughly 10 grams or more, bound up in the protein of ordinary foods. International food-safety experts (JECFA) have given MSG an acceptable daily intake of “not specified,” the category for substances of very low concern, and the U.S. FDA considers it generally recognized as safe. In controlled studies, symptoms appeared only in some people and only after 3 grams or more on an empty stomach. Each gram of MSG contributes about 120 milligrams of sodium. As a seasoning a little goes a long way: about half a teaspoon flavors a pound of meat or several servings of vegetables.",
    synthesis: [
      route(
        "Bacterial fermentation",
        "Nearly all MSG today is made by fermentation, using bacteria to turn sugar into glutamic acid in a process much like brewing. The main microbe is Corynebacterium glutamicum, a soil bacterium found in Japan in 1956 because of its remarkable ability to pour out glutamate. It is grown in huge tanks on sugar cane or sugar beet molasses, corn starch or tapioca. The glutamate it makes is identical to the glutamate in tomatoes or cheese. Millions of tonnes are produced every year, making it one of the largest-volume fermentation products in the world.",
        "Like all cells, Corynebacterium glutamicum runs the Krebs cycle, which produces a molecule called α-ketoglutarate. An enzyme then adds an amino group, taken from ammonia, to α-ketoglutarate, converting it into glutamate. Normally the bacteria keep their glutamate inside and use it to build proteins. But when producers limit biotin, a vitamin the bacteria need to build healthy cell membranes, the membranes become leaky. Glutamate then streams out into the surrounding broth while the cells keep making more. Afterward, glutamic acid is crystallized out of the broth by adjusting the pH and neutralized with sodium hydroxide to make MSG.",
        { equation: "C5H9NO4 + NaOH → C5H8NNaO4 + H2O", significance: "This 1950s Japanese discovery made MSG cheap and launched the industrial fermentation of amino acids." },
      ),
      route(
        "Original extraction",
        "MSG was discovered in 1908 by the Japanese chemist Kikunae Ikeda, who wanted to know what gave kombu seaweed broth, a staple of Japanese cooking, its distinctive savory taste. He boiled down large amounts of the broth and isolated crystals of glutamic acid. He found that its sodium salt, MSG, had a strong, pleasant savory taste and was easy to handle. Ikeda named the taste “umami,” from a Japanese word meaning delicious. The next year, MSG went on sale in Japan under the brand name Ajinomoto, meaning “essence of taste.”",
        "Ikeda extracted glutamate by evaporating kombu broth and separating its components by crystallization, taking advantage of differences in how well each substance dissolves. Early industrial production didn't use seaweed, which contained too little glutamate to be practical. Instead, factories took wheat gluten, a protein rich in glutamic acid, and boiled it with hydrochloric acid. The acid broke the peptide bonds holding the protein together, a reaction called hydrolysis, releasing all of its amino acids. Glutamic acid was then separated from the mixture by crystallization and neutralized to make MSG. This method was slow and costly, and fermentation replaced it in the 1950s and 1960s.",
        { significance: "Umami was accepted as a fifth basic taste, alongside sweet, sour, salty and bitter, after its receptor was discovered in the early 2000s." },
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
        "White light, like sunlight, is a mixture of all the colors of the rainbow. Allura Red's molecule contains a long chain of alternating single and double bonds running across its rings and the azo bridge, called a conjugated system. In such a system, electrons are spread out over many atoms and can absorb energy from light. Allura Red's electrons absorb light with a wavelength of about 504 nanometers, which is blue-green, and jump up to a higher energy level. The length and shape of the conjugated system decide exactly which wavelength gets absorbed.",
        "When white light hits a food colored with Allura Red, the blue-green part is absorbed and the rest is reflected or passes through. Our eyes and brain see the mix of remaining wavelengths as red, the complementary color of blue-green. Cone cells in the retina, which respond to red, green and blue light, send signals that the brain combines into the color we perceive. Because only tiny amounts of dye are needed to absorb enough light, foods can be colored with just a few parts per million. That intensity is part of what makes synthetic dyes so cheap to use.",
        "established",
      ),
      mech(
        "Breakdown by gut bacteria",
        "Allura Red is poorly absorbed in the small intestine because its sulfonate groups give it a negative charge and make it dissolve readily in water, so it passes on to the colon. There, bacteria produce enzymes called azoreductases that break the azo bond (–N=N–), the bridge between the dye's two halves. They do this by adding hydrogen atoms, a type of reaction called reduction. The dye splits into two separate molecules, each with an amino group (–NH₂) and a sulfonate group. These are called sulfonated aromatic amines.",
        "Most of the breakdown products are poorly absorbed, because their sulfonate groups keep them charged, so they leave the body in feces. The sulfonate groups also make these amines far less toxic than unsulfonated aromatic amines, some of which are known to cause cancer. Laboratory studies show that gut bacteria can break Allura Red down within hours. Researchers are still studying whether these products have subtler effects on the gut lining or on the bacteria themselves. Current evidence suggests they are largely harmless at normal intakes.",
        "lab",
      ),
      mech(
        "Behavior in sensitive children",
        "No single biological mechanism has been established for how synthetic dyes might affect behavior. One idea is that some children are sensitive to histamine, a messenger molecule, and that additives may trigger histamine release that affects the brain. Another is that the dyes or their breakdown products interfere with neurotransmitters, the chemicals nerve cells use to communicate. Differences in genes or gut bacteria could explain why only some children seem to be affected. These ideas are still being tested.",
        "In the 2007 Southampton study in the U.K., children drank juice containing either a mixture of synthetic dyes plus the preservative sodium benzoate or a look-alike placebo, without knowing which. Some of the children showed a small rise in hyperactive behavior after the dye mixtures. Since then, a 2021 review by California's Office of Environmental Health Hazard Assessment concluded that synthetic food dyes can affect behavior in some children. The effects are generally small and vary from child to child. They don't mean dyes cause ADHD, but they may worsen symptoms in sensitive children.",
        "human",
      ),
      mech(
        "Gut inflammation in mice",
        "In a 2022 study, researchers fed mice Allura Red for several weeks. They found it increased production of serotonin, a signaling molecule, by specialized cells in the lining of the gut called enterochromaffin cells. In the gut, serotonin affects how the intestine moves, what it secretes and how the immune system responds. The dye also seemed to change the makeup of the gut bacteria. These effects depended on long-term exposure, not a single dose.",
        "Mice exposed to Allura Red were more susceptible to experimentally induced colitis, a model of inflammatory bowel disease in which the colon becomes inflamed. The rise in gut serotonin appeared to be part of the cause. However, mouse studies don't always predict what happens in people, and the doses relative to body weight may differ from typical human exposure. Researchers are now investigating whether similar effects occur in humans. For now it remains an early laboratory finding rather than an established human risk.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Diazotization and azo coupling (how it's made)",
        "Most synthetic dyes, including Allura Red, are made by joining two aromatic molecules with an azo bridge (–N=N–). This takes two classic steps, first developed in the 19th century during the boom in synthetic dyes. In the first step, an aromatic amine is turned into a reactive molecule called a diazonium ion. In the second, the diazonium ion attaches itself to another aromatic molecule. The reactions run in water, usually in the cold, and they are the foundation of the whole azo-dye industry.",
        [
          ["Diazotization", "An aromatic amine, cresidine-4-sulfonic acid, is mixed with sodium nitrite and acid near 0 °C. The acid and nitrite form nitrous acid, which reacts with the amine's –NH₂ group and converts it into a diazonium group (–N₂⁺). The cold is essential because diazonium ions fall apart quickly when warm."],
          ["Azo coupling", "The diazonium ion is hungry for electrons, so it attacks an electron-rich aromatic ring, here a naphthol called Schaeffer's salt. It replaces a hydrogen atom on that ring in a reaction called electrophilic aromatic substitution. The two ring systems are now linked by an –N=N– bridge."],
          ["Isolation", "Adding a lot of salt makes the dye less soluble, so it comes out as a solid, a technique called salting out. The dye is filtered, purified to remove leftover starting materials and impurities, and dried into a powder."],
        ],
        "The new –N=N– bridge joins the two rings into one long conjugated system, which is what creates the color. By changing the starting amine and the coupling partner, chemists can make thousands of different azo dyes in nearly every color.",
        "Ar-NH2 + HNO2 + H+ → Ar-N2+ + 2 H2O",
      ),
      rxn(
        "Azo reduction",
        "The azo bridge (–N=N–) that gives Allura Red its color can be broken by adding electrons and hydrogen atoms, a type of reaction called reduction. When the bridge breaks, the long conjugated system is cut in two and the color disappears. This happens in our intestines, where bacteria do it with enzymes, and it can also be done with chemicals or in wastewater treatment. The reaction matters both for understanding what happens to dyes in the body and for removing them from the environment. It is essentially the coupling reaction run backward.",
        [
          ["Electron transfer", "Bacterial enzymes called azoreductases take electrons from a carrier molecule, NADH, and hand them to the azo group. The two nitrogen atoms in the double bond accept those electrons. This weakens the bond between them."],
          ["Intermediate", "After the first two electrons and two hydrogen ions are added, the –N=N– double bond becomes a single bond with a hydrogen on each nitrogen (–NH–NH–), called a hydrazo group. This intermediate is colorless because the conjugated system has been interrupted."],
          ["Cleavage", "Adding two more electrons and hydrogens breaks the nitrogen–nitrogen bond completely. The molecule splits into two separate aromatic amines, each with an –NH₂ group where the bridge used to be."],
        ],
        "The same reaction lets bacteria in wastewater treatment plants decolorize azo dyes from industrial waste. Chemists also use it to work out the structure of an unknown azo dye: reducing it and identifying the two amines reveals the original building blocks.",
        "R-N=N-R' + 4 [H] → R-NH2 + R'-NH2",
      ),
    ],
    hazards: [
      hz(
        "Hyperactivity in sensitive children",
        "Synthetic food dyes, including Allura Red, don't cause ADHD, but research suggests they can increase hyperactive behavior in some sensitive children. The effect was seen in controlled trials, especially the 2007 Southampton study, which used mixtures of dyes. Average effects were small, but some children seemed to react much more strongly than others. This evidence has led to policy changes in several places. Many parents choose to limit dyed foods as a precaution.",
        "The underlying mechanism remains unclear. Researchers have proposed that dyes might trigger histamine release or affect neurotransmitter systems in the brain, but neither has been proven. Because the dyes are poorly absorbed, it's also possible that their breakdown products, or their effects on gut bacteria, play a role. Genetic differences, for example in how quickly children clear histamine, may explain why some are affected and others aren't. Studying these effects is hard because behavior is shaped by so many factors.",
        "In trials where children didn't know whether their drink contained dyes, parents and teachers rated some children as more hyperactive after the dye drinks. The European Union responded by requiring foods containing certain dyes to carry the warning “may have an adverse effect on activity and attention in children.” In the United States, California passed a law in 2024 that removes six synthetic dyes, including Red 40, from food served in public schools. Many food companies have reformulated products to use natural colors instead.",
      ),
      hz(
        "Manufacturing impurities",
        "Making synthetic dyes from petroleum chemicals can leave behind small amounts of unwanted byproducts. Some of these, certain aromatic amines in particular, are known or suspected to cause cancer. That is why food dyes are strictly regulated and tested. In the United States, Allura Red is one of a small group of color additives that the FDA must certify batch by batch. Certification keeps impurities at tiny, carefully controlled levels.",
        "The reactions that make Allura Red start from aromatic amines, molecules made of a benzene ring carrying an amino group. If the starting materials aren't pure, or if side reactions occur, small amounts of amines can remain in the final dye. For Allura Red, the main one is leftover p-cresidine, the starting amine, which has caused cancer in animals at high doses; benzidine, a related amine linked to bladder cancer in dye workers decades ago, is another impurity regulators watch for in azo dyes. Traces of metals such as lead and arsenic from raw materials are also possible. Purification steps are designed to remove them.",
        "FDA chemists test a sample from every batch of certified dye sold in the United States, checking that impurities fall below strict limits measured in parts per million or less. Only batches that pass can be used in food, drugs or cosmetics. These limits are set far below levels that would cause harm. As a result, the amount of impurities anyone eats from food dyes is extremely small. Batch certification of food colors has been required in the U.S. since 1938.",
      ),
    ],
    dosage:
      "International experts (JECFA) have set an acceptable daily intake for Allura Red of up to 7 milligrams per kilogram of body weight, the amount considered safe to eat every day for life. Average intakes are below this, but children who eat a lot of brightly colored candy, cereals and drinks can approach several milligrams per kilogram on some days. A single serving of a red drink or candy may contain tens of milligrams. In the U.S., Red 40 must be listed by name on ingredient labels, so it is easy to spot. Families who want to limit it can choose products colored with natural pigments such as beet juice or paprika.",
    synthesis: [
      route(
        "Petrochemical synthesis",
        "Allura Red is made entirely from chemicals derived from petroleum, as are most synthetic food dyes. It was introduced by the Allied Chemical Corporation in the early 1970s (the “AC” in its name stands for Allied Chemical) and became the main red food dye in the U.S. after Red No. 2 was banned in 1976. Its manufacture uses classic azo-dye chemistry. The final product is a dark red powder that dissolves easily in water. It is stable in light, heat and acid, which natural red colors often are not.",
        "The process starts with cresidine-4-sulfonic acid, an aromatic amine with a sulfonate group that will help the finished dye dissolve in water. It is chilled in water with acid and treated with sodium nitrite, turning its amino group into a reactive diazonium ion. This solution is then slowly added to a second chemical, 6-hydroxy-2-naphthalenesulfonic acid, a two-ring aromatic compound that also carries a sulfonate group. The diazonium ion attacks the electron-rich ring, linking the two molecules through an azo bridge (–N=N–). The resulting dye is collected as its disodium salt, washed to remove impurities and dried.",
        { significance: "Every batch sold in the U.S. is chemically tested and certified by the FDA before use." },
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
        "Tartrazine's molecule has a conjugated system, a chain of alternating single and double bonds, running through its pyrazolone ring, the azo bridge (–N=N–) and a benzene ring. Electrons in this system are spread over many atoms and can absorb energy from light. Tartrazine's conjugated system is arranged differently from Allura Red's, so its electrons absorb light of a shorter wavelength, around 427 nanometers, which is violet-blue. Shorter wavelengths carry more energy. By changing the length and shape of a dye's conjugated system, chemists can shift which color it absorbs.",
        "When white light shines on tartrazine, the violet and blue parts are absorbed and the remaining wavelengths, mainly green, yellow, orange and red, reach our eyes. The brain blends them into the perception of bright lemon yellow. Because yellow and blue are complementary, mixing tartrazine with a blue dye such as Brilliant Blue FCF absorbs light at both ends of the spectrum and leaves green. That is how the vivid greens of candies, sports drinks and some pickles are made. Tartrazine also colors some medicines and cosmetics.",
        "established",
      ),
      mech(
        "Intolerance reactions",
        "In a small number of people, tartrazine appears to trigger mast cells, immune cells that store chemical messengers such as histamine, to release their contents. Unlike a true allergy, this doesn't involve IgE antibodies, the proteins that recognize specific allergens, so it is called a pseudo-allergic reaction. Tartrazine may also affect the production of inflammatory molecules called leukotrienes, in a way similar to aspirin. The exact mechanism isn't fully understood. The reaction depends on how much is eaten.",
        "When mast cells release histamine and other messengers, small blood vessels widen and leak fluid, causing hives, itching and swelling of the skin. In people with asthma, the airways can tighten, leading to wheezing or an asthma attack. Many people who react to tartrazine are also sensitive to aspirin, which hints at a shared pathway. Symptoms usually appear within minutes to hours of eating the dye. Avoiding foods and medicines that contain tartrazine prevents the reactions.",
        "human",
      ),
      mech(
        "Gut bacterial breakdown",
        "Like other azo dyes, tartrazine is poorly absorbed in the small intestine, because its sulfonate and carboxylate groups make it strongly charged and very water-soluble. When it reaches the colon, bacteria produce azoreductase enzymes that break the azo bond (–N=N–) by adding hydrogen atoms. This splits tartrazine into two smaller molecules: sulfanilic acid and an aminopyrazolone. Both have amino groups where the azo bridge used to be. The breakdown destroys the dye's color.",
        "The breakdown products are themselves poorly absorbed and mostly leave in feces, while the small amounts that are absorbed are removed in urine. Sulfanilic acid is a fairly harmless compound that doesn't build up in the body. Studies in animals and people show that tartrazine and its breakdown products don't accumulate in tissues. This is part of why regulators consider tartrazine safe at typical intakes for most people. Research continues into how azo dyes interact with the gut bacteria that break them down.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Azo coupling (how it's made)",
        "Tartrazine is made by the same two-step azo chemistry used for most synthetic dyes: diazotization followed by azo coupling. The first molecule, sulfanilic acid, is turned into a reactive diazonium ion. It then attaches to the second molecule, a pyrazolone, forming an azo bridge between them. Choosing a pyrazolone as the partner, instead of a naphthol like the one used for Allura Red, is what makes the dye yellow rather than red. The reactions are carried out in cold water.",
        [
          ["Diazotization", "Sulfanilic acid, a benzene ring carrying an amino group and a sulfonate group, is treated with sodium nitrite and acid near 0 °C. Nitrous acid formed in the mixture converts the amino group into a diazonium group (–N₂⁺). This makes the molecule highly reactive toward electron-rich partners."],
          ["Coupling", "The diazonium ion is added to a solution of a sulfophenyl pyrazolone carboxylic acid. The pyrazolone ring has an electron-rich carbon atom that the diazonium ion attacks, forming a new nitrogen–carbon bond. The two halves are now joined by an –N=N– bridge."],
          ["Salt formation", "The product is neutralized with sodium hydroxide to form its trisodium salt, meaning three sodium ions balance its three negative charges. The dye is then salted out, filtered, purified and dried into a yellow-orange powder."],
        ],
        "The pyrazolone ring changes the conjugated system compared with naphthol-based dyes, shifting absorption toward shorter wavelengths, so the dye looks yellow instead of red. Small structural changes like this let chemists tune dyes to almost any color.",
      ),
    ],
    hazards: [
      hz(
        "Intolerance in a small minority",
        "A small minority of people react to tartrazine with hives, itching or, rarely, asthma attacks. Because these reactions can be serious for people with asthma, U.S. labels must list “Yellow 5” or “FD&C Yellow No. 5” by name rather than just “artificial color,” a rule in place since 1981. People who know they react can easily avoid it by reading labels. For the vast majority of people, tartrazine causes no reaction at all. Reactions are more common among people who are also sensitive to aspirin.",
        "In sensitive people, tartrazine triggers mast cells to release histamine and other inflammatory messengers without involving IgE antibodies. Because this pseudo-allergic activation doesn't need prior exposure, it can happen the first time someone eats the dye. Some evidence suggests tartrazine acts on the same inflammatory pathway as aspirin, increasing the production of leukotrienes, molecules that make airways tighten. The reaction depends on dose, so small amounts may cause no symptoms at all. The exact chemical trigger remains uncertain.",
        "Histamine released from mast cells widens small blood vessels in the skin and makes them leak, producing raised, itchy welts called hives and sometimes swelling. In the airways, histamine and leukotrienes make the muscles tighten and the lining swell, which can cause wheezing or an asthma attack in susceptible people. Estimates suggest well under 1 in 1,000 people are affected. Reactions usually fade once the dye has been cleared from the body. Antihistamines and asthma medicines can relieve the symptoms.",
      ),
      hz(
        "Hyperactivity in sensitive children",
        "Tartrazine was one of the dyes in the mixtures tested in the 2007 Southampton study, which found small increases in hyperactive behavior in some children. As with other dyes, it doesn't cause ADHD, but it may affect behavior in sensitive children. Because it was only tested as part of mixtures, its individual effect isn't known. The European Union now requires a warning label on foods that contain it. Some manufacturers have replaced it with natural yellows such as turmeric or annatto.",
        "No mechanism by which tartrazine might affect behavior has been established. Proposed explanations include histamine release that could affect the brain, or effects on how nutrients are absorbed, but the evidence for either is limited. Because tartrazine is poorly absorbed, any effects might also run through gut bacteria or the dye's breakdown products. Genetic differences may help explain why only some children respond. More research is needed to understand the chemistry involved.",
        "In the Southampton trial, children who drank juice containing dye mixtures with tartrazine were rated as more hyperactive, on average, by parents and teachers than when they drank a placebo. The effect varied a lot from child to child. Based on this study, the EU requires foods containing tartrazine to carry the warning “may have an adverse effect on activity and attention in children.” Regulators did not change the acceptable daily intake, judging the evidence too limited for that. Parents who suspect a sensitivity can choose dye-free foods.",
      ),
    ],
    dosage:
      "International experts (JECFA) have set an acceptable daily intake for tartrazine of up to 10 milligrams per kilogram of body weight, the amount considered safe every day for life. Typical exposures are lower, although children who eat a lot of brightly colored foods have the highest intakes. A colored drink or candy usually contains a few to tens of milligrams. In the U.S., it must appear as “Yellow 5” on ingredient lists, and in the EU as E102. People with aspirin sensitivity or asthma who notice reactions are the main group advised to avoid it.",
    synthesis: [
      route(
        "Industrial synthesis",
        "Tartrazine was first made in 1884 by the Swiss chemist Johann Heinrich Ziegler, at a time when chemists were racing to invent new synthetic dyes. Today it is produced from petroleum-derived chemicals in large chemical plants. It is one of the most widely used yellow food colors in the world. In the U.S., every batch has to be certified by the FDA. In Europe it is labeled E102.",
        "Sulfanilic acid, an aromatic amine with a sulfonate group, is first converted into a diazonium ion by treating it with sodium nitrite and acid at low temperature. The diazonium ion is then coupled with 1-(4-sulfophenyl)-3-carboxy-5-pyrazolone, a ring-shaped molecule with an electron-rich carbon that the diazonium ion attacks. This forms the azo bridge linking the two parts of the dye. Adding sodium hydroxide converts the product into its trisodium salt. It is then purified by salting out, filtering and washing, and dried into a powder.",
        { significance: "Tartrazine's name comes from tartaric acid, used in Ziegler's original 1884 synthesis." },
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
        "When sugar is heated strongly, its molecules lose water and break into small, reactive fragments. These fragments link together into larger and larger molecules with long chains of alternating single and double bonds, called conjugated systems. Large conjugated molecules absorb light across much of the visible spectrum, but they absorb blue and violet light more strongly than red. Because caramel color is a mixture of thousands of such molecules of different sizes, it absorbs a broad sweep of wavelengths. The largest of these brown polymers are called melanoidins.",
        "With blue light absorbed most and red light least, the light that reaches our eyes is weighted toward red, orange and yellow, which together look brown. Darker caramels contain more and bigger polymers, so they absorb more light overall. Manufacturers measure color strength as “tinctorial power,” how much light a standard solution absorbs. Caramel color gives colas, dark beers, soy sauce, gravies and baked goods a consistent brown appearance. At the amounts used, it adds very little flavor.",
        "established",
      ),
      mech(
        "Matching the charge",
        "Caramel color isn't a single substance dissolved in water but a suspension of tiny particles called colloids, so small that they stay spread out instead of sinking. These particles carry an electric charge on their surfaces, and the charge depends on the chemicals added during heating. Ammonia compounds tend to give a positive charge, while sulfite compounds give a negative one. Particles with the same charge repel each other, which keeps them evenly dispersed. If they meet substances with the opposite charge, they can clump together and settle.",
        "To keep the color evenly spread through a product, the caramel's charge has to suit the product's chemistry. Colas are very acidic and contain negatively charged ingredients, so they need negatively charged class IV caramel; a positively charged caramel would clump and form sediment. Beer and soy sauce contain positively charged proteins, so they use positively charged class III caramel. Matching the charge prevents haze, sediment and color loss during storage. This is why food makers pick a specific class of caramel for each product.",
        "established",
      ),
      mech(
        "4-MEI in animal studies",
        "When caramel is made with ammonia compounds (classes III and IV), the ammonia reacts with small fragments of broken-down sugar such as methylglyoxal, a molecule with two reactive carbonyl groups. This reaction forms small ring-shaped molecules called imidazoles, which contain two nitrogen atoms. One of these is 4-methylimidazole, or 4-MEI. It is a byproduct, not something added on purpose. Similar reactions produce small amounts of 4-MEI in roasted coffee and grilled foods.",
        "In a long-term study by the U.S. National Toxicology Program, mice fed high doses of 4-MEI for two years developed more lung tumors, while rats did not. Because of that study, the International Agency for Research on Cancer classifies 4-MEI as possibly carcinogenic to humans (Group 2B). The doses in the mouse study were far higher than what people get from food and drink. Regulators such as the FDA and the European Food Safety Authority have concluded that 4-MEI at typical exposures is not a health concern. Manufacturers have nonetheless reduced it as a precaution.",
        "lab",
      ),
    ],
    reactions: [
      rxn(
        "Ammonia caramel chemistry",
        "Ammonia caramels (classes III and IV) are made by heating sugar with ammonia compounds, and the reactions involved resemble the Maillard reaction that browns bread and roasted meat. Heat breaks sugar into small, reactive pieces, ammonia contributes nitrogen atoms, and the fragments join into large colored molecules. Hundreds of different compounds form at once. The process is carefully controlled to reach the desired color and charge while limiting unwanted byproducts such as 4-MEI. Small changes in time, temperature or pH can noticeably change the outcome.",
        [
          ["Fragmentation", "As the sugars are heated, they lose water and break apart into small, highly reactive pieces called dicarbonyls, molecules with two carbon–oxygen double bonds. Methylglyoxal is one example. These fragments react quickly with whatever is nearby."],
          ["Ring formation", "Ammonia reacts with the dicarbonyl fragments, adding nitrogen atoms and closing them into small rings called imidazoles. One of these is 4-methylimidazole (4-MEI). Other nitrogen-containing rings, such as pyrazines, also form and contribute to the aroma."],
          ["Polymerization", "Many of the reactive fragments, with and without nitrogen, link up into very large, complex molecules called melanoidins. Their long conjugated systems absorb light and give the deep brown color. They also carry the surface charge that determines how the caramel behaves in a drink or sauce."],
        ],
        "Controlling time, temperature and reactants lets manufacturers minimize 4-MEI while hitting a target color. Since 2012, makers of class IV caramel for colas have changed their processes to cut 4-MEI levels dramatically.",
      ),
    ],
    hazards: [
      hz(
        "4-MEI byproduct",
        "The main health question about caramel color concerns 4-methylimidazole (4-MEI), a byproduct formed in ammonia-process caramels (classes III and IV), which are used in colas, beers and soy sauces. Plain caramel (class I) doesn't contain it. In 2011 California added 4-MEI to its Proposition 65 list of chemicals known to the state to cause cancer, which requires warning labels above a set exposure level. Major cola makers responded in 2012 by changing their caramel recipes to reduce 4-MEI. Today's exposure is far below the levels that caused effects in animal studies.",
        "4-MEI forms when ammonia reacts with sugar fragments such as methylglyoxal during heating. How much forms depends on the temperature, the heating time, the pH and the ratio of sugar to ammonia. By adjusting these conditions, manufacturers can make caramel with much less 4-MEI while keeping the same color. 4-MEI dissolves easily in water, so it ends up in the drinks and sauces the caramel colors. It also forms in small amounts when other foods, such as coffee, are roasted.",
        "In mice given very high doses of 4-MEI over their lifetime, lung tumors increased, but similar effects weren't seen in rats. IARC therefore classifies it as possibly carcinogenic to humans (Group 2B), based on limited evidence in animals and none in people. The U.S. FDA and the European Food Safety Authority have concluded that 4-MEI at the levels found in foods is not a safety concern. California's Proposition 65 safe-harbor level for 4-MEI is 29 micrograms per day. After reformulation, a can of cola typically contains well under that amount.",
      ),
    ],
    dosage:
      "How much caramel color a person eats depends mostly on how much cola, dark beer, soy sauce and gravy they consume. International experts have set high acceptable daily intakes for caramel colors, in the range of 100 to 300 milligrams per kilogram of body weight depending on the class and the agency, reflecting their low toxicity. Typical intakes are well below these limits. The main concern, 4-MEI, has been greatly reduced in U.S. colas since 2012, when manufacturers changed their processes in response to California's Proposition 65. Plain caramel (class I) is essentially burnt sugar and contains no 4-MEI.",
    synthesis: [
      route(
        "Industrial cooking",
        "Caramel color is made by cooking sugar under carefully controlled conditions, much like making caramel at home but on a vast scale and with precise chemistry. The starting material is usually glucose syrup from corn or wheat, or sucrose. Depending on the class of caramel, manufacturers add acids, alkalis, ammonium compounds or sulfites to steer the reactions. The batch is heated until it reaches the desired color and then cooled. The result is a dark brown liquid or powder used to color thousands of products.",
        "Food-grade sugar syrup is heated, often under pressure, to temperatures above 120 °C in large stainless-steel reactors. As it heats, the sugar molecules lose water and break into reactive fragments that then join together into large brown polymers. Adding acids or bases speeds these reactions up. Adding ammonium compounds introduces nitrogen and gives the particles a positive charge (class III), adding sulfites gives a negative charge (class II), and using both produces negatively charged class IV. Throughout the process, technicians monitor the color intensity, and when the target is reached, the batch is cooled quickly to stop the reactions and then filtered.",
        { significance: "Plain caramel (class I) is essentially burnt sugar; the other classes trade simplicity for stability in specific products." },
      ),
    ],
  },
};
