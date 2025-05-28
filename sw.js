const CACHE_NAME = "card-v1";
const OFFLINE_URL = "offline.html";

const FILES = [
  "./",           // Важно добавить для GitHub Pages
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "offline.html",
  "avatar.png",    // Изменён путь
  "github-qr.png",   // Изменён путь
  "icon-192.png", // Изменён путь
  "icon-512.png"  // Изменён путь
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    e.respondWith(
      caches.match(e.request)
        .then(r => r || fetch(e.request))
    );
  }
});
