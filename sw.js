const CACHE = 'gemeos-hoje-v4';
const ARQUIVOS = [
  '/',
  '/index.html',
  '/leitura.html',
  '/tarot.html',
  '/hermetismo.html',
  '/numerologia.html',
  '/palpites.html',
  '/meditacoes.html',
  '/sonhos.html',
  '/arquetipos.html',
  '/conhecimento.html',
  '/compatibilidade.html',
  '/filosofia.html',
  '/mitologia.html',
  '/vieses.html',
  '/quemsomos.html',
  '/privacidade.html',
  '/contato.html',
  '/alquimia.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(ARQUIVOS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Ignora requisições que não sejam GET
  if (e.request.method !== 'GET') return;

  // Ignora Google Ads e Analytics (não cachear)
  const url = e.request.url;
  if (url.includes('googlesyndication') || url.includes('googletagmanager') || url.includes('doubleclick')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Só cacheia respostas válidas e do mesmo domínio
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return response;
      });
    }).catch(() => {
      // Fallback para navegação offline
      if (e.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
