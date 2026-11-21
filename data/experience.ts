import type { Experience } from "@/types";

// TODO: ajusta instituciones, cargos y fechas reales.
export const experience: Experience[] = [
  // Académica
  {
    kind: "academica",
    title: "Ingeniería de Software",
    org: "Universidad (por confirmar)",
    start: "2024-07",
    end: null,
    description:
      "Actualmente en 5.º semestre. Énfasis en diseño de interfaces, arquitectura de software, bases de datos y computación en la nube.",
  },
  {
    kind: "academica",
    title: "Proyecto final · Arquitectura Computacional",
    org: "Universidad",
    start: "2026-08",
    end: "2026-11",
    description:
      "Medición de rendimiento de una red social (Memos) desplegada en AWS con distintas estrategias de caché, usando pruebas de carga con k6.",
  },
  {
    kind: "academica",
    title: "Bachiller académico",
    org: "Colegio (por confirmar)",
    start: "2018-01",
    end: "2023-11",
    description: "Formación secundaria.",
  },
  // Laboral
  {
    kind: "laboral",
    title: "Desarrollador freelance",
    org: "Proyectos independientes",
    start: "2025-01",
    end: null,
    description:
      "Desarrollo de aplicaciones web, móviles y de escritorio: desde el diseño de la interfaz hasta el empaquetado y la publicación.",
  },
  {
    kind: "laboral",
    title: "Desarrollador · Proyecto integrador",
    org: "Equipo universitario",
    start: "2026-02",
    end: "2026-06",
    description:
      "Construcción de un esqueleto de microservicios para mantenimiento de equipos biomédicos, trabajando con metodología ágil en equipo.",
  },
];

const sortKey = (item: Experience) => item.end ?? "9999-12";

/** Devuelve la experiencia de un tipo, de la más reciente a la más antigua. */
export function getExperience(kind: Experience["kind"]): Experience[] {
  return experience
    .filter((item) => item.kind === kind)
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)) || b.start.localeCompare(a.start));
}
