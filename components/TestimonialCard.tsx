import Image from "next/image";
import { initialsOf } from "@/lib/format";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
      <span className="font-serif text-6xl leading-none text-accent" aria-hidden="true">
        “
      </span>
      <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-pretty">{testimonial.quote}</blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <span
            className="grid size-12 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent"
            aria-hidden="true"
          >
            {initialsOf(testimonial.name)}
          </span>
        )}
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted">
            {testimonial.role} · <span className="text-accent">{testimonial.relation}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
