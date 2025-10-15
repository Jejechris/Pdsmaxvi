// Service Worker - Development Mode
// Cache aggressiveness disabled for easier development

const CACHE_NAME = 'pdsmaxvi-dev-v3'; // Increment version to force cache clear
const DEV_MODE = true; // Set to false for production

const ASSETS = [
  'index.html', 'style.css', 'app.js', 'pdsmaxvi.jpg',
  'galeri.html', 'harapan.html', 'pesan.html', 'quiz.html', 
  'struktur.html', 'surat.html', 'awards.html', 'estafet.html', 'surat-unik.html',
  'firebase-config.js', 'questions.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force activate immediately
  if (!DEV_MODE) {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  }
});

self.addEventListener('activate', (e) => {
  // Delete all old caches
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  
  if (DEV_MODE) {
    // Development: Always fetch from network (no cache)
    e.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
  } else {
    // Production: Cache-first strategy
    e.respondWith(
      caches.match(req).then(cached => 
        cached || fetch(req).then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          return res;
        }).catch(() => cached)
      )
    );
  }
});
