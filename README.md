# Assay: every label is a chemistry lesson

**Scan the food, skincare and cleaning products you already own. Assay identifies every ingredient, shows you the
molecule, explains what it does in the product and in your body, scores the product out of 100, and turns it all
into lessons, quizzes and a molecule collection.**

Built for students and classrooms. It's an installable web app (PWA) that runs on phones, tablets and desktops from
one codebase. It works without accounts, API keys or human moderators: profiles that aren't in the curated library
are researched and published automatically from PubChem and PubMed, with citations.

---

## Quick start

Requires **Node.js 22.13+** (for the built-in `node:sqlite`).

```bash
npm install
npm run setup     # copies .env.example to .env (every key in it is optional)
npm run dev       # API on :8787, web app on http://localhost:5173
```

- Open **http://localhost:5173**. Scan a barcode, photograph a label, or try a sample label. Samples run through the
  same OCR pipeline as a real photo.
- **Learn** has ten interactive lessons, Myth or Fact, the glossary and your molecule collection.
- The database seeds itself on first run with **65 curated ingredient profiles** (`data/seed.json`).

Production:

```bash
npm run build
npm start         # one server on PORT (default 8787) serves the API and the built app
```

### Optional keys (`.env`)

| Variable | What it adds |
| --- | --- |
| `ANTHROPIC_API_KEY` | AI extraction from PubMed/PubChem text for new ingredients, and enhanced label reading. Uses `claude-haiku-4-5` (override with `AI_MODEL`). Without it, automatic research summarizes the source text directly. |
| `NCBI_API_KEY`, `NCBI_EMAIL` | Raise PubMed E-utilities limits from 3 to 10 requests per second. |
| `USDA_API_KEY` | “Found in N branded U.S. foods” counts. The rate-limited public `DEMO_KEY` is used otherwise. |

---

## What's in it

### Scan
- **Barcode:** live camera detection (native `BarcodeDetector`, ZXing fallback), photo, or typed digits. Looks up the
  full ingredient list and product photo in Open Food Facts, Open Beauty Facts and Open Products Facts.
- **Label OCR, on-device (Tesseract.js):** picks the sharpest of six camera frames, auto-inverts light-on-dark labels,
  applies adaptive (Bradley–Roth) thresholding, runs a second recognition pass when confidence is low, scores both
  readings against ingredient vocabulary, and corrects likely misreads (“Sodlum” → “Sodium”) with an OCR-aware edit
  distance. The review screen lists every correction (with undo), highlights faint words, and marks which
  ingredients are already in the library.

### Understand
- **Product page:** 0–100 rating, plain-language summary, organic and natural ingredients isolated, artificial
  ingredients sortable by most or least healthy and most or least researched (real PubMed counts). Also suggests
  lessons and builds a short quiz from the product's own label.
- **Ingredient profiles, in tabs:**
  - **Overview:** what the molecule is, why it's in the product, its 2D structure and rotatable 3D model, and its identity and physical properties.
  - **Mechanisms:** each one explained at the chemical scale and the biological scale, with an evidence meter.
  - **Reactions:** step-by-step mechanisms with equations and the result.
  - **Safety:** regulatory status, hazards (each with a chemical and a biological mechanism), dose and exposure, myths vs. evidence, and environmental profile.
  - **Synthesis:** biological, chemical and industrial routes.
  - **Sources:** PubMed citations, the source documents, and a report button that triggers fresh research.
- **Glossary everywhere:** about 60 terms are tappable in profiles and lessons, each with a definition and a link to its lesson.

### Learn
- **Ten lessons with interactive models:**

  | Lesson | Interactive model |
  | --- | --- |
  | Reading labels | Label decoder |
  | The dose makes the poison | Caffeine dose calculator |
  | Natural vs. synthetic | Vanillin from two sources |
  | Acids, bases and pH | pH scale explorer |
  | Surfactants | Micelle simulator |
  | Preservatives | Henderson–Hasselbalch “pH trap” slider |
  | Free radicals | Lipid peroxidation stepper |
  | Allergies and haptens | Sensitization diagram |
  | Chirality | (R)- and (S)-limonene side by side in 3D |
  | Judging evidence | Study-ranking exercise |

  Each lesson ends with a quiz.
- **Myth or Fact:** claims drawn from profiles plus verified facts, with streaks and explanations.
- **Molecule collection:** every profile you open is “discovered”; undiscovered molecules show as silhouettes.
- **For teachers:** copy a lesson link or print a worksheet (all steps plus the quiz). Progress stays on each device,
  so there's no student data to manage.

---

## Automatic research pipeline (no human in the loop)

| Step | What happens |
| --- | --- |
| Match | Exact, alias, E-number, INCI and OCR-tolerant fuzzy matching against the library. |
| Instant profile | Unknown ingredients get a **preliminary** profile at once from chemistry rules and PubChem (GHS hazards, FDA, CIR, JECFA, EPA Safer Choice). |
| Research | A durable background job pulls PubMed abstracts and PubChem sections, then publishes an **auto-researched** profile: an overview, two-scale mechanisms, GHS-based hazard mechanisms, manufacturing and citations. Thinly described ingredients still get a real explanation of what their role means chemically. |
| Sync | Server-Sent Events push “research finished” to every open client; product scores update live. |
| Correction | “Report a problem” on any profile re-runs research automatically (rate-limited to once a day per profile). |

**Curated** profiles (the 65 in the seed) are written with sources and refreshed automatically for new evidence.

---

## Architecture

```
Browser (React 19 + Vite PWA)                    Node API (Express 5, TypeScript)
┌───────────────────────────────┐  /api/*       ┌───────────────────────────────────────────┐
│ Scan: barcode · camera · OCR  │ ────────────▶ │ barcode lookup (Open *Facts, cached)      │
│   Tesseract.js + correction   │ NDJSON stream │ parse → match → instant profile → score   │
│ Product · Ingredient (tabs)   │ ◀──────────── │ background worker: PubChem + PubMed →     │
│ Learn: lessons, quiz, myths   │               │   automatic profile → publish             │
│ 3Dmol.js · service worker     │ ◀── SSE ───── │ broadcast “researched” to every client    │
└───────────────────────────────┘               └───────────────────────────────────────────┘
          PubChem · PubMed E-utilities · USDA FDC · Open Food/Beauty/Products Facts · Claude (optional)
```

```
shared/        types, label parser, OCR-aware edit distance, formula renderer, scoring + summary
server/        index.ts, db.ts, repo.ts, routes/public.ts,
               services/{pipeline,pubchem,pubmed,usda,barcode,ai,extractive,roles,matcher,events}.ts
server/seed/   base content (content/*.ts), deep educational profiles (deep/*.ts), enrichment script
src/           pages/, components/ (Tabs, GlossaryText, Quiz, MoleculeViewer…), learn/ (lessons, widgets,
               glossary, facts), lib/ (api, ocr, correct, barcode, progress), styles/
tests/         Vitest unit tests
```

Scripts: `npm run dev`, `npm run build`, `npm start`, `npm test`, `npm run typecheck`,
`npm run seed` (rebuild `data/seed.json` from PubChem/PubMed), `npm run seed -- --content` (rebuild from the content
files offline), `npm run seed -- --load` (reload the database from `data/seed.json`).

- **Storage:** Node's built-in SQLite (`data/assay.db`), plain SQL that ports directly to PostgreSQL.
- **Resilience:** per-host rate limiters, retries, a PubMed circuit breaker, durable jobs that resume after restart,
  and automatic evidence backfill.
- **Privacy:** no accounts; history is keyed to a random device ID; photos are read on-device; barcode lookups send
  only the number; learning progress never leaves the device; “Delete my data” erases scans.
- **Accessibility:** WAI-ARIA tabs with arrow-key navigation, labeled controls, keyboard-operable crop box and
  models, visible focus, reduced-motion support, color never the only signal, WCAG-contrast tokens in light and dark.

---

## Scoring

Each ingredient has a 0–100 score for typical consumer exposure (90+ essentially benign; below 35 notable hazards).
The product score is a label-position–weighted average (weight `1 / (1 + 0.25·(position − 1))`), minus a penalty
for any ingredient under 45 that doesn't fade with position, plus up to +6 for certified-organic share and minus up
to 6 for long lists of synthetic additives. Confidence reflects the share of fully researched profiles; scores
update automatically when research on a new ingredient finishes.

## Data sources and open-source libraries

Data: PubChem (NIH/NCBI), PubMed via NCBI E-utilities, USDA FoodData Central, Open Food Facts / Open Beauty Facts /
Open Products Facts (ODbL), and FDA/CIR/JECFA/EPA regulatory data as republished by PubChem.

Libraries: React, React Router, Vite, Express, Tesseract.js (Apache-2.0), ZXing (Apache-2.0), 3Dmol.js
(BSD-3-Clause), Zod, Anthropic TypeScript SDK, Lucide icons (ISC), Fontsource (Newsreader, IBM Plex; OFL-1.1). The
full list with licenses is in the in-app About page.

Development note: this project was built with AI assistance (Claude Code).

Assay provides educational information, not medical advice.
