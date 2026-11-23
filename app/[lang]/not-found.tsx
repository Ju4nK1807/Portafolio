"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function NotFound() {
  const { lang, dict } = useI18n();

  return (
    <main className="container-page flex min-h-svh flex-col items-start justify-center gap-6">
      <p className="font-mono text-sm text-accent">Error 404</p>
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{dict.notFound.title}</h1>
      <p className="max-w-md text-lg text-muted">{dict.notFound.text}</p>
      <Link href={`/${lang}`} className="rounded-full bg-accent px-6 py-3 font-medium text-accent-fg">
        {dict.notFound.back}
      </Link>
    </main>
  );
}
