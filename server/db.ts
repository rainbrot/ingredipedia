// SQLite storage (Node's built-in node:sqlite). The schema is plain SQL so it ports directly to
// PostgreSQL/Supabase for a hosted deployment, as budgeted in the plan.

import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.env.ASSAY_DATA_DIR ?? "data");
mkdirSync(DATA_DIR, { recursive: true });

export const DB_PATH = path.join(DATA_DIR, process.env.ASSAY_DB ?? "assay.db");

export const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;

  CREATE TABLE IF NOT EXISTS ingredients (
    id               TEXT PRIMARY KEY,
    name             TEXT NOT NULL,
    aliases          TEXT NOT NULL DEFAULT '[]',
    kind             TEXT NOT NULL DEFAULT 'compound',
    sectors          TEXT NOT NULL DEFAULT '[]',
    primary_category TEXT NOT NULL DEFAULT '',
    primary_role     TEXT NOT NULL DEFAULT '',
    origin           TEXT NOT NULL DEFAULT 'synthetic',
    health_score     INTEGER NOT NULL DEFAULT 50,
    score_rationale  TEXT NOT NULL DEFAULT '',
    concerns         TEXT NOT NULL DEFAULT '[]',
    summary          TEXT NOT NULL DEFAULT '',
    research_count   INTEGER,
    research_term    TEXT,
    usda_count       INTEGER,
    pubchem_cid      INTEGER,
    sdf              TEXT,
    sdf_source       TEXT,
    identity         TEXT NOT NULL DEFAULT '{}',
    profile          TEXT,
    citations        TEXT NOT NULL DEFAULT '[]',
    sources          TEXT NOT NULL DEFAULT '[]',
    status           TEXT NOT NULL DEFAULT 'needs_verification',
    research_state   TEXT,
    research_error   TEXT,
    draft            TEXT,
    created_by       TEXT,
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL,
    verified_at      TEXT
  );
  CREATE INDEX IF NOT EXISTS ingredients_status ON ingredients(status);

  CREATE TABLE IF NOT EXISTS aliases (
    key           TEXT PRIMARY KEY,
    ingredient_id TEXT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS aliases_ingredient ON aliases(ingredient_id);

  CREATE TABLE IF NOT EXISTS scans (
    id         TEXT PRIMARY KEY,
    device_id  TEXT NOT NULL,
    name       TEXT NOT NULL,
    sector     TEXT NOT NULL,
    raw_text   TEXT NOT NULL,
    score      INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS scans_device ON scans(device_id, created_at);

  CREATE TABLE IF NOT EXISTS scan_items (
    scan_id         TEXT NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
    position        INTEGER NOT NULL,
    raw             TEXT NOT NULL,
    name            TEXT NOT NULL,
    labeled_organic INTEGER NOT NULL DEFAULT 0,
    match           TEXT NOT NULL,
    ingredient_id   TEXT REFERENCES ingredients(id) ON DELETE SET NULL,
    PRIMARY KEY (scan_id, position)
  );
  CREATE INDEX IF NOT EXISTS scan_items_ingredient ON scan_items(ingredient_id);

  CREATE TABLE IF NOT EXISTS jobs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    ingredient_id TEXT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    kind          TEXT NOT NULL,
    state         TEXT NOT NULL,
    attempts      INTEGER NOT NULL DEFAULT 0,
    error         TEXT,
    run_after     TEXT NOT NULL,
    created_at    TEXT NOT NULL,
    updated_at    TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS jobs_state ON jobs(state, run_after);

  CREATE TABLE IF NOT EXISTS ai_ledger (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    ingredient_id TEXT,
    purpose       TEXT NOT NULL,
    model         TEXT NOT NULL,
    input_tokens  INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    cost_usd      REAL NOT NULL,
    created_at    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    ingredient_id TEXT,
    action        TEXT NOT NULL,
    detail        TEXT,
    created_at    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blob_cache (
    key          TEXT PRIMARY KEY,
    content_type TEXT NOT NULL,
    body         BLOB NOT NULL,
    created_at   TEXT NOT NULL
  );
`);

export const now = () => new Date().toISOString();

export function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || value === "") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Runs `fn` inside a transaction, rolling back on error. */
export function tx<T>(fn: () => T): T {
  db.exec("BEGIN");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}
