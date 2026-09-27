import { Router, type Request, type Response } from "express";
import { z } from "zod";
import * as repo from "../repo";
import { AI_MODEL, aiEnabled, ocrLabel } from "../services/ai";
import { subscribe } from "../services/events";
import { UserError, buildScanResult, processScan } from "../services/pipeline";
import * as pubchem from "../services/pubchem";
import type { AppConfig, Ingredient, ScanProgress } from "../../shared/types";

export const publicRouter = Router();

/** Anonymous per-install id (no accounts): scan history and draft visibility are keyed to it. */
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
  res.json({ verified: counts.verified, pending: counts.needs_verification, scans: repo.totalScans() });
});

publicRouter.get("/events", (_req, res) => subscribe(res));

// ---------------------------------------------------------------------------
// Scans

const ScanBody = z.object({
  sector: z.enum(["food", "beauty", "cleaning"]),
  text: z.string().min(3).max(12_000),
  name: z.string().max(80).optional(),
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
  sector: z.enum(["food", "beauty", "cleaning"]).optional(),
  sort: z.enum(["name", "score_asc", "score_desc", "research_desc", "research_asc", "recent"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

publicRouter.get("/ingredients", (req, res) => {
  const params = ListParams.safeParse(req.query);
  if (!params.success) return res.status(400).json({ error: "Invalid query" });
  // Only verified profiles are published globally.
  res.json(repo.listIngredients({ ...params.data, status: "verified" }));
});

function canView(ing: Ingredient, req: Request): boolean {
  if (ing.status === "verified") return true;
  const device = deviceId(req);
  return !!device && repo.deviceHasScanned(device, ing.id);
}

publicRouter.get("/ingredients/:id", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Ingredient not found" });
  if (!canView(ing, req)) {
    // Unverified drafts are private to the users who scanned them.
    return res.status(403).json({ error: "This ingredient is still being reviewed by our scientists.", name: ing.name, pending: true });
  }
  if (ing.status === "verified") res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=86400");
  res.json(ing);
});

/** 3D structure, cached permanently in the database after the first fetch. */
publicRouter.get("/ingredients/:id/sdf", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing || !canView(ing, req)) return res.status(404).end();
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
  if (!ing || !ing.pubchemCid || !canView(ing, req)) return res.status(404).end();
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
