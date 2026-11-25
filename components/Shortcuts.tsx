"use client";

import { useEffect, useState } from "react";
import { sectionIds } from "@/data/navigation";
import { languageHref, toggleTheme } from "@/lib/theme";
import { useI18n } from "./i18n/I18nProvider";

/** Salta a la sección siguiente (1) o anterior (-1) según lo que se ve en pantalla. */
function jump(direction: 1 | -1) {
  const tops = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)
    .map((el) => ({ el, top: el.getBoundingClientRect().top - 72 }));
  const target =
    direction === 1 ? tops.find((s) => s.top > 8) : [...tops].reverse().find((s) => s.top < -8);
  target?.el.scrollIntoView({ behavior: "smooth" });
}

/** Atajos de teclado de todo el sitio + botón "?" que muestra la ayuda. */
export default function Shortcuts() {
  const { lang, dict } = useI18n();
  const t = dict.shortcuts;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (target.closest("input, textarea, select, [contenteditable]")) return;

      const key = event.key.toLowerCase();
      if (key === "escape") setOpen(false);
      else if (key === "?") setOpen((value) => !value);
      else if (key === "t") toggleTheme();
      else if (key === "l") window.location.href = languageHref(lang === "es" ? "en" : "es");
      else if (key === "j") jump(1);
      else if (key === "k") jump(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang]);

  const rows: [string, string][] = [
    ["J", t.next],
    ["K", t.prev],
    ["/", t.search],
    ["T", t.theme],
    ["L", t.language],
    ["?", t.help],
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="atajos"
        aria-label={dict.nav.shortcuts}
        title={`${dict.nav.shortcuts} (?)`}
        className="hidden size-9 place-items-center rounded-full font-mono text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg lg:grid"
      >
        ?
      </button>

      {open && (
        <div
          id="atajos"
          role="dialog"
          aria-label={t.title}
          className="fixed top-20 right-5 z-50 w-72 animate-modal-in overflow-hidden rounded-lg border border-accent/40 bg-surface font-mono text-xs shadow-2xl shadow-black/50"
        >
          <div className="flex items-center justify-between border-b border-accent/30 px-3 py-2 text-accent">
            <span>~/atajos</span>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="text-muted hover:text-fg">
              esc
            </button>
          </div>
          <dl className="space-y-2 p-3">
            {rows.map(([key, label]) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <dt className="text-muted">{label}</dt>
                <dd>
                  <kbd className="inline-grid min-w-6 place-items-center rounded border border-line bg-bg px-1.5 py-0.5 text-fg shadow-[0_2px_0] shadow-line">
                    {key}
                  </kbd>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}
