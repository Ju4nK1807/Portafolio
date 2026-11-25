import { getSocials, site } from "@/data/site";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import ContactForm from "./ContactForm";
import CopyEmailButton from "./CopyEmailButton";
import { ArrowRightIcon, SocialIconFor } from "./icons";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

export default function Contact({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).contact;

  return (
    <section id="contacto" className="section relative overflow-hidden">
      {/* Resplandor de fondo */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[50rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionTitle index="06" eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="space-y-10">
            {/* Correo en grande */}
            <div>
              <Magnetic strength={0.12}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-3 font-serif text-2xl italic transition-colors [overflow-wrap:anywhere] hover:text-accent sm:text-3xl xl:text-[2.5rem]"
                >
                  {site.email}
                  <ArrowRightIcon className="shrink-0 -rotate-45 text-2xl transition-transform group-hover:rotate-0" />
                </a>
              </Magnetic>
              <div className="mt-5">
                <CopyEmailButton email={site.email} />
              </div>
            </div>

            {/* Redes como filas grandes */}
            <ul className="border-t border-line">
              {getSocials(lang)
                .filter((social) => social.icon !== "mail")
                .map((social, index) => (
                  <li key={social.label} className="border-b border-line">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 py-5 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-xs text-muted">0{index + 1}</span>
                      <SocialIconFor icon={social.icon} className="text-xl" />
                      <span className="flex-1 text-2xl font-medium tracking-tight">{social.label}</span>
                      <ArrowRightIcon className="-rotate-45 text-xl transition-transform duration-300 group-hover:rotate-0" />
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
