import type { Project } from "@/types";

// Cada proyecto debe tener enlace a GitHub y, si existe, a su demo en vivo.
// Los proyectos con `trailer` muestran el video en la ventana de detalle.
export const projects: Project[] = [
  {
    slug: "reticula",
    title: "Retícula",
    tagline: "Aim trainer 3D en el navegador",
    description:
      "Entrenador de puntería para practicar la coordinación ojo-mano de cualquier shooter. Escenas en 3D, estadísticas por sesión y pruebas automáticas en cada push.",
    image: "/images/projects/reticula.png",
    trailer: "/videos/reticula.mp4",
    tags: ["Three.js", "JavaScript", "Vite", "Vitest", "Electron"],
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/Ju4nK1807/Reticula",
  },
  {
    slug: "habita",
    title: "Habita",
    tagline: "Muebles a medida diseñados con IA",
    description:
      "App móvil donde capturas un espacio, describes lo que necesitas y la IA propone cuatro muebles con medidas reales, material, precio estimado y render.",
    image: "/images/projects/habita.png",
    trailer: "/videos/habita.mp4",
    tags: ["React Native", "Expo", "TypeScript", "IA"],
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/Ju4nK1807/Habitar_juank",
  },
  {
    slug: "prisma",
    title: "Prisma",
    tagline: "De una imagen a una página web",
    description:
      "Aplicación de escritorio que toma un logo, una foto o una captura y genera una página web completa con sus colores, lista para personalizar y exportar.",
    image: "/images/projects/prisma.jpg",
    trailer: "/videos/prisma.mp4",
    tags: ["React", "TypeScript", "Vite", "Electron"],
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "racha",
    title: "Racha",
    tagline: "Hábitos desde el reloj",
    description:
      "Registro de hábitos para Wear OS: marcas actividades cumplidas, ganas puntos, subes de nivel y mantienes tu racha. Funciona sin red y guarda el progreso en el reloj.",
    image: "/images/projects/racha.png",
    trailer: "/videos/racha.mp4",
    tags: ["Kotlin", "Wear OS", "Jetpack Compose", "DataStore"],
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "rentacars",
    title: "RentaCars API",
    tagline: "API REST para alquiler de vehículos",
    description:
      "Gestiona el catálogo de carros, clientes y rentas: consulta disponibilidad por fechas, calcula el costo según los días y sigue el estado de cada renta.",
    image: "/images/projects/rentacars.png",
    imageFit: "contain",
    tags: ["NestJS", "TypeScript", "Docker", "Vitest"],
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/ingmao021/RentaCars",
  },
];
