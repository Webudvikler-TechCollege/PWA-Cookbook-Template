//Navn og vision på cache samling 
const staticCacheName = 'stite-static-v1.4'

const dynamicCacheName = 'site-dynamic-v1'

const assets = [
    "/",
    "/index.html",
    "/css/styles.css",
	"/fallback.html"

]

caches.open("my-cache").then((cache) => {
	cache.addAll(assets);
  });
  
  
  // Install event here
  self.addEventListener("install", (event) => {
	console.log("Service Worker has been installed");
  
	event.waitUntil(
	  caches.open(staticCacheName).then((cache) => {
		cache.addAll(assets).catch((error) => {
		  console.log(error, "Der er en fejl");
		});
	  })
	);
  });
  
  // Activate event
  self.addEventListener("activate", (event) => {
	console.log("Service Worker has been activated");
	event.waitUntil(
	  caches.keys().then((keys) => {
		return Promise.all(
		  keys
  
			.filter((key) => key !== staticCacheName)
  
			.map((key) => caches.delete(key))
		);
	  })
	);
  });
  
  // Fetch event here
  self.addEventListener("fetch", (event) => {
	if (!(event.request.url.indexOf("http") === 0)) return;
  
	event.respondWith(
	  caches.match(event.request).then((cacheRes) => {
		return (
		  cacheRes ||
		  fetch(event.request).then(async (fetchRes) => {
			if (fetchRes.status === 404) {
			  console.log("Serving fallback page for 404 error");
			  return caches.match("/fallback.html");
			}
  
			return caches.open(dynamicCacheName).then((cache) => {
			  cache.put(event.request.url, fetchRes.clone());
			  return fetchRes;
			  
			});
		  })
		);
	  })
       .catch(() => {
	      if(event.request.url.indexOf('.html') > -1) {
		    return caches.match('/fallback.html')
	           }
})
	);
  });

	// LimitCashe is here
	const limitCacheTwo = (cacheName, numberOfAllowedFiles) => {
	  caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
		  if (keys.length > numberOfAllowedFiles) {
			cache
			  .delete(keys[0])
			  .then(limitCacheTwo(caches, numberOfAllowedFiles));
		  }
		});
	  });
	};
  
	limitCacheTwo(dynamicCacheName, 2);
