import { navLinks } from "@/data/navigation";
import { site, socials } from "@/data/site";
import { ArrowUpIcon, SocialIconFor } from "./icons";

/** Año para el ©. Se calcula al compilar y queda en caché. */
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_auto]">
        <div>
          <p className="font-mono text-base font-semibold">
            <span className="text-accent">&lt;</span>
            {site.name}
            <span className="text-accent"> /&gt;</span>
          </p>
          <p className="mt-3 max-w-sm text-muted">{site.role}. Gracias por pasar por aquí.</p>
          <ul className="mt-6 flex gap-3" aria-label="Redes">
            {socials.map((social) => (
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

        <nav aria-label="Enlaces rápidos">
          <h2 className="font-mono text-xs text-muted uppercase">Enlaces rápidos</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#inicio"
          className="inline-flex h-fit items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpIcon /> Volver arriba
        </a>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con Next.js, TypeScript y Tailwind CSS · Desplegado en Vercel</p>
        </div>
      </div>
    </footer>
  );
}
