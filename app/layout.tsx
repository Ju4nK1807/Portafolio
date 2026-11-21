import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Portafolio`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  authors: [{ name: site.name, url: site.github }],
  keywords: ["portafolio", "desarrollador", "Next.js", "TypeScript", "React", site.name],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    title: `${site.name} · Portafolio`,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f13" },
  ],
};

// Aplica el tema guardado antes de pintar la página para evitar parpadeos.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t?t==="dark":true)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
