// Nombre del caché y la lista de archivos que queremos almacenar en caché
const cacheName = "todo-cache-v1";
const assets = [
  // pagina de inicio
  "./",
  // archivo html principal
  "./index.html",
  // estilo css
  "./style.css",
  // archivo js principal
  "./app.js",
  // archivo manifest de la aplicacion
  "./manifest.json",
  // icono de 192px para dispositivos moviles
  "./images/icon-192.png",
  // icono de 512px para dispositivos moviles
  "./images/icon-512.png",
];

// Evento de instalación, ocurre la primera vez que el service worker se registra
self.addEventListener("install", (e) => {
  // Espera a que todos los archivos estén en caché antes de completar la instalación
  e.waitUntil(
    caches
      // Abre o crea el caché con el nombre especificado
      .open(cacheName)
      .then((cache) => {
        // agrega todos los archivos en "assets" al caché y despues fuerza al SW a activarse inmediatamente después de instalarse
        return cache.addAll(assets).then(() => self.skipWaiting());
      })
      //   Log de errores en caso de que falle
      .catch((err) => console.log("Falló el registro en cache", err))
  );
});

// Evento de activación: Se ejecuta después de que el SW se instala y toma el control de la activación
self.addEventListener("activate", (e) => {
  // Lista de cachés permitidos (whitelist) que queremos conservar
  const cacheWhiteList = [cacheName];
  // Elimina caches antiguos que no están en la lista de permitidos
  e.waitUntil(
    // obtiene todos los nombres de caché actuales
    caches
      .keys()
      .then((cacheNames) => {
        // mapea y elimina que no están en la whitelist
        return Promise.all(
          cacheNames.map((cName) => {
            // Si el cache actual no esta en la whitelist, eliminalo
            if (!cacheWhiteList.includes(cName)) {
              // Elimina el caché obsoleto
              return caches.delete(cName);
            }
          })
        );
      })
      // Toma el control de los clientes inmediatamente despues de activarse
      .then(() => self.clients.claim())
  );
});

//Evento fetch: intercepta las solicitudes de red y decide como responder 
self.addEventListener("fetch", e=>{
    e.respondeWith(caches.match(e.request).then(res=>{
        if(res){
            return res
        }
        return fetch(e.request)
    }))
})
