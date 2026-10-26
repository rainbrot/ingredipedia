// Anonymous per-install id. Ingredipedia has no accounts; this id keys scan history and draft visibility.

const KEY = "ingredipedia.device";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `d-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

let cached: string | null = null;

export function deviceId(): string {
  if (cached) return cached;
  try {
    cached = localStorage.getItem(KEY);
    if (!cached) {
      cached = randomId();
      localStorage.setItem(KEY, cached);
    }
  } catch {
    cached ??= randomId(); // private mode: stable for this session only
  }
  return cached;
}

export function resetDeviceId() {
  cached = randomId();
  try {
    localStorage.setItem(KEY, cached);
  } catch {
    /* ignore */
  }
}
