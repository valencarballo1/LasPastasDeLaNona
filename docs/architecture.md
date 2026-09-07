# Arquitectura del frontend

## Principios

1. **Separación de capas**: UI, dominio, servicios, tipos y datos mock viven en carpetas distintas. Las páginas (`src/app`) no contienen lógica de negocio, solo orquestan componentes y servicios.
2. **El frontend nunca se acopla a la forma del backend**. Todo pasa por DTOs (`src/types`) que reflejan el futuro contrato de la API en ASP.NET Core (ver `backend-contract.md`), no las entidades de Entity Framework.
3. **Mock y API real son intercambiables**. `NEXT_PUBLIC_DATA_SOURCE` decide, en un único lugar (`src/services/repositories/index.ts`), qué implementación de cada repositorio se usa. Los componentes solo conocen `src/services/*.service.ts`.

## Capas

```
components/   → solo presentación (recibe props, no llama servicios excepto en casos puntuales de UI)
features/     → hooks de dominio con estado y efectos (formularios, sesión admin, tablas admin)
services/     → funciones de alto nivel que exponen el dominio (getMenu, createProduct, ...)
services/repositories/ → interfaz + implementación mock + implementación API por entidad
types/        → DTOs compartidos con el backend
mocks/        → datos de ejemplo, explícitamente marcados como MOCK DATA
config/       → variables de entorno y configuración estática del sitio
constants/    → rutas y navegación
lib/          → utilidades puras y esquemas de validación (Zod)
```

## Flujo de datos (ejemplo: `/carta`)

```
app/(public)/carta/page.tsx
  → services/menu.service.ts#getMenu()
    → services/repositories/index.ts (elige mock o api según NEXT_PUBLIC_DATA_SOURCE)
      → mock-category.repository.ts + mock-product.repository.ts
        (o api-category.repository.ts + api-product.repository.ts cuando DATA_SOURCE=api)
```

Cuando el backend en ASP.NET Core esté disponible, cambiar `NEXT_PUBLIC_DATA_SOURCE=api` y `NEXT_PUBLIC_API_URL` es la única acción necesaria para que toda la web pase a consumir datos reales — sin tocar componentes ni páginas.

## Rutas

### Públicas (`src/app/(public)`)

| Ruta | Descripción |
| --- | --- |
| `/` | Home |
| `/carta` | Carta del restaurante (HTML dinámico, no PDF) |
| `/fabrica` | Catálogo de la fábrica de pastas |
| `/eventos` | Pizza Party / Pasta Party + formulario de presupuesto |
| `/nosotros` | Historia de la marca |
| `/contacto` | Datos de contacto, mapa y horarios |
| `/producto/[slug]` | Detalle de producto |

### Admin (`src/app/admin`)

| Ruta | Descripción |
| --- | --- |
| `/admin/login` | Login (mock) |
| `/admin` | Dashboard |
| `/admin/productos` | Listado + filtros + acciones |
| `/admin/productos/nuevo` | Alta de producto |
| `/admin/productos/[id]` | Edición de producto |
| `/admin/categorias` | Gestión de categorías (restaurante / fábrica) |
| `/admin/imagenes` | Imágenes de la web, agrupadas por sección |
| `/admin/eventos` | Solicitudes de presupuesto |
| `/admin/configuracion` | Datos de contacto, horarios, textos |

`/admin/login` vive fuera del grupo `(dashboard)` para no compartir el sidebar; el resto de las rutas admin están bajo `src/app/admin/(dashboard)/layout.tsx`, que valida la sesión mock y redirige a `/admin/login` si no existe.

## Imágenes

Hay dos tipos de imagen y se administran por separado:

1. **Imágenes de los platos** (`ProductDto.imageUrl`). Se cargan desde el formulario del plato. Es un campo opcional: un plato sin foto se publica igual y se muestra con el placeholder de marca (`PhotoFrame`) hasta que alguien lo edite y suba una. `/admin/productos` tiene un filtro "Sin foto" y el dashboard lista los platos pendientes.

2. **Imágenes de la web** (`SiteImageDto`). Son "slots" con nombre propio: la portada del inicio, la portada de cada página, cada foto de la galería, el logo, etc. El catálogo completo vive en `src/constants/site-images.ts` y es la única fuente de verdad sobre qué imágenes existen y dónde aparece cada una; `/admin/imagenes` se construye a partir de él, agrupado por sección. El backend solo persiste pares `(clave, URL, texto alternativo)`.

```
constants/site-images.ts   → catálogo: secciones, slots, medidas y textos sugeridos
services/site-image.service.ts
  → getSiteImageMap()      → mezcla el catálogo con lo guardado y devuelve un mapa listo para pintar
components/ui/SiteImage    → pinta un slot (o el placeholder de marca si todavía no tiene foto)
```

Las páginas públicas piden el mapa una sola vez (`getSiteImageMap()`) y lo bajan por props a cada sección, para no multiplicar llamadas a la API.

### Comportamiento sin fotos

Toda la web tiene que verse terminada aunque todavía no haya una sola foto cargada. La regla es que **nada reserva un hueco vacío**:

- Los bloques editoriales (`StorySection`, `DailyMakingSection`) pasan a una columna centrada.
- La galería del inicio no se muestra si ningún slot tiene foto; el teaser de Instagram deja solo el enlace.
- Las tarjetas de plato (`ProductCard`) y las líneas de la carta (`MenuItem`) se compactan y mueven sus distintivos al cuerpo.
- Donde el marco sí es estructural (portadas, tarjetas de "Elegí tu experiencia"), `PhotoFrame` usa `tone`: oscuro sobre fondos oscuros, claro sobre crema — un rectángulo negro sobre fondo claro se lee como un agujero.

El orden de la home está pensado para el cliente antes que para el relato de marca: portada → accesos rápidos (`QuickAccess`) → destacados de la carta → fábrica y restaurante → historia → eventos → galería → dónde estamos.

### Subida de archivos

`MediaRepository.upload(file)` es la única puerta de entrada. Con `DATA_SOURCE=api` hace `POST /api/admin/media` (multipart) y guarda la URL que devuelve el backend. Con `DATA_SOURCE=mock` no hay dónde guardar el archivo, así que se reduce en el navegador y se guarda como data URL — suficiente para ver el panel funcionando de punta a punta. `PhotoFrame`, `AdminThumbnail` y `BrandLogo` detectan esas URLs embebidas (`data:`/`blob:`) y las pintan con `<img>`, porque el optimizador de `next/image` no las acepta.

## Estado en el panel admin (fase mock)

Los repositorios mock mantienen un arreglo en memoria por entidad (productos, categorías, eventos, configuración e imágenes del sitio). Como las páginas admin son Client Components, las mutaciones (crear/editar/eliminar) persisten durante la sesión del navegador mientras se navega con `next/link`, pero se reinician al recargar la página — es el comportamiento esperado de una capa de datos 100% mock, sin persistencia real. Además, el estado del panel (cliente) y el que ven las páginas públicas (servidor) son dos copias distintas del mismo mock, así que una imagen cargada desde `/admin/imagenes` no se ve todavía en la web pública. Al conectar la API en ASP.NET Core, este comportamiento pasa a ser real y consistente entre pestañas.

## Diseño

Ver `brand.md` para tokens de color, tipografía e identidad gráfica. Los tokens viven como Tailwind v4 `@theme` en `src/app/globals.css`, generando utilidades (`bg-red`, `text-gold`, `font-display`, etc.) y variables CSS reutilizables fuera de Tailwind si hiciera falta.
