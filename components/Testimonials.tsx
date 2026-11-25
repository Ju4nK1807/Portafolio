import { getTestimonials } from "@/data/testimonials";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Testimonials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).testimonials;

  return (
    <section id="testimonios" className="section">
      <div className="container-page">
        <SectionTitle index="03" eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <ul className="group/list divide-y divide-line border-y border-line">
          {getTestimonials(lang).map((testimonial, index) => (
            <li
              key={testimonial.name}
              className="transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100!"
            >
              <Reveal delay={index * 120}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
