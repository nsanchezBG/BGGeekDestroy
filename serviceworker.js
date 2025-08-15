const CACHE_NAME = 'geek-destroy-cache-v5'; // Subimos la versión
const urlsToCache = [
  './', // La página principal
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Rutas relativas para las imágenes
  './LogoApp.png',
  './IconoTrabajo.png',
  './IconoVidaPersonal.png',
  './IconoGustos.png',
  './IconoTrabajoInner.png',
  './IconoVidaPersonalInner.png',
  './IconoGustosInner.png',
  './IconoBack.png',
  // La fuente de Google
  'https://fonts.googleapis.com/css2?family=Young+Serif&display=swap'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } }))));
});
