# Prompt para generar el backend en .NET

Este archivo es el prompt listo para pegar en una IA (Claude Code, Copilot, etc.) y generar el backend que consume este frontend. Está escrito para que el resultado encaje exactamente con `src/services/api/endpoints.ts` y `src/types/*.ts`: cuando el backend esté funcionando, alcanza con poner `NEXT_PUBLIC_DATA_SOURCE=api` y `NEXT_PUBLIC_API_URL` en el frontend, sin tocar componentes ni páginas.

---

## PROMPT

Necesito que construyas desde cero el backend de **Las Pastas de la Nona**, una fábrica de pastas y restaurante familiar de Burzaco (Buenos Aires). El frontend ya existe: es una web en Next.js con un panel administrativo, y hoy funciona con datos mock. Tu trabajo es reemplazar esos mocks por una API REST real.

### Stack y arquitectura

- **.NET 9** (o la LTS vigente) con **ASP.NET Core Web API**, C#, nullable reference types habilitado.
- **Entity Framework Core** con **PostgreSQL** (Npgsql). Dejá la cadena de conexión en `appsettings.json` + user-secrets, no hardcodeada.
- **JWT** para el panel admin.
- **FluentValidation** para validar los payloads de entrada.
- **Swagger / OpenAPI** habilitado en desarrollo.
- Solución en cuatro proyectos + tests:

```
LaNona.Api              → Controllers, middlewares, autenticación, DI, Program.cs
LaNona.Application      → Casos de uso, DTOs, validadores, interfaces de repositorio
LaNona.Domain           → Entidades y reglas de negocio (sin dependencias de EF)
LaNona.Infrastructure   → DbContext, configuraciones de EF, repositorios, storage de archivos
LaNona.Tests            → Tests unitarios (xUnit) de la capa Application
```

Regla dura: **las entidades de EF Core nunca se exponen en las respuestas**. Cada endpoint devuelve DTOs con exactamente los campos que se listan más abajo. Si un campo no está en el DTO, no viaja.

### Entidades de dominio

- **Category**: `Id`, `Name`, `Slug` (único), `Description?`, `Type` (`RESTAURANT` | `FACTORY`), `SortOrder`, `Active`.
- **Product**: `Id`, `Name`, `Slug` (único), `Description?`, `Price?` (decimal nullable), `ImageUrl?`, `Unit?`, `Available`, `Featured`, `Active`, `SortOrder`, `CategoryId` (FK), `Tags` (lista de strings).
- **EventRequest**: `Id`, `Name`, `Phone`, `Email`, `EventType` (`PIZZA_PARTY` | `PASTA_PARTY` | `AMBOS` | `OTRO`), `EstimatedGuests`, `EventDate`, `Locality`, `Message?`, `Status` (`NUEVA` | `CONTACTADO` | `PRESUPUESTADO` | `CONFIRMADO` | `CANCELADO`), `CreatedAt`.
- **Settings**: fila única. `Phone`, `WhatsappNumber`, `InstagramUrl`, `Address`, `MainText`, `GoogleMapsUrl`, `OpeningHours` (lista de `{ Days, Hours }`, serializada como JSON).
- **SiteImage**: `Key` (clave primaria, string), `ImageUrl?`, `Alt?`, `UpdatedAt`.
- **MediaAsset**: `Id` (Guid), `FileName`, `ContentType`, `SizeInBytes`, `StoragePath`, `Url`, `UploadedAt`.
- **AdminUser**: `Id`, `Name`, `Email` (único), `PasswordHash`, `Role` (`ADMIN` | `STAFF`).

Los enums viajan **como string** en el JSON (`JsonStringEnumConverter`), no como número. El JSON usa `camelCase`.

### DTOs (contrato exacto con el frontend)

Estos son los tipos TypeScript que el frontend ya consume. Modelá los DTOs de C# con los mismos nombres de campo y equivalencias de tipo (`int` ↔ `number`, `string?` ↔ `string | undefined`, `decimal?` ↔ `number | null`):

```ts
interface CategoryDto {
  id: number; name: string; slug: string; description?: string;
  type: "RESTAURANT" | "FACTORY"; sortOrder: number; active: boolean;
}

interface ProductDto {
  id: number; name: string; slug: string; description?: string;
  price: number | null;          // null = la web muestra "Consultar"
  imageUrl?: string;             // opcional a propósito, ver más abajo
  unit?: string;                 // "por porción", "bandeja x 1kg", ...
  available: boolean;            // hay stock hoy
  featured: boolean;             // destacado en el inicio
  active: boolean;               // publicado en la web
  sortOrder: number; categoryId: number; tags?: string[];
}

interface EventRequestDto {
  id: number; name: string; phone: string; email: string;
  eventType: "PIZZA_PARTY" | "PASTA_PARTY" | "AMBOS" | "OTRO";
  estimatedGuests: number; eventDate: string; locality: string; message?: string;
  status: "NUEVA" | "CONTACTADO" | "PRESUPUESTADO" | "CONFIRMADO" | "CANCELADO";
  createdAt: string;             // ISO 8601
}

interface SettingsDto {
  phone: string; whatsappNumber: string; instagramUrl: string; address: string;
  openingHours: { days: string; hours: string }[];
  mainText: string; googleMapsUrl: string;
}

interface SiteImageDto { key: string; imageUrl?: string; alt?: string; updatedAt?: string; }

interface MediaAssetDto {
  id: string; url: string; fileName: string; contentType: string;
  sizeInBytes: number; uploadedAt: string;
}

interface AuthSessionDto {
  token: string; expiresAt: string;
  user: { id: number; name: string; email: string; role: "ADMIN" | "STAFF" };
}
```

### Endpoints

**Públicos (sin autenticación, solo lectura salvo el formulario de eventos):**

```
GET  /api/categories?type={RESTAURANT|FACTORY}   → CategoryDto[]   (solo activas, ordenadas por sortOrder)
GET  /api/products?categoryId={id}&featured={bool} → ProductDto[]  (solo activos, ordenados por sortOrder)
GET  /api/products/{slug}                        → ProductDto      (404 si no existe o está inactivo)
GET  /api/settings                               → SettingsDto
GET  /api/site-images                            → SiteImageDto[]
POST /api/event-requests                         → EventRequestDto (status inicial "NUEVA")
```

**Admin (requieren `Authorization: Bearer <jwt>`):**

```
POST   /api/auth/login                     → AuthSessionDto

GET    /api/admin/products                 → ProductDto[]  (incluye inactivos)
POST   /api/admin/products                 → ProductDto
PUT    /api/admin/products/{id}            → ProductDto
DELETE /api/admin/products/{id}            → 204

GET    /api/admin/categories               → CategoryDto[] (incluye inactivas)
GET    /api/admin/categories/{id}          → CategoryDto
POST   /api/admin/categories               → CategoryDto
PUT    /api/admin/categories/{id}          → CategoryDto
DELETE /api/admin/categories/{id}          → 204

GET    /api/admin/event-requests           → EventRequestDto[]
PUT    /api/admin/event-requests/{id}      → EventRequestDto  (body: { status })

PUT    /api/admin/settings                 → SettingsDto

PUT    /api/admin/site-images/{key}        → SiteImageDto
POST   /api/admin/media                    → MediaAssetDto (multipart/form-data, campo "file")
```

Los `PUT` de productos y categorías reciben el **recurso completo** (todos los campos del DTO menos el `id`) y lo reemplazan: el frontend nunca manda parches. No implementes merge de campos parciales.

### Reglas de negocio

1. **La foto del plato es opcional.** `ImageUrl` puede quedar en `null` y crear un producto sin imagen tiene que funcionar. La web lo publica igual, con un placeholder de marca, hasta que alguien lo edite y le suba una. No agregues validaciones que exijan imagen.
2. **`Price` puede ser `null`**: significa "Consultar", no cero. No lo reemplaces por `0` ni lo rechaces.
3. **`Active` vs `Available`**: `active = false` saca el plato de la web pero lo conserva en la base (es "quitar de la carta"); `available = false` lo deja visible pero marcado como sin stock. `DELETE` sí borra de verdad — si el producto tiene relaciones que lo impidan, respondé `409 Conflict` con un mensaje claro en vez de fallar con 500.
4. **Slug único** en productos y en categorías. Si viene repetido, `409 Conflict`.
5. **Borrar una categoría con productos**: `409 Conflict` con un mensaje que diga cuántos productos la usan. No borres los productos en cascada.
6. Los endpoints públicos devuelven **solo lo activo**; los de `/api/admin/*` devuelven todo.
7. `Settings` es una fila única: `PUT` hace upsert.

### Imágenes de la web

Además de la foto de cada plato, el panel administra las imágenes de toda la web (portada del inicio, encabezado de cada página, galerías, logo...). Cada una es un `SiteImage` identificado por una **clave que define el frontend**: `home.hero`, `page.carta.header`, `home.gallery.1`, `events.pizza-party`, `brand.logo`, etc.

- `PUT /api/admin/site-images/{key}` recibe `{ "imageUrl": string|null, "alt": string|null }` y hace **upsert** por clave: si la clave no existe, la crea. `null` deja el campo vacío (quita la imagen).
- Tratá la clave como un identificador opaco: no la valides contra una lista cerrada ni la interpretes. El catálogo de claves vive en el frontend (`src/constants/site-images.ts`) y va a crecer sin necesidad de tocar el backend. Aceptá `[a-z0-9.-]{1,100}`.
- `GET /api/site-images` puede devolver solo las claves con valor cargado; el frontend completa el resto con su catálogo.

### Subida de archivos

`POST /api/admin/media` recibe `multipart/form-data` con el campo `file` y devuelve un `MediaAssetDto` con la **URL pública ya resuelta**. El frontend nunca arma rutas: guarda tal cual la `url` que recibe.

- Validá tipo (`image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml`) y tamaño máximo de **5 MB**; devolvé `400` con un mensaje entendible si no cumple.
- Verificá el contenido real del archivo (magic bytes), no solo el `Content-Type` que manda el cliente. Sanitizá el nombre y guardalo con un nombre generado (Guid), nunca con el nombre original del usuario.
- Implementá el guardado detrás de una interfaz `IFileStorage` con una implementación local (carpeta `wwwroot/uploads`, servida como estático) y dejá preparada la sustitución por S3 / Azure Blob. La base URL pública tiene que ser configurable (`Storage:PublicBaseUrl`).

### Autenticación

- `POST /api/auth/login` recibe `{ email, password }` y devuelve `AuthSessionDto` con un JWT firmado (clave desde configuración, nunca en el código) y su vencimiento.
- Hasheá contraseñas con ASP.NET Core Identity o BCrypt. Nunca guardes texto plano.
- **Todos** los endpoints `/api/admin/*` exigen JWT válido: la protección de rutas del frontend es solo de UX, la seguridad está acá.
- Poné rate limiting en el login.

### Infraestructura

- **CORS**: permitir el origen del frontend, configurable por entorno. Nada de `AllowAnyOrigin` en producción.
- **Errores**: middleware global que devuelva `ProblemDetails` (RFC 7807) y no filtre stack traces en producción.
- **Migraciones** de EF Core + un **seeder** con: las categorías del restaurante (Entradas, Pastas, Milanesas, Pizzas, Platos, Postres, Bebidas, Vinos) y de la fábrica (Ravioles, Sorrentinos, Ñoquis, Tallarines, Canelones, Lasagna, Salsas), un usuario admin inicial (contraseña por configuración) y la fila de `Settings`. **No inventes datos del negocio**: precios, horarios de atención y textos institucionales se cargan desde el panel. Dejá `openingHours` vacío.
- **Logging** estructurado (Serilog o el built-in).
- **Health check** en `/health`.
- Tests unitarios de la capa Application: validaciones, reglas de slug único, borrado de categoría con productos, upsert de `SiteImage` y validación de archivos.

### Entregables

1. La solución completa compilando, con `dotnet build` y `dotnet test` en verde.
2. Las migraciones iniciales y el seeder.
3. Un `README.md` con cómo levantarlo (`dotnet ef database update`, `dotnet run`), las variables de configuración y la URL de Swagger.
4. Un archivo `.http` (o colección de Postman) con un ejemplo de cada endpoint.

### Cómo verificar que quedó bien

En el frontend, poner en `.env.local`:

```bash
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_URL=http://localhost:5000
```

y comprobar que sin tocar una línea del frontend funcionan: la carta, el catálogo de la fábrica, el detalle de producto, el formulario de eventos, el login del panel, el alta de un plato **sin imagen**, la edición posterior para agregarle la foto, y el reemplazo de las imágenes de la web desde `/admin/imagenes`.
