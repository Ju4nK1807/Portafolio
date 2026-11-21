import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Lenguajes",
    items: ["TypeScript", "JavaScript", "Python", "Kotlin", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "React Native", "Expo", "NestJS", "Tailwind CSS", "Three.js"],
  },
  {
    title: "Herramientas y nube",
    items: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel", "Electron", "Vite"],
  },
  {
    title: "Forma de trabajo",
    items: ["Diseño de interfaces", "Pruebas automáticas", "SCRUM", "Código limpio"],
  },
];

/** Lista plana usada en la cinta animada. */
export const marqueeSkills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "React Native",
  "Three.js",
  "Kotlin",
  "NestJS",
  "Python",
  "Docker",
  "AWS",
  "Electron",
];
