# Assay — ingredient scanner

**Scan any food, beauty or cleaning label. Get a 0–100 health rating and the peer-reviewed science behind every ingredient.**

Assay reads an ingredient list with OCR, isolates organic and natural ingredients, sorts the artificial ones by
health or by how well-researched they are, writes a plain-language summary with a rating out of 100, and opens a
five-section scientific profile for every ingredient, including an interactive 3D molecule. New ingredients go
through the draft → research → human review → global publication pipeline described in the app plan.

It is an installable web app (PWA) that works on phones, tablets and desktops from one codebase.

---

## Quick start

Requires **Node.js 22.13+** (for the built-in `node:sqlite`).

```bash
npm install
npm run setup     # creates .env with a random admin passcode
npm run dev       # API on :8787, web app on http://localhost:5173
```

- Open **http://localhost:5173** and tap **Scan a label**. No product handy? Pick one of the sample labels; they run
  through the same OCR pipeline as a real photo.
- The reviewer dashboard is at **/admin**. Sign in with `ADMIN_PASSCODE` from `.env`.
- The database is seeded on first run with **65 scientist-written, verified ingredient profiles** (`data/seed.json`).

Production:

```bash
npm run build
npm start         # one server on PORT (default 8787) serves the API and the built app
```

### Optional keys (`.env`)

| Variable | What it enables |
| --- | --- |
| `ANTHROPIC_API_KEY` | The AI pipeline: “Basic AI Draft”, grounded extraction from PubMed/PubChem text, and enhanced AI label reading. Uses `claude-haiku-4-5`, the plan's “small, low-cost AI model” (override with `AI_MODEL`). Without a key, Assay uses an on-device extractive summarizer and name heuristics, so every feature still works. |
| `NCBI_API_KEY`, `NCBI_EMAIL` | Raise PubMed E-utilities limits from 3 to 10 requests per second. |
| `USDA_API_KEY` | “Found in N branded U.S. foods” counts from USDA FoodData Central. The public `DEMO_KEY` is used otherwise, which is heavily rate-limited. |

---

## How the app plan maps to features

| Plan | Where it lives |
| --- | --- |
| OCR text scanner for Food / Beauty & Care / Cleaning | `src/pages/Scan.tsx`: live camera, photo upload, paste, or sample label → crop → on-device **Tesseract.js** OCR (or Claude vision when enabled) → editable review with live parsing |
| Isolate organic ingredients | Product page “Organic & natural” group: certified-organic by label (prefix or `*` footnote) plus natural/mineral origin |
| Sort artificial ingredients: most unhealthy, most healthy, most researched, least researched | Product page segmented control. “Researched” is the real PubMed publication count. |
| Product summary + rating out of 100 | `shared/scoring.ts`: position-weighted score, concern penalties, organic bonus, confidence, generated summary and highlights |
| Complete Ingredient Profile Blueprint, sections 1–5 | `src/pages/Ingredient.tsx`: identity table (IUPAC, INCI, CAS, E-number, formula, molar mass), physical properties, functional groups, **2D skeletal diagram** and **rotatable 3D WebGL model** (3Dmol.js from PubChem conformers), reactions with rendered equations, biological mechanisms, regulatory table, toxicology + dosage context, sensitization, myth vs. science, synthesis steps + equations, environmental profile, history, surprising uses, natural occurrence, and PubMed/DOI citations |
| 1. Initial scan & instant draft | `server/services/pipeline.ts` `processScan` → database match (exact / alias / E-number / OCR-tolerant fuzzy) → PubChem facts (GHS hazards, FDA, CIR, JECFA, EPA Safer Choice) → “Basic AI Draft” visible **only to users who scanned it** → `status: needs_verification` |
| 2. Automated scientific retrieval | Durable background job queue: PubMed E-utilities abstracts + PubChem sections → context-grounded extraction that cites source IDs and flags any field written from general knowledge |
| 3. Admin review (1–2 min per item) | `/admin`: flagged queue, fact-check view (draft side-by-side with the attached abstracts, cited sources highlighted), **3D model confirmation** (PubChem search / CID / `.SDF` upload), edit form + JSON editor, **Approve & Verify**, merge duplicates, reject |
| 4. Global publication & permanent caching | Approval flips `status: verified` and is **pushed instantly to every open client** over Server-Sent Events (live toast + rescored products). Profiles, 2D images and 3D structures are cached permanently; AI never re-runs for a verified ingredient. |
| Cost table | `/admin` → Pipeline & costs: the plan's estimates next to live, metered AI spend (tokens and cost per ingredient) |

---

## Architecture

```
Browser (React + Vite PWA)                       Node API (Express, TypeScript)
┌──────────────────────────────┐   /api/*       ┌──────────────────────────────────────────┐
│ Scan: camera/upload → crop → │ ─────────────▶ │ parse → match → draft (PubChem + AI)     │
│   Tesseract.js OCR (on-device)│  NDJSON stream │   └─ scan scored & saved (SQLite)        │
│ Product · Ingredient · Library│ ◀───────────── │ background worker: PubMed + PubChem →    │
│ 3Dmol.js WebGL viewer         │                │   grounded extraction → review queue     │
│ Service worker (offline)      │ ◀── SSE ────── │ admin: approve → broadcast “verified”    │
└──────────────────────────────┘                └──────────────────────────────────────────┘
                                                   PubChem · PubMed E-utilities · USDA FDC · Claude (optional)
```

- **Storage:** Node's built-in SQLite (`data/assay.db`). The schema is plain SQL and ports directly to PostgreSQL/Supabase.
- **Resilience:** per-host rate limiters (PubChem 5/s, NCBI 3/s), retries, a PubMed circuit breaker, durable jobs that
  resume after a restart, and automatic evidence backfill for profiles missing publication counts or citations.
- **Privacy:** no accounts; history is keyed to a random device ID; photos are read on-device unless enhanced AI
  reading is switched on; “Delete my data” in About erases scans.
- **Accessibility:** semantic landmarks, labeled controls, visible focus, keyboard-operable crop box, reduced-motion
  support, color never the only signal, WCAG-contrast tokens in light and dark themes.

```
shared/        types, label parser, formula renderer, scoring + summary (used by client and server)
server/        index.ts, db.ts, repo.ts, routes/{public,admin}.ts, services/{pipeline,pubchem,pubmed,usda,ai,extractive,matcher,events}.ts
server/seed/   curated profiles (content/*.ts) and the enrichment script that builds data/seed.json
src/           React app: pages/, components/, lib/ (api, ocr, events, sample labels), styles/
tests/         Vitest unit tests (parser, matcher, formulas, scoring)
```

Scripts: `npm run dev`, `npm run build`, `npm start`, `npm test`, `npm run typecheck`,
`npm run seed` (rebuild `data/seed.json` from PubChem/PubMed; `-- --load` only reloads it).

---

## Scoring

Each ingredient has a 0–100 score for typical consumer exposure (90+ essentially benign; below 35 notable hazards).
The product score is a label-position–weighted average (weight `1 / (1 + 0.25·(position − 1))`), minus a penalty
for any ingredient under 45 that doesn't fade with position, plus up to +6 for certified-organic share and minus up
to 6 for long lists of synthetic additives. Confidence reflects the share of verified profiles, and scores update
automatically when drafts are verified.

## Data sources and open-source libraries

Data: PubChem (NIH/NCBI), PubMed via NCBI E-utilities, USDA FoodData Central, and FDA/CIR/JECFA/EPA regulatory data
as republished by PubChem. Curated profiles are written for consumers and link to their primary sources.

Libraries: React, React Router, Vite, Express, Tesseract.js (Apache-2.0), 3Dmol.js (BSD-3-Clause), Zod, Anthropic
TypeScript SDK, Lucide icons (ISC), Fontsource (Newsreader, IBM Plex; OFL-1.1). The full list with licenses is in
the in-app About page.

Development note: this project was built with AI assistance (Claude Code).

Assay provides educational information, not medical advice.
