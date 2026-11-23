import type { Locale, Localized } from "@/lib/i18n";
import type { Experience, ExperienceKind } from "@/types";

type ExperienceSource = Omit<Experience, "title" | "org" | "description"> & {
  title: Localized;
  org: Localized;
  description: Localized;
};

// Datos tomados de la hoja de vida.
const experience: ExperienceSource[] = [
  // Académica
  {
    kind: "academica",
    title: { es: "Ingeniería de Software", en: "Software Engineering" },
    org: {
      es: "Universidad Cooperativa de Colombia – Sede Pasto",
      en: "Universidad Cooperativa de Colombia – Pasto campus",
    },
    start: "2024-07",
    end: null,
    description: {
      es: "En curso, quinto semestre. Proyectos de desarrollo web, aplicaciones móviles, arquitectura de software y despliegue en la nube con AWS.",
      en: "In progress, fifth semester. Projects in web development, mobile apps, software architecture and cloud deployment on AWS.",
    },
  },
  {
    kind: "academica",
    title: { es: "Pruebas de carga a Memos", en: "Load testing Memos" },
    org: {
      es: "Arquitectura Computacional · Proyecto en pareja",
      en: "Computer Architecture · Pair project",
    },
    start: "2026-08",
    end: "2026-11",
    description: {
      es: "Medición de rendimiento de una app de notas de código abierto bajo carga, comparando PC local, Docker con límites de recursos y una instancia EC2 de AWS.",
      en: "Performance measurement of an open-source notes app under load, comparing a local PC, Docker with resource limits and an AWS EC2 instance.",
    },
  },
  {
    kind: "academica",
    title: { es: "Vigía Rural", en: "Vigía Rural" },
    org: {
      es: "Formulación y Evaluación de Proyectos",
      en: "Project Formulation and Evaluation",
    },
    start: "2026-08",
    end: "2026-11",
    description: {
      es: "Formulación de un sistema de monitoreo en tiempo real de fallas eléctricas con sensores IoT para la vereda Tambillo, Linares (Nariño).",
      en: "Formulation of a real-time power-failure monitoring system with IoT sensors for the rural area of Tambillo, Linares (Nariño).",
    },
  },
  {
    kind: "academica",
    title: { es: "Bachiller Académico", en: "High school diploma" },
    // TODO: escribe el nombre de tu colegio.
    org: { es: "Colegio", en: "High school" },
    start: "2018-01",
    end: "2023-11",
    description: { es: "Formación secundaria.", en: "Secondary education." },
  },
  // Laboral
  {
    kind: "laboral",
    title: { es: "Desarrollador de proyectos propios", en: "Personal projects developer" },
    org: { es: "Independiente", en: "Freelance" },
    start: "2025-06",
    end: null,
    description: {
      es: "Diseño y desarrollo de aplicaciones propias de principio a fin: un aim trainer 3D, una app de escritorio que genera páginas web y un registro de hábitos para Wear OS.",
      en: "Design and development of my own apps from start to finish: a 3D aim trainer, a desktop app that generates web pages and a habit tracker for Wear OS.",
    },
  },
];

const sortKey = (item: ExperienceSource) => item.end ?? "9999-12";

/** Devuelve la experiencia de un tipo, de la más reciente a la más antigua. */
export function getExperience(kind: ExperienceKind, lang: Locale): Experience[] {
  return experience
    .filter((item) => item.kind === kind)
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)) || b.start.localeCompare(a.start))
    .map((item) => ({
      ...item,
      title: item.title[lang],
      org: item.org[lang],
      description: item.description[lang],
    }));
}
