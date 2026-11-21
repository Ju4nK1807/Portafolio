import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
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
  title: "Juan Camilo Bastidas · Portafolio",
  description: "Portafolio personal de Juan Camilo Bastidas, desarrollador de software.",
};

// Aplica el tema guardado antes de pintar la página para evitar parpadeos.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t?t==="dark":true)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
