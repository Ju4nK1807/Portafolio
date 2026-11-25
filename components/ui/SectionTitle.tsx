import { sectionIds } from "@/data/navigation";

// Total de secciones numeradas (todas menos el inicio).
const TOTAL = String(sectionIds.length - 1).padStart(2, "0");

type SectionTitleProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

/** Encabezado editorial: número grande, título con la última palabra en serif cursiva. */
export default function SectionTitle({ index, eyebrow, title, description }: SectionTitleProps) {
  const cut = title.trimEnd().lastIndexOf(" ");
  const head = cut > 0 ? title.slice(0, cut) : "";
  const tail = cut > 0 ? title.slice(cut + 1) : title;

  return (
    <div className="mb-14 md:mb-20">
      {/* Línea de "plano" con marcas de cruz en los extremos */}
      <div aria-hidden="true" className="mb-10 flex items-center gap-3 font-mono text-[10px] text-muted/70">
        <span className="text-accent">+</span>
        <span className="h-px flex-1 bg-line" />
        <span className="tabular-nums">
          {index} / {TOTAL}
        </span>
        <span className="h-px w-10 bg-line" />
        <span className="text-accent">+</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        <span
          aria-hidden="true"
          className="text-outline font-serif text-7xl leading-[0.8] italic md:text-[9rem]"
        >
          {index}
        </span>
        <div className="max-w-3xl self-end">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">({eyebrow})</p>
          <h2 className="mt-3 text-4xl leading-[1] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-6xl">
            {head}{" "}
            <span className="font-serif font-normal tracking-[-0.01em] text-accent italic">{tail}</span>
          </h2>
          {description && <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">{description}</p>}
        </div>
      </div>
    </div>
  );
}
