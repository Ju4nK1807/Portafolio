"use client";

import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Qué tanto se acerca al cursor (0 = nada, 0.5 = mucho). */
  strength?: number;
  className?: string;
};

/** Envuelve un botón para que "persiga" un poco al mouse cuando está cerca. */
export default function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * strength;
        const y = (event.clientY - rect.top - rect.height / 2) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}
