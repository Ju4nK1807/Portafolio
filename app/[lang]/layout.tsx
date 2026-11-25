import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import SpotlightTracker from "@/components/ui/SpotlightTracker";
import { getProfile, site } from "@/data/site";
import { getDictionary } from "@/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const sans = Geist({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif-family",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Se generan las dos versiones al compilar: /es y /en.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const { tagline } = getProfile(lang);
  const title = `${site.name} · ${dict.meta.title}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: tagline,
    authors: [{ name: site.name, url: site.github }],
    keywords: [...dict.meta.keywords, "Next.js", "TypeScript", "React", site.name],
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      url: `${site.url}/${lang}`,
      title,
      description: tagline,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Aplica el tema guardado antes de pintar la página para evitar parpadeos.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t?t==="dark":true)}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable} ${serif.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="tema" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          {dict.meta.skipToContent}
        </a>
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
        <SpotlightTracker />
        {/* Textura de grano sobre todo el sitio */}
        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[80]" />
      </body>
    </html>
  );
}
