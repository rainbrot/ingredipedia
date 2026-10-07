import type { EvidenceLevel, Hazard, Identity, Kind, Mechanism, Origin, Profile, Reaction, Sector, SynthesisRoute } from "../../shared/types";

/** The original curated record: identity, classification, regulatory status and myths. */
export interface BaseProfile {
  function: string;
  regulatory: Profile["regulatory"];
  toxicology: { mechanism: string; dosage: string };
  myths: Profile["myths"];
  environment: Profile["environment"];
}

/**
 * A curated, human-written ingredient record. Molecular identity (formula, weight, IUPAC, CAS, SMILES),
 * publication counts and peer-reviewed citations are NOT typed by hand: `npm run seed` resolves them live
 * from PubChem and PubMed so every number and PMID comes from the source database.
 */
export interface SeedIngredient {
  id: string;
  name: string;
  aliases: string[];
  kind: Kind;
  sectors: Sector[];
  primaryCategory: string;
  primaryRole: string;
  origin: Origin;
  healthScore: number;
  scoreRationale: string;
  concerns: string[];
  summary: string;
  /** Name used to resolve the PubChem record; null for mixtures without a single structure. */
  pubchem: string | null;
  /** PubMed phrase for publication counts and citations (defaults to `name`). */
  pubmed?: string;
  /** A `formula` here overrides PubChem's Hill-notation formula for readability (e.g. NaCl instead of ClNa). */
  identity: Omit<Identity, "iupac" | "weight" | "smiles" | "cas">;
  profile: BaseProfile;
}

/** The long-form teaching content for a curated ingredient. */
export interface DeepProfile {
  overview: string[];
  mechanisms: Mechanism[];
  reactions: Reaction[];
  hazards: Hazard[];
  synthesis: SynthesisRoute[];
  /** Overrides the base dosage context when present. */
  dosage?: string;
}

export function buildProfile(base: BaseProfile, deep: DeepProfile): Profile {
  return {
    overview: deep.overview,
    function: base.function,
    mechanisms: deep.mechanisms,
    reactions: deep.reactions,
    regulatory: base.regulatory,
    hazards: deep.hazards,
    dosage: deep.dosage ?? base.toxicology.dosage,
    myths: base.myths,
    environment: base.environment,
    synthesis: deep.synthesis,
  };
}

export const reg = (body: string, status: string, limit?: string) => ({ body, status, ...(limit ? { limit } : {}) });
export const myth = (claim: string, consensus: string) => ({ claim, consensus });

export const mech = (title: string, chemical: string, biological: string, evidence: EvidenceLevel): Mechanism => ({ title, chemical, biological, evidence });
export const rxn = (title: string, summary: string, steps: [string, string][], result: string, equation?: string): Reaction => ({
  title,
  summary,
  steps: steps.map(([name, text]) => ({ name, text })),
  result,
  ...(equation ? { equation } : {}),
});
export const hz = (title: string, summary: string, chemical: string, biological: string): Hazard => ({ title, summary, chemical, biological });
export const route = (title: string, summary: string, mechanism: string, opts: { steps?: string[]; equation?: string; significance?: string } = {}): SynthesisRoute => ({
  title,
  summary,
  mechanism,
  ...opts,
});
