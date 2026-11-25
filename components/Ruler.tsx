"use client";

import { useEffect, useRef, useState } from "react";

const STEP = 100;

/**
 * Regla vertical en el borde izquierdo, como en una herramienta de diseño:
 * los números son la posición real en la página (en px) y un marcador sigue al cursor.
 */
export default function Ruler() {
  const [scroll, setScroll] = useState(0);
  const [height, setHeight] = useState(0);
  const markerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScroll(window.scrollY);
        setHeight(window.innerHeight);
      });
    };
    const onPointer = (event: PointerEvent) => {
      if (!markerRef.current || !labelRef.current) return;
      markerRef.current.style.transform = `translateY(${event.clientY}px)`;
      labelRef.current.textContent = String(Math.round(window.scrollY + event.clientY));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const first = Math.floor(scroll / STEP) * STEP;
  const labels: number[] = [];
  for (let y = first; y < scroll + height + STEP; y += STEP) labels.push(y);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-6 border-r border-line/70 bg-bg/60 font-mono text-[9px] text-muted/70 backdrop-blur-sm xl:block"
      style={{
        // Rayitas cada 10 px, más largas cada 50 px; se mueven con el scroll.
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 10px), repeating-linear-gradient(to bottom, var(--muted) 0 1px, transparent 1px 50px)",
        backgroundSize: "6px 100px, 10px 100px",
        backgroundPosition: `right 0 top ${-scroll}px, right 0 top ${-scroll}px`,
        backgroundRepeat: "repeat-y",
      }}
    >
      {labels.map((y) => (
        <span
          key={y}
          className="absolute left-0.5 origin-top-left -rotate-90 tabular-nums"
          style={{ top: y - scroll + 22 }}
        >
          {y}
        </span>
      ))}

      <div ref={markerRef} className="absolute top-0 left-0 w-full will-change-transform">
        <span className="absolute -top-px right-0 h-0.5 w-full bg-accent shadow-[0_0_6px] shadow-accent" />
        <span
          ref={labelRef}
          className="absolute top-1 left-7 rounded-sm bg-accent px-1 text-[9px] text-accent-fg tabular-nums"
        />
      </div>
    </div>
  );
}
