// Ingredipedia service worker: offline app shell, cached profiles and structures, and the data lessons need.
const VERSION = "ingredipedia-v3";
const SHELL = `${VERSION}-shell`;
const DATA = `${VERSION}-data`;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(["/", "/logo.png", "/logo-dark.png", "/favicon-64.png", "/manifest.webmanifest"])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isCachedData = (url) =>
  /^\/api\/ingredients\/[^/]+(\/(sdf|structure\.png))?$/.test(url.pathname) ||
  /^\/api\/molecule\/\d+\/(sdf|structure\.png)$/.test(url.pathname) ||
  ["/api/ingredients", "/api/learn/myths", "/api/lexicon", "/api/stats", "/api/config"].includes(url.pathname);

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages: network first, fall back to the cached shell when offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("/")));
    return;
  }

  // Hashed build assets and fonts never change: cache first.
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(SHELL).then((c) => c.put(req, copy));
            return res;
          }),
      ),
    );
    return;
  }

  // Profiles, structures and lesson data: stale-while-revalidate so previously used ones work offline.
  if (isCachedData(url)) {
    event.respondWith(
      caches.open(DATA).then(async (cache) => {
        const hit = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || network;
      }),
    );
  }
});
