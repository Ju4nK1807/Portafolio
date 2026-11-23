import { site, socials } from "@/data/site";
import ContactForm from "./ContactForm";
import CopyEmailButton from "./CopyEmailButton";
import { MailIcon, SocialIconFor } from "./icons";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Contact() {
  return (
    <section id="contacto" className="section bg-surface-2/40">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionTitle
            index="06"
            eyebrow="Contacto"
            title="Hablemos."
            description="¿Un proyecto, una práctica o una pregunta? Escríbeme y te respondo."
          />

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-lg font-medium break-all transition-colors hover:text-accent"
              >
                <MailIcon className="shrink-0 text-accent" /> {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </div>

            <ul className="flex flex-wrap gap-3">
              {socials
                .filter((social) => social.icon !== "mail")
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      <SocialIconFor icon={social.icon} /> {social.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
