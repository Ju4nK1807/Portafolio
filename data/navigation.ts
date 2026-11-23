import type { NavLink } from "@/types";

// El orden de este arreglo es el mismo orden de las secciones en la página.
export const navLinks: NavLink[] = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "trailers", label: "Trailers" },
  { id: "testimonios", label: "Testimonios" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contacto", label: "Contacto" },
];

export const sectionIds: string[] = navLinks.map((link) => link.id);
