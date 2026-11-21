import type { QuickFact, Social } from "@/types";

// Datos personales (tomados de la hoja de vida).
export const site = {
  name: "Juan Camilo Bastidas",
  firstName: "Juan Camilo",
  initials: "JC",
  role: "Desarrollador Full Stack en formación",
  tagline:
    "Estudiante de Ingeniería de Software. Construyo aplicaciones web, móviles y backends en la nube con AWS, cuidando la arquitectura y la experiencia de quien las usa.",
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

/** Roles que se escriben en el hero, uno tras otro. */
export const roles: string[] = [
  "desarrollador full stack",
  "apps web y móviles",
  "apps de escritorio y wearables",
  "estudiante de ingeniería de software",
];

export const socials: Social[] = [
  { label: "GitHub", href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Correo", href: `mailto:${site.email}`, icon: "mail" },
];

export const quickFacts: QuickFact[] = [
  { label: "Ubicación", value: "Pasto, Nariño" },
  { label: "Universidad", value: "U. Cooperativa de Colombia" },
  { label: "Semestre", value: "5.º semestre" },
  { label: "Idioma", value: "Español (nativo)" },
];

export const aboutParagraphs: string[] = [
  "Estudio quinto semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia, sede Pasto. Tengo proyectos de desarrollo web, aplicaciones móviles y despliegue en la nube con AWS.",
  "Me interesan la arquitectura de software y los atributos de calidad: que un sistema no solo funcione, sino que aguante carga, se pueda mantener y esté bien documentado. He trabajado en equipo usando Git y GitHub y disfruto llevar mis propios proyectos de principio a fin.",
  "Busco mi primera práctica en desarrollo de software para aportar, aprender y crecer dentro de un equipo.",
];
