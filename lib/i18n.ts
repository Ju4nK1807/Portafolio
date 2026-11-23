// Idiomas del portafolio. Cada uno vive en su propia ruta: /es y /en.

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Nombre de la cookie que recuerda el idioma elegido con el botón ES/EN. */
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Texto con una versión por idioma. Se usa en los archivos de `data/`. */
export type Localized<T = string> = Record<Locale, T>;

/** Reemplaza {clave} en un texto del diccionario: fill("Hola {name}", { name: "Ana" }). */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
