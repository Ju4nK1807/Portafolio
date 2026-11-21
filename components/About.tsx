import { aboutParagraphs, quickFacts, site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const highlightSkills = skillGroups.flatMap((group) => group.items).slice(0, 12);

export default function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="container-page">
        <SectionTitle
          index="01"
          eyebrow="Acerca de mí"
          title="Del boceto al dispositivo."
          description="Un poco de quién soy, qué estudio y qué me gusta construir."
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-pretty text-muted">
            <p className="text-2xl leading-snug text-fg">
              Soy {site.name}, {site.role.toLowerCase()} y estudiante.
            </p>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={150} className="space-y-6">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="bg-surface p-5">
                  <dt className="font-mono text-xs text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="font-mono text-xs text-muted uppercase">Tecnologías que uso</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {highlightSkills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line px-3 py-1 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
