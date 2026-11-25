"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useI18n } from "../i18n/I18nProvider";

const DURATION = 1300;
const KEY = "boot-visto";

/** Pantalla de carga: contador gigante de 000 a 100 y una cortina que sube. Una vez por sesión. */
export default function BootScreen() {
  const { dict } = useI18n();
  const lines = dict.boot.lines;
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"running" | "leaving" | "done">("running");

  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
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
      const linear = Math.min(1, (now - start) / DURATION);
      setProgress(1 - Math.pow(1 - linear, 3));
      if (linear < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase("leaving");
        timer = setTimeout(() => setPhase("done"), 800);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  if (phase === "done") return null;

  const visibleLines = Math.ceil(progress * lines.length);

  return (
    <div
      role="status"
      aria-label={dict.boot.loading}
      className={`fixed inset-0 z-[70] flex flex-col justify-between bg-bg p-6 font-mono transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] sm:p-10 ${phase === "leaving" ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-start justify-between gap-6 text-xs text-muted">
        <ul className="space-y-1">
          {lines.slice(0, visibleLines).map((line) => (
            <li key={line}>{line.trim()}</li>
          ))}
        </ul>
        <span className="text-right text-fg">
          {site.name}
          <br />
          <span className="text-muted">{site.location}</span>
        </span>
      </div>

      <div>
        <p className="text-[clamp(5rem,22vw,18rem)] leading-[0.8] font-medium tracking-tighter text-fg tabular-nums">
          {String(Math.round(progress * 100)).padStart(3, "0")}
          <span className="text-accent">%</span>
        </p>
        <div className="mt-6 h-px w-full bg-line">
          <div className="h-full bg-accent shadow-[0_0_12px] shadow-glow" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
