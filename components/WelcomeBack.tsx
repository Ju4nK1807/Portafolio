"use client";

import { useEffect, useState } from "react";
import { fill } from "@/lib/i18n";
import { useI18n } from "./i18n/I18nProvider";
import { CloseIcon } from "./icons";

const VISITS = "visitas";
const SEEN = "bienvenida-vista";

/** Aviso para quien vuelve: "De vuelta por aquí 👋 · visita #3". Una vez por sesión. */
export default function WelcomeBack() {
  const { dict } = useI18n();
  const t = dict.welcome;
  const [visit, setVisit] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let count = 0;
    try {
      if (sessionStorage.getItem(SEEN)) return;
      sessionStorage.setItem(SEEN, "1");
      count = Number(localStorage.getItem(VISITS) ?? 0) + 1;
      localStorage.setItem(VISITS, String(count));
    } catch {
      return;
    }
    if (count < 2) return;

    // Aparece después de la pantalla de arranque y se va sola.
    const open = setTimeout(() => {
      setVisit(count);
      setShow(true);
    }, 2400);
    const close = setTimeout(() => setShow(false), 9000);
    return () => {
      clearTimeout(open);
      clearTimeout(close);
    };
  }, []);

  if (!visit) return null;

  return (
    <div
      role="status"
      className={`fixed top-20 left-1/2 z-40 flex w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 items-center gap-3 rounded-full border border-line bg-surface/90 py-2 pr-2 pl-4 text-sm shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
    >
      <p className="min-w-0 flex-1">
        <span className="font-medium">{t.title}</span>{" "}
        <span className="text-muted">{fill(t.text, { n: String(visit) })}</span>
      </p>
      <a
        href="#proyectos"
        onClick={() => setShow(false)}
        className="shrink-0 rounded-full bg-accent px-3 py-1 font-mono text-xs text-accent-fg"
      >
        {t.cta} →
      </a>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label={t.close}
        className="grid size-7 shrink-0 place-items-center rounded-full text-muted hover:text-fg"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
