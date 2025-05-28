const CACHE_NAME = 'visiting-card-v3';
const OFFLINE_URL = 'offline.html';
const PRECACHE_URLS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'avatar.png',
  'github-qr.png',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  OFFLINE_URL
];

// Установка и кэширование ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование основных ресурсов');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация и очистка старых кэшей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Стратегия "Сначала кэш, потом сеть" с fallback для оффлайн-режима
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
  }
});
