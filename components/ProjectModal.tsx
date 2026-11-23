"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/types";
import { CloseIcon, ExternalIcon, GithubIcon } from "./icons";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/** Ventana con el detalle de un proyecto: trailer (o imagen), descripción, tecnologías y enlaces. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // El estado de React manda: con proyecto se abre, sin proyecto se cierra.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    }
  }, [project]);

  // Por si el componente desaparece con la ventana abierta.
  useEffect(() => () => void (document.body.style.overflow = ""), []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        // Tecla Esc: cerramos desde el estado para no depender del evento "close".
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        // El evento "close" llega con retraso; si ya se abrió otro proyecto, se ignora.
        if (!dialogRef.current?.open) onClose();
      }}
      onClick={(event) => {
        // Clic fuera del contenido (en el fondo oscuro) cierra la ventana.
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="modal-proyecto-titulo"
      className="m-auto max-h-[calc(100svh-2rem)] w-[min(56rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-accent/40 bg-surface p-0 text-fg shadow-2xl shadow-accent/10 backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-modal-in"
    >
      {project && (
        <div className="flex max-h-[calc(100svh-2rem)] flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-accent/30 px-4 py-2.5 font-mono text-xs">
            <span className="truncate text-accent">~/proyectos/{project.slug}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="grid size-8 shrink-0 place-items-center rounded-md border border-line text-base text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="overflow-y-auto">
            {project.trailer ? (
              <video
                key={project.slug}
                src={project.trailer}
                poster={project.image}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black object-contain"
                aria-label={`Trailer de ${project.title}`}
              >
                Tu navegador no puede reproducir este video.
              </video>
            ) : (
              <div className={`relative aspect-video ${project.imageFit === "contain" ? "bg-white" : "bg-black"}`}>
                <Image
                  src={project.image}
                  alt={`Vista previa de ${project.title}`}
                  fill
                  sizes="(min-width: 896px) 56rem, 100vw"
                  className={project.imageFit === "contain" ? "object-contain p-8" : "object-cover"}
                />
              </div>
            )}

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${project.status === "Terminado" ? "bg-accent-2/90 text-black" : "bg-surface-2 text-fg"}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-muted">{project.year}</span>
                </div>
                <h3 id="modal-proyecto-titulo" className="mt-3 text-3xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 text-accent">{project.tagline}</p>
              </div>

              <p className="text-lg leading-relaxed text-pretty text-muted">{project.description}</p>

              <div>
                <h4 className="font-mono text-xs text-muted uppercase">Tecnologías</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-md border border-line px-2.5 py-1 font-mono text-sm">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-line pt-6 font-mono text-sm">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
                  >
                    <GithubIcon /> Ver código
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-muted">
                    <GithubIcon /> Repositorio privado
                  </span>
                )}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    Ver demo <ExternalIcon />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-muted">
                    Demo próximamente
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
