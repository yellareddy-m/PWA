const STATIC_ASSETS = ["/", "/src/js/app.js", "/src/style.css", "/src/images/random.jpg"];

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