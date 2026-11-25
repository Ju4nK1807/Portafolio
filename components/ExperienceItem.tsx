import { getDictionary } from "@/dictionaries";
import { formatRange } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { Experience } from "@/types";

type ExperienceItemProps = {
  item: Experience;
  lang: Locale;
};

/** Fila de la tabla de experiencia: fechas | cargo y lugar | descripción. */
export default function ExperienceItem({ item, lang }: ExperienceItemProps) {
  const t = getDictionary(lang).experience;
  const current = item.end === null;

  return (
    <li className="group spot grid gap-3 rounded-2xl border-t border-line px-4 py-7 transition-colors hover:border-transparent hover:bg-surface md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8 md:px-6">
      <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
        <time dateTime={item.start}>{formatRange(item.start, item.end, t.months, t.present)}</time>
        {current && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-accent">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {t.current}
          </span>
        )}
      </p>
      <div>
        <h4 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">{item.title}</h4>
        <p className="mt-1 font-serif text-lg text-muted italic">{item.org}</p>
      </div>
      <p className="text-pretty text-muted">{item.description}</p>
    </li>
  );
}
