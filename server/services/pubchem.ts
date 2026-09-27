// PubChem PUG-REST / PUG-View client: identity, properties, GHS hazards, regulatory and use data,
// plus 2D images and 3D conformers for the molecule viewers.

import { HttpError, RateLimiter, fetchWithRetry, getJson, getText } from "./http";

const BASE = "https://pubchem.ncbi.nlm.nih.gov/rest";
const limiter = new RateLimiter(220); // PubChem policy: at most 5 requests/second

export interface PubChemCompound {
  cid: number;
  title: string;
  formula?: string;
  weight?: number;
  iupac?: string;
  smiles?: string;
}

interface PropertyTable {
  PropertyTable: { Properties: Record<string, string | number>[] };
}

function toCompound(p: Record<string, string | number>): PubChemCompound {
  return {
    cid: Number(p.CID),
    title: String(p.Title ?? ""),
    formula: p.MolecularFormula ? String(p.MolecularFormula) : undefined,
    weight: p.MolecularWeight ? Number(p.MolecularWeight) : undefined,
    iupac: p.IUPACName ? String(p.IUPACName) : undefined,
    smiles: p.SMILES ? String(p.SMILES) : p.ConnectivitySMILES ? String(p.ConnectivitySMILES) : undefined,
  };
}

const PROPS = "Title,MolecularFormula,MolecularWeight,IUPACName,SMILES,ConnectivitySMILES";

/** Resolves a label name to a compound. Returns null when PubChem has no match (mixtures, botanicals, brand names). */
export async function findByName(name: string): Promise<PubChemCompound | null> {
  const url = `${BASE}/pug/compound/name/${encodeURIComponent(name)}/property/${PROPS}/JSON`;
  try {
    const data = await getJson<PropertyTable>(url, { limiter });
    const first = data?.PropertyTable?.Properties?.[0];
    return first ? toCompound(first) : null;
  } catch (err) {
    // PubChem answers 400 for names it cannot parse; treat as "not found".
    if (err instanceof HttpError && err.status === 400) return null;
    throw err;
  }
}

export async function getByCid(cid: number): Promise<PubChemCompound | null> {
  const data = await getJson<PropertyTable>(`${BASE}/pug/compound/cid/${cid}/property/${PROPS}/JSON`, { limiter });
  const first = data?.PropertyTable?.Properties?.[0];
  return first ? toCompound(first) : null;
}

export async function synonyms(cid: number): Promise<string[]> {
  const data = await getJson<{ InformationList: { Information: { Synonym?: string[] }[] } }>(
    `${BASE}/pug/compound/cid/${cid}/synonyms/JSON`,
    { limiter },
  );
  return data?.InformationList?.Information?.[0]?.Synonym ?? [];
}

export function casFromSynonyms(list: string[]): string | undefined {
  return list.find((s) => /^\d{2,7}-\d{2}-\d$/.test(s));
}

export function eNumberFromSynonyms(list: string[]): string | undefined {
  const hit = list.find((s) => /^E\s?\d{3}[a-z]?$/i.test(s.trim()));
  return hit ? hit.replace(/\s/g, "").toUpperCase() : undefined;
}

interface ViewInfo {
  Name?: string;
  Value?: { StringWithMarkup?: { String?: string }[]; Number?: number[]; Unit?: string };
  ReferenceNumber?: number;
}
interface ViewSection {
  TOCHeading?: string;
  Information?: ViewInfo[];
  Section?: ViewSection[];
}
interface ViewRecord {
  Record?: { Section?: ViewSection[]; Reference?: { ReferenceNumber: number; SourceName?: string }[] };
}

export interface ViewEntry {
  heading: string;
  name: string;
  text: string;
  source?: string;
}

/** Fetches one PUG-View heading (e.g. "GHS Classification", "Methods of Manufacturing") as flat text entries. */
export async function viewHeading(cid: number, heading: string): Promise<ViewEntry[]> {
  const url = `${BASE}/pug_view/data/compound/${cid}/JSON?heading=${encodeURIComponent(heading)}`;
  let data: ViewRecord | null;
  try {
    data = await getJson<ViewRecord>(url, { limiter, timeoutMs: 20_000 });
  } catch (err) {
    if (err instanceof HttpError && (err.status === 400 || err.status === 404)) return [];
    throw err;
  }
  if (!data?.Record) return [];
  const refs = new Map((data.Record.Reference ?? []).map((r) => [r.ReferenceNumber, r.SourceName]));
  const out: ViewEntry[] = [];
  const walk = (sections: ViewSection[] | undefined) => {
    for (const sec of sections ?? []) {
      for (const info of sec.Information ?? []) {
        const strings = info.Value?.StringWithMarkup?.map((s) => s.String ?? "").filter(Boolean) ?? [];
        let text = strings.join(" | ").trim();
        if (!text && info.Value?.Number?.length) text = `${info.Value.Number.join(", ")} ${info.Value.Unit ?? ""}`.trim();
        if (!text) continue;
        out.push({
          heading: sec.TOCHeading ?? heading,
          name: info.Name ?? "",
          text,
          source: info.ReferenceNumber ? refs.get(info.ReferenceNumber) : undefined,
        });
      }
      walk(sec.Section);
    }
  };
  walk(data.Record.Section);
  // PubChem often repeats the same statement from several depositors.
  const seen = new Set<string>();
  return out.filter((e) => {
    const k = e.text.toLowerCase().slice(0, 160);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function pubchemUrl(cid: number, heading?: string) {
  return `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}${heading ? `#section=${encodeURIComponent(heading.replace(/\s+/g, "-"))}` : ""}`;
}

/** 3D conformer (SDF). Falls back to the 2D record, which the viewer can still show flat. */
export async function fetchSdf(cid: number): Promise<{ sdf: string; source: "pubchem-3d" | "pubchem-2d" } | null> {
  const three = await getText(`${BASE}/pug/compound/cid/${cid}/SDF?record_type=3d`, { limiter }).catch((err) => {
    if (err instanceof HttpError && err.status === 400) return null;
    throw err;
  });
  if (three && three.includes("V2000")) return { sdf: three, source: "pubchem-3d" };
  const two = await getText(`${BASE}/pug/compound/cid/${cid}/SDF?record_type=2d`, { limiter }).catch(() => null);
  if (two && two.includes("V2000")) return { sdf: two, source: "pubchem-2d" };
  return null;
}

export async function fetchStructurePng(cid: number): Promise<Uint8Array | null> {
  const res = await fetchWithRetry(`${BASE}/pug/compound/cid/${cid}/PNG?image_size=600x600`, { limiter });
  if (!res.ok) return null;
  return new Uint8Array(await res.arrayBuffer());
}

// ---------------------------------------------------------------------------
// Interpreting PubChem data

export interface HazardFacts {
  signal?: string;
  hCodes: string[];
  statements: string[];
}

export function parseGhs(entries: ViewEntry[]): HazardFacts {
  const hCodes = new Set<string>();
  const statements = new Set<string>();
  let signal: string | undefined;
  for (const e of entries) {
    if (/signal/i.test(e.name) && !signal) signal = e.text.split("|")[0].trim();
    if (/hazard statements/i.test(e.name)) {
      for (const part of e.text.split("|")) {
        const m = part.match(/(H\d{3}[A-Za-z]?(?:\+H\d{3})*)\s*(?:\(([\d.]+)%\))?\s*:\s*([^[]+)/);
        // ECHA notifications are aggregated; ignore hazards claimed by only a small minority of notifiers.
        if (m && (m[2] === undefined || Number(m[2]) >= 10)) {
          m[1].split("+").forEach((c) => hCodes.add(c));
          statements.add(`${m[1]}: ${m[3].trim()}`);
        }
      }
    }
  }
  return { signal, hCodes: [...hCodes].sort(), statements: [...statements].slice(0, 8) };
}

/**
 * Converts GHS hazard codes and regulatory signals into a 0–100 consumer health score.
 * Used for brand-new ingredients until an admin reviews them.
 */
export function heuristicScore(h: HazardFacts, signals: { cirSafe?: boolean; saferChoiceGreen?: boolean; fdaListed?: boolean }): {
  score: number;
  concerns: string[];
  rationale: string;
} {
  let score = 78;
  const concerns = new Set<string>();
  const reasons: string[] = [];
  const has = (re: RegExp) => h.hCodes.some((c) => re.test(c));

  if (has(/^H3(40|41|50|51|60|61|62)/)) {
    score = Math.min(score, 22);
    concerns.add("carcinogen_flag");
    reasons.push("GHS classification includes carcinogenic, mutagenic or reproductive-toxicity hazard statements");
  }
  if (has(/^H3(00|01|10|11|30|31)/)) {
    score -= 22;
    reasons.push("acute toxicity at high exposure");
  } else if (has(/^H3(02|12|32)/)) {
    score -= 8;
    reasons.push("harmful if swallowed or inhaled in concentrated form");
  }
  if (has(/^H314/)) {
    score -= 22;
    concerns.add("corrosive");
    reasons.push("corrosive when concentrated");
  } else if (has(/^H318/)) {
    score -= 10;
    concerns.add("irritant");
    reasons.push("can seriously damage eyes when concentrated");
  } else if (has(/^H31[59]/)) {
    score -= 6;
    concerns.add("irritant");
    reasons.push("skin or eye irritant when concentrated");
  }
  if (has(/^H317/)) {
    score -= 22;
    concerns.add("sensitizer");
    reasons.push("can cause allergic skin reactions");
  }
  if (has(/^H334/)) {
    score -= 15;
    concerns.add("respiratory");
    reasons.push("respiratory sensitizer");
  }
  if (has(/^H37[0-3]/)) {
    score -= 12;
    reasons.push("organ toxicity with prolonged high exposure");
  }
  if (has(/^H4(00|10|11)/)) {
    score -= 8;
    concerns.add("environmental");
    reasons.push("toxic to aquatic life");
  }
  if (has(/^H22[4-6]/)) {
    score -= 3;
    concerns.add("flammable");
  }
  if (signals.cirSafe) {
    score += 6;
    reasons.push("the Cosmetic Ingredient Review panel found it safe as used");
  }
  if (signals.saferChoiceGreen) {
    score += 8;
    reasons.push("EPA Safer Choice lists it as verified low concern");
  }
  if (signals.fdaListed) {
    score += 3;
    reasons.push("it appears in the FDA inventory of substances added to food");
  }
  if (h.hCodes.length === 0 && !signals.cirSafe && !signals.saferChoiceGreen) {
    reasons.push("no GHS hazard classification was found");
  }
  score = Math.max(8, Math.min(92, Math.round(score)));
  const rationale = reasons.length
    ? `Provisional score from public hazard data: ${reasons.join("; ")}. GHS hazards describe the pure substance, not the diluted amount in a product.`
    : "Provisional score from public hazard data.";
  return { score, concerns: [...concerns], rationale };
}

export function firstSentences(text: string, n = 2, maxLen = 420): string {
  const clean = text.replace(/\s+/g, " ").replace(/\s\|\s/g, " ").trim();
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [clean];
  let out = sentences.slice(0, n).join("").trim();
  if (out.length > maxLen) out = `${out.slice(0, maxLen - 1).replace(/\s\S*$/, "")}…`;
  return out;
}

/** Candidate compounds for an admin search box (name, synonym or CID). */
export async function searchCandidates(query: string): Promise<PubChemCompound[]> {
  const q = query.trim();
  if (/^\d+$/.test(q)) {
    const c = await getByCid(Number(q));
    return c ? [c] : [];
  }
  let cids: number[] = [];
  try {
    const data = await getJson<{ IdentifierList?: { CID?: number[] } }>(`${BASE}/pug/compound/name/${encodeURIComponent(q)}/cids/JSON`, { limiter });
    cids = data?.IdentifierList?.CID?.slice(0, 5) ?? [];
  } catch (err) {
    if (err instanceof HttpError && err.status === 400) return [];
    throw err;
  }
  if (cids.length === 0) return [];
  const data = await getJson<PropertyTable>(`${BASE}/pug/compound/cid/${cids.join(",")}/property/${PROPS}/JSON`, { limiter });
  return (data?.PropertyTable?.Properties ?? []).map(toCompound);
}
