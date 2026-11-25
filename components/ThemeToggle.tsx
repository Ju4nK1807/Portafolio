"use client";

import { useSyncExternalStore } from "react";
import { toggleTheme } from "@/lib/theme";
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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? dict.theme.toLight : dict.theme.toDark}
      title={`${dark ? dict.theme.light : dict.theme.dark} (T)`}
      className="grid size-9 place-items-center rounded-full text-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
