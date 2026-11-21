import { formatRange } from "@/lib/format";
import type { Experience } from "@/types";

type ExperienceItemProps = {
  item: Experience;
};

export default function ExperienceItem({ item }: ExperienceItemProps) {
  const current = item.end === null;

  return (
    <li className="relative pb-10 pl-8 last:pb-0">
      <span
        className={`absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full border-2 ${current ? "border-accent bg-accent" : "border-line bg-bg"}`}
        aria-hidden="true"
      />
      <p className="font-mono text-xs text-muted">
        <time dateTime={item.start}>{formatRange(item.start, item.end)}</time>
        {current && <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-accent">Actual</span>}
      </p>
      <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
      <p className="text-sm text-accent">{item.org}</p>
      <p className="mt-2 text-pretty text-muted">{item.description}</p>
    </li>
  );
}
