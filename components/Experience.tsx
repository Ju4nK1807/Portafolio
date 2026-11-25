import { getExperience } from "@/data/experience";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { ExperienceKind } from "@/types";
import ExperienceItem from "./ExperienceItem";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const groups: ExperienceKind[] = ["laboral", "academica"];

export default function Experience({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).experience;

  return (
    <section id="experiencia" className="section">
      <div className="container-page">
        <SectionTitle index="04" eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="space-y-16">
          {groups.map((group, index) => {
            const items = getExperience(group, lang);
            return (
              <Reveal key={group} delay={index * 120}>
                <div className="mb-4 flex items-baseline justify-between gap-4 px-4 md:px-6">
                  <h3 className="font-serif text-3xl italic md:text-4xl">{t[group]}</h3>
                  <span className="font-mono text-xs text-muted tabular-nums">
                    [{String(items.length).padStart(2, "0")}]
                  </span>
                </div>
                <ol className="border-b border-line">
                  {items.map((item) => (
                    <ExperienceItem key={`${item.title}-${item.start}`} item={item} lang={lang} />
                  ))}
                </ol>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
