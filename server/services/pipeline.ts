// The generation pipeline from the plan:
//   1. Initial scan & instant draft: parse OCR text, check the central database, create a
//      "Basic AI Draft" (PubChem + AI) for unknown ingredients, flag status: needs_verification.
//   2. Automated scientific retrieval: a background worker pulls PubMed abstracts and PubChem
//      sections and runs context-grounded extraction.
//   3. Admin review happens in the dashboard (routes/admin.ts).
//   4. Approval flips status to verified and broadcasts it to every client.

import { randomBytes } from "node:crypto";
import { parseIngredients, type ParsedIngredient } from "../../shared/parse";
import { scoreProduct } from "../../shared/scoring";
import { NATURAL_ORIGINS, SECTORS, type Ingredient, type IngredientSummary, type Profile, type ScanItem, type ScanProgress, type ScanResult, type Sector, type SourceDoc } from "../../shared/types";
import * as repo from "../repo";
import { AI_MODEL, aiEnabled, basicDraft, groundedExtraction, type BasicDraft, type Extraction } from "./ai";
import { broadcast } from "./events";
import { extractiveBasicDraft, extractiveProfile, type Facts } from "./extractive";
import { isPlausibleIngredient, matchIngredient } from "./matcher";
import * as pubchem from "./pubchem";
import * as pubmed from "./pubmed";
import { brandedFoodCount } from "./usda";

export class UserError extends Error {}

const BASIC_HEADINGS = [
  "GHS Classification",
  "Record Description",
  "Cosmetics",
  "Food Additive Classes",
  "FDA Substances Added to Food",
  "Use Classification",
  "Toxicity Summary",
];

const RESEARCH_HEADINGS = [
  ...BASIC_HEADINGS,
  "Physical Description",
  "Melting Point",
  "Solubility",
  "pH",
  "Methods of Manufacturing",
  "Mechanism of Action",
  "Human Toxicity Excerpts",
  "Environmental Fate",
  "Environmental Biodegradation",
  "Ecotoxicity Values",
  "Natural Pollution Sources",
  "Consumer Uses",
  "Industry Uses",
];

const emptyFacts = (): Facts => ({ compound: null, synonyms: [], ghs: { hCodes: [], statements: [] }, sections: {} });

/** Label spellings PubChem may know under another name ("Blue 1" → "FD&C Blue No. 1"). */
export function nameVariants(name: string): string[] {
  const out = [name];
  const dye = name.match(/^(?:fd&?c\s+)?(red|yellow|blue|green|orange)\s*(?:no\.?\s*|#)?(\d{1,2})(?:\s+(?:aluminum\s+)?lake)?$/i);
  if (dye) out.push(`FD&C ${dye[1][0].toUpperCase()}${dye[1].slice(1).toLowerCase()} No. ${dye[2]}`);
  // Labels add qualifiers PubChem doesn't know ("Purified Water", "Sodium Benzoate As Preservative").
  const simpler = name.replace(/\b(purified|deionized|natural|as a preservative|preservative|food grade|usp|fcc)\b/gi, "").replace(/\s+/g, " ").trim();
  if (simpler) out.push(simpler);
  if (name.includes("/")) out.push(name.split("/").pop()!.trim());
  return [...new Set(out)].filter(Boolean);
}

async function gatherFacts(name: string, headings: string[], cid?: number | null): Promise<Facts> {
  const facts = emptyFacts();
  if (cid) facts.compound = await pubchem.getByCid(cid);
  else {
    for (const variant of nameVariants(name)) {
      facts.compound = await pubchem.findByName(variant);
      if (facts.compound) break;
    }
  }
  if (!facts.compound) return facts;
  const cidNum = facts.compound.cid;
  const [syn, ...sections] = await Promise.all([
    pubchem.synonyms(cidNum).catch(() => []),
    ...headings.map((h) => pubchem.viewHeading(cidNum, h).catch(() => [] as pubchem.ViewEntry[])),
  ]);
  facts.synonyms = syn as string[];
  headings.forEach((h, i) => {
    const entries = sections[i] as pubchem.ViewEntry[];
    if (entries.length) facts.sections[h] = entries;
  });
  facts.ghs = pubchem.parseGhs(facts.sections["GHS Classification"] ?? []);
  return facts;
}

function factsToDocs(facts: Facts): SourceDoc[] {
  if (!facts.compound) return [];
  const cid = facts.compound.cid;
  return Object.entries(facts.sections)
    .filter(([heading]) => heading !== "GHS Classification" || facts.ghs.statements.length > 0)
    .map(([heading, entries]) => {
      const text =
        heading === "GHS Classification"
          ? `Signal word: ${facts.ghs.signal ?? "none"}. Hazard statements: ${facts.ghs.statements.join("; ")}.`
          : entries
              .slice(0, 6)
              .map((e) => (e.name && !/^\s*$/.test(e.name) ? `${e.name}: ${e.text}` : e.text))
              .join("\n")
              .slice(0, 1800);
      return { id: `PubChem:${heading}`, source: "pubchem" as const, title: `PubChem · ${heading}`, url: pubchem.pubchemUrl(cid, heading), text };
    });
}

function factsToPrompt(facts: Facts): string {
  if (!facts.compound) return "";
  const c = facts.compound;
  return [
    `PubChem CID ${c.cid}: ${c.title}; formula ${c.formula ?? "?"}; IUPAC ${c.iupac ?? "?"}`,
    ...factsToDocs(facts).map((d) => `${d.title}: ${d.text.slice(0, 700)}`),
  ].join("\n");
}

function identityFromFacts(facts: Facts, existing: Ingredient["identity"] = {}): Ingredient["identity"] {
  const c = facts.compound;
  if (!c) return existing;
  return {
    ...existing,
    iupac: existing.iupac ?? c.iupac,
    formula: existing.formula ?? c.formula,
    weight: existing.weight ?? c.weight,
    smiles: existing.smiles ?? c.smiles,
    cas: existing.cas ?? pubchem.casFromSynonyms(facts.synonyms),
    eNumber: existing.eNumber ?? pubchem.eNumberFromSynonyms(facts.synonyms),
  };
}

function extractionToProfile(x: Extraction): Profile {
  const clean = <T extends { equation?: string | null }>(items: T[]) =>
    items.map((i) => ({ ...i, equation: i.equation ?? undefined }));
  return {
    function: x.function,
    reactions: clean(x.reactions),
    mechanisms: clean(x.mechanisms),
    regulatory: x.regulatory.map((r) => ({ body: r.body, status: r.status, limit: r.limit ?? undefined })),
    toxicology: x.toxicology,
    sensitization: x.sensitization,
    myths: x.myths,
    synthesis: x.synthesis,
    environment: x.environment,
    fun: x.fun,
  };
}

// ---------------------------------------------------------------------------
// Step 1: instant draft for a brand-new ingredient

const inflight = new Map<string, Promise<IngredientSummary | null>>();

export function draftNewIngredient(parsed: ParsedIngredient, sector: Sector, deviceId: string): Promise<IngredientSummary | null> {
  const id = repo.slugify(parsed.name);
  // Two users scanning the same new ingredient at once share one draft.
  const pending = inflight.get(id);
  if (pending) return pending;
  const job = createDraft(id, parsed, sector, deviceId).finally(() => inflight.delete(id));
  inflight.set(id, job);
  return job;
}

async function createDraft(id: string, parsed: ParsedIngredient, sector: Sector, deviceId: string): Promise<IngredientSummary | null> {
  const existing = repo.getIngredient(id);
  if (existing) return existing;

  let facts = emptyFacts();
  try {
    facts = await gatherFacts(parsed.name, BASIC_HEADINGS);
  } catch (err) {
    console.warn(`[draft] PubChem lookup failed for ${parsed.name}:`, (err as Error).message);
  }

  // Same molecule already in the database under another name (e.g. "Vitamin B3" → Niacinamide)?
  if (facts.compound) {
    const twin = repo.findByCid(facts.compound.cid);
    if (twin) {
      const full = repo.getIngredient(twin.id)!;
      repo.patchIngredient(twin.id, { aliases: [...new Set([...full.aliases, parsed.name])] });
      repo.logAudit(twin.id, "alias_added", `"${parsed.name}" resolved by PubChem CID ${facts.compound.cid}`);
      return repo.getSummaries([twin.id]).get(twin.id) ?? null;
    }
  }

  let draft: BasicDraft;
  let model = "extractive";
  if (aiEnabled()) {
    try {
      draft = await basicDraft({ name: parsed.name, sector, facts: factsToPrompt(facts), ingredientId: null });
      model = AI_MODEL;
    } catch (err) {
      console.warn(`[draft] AI draft failed for ${parsed.name}, using extractive draft:`, (err as Error).message);
      draft = extractiveBasicDraft(parsed.name, sector, facts);
    }
  } else {
    draft = extractiveBasicDraft(parsed.name, sector, facts);
  }
  if (!draft.isIngredient) return null;

  const researchCount = await pubmed.publicationCount(draft.commonName || parsed.name).catch(() => null);

  const docs = factsToDocs(facts);
  const profile = extractionToProfile(extractiveProfile(parsed.name, docs, facts));
  profile.function = draft.productFunction;
  profile.sensitization = draft.sensitization;

  const name = draft.commonName?.trim() || parsed.name;
  const created = repo.upsertIngredient({
    id,
    name,
    aliases: [...new Set([parsed.name, name, facts.compound?.title].filter((x): x is string => !!x && x !== name))],
    kind: draft.kind,
    sectors: [...new Set<Sector>([sector, ...draft.sectors])],
    primaryCategory: draft.primaryCategory,
    primaryRole: draft.primaryRole,
    origin: draft.origin,
    healthScore: Math.max(0, Math.min(100, Math.round(draft.healthScore))),
    scoreRationale: draft.scoreRationale,
    concerns: draft.concerns,
    summary: draft.summary,
    researchCount,
    pubchemCid: facts.compound?.cid ?? null,
    identity: identityFromFacts(facts),
    profile,
    citations: [],
    sources: docs,
    status: "needs_verification",
    draft: { stage: "basic", model, generatedAt: new Date().toISOString() },
    createdBy: deviceId,
  });
  repo.enqueueJob(created.id);
  repo.logAudit(created.id, "draft_created", `Basic draft (${model}) from a ${sector} scan`);
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
  return created;
}

// ---------------------------------------------------------------------------
// Step 2: background scientific retrieval + grounded extraction

export async function runResearch(ingredientId: string): Promise<void> {
  const ing = repo.getIngredient(ingredientId);
  if (!ing) return;

  const facts = await gatherFacts(ing.name, RESEARCH_HEADINGS, ing.pubchemCid);
  const term = ing.researchTerm ?? ing.name;
  const papers = await pubmed.researchPapers(term).catch((err) => {
    console.warn(`[research] PubMed failed for ${ing.name}:`, (err as Error).message);
    return [];
  });
  const researchCount = await pubmed.publicationCount(term).catch(() => ing.researchCount);
  const usdaCount = ing.sectors.includes("food") ? ((await brandedFoodCount(ing.name)) ?? ing.usdaCount) : null;

  const docs: SourceDoc[] = [
    ...factsToDocs(facts),
    ...papers.map((p) => ({
      id: `PMID:${p.pmid}`,
      source: "pubmed" as const,
      title: `${p.title}${p.journal ? ` (${p.journal}${p.year ? `, ${p.year}` : ""})` : ""}`,
      url: p.url,
      text: (p.abstract ?? "").slice(0, 2600),
    })),
  ];

  // Cache the 3D structure now so the reviewer sees it and users never re-fetch it.
  const cid = facts.compound?.cid ?? ing.pubchemCid;
  if (cid && !repo.getSdf(ing.id)) {
    const sdf = await pubchem.fetchSdf(cid).catch(() => null);
    if (sdf) repo.setSdf(ing.id, sdf.sdf, sdf.source);
  }

  if (ing.status === "verified") {
    // Never overwrite a reviewed profile; refresh the evidence around it.
    repo.patchIngredient(ing.id, {
      sources: docs,
      citations: papers.length ? papers : ing.citations,
      researchCount,
      usdaCount: usdaCount ?? undefined,
      researchState: "complete",
      researchError: null,
    });
    return;
  }

  let extraction: Extraction;
  let model = "extractive";
  const identityText = JSON.stringify({ formula: facts.compound?.formula, iupac: facts.compound?.iupac, cid });
  if (aiEnabled() && docs.length > 0) {
    try {
      extraction = await groundedExtraction({ name: ing.name, identity: identityText, docs, ingredientId: ing.id });
      model = AI_MODEL;
    } catch (err) {
      console.warn(`[research] AI extraction failed for ${ing.name}, using extractive profile:`, (err as Error).message);
      extraction = extractiveProfile(ing.name, docs, facts);
    }
  } else {
    extraction = extractiveProfile(ing.name, docs, facts);
  }

  const profile = extractionToProfile(extraction);
  // Keep the basic draft's answers where extraction found nothing.
  const pending = "Not described in the retrieved sources.";
  if (ing.profile) {
    if (!profile.function || profile.function === pending) profile.function = ing.profile.function;
    if (!profile.sensitization || profile.sensitization === pending) profile.sensitization = ing.profile.sensitization;
  }
  const identity = identityFromFacts(facts, ing.identity);
  identity.physical = {
    state: extraction.physical.state || identity.physical?.state,
    solubility: extraction.physical.solubility || identity.physical?.solubility,
    phStability: extraction.physical.phStability || identity.physical?.phStability,
    meltingPoint: extraction.physical.meltingPoint || identity.physical?.meltingPoint,
  };
  if (extraction.functionalGroups.length) identity.functionalGroups = extraction.functionalGroups;

  const cited = new Set([...extraction.reactions, ...extraction.mechanisms].flatMap((i) => i.sources));
  const citations = [...papers].sort((a, b) => Number(cited.has(`PMID:${b.pmid}`)) - Number(cited.has(`PMID:${a.pmid}`)));

  repo.patchIngredient(ing.id, {
    summary: model === "extractive" ? ing.summary : extraction.summary || ing.summary,
    profile,
    identity,
    citations,
    sources: docs,
    pubchemCid: cid ?? null,
    researchCount,
    usdaCount,
    researchState: "complete",
    researchError: null,
    draft: { stage: "research", model, generatedAt: new Date().toISOString(), unsupportedFields: extraction.unsupportedFields },
  });
  repo.logAudit(ing.id, "research_complete", `${papers.length} PubMed abstracts, ${docs.length - papers.length} PubChem sections, extraction by ${model}`);
  broadcast({ type: "ingredient.updated", id: ing.id, name: ing.name });
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
}

/**
 * Lighter job for verified profiles: refresh the PubMed publication count, citations and USDA prevalence.
 * Scheduled automatically for profiles missing evidence (e.g. after a PubMed outage during seeding).
 */
export async function refreshEvidence(ingredientId: string): Promise<void> {
  const ing = repo.getIngredient(ingredientId);
  if (!ing) return;
  const term = ing.researchTerm ?? ing.name;
  const [researchCount, papers] = await Promise.all([
    pubmed.publicationCount(term).catch(() => ing.researchCount),
    pubmed.researchPapers(term, 2).catch(() => [] as Ingredient["citations"]),
  ]);
  const usdaCount = ing.sectors.includes("food") && ing.usdaCount == null ? await brandedFoodCount(term) : ing.usdaCount;
  const citations = papers.length ? papers.slice(0, 5) : ing.citations;
  repo.patchIngredient(ing.id, {
    researchCount,
    usdaCount,
    citations,
    sources: papers.length
      ? papers.slice(0, 5).map((p) => ({ id: `PMID:${p.pmid}`, source: "pubmed" as const, title: p.title, url: p.url, text: p.abstract ?? "" }))
      : undefined,
    researchState: "complete",
  });
  if (papers.length || researchCount !== ing.researchCount) broadcast({ type: "ingredient.updated", id: ing.id, name: ing.name });
}

function scheduleEvidenceBackfill() {
  const run = () => {
    if (!pubmed.pubmedAvailable()) return;
    for (const id of repo.missingEvidence(8)) repo.enqueueJob(id, "refresh");
  };
  setTimeout(run, 20_000);
  setInterval(run, 15 * 60_000);
}

let workerStarted = false;
export function startWorker() {
  if (workerStarted) return;
  workerStarted = true;
  repo.recoverJobs();
  scheduleEvidenceBackfill();
  let busy = false;
  setInterval(async () => {
    if (busy) return;
    const job = repo.claimJob();
    if (!job) return;
    busy = true;
    try {
      if (job.kind === "refresh") await refreshEvidence(job.ingredientId);
      else await runResearch(job.ingredientId);
      repo.finishJob(job.id);
    } catch (err) {
      const message = (err as Error).message ?? String(err);
      console.warn(`[research] job ${job.id} failed (attempt ${job.attempts}):`, message);
      repo.failJob(job.id, job.ingredientId, message, job.attempts < 3);
    } finally {
      busy = false;
    }
  }, 1500);
}

// ---------------------------------------------------------------------------
// Scans

function groupFor(labeledOrganic: boolean, ing: IngredientSummary | null): ScanItem["group"] {
  if (labeledOrganic) return "organic";
  if (!ing) return "unknown";
  return NATURAL_ORIGINS.includes(ing.origin) ? "organic" : "artificial";
}

export function buildScanResult(scanId: string): ScanResult | null {
  const row = repo.getScanRow(scanId);
  if (!row) return null;
  const summaries = repo.getSummaries(row.items.map((i) => i.ingredientId).filter((x): x is string => !!x));
  const items: ScanItem[] = row.items.map((i) => {
    const ing = i.ingredientId ? (summaries.get(i.ingredientId) ?? null) : null;
    return {
      position: i.position,
      raw: i.raw,
      name: i.name,
      labeledOrganic: i.labeledOrganic,
      match: i.match as ScanItem["match"],
      group: groupFor(i.labeledOrganic, ing),
      ingredient: ing,
    };
  });
  const scored = scoreProduct(items, row.sector, row.name);
  if (scored.score !== row.score) repo.updateScanScore(row.id, scored.score);
  const known = items.filter((i) => i.ingredient);
  return {
    id: row.id,
    name: row.name,
    sector: row.sector,
    createdAt: row.createdAt,
    rawText: row.rawText,
    items,
    ...scored,
    stats: {
      total: items.length,
      organic: items.filter((i) => i.group === "organic").length,
      artificial: items.filter((i) => i.group === "artificial").length,
      unknown: items.filter((i) => i.group === "unknown").length,
      verified: known.filter((i) => i.ingredient!.status === "verified").length,
      drafts: known.filter((i) => i.ingredient!.status !== "verified").length,
    },
  };
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

export async function processScan(
  input: { deviceId: string; sector: Sector; text: string; name?: string },
  onProgress: (p: ScanProgress) => void,
): Promise<ScanResult> {
  const parsed = parseIngredients(input.text).slice(0, 80);
  if (parsed.length === 0) throw new UserError("We couldn't find an ingredient list in that text. Check the extracted text and try again.");
  onProgress({ type: "progress", stage: "parse", done: parsed.length, total: parsed.length, message: `Found ${parsed.length} ingredients on the label` });

  const matched = parsed.map((p) => ({ p, ...matchIngredient(p) }));
  const known = matched.filter((m) => m.ingredientId).length;
  onProgress({ type: "progress", stage: "match", done: known, total: parsed.length, message: `${known} of ${parsed.length} already in the Assay database` });

  const fresh = matched.filter((m) => !m.ingredientId);
  let drafted = 0;
  await mapLimit(fresh, 3, async (m) => {
    if (!isPlausibleIngredient(m.p.name)) {
      m.match = "unrecognized";
    } else {
      onProgress({ type: "progress", stage: "draft", done: drafted, total: fresh.length, message: `Researching ${m.p.name} on PubChem` });
      try {
        const created = await draftNewIngredient(m.p, input.sector, input.deviceId);
        if (created) {
          m.ingredientId = created.id;
          m.match = "new";
        } else {
          m.match = "unrecognized";
        }
      } catch (err) {
        console.warn(`[scan] draft failed for ${m.p.name}:`, (err as Error).message);
        m.match = "unrecognized";
      }
    }
    drafted++;
    onProgress({ type: "progress", stage: "draft", done: drafted, total: fresh.length, message: `Drafted ${drafted} of ${fresh.length} new profiles` });
  });

  onProgress({ type: "progress", stage: "score", done: 1, total: 1, message: "Scoring the product" });
  const id = randomBytes(6).toString("base64url");
  const sectorLabel = SECTORS.find((s) => s.id === input.sector)!.short;
  const name =
    input.name?.trim().slice(0, 80) ||
    `${sectorLabel} scan · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  repo.createScan(
    { id, deviceId: input.deviceId, name, sector: input.sector, rawText: input.text.slice(0, 8000), score: 0 },
    matched.map((m) => ({ position: m.p.position, raw: m.p.raw, name: m.p.name, labeledOrganic: m.p.labeledOrganic, match: m.match, ingredientId: m.ingredientId })),
  );
  return buildScanResult(id)!;
}
