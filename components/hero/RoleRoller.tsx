"use client";

import { useEffect, useState } from "react";

/** Los roles van rodando hacia arriba, uno tras otro, como un contador de máquina. */
export default function RoleRoller({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((value) => (value + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words]);

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{
            transform: `translateY(${i === index ? 0 : i === (index - 1 + words.length) % words.length ? -110 : 110}%)`,
            opacity: i === index ? 1 : 0,
            filter: i === index ? "none" : "blur(4px)",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
