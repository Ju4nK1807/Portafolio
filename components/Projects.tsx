"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="proyectos" className="section bg-surface-2/40">
      <div className="container-page">
        <SectionTitle
          index="02"
          eyebrow="Proyectos"
          title="Cosas que he construido."
          description="Proyectos académicos y personales: web, móvil, escritorio y wearables. Haz clic en uno para ver su trailer y los detalles."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 3) * 100} className="h-full">
                <ProjectCard project={project} onOpen={setSelected} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
