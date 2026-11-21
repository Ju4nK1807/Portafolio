"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  className?: string;
};

/** Escribe y borra cada palabra como en una terminal, con cursor parpadeante. */
export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let wordIndex = 0;
    let length = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const word = words[wordIndex];
      length += deleting ? -1 : 1;
      setText(word.slice(0, length));

      let wait = deleting ? 35 : 70;
      if (!deleting && length === word.length) {
        deleting = true;
        wait = 2200;
      } else if (deleting && length === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        wait = 300;
      }
      timer = setTimeout(step, wait);
    };

    timer = setTimeout(step, 2600);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="animate-blink ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-accent" />
    </span>
  );
}
