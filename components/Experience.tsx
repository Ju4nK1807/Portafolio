import { getExperience } from "@/data/experience";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { ExperienceKind } from "@/types";
import ExperienceItem from "./ExperienceItem";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const columns: ExperienceKind[] = ["academica", "laboral"];

export default function Experience({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).experience;

  return (
    <section id="experiencia" className="section bg-surface-2/40">
      <div className="container-page">
        <SectionTitle
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="grid gap-12 md:grid-cols-2">
          {columns.map((column, index) => (
            <Reveal key={column} delay={index * 150}>
              <h3 className="mb-8 text-xl font-semibold">
                {t[column]}
              </h3>
              <ol className="border-l border-line">
                {getExperience(column, lang).map((item) => (
                  <ExperienceItem key={`${item.title}-${item.start}`} item={item} lang={lang} />
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
