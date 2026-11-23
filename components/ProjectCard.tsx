import Image from "next/image";
import type { Project } from "@/types";
import { PlayIcon } from "./icons";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

/** Tarjeta resumida. Al hacer clic abre la ventana con el detalle del proyecto. */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 focus-within:border-accent hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden border-b border-line ${project.imageFit === "contain" ? "bg-white" : ""}`}
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
        {project.trailer && (
          <span
            className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
            aria-hidden="true"
          >
            <span className="grid size-14 scale-75 place-items-center rounded-full bg-accent text-xl text-accent-fg opacity-0 shadow-lg shadow-accent/40 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <PlayIcon className="translate-x-0.5" />
            </span>
          </span>
        )}
      </div>

      <div className="flex w-full flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold">
            {/* El botón se estira (after:inset-0) para que toda la tarjeta sea clicable. */}
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              className="text-left outline-none after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </button>
          </h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className="mt-4 line-clamp-2 flex-1 text-pretty text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
          {project.tags.length > 3 && (
            <li className="rounded-md px-2 py-1 font-mono text-xs text-muted">+{project.tags.length - 3}</li>
          )}
        </ul>
      </div>
    </article>
  );
}
