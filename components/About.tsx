import Image from "next/image";
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

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal className="space-y-6">
            {/* Foto con marco de ventana de terminal */}
            <figure className="group mx-auto max-w-sm overflow-hidden rounded-lg border border-accent/30 bg-surface md:mx-0">
              <figcaption className="flex items-center justify-between border-b border-accent/30 px-3 py-2 font-mono text-xs text-accent">
                <span>perfil.jpg</span>
                <span className="text-muted">600×800</span>
              </figcaption>
              <div className="relative aspect-[3/4]">
                <Image
                  src={site.photoPortrait}
                  alt={`Foto de ${site.name}`}
                  fill
                  sizes="(min-width: 768px) 24rem, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <span
                  className="absolute inset-0 bg-accent mix-blend-color opacity-60 transition-opacity duration-500 group-hover:opacity-0"
                  aria-hidden="true"
                />
                <span className="scanlines absolute inset-0 opacity-70" aria-hidden="true" />
              </div>
            </figure>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="bg-surface p-4 sm:p-5">
                  <dt className="font-mono text-xs text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={150} className="space-y-5 text-lg leading-relaxed text-pretty text-muted">
            <p className="text-2xl leading-snug text-fg">
              Soy {site.name}, {site.role.toLowerCase()} y estudiante.
            </p>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}

            <div className="pt-4">
              <h3 className="font-mono text-xs text-muted uppercase">Tecnologías que uso</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {highlightSkills.map((skill) => (
                  <li key={skill} className="rounded-md border border-line px-3 py-1 font-mono text-sm text-fg">
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
