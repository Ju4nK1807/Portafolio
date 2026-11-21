import { getExperience } from "@/data/experience";
import type { ExperienceKind } from "@/types";
import ExperienceItem from "./ExperienceItem";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const columns: { kind: ExperienceKind; title: string }[] = [
  { kind: "academica", title: "Experiencia académica" },
  { kind: "laboral", title: "Experiencia laboral" },
];

export default function Experience() {
  return (
    <section id="experiencia" className="section bg-surface-2/40">
      <div className="container-page">
        <SectionTitle
          index="04"
          eyebrow="Experiencia"
          title="Lo que he estudiado y hecho."
          description="Ordenado de lo más reciente a lo más antiguo."
        />

        <div className="grid gap-12 md:grid-cols-2">
          {columns.map((column, index) => (
            <Reveal key={column.kind} delay={index * 150}>
              <h3 className="mb-8 text-xl font-semibold">
                {column.title}
              </h3>
              <ol className="border-l border-line">
                {getExperience(column.kind).map((item) => (
                  <ExperienceItem key={`${item.title}-${item.start}`} item={item} />
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
