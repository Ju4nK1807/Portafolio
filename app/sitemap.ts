import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((lang) => [lang, `${site.url}/${lang}`]));

  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
