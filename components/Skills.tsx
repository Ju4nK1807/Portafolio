import { marqueeSkills, skillGroups } from "@/data/skills";
import Marquee from "./Marquee";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

/** Sección adicional: habilidades y herramientas. */
export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container-page">
        <SectionTitle
          index="05"
          eyebrow="Habilidades"
          title="Con qué construyo."
          description="Lenguajes, frameworks y herramientas que uso en mis proyectos."
        />
      </div>

      <Marquee items={marqueeSkills} />

      <div className="container-page mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 100}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-sm text-accent">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent-2" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
