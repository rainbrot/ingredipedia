// Data access for ingredients, scans, the research job queue, and the AI cost ledger.

import { db, now, parseJson, tx } from "./db";
import { normalizeKey } from "../shared/parse";
import type {
  Citation,
  DraftMeta,
  Identity,
  Ingredient,
  IngredientSummary,
  Kind,
  Origin,
  Profile,
  ResearchState,
  Sector,
  SourceDoc,
  Status,
} from "../shared/types";

type Row = Record<string, unknown>;

export interface IngredientWrite {
  id: string;
  name: string;
  aliases?: string[];
  kind?: Kind;
  sectors?: Sector[];
  primaryCategory?: string;
  primaryRole?: string;
  origin?: Origin;
  healthScore?: number;
  scoreRationale?: string;
  concerns?: string[];
  summary?: string;
  researchCount?: number | null;
  researchTerm?: string | null;
  usdaCount?: number | null;
  pubchemCid?: number | null;
  identity?: Identity;
  profile?: Profile | null;
  citations?: Citation[];
  sources?: SourceDoc[];
  status?: Status;
  researchState?: ResearchState | null;
  researchError?: string | null;
  draft?: DraftMeta | null;
  createdBy?: string | null;
}

export function slugify(name: string): string {
  return (
    normalizeKey(name)
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `ingredient-${Date.now()}`
  );
}

function toSummary(r: Row): IngredientSummary {
  return {
    id: r.id as string,
    name: r.name as string,
    kind: r.kind as Kind,
    primaryRole: r.primary_role as string,
    primaryCategory: r.primary_category as string,
    origin: r.origin as Origin,
    healthScore: Number(r.health_score),
    concerns: parseJson<string[]>(r.concerns, []),
    researchCount: r.research_count == null ? null : Number(r.research_count),
    status: r.status as Status,
    researchState: (r.research_state as ResearchState | null) ?? null,
    sectors: parseJson<Sector[]>(r.sectors, []),
    pubchemCid: r.pubchem_cid == null ? null : Number(r.pubchem_cid),
  };
}

function toIngredient(r: Row): Ingredient {
  return {
    ...toSummary(r),
    aliases: parseJson<string[]>(r.aliases, []),
    summary: r.summary as string,
    scoreRationale: r.score_rationale as string,
    usdaCount: r.usda_count == null ? null : Number(r.usda_count),
    researchTerm: (r.research_term as string | null) ?? null,
    identity: parseJson<Identity>(r.identity, {}),
    profile: parseJson<Profile | null>(r.profile, null),
    citations: parseJson<Citation[]>(r.citations, []),
    sources: parseJson<SourceDoc[]>(r.sources, []),
    draft: parseJson<DraftMeta | null>(r.draft, null),
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string,
  };
}

// ---------------------------------------------------------------------------
// Ingredients

export function getIngredient(id: string): Ingredient | null {
  const row = db.prepare("SELECT * FROM ingredients WHERE id = ?").get(id) as Row | undefined;
  return row ? toIngredient(row) : null;
}

export function findByCid(cid: number): IngredientSummary | null {
  const row = db.prepare("SELECT * FROM ingredients WHERE pubchem_cid = ? LIMIT 1").get(cid) as Row | undefined;
  return row ? toSummary(row) : null;
}

export function getSummaries(ids: string[]): Map<string, IngredientSummary> {
  const out = new Map<string, IngredientSummary>();
  if (ids.length === 0) return out;
  const unique = [...new Set(ids)];
  const rows = db
    .prepare(`SELECT * FROM ingredients WHERE id IN (${unique.map(() => "?").join(",")})`)
    .all(...unique) as Row[];
  for (const r of rows) out.set(r.id as string, toSummary(r));
  return out;
}

export interface ListQuery {
  q?: string;
  sector?: Sector;
  status?: Status;
  sort?: "name" | "score_asc" | "score_desc" | "research_desc" | "research_asc" | "recent";
  limit?: number;
  offset?: number;
}

export function listIngredients(query: ListQuery): { items: IngredientSummary[]; total: number } {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (query.status) {
    where.push("i.status = ?");
    params.push(query.status);
  }
  if (query.sector) {
    where.push("EXISTS (SELECT 1 FROM json_each(i.sectors) WHERE value = ?)");
    params.push(query.sector);
  }
  if (query.q && query.q.trim()) {
    const key = `%${normalizeKey(query.q)}%`;
    where.push("(EXISTS (SELECT 1 FROM aliases a WHERE a.ingredient_id = i.id AND a.key LIKE ?) OR lower(i.primary_role) LIKE ?)");
    params.push(key, `%${query.q.toLowerCase().trim()}%`);
  }
  const order = {
    name: "i.name COLLATE NOCASE ASC",
    score_asc: "i.health_score ASC, i.name",
    score_desc: "i.health_score DESC, i.name",
    research_desc: "COALESCE(i.research_count, -1) DESC, i.name",
    research_asc: "COALESCE(i.research_count, 1e12) ASC, i.name",
    recent: "i.updated_at DESC",
  }[query.sort ?? "name"];
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = Number((db.prepare(`SELECT COUNT(*) n FROM ingredients i ${whereSql}`).get(...params) as Row).n);
  const rows = db
    .prepare(`SELECT * FROM ingredients i ${whereSql} ORDER BY ${order} LIMIT ? OFFSET ?`)
    .all(...params, query.limit ?? 60, query.offset ?? 0) as Row[];
  return { items: rows.map(toSummary), total };
}

const COLUMN_MAP: Record<keyof Omit<IngredientWrite, "id">, [string, "json" | "raw"]> = {
  name: ["name", "raw"],
  aliases: ["aliases", "json"],
  kind: ["kind", "raw"],
  sectors: ["sectors", "json"],
  primaryCategory: ["primary_category", "raw"],
  primaryRole: ["primary_role", "raw"],
  origin: ["origin", "raw"],
  healthScore: ["health_score", "raw"],
  scoreRationale: ["score_rationale", "raw"],
  concerns: ["concerns", "json"],
  summary: ["summary", "raw"],
  researchCount: ["research_count", "raw"],
  researchTerm: ["research_term", "raw"],
  usdaCount: ["usda_count", "raw"],
  pubchemCid: ["pubchem_cid", "raw"],
  identity: ["identity", "json"],
  profile: ["profile", "json"],
  citations: ["citations", "json"],
  sources: ["sources", "json"],
  status: ["status", "raw"],
  researchState: ["research_state", "raw"],
  researchError: ["research_error", "raw"],
  draft: ["draft", "json"],
  createdBy: ["created_by", "raw"],
};

function encode(value: unknown, mode: "json" | "raw"): string | number | null {
  if (value === undefined || value === null) return null;
  if (mode === "json") return JSON.stringify(value);
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  return String(value);
}

/** Registers every name/alias (and the INCI/E-number/IUPAC names) as lookup keys for the matcher. */
function writeAliases(id: string, name: string, aliases: string[], identity?: Identity) {
  db.prepare("DELETE FROM aliases WHERE ingredient_id = ?").run(id);
  const keys = new Set<string>();
  for (const a of [name, ...aliases, identity?.inci, identity?.eNumber, identity?.iupac]) {
    if (!a) continue;
    const k = normalizeKey(a);
    if (k.replace(/[^a-z]/g, "").length >= 2 || /^e\d{3}/.test(k)) keys.add(k);
  }
  const insert = db.prepare("INSERT INTO aliases (key, ingredient_id) VALUES (?, ?) ON CONFLICT(key) DO NOTHING");
  for (const k of keys) insert.run(k, id);
  aliasCache = null;
}

/**
 * Rebuilds every lookup key from the stored names, so changes to key normalization apply to existing
 * data. Curated profiles go first so they keep shared keys.
 */
export function reindexAliases() {
  const rows = db
    .prepare("SELECT id, name, aliases, identity FROM ingredients ORDER BY CASE status WHEN 'curated' THEN 0 WHEN 'researched' THEN 1 ELSE 2 END, created_at")
    .all() as Row[];
  tx(() => {
    db.prepare("DELETE FROM aliases").run();
    for (const r of rows) writeAliases(r.id as string, r.name as string, parseJson<string[]>(r.aliases, []), parseJson<Identity | undefined>(r.identity, undefined));
  });
}

export function upsertIngredient(w: IngredientWrite): Ingredient {
  return tx(() => {
    const existing = db.prepare("SELECT id FROM ingredients WHERE id = ?").get(w.id);
    const ts = now();
    if (!existing) {
      db.prepare("INSERT INTO ingredients (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)").run(w.id, w.name, ts, ts);
    }
    const sets: string[] = ["updated_at = ?"];
    const vals: (string | number | null)[] = [ts];
    for (const [key, [col, mode]] of Object.entries(COLUMN_MAP) as [keyof typeof COLUMN_MAP, [string, "json" | "raw"]][]) {
      if (key in w && w[key] !== undefined) {
        sets.push(`${col} = ?`);
        vals.push(encode(w[key], mode));
      }
    }
    db.prepare(`UPDATE ingredients SET ${sets.join(", ")} WHERE id = ?`).run(...vals, w.id);
    const current = getIngredient(w.id)!;
    if (w.aliases !== undefined || w.name !== undefined || w.identity !== undefined || !existing) {
      writeAliases(w.id, current.name, current.aliases, current.identity);
    }
    return current;
  });
}

export function patchIngredient(id: string, patch: Omit<IngredientWrite, "id" | "name"> & { name?: string }): Ingredient {
  const current = getIngredient(id);
  if (!current) throw new Error(`Unknown ingredient ${id}`);
  return upsertIngredient({ ...patch, id, name: patch.name ?? current.name });
}

export function setSdf(id: string, sdf: string | null, source: "pubchem-3d" | "pubchem-2d" | null) {
  db.prepare("UPDATE ingredients SET sdf = ?, sdf_source = ?, updated_at = ? WHERE id = ?").run(sdf, source, now(), id);
}

export function getSdf(id: string): { sdf: string; source: string } | null {
  const row = db.prepare("SELECT sdf, sdf_source FROM ingredients WHERE id = ?").get(id) as Row | undefined;
  if (!row || !row.sdf) return null;
  return { sdf: row.sdf as string, source: row.sdf_source as string };
}

let aliasCache: Map<string, string> | null = null;

export function aliasIndex(): Map<string, string> {
  if (!aliasCache) {
    const rows = db.prepare("SELECT key, ingredient_id FROM aliases").all() as Row[];
    aliasCache = new Map(rows.map((r) => [r.key as string, r.ingredient_id as string]));
  }
  return aliasCache;
}

/** Curated profiles still missing PubMed evidence (publication count or citations). */
export function missingEvidence(limit: number): string[] {
  return (
    db
      .prepare(
        `SELECT i.id FROM ingredients i
         WHERE i.status = 'curated' AND (i.research_count IS NULL OR i.citations = '[]')
           AND NOT EXISTS (SELECT 1 FROM jobs j WHERE j.ingredient_id = i.id AND j.state IN ('queued','running'))
         LIMIT ?`,
      )
      .all(limit) as Row[]
  ).map((r) => r.id as string);
}

/** Every myth/consensus pair across complete profiles, for the Myth or Fact game. */
export function allMyths(): { ingredientId: string; ingredientName: string; claim: string; consensus: string }[] {
  const rows = db.prepare("SELECT id, name, profile FROM ingredients WHERE status != 'preliminary' AND profile IS NOT NULL").all() as Row[];
  return rows.flatMap((r) =>
    (parseJson<{ myths?: { claim: string; consensus: string }[] } | null>(r.profile, null)?.myths ?? []).map((m) => ({
      ingredientId: r.id as string,
      ingredientName: r.name as string,
      claim: m.claim,
      consensus: m.consensus,
    })),
  );
}

export function countByStatus(): Record<Status, number> {
  const rows = db.prepare("SELECT status, COUNT(*) n FROM ingredients GROUP BY status").all() as Row[];
  const out: Record<Status, number> = { curated: 0, researched: 0, preliminary: 0 };
  for (const r of rows) out[r.status as Status] = Number(r.n);
  return out;
}

// ---------------------------------------------------------------------------
// Scans

export interface ScanItemWrite {
  position: number;
  raw: string;
  name: string;
  labeledOrganic: boolean;
  match: string;
  ingredientId: string | null;
}

export function createScan(
  scan: { id: string; deviceId: string; name: string; sector: Sector; rawText: string; score: number; barcode: string | null; imageUrl: string | null },
  items: ScanItemWrite[],
) {
  tx(() => {
    db.prepare("INSERT INTO scans (id, device_id, name, sector, raw_text, score, barcode, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
      scan.id,
      scan.deviceId,
      scan.name,
      scan.sector,
      scan.rawText,
      scan.score,
      scan.barcode,
      scan.imageUrl,
      now(),
    );
    const ins = db.prepare(
      "INSERT INTO scan_items (scan_id, position, raw, name, labeled_organic, match, ingredient_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    for (const it of items) ins.run(scan.id, it.position, it.raw, it.name, it.labeledOrganic ? 1 : 0, it.match, it.ingredientId);
  });
}

export interface ScanRow {
  id: string;
  deviceId: string;
  name: string;
  sector: Sector;
  rawText: string;
  score: number;
  barcode: string | null;
  imageUrl: string | null;
  createdAt: string;
  items: ScanItemWrite[];
}

export function getScanRow(id: string): ScanRow | null {
  const r = db.prepare("SELECT * FROM scans WHERE id = ?").get(id) as Row | undefined;
  if (!r) return null;
  const items = (db.prepare("SELECT * FROM scan_items WHERE scan_id = ? ORDER BY position").all(id) as Row[]).map((i) => ({
    position: Number(i.position),
    raw: i.raw as string,
    name: i.name as string,
    labeledOrganic: Number(i.labeled_organic) === 1,
    match: i.match as string,
    ingredientId: (i.ingredient_id as string | null) ?? null,
  }));
  return {
    id: r.id as string,
    deviceId: r.device_id as string,
    name: r.name as string,
    sector: r.sector as Sector,
    rawText: r.raw_text as string,
    score: Number(r.score),
    barcode: (r.barcode as string | null) ?? null,
    imageUrl: (r.image_url as string | null) ?? null,
    createdAt: r.created_at as string,
    items,
  };
}

export function listScans(deviceId: string) {
  return (
    db
      .prepare(
        `SELECT s.id, s.name, s.sector, s.score, s.image_url, s.created_at, (SELECT COUNT(*) FROM scan_items i WHERE i.scan_id = s.id) AS item_count
         FROM scans s WHERE s.device_id = ? ORDER BY s.created_at DESC LIMIT 200`,
      )
      .all(deviceId) as Row[]
  ).map((r) => ({
    id: r.id as string,
    name: r.name as string,
    sector: r.sector as Sector,
    score: Number(r.score),
    createdAt: r.created_at as string,
    itemCount: Number(r.item_count),
    imageUrl: (r.image_url as string | null) ?? null,
  }));
}

export function updateScanScore(id: string, score: number) {
  db.prepare("UPDATE scans SET score = ? WHERE id = ?").run(score, id);
}

export function renameScan(id: string, deviceId: string, name: string): boolean {
  return Number(db.prepare("UPDATE scans SET name = ? WHERE id = ? AND device_id = ?").run(name, id, deviceId).changes) > 0;
}

export function deleteScan(id: string, deviceId: string): boolean {
  return Number(db.prepare("DELETE FROM scans WHERE id = ? AND device_id = ?").run(id, deviceId).changes) > 0;
}

export function deleteDeviceData(deviceId: string): number {
  return Number(db.prepare("DELETE FROM scans WHERE device_id = ?").run(deviceId).changes);
}

/** Scans that contain an ingredient, so their stored score can be refreshed when it changes. */
export function scansContaining(ingredientId: string): string[] {
  return (db.prepare("SELECT DISTINCT scan_id FROM scan_items WHERE ingredient_id = ?").all(ingredientId) as Row[]).map((r) => r.scan_id as string);
}

// ---------------------------------------------------------------------------
// Background research jobs (durable across restarts)

export function enqueueJob(ingredientId: string, kind = "research", delayMs = 0) {
  const existing = db
    .prepare("SELECT id FROM jobs WHERE ingredient_id = ? AND kind = ? AND state IN ('queued','running')")
    .get(ingredientId, kind);
  if (existing) return;
  const ts = now();
  db.prepare("INSERT INTO jobs (ingredient_id, kind, state, run_after, created_at, updated_at) VALUES (?, ?, 'queued', ?, ?, ?)").run(
    ingredientId,
    kind,
    new Date(Date.now() + delayMs).toISOString(),
    ts,
    ts,
  );
  db.prepare("UPDATE ingredients SET research_state = 'queued', research_error = NULL WHERE id = ?").run(ingredientId);
}

export function claimJob(): { id: number; ingredientId: string; kind: string; attempts: number } | null {
  return tx(() => {
    const row = db
      .prepare("SELECT * FROM jobs WHERE state = 'queued' AND run_after <= ? ORDER BY run_after ASC LIMIT 1")
      .get(now()) as Row | undefined;
    if (!row) return null;
    db.prepare("UPDATE jobs SET state = 'running', attempts = attempts + 1, updated_at = ? WHERE id = ?").run(now(), row.id as number);
    db.prepare("UPDATE ingredients SET research_state = 'running' WHERE id = ?").run(row.ingredient_id as string);
    return { id: Number(row.id), ingredientId: row.ingredient_id as string, kind: row.kind as string, attempts: Number(row.attempts) + 1 };
  });
}

export function finishJob(id: number) {
  db.prepare("UPDATE jobs SET state = 'done', updated_at = ? WHERE id = ?").run(now(), id);
}

export function failJob(id: number, ingredientId: string, error: string, retry: boolean) {
  if (retry) {
    db.prepare("UPDATE jobs SET state = 'queued', error = ?, run_after = ?, updated_at = ? WHERE id = ?").run(
      error,
      new Date(Date.now() + 60_000).toISOString(),
      now(),
      id,
    );
    db.prepare("UPDATE ingredients SET research_state = 'queued', research_error = ? WHERE id = ?").run(error, ingredientId);
  } else {
    db.prepare("UPDATE jobs SET state = 'failed', error = ?, updated_at = ? WHERE id = ?").run(error, now(), id);
    db.prepare("UPDATE ingredients SET research_state = 'failed', research_error = ? WHERE id = ?").run(error, ingredientId);
  }
}

/** Jobs left "running" by a crash are put back in the queue on boot. */
export function recoverJobs() {
  db.prepare("UPDATE jobs SET state = 'queued' WHERE state = 'running'").run();
  db.prepare("UPDATE ingredients SET research_state = 'queued' WHERE research_state = 'running'").run();
}

// ---------------------------------------------------------------------------
// AI cost ledger and audit log

export function recordAiUsage(entry: { ingredientId: string | null; purpose: string; model: string; inputTokens: number; outputTokens: number; costUsd: number }) {
  db.prepare("INSERT INTO ai_ledger (ingredient_id, purpose, model, input_tokens, output_tokens, cost_usd, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    entry.ingredientId,
    entry.purpose,
    entry.model,
    entry.inputTokens,
    entry.outputTokens,
    entry.costUsd,
    now(),
  );
}

export function logAudit(ingredientId: string | null, action: string, detail?: string) {
  db.prepare("INSERT INTO audit (ingredient_id, action, detail, created_at) VALUES (?, ?, ?, ?)").run(ingredientId, action, detail ?? null, now());
}

export function totalScans(): number {
  return Number((db.prepare("SELECT COUNT(*) n FROM scans").get() as Row).n);
}

// ---------------------------------------------------------------------------
// User reports trigger automatic re-research (no human moderation queue).

export function addReport(ingredientId: string, deviceId: string, reason: string) {
  db.prepare("INSERT INTO reports (ingredient_id, device_id, reason, created_at) VALUES (?, ?, ?, ?)").run(ingredientId, deviceId, reason, now());
}

/** True when this ingredient was already re-researched because of a report in the last day. */
export function recentlyReported(ingredientId: string): boolean {
  const since = new Date(Date.now() - 86400_000).toISOString();
  return !!db.prepare("SELECT 1 FROM reports WHERE ingredient_id = ? AND created_at >= ? LIMIT 1").get(ingredientId, since);
}

// ---------------------------------------------------------------------------
// Permanent cache for remote binary assets (structure images, SDF files)

export function cacheGet(key: string): { contentType: string; body: Uint8Array } | null {
  const row = db.prepare("SELECT content_type, body FROM blob_cache WHERE key = ?").get(key) as Row | undefined;
  return row ? { contentType: row.content_type as string, body: row.body as Uint8Array } : null;
}

export function cachePut(key: string, contentType: string, body: Uint8Array) {
  db.prepare("INSERT OR REPLACE INTO blob_cache (key, content_type, body, created_at) VALUES (?, ?, ?, ?)").run(key, contentType, body, now());
}
