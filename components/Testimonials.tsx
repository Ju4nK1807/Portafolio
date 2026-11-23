import { testimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Testimonials() {
  return (
    <section id="testimonios" className="section">
      <div className="container-page">
        <SectionTitle
          index="04"
          eyebrow="Testimonios"
          title="Lo que dicen quienes han trabajado conmigo."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
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
