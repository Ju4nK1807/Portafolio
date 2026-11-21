import { site, socials } from "@/data/site";
import Avatar from "./Avatar";
import { ArrowRightIcon, DownloadIcon, SocialIconFor } from "./icons";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-16 md:grid-cols-[1.25fr_1fr]">
        <div>
          {site.available && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-2 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
              </span>
              Disponible para prácticas
            </p>
          )}

          <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Hola, soy <span className="text-accent">{site.firstName}</span>.
          </h1>

          <p className="mt-4 font-mono text-base text-muted sm:text-lg">
            {site.role} <span className="text-accent">·</span> {site.name}
          </p>

          <p className="mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl">{site.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.cv}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              <DownloadIcon /> Descargar CV
            </a>
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-fg"
            >
              Ver proyectos
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
                  className="grid size-11 place-items-center rounded-full border border-line text-lg text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIconFor icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Avatar />
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-muted transition-colors hover:text-fg md:block"
      >
        scroll ↓
      </a>
    </section>
  );
}
