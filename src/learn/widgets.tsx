import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw } from "lucide-react";
import { MoleculeViewer } from "../components/MoleculeViewer";
import { Formula, Segmented } from "../components/ui";
import { seededShuffle } from "../components/Quiz";
import type { WidgetId } from "./lessons";

export function LessonWidget({ id }: { id: WidgetId }) {
  switch (id) {
    case "label-decoder":
      return <LabelDecoder />;
    case "dose-slider":
      return <DoseSlider />;
    case "same-molecule":
      return <SameMolecule />;
    case "ph-scale":
      return <PhScale />;
    case "micelle":
      return <Micelles />;
    case "ptrap":
      return <PhTrap />;
    case "radical-chain":
      return <RadicalChain />;
    case "sensitization":
      return <Sensitization />;
    case "chirality":
      return <Chirality />;
    case "evidence-sort":
      return <EvidenceSort />;
  }
}

function Lab({ title, children, hint }: { title: string; children: ReactNode; hint?: string }) {
  return (
    <figure className="lab">
      <figcaption>
        <span className="lab-title">{title}</span>
        {hint && <span className="lab-hint">{hint}</span>}
      </figcaption>
      {children}
    </figure>
  );
}

// ---------------------------------------------------------------------------

const LABEL_TERMS = [
  { raw: "Aqua", what: "Water", note: "The INCI name for water. As the first ingredient, it's the largest part of the product." },
  { raw: "Glycerin", what: "A humectant", note: "Pulls water into the outer layer of skin. Made from plant oils or as a by-product of soap making." },
  { raw: "Butyrospermum Parkii Butter", what: "Shea butter", note: "Plants are listed by Latin name. Butyrospermum parkii is the shea tree." },
  { raw: "Cetearyl Alcohol", what: "A fatty alcohol", note: "Not a drying alcohol like ethanol. It thickens creams and softens skin." },
  { raw: "Sodium Hydrogen Carbonate", what: "Baking soda", note: "A long, systematic name for a familiar kitchen ingredient." },
  { raw: "Tocopherol", what: "Vitamin E", note: "An antioxidant that protects the oils in the formula from going rancid." },
  { raw: "Phenoxyethanol", what: "A preservative", note: "Keeps bacteria and mold from growing in a water-based product." },
  { raw: "Parfum", what: "Fragrance", note: "An umbrella term that can stand for dozens of undisclosed scent molecules." },
  { raw: "Limonene", what: "A fragrance allergen", note: "Listed separately because EU rules require known fragrance allergens to be named above set levels, even inside “parfum”." },
];

function LabelDecoder() {
  const [sel, setSel] = useState(0);
  const t = LABEL_TERMS[sel];
  return (
    <Lab title="Decode a moisturizer label" hint="Tap each ingredient">
      <div className="decoder">
        <p className="decoder-label">
          <span className="decoder-heading">Ingredients:</span>{" "}
          {LABEL_TERMS.map((x, i) => (
            <span key={x.raw}>
              <button type="button" className="decoder-term" aria-pressed={i === sel} onClick={() => setSel(i)}>
                {x.raw}
              </button>
              {i < LABEL_TERMS.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <div className="decoder-out" aria-live="polite">
          <span className="decoder-pos tabular">Position {sel + 1}</span>
          <strong>
            {t.raw} = {t.what}
          </strong>
          <p>{t.note}</p>
        </div>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const DRINKS = [
  { id: "coffee", label: "Coffee", mg: 95, unit: "cup (8 oz)" },
  { id: "energy", label: "Energy drink", mg: 160, unit: "can (16 oz)" },
  { id: "cola", label: "Cola", mg: 34, unit: "can (12 oz)" },
  { id: "tea", label: "Black tea", mg: 47, unit: "cup (8 oz)" },
] as const;

function DoseSlider() {
  const [drink, setDrink] = useState<(typeof DRINKS)[number]["id"]>("coffee");
  const [count, setCount] = useState(2);
  const [kg, setKg] = useState(60);
  const d = DRINKS.find((x) => x.id === drink)!;
  const total = d.mg * count;
  const perKg = total / kg;
  const teenLimit = 2.5 * kg; // Health Canada guidance for adolescents
  const max = 1200; // FDA: toxic effects like seizures reported around 1,200 mg consumed rapidly
  const zone = total <= Math.min(teenLimit, 400) ? "ok" : total <= 400 ? "teen" : total < max ? "high" : "toxic";
  const message =
    zone === "ok"
      ? "Within guidance for adults and for teens at this body weight."
      : zone === "teen"
        ? "Within the adult limit, but above the 2.5 mg/kg guidance for teens."
        : zone === "high"
          ? "Above the 400 mg daily limit for healthy adults. Expect jitters, a racing heart and poor sleep."
          : "In the range where the FDA has seen seizures when caffeine is consumed quickly. This is why concentrated caffeine powders are dangerous.";
  return (
    <Lab title="How much caffeine is too much?" hint="Adjust the drinks and body weight">
      <div className="dose">
        <Segmented label="Drink" options={DRINKS.map((x) => ({ value: x.id, label: x.label }))} value={drink} onChange={setDrink} />
        <label className="range-field">
          <span>
            Servings <strong className="tabular">{count}</strong> <span className="subtle">× {d.unit}, {d.mg} mg each</span>
          </span>
          <input type="range" min={0} max={12} value={count} onChange={(e) => setCount(+e.target.value)} />
        </label>
        <label className="range-field">
          <span>
            Body weight <strong className="tabular">{kg} kg</strong> <span className="subtle">({Math.round(kg * 2.205)} lb)</span>
          </span>
          <input type="range" min={30} max={110} value={kg} onChange={(e) => setKg(+e.target.value)} />
        </label>
        <div className="dose-meter" data-zone={zone}>
          <div className="dose-track" aria-hidden="true">
            <span className="dose-fill" style={{ transform: `scaleX(${Math.min(total / max, 1)})` }} />
            <span className="dose-mark" style={{ left: `${(Math.min(teenLimit, max) / max) * 100}%` }} data-label="Teen limit" />
            <span className="dose-mark" style={{ left: `${(400 / max) * 100}%` }} data-label="Adult limit" />
          </div>
          <p className="dose-read" aria-live="polite">
            <strong className="tabular">{total} mg</strong> <span className="tabular">({perKg.toFixed(1)} mg/kg)</span>. {message}
          </p>
        </div>
        <p className="subtle small">
          Guidance: FDA and EFSA (400 mg/day for healthy adults), Health Canada (2.5 mg/kg/day for adolescents). Caffeine content varies by brand.
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

function SameMolecule() {
  const [src, setSrc] = useState<"bean" | "lab">("bean");
  return (
    <Lab title="Vanillin from two sources" hint="Switch the source">
      <div className="same">
        <Segmented
          label="Source"
          options={[
            { value: "bean", label: "Vanilla orchid" },
            { value: "lab", label: "Made from wood pulp" },
          ]}
          value={src}
          onChange={setSrc}
        />
        <div className="same-body">
          <div className="same-structure">
            <img src="/api/molecule/1183/structure.png" alt="Skeletal structure of vanillin: a benzene ring with an aldehyde, a hydroxyl and a methoxy group" />
          </div>
          <dl className="facts">
            <div>
              <dt>Formula</dt>
              <dd>
                <Formula value="C8H8O3" />
              </dd>
            </div>
            <div>
              <dt>Molar mass</dt>
              <dd className="tabular">152.15 g/mol</dd>
            </div>
            <div>
              <dt>How it's made</dt>
              <dd>
                {src === "bean"
                  ? "Cured vanilla pods break down glucovanillin with enzymes, releasing vanillin. Hand-pollinated orchids make it expensive."
                  : "Lignin from wood pulp (or guaiacol from petrochemicals) is oxidized to vanillin. It supplies most of the world's vanilla flavor."}
              </dd>
            </div>
            <div>
              <dt>What comes with it</dt>
              <dd>
                {src === "bean"
                  ? "Real vanilla extract carries hundreds of other aroma compounds, which is why it tastes rounder."
                  : "Purified vanillin, usually above 99%, with almost nothing else."}
              </dd>
            </div>
          </dl>
        </div>
        <p className="same-verdict">
          <Check aria-hidden="true" /> Same structure, same formula, same molecule. Your taste receptors can't tell which source it came from.
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const PH_ITEMS = [
  { ph: 0.8, label: "Battery acid" },
  { ph: 1.5, label: "Stomach acid" },
  { ph: 2.2, label: "Lemon juice", id: "citric-acid" },
  { ph: 2.5, label: "Cola", id: "phosphoric-acid" },
  { ph: 2.9, label: "Vinegar", id: "acetic-acid" },
  { ph: 3.7, label: "Orange juice" },
  { ph: 5, label: "Black coffee", id: "caffeine" },
  { ph: 5.5, label: "Healthy skin" },
  { ph: 6.7, label: "Milk" },
  { ph: 7, label: "Pure water", id: "water" },
  { ph: 7.4, label: "Blood" },
  { ph: 8.1, label: "Seawater" },
  { ph: 8.3, label: "Baking soda", id: "sodium-bicarbonate" },
  { ph: 10, label: "Bar soap" },
  { ph: 11.6, label: "Household ammonia", id: "ammonium-hydroxide" },
  { ph: 12.5, label: "Bleach", id: "sodium-hypochlorite" },
  { ph: 13.8, label: "Drain cleaner", id: "sodium-hydroxide" },
];

function PhScale() {
  const [i, setI] = useState(2);
  const item = PH_ITEMS[i];
  const ratio = Math.pow(10, 7 - item.ph);
  const fmt = (n: number) => (n >= 1 ? Math.round(n).toLocaleString() : n.toPrecision(2));
  return (
    <Lab title="The pH scale" hint="Pick a substance">
      <div className="phs">
        <div className="phs-bar" aria-hidden="true">
          <span className="phs-pin" style={{ left: `${(item.ph / 14) * 100}%` }} />
        </div>
        <div className="phs-ticks tabular" aria-hidden="true">
          {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((n) => (
            <span key={n} style={{ left: `${(n / 14) * 100}%` }}>
              {n}
            </span>
          ))}
        </div>
        <label className="range-field">
          <span className="sr-only">Substance</span>
          <input
            type="range"
            min={0}
            max={PH_ITEMS.length - 1}
            value={i}
            onChange={(e) => setI(+e.target.value)}
            aria-valuetext={`${item.label}, pH ${item.ph}`}
          />
        </label>
        <div className="phs-chips">
          {PH_ITEMS.map((x, n) => (
            <button key={x.label} type="button" className="chip chip-button" aria-pressed={n === i} onClick={() => setI(n)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="phs-read" aria-live="polite">
          <strong>{item.label}</strong>: pH <span className="tabular">{item.ph}</span>.{" "}
          {item.ph < 7
            ? `${fmt(ratio)} times more hydrogen ions than pure water.`
            : item.ph > 7
              ? `${fmt(1 / ratio)} times fewer hydrogen ions than pure water.`
              : "Neutral: hydrogen and hydroxide ions are balanced."}
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

/** Deterministic pseudo-random sequence for stable SVG layouts. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function Surfactant({ x, y, angle, scale = 1 }: { x: number; y: number; angle: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <path d="M0 0 q4 4 0 8 q-4 4 0 8 q4 4 0 8" className="mc-tail" />
      <circle cx="0" cy="-3" r="4" className="mc-head" />
    </g>
  );
}

function Micelles() {
  const [conc, setConc] = useState(30);
  const cmc = 50;
  const micelleCount = conc < cmc ? 0 : Math.min(3, 1 + Math.floor((conc - cmc) / 18));
  const free = conc < cmc ? Math.round(conc / 3.5) : 7;
  const layout = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 16 }, () => ({ x: 30 + r() * 420, y: 70 + r() * 150, a: r() * 360 }));
  }, []);
  const centers = [
    { x: 150, y: 150 },
    { x: 330, y: 120 },
    { x: 250, y: 205 },
  ];
  return (
    <Lab title="Soap meets oil" hint="Raise the surfactant concentration">
      <div className="mc">
        <svg viewBox="0 0 480 260" role="img" aria-label={micelleCount ? `${micelleCount} micelles trapping oil droplets` : "Surfactant molecules lining the surface; no micelles yet"}>
          <rect x="0" y="40" width="480" height="220" className="mc-water" />
          <line x1="0" y1="40" x2="480" y2="40" className="mc-surface" />
          {Array.from({ length: Math.min(free + 4, 14) }, (_, i) => (
            <Surfactant key={`s${i}`} x={18 + i * 33} y={36} angle={180} scale={0.9} />
          ))}
          {layout.slice(0, free).map((p, i) => (
            <Surfactant key={`f${i}`} x={p.x} y={p.y} angle={p.a} />
          ))}
          {conc < cmc && <ellipse cx="400" cy="200" rx="34" ry="22" className="mc-oil" />}
          {centers.slice(0, micelleCount).map((c, m) => (
            <g key={m} transform={`translate(${c.x} ${c.y})`} className="mc-micelle">
              <circle r="15" className="mc-oil" />
              {Array.from({ length: 14 }, (_, k) => {
                const a = (k / 14) * 360;
                const rad = (a * Math.PI) / 180;
                return <Surfactant key={k} x={Math.cos(rad) * 36} y={Math.sin(rad) * 36} angle={a + 90} scale={0.9} />;
              })}
            </g>
          ))}
        </svg>
        <label className="range-field">
          <span>
            Surfactant concentration <strong className="tabular">{conc}%</strong> <span className="subtle">of the way to a typical shampoo</span>
          </span>
          <input type="range" min={0} max={100} value={conc} onChange={(e) => setConc(+e.target.value)} />
        </label>
        <p aria-live="polite">
          {conc < cmc
            ? "Below the critical micelle concentration, surfactant molecules line up at the surface with their tails pointing out of the water. The oil droplet stays put."
            : "Past the critical micelle concentration, the molecules cluster into micelles: tails hide inside, heads face the water, and oil dissolves in the core so it rinses away."}
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const FOODS = [
  { ph: 2.5, label: "Cola" },
  { ph: 3.3, label: "Pickles" },
  { ph: 3.8, label: "Fruit juice" },
  { ph: 4.5, label: "Salad dressing" },
  { ph: 5.5, label: "Bread" },
  { ph: 6.7, label: "Milk" },
];

function PhTrap() {
  const pKa = 4.2;
  const [ph, setPh] = useState(3);
  const active = 1 / (1 + Math.pow(10, ph - pKa));
  const pct = active * 100;
  const near = FOODS.reduce((a, b) => (Math.abs(b.ph - ph) < Math.abs(a.ph - ph) ? b : a));
  return (
    <Lab title="Benzoic acid's pH trap" hint="Move the pH">
      <div className="pt">
        <div className="pt-eq">
          <Formula value="C6H5COOH ⇌ C6H5COO⁻ + H⁺" />
          <span className="subtle">pKa = 4.2</span>
        </div>
        <div className="pt-split" aria-hidden="true">
          <span className="pt-active" style={{ flexBasis: `${pct}%` }}>
            {pct > 18 && "Active acid"}
          </span>
          <span className="pt-ion" style={{ flexBasis: `${100 - pct}%` }}>
            {pct < 82 && "Benzoate ion"}
          </span>
        </div>
        <label className="range-field">
          <span>
            Product pH <strong className="tabular">{ph.toFixed(1)}</strong> <span className="subtle">≈ {near.label}</span>
          </span>
          <input type="range" min={2} max={8} step={0.1} value={ph} onChange={(e) => setPh(+e.target.value)} aria-valuetext={`pH ${ph.toFixed(1)}`} />
        </label>
        <p aria-live="polite">
          <strong className="tabular">{pct < 1 ? pct.toFixed(2) : pct.toFixed(0)}%</strong> is uncharged benzoic acid, the form that can cross a microbe's membrane.{" "}
          {pct >= 50
            ? "Plenty of it slips into microbial cells and acidifies them from inside: the preservative works."
            : pct >= 10
              ? "Some still gets in, but manufacturers would need more preservative for the same effect."
              : "Almost all of it is trapped outside as charged benzoate, so it barely works. That's why benzoate isn't used in neutral foods like milk."}
        </p>
        <p className="subtle small">
          Henderson–Hasselbalch: fraction active = 1 / (1 + 10<sup>pH − pKa</sup>)
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const CHAIN = [
  { stage: "Initiation", eq: "L–H + •OH → L• + H2O", text: "A hydroxyl radical (from UV light, heat or metal ions) pulls a hydrogen atom off a fat molecule (L–H), leaving a lipid radical, L•." },
  { stage: "Propagation", eq: "L• + O2 → LOO•", text: "The lipid radical grabs an oxygen molecule from the air, forming a peroxyl radical." },
  { stage: "Propagation", eq: "LOO• + L–H → LOOH + L•", text: "The peroxyl radical steals a hydrogen from the next fat molecule. One hydroperoxide forms, and a brand-new lipid radical keeps the chain going, again and again." },
  { stage: "Termination", eq: "LOO• + TOH → LOOH + TO•", text: "Vitamin E (TOH) donates its hydrogen. The tocopheroxyl radical (TO•) it becomes is stabilized by its aromatic ring, too calm to attack another fat. The chain stops." },
  { stage: "Recycling", eq: "TO• + Ascorbate → TOH + Ascorbyl•", text: "Vitamin C hands an electron back to vitamin E, regenerating it to stop another chain." },
];

function RadicalChain() {
  const [step, setStep] = useState(0);
  const s = CHAIN[step];
  return (
    <Lab title="Lipid peroxidation, one step at a time" hint={`Step ${step + 1} of ${CHAIN.length}`}>
      <div className="chain">
        <ol className="chain-track" aria-label="Stages">
          {CHAIN.map((c, i) => (
            <li key={i} data-state={i < step ? "done" : i === step ? "now" : "next"}>
              <button type="button" onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
                {c.stage}
              </button>
            </li>
          ))}
        </ol>
        <div className="chain-body" aria-live="polite">
          <code className="equation">{s.eq}</code>
          <p>{s.text}</p>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <button className="btn btn-sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Previous
          </button>
          {step < CHAIN.length - 1 ? (
            <button className="btn btn-sm btn-primary" onClick={() => setStep(step + 1)}>
              Next step
            </button>
          ) : (
            <button className="btn btn-sm" onClick={() => setStep(0)}>
              <RotateCcw aria-hidden="true" /> Start over
            </button>
          )}
        </div>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const SENS = [
  { title: "Penetration", text: "A small, reactive molecule (here, a limonene hydroperoxide from oxidized fragrance) passes the outer skin barrier." },
  { title: "Haptenation", text: "It bonds covalently to one of your own skin proteins. The altered protein now looks foreign to the immune system." },
  { title: "Transport", text: "Langerhans cells in the epidermis pick up the modified protein and migrate to the nearest lymph node." },
  { title: "Priming", text: "In the lymph node, they train T cells to recognize the hapten–protein pair. No symptoms yet: you're now sensitized." },
  { title: "Elicitation", text: "On a later exposure, memory T cells return to the skin and release cytokines. A red, itchy rash appears 24–72 hours later." },
];

function Sensitization() {
  const [step, setStep] = useState(0);
  return (
    <Lab title="How a skin allergy develops" hint={`Phase ${step < 4 ? "1: sensitization" : "2: elicitation"}`}>
      <div className="sens">
        <svg viewBox="0 0 480 220" role="img" aria-label={`${SENS[step].title}: ${SENS[step].text}`} data-step={step}>
          <rect x="0" y="30" width="480" height="24" className="sens-sc" />
          <rect x="0" y="54" width="480" height="70" className="sens-epi" />
          <rect x="0" y="124" width="480" height="96" className="sens-derm" />
          <text x="10" y="46" className="sens-lbl">Outer barrier</text>
          <text x="10" y="70" className="sens-lbl">Epidermis</text>
          <text x="10" y="140" className="sens-lbl">Dermis</text>
          <g className="sens-node" opacity={step >= 2 && step <= 3 ? 1 : 0.35}>
            <ellipse cx="410" cy="182" rx="50" ry="26" />
            <text x="410" y="186" textAnchor="middle" className="sens-lbl">Lymph node</text>
          </g>
          {/* hapten */}
          <circle cx={step === 0 ? 120 : 150} cy={step === 0 ? 20 : 88} r="7" className="sens-hapten" />
          {/* protein */}
          <rect x="150" y="80" width="40" height="16" rx="8" className="sens-protein" opacity={step >= 1 ? 1 : 0.5} />
          {/* Langerhans cell */}
          <g transform={`translate(${step >= 2 && step <= 3 ? 340 : 230} ${step >= 2 && step <= 3 ? 170 : 95})`} className="sens-cell">
            <path d="M0 -14 L6 -4 L18 -6 L8 4 L14 16 L0 8 L-14 16 L-8 4 L-18 -6 L-6 -4 Z" />
          </g>
          {/* T cells */}
          {step >= 3 &&
            [0, 1, 2].map((k) => (
              <circle key={k} cx={step === 4 ? 260 + k * 40 : 395 + k * 14} cy={step === 4 ? 100 : 178} r="8" className="sens-tcell" />
            ))}
          {step === 4 && <rect x="230" y="30" width="140" height="24" className="sens-rash" />}
        </svg>
        <div className="chain-track sens-track">
          {SENS.map((s, i) => (
            <button key={s.title} type="button" aria-pressed={i === step} onClick={() => setStep(i)}>
              {s.title}
            </button>
          ))}
        </div>
        <p aria-live="polite">
          <strong>{SENS[step].title}.</strong> {SENS[step].text}
        </p>
      </div>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

function Chirality() {
  return (
    <Lab title="(R)- and (S)-limonene" hint="Drag to rotate, then compare">
      <div className="chiral">
        <div>
          <MoleculeViewer src="/api/molecule/440917/sdf" label="(R)-limonene" />
          <p>
            <strong>(R)-limonene</strong> smells of sweet oranges. Citrus peels make it almost exclusively.
          </p>
        </div>
        <div>
          <MoleculeViewer src="/api/molecule/439250/sdf" label="(S)-limonene" />
          <p>
            <strong>(S)-limonene</strong> smells harsher, like pine and turpentine. It's found in some mints and conifers.
          </p>
        </div>
      </div>
      <p className="chiral-note">
        Look at the carbon where the isopropenyl group (C=CH₂) attaches to the ring. It carries four different groups, so it's a stereocenter: the two molecules are mirror images that no rotation can line up.
      </p>
    </Lab>
  );
}

// ---------------------------------------------------------------------------

const STUDIES = [
  { id: "cell", text: "Human cells in a dish are exposed to a high dose and show damage." },
  { id: "animal", text: "Rats are fed the ingredient for two years and compared with unfed rats." },
  { id: "observe", text: "A survey tracks the diets and health of 50,000 people for ten years." },
  { id: "rct", text: "400 volunteers are randomly assigned to the ingredient or a placebo." },
  { id: "review", text: "Scientists combine the results of 30 randomized trials." },
];
const STUDY_NOTES: Record<string, string> = {
  cell: "Cell studies show what's possible in a dish, often at doses far above real exposure.",
  animal: "Animal studies show effects in a whole body, but rats aren't people and doses are often high.",
  observe: "Observational studies find associations in real people, but can't rule out other explanations.",
  rct: "Randomization balances everything except the ingredient, so it can show cause and effect.",
  review: "Systematic reviews weigh many trials together and are the strongest single source.",
};

function EvidenceSort() {
  const start = useMemo(() => seededShuffle(STUDIES, "studies-v2"), []);
  const [order, setOrder] = useState(start);
  const [checked, setChecked] = useState(false);
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const next = order.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
    setChecked(false);
  };
  const correct = order.every((s, i) => s.id === STUDIES[i].id);
  return (
    <Lab title="Rank the evidence" hint="Weakest at the top, strongest at the bottom">
      <ol className="sorter">
        {order.map((s, i) => {
          const ok = checked && s.id === STUDIES[i].id;
          return (
            <li key={s.id} data-result={checked ? (ok ? "right" : "wrong") : undefined}>
              <span className="sorter-n tabular">{i + 1}</span>
              <div className="grow">
                <p>{s.text}</p>
                {checked && <p className="sorter-note">{STUDY_NOTES[s.id]}</p>}
              </div>
              <div className="sorter-btns">
                <button type="button" className="icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move “${s.text}” up`}>
                  <ArrowUp aria-hidden="true" />
                </button>
                <button type="button" className="icon-btn" onClick={() => move(i, 1)} disabled={i === order.length - 1} aria-label={`Move “${s.text}” down`}>
                  <ArrowDown aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <p aria-live="polite" className={checked ? (correct ? "ok-text" : "error-text") : "subtle"}>
          {!checked ? "Use the arrows to reorder, then check." : correct ? "Exactly right: each design rules out more alternative explanations than the one before." : "Not yet. Green rows are in the right place."}
        </p>
        <button className="btn btn-sm btn-primary" onClick={() => setChecked(true)}>
          Check order
        </button>
      </div>
    </Lab>
  );
}
