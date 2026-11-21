import type { SkillGroup } from "@/types";

// Habilidades tomadas de la hoja de vida.
export const skillGroups: SkillGroup[] = [
  {
    title: "Lenguajes",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "NestJS", "FastAPI", "Flutter", "Three.js"],
  },
  {
    title: "Datos y nube",
    items: ["PostgreSQL", "MySQL", "Redis", "AWS", "Docker", "Git y GitHub"],
  },
  {
    title: "Habilidades blandas",
    items: ["Trabajo en equipo", "Aprendizaje autónomo", "Comunicación", "Documentación", "Responsabilidad"],
  },
];

/** Lista plana usada en la cinta animada. */
export const marqueeSkills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "FastAPI",
  "Flutter",
  "Three.js",
  "Python",
  "PostgreSQL",
  "Redis",
  "AWS Lambda",
  "Docker",
];
