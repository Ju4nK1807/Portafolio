type MarqueeProps = {
  items: string[];
  label: string;
  /** Se mueve hacia la derecha en lugar de la izquierda. */
  reverse?: boolean;
  /** Letras contorneadas (huecas) en lugar de rellenas. */
  outline?: boolean;
};

/** Cinta que se desplaza sin fin. La lista se duplica para que el bucle no tenga saltos. */
export default function Marquee({ items, label, reverse = false, outline = false }: MarqueeProps) {
  return (
    <div className="group relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`flex w-max gap-8 group-hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        aria-label={label}
        aria-hidden={reverse || undefined}
      >
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className={`flex items-center gap-8 text-5xl font-semibold tracking-[-0.04em] whitespace-nowrap sm:text-7xl ${outline ? "text-outline hover:text-accent" : "text-fg"} transition-colors`}
          >
            {item}
            <span className="font-serif text-4xl text-accent italic sm:text-5xl" aria-hidden="true">
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
