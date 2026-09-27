// Admin review dashboard API: the flagged-entry queue, fact-check data, 3D model confirmation,
// "Approve & Verify", and pipeline cost accounting.

import { Router, type NextFunction, type Request, type Response } from "express";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import * as repo from "../repo";
import { AI_MODEL, aiEnabled } from "../services/ai";
import { broadcast, connectedClients } from "../services/events";
import * as pubchem from "../services/pubchem";

export const adminRouter = Router();

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const serverSalt = randomBytes(16).toString("hex"); // tokens reset on restart

function passcode(): string {
  return process.env.ADMIN_PASSCODE ?? "";
}

function sign(payload: string): string {
  return createHmac("sha256", `${passcode()}:${serverSalt}`).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

const attempts = new Map<string, { count: number; resetAt: number }>();

adminRouter.post("/login", (req, res) => {
  if (!passcode()) return res.status(503).json({ error: "Admin passcode is not configured. Set ADMIN_PASSCODE in .env." });
  const ip = req.ip ?? "unknown";
  const entry = attempts.get(ip);
  if (entry && entry.resetAt > Date.now() && entry.count >= 8) {
    return res.status(429).json({ error: "Too many attempts. Try again in a minute." });
  }
  const given = String(req.body?.passcode ?? "");
  if (!safeEqual(given, passcode())) {
    const next = entry && entry.resetAt > Date.now() ? entry : { count: 0, resetAt: Date.now() + 60_000 };
    next.count++;
    attempts.set(ip, next);
    return res.status(401).json({ error: "Incorrect passcode" });
  }
  attempts.delete(ip);
  const issued = String(Date.now());
  res.json({ token: `${issued}.${sign(issued)}`, expiresAt: Number(issued) + TOKEN_TTL_MS });
});

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const [issued, sig] = token.split(".");
  if (!issued || !sig || !passcode() || !safeEqual(sig, sign(issued)) || Date.now() - Number(issued) > TOKEN_TTL_MS) {
    return res.status(401).json({ error: "Please sign in again" });
  }
  next();
}

adminRouter.use(requireAdmin);

// ---------------------------------------------------------------------------

adminRouter.get("/overview", (_req, res) => {
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const thirtyDays = new Date(Date.now() - 30 * 86400_000).toISOString();
  const month = repo.aiTotals(monthStart.toISOString());
  const allTime = repo.aiTotals();
  const counts = repo.countByStatus();
  res.json({
    counts,
    queue: repo.reviewQueue(),
    jobs: repo.jobCounts(),
    ai: {
      enabled: aiEnabled(),
      model: AI_MODEL,
      month,
      allTime,
      costPerIngredient: allTime.ingredients ? allTime.costUsd / allTime.ingredients : null,
    },
    activeDevices30d: repo.activeDevices(thirtyDays),
    totalScans: repo.totalScans(),
    liveClients: connectedClients(),
    audit: repo.recentAudit(25),
  });
});

const ListParams = z.object({
  q: z.string().max(80).optional(),
  status: z.enum(["verified", "needs_verification"]).optional(),
  sort: z.enum(["name", "score_asc", "score_desc", "research_desc", "research_asc", "recent"]).optional(),
});

adminRouter.get("/ingredients", (req, res) => {
  const params = ListParams.safeParse(req.query);
  if (!params.success) return res.status(400).json({ error: "Invalid query" });
  res.json(repo.listIngredients({ ...params.data, limit: 100 }));
});

adminRouter.get("/ingredients/:id", (req, res) => {
  const ing = repo.getAdminIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  res.json(ing);
});

const SourcedItemZ = z.object({
  title: z.string().max(200),
  description: z.string().max(3000),
  equation: z.string().max(400).optional(),
  sources: z.array(z.string().max(80)).max(20).optional(),
});

const ProfileZ = z.object({
  function: z.string().max(3000),
  reactions: z.array(SourcedItemZ).max(12),
  mechanisms: z.array(SourcedItemZ).max(12),
  regulatory: z.array(z.object({ body: z.string().max(200), status: z.string().max(1000), limit: z.string().max(400).optional() })).max(12),
  toxicology: z.object({ mechanism: z.string().max(3000), dosage: z.string().max(3000) }),
  sensitization: z.string().max(2000),
  myths: z.array(z.object({ claim: z.string().max(600), consensus: z.string().max(1500) })).max(10),
  synthesis: z.object({ method: z.string().max(2000), steps: z.array(z.string().max(800)).max(12), equations: z.array(z.string().max(400)).max(8).optional() }),
  environment: z.object({ persistence: z.string().max(1500), biodegradability: z.string().max(1500), aquaticToxicity: z.string().max(1500), notes: z.string().max(1500).optional() }),
  fun: z.object({ history: z.string().max(2000), uses: z.array(z.string().max(400)).max(10), occurrence: z.string().max(1500) }),
});

const IdentityZ = z.object({
  iupac: z.string().max(400).optional(),
  inci: z.string().max(200).optional(),
  cas: z.string().max(40).optional(),
  eNumber: z.string().max(20).optional(),
  formula: z.string().max(120).optional(),
  weight: z.number().positive().max(1e7).optional(),
  smiles: z.string().max(2000).optional(),
  functionalGroups: z.array(z.string().max(60)).max(20).optional(),
  physical: z
    .object({ state: z.string().max(300).optional(), solubility: z.string().max(400).optional(), phStability: z.string().max(300).optional(), meltingPoint: z.string().max(200).optional() })
    .optional(),
  composition: z.string().max(1500).optional(),
});

const PatchZ = z
  .object({
    name: z.string().trim().min(2).max(80),
    aliases: z.array(z.string().max(120)).max(60),
    kind: z.enum(["compound", "mixture", "polymer"]),
    sectors: z.array(z.enum(["food", "beauty", "cleaning"])).min(1),
    primaryCategory: z.string().max(80),
    primaryRole: z.string().max(80),
    origin: z.enum(["natural", "mineral", "fermented", "semi_synthetic", "synthetic"]),
    healthScore: z.number().int().min(0).max(100),
    scoreRationale: z.string().max(1500),
    concerns: z.array(z.string().max(40)).max(12),
    summary: z.string().max(2000),
    identity: IdentityZ,
    profile: ProfileZ,
  })
  .partial();

adminRouter.put("/ingredients/:id", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  const patch = PatchZ.safeParse(req.body);
  if (!patch.success) return res.status(400).json({ error: "Invalid fields", issues: patch.error.issues.slice(0, 5) });
  repo.patchIngredient(ing.id, patch.data);
  repo.logAudit(ing.id, "edited", Object.keys(patch.data).join(", "));
  if (ing.status === "verified") broadcast({ type: "ingredient.updated", id: ing.id, name: ing.name });
  res.json(repo.getAdminIngredient(ing.id));
});

adminRouter.get("/pubchem/search", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  if (!q) return res.json({ items: [] });
  try {
    res.json({ items: await pubchem.searchCandidates(q) });
  } catch {
    res.status(502).json({ error: "PubChem is not responding" });
  }
});

adminRouter.get("/ingredients/:id/sdf", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).end();
  let cached = repo.getSdf(ing.id);
  if (!cached && ing.pubchemCid) {
    const fetched = await pubchem.fetchSdf(ing.pubchemCid).catch(() => null);
    if (fetched) {
      repo.setSdf(ing.id, fetched.sdf, fetched.source);
      cached = fetched;
    }
  }
  if (!cached) return res.status(404).json({ error: "No structure on file" });
  res.json(cached);
});

/** Step 2 of the review: confirm the exact PubChem CID behind the 3D viewer. */
adminRouter.post("/ingredients/:id/model", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  const cid = z.coerce.number().int().positive().safeParse(req.body?.cid);
  if (!cid.success) return res.status(400).json({ error: "Enter a numeric PubChem CID" });
  const compound = await pubchem.getByCid(cid.data).catch(() => null);
  if (!compound) return res.status(404).json({ error: `PubChem has no compound ${cid.data}` });
  const sdf = await pubchem.fetchSdf(cid.data).catch(() => null);
  repo.patchIngredient(ing.id, {
    pubchemCid: cid.data,
    identity: {
      ...ing.identity,
      formula: compound.formula ?? ing.identity.formula,
      weight: compound.weight ?? ing.identity.weight,
      iupac: compound.iupac ?? ing.identity.iupac,
      smiles: compound.smiles ?? ing.identity.smiles,
    },
  });
  repo.setSdf(ing.id, sdf?.sdf ?? null, sdf?.source ?? null);
  repo.logAudit(ing.id, "model_confirmed", `PubChem CID ${cid.data}${sdf ? ` (${sdf.source})` : " (no 3D conformer)"}`);
  res.json({ ingredient: repo.getAdminIngredient(ing.id), structure: sdf?.source ?? null });
});

/** Alternative: upload a curated .SDF file (full control over the 3D viewer). */
adminRouter.post("/ingredients/:id/sdf", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  const sdf = String(req.body?.sdf ?? "");
  if (sdf.length > 2_000_000 || !/V[23]000/.test(sdf) || !sdf.includes("M  END")) {
    return res.status(400).json({ error: "That doesn't look like a valid MDL SDF/MOL file" });
  }
  repo.setSdf(ing.id, sdf, "upload");
  repo.logAudit(ing.id, "sdf_uploaded", `${sdf.length} bytes`);
  res.json({ ingredient: repo.getAdminIngredient(ing.id) });
});

adminRouter.delete("/ingredients/:id/sdf", async (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  const sdf = ing.pubchemCid ? await pubchem.fetchSdf(ing.pubchemCid).catch(() => null) : null;
  repo.setSdf(ing.id, sdf?.sdf ?? null, sdf?.source ?? null);
  res.json({ ingredient: repo.getAdminIngredient(ing.id) });
});

/** Step 3: "Approve & Verify" → status: verified, pushed to every client instantly. */
adminRouter.post("/ingredients/:id/approve", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  if (!ing.profile) return res.status(400).json({ error: "Add a profile before approving" });
  repo.patchIngredient(ing.id, { status: "verified", verifiedAt: new Date().toISOString() });
  repo.logAudit(ing.id, "verified", `Approved & verified; affects ${repo.scansContaining(ing.id).length} saved scans`);
  broadcast({ type: "ingredient.verified", id: ing.id, name: ing.name });
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
  res.json(repo.getAdminIngredient(ing.id));
});

adminRouter.post("/ingredients/:id/unverify", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  repo.patchIngredient(ing.id, { status: "needs_verification", verifiedAt: null });
  repo.logAudit(ing.id, "unverified", "Returned to the review queue");
  broadcast({ type: "ingredient.updated", id: ing.id, name: ing.name });
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
  res.json(repo.getAdminIngredient(ing.id));
});

adminRouter.post("/ingredients/:id/rerun", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  repo.enqueueJob(ing.id);
  repo.logAudit(ing.id, "research_requeued");
  res.json(repo.getAdminIngredient(ing.id));
});

adminRouter.post("/ingredients/:id/merge", (req, res) => {
  const into = String(req.body?.into ?? "");
  if (!repo.getIngredient(req.params.id) || !repo.getIngredient(into) || into === req.params.id) {
    return res.status(400).json({ error: "Choose a different existing ingredient to merge into" });
  }
  repo.mergeIngredient(req.params.id, into);
  repo.logAudit(into, "merged", `Merged duplicate "${req.params.id}"`);
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
  res.json({ ok: true, into });
});

adminRouter.delete("/ingredients/:id", (req, res) => {
  const ing = repo.getIngredient(req.params.id);
  if (!ing) return res.status(404).json({ error: "Not found" });
  repo.deleteIngredient(ing.id);
  repo.logAudit(null, "rejected", `Rejected "${ing.name}"`);
  broadcast({ type: "queue.updated", pending: repo.countByStatus().needs_verification });
  res.json({ ok: true });
});
