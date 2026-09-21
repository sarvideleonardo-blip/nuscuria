# NUSCURIA

NUSCURIA es un bestiario interactivo: transforma palabras y versos en organismos biopoéticos con órganos, geometría, sonido, color y relaciones. Es una aplicación React + Vite completamente estática; los datos del bestiario se conservan en el navegador mediante `localStorage`.

## Requisitos

- Node.js 20 o posterior.
- npm 10 o posterior (incluido con las versiones actuales de Node.js).

No necesitas configurar Supabase ni claves de API para ejecutar la versión actual. La aplicación no realiza llamadas al servidor.

## Ejecutar en local

```bash
git clone https://github.com/sarvideleonardo-blip/nuscuria.git
cd nuscuria
npm install
npm run dev
```

Vite mostrará una URL local, normalmente `http://localhost:3000`. Ábrela en el navegador.

Para exponer el servidor de desarrollo a otros equipos de tu red, ejecuta:

```bash
npm run dev -- --host 0.0.0.0
```

## Cómo usar NUSCURIA

1. En **El Traductor Expandido**, escribe una palabra, nombre o verso; el organismo se actualiza al escribir. También puedes usar una sugerencia.
2. Pulsa **Registrar en Bestiario** para guardar ese organismo en el navegador.
3. En **El Bestiario Emergente**, filtra y selecciona especies. Al abrir una entidad en el traductor, su texto se carga automáticamente.
4. Explora el **Bosque de Relaciones**, arrastra nodos o crea una relación nueva. Puedes traducir un nodo para generar un organismo desde su nombre.
5. En el **Gabinete de Órganos**, selecciona una lámina anatómica y usa **Traducir Criatura** para partir de ese órgano.
6. En el **Hibridador de Quimeras**, elige o escribe dos progenitores y fusiónalos; luego guarda el resultado en el bestiario.

> Los registros se guardan con la clave `nuscuria_bestiary` en el almacenamiento local del navegador. Para reiniciar la colección, borra los datos del sitio desde las herramientas del navegador.

## Validar y crear una compilación de producción

```bash
npm run lint
npm run build
```

La compilación estática queda en `dist/`. Puedes previsualizarla localmente con:

```bash
npm run preview
```

## Desplegar

### Vercel

1. Sube este repositorio a GitHub.
2. En Vercel, selecciona **Add New → Project** e importa el repositorio.
3. Conserva la configuración detectada para Vite:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Pulsa **Deploy**.

También puedes desplegar desde la terminal después de iniciar sesión en Vercel:

```bash
npx vercel
```

Para un despliegue de producción:

```bash
npx vercel --prod
```

### Netlify

1. Sube este repositorio a GitHub.
2. En Netlify, selecciona **Add new site → Import an existing project** y conecta el repositorio.
3. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Pulsa **Deploy site**.

Como alternativa de terminal:

```bash
npx netlify deploy --build
npx netlify deploy --prod --dir=dist
```

### Cualquier hosting estático

Ejecuta `npm run build` y publica el contenido de `dist/` en Cloudflare Pages, GitHub Pages (con una configuración de base adecuada), S3/CloudFront u otro servidor de archivos estáticos. No hace falta un proceso Node.js en producción.

## Variables de entorno

Actualmente no hay variables de entorno requeridas por la aplicación. El archivo `.env.example` se conserva como una plantilla de integración futura; no incluyas secretos en el repositorio.
