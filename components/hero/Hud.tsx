"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { quickFacts, site } from "@/data/site";

// ---- Fuentes de datos "en vivo" para el panel ----

const noop = () => () => {};

function subscribeClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}
const getTime = () =>
  new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
const getViewport = () => `${window.innerWidth}×${window.innerHeight}`;

function getBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Desconocido";
}

const COMMIT = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "dev").slice(0, 7);
const location = quickFacts.find((fact) => fact.label === "Ubicación")?.value ?? "";

/** Panel de metadatos estilo terminal con la "credencial" del autor. */
export default function Hud() {
  const time = useSyncExternalStore(subscribeClock, getTime, () => "--:--:--");
  const viewport = useSyncExternalStore(subscribeResize, getViewport, () => "----×----");
  const browser = useSyncExternalStore(noop, getBrowser, () => "…");

  const rows: [string, string][] = [
    ["commit", COMMIT],
    ["navegador", browser],
    ["hora local", time],
    ["pantalla", viewport],
    ["ubicación", location],
  ];

  return (
    <aside
      aria-label="Metadatos"
      className="w-full max-w-xs rounded-lg border border-accent/30 bg-bg/70 font-mono text-xs backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-accent/30 px-3 py-2 text-accent">
        <span>~/metadata</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-accent/30" />
          <span className="size-2 rounded-full bg-accent/60" />
          <span className="size-2 rounded-full bg-accent" />
        </span>
      </div>

      <div className="flex gap-3 border-b border-accent/30 p-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded border border-accent/40">
          <Image src={site.photo} alt={`Foto de ${site.name}`} fill unoptimized sizes="64px" className="object-cover grayscale" />
          <span className="scanlines absolute inset-0" aria-hidden="true" />
        </div>
        <div className="min-w-0 leading-relaxed">
          <p className="text-muted">ID://{site.initials}-0001</p>
          <p className="truncate text-fg">{site.name}</p>
          <p className="text-accent">
            {site.available ? "● disponible" : "○ ocupado"}
          </p>
        </div>
      </div>

      <dl className="space-y-1 p-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted">{label}</dt>
            <dd className="truncate text-fg tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
