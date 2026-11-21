type SectionTitleProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionTitle({ index, eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <p className="font-mono text-sm text-accent">
        {index} <span className="text-muted">/</span> {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-pretty text-muted">{description}</p>}
    </div>
  );
}
