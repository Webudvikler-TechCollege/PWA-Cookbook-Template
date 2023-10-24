//Navn og vision på cache samling 
const staticCacheName = 'stite-static-v1.4'

const dynamicCacheName = 'site-dynamic-v1'

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
//forskell på parantesser ved event (check it)
self.addEventListener('fetch',  event => {
    // console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return (cacheRes)
        })

    )


})

// Fetch event
self.addEventListener('fetch', event => {
	// Kontroller svaret på vores request
	event.respondWith(
		// Kig efter file match i cache 
		caches.match(event.request).then(cacheRes => {
			// Returner match fra cache - ellers hent fil på server
			return cacheRes || fetch(event.request).then(async fetchRes => {
				// Tilføjer nye sider til cachen
				return caches.open(dynamicCacheName).then(cache => {
					// Bruger put til at tilføje sider til vores cache
					// Læg mærke til metoden clone
					cache.put(event.request.url, fetchRes.clone())
					// Returnerer fetch request
					return fetchRes
				})
			})
		})
	)
})

