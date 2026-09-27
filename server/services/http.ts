// Small HTTP helpers: per-host rate limiting (PubChem allows 5 req/s, NCBI 3 req/s without a key),
// timeouts, and retry on transient failures.

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export class RateLimiter {
  private last = 0;
  private chain: Promise<void> = Promise.resolve();
  constructor(private minIntervalMs: number) {}

  schedule(): Promise<void> {
    const next = this.chain.then(async () => {
      const wait = this.last + this.minIntervalMs - Date.now();
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      this.last = Date.now();
    });
    this.chain = next.catch(() => undefined);
    return next;
  }
}

const USER_AGENT = "Assay/1.0 (ingredient research; +https://github.com/)";

export async function fetchWithRetry(
  url: string,
  opts: { limiter?: RateLimiter; timeoutMs?: number; retries?: number; accept?: string } = {},
): Promise<Response> {
  const { limiter, timeoutMs = 15_000, retries = 2, accept } = opts;
  let attempt = 0;
  for (;;) {
    if (limiter) await limiter.schedule();
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        headers: { "User-Agent": USER_AGENT, ...(accept ? { Accept: accept } : {}) },
      });
      if ((res.status === 429 || res.status === 503 || res.status >= 500) && attempt < retries) {
        attempt++;
        await new Promise((r) => setTimeout(r, 600 * attempt));
        continue;
      }
      return res;
    } catch (err) {
      if (attempt < retries) {
        attempt++;
        await new Promise((r) => setTimeout(r, 600 * attempt));
        continue;
      }
      throw err;
    }
  }
}

export async function getJson<T>(url: string, opts: Parameters<typeof fetchWithRetry>[1] = {}): Promise<T | null> {
  const res = await fetchWithRetry(url, { ...opts, accept: "application/json" });
  if (res.status === 404) return null;
  if (!res.ok) throw new HttpError(res.status, `${res.status} from ${new URL(url).host}`);
  return (await res.json()) as T;
}

export async function getText(url: string, opts: Parameters<typeof fetchWithRetry>[1] = {}): Promise<string | null> {
  const res = await fetchWithRetry(url, opts);
  if (res.status === 404) return null;
  if (!res.ok) throw new HttpError(res.status, `${res.status} from ${new URL(url).host}`);
  return await res.text();
}
