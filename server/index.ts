import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { publicRouter } from "./routes/public";
import { aiEnabled, AI_MODEL } from "./services/ai";
import { startWorker } from "./services/pipeline";
import { loadSeedIfEmpty } from "./seed/load";
import * as repo from "./repo";

// In development the API runs beside Vite on API_PORT; in production one server uses PORT.
const PORT = Number(
  (process.env.NODE_ENV === "production" ? (process.env.PORT ?? process.env.API_PORT) : process.env.API_PORT) ?? 8787,
);
const app = express();

app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "12mb" }));
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use("/api", publicRouter);
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

// In production the API also serves the built web app.
const dist = path.resolve("dist");
if (process.env.NODE_ENV === "production" && existsSync(dist)) {
  app.use(express.static(dist, { index: false, maxAge: "1h" }));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[server]", err);
  res.status(500).json({ error: "Unexpected server error" });
});

const seeded = loadSeedIfEmpty();
repo.reindexAliases();
startWorker();

app.listen(PORT, () => {
  console.log(`Assay API listening on http://localhost:${PORT}`);
  if (seeded) console.log(`Loaded ${seeded} curated ingredient profiles into the database`);
  console.log(aiEnabled() ? `AI pipeline enabled (${AI_MODEL})` : "AI pipeline off: using extractive drafts (set ANTHROPIC_API_KEY to enable)");
});
