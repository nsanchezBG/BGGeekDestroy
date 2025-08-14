const CACHE_NAME = 'geek-destroy-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Young+Serif&display=swap',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/LogoApp.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoTrabajo.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoVidaPersonal.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoGustos.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoTrabajoInner.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoVidaPersonalInner.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoGustosInner.png',
  'https://raw.githubusercontent.com/nsanchezBG/BGGeekDestroy/main/IconoBack.png'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } }))));
});
