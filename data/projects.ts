import type { Project } from "@/types";

// Cada proyecto debe tener enlace a GitHub y, si existe, a su demo en vivo.
// TODO: completa los enlaces que faltan (repo / demo).
export const projects: Project[] = [
  {
    slug: "biomedictrack",
    title: "BiomedicTrack",
    tagline: "Gestión de equipos biomédicos · Hospital E.S.E Juan Pablo II",
    description:
      "Sistema para el control de equipos biomédicos de un hospital: aplicación web y app móvil que consumen la misma API REST.",
    image: "/images/projects/biomed.svg",
    tags: ["React", "FastAPI", "Flutter", "API REST"],
    year: "2026",
    status: "En desarrollo",
  },
  {
    slug: "serverless-aws",
    title: "Red social serverless",
    tagline: "Backend en la nube con AWS",
    description:
      "Backend serverless para una red social universitaria, desplegado con API Gateway, Lambda, RDS, ElastiCache (Redis), S3, CloudFront y Cognito, con documentación paso a paso.",
    image: "/images/projects/serverless.svg",
    tags: ["AWS Lambda", "API Gateway", "RDS", "Redis", "Cognito"],
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "mitos",
    title: "Mitos colombianos",
    tagline: "Juego 3D de terror · equipo de 4",
    description:
      "Juego de terror inspirado en mitos colombianos, con modelos hechos en Blender, físicas, audio y triggers que disparan los sustos.",
    image: "/images/projects/mitos.svg",
    tags: ["Three.js", "Blender", "JavaScript", "Físicas"],
    year: "2026",
    status: "Terminado",
  },
  {
    slug: "reticula",
    title: "Retícula",
    tagline: "Aim trainer 3D en el navegador",
    description:
      "Entrenador de puntería para practicar la coordinación ojo-mano de cualquier shooter. Escenas en 3D, estadísticas por sesión y pruebas automáticas en cada push.",
    image: "/images/projects/reticula.svg",
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
    image: "/images/projects/habita.svg",
    tags: ["React Native", "Expo", "TypeScript", "IA"],
    year: "2026",
    status: "En desarrollo",
    repo: "https://github.com/Ju4nK1807/Habitar_juank",
  },
  {
    slug: "prisma",
    title: "Prisma",
    tagline: "De una imagen a una página web",
    description:
      "Aplicación de escritorio que toma un logo, una foto o una captura y genera una página web completa con sus colores, lista para personalizar y exportar.",
    image: "/images/projects/prisma.svg",
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
    image: "/images/projects/racha.svg",
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
    image: "/images/projects/rentacars.svg",
    tags: ["NestJS", "TypeScript", "Docker", "Vitest"],
    year: "2026",
    status: "Terminado",
    repo: "https://github.com/ingmao021/RentaCars",
  },
  {
    slug: "demanda-lstm",
    title: "Predicción de demanda eléctrica",
    tagline: "Inteligencia artificial con LSTM",
    description:
      "Red neuronal LSTM que predice la demanda eléctrica de la hora siguiente a partir del histórico de consumo.",
    image: "/images/projects/lstm.svg",
    tags: ["Python", "LSTM", "Redes neuronales", "Series de tiempo"],
    year: "2026",
    status: "Terminado",
  },
];
