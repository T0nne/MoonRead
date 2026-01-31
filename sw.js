// ==================== SERVICE WORKER - MoonRead PWA ====================
const CACHE_VERSION = 'moonread-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const STATIC_ASSETS = [
    '/',
    '/manhwa-reader.html',
    '/manifest.json'
];

// ==================== INSTALAÇÃO ====================
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// ==================== ATIVAÇÃO ====================
self.addEventListener('activate', (event) => {
    console.log('[SW] Ativando...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name.startsWith('moonread-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// ==================== FETCH ====================
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    // Cache First para imagens
    if (event.request.url.includes('/chapters/') || event.request.url.includes('/manhwa-images/')) {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    // Network First para o resto
    event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// ==================== MENSAGENS ====================
self.addEventListener('message', (event) => {
    if (event.data?.type === 'CACHE_CHAPTER') {
        const { imageUrls } = event.data;
        cacheImages(imageUrls).then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});

async function cacheImages(urls) {
    const cache = await caches.open(RUNTIME_CACHE);
    await Promise.all(
        urls.map(url => fetch(url).then(r => r.ok && cache.put(url, r)).catch(() => {}))
    );
}
