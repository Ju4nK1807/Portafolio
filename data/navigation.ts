// El orden de este arreglo es el mismo orden de las secciones en la página.
// Los nombres que se muestran están en dictionaries/ (clave `nav`).
export const sectionIds = [
  "inicio",
  "sobre-mi",
  "proyectos",
  "testimonios",
  "experiencia",
  "habilidades",
  "contacto",
] as const;

export type SectionId = (typeof sectionIds)[number];
