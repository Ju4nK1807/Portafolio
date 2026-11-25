import type { MouseEvent } from "react";
import type { Project } from "@/types";
import { useI18n } from "./i18n/I18nProvider";

type ProjectRowProps = {
  project: Project;
  onOpen: (project: Project) => void;
  /** Avisa dónde está el mouse para mover la vista previa flotante (null al salir). */
  onHover: (project: Project | null, event?: MouseEvent) => void;
};

/** Fila compacta de la vista lista: nombre, qué es, etiqueta de trailer y año. */
export default function ProjectRow({ project, onOpen, onHover }: ProjectRowProps) {
  const { dict } = useI18n();

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      onMouseEnter={(event) => onHover(project, event)}
      onMouseMove={(event) => onHover(project, event)}
      onMouseLeave={() => onHover(null)}
      aria-haspopup="dialog"
      className="group/row flex w-full items-center gap-3 py-2.5 text-left focus-visible:outline-none"
    >
      <span className="shrink-0 font-semibold transition-colors group-hover/row:text-accent group-focus-visible/row:text-accent">
        {project.title}
      </span>
      <span className="min-w-0 flex-1 truncate text-muted">{project.tagline}</span>
      {project.trailer && (
        <span className="hidden shrink-0 rounded-md bg-accent/15 px-1.5 py-0.5 font-mono text-[11px] text-accent sm:inline">
          ▶ {dict.projects.trailerBadge}
        </span>
      )}
      <span className="shrink-0 font-mono text-xs text-muted tabular-nums">{project.year}</span>
    </button>
  );
}
