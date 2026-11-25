import { getProfile, getSocials, site } from "@/data/site";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import BootScreen from "./hero/BootScreen";
import ParticleField from "./hero/ParticleField";
import RoleRoller from "./hero/RoleRoller";
import { ArrowRightIcon, DownloadIcon, SocialIconFor } from "./icons";
import StatusClock from "./StatusClock";
import Magnetic from "./ui/Magnetic";
import SplitText from "./ui/SplitText";

export default function Hero({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const profile = getProfile(lang);
  const lastName = `${site.name.replace(site.firstName, "").trim()}.`;

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden">
      <BootScreen />

      {/* Fondo: puntos, dos resplandores de color y el campo de partículas */}
      <div
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[10%] right-[5%] size-[38rem] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[30%] bottom-[5%] size-[28rem] rounded-full bg-accent-2/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-40 lg:opacity-100">
        <ParticleField text={site.initials} />
      </div>

      <div className="container-page pointer-events-none relative flex flex-1 flex-col justify-center pt-32 pb-12">
        <div className="pointer-events-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent">
              {dict.hud.available}
            </span>
            <span className="text-muted">
              {dict.hero.prompt} <span className="text-fg">whoami</span>
            </span>
          </div>

          <h1 className="mt-8 text-[clamp(3.4rem,8.5vw,8rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
            <SplitText text={site.firstName} delay={1500} />
            <br />
            <SplitText
              text={lastName}
              delay={1850}
              className="pr-[0.1em] font-serif font-normal tracking-[-0.02em] text-accent italic"
            />
          </h1>

          <p className="mt-8 flex items-baseline gap-3 font-mono text-lg sm:text-xl">
            <span className="text-accent">→</span>
            <RoleRoller key={lang} words={profile.roles} className="text-fg" />
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <Magnetic>
              <a
                href={site.cv}
                download
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-fg shadow-[0_0_40px_-8px] shadow-glow transition-transform hover:scale-[1.03]"
              >
                <DownloadIcon className="transition-transform group-hover:translate-y-0.5" /> {dict.hero.downloadCv}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#proyectos"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-6 py-3.5 font-medium backdrop-blur-sm transition-colors hover:border-fg"
              >
                {dict.hero.viewProjects}
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>

            <ul className="ml-1 flex gap-1" aria-label={dict.hero.socials}>
              {getSocials(lang).map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-11 place-items-center rounded-full text-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <SocialIconFor icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Franja inferior con datos en vivo */}
      <div className="container-page relative pb-8">
        <div className="grid grid-cols-2 items-center gap-4 border-t border-line pt-5 font-mono text-[11px] text-muted uppercase sm:grid-cols-3">
          <StatusClock className="flex" withLocation />
          <p className="hidden text-center sm:block">{dict.hero.hint}</p>
          <a href="#sobre-mi" className="justify-self-end transition-colors hover:text-accent">
            scroll <span className="inline-block animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
