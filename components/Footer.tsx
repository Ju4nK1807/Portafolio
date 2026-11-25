import { sectionIds } from "@/data/navigation";
import { getProfile, getSocials, site } from "@/data/site";
import { getDictionary } from "@/dictionaries";
import { formatMonth } from "@/lib/format";
import { fill, type Locale } from "@/lib/i18n";
import { ArrowUpIcon, SocialIconFor } from "./icons";

/** Mes de la última compilación ("2026-11"). Se calcula al compilar y queda en caché. */
async function getBuildMonth() {
  "use cache";
  return new Date().toISOString().slice(0, 7);
}

export default async function Footer({ lang }: { lang: Locale }) {
  const built = await getBuildMonth();
  const year = built.slice(0, 4);
  const dict = getDictionary(lang);
  const t = dict.footer;

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_auto]">
        <div>
          <p className="font-serif text-3xl italic">{site.name}</p>
          <p className="mt-3 max-w-sm text-muted">{getProfile(lang).role}. {t.thanks}</p>
          <ul className="mt-6 flex gap-3" aria-label={dict.hero.socials}>
            {getSocials(lang).map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIconFor icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.quickLinks}>
          <h2 className="font-mono text-xs text-muted uppercase">{t.quickLinks}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted transition-colors hover:text-fg">
                  {dict.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#inicio"
          className="inline-flex h-fit items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpIcon /> {t.backToTop}
        </a>
      </div>

      {/* Nombre gigante que se corta en el borde inferior */}
      <div className="overflow-hidden" aria-hidden="true">
        <p className="container-page translate-y-[18%] bg-gradient-to-b from-fg/90 to-fg/0 bg-clip-text text-[15.5vw] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none xl:text-[11.5rem]">
          {site.firstName.split(" ")[0]}{" "}
          <span className="font-serif font-normal tracking-[-0.02em] italic">{site.firstName.split(" ")[1]}</span>
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {t.rights}
          </p>
          <p>
            {t.madeWith} · {fill(t.updated, { date: formatMonth(built, dict.experience.months).toLowerCase() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
