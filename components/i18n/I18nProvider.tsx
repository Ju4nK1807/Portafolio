"use client";

import { createContext, use, type ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

type I18n = { lang: Locale; dict: Dictionary };

const I18nContext = createContext<I18n | null>(null);

/** Comparte el idioma actual y sus textos con los componentes de cliente. */
export function I18nProvider({ lang, dict, children }: I18n & { children: ReactNode }) {
  return <I18nContext value={{ lang, dict }}>{children}</I18nContext>;
}

export function useI18n(): I18n {
  const value = use(I18nContext);
  if (!value) throw new Error("useI18n debe usarse dentro de <I18nProvider>");
  return value;
}
