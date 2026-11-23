import Image from "next/image";
import type { Project } from "@/types";
import { ExternalIcon, GithubIcon, PlayIcon } from "./icons";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b border-line ${project.imageFit === "contain" ? "bg-white" : ""}`}
      >
        <Image
          src={project.image}
          alt={`Vista previa de ${project.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`transition-transform duration-500 group-hover:scale-105 ${project.imageFit === "contain" ? "object-contain p-6" : "object-cover"}`}
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur ${project.status === "Terminado" ? "bg-accent-2/90 text-black" : "bg-bg/80 text-fg"}`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className="mt-4 flex-1 text-pretty text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5 text-sm font-medium">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <GithubIcon /> Código
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-muted" title="Repositorio privado">
              <GithubIcon /> Privado
            </span>
          )}
          {project.trailer && (
            <a
              href={`#trailer-${project.slug}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <PlayIcon /> Trailer
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              Ver demo <ExternalIcon />
            </a>
          ) : (
            <span className="ml-auto inline-flex items-center gap-2 text-muted">Demo próximamente</span>
          )}
        </div>
      </div>
    </article>
  );
}
