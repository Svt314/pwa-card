const CACHE_NAME = 'visiting-card-v1';
const OFFLINE_URL = 'offline.html';
const PRECACHE_URLS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'avatar.png',
  'github-qr.png',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  OFFLINE_URL
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(OFFLINE_URL))
  );
});
