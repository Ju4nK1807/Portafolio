import type { QuickFact, Social } from "@/types";

// Datos personales. Revisa y ajusta todo lo marcado con TODO.
export const site = {
  name: "Juan Camilo Bastidas",
  firstName: "Juan Camilo",
  initials: "JC",
  role: "Desarrollador de software",
  tagline:
    "Construyo interfaces que se sienten simples y software que funciona de verdad: web, móvil, escritorio y hasta relojes.",
  // TODO: reemplaza por tu correo de contacto público.
  email: "tu-correo@ejemplo.com",
  github: "https://github.com/Ju4nK1807",
  // TODO: reemplaza por la URL de tu perfil de LinkedIn.
  linkedin: "https://www.linkedin.com/",
  cv: "/cv.pdf",
  photo: "/images/perfil-cuadrada.jpg",
  photoPortrait: "/images/perfil.jpg",
  // TODO: cambia por la URL que te asigne Vercel.
  url: "https://portafolio-ju4nk1807.vercel.app",
  available: true,
};

/** Roles que se escriben en el hero, uno tras otro. */
export const roles: string[] = [
  "desarrollador de software",
  "diseñador de interfaces",
  "creador de apps móviles",
  "estudiante de ingeniería",
];

export const socials: Social[] = [
  { label: "GitHub", href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Correo", href: `mailto:${site.email}`, icon: "mail" },
];

// TODO: verifica ubicación, carrera y semestre.
export const quickFacts: QuickFact[] = [
  { label: "Ubicación", value: "Pasto, Colombia" },
  { label: "Carrera", value: "Ingeniería de Software" },
  { label: "Semestre", value: "5.º semestre" },
  { label: "Intereses", value: "UI, videojuegos, apps móviles" },
];

export const aboutParagraphs: string[] = [
  "Soy estudiante de Ingeniería de Software y me gusta llevar las ideas hasta el final: desde el boceto de la interfaz hasta tenerla funcionando en el dispositivo de alguien.",
  "He trabajado en proyectos muy distintos entre sí: un aim trainer en 3D, una app móvil que diseña muebles con IA, una aplicación de escritorio que convierte imágenes en páginas web y un registro de hábitos para Wear OS. Lo que tienen en común es el cuidado por la experiencia de quien lo usa.",
  "Disfruto aprender herramientas nuevas, escribir código legible y trabajar en equipo. Busco oportunidades de práctica donde pueda seguir creciendo como desarrollador.",
];
