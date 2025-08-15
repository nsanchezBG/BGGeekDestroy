const CACHE_NAME = 'geek-destroy-cache-v13'; // Subimos la versión
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './questions.json',
  
  // ÍCONOS DE LA APP AÑADIDOS AL CACHÉ
  './favicon.ico',
  './apple-touch-icon.png',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './favicon-16x16.png',
  './favicon-32x32.png',

  // ÍCONOS DEL JUEGO (los que ya tenías)
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

// El resto del archivo no cambia
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } }))));
});
