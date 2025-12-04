# Bunny Storage Uploader (Next.js)

Subidor mínimo y funcional de archivos a Bunny Storage con Next.js.
Incluye un formulario simple y un endpoint `POST /api/upload`.
Usa la Storage API (PUT con `AccessKey`) para enviar el archivo.
Pensado para integración rápida y pruebas locales sin complejidad.

![dEMO](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/bunny-storage-uploader-nextjs.png)

## Configuración

1. Crea `.env.local` con:

```
BUNNY_ACCESS_KEY=tu_api_key
BUNNY_STORAGE_ZONE=tu_storage_zone
BUNNY_STORAGE_HOST=storage.bunnycdn.com
```

2. Instala y ejecuta:

```
npm install
npm run dev
```

## Uso

- Abre `http://localhost:3000`.
- Selecciona un archivo y pulsa "Subir archivo".
- El backend hace `PUT https://storage.bunnycdn.com/{zone}/{filename}` con header `AccessKey`.

## Endpoint

- `POST /api/upload` (multipart/form-data, campo `file`)
- Respuesta: `{ message, path }`
