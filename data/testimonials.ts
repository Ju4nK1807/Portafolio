import type { Locale, Localized } from "@/lib/i18n";
import type { Testimonial } from "@/types";

type TestimonialSource = Omit<Testimonial, "role" | "relation" | "quote"> & {
  role: Localized;
  relation: Localized;
  quote: Localized;
};

const classmate: Localized = {
  es: "Compañero de trabajo y semestre",
  en: "Coworker and classmate",
};

const program: Localized = {
  es: "Ingeniería de Software · UCC",
  en: "Software Engineering · UCC",
};

// Opiniones de compañeros. Antes de publicar, muéstraselas a cada uno para que las apruebe.
const testimonials: TestimonialSource[] = [
  {
    name: "Johan Mosquera",
    role: program,
    relation: classmate,
    quote: {
      es: "Con Juan Camilo hemos sacado varios trabajos juntos, y algo que le valoro es que no se queda con la duda: si algo no funciona, se pone a investigar hasta entender por qué. Cuando nos tocó montar la parte de Docker yo andaba perdido y me lo explicó con calma, sin hacerme sentir bobo por preguntar.",
      en: "Juan Camilo and I have done several assignments together, and what I value most is that doubts never get left hanging: if something breaks, Juan Camilo digs in until it makes sense. When we had to set up Docker I was completely lost, and got walked through it calmly. I never felt dumb for asking.",
    },
  },
  {
    name: "Juan Camilo Rosero",
    role: program,
    relation: classmate,
    quote: {
      es: "Siempre llega a la reunión con algo ya hecho. Uno apenas está leyendo el enunciado y ya tiene el repositorio creado y las tareas repartidas en GitHub. Es bastante exigente con el orden del código; al principio me parecía exagerado, pero después agradecí no tener que adivinar qué hacía cada archivo.",
      en: "Juan Camilo always shows up to meetings with something already done. You're barely reading the assignment and the repo already exists, with the tasks split up on GitHub. Also pretty picky about how the code is organized. At first I thought it was too much, but later I was glad I didn't have to guess what each file did.",
    },
  },
  {
    name: "Santiago Ortega",
    role: program,
    relation: classmate,
    quote: {
      es: "Nos conocemos desde los primeros semestres. Tiene muy buen ojo para lo visual y se fija en cosas que a uno se le pasan, como un botón que se ve raro en el celular. Y cuando dice que algo queda para el jueves, queda para el jueves. Nos ha tocado trasnochar antes de varias entregas y nunca ha dejado tirado al equipo.",
      en: "We've known each other since our first semesters. Juan Camilo has a great eye for visuals and catches things the rest of us miss, like a button that looks off on mobile. And when something is promised for Thursday, it's ready on Thursday. We've pulled a few all-nighters before deadlines and the team has never been left hanging.",
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
