"use client";

import { useEffect } from "react";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { CloseIcon, DownloadIcon } from "./icons";

type MobileMenuProps = {
  open: boolean;
  active: string;
  onClose: () => void;
};

/** Menú desplegable para celular (se abre desde el botón hamburguesa). */
export default function MobileMenu({ open, active, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-movil"
      className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-bg/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      <nav
        aria-label="Menú móvil"
        className={`absolute top-0 right-0 flex h-full w-[min(20rem,85vw)] flex-col border-l border-line bg-surface p-6 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-muted">Menú</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="grid size-10 place-items-center rounded-full border border-line text-lg"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="mt-8 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className={`flex items-baseline gap-3 rounded-lg px-3 py-3 text-lg transition-colors ${active === link.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
              >
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.cv}
          download
          tabIndex={open ? 0 : -1}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-fg"
        >
          <DownloadIcon /> Descargar CV
        </a>
      </nav>
    </div>
  );
}
