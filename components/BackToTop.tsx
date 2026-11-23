"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { ArrowUpIcon } from "./icons";

/** Botón flotante que aparece al bajar y lleva de vuelta al inicio. */
export default function BackToTop() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#inicio"
      aria-label={dict.footer.backToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full bg-accent text-xl text-accent-fg shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUpIcon />
    </a>
  );
}
