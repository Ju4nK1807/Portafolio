"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINES = [
  `> ssh invitado@${site.initials.toLowerCase()}.dev`,
  "  conexión establecida ✓",
  "> cargando módulos [ui, proyectos, experiencia]",
  "> compilando shaders…",
  "> ./portafolio --iniciar",
];

const DURATION = 1600;
const KEY = "boot-visto";

/** Pantalla de arranque tipo terminal. Se muestra una vez por sesión. */
export default function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"running" | "leaving" | "done">("running");

  useEffect(() => {
    let frame = 0;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Sin almacenamiento: se muestra igual.
    }
    const skip = seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let start = 0;
    const tick = (now: number) => {
      if (skip) {
        setPhase("done");
        return;
      }
      if (!start) start = now;
      const value = Math.min(1, (now - start) / DURATION);
      setProgress(value);
      if (value < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase("leaving");
        setTimeout(() => setPhase("done"), 500);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (phase === "done") return null;

  const visibleLines = Math.ceil(progress * LINES.length);

  return (
    <div
      role="status"
      aria-label="Cargando portafolio"
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-bg font-mono text-sm transition-opacity duration-500 ${phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <span className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="w-[min(32rem,90vw)]">
        <ul className="space-y-1 text-accent">
          {LINES.slice(0, Math.max(1, visibleLines)).map((line) => (
            <li key={line} className={line.startsWith(">") ? "" : "text-muted"}>
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-3 text-muted">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent/15">
            <div className="h-full bg-accent" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="w-10 text-right tabular-nums text-accent">{progress.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
