import { getSkillGroups, marqueeSkills } from "@/data/skills";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import Marquee from "./Marquee";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

/** Sección adicional: habilidades y herramientas. */
export default function Skills({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).skills;
  const half = Math.ceil(marqueeSkills.length / 2);

  return (
    <section id="habilidades" className="section overflow-hidden">
      <div className="container-page">
        <SectionTitle index="05" eyebrow={t.eyebrow} title={t.title} description={t.description} />
      </div>

      {/* Dos cintas en sentidos opuestos, una inclinada */}
      <div className="-rotate-2 space-y-2 border-y border-line bg-surface/50 py-6">
        <Marquee items={marqueeSkills.slice(0, half)} label={t.marquee} />
        <Marquee items={marqueeSkills.slice(half)} label={t.marquee} reverse outline />
      </div>

      <div className="container-page mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getSkillGroups(lang).map((group, index) => (
          <Reveal key={group.title} delay={index * 100}>
            <div className="spot flex h-full flex-col rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl italic">{group.title}</h3>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-fg"
                  >
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
