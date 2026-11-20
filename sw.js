/* ZTalk service worker - offline app shell */
const CACHE = "ztalk-v1";
const ASSETS = [
  "/", "/index.html", "/styles.css", "/app.js", "/manifest.webmanifest", "/icon.svg",
  "https://cdn.jsdelivr.net/npm/hanzi-writer@3.6.0/dist/hanzi-writer.min.js",
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(clients.claim());
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});
