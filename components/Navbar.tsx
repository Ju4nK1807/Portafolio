"use client";

import { useCallback, useEffect, useState } from "react";
import { sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import LanguageSwitch from "./i18n/LanguageSwitch";
import { useI18n } from "./i18n/I18nProvider";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { DownloadIcon, MenuIcon } from "./icons";

export default function Navbar() {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent"}`}
      >
        <nav aria-label={dict.nav.main} className="container-page flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="font-mono text-base font-semibold tracking-tight" aria-label={dict.nav.goHome}>
            <span className="text-accent">&lt;</span>
            {site.initials}
            <span className="text-accent"> /&gt;</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${active === id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
                >
                  {dict.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden sm:flex" />
            <ThemeToggle />
            <a
              href={site.cv}
              download
              className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 md:inline-flex"
            >
              <DownloadIcon /> CV
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid size-10 place-items-center rounded-full border border-line text-lg lg:hidden"
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
