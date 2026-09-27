import type { Identity, Kind, Origin, Profile, Sector } from "../../shared/types";

/**
 * A curated, human-reviewed ingredient profile. Molecular identity (formula, weight, IUPAC, CAS, SMILES),
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
  profile: Profile;
}

export const item = (title: string, description: string, equation?: string) => ({ title, description, ...(equation ? { equation } : {}) });
export const reg = (body: string, status: string, limit?: string) => ({ body, status, ...(limit ? { limit } : {}) });
export const myth = (claim: string, consensus: string) => ({ claim, consensus });
