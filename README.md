# Portafolio · Juan Camilo Bastidas

Portafolio personal desarrollado para el curso de **Diseño de Interfaces**.
Una sola página con todas las secciones, modo claro/oscuro, diseño responsive y dos idiomas
(español en `/es` e inglés en `/en`).

## Tecnologías

- [Next.js](https://nextjs.org) con App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com) para el despliegue

## Secciones

1. Menú de navegación (fijo, con menú hamburguesa en celular)
2. Bienvenida / Hero con botón para descargar el CV
3. Acerca de mí
4. Proyectos: al hacer clic se abre una ventana con el trailer, la descripción y los enlaces
5. Testimonios
6. Experiencia académica y laboral
7. ⭐ Habilidades (sección adicional) + modo oscuro
8. Contacto con formulario (Formspree)
9. Pie de página

## Cómo ejecutarlo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # compilación de producción
```

Para que el formulario envíe correos, copia `.env.example` como `.env.local` y agrega tu ID de
[Formspree](https://formspree.io). Sin esa variable, el formulario abre tu cliente de correo.

## Estructura

```
app/
  [lang]/
    layout.tsx    estructura global, fuentes y metadatos (por idioma)
    page.tsx      une todas las secciones en orden
  globals.css     Tailwind, colores y animaciones
components/       un componente por sección
data/             contenido tipado en español e inglés (proyectos, testimonios, experiencia…)
dictionaries/     textos de la interfaz: es.ts y en.ts
proxy.ts          manda "/" al idioma del navegador (o al último elegido)
types/            tipos de TypeScript
public/
  cv.pdf          hoja de vida
  images/         foto de perfil e imágenes de proyectos
  videos/         trailers de los proyectos
```

Para cambiar el contenido solo edita los archivos de `data/` (cada texto tiene su versión `es` y `en`).
Los textos fijos de la interfaz (botones, títulos de sección…) están en `dictionaries/`.

## Despliegue

Cada `git push` a `main` se publica automáticamente en Vercel.
