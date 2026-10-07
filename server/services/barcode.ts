// Barcode → product lookup in the open, crowd-sourced Open Food Facts family of databases.
// No API key needed. Results (including misses) are cached so repeat scans are instant.

import { RateLimiter, getJson } from "./http";
import { cacheGet, cachePut } from "../repo";
import type { BarcodeProduct, Sector } from "../../shared/types";

const limiter = new RateLimiter(300);

const DATABASES: { host: string; name: string; sector: Sector }[] = [
  { host: "world.openfoodfacts.org", name: "Open Food Facts", sector: "food" },
  { host: "world.openbeautyfacts.org", name: "Open Beauty Facts", sector: "beauty" },
  { host: "world.openproductsfacts.org", name: "Open Products Facts", sector: "cleaning" },
];

interface OffResponse {
  status?: number;
  product?: {
    product_name?: string;
    product_name_en?: string;
    brands?: string;
    ingredients_text?: string;
    ingredients_text_en?: string;
    image_front_small_url?: string;
    image_front_url?: string;
  };
}

/** Accepts EAN-8, UPC-A, EAN-13 and GTIN-14; validates the GS1 check digit. */
export function normalizeBarcode(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (![8, 12, 13, 14].includes(digits.length)) return null;
  const body = digits.slice(0, -1);
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    const n = Number(body[body.length - 1 - i]);
    sum += i % 2 === 0 ? n * 3 : n;
  }
  const check = (10 - (sum % 10)) % 10;
  return check === Number(digits.at(-1)) ? digits : null;
}

const FIELDS = "product_name,product_name_en,brands,ingredients_text,ingredients_text_en,image_front_small_url,image_front_url";

export async function lookupBarcode(code: string, preferred?: Sector): Promise<BarcodeProduct | null> {
  const key = `barcode:${code}`;
  const hit = cacheGet(key);
  if (hit) {
    const cached = JSON.parse(Buffer.from(hit.body).toString("utf8")) as { product: BarcodeProduct | null; at: number };
    const fresh = cached.product ? Date.now() - cached.at < 30 * 86400_000 : Date.now() - cached.at < 86400_000;
    if (fresh) return cached.product;
  }

  const order = preferred ? [...DATABASES].sort((a, b) => Number(b.sector === preferred) - Number(a.sector === preferred)) : DATABASES;
  let found: BarcodeProduct | null = null;
  for (const db of order) {
    const data = await getJson<OffResponse>(`https://${db.host}/api/v2/product/${code}.json?fields=${FIELDS}`, {
      limiter,
      timeoutMs: 10_000,
      retries: 1,
    }).catch(() => null);
    const p = data?.product;
    if (!data || data.status !== 1 || !p) continue;
    const ingredientsText = (p.ingredients_text_en || p.ingredients_text || "").trim();
    found = {
      barcode: code,
      name: (p.product_name_en || p.product_name || "").trim() || "Unnamed product",
      brand: p.brands?.split(",")[0]?.trim() || null,
      ingredientsText,
      imageUrl: p.image_front_small_url || p.image_front_url || null,
      sector: db.sector,
      source: db.name,
      sourceUrl: `https://${db.host}/product/${code}`,
    };
    if (ingredientsText) break; // keep looking in other databases if this record has no ingredient list
  }
  cachePut(key, "application/json", new TextEncoder().encode(JSON.stringify({ product: found, at: Date.now() })));
  return found;
}
