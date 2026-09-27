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

export type Status = "verified" | "needs_verification";
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

export interface SourcedItem {
  title: string;
  description: string;
  equation?: string;
  /** Source ids from SourceDoc.id / PMIDs backing the item. */
  sources?: string[];
}

export interface Profile {
  function: string;
  reactions: SourcedItem[];
  mechanisms: SourcedItem[];
  regulatory: { body: string; status: string; limit?: string }[];
  toxicology: { mechanism: string; dosage: string };
  sensitization: string;
  myths: { claim: string; consensus: string }[];
  synthesis: { method: string; steps: string[]; equations?: string[] };
  environment: { persistence: string; biodegradability: string; aquaticToxicity: string; notes?: string };
  fun: { history: string; uses: string[]; occurrence: string };
}

export interface DraftMeta {
  stage: "basic" | "research";
  model: string; // "claude-haiku-4-5" or "extractive"
  generatedAt: string;
  /** Profile fields the model filled from general knowledge rather than retrieved text. */
  unsupportedFields?: string[];
}

export interface AiUsage {
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  calls: number;
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
  hasCustomSdf: boolean;
  draft: DraftMeta | null;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string | null;
}

/** Admin-only view: includes retrieved sources and AI accounting. */
export interface AdminIngredient extends Ingredient {
  sources: SourceDoc[];
  aiUsage: AiUsage | null;
  researchError: string | null;
  scanCount: number;
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
  stats: { total: number; organic: number; artificial: number; unknown: number; verified: number; drafts: number };
  rawText: string;
}

export interface ScanListItem {
  id: string;
  name: string;
  sector: Sector;
  createdAt: string;
  score: number;
  grade: Grade;
  itemCount: number;
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
  | { type: "ingredient.verified"; id: string; name: string }
  | { type: "ingredient.updated"; id: string; name: string }
  | { type: "queue.updated"; pending: number };

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
