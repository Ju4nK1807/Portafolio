import { projects } from "@/data/projects";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const withTrailer = projects.filter((project) => project.trailer);

/** Trailers en video de los proyectos que tienen uno. */
export default function Trailers() {
  return (
    <section id="trailers" className="section">
      <div className="container-page">
        <SectionTitle
          index="03"
          eyebrow="Trailers"
          title="Mis proyectos en movimiento."
          description="Un vistazo rápido a cómo se ven y se usan mis aplicaciones."
        />

        <ul className="grid gap-8 md:grid-cols-2">
          {withTrailer.map((project, index) => (
            <li key={project.slug} id={`trailer-${project.slug}`} className="scroll-mt-24">
              <Reveal delay={(index % 2) * 120}>
                <figure className="overflow-hidden rounded-lg border border-accent/30 bg-surface">
                  <figcaption className="flex items-center justify-between gap-3 border-b border-accent/30 px-4 py-2 font-mono text-xs">
                    <span className="truncate text-accent">~/trailers/{project.slug}.mp4</span>
                    <span className="flex shrink-0 gap-1.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-accent/30" />
                      <span className="size-2 rounded-full bg-accent/60" />
                      <span className="size-2 rounded-full bg-accent" />
                    </span>
                  </figcaption>

                  <video
                    src={project.trailer}
                    poster={project.image}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-video w-full bg-black object-contain"
                    aria-label={`Trailer de ${project.title}`}
                  >
                    Tu navegador no puede reproducir este video.
                  </video>

                  <div className="flex items-baseline justify-between gap-4 p-5">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted">{project.tagline}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
                  </div>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
