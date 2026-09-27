import { deviceId } from "./device";
import type {
  AdminIngredient,
  AppConfig,
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
  headers.set("X-Assay-Device", deviceId());
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
  stats: () => request<{ verified: number; pending: number; scans: number }>("/stats"),

  scans: () => request<{ items: ScanListItem[] }>("/scans"),
  scan: (id: string) => request<ScanResult & { owned: boolean }>(`/scans/${encodeURIComponent(id)}`),
  renameScan: (id: string, name: string) => request<{ ok: true }>(`/scans/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ name }) }),
  deleteScan: (id: string) => request<{ ok: true }>(`/scans/${encodeURIComponent(id)}`, { method: "DELETE" }),
  deleteMyData: () => request<{ deleted: number }>("/me", { method: "DELETE" }),

  ingredients: (params: { q?: string; sector?: Sector; sort?: string; limit?: number; offset?: number }) => {
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
  async analyze(input: { sector: Sector; text: string; name?: string }, onProgress: (p: ScanProgress) => void): Promise<ScanResult> {
    let res: Response;
    try {
      res = await fetch("/api/scans", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Assay-Device": deviceId() },
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

// ---------------------------------------------------------------------------
// Admin

export interface AdminOverview {
  counts: { verified: number; needs_verification: number };
  queue: (IngredientSummary & { createdAt: string; scanCount: number; draftModel: string | null })[];
  jobs: Record<string, number>;
  ai: {
    enabled: boolean;
    model: string;
    month: { calls: number; inputTokens: number; outputTokens: number; costUsd: number; ingredients: number };
    allTime: { calls: number; inputTokens: number; outputTokens: number; costUsd: number; ingredients: number };
    costPerIngredient: number | null;
  };
  activeDevices30d: number;
  totalScans: number;
  liveClients: number;
  audit: { id: number; ingredientId: string | null; name: string | null; action: string; detail: string | null; createdAt: string }[];
}

export interface PubChemCandidate {
  cid: number;
  title: string;
  formula?: string;
  weight?: number;
  iupac?: string;
}

export const adminApi = {
  login: (passcode: string) => request<{ token: string; expiresAt: number }>("/admin/login", { method: "POST", body: JSON.stringify({ passcode }) }),
  overview: (t: string) => request<AdminOverview>("/admin/overview", {}, t),
  list: (t: string, params: { q?: string; status?: string; sort?: string }) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
    return request<{ items: IngredientSummary[]; total: number }>(`/admin/ingredients?${qs}`, {}, t);
  },
  get: (t: string, id: string) => request<AdminIngredient>(`/admin/ingredients/${encodeURIComponent(id)}`, {}, t),
  update: (t: string, id: string, patch: Partial<Ingredient>) =>
    request<AdminIngredient>(`/admin/ingredients/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(patch) }, t),
  sdf: (t: string, id: string) => request<{ sdf: string; source: string }>(`/admin/ingredients/${encodeURIComponent(id)}/sdf`, {}, t),
  searchPubChem: (t: string, q: string) => request<{ items: PubChemCandidate[] }>(`/admin/pubchem/search?q=${encodeURIComponent(q)}`, {}, t),
  setModel: (t: string, id: string, cid: number) =>
    request<{ ingredient: AdminIngredient; structure: string | null }>(`/admin/ingredients/${encodeURIComponent(id)}/model`, { method: "POST", body: JSON.stringify({ cid }) }, t),
  uploadSdf: (t: string, id: string, sdf: string) =>
    request<{ ingredient: AdminIngredient }>(`/admin/ingredients/${encodeURIComponent(id)}/sdf`, { method: "POST", body: JSON.stringify({ sdf }) }, t),
  approve: (t: string, id: string) => request<AdminIngredient>(`/admin/ingredients/${encodeURIComponent(id)}/approve`, { method: "POST" }, t),
  unverify: (t: string, id: string) => request<AdminIngredient>(`/admin/ingredients/${encodeURIComponent(id)}/unverify`, { method: "POST" }, t),
  rerun: (t: string, id: string) => request<AdminIngredient>(`/admin/ingredients/${encodeURIComponent(id)}/rerun`, { method: "POST" }, t),
  merge: (t: string, id: string, into: string) =>
    request<{ ok: true; into: string }>(`/admin/ingredients/${encodeURIComponent(id)}/merge`, { method: "POST", body: JSON.stringify({ into }) }, t),
  reject: (t: string, id: string) => request<{ ok: true }>(`/admin/ingredients/${encodeURIComponent(id)}`, { method: "DELETE" }, t),
};
