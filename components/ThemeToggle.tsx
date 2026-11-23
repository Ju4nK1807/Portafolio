"use client";

import { useSyncExternalStore } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { MoonIcon, SunIcon } from "./icons";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true;

/** Botón para cambiar entre modo oscuro y modo claro. */
export default function ThemeToggle() {
  const { dict } = useI18n();
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Sin almacenamiento disponible: el cambio dura solo esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? dict.theme.toLight : dict.theme.toDark}
      title={dark ? dict.theme.light : dict.theme.dark}
      className="grid size-10 place-items-center rounded-full border border-line text-lg text-muted transition-colors hover:border-accent hover:text-fg"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
