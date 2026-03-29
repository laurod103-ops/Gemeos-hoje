const CACHE = 'gemeos-hoje-v3';
const ARQUIVOS = [
  './',
  './index.html',
  './leitura.html',
  './tarot.html',
  './hermetismo.html',
  './numerologia.html',
  './palpites.html',
  './meditacoes.html',
  './sonhos.html',
  './arquetipos.html',
  './conhecimento.html',
  './compatibilidade.html',
  './filosofia.html',
  './mitologia.html',
  './vieses.html',
  './quemsomos.html',
  './contato.html',
  './alquimia.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    fetch(e.request).then(response=>{
      const clone=response.clone();
      caches.open(CACHE).then(cache=>cache.put(e.request,clone));
      return response;
    }).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./index.html')))
  );
});
