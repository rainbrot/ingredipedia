import { Router, type Request, type Response } from "express";
import { z } from "zod";
import * as repo from "../repo";
import { AI_MODEL, aiEnabled, ocrLabel } from "../services/ai";
import { subscribe } from "../services/events";
import { lookupBarcode, normalizeBarcode } from "../services/barcode";
import { UserError, buildScanResult, processScan } from "../services/pipeline";
import * as pubchem from "../services/pubchem";
import type { AppConfig, ScanProgress } from "../../shared/types";

export const publicRouter = Router();

/** Anonymous per-install id (no accounts): scan history is keyed to it. */
function deviceId(req: Request): string {
  const id = String(req.header("x-assay-device") ?? "");
  return /^[a-zA-Z0-9-]{8,64}$/.test(id) ? id : "";
}

publicRouter.get("/config", (_req, res) => {
  const config: AppConfig = { ai: aiEnabled(), model: aiEnabled() ? AI_MODEL : null, aiOcr: aiEnabled() };
  res.json(config);
});

publicRouter.get("/stats", (_req, res) => {
  const counts = repo.countByStatus();
  res.json({ ...counts, total: counts.curated + counts.researched + counts.preliminary, scans: repo.totalScans() });
});

/** Every known label spelling, so the client can correct OCR misreads before analysis. */
publicRouter.get("/lexicon", (_req, res) => {
  const entries = [...repo.aliasIndex().entries()].map(([key, id]) => [key, id]);
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ entries });
});

publicRouter.get("/barcode/:code", async (req, res) => {
  const code = normalizeBarcode(req.params.code);
  if (!code) return res.status(400).json({ error: "That doesn't look like a valid product barcode. Check the digits and try again." });
  const sector = ["food", "beauty", "cleaning"].includes(String(req.query.sector)) ? (req.query.sector as "food" | "beauty" | "cleaning") : undefined;
  try {
    const product = await lookupBarcode(code, sector);
    if (!product) return res.status(404).json({ error: "This barcode isn't in the open product databases yet. Scan the ingredient list instead." });
    res.json(product);
  } catch {
    res.status(502).json({ error: "The product database isn't responding. Try again, or scan the ingredient list." });
  }
});

publicRouter.get("/events", (_req, res) => subscribe(res));

// ---------------------------------------------------------------------------
// Scans

const ScanBody = z.object({
  sector: z.enum(["food", "beauty", "cleaning"]),
  text: z.string().min(3).max(12_000),
  name: z.string().max(80).optional(),
  barcode: z.string().regex(/^\d{8,14}$/).optional(),
  imageUrl: z
    .string()
    .url()
    .refine((u) => /^https:\/\/images\.open(food|beauty|products)facts\.org\//.test(u))
    .optional(),
});

publicRouter.post("/scans", async (req: Request, res: Response) => {
  const device = deviceId(req);
  if (!device) return res.status(400).json({ error: "Missing device id" });
  const body = ScanBody.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: "Please provide the ingredient text and a product category." });

  // Stream progress as newline-delimited JSON so the UI can show each pipeline step live.
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Accel-Buffering", "no");
  const send = (msg: ScanProgress) => res.write(`${JSON.stringify(msg)}\n`);
  try {
    const scan = await processScan({ deviceId: device, ...body.data }, send);
    send({ type: "result", scan });
  } catch (err) {
    const message = err instanceof UserError ? err.message : "Something went wrong while analyzing this label. Please try again.";
    if (!(err instanceof UserError)) console.error("[scan]", err);
    send({ type: "error", message });
  }
  res.end();
});

publicRouter.get("/scans", (req, res) => {
  const device = deviceId(req);
  if (!device) return res.json({ items: [] });
  res.json({ items: repo.listScans(device) });
});

// Scan ids are unguessable, so a product page link can be shared; only the owner can edit or delete.
publicRouter.get("/scans/:id", (req, res) => {
  const scan = buildScanResult(req.params.id);
  if (!scan) return res.status(404).json({ error: "Scan not found" });
  const row = repo.getScanRow(req.params.id);
  res.json({ ...scan, owned: row?.deviceId === deviceId(req) });
});

publicRouter.patch("/scans/:id", (req, res) => {
  const name = z.string().trim().min(1).max(80).safeParse(req.body?.name);
  if (!name.success) return res.status(400).json({ error: "Name must be 1–80 characters" });
  if (!repo.renameScan(req.params.id, deviceId(req), name.data)) return res.status(404).json({ error: "Scan not found" });
  res.json({ ok: true });
});

publicRouter.delete("/scans/:id", (req, res) => {
  if (!repo.deleteScan(req.params.id, deviceId(req))) return res.status(404).json({ error: "Scan not found" });
  res.json({ ok: true });
});

publicRouter.delete("/me", (req, res) => {
  const device = deviceId(req);
  if (!device) return res.status(400).json({ error: "Missing device id" });
  res.json({ deleted: repo.deleteDeviceData(device) });
});

// ---------------------------------------------------------------------------
// Label OCR (optional AI path; the browser uses on-device Tesseract otherwise)

const OcrBody = z.object({ image: z.string().regex(/^data:image\/(jpeg|png|webp);base64,/) });

publicRouter.post("/ocr", async (req, res) => {
  if (!aiEnabled()) return res.status(503).json({ error: "AI OCR is not configured on this server" });
  const body = OcrBody.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: "Expected a JPEG, PNG or WebP data URL" });
  const [, mediaType, data] = body.data.image.match(/^data:(image\/(?:jpeg|png|webp));base64,(.*)$/s)!;
  try {
    const result = await ocrLabel(data, mediaType as "image/jpeg" | "image/png" | "image/webp");
    res.json(result);
  } catch (err) {
    console.warn("[ocr]", (err as Error).message);
    res.status(502).json({ error: "AI OCR failed; falling back to on-device OCR." });
  }
});

// ---------------------------------------------------------------------------
// Ingredient library and profiles

const ListParams = z.object({
  q: z.string().max(80).optional(),
  status: z.enum(["curated", "researched", "preliminary"]).optional(),
  sector: z.enum(["food", "beauty", "cleaning"]).optional(),
  sort: z.enum(["name", "score_asc", "score_desc", "research_desc", "research_asc", "recent"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

publicRouter.get("/ingredients", (req, res) => {
  const params = ListParams.safeParse(req.query);
  if (!params.success) return res.status(400).json({ error: "Invalid query" });
  res.json(repo.listIngredients({ ...params.data, status: params.data.status }));
});

publicRouter.get("/ingredients/:id", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Ingredient not found" });
  if (ing.status === "curated") res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=86400");
  res.json(ing);
});

/** "Something looks wrong" from a user: re-research automatically instead of waiting for a moderator. */
publicRouter.post("/ingredients/:id/report", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Ingredient not found" });
  const reason = z.string().trim().min(3).max(500).safeParse(req.body?.reason);
  if (!reason.success) return res.status(400).json({ error: "Tell us briefly what looks wrong (at least 3 characters)." });
  const already = repo.recentlyReported(ing.id);
  repo.addReport(ing.id, deviceId(req), reason.data);
  if (!already) repo.enqueueJob(ing.id, ing.status === "curated" ? "refresh" : "research");
  repo.logAudit(ing.id, "user_report", reason.data.slice(0, 200));
  res.json({ ok: true, requeued: !already });
});

publicRouter.get("/learn/myths", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ items: repo.allMyths() });
});

/** Structures for any PubChem compound (used by lessons, e.g. the two mirror-image forms of limonene). */
publicRouter.get("/molecule/:cid/:file", async (req, res) => {
  const cid = Number(req.params.cid);
  if (!Number.isInteger(cid) || cid <= 0 || cid > 1e9) return res.status(400).end();
  const kind = req.params.file === "structure.png" ? "png" : req.params.file === "sdf" ? "sdf" : null;
  if (!kind) return res.status(404).end();
  const key = `molecule:${kind}:${cid}`;
  let hit = repo.cacheGet(key);
  if (!hit) {
    if (kind === "png") {
      const png = await pubchem.fetchStructurePng(cid).catch(() => null);
      if (!png) return res.status(404).end();
      hit = { contentType: "image/png", body: png };
    } else {
      const sdf = await pubchem.fetchSdf(cid).catch(() => null);
      if (!sdf) return res.status(404).end();
      hit = { contentType: sdf.source === "pubchem-3d" ? "chemical/x-mdl-sdfile; 3d" : "chemical/x-mdl-sdfile; 2d", body: new TextEncoder().encode(sdf.sdf) };
    }
    repo.cachePut(key, hit.contentType, hit.body);
  }
  res.setHeader("Content-Type", hit.contentType.split(";")[0]);
  if (kind === "sdf") res.setHeader("X-Structure-Source", hit.contentType.includes("3d") ? "pubchem-3d" : "pubchem-2d");
  res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  res.send(Buffer.from(hit.body));
});

/** 3D structure, cached permanently in the database after the first fetch. */
publicRouter.get("/ingredients/:id/sdf", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).end();
  let cached = repo.getSdf(ing.id);
  if (!cached && ing.pubchemCid) {
    const fetched = await pubchem.fetchSdf(ing.pubchemCid).catch(() => null);
    if (fetched) {
      repo.setSdf(ing.id, fetched.sdf, fetched.source);
      cached = { sdf: fetched.sdf, source: fetched.source };
    }
  }
  if (!cached) return res.status(404).json({ error: "No structure available" });
  res.setHeader("Content-Type", "chemical/x-mdl-sdfile; charset=utf-8");
  res.setHeader("X-Structure-Source", cached.source);
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(cached.sdf);
});

/** 2D skeletal diagram from PubChem, cached permanently. */
publicRouter.get("/ingredients/:id/structure.png", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing || !ing.pubchemCid) return res.status(404).end();
  const key = `png:${ing.pubchemCid}`;
  let hit = repo.cacheGet(key);
  if (!hit) {
    const png = await pubchem.fetchStructurePng(ing.pubchemCid).catch(() => null);
    if (!png) return res.status(404).end();
    repo.cachePut(key, "image/png", png);
    hit = { contentType: "image/png", body: png };
  }
  res.setHeader("Content-Type", hit.contentType);
  res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  res.send(Buffer.from(hit.body));
});
