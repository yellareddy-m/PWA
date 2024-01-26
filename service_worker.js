const STATIC_ASSETS = ["/PWA-Offline-Image-Viewer/", "/PWA-Offline-Image-Viewer/src/js/app.js", "/PWA-Offline-Image-Viewer/src/style.css"];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open('static').then(function (cache) {
            cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener("activate", function () {
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    )
})