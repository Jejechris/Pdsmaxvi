const CACHE_NAME = 'pdsmaxvi-v1';
const ASSETS = [
  'index.html', 'style.css', 'pdsmaxvi.jpg', '03.mp3',
  'galeri.html', 'harapan.html', 'pesan.html', 'quiz.html', 'struktur.html', 'surat.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
      return res;
    }).catch(() => cached))
  );
});

