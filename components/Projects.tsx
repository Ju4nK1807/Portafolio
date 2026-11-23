import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Projects() {
  return (
    <section id="proyectos" className="section bg-surface-2/40">
      <div className="container-page">
        <SectionTitle
          index="02"
          eyebrow="Proyectos"
          title="Cosas que he construido."
          description="Proyectos académicos y personales: web, móvil, escritorio y wearables."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 3) * 100} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
