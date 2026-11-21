"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01アカサタナ";

type ScrambleTextProps = {
  text: string;
  /** Duración total en milisegundos. */
  duration?: number;
  delay?: number;
  className?: string;
};

/** Texto que se "descifra": letras aleatorias que se resuelven de izquierda a derecha. */
export default function ScrambleText({ text, duration = 1400, delay = 0, className = "" }: ScrambleTextProps) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now + delay;
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const revealed = Math.floor(progress * text.length);

      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || index < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, duration, delay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
