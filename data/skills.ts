import type { Locale, Localized } from "@/lib/i18n";
import type { SkillGroup } from "@/types";

// Habilidades tomadas de la hoja de vida.
const skillGroups: Localized<SkillGroup[]> = {
  es: [
    { title: "Lenguajes", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"] },
    { title: "Frameworks", items: ["React", "Next.js", "NestJS", "FastAPI", "Flutter", "Three.js"] },
    { title: "Datos y nube", items: ["PostgreSQL", "MySQL", "Redis", "AWS", "Docker", "Git y GitHub"] },
    {
      title: "Habilidades blandas",
      items: ["Trabajo en equipo", "Aprendizaje autónomo", "Comunicación", "Documentación", "Responsabilidad"],
    },
  ],
  en: [
    { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"] },
    { title: "Frameworks", items: ["React", "Next.js", "NestJS", "FastAPI", "Flutter", "Three.js"] },
    { title: "Data & cloud", items: ["PostgreSQL", "MySQL", "Redis", "AWS", "Docker", "Git & GitHub"] },
    {
      title: "Soft skills",
      items: ["Teamwork", "Self-directed learning", "Communication", "Documentation", "Responsibility"],
    },
  ],
};

export function getSkillGroups(lang: Locale): SkillGroup[] {
  return skillGroups[lang];
}

/** Lista plana usada en la cinta animada (nombres propios, iguales en ambos idiomas). */
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
