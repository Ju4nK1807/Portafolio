// Tipos compartidos por todo el portafolio.

export type SocialIcon = "github" | "linkedin" | "mail";

export type Social = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type QuickFact = {
  label: string;
  value: string;
};

export type ProjectStatus = "Terminado" | "En desarrollo";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  /** "contain" para logos que no deben recortarse. Por defecto "cover". */
  imageFit?: "cover" | "contain";
  /** Ruta al trailer en /public/videos. */
  trailer?: string;
  tags: string[];
  year: string;
  status: ProjectStatus;
  /** Enlace al repositorio en GitHub. */
  repo?: string;
  /** Enlace a la demo en vivo (Vercel u otro). */
  demo?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  relation: string;
  quote: string;
  /** Ruta a una foto en /public. Si no hay, se muestran las iniciales. */
  avatar?: string;
};

export type ExperienceKind = "academica" | "laboral";

export type Experience = {
  kind: ExperienceKind;
  title: string;
  org: string;
  /** Formato AAAA-MM para poder ordenar. */
  start: string;
  /** Formato AAAA-MM, o null si sigue vigente. */
  end: string | null;
  description: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};
