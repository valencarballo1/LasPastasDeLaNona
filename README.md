# Las Pastas de la Nona — Web oficial

Frontend de la web de **Las Pastas de la Nona**, fábrica de pastas artesanal y restaurante familiar en Burzaco, Buenos Aires.

Construido con Next.js (App Router) + TypeScript + Tailwind CSS, preparado para consumir en el futuro una API REST en **ASP.NET Core**.

## Stack

- Next.js (App Router, Server Components)
- TypeScript
- Tailwind CSS v4 (design tokens vía `@theme`)
- React Hook Form + Zod
- Lucide React
- TanStack Query (reservado para cuando el admin consuma la API real)

## Primeros pasos

```bash
npm install
cp .env.example .env.local
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Variables de entorno

Ver `.env.example`. La más importante:

```bash
NEXT_PUBLIC_DATA_SOURCE=mock   # "mock" | "api"
NEXT_PUBLIC_API_URL=https://api.laspastasdelanona.com
```

Con `mock`, toda la carta, el catálogo de fábrica, los eventos y la configuración se sirven desde datos locales en `src/mocks/`. Cuando el backend en ASP.NET Core esté disponible, cambiar a `api` no requiere tocar componentes ni páginas — ver `docs/architecture.md`.

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run start     # servidor de producción
npm run lint      # ESLint
npm run format    # Prettier
```

## Estructura

```
src/
 ├── app/              # rutas (App Router): (public) y admin
 ├── components/       # ui, layout, home, menu, products, events, story, admin
 ├── features/         # lógica de dominio orientada a hooks (auth, events, ...)
 ├── services/         # capa de servicios + repositorios (mock/api)
 ├── hooks/            # hooks genéricos de UI
 ├── lib/              # utilidades y validaciones (Zod)
 ├── types/            # DTOs compartidos con el futuro backend
 ├── constants/        # rutas y navegación
 ├── config/           # configuración de entorno y del sitio
 └── mocks/            # datos de ejemplo (MOCK DATA)
```

Ver `docs/architecture.md` para el detalle de cada capa.

## Panel administrativo

Disponible en `/admin`:

| Sección | Qué permite |
| --- | --- |
| `/admin` | Resumen: platos publicados, sin stock, **platos sin foto** e imágenes de la web cargadas |
| `/admin/productos` | Crear, editar, quitar de la carta (sin borrar), marcar sin stock y eliminar platos. Filtros por categoría, estado y **fotos faltantes** |
| `/admin/categorias` | Categorías del restaurante y de la fábrica |
| `/admin/imagenes` | Todas las imágenes de la web, agrupadas por sección |
| `/admin/eventos` | Solicitudes de presupuesto |
| `/admin/configuracion` | Contacto, horarios y textos |

La web se ve terminada aunque no haya ninguna foto cargada: las secciones que dependen de imágenes se adaptan o no se muestran, en vez de dejar espacios vacíos.

### Imágenes

Los platos tienen una foto **opcional**: si no se carga ninguna, el plato se publica igual con el marco de La Nona y se puede completar más adelante editándolo. El dashboard y el filtro "Sin foto" muestran cuáles quedaron pendientes.

Las imágenes del resto de la web se administran en `/admin/imagenes`, agrupadas por dónde aparecen: cabecera del inicio, portadas de cada página, secciones del inicio, galería, Instagram, servicios de eventos, nuestra historia y marca (logo). En las dos pantallas se puede subir un archivo desde el dispositivo o pegar una URL. El catálogo de imágenes vive en `src/constants/site-images.ts`.

El login (`/admin/login`) es **mock**: acepta cualquier email/contraseña con formato válido y genera una sesión ficticia en `localStorage`, solo para poder navegar el panel mientras no existe el backend. No debe considerarse un mecanismo de autenticación real — ver `docs/backend-contract.md` para el reemplazo con JWT.

## Documentación

- [`docs/brand.md`](docs/brand.md) — identidad de marca
- [`docs/architecture.md`](docs/architecture.md) — arquitectura del frontend
- [`docs/backend-contract.md`](docs/backend-contract.md) — propuesta de API en ASP.NET Core
- [`docs/backend-prompt.md`](docs/backend-prompt.md) — prompt listo para generar ese backend
- [`docs/content-guide.md`](docs/content-guide.md) — guía de tono y contenido
