// Krantzpower: offline cache. Data stay in localStorage, never in this cache.
const CACHE = "krantzpower-v3";
const ASSETS = ["./", "index.html", "manifest.json", "icon.svg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  const put = resp => { if (resp && (resp.ok || resp.type === "opaque")) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return resp; };
  // The app page: network first, so a new version shows up as soon as you're online.
  if (e.request.mode === "navigate" || u.pathname.endsWith("/") || u.pathname.endsWith("index.html")) {
    e.respondWith(fetch(e.request).then(put).catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
    return;
  }
  // Everything else (icon, manifest, fonts): cache first.
  if (u.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(put)));
  }
});
