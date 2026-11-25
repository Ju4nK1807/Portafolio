"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { useI18n } from "./i18n/I18nProvider";

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

// Hora de Pasto (Colombia), sin importar dónde esté quien visita.
const format = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "America/Bogota",
});
const getTime = () => format.format(new Date());

type StatusClockProps = {
  className?: string;
  /** Muestra "Pasto, Nariño" antes de la hora. */
  withLocation?: boolean;
};

/** "● 21:14:05 [COT]": disponibilidad y hora local de Pasto. */
export default function StatusClock({ className = "hidden xl:flex", withLocation = false }: StatusClockProps) {
  const { dict } = useI18n();
  const time = useSyncExternalStore(subscribe, getTime, () => "--:--:--");

  return (
    <p
      title={`${dict.nav.status} · Pasto (COT)`}
      className={`items-center gap-2 font-mono text-[11px] text-muted uppercase ${className}`}
    >
      {site.available && (
        <>
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          <span className="sr-only">{dict.nav.status}</span>
        </>
      )}
      {withLocation && <span className="text-fg">{site.location}</span>}
      <time className="tabular-nums">{time}</time>
      <span>[COT]</span>
    </p>
  );
}
