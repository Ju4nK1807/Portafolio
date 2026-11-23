import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { es, type Dictionary } from "./es";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
