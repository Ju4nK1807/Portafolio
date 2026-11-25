import Image from "next/image";
import { initialsOf } from "@/lib/format";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
};

/** Testimonio en forma de fila: quién lo dice a la izquierda, la cita a la derecha. */
export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <figure className="group grid gap-6 py-12 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-16">
      <figcaption className="flex items-start gap-4 md:flex-col md:gap-5">
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
          {String(index + 1).padStart(2, "0")} /
        </span>
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={44}
              height={44}
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <span
              className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-accent-fg"
              aria-hidden="true"
            >
              {initialsOf(testimonial.name)}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-accent">{testimonial.relation}</p>
            <p className="font-mono text-xs text-muted">{testimonial.role}</p>
          </div>
        </div>
      </figcaption>

      <blockquote className="relative">
        <span
          className="absolute -top-5 left-0 font-serif text-8xl leading-none text-accent italic select-none md:-left-10"
          aria-hidden="true"
        >
          “
        </span>
        <p className="pl-10 font-serif text-2xl leading-snug text-pretty md:pl-0 md:text-[2.1rem] md:leading-[1.25]">
          {testimonial.quote}
        </p>
      </blockquote>
    </figure>
  );
}
