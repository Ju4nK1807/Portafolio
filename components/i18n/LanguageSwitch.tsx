"use client";

import type { MouseEvent } from "react";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

type LanguageSwitchProps = {
  className?: string;
  tabIndex?: number;
};

/** Botón ES / EN. Cambia de ruta (/es ↔ /en) conservando la sección en la que estás. */
export default function LanguageSwitch({ className = "", tabIndex }: LanguageSwitchProps) {
  const { lang, dict } = useI18n();
  const next: Locale = lang === "es" ? "en" : "es";

  // Enlace normal (carga completa): /es y /en son páginas distintas, cada una con su <html lang>.
  function change(event: MouseEvent<HTMLAnchorElement>) {
    // Se recuerda la elección para la próxima visita a la raíz "/".
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    // Se conserva la sección en la que estás (#proyectos, #contacto…).
    event.currentTarget.href = `/${next}${window.location.hash}`;
  }

  return (
    <a
      href={`/${next}`}
      hrefLang={next}
      onClick={change}
      tabIndex={tabIndex}
      aria-label={dict.language.switchTo}
      title={dict.language.switchTo}
      className={`flex h-10 items-center rounded-full border border-line px-1 font-mono text-xs transition-colors hover:border-accent ${className}`}
    >
      {(["es", "en"] as const).map((code) => (
        <span
          key={code}
          aria-hidden="true"
          className={`rounded-full px-2 py-1 uppercase transition-colors ${code === lang ? "bg-accent text-accent-fg" : "text-muted"}`}
        >
          {code}
        </span>
      ))}
    </a>
  );
}
