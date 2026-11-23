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
        <SectionTitle
          index="03"
          eyebrow={t.eyebrow}
          title={t.title}
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getTestimonials(lang).map((testimonial, index) => (
            <li key={testimonial.name}>
              <Reveal delay={index * 120} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
