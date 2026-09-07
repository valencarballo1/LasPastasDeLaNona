# Propuesta de backend — ASP.NET Core

> Este documento es una propuesta de arquitectura y contrato de API. **No implementar todavía.** El frontend ya está preparado para consumirla vía `src/services/repositories/api-*.repository.ts` en cuanto exista.

## Arquitectura sugerida

Clean Architecture / capas clásicas, cualquiera de las dos nomenclaturas sirve:

```
LaNona.Api              (Web)         → Controllers, middlewares, auth
LaNona.Application      (Business)    → Casos de uso, DTOs, validación
LaNona.Domain           (Domain)      → Entidades, reglas de negocio
LaNona.Infrastructure   (Repository)  → EF Core, repositorios, servicios externos
```

Las entidades de dominio (Entity Framework) **no deben exponerse directamente**: cada endpoint devuelve DTOs equivalentes a los definidos en `src/types/*.ts` del frontend.

## DTOs (contrato con el frontend)

Ya definidos en TypeScript en `src/types/`:

- `CategoryDto` (`src/types/category.ts`)
- `ProductDto` (`src/types/product.ts`)
- `EventRequestDto` / `CreateEventRequestDto` (`src/types/event.ts`)
- `SettingsDto` (`src/types/settings.ts`)
- `SiteImageDto` / `UpdateSiteImagePayload` (`src/types/site-image.ts`)
- `MediaAssetDto` (`src/types/media.ts`)
- `AuthSessionDto` / `LoginPayload` (`src/types/auth.ts`)

El backend en C# debe modelar sus DTOs con los mismos campos y tipos equivalentes (`int` ↔ `number`, `string?` ↔ `string | undefined`, enums de string para `CategoryType` / `EventServiceType` / `EventRequestStatus`).

## Endpoints sugeridos

### Público

```
GET  /api/categories?type={RESTAURANT|FACTORY}
GET  /api/products?categoryId={id}&featured={bool}
GET  /api/products/{slug}
GET  /api/settings
GET  /api/site-images
POST /api/event-requests
```

### Admin (requiere JWT)

```
POST   /api/auth/login                    → { token, expiresAt, user }

POST   /api/admin/products
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}

POST   /api/admin/categories
PUT    /api/admin/categories/{id}
DELETE /api/admin/categories/{id}

GET    /api/admin/event-requests
PUT    /api/admin/event-requests/{id}     → actualizar estado

PUT    /api/admin/settings

PUT    /api/admin/site-images/{key}       → { imageUrl, alt } (null quita la imagen)
POST   /api/admin/media                   → multipart/form-data, campo "file" → MediaAssetDto
```

Ver `src/services/api/endpoints.ts` para la lista completa ya reflejada en el frontend.

## Imágenes

Hay dos usos distintos, con el mismo mecanismo de subida:

- **Foto del plato**: `ProductDto.imageUrl` es opcional. Un plato sin foto es un estado válido y esperado; la web lo publica igual con un placeholder de marca. El backend no debe exigir imagen para crear un producto.
- **Imágenes de la web**: `SiteImageDto` es un par `(key, imageUrl, alt)`. La `key` la define el frontend en `src/constants/site-images.ts` (`home.hero`, `page.carta.header`, `home.gallery.1`, `brand.logo`, ...). El backend guarda claves opaco: no necesita conocer el catálogo ni validarlo contra una lista cerrada, y `GET /api/site-images` puede devolver solo las que tengan valor cargado — el frontend completa el resto desde su catálogo.

`POST /api/admin/media` recibe el archivo (`multipart/form-data`, campo `file`), lo guarda (disco, S3, Azure Blob) y devuelve un `MediaAssetDto` con la **URL pública ya resuelta**. El frontend nunca construye rutas de archivos: solo persiste la `url` que recibe. Restricciones que conviene validar del lado del servidor, además del cliente: tipos `image/jpeg|png|webp|avif|svg+xml` y un máximo de 5 MB.

## Autenticación

- `POST /api/auth/login` recibe `{ email, password }` y devuelve un JWT + datos del usuario (`AuthSessionDto`).
- El frontend hoy usa una sesión **mock** en `localStorage` (`src/features/auth/session.ts`), explícitamente documentada como no segura y solo para desarrollo.
- Al implementar el backend, reemplazar `mockLogin` en `src/features/auth/use-admin-session.ts` por una llamada real a `POST /api/auth/login`, y validar el JWT en cada request admin (`Authorization: Bearer <token>`).
- Los endpoints `/api/admin/*` deben rechazar requests sin JWT válido en el servidor — la protección de rutas del lado del cliente (`/admin/(dashboard)/layout.tsx`) es solo una mejora de UX, no un mecanismo de seguridad.

## Datos que la web NO debe inventar

- Horarios de atención (`SettingsDto.openingHours`) — hoy vacío a propósito.
- Cantidad de personas o precios de Pizza Party / Pasta Party.
- Testimonios o reseñas de clientes.
- Hitos históricos adicionales a "fábrica desde 1999" y "restaurante desde 2012" (ver `docs/brand.md`).

Estos campos deben completarse con información real provista por el negocio, vía el panel admin una vez conectado al backend.
