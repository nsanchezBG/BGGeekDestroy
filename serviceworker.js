const CACHE_NAME = 'geek-destroy-cache-v6'; // Subimos la versión de nuevo
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './questions.json', // ¡AÑADIDO IMPORTANTE!
  './LogoApp.png',
  './IconoTrabajo.png',
  './IconoVidaPersonal.png',
  './IconoGustos.png',
  './IconoTrabajoInner.png',
  './IconoVidaPersonalInner.png',
  './IconoGustosInner.png',
  './IconoBack.png',
  'https://fonts.googleapis.com/css2?family=Young+Serif&display=swap'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } }))));
});
