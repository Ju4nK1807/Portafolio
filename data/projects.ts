import type { Locale, Localized } from "@/lib/i18n";
import type { Project } from "@/types";

type ProjectSource = Omit<Project, "tagline" | "description"> & {
  tagline: Localized;
  description: Localized;
};

// Cada proyecto puede tener enlace a GitHub y, si existe, a su demo en vivo.
// Los proyectos con `trailer` muestran el video en la ventana de detalle.
const projects: ProjectSource[] = [
  {
    slug: "reticula",
    title: "Retícula",
    tagline: {
      es: "Aim trainer 3D en el navegador",
      en: "3D aim trainer in the browser",
    },
    description: {
      es: "Entrenador de puntería para practicar la coordinación ojo-mano de cualquier shooter. Escenas en 3D, estadísticas por sesión y pruebas automáticas en cada push.",
      en: "Aim trainer to practice the hand-eye coordination of any shooter. 3D scenes, per-session stats and automated tests on every push.",
    },
    image: "/images/projects/reticula.png",
    trailer: "/videos/reticula.mp4",
    tags: ["Three.js", "JavaScript", "Vite", "Vitest", "Electron"],
    category: "web",
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/Ju4nK1807/Reticula",
  },
  {
    slug: "habita",
    title: "Habita",
    tagline: {
      es: "Muebles a medida diseñados con IA",
      en: "Custom furniture designed with AI",
    },
    description: {
      es: "App móvil donde capturas un espacio, describes lo que necesitas y la IA propone cuatro muebles con medidas reales, material, precio estimado y render.",
      en: "Mobile app where you capture a space, describe what you need and the AI suggests four pieces of furniture with real measurements, material, estimated price and a render.",
    },
    image: "/images/projects/habita.png",
    trailer: "/videos/habita.mp4",
    tags: ["React Native", "Expo", "TypeScript", "IA"],
    category: "movil",
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/Ju4nK1807/Habitar_juank",
  },
  {
    slug: "prisma",
    title: "Prisma",
    tagline: {
      es: "De una imagen a una página web",
      en: "From an image to a web page",
    },
    description: {
      es: "Aplicación de escritorio que toma un logo, una foto o una captura y genera una página web completa con sus colores, lista para personalizar y exportar.",
      en: "Desktop app that takes a logo, a photo or a screenshot and generates a complete web page with its colors, ready to customize and export.",
    },
    image: "/images/projects/prisma.jpg",
    trailer: "/videos/prisma.mp4",
    tags: ["React", "TypeScript", "Vite", "Electron"],
    category: "escritorio",
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "racha",
    title: "Racha",
    tagline: {
      es: "Hábitos desde el reloj",
      en: "Habits from your watch",
    },
    description: {
      es: "Registro de hábitos para Wear OS: marcas actividades cumplidas, ganas puntos, subes de nivel y mantienes tu racha. Funciona sin red y guarda el progreso en el reloj.",
      en: "Habit tracker for Wear OS: check off completed activities, earn points, level up and keep your streak. Works offline and stores progress on the watch.",
    },
    image: "/images/projects/racha.png",
    trailer: "/videos/racha.mp4",
    tags: ["Kotlin", "Wear OS", "Jetpack Compose", "DataStore"],
    category: "wearable",
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "rentacars",
    title: "RentaCars API",
    tagline: {
      es: "API REST para alquiler de vehículos",
      en: "REST API for car rentals",
    },
    description: {
      es: "Gestiona el catálogo de carros, clientes y rentas: consulta disponibilidad por fechas, calcula el costo según los días y sigue el estado de cada renta.",
      en: "Manages the catalog of cars, customers and rentals: checks availability by date, calculates the cost by number of days and tracks the status of each rental.",
    },
    image: "/images/projects/rentacars.png",
    imageFit: "contain",
    tags: ["NestJS", "TypeScript", "Docker", "Vitest"],
    category: "backend",
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/ingmao021/RentaCars",
  },
];

/** Proyectos con los textos en el idioma pedido. */
export function getProjects(lang: Locale): Project[] {
  return projects.map((project) => ({
    ...project,
    tagline: project.tagline[lang],
    description: project.description[lang],
    tags: project.tags.map((tag) => (lang === "en" && tag === "IA" ? "AI" : tag)),
  }));
}
