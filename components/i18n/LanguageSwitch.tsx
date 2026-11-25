"use client";

import type { MouseEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { languageHref } from "@/lib/theme";
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
    // Se recuerda la elección y se conserva la sección en la que estás (#proyectos…).
    event.currentTarget.href = languageHref(next);
  }

  return (
    <a
      href={`/${next}`}
      hrefLang={next}
      onClick={change}
      tabIndex={tabIndex}
      aria-label={dict.language.switchTo}
      title={`${dict.language.switchTo} (L)`}
      className={`flex h-9 items-center rounded-full px-1 font-mono text-xs transition-colors hover:bg-surface-2 ${className}`}
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
