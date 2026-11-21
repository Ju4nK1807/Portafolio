import type { Experience } from "@/types";

// Datos tomados de la hoja de vida.
export const experience: Experience[] = [
  // Académica
  {
    kind: "academica",
    title: "Ingeniería de Software",
    org: "Universidad Cooperativa de Colombia – Sede Pasto",
    start: "2024-07",
    end: null,
    description:
      "En curso, quinto semestre. Proyectos de desarrollo web, aplicaciones móviles, arquitectura de software y despliegue en la nube con AWS.",
  },
  {
    kind: "academica",
    title: "Pruebas de carga a Memos",
    org: "Arquitectura Computacional · Proyecto en pareja",
    start: "2026-08",
    end: "2026-11",
    description:
      "Medición de rendimiento de una app de notas de código abierto bajo carga, comparando PC local, Docker con límites de recursos y una instancia EC2 de AWS.",
  },
  {
    kind: "academica",
    title: "Vigía Rural",
    org: "Formulación y Evaluación de Proyectos",
    start: "2026-08",
    end: "2026-11",
    description:
      "Formulación de un sistema de monitoreo en tiempo real de fallas eléctricas con sensores IoT para la vereda Tambillo, Linares (Nariño).",
  },
  {
    kind: "academica",
    title: "Bachiller Académico",
    // TODO: escribe el nombre de tu colegio.
    org: "Colegio",
    start: "2018-01",
    end: "2023-11",
    description: "Formación secundaria.",
  },
  // Laboral
  {
    kind: "laboral",
    title: "Desarrollador de proyectos propios",
    org: "Independiente",
    start: "2025-06",
    end: null,
    description:
      "Diseño y desarrollo de aplicaciones propias de principio a fin: un aim trainer 3D, una app de escritorio que genera páginas web y un registro de hábitos para Wear OS.",
  },
];

const sortKey = (item: Experience) => item.end ?? "9999-12";

/** Devuelve la experiencia de un tipo, de la más reciente a la más antigua. */
export function getExperience(kind: Experience["kind"]): Experience[] {
  return experience
    .filter((item) => item.kind === kind)
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)) || b.start.localeCompare(a.start));
}
