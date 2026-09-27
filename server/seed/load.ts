// Loads the curated, verified ingredient database (data/seed.json, built by `npm run seed`)
// into SQLite on first boot, so the app works immediately and offline for these profiles.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import * as repo from "../repo";
import type { Citation, Identity, SourceDoc } from "../../shared/types";
import type { SeedIngredient } from "./types";

export interface SeedRecord extends Omit<SeedIngredient, "identity"> {
  identity: Identity;
  pubchemCid: number | null;
  researchCount: number | null;
  usdaCount: number | null;
  citations: Citation[];
  sdf: { sdf: string; source: "pubchem-3d" | "pubchem-2d" } | null;
}

export const SEED_PATH = path.resolve("data", "seed.json");

export function loadSeed(records: SeedRecord[]): number {
  const verifiedAt = new Date().toISOString();
  for (const r of records) {
    const sources: SourceDoc[] = r.citations.map((c) => ({
      id: `PMID:${c.pmid}`,
      source: "pubmed",
      title: c.title,
      url: c.url,
      text: c.abstract ?? "",
    }));
    repo.upsertIngredient({
      id: r.id,
      name: r.name,
      aliases: r.aliases,
      kind: r.kind,
      sectors: r.sectors,
      primaryCategory: r.primaryCategory,
      primaryRole: r.primaryRole,
      origin: r.origin,
      healthScore: r.healthScore,
      scoreRationale: r.scoreRationale,
      concerns: r.concerns,
      summary: r.summary,
      researchCount: r.researchCount,
      researchTerm: r.pubmed ?? r.name,
      usdaCount: r.usdaCount,
      pubchemCid: r.pubchemCid,
      identity: r.identity,
      profile: r.profile,
      citations: r.citations,
      sources,
      status: "verified",
      researchState: "complete",
      draft: null,
      verifiedAt,
    });
    if (r.sdf) repo.setSdf(r.id, r.sdf.sdf, r.sdf.source);
  }
  return records.length;
}

export function loadSeedIfEmpty(): number {
  if (repo.countByStatus().verified + repo.countByStatus().needs_verification > 0) return 0;
  if (!existsSync(SEED_PATH)) {
    console.warn("No data/seed.json found. Run `npm run seed` to build the verified ingredient database.");
    return 0;
  }
  const records = JSON.parse(readFileSync(SEED_PATH, "utf8")) as SeedRecord[];
  const n = loadSeed(records);
  repo.logAudit(null, "seed_loaded", `${n} verified profiles`);
  return n;
}
