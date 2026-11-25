"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import LanguageSwitch from "./i18n/LanguageSwitch";
import { useI18n } from "./i18n/I18nProvider";
import MobileMenu from "./MobileMenu";
import Shortcuts from "./Shortcuts";
import ThemeToggle from "./ThemeToggle";
import { DownloadIcon, MenuIcon } from "./icons";

const pill = "rounded-full border border-line bg-surface/70 shadow-lg shadow-black/10 backdrop-blur-xl";

export default function Navbar() {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const close = useCallback(() => setOpen(false), []);

  const progressRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Barra de progreso de lectura y estado "con scroll".
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La "pastilla" de fondo se desliza hasta el enlace de la sección activa.
  useLayoutEffect(() => {
    const measure = () => {
      const link = linksRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (link) setIndicator({ left: link.offsetLeft, width: link.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, dict]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent shadow-[0_0_10px] shadow-glow" />
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-4">
        <nav
          aria-label={dict.nav.main}
          className={`container-page flex items-center justify-between gap-3 transition-all duration-500 ${scrolled ? "" : "lg:pt-2"}`}
        >
          <a
            href="#inicio"
            aria-label={dict.nav.goHome}
            className={`pointer-events-auto flex h-11 items-center gap-2 px-4 font-mono text-sm font-semibold ${pill}`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-accent text-[10px] text-accent-fg">
              {site.initials}
            </span>
            <span className="hidden sm:inline">{site.firstName.split(" ")[0].toLowerCase()}.dev</span>
          </a>

          <ul ref={linksRef} className={`pointer-events-auto relative hidden h-11 items-center p-1 lg:flex ${pill}`}>
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-fg transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
            />
            {sectionIds.map((id) => (
              <li key={id} data-id={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-300 ${active === id ? "text-bg" : "text-muted hover:text-fg"}`}
                >
                  {dict.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className={`pointer-events-auto flex h-11 items-center gap-1 px-1 ${pill}`}>
            <LanguageSwitch className="hidden sm:flex" />
            <Shortcuts />
            <ThemeToggle />
            <a
              href={site.cv}
              download
              className="hidden h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.04] md:inline-flex"
            >
              <DownloadIcon /> CV
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid size-9 place-items-center rounded-full text-lg lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Fuera del header: su backdrop-blur atraparía al menú "fixed" dentro de la barra. */}
      <MobileMenu open={open} active={active} onClose={close} />
    </>
  );
}
