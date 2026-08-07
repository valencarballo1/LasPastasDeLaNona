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
| `/admin/eventos` | Solicitudes de presupuesto |
| `/admin/configuracion` | Datos de contacto, horarios, textos |

`/admin/login` vive fuera del grupo `(dashboard)` para no compartir el sidebar; el resto de las rutas admin están bajo `src/app/admin/(dashboard)/layout.tsx`, que valida la sesión mock y redirige a `/admin/login` si no existe.

## Estado en el panel admin (fase mock)

Los repositorios mock mantienen un arreglo en memoria por entidad. Como las páginas admin son Client Components, las mutaciones (crear/editar/eliminar) persisten durante la sesión del navegador mientras se navega con `next/link`, pero se reinician al recargar la página — es el comportamiento esperado de una capa de datos 100% mock, sin persistencia real. Al conectar la API en ASP.NET Core, este comportamiento pasa a ser real y consistente entre pestañas.

## Diseño

Ver `brand.md` para tokens de color, tipografía e identidad gráfica. Los tokens viven como Tailwind v4 `@theme` en `src/app/globals.css`, generando utilidades (`bg-red`, `text-gold`, `font-display`, etc.) y variables CSS reutilizables fuera de Tailwind si hiciera falta.
