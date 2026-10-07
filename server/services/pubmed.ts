// PubMed via NCBI E-utilities: publication counts (the "most/least researched" sort) and
// abstracts that ground automatic research and the citations shown on every profile.

import { RateLimiter, getJson, getText } from "./http";
import type { Citation } from "../../shared/types";

const BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const hasKey = () => !!process.env.NCBI_API_KEY;
// NCBI allows 3 req/s without a key and 10 req/s with one.
const limiter = new RateLimiter(hasKey() ? 120 : 400);

function common(): string {
  const params = new URLSearchParams({ tool: "assay" });
  if (process.env.NCBI_API_KEY) params.set("api_key", process.env.NCBI_API_KEY);
  if (process.env.NCBI_EMAIL) params.set("email", process.env.NCBI_EMAIL);
  return params.toString();
}

/** Exact-phrase title/abstract query so "water" doesn't match every paper that mentions a water bath. */
export function phraseTerm(name: string): string {
  const clean = name.replace(/["[\]]/g, "").trim();
  return `"${clean}"[tiab]`;
}

export class PubMedUnavailableError extends Error {}

interface ESearch {
  esearchresult?: { count?: string; idlist?: string[]; ERROR?: string };
  error?: string;
}

// Circuit breaker: after an outage, fail fast for a few minutes instead of stalling every scan.
let downUntil = 0;

export function pubmedAvailable(): boolean {
  return Date.now() >= downUntil;
}

/** E-utilities reports backend outages and rate limits inside a 200 response; retry, then surface them. */
async function esearch(params: string): Promise<NonNullable<ESearch["esearchresult"]>> {
  if (!pubmedAvailable()) throw new PubMedUnavailableError("PubMed is temporarily unavailable");
  for (let attempt = 0; ; attempt++) {
    const data = await getJson<ESearch>(`${BASE}/esearch.fcgi?db=pubmed&retmode=json&${params}&${common()}`, { limiter });
    const problem = data?.error ?? data?.esearchresult?.ERROR;
    if (!problem && data?.esearchresult) return data.esearchresult;
    if (attempt >= 2) {
      downUntil = Date.now() + 5 * 60_000;
      throw new PubMedUnavailableError(problem ?? "Empty PubMed response");
    }
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
}

export async function publicationCount(name: string): Promise<number | null> {
  const result = await esearch(`retmax=0&term=${encodeURIComponent(phraseTerm(name))}`);
  const n = Number(result.count);
  return Number.isFinite(n) ? n : null;
}

export async function searchIds(term: string, retmax = 6): Promise<string[]> {
  const result = await esearch(`sort=relevance&retmax=${retmax}&term=${encodeURIComponent(term)}`);
  return result.idlist ?? [];
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function decode(xml: string): string {
  return xml
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e: string) => {
      if (e.startsWith("#x")) return String.fromCodePoint(parseInt(e.slice(2), 16));
      if (e.startsWith("#")) return String.fromCodePoint(parseInt(e.slice(1), 10));
      return ENTITIES[e] ?? m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : undefined;
}

/** Fetches article metadata and abstracts for PMIDs (XML parsed without dependencies). */
export async function fetchArticles(ids: string[]): Promise<Citation[]> {
  if (ids.length === 0) return [];
  const url = `${BASE}/efetch.fcgi?db=pubmed&retmode=xml&id=${ids.join(",")}&${common()}`;
  const xml = await getText(url, { limiter, timeoutMs: 25_000 });
  if (!xml) return [];
  const articles = xml.split(/<PubmedArticle>/).slice(1);
  return articles.map((block) => {
    const pmid = tag(block, "PMID") ?? "";
    const title = tag(block, "ArticleTitle") ?? "Untitled";
    const journal = tag(block, "ISOAbbreviation") ?? tag(block, "Title");
    const yearMatch = block.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/) ?? block.match(/<MedlineDate>(\d{4})/);
    const abstractParts = [...block.matchAll(/<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g)].map(
      (m) => (m[1] ? `${m[1][0]}${m[1].slice(1).toLowerCase()}: ` : "") + decode(m[2]),
    );
    const authors = [...block.matchAll(/<Author[^>]*>[\s\S]*?<LastName>([^<]+)<\/LastName>[\s\S]*?(?:<Initials>([^<]+)<\/Initials>)?[\s\S]*?<\/Author>/g)]
      .slice(0, 3)
      .map((m) => `${decode(m[1])}${m[2] ? ` ${m[2]}` : ""}`);
    const authorCount = (block.match(/<Author[\s>]/g) ?? []).length;
    const doi = block.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/)?.[1] ?? block.match(/<ELocationID EIdType="doi"[^>]*>([^<]+)<\/ELocationID>/)?.[1];
    return {
      pmid,
      doi: doi ? decode(doi) : undefined,
      title,
      journal,
      year: yearMatch ? Number(yearMatch[1]) : undefined,
      authors: authors.length ? `${authors.join(", ")}${authorCount > 3 ? " et al." : ""}` : undefined,
      abstract: abstractParts.join(" ").trim() || undefined,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
    } satisfies Citation;
  });
}

/**
 * Retrieves the most relevant papers on mechanism, safety and chemistry for an ingredient.
 * Several focused queries are merged so the extraction sees each part of the profile blueprint.
 */
export async function researchPapers(name: string, perQuery = 3): Promise<Citation[]> {
  const phrase = phraseTerm(name);
  const queries = [
    `${phrase} AND (mechanism OR "mode of action" OR pathway OR enzyme)`,
    `${phrase} AND (toxicity OR safety OR "risk assessment" OR allergy OR dermatitis)`,
    `${phrase} AND (reaction OR synthesis OR oxidation OR degradation OR biodegradation)`,
  ];
  const ids: string[] = [];
  for (const q of queries) {
    for (const id of await searchIds(q, perQuery)) if (!ids.includes(id)) ids.push(id);
  }
  if (ids.length === 0) {
    for (const id of await searchIds(phrase, 5)) ids.push(id);
  }
  const articles = await fetchArticles(ids.slice(0, 9));
  return articles.filter((a) => a.abstract && a.abstract.length > 120);
}
