"use client";

import { useEffect } from "react";

/**
 * Un solo listener para todo el sitio: le dice a la tarjeta `.spot` que está bajo el mouse
 * dónde está el cursor (--x, --y), y el CSS dibuja el brillo y el borde iluminado.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
