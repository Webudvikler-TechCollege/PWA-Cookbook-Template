const staticCacheName = 'stite-static-v1.6'

const assets = [
    "/",
    "/index.html",
    "/css/styles.css"
]


// Install event cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('write asset file to cache');
            cache.addAll(assets)
        })
    )


	console.log('Service Worker has been installed');
})

// Install Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
})

// Fetch event
self.addEventListener('fetch', event => {
	console.log('Fetch event is here!', event)
})

//activate event
self.addEventListener('activate', (event) => {
	console.log(' activate event is here!', event);

    event.waitUntil(
        caches.keys().then(keys => {
            const filteredkeys = keys.filter(key => key !== staticCacheName )
            // console.log(filteredkeys);
            filteredkeys.map(key => {
                caches.delete(key)
            })


            // keys.filter(key => key !== staticCacheName).map
        })
    )
    // console.log(caches.keys)


})