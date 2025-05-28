const CACHE_NAME = 'visiting-card-v1';
const OFFLINE_URL = 'offline.html';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/avatar.png',
  '/qr-phone.png',
  '/qr-telegram.png',
  '/qr-vk.png',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
