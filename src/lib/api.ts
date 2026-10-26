import { deviceId } from "./device";
import type {
  AppConfig,
  BarcodeProduct,
  Ingredient,
  IngredientSummary,
  ScanListItem,
  ScanProgress,
  ScanResult,
  Sector,
} from "../../shared/types";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("X-Ingredipedia-Device", deviceId());
  if (init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  let res: Response;
  try {
    res = await fetch(`/api${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, "You appear to be offline. Check your connection and try again.");
  }
  const text = await res.text();
  const body = text ? safeJson(text) : null;
  if (!res.ok) {
    const detail = body && typeof body === "object" && "error" in body ? String((body as { error: unknown }).error) : "";
    const message = detail || `Request failed (${res.status})`;
    throw new ApiError(res.status, message, body);
  }
  return body as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  config: () => request<AppConfig>("/config"),
  stats: () => request<{ curated: number; researched: number; preliminary: number; total: number; scans: number }>("/stats"),
  lexicon: () => request<{ entries: [string, string][] }>("/lexicon"),
  barcode: (code: string, sector?: Sector) => request<BarcodeProduct>(`/barcode/${encodeURIComponent(code)}${sector ? `?sector=${sector}` : ""}`),
  myths: () => request<{ items: { ingredientId: string; ingredientName: string; claim: string; consensus: string }[] }>("/learn/myths"),
  report: (id: string, reason: string) =>
    request<{ ok: true; requeued: boolean }>(`/ingredients/${encodeURIComponent(id)}/report`, { method: "POST", body: JSON.stringify({ reason }) }),

  scans: () => request<{ items: ScanListItem[] }>("/scans"),
  scan: (id: string) => request<ScanResult & { owned: boolean }>(`/scans/${encodeURIComponent(id)}`),
  renameScan: (id: string, name: string) => request<{ ok: true }>(`/scans/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ name }) }),
  deleteScan: (id: string) => request<{ ok: true }>(`/scans/${encodeURIComponent(id)}`, { method: "DELETE" }),
  deleteMyData: () => request<{ deleted: number }>("/me", { method: "DELETE" }),

  ingredients: (params: { q?: string; sector?: Sector; sort?: string; status?: string; limit?: number; offset?: number }) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") qs.set(k, String(v));
    return request<{ items: IngredientSummary[]; total: number }>(`/ingredients?${qs}`);
  },
  ingredient: (id: string) => request<Ingredient>(`/ingredients/${encodeURIComponent(id)}`),

  aiOcr: (image: string) =>
    request<{ ingredientsText: string; productName: string | null; sector: Sector | null; legible: boolean }>("/ocr", {
      method: "POST",
      body: JSON.stringify({ image }),
    }),

  /** Streams pipeline progress (newline-delimited JSON) while the label is analyzed. */
  async analyze(
    input: { sector: Sector; text: string; name?: string; barcode?: string; imageUrl?: string },
    onProgress: (p: ScanProgress) => void,
  ): Promise<ScanResult> {
    let res: Response;
    try {
      res = await fetch("/api/scans", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Ingredipedia-Device": deviceId() },
        body: JSON.stringify(input),
      });
    } catch {
      throw new ApiError(0, "You appear to be offline. Check your connection and try again.");
    }
    if (!res.ok || !res.body) {
      const body = safeJson(await res.text()) as { error?: string } | null;
      throw new ApiError(res.status, body?.error ?? "Analysis failed");
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (value) buffer += decoder.decode(value, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line) continue;
        const msg = JSON.parse(line) as ScanProgress;
        if (msg.type === "result") return msg.scan;
        if (msg.type === "error") throw new ApiError(422, msg.message);
        onProgress(msg);
      }
      if (done) break;
    }
    throw new ApiError(500, "The analysis ended unexpectedly. Please try again.");
  },
};
