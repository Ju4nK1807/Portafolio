import type { Locale, Localized } from "@/lib/i18n";
import type { QuickFact, Social } from "@/types";

// Datos personales (tomados de la hoja de vida). Lo que no cambia con el idioma.
export const site = {
  name: "Juan Camilo Bastidas",
  firstName: "Juan Camilo",
  initials: "JC",
  location: "Pasto, Nariño",
  email: "juan.bastidaspa18@gmail.com",
  github: "https://github.com/Ju4nK1807",
  linkedin: "https://www.linkedin.com/in/juan-bastidas-917697451/",
  cv: "/cv.pdf",
  photo: "/images/perfil-cuadrada.jpg",
  photoPortrait: "/images/perfil.jpg",
  // TODO: cambia por la URL que te asigne Vercel.
  url: "https://portafolio-ju4nk1807.vercel.app",
  available: true,
};

// Textos del perfil en cada idioma.
const profile = {
  role: {
    es: "Desarrollador Full Stack en formación",
    en: "Full Stack Developer in training",
  },
  tagline: {
    es: "Estudiante de Ingeniería de Software. Construyo aplicaciones web, móviles y backends en la nube con AWS, cuidando la arquitectura y la experiencia de quien las usa.",
    en: "Software Engineering student. I build web and mobile apps and cloud backends on AWS, taking care of the architecture and the experience of the people who use them.",
  },
  /** Roles que se escriben en el hero, uno tras otro. */
  roles: {
    es: [
      "desarrollador full stack",
      "apps web y móviles",
      "apps de escritorio y wearables",
      "estudiante de ingeniería de software",
    ],
    en: ["full stack developer", "web and mobile apps", "desktop and wearable apps", "software engineering student"],
  },
  quickFacts: {
    es: [
      { label: "Ubicación", value: site.location },
      { label: "Universidad", value: "U. Cooperativa de Colombia" },
      { label: "Semestre", value: "5.º semestre" },
      { label: "Idioma", value: "Español (nativo)" },
    ],
    en: [
      { label: "Location", value: `${site.location}, Colombia` },
      { label: "University", value: "U. Cooperativa de Colombia" },
      { label: "Semester", value: "5th semester" },
      { label: "Language", value: "Spanish (native)" },
    ],
  },
  aboutParagraphs: {
    es: [
      "Estudio quinto semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia, sede Pasto. Tengo proyectos de desarrollo web, aplicaciones móviles y despliegue en la nube con AWS.",
      "Me interesan la arquitectura de software y los atributos de calidad: que un sistema no solo funcione, sino que aguante carga, se pueda mantener y esté bien documentado. He trabajado en equipo usando Git y GitHub y disfruto llevar mis propios proyectos de principio a fin.",
      "Busco mi primera práctica en desarrollo de software para aportar, aprender y crecer dentro de un equipo.",
    ],
    en: [
      "I'm in my fifth semester of Software Engineering at Universidad Cooperativa de Colombia, Pasto campus. I have projects in web development, mobile apps and cloud deployment on AWS.",
      "I'm interested in software architecture and quality attributes: a system shouldn't just work, it should handle load, be maintainable and be well documented. I've worked in teams using Git and GitHub, and I enjoy taking my own projects from start to finish.",
      "I'm looking for my first software development internship to contribute, learn and grow within a team.",
    ],
  },
} satisfies Record<string, Localized<unknown>>;

export type Profile = {
  role: string;
  tagline: string;
  roles: string[];
  quickFacts: QuickFact[];
  aboutParagraphs: string[];
};

export function getProfile(lang: Locale): Profile {
  return {
    role: profile.role[lang],
    tagline: profile.tagline[lang],
    roles: profile.roles[lang],
    quickFacts: profile.quickFacts[lang],
    aboutParagraphs: profile.aboutParagraphs[lang],
  };
}

export function getSocials(lang: Locale): Social[] {
  return [
    { label: "GitHub", href: site.github, icon: "github" },
    { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
    { label: lang === "es" ? "Correo" : "Email", href: `mailto:${site.email}`, icon: "mail" },
  ];
}
