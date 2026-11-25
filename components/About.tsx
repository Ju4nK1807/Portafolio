import Image from "next/image";
import { Suspense } from "react";
import { getProfile, site } from "@/data/site";
import { getSkillGroups } from "@/data/skills";
import { getDictionary } from "@/dictionaries";
import { fill, type Locale } from "@/lib/i18n";
import GithubActivity from "./GithubActivity";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const inlineLink =
  "font-medium text-fg underline decoration-accent/60 decoration-2 underline-offset-[6px] transition-colors hover:text-accent";

const tile = "spot h-full rounded-3xl border border-line bg-surface p-6 md:p-8";

/** Sello circular que gira: el nombre y el rol escritos alrededor de un círculo. */
function RotatingBadge({ text }: { text: string }) {
  return (
    <div className="relative grid size-28 place-items-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id="circulo" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-fg font-mono text-[7.6px] tracking-[0.12em] uppercase">
          <textPath href="#circulo">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-10 place-items-center rounded-full bg-accent font-serif text-xl text-accent-fg italic">
        ✦
      </span>
    </div>
  );
}

export default function About({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.about;
  const { role, quickFacts, aboutParagraphs } = getProfile(lang);
  const highlightSkills = getSkillGroups(lang)
    .flatMap((group) => group.items)
    .slice(0, 12);

  return (
    <section id="sobre-mi" className="section">
      <div className="container-page">
        <SectionTitle index="01" eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {/* Mosaico tipo "bento" */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Foto */}
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <figure className="group spot relative h-full min-h-[26rem] overflow-hidden rounded-3xl border border-line bg-surface">
              <Image
                src={site.photoPortrait}
                alt={`${dict.hud.photoOf} ${site.name}`}
                fill
                sizes="(min-width: 1024px) 26rem, 90vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              {/* Versión pixelada encima: se "enfoca" al pasar el mouse */}
              <Image
                src={site.photoPortrait}
                alt=""
                aria-hidden="true"
                width={36}
                height={48}
                quality={40}
                className="absolute inset-0 size-full object-cover transition-opacity duration-700 [image-rendering:pixelated] group-hover:opacity-0"
              />
              <span
                className="absolute inset-0 bg-accent-2 mix-blend-color opacity-50 transition-opacity duration-700 group-hover:opacity-0"
                aria-hidden="true"
              />
              <span
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute top-4 right-4">
                <RotatingBadge text={`${site.name} • ${site.location} • `} />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-serif text-3xl italic">{site.firstName}</p>
                <p className="font-mono text-xs text-white/70 uppercase">{site.location}</p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Texto */}
          <Reveal delay={100} className="lg:col-span-8 lg:row-span-2">
            <div className={`${tile} space-y-5 text-lg leading-relaxed text-pretty text-muted`}>
              <p className="text-2xl leading-snug font-medium tracking-tight text-fg md:text-3xl">
                {fill(t.intro, { name: site.name, role: role.toLowerCase() })}
              </p>
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p>
                {t.reach.before}{" "}
                <a href={`mailto:${site.email}`} className={inlineLink}>
                  {t.reach.mail}
                </a>
                ,{" "}
                <a href={site.github} target="_blank" rel="noreferrer" className={inlineLink}>
                  {t.reach.github}
                </a>
                ,{" "}
                <a href={site.linkedin} target="_blank" rel="noreferrer" className={inlineLink}>
                  {t.reach.linkedin}
                </a>{" "}
                {t.reach.or}{" "}
                <a href={site.cv} download className={inlineLink}>
                  {t.reach.cv}
                </a>
                .
              </p>
            </div>
          </Reveal>

          {/* Datos rápidos: una tarjeta por dato */}
          {quickFacts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 80} className="lg:col-span-3">
              <div className={`${tile} flex min-h-36 flex-col justify-between`}>
                <span className="font-mono text-xs text-muted uppercase">
                  <span className="text-accent">0{index + 1}</span> · {fact.label}
                </span>
                <span className="mt-6 text-xl font-medium tracking-tight text-fg">{fact.value}</span>
              </div>
            </Reveal>
          ))}

          {/* Actividad de GitHub */}
          <Reveal className="lg:col-span-7">
            <div className={tile}>
              <Suspense fallback={null}>
                <GithubActivity lang={lang} />
              </Suspense>
            </div>
          </Reveal>

          {/* Tecnologías */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className={tile}>
              <h3 className="font-mono text-xs text-muted uppercase">{t.tech}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {highlightSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
