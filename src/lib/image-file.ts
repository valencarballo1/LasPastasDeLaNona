/**
 * Utilidades de imagen del lado del navegador: validación de archivos y
 * conversión a data URL para la subida simulada (`mock-media.repository.ts`).
 */

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];

export const ACCEPTED_IMAGE_ACCEPT_ATTR = ACCEPTED_IMAGE_TYPES.join(",");

/** 5 MB: suficiente para una foto de buena calidad y prudente para subir desde el celular. */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

/** Lado máximo al que se reduce la imagen antes de guardarla como data URL. */
const MAX_SIDE_PX = 1600;

/** Devuelve el mensaje de error, o `null` si el archivo sirve. */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Formato no admitido. Subí una imagen JPG, PNG, WEBP, AVIF o SVG.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `La imagen pesa demasiado (máximo ${formatFileSize(MAX_IMAGE_SIZE_BYTES)}).`;
  }

  return null;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No pudimos leer el archivo."));
    reader.readAsDataURL(file);
  });
}

/**
 * Convierte el archivo en data URL, reduciéndolo si es grande.
 *
 * Solo se usa en la fase mock, para poder ver la imagen elegida sin tener
 * dónde guardarla. Los SVG se leen tal cual (no tienen sentido en canvas).
 */
export async function fileToDataUrl(file: File): Promise<string> {
  if (file.type === "image/svg+xml" || typeof document === "undefined") {
    return readAsDataUrl(file);
  }

  const original = await readAsDataUrl(file);

  try {
    const image = await loadImage(original);
    const scale = Math.min(1, MAX_SIDE_PX / Math.max(image.width, image.height));
    if (scale === 1) return original;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);

    const context = canvas.getContext("2d");
    if (!context) return original;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // PNG y WEBP conservan su formato para no perder la transparencia
    // (el logo, por ejemplo); el resto se reduce a JPEG.
    const outputType = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
    return canvas.toDataURL(outputType, 0.85);
  } catch {
    // Si el navegador no puede procesar la imagen, se guarda tal cual.
    return original;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No pudimos procesar la imagen."));
    image.src = src;
  });
}

/** `true` si la URL es una imagen embebida (subida mock) y no una ruta servida. */
export function isInlineImageUrl(url: string) {
  return url.startsWith("data:") || url.startsWith("blob:");
}
