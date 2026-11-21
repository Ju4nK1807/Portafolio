import { roles, site, socials } from "@/data/site";
import BootScreen from "./hero/BootScreen";
import DitherBackground from "./hero/DitherBackground";
import Hud from "./hero/Hud";
import ScrambleText from "./hero/ScrambleText";
import Typewriter from "./hero/Typewriter";
import { ArrowRightIcon, DownloadIcon, SocialIconFor } from "./icons";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden">
      <BootScreen />

      {/* Fondo: escena WebGL con dithering + líneas de escaneo */}
      <div className="absolute inset-0 opacity-60 md:opacity-100" aria-hidden="true">
        <DitherBackground />
      </div>
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent md:via-bg/40"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />

      <div className="container-page relative flex flex-1 flex-col justify-between gap-12 pt-24 pb-14">
        <div className="flex justify-end">
          <div className="hidden md:block">
            <Hud />
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="font-mono text-sm text-accent">
            <span className="text-muted">invitado@portafolio:~$</span> whoami
          </p>

          <h1 className="mt-4 font-mono text-5xl leading-[1.02] font-bold tracking-tighter sm:text-6xl xl:text-8xl">
            <ScrambleText text={site.firstName} delay={1700} />
            <br />
            <ScrambleText text="Bastidas." delay={1900} className="text-accent" />
          </h1>

          <p className="mt-6 font-mono text-lg text-fg sm:text-2xl">
            <span className="text-accent">&gt;</span> <Typewriter words={roles} />
          </p>

          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">{site.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
            <a
              href={site.cv}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-accent-fg shadow-[0_0_24px] shadow-accent/40 transition-transform hover:-translate-y-0.5"
            >
              <DownloadIcon /> ./descargar_cv
            </a>
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-md border border-accent/40 bg-bg/60 px-5 py-3 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              ver_proyectos
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <ul className="mt-10 flex gap-3" aria-label="Redes">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-md border border-line bg-bg/60 text-lg text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIconFor icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 md:hidden">
            <Hud />
          </div>
        </div>
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-muted transition-colors hover:text-accent md:block"
      >
        [ scroll ↓ ]
      </a>
    </section>
  );
}
