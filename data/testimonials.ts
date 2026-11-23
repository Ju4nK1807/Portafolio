import type { Locale, Localized } from "@/lib/i18n";
import type { Testimonial } from "@/types";

type TestimonialSource = Omit<Testimonial, "role" | "relation" | "quote"> & {
  role: Localized;
  relation: Localized;
  quote: Localized;
};

// TODO: reemplaza estos testimonios de ejemplo por opiniones reales
// (profesores, compañeros, clientes). El curso pide mínimo 3.
const testimonials: TestimonialSource[] = [
  {
    name: "Nombre del profesor/a",
    role: { es: "Docente de Diseño de Interfaces", en: "Interface Design professor" },
    relation: { es: "Profesor", en: "Professor" },
    quote: {
      es: "Juan Camilo cuida cada detalle de la interfaz y entrega proyectos que funcionan de verdad. Siempre va un paso más allá de lo que pide el enunciado.",
      en: "Juan Camilo takes care of every detail of the interface and delivers projects that really work. He always goes a step beyond what the assignment asks for.",
    },
  },
  {
    name: "Nombre del compañero/a",
    role: { es: "Estudiante de Ingeniería de Software", en: "Software Engineering student" },
    relation: { es: "Compañero de equipo", en: "Teammate" },
    quote: {
      es: "Trabajar con él es fácil: organiza las tareas, explica lo que hace y no deja nada a medias. En el proyecto integrador fue clave para que todo se conectara.",
      en: "Working with him is easy: he organizes the tasks, explains what he does and never leaves anything half done. In the capstone project he was key to making everything fit together.",
    },
  },
  {
    name: "Nombre de la persona",
    role: { es: "Cliente / Jefe", en: "Client / Manager" },
    relation: { es: "Cliente", en: "Client" },
    quote: {
      es: "Entendió rápido lo que necesitábamos y lo convirtió en una solución clara. Comunicación constante y entregas a tiempo.",
      en: "He quickly understood what we needed and turned it into a clear solution. Constant communication and on-time deliveries.",
    },
  },
];

export function getTestimonials(lang: Locale): Testimonial[] {
  return testimonials.map((item) => ({
    ...item,
    role: item.role[lang],
    relation: item.relation[lang],
    quote: item.quote[lang],
  }));
}
