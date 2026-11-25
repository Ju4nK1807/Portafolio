"use client";

import { useEffect, useRef } from "react";

// Miles de partículas que forman un texto (las iniciales). El mouse las empuja,
// un clic las hace explotar y siempre vuelven a su lugar con un resorte.
// Canvas 2D puro, sin librerías.

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  /** 0 = color principal, 1 = color secundario (degradado de izquierda a derecha). */
  tint: number;
  size: number;
  phase: number;
};

function readColor(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type ParticleFieldProps = {
  text: string;
  className?: string;
};

export default function ParticleField({ text, className = "" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let palette: [number, number, number][] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const loadColors = () => {
      palette = [hexToRgb(readColor("--accent", "#3dff8b")), hexToRgb(readColor("--accent-2", "#2ee6d6"))];
    };

    /** Dibuja el texto en un canvas oculto y toma un punto cada `gap` píxeles donde hay tinta. */
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wide = width > 900;
      const gap = wide ? 6 : 5;
      const fontSize = Math.min(height * (wide ? 0.62 : 0.42), width * (wide ? 0.34 : 0.62));
      const centerX = wide ? width * 0.73 : width * 0.5;
      const centerY = wide ? height * 0.5 : height * 0.3;

      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = Math.ceil(height);
      const octx = off.getContext("2d");
      if (!octx) return;
      const family = getComputedStyle(document.body).fontFamily;
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `800 ${fontSize}px ${family}`;
      octx.fillText(text, centerX, centerY);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const next: Particle[] = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          if (data[(y * off.width + x) * 4 + 3] < 128) continue;
          const previous = particles[next.length];
          next.push({
            // Al construir por primera vez nacen dispersas y se arman solas.
            x: previous?.x ?? Math.random() * width,
            y: previous?.y ?? Math.random() * height,
            vx: 0,
            vy: 0,
            tx: x,
            ty: y,
            tint: Math.min(1, Math.max(0, (x - (centerX - fontSize * 0.6)) / (fontSize * 1.2))),
            size: Math.random() < 0.15 ? 2.8 : 2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      particles = next;
      if (reducedMotion) particles.forEach((p) => ((p.x = p.tx), (p.y = p.ty)));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const [a, b] = palette;
      const radius = 110;

      for (const p of particles) {
        if (!reducedMotion) {
          // Pequeña "respiración" para que nunca esté quieto del todo.
          const tx = p.tx + Math.sin(time * 0.0012 + p.phase) * 1.4;
          const ty = p.ty + Math.cos(time * 0.001 + p.phase) * 1.4;
          p.vx += (tx - p.x) * 0.045;
          p.vy += (ty - p.y) * 0.045;

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < radius && dist > 0.01) {
              const force = (1 - dist / radius) * 9;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }

        // Más brillo cuanto más rápido se mueve.
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 6);
        const r = Math.round(a[0] + (b[0] - a[0]) * p.tint);
        const g = Math.round(a[1] + (b[1] - a[1]) * p.tint);
        const bl = Math.round(a[2] + (b[2] - a[2]) * p.tint);
        ctx.fillStyle = `rgba(${r},${g},${bl},${0.8 + speed * 0.2})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (visible) draw(time);
    };

    const explode = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = event.clientX - rect.left;
      const cy = event.clientY - rect.top;
      for (const p of particles) {
        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.8;
        const power = 18 + Math.random() * 30;
        p.vx += Math.cos(angle) * power;
        p.vy += Math.sin(angle) * power;
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = mouse.y > -50 && mouse.y < rect.height + 50;
    };
    const onLeave = () => (mouse.active = false);

    // El contenedor recibe los clics (el canvas no estorba a los botones).
    const host = canvas.parentElement?.parentElement ?? canvas;
    const onDown = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button, input")) return;
      explode(event);
    };

    loadColors();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 120);
    });
    const themeObserver = new MutationObserver(loadColors);
    const visibility = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));

    document.fonts.ready.then(() => {
      build();
      resizeObserver.observe(canvas);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      visibility.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
      if (reducedMotion) draw(0);
      else frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [text]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`size-full ${className}`} />;
}
