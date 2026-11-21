import type { Testimonial } from "@/types";

// TODO: reemplaza estos testimonios de ejemplo por opiniones reales
// (profesores, compañeros, clientes). El curso pide mínimo 3.
export const testimonials: Testimonial[] = [
  {
    name: "Nombre del profesor/a",
    role: "Docente de Diseño de Interfaces",
    relation: "Profesor",
    quote:
      "Juan Camilo cuida cada detalle de la interfaz y entrega proyectos que funcionan de verdad. Siempre va un paso más allá de lo que pide el enunciado.",
  },
  {
    name: "Nombre del compañero/a",
    role: "Estudiante de Ingeniería de Software",
    relation: "Compañero de equipo",
    quote:
      "Trabajar con él es fácil: organiza las tareas, explica lo que hace y no deja nada a medias. En el proyecto integrador fue clave para que todo se conectara.",
  },
  {
    name: "Nombre de la persona",
    role: "Cliente / Jefe",
    relation: "Cliente",
    quote:
      "Entendió rápido lo que necesitábamos y lo convirtió en una solución clara. Comunicación constante y entregas a tiempo.",
  },
];
