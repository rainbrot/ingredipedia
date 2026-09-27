// Builds data/seed.json from the curated profiles, resolving molecular identity from PubChem and
// publication counts + peer-reviewed citations from PubMed, then (re)loads the database.
//   npm run seed            build seed.json and load it
//   npm run seed -- --load  only load the existing seed.json

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { db } from "../db";
import * as pubchem from "../services/pubchem";
import * as pubmed from "../services/pubmed";
import { brandedFoodCount } from "../services/usda";
import { BEAUTY } from "./content/beauty";
import { CLEANING } from "./content/cleaning";
import { FOOD } from "./content/food";
import { SEED_PATH, loadSeed, type SeedRecord } from "./load";
import type { SeedIngredient } from "./types";

const ALL: SeedIngredient[] = [...FOOD, ...BEAUTY, ...CLEANING];

function checkUnique() {
  const ids = new Set<string>();
  const aliases = new Map<string, string>();
  for (const s of ALL) {
    if (ids.has(s.id)) throw new Error(`Duplicate id ${s.id}`);
    ids.add(s.id);
    for (const a of [s.name, ...s.aliases]) {
      const k = a.toLowerCase();
      if (aliases.has(k) && aliases.get(k) !== s.id) console.warn(`  ! alias "${a}" used by ${aliases.get(k)} and ${s.id}`);
      aliases.set(k, s.id);
    }
  }
}

async function enrich(s: SeedIngredient, previous?: SeedRecord): Promise<SeedRecord> {
  const compound = s.pubchem ? await pubchem.findByName(s.pubchem) : null;
  const syn = compound ? await pubchem.synonyms(compound.cid).catch(() => []) : [];
  const term = s.pubmed ?? s.name;
  // If PubMed is down, keep whatever a previous run fetched; the server backfills the rest later.
  const researchCount = await pubmed.publicationCount(term).catch(() => previous?.researchCount ?? null);
  let citations = await pubmed.researchPapers(term, 2).catch(() => [] as SeedRecord["citations"]);
  citations = citations.slice(0, 5);
  if (citations.length === 0 && previous) citations = previous.citations;
  const usdaCount = s.sectors.includes("food") ? (previous?.usdaCount ?? (await brandedFoodCount(s.name))) : null;
  const sdf = previous?.sdf ?? (compound ? await pubchem.fetchSdf(compound.cid).catch(() => null) : null);

  return {
    ...s,
    identity: {
      ...s.identity,
      ...(compound
        ? {
            iupac: compound.iupac,
            formula: s.identity.formula ?? compound.formula,
            weight: compound.weight,
            smiles: compound.smiles,
            cas: pubchem.casFromSynonyms(syn),
          }
        : {}),
    },
    pubchemCid: compound?.cid ?? null,
    researchCount,
    usdaCount,
    citations,
    sdf,
  };
}

async function main() {
  const loadOnly = process.argv.includes("--load");
  let records: SeedRecord[];

  if (loadOnly && existsSync(SEED_PATH)) {
    records = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  } else {
    checkUnique();
    const previous = existsSync(SEED_PATH) ? new Map((JSON.parse(readFileSync(SEED_PATH, "utf8")) as SeedRecord[]).map((r) => [r.id, r])) : new Map();
    records = [];
    for (const [i, s] of ALL.entries()) {
      const r = await enrich(s, previous.get(s.id));
      records.push(r);
      console.log(
        `${String(i + 1).padStart(2)}/${ALL.length} ${s.name.padEnd(32)} CID ${String(r.pubchemCid ?? "—").padEnd(9)} ${String(r.identity.formula ?? "").padEnd(18)} papers ${String(r.researchCount ?? "?").padEnd(8)} cites ${r.citations.length} ${r.sdf?.source ?? ""}`,
      );
    }
    writeFileSync(SEED_PATH, JSON.stringify(records, null, 1));
    console.log(`Wrote ${records.length} profiles to ${SEED_PATH}`);
  }

  // Replace verified seed rows (drafts and scans are left intact).
  const ids = records.map((r) => r.id);
  db.prepare(`DELETE FROM ingredients WHERE status = 'verified' AND id NOT IN (${ids.map(() => "?").join(",")}) AND created_by IS NULL`).run(...ids);
  const n = loadSeed(records);
  console.log(`Loaded ${n} verified profiles into the database.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
