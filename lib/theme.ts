import { LOCALE_COOKIE, type Locale } from "./i18n";

/** Cambia entre modo claro y oscuro y lo recuerda para la próxima visita. */
export function toggleTheme() {
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Sin almacenamiento disponible: el cambio dura solo esta visita.
  }
}

/** Ruta del otro idioma conservando la sección actual, y guarda la elección en una cookie. */
export function languageHref(next: Locale): string {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  return `/${next}${window.location.hash}`;
}
