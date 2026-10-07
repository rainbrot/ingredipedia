// Shared domain types for the Assay client and server.

export type Sector = "food" | "beauty" | "cleaning";

export const SECTORS: { id: Sector; label: string; short: string }[] = [
  { id: "food", label: "Food & Drink", short: "Food" },
  { id: "beauty", label: "Beauty & Care", short: "Beauty" },
  { id: "cleaning", label: "Cleaning", short: "Cleaning" },
];

/** Where an ingredient comes from, used to isolate organic/natural ingredients. */
export type Origin = "natural" | "mineral" | "fermented" | "semi_synthetic" | "synthetic";

export const ORIGIN_LABEL: Record<Origin, string> = {
  natural: "Natural origin",
  mineral: "Mineral",
  fermented: "Fermentation-derived",
  semi_synthetic: "Chemically modified",
  synthetic: "Synthetic",
};

/** Natural and mineral ingredients sit with certified-organic ones; everything else is sorted as artificial/processed. */
export const NATURAL_ORIGINS: Origin[] = ["natural", "mineral"];

export type Kind = "compound" | "mixture" | "polymer";

/**
 * How a profile was produced. No human sign-off is required anywhere in the pipeline:
 * - curated: written by the Assay content team and shipped with the app;
 * - researched: built automatically from PubChem + PubMed (and AI when configured);
 * - preliminary: an instant first draft while (or if) automatic research can't complete.
 */
export type Status = "curated" | "researched" | "preliminary";

export const STATUS_LABEL: Record<Status, string> = {
  curated: "Curated profile",
  researched: "Auto-researched",
  preliminary: "Preliminary",
};
export type ResearchState = "queued" | "running" | "complete" | "failed";

export type ArtificialSort = "label" | "unhealthy" | "healthy" | "most_researched" | "least_researched";

export interface Citation {
  pmid?: string;
  doi?: string;
  title: string;
  journal?: string;
  year?: number;
  authors?: string;
  abstract?: string;
  url: string;
}

/** A retrieved source document the AI extraction is grounded in (PubMed abstract or PubChem section). */
export interface SourceDoc {
  id: string; // e.g. "PMID:12345" or "PubChem:Methods of Manufacturing"
  source: "pubmed" | "pubchem";
  title: string;
  url: string;
  text: string;
}

export interface Identity {
  iupac?: string;
  inci?: string;
  cas?: string;
  eNumber?: string;
  formula?: string;
  weight?: number;
  smiles?: string;
  functionalGroups?: string[];
  physical?: {
    state?: string;
    solubility?: string;
    phStability?: string;
    meltingPoint?: string;
  };
  /** For mixtures and polymers: what the ingredient is made of. */
  composition?: string;
}

/** How strong the evidence behind a claim is. Teaching evidence quality is part of the product. */
export type EvidenceLevel = "established" | "human" | "lab" | "emerging";

export const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  established: "Well established",
  human: "Human studies",
  lab: "Lab & animal studies",
  emerging: "Emerging or debated",
};

/** A biological function explained at two scales: what the molecule does, and what the body experiences. */
export interface Mechanism {
  title: string;
  chemical: string;
  biological: string;
  evidence: EvidenceLevel;
  /** SourceDoc ids / PMIDs backing the item. */
  sources?: string[];
}

export interface Reaction {
  title: string;
  summary: string;
  steps: { name: string; text: string }[];
  equation?: string;
  result: string;
  sources?: string[];
}

/** A safety concern explained by its chemical cause and biological effect. */
export interface Hazard {
  title: string;
  summary: string;
  chemical: string;
  biological: string;
}

export interface SynthesisRoute {
  title: string;
  summary: string;
  mechanism: string;
  steps?: string[];
  equation?: string;
  significance?: string;
}

export interface Profile {
  /** Educational introduction: what the molecule is and why it behaves the way it does. */
  overview: string[];
  /** Why formulators include it. */
  function: string;
  mechanisms: Mechanism[];
  reactions: Reaction[];
  regulatory: { body: string; status: string; limit?: string }[];
  hazards: Hazard[];
  /** Safe consumer-use amounts versus high-dose or occupational exposure. */
  dosage: string;
  myths: { claim: string; consensus: string }[];
  environment: { persistence: string; biodegradability: string; aquaticToxicity: string; notes?: string };
  synthesis: SynthesisRoute[];
}

export interface DraftMeta {
  stage: "basic" | "research";
  model: string; // "claude-haiku-4-5" or "automatic"
  generatedAt: string;
  /** Profile fields the model filled from general knowledge rather than retrieved text. */
  unsupportedFields?: string[];
}

export interface IngredientSummary {
  id: string;
  name: string;
  kind: Kind;
  primaryRole: string;
  primaryCategory: string;
  origin: Origin;
  healthScore: number;
  concerns: string[];
  researchCount: number | null;
  status: Status;
  researchState: ResearchState | null;
  sectors: Sector[];
  pubchemCid: number | null;
}

export interface Ingredient extends IngredientSummary {
  aliases: string[];
  summary: string;
  scoreRationale: string;
  /** Number of branded US foods listing this ingredient (USDA FoodData Central). */
  usdaCount: number | null;
  /** PubMed phrase used for the publication count and citations. */
  researchTerm: string | null;
  identity: Identity;
  profile: Profile | null;
  citations: Citation[];
  /** The PubChem sections and abstracts the profile was built from (shown for transparency). */
  sources: SourceDoc[];
  draft: DraftMeta | null;
  createdAt: string;
  updatedAt: string;
}

export type MatchKind = "exact" | "alias" | "fuzzy" | "new" | "unrecognized";

export interface ScanItem {
  position: number;
  raw: string;
  name: string;
  labeledOrganic: boolean;
  /** "organic" = certified organic or natural origin (isolated), "artificial" = synthetic/processed (sortable). */
  group: "organic" | "artificial" | "unknown";
  match: MatchKind;
  ingredient: IngredientSummary | null;
}

export type Grade = "Excellent" | "Good" | "Fair" | "Poor" | "Bad";

export interface Highlight {
  tone: "good" | "warn" | "bad" | "info";
  text: string;
  ingredientId?: string;
}

export interface ScanResult {
  id: string;
  name: string;
  sector: Sector;
  createdAt: string;
  score: number;
  grade: Grade;
  confidence: "high" | "medium" | "low";
  summary: string;
  highlights: Highlight[];
  items: ScanItem[];
  stats: { total: number; organic: number; artificial: number; unknown: number; curated: number; researched: number; preliminary: number };
  rawText: string;
  barcode: string | null;
  imageUrl: string | null;
}

export interface ScanListItem {
  id: string;
  name: string;
  sector: Sector;
  createdAt: string;
  score: number;
  itemCount: number;
  imageUrl: string | null;
}

/** Product found by barcode in Open Food / Beauty / Products Facts. */
export interface BarcodeProduct {
  barcode: string;
  name: string;
  brand: string | null;
  ingredientsText: string;
  imageUrl: string | null;
  sector: Sector;
  source: string;
  sourceUrl: string;
}

export type ScanProgress =
  | { type: "progress"; stage: "parse" | "match" | "draft" | "score"; done: number; total: number; message: string }
  | { type: "result"; scan: ScanResult }
  | { type: "error"; message: string };

export interface AppConfig {
  ai: boolean;
  model: string | null;
  aiOcr: boolean;
}

export type ServerEvent =
  | { type: "ingredient.researched"; id: string; name: string }
  | { type: "ingredient.updated"; id: string; name: string };

export const CONCERN_LABEL: Record<string, string> = {
  allergen: "Allergen",
  sensitizer: "Skin sensitizer",
  irritant: "Irritant",
  corrosive: "Corrosive",
  endocrine: "Endocrine questions",
  carcinogen_flag: "Carcinogenicity flag",
  added_sugar: "Added sugar",
  sodium: "High sodium",
  artificial_color: "Synthetic dye",
  artificial_sweetener: "Artificial sweetener",
  preservative: "Preservative",
  environmental: "Environmental concern",
  respiratory: "Respiratory irritant",
  ultra_processed: "Ultra-processed marker",
  undisclosed: "Undisclosed mixture",
  hyperactivity: "Hyperactivity labeling (EU)",
  banned_eu: "Restricted in EU",
  toxic_gas: "Toxic gas if mixed",
  stimulant: "Stimulant",
  gut: "Gut tolerance",
  flammable: "Flammable",
};

export function gradeFor(score: number): Grade {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 30) return "Poor";
  return "Bad";
}
